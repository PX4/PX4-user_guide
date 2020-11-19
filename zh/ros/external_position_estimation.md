# 利用视觉或运动捕捉系统进行位置估计

可视惯性测距（VIO）和运动捕捉（MOCAP）系统允许载具在全局位置源不可用或不可靠时（例如在室内，或在桥下飞行时）导航。 等等……

VIO 和 MOCAP 都从“视觉”信息中确定飞机的 *pose* （位置和姿态）。 它们之间的主要区别是框架透视图：
- VIO 使用 *板载传感器 * 从车辆的角度获取姿势数据（见 [egomotion](https://en.wikipedia.org/wiki/Visual_odometry#Egomotion)）。
- MoCap 使用 *离板摄像机* 系统在 3D 空间中获取飞机姿态数据（即它是一个外部系统，告诉飞机其姿态）。

任何类型系统的 Pose 数据都可用于更新基于 PX4 自动驾驶仪的局部位置估计（相对于本地源），也可以选择融合到飞机姿态估计中。 Additionally, if the external pose system also provides linear velocity measurements, it can be used to improve the state estimate (fusion of linear velocity measurements is only supported by the EKF2).

本主题介绍如何配置基于 px4 的系统，以便从 MoCap/VIO 系统（通过 ROS 或其他 MAVLink 系统）获取数据，更具体地说明如何设置 MoCap 系统，如 VICON 和 Optitrack，以及基于视觉的估计系统（如 [ROVIO](https://github.com/ethz-asl/rovio)、[SVO](https://github.com/uzh-rpg/rpg_svo) 和 [PTAM](https://github.com/ethz-asl/ethzasl_ptam)）。

> **Note** 说明因您使用的是 EKF2 还是 LPE 估计器而异。


## PX4 MAVLink 集成

PX4 使用以下 MAVLink 消息获取外部位置信息，并将其映射到 [uORB 主题](http://dev.px4.io/en/middleware/uorb.html)：

| MAVLink                                                                                                                                                                  | uORB                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| [VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_POSITION_ESTIMATE)                                                                        | `vehicle_visual_odometry` |
| [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_VISION_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_VISION_NED)) | `vehicle_visual_odometry` |
| [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP)                                                                                              | `vehicle_mocap_odometry`  |
| [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_MOCAP_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_MOCAP_NED))   | `vehicle_mocap_odometry`  |

EKF2 只订阅 `vehicle_visual_odometry` 主题，因此只能处理前两个消息（MoCap 系统必须生成这些消息才能与 EKF2 配合使用）。 The odometry message is the only message that can send also linear velocities to PX4. LPE 估计订阅所有主题，并且可以增强上面信息的所有进程。

> **Tip** PX4 默认使用 EKF2 估计。 相比 LPE 得到更好的测试和支持，更得到推荐。

消息应在 30Hz（如果包含协方差）和 50 Hz 之间进行流式传输。

以下 MAVLink 视觉消息暂不支持 PX4：[GLOBAL_VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#GLOBAL_VISION_POSITION_ESTIMATE)，[VISION_SPEED_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_SPEED_ESTIMATE)，[VICON_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VICON_POSITION_ESTIMATE)


## 参考机架

PX4 uses FRD (X **F**orward, Y **R**ight and Z **D**own) for the local body frame as well for the reference frame. When using the heading of the magnetometer, the PX4 reference frame x axis will be aligned with north, so therefore it is called NED (X **N**orth, Y **E**ast, Z **D**own). The heading of the reference frame of the PX4 estimator and the one of the external pose estimate will not match in most cases. Therefore the reference frame of the external pose estimate is named differently, it is called [MAV_FRAME_LOCAL_FRD](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_FRD).

根据您的源系统参考框架，您需要在发送 MAVLink Vision/MoCap 消息时应用自定义转换以获得适当的 NED 约定。 This is necessary to change the orientation of the parent and child frame of the pose estimate, such that it fits the PX4 convention. Have a look at the MAVROS [*odom* plugin](https://github.com/mavlink/mavros/blob/master/mavros_extras/src/plugins/odom.cpp) for the necessary transformations.

> **Tip** ROS 用户可以在下面的 [参考机架和 ROS](#ros_reference_frames) 中找到更详细的说明。

例如，如果使用 optitrack 框架，则本地框架在水平面上具有 $$x$$ 和 $$z$$（*x* 正面和 *z* 右），而 *y* 轴是垂直的，指向上方。 通过如下转换我们可以转换optrack坐标系到NED系中。

`x_{mav}`，`y_{mav}` 和 `z_{mav}` 是我们将通过 MAVLink 发送的位置量，然后我们得到：
```
x_{mav} = x_{mocap}
y_{mav} = z_{mocap}
z_{mav} = - y_{mocap}
```

在方向方面，保持标量部分 *w* 四元数，并以相同的方式交换矢量部分 *x*、*y* 和 *z*。 您可以将此技巧应用于每个系统-如果您需要获取 NED 帧，请相应地查看您的 MoCap 输出和交换轴。


## EKF2 调参/配置

Note: this is a quick overview. For more detailed information, check the [EKF2 tuning guide](../advanced_config/tuning_the_ecl_ekf.md)

[EKF2_EV_DELAY](../advanced/parameter_reference.md#EKF2_EV_DELAY) 是相对于 IMU 测量的 *Vision 位置估计延迟 *。

| 参数                                                                                                                                                                                                            | 外部位置估计的设置                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                    | 设置 *视觉位置合成* 和 *视觉偏航合成*                                                |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                    | 设置为 *Vision* 使用视觉作为高度估计的主要来源。                                         |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                    | 设置为测量的时间戳和 "实际" 捕获时间之间的差异。 有关详细信息，请参阅 [below](#tuning-EKF2_EV_DELAY)。 |
| [EKF2_EV_POS_X](../advanced/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced/parameter_reference.md#EKF2_EV_POS_Z) | 设置视觉传感器（或 MoCap 标记）相对于机器人的车身框架的位置。                                    |

> **Tip** 重新启动飞行控制器，以便参数更改生效。

<a id="tuning-EKF2_EV_DELAY"></a>

#### 调参 EKF2_EV_DELAY

换句话说，它是视觉系统时间戳和 "实际" 捕获时间之间的差异，将记录的 IMU 时钟（"基本时钟" 为 ekf2）。

换句话说，它是视觉系统时间戳和 "实际" 捕获时间之间的差异，将记录的 IMU 时钟（"基本时钟" 为 ekf2）。

从技术上讲，如果 MoCap 和（例如）ROS 计算机之间有正确的时间戳（而不仅仅是到达时间）和时间同步（例如 NTP），则可以将其设置为0。 在现实中，这需要一些经验调整，因为整个 MoCap->PX4 链中的延迟是非常特定的。 系统设置完全同步链的情况很少见!

通过检查 IMU 速率和 EV 速率之间的偏移量，可以从日志中获得延迟的粗略估计：

![ekf2_ev_delay 日志](../../assets/ekf2/ekf2_ev_delay_tuning.png)

> **Note** A plot of external data vs. 可使用 [FlightPlot](https://docs.px4.io/en/log/flight_log_analysis.html#flightplot-desktop) 或类似的飞行分析工具生成机载估计（如上）。

该值可以通过不同的参数一起调整，在动态变化中来保证最低 EKF 。

## LPE 调参/配置

You will first need to [switch to the LPE estimator](../advanced/switching_state_estimators.md) by setting the [SYS_MC_EST_GROUP](../advanced/parameter_reference.md#SYS_MC_EST_GROUP) parameter.

> **Note** If targeting `px4_fmu-v2` hardware you will also need to use a firmware version that includes the LPE module (firmware for other FMU-series hardware includes both LPE and and EKF). The LPE version can be found in the zip file for each PX4 release or it can be built from source using the build command `make px4_fmu-v2_lpe`. 有关详细信息, 请参阅 [ Building the code ](../setup/building_px4.md)。 LPE 版本可以在每个 PX4 版本的 zip 文件中找到，也可以使用生成命令 `make px4_fmu-v2_lpe` 从源生成。 有关详细信息, 请参阅 [ Building the code ](../dev_setup/building_px4.md)。

### 启用外部位置输入

The following parameters must be set to use external position information with LPE (these can be set in *QGroundControl* > **Vehicle Setup > Parameters > Local Position Estimator**).

| 参数                                                                         | 外部位置估计的设置                                                                                                                                                 |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [LPE_FUSION](../advanced_config/parameter_reference.md#LPE_FUSION)         | 如果选中了 *fuse 视觉位置 *（默认情况下启用），则启用视觉集成。                                                                                                                      |
| [ATT_EXT_HDG_M](../advanced_config/parameter_reference.md#ATT_EXT_HDG_M) | 设置为1或 2，以启用外部标题集成。 Set to 1 or 2 to enable external heading integration. Setting it to 1 will cause vision to be used, while 2 enables MoCap heading use. |


### 禁用气压计融合

如果从 VIO 或 MoCap 信息中已经提供了高度精确的高度，则禁用 LPE 中的巴洛校正以减少 z 轴上的漂移可能会很有用。

This can be done by in *QGroundControl* by unchecking the *fuse baro* option in the [LPE_FUSION](../advanced/parameter_reference.md#LPE_FUSION) parameter.

### 滤波噪声参数调参

If your vision or MoCap data is highly accurate, and you just want the estimator to track it tightly, you should reduce the standard deviation parameters: [LPE_VIS_XY](../advanced/parameter_reference.md#LPE_VIS_XY) and [LPE_VIS_Z](../advanced/parameter_reference.md#LPE_VIS_Z) (for VIO) or [LPE_VIC_P](../advanced/parameter_reference.md#LPE_VIC_P) (for MoCap). 减小它们会使估计器更加信任外部传入的位姿信息。 减小它们会使估计器更加信任外部传入的位姿信息。 您可能需要将它们设置为允许的最小值。

> **Tip** If performance is still poor, try increasing the [LPE_PN_V](../advanced/parameter_reference.md#LPE_PN_V) parameter. This will cause the estimator to trust measurements more during velocity estimation. 这将使估计器在估计速度时更信任测量值。


## 使用 ROS

ROS is not *required* for supplying external pose information, but is highly recommended as it already comes with good integrations with VIO and MoCap systems. PX4 must already have been set up as above. PX4 必须已设置如上所示。

### 将数据输入 ROS

VIO 和 MoCap 系统具有不同的获取姿势数据的方式，并且有自己的设置和主题。

The setup for specific systems is covered [below](#setup_specific_systems). For other systems consult the vendor setup documentation. 对于其他系统，请参阅供应商设置文档。

<a id="relaying_pose_data_to_px4"></a>

### 将数据回传给 PX4

MAVROS 具有插件，可使用以下管道从 VIO 或 MOCAP 系统中继可视化估计：

| ROS                      | MAVLink                                                                                                                                                                  | uORB                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| /mavros/vision_pose/pose | [VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_POSITION_ESTIMATE)                                                                        | `vehicle_visual_odometry` |
| /mavros/odometry/odom    | [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_VISION_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_VISION_NED)) | `vehicle_visual_odometry` |
| /mavros/mocap/pose       | [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP)                                                                                              | `vehicle_mocap_odometry`  |
| /mavros/odometry/odom    | [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_VISION_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_VISION_NED)) | `vehicle_mocap_odometry`  |

您可以将上述任何管道与 LPE 一起使用。

如果您使用的是 EKF2，则仅支持 "视觉" 管道。 If you're working with EKF2, only the "vision" pipelines are supported. To use MoCap data with EKF2 you will have to [remap](http://wiki.ros.org/roslaunch/XML/remap) the pose topic that you get from MoCap:
- MoCap ROS topics of type `geometry_msgs/PoseStamped` or `geometry_msgs/PoseWithCovarianceStamped` must be remapped to `/mavros/vision_pose/pose`. The `geometry_msgs/PoseStamped` topic is most common as MoCap doesn't usually have associated covariances to the data. `geometry_msgs/PoseStamped` 主题是最常见的，因为 mocap 通常没有与数据相关的协方差。
- If you get data through a `nav_msgs/Odometry` ROS message then you will need to remap it to `/mavros/odometry/odom`.
- The odometry frames `frame_id = odom`, `child_frame_id = base_link` can be changed by updating the file in `mavros/launch/px4_config.yaml`. However, the current version of mavros (`1.3.0`) needs to be able to use the tf tree to find a transform from `frame_id` to the hardcoded frame `odom_ned`. The same applies to the `child_frame_id`, which needs to be connected in the tf tree to the hardcoded frame `base_link_frd`. If you are using mavros `1.2.0` and you didn't update the file `mavros/launch/px4_config.yaml`, then you can safely use the odometry frames `frame_id = odom`, `child_frame_id = base_link` without much worry.
- **Note** Remapping pose topics is covered above [Relaying pose data to PX4](#relaying_pose_data_to_px4) (`/vrpn_client_node/<rigid_body_name>/pose` is of type `geometry_msgs/PoseStamped`).


### 参考框架和 ROS

ROS 和 PX4 使用的本地/世界坐标系和全局框架是不同的。

| 框架    | ROS                                                                           | PX4                                           |
| ----- | ----------------------------------------------------------------------------- | --------------------------------------------- |
| 机体    | FLU (X **F**orward, Y **L**eft, Z **U**p), usually named `base_link`          | FRD (X **F**orward, Y **R**ight 和 Z **D**own) |
| 世界坐标系 | ENU (X **E**ast, Y **N**orth and Z Up), with the naming being `odom` or `map` | NED (X **N**orth, Y **E**ast, Z **D**own)     |

> **Tip** 有关 ROS 框架的详细信息，请参阅 [REP105: Coordinate Frames for Mobile Platforms](http://www.ros.org/reps/rep-0105.html)。

Both frames are shown in the image below (NED on left/ENU on right).

![参考机架](../../assets/lpe/ref_frames.png)

With EKF2 when using external heading estimation, magnetic north can either be ignored and or the heading offset to magnetic north can be calculated and compensated. When using external heading estimation, magnetic North is ignored and faked with a vector corresponding to world *x* axis (which can be placed freely during Vision/MoCap calibration). Yaw angle is therefore given with respect to local *x*.

> **Note** When creating the rigid body in the MoCap software, remember to first align the robot's local *x* axis with the world *x* axis otherwise yaw estimation will have an initial offset. This can stop the external pose estimate fusion from working properly. Yaw angle should be zero when body and reference frame align.

利用MAVROS功能包，以上操作会十分简单。 ROS 默认使用 ENU 系, 因此你在MAVROS中所有代码必须遵循ENU系。 如果您有一个 Optitrack 系统, 则可以使用 [ mocap_optitrack ](https://github.com/ros-drivers/mocap_optitrack) 节点, 其已经发布了一个关于刚体位姿的一个ROS话题。 通过重新映射，您可以直接将其发布在 `mocap_pose_estimate` 因为它没有任何转换，mavros 将负责 NED 转换。

The MAVROS odometry plugin makes it easy to handle the coordinate frames. It uses ROS's tf package. Your external pose system might have a completely different frame convention that does not match the one of PX4. The body frame of the external pose estimate can depend on how you set the body frame in the MOCAP software or on how you mount the VIO sensor on the drone. The MAVROS odometry plugin needs to know how the external pose's child frame is oriented with respect to either the airframe's FRD or FLU body frame known by MAVROS. You therefore have to add the external pose's body frame to the tf tree. This can be done by including an adapted version of the following line into your ROS launch file.

```
  <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_externalPoseChildFrame"
        args="0 0 0 <yaw> <pitch> <roll> base_link <external_pose_child_frame> 1000"/>
```
Make sure that you change the values of yaw, pitch and roll such that it properly attaches the external pose's body frame to the `base_link` or `base_link_frd`. Have a look at the [tf package](http://wiki.ros.org/tf#static_transform_publisher) for further help on how to specify the transformation between the frames. You can use rviz to check if you attached the frame right. The name of the `external_pose_child_frame` has to match the child_frame_id of your `nav_msgs/Odometry` message. The same also applies for the reference frame of the external pose. You have to attach the reference frame of the external pose as child to either the `odom` or `odom_frd` frame. Adapt therefore the following code line accordingly.
```
  <node pkg="tf" type="static_transform_publisher" name="tf_odom_externalPoseParentFrame"
        args="0 0 0 <yaw> <pitch> <roll> odom <external_pose_parent_frame> 1000"/>
```
If the reference frame has the z axis pointing upwards you can attached it without any rotation (yaw=0, pitch=0, roll=0) to the `odom` frame. The name of `external_pose_parent_frame` has to match the frame_id of the odometry message.

> **Note** When using the MAVROS *odom* plugin, it is important that no other node is publishing a transform between the external pose's reference and child frame. This might break the *tf* tree.

<a id="setup_specific_systems"></a>

## 特定的系统设置

### 光学跟踪 MoCap

The following steps explain how to feed position estimates from an [OptiTrack](http://optitrack.com/systems/#robotics) system to PX4. It is assumed that the MoCap system is calibrated. See [this video](https://www.youtube.com/watch?v=cNZaFEghTBU) for a tutorial on the calibration process. 假定 mocap 系统已校准。 有关校准过程的教程，请参阅 [this video ](https://www.youtube.com/watch?v=cNZaFEghTBU)。

#### 设置 *Motive* mocap 软件

* 将无人机的前进方向与 [system + x-axiss](https://v20.wiki.optitrack.com/index.php?title=Template:Coordinate_System) 对齐
* [Define a rigid body in the Motive software](https://www.youtube.com/watch?v=1e6Qqxqe-k0)。 [Define a rigid body in the Motive software](https://www.youtube.com/watch?v=1e6Qqxqe-k0). Give the robot a name that does not contain spaces, e.g. `robot1` instead of `Rigidbody 1`
* [启用帧广播和 VRPN 流](https://www.youtube.com/watch?v=yYRNG58zPFo)
* 将 "向上" 轴设置为 z 轴（默认值为 y）

#### 将数据输入 ROS

* 安装 `vrpn_client_ros` 包
* You can get each rigid body pose on an individual topic by running bash roslaunch vrpn_client_ros sample.launch server:=
  ```bash
  roslaunch vrpn_client_ros sample.launch server:=<mocap machine ip>
  ```

如果你把机体命名为 `robot1`，你会得到一个主题，比如 `/vrpn_client_node/robot1/pose`

#### 重新映射/重新映射位置数据

MAVROS 提供了一个插件来中继在 `/mavros/vision_pose/pose` 上发布的姿势数据到 px4。 假设 mavros 正在运行，您只需 **remap** 从 mcap 获得的位置主题 `/vrpn_client_node/&lt;rigid_body_name&gt;/pose` 直接到 `/mavros/vision_pose/pose`。 请注意，mavros 还提供了一个 `mocap` 主题，用于将 `ATT_POS_MOCAP` 提供给 px4，但它不适用于 ekf2。 但是，它适用于 lpe。

> MAVROS provides a plugin to relay pose data published on `/mavros/vision_pose/pose` to PX4. Assuming that MAVROS is running, you just need to **remap** the pose topic that you get from MoCap `/vrpn_client_node/<rigid_body_name>/pose` directly to `/mavros/vision_pose/pose`. Note that there is also a `mocap` topic that MAVROS provides to feed `ATT_POS_MOCAP` to PX4, but it is not applicable for EKF2. However, it is applicable with LPE.

假设您已按上述方式配置了 EKF2 参数，那么现在就设置并融合了 MoCap 数据。

您现在已准备好继续进行第一次飞行。


## 第一次飞行

在设置了上述（特定）系统之一之后，您现在应该可以进行测试了。 After setting up one of the (specific) systems described above you should now be ready to test. The instructions below show how to do so for MoCap and VIO systems

### MoCap First Flight

如果以上步骤没问题，你可以开始你的第一次飞行。

* Set the PX4 parameter `MAV_ODOM_LP` to 1. PX4 will then stream back the received external pose as MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) messages.
* You can check these MAVLink messages with the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) In order to do this, yaw the vehicle until the quaternion of the `ODOMETRY` message is very close to a unit quaternion. (w=1, x=y=z=0)
* At this point the body frame is aligned with the reference frame of the external pose system. If you do not manage to get a quaternion close to the unit quaternion without rolling or pitching your vehicle, your frame probably still have a pitch or roll offset. Do not proceed if this is the case and check your coordinate frames again.
* Once aligned you can pick the vehicle up from the ground and you should see the position's z coordinate decrease. Moving the vehicle in forward direction, should increase the position's x coordinate. While moving the vehicle to the right should increase the y coordinate. In the case you send also linear velocities from the external pose system, you should also check the linear velocities. Check that the linear velocities are in expressed in the *FRD* body frame reference frame.
* Set the PX4 parameter `MAV_ODOM_LP` back to 0. PX4 will stop streaming this message back.

如果以上步骤没问题，你可以开始你的第一次飞行。

Put the robot on the ground and start streaming MoCap feedback. 油门杆推到最低并解锁。 油门杆推到最低并解锁。

此时，设置为位置控制模式。 如果切换成功，飞控会闪绿灯。 绿灯代表：你的外部位置信息已经注入到飞控中，并且位置控制模式已经切换成功。

油门杆居中，这是油门控制死区。 With this stick value, the robot maintains its altitude; raising the stick will increase the reference altitude while lowering the value will decrease it. 同理对于另一个杆。

Increase the value of the left stick and the robot will take off, put it back to the middle right after. 检查此时无人机能否悬停。

如果这一切都没问题，那么你可以开始进行offboard模式下的试验了（发布自行设定的位置期望值给飞控）。

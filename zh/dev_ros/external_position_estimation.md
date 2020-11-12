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

Note: this is a quick overview. For more detailed information, check the [EKF2 tuning guide](https://docs.px4.io/master/en/advanced_config/tuning_the_ecl_ekf.html)

[EKF2_EV_DELAY](../advanced/parameter_reference.md#EKF2_EV_DELAY) 是相对于 IMU 测量的 *Vision 位置估计延迟 *。

| 参数                                                                                                                                                                                                            | Setting for External Position Estimation                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [EKF2_AID_MASK](../advanced/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                           | 设置 *视觉位置合成* 和 *视觉偏航合成*                                                |
| [EKF2_HGT_MODE](../advanced/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                           | 设置为 *Vision* 使用视觉作为高度估计的主要来源。                                         |
| [EKF2_EV_DELAY](../advanced/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                           | 设置为测量的时间戳和 "实际" 捕获时间之间的差异。 有关详细信息，请参阅 [below](#tuning-EKF2_EV_DELAY)。 |
| [EKF2_EV_POS_X](../advanced/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced/parameter_reference.md#EKF2_EV_POS_Z) | 设置视觉传感器（或 MoCap 标记）相对于机器人的车身框架的位置。                                    |

> **Tip** 重新启动飞行控制器，以便参数更改生效。

<a id="tuning-EKF2_EV_DELAY"></a>

#### 调参 EKF2_EV_DELAY

换句话说，它是视觉系统时间戳和 "实际" 捕获时间之间的差异，将记录的 IMU 时钟（"基本时钟" 为 ekf2）。

Or in other words, it is the difference between the vision system timestamp and the "actual" capture time that would have been recorded by the IMU clock (the "base clock" for EKF2).

从技术上讲，如果 MoCap 和（例如）ROS 计算机之间有正确的时间戳（而不仅仅是到达时间）和时间同步（例如 NTP），则可以将其设置为0。 在现实中，这需要一些经验调整，因为整个 MoCap->PX4 链中的延迟是非常特定的。 系统设置完全同步链的情况很少见!

通过检查 IMU 速率和 EV 速率之间的偏移量，可以从日志中获得延迟的粗略估计：

![ekf2_ev_delay log](../../assets/ekf2/ekf2_ev_delay_tuning.png)

> **Note** A plot of external data vs. 可使用 [FlightPlot](https://docs.px4.io/en/log/flight_log_analysis.html#flightplot-desktop) 或类似的飞行分析工具生成机载估计（如上）。

The value can further be tuned by varying the parameter to find the value that yields the lowest EKF innovations during dynamic maneuvers.

## LPE Tuning/Configuration

You will first need to [switch to the LPE estimator](../advanced/switching_state_estimators.md) by setting the [SYS_MC_EST_GROUP](../advanced/parameter_reference.md#SYS_MC_EST_GROUP) parameter.

> **Note** If targeting `px4_fmu-v2` hardware you will also need to use a firmware version that includes the LPE module (firmware for other FMU-series hardware includes both LPE and and EKF). The LPE version can be found in the zip file for each PX4 release or it can be built from source using the build command `make px4_fmu-v2_lpe`. 有关详细信息, 请参阅 [ Building the code ](../setup/building_px4.md)。 The LPE version can be found in the zip file for each PX4 release or it can be built from source using the build command `make px4_fmu-v2_lpe`. See [Building the Code](../setup/building_px4.md) for more details.

### Enabling External Pose Input

The following parameters must be set to use external position information with LPE (these can be set in *QGroundControl* > **Vehicle Setup > Parameters > Local Position Estimator**).

| 参数                                                                  | Setting for External Position Estimation                                                                                                                                                     |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [LPE_FUSION](../advanced/parameter_reference.md#LPE_FUSION)         | Vision integration is enabled if *fuse vision position* is checked (it is enabled by default).                                                                                               |
| [ATT_EXT_HDG_M](../advanced/parameter_reference.md#ATT_EXT_HDG_M) | Set to 1 or 2 to enable external heading integration. Set to 1 or 2 to enable external heading integration. Setting it to 1 will cause vision to be used, while 2 enables MoCap heading use. |


### Disabling Barometer Fusion

If a highly accurate altitude is already available from VIO or MoCap information, it may be useful to disable the baro correction in LPE to reduce drift on the Z axis.

This can be done by in *QGroundControl* by unchecking the *fuse baro* option in the [LPE_FUSION](../advanced/parameter_reference.md#LPE_FUSION) parameter.

### 滤波噪声参数调参

If your vision or MoCap data is highly accurate, and you just want the estimator to track it tightly, you should reduce the standard deviation parameters: [LPE_VIS_XY](../advanced/parameter_reference.md#LPE_VIS_XY) and [LPE_VIS_Z](../advanced/parameter_reference.md#LPE_VIS_Z) (for VIO) or [LPE_VIC_P](../advanced/parameter_reference.md#LPE_VIC_P) (for MoCap). 减小它们会使估计器更加信任外部传入的位姿信息。 Reducing them will cause the estimator to trust the incoming pose estimate more. 您可能需要将它们设置为允许的最小值。

> **Tip** If performance is still poor, try increasing the [LPE_PN_V](../advanced/parameter_reference.md#LPE_PN_V) parameter. This will cause the estimator to trust measurements more during velocity estimation. This will cause the estimator to trust measurements more during velocity estimation.


## Working with ROS

ROS is not *required* for supplying external pose information, but is highly recommended as it already comes with good integrations with VIO and MoCap systems. PX4 must already have been set up as above. PX4 must already have been set up as above.

### Getting Pose Data Into ROS

VIO and MoCap systems have different ways of obtaining pose data, and have their own setup and topics.

The setup for specific systems is covered [below](#setup_specific_systems). For other systems consult the vendor setup documentation. For other systems consult the vendor setup documentation.

<a id="relaying_pose_data_to_px4"></a>

### Relaying Pose Data to PX4

MAVROS has plugins to relay a visual estimation from a VIO or MoCap system using the following pipelines:

| ROS                      | MAVLink                                                                                                                                                                  | uORB                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| /mavros/vision_pose/pose | [VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_POSITION_ESTIMATE)                                                                        | `vehicle_visual_odometry` |
| /mavros/odometry/odom    | [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_VISION_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_VISION_NED)) | `vehicle_visual_odometry` |
| /mavros/mocap/pose       | [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP)                                                                                              | `vehicle_mocap_odometry`  |
| /mavros/odometry/odom    | [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_LOCAL_FRD](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_FRD))   | `vehicle_mocap_odometry`  |

You can use any of the above pipelines with LPE.

If you're working with EKF2, only the "vision" pipelines are supported. If you're working with EKF2, only the "vision" pipelines are supported. To use MoCap data with EKF2 you will have to [remap](http://wiki.ros.org/roslaunch/XML/remap) the pose topic that you get from MoCap:
- MoCap ROS topics of type `geometry_msgs/PoseStamped` or `geometry_msgs/PoseWithCovarianceStamped` must be remapped to `/mavros/vision_pose/pose`. The `geometry_msgs/PoseStamped` topic is most common as MoCap doesn't usually have associated covariances to the data. The `geometry_msgs/PoseStamped` topic is most common as MoCap doesn't usually have associated covariances to the data.
- If you get data through a `nav_msgs/Odometry` ROS message then you will need to remap it to `/mavros/odometry/odom`.
- The odometry frames `frame_id = odom`, `child_frame_id = base_link` can be changed by updating the file in `mavros/launch/px4_config.yaml`. However, the current version of mavros (`1.3.0`) needs to be able to use the tf tree to find a transform from `frame_id` to the hardcoded frame `odom_ned`. The same applies to the `child_frame_id`, which needs to be connected in the tf tree to the hardcoded frame `base_link_frd`. If you are using mavros `1.2.0` and you didn't update the file `mavros/launch/px4_config.yaml`, then you can safely use the odometry frames `frame_id = odom`, `child_frame_id = base_link` without much worry.
- **Note** Remapping pose topics is covered above [Relaying pose data to PX4](#relaying_pose_data_to_px4) (`/vrpn_client_node/<rigid_body_name>/pose` is of type `geometry_msgs/PoseStamped`).

<a id="ros_reference_frames"></a>

### Reference Frames and ROS

The local/world and world frames used by ROS and PX4 are different.

| Frame | ROS                                                                           | PX4                                             |
| ----- | ----------------------------------------------------------------------------- | ----------------------------------------------- |
| Body  | FLU (X **F**orward, Y **L**eft, Z **U**p), usually named `base_link`          | FRD (X **F**orward, Y **R**ight and Z **D**own) |
| World | ENU (X **E**ast, Y **N**orth and Z Up), with the naming being `odom` or `map` | NED (X **N**orth, Y **E**ast, Z **D**own)       |

> **Tip** See [REP105: Coordinate Frames for Mobile Platforms](http://www.ros.org/reps/rep-0105.html) for more information about ROS frames.

Both frames are shown in the image below (NED on left/ENU on right).

![参考机架](../../assets/lpe/ref_frames.png)

With EKF2 when using external heading estimation, magnetic north can either be ignored and or the heading offset to magnetic north can be calculated and compensated. When using external heading estimation, magnetic North is ignored and faked with a vector corresponding to world *x* axis (which can be placed freely during Vision/MoCap calibration). Yaw angle is therefore given with respect to local *x*.

> **Note** When creating the rigid body in the MoCap software, remember to first align the robot's local *x* axis with the world *x* axis otherwise yaw estimation will have an initial offset. This can stop the external pose estimate fusion from working properly. Yaw angle should be zero when body and reference frame align.

Using MAVROS, this operation is straightforward. ROS uses ENU frames as convention, therefore position feedback must be provided in ENU. 如果您有一个 Optitrack 系统, 则可以使用 [ mocap_optitrack ](https://github.com/ros-drivers/mocap_optitrack) 节点, 其已经发布了一个关于刚体位姿的一个ROS话题。 With a remapping you can directly publish it on `mocap_pose_estimate` as it is without any transformation and MAVROS will take care of NED conversions.

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

## Specific System Setups

### OptiTrack MoCap

The following steps explain how to feed position estimates from an [OptiTrack](http://optitrack.com/systems/#robotics) system to PX4. It is assumed that the MoCap system is calibrated. See [this video](https://www.youtube.com/watch?v=cNZaFEghTBU) for a tutorial on the calibration process. It is assumed that the MoCap system is calibrated. See [this video](https://www.youtube.com/watch?v=cNZaFEghTBU) for a tutorial on the calibration process.

#### Steps on the *Motive* MoCap software

* Align your robot's forward direction with the the [system +x-axis](https://v20.wiki.optitrack.com/index.php?title=Template:Coordinate_System)
* [Define a rigid body in the Motive software](https://www.youtube.com/watch?v=1e6Qqxqe-k0). [Define a rigid body in the Motive software](https://www.youtube.com/watch?v=1e6Qqxqe-k0). Give the robot a name that does not contain spaces, e.g. `robot1` instead of `Rigidbody 1`
* [Enable Frame Broadacst and VRPN streaming](https://www.youtube.com/watch?v=yYRNG58zPFo)
* Set the Up axis to be the Z axis (the default is Y)

#### Getting pose data into ROS

* Install the `vrpn_client_ros` package
* You can get each rigid body pose on an individual topic by running bash roslaunch vrpn_client_ros sample.launch server:=
  ```bash
  roslaunch vrpn_client_ros sample.launch server:=<mocap machine ip>
  ```

If you named the rigidbody as `robot1`, you will get a topic like `/vrpn_client_node/robot1/pose`

#### Relaying/remapping Pose Data

MAVROS provides a plugin to relay pose data published on `/mavros/vision_pose/pose` to PX4. Assuming that MAVROS is running, you just need to **remap** the pose topic that you get from MoCap `/vrpn_client_node/<rigid_body_name>/pose` directly to `/mavros/vision_pose/pose`. Note that there is also a `mocap` topic that MAVROS provides to feed `ATT_POS_MOCAP` to PX4, but it is not applicable for EKF2. However, it is applicable with LPE.

> MAVROS provides a plugin to relay pose data published on `/mavros/vision_pose/pose` to PX4. Assuming that MAVROS is running, you just need to **remap** the pose topic that you get from MoCap `/vrpn_client_node/<rigid_body_name>/pose` directly to `/mavros/vision_pose/pose`. Note that there is also a `mocap` topic that MAVROS provides to feed `ATT_POS_MOCAP` to PX4, but it is not applicable for EKF2. However, it is applicable with LPE.

Assuming that you have configured EKF2 parameters as described above, PX4 now is set and fusing MoCap data.

You are now set to proceed to the first flight.


## 第一次飞行

After setting up one of the (specific) systems described above you should now be ready to test. After setting up one of the (specific) systems described above you should now be ready to test. The instructions below show how to do so for MoCap and VIO systems

### MoCap First Flight

如果以上步骤没问题，你可以开始你的第一次飞行。

* Set the PX4 parameter `MAV_ODOM_LP` to 1. PX4 will then stream back the received external pose as MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) messages.
* You can check these MAVLink messages with the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) In order to do this, yaw the vehicle until the quaternion of the `ODOMETRY` message is very close to a unit quaternion. (w=1, x=y=z=0)
* At this point the body frame is aligned with the reference frame of the external pose system. If you do not manage to get a quaternion close to the unit quaternion without rolling or pitching your vehicle, your frame probably still have a pitch or roll offset. Do not proceed if this is the case and check your coordinate frames again.
* Once aligned you can pick the vehicle up from the ground and you should see the position's z coordinate decrease. Moving the vehicle in forward direction, should increase the position's x coordinate. While moving the vehicle to the right should increase the y coordinate. In the case you send also linear velocities from the external pose system, you should also check the linear velocities. Check that the linear velocities are in expressed in the *FRD* body frame reference frame.
* Set the PX4 parameter `MAV_ODOM_LP` back to 0. PX4 will stop streaming this message back.

If those steps are consistent, you can try your first flight.

Put the robot on the ground and start streaming MoCap feedback. 油门杆推到最低并解锁。 Lower your left (throttle) stick and arm the motors.

At this point, with the left stick at the lowest position, switch to position control. You should have a green light. The green light tells you that position feedback is available and position control is now activated.

Put your left stick at the middle, this is the dead zone. With this stick value, the robot maintains its altitude; raising the stick will increase the reference altitude while lowering the value will decrease it. Same for right stick on x and y.

Increase the value of the left stick and the robot will take off, put it back to the middle right after. Check if it is able to keep its position.

如果这一切都没问题，那么你可以开始进行offboard模式下的试验了（发布自行设定的位置期望值给飞控）。

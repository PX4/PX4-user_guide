# 视觉惯性测距(VIO)

*视觉惯性测距*（VIO）是一种[计算机视觉](../computer_vision/README.md)技术，用于估算3D*姿态*(当地位置和方向)，相对于*当地*起始位置的移动无人机/无人车的*速度*。 它通常用于在GPS不存在或不可靠的情况下（例如室内或在桥下飞行时）给无人机/无人车导航。

VIO 使用 [视觉里程计（Visual Odometry）](https://en.wikipedia.org/wiki/Visual_odometry) 从相机图像中估计机身*姿态*，并结合机身IMU的惯性测量（以校正因不良的图像捕获导致的机身快速移动的错误）。

本节说明如何通过设置 PX4 和机载计算机来使用*已支持的* VIO 配置。

{% youtube %}
https://youtu.be/gWtrka2mK7U
{% endyoutube %}

:::tip
上面的[ Auterion 产品视频](https://auterion.com/enabling_uav_navigation_in_environments_with_limited_or_no_gps_signal/) 展示了一个无人机飞行使用了
支持的设置</0>。 :::</p> 

:::tip
注意 这个（支持的）解决方案使用 ROS 来路由 VIO 信息到 PX4。 PX4本身并不关心消息源，通过 [MAVLink接口](../ros/external_position_estimation.md#px4-mavlink-integration) 提供消息就行。
:::

<span id="supported_setup"></span> 


## 支持的配置

已支持的配置使用 [T265 Intel Realsense追踪相机](../peripherals/camera_t265_vio.md) 和 ROS（运行在机载计算机上）为 PX4 提供测距信息。 Auterion 的 [VIO bridge ROS 节点](https://github.com/Auterion/VIO_bridge) 提供了（指定）相机与 ROS 之间的桥接。





### 相机安装

将相机连接到机载计算机并将其安装到框架：

- 使用提供的线缆连接 [T265 Intel Realse 追踪摄像头](../peripherals/camera_t265_vio.md)。
- 尽可能使镜头朝下安装相机（默认）。
- 相机对振动非常敏感，建议软安装(例如使用振动隔离泡沫)。




### ROS/VIO 安装

设置桥接，ROS和 PX4：

- 在机载计算机上安装和配置 [MAVROS](../ros/mavros_installation.md)。
- 获取 Auterion [VIO Bridge ROS 节点](https://github.com/Auterion/VIO_bridge)：
  
    - 从仓库中克隆代码到你的 catkin 工作空间。 
    
    
    ```
    cd ~/catkin_ws/src
    git clone https://github.com/Auterion/VIO.git
    ```


  - 构建软件包: 
    
    
    ```
    cd ~/catkin_ws/src
    catkin building px4_realsense_bridge
    ```


- 如果需要，配置摄像头方向：
  
    - 如果摄像机的镜头朝下安装（默认设置），则VIO桥接器不需要任何配置。
  - 对于任何其他方向，请在以下部分中修改[ bridge_mavros.launch ](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch)： 
    
    
    ```xml
    <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_cameraPose"
        args="0 0 0 0 1.5708 0 base_link camera_pose_frame 1000"/>
    ```


这是将摄像机ROS帧` camera_pose_frame `链接到mavros无人机帧` base_link `的静态转换。

   - 前三个` 参数 `指定*解释*为从飞控中心到摄像机的 x，y，z方向，以米为单位。 例如，如果摄像头在飞控前方10cm，上方4cm,  则前三个数字将是：[0.1, 0, 0.04 ...]

   - 接下来的三个 `参数` 是旋转弧度(偏航, 俯仰, 横滚)。 所以 `[... 0, 1.5708, 0]` 是向下俯仰90度(朝向地面)。 直面是 [... 0 0 0]。

- 按照[下方](#ekf2_tuning)的说明调整 PX4 EKF2 估计器。

- 通过使用适当的启动文件调用 `roslaunch` 来运行VIO： 
  
  
  ```
  cd ~/catkin_ws/src
  roslaunched px4_realsense_bridge_mavros.launch
  ```


启动文件选项是：

  - [bridge_mavros.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch): 在大多数情况下在无人机/无人车上使用(启动桥桥接和MAVROS)。
  - [bridge.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge.launch): 如果其他组件负责启动MAVROS（仅启动桥接），则使用
  - [bridge_mavros_sitl.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros_sitl.launch):用于模拟仿真(启动桥接, MAVROS, SITL)
- 验证与飞控的连接。
  
  :::tip 您可以使用*QGroundControl *  [ MAVLink检查器](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)来验证是否收到` ODOMETRY `或` VISION_POSITION_ESTIMATE `消息（或检查是否存在 ` HEARTBEAT `消息，其组件ID为197（` MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY `）。
:::

- 在第一次飞行前[确认VIO设置正确](#verify_estimate)！

<span id="ekf2_tuning"></span> 


### PX4 调试

必须将以下参数设置为将外部位置信息与EKF2一起使用。

| 参数                                                                                                                                                                                                            | 外部位置估计的设置                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                    | 设置 *视觉位置合成* 和 *视觉偏航合成*                                                |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                    | 设置为 *Vision* 使用视觉作为高度估计的主要来源。                                         |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                    | 设置为测量的时间戳和 "实际" 捕获时间之间的差异。 有关详细信息，请参阅 [below](#tuning-EKF2_EV_DELAY)。 |
| [EKF2_EV_POS_X](../advanced/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced/parameter_reference.md#EKF2_EV_POS_Z) | 设置视觉传感器相对于车身框架的位置。                                                    |


这些参数可以在*QGroundControl*>**Vehicle Setup > Parameters > EKF2**中设置（切记要使参数更改生效需要重启飞控）。

更多详情/附加信息，见： [ECL/EKF 概述 & 调试 > 外部视觉系统](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)。

<span id="tuning-EKF2_EV_DELAY"></span> 


#### 调参 EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)是*相对于IMU测量值的视觉位置估算器的延迟*。 换而言之, 这是视觉系统时间戳和IMU时钟（EKF2“时基”）记录的“实际”捕获时间之间的差异。

从技术上讲，如果有正确的时间戳（不仅仅是到达时间），在MoCap和（例如）ROS计算机之间有时间同步，这个参数可以设置为0。 实际上，由于通信链路的延迟非常特殊，这可能需要一些经验来调整。 很少有完全同步的链路的系统设置。

通过检查IMU速率和EV速率之间的偏移，可以从日志中获取对延迟的粗略估计：

![ekf2_ev_delay log](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::tip
注意 可以使用 [FlightPlot](../log/flight_log_analysis.md#flightplot) 或类似的飞行分析工具生成一组外部数据与板载估计(如上)。
:::

可以通过更改参数来进一步调整该值，以找到在动态变化中最低的EKF更新值。

<span id="verify_estimate"></span> 


## 检查/验证 VIO 预估

执行以下检查，以确保在首次飞行*之前*VIO正常运行：

* 设置 PX4 参数 `MAV_ODOM_LP` 为1。 然后PX4将接收到的外部姿态用MAVLink[ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY)消息回传。 您可以使用 *QGroundControl* [MAVLink 检查器](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) 查看这些MAVLink 消息

* 偏航机身，直到` ODOMETRY `消息的四元数非常接近单位四元数（w = 1，x = y = z = 0）。
  
    * 在这一点上，机架与外部姿态系统的参考机架一致。
  * 如果在不使横滚或俯仰的情况下无法使四元数接近单位四元数，则机架可能仍存在俯仰或滚动偏移。 这种情况下不要再检查机架坐标系。
* 对齐后，将机架抬离地面，应该看到位置的z坐标减小。 Moving the vehicle in forward direction, should increase the position's x coordinate. While moving the vehicle to the right should increase the y coordinate.

* Check that linear velocities in the message are in expressed in the *FRD* body frame reference frame.

* Set the PX4 parameter `MAV_ODOM_LP` back to 0. PX4 will stop streaming the `ODOMETRY` message back.

If those steps are consistent, you can try your first flight:

1. Put the vehicle on the ground and start streaming `ODOMETRY` feedback (as above). Lower your throttle stick and arm the motors.
   
   此时，设置为位置控制模式。 如果切换成功，飞控会闪绿灯。 绿灯代表：你的外部位置信息已经注入到飞控中，并且位置控制模式已经切换成功。

1. Put the throttle stick in the middle (the dead zone) so that the vehicle maintains its altitude. Raising the stick will increase the reference altitude while lowering the value will decrease it. Similarly the other stick will change position over ground.

1. Increase the value of the throttle stick and the vehicle will take off, put it back to the middle right after.

1. Confirm that the vehicle can hold its position.




## 故障处理

First make sure MAVROS is able to connect successfully to the flight controller.

If it is connecting properly common problems/solutions are:

- **Problem:** I get drift / flyaways when the drone flies, but not when I carry it around with the props off.
  
    - If using the [T265](../peripherals/camera_t265_vio.md) try soft-mounting it (this camera is very sensitive to high frequency vibrations).
- **Problem:** I get toilet-bowling when VIO is enabled.
  
    - Make sure the orientation of the camera matches the transform in the launch file. Use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) to verify that the velocities in the `ODOMETRY` message coming from MAVROS are aligned to the FRD coordinate system.
- **Problem:** I want to use vision position to do loop closing, and also want to run GPS.
  
    - This is really difficult, because when they disagree it will confuse the EKF. From testing it is more reliable to just use vision velocity (if you figure out a way to make this configuration reliable, let us know).




## 开发人员信息

Developers who are interested in extending this implementation (or writing a different one, which might not depend on ROS) should see [Using Vision or Motion Capture Systems for Position Estimation](../ros/external_position_estimation.md).

This topic also explains how to configure VIO for use with the LPE Estimator (deprecated).




## 更多信息

- [ECL/EKF Overview & Tuning > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [Snapdragon > Installation > Install Snap VIO](../flight_controller/snapdragon_flight_software_installation.md#install-snap-vio)
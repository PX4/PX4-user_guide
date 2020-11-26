# 视觉惯性测距(VIO)

*视觉惯性测距*（VIO）是一种[计算机视觉](../computer_vision/README.md)技术，用于估算3D*姿态*(当地位置和方向)，相对于*当地*起始位置的移动无人机/无人车的*速度*。 它通常用于在GPS不存在或不可靠的情况下（例如室内或在桥下飞行时）给无人机/无人车导航。

VIO使用
视觉测距法</ 0>从相机图像中估计机身*姿态</ 1>，并结合机身IMU的惯性测量（以校正因机身快速移动相关的错误，导致不良的图像捕获）。</p> 

本节说明如何通过设置PX4和机载计算机来使用*支持的</ 0> VIO设置。</p> 

{% youtube %}

https://youtu.be/gWtrka2mK7U 

{% endyoutube %}

:::提示 上面的 Auterion产品视频</ 0>展示了一个无人机飞行使用了[支持的设置](#supported_setup)。 :::</p> 

:::提示 注意 这个(支持的)解决方案使用 ROS来路由VIO 信息到 PX4。 PX4本身并不关心消息源,  通过[MAVLink接口](../ros/external_position_estimation.md#px4-mavlink-integration)提供消息就行。
:::

<span id="supported_setup"></span> 


## 安装支持

支持的安装程序使用 [T265 Intel Realsetring Camera](../peripherals/camera_t265_vio.md) 和 ROS(运行在机载计算机上) 为 PX4 提供测距信息。 Auterion的[VIO bridge ROS node](https://github.com/Auterion/VIO_bridge)产品提供了(特殊)相机和ROS之间的桥接。





### 相机挂载

将相机连接到机载计算机并将其安装到框架：

- 使用提供的线缆连接 [T265 Intel Realse追踪摄像头](../peripherals/camera_t265_vio.md)。
- 尽可能使镜头朝下安装相机（默认）。
- 相机对振动非常敏感，建议软安装(例如使用振动隔离泡沫)。




### ROS/VIO 安装配置

设置桥接，ROS和 PX4：

- 在机载计算机上安装和配置 [MAVROS](../ros/mavros_installation.md)。
- 获取 Auterion [VIO 桥接ROS节点](https://github.com/Auterion/VIO_bridge):
  
    - 从仓库中克隆代码到你的catkin工作空间。 
    
    
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

   - 接下来的三个 `参数` 是旋转弧度(偏航, 俯仰, 横滚)。 So `[... 0, 1.5708, 0]` means pitch down by 90deg (facing the ground). Facing straight forward would be [... 0 0 0].

- Follow the instructions [below](#ekf2_tuning) for tuning the PX4 EKF2 estimator.

- Run VIO by calling `roslaunch` with an appropriate launch file: 
  
  
  ```
  cd ~/catkin_ws/src
  roslaunch px4_realsense_bridge bridge_mavros.launch
  ```


The launch file options are:

  - [bridge_mavros.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch): Use on vehicle in most cases (starts bridge and MAVROS).
  - [bridge.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge.launch): Use if some other component is responsible for starting MAVROS (only starts bridge)
  - [bridge_mavros_sitl.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros_sitl.launch):Use for simulation (starts bridge, MAVROS, SITL)
- Verify the connection to the flight controller.
  
  :::tip You can use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) to verify that you're getting `ODOMETRY` or `VISION_POSITION_ESTIMATE` messages (or check for `HEARTBEAT` messages that have the component id 197 (`MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY`)).
:::

- [Verify that VIO is Setup Correctly](#verify_estimate) before your first flight!

<span id="ekf2_tuning"></span> 


### PX4 调试

The following parameters must be set to use external position information with EKF2.

| 参数                                                                                                                                                                                                            | 外部位置估计的设置                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                    | 设置 *视觉位置合成* 和 *视觉偏航合成*                                                         |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                    | 设置为 *Vision* 使用视觉作为高度估计的主要来源。                                                  |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                    | 设置为测量的时间戳和 "实际" 捕获时间之间的差异。 有关详细信息，请参阅 [below](#tuning-EKF2_EV_DELAY)。          |
| [EKF2_EV_POS_X](../advanced/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced/parameter_reference.md#EKF2_EV_POS_Z) | Set the position of the vision sensor with respect to the vehicles body frame. |


These can be set in *QGroundControl* > **Vehicle Setup > Parameters > EKF2** (remember to reboot the flight controller in order for parameter changes to take effect).

For more detailed/additional information, see: [ECL/EKF Overview & Tuning > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system).

<span id="tuning-EKF2_EV_DELAY"></span> 


#### 调参 EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY) is the *Vision Position Estimator delay relative to IMU measurements*. In other words, it is the difference between the vision system timestamp and the "actual" capture time that would have been recorded by the IMU clock (the "base clock" for EKF2).

Technically this can be set to 0 if there is correct timestamping (not just arrival time) and timesync (e.g NTP) between MoCap and (for example) ROS computers. In reality, this may need some empirical tuning becuase delays in the communication chain are very setup-specific. It is rare that a system is setup with an entirely synchronised chain!

该值可以通过不同的参数一起调整，在动态变化中来保证最低 EKF 。

![ekf2_ev_delay log](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::tip
Note A plot of external data vs. onboard estimate (as above) can be generated using [FlightPlot](../log/flight_log_analysis.md#flightplot) or similar flight analysis tools.
:::

The value can further be tuned by varying the parameter to find the value that yields the lowest EKF innovations during dynamic maneuvers.

<span id="verify_estimate"></span> 


## 检查/验证 VIO 预估

Perform the following checks to verify that VIO is working properly *before* your first flight:

* Set the PX4 parameter `MAV_ODOM_LP` to 1. PX4 will then stream back the received external pose as MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) messages. You can check these MAVLink messages with the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)

* Yaw the vehicle until the quaternion of the `ODOMETRY` message is very close to a unit quaternion (w=1, x=y=z=0).
  
    * At this point the body frame is aligned with the reference frame of the external pose system.
  * If you do not manage to get a quaternion close to the unit quaternion without rolling or pitching your vehicle, your frame probably still has a pitch or roll offset. Do not proceed if this is the case and check your coordinate frames again.
* Once aligned you can pick the vehicle up from the ground and you should see the position's z coordinate decrease. Moving the vehicle in forward direction, should increase the position's x coordinate. While moving the vehicle to the right should increase the y coordinate.

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
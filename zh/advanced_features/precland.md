# 精准着陆

PX4 支持多旋翼精准着陆（从 PX4 1.7.4版本），这一功能使用 [IR-LOCK 传感器](https://irlock.com/products/ir-lock-sensor-precision-landing-kit)和 IR 信标（如 [ IR-LOCK MarkOne ](https://irlock.com/collections/markone) ）以及朝下的距离传感器。 这使飞行器能以约 10 cm 的精度着陆（相比之下，GPS 的精度可能达到几米）。

精准着陆可由切换至 *精准着陆* 飞行模式或作为 [任务](#mission) 的一部分来启动。

## 设置

### 硬件安装

按照官方指南安装 IR-LOCK 传感器。 确保传感器的 x 轴与飞行器的 y 轴对齐，并且传感器的 y 轴与飞行器的 x 方向对齐（如果摄像头从正面朝下倾斜 90 度，则会出现这种情况）。

安装 [范围/距离传感器](../getting_started/sensor_selection.md#distance)（已发现 * LidarLite v3 * 效果良好）。

> **Note**许多基于红外线的距离传感器在 IR-LOCK 信标存在的情况下表现不佳。 有关其他兼容传感器，请参阅 IR-LOCK 指南。

### 固件配置

精确着陆需要模块 ` irlock ` 和 ` landing_target_estimator ` ，默认情况下不包含在 PX4 固件中。 可以通过在飞行控制器的相关[配置](https://github.com/PX4/Firmware/tree/master/cmake/configs)，即 编译脚本 和 启动脚本 中添加（或取消注释）以下行来包含它们：

    drivers/irlock
    modules/landing_target_estimator
    

这两个模块也应该在系统启动时启动。 有关说明，请参阅：[自定义系统启动](https://dev.px4.io/en/advanced/system_startup.html#starting-additional-applications)。

## 软件配置（参数）

使用` landing_target_estimator `和` navigator `参数配置精准着陆，这些参数分别在“Landing target estimator”和“Precision land”组中找到。 最重要的参数将在下面讨论。

参数[ LTEST_MODE ](../advanced_config/parameter_reference.md#LTEST_MODE) 决定信标是被认为静止的还是移动的。 如果 <LT> LTEST_MODE </code>被设置为移动的（例如，它所安装得多旋翼飞行器将要在运动车辆上着陆），则信标测量仅用于在精准着陆控制器中产生位置设定点。 如果<LT> LTEST_MODE </code> 被设置为静止得，则飞行器位置估计器（EKF2 或 LPE）也使用信标测量结果。

参数[ LTEST_SCALE_X ](../advanced_config/parameter_reference.md#LTEST_SCALE_X) 和 [ LTEST_SCALE_Y ](../advanced_config/parameter_reference.md#LTEST_SCALE_Y) 可用于在估计信标相对于飞行器的位置和速度之前对信标测量结果进行缩放。 由于 IR-LOCK 传感器的镜头失真，可能需要进行测量缩放。 注意，在传感器坐标系中考虑` LTEST_SCALE_X `和` LTEST_SCALE_Y `，而不是飞行器坐标系。

To calibrate these scale parameters, set `LTEST_MODE` to moving, fly your multicopter above the beacon and perform forward-backward and left-right motions with the vehicle, while [logging](https://dev.px4.io/en/log/logging.html#configuration) `landing_target_pose` and `vehicle_local_position`. Then, compare `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel` to `vehicle_local_position.vx` and `vehicle_local_position.vy`, respectively (both measurements are in NED frame). If the estimated beacon velocities are consistently smaller or larger than the vehicle velocities, adjust the scale parameters to compensate.

If you observe slow sideways oscillations of the vehicle while doing a precision landing with `LTEST_MODE` set to stationary, the beacon measurements are likely scaled too high and you should reduce the scale parameter in the relevant direction.

## Precision Land Modes

A precision landing can be configured to either be "required" or "opportunistic". The choice of mode affects how a precision landing is performed.

### Required Mode

In *Required Mode* the vehicle will search for a beacon if none is visible when landing is initiated. The vehicle will perform a precision landing if a beacon is located.

The search procedure consists of climbing to the search altitude ([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). If the beacon is still not visible at the search altitude and after a search timeout ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT)), a normal landing is initiated at the current position.

### Opportunistic Mode

In *Opportunistic Mode* the vehicle will use precision landing *if* (and only if) the beacon is visible when landing is initiated. If it is not visible the vehicle immediately performs a *normal* landing at the current position.

## Performing a Precision Landing

> **Note** Due to a limitation in the current implementation of the position controller, precision landing is only possible with a valid global position.

### Via Command

Precision landing can be initiated through the command line interface with

    commander mode auto:precland
    

In this case, the precision landing is always considered "required".

### In a Mission {#mission}

Precision landing can be initiated as part of a [mission](../flying/missions.md) using [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) with `param2` set appropriately:

- `param2` = 0: Normal landing without using the beacon.
- `param2` = 1: *Opportunistic* precision landing.
- `param2` = 2: *Required* precision landing.

## 仿真

Precision landing with the IR-LOCK sensor and beacon can be simulated in [SITL Gazebo](https://dev.px4.io/en/simulation/gazebo.html).

To start the simulation with the world that contains a IR-LOCK beacon and a vehicle with a range sensor and IR-LOCK camera, run:

    make px4_sitl gazebo_iris_irlock
    

You can change the location of the beacon either by moving it in the Gazebo GUI or by changing its location in the [Gazebo world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42).

## Operating Principles

### Landing Target Estimator

The `landing_target_estimator` takes measurements from the `irlock` driver as well as the estimated terrain height to estimate the beacon's position relative to the vehicle.

The measurements in `irlock_report` contain the tangent of the angles from the image center to the beacon. In other words, the measurements are the x and y components of the vector pointing towards the beacon, where the z component has length "1". This means that scaling the measurement by the distance from the camera to the beacon results in the vector from the camera to the beacon. This relative position is then rotated into the north-aligned, level body frame using the vehicle's attitude estimate. Both x and y components of the relative position measurement are filtered in separate Kalman Filters, which act as simple low-pass filters that also produce a velocity estimate and allow for outlier rejection.

The `landing_target_estimator` publishes the estimated relative position and velocity whenever a new `irlock_report` is fused into the estimate. Nothing is published if the beacon is not seen or beacon measurements are rejected. The landing target estimate is published in the `landing_target_pose` uORB message.

### Enhanced Vehicle Position Estimation

If the beacon is specified to be stationary using the parameter `LTEST_MODE`, the vehicle's position/velocity estimate can be improved with the help of the beacon measurements. This is done by fusing the beacon's velocity as a measurement of the negative velocity of the vehicle.

### Precision Land Procedure

The precision land procedure consists of three phases:

1. **Horizontal approach:** The vehicle approaches the beacon horizontally while keeping its current altitude. Once the position of the beacon relative to the vehicle is below a threshold ([PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)), the next phase is entered. If the beacon is lost during this phase (not visible for longer than [PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

2. **Descent over beacon:** The vehicle descends, while remaining centered over the beacon. If the beacon is lost during this phase (not visible for longer than `PLD_BTOUT`), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

3. **Final approach:** When the vehicle is close to the ground (closer than [PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), it descends while remaining centered over the beacon. If the beacon is lost during this phase, the descent is continued independent of the kind of precision landing.

Search procedures are initiated in 1. and 2. a maximum of [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH) times.

![Precision Landing Flow Diagram](../../assets/precision_land/precland-flow-diagram.png)
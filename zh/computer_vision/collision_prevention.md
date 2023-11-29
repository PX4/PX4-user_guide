# 防撞功能

_Collision Prevention_ may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes_mc/position.md), and can use sensor data from an offboard companion computer, offboard rangefinders over MAVLink, a rangefinder attached to the flight controller, or any combination of the above.

如果传感器的测量范围不够大，防撞功能可能会限制无人机的最大飞行速度。 它也会阻止在没有传感器数据的方向上运动（例如：如果后方没有传感器数据，将无法向后方飞行 ）。

:::tip
如果高速飞行至关重要，请在不需要时考虑关闭防撞功能。
:::

:::tip
确保您想要飞行的所有方向上都有传感器或传感器数据(当使能防撞功能时)。
:::

## 综述

_Collision Prevention_ is enabled on PX4 by setting the parameter for minimum allowed approach distance ([CP_DIST](#CP_DIST)).

该功能需要外部系统提供的障碍物信息（发送的 MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) 消息）和或一个连接到飞控的[距离传感器](../sensor/rangefinders.md)。

:::note
Multiple sensors can be used to get information about, and prevent collisions with, objects _around_ the vehicle. If multiple sources supply data for the _same_ orientation, the system uses the data that reports the smallest distance to an object.
:::

为了在靠近障碍物时减速，无人机限制了最大速度，并且在达到最小允许间距时停止移动。 为了远离（或与之平行的）障碍物，用户必须使无人机/无人车朝向不靠近障碍物的设定点移动。 如果存在一个”更好”的设定点，这个设定点在请求设定点的任何一侧，并且在固定的间隙内，算法将对设定点方向做最小的调整。

Users are notified through _QGroundControl_ while _Collision Prevention_ is actively controlling velocity setpoints.

PX4 软件配置在下一章节中。 如果您准备使用距离传感器连接到飞控上来防撞，可能需要按照[PX4 距离传感器](#rangefinder)中的说明描述来安装配置。 如果使用机载计算机提供障碍物信息，请参阅[机载计算机设置](#companion)。

## PX4 (软件) 设置

Configure collision prevention by [setting the following parameters](../advanced_config/parameters.md) in _QGroundControl_:

| 参数                                                                                                  | 描述                                                                                                                                        |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CP_DIST"></a>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)               | 设置最小允许距离（无人机/无人车可以接近障碍物的最近距离）。 Set negative to disable _collision prevention_. <br>>**警告** 此值是相对传感器的距离，而不是相对机身或者螺旋桨外部的距离。 确保一个安全距离。 |
| <a id="CP_DELAY"></a>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)             | 设置传感器和速度设定值跟踪延迟。 查看下面的 [延迟调整](#delay_tuning)。                                                                                             |
| <a id="CP_GUIDE_ANG"></a>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)   | 如果在该方向上发现的障碍物较少，则设置无人机/无人车可能偏离的角度（在指令方向的两侧）。 请参阅下面的[制导调整](#angle_change_tuning)。                                                          |
| <a id="CP_GO_NO_DATA"></a>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | 设置为 1 可以使无人机/无人车在没有传感器覆盖的方向移动（默认值是0/`False`）。                                                                                             |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)   | 设置为 0 或 3 以启用位置模式下的防撞(默认是 4)。                                                                                                             |

<a id="algorithm"></a>

## 算法描述

所有传感器的数据融合到机身周围的 36 个扇区中，每个扇区包含传感器数据和上次观测时间信息，或者指示该扇区没有可用数据。 当控制无人机向特定的方向移动时，就会检查该方向半球内的所有扇区，以查看此次移动是否会使机身靠近任何障碍物。 如果是这样，无人机的速度就会受到限制。

该速度限制同时考虑了内速度环和最佳加速度控制器，内速度环由 [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P) 参数来调整，最佳加速度控制器由 <0>MPC_JERK_MAX</0> 和 <0>MPC_ACC_HOR</0> 两个参数来调整。 限制速度，以便无人机及时停止以保持在 [CP_DIST](#CP_DIST) 这个参数指定的距离。 还考虑到每个扇区的传感器范围，通过相同的机制限制了速度。

:::note
如果在特定的方向上没有传感器数据，则该方向的速度会被限制为 0（防止机身撞到看不见的物体）。 如果想要在没有传感器覆盖范围的方向自由移动，这可以将 [CP_GO_NO_DATA](#CP_GO_NO_DATA) 设置为 1 来使能。
:::

通过 [ CP_DELAY ](#CP_DELAY) 参数保守地估计机身跟踪速度设定点和从外部来源接收传感器数据中的延迟。 应该将 [调整到](#delay_tuning) 特定的机型。

根据边余量的大小，邻近的扇区比命令扇区“更好”，则可以按 [CP_GUIDE_ANG](#CP_GUIDE_ANG) 指定的角度修改请求输入的方向。 这有助于微调用户输入，以“引导”机身绕过障碍物，而不是卡在障碍物上。

<a id="data_loss"></a>

### 航程数据丢失

If the autopilot does not receive range data from any sensor for longer than 0.5s, it will output a warning _No range data received, no movement allowed_. 这会导致强制将 xy 的速度设置为 0。 After 5 seconds of not receiving any data, the vehicle will switch into [HOLD mode](../flight_modes_mc/hold.md). If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes_mc/position.md) (e.g. to _Altitude mode_ or _Stabilized mode_).

如果连接了多个传感器，但是其中有一个传感器失去连接，仍然能够在有传感器数据上报的视野（FOV）范围内飞行。 故障传感器的数据会失效，并且该传感器覆盖的区域会被视为未覆盖区域，意味着无法移动到该区域。

:::warning
使能参数 [CP_GO_NO_DATA=1](#CP_GO_NO_DATA) 时要小心，这会使无人机飞出传感器覆盖的区域。 如果多个传感器中有一个失去连接，故障传感器所覆盖的区域将被视为未覆盖，可以在该区域移动不受限制。
:::

<a id="delay_tuning"></a>

### CP_DELAY 延迟调整

There are two main sources of delay which should be accounted for: _sensor delay_, and vehicle _velocity setpoint tracking delay_. 这两个延迟来源都可以通过 [CP_DELAY](#CP_DELAY) 这个参数来调整。

The _sensor delay_ for distance sensors connected directly to the flight controller can be assumed to be 0. 对于外部视觉系统，传感器延迟可能高达 0.2秒。

Vehicle _velocity setpoint tracking delay_ can be measured by flying at full speed in [Position mode](../flight_modes_mc/position.md), then commanding a stop. 然后可以从日志中测量实际速度和速度设置值之间的延迟。 跟踪延迟通常在 0.1 至 0.5秒之间，取决于机身尺寸和调试情况。

:::tip
如果车速在接近障碍物时发生振荡（即减速，加速，减速），则延迟设置太高。
:::

<a id="angle_change_tuning"></a>

### CP_GUIDE_ANG 制导调试

取决于机身，环境类型和飞行员技能，可能需要不同数量的制导。 将 [CP_GUIDE_ANG](#CP_GUIDE_ANG) 参数设置为 0 将禁用制导，从而使得无人机只能在正确的方向上移动。 增大此参数将使无人机选择最佳方向来避开障碍物，从而更容易飞过狭窄的间隙，并与物体周围保持最小间距。

如果该参数设置太小，机身在靠近障碍物时可能会感觉“卡住”， 因为只允许以最小距离远离障碍物移动。 如果该参数设置太大，机身可能会感觉它朝着飞手未指示的方向“滑动”远离障碍物。 从测试来看，尽管不同的车辆可能有不同的要求，但是 30度是一个很好的平衡点。

:::note
制导功能绝不会把无人机/无人车引导到没有传感器数据的方向。
如果只有一个距离传感器指向前方时无人机感到“卡住”，这可能是因为由于缺乏信息，制导无法安全地调整方向。
:::

<a id="rangefinder"></a>

## PX4 距离传感器

### Lanbao PSK-CM8JL65-CC5

使用 [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) 红外距离传感器对PX4的防撞功能来说“开箱即用”，最少的额外配置就可以使用。

- 首先，[连接和配置传感器](../sensor/cm8jl65_ir_distance_sensor.md),  使能防撞功能（如上所述，使用 [CP_DIST](#CP_DIST) 参数）。
- 使用参数 [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0) 设置传感器方向。

### LightWare LiDAR SF45 Rotating Lidar

PX4 v1.14 (and later) supports the [LightWare LiDAR SF45](https://www.lightwarelidar.com/shop/sf45-b-50-m/) rotating lidar which provides 320 degree sensing.

The SF45 must be connected via a UART/serial port and configured as described below (In addition to the [collision prevention setup](#px4-software-setup)).

[LightWare Studio](https://www.lightwarelidar.com/resources-software) configuration:

- In the LightWare Studio app enable scanning, set the scan angle, and change the baud rate to `921600`.

PX4 Configuration:

- Add the [lightware_sf45_serial](../modules/modules_driver_distance_sensor.md#lightware-sf45-serial) driver in [menuconfig](../hardware/porting_guide_config.md#px4-menuconfig-setup):
  - Under **drivers > Distance sensors** select `lightware_sf45_serial`.
  - Recompile and upload to the flight controller.
- [Set the following parameters](../advanced_config/parameters.md) via QGC:
  - [SENS_EN_SF45_CFG](../advanced_config/parameter_reference.md#SENS_EN_SF45_CFG): Set to the serial port you have the sensor connected to. Make sure GPS or Telemetry are not enabled on this port.
  - [SF45_ORIENT_CFG](../advanced_config/parameter_reference.md#SF45_ORIENT_CFG): Set the orientation of the sensor (facing up or down)
  - [SF45_UPDATE_CFG](../advanced_config/parameter_reference.md#SF45_UPDATE_CFG): Set the update rate
  - [SF45_YAW_CFG](../advanced_config/parameter_reference.md#SF45_YAW_CFG): Set the yaw orientation

In QGroundControl you should see an [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message in the [MAVLink console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) if collision prevention is configured correctly and active.

The obstacle overlay in QGC will look like this:

![sf45](../../assets/sf45/sf45_obstacle_map.png)

### Rangefinder Support

其他传感器的使能需要修改驱动代码来设置传感器方向和视觉范围。

- 在特定端口上连接并配置距离传感器（请参阅[特殊传感器文档](../sensor/rangefinders.md)），并使用[ CP_DIST ](#CP_DIST)使能防撞功能。
- 修改驱动程序以设置方向。 This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor _module.yaml_ file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the _field of view_ in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
您可以从 [功能 PR](https://github.com/PX4/PX4-Autopilot/pull/12179) 中看到所需的修改。 请回馈你的更改！
:::

<a id="companion"></a>

## 机载计算机设置

如果使用机载计算机或者外部传感器，需要提供 [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) 消息流，该消息流反映检测到障碍物的时间和位置。

The minimum rate at which messages _must_ be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

:::note
系统在初始测试时，无人机以 4m/s的速度移动，并且以 10Hz（视觉系统支持的最大速率）的频率发送`OBSTACLE_DISTANCE` 消息。 在更高的速度或更低的距离信息更新频率下，该系统应该也能达到不错的效果。
:::

The tested companion software is the _local_planner_ from the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo. 关于硬件和软件配置的更多信息请查看链接：[PX4/avoidance > Run on Hardware](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- hardware platform used for testing not readily available, so have removed -->

软硬件的配置应遵照 [PX4/avoidance](https://github.com/PX4/PX4-Avoidance) 代码仓库的说明。 In order to emit `OBSTACLE_DISTANCE` messages you must use the _rqt_reconfigure_ tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo设置

_Collision Prevention_ can also be tested using Gazebo. 设置方法请遵照[PX4/avoidance](https://github.com/PX4/PX4-Avoidance)的说明。

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->
<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->

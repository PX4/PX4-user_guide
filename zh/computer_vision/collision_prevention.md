# 防撞功能

*防撞*功能用于自动减速或制动，以免飞机撞上障碍物。

避障功能可以在多旋翼的[位置模式](../flight_modes/position_mc.md)中使能，并且可以使用来自外接配套计算机，外接支持MAVLink协议的测距仪，连接到飞控的测距仪或者以上任意组合的传感器数据。

如果传感器的测量范围不够大，避障功能可能会限制无人机的最大飞行速度。 它也会阻止在没有传感器数据的方向上运动。（例如：如果后方没有传感器数据，将无法向后方飞行 ）。

> **提示** 如果高速飞行至关重要，请在不需要时考虑关闭避障功能。

<span></span>

> **提示** 确保您想要飞行的所有方向上都有传感器或传感器数据(当使能避障功能时)。

## 综述

通过设置参数[CP_DIST](#CP_DIST) 最小安全距离来使能PX4上的*避障*功能。

该功能需要外部系统提供的障碍物信息（发送的MAVLink[OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE)消息）和/或一个连接到飞控的[距离传感器](../sensor/rangefinders.md)（distance sensor）。

> **注意**多个传感器可用于获取机身周围物体的信息并避障。 如果多个数据源提供*相同*的方向数据，系统将使用离物体最小距离的数据。

为了在靠近障碍物时减速，无人机/无人车限制了最大速度，并且在达到最小允许间距时停止移动。 为了远离（或与之平行的）障碍物，用户必须使无人机/无人车朝向不靠近障碍物的设定点移动。 如果存在一个“更好”的设定点，这个设定点在请求设定点的任何一侧，并且在固定的间隙内，算法将对设定点方向做最小的调整。

当*避障*功能正在主动控制速度设定值，用户就会通过*QGroundControl*地面站收到通知。

PX4软件的安装配置在下一章节中。 如果您准备使用距离传感器连接到飞控上来避障，可能需要按照[PX4 距离传感器](#rangefinder)中的说明描述来安装配置。 如果使用机载计算机提供障碍物信息，请参阅[机载计算机安装配置](#companion)。

## PX4 (软件) 设置

配置避障功能需要通过[QGroundControl](../advanced_config/parameters.md)地面站来设置以下参数：

| 参数                                                                                                  | 描述                                                                                                    |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| <span id="CP_DIST"></span>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)               | 设置最小允许距离（无人机/无人车可以接近障碍物的最近距离）。 设置为负值将禁用 *防撞* 功能。   
> **警告** 此值是相对传感器的距离，而不是相对机身或者螺旋桨的外部距离。 确保一个安全距离。 |
| <span id="CP_DELAY"></span>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)             | 设置传感器和速度设定值跟踪延迟。 查看下面的 [延迟调整](#delay_tuning)。                                                         |
| <span id="CP_GUIDE_ANG"></span>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)   | 如果在该方向上发现的障碍物较少，则设置无人机/无人车可能偏离的角度（在指令方向的两侧）。 请参阅下面的[制导调整](#angle_change_tuning)。                      |
| <span id="CP_GO_NO_DATA"></span>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | 设置为1可以使无人机/无人车在没有传感器覆盖的方向移动（默认值是0/`False`）。                                                           |

<span id="algorithm"></span>

## 算法描述

所有传感器的数据融合到机身周围的36个扇区中，每个扇区包含传感器数据和上次观测时间信息，或者指示该扇区没有可用数据。 When the vehicle is commanded to move in a particular direction, all sectors in the hemisphere of that direction are checked to see if the movement will bring the vehicle closer to any obstacles. If so, the vehicle velocity is restricted.

This velocity restriction takes into account both the inner velocity loop tuned by [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P), as well as the [jerk-optimal velocity controller](../config_mc/mc_jerk_limited_type_trajectory.md) via [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR). The velocity is restricted such that the vehicle will stop in time to maintain the distance specified in [CP_DIST](#CP_DIST). The range of the sensors for each sector is also taken into account, limiting the velocity via the same mechanism.

> **Note** If there is no sensor data in a particular direction, velocity in that direction is restricted to 0 (preventing the vehicle from crashing into unseen objects). If you wish to move freely into directions without sensor coverage, this can be enabled by setting [CP_GO_NO_DATA](#CP_GO_NO_DATA) to 1.

Delay, both in the vehicle tracking velocity setpoints and in receiving sensor data from external sources, is conservatively estimated via the [CP_DELAY](#CP_DELAY) parameter. This should be [tuned](#delay_tuning) to the specific vehicle.

If the sectors adjacent to the commanded sectors are 'better' by a significant margin, the direction of the requested input can be modified by up to the angle specified in [CP_GUIDE_ANG](#CP_GUIDE_ANG). This helps to fine-tune user input to 'guide' the vehicle around obstacles rather than getting stuck against them.

<span id="data_loss"></span>

### Range Data Loss

If the autopilot does not receive range data from any sensor for longer than 0.5s, it will output a warning *No range data received, no movement allowed*. This will force the velocity setpoints in xy to zero. After 5 seconds of not receiving any data, the vehicle will switch into [HOLD mode](../flight_modes/hold.md). If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes/position_mc.md) (e.g. to *Altitude mode* or *Stabilized mode*).

If you have multiple sensors connected and you lose connection to one of them, you will still be able to fly inside the field of view (FOV) of the reporting sensors. The data of the faulty sensor will expire and the region covered by this sensor will be treated as uncovered, meaning you will not be able to move there.

> **Warning** Be careful when enabling [CP_GO_NO_DATA=1](#CP_GO_NO_DATA), which allows the vehicle to fly outside the area with sensor coverage. If you lose connection to one of multiple sensors, the area covered by the faulty sensor is also treated as uncovered and you will be able to move there without constraint.

<span id="delay_tuning"></span>

### CP_DELAY 延迟调整

There are two main sources of delay which should be accounted for: *sensor delay*, and vehicle *velocity setpoint tracking delay*. Both sources of delay are tuned using the [CP_DELAY](#CP_DELAY) parameter.

The *sensor delay* for distance sensors connected directly to the flight controller can be assumed to be 0. For external vision-based systems the sensor delay may be as high as 0.2s.

Vehicle *velocity setpoint tracking delay* can be measured by flying at full speed in [Position mode](../flight_modes/position_mc.md), then commanding a stop. The delay between the actual velocity and the velocity setpoint can then be measured from the logs. The tracking delay is typically between 0.1 and 0.5 seconds, depending on vehicle size and tuning.

> **Tip** If vehicle speed oscillates as it approaches the obstacle (i.e. it slows down, speeds up, slows down) the delay is set too high.

<span id="angle_change_tuning"></span>

### CP_GUIDE_ANG Guidance Tuning

Depending on the vehicle, type of environment and pilot skill different amounts of guidance may be desired. Setting the [CP_GUIDE_ANG](#CP_GUIDE_ANG) parameter to 0 will disable the guidance, resulting in the vehicle only moving exactly in the directions commanded. Increasing this parameter will let the vehicle choose optimal directions to avoid obstacles, making it easier to fly through tight gaps and to keep the minimum distance exactly while going around objects.

If this parameter is too small the vehicle may feel 'stuck' when close to obstacles, because only movement away from obstacles at minimum distance are allowed. If the parameter is too large the vehicle may feel like it 'slides' away from obstacles in directions not commanded by the operator. From testing, 30 degrees is a good balance, although different vehicles may have different requirements.

> **Note** The guidance feature will never direct the vehicle in a direction without sensor data. If the vehicle feels 'stuck' with only a single distance sensor pointing forwards, this is probably because the guidance cannot safely adapt the direction due to lack of information.

<span id="rangefinder"></span>

## PX4距离传感器

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using [CP_DIST](#CP_DIST)).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

Other sensors may be enabled, but this requires modification of driver code to set the sensor orientation and field of view.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using [CP_DIST](#CP_DIST).
- Modify the driver to set the orientation. This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor *module.yaml* file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the *field of view* in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

> **Tip** You can see the required modifications from the [feature PR](https://github.com/PX4/PX4-Autopilot/pull/12179). Please contribute back your changes!

<span id="companion"></span>

## 机载计算机设置

If using a companion computer or external sensor, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages, which should reflect when and where obstacle were detected.

消息发送的最低频率*必须*由飞机速度决定 - 频率越高留给载具识别障碍物的反应时间越长。

> **Info** Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 10Hz (the maximum rate supported by the vision system). 在更高的速度或更低的距离信息更新频率下，该系统应该也能达到不错的效果。

The tested companion software is the *local_planner* from the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo. For more information on hardware and software setup see: [PX4/avoidance > Run on Hardware](https://github.com/PX4/avoidance#run-on-hardware). <!-- hardware platform used for testing not readily available, so have removed -->

软硬件的配置应遵照 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 代码仓库的说明。 要发出 `OBSTACLE_DISTANCE`消息，必须使用*rqt_reconfigure*工具，并将参数`send_obstacles_fcu`设置为true。

## Gazebo设置

*防撞*功能支持Gazebo仿真测试。 设置方法请遵照[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)的说明。

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->

<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->
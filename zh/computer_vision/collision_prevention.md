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

所有传感器的数据融合到机身周围的36个扇区中，每个扇区包含传感器数据和上次观测时间信息，或者指示该扇区没有可用数据。 当控制无人机/无人车向特定的方向移动时，就会检查该方向半球内的所有扇区，以查看此次移动是否会使机身靠近任何障碍物。 如果是这样，无人机/无人车的速度就会受到限制。

该速度限制同时考虑了内速度环和最佳加速度控制器，内速度环由[MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P)参数来调整，最佳加速度控制器由<0>MPC_JERK_MAX</0>和<0>MPC_ACC_HOR</0>两个参数来调整。 限制速度，以便无人机/无人车及时停止以保持在[CP_DIST](#CP_DIST)这个参数指定的距离。 还考虑到每个扇区的传感器范围，通过相同的机制限制了速度。

> **注意**如果在特定的方向上没有传感器数据，则该方向的速度会被限制为0（防止机身撞到看不见的物体）。 如果想要在没有传感器覆盖范围的方向自由移动，这可以将[CP_GO_NO_DATA](#CP_GO_NO_DATA) 设置为 1来使能。

通过 CP_DELAY </ 0>参数保守地估计机身跟踪速度设定点和从外部来源接收传感器数据中的延迟。 应该将 [调整到](#delay_tuning) 个特定的机型。</p> 

根据边余量的大小，邻近的扇区比命令扇区更好，则可以按[CP_GUIDE_ANG](#CP_GUIDE_ANG)指定的角度修改请求输入的方向。 这有助于微调用户输入，以“引导”机身绕过障碍物，而不是卡在障碍物上。

<span id="data_loss"></span>

### 航程数据丢失

如果自驾仪超过0.5秒没有收到传感器的航程数据，自驾仪将会发出警告*没有航程数据，不允许移动*。 这会导致强制将xy的速度设置为0。 5秒没有收到任何数据，无人机/无人车会切换到[保持模式](../flight_modes/hold.md) 如果想要机身再次移动，则需要禁止避障功能，禁止避障功能可以通过设置[CP_DIST](#CP_DIST)为负值或者切换到[位置模式](../flight_modes/position_mc.md)以外的模式（例如：切换到*高度模式*或者*自稳模式*）。

如果连接了多个传感器，但是其中有一个传感器失去连接，仍然能够在有传感器数据上报的视觉范围内飞行。 故障传感器的数据会失效，并且该传感器覆盖的区域会被视为未覆盖区域，意味着无法移动到该区域。

> **警告** 使能参数 [CP_GO_NO_DATA=1](#CP_GO_NO_DATA)时要小心，这会使无人机飞出传感器覆盖的区域。 如果多个传感器中有一个失去连接，故障传感器所覆盖的区域将被视为未覆盖，可以在该区域移动不受限制。

<span id="delay_tuning"></span>

### CP_DELAY 延迟调整

延迟的主要来源有两个：*传感器延迟*和机身*速度设定点跟踪延迟*。 这两个延迟来源都可以通过[CP_DELAY](#CP_DELAY)这个参数来调整。

连接到飞控的距离传感器的*传感器延迟*可以假定为0。 对于外部视觉系统，传感器延迟可能高达0.2秒。

无人机/无人车的*速度设定点跟踪延迟*可以通过在<0>位置模式</0>下全速飞行，然后停止这种方式来测量。 然后可以从日志中测量实际速度和速度设置值之间的延迟。 跟踪延迟通常在0.1至0.5秒之间，取决于机身尺寸和调试情况。

> **提示**如果车速在接近障碍物时发生振荡（即减速，加速，减速），则延迟设置太高。

<span id="angle_change_tuning"></span>

### CP_GUIDE_ANG 制导调整

取决于机体，环境类型和飞行员技能，可能需要不同数量的制导。 将 [CP_GUIDE_ANG](#CP_GUIDE_ANG) 参数设置为 0 将禁用制导，从而使得无人机/无人车只能在正确的方向上移动。 增大此参数将使无人机选择最佳方向来避开障碍物，从而更容易飞过狭窄的间隙，并与物体周围保持最小间距。

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

> **提示** 您可以从 [功能PR](https://github.com/PX4/PX4-Autopilot/pull/12179) 中看到所需的修改。 请回馈你的更改！

<span id="companion"></span>

## 机载计算机设置

如果使用机载计算机或者外部传感器，需要提供[OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE)消息流，该消息流反映检测到障碍物的时间和位置。

消息发送的最低频率*必须*由飞机速度决定 - 频率越高留给载具识别障碍物的反应时间越长。

> **信息**系统在初始测试时，机身以4m/s的速度移动，并且以10Hz(视觉系统支持的最大速率)的频率发送`OBSTACLE_DISTANCE`消息。 在更高的速度或更低的距离信息更新频率下，该系统应该也能达到不错的效果。

配套的测试软件是[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)仓库中的*local_planner*。 关于硬件和软件安装调试的更多信息请查看链接：[PX4/avoidance > Run on Hardware](https://github.com/PX4/avoidance#run-on-hardware). <!-- hardware platform used for testing not readily available, so have removed -->

软硬件的配置应遵照 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 代码仓库的说明。 要发出 `OBSTACLE_DISTANCE`消息，必须使用*rqt_reconfigure*工具，并将参数`send_obstacles_fcu`设置为true。

## Gazebo设置

*防撞*功能支持Gazebo仿真测试。 设置方法请遵照[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)的说明。

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->

<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->
# 距离传感器（测距仪）

距离传感器提供的距离测量可用于[地形跟随](../flying/terrain_following_holding.md#terrain_following)、[地形保持](../flying/terrain_following_holding.md#terrain_hold)（即精确悬停拍摄）、改善着陆行为（[距离辅助](../flying/terrain_following_holding.md#range_aid)）、监管高度限制警告、碰撞预防等。

本节列出了PX4支持的距离传感器（链接到更详细的文档）、所有测距仪所需的[通用配置](#configuration)、[测试](#testing)和[模拟](#simulation)信息。 更详细的设置和配置信息在下方（和侧边栏）的主题链接中提供

<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_v3.jpg" alt="Lidar Lite V3" width="200px" /><img src="../../assets/hardware/sensors/lidar_lightware/sf11c_120_m.jpg" alt="LightWare SF11/C Lidar" width="200px" /><img src="../../assets/hardware/sensors/optical_flow/ark_flow_distance_sensor.jpg" alt="ARK Flow" width="200px" />

## 支持的测距仪

### ARK Flow

[ARK Flow](../uavcan/ark_flow.md) 是一个开源的飞行时间 (ToF) 和光流模块, 能够测量从 8cm 到 30m 的距离. 它可以通过CAN1接口连接至飞控，允许通过CAN2接口添加传感器。 它运行 PX4 固件，支持U[AVCAN](../uavcan/README.md) [固件更新](../uavcan/node_firmware.md)，并被打包成一个小尺寸。

### Holybro ST VL53L1X 激光雷达

[VL53L1X](http://www.holybro.com/product/vl53l1x/)是最先进的飞行时间（ToF）激光测距传感器，增强了ST FlightSense™ 产品系列。 它是市场上速度最快的微型 ToF 传感器，精确测距可达 4 m，快速测距频率可达 50 Hz。

它带有一个 JST GHR 4 针连接器，与 [Pixhawk 4](../flight_controller/pixhawk4.md)、[Pixhawk 5X](../flight_controller/pixhawk5x.md)和其他遵循 [Pixhawk 连接器标准](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) 的飞行控制器上的 I2C 端口兼容。

### 激光雷达精简版

[激光雷达精简版](../sensor/lidar_lite.md) 是一款紧凑、高性能的光学远距离测量测距仪。 它的传感器范围为 (5cm - 40m)，可以连接到 PWM 或 I2C 端口。

### MaxBotix I2CXL-MaxSonar-EZ

MaxBotix [I2CXL-MaxSonar-EZ](https://www.maxbotix.com/product-category/i2cxl-maxsonar-ez-products) 测距 有许多基于声纳的相对短程测距仪 ，适用于辅助起飞/着陆和避免碰撞。 这些可以使用 I2C 端口连接。

测距仪通过使用参数[SENS_EN_MB12XX](../advanced_config/parameter_reference.md#SENS_EN_MB12XX)启用。

### Lightware LIDARs

[Lightware SFxx Lidar](../sensor/sfxx_lidar.md) 提供一个宽范围的轻量级激光高度计，适用于许多无人机应用。

PX4 支持: SF11/c 和 SF/LW20. PX4 也可用于一下停产的型号: SF02, SF10/a, SF10/b, SF10/c.

### TeraRanger 测距仪

[TeraRanger](../sensor/teraranger.md) 提供了一些基于红外光飞行时间(ToF)技术的轻量级距离测量传感器。 他们通常比声纳更快、范围更大、比基于激光的系统更小、更轻。

PX4 提供以下通过 I2C总线连接的型号：TeraRanger One, TeraRanger Evo 60m 和 TeraRanger Evo 600Hz。

### Ainstein US-D1 标准雷达高度计

*Ainstein* [US-D1 标准雷达高度计](../sensor/ulanding_radar.md) 是紧凑型的微波测距仪，已经针对无人机做过优化. 它有大约50米的感测范围。 该产品的一个特别优势是它可以在所有天气条件下和所有地形类型（包括水）上有效运行。

### LeddarOne

[LeddarOne](../sensor/leddar_one.md) 是一种小型激光雷达模块，具有窄而漫反射的光束，在一个坚固、可靠、经济高效的组件中提供出色的整体探测范围和性能。 它的遥感范围从1厘米到40米不等，需要与UART/串行总线连接。

### TFmini

[Benewake TFmini Lidar](../sensor/tfmini.md) 是一个的小巧、低成本、低功率的激光测距拥有 12m 的测量范围

### PSK-CM8JL65-CC5

[Lanbao PSK-CM8JL65-CC5 ToF 红外距离测量传感器](../sensor/cm8jl65_ir_distance_sensor.md) 非常小 (38 mm x 18mm x 7mm, <10g) IR distance sensor with a 0.17m-8m range and millimeter resolution. It must be connected to a UART/serial bus.

### Avionics Anonymous UAVCAN 激光高度计接口

[Avionics Anonymous UAVCAN 激光高度计接口](../uavcan/avanon_laser_interface.md) 允许几种常见的测距仪 (例如 [Lightware SF11/c, SF30/D](../sensor/sfxx_lidar.md), 等) 连接到 [UAVCAN](../uavcan/README.md) 总线, 这是一个比 I2C 更强大的接口.

<span id="configuration"></span>

## 配置/设置

测距仪通常连接到串口(PWM)或者 I2C 接口(取决于设备驱动），并通过设置特定的参数在端口上启用。

*每个距离传感器特定的<0>硬件和软件设置将在各自的主题中介绍</p> 

下面给出了*所有距离传感器*的通用配置，包括物理设置和使用。

### 常规配置

通用测距仪配置使用特定的[EKF2*RNG**](../advanced_config/parameter_reference.md#EKF2_RNG_AID)参数。 这些包括（非详尽）：

- [EKF2_RNG_POS_X](../advanced_config/parameter_reference.md#EKF2_RNG_POS_X), [EKF2_RNG_POS_Y](../advanced_config/parameter_reference.md#EKF2_RNG_POS_Y), [EKF2_RNG_POS_Z](../advanced_config/parameter_reference.md#EKF2_RNG_POS_Z) - 测距仪在 X、Y、Z 方向上与车辆重心的偏移量。
- [EKF2_RNG_PITCH](../advanced_config/parameter_reference.md#EKF2_RNG_PITCH) - 0 度值（默认值）对应于测距仪与车辆垂直轴精确对齐（即垂直向下），而 90 度表示测距仪指向前方。 如果使用非零间距，则使用简单的三角法计算到地面的距离。
- [EKF2_RNG_DELAY](../advanced_config/parameter_reference.md#EKF2_RNG_DELAY) - 数据从传感器到达估计器的近似延迟。
- [EKF2_RNG_SFE](../advanced_config/parameter_reference.md#EKF2_RNG_SFE) - Range finder range dependant noise scaler.
- [EKF2_RNG_NOISE](../advanced_config/parameter_reference.md#EKF2_RNG_NOISE) - Measurement noise for range finder fusion

## 测试

The easiest way to test the rangefinder is to vary the range and compare to the values detected by PX4. The sections below show some approaches to getting the measured range.

### QGroundControl MAVLink Inspector

The *QGroundControl MAVLink Inspector* lets you view messages sent from the vehicle, including `DISTANCE_SENSOR` information from the rangefinder. The main difference between the tools is that the *Analyze* tool can plot values in a graph.

:::note
The messages that are sent depend on the vehicle configuration. You will only get `DISTANCE_SENSOR` messages if the connected vehicle has a rangefinder installed and is publishing sensor values.
:::

To view the rangefinder output:

1. Open the menu **Q > Select Tool > Analyze Tools**:
    
    ![Menu for QGC Analyze Tool](../../assets/qgc/analyze/menu_analyze_tool.png)

2. Select the message `DISTANCE_SENSOR`, and then check the plot checkbox against `current_distance`. The tool will then plot the result: ![QGC Analyze DISTANCE_SENSOR value](../../assets/qgc/analyze/qgc_analyze_tool_distance_sensor.png)

### QGroundControl MAVLink 控制台

You can also use the *QGroundControl MAVLink Console* to observe the `distance_sensor` uORB topic:

```sh
listener distance_sensor 5
```

:::note
The *QGroundControl MAVLink Console* works when connected to Pixhawk or other NuttX targets, but not the Simulator. On the Simulator you can run the commands directly in the terminal.
:::

For more information see: [Development > Debugging/Logging > Sensor/Topic Debugging using the Listener Command](../debug/sensor_uorb_topic_debugging.md).

## 仿真

Lidar and sonar rangefinders can be used in the [Gazebo Simulator](../simulation/gazebo.md). To do this you must start the simulator using a vehicle model that includes the rangefinder.

The iris optical flow model includes a Lidar rangefinder:

```sh
make px4_sitl gazebo_iris_opt_flow
```

The typhoon_h480 includes a sonar rangefinder:

```sh
make px4_sitl gazebo_typhoon_h480
```

If you need to use a different vehicle you can include the model in its configuration file. You can see how in the respective Iris and Typhoon configuration files:

- [iris_opt_flow.sdf](https://github.com/PX4/sitl_gazebo/blob/master/models/iris_opt_flow/iris_opt_flow.sdf) 
        xml
        <include>
          <uri>model://lidar</uri>
          <pose>-0.12 0 0 0 3.1415 0</pose>
        </include>
        <joint name="lidar_joint" type="revolute">
          <child>lidar::link</child>
          <parent>iris::base_link</parent>
          <axis>
            <xyz>0 0 1</xyz>
            <limit>
              <upper>0</upper>
              <lower>0</lower>
            </limit>
          </axis>
        </joint>

- [typhoon_h480.sdf](https://github.com/PX4/PX4-SITL_gazebo/blob/master/models/typhoon_h480/typhoon_h480.sdf.jinja#L1131-L1145) 
        xml
        <include>
          <uri>model://sonar</uri>
        </include>
        <joint name="sonar_joint" type="revolute">
          <child>sonar_model::link</child>
          <parent>typhoon_h480::base_link</parent>
          <axis>
            <xyz>0 0 1</xyz>
            <limit>
              <upper>0</upper>
              <lower>0</lower>
            </limit>
          </axis>
        </joint>
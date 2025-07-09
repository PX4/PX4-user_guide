---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes_fw/altitude
---

# Altitude Mode (Fixed-wing)

[<img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="所需高度（例如巴罗、测距仪）" width="30px" />](../getting_started/flight_modes.md#altitude_only)

The *Altitude* flight mode makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. 该模式不会试图抵抗风扰保持航向。 The mode will not attempt to hold the vehicle course against wind.

爬升/下沉率通过俯仰/升降舵杆操纵杆来控制。 操纵杆一旦回中，自动驾驶仪就会锁定当前的高度，并在偏航/滚转和任何空速条件下保持高度。

油门通道输入控制空速。  滚动和俯仰是角度控制的（因此不可能实现飞机滚转或环绕）。

当所有遥控输入都居中时（无滚动、俯仰、偏航，油门约 50％），飞机将恢复直线水平飞行（受风影响）并保持其当前高度。

下图直观的显示了该模式（对于一个[美国手的发射机](../getting_started/rc_transmitter_receiver.md#transmitter_modes)）。

![固定翼高度控制](../../assets/flight_modes/altitude_control_mode_fw.png)

## 技术总结

遥控/手动模式，如自稳模式，但具有高度稳定性（杆回中使飞机进入直线和水平飞行并保持当前高度）。 但是飞行过程并不稳定，可能被风吹飘离。

* 回中的滚动/俯仰/偏航输入（在死区内）：
  * 自动驾驶仪使飞机/机翼水平并且维持高度。
  * 如果空速传感器已连接，油门杆控制飞机速度。 Without an airspeed sensor the user cannot control throttle (in which case the vehicle will fly level at trim throttle ([FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM)), increasing or decreasing throttle as needed to climb or descend).
* 外部中心：
  * 俯仰摇杆控制高度。
  * 油门杆控制飞机的空速（如回中输入 横滚/俯仰/偏航）。
  * 横滚摇杆控制横滚角度。 自动驾驶仪将保持 [协调飞行](https://en.wikipedia.org/wiki/Coordinated_flight)。 这和[稳定模式](../flight_modes/stabilized_fw.md)一样。
  * 偏航摇杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 [协调飞行](https://en.wikipedia.org/wiki/Coordinated_flight)）。 这和[稳定模式](../flight_modes/stabilized_fw.md)一样。

:::note

* 需要手动输入（遥控器，或者通过 MAVLink 连接的游戏手柄/拇指摇杆）。
* 通常使用气压计测量高度，在极端天气条件下可能会变的不准确。 带有激光雷达/距离传感器的飞机将能够以更高的可靠性和准确性控制高度。
:::


## 参数

该模式受以下参数影响：

| 参数                                                                                                    | 描述                                                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <a id="FW_AIRSPD_MIN"></a>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)   | 最小空速/油门。 默认：10 m/s。                                                                                                      |
| <a id="FW_AIRSPD_MAX"></a>[FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX)   | 最大空速/油门。 默认：20 m/s。                                                                                                      |
| <a id="FW_AIRSPD_TRIM"></a>[FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) | 巡航速度。 默认：15 m/s。                                                                                                         |
| <a id="FW_MAN_P_MAX"></a>[FW_MAN_P_MAX](../advanced_config/parameter_reference.md#FW_MAN_P_MAX)     | 在高度稳定模式下手动控制的最大俯仰角。 默认：45 度。                                                                                             |
| <a id="FW_MAN_R_MAX"></a>[FW_MAN_R_MAX](../advanced_config/parameter_reference.md#FW_MAN_R_MAX)     | 在高度稳定模式下手动控制的最大滚转角。 默认：45 度。                                                                                             |
| <a id="FW_NPFG_CONTROL"></a>[FW NPFG Control](../advanced_config/parameter_reference.md#fw-npfg-control) | The roll/yaw needed to maintain the commanded altitude and airspeed are also affected by the FW NPFG Control parameters. |



<!-- 
FW notes: 
FW position controller is basically 2 independent pieces
* L1 is for navigation - determines the roll and yaw needed to achieve the desired waypoint (or loiter)
* TECS is for speed and height control - determines throttle and elevator position needed to achieve the commanded altitude and airspeed
Overall that gives you an attitude setpoint (roll, pitch, yaw) and throttle which is sent off to the attitude controller
-->

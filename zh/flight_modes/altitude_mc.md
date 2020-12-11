# 高度模式（多旋翼）

[<img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="所需高度（例如巴罗、测距仪）" width="30px" />](../getting_started/flight_modes.md#altitude_only)

*高度模式*是一个*相对*容易飞的遥控模式，滚转和俯仰杆控制飞机在左右和前后方向上的运动（相对于飞机的“前部”），偏航杆控制水平面上的旋转速度，油门控制上升 -下降的速度。

当杆被释放/回中时，飞机将恢复水平并保持当前的*高度*。 如果在水平面上运动，飞机将继持续运动直到任何动量被风阻力消散。 如果刮风，飞机会向风的方向漂移。

:::tip
*高度模式*是对新手来说最安全的无 GPS 手动模式。 就像[手动/自稳](../flight_modes/manual_stabilized_mc.md)模式，但是在松开摇杆时也可以锁定无人机高度。
:::

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![Altitude Control MC - Mode2 RC Controller](../../assets/flight_modes/altitude_control_mode_copter.png)

## 技术总结

RC/manual mode like [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md) mode but with *altitude stabilization* (centered sticks level vehicle and hold it to fixed altitude).

* 回正摇杆（内带死区）： 
  * RPY摇杆使飞机水平。
  * 油门（~50%）抗风保持当前姿态。
* 外部中心： 
  * 翻滚/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。
  * 油门摇杆以预定的最大速率（和其他轴上的移动速度）控制上升速度。
  * 偏航摇杆控制水平面上方的角度旋转速率。
* 起飞 Takeoff: 
  * When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
* The altitude is normally measured using a barometer, which may become inaccurate in extreme weather conditions. Vehicles that include a LIDAR/range sensor will be able to control altitude with greater reliability and accuracy.
:::

## 参数

The mode is affected by the following parameters:

| 参数                                                                                                          | 描述                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 最大垂直上升速度。 默认：3m/s。                                                                                                                                                                 |
| <span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 最大垂直下降速度。 默认：1m/s。                                                                                                                                                                 |
| <span id="RCX_DZ"></span>`RCX_DZ`                                                                           | 通道X的遥控死区。油门的X值取决于[ RC_MAP_THROTTLE ](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE)的值。 例如，如果油门是通道4，则[RC4_DZ ](../advanced_config/parameter_reference.md#RC4_DZ)指定死区。 |
| <span id="MPC_xxx"></span>`MPC_XXXX`                                                                         | 大多数MPC_xxx参数会影响此模式下的飞行行为（至少在某种程度上）。 例如，[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)定义飞机悬停时的推力。                                                       |
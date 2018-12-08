# Altitude Mode (Multicopter)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" />](../getting_started/flight_modes.md#altitude_only)

*Altitude mode* is a *relatively* easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will level and maintain the current *altitude*. If moving in the horizontal plane the vehicle will continue until any momentum is dissipated by wind resistance. If the wind blows the aircraft will drift in the direction of the wind.

> **Tip** *Altitude mode* is the safest non-GPS manual mode for new fliers. It is just like [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) mode but additionally locks the vehicle altitude when the sticks are released.

下图以可视方式显示模式行为（对于[模式2发送器](../getting_started/rc_transmitter_receiver.md#transmitters-for-aircraft)）。

![Altitude Control MC - Mode2 RC Controller](../../images/flight_modes/altitude_control_mode_copter.png)

## 技术总结

RC/manual mode like [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md) mode but with *altitude stabilization* (centered sticks level vehicle and hold it to fixed altitude).

* Centered sticks (inside deadband): 
  * RPY sticks levels vehicle.
  * Throttle (~50%) holds current altitude steady against wind.
* Outside center: 
  * Roll/Pitch sticks control tilt angle in respective orientations, resulting in corresponding left-right and forward-back movement.
  * Throttle stick controls up/down speed with a predetermined maximum rate (and movement speed in other axes).
  * Yaw stick controls rate of angular rotation above the horizontal plane.

> **注** *可能需要手动输入（遥控器，或通过MAVLink连接的游戏手柄/拇指杆）。 *海拔高度通常使用气压计测量，在极端天气条件下可能会变得不准确。 带有激光雷达/距离传感器的飞机将能够以更高的可靠性和准确性控制高度。

## 参数

该模式受以下参数影响：

| Parameter                                                                                                   | Description                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | Maximum vertical ascent velocity. Default: 3 m/s.                                                                                                                                                                                                                                                     |
| <span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | Maximum vertical descent velocity. Default: 1 m/s.                                                                                                                                                                                                                                                    |
| <span id="RCX_DZ"></span>`RCX_DZ`                                                                           | RC dead zone for channel X. The value of X for throttle will depend on the value of [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE). For example, if the throttle is channel 4 then [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ) specifies the deadzone. |
| <span id="MPC_xxx"></span>`MPC_XXXX`                                                                         | Most of the MPC_xxx parameters affect flight behaviour in this mode (at least to some extent). For example, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) defines the thrust at which a vehicle will hover.                                                              |
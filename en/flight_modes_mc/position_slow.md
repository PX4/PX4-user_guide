# Position Slow Mode (Multicopter)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

_Position Slow_ is a variation of the regular [Position mode](../flight_modes_mc/position.md).
It works the exact same way but with lower maximum velocities.
This is useful to, at the flick of a mode switch enable more precision on the stick input, ensure to not fly too quickly close to obstacles or to comply with regulations like [EASA's low-speed mode/function](https://www.easa.europa.eu/en/light/topics/flying-drones-close-people).

There are three ways to provide limits for slow down.
The vehicle can only be limited to go slower than in _Position_ mode.

## Set Limits using Parameters

Once the vehicle is in _Position Slow_ mode it will slow down from the usual quicker velocities of _Position_ mode down to a slower set of defaults defined by parameters.
For example, the horizontal maximum velocity by default slows down from 10 to 3m/s and the vertical one from 3 to 1m/s.

| Axis                | Position mode                                                               | Position Slow mode                   |
| ------------------- | --------------------------------------------------------------------------- | ------------------------------------ |
| Horizontal velocity | [MPC_VEL_MANUAL][mpc_vel_manual]                                            | [MC_SLOW_DEF_HVEL][mc_slow_def_hvel] |
| Vertical velocity   | [MPC_Z_VEL_MAX_UP][mpc_z_vel_max_up] / [MPC_Z_VEL_MAX_DN][mpc_z_vel_max_dn] | [MC_SLOW_DEF_VVEL][mc_slow_def_vvel] |
| Yaw rate            | [MPC_MAN_Y_MAX][mpc_man_y_max]                                              | [MC_SLOW_DEF_YAWR][mc_slow_def_yawr] |

<!-- links used in table above -->

[mpc_vel_manual]: ../advanced_config/parameter_reference.md#MPC_VEL_MANUAL
[mc_slow_def_hvel]: ../advanced_config/parameter_reference.md#MC_SLOW_DEF_HVEL
[mpc_z_vel_max_up]: ../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP
[mpc_z_vel_max_dn]: ../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN
[mc_slow_def_vvel]: ../advanced_config/parameter_reference.md#MC_SLOW_DEF_VVEL
[mpc_man_y_max]: ../advanced_config/parameter_reference.md#MPC_MAN_Y_MAX
[mc_slow_def_yawr]: ../advanced_config/parameter_reference.md#MC_SLOW_DEF_YAWR

If no other input is present the parameters are used.

## Set Limits using RC Control

You can map a knob on your remote to control the maximum velocity of an axis.
If the knob is at the maximum the vehicle will go as fast as in _Position_ mode, if the knob is turned all the way down the vehicle goes as slow as the minimum parameters allow (see table below).
If an RC knob is mapped for an axis it has priority over all other inputs.

1. Make sure you have a remote with an extra input and an extra RC channel to transmit it's position.
2. Map the channel which contains the knobs position as one of the 6 auxiliary passthrough inputs by setting [RC_MAP_AUXn](../advanced_config/parameter_reference.md#RC_MAP_AUX1) to the corresponding RC channel number.
3. Map that auxiliary input to the slow down of an axis using the paramters in the table below.

| Axis                | Parameter to map auxiliary input     | Parameter for minimum limit          |
| ------------------- | ------------------------------------ | ------------------------------------ |
| Horizontal velocity | [MC_SLOW_MAP_HVEL][mc_slow_map_hvel] | [MC_SLOW_MIN_HVEL][mc_slow_min_hvel] |
| Vertical velocity   | [MC_SLOW_MAP_VVEL][mc_slow_map_vvel] | [MC_SLOW_MIN_VVEL][mc_slow_min_vvel] |
| Yaw rate            | [MC_SLOW_MAP_YAWR][mc_slow_map_yawr] | [MC_SLOW_MIN_YAWR][mc_slow_min_yawr] |

<!-- links used in table above -->

[mc_slow_map_hvel]: ../advanced_config/parameter_reference.md#MC_SLOW_MAP_HVEL
[mc_slow_min_hvel]: ../advanced_config/parameter_reference.md#MC_SLOW_MIN_HVEL
[mc_slow_map_vvel]: ../advanced_config/parameter_reference.md#MC_SLOW_MAP_VVEL
[mc_slow_min_vvel]: ../advanced_config/parameter_reference.md#MC_SLOW_MIN_VVEL
[mc_slow_map_yawr]: ../advanced_config/parameter_reference.md#MC_SLOW_MAP_YAWR
[mc_slow_min_yawr]: ../advanced_config/parameter_reference.md#MC_SLOW_MIN_YAWR

For example, if you want to map RC channel `8` to limit the horizontal velocity you could set [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) to the value `8` and [MC_SLOW_MAP_HVEL][mc_slow_map_hvel] to the value `1`.
The knob from channel 8 then sets a horizontal velocity limit between [MC_SLOW_MIN_HVEL][mc_slow_min_hvel] and [MPC_VEL_MANUAL][mpc_vel_manual].

## Set Limits using MAVLink

You can adjust the velocity limits using the MAVLink message [SET_VELOCITY_LIMITS](https://mavlink.io/en/messages/development.html#SET_VELOCITY_LIMITS).
If this message is received, it contains a non-NAN limit value for an axis and for that axis no RC knob is mapped, then that received limit is used instead of the parameter one.
It can be updated at any time e.g. in a message stream and if not updated anymore stays in effect until the next mode switch.

Note that the telemetry feedback of limits which are currently in effect through [VELOCITY_LIMITS](https://mavlink.io/en/messages/development.html#VELOCITY_LIMITS) is currently not sent out.

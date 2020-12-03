# 起飞模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*起飞*飞行模式使飞机起飞到指定高度并等待进一步指令。

:::note

* This mode requires GPS.
* The vehicle must be armed before this mode can be engaged.
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
* The [Failure Detector](../config/safety.md#failure_detector) will automatically stop the engines if there is a problem on takeoff.
:::

The specific behaviour for each vehicle type is described below.

## 多旋翼（MC）

A multi rotor ascends to the altitude defined in `MIS_TAKEOFF_ALT` and holds position.

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

Takeoff is affected by the following parameters:

| 参数                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 起飞期间的目标高度 (默认值: 2.5 米)                                                                                                                                                                                                                                                                                                                    |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | 上升速度 (默认值: 1.5 m/s)                                                                                                                                                                                                                                                                                                                       |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |

<span id="fixed_wing"></span>

## 固定翼（FW）

The aircraft takes off in the current direction using either *catapult/hand-launch mode* or *runway takeoff mode*. The mode defaults to catapult/hand launch, but can be set to runway takeoff using [RWTO_TKOFF](#RWTO_TKOFF). RC stick movement is ignored in both cases.

<span id="hand_launch"></span>

### Catapult/Hand Launch

In *catapult/hand launch mode* the vehicle waits to detect launch (based on acceleration trigger). On launch it ramps up to full throttle ([RWTO_MAX_THR](#RWTO_MAX_THR)) in about 2 seconds and then performs a full throttle climbout, with *minimum* 10 degree takeoff pitch. Once it reaches [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF) it will transition to [Hold mode](../flight_modes/hold.md) and loiter.

:::note
In addition to the behaviour discussed above there is also a launch detector that may block the launch sequence from starting until some condition is met. For catapult launch this is some acceleration threshold.
:::

<span id="runway_launch"></span>

### Runway Takeoff

The *runway takeoff mode* has the following phases:

1. **Throttle ramp**: Clamped to the runway (pitch fixed, no roll, and heading hold) until reach the minimum airspeed for takeoff ([FW_AIRSPD_MIN](#FW_AIRSPD_MIN) x [RWTO_AIRSPD_SCL](#RWTO_AIRSPD_SCL)).
2. **起飞**：增加俯仰直到飞机高度>导航高度（[ RWTO_NAV_ALT ](#RWTO_NAV_ALT)）。
3. ** 爬出**：爬升至地面以上的高度> [ FW_CLMBOUT_DIFF ](#FW_CLMBOUT_DIFF)。 在此阶段中, 将移除滚转和航向限制。

### Fixed Wing Takeoff Parameters

Takeoff is affected by the following parameters:高于地平面（AGL）的高度，留有足够的离地间隙以允许一些滚转。 在达到` RWTO_NAV_ALT `之前，飞机保持水平，并且仅使用方向舵来保持航向（参见<span id="RWTO_HDG"> </ 1> <a href="../advanced_config/parameter_reference.md#RWTO_HDG"> RWTO_HDG </a>）。 如果<code> FW_CLMBOUT_DIFF </code>> 0，则应低于<code> FW_CLMBOUT_DIFF </code>。</td> </tr> </tbody> </table> 

<p>
  :::note The vehicle always respects normal FW max/min throttle settings during takeoff (<a href="../advanced_config/parameter_reference.md#FW_THR_MIN">FW_THR_MIN</a>, <a href="../advanced_config/parameter_reference.md#FW_THR_MAX">FW_THR_MAX</a>).
:::
</p>

<h2>
  垂直起降（VTOL）
</h2>

<p>
  VTOLs default to MC mode on boot, and it is generally expected that they will take off in <a href="#multi-copter-mc">multicopter mode</a> (and also safer).
</p>

<p>
  That said, if transitioned to Fixed wing before takeoff, they will takeoff in <a href="#fixed_wing">Fixed Wing</a> mode.
</p>

<!-- this maps to AUTO_TAKEOFF in dev -->
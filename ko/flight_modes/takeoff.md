# 이륙 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*이륙* 비행 모드는 기체가 지정된 높이로 상승후, 추가 입력을 기다립니다.

:::note

* 이 모드는 GPS가 필요합니다.
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* 이 모드는 자동입니다. 기체를 제어하기 위해 사용자 개입이 *필요하지* 않습니다.
* RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
* The [Failure Detector](../config/safety.md#failure_detector) will automatically stop the engines if there is a problem on takeoff.
:::

The specific behaviour for each vehicle type is described below.

## 멀티 헬기 (MC)

A multi rotor ascends to the altitude defined in `MIS_TAKEOFF_ALT` and holds position.

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

Takeoff is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 이륙 중 목표 고도 (기본값 : 2.5m)                                                                                                                                                                                                                                                                                                                   |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | 상승 속도 (기본값 : 1.5m / s)                                                                                                                                                                                                                                                                                                                    |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |

<span id="fixed_wing"></span>

## Fixed Wing (FW)

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
2. ** 이륙 </ 0> : 피치를 높이고 기체 고도> 항법 고도 ( RWTO_NAV_ALT </ 1>)까지 계속하십시오.</li> 
    
    * ** 등산 </ 0> :지면 위의 고도  FW_CLMBOUT_DIFF </ 1>까지 상승하십시오. 이 단계에서는 롤 및 제목 제한이 제거됩니다.</li> </ol> 
        
        ### Fixed Wing Takeoff Parameters
        
        Takeoff is affected by the following parameters:
        
        최소 이륙을위한 속도의 스케일링 계수. 피치는 대기 속도에 도달하면 증가합니다 :  FW_AIRSPD_MIN </ 0> * <code> RWTO_AIRSPD_SCL </ 0></td>
</tr>
<tr>
  <td><span id="RWTO_NAV_ALT"></span><a href="../advanced_config/parameter_reference.md#RWTO_NAV_ALT">RWTO_NAV_ALT</a>
</td>
  <td>지면 위의 고도 (AGL). 약간의 굴림을 허용하는 충분한 지상고가 있습니다. <code> RWTO_NAV_ALT </ 0>에 도달 할 때까지 비행기는 수평을 유지하고 표제를 지키기 위해 방향타 만 사용됩니다 (<span id="RWTO_HDG"> <a href="../advanced_config/parameter_reference.md#RWTO_HDG"> RWTO_HDG </ 2> 참조). <code> FW_CLMBOUT_DIFF </ 0>> 0이면 <code> FW_CLMBOUT_DIFF </ 0> 아래에 있어야합니다.</td>
</tr>
</tbody>
</table>

<p>:::note
The vehicle always respects normal FW max/min throttle settings during takeoff (<a href="../advanced_config/parameter_reference.md#FW_THR_MIN">FW_THR_MIN</a>, <a href="../advanced_config/parameter_reference.md#FW_THR_MAX">FW_THR_MAX</a>).
:::</p>

<h2>VTOL</h2>

<p>VTOLs default to MC mode on boot, and it is generally expected that they will take off in <a href="#multi-copter-mc">multicopter mode</a> (and also safer).</p>

<p>That said, if transitioned to Fixed wing before takeoff, they will takeoff in <a href="#fixed_wing">Fixed Wing</a> mode.</p>

<!-- this maps to AUTO_TAKEOFF in dev -->
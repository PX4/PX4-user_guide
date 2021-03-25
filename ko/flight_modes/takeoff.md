# 이륙 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*이륙* 비행 모드는 기체가 지정된 높이로 상승후, 추가 입력을 기다립니다.

:::note

* 이 모드는 GPS가 필요합니다.
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* 이 모드는 자동입니다. 기체를 제어하기 위해 사용자 개입이 *필요하지* 않습니다.
* RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터 (또는 멀티콥터 모드의 VTOL)에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다.
* 이륙시 문제가 발생하면 [고장 감지기](../config/safety.md#failure_detector)가 자동으로 엔진을 중지합니다.
:::

각 기체 유형에 대한 구체적인 행동은 아래에 설명되어 있습니다.

## 멀티콥터(MC)

멀티 로터는 ` MIS_TAKEOFF_ALT`에 정의된 고도까지 상승하고 위치를 유지합니다.

RC 스틱 이동은 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체를 [위치 모드](../flight_modes/position_mc.md)로 변경합니다.

이륙은 다음 매개 변수의 영향을받습니다.

| 매개 변수                                                                                                   | 설명                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 이륙 중 목표 고도 (기본값 : 2.5m)                                                                                                                                                                            |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | 상승 속도 (기본값 : 1.5m/s)                                                                                                                                                                               |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 활성화된 경우 멀티콥터 (또는 멀티콥터 모드의 VTOL)에서 스틱을 움직여 [위치 모드](../flight_modes/position_mc.md)에서 조종사에게 제어권을 다시 제공합니다 (차량이 중요한 배터리 안전 장치를 처리하는 경우 제외). 자동 모드와 오프 보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. |

<span id="fixed_wing"></span>

## 고정익(FW)

기체는 *투석기/발사 모드* 또는 *활주로 이륙 모드*를 사용하여 현재 방향으로 이륙합니다. 모드는 기본적으로 투석기/수발기가 되지만, [ RWTO_TKOFF](#RWTO_TKOFF)를 사용하여 활주로 이륙으로 설정할 수 있습니다. 두 경우 모두 RC 스틱 제어는 무시됩니다.

<span id="hand_launch"></span>

### 투석기/수동 발사 모드

*투석기/수동 발사 모드*에서 기체는 발사를 감지하기 위해 대기합니다 (가속 트리거 기준). 발사시 약 2초만에 최대 스로틀 ([RWTO_MAX_THR](#RWTO_MAX_THR))까지 상승한 다음 *최소* 10도 이륙 피치로 최대 스로틀 상승합니다. [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF)에 도달하면 [홀드 모드](../flight_modes/hold.md) 배회 비행합니다.

:::note
위에 논의된 동작외에도 일부 조건이 충족 될 때까지 시작 시퀀스가 ​​시작되지 않도록 차단하는 시작 탐지기가 있습니다. 투석기 발사의 경우 이는 약간의 가속 임계치입니다.
:::

<span id="runway_launch"></span>

### 활주로 이륙

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
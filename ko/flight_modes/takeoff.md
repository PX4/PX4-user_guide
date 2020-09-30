# 이륙 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

* 이륙 (Takeo) </ 0> 비행 모드는 기체가 지정된 높이로 떨어져 나가고 추가 입력을 기다립니다.</p> 

> **Note** * This mode requires GPS. * The vehicle must be armed before this mode can be engaged. * This mode is automatic - no user intervention is *required* to control the vehicle. * RC control switches can be used to change flight modes on any vehicle. * RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe. * The [Failure Detector](../config/safety.md#failure_detector) will automatically stop the engines if there is a problem on takeoff.

The specific behaviour for each vehicle type is described below.

## 멀티 헬기 (MC)

멀티 로터는  MIS_TAKEOFF_ALT </ 0>에 정의 된 고도까지 상승하고 위치를 유지합니다.</p>

<p>RC stick movement will <a href="#COM_RC_OVERRIDE">by default</a> change the vehicle to <a href="../flight_modes/position_mc.md">Position mode</a> unless handling a critical battery failsafe.</p>

<p>Takeoff is affected by the following parameters:</p>

<table>
<thead>
<tr>
  <th>Parameter</th>
  <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td><span id="MIS_TAKEOFF_ALT"></span><a href="../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT">MIS_TAKEOFF_ALT</a></td>
  <td>이륙 중 목표 고도 (기본값 : 2.5m)</td>
</tr>
<tr>
  <td><span id="MPC_TKO_SPEED"></span><a href="../advanced_config/parameter_reference.md#MPC_TKO_SPEED">MPC_TKO_SPEED</a></td>
  <td>상승 속도 (기본값 : 1.5m / s)</td>
</tr>
<tr>
  <td><span id="COM_RC_OVERRIDE"></span><a href="../advanced_config/parameter_reference.md#COM_RC_OVERRIDE">COM_RC_OVERRIDE</a></td>
  <td>If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in <a href="../flight_modes/position_mc.md">Position mode</a> (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default.</td>
</tr>
</tbody>
</table>

<h2 id="fixed_wing">Fixed Wing (FW)</h2>

<p>The aircraft takes off in the current direction using either <em>catapult/hand-launch mode</em> or <em>runway takeoff mode</em>.
The mode defaults to catapult/hand launch, but can be set to runway takeoff using <a href="#RWTO_TKOFF">RWTO_TKOFF</a>.
RC stick movement is ignored in both cases.</p>

<h3 id="hand_launch">Catapult/Hand Launch</h3>

<p>In <em>catapult/hand launch mode</em> the vehicle waits to detect launch (based on acceleration trigger).
On launch it ramps up to full throttle (<a href="#RWTO_MAX_THR">RWTO_MAX_THR</a>) in about 2 seconds and then performs a full throttle climbout, with <em>minimum</em> 10 degree takeoff pitch. 
Once it reaches <a href="#FW_CLMBOUT_DIFF">FW_CLMBOUT_DIFF</a> it will transition to <a href="../flight_modes/hold.md">Hold mode</a> and loiter.</p>

<blockquote>
  <p><strong> 참고 </ 0> 위에 논의 된 동작 외에도 일부 조건이 충족 될 때까지 시작 시퀀스가 ​​시작되지 않도록 차단하는 시작 탐지기가 있습니다.
    투석기 발사의 경우 이는 약간의 가속 임계 값입니다.</p>
</blockquote>

<h3 id="runway_launch">Runway Takeoff</h3>

<p>The <em>runway takeoff mode</em> has the following phases:</p>

<ol start="1">
<li><strong>Throttle ramp</strong>: Clamped to the runway (pitch fixed, no roll, and heading hold) until reach the minimum airspeed for takeoff (<a href="#FW_AIRSPD_MIN">FW_AIRSPD_MIN</a> x <a href="#RWTO_AIRSPD_SCL">RWTO_AIRSPD_SCL</a>).</li>
<li><strong> 이륙 </ 0> : 피치를 높이고 기체 고도> 항법 고도 (<a href="#RWTO_NAV_ALT"> RWTO_NAV_ALT </ 1>)까지 계속하십시오.</li>
<li>



<strong> 등산 </ 0> :지면 위의 고도 <a href="#FW_CLMBOUT_DIFF"> FW_CLMBOUT_DIFF </ 1>까지 상승하십시오.

이 단계에서는 롤 및 제목 제한이 제거됩니다.</li>
</ol>

<h3>Fixed Wing Takeoff Parameters</h3>

<p>Takeoff is affected by the following parameters:</p>

<table>
<thead>
<tr>
  <th>Parameter</th>
  <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td><span id="RWTO_TKOFF"></span><a href="../advanced_config/parameter_reference.md#RWTO_TKOFF">RWTO_TKOFF</a>
</td>
  <td>랜딩 기어가있는 활주로 이륙. 기본값 : 비활성화 됨</td>
</tr>
<tr>
  <td><span id="RWTO_MAX_THR"></span><a href="../advanced_config/parameter_reference.md#RWTO_MAX_THR">RWTO_MAX_THR</a>
</td>
  <td>활주로 이륙 중 최대 스로틀.</td>
</tr>
<tr>
  <td><span id="FW_CLMBOUT_DIFF"></span><a href="../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF">FW_CLMBOUT_DIFF</a>
</td>
  <td>Climbout Altitude difference. This is used as the target altitude if taking off without a takeoff altitude setpoint (there is no setpoint in takeoff mode, but there is in missions).</td>
</tr>
<tr>
  <td><span id="FW_AIRSPD_MIN"></span><a href="../advanced_config/parameter_reference.md#FW_AIRSPD_MIN">FW_AIRSPD_MIN</a></td>
  <td>Minimum Airspeed (최소 속도). TECS 컨트롤러가 대기 속도를보다 적극적으로 높이려고 시도합니다.</td>
</tr>
<tr>
  <td><span id="RWTO_AIRSPD_SCL"></span><a href="../advanced_config/parameter_reference.md#RWTO_AIRSPD_SCL">RWTO_AIRSPD_SCL</a>
</td>
  <td>최소 이륙을위한 속도의 스케일링 계수. 피치는 대기 속도에 도달하면 증가합니다 : <code> FW_AIRSPD_MIN </ 0> * <code> RWTO_AIRSPD_SCL </ 0></td>
</tr>
<tr>
  <td><span id="RWTO_NAV_ALT"></span><a href="../advanced_config/parameter_reference.md#RWTO_NAV_ALT">RWTO_NAV_ALT</a>
</td>
  <td>지면 위의 고도 (AGL). 약간의 굴림을 허용하는 충분한 지상고가 있습니다. <code> RWTO_NAV_ALT </ 0>에 도달 할 때까지 비행기는 수평을 유지하고 표제를 지키기 위해 방향타 만 사용됩니다 (<span id="RWTO_HDG"> <a href="../advanced_config/parameter_reference.md#RWTO_HDG"> RWTO_HDG </ 2> 참조). <code> FW_CLMBOUT_DIFF </ 0>> 0이면 <code> FW_CLMBOUT_DIFF </ 0> 아래에 있어야합니다.</td>
</tr>
</tbody>
</table>

<blockquote>
  <p>



<strong> 참고 </ 0> 기체는 항상 이륙 중에 (<a href="../advanced_config/parameter_reference.md#FW_THR_MIN"> FW_THR_MIN </ 1>, <a href="../advanced_config/parameter_reference.md#FW_THR_MAX"> FW_THR_MAX </ 2>) 정상 FW 최대 / 최소 스로틀 설정을 준수합니다.
</p>
</blockquote>

<h2>VTOL</h2>

<p>VTOLs default to MC mode on boot, and it is generally expected that they will take off in <a href="#multi-copter-mc">multicopter mode</a> (and also safer).</p>

<p>That said, if transitioned to Fixed wing before takeoff, they will takeoff in <a href="#fixed_wing">Fixed Wing</a> mode.</p>

<!-- this maps to AUTO_TAKEOFF in dev -->
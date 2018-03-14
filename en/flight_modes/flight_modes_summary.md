# Flight Modes Summary

## Fixed Wing

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <thead>
   <tr><th>Modes</th><th>Roll & Pitch</th><th>Yaw<th>Throttle</th><th>Position Sensors</th><th>Summary</th></tr>
 </thead>
<tbody>

<tr>
 <td>Manual</td>
 <td style="vertical-align: middle;">M</td>
 <td style="vertical-align: middle;">M</td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>User RC sticks input directly sent to the output mixer for manual control.</td>
</tr>
 
<tr>
 <td>Stabilized</td>
 <td style="vertical-align: middle;">S</td>
 <td style="vertical-align: middle;">M</td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>
<p>If zero roll/pitch sticks - vehicle levels out.</p>

<p>If non-zero roll/pitch sticks - vehicle does a coordinated turn.</p>

<p>Manual yaw input is added to rudder control input- to control sideslip.</p>
</td>
</tr>

<tr>
 <td>Acro</td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>RC RPY stick inputs are translated to angular rate commands that are stabilized by autopilot.</td>
</tr>

<tr>
 <td>Altitude Control</td>
 <td style="vertical-align: middle;"><p>S (roll)</p><p>S<sup>+</sup>(pitch)</p></td>
 <td style="vertical-align: middle;">M</td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td>Y<sup>*</sup></td>
 <td><p>Centered RC RPY sticks and 50% throttle – autopilot holds current altitude against wind and gives level flight.</p>
	 
<p><sup>*</sup>Only requires altitude sensor (e.g. Baro, Rangefinder).</p></td>
</tr>

<tr>
 <td>Position Control</td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td>Y</td>
 <td>Centered RC RPY sticks – gives level flight that follows a straight line ground track in the current direction against any wind.</td>
</tr>

<tr>
 <td>Take Off</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The aircraft takes off in the current direction using either <a href="https://docs.px4.io/en/flight_modes/takeoff.html#fixed-wing-fw"><em>catapult/hand-launch mode</em> or <em>runway takeoff mode</em></a>.</td>
</tr>


<tr>
 <td>Land</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td><a href="https://docs.px4.io/en/flying/fixed_wing_landing.html">FW landing</a> is initiated.</td>
</tr>

<tr>
 <td>Loiter/Hold</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The aircraft circles around the GPS hold position at the current altitude.</td>
</tr>

<tr>
 <td>Return to Land</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The aircraft will first ascend to the <a href="https://docs.px4.io/en/advanced_config/parameter_reference.html#RTL_RETURN_ALT">RTL_RETURN_ALT</a> altitude and then fly to the home position in a straight line (if already above RTL_RETURN_ALT it will return at its current altitude). Either lands or loiters above the home position depending on the value of <a href="https://docs.px4.io/en/flight_modes/rtl.html#RTL_LAND_DELAY">RTL_LAND_DELAY</a>.</td>
</tr>


<tr>
 <td>Mission</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle executes a <a href="https://docs.px4.io/en/flying/missions.html">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
</tr>


<tr>
 <td>Offboard</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>(only supported for VTOL) The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
</tr>
 
</tbody></table>

## Multicopter

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <thead>
   <tr><th>Modes</th><th>Roll & Pitch</th><th>Yaw<th>Throttle</th><th>Position Sensors</th><th>Summary</th></tr>
 </thead>
<tbody>

<tr>
 <td>Manual/Stabilized</td>
 <td style="vertical-align: middle;">S</td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>Autopilot stabilizes attitude. Centered RC sticks levels out the attitude.</td>
</tr>
 
<tr>
 <td>Acro</td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>RC RPY stick inputs are translated to angular rate commands that are stabilized by autopilot.</td>
</tr>

<tr>
 <td>Rattitude</td>
 <td style="vertical-align: middle;">S or S<sub>rate</sub></td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>
<p>Centered RC sticks- vehicle acts like in Stabilised Mode (S).</p>
<p>RC sticks away from center – vehicle acts like in ACRO mode (S rate).</p>
</td>
</tr>

<tr>
 <td>Altitude Control</td>
 <td style="vertical-align: middle;">S</td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td>Y<sup>*</sup></td>
 <td><p>This mode helps vehicle reach and maintain altitude.</p>
<p>Centered RPY sticks stabilizes attitude/ vehicle levels out.</p>
<p>Centered throttle holds current altitude steady against wind.</p>	 
<p><sup>*</sup>Only requires altitude sensor (e.g. Baro, Rangefinder).</p></td>
</tr>

<tr>
 <td>Position Control</td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td style="vertical-align: middle;">S<sub>rate</sub></td>
 <td style="vertical-align: middle;">S<sup>+</sup></td>
 <td>Y</td>
 <td>
<p>RPT sticks used to control multicopter’s left, right and up/down speed.</p>
<p>Centered RPT sticks hold x, y, z position steady against any wind.</p>
</td>
</tr>

<tr>
 <td>Take Off</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle ascends to the altitude defined in <a href="https://docs.px4.io/en/advanced_config/parameter_reference.html#MIS_TAKEOFF_ALT">MIS_TAKEOFF_ALT</a> and holds position.</td>
</tr>


<tr>
 <td>Land</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>
Vehicle lands at the position where the mode was engaged.
</td>
</tr>

<tr>
 <td>Loiter/Hold</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>
Multicopter hovers at the current GPS position and altitude.
</td>
</tr>

<tr>
 <td>Return to Land</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle will first ascend to the <a href="https://docs.px4.io/en/advanced_config/parameter_reference.html#RTL_RETURN_ALT">RTL_RETURN_ALT</a> altitude and then fly to the home position in a straight line (if already above RTL_RETURN_ALT it will return at its current altitude). Lands when home position reached.
</td>
</tr>


<tr>
 <td>Mission</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle executes a <a href="https://docs.px4.io/en/flying/missions.html">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
</tr>

<tr>
 <td>Follow Me</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>
Vehicle autonomously follows a user using an Android phone/tablet running QGC.
</td>
</tr>

<tr>
 <td>Offboard</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
</tr>
 
</tbody></table>




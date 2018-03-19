# Flight Modes Summary

The tables below summarizes flight modes for fixed wing and copter ([table key is below](#key)). 

<!-- Styles used for tables below -->
<style>
table {
  display: block;
  overflow: scroll;
  width: 100%;
  font-size:1.5rem;
  text-align:center;
}

.markdown-section table {
  display: block;
}

tr td:nth-last-child(1) {
    text-align:left;
}

/*
  .col_summary {
    width:50px;
  }
*/


th {
  font-size:1.0rem;
}


@media (min-width: 1500px){
.page-inner {
  max-width: 1100px;
  }
}

@media (min-width: 1400px) and (max-width: 1500px) {
.page-inner {
  max-width: 1000px;
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
.page-inner {
  max-width: 800px;
  }
}

</style>

## Fixed Wing

<table>
 <thead>
   <tr>
     <th class="col_modes">Modes</th>
     <th class="col_r_p">Roll & Pitch</th>
     <th class="col_yaw">Yaw</th>
     <th class="col_throttle">Throttle</th>
     <th class="col_sensor">Position Sensors</th>
     <th class="col_summary">Summary</th></tr>
   </tr>
 </thead>
<tbody>

<tr>
 <td>Manual (M)</td>
 <td>M</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td>User RC sticks input directly sent to the output mixer for manual control.</td>
</tr>
 
<tr>
 <td>Stabilized (S)</td>
 <td>S</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td>
<p>If zero roll/pitch sticks - vehicle levels out.</p>

<p>If non-zero roll/pitch sticks - vehicle does a coordinated turn.</p>

<p>Manual yaw input is added to rudder control input- to control sideslip.</p>
</td>
</tr>

<tr>
 <td>Acro</td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>This mode can be used to perform acrobatic maneuvers.</p>
<p>RC RPY stick inputs are translated to angular rate commands that are stabilized by autopilot.</p></td>
</tr>

<tr>
 <td><a href="../flight_modes/altitude.md">Altitude</a></td>
 <td><p>S (roll)</p><p>S<sup>+</sup>(pitch)</p></td>
 <td>M</td>
 <td>S<sup>+</sup></td>
 <td>Y<sup>*</sup></td>
 <td><p>This mode helps vehicle reach and maintain altitude.</p>
 <p>Centered RC RPY sticks gives level flight.</p>
 <p>Pitch input is used to control the altitude. If zero pitch input – autopilot holds current altitude against wind.</p>	
 <p>Throttle stick controls the airspeed of the aircraft only if airspeed sensor is connected.</p>	 
 <p>Without airspeed sensor, the user cannot control Throttle.</p>	
 <p><sup>*</sup>Only requires altitude sensor (e.g. Baro, Rangefinder).</p></td>
</tr>

<tr>
 <td>Position</td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td>Y</td>
 <td>Centered RC RPY sticks – gives level flight that follows a straight line ground track in the current direction against any wind.</td>
</tr>

<tr>
 <td><a href="../flight_modes/takeoff.md">Takeoff</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The aircraft takes off in the current direction using either <a href="../flight_modes/takeoff.md#fixed-wing-fw"><em>catapult/hand-launch mode</em> or <em>runway takeoff mode</em></a>.</td>
 
 
</tr>


<tr>
 <td><a href="../flight_modes/land.md">Land</a></td>
 <td class="centred" colspan="3">Auto</td>
 <td>Y</td>
 <td><a href="../flying/fixed_wing_landing.md">FW landing</a> is initiated.</td>
</tr>

<tr>
 <td><a href="../flight_modes/hold.md">Hold</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The aircraft circles around the GPS hold position at the current altitude.</td>
</tr>

<tr>
 <td><a href="../flight_modes/rtl.md">Return</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The aircraft will first ascend to the <a href="../advanced_config/parameter_reference.md#RTL_RETURN_ALT">RTL_RETURN_ALT</a> altitude and then fly to the home position in a straight line (if already above RTL_RETURN_ALT it will return at its current altitude). Either lands or loiters above the home position depending on the value of <a href="../flight_modes/rtl.md#RTL_LAND_DELAY">RTL_LAND_DELAY</a>.</td>
</tr>


<tr>
 <td><a href="../flight_modes/mission.md">Mission</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle executes a <a href="../flying/missions.md">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
</tr>


<tr>
 <td><a href="../flight_modes/offboard.md">Offboard</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>(only supported for VTOL) The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
</tr>
 
</tbody></table>



## Multicopter

<table>
 <thead>
   <tr>
     <th>Modes</th>
     <th>Roll & Pitch</th>
     <th>Yaw</th>
     <th>Throttle</th>
     <th>Position Sensors</th>
     <th class="col_summary">Summary</th></tr>
   </tr>
 </thead>
<tbody>

<tr>
 <td>Manual/ Stabilized</td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>This mode allows manual control with assistance from autopilot to stabilize attitude.</p>
<p>Centered RC sticks level-out the attitude.</p>
</td>
</tr>
 
<tr>
 <td>Acro</td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>This mode can be used to perform acrobatic maneuvers e.g. flips</p>
<p>RC RPY stick inputs are translated to angular rate commands that are stabilized by autopilot.</p></td>
</tr>

<tr>
 <td>Rattitude</td>
 <td>S or S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td>
<p>Centered RC sticks- vehicle acts like in Stabilised Mode (S).</p>
<p>RC sticks away from center – vehicle acts like in ACRO mode (S rate).</p>
</td>
</tr>

<tr>
 <td><a href="../flight_modes/altitude.md">Altitude</a></td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td>Y<sup>*</sup></td>
 <td><p>This mode helps vehicle reach and maintain altitude.</p>
<p>Centered RPY sticks stabilizes attitude/ vehicle levels out.</p>
<p>Centered throttle holds current altitude steady against wind.</p>	 
<p><sup>*</sup>Only requires altitude sensor (e.g. Baro, Rangefinder).</p></td>
</tr>

<tr>
 <td>Position</td>
 <td>S<sup>+</sup></td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td>Y</td>
 <td><p>This mode helps vehicle reach and maintain a certain position.</p>
<p>RPT sticks used to control multicopter’s left, right and up/down speed.</p>
<p>Centered RPT sticks hold x, y, z position steady against any wind.</p>
</td>
</tr>

<tr>
 <td><a href="../flight_modes/takeoff.md">Takeoff</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle ascends to the altitude defined in <a href="../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT">MIS_TAKEOFF_ALT</a> and holds position.</td>
</tr>


<tr>
 <td><a href="../flight_modes/land.md">Land</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>
Vehicle lands at the position where the mode was engaged.
</td>
</tr>

<tr>
 <td><a href="../flight_modes/hold.md">Hold</td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>
Multicopter hovers at the current GPS position and altitude.
</td>
</tr>

<tr>
 <td><a href="../flight_modes/rtl.md">Return</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle will first ascend to the <a href="../advanced_config/parameter_reference.md#RTL_RETURN_ALT">RTL_RETURN_ALT</a> altitude and then fly to the home position in a straight line (if already above RTL_RETURN_ALT it will return at its current altitude). Lands when home position reached.
</td>
</tr>


<tr>
 <td><a href="../flight_modes/mission.md">Mission</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>Vehicle executes a <a href="../flying/missions.md">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
</tr>

<tr>
 <td><a href="../flight_modes/follow_me.md">Follow Me</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>
Vehicle autonomously follows a user using an Android phone/tablet running QGC.
</td>
</tr>

<tr>
 <td><a href="../flight_modes/offboard.md">Offboard</a></td>
 <td colspan="3">Auto</td>
 <td>Y</td>
 <td>The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
</tr>
 
</tbody></table>


## Key

Key for understanding the table is as follows:

Symbol | Description
--- | ---
M | Manual control via RC sticks. RC input is sent directly to the output mixer.
S | Assistance from autopilot to stabilize the attitude. RC input is required. Position of RC stick maps to the orientation of vehicle.
S<sub>rate</sub> |  Assistance from autopilot to stabilize the attitude rate. RC input is required. Position of RC stick maps to the rate of rotation of vehicle in that orientation.
S<sup>+</sup> | Assistance from autopilot to hold position or altitude against wind. RC input is required.
Auto | This mode is automatic (RC control is disabled by default except to change modes).
Y* | Altitude mode only requires a sensor that measures height/altitude e.g. barometer or LIDAR
Y | Sensor that measures position including height is needed e.g. optical flow, GPS+barometer, visual-inertial odometry


Abbreviations:
  * RPY: Roll, Pitch, Yaw
  * RPT: Roll, Pitch Throttle

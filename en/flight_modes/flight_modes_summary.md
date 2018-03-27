# Flight Modes Summary

The tables below summarizes flight modes for fixed wing and copter ([table key is below](#key)). Note that this is the "high level" default behaviour, and may vary based on vehicle parameters.

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
 <td>Position
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Centered RC RPY sticks – gives level flight that follows a straight line ground track in the current direction against any wind.</td>
</tr>

<tr>
 <td><a href="../flight_modes/altitude.md">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="20px" /></a></p>
 </td>
 <td><p>S (roll)</p><p>S<sup>+</sup>(pitch)</p></td>
 <td>M</td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="20px" /></a><sup><a href="#baro_only">++</a></sup></td>
 <td><p>This mode helps vehicle reach and maintain altitude.</p>
 <p>Centered RC RPY sticks gives level flight.</p>
 <p>Pitch input is used to control the altitude. If zero pitch input – autopilot holds current altitude against wind.</p>
 <p>Throttle stick controls the airspeed of the aircraft only if airspeed sensor is connected.</p>
 <p>Without airspeed sensor, the user cannot control Throttle.</p>
 </td>
</tr>
 
<tr>
 <td>Stabilized
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="20px" /></a></p>
 </td>
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
 <td>Acro
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>This mode can be used to perform acrobatic maneuvers.</p>
<p>RC RPY stick inputs are translated to angular rate commands that are stabilized by autopilot.</p></td>
</tr>

<tr>
 <td>Manual
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_6.svg" title="Difficulty (Hardest)" width="20px" /></a></p>
 </td>
 <td>M</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td>User RC sticks input directly sent to the output mixer for manual control.</td>
</tr>


<tr>
 <td><a href="../flight_modes/takeoff.md">Takeoff</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle initiates the takeoff sequence using either <em>catapult/hand-launch mode</em> or <em>runway takeoff mode</em> (in the current direction).</td>
</tr>


<tr>
 <td><a href="../flight_modes/land.md">Land</a></td>
 <td class="centred" colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle initiates the <a href="../flying/fixed_wing_landing.md">fixed-wing landing</a> sequence.</td>
</tr>

<tr>
 <td><a href="../flight_modes/hold.md">Hold</td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle circles around the GPS hold position at the current altitude.</td>
</tr>

<tr>
 <td><a href="../flight_modes/return.md">Return</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle ascends to a safe height and then returns to its home position and circles. </td>
</tr>


<tr>
 <td><a href="../flight_modes/mission.md">Mission</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle executes a <a href="../flying/missions.md">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
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
 <td><a href="../flight_modes/position_mc.md">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td><p>RC/manual mode where RPT sticks control <em>speed</em> in corresponding directions. Centered sticks level vehicle and hold it to fixed position and altitude against wind.
  <ul>
    <li>Centered RPT sticks hold x, y, z position steady against any wind and levels attitude.</li>
    <li>Outside center:
      <ul>
       <li>Roll/Pitch sticks control speed over ground in left-right and forward-back directions (respectively) relative to the "front" of the vehicle.</li>
       <li>Throttle stick controls speed of ascent-descent.</li>
       <li>Yaw stick controls rate of angular rotation above the horizontal plane.</li>
      </ul>
    </li>
    </ul>
  </li>
  </ul>
 </p>
</td>
</tr>

<tr>
 <td><a id="mc_altitude" href="../flight_modes/altitude.md">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="20px" /></a><sup><a href="#baro_only">++</a></sup></td>
 <td><p>RC/manual mode where centered sticks level vehicle and hold it to a fixed altitude (but not horizontal position).
  <ul>
    <li>Centered sticks:
      <ul>
       <li>RPY sticks stabilizes altitude and levels vehicle.</li>
       <li>Throttle holds current altitude steady against wind.</li>
    </ul>
    <li>Outside center:
      <ul>
       <li>Roll/Pitch sticks control tilt angle in those orientations, resulting in corresponding left-right and forward-back movement.</li>
       <li>Throttle stick controls up/down speed (and movement speed in other axes).</li>
       <li>Yaw stick controls rate of angular rotation above the horizontal plane.</li>
    </ul>
  </li>
  </ul>
 </p>
 </td>
</tr>


<tr>
 <td><a id="manual_stabilized_mc" href="../flight_modes/manual_stabilized_mc.md">Manual/ Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>RC/manual mode where centered sticks level vehicle (only - position is not stabilized).</p>
   <p>
   <ul>
    <li>Centered RP sticks level vehicle.</li>
    <li>Outside center:
      <ul>
       <li>Roll/Pitch sticks control tilt angle in those orientations, resulting in corresponding left-right and forward-back movement.</li>
       <li>Throttle stick controls up/down speed (and movement speed in other axes).</li>
       <li>Yaw stick controls rate of angular rotation above the horizontal plane.</li>
      </ul>
    </li>
    </ul>
  <p>
</td>
</tr>


<tr>
 <td>Rattitude
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="20px" /></a></p>
 </td>
 <td>S or S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td>
 <p><a href="#acro_mc">Acro</a> mode with <em>attitude stabilization</em> (centered sticks level vehicle).
  <ul>
    <li>Centered sticks: Vehicle levels out (i.e. like <a href="#manual_stabilized_mc">Manual/Stabilized</a> mode).</li>
    <li>Sticks outside center: RPY stick inputs control the rate of angular rotation around the respective axes. (i.e. like <a href="#acro_mc">Acro</a> mode).</li>
  </ul>
 </p>
</td>
</tr>


<tr>
 <td id="acro_mc">Acro
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>RC/manual mode for performing acrobatic maneuvers e.g. flips.</p> 
<p>RC RPY stick inputs control the rate of angular rotation around the respective axes. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (not necessarily level!)</p></td>
</tr>


<tr>
 <td><a href="../flight_modes/takeoff.md">Takeoff</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle ascends to takeoff altitude and holds position.</td>
</tr>

<tr>
 <td><a href="../flight_modes/land.md">Land</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle lands at the position where the mode was engaged.</td>
</tr>

<tr>
 <td><a href="../flight_modes/hold.md">Hold</td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle hovers at the current GPS position and altitude.</td>
</tr>

<tr>
 <td><a href="../flight_modes/return.md">Return</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle ascends to a safe height and then returns to its home position and lands. 
</td>
</tr>


<tr>
 <td><a href="../flight_modes/mission.md">Mission</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle executes a <a href="../flying/missions.md">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
</tr>

<tr>
 <td><a href="../flight_modes/follow_me.md">Follow Me</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle autonomously follows a user using an Android phone/tablet running QGC.</td>
</tr>

<tr>
 <td><a href="../flight_modes/offboard.md">Offboard</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
</tr>
 
</tbody></table>


## VTOL

VTOL vehicles support both fixed-wing and multicopter flight modes, executing them based on the current vehicle mode (MC or FW).

VTOL supports <a href="../flight_modes/offboard.md">Offboard</a> mode in either configuration.


## Key

Key for understanding the table is as follows:

Symbol | Description
--- | ---
M | Manual control via RC sticks. RC input is sent directly to the output mixer.
S | Assistance from autopilot to stabilize the attitude. RC input is required. Position of RC stick maps to the orientation of vehicle.
S<sub>rate</sub> |  Assistance from autopilot to stabilize the attitude rate. RC input is required. Position of RC stick maps to the rate of rotation of vehicle in that orientation.
S<sup>+</sup> | Assistance from autopilot to hold position or altitude against wind. RC input is required.
Auto | This mode is automatic (RC control is disabled by default except to change modes).
<span id="key_position_fixed"></span><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /> | Sensor(s) that measures position/height needed e.g. optical flow, GPS+barometer, visual-inertial odometry. <p id="baro_only"><b>++</b> - <em>Altitude Mode</em> only requires altitude sensor (e.g. Baro, Rangefinder).</p>
<span id="key_difficulty">[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="20px" />&nbsp;<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="20px" />&nbsp;<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="20px" />&nbsp;<img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="20px" />&nbsp;<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="20px" />&nbsp;<img src="../../assets/site/difficulty_6.svg" title="Difficulty (Hardest)" width="20px" />](#key_difficulty) | Flight mode difficulty (easy to hard).


Abbreviations:
  * RPY: Roll, Pitch, Yaw
  * RPT: Roll, Pitch Throttle

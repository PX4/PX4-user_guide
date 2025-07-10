---
canonicalUrl: https://docs.px4.io/main/ja/flight_modes/README
---

# Flight Modes

*Flight Modes* define how the autopilot responds to user input and controls vehicle movement. The tables below summarizes flight modes for fixed wing and copter ([table key is below](#key)). Note that this is the "high level" default behaviour, and may vary based on vehicle parameters. The linked topics (sidebar) provide more detailed information about individual modes, including their tuning parameters.

**Tip** A *beginner friendly* explanation of all flight modes is provided in [Getting Started > Flight Modes](../getting_started/flight_modes.md). :::

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

<tr id="position_fw">
 <td><a href="../flight_modes/position_fw.html">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td><p>RC mode where centered sticks put vehicle into straight and level flight where vehicle posture/attitude, altitude, and the straight line vehicle path are maintained against wind (and other forces).
   <ul>
       <li>Centered RC RPY sticks – level flight that follows a straight line ground track in the current direction against any wind.</li>
       <li>Outside center:
      <ul>
        <li>Pitch stick controls altitude (same as <a href="#altitude_fw">Altitude</a>).</li>
        <li>Roll stick controls roll angle. Autopilot will maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a> (same as <a href="#stabilized_fw">Stabilized</a>).</li>
        <li>Throttle sets airspeed (same as <a href="#altitude_fw">Altitude</a>).</li> 
        <li>Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).</li>
        <li>Yaw stick actuates the rudder (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). This is the same as <a href="#stabilized_fw">Stabilized</a>.</li>
     </ul></li>
   </ul>
  </p>
  </td>
</tr>


<tr id="altitude_fw">
 <td><a href="../flight_modes/altitude_fw.html">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a></p>
 </td>
 <td><p>S (roll)</p><p>S<sup>+</sup>(pitch)</p></td>
 <td>M</td>
 <td>S<sup>+</sup></td>
 <td><a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="20px" /></a></td>
 <td>
 <p>RC mode like <a href="#stabilized_fw">Stabilized</a> mode but with <em>altitude stabilization</em> (centered sticks put vehicle into straight and level flight and maintain current altitude). The vehicle course is not maintained, and can drift due to wind.
  <ul>
    <li>Centered RPY sticks (inside deadband):
      <ul>
       <li>Autopilot maintains altitude with wings also level.</li> 
       <li>Throttle stick controls the airspeed of the aircraft if an airspeed sensor is connected (without airspeed sensor, the user cannot control throttle).</li>
    </ul>
    <li>Outside center:
      <ul>
       <li>Pitch stick controls altitude.</li>
       <li>Throttle stick controls the airspeed of the aircraft (as for centered RPY sticks).</li>
       <li>Yaw stick actuates the rudder (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). This is the same as <a href="#stabilized_fw">Stabilized</a>.</li>
    </ul>
  </li>
  </ul>
 </p>
 </td>
</tr>


<tr id="stabilized_fw">
 <td><a href="../flight_modes/stabilized_fw.html">Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td>
  <p>RC mode where centered RP sticks levels vehicle attitude (roll and pitch). The vehicle course and altitude are not maintained, and can drift due to wind.</p>
<ul>
   <li>Pitch stick controls pitch angle.</li>
   <li>Roll stick controls roll angle. Autopilot will maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>.</li>
   <li>Throttle stick controls throttle.</li>
   <li>Yaw stick actuates the rudder (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>).</li>
</ul>
 </td>
</tr>

<tr id="acro_fw">
 <td><a href="../flight_modes/acro_fw.html">Acro</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.</p>
<p>RPY stick inputs are translated to angular rate commands that are stabilized by autopilot. Throttle is passed directly to the output mixer.</p></td>
</tr>


<tr id="manual_fw">
 <td><a href="../flight_modes/manual_fw.html">Manual</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a></p>
 </td>
 <td>M</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td><p>RC mode where stick input is sent directly to the output mixer (for "fully" manual control).</p>
   <p>This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.
   </p>
  </td>
</tr>


<tr id="takeoff_fw">
 <td><a href="../flight_modes/takeoff.html">Takeoff</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle initiates the takeoff sequence using either <em>catapult/hand-launch mode</em> or <em>runway takeoff mode</em> (in the current direction).</td>
</tr>


<tr id="land_fw">
 <td><a href="../flight_modes/land.html">Land</a></td>
 <td class="centred" colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle initiates the <a href="../flying/fixed_wing_landing.html">fixed-wing landing</a> sequence.</td>
</tr>

<tr id="hold_fw">
 <td><a href="../flight_modes/hold.html">Hold</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle circles around the GPS hold position at the current altitude.</td>
</tr>

<tr id="return_fw">
 <td><a href="../flight_modes/return.html">Return</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle flies a clear path to a safe location. The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined).</td>
</tr>


<tr id="mission_fw">
 <td><a href="../flight_modes/mission.html">Mission</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle executes a <a href="../flying/missions.html">predefined mission/flight plan</a> that has been uploaded to the flight controller. </td>
</tr>

<tr id="offboard_fw">
 <td><a href="../flight_modes/offboard.html">Offboard</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle obeys attitude setpoints provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
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


<tr id="position_mc">
 <td><a href="../flight_modes/position_mc.html">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td><p>RC mode where roll, pitch, throttle sticks control movement in corresponding axes/directions. Centered sticks level vehicle and hold it to fixed altitude and position against wind.
  <ul>
    <li>Centered RPT sticks hold x, y, z position steady against any wind and levels attitude.</li>
    <li>Outside center:
      <ul>
       <li>Roll/Pitch sticks control horizontal acceleration over ground in the vehicle's left-right and forward-back directions (respectively).</li>
       <li>Throttle stick controls speed of ascent-descent.</li>
       <li>Yaw stick controls rate of angular rotation above the horizontal plane.</li>
      </ul>
    </li>
    <li>Takeoff:
      <ul>
       <li>When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).</li>
      </ul>
    </li>
    </ul>
  </li>
  </ul>
 </p>
</td>
</tr>

<tr id="altitude_mc">
 <td><a href="../flight_modes/altitude_mc.html">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="20px" /></a></td>
 <td><p>RC mode like <a href="#manual_stabilized_mc">Manual/Stabilized</a> mode but with <em>altitude stabilization</em> (centered sticks level vehicle and hold it to fixed altitude). The horizontal position of the vehicle can move due to wind (or pre-existing momentum).
  <ul>
    <li>Centered sticks (inside deadband):
      <ul>
       <li>RPY sticks levels vehicle.</li> 
       <li>Throttle (~50%) holds current altitude steady against wind.</li>
    </ul>
    <li>Outside center:
      <ul>
       <li>Roll/Pitch sticks control tilt angle in respective orientations, resulting in corresponding left-right and forward-back movement.</li>
       <li>Throttle stick controls up/down speed with a predetermined maximum rate (and movement speed in other axes).</li> 
       <li>Yaw stick controls rate of angular rotation above the horizontal plane.</li> 
      </ul>
    </li>
    <li>Takeoff:
      <ul>
       <li>When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).</li>
      </ul>
    </li>
  </ul>
 </p>
 </td>
</tr>


<tr id="manual_stabilized_mc">
 <td><a href="../flight_modes/manual_stabilized_mc.html">Manual/ Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>RC mode where centered sticks level vehicle (only - position is not stabilized).</p>
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
  </p>
</td>
</tr>

<tr id="acro_mc">
 <td><a href="../flight_modes/acro_mc.html">Acro</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>RC mode for performing acrobatic maneuvers e.g. flips, rolls and loops.</p> 
  <p>RC RPY stick inputs control the rate of angular rotation around the respective axes. Throttle is passed directly to the output mixer.  When sticks are centered the vehicle will stop rotating, but remain in its current orientation (e.g. possibly inverted) and moving according to its current momentum.</p>
 </td>
</tr>


<tr id="orbit_mc">
 <td><a href="../flight_modes/orbit.html">Orbit</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a></p>
 </td>
 <td>-</td>
 <td>-</td>
 <td>-</td>
 <td></td>
 <td><p>GCS-initiated guided mode for flying a circle, always facing the center.</p> 
  <p>Mode must be started from GCS, specifying center point and initial radius and altitude. RC control is optional, and can be used to set the orbit altitude, radius, speed, and direction. Altitude control is the same as for <a href="#position_mc">Position Mode</a>.</p>
 </td>
</tr>

<tr id="takeoff_mc">
 <td><a href="../flight_modes/takeoff.html">Takeoff</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle ascends to takeoff altitude and holds position.</td>
</tr>

<tr id="land_mc">
 <td><a href="../flight_modes/land.html">Land</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle lands at the position where the mode was engaged.</td>
</tr>

<tr id="hold_mc">
 <td><a href="../flight_modes/hold.html">Hold</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle hovers at the current GPS position and altitude.</td>
</tr>

<tr id="return_mc">
 <td><a href="../flight_modes/return.html">Return</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle flies a clear path to a safe location. The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined).</td>
</tr>


<tr id="mission_mc">
 <td><a href="../flight_modes/mission.html">Mission</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle executes a <a href="../flying/missions.html">predefined mission/flight plan</a> that has been uploaded to the flight controller.</td>
</tr>

<tr id="followme_mc">
 <td><a href="../flight_modes/follow_me.html">Follow Me</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle autonomously follows a user using an Android phone/tablet running QGC.</td>
</tr>

<tr id="offboard_mc">
 <td><a href="../flight_modes/offboard.html">Offboard</a></td>
 <td colspan="3">Auto</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a></td>
 <td>Vehicle obeys a position, velocity or attitude setpoints provided over MAVLink (often from a companion computer connected via serial cable or wifi).</td>
</tr>
 
</tbody></table>

## VTOL

VTOL vehicles support both fixed-wing and multicopter flight modes, executing them based on the current vehicle mode (MC or FW).

VTOL supports [Offboard](../flight_modes/offboard.md) mode in either configuration.


## Key

Key for understanding the table is as follows:

| Symbol                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M                                                                                                                                                                                                                                                                                                                                                                                              | Manual control via RC sticks. RC input is sent directly to the output mixer.                                                                                      |
| S                                                                                                                                                                                                                                                                                                                                                                                              | Assistance from autopilot to stabilize the attitude. RC input is required. Position of RC stick maps to the orientation of vehicle.                               |
| S<sub>rate</sub>                                                                                                                                                                                                                                                                                                                                                                               | Assistance from autopilot to stabilize the attitude rate. RC input is required. Position of RC stick maps to the rate of rotation of vehicle in that orientation. |
| S<sup>+</sup>                                                                                                                                                                                                                                                                                                                                                                                  | Assistance from autopilot to hold position or altitude against wind. RC input is required.                                                                        |
| Auto                                                                                                                                                                                                                                                                                                                                                                                           | This mode is automatic (RC control is disabled by default except to change modes).                                                                                |
| <span id="key_position_fixed"></span><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" />                                                                                                                                                                                                                                 | Sensor(s) that measures position/height needed e.g. optical flow, GPS+barometer, visual-inertial odometry.                                                        |
| <span id="altitude_only"></span><img src="../../assets/site/altitude_icon.svg" title="Altitude fix required (e.g. barometer, rangefinder)" width="20px" />                                                                                                                                                                                                                    | Sensor(s) that measures height/altitude needed e.g. barometer, rangefinder.                                                                                       |
| <span id="key_difficulty"></span>[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" />](#key_difficulty) | Flight mode difficulty (easy/medium/hard).                                                                                                                        |


Abbreviations:
  * RPY: Roll, Pitch, Yaw
  * RPT: Roll, Pitch Throttle

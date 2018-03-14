# Fixed Wing Flight Modes Summary

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup>
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
 

</tbody></table>



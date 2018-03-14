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
 <td style="vertical-align: middle;">M</td>
 <td style="vertical-align: middle;">M</td>
 <td style="vertical-align: middle;">M</td>
 <td></td>
 <td>User RC sticks input directly sent to the output mixer for manual control.</td>
</tr>

</tbody></table>


<p>&nbsp;</p>
<table>
<thead>
   <tr><th>Modes</th><th>Roll & Pitch</th><th>Yaw<th>Throttle</th><th>Position Sensors</th><th>Summary</th></tr>
 </thead>
	<tbody>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Manual</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>&nbsp;</td>
			<td>
				<p><span style="font-weight: 400;">User RC sticks input directly sent to the output mixer for manual control.</span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Stabilized</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>&nbsp;</td>
			<td>
				<p><span style="font-weight: 400;">If zero roll/pitch sticks - vehicle levels out.</span></p>
				<br />
				<p><span style="font-weight: 400;">If non-zero roll/pitch sticks - vehicle does a coordinated turn.</span></p>
				<br />
				<p><span style="font-weight: 400;">Manual yaw input is added to rudder control input- to control sideslip.</span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Acro</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S</span><em><span style="font-weight: 400;">rate</span></em></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S </span><em><span style="font-weight: 400;">rate</span></em></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>&nbsp;</td>
			<td>
				<p><span style="font-weight: 400;">RC RPY stick inputs are translated to angular rate commands that are stabilized by autopilot.</span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Altitude Control</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S (roll)</span></p>
				<br />
				<p><span style="font-weight: 400;">S</span><span style="font-weight: 400;">+ </span><span style="font-weight: 400;">(pitch)</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">M</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S</span><span style="font-weight: 400;">+</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y*</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Centered RC RPY sticks and 50% throttle &ndash; autopilot holds current altitude against wind and gives level flight.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">* Only requires </span><span style="font-weight: 400;">altitude</span><span style="font-weight: 400;"> sensor (e.g. Baro, Rangefinder).</span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Position Control</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S</span><span style="font-weight: 400;">+</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S</span><span style="font-weight: 400;">+</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">S</span><span style="font-weight: 400;">+</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Centered RC RPY sticks &ndash; gives level flight that follows a straight line ground track in the current direction against any wind.</span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Take Off</span></p>
			</td>
			<td colspan="3">
				<p><span style="font-weight: 400;">Auto</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">The aircraft takes off in the current direction using either </span><a href="https://docs.px4.io/en/flight_modes/takeoff.html#fixed-wing-fw"><em><span style="font-weight: 400;">catapult/hand-launch mode</span></em><span style="font-weight: 400;"> or </span><em><span style="font-weight: 400;">runway takeoff mode</span></em></a><span style="font-weight: 400;">.</span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Land</span></p>
			</td>
			<td colspan="3">
				<p><span style="font-weight: 400;">Auto</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><a href="https://docs.px4.io/en/flying/fixed_wing_landing.html"><span style="font-weight: 400;">FW landing</span></a><span style="font-weight: 400;"> is initiated. </span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Loiter/Hold</span></p>
			</td>
			<td colspan="3">
				<p><span style="font-weight: 400;">Auto</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">The aircraft circles around the GPS hold position at the current altitude. </span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Return to Land</span></p>
			</td>
			<td colspan="3">
				<p><span style="font-weight: 400;">Auto</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">The aircraft will first ascend to the </span><a href="https://docs.px4.io/en/advanced_config/parameter_reference.html#RTL_RETURN_ALT"><span style="font-weight: 400;">RTL_RETURN_ALT</span></a><span style="font-weight: 400;"> altitude and then fly to the home position in a straight line (if already above </span><span style="font-weight: 400;">RTL_RETURN_ALT</span><span style="font-weight: 400;"> it will return at its current altitude). Either lands or loiters above the home position depending on the value of </span><a href="https://docs.px4.io/en/flight_modes/rtl.html#RTL_LAND_DELAY"><span style="font-weight: 400;">RTL_LAND_DELAY</span></a><span style="font-weight: 400;">. </span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Mission</span></p>
			</td>
			<td colspan="3">
				<p><span style="font-weight: 400;">Auto</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Vehicle executes a </span><a href="https://docs.px4.io/en/flying/missions.html"><span style="font-weight: 400;">predefined mission/flight plan</span></a><span style="font-weight: 400;"> that has been uploaded to the flight controller. </span></p>
			</td>
		</tr>
		<tr>
			<td>
				<p><span style="font-weight: 400;">Offboard</span></p>
			</td>
			<td colspan="3">
				<p><span style="font-weight: 400;">Auto</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">Y</span></p>
			</td>
			<td>
				<p><span style="font-weight: 400;">(only supported for VTOL) The vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).</span></p>
			</td>
		</tr>
	</tbody>
</table>
<p>&nbsp;</p>

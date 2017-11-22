# Parameter Reference
> **Note** **This list is auto-generated from the source code** and contains the most recent parameter documentation.

## Attitude EKF estimator


The module where these parameters are defined is: *examples/attitude_estimator_ekf*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_J11">ATT_J11</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Moment of inertia matrix diagonal entry (1, 1)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0018 </td>
 <td style="vertical-align: top;">kg*m^2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_J22">ATT_J22</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Moment of inertia matrix diagonal entry (2, 2)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0018 </td>
 <td style="vertical-align: top;">kg*m^2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_J33">ATT_J33</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Moment of inertia matrix diagonal entry (3, 3)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0037 </td>
 <td style="vertical-align: top;">kg*m^2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_J_EN">ATT_J_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Moment of inertia enabled in estimator</p><p><strong>Comment:</strong> If set to != 0 the moment of inertia will be used in the estimator</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V3_Q0">EKF_ATT_V3_Q0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Body angular rate process noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1e-4 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V3_Q1">EKF_ATT_V3_Q1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Body angular acceleration process noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.08 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V3_Q2">EKF_ATT_V3_Q2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acceleration process noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.009 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V3_Q3">EKF_ATT_V3_Q3</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnet field vector process noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.005 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V4_R0">EKF_ATT_V4_R0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro measurement noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0008 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V4_R1">EKF_ATT_V4_R1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accel measurement noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10000.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF_ATT_V4_R2">EKF_ATT_V4_R2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Mag measurement noise</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Attitude Q estimator


The module where these parameters are defined is: *modules/attitude_estimator_q*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_ACC_COMP">ATT_ACC_COMP</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Acceleration compensation based on GPS
velocity</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_BIAS_MAX">ATT_BIAS_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro bias limit</p>    </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_EXT_HDG_M">ATT_EXT_HDG_M</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>External heading usage mode (from Motion capture/Vision)
Set to 1 to use heading estimate from vision.
Set to 2 to use heading from motion capture</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> None</li> 

<li><strong>1:</strong> Vision</li> 

<li><strong>2:</strong> Motion Capture</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_MAG_DECL">ATT_MAG_DECL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetic declination, in degrees</p><p><strong>Comment:</strong> This parameter is not used in normal operation, as the declination is looked up based on the GPS coordinates of the vehicle.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_MAG_DECL_A">ATT_MAG_DECL_A</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Automatic GPS based declination compensation</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_W_ACC">ATT_W_ACC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Complimentary filter accelerometer weight</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_W_EXT_HDG">ATT_W_EXT_HDG</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Complimentary filter external heading weight</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_W_GYRO_BIAS">ATT_W_GYRO_BIAS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Complimentary filter gyroscope bias weight</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_W_MAG">ATT_W_MAG</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Complimentary filter magnetometer weight</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Battery Calibration

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_A_PER_V">BAT_A_PER_V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Battery current per volt (A/V)</p><p><strong>Comment:</strong> The voltage seen by the 3.3V ADC multiplied by this factor will determine the battery current. A value of -1 means to use the board default.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_CAPACITY">BAT_CAPACITY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Battery capacity</p><p><strong>Comment:</strong> Defines the capacity of the attached battery.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">-1.0 > 100000 (50)</td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">mA</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_CNT_V_CURR">BAT_CNT_V_CURR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Scaling from ADC counts to volt on the ADC input (battery current)</p><p><strong>Comment:</strong> This is not the battery current, but the intermediate ADC voltage. A value of -1 signifies that the board defaults are used, which is highly recommended.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_CNT_V_VOLT">BAT_CNT_V_VOLT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Scaling from ADC counts to volt on the ADC input (battery voltage)</p><p><strong>Comment:</strong> This is not the battery voltage, but the intermediate ADC voltage. A value of -1 signifies that the board defaults are used, which is highly recommended.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_CRIT_THR">BAT_CRIT_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Critical threshold</p><p><strong>Comment:</strong> Sets the threshold when the battery will be reported as critically low. This has to be lower than the low threshold. This threshold commonly will trigger RTL.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0.05 > 0.1 (0.01)</td>
 <td style="vertical-align: top;">0.07 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_EMERGEN_THR">BAT_EMERGEN_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Emergency threshold</p><p><strong>Comment:</strong> Sets the threshold when the battery will be reported as dangerously low. This has to be lower than the critical threshold. This threshold commonly will trigger landing.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0.03 > 0.07 (0.01)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_LOW_THR">BAT_LOW_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Low threshold</p><p><strong>Comment:</strong> Sets the threshold when the battery will be reported as low. This has to be higher than the critical threshold.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0.12 > 0.4 (0.01)</td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_N_CELLS">BAT_N_CELLS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Number of cells</p><p><strong>Comment:</strong> Defines the number of cells the attached battery consists of.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unconfigured</li> 

<li><strong>2:</strong> 2S Battery</li> 

<li><strong>3:</strong> 3S Battery</li> 

<li><strong>4:</strong> 4S Battery</li> 

<li><strong>5:</strong> 5S Battery</li> 

<li><strong>6:</strong> 6S Battery</li> 

<li><strong>7:</strong> 7S Battery</li> 

<li><strong>8:</strong> 8S Battery</li> 

<li><strong>9:</strong> 9S Battery</li> 

<li><strong>10:</strong> 10S Battery</li> 

<li><strong>11:</strong> 11S Battery</li> 

<li><strong>12:</strong> 12S Battery</li> 

<li><strong>13:</strong> 13S Battery</li> 

<li><strong>14:</strong> 14S Battery</li> 

<li><strong>15:</strong> 15S Battery</li> 

<li><strong>16:</strong> 16S Battery</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">S</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_R_INTERNAL">BAT_R_INTERNAL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Explicitly defines the per cell internal resistance</p><p><strong>Comment:</strong> If non-negative, then this will be used in place of BAT_V_LOAD_DROP for all calculations.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">-1.0 > 0.2 </td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">Ohms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_SOURCE">BAT_SOURCE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Battery monitoring source</p><p><strong>Comment:</strong> This parameter controls the source of battery data. The value 'Power Module' means that measurements are expected to come from a power module. If the value is set to 'External' then the system expects to receive mavlink battery status messages.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Power Module</li> 

<li><strong>1:</strong> External</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_V_CHARGED">BAT_V_CHARGED</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Full cell voltage (5C load)</p><p><strong>Comment:</strong> Defines the voltage where a single cell of the battery is considered full under a mild load. This will never be the nominal voltage of 4.2V</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">(0.01)</td>
 <td style="vertical-align: top;">4.05 </td>
 <td style="vertical-align: top;">V</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_V_DIV">BAT_V_DIV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Battery voltage divider (V divider)</p><p><strong>Comment:</strong> This is the divider from battery voltage to 3.3V ADC voltage. If using e.g. Mauch power modules the value from the datasheet can be applied straight here. A value of -1 means to use the board default.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_V_EMPTY">BAT_V_EMPTY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Empty cell voltage (5C load)</p><p><strong>Comment:</strong> Defines the voltage where a single cell of the battery is considered empty. The voltage should be chosen before the steep dropoff to 2.8V. A typical lithium battery can only be discharged down to 10% before it drops off to a voltage level damaging the cells.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">(0.01)</td>
 <td style="vertical-align: top;">3.4 </td>
 <td style="vertical-align: top;">V</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_V_LOAD_DROP">BAT_V_LOAD_DROP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Voltage drop per cell on full throttle</p><p><strong>Comment:</strong> This implicitely defines the internal resistance to maximum current ratio and assumes linearity. A good value to use is the difference between the 5C and 20-25C load. Not used if BAT_R_INTERNAL is set.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0.07 > 0.5 (0.01)</td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">V</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_V_OFFS_CURR">BAT_V_OFFS_CURR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Offset in volt as seen by the ADC input of the current sensor</p><p><strong>Comment:</strong> This offset will be subtracted before calculating the battery current based on the voltage.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BAT_V_SCALE_IO">BAT_V_SCALE_IO</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Scaling factor for battery voltage sensor on PX4IO</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1 > 100000 </td>
 <td style="vertical-align: top;">10000 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Camera Control


The module where these parameters are defined is: *modules/camera_feedback*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="CAM_FBACK_MODE">CAM_FBACK_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Camera feedback mode</p><p><strong>Comment:</strong> Sets the camera feedback mode.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Feedback on trigger</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Camera trigger


The module where these parameters are defined is: *drivers/camera_trigger*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_ACT_TIME">TRIG_ACT_TIME</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Camera trigger activation time</p><p><strong>Comment:</strong> This parameter sets the time the trigger needs to pulled high or low.</p>    </td>
 <td style="vertical-align: top;">0.1 > 3000 </td>
 <td style="vertical-align: top;">40.0 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_DISTANCE">TRIG_DISTANCE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Camera trigger distance</p><p><strong>Comment:</strong> Sets the distance at which to trigger the camera.</p>    </td>
 <td style="vertical-align: top;">0 > ? (1)</td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_INTERFACE">TRIG_INTERFACE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Camera trigger Interface</p><p><strong>Comment:</strong> Selects the trigger interface</p> <strong>Values:</strong><ul>
<li><strong>1:</strong> GPIO</li> 

<li><strong>2:</strong> Seagull MAP2 (over PWM)</li> 

<li><strong>3:</strong> MAVLink (forward via MAV_CMD_IMAGE_START_CAPTURE)</li> 

<li><strong>4:</strong> Generic PWM (IR trigger, servo)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">4 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_INTERVAL">TRIG_INTERVAL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Camera trigger interval</p><p><strong>Comment:</strong> This parameter sets the time between two consecutive trigger events</p>    </td>
 <td style="vertical-align: top;">4.0 > 10000.0 </td>
 <td style="vertical-align: top;">40.0 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_MODE">TRIG_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Camera trigger mode</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Time based, on command</li> 

<li><strong>2:</strong> Time based, always on</li> 

<li><strong>3:</strong> Distance based, always on</li> 

<li><strong>4:</strong> Distance based, on command (Survey mode)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 4 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_PINS">TRIG_PINS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Camera trigger pin</p><p><strong>Comment:</strong> Selects which pin is used, ranges from 1 to 6 (AUX1-AUX6 on px4fmu-v2 and the rail pins on px4fmu-v4). The PWM interface takes two pins per camera, while relay triggers on every pin individually. Example: Value 56 would trigger on pins 5 and 6.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">1 > 123456 </td>
 <td style="vertical-align: top;">56 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIG_POLARITY">TRIG_POLARITY</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Camera trigger polarity</p><p><strong>Comment:</strong> This parameter sets the polarity of the trigger (0 = active low, 1 = active high )</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Active low</li> 

<li><strong>1:</strong> Active high</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Circuit Breaker


The module where these parameters are defined is: *modules/systemlib*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_AIRSPD_CHK">CBRK_AIRSPD_CHK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for airspeed sensor</p><p><strong>Comment:</strong> Setting this parameter to 162128 will disable the check for an airspeed sensor. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 162128 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_BUZZER">CBRK_BUZZER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for disabling buzzer</p><p><strong>Comment:</strong> Setting this parameter to 782097 will disable the buzzer audio notification. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 782097 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_ENGINEFAIL">CBRK_ENGINEFAIL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for engine failure detection</p><p><strong>Comment:</strong> Setting this parameter to 284953 will disable the engine failure detection. If the aircraft is in engine failure mode the engine failure flag will be set to healthy WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 284953 </td>
 <td style="vertical-align: top;">284953 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_FLIGHTTERM">CBRK_FLIGHTTERM</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for flight termination</p><p><strong>Comment:</strong> Setting this parameter to 121212 will disable the flight termination action. --> The IO driver will not do flight termination if requested by the FMU WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 121212 </td>
 <td style="vertical-align: top;">121212 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_GPSFAIL">CBRK_GPSFAIL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for GPS failure detection</p><p><strong>Comment:</strong> Setting this parameter to 240024 will disable the GPS failure detection. If this check is enabled, then the sensor check will fail if the GPS module is missing. It will also check for excessive signal noise on the GPS receiver and warn the user if detected. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 240024 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_IO_SAFETY">CBRK_IO_SAFETY</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for IO safety</p><p><strong>Comment:</strong> Setting this parameter to 22027 will disable IO safety. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 22027 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_RATE_CTRL">CBRK_RATE_CTRL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for rate controller output</p><p><strong>Comment:</strong> Setting this parameter to 140253 will disable the rate controller uORB publication. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 140253 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_SUPPLY_CHK">CBRK_SUPPLY_CHK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for power supply check</p><p><strong>Comment:</strong> Setting this parameter to 894281 will disable the power valid checks in the commander. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 894281 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_USB_CHK">CBRK_USB_CHK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for USB link check</p><p><strong>Comment:</strong> Setting this parameter to 197848 will disable the USB connected checks in the commander. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 197848 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_VELPOSERR">CBRK_VELPOSERR</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Circuit breaker for position error check</p><p><strong>Comment:</strong> Setting this parameter to 201607 will disable the position and velocity accuracy checks in the commander. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 201607 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Commander


The module where these parameters are defined is: *modules/commander*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_AUTH">COM_ARM_AUTH</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Arm authorization parameters, this uint32_t will be splitted between starting from the LSB:
- 8bits to authorizer system id
- 16bits to authentication method parameter, this will be used to store a timeout for the first 2 methods but can be used to another parameter for other new authentication methods.
- 7bits to authentication method
- one arm = 0
- two step arm = 1
* the MSB bit is not used to avoid problems in the conversion between int and uint</p><p><strong>Comment:</strong> Default value: (10 << 0 | 1000 << 8 | 0 << 24) = 256010 - authorizer system id = 10 - authentication method parameter = 10000msec of timeout - authentication method = during arm</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">256010 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_EKF_AB">COM_ARM_EKF_AB</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum value of EKF accelerometer delta velocity bias estimate that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.001 > 0.01 (0.0005)</td>
 <td style="vertical-align: top;">5.0e-3 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_EKF_GB">COM_ARM_EKF_GB</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum value of EKF gyro delta angle bias estimate that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.0001 > 0.0017 (0.0001)</td>
 <td style="vertical-align: top;">8.7e-4 </td>
 <td style="vertical-align: top;">rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_EKF_HGT">COM_ARM_EKF_HGT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum EKF height innovation test ratio that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_EKF_POS">COM_ARM_EKF_POS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum EKF position innovation test ratio that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_EKF_VEL">COM_ARM_EKF_VEL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum EKF velocity innovation test ratio that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_EKF_YAW">COM_ARM_EKF_YAW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum EKF yaw innovation test ratio that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_IMU_ACC">COM_ARM_IMU_ACC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum accelerometer inconsistency between IMU units that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.7 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_IMU_GYR">COM_ARM_IMU_GYR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum rate gyro inconsistency between IMU units that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.02 > 0.3 (0.01)</td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_MAG">COM_ARM_MAG</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum magnetic field inconsistency between units that will allow arming</p>    </td>
 <td style="vertical-align: top;">0.05 > 0.5 (0.05)</td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;">Gauss</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_MIS_REQ">COM_ARM_MIS_REQ</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Require valid mission to arm</p><p><strong>Comment:</strong> The default allows to arm the vehicle without a valid mission.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_SWISBTN">COM_ARM_SWISBTN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Arm switch is only a button</p><p><strong>Comment:</strong> The default uses the arm switch as real switch. If parameter set button gets handled like stick arming.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Arm switch is a switch that stays on when armed</li> 

<li><strong>1:</strong> Arm switch is a button that only triggers arming and disarming</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_ARM_WO_GPS">COM_ARM_WO_GPS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Allow arming without GPS</p><p><strong>Comment:</strong> The default allows to arm the vehicle without GPS signal.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_DISARM_LAND">COM_DISARM_LAND</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Time-out for auto disarm after landing</p><p><strong>Comment:</strong> A non-zero, positive value specifies the time-out period in seconds after which the vehicle will be automatically disarmed in case a landing situation has been detected during this period. The vehicle will also auto-disarm right after arming if it has not even flown, however the time will be longer by a factor of 5. A value of zero means that automatic disarming is disabled.</p>    </td>
 <td style="vertical-align: top;">0 > 20 (1)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_DL_LOSS_T">COM_DL_LOSS_T</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Datalink loss time threshold</p><p><strong>Comment:</strong> After this amount of seconds without datalink the data link lost mode triggers</p>    </td>
 <td style="vertical-align: top;">5 > 300 (0.5)</td>
 <td style="vertical-align: top;">10 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_DL_REG_T">COM_DL_REG_T</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Datalink regain time threshold</p><p><strong>Comment:</strong> After a data link loss: after this this amount of seconds with a healthy datalink the 'datalink loss' flag is set back to false</p>    </td>
 <td style="vertical-align: top;">0 > 3 (0.5)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_EF_C2T">COM_EF_C2T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Engine Failure Current/Throttle Threshold</p><p><strong>Comment:</strong> Engine failure triggers only below this current value</p>    </td>
 <td style="vertical-align: top;">0.0 > 50.0 (1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">A/%</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_EF_THROT">COM_EF_THROT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Engine Failure Throttle Threshold</p><p><strong>Comment:</strong> Engine failure triggers only above this throttle value</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_EF_TIME">COM_EF_TIME</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Engine Failure Time Threshold</p><p><strong>Comment:</strong> Engine failure triggers only if the throttle threshold and the current to throttle threshold are violated for this time</p>    </td>
 <td style="vertical-align: top;">0.0 > 60.0 (1)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLIGHT_UUID">COM_FLIGHT_UUID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Next flight UUID</p><p><strong>Comment:</strong> This number is incremented automatically after every flight on disarming in order to remember the next flight UUID. The first flight is 0.</p>    </td>
 <td style="vertical-align: top;">0 > ? </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLTMODE1">COM_FLTMODE1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>First flightmode slot (1000-1160)</p><p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Unassigned</li> 

<li><strong>0:</strong> Manual</li> 

<li><strong>1:</strong> Altitude</li> 

<li><strong>2:</strong> Position</li> 

<li><strong>3:</strong> Mission</li> 

<li><strong>4:</strong> Hold</li> 

<li><strong>5:</strong> Return</li> 

<li><strong>6:</strong> Acro</li> 

<li><strong>7:</strong> Offboard</li> 

<li><strong>8:</strong> Stabilized</li> 

<li><strong>9:</strong> Rattitude</li> 

<li><strong>10:</strong> Takeoff</li> 

<li><strong>11:</strong> Land</li> 

<li><strong>12:</strong> Follow Me</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLTMODE2">COM_FLTMODE2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Second flightmode slot (1160-1320)</p><p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Unassigned</li> 

<li><strong>0:</strong> Manual</li> 

<li><strong>1:</strong> Altitude</li> 

<li><strong>2:</strong> Position</li> 

<li><strong>3:</strong> Mission</li> 

<li><strong>4:</strong> Hold</li> 

<li><strong>5:</strong> Return</li> 

<li><strong>6:</strong> Acro</li> 

<li><strong>7:</strong> Offboard</li> 

<li><strong>8:</strong> Stabilized</li> 

<li><strong>9:</strong> Rattitude</li> 

<li><strong>10:</strong> Takeoff</li> 

<li><strong>11:</strong> Land</li> 

<li><strong>12:</strong> Follow Me</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLTMODE3">COM_FLTMODE3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Third flightmode slot (1320-1480)</p><p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Unassigned</li> 

<li><strong>0:</strong> Manual</li> 

<li><strong>1:</strong> Altitude</li> 

<li><strong>2:</strong> Position</li> 

<li><strong>3:</strong> Mission</li> 

<li><strong>4:</strong> Hold</li> 

<li><strong>5:</strong> Return</li> 

<li><strong>6:</strong> Acro</li> 

<li><strong>7:</strong> Offboard</li> 

<li><strong>8:</strong> Stabilized</li> 

<li><strong>9:</strong> Rattitude</li> 

<li><strong>10:</strong> Takeoff</li> 

<li><strong>11:</strong> Land</li> 

<li><strong>12:</strong> Follow Me</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLTMODE4">COM_FLTMODE4</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Fourth flightmode slot (1480-1640)</p><p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Unassigned</li> 

<li><strong>0:</strong> Manual</li> 

<li><strong>1:</strong> Altitude</li> 

<li><strong>2:</strong> Position</li> 

<li><strong>3:</strong> Mission</li> 

<li><strong>4:</strong> Hold</li> 

<li><strong>5:</strong> Return</li> 

<li><strong>6:</strong> Acro</li> 

<li><strong>7:</strong> Offboard</li> 

<li><strong>8:</strong> Stabilized</li> 

<li><strong>9:</strong> Rattitude</li> 

<li><strong>10:</strong> Takeoff</li> 

<li><strong>11:</strong> Land</li> 

<li><strong>12:</strong> Follow Me</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLTMODE5">COM_FLTMODE5</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Fifth flightmode slot (1640-1800)</p><p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Unassigned</li> 

<li><strong>0:</strong> Manual</li> 

<li><strong>1:</strong> Altitude</li> 

<li><strong>2:</strong> Position</li> 

<li><strong>3:</strong> Mission</li> 

<li><strong>4:</strong> Hold</li> 

<li><strong>5:</strong> Return</li> 

<li><strong>6:</strong> Acro</li> 

<li><strong>7:</strong> Offboard</li> 

<li><strong>8:</strong> Stabilized</li> 

<li><strong>9:</strong> Rattitude</li> 

<li><strong>10:</strong> Takeoff</li> 

<li><strong>11:</strong> Land</li> 

<li><strong>12:</strong> Follow Me</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_FLTMODE6">COM_FLTMODE6</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Sixth flightmode slot (1800-2000)</p><p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Unassigned</li> 

<li><strong>0:</strong> Manual</li> 

<li><strong>1:</strong> Altitude</li> 

<li><strong>2:</strong> Position</li> 

<li><strong>3:</strong> Mission</li> 

<li><strong>4:</strong> Hold</li> 

<li><strong>5:</strong> Return</li> 

<li><strong>6:</strong> Acro</li> 

<li><strong>7:</strong> Offboard</li> 

<li><strong>8:</strong> Stabilized</li> 

<li><strong>9:</strong> Rattitude</li> 

<li><strong>10:</strong> Takeoff</li> 

<li><strong>11:</strong> Land</li> 

<li><strong>12:</strong> Follow Me</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_HOME_H_T">COM_HOME_H_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Home set horizontal threshold</p><p><strong>Comment:</strong> The home position will be set if the estimated positioning accuracy is below the threshold.</p>    </td>
 <td style="vertical-align: top;">2 > 15 (0.5)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_HOME_V_T">COM_HOME_V_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Home set vertical threshold</p><p><strong>Comment:</strong> The home position will be set if the estimated positioning accuracy is below the threshold.</p>    </td>
 <td style="vertical-align: top;">5 > 25 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_LOW_BAT_ACT">COM_LOW_BAT_ACT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Battery failsafe mode</p><p><strong>Comment:</strong> Action the system takes on low battery. Defaults to off</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Warning</li> 

<li><strong>1:</strong> Return to land</li> 

<li><strong>2:</strong> Land at current position</li> 

<li><strong>3:</strong> Return to land at critically low level, land at current position if reaching dangerously low levels</li> 
</ul>
   </td>
 <td style="vertical-align: top;">(1)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_OF_LOSS_T">COM_OF_LOSS_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Time-out to wait when offboard connection is lost before triggering offboard lost action.
See COM_OBL_ACT and COM_OBL_RC_ACT to configure action</p>    </td>
 <td style="vertical-align: top;">0 > 60 (1)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">second</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_POS_FS_DELAY">COM_POS_FS_DELAY</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Loss of position failsafe activation delay</p><p><strong>Comment:</strong> This sets number of seconds that the position checks need to be failed before the failsafe will activate. The default value has been optimised for rotary wing applications. For fixed wing applications, a larger value between 5 and 10 should be used.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;">sec</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_POS_FS_GAIN">COM_POS_FS_GAIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Loss of position probation gain factor</p><p><strong>Comment:</strong> This sets the rate that the loss of position probation time grows when position checks are failing. The default value has been optimised for rotary wing applications. For fixed wing applications a value of 0 should be used.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_POS_FS_PROB">COM_POS_FS_PROB</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Loss of position probation delay at takeoff</p><p><strong>Comment:</strong> The probation delay is the number of seconds that the EKF innovation checks need to pass for the position to be declared good after it has been declared bad. The probation delay will be reset to this parameter value when takeoff is detected. After takeoff, if position checks are passing, the probation delay will reduce by one second for every lapsed second of valid position down to a minimum of 1 second. If position checks are failing, the probation delay will increase by COM_POS_FS_GAIN seconds for every lapsed second up to a maximum of 100 seconds. The default value has been optimised for rotary wing applications. For fixed wing applications, a value of 1 should be used.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">30 </td>
 <td style="vertical-align: top;">sec</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_RC_ARM_HYST">COM_RC_ARM_HYST</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>RC input arm/disarm command duration</p><p><strong>Comment:</strong> The default value of 1000 requires the stick to be held in the arm or disarm position for 1 second.</p>    </td>
 <td style="vertical-align: top;">100 > 1500 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_RC_IN_MODE">COM_RC_IN_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>RC control input mode</p><p><strong>Comment:</strong> The default value of 0 requires a valid RC transmitter setup. Setting this to 1 allows joystick control and disables RC input handling and the associated checks. A value of 2 will generate RC control data from manual input received via MAVLink instead of directly forwarding the manual input data.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> RC Transmitter</li> 

<li><strong>1:</strong> Joystick/No RC Checks</li> 

<li><strong>2:</strong> Virtual RC by Joystick</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_RC_LOSS_T">COM_RC_LOSS_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC loss time threshold</p><p><strong>Comment:</strong> After this amount of seconds without RC connection the rc lost flag is set to true</p>    </td>
 <td style="vertical-align: top;">0 > 35 (0.1)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_RC_OVERRIDE">COM_RC_OVERRIDE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable RC stick override of auto modes</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_RC_STICK_OV">COM_RC_STICK_OV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC stick override threshold</p><p><strong>Comment:</strong> If an RC stick is moved more than by this amount the system will interpret this as override request by the pilot.</p>    </td>
 <td style="vertical-align: top;">5 > 40 (0.05)</td>
 <td style="vertical-align: top;">12.0 </td>
 <td style="vertical-align: top;">%</td>
</tr>
</tbody></table>

## Data Link Loss


The module where these parameters are defined is: *modules/navigator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_AH_ALT">NAV_AH_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airfield home alt</p><p><strong>Comment:</strong> Altitude of airfield home waypoint</p>    </td>
 <td style="vertical-align: top;">-50 > ? (0.5)</td>
 <td style="vertical-align: top;">600.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_AH_LAT">NAV_AH_LAT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Airfield home Lat</p><p><strong>Comment:</strong> Latitude of airfield home waypoint</p>    </td>
 <td style="vertical-align: top;">-900000000 > 900000000 </td>
 <td style="vertical-align: top;">-265847810 </td>
 <td style="vertical-align: top;">deg * 1e7</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_AH_LON">NAV_AH_LON</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Airfield home Lon</p><p><strong>Comment:</strong> Longitude of airfield home waypoint</p>    </td>
 <td style="vertical-align: top;">-1800000000 > 1800000000 </td>
 <td style="vertical-align: top;">1518423250 </td>
 <td style="vertical-align: top;">deg * 1e7</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_AH_T">NAV_DLL_AH_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airfield home wait time</p><p><strong>Comment:</strong> The amount of time in seconds the system should wait at the airfield home waypoint</p>    </td>
 <td style="vertical-align: top;">0.0 > 3600.0 (1)</td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_CHSK">NAV_DLL_CHSK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Skip comms hold wp</p><p><strong>Comment:</strong> If set to 1 the system will skip the comms hold wp on data link loss and will directly fly to airfield home</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_CH_ALT">NAV_DLL_CH_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Comms hold alt</p><p><strong>Comment:</strong> Altitude of comms hold waypoint</p>    </td>
 <td style="vertical-align: top;">-50 > 30000 (0.5)</td>
 <td style="vertical-align: top;">600.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_CH_LAT">NAV_DLL_CH_LAT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Comms hold Lat</p><p><strong>Comment:</strong> Latitude of comms hold waypoint</p>    </td>
 <td style="vertical-align: top;">-900000000 > 900000000 </td>
 <td style="vertical-align: top;">-266072120 </td>
 <td style="vertical-align: top;">deg * 1e7</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_CH_LON">NAV_DLL_CH_LON</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Comms hold Lon</p><p><strong>Comment:</strong> Longitude of comms hold waypoint</p>    </td>
 <td style="vertical-align: top;">-1800000000 > 1800000000 </td>
 <td style="vertical-align: top;">1518453890 </td>
 <td style="vertical-align: top;">deg * 1e7</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_CH_T">NAV_DLL_CH_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Comms hold wait time</p><p><strong>Comment:</strong> The amount of time in seconds the system should wait at the comms hold waypoint</p>    </td>
 <td style="vertical-align: top;">0.0 > 3600.0 (1)</td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_N">NAV_DLL_N</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Number of allowed Datalink timeouts</p><p><strong>Comment:</strong> After more than this number of data link timeouts the aircraft returns home directly</p>    </td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## EKF2


The module where these parameters are defined is: *modules/ekf2*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ABIAS_INIT">EKF2_ABIAS_INIT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>1-sigma IMU accelerometer switch-on bias</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0.0 > 0.5 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ABL_ACCLIM">EKF2_ABL_ACCLIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum IMU accel magnitude that allows IMU bias learning.
If the magnitude of the IMU accelerometer vector exceeds this value, the EKF delta velocity state estimation will be inhibited.
This reduces the adverse effect of high manoeuvre accelerations and IMU nonlinerity and scale factor errors on the delta velocity bias estimates</p>    </td>
 <td style="vertical-align: top;">20.0 > 200.0 </td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ABL_GYRLIM">EKF2_ABL_GYRLIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum IMU gyro angular rate magnitude that allows IMU bias learning.
If the magnitude of the IMU angular rate vector exceeds this value, the EKF delta velocity state estimation will be inhibited.
This reduces the adverse effect of rapid rotation rates and associated errors on the delta velocity bias estimates</p>    </td>
 <td style="vertical-align: top;">2.0 > 20.0 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ABL_LIM">EKF2_ABL_LIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer bias learning limit. The ekf delta velocity bias states will be limited to within a range equivalent to +- of this value</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.8 </td>
 <td style="vertical-align: top;">0.4 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ABL_TAU">EKF2_ABL_TAU</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Time constant used by acceleration and angular rate magnitude checks used to inhibit delta velocity bias learning.
The vector magnitude of angular rate and acceleration used to check if learning should be inhibited has a peak hold filter applied to it with an exponential decay.
This parameter controls the time constant of the decay</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ACC_B_NOISE">EKF2_ACC_B_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Process noise for IMU accelerometer bias prediction</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.01 </td>
 <td style="vertical-align: top;">3.0e-3 </td>
 <td style="vertical-align: top;">m/s**3</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ACC_NOISE">EKF2_ACC_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer noise for covariance prediction</p>    </td>
 <td style="vertical-align: top;">0.01 > 1.0 </td>
 <td style="vertical-align: top;">3.5e-1 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_AID_MASK">EKF2_AID_MASK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Integer bitmask controlling data fusion and aiding methods</p><p><strong>Comment:</strong> Set bits in the following positions to enable: 0 : Set to true to use GPS data if available 1 : Set to true to use optical flow data if available 2 : Set to true to inhibit IMU bias estimation 3 : Set to true to enable vision position fusion 4 : Set to true to enable vision yaw fusion 5 : Set to true to enable multi-rotor drag specific force fusion</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> use GPS</li> 
  <li><strong>1:</strong> use optical flow</li> 
  <li><strong>2:</strong> inhibit IMU bias estimation</li> 
  <li><strong>3:</strong> vision position fusion</li> 
  <li><strong>4:</strong> vision yaw fusion</li> 
  <li><strong>5:</strong> multi-rotor drag fusion</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 63 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ANGERR_INIT">EKF2_ANGERR_INIT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>1-sigma tilt angle uncertainty after gravity vector alignment</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0.0 > 0.5 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ARSP_THR">EKF2_ARSP_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airspeed fusion threshold. A value of zero will deactivate airspeed fusion. Any other positive
value will determine the minimum airspeed which will still be fused</p>    </td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ASPD_MAX">EKF2_ASPD_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Upper limit on airspeed along individual axes used to correct baro for position error effects</p>    </td>
 <td style="vertical-align: top;">5.0 > 50.0 </td>
 <td style="vertical-align: top;">20.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_ASP_DELAY">EKF2_ASP_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airspeed measurement delay relative to IMU measurements</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">100 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_BARO_DELAY">EKF2_BARO_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer measurement delay relative to IMU measurements</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_BARO_GATE">EKF2_BARO_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for barometric and GPS height fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_BARO_NOISE">EKF2_BARO_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for barometric altitude</p>    </td>
 <td style="vertical-align: top;">0.01 > 15.0 </td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_BCOEF_X">EKF2_BCOEF_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>X-axis ballistic coefficient used by the multi-rotor specific drag force model.
This should be adjusted to minimise variance of the X-axis drag specific force innovation sequence</p>    </td>
 <td style="vertical-align: top;">1.0 > 100.0 </td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;">kg/m**2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_BCOEF_Y">EKF2_BCOEF_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Y-axis ballistic coefficient used by the multi-rotor specific drag force model.
This should be adjusted to minimise variance of the Y-axis drag specific force innovation sequence</p>    </td>
 <td style="vertical-align: top;">1.0 > 100.0 </td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;">kg/m**2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_BETA_NOISE">EKF2_BETA_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Noise for synthetic sideslip fusion</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_DECL_TYPE">EKF2_DECL_TYPE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Integer bitmask controlling handling of magnetic declination</p><p><strong>Comment:</strong> Set bits in the following positions to enable functions. 0 : Set to true to use the declination from the geo_lookup library when the GPS position becomes available, set to false to always use the EKF2_MAG_DECL value. 1 : Set to true to save the EKF2_MAG_DECL parameter to the value returned by the EKF when the vehicle disarms. 2 : Set to true to always use the declination as an observation when 3-axis magnetometer fusion is being used.</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> use geo_lookup declination</li> 
  <li><strong>1:</strong> save EKF2_MAG_DECL on disarm</li> 
  <li><strong>2:</strong> use declination as an observation</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 7 </td>
 <td style="vertical-align: top;">7 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_DRAG_NOISE">EKF2_DRAG_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Specific drag force observation noise variance used by the multi-rotor specific drag force model.
Increasing it makes the multi-rotor wind estimates adjust more slowly</p>    </td>
 <td style="vertical-align: top;">0.5 > 10.0 </td>
 <td style="vertical-align: top;">2.5 </td>
 <td style="vertical-align: top;">(m/sec**2)**2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EAS_NOISE">EKF2_EAS_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for airspeed fusion</p>    </td>
 <td style="vertical-align: top;">0.5 > 5.0 </td>
 <td style="vertical-align: top;">1.4 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EVA_NOISE">EKF2_EVA_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for vision angle observations used when the vision system does not supply error estimates</p>    </td>
 <td style="vertical-align: top;">0.01 > ? </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EVP_NOISE">EKF2_EVP_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for vision position observations used when the vision system does not supply error estimates</p>    </td>
 <td style="vertical-align: top;">0.01 > ? </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EV_DELAY">EKF2_EV_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Vision Position Estimator delay relative to IMU measurements</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">175 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EV_GATE">EKF2_EV_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for vision estimate fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EV_POS_X">EKF2_EV_POS_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>X position of VI sensor focal point in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EV_POS_Y">EKF2_EV_POS_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Y position of VI sensor focal point in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_EV_POS_Z">EKF2_EV_POS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z position of VI sensor focal point in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_FUSE_BETA">EKF2_FUSE_BETA</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Boolean determining if synthetic sideslip measurements should fused</p><p><strong>Comment:</strong> A value of 1 indicates that fusion is active</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GBIAS_INIT">EKF2_GBIAS_INIT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>1-sigma IMU gyro switch-on bias</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0.0 > 0.2 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">rad/sec</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_CHECK">EKF2_GPS_CHECK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Integer bitmask controlling GPS checks</p><p><strong>Comment:</strong> Set bits to 1 to enable checks. Checks enabled by the following bit positions 0 : Minimum required sat count set by EKF2_REQ_NSATS 1 : Minimum required GDoP set by EKF2_REQ_GDOP 2 : Maximum allowed horizontal position error set by EKF2_REQ_EPH 3 : Maximum allowed vertical position error set by EKF2_REQ_EPV 4 : Maximum allowed speed error set by EKF2_REQ_SACC 5 : Maximum allowed horizontal position rate set by EKF2_REQ_HDRIFT. This check can only be used if the vehicle is stationary during alignment. 6 : Maximum allowed vertical position rate set by EKF2_REQ_VDRIFT. This check can only be used if the vehicle is stationary during alignment. 7 : Maximum allowed horizontal speed set by EKF2_REQ_HDRIFT. This check can only be used if the vehicle is stationary during alignment. 8 : Maximum allowed vertical velocity discrepancy set by EKF2_REQ_VDRIFT</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> Min sat count (EKF2_REQ_NSATS)</li> 
  <li><strong>1:</strong> Min GDoP (EKF2_REQ_GDOP)</li> 
  <li><strong>2:</strong> Max horizontal position error (EKF2_REQ_EPH)</li> 
  <li><strong>3:</strong> Max vertical position error (EKF2_REQ_EPV)</li> 
  <li><strong>4:</strong> Max speed error (EKF2_REQ_SACC)</li> 
  <li><strong>5:</strong> Max horizontal position rate (EKF2_REQ_HDRIFT)</li> 
  <li><strong>6:</strong> Max vertical position rate (EKF2_REQ_VDRIFT)</li> 
  <li><strong>7:</strong> Max horizontal speed (EKF2_REQ_HDRIFT)</li> 
  <li><strong>8:</strong> Max vertical velocity discrepancy (EKF2_REQ_VDRIFT)</li> 
</ul>
  </td>
 <td style="vertical-align: top;">0 > 511 </td>
 <td style="vertical-align: top;">21 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_DELAY">EKF2_GPS_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>GPS measurement delay relative to IMU measurements</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">110 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_POS_X">EKF2_GPS_POS_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>X position of GPS antenna in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_POS_Y">EKF2_GPS_POS_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Y position of GPS antenna in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_POS_Z">EKF2_GPS_POS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z position of GPS antenna in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_P_GATE">EKF2_GPS_P_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for GPS horizontal position fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_P_NOISE">EKF2_GPS_P_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for gps position</p>    </td>
 <td style="vertical-align: top;">0.01 > 10.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_V_GATE">EKF2_GPS_V_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for GPS velocity fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GPS_V_NOISE">EKF2_GPS_V_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for gps horizontal velocity</p>    </td>
 <td style="vertical-align: top;">0.01 > 5.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GYR_B_NOISE">EKF2_GYR_B_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Process noise for IMU rate gyro bias prediction</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.01 </td>
 <td style="vertical-align: top;">1.0e-3 </td>
 <td style="vertical-align: top;">rad/s**2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_GYR_NOISE">EKF2_GYR_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Rate gyro noise for covariance prediction</p>    </td>
 <td style="vertical-align: top;">0.0001 > 0.1 </td>
 <td style="vertical-align: top;">1.5e-2 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_HDG_GATE">EKF2_HDG_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for magnetic heading fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">2.6 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_HEAD_NOISE">EKF2_HEAD_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for magnetic heading fusion</p>    </td>
 <td style="vertical-align: top;">0.01 > 1.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_HGT_MODE">EKF2_HGT_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Determines the primary source of height data used by the EKF</p><p><strong>Comment:</strong> The range sensor option should only be used when for operation over a flat surface as the local NED origin will move up and down with ground level.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Barometric pressure</li> 

<li><strong>1:</strong> GPS</li> 

<li><strong>2:</strong> Range sensor</li> 

<li><strong>3:</strong> Vision</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_IMU_POS_X">EKF2_IMU_POS_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>X position of IMU in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_IMU_POS_Y">EKF2_IMU_POS_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Y position of IMU in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_IMU_POS_Z">EKF2_IMU_POS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z position of IMU in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAGBIAS_ID">EKF2_MAGBIAS_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Magnetometer the learned bias is for</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAGBIAS_X">EKF2_MAGBIAS_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Learned value of magnetometer X axis bias.
This is the amount of X-axis magnetometer bias learned by the EKF and saved from the last flight. It must be set to zero if the ground based magnetometer calibration is repeated</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">mGauss</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAGBIAS_Y">EKF2_MAGBIAS_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Learned value of magnetometer Y axis bias.
This is the amount of Y-axis magnetometer bias learned by the EKF and saved from the last flight. It must be set to zero if the ground based magnetometer calibration is repeated</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">mGauss</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAGBIAS_Z">EKF2_MAGBIAS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Learned value of magnetometer Z axis bias.
This is the amount of Z-axis magnetometer bias learned by the EKF and saved from the last flight. It must be set to zero if the ground based magnetometer calibration is repeated</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">mGauss</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAGB_K">EKF2_MAGB_K</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum fraction of learned mag bias saved at each disarm.
Smaller values make the saved mag bias learn slower from flight to flight. Larger values make it learn faster. Must be > 0.0 and <= 1.0</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAGB_VREF">EKF2_MAGB_VREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>State variance assumed for magnetometer bias storage.
This is a reference variance used to calculate the fraction of learned magnetometer bias that will be used to update the stored value. Smaller values will make the stored bias data adjust more slowly from flight to flight. Larger values will make it adjust faster</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">2.5E-7 </td>
 <td style="vertical-align: top;">mGauss**2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_ACCLIM">EKF2_MAG_ACCLIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Horizontal acceleration threshold used by automatic selection of magnetometer fusion method.
This parameter is used when the magnetometer fusion method is set automatically (EKF2_MAG_TYPE = 0). If the filtered horizontal acceleration is greater than this parameter value, then the EKF will use 3-axis magnetomer fusion</p>    </td>
 <td style="vertical-align: top;">0.0 > 5.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m/s**2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_B_NOISE">EKF2_MAG_B_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Process noise for body magnetic field prediction</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.1 </td>
 <td style="vertical-align: top;">1.0e-4 </td>
 <td style="vertical-align: top;">Gauss/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_DECL">EKF2_MAG_DECL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetic declination</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_DELAY">EKF2_MAG_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer measurement delay relative to IMU measurements</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_E_NOISE">EKF2_MAG_E_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Process noise for earth magnetic field prediction</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.1 </td>
 <td style="vertical-align: top;">1.0e-3 </td>
 <td style="vertical-align: top;">Gauss/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_GATE">EKF2_MAG_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for magnetometer XYZ component fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_NOISE">EKF2_MAG_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for magnetometer 3-axis fusion</p>    </td>
 <td style="vertical-align: top;">0.001 > 1.0 </td>
 <td style="vertical-align: top;">5.0e-2 </td>
 <td style="vertical-align: top;">Gauss</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_TYPE">EKF2_MAG_TYPE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Type of magnetometer fusion</p><p><strong>Comment:</strong> Integer controlling the type of magnetometer fusion used - magnetic heading or 3-axis magnetometer. If set to automatic: heading fusion on-ground and 3-axis fusion in-flight with fallback to heading fusion if there is insufficient motion to make yaw or mag biases observable.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Automatic</li> 

<li><strong>1:</strong> Magnetic heading</li> 

<li><strong>2:</strong> 3-axis fusion</li> 

<li><strong>3:</strong> None</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MAG_YAWLIM">EKF2_MAG_YAWLIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate threshold used by automatic selection of magnetometer fusion method.
This parameter is used when the magnetometer fusion method is set automatically (EKF2_MAG_TYPE = 0). If the filtered yaw rate is greater than this parameter value, then the EKF will use 3-axis magnetomer fusion</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.5 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MIN_OBS_DT">EKF2_MIN_OBS_DT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Minimum time of arrival delta between non-IMU observations before data is downsampled.
Baro and Magnetometer data will be averaged before downsampling, other data will be point sampled resulting in loss of information</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">10 > 50 </td>
 <td style="vertical-align: top;">20 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_MIN_RNG">EKF2_MIN_RNG</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum valid range for the range finder</p>    </td>
 <td style="vertical-align: top;">0.01 > ? </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_NOAID_NOISE">EKF2_NOAID_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for non-aiding position hold</p>    </td>
 <td style="vertical-align: top;">0.5 > 50.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_DELAY">EKF2_OF_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical flow measurement delay relative to IMU measurements
Assumes measurement is timestamped at trailing edge of integration period</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">5 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_GATE">EKF2_OF_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for optical flow fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_N_MAX">EKF2_OF_N_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for the optical flow sensor</p><p><strong>Comment:</strong> (when it's reported quality metric is at the minimum set by EKF2_OF_QMIN). The following condition must be met: EKF2_OF_N_MAXN >= EKF2_OF_N_MIN</p>    </td>
 <td style="vertical-align: top;">0.05 > ? </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_N_MIN">EKF2_OF_N_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for the optical flow sensor when it's reported quality metric is at the maximum</p>    </td>
 <td style="vertical-align: top;">0.05 > ? </td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_POS_X">EKF2_OF_POS_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>X position of optical flow focal point in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_POS_Y">EKF2_OF_POS_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Y position of optical flow focal point in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_POS_Z">EKF2_OF_POS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z position of optical flow focal point in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_QMIN">EKF2_OF_QMIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Optical Flow data will only be used if the sensor reports a quality metric >= EKF2_OF_QMIN</p>    </td>
 <td style="vertical-align: top;">0 > 255 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_OF_RMAX">EKF2_OF_RMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical Flow data will not fused if the magnitude of the flow rate > EKF2_OF_RMAX</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">2.5 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_PCOEF_XN">EKF2_PCOEF_XN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Static pressure position error coefficient for the negative X axis.
This is the ratio of static pressure error to dynamic pressure generated by a negative wind relative velocity along the X body axis.
If the baro height estimate rises during backwards flight, then this will be a negative number</p>    </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_PCOEF_XP">EKF2_PCOEF_XP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Static pressure position error coefficient for the positive X axis
This is the ratio of static pressure error to dynamic pressure generated by a positive wind relative velocity along the X body axis.
If the baro height estimate rises during forward flight, then this will be a negative number</p>    </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_PCOEF_Y">EKF2_PCOEF_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pressure position error coefficient for the Y axis.
This is the ratio of static pressure error to dynamic pressure generated by a wind relative velocity along the Y body axis.
If the baro height estimate rises during sideways flight, then this will be a negative number</p>    </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_PCOEF_Z">EKF2_PCOEF_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Static pressure position error coefficient for the Z axis.
This is the ratio of static pressure error to dynamic pressure generated by a wind relative velocity along the Z body axis</p>    </td>
 <td style="vertical-align: top;">-0.5 > 0.5 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_EPH">EKF2_REQ_EPH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Required EPH to use GPS</p>    </td>
 <td style="vertical-align: top;">2 > 100 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_EPV">EKF2_REQ_EPV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Required EPV to use GPS</p>    </td>
 <td style="vertical-align: top;">2 > 100 </td>
 <td style="vertical-align: top;">8.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_GDOP">EKF2_REQ_GDOP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Required GDoP to use GPS</p>    </td>
 <td style="vertical-align: top;">1.5 > 5.0 </td>
 <td style="vertical-align: top;">2.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_HDRIFT">EKF2_REQ_HDRIFT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal drift speed to use GPS</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_NSATS">EKF2_REQ_NSATS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Required satellite count to use GPS</p>    </td>
 <td style="vertical-align: top;">4 > 12 </td>
 <td style="vertical-align: top;">6 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_SACC">EKF2_REQ_SACC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Required speed accuracy to use GPS</p>    </td>
 <td style="vertical-align: top;">0.5 > 5.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_REQ_VDRIFT">EKF2_REQ_VDRIFT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical drift speed to use GPS</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.5 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_AID">EKF2_RNG_AID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Range sensor aid</p><p><strong>Comment:</strong> If this parameter is enabled then the estimator will make use of the range finder measurements to estimate it's height even if range sensor is not the primary height source. It will only do so if conditions for range measurement fusion are met.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Range aid disabled</li> 

<li><strong>1:</strong> Range aid enabled</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_A_HMAX">EKF2_RNG_A_HMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum absolute altitude (height above ground level) allowed for range aid mode</p><p><strong>Comment:</strong> If the vehicle absolute altitude exceeds this value then the estimator will not fuse range measurements to estimate it's height. This only applies when range aid mode is activated (EKF2_RNG_AID = enabled).</p>    </td>
 <td style="vertical-align: top;">1.0 > 10.0 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_A_IGATE">EKF2_RNG_A_IGATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size used for innovation consistency checks for range aid fusion</p><p><strong>Comment:</strong> A lower value means HAGL needs to be more stable in order to use range finder for height estimation in range aid mode</p>    </td>
 <td style="vertical-align: top;">0.1 > 5.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_A_VMAX">EKF2_RNG_A_VMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal velocity allowed for range aid mode</p><p><strong>Comment:</strong> If the vehicle horizontal speed exceeds this value then the estimator will not fuse range measurements to estimate it's height. This only applies when range aid mode is activated (EKF2_RNG_AID = enabled).</p>    </td>
 <td style="vertical-align: top;">0.1 > 2 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_DELAY">EKF2_RNG_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Range finder measurement delay relative to IMU measurements</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">5 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_GATE">EKF2_RNG_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for range finder fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_NOISE">EKF2_RNG_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Measurement noise for range finder fusion</p>    </td>
 <td style="vertical-align: top;">0.01 > ? </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_PITCH">EKF2_RNG_PITCH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Range sensor pitch offset</p>    </td>
 <td style="vertical-align: top;">-0.75 > 0.75 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_POS_X">EKF2_RNG_POS_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>X position of range finder origin in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_POS_Y">EKF2_RNG_POS_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Y position of range finder origin in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_POS_Z">EKF2_RNG_POS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z position of range finder origin in body frame</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_RNG_SFE">EKF2_RNG_SFE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Range finder range dependant noise scaler</p><p><strong>Comment:</strong> Specifies the increase in range finder noise with range.</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.2 </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">m/m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_TAS_GATE">EKF2_TAS_GATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gate size for TAS fusion</p><p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">SD</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_TAU_POS">EKF2_TAU_POS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Time constant of the position output prediction and smoothing filter. Controls how tightly the output track the EKF states</p>    </td>
 <td style="vertical-align: top;">0.1 > 1.0 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_TAU_VEL">EKF2_TAU_VEL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Time constant of the velocity output prediction and smoothing filter</p>    </td>
 <td style="vertical-align: top;">? > 1.0 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_TERR_GRAD">EKF2_TERR_GRAD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnitude of terrain gradient</p>    </td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m/m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_TERR_NOISE">EKF2_TERR_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Terrain altitude process noise - accounts for instability in vehicle height estimate</p>    </td>
 <td style="vertical-align: top;">0.5 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EKF2_WIND_NOISE">EKF2_WIND_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Process noise for wind velocity prediction</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0e-1 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
</tbody></table>

## FW Attitude Control

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="FW_ACRO_X_MAX">FW_ACRO_X_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acro body x max rate</p><p><strong>Comment:</strong> This is the rate the controller is trying to achieve if the user applies full roll stick input in acro mode.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">45 > 720 </td>
 <td style="vertical-align: top;">90 </td>
 <td style="vertical-align: top;">degrees</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_ACRO_Y_MAX">FW_ACRO_Y_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acro body y max rate</p><p><strong>Comment:</strong> This is the body y rate the controller is trying to achieve if the user applies full pitch stick input in acro mode.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">45 > 720 </td>
 <td style="vertical-align: top;">90 </td>
 <td style="vertical-align: top;">degrees</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_ACRO_Z_MAX">FW_ACRO_Z_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acro body z max rate</p><p><strong>Comment:</strong> This is the body z rate the controller is trying to achieve if the user applies full yaw stick input in acro mode.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">10 > 180 </td>
 <td style="vertical-align: top;">45 </td>
 <td style="vertical-align: top;">degrees</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_ARSP_MODE">FW_ARSP_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Disable airspeed sensor</p><p><strong>Comment:</strong> For small wings or VTOL without airspeed sensor this parameter can be used to enable flying without an airspeed reading</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_BAT_SCALE_EN">FW_BAT_SCALE_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Whether to scale throttle by battery power level</p><p><strong>Comment:</strong> This compensates for voltage drop of the battery over time by attempting to normalize performance across the operating range of the battery. The fixed wing should constantly behave as if it was fully charged with reduced max thrust at lower battery percentages. i.e. if cruise speed is at 0.5 throttle at 100% battery, it will still be 0.5 at 60% battery.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_FLAPERON_SCL">FW_FLAPERON_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Scale factor for flaperons</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_FLAPS_SCL">FW_FLAPS_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Scale factor for flaps</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_MAN_P_MAX">FW_MAN_P_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max manual pitch</p><p><strong>Comment:</strong> Max pitch for manual control in attitude stabilized mode</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">45.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_MAN_P_SC">FW_MAN_P_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Manual pitch scale</p><p><strong>Comment:</strong> Scale factor applied to the desired pitch actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_MAN_R_MAX">FW_MAN_R_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max manual roll</p><p><strong>Comment:</strong> Max roll for manual control in attitude stabilized mode</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">45.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_MAN_R_SC">FW_MAN_R_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Manual roll scale</p><p><strong>Comment:</strong> Scale factor applied to the desired roll actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_MAN_Y_SC">FW_MAN_Y_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Manual yaw scale</p><p><strong>Comment:</strong> Scale factor applied to the desired yaw actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_PR_FF">FW_PR_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate feed forward</p><p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10.0 (0.05)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_PR_I">FW_PR_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate integrator gain</p><p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 0.5 (0.005)</td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;">%/rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_PR_IMAX">FW_PR_IMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate integrator limit</p><p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.4 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_PR_P">FW_PR_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate proportional gain</p><p><strong>Comment:</strong> This defines how much the elevator input will be commanded depending on the current body angular rate error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 1.0 (0.005)</td>
 <td style="vertical-align: top;">0.08 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_PSP_OFF">FW_PSP_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch setpoint offset</p><p><strong>Comment:</strong> An airframe specific offset of the pitch setpoint in degrees, the value is added to the pitch setpoint and should correspond to the typical cruise speed of the airframe.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">-90.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_P_RMAX_NEG">FW_P_RMAX_NEG</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum negative / down pitch rate</p><p><strong>Comment:</strong> This limits the maximum pitch down up angular rate the controller will output (in degrees per second). Setting a value of zero disables the limit.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">60.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_P_RMAX_POS">FW_P_RMAX_POS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum positive / up pitch rate</p><p><strong>Comment:</strong> This limits the maximum pitch up angular rate the controller will output (in degrees per second). Setting a value of zero disables the limit.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">60.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_P_TC">FW_P_TC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Attitude pitch time constant</p><p><strong>Comment:</strong> This defines the latency between a pitch step input and the achieved setpoint (inverse to a P gain). Half a second is a good start value and fits for most average systems. Smaller systems may require smaller values, but as this will wear out servos faster, the value should only be decreased as needed.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.2 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.4 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RATT_TH">FW_RATT_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for Rattitude mode</p><p><strong>Comment:</strong> Manual input needed in order to override attitude control rate setpoints and instead pass manual stick inputs as rate setpoints</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.8 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RLL_TO_YAW_FF">FW_RLL_TO_YAW_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll control to yaw control feedforward gain</p><p><strong>Comment:</strong> This gain can be used to counteract the "adverse yaw" effect for fixed wings. When the plane enters a roll it will tend to yaw the nose out of the turn. This gain enables the use of a yaw actuator (rudder, airbrakes, ...) to counteract this effect.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RR_FF">FW_RR_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate feed forward</p><p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output. Use this to obtain a tigher response of the controller without introducing noise amplification.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10.0 (0.05)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RR_I">FW_RR_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate integrator Gain</p><p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 0.2 (0.005)</td>
 <td style="vertical-align: top;">0.01 </td>
 <td style="vertical-align: top;">%/rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RR_IMAX">FW_RR_IMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll integrator anti-windup</p><p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RR_P">FW_RR_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate proportional Gain</p><p><strong>Comment:</strong> This defines how much the aileron input will be commanded depending on the current body angular rate error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 1.0 (0.005)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_RSP_OFF">FW_RSP_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll setpoint offset</p><p><strong>Comment:</strong> An airframe specific offset of the roll setpoint in degrees, the value is added to the roll setpoint and should correspond to the typical cruise speed of the airframe.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">-90.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_R_RMAX">FW_R_RMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum roll rate</p><p><strong>Comment:</strong> This limits the maximum roll rate the controller will output (in degrees per second). Setting a value of zero disables the limit.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">70.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_R_TC">FW_R_TC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Attitude Roll Time Constant</p><p><strong>Comment:</strong> This defines the latency between a roll step input and the achieved setpoint (inverse to a P gain). Half a second is a good start value and fits for most average systems. Smaller systems may require smaller values, but as this will wear out servos faster, the value should only be decreased as needed.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.4 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.4 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_WR_FF">FW_WR_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate feed forward</p><p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10.0 (0.05)</td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_WR_I">FW_WR_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate integrator gain</p><p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 0.5 (0.005)</td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">%/rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_WR_IMAX">FW_WR_IMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate integrator limit</p><p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_WR_P">FW_WR_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate proportional gain</p><p><strong>Comment:</strong> This defines how much the wheel steering input will be commanded depending on the current body angular rate error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 1.0 (0.005)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_W_EN">FW_W_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable wheel steering controller</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_W_RMAX">FW_W_RMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum wheel steering rate</p><p><strong>Comment:</strong> This limits the maximum wheel steering rate the controller will output (in degrees per second). Setting a value of zero disables the limit.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_YCO_METHOD">FW_YCO_METHOD</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Method used for yaw coordination</p><p><strong>Comment:</strong> The param value sets the method used to calculate the yaw rate 0: open-loop zero lateral acceleration based on kinematic constraints 1: closed-loop: try to reduce lateral acceleration to 0 by measuring the acceleration</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> open-loop</li> 

<li><strong>1:</strong> closed-loop</li> 
</ul>
   <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_YCO_VMIN">FW_YCO_VMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimal speed for yaw coordination</p><p><strong>Comment:</strong> For airspeeds above this value, the yaw rate is calculated for a coordinated turn. Set to a very high value to disable.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1000.0 (0.5)</td>
 <td style="vertical-align: top;">1000.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_YR_FF">FW_YR_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate feed forward</p><p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10.0 (0.05)</td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_YR_I">FW_YR_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate integrator gain</p><p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 50.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">%/rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_YR_IMAX">FW_YR_IMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate integrator limit</p><p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_YR_P">FW_YR_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate proportional gain</p><p><strong>Comment:</strong> This defines how much the rudder input will be commanded depending on the current body angular rate error.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 1.0 (0.005)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_Y_RMAX">FW_Y_RMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum yaw rate</p><p><strong>Comment:</strong> This limits the maximum yaw rate the controller will output (in degrees per second). Setting a value of zero disables the limit.</p>    <p><b>Module:</b> modules/fw_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_WR_TC">GND_WR_TC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Attitude Wheel Time Constant</p><p><strong>Comment:</strong> This defines the latency between a steering step input and the achieved setpoint (inverse to a P gain). Half a second is a good start value and fits for most average systems. Smaller systems may require smaller values, but as this will wear out servos faster, the value should only be decreased as needed.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.4 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.4 </td>
 <td style="vertical-align: top;">s</td>
</tr>
</tbody></table>

## FW L1 Control


The module where these parameters are defined is: *modules/fw_pos_control_l1*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="FW_CLMBOUT_DIFF">FW_CLMBOUT_DIFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Climbout Altitude difference</p><p><strong>Comment:</strong> If the altitude error exceeds this parameter, the system will climb out with maximum throttle and minimum airspeed until it is closer than this distance to the desired altitude. Mostly used for takeoff waypoints / modes. Set to 0 to disable climbout mode (not recommended).</p>    </td>
 <td style="vertical-align: top;">0.0 > 150.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_L1_DAMPING">FW_L1_DAMPING</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>L1 damping</p><p><strong>Comment:</strong> Damping factor for L1 control.</p>    </td>
 <td style="vertical-align: top;">0.6 > 0.9 (0.05)</td>
 <td style="vertical-align: top;">0.75 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_L1_PERIOD">FW_L1_PERIOD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>L1 period</p><p><strong>Comment:</strong> This is the L1 distance and defines the tracking point ahead of the aircraft its following. A value of 18-25 meters works for most aircraft. Shorten slowly during tuning until response is sharp without oscillation.</p>    </td>
 <td style="vertical-align: top;">12.0 > 50.0 (0.5)</td>
 <td style="vertical-align: top;">20.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_AIRSPD_SC">FW_LND_AIRSPD_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Min. airspeed scaling factor for landing</p><p><strong>Comment:</strong> Multiplying this factor with the minimum airspeed of the plane gives the target airspeed the landing approach. FW_AIRSPD_MIN * FW_LND_AIRSPD_SC</p>    </td>
 <td style="vertical-align: top;">1.0 > 1.5 (0.01)</td>
 <td style="vertical-align: top;">1.3 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_ANG">FW_LND_ANG</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Landing slope angle</p>    </td>
 <td style="vertical-align: top;">1.0 > 15.0 (0.5)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_FLALT">FW_LND_FLALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Landing flare altitude (relative to landing altitude)</p>    </td>
 <td style="vertical-align: top;">0.0 > 25.0 (0.5)</td>
 <td style="vertical-align: top;">8.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_FL_PMAX">FW_LND_FL_PMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Flare, maximum pitch</p><p><strong>Comment:</strong> Maximum pitch during flare, a positive sign means nose up Applied once FW_LND_TLALT is reached</p>    </td>
 <td style="vertical-align: top;">0 > 45.0 (0.5)</td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_FL_PMIN">FW_LND_FL_PMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Flare, minimum pitch</p><p><strong>Comment:</strong> Minimum pitch during flare, a positive sign means nose up Applied once FW_LND_TLALT is reached</p>    </td>
 <td style="vertical-align: top;">0 > 15.0 (0.5)</td>
 <td style="vertical-align: top;">2.5 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_HHDIST">FW_LND_HHDIST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Landing heading hold horizontal distance.
Set to 0 to disable heading hold</p>    </td>
 <td style="vertical-align: top;">0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_HVIRT">FW_LND_HVIRT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    </td>
 <td style="vertical-align: top;">1.0 > 15.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_TLALT">FW_LND_TLALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Landing throttle limit altitude (relative landing altitude)</p><p><strong>Comment:</strong> Default of -1.0 lets the system default to applying throttle limiting at 2/3 of the flare altitude.</p>    </td>
 <td style="vertical-align: top;">-1.0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_LND_USETER">FW_LND_USETER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Use terrain estimate during landing</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_P_LIM_MAX">FW_P_LIM_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Positive pitch limit</p><p><strong>Comment:</strong> The maximum positive pitch the controller will output.</p>    </td>
 <td style="vertical-align: top;">0.0 > 60.0 (0.5)</td>
 <td style="vertical-align: top;">45.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_P_LIM_MIN">FW_P_LIM_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Negative pitch limit</p><p><strong>Comment:</strong> The minimum negative pitch the controller will output.</p>    </td>
 <td style="vertical-align: top;">-60.0 > 0.0 (0.5)</td>
 <td style="vertical-align: top;">-45.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_R_LIM">FW_R_LIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Controller roll limit</p><p><strong>Comment:</strong> The maximum roll the controller will output.</p>    </td>
 <td style="vertical-align: top;">35.0 > 65.0 (0.5)</td>
 <td style="vertical-align: top;">50.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_THR_CRUISE">FW_THR_CRUISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Cruise throttle</p><p><strong>Comment:</strong> This is the throttle setting required to achieve the desired cruise speed. Most airframes have a value of 0.5-0.7.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.6 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_THR_IDLE">FW_THR_IDLE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Idle throttle</p><p><strong>Comment:</strong> This is the minimum throttle while on the ground For aircraft with internal combustion engine this parameter should be set above desired idle rpm.</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.4 (0.01)</td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_THR_LND_MAX">FW_THR_LND_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle limit value before flare</p><p><strong>Comment:</strong> This throttle value will be set as throttle limit at FW_LND_TLALT, before aircraft will flare.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_THR_MAX">FW_THR_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle limit max</p><p><strong>Comment:</strong> This is the maximum throttle % that can be used by the controller. For overpowered aircraft, this should be reduced to a value that provides sufficient thrust to climb at the maximum pitch angle PTCH_MAX.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_THR_MIN">FW_THR_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle limit min</p><p><strong>Comment:</strong> This is the minimum throttle % that can be used by the controller. For electric aircraft this will normally be set to zero, but can be set to a small non-zero value if a folding prop is fitted to prevent the prop from folding and unfolding repeatedly in-flight or to provide some aerodynamic drag from a turning prop to improve the descent rate. For aircraft with internal combustion engine this parameter should be set for desired idle rpm.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_THR_SLEW_MAX">FW_THR_SLEW_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle max slew rate</p><p><strong>Comment:</strong> Maximum slew rate for the commanded throttle</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## FW Launch detection


The module where these parameters are defined is: *lib/launchdetection*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="LAUN_ALL_ON">LAUN_ALL_ON</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Launch detection</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LAUN_CAT_A">LAUN_CAT_A</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Catapult accelerometer threshold</p><p><strong>Comment:</strong> LAUN_CAT_A for LAUN_CAT_T serves as threshold to trigger launch detection.</p>    </td>
 <td style="vertical-align: top;">0 > ? (0.5)</td>
 <td style="vertical-align: top;">30.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LAUN_CAT_MDEL">LAUN_CAT_MDEL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Motor delay</p><p><strong>Comment:</strong> Delay between starting attitude control and powering up the throttle (giving throttle control to the controller) Before this timespan is up the throttle will be set to FW_THR_IDLE, set to 0 to deactivate</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LAUN_CAT_PMAX">LAUN_CAT_PMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum pitch before the throttle is powered up (during motor delay phase)</p><p><strong>Comment:</strong> This is an extra limit for the maximum pitch which is imposed in the phase before the throttle turns on. This allows to limit the maximum pitch angle during a bungee launch (make the launch less steep).</p>    </td>
 <td style="vertical-align: top;">0.0 > 45.0 (0.5)</td>
 <td style="vertical-align: top;">30.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LAUN_CAT_T">LAUN_CAT_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Catapult time threshold</p><p><strong>Comment:</strong> LAUN_CAT_A for LAUN_CAT_T serves as threshold to trigger launch detection.</p>    </td>
 <td style="vertical-align: top;">0.0 > 5.0 (0.05)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">s</td>
</tr>
</tbody></table>

## FW TECS

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="FW_AIRSPD_MAX">FW_AIRSPD_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum Airspeed</p><p><strong>Comment:</strong> If the airspeed is above this value, the TECS controller will try to decrease airspeed more aggressively.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 40 (0.5)</td>
 <td style="vertical-align: top;">20.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_AIRSPD_MIN">FW_AIRSPD_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum Airspeed</p><p><strong>Comment:</strong> If the airspeed falls below this value, the TECS controller will try to increase airspeed more aggressively.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 40 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_AIRSPD_TRIM">FW_AIRSPD_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Cruise Airspeed</p><p><strong>Comment:</strong> The fixed wing controller tries to fly at this airspeed.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 40 (0.5)</td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_CLMB_MAX">FW_T_CLMB_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum climb rate</p><p><strong>Comment:</strong> This is the best climb rate that the aircraft can achieve with the throttle set to THR_MAX and the airspeed set to the default value. For electric aircraft make sure this number can be achieved towards the end of flight when the battery voltage has reduced. The setting of this parameter can be checked by commanding a positive altitude change of 100m in loiter, RTL or guided mode. If the throttle required to climb is close to THR_MAX and the aircraft is maintaining airspeed, then this parameter is set correctly. If the airspeed starts to reduce, then the parameter is set to high, and if the throttle demand required to climb and maintain speed is noticeably less than FW_THR_MAX, then either FW_T_CLMB_MAX should be increased or FW_THR_MAX reduced.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 15.0 (0.5)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_HGT_OMEGA">FW_T_HGT_OMEGA</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Complementary filter "omega" parameter for height</p><p><strong>Comment:</strong> This is the cross-over frequency (in radians/second) of the complementary filter used to fuse vertical acceleration and barometric height to obtain an estimate of height rate and height. Increasing this frequency weights the solution more towards use of the barometer, whilst reducing it weights the solution more towards use of the accelerometer data.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 10.0 (0.5)</td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_HRATE_FF">FW_T_HRATE_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Height rate feed forward</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.8 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_HRATE_P">FW_T_HRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Height rate proportional factor</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_INTEG_GAIN">FW_T_INTEG_GAIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Integrator gain</p><p><strong>Comment:</strong> This is the integrator gain on the control loop. Increasing this gain increases the speed at which speed and height offsets are trimmed out, but reduces damping and increases overshoot.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 2.0 (0.05)</td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_PTCH_DAMP">FW_T_PTCH_DAMP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch damping factor</p><p><strong>Comment:</strong> This is the damping gain for the pitch demand loop. Increase to add damping to correct for oscillations in height. The default value of 0.0 will work well provided the pitch to servo controller has been tuned properly.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 2.0 (0.1)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_RLL2THR">FW_T_RLL2THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll -> Throttle feedforward</p><p><strong>Comment:</strong> Increasing this gain turn increases the amount of throttle that will be used to compensate for the additional drag created by turning. Ideally this should be set to  approximately 10 x the extra sink rate in m/s created by a 45 degree bank turn. Increase this gain if the aircraft initially loses energy in turns and reduce if the aircraft initially gains energy in turns. Efficient high aspect-ratio aircraft (eg powered sailplanes) can use a lower value, whereas inefficient low aspect-ratio models (eg delta wings) can use a higher value.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 20.0 (0.5)</td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_SINK_MAX">FW_T_SINK_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum descent rate</p><p><strong>Comment:</strong> This sets the maximum descent rate that the controller will use. If this value is too large, the aircraft can over-speed on descent. This should be set to a value that can be achieved without exceeding the lower pitch angle limit and without over-speeding the aircraft.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">2.0 > 15.0 (0.5)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_SINK_MIN">FW_T_SINK_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum descent rate</p><p><strong>Comment:</strong> This is the sink rate of the aircraft with the throttle set to THR_MIN and flown at the same airspeed as used to measure FW_T_CLMB_MAX.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 5.0 (0.5)</td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_SPDWEIGHT">FW_T_SPDWEIGHT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed <--> Altitude priority</p><p><strong>Comment:</strong> This parameter adjusts the amount of weighting that the pitch control applies to speed vs height errors. Setting it to 0.0 will cause the pitch control to control height and ignore speed errors. This will normally improve height accuracy but give larger airspeed errors. Setting it to 2.0 will cause the pitch control loop to control speed and ignore height errors. This will normally reduce airspeed errors, but give larger height errors. The default value of 1.0 allows the pitch control to simultaneously control height and speed. Note to Glider Pilots - set this parameter to 2.0 (The glider will adjust its pitch angle to maintain airspeed, ignoring changes in height).</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 2.0 (1.0)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_SPD_OMEGA">FW_T_SPD_OMEGA</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Complementary filter "omega" parameter for speed</p><p><strong>Comment:</strong> This is the cross-over frequency (in radians/second) of the complementary filter used to fuse longitudinal acceleration and airspeed to obtain an improved airspeed estimate. Increasing this frequency weights the solution more towards use of the airspeed sensor, whilst reducing it weights the solution more towards use of the accelerometer data.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 10.0 (0.5)</td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_SRATE_P">FW_T_SRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed rate P factor</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 2.0 (0.01)</td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_THRO_CONST">FW_T_THRO_CONST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TECS Throttle time constant</p><p><strong>Comment:</strong> This is the time constant of the TECS throttle control algorithm (in seconds). Smaller values make it faster to respond, larger values make it slower to respond.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 10.0 (0.5)</td>
 <td style="vertical-align: top;">8.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_THR_DAMP">FW_T_THR_DAMP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle damping factor</p><p><strong>Comment:</strong> This is the damping gain for the throttle demand loop. Increase to add damping to correct for oscillations in speed and height.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">0.0 > 2.0 (0.1)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_TIME_CONST">FW_T_TIME_CONST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TECS time constant</p><p><strong>Comment:</strong> This is the time constant of the TECS control algorithm (in seconds). Smaller values make it faster to respond, larger values make it slower to respond.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 10.0 (0.5)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="FW_T_VERT_ACC">FW_T_VERT_ACC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical acceleration</p><p><strong>Comment:</strong> This is the maximum vertical acceleration (in m/s/s) either up or down that the controller will use to correct speed or height errors. The default value of 7 m/s/s (equivalent to +- 0.7 g) allows for reasonably aggressive pitch changes if required to recover from under-speed conditions.</p>    <p><b>Module:</b> modules/fw_pos_control_l1</p>
</td>
 <td style="vertical-align: top;">1.0 > 10.0 (0.5)</td>
 <td style="vertical-align: top;">7.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_MAX">GND_SPEED_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum ground speed</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 40 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_TRIM">GND_SPEED_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim ground speed</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 40 (0.5)</td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
</tbody></table>

## Follow target


The module where these parameters are defined is: *modules/navigator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_FT_DST">NAV_FT_DST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Distance to follow target from</p><p><strong>Comment:</strong> The distance in meters to follow the target at</p>    </td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">8.0 </td>
 <td style="vertical-align: top;">meters</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_FT_FS">NAV_FT_FS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Side to follow target from</p><p><strong>Comment:</strong> The side to follow the target from (front right = 0, behind = 1, front = 2, front left = 3)</p>    </td>
 <td style="vertical-align: top;">0 > 3 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;">n/a</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_FT_RS">NAV_FT_RS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Dynamic filtering algorithm responsiveness to target movement
lower numbers increase the responsiveness to changing long lat
but also ignore less noise</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">n/a</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_MIN_FT_HT">NAV_MIN_FT_HT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum follow target altitude</p><p><strong>Comment:</strong> The minimum height in meters relative to home for following a target</p>    </td>
 <td style="vertical-align: top;">8.0 > ? </td>
 <td style="vertical-align: top;">8.0 </td>
 <td style="vertical-align: top;">meters</td>
</tr>
</tbody></table>

## GND Attitude Control

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="GND_BAT_SCALE_EN">GND_BAT_SCALE_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Whether to scale throttle by battery power level</p><p><strong>Comment:</strong> This compensates for voltage drop of the battery over time by attempting to normalize performance across the operating range of the battery. The fixed wing should constantly behave as if it was fully charged with reduced max thrust at lower battery percentages. i.e. if cruise speed is at 0.5 throttle at 100% battery, it will still be 0.5 at 60% battery.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_GSPD_SP_TRIM">GND_GSPD_SP_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Groundspeed speed trim</p><p><strong>Comment:</strong> This allows to scale the turning radius depending on the speed.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.1)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_MAN_Y_SC">GND_MAN_Y_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Manual yaw scale</p><p><strong>Comment:</strong> Scale factor applied to the desired yaw actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_D">GND_SPEED_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed proportional gain</p><p><strong>Comment:</strong> This is the derivative gain for the speed closed loop controller</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.00 > 50.0 (0.005)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">%m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_I">GND_SPEED_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed Integral gain</p><p><strong>Comment:</strong> This is the integral gain for the speed closed loop controller</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.00 > 50.0 (0.005)</td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">%m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_IMAX">GND_SPEED_IMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed integral maximum value</p><p><strong>Comment:</strong> This is the maxim value the integral can reach to prevent wind-up.</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 50.0 (0.005)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">%m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_P">GND_SPEED_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed proportional gain</p><p><strong>Comment:</strong> This is the proportional gain for the speed closed loop controller</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 50.0 (0.005)</td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">%m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SPEED_THR_SC">GND_SPEED_THR_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Speed to throttle scaler</p><p><strong>Comment:</strong> This is a gain to map the speed control output to the throttle linearly.</p>    <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 50.0 (0.005)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">%m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_SP_CTRL_MODE">GND_SP_CTRL_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Control mode for speed</p><p><strong>Comment:</strong> This allows the user to choose between closed loop gps speed or open loop cruise throttle speed</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> open loop control</li> 

<li><strong>1:</strong> close the loop with gps speed</li> 
</ul>
   <p><b>Module:</b> modules/gnd_pos_control</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_WR_D">GND_WR_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate integrator gain</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.00 > 30 (0.005)</td>
 <td style="vertical-align: top;">0.00 </td>
 <td style="vertical-align: top;">%/rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_WR_FF">GND_WR_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate feed forward</p><p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10.0 (0.05)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_WR_I">GND_WR_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate integrator gain</p><p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.00 > 0.5 (0.005)</td>
 <td style="vertical-align: top;">0.00 </td>
 <td style="vertical-align: top;">%/rad</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_WR_IMAX">GND_WR_IMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate integrator limit</p><p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_WR_P">GND_WR_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Wheel steering rate proportional gain</p><p><strong>Comment:</strong> This defines how much the wheel steering input will be commanded depending on the current body angular rate error.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 1.0 (0.005)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">%/rad/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_W_RMAX">GND_W_RMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum wheel steering rate</p><p><strong>Comment:</strong> This limits the maximum wheel steering rate the controller will output (in degrees per second). Setting a value of zero disables the limit.</p>    <p><b>Module:</b> modules/gnd_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 (0.5)</td>
 <td style="vertical-align: top;">90.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
</tbody></table>

## GND POS Control


The module where these parameters are defined is: *modules/gnd_pos_control*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="GND_L1_DAMPING">GND_L1_DAMPING</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>L1 damping</p><p><strong>Comment:</strong> Damping factor for L1 control.</p>    </td>
 <td style="vertical-align: top;">0.6 > 0.9 (0.05)</td>
 <td style="vertical-align: top;">0.75 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_L1_DIST">GND_L1_DIST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>L1 distance</p><p><strong>Comment:</strong> This is the waypoint radius</p>    </td>
 <td style="vertical-align: top;">0.0 > 100.0 (0.1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_L1_PERIOD">GND_L1_PERIOD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>L1 period</p><p><strong>Comment:</strong> This is the L1 distance and defines the tracking point ahead of the rover it's following. Using values around 2-5 for a traxxas stampede. Shorten slowly during tuning until response is sharp without oscillation.</p>    </td>
 <td style="vertical-align: top;">0.0 > 50.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_THR_CRUISE">GND_THR_CRUISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Cruise throttle</p><p><strong>Comment:</strong> This is the throttle setting required to achieve the desired cruise speed. 10% is ok for a traxxas stampede vxl with ESC set to training mode</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_THR_IDLE">GND_THR_IDLE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Idle throttle</p><p><strong>Comment:</strong> This is the minimum throttle while on the ground, it should be 0 for a rover</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.4 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_THR_MAX">GND_THR_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle limit max</p><p><strong>Comment:</strong> This is the maximum throttle % that can be used by the controller. For a Traxxas stampede vxl with the ESC set to training, 30 % is enough</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GND_THR_MIN">GND_THR_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Throttle limit min</p><p><strong>Comment:</strong> This is the minimum throttle % that can be used by the controller. Set to 0 for rover</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
</tbody></table>

## GPS


The module where these parameters are defined is: *drivers/gps*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="GPS_DUMP_COMM">GPS_DUMP_COMM</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Dump GPS communication to a file</p><p><strong>Comment:</strong> If this is set to 1, all GPS communication data will be published via uORB, and written to the log file as gps_dump message.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Enable</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GPS_UBX_DYNMODEL">GPS_UBX_DYNMODEL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>u-blox GPS dynamic platform model</p><p><strong>Comment:</strong> u-blox receivers support different dynamic platform models to adjust the navigation engine to the expected application environment.</p> <strong>Values:</strong><ul>
<li><strong>2:</strong> stationary</li> 

<li><strong>4:</strong> automotive</li> 

<li><strong>6:</strong> airborne with <1g acceleration</li> 

<li><strong>7:</strong> airborne with <2g acceleration</li> 

<li><strong>8:</strong> airborne with <4g acceleration</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 9 </td>
 <td style="vertical-align: top;">7 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## GPS Failure Navigation


The module where these parameters are defined is: *modules/navigator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_GPSF_LT">NAV_GPSF_LT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Loiter time</p><p><strong>Comment:</strong> The time in seconds the system should do open loop loiter and wait for GPS recovery before it goes into flight termination. Set to 0 to disable.</p>    </td>
 <td style="vertical-align: top;">0.0 > 3600.0 (1)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_GPSF_P">NAV_GPSF_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixed pitch angle</p><p><strong>Comment:</strong> Pitch in degrees during the open loop loiter</p>    </td>
 <td style="vertical-align: top;">-30.0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_GPSF_R">NAV_GPSF_R</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixed bank angle</p><p><strong>Comment:</strong> Roll in degrees during the loiter</p>    </td>
 <td style="vertical-align: top;">0.0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_GPSF_TR">NAV_GPSF_TR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Thrust</p><p><strong>Comment:</strong> Thrust value which is set during the open loop loiter</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
</tbody></table>

## Geofence


The module where these parameters are defined is: *modules/navigator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="GF_ACTION">GF_ACTION</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Geofence violation action</p><p><strong>Comment:</strong> Note: Setting this value to 4 enables flight termination, which will kill the vehicle on violation of the fence. Due to the inherent danger of this, this function is disabled using a software circuit breaker, which needs to be reset to 0 to really shut down the system.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> None</li> 

<li><strong>1:</strong> Warning</li> 

<li><strong>2:</strong> Loiter</li> 

<li><strong>3:</strong> Return to Land</li> 

<li><strong>4:</strong> Flight terminate</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 4 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GF_ALTMODE">GF_ALTMODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Geofence altitude mode</p><p><strong>Comment:</strong> Select which altitude reference should be used 0 = WGS84, 1 = AMSL</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> WGS84</li> 

<li><strong>1:</strong> AMSL</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GF_COUNT">GF_COUNT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Geofence counter limit</p><p><strong>Comment:</strong> Set how many subsequent position measurements outside of the fence are needed before geofence violation is triggered</p>    </td>
 <td style="vertical-align: top;">-1 > 10 (1)</td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GF_MAX_HOR_DIST">GF_MAX_HOR_DIST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max horizontal distance in meters</p><p><strong>Comment:</strong> Maximum horizontal distance in meters the vehicle can be from home before triggering a geofence action. Disabled if 0.</p>    </td>
 <td style="vertical-align: top;">0 > 10000 (1)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GF_MAX_VER_DIST">GF_MAX_VER_DIST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max vertical distance in meters</p><p><strong>Comment:</strong> Maximum vertical distance in meters the vehicle can be from home before triggering a geofence action. Disabled if 0.</p>    </td>
 <td style="vertical-align: top;">0 > 10000 (1)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="GF_SOURCE">GF_SOURCE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Geofence source</p><p><strong>Comment:</strong> Select which position source should be used. Selecting GPS instead of global position makes sure that there is no dependence on the position estimator 0 = global position, 1 = GPS</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> GPOS</li> 

<li><strong>1:</strong> GPS</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Iridium SBD


The module where these parameters are defined is: *drivers/iridiumsbd*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="ISBD_READINT">ISBD_READINT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Satellite radio read interval</p>    </td>
 <td style="vertical-align: top;">0 > 300 </td>
 <td style="vertical-align: top;">10 </td>
 <td style="vertical-align: top;">s</td>
</tr>
</tbody></table>

## Land Detector


The module where these parameters are defined is: *modules/land_detector*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="LNDFW_AIRSPD_MAX">LNDFW_AIRSPD_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airspeed max</p><p><strong>Comment:</strong> Maximum airspeed allowed in the landed state (m/s)</p>    </td>
 <td style="vertical-align: top;">4 > 20 </td>
 <td style="vertical-align: top;">8.00 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDFW_VELI_MAX">LNDFW_VELI_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixedwing max short-term velocity</p><p><strong>Comment:</strong> Maximum velocity integral in flight direction allowed in the landed state (m/s)</p>    </td>
 <td style="vertical-align: top;">2 > 10 </td>
 <td style="vertical-align: top;">4.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDFW_VEL_XY_MAX">LNDFW_VEL_XY_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixedwing max horizontal velocity</p><p><strong>Comment:</strong> Maximum horizontal velocity allowed in the landed state (m/s)</p>    </td>
 <td style="vertical-align: top;">0.5 > 10 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDFW_VEL_Z_MAX">LNDFW_VEL_Z_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixedwing max climb rate</p><p><strong>Comment:</strong> Maximum vertical velocity allowed in the landed state (m/s up and down)</p>    </td>
 <td style="vertical-align: top;">5 > 20 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_ALT_MAX">LNDMC_ALT_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum altitude for multicopters</p><p><strong>Comment:</strong> The system will obey this limit as a hard altitude limit. This setting will be consolidated with the GF_MAX_VER_DIST parameter. A negative value indicates no altitude limitation.</p>    </td>
 <td style="vertical-align: top;">-1 > 10000 </td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_FFALL_THR">LNDMC_FFALL_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Multicopter specific force threshold</p><p><strong>Comment:</strong> Multicopter threshold on the specific force measured by accelerometers in m/s^2 for free-fall detection</p>    </td>
 <td style="vertical-align: top;">0.1 > 10 </td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">m/s^2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_FFALL_TTRI">LNDMC_FFALL_TTRI</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Multicopter free-fall trigger time</p><p><strong>Comment:</strong> Seconds (decimal) that freefall conditions have to met before triggering a freefall. Minimal value is limited by LAND_DETECTOR_UPDATE_RATE=50Hz in landDetector.h</p>    </td>
 <td style="vertical-align: top;">0.02 > 5 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_ROT_MAX">LNDMC_ROT_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Multicopter max rotation</p><p><strong>Comment:</strong> Maximum allowed angular velocity around each axis allowed in the landed state.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">20.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_THR_RANGE">LNDMC_THR_RANGE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Multicopter sub-hover throttle scaling</p><p><strong>Comment:</strong> The range between throttle_min and throttle_hover is scaled by this parameter to define how close to minimum throttle the current throttle value needs to be in order to get accepted as landed.</p>    </td>
 <td style="vertical-align: top;">0.05 > 0.5 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_XY_VEL_MAX">LNDMC_XY_VEL_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Multicopter max horizontal velocity</p><p><strong>Comment:</strong> Maximum horizontal velocity allowed in the landed state (m/s)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.5 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LNDMC_Z_VEL_MAX">LNDMC_Z_VEL_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Multicopter max climb rate</p><p><strong>Comment:</strong> Maximum vertical velocity allowed in the landed state (m/s up and down)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.50 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LND_FLIGHT_T_HI">LND_FLIGHT_T_HI</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Total flight time in microseconds</p><p><strong>Comment:</strong> Total flight time of this autopilot. Higher 32 bits of the value. Flight time in microseconds = (LND_FLIGHT_T_HI << 32) | LND_FLIGHT_T_LO.</p>    </td>
 <td style="vertical-align: top;">0 > ? </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LND_FLIGHT_T_LO">LND_FLIGHT_T_LO</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Total flight time in microseconds</p><p><strong>Comment:</strong> Total flight time of this autopilot. Lower 32 bits of the value. Flight time in microseconds = (LND_FLIGHT_T_HI << 32) | LND_FLIGHT_T_LO.</p>    </td>
 <td style="vertical-align: top;">0 > ? </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Local Position Estimator


The module where these parameters are defined is: *modules/local_position_estimator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_ACC_XY">LPE_ACC_XY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer xy noise density</p><p><strong>Comment:</strong> Data sheet noise density = 150ug/sqrt(Hz) = 0.0015 m/s^2/sqrt(Hz) Larger than data sheet to account for tilt error.</p>    </td>
 <td style="vertical-align: top;">0.00001 > 2 </td>
 <td style="vertical-align: top;">0.012 </td>
 <td style="vertical-align: top;">m/s^2/sqrt(Hz)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_ACC_Z">LPE_ACC_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer z noise density</p><p><strong>Comment:</strong> Data sheet noise density = 150ug/sqrt(Hz) = 0.0015 m/s^2/sqrt(Hz)</p>    </td>
 <td style="vertical-align: top;">0.00001 > 2 </td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;">m/s^2/sqrt(Hz)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_BAR_Z">LPE_BAR_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometric presssure altitude z standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 100 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_EPH_MAX">LPE_EPH_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max EPH allowed for GPS initialization</p>    </td>
 <td style="vertical-align: top;">1.0 > 5.0 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_EPV_MAX">LPE_EPV_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max EPV allowed for GPS initialization</p>    </td>
 <td style="vertical-align: top;">1.0 > 5.0 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FAKE_ORIGIN">LPE_FAKE_ORIGIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable publishing of a fake global position (e.g for AUTO missions using Optical Flow)
by initializing the estimator to the LPE_LAT/LON parameters when global information is unavailable</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FGYRO_HP">LPE_FGYRO_HP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Flow gyro high pass filter cut off frequency</p>    </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0.001 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FLW_OFF_Z">LPE_FLW_OFF_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical flow z offset from center</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FLW_QMIN">LPE_FLW_QMIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Optical flow minimum quality threshold</p>    </td>
 <td style="vertical-align: top;">0 > 255 </td>
 <td style="vertical-align: top;">150 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FLW_R">LPE_FLW_R</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical flow rotation (roll/pitch) noise gain</p>    </td>
 <td style="vertical-align: top;">0.1 > 10.0 </td>
 <td style="vertical-align: top;">7.0 </td>
 <td style="vertical-align: top;">m/s / (rad)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FLW_RR">LPE_FLW_RR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical flow angular velocity noise gain</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">7.0 </td>
 <td style="vertical-align: top;">m/s / (rad/s)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FLW_SCALE">LPE_FLW_SCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical flow scale</p>    </td>
 <td style="vertical-align: top;">0.1 > 10.0 </td>
 <td style="vertical-align: top;">1.3 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_FUSION">LPE_FUSION</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Integer bitmask controlling data fusion</p><p><strong>Comment:</strong> Set bits in the following positions to enable: 0 : Set to true to fuse GPS data if available, also requires GPS for altitude init 1 : Set to true to fuse optical flow data if available 2 : Set to true to fuse vision position 3 : Set to true to fuse vision yaw 4 : Set to true to fuse land detector 5 : Set to true to publish AGL as local position down component 6 : Set to true to enable flow gyro compensation 7 : Set to true to enable baro fusion default (145 - GPS only)</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> fuse GPS, requires GPS for alt. init</li> 
  <li><strong>1:</strong> fuse optical flow</li> 
  <li><strong>2:</strong> fuse vision position</li> 
  <li><strong>3:</strong> fuse vision yaw</li> 
  <li><strong>4:</strong> fuse land detector</li> 
  <li><strong>5:</strong> pub agl as lpos down</li> 
  <li><strong>6:</strong> flow gyro compensation</li> 
  <li><strong>7:</strong> fuse baro</li> 
</ul>
  </td>
 <td style="vertical-align: top;">0 > 255 </td>
 <td style="vertical-align: top;">145 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_GPS_DELAY">LPE_GPS_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>GPS delay compensaton</p>    </td>
 <td style="vertical-align: top;">0 > 0.4 </td>
 <td style="vertical-align: top;">0.29 </td>
 <td style="vertical-align: top;">sec</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_GPS_VXY">LPE_GPS_VXY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>GPS xy velocity standard deviation.
EPV used if greater than this value</p>    </td>
 <td style="vertical-align: top;">0.01 > 2 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_GPS_VZ">LPE_GPS_VZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>GPS z velocity standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 2 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_GPS_XY">LPE_GPS_XY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum GPS xy standard deviation, uses reported EPH if greater</p>    </td>
 <td style="vertical-align: top;">0.01 > 5 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_GPS_Z">LPE_GPS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum GPS z standard deviation, uses reported EPV if greater</p>    </td>
 <td style="vertical-align: top;">0.01 > 200 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_LAND_VXY">LPE_LAND_VXY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Land detector xy velocity standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 10.0 </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_LAND_Z">LPE_LAND_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Land detector z standard deviation</p>    </td>
 <td style="vertical-align: top;">0.001 > 10.0 </td>
 <td style="vertical-align: top;">0.03 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_LAT">LPE_LAT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Local origin latitude for nav w/o GPS</p>    </td>
 <td style="vertical-align: top;">-90 > 90 </td>
 <td style="vertical-align: top;">47.397742 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_LDR_OFF_Z">LPE_LDR_OFF_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Lidar z offset from center of vehicle +down</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.00 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_LDR_Z">LPE_LDR_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Lidar z standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 1 </td>
 <td style="vertical-align: top;">0.03 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_LON">LPE_LON</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Local origin longitude for nav w/o GPS</p>    </td>
 <td style="vertical-align: top;">-180 > 180 </td>
 <td style="vertical-align: top;">8.545594 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_PN_B">LPE_PN_B</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accel bias propagation noise density</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">1e-3 </td>
 <td style="vertical-align: top;">(m/s^2)/s/sqrt(Hz)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_PN_P">LPE_PN_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position propagation noise density</p><p><strong>Comment:</strong> Increase to trust measurements more. Decrease to trust model more.</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">m/s/sqrt(Hz)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_PN_T">LPE_PN_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Terrain random walk noise density, hilly/outdoor (0.1), flat/Indoor (0.001)</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.001 </td>
 <td style="vertical-align: top;">(m/s)/(sqrt(hz))</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_PN_V">LPE_PN_V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Velocity propagation noise density</p><p><strong>Comment:</strong> Increase to trust measurements more. Decrease to trust model more.</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">(m/s)/s/sqrt(Hz)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_SNR_OFF_Z">LPE_SNR_OFF_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Sonar z offset from center of vehicle +down</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.00 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_SNR_Z">LPE_SNR_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Sonar z standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 1 </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_T_MAX_GRADE">LPE_T_MAX_GRADE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Terrain maximum percent grade, hilly/outdoor (100 = 45 deg), flat/Indoor (0 = 0 deg)
Used to calculate increased terrain random walk nosie due to movement</p>    </td>
 <td style="vertical-align: top;">0 > 100 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">%</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_VIC_P">LPE_VIC_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Vicon position standard deviation</p>    </td>
 <td style="vertical-align: top;">0.0001 > 1 </td>
 <td style="vertical-align: top;">0.001 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_VIS_DELAY">LPE_VIS_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Vision delay compensaton</p><p><strong>Comment:</strong> Set to zero to enable automatic compensation from measurement timestamps</p>    </td>
 <td style="vertical-align: top;">0 > 0.1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">sec</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_VIS_XY">LPE_VIS_XY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Vision xy standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 1 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_VIS_Z">LPE_VIS_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Vision z standard deviation</p>    </td>
 <td style="vertical-align: top;">0.01 > 100 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_VXY_PUB">LPE_VXY_PUB</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Required velocity xy standard deviation to publish position</p>    </td>
 <td style="vertical-align: top;">0.01 > 1.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_X_LP">LPE_X_LP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Cut frequency for state publication</p>    </td>
 <td style="vertical-align: top;">5 > 1000 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="LPE_Z_PUB">LPE_Z_PUB</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Required z standard deviation to publish altitude/ terrain</p>    </td>
 <td style="vertical-align: top;">0.3 > 5.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
</tbody></table>

## MAVLink


The module where these parameters are defined is: *modules/mavlink*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_BROADCAST">MAV_BROADCAST</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Broadcast heartbeats on local network</p><p><strong>Comment:</strong> This allows a ground control station to automatically find the drone on the local network.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Never broadcast</li> 

<li><strong>1:</strong> Always broadcast</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_COMP_ID">MAV_COMP_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>MAVLink component ID</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">1 > 250 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_FWDEXTSP">MAV_FWDEXTSP</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Forward external setpoint messages</p><p><strong>Comment:</strong> If set to 1 incoming external setpoint messages will be directly forwarded to the controllers if in offboard control mode</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_PROTO_VER">MAV_PROTO_VER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>MAVLink protocol version</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Default to 1, switch to 2 if GCS sends version 2</li> 

<li><strong>1:</strong> Always use version 1</li> 

<li><strong>2:</strong> Always use version 2</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_RADIO_ID">MAV_RADIO_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>MAVLink Radio ID</p><p><strong>Comment:</strong> When non-zero the MAVLink app will attempt to configure the radio to this ID and re-set the parameter to 0. If the value is negative it will reset the complete radio config to factory defaults.</p>    </td>
 <td style="vertical-align: top;">-1 > 240 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_SYS_ID">MAV_SYS_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>MAVLink system ID</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">1 > 250 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_TEST_PAR">MAV_TEST_PAR</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Test parameter</p><p><strong>Comment:</strong> This parameter is not actively used by the system. Its purpose is to allow testing the parameter interface on the communication level.</p>    </td>
 <td style="vertical-align: top;">-1000 > 1000 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_TYPE">MAV_TYPE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>MAVLink airframe type</p>    </td>
 <td style="vertical-align: top;">1 > ? </td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MAV_USEHILGPS">MAV_USEHILGPS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Use/Accept HIL GPS message even if not in HIL mode</p><p><strong>Comment:</strong> If set to 1 incoming HIL GPS messages are parsed.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## MKBLCTRL Testmode


The module where these parameters are defined is: *drivers/mkblctrl*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="MKBLCTRL_TEST">MKBLCTRL_TEST</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Test mode (Identify) of MKBLCTRL Driver</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Mission

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="COM_OBL_ACT">COM_OBL_ACT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set offboard loss failsafe mode</p><p><strong>Comment:</strong> The offboard loss failsafe will only be entered after a timeout, set by COM_OF_LOSS_T in seconds.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Land at current position</li> 

<li><strong>1:</strong> Loiter</li> 

<li><strong>2:</strong> Return to Land</li> 
</ul>
   <p><b>Module:</b> modules/commander</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_OBL_RC_ACT">COM_OBL_RC_ACT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set offboard loss failsafe mode when RC is available</p><p><strong>Comment:</strong> The offboard loss failsafe will only be entered after a timeout, set by COM_OF_LOSS_T in seconds.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Position control</li> 

<li><strong>1:</strong> Altitude control</li> 

<li><strong>2:</strong> Manual</li> 

<li><strong>3:</strong> Return to Land</li> 

<li><strong>4:</strong> Land at current position</li> 

<li><strong>5:</strong> Loiter</li> 
</ul>
   <p><b>Module:</b> modules/commander</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="COM_POSCTL_NAVL">COM_POSCTL_NAVL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Position control navigation loss response</p><p><strong>Comment:</strong> This sets the flight mode that will be used if navigation accuracy is no longer adequte for position control. Navigation accuracy checks can be disabled using the CBRK_VELPOSERR parameter, but doing so will remove protection for all flight modes.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Assume use of remote control after fallback. Switch to ALTCTL if a height estimate is available, else switch to MANUAL.</li> 

<li><strong>1:</strong> Assume no use of remote control after fallback. Switch to DESCEND if a height estimate is available, else switch to TERMINATION.</li> 
</ul>
   <p><b>Module:</b> modules/commander</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_ALTMODE">MIS_ALTMODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Altitude setpoint mode</p><p><strong>Comment:</strong> 0: the system will follow a zero order hold altitude setpoint 1: the system will follow a first order hold altitude setpoint values follow the definition in enum mission_altitude_mode</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Zero Order Hold</li> 

<li><strong>1:</strong> First Order Hold</li> 
</ul>
   <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_DIST_1WP">MIS_DIST_1WP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximal horizontal distance from home to first waypoint</p><p><strong>Comment:</strong> Failsafe check to prevent running mission stored from previous flight at a new takeoff location. Set a value of zero or less to disable. The mission will not be started if the current waypoint is more distant than MIS_DIS_1WP from the home position.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0 > 10000 (100)</td>
 <td style="vertical-align: top;">900 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_DIST_WPS">MIS_DIST_WPS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximal horizontal distance between waypoint</p><p><strong>Comment:</strong> Failsafe check to prevent running missions which are way too big. Set a value of zero or less to disable. The mission will not be started if any distance between two subsequent waypoints is greater than MIS_DIST_WPS.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0 > 10000 (100)</td>
 <td style="vertical-align: top;">900 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_LTRMIN_ALT">MIS_LTRMIN_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum Loiter altitude</p><p><strong>Comment:</strong> This is the minimum altitude the system will always obey. The intent is to stay out of ground effect. set to -1, if there shouldn't be a minimum loiter altitude</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">-1 > 80 (0.5)</td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_ONBOARD_EN">MIS_ONBOARD_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Persistent onboard mission storage</p><p><strong>Comment:</strong> When enabled, missions that have been uploaded by the GCS are stored and reloaded after reboot persistently.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_TAKEOFF_ALT">MIS_TAKEOFF_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Take-off altitude</p><p><strong>Comment:</strong> This is the minimum altitude the system will take off to.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0 > 80 (0.5)</td>
 <td style="vertical-align: top;">2.5 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_YAWMODE">MIS_YAWMODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Multirotor only. Yaw setpoint mode</p><p><strong>Comment:</strong> The values are defined in the enum mission_altitude_mode</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Heading as set by waypoint</li> 

<li><strong>1:</strong> Heading towards waypoint</li> 

<li><strong>2:</strong> Heading towards home</li> 

<li><strong>3:</strong> Heading away from home</li> 

<li><strong>4:</strong> Heading towards ROI</li> 
</ul>
   <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0 > 3 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_YAW_ERR">MIS_YAW_ERR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max yaw error in degrees needed for waypoint heading acceptance</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0 > 90 (1)</td>
 <td style="vertical-align: top;">12.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MIS_YAW_TMT">MIS_YAW_TMT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Time in seconds we wait on reaching target heading at a waypoint if it is forced</p><p><strong>Comment:</strong> If set > 0 it will ignore the target heading for normal waypoint acceptance. If the waypoint forces the heading the timeout will matter. For example on VTOL forwards transition. Mainly useful for VTOLs that have less yaw authority and might not reach target yaw in wind. Disabled by default.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">-1 > 20 (1)</td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_ACC_RAD">NAV_ACC_RAD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acceptance Radius</p><p><strong>Comment:</strong> Default acceptance radius, overridden by acceptance radius of waypoint if set. For fixed wing the L1 turning distance is used for horizontal acceptance.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0.05 > 200.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_DLL_ACT">NAV_DLL_ACT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set data link loss failsafe mode</p><p><strong>Comment:</strong> The data link loss failsafe will only be entered after a timeout, set by COM_DL_LOSS_T in seconds. Once the timeout occurs the selected action will be executed. Setting this parameter to 4 will enable CASA Outback Challenge rules, which are only recommended to participants of that competition.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Loiter</li> 

<li><strong>2:</strong> Return to Land</li> 

<li><strong>3:</strong> Land at current position</li> 

<li><strong>4:</strong> Data Link Auto Recovery (CASA Outback Challenge rules)</li> 

<li><strong>5:</strong> Terminate</li> 

<li><strong>6:</strong> Lockdown</li> 
</ul>
   <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_FORCE_VT">NAV_FORCE_VT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Force VTOL mode takeoff and land</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_FW_ALT_RAD">NAV_FW_ALT_RAD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>FW Altitude Acceptance Radius</p><p><strong>Comment:</strong> Acceptance radius for fixedwing altitude.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0.05 > 200.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_LOITER_RAD">NAV_LOITER_RAD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Loiter radius (FW only)</p><p><strong>Comment:</strong> Default value of loiter radius for missions, loiter, RTL, etc. (fixedwing only).</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">25 > 1000 (0.5)</td>
 <td style="vertical-align: top;">50.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_MC_ALT_RAD">NAV_MC_ALT_RAD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>MC Altitude Acceptance Radius</p><p><strong>Comment:</strong> Acceptance radius for multicopter altitude.</p>    <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;">0.05 > 200.0 (0.5)</td>
 <td style="vertical-align: top;">0.8 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_RCL_ACT">NAV_RCL_ACT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set RC loss failsafe mode</p><p><strong>Comment:</strong> The RC loss failsafe will only be entered after a timeout, set by COM_RC_LOSS_T in seconds. If RC input checks have been disabled by setting the COM_RC_IN_MODE param it will not be triggered. Setting this parameter to 4 will enable CASA Outback Challenge rules, which are only recommended to participants of that competition.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Loiter</li> 

<li><strong>2:</strong> Return to Land</li> 

<li><strong>3:</strong> Land at current position</li> 

<li><strong>4:</strong> RC Auto Recovery (CASA Outback Challenge rules)</li> 

<li><strong>5:</strong> Terminate</li> 

<li><strong>6:</strong> Lockdown</li> 
</ul>
   <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_TRAFF_AVOID">NAV_TRAFF_AVOID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set traffic avoidance mode</p><p><strong>Comment:</strong> Enabling this will allow the system to respond to transponder data from e.g. ADSB transponders</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Warn only</li> 

<li><strong>2:</strong> Return to Land</li> 

<li><strong>3:</strong> Land immediately</li> 
</ul>
   <p><b>Module:</b> modules/navigator</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_WV_LND_EN">VT_WV_LND_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Weather-vane mode landings for missions</p>    <p><b>Module:</b> modules/vtol_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_WV_LTR_EN">VT_WV_LTR_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Weather-vane mode for loiter</p>    <p><b>Module:</b> modules/vtol_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_WV_TKO_EN">VT_WV_TKO_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable weather-vane mode takeoff for missions</p>    <p><b>Module:</b> modules/vtol_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Mount


The module where these parameters are defined is: *drivers/vmount*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_DO_STAB">MNT_DO_STAB</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Stabilize the mount (set to true for servo gimbal, false for passthrough).
Does not affect MAVLINK_ROI input</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MAN_PITCH">MNT_MAN_PITCH</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Auxiliary channel to control pitch (in AUX input or manual mode)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> AUX1</li> 

<li><strong>2:</strong> AUX2</li> 

<li><strong>3:</strong> AUX3</li> 

<li><strong>4:</strong> AUX4</li> 

<li><strong>5:</strong> AUX5</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 5 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MAN_ROLL">MNT_MAN_ROLL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Auxiliary channel to control roll (in AUX input or manual mode)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> AUX1</li> 

<li><strong>2:</strong> AUX2</li> 

<li><strong>3:</strong> AUX3</li> 

<li><strong>4:</strong> AUX4</li> 

<li><strong>5:</strong> AUX5</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 5 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MAN_YAW">MNT_MAN_YAW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Auxiliary channel to control yaw (in AUX input or manual mode)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> AUX1</li> 

<li><strong>2:</strong> AUX2</li> 

<li><strong>3:</strong> AUX3</li> 

<li><strong>4:</strong> AUX4</li> 

<li><strong>5:</strong> AUX5</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 5 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MAV_COMPID">MNT_MAV_COMPID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mavlink Component ID of the mount</p><p><strong>Comment:</strong> If MNT_MODE_OUT is MAVLINK, mount configure/control commands will be sent with this component ID.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">154 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MAV_SYSID">MNT_MAV_SYSID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mavlink System ID of the mount</p><p><strong>Comment:</strong> If MNT_MODE_OUT is MAVLINK, mount configure/control commands will be sent with this target ID.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MODE_IN">MNT_MODE_IN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mount input mode</p><p><strong>Comment:</strong> RC uses the AUX input channels (see MNT_MAN_* parameters), MAVLINK_ROI uses the MAV_CMD_DO_SET_ROI Mavlink message, and MAVLINK_DO_MOUNT the MAV_CMD_DO_MOUNT_CONFIGURE and MAV_CMD_DO_MOUNT_CONTROL messages to control a mount.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> DISABLED</li> 

<li><strong>0:</strong> AUTO</li> 

<li><strong>1:</strong> RC</li> 

<li><strong>2:</strong> MAVLINK_ROI</li> 

<li><strong>3:</strong> MAVLINK_DO_MOUNT</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-1 > 3 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_MODE_OUT">MNT_MODE_OUT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mount output mode</p><p><strong>Comment:</strong> AUX uses the mixer output Control Group #2. MAVLINK uses the MAV_CMD_DO_MOUNT_CONFIGURE and MAV_CMD_DO_MOUNT_CONTROL MavLink messages to control a mount (set MNT_MAV_SYSID & MNT_MAV_COMPID)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> AUX</li> 

<li><strong>1:</strong> MAVLINK</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_OB_LOCK_MODE">MNT_OB_LOCK_MODE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Mixer value for selecting a locking mode
if required for the gimbal (only in AUX output mode)</p>    </td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_OB_NORM_MODE">MNT_OB_NORM_MODE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Mixer value for selecting normal mode
if required by the gimbal (only in AUX output mode)</p>    </td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_OFF_PITCH">MNT_OFF_PITCH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Offset for pitch channel output in degrees</p>    </td>
 <td style="vertical-align: top;">-360.0 > 360.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_OFF_ROLL">MNT_OFF_ROLL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Offset for roll channel output in degrees</p>    </td>
 <td style="vertical-align: top;">-360.0 > 360.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_OFF_YAW">MNT_OFF_YAW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Offset for yaw channel output in degrees</p>    </td>
 <td style="vertical-align: top;">-360.0 > 360.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_RANGE_PITCH">MNT_RANGE_PITCH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Range of pitch channel output in degrees (only in AUX output mode)</p>    </td>
 <td style="vertical-align: top;">1.0 > 720.0 </td>
 <td style="vertical-align: top;">360.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_RANGE_ROLL">MNT_RANGE_ROLL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Range of roll channel output in degrees (only in AUX output mode)</p>    </td>
 <td style="vertical-align: top;">1.0 > 720.0 </td>
 <td style="vertical-align: top;">360.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MNT_RANGE_YAW">MNT_RANGE_YAW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Range of yaw channel output in degrees (only in AUX output mode)</p>    </td>
 <td style="vertical-align: top;">1.0 > 720.0 </td>
 <td style="vertical-align: top;">360.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Multicopter Attitude Control

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ACRO_EXPO">MC_ACRO_EXPO</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acro Expo factor
applied to input of all axis: roll, pitch, yaw</p><p><strong>Comment:</strong> 0 Purely linear input curve 1 Purely cubic input curve</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.69 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ACRO_P_MAX">MC_ACRO_P_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max acro pitch rate
default: 2 turns per second</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1000.0 (5)</td>
 <td style="vertical-align: top;">720.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ACRO_R_MAX">MC_ACRO_R_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max acro roll rate
default: 2 turns per second</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1000.0 (5)</td>
 <td style="vertical-align: top;">720.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ACRO_SUPEXPO">MC_ACRO_SUPEXPO</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acro SuperExpo factor
applied to input of all axis: roll, pitch, yaw</p><p><strong>Comment:</strong> 0 Pure Expo function 0.7 resonable shape enhancement for intuitive stick feel 0.95 very strong bent input curve only near maxima have effect</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0 > 0.95 </td>
 <td style="vertical-align: top;">0.7 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ACRO_Y_MAX">MC_ACRO_Y_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max acro yaw rate
default 1.5 turns per second</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1000.0 (5)</td>
 <td style="vertical-align: top;">540.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_BAT_SCALE_EN">MC_BAT_SCALE_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Battery power level scaler</p><p><strong>Comment:</strong> This compensates for voltage drop of the battery over time by attempting to normalize performance across the operating range of the battery. The copter should constantly behave as if it was fully charged with reduced max acceleration at lower battery percentages. i.e. if hover is at 0.5 throttle at 100% battery, it will still be 0.5 at 60% battery.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCHRATE_D">MC_PITCHRATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate D gain</p><p><strong>Comment:</strong> Pitch rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.0005)</td>
 <td style="vertical-align: top;">0.003 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCHRATE_FF">MC_PITCHRATE_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate feedforward</p><p><strong>Comment:</strong> Improves tracking performance.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCHRATE_I">MC_PITCHRATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate I gain</p><p><strong>Comment:</strong> Pitch rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCHRATE_MAX">MC_PITCHRATE_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max pitch rate</p><p><strong>Comment:</strong> Limit for pitch rate in manual and auto modes (except acro). Has effect for large rotations in autonomous mode, to avoid large control output and mixer saturation. This is not only limited by the vehicle's properties, but also by the maximum measurement rate of the gyro.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1800.0 (5)</td>
 <td style="vertical-align: top;">220.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCHRATE_P">MC_PITCHRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate P gain</p><p><strong>Comment:</strong> Pitch rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.6 (0.01)</td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCH_P">MC_PITCH_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch P gain</p><p><strong>Comment:</strong> Pitch proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10 (0.1)</td>
 <td style="vertical-align: top;">6.5 </td>
 <td style="vertical-align: top;">1/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PITCH_TC">MC_PITCH_TC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch time constant</p><p><strong>Comment:</strong> Reduce if the system is too twitchy, increase if the response is too slow and sluggish.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.15 > 0.25 (0.01)</td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_PR_INT_LIM">MC_PR_INT_LIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate integrator limit</p><p><strong>Comment:</strong> Pitch rate integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large pitch moment trim changes.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.30 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_RATT_TH">MC_RATT_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for Rattitude mode</p><p><strong>Comment:</strong> Manual input needed in order to override attitude control rate setpoints and instead pass manual stick inputs as rate setpoints</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.8 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLLRATE_D">MC_ROLLRATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate D gain</p><p><strong>Comment:</strong> Roll rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.01 (0.0005)</td>
 <td style="vertical-align: top;">0.003 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLLRATE_FF">MC_ROLLRATE_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate feedforward</p><p><strong>Comment:</strong> Improves tracking performance.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLLRATE_I">MC_ROLLRATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate I gain</p><p><strong>Comment:</strong> Roll rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLLRATE_MAX">MC_ROLLRATE_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max roll rate</p><p><strong>Comment:</strong> Limit for roll rate in manual and auto modes (except acro). Has effect for large rotations in autonomous mode, to avoid large control output and mixer saturation. This is not only limited by the vehicle's properties, but also by the maximum measurement rate of the gyro.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1800.0 (5)</td>
 <td style="vertical-align: top;">220.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLLRATE_P">MC_ROLLRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate P gain</p><p><strong>Comment:</strong> Roll rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.5 (0.01)</td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLL_P">MC_ROLL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll P gain</p><p><strong>Comment:</strong> Roll proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 8 (0.1)</td>
 <td style="vertical-align: top;">6.5 </td>
 <td style="vertical-align: top;">1/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_ROLL_TC">MC_ROLL_TC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll time constant</p><p><strong>Comment:</strong> Reduce if the system is too twitchy, increase if the response is too slow and sluggish.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.15 > 0.25 (0.01)</td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_RR_INT_LIM">MC_RR_INT_LIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate integrator limit</p><p><strong>Comment:</strong> Roll rate integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large roll moment trim changes.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.30 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_TPA_BREAK_D">MC_TPA_BREAK_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TPA D Breakpoint</p><p><strong>Comment:</strong> Throttle PID Attenuation (TPA) Magnitude of throttle setpoint at which to begin attenuating roll/pitch D gain</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.1)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_TPA_BREAK_I">MC_TPA_BREAK_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TPA I Breakpoint</p><p><strong>Comment:</strong> Throttle PID Attenuation (TPA) Magnitude of throttle setpoint at which to begin attenuating roll/pitch I gain</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.1)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_TPA_BREAK_P">MC_TPA_BREAK_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TPA P Breakpoint</p><p><strong>Comment:</strong> Throttle PID Attenuation (TPA) Magnitude of throttle setpoint at which to begin attenuating roll/pitch P gain</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.1)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_TPA_RATE_D">MC_TPA_RATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TPA Rate D</p><p><strong>Comment:</strong> Throttle PID Attenuation (TPA) Rate at which to attenuate roll/pitch D gain Attenuation factor is 1.0 when throttle magnitude is below the setpoint Above the setpoint, the attenuation factor is (1 - rate * (throttle - breakpoint) / (1.0 - breakpoint))</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_TPA_RATE_I">MC_TPA_RATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TPA Rate I</p><p><strong>Comment:</strong> Throttle PID Attenuation (TPA) Rate at which to attenuate roll/pitch I gain Attenuation factor is 1.0 when throttle magnitude is below the setpoint Above the setpoint, the attenuation factor is (1 - rate * (throttle - breakpoint) / (1.0 - breakpoint))</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_TPA_RATE_P">MC_TPA_RATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>TPA Rate P</p><p><strong>Comment:</strong> Throttle PID Attenuation (TPA) Rate at which to attenuate roll/pitch P gain Attenuation factor is 1.0 when throttle magnitude is below the setpoint Above the setpoint, the attenuation factor is (1 - rate * (throttle - breakpoint) / (1.0 - breakpoint))</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.05)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAWRATE_D">MC_YAWRATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate D gain</p><p><strong>Comment:</strong> Yaw rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAWRATE_FF">MC_YAWRATE_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate feedforward</p><p><strong>Comment:</strong> Improves tracking performance.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAWRATE_I">MC_YAWRATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate I gain</p><p><strong>Comment:</strong> Yaw rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAWRATE_MAX">MC_YAWRATE_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max yaw rate</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1800.0 (5)</td>
 <td style="vertical-align: top;">200.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAWRATE_P">MC_YAWRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate P gain</p><p><strong>Comment:</strong> Yaw rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.6 (0.01)</td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAWRAUTO_MAX">MC_YAWRAUTO_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max yaw rate in auto mode</p><p><strong>Comment:</strong> Limit for yaw rate, has effect for large rotations in autonomous mode, to avoid large control output and mixer saturation.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 360.0 (5)</td>
 <td style="vertical-align: top;">45.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAW_FF">MC_YAW_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw feed forward</p><p><strong>Comment:</strong> Feed forward weight for manual yaw control. 0 will give slow responce and no overshot, 1 - fast responce and big overshot.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YAW_P">MC_YAW_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw P gain</p><p><strong>Comment:</strong> Yaw proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 5 (0.1)</td>
 <td style="vertical-align: top;">2.8 </td>
 <td style="vertical-align: top;">1/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MC_YR_INT_LIM">MC_YR_INT_LIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate integrator limit</p><p><strong>Comment:</strong> Yaw rate integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large yaw moment trim changes.</p>    <p><b>Module:</b> modules/mc_att_control</p>
</td>
 <td style="vertical-align: top;">0.0 > ? (0.01)</td>
 <td style="vertical-align: top;">0.30 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_MAN_P_MAX">MPP_MAN_P_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max manual pitch</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">35.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_MAN_R_MAX">MPP_MAN_R_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max manual roll</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">35.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_MAN_Y_MAX">MPP_MAN_Y_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max manual yaw rate</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ACRO_P_MAX">MP_ACRO_P_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max acro pitch rate</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 360.0 </td>
 <td style="vertical-align: top;">35.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ACRO_R_MAX">MP_ACRO_R_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max acro roll rate</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 360.0 </td>
 <td style="vertical-align: top;">35.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ACRO_Y_MAX">MP_ACRO_Y_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max acro yaw rate</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_PITCHRATE_D">MP_PITCHRATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate D gain</p><p><strong>Comment:</strong> Pitch rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.002 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_PITCHRATE_I">MP_PITCHRATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate I gain</p><p><strong>Comment:</strong> Pitch rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_PITCHRATE_P">MP_PITCHRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch rate P gain</p><p><strong>Comment:</strong> Pitch rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_PITCH_P">MP_PITCH_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch P gain</p><p><strong>Comment:</strong> Pitch proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">6.0 </td>
 <td style="vertical-align: top;">1/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ROLLRATE_D">MP_ROLLRATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate D gain</p><p><strong>Comment:</strong> Roll rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.002 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ROLLRATE_I">MP_ROLLRATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate I gain</p><p><strong>Comment:</strong> Roll rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ROLLRATE_P">MP_ROLLRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll rate P gain</p><p><strong>Comment:</strong> Roll rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_ROLL_P">MP_ROLL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll P gain</p><p><strong>Comment:</strong> Roll proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">6.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_YAWRATE_D">MP_YAWRATE_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate D gain</p><p><strong>Comment:</strong> Yaw rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_YAWRATE_I">MP_YAWRATE_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate I gain</p><p><strong>Comment:</strong> Yaw rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_YAWRATE_MAX">MP_YAWRATE_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max yaw rate</p><p><strong>Comment:</strong> Limit for yaw rate, has effect for large rotations in autonomous mode, to avoid large control output and mixer saturation.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 360.0 </td>
 <td style="vertical-align: top;">60.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_YAWRATE_P">MP_YAWRATE_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw rate P gain</p><p><strong>Comment:</strong> Yaw rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_YAW_FF">MP_YAW_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw feed forward</p><p><strong>Comment:</strong> Feed forward weight for manual yaw control. 0 will give slow responce and no overshot, 1 - fast responce and big overshot.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MP_YAW_P">MP_YAW_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw P gain</p><p><strong>Comment:</strong> Yaw proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>    <p><b>Module:</b> examples/mc_att_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">1/s</td>
</tr>
</tbody></table>

## Multicopter Position Control

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_ACC_DOWN_MAX">MPC_ACC_DOWN_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical acceleration in velocity controlled modes down</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">2.0 > 15.0 (1)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_ACC_HOR">MPC_ACC_HOR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Acceleration for auto and for manual</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">2.0 > 15.0 (1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_ACC_HOR_MAX">MPC_ACC_HOR_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal acceleration for auto mode and maximum deceleration for manual mode</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">2.0 > 15.0 (1)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_ACC_UP_MAX">MPC_ACC_UP_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical acceleration in velocity controlled modes upward</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">2.0 > 15.0 (1)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_ALT_MODE">MPC_ALT_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Altitude control mode, note mode 1 only tested with LPE</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Altitude following</li> 

<li><strong>1:</strong> Terrain following</li> 
</ul>
   <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_CRUISE_90">MPC_CRUISE_90</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Cruise speed when angle prev-current/current-next setpoint
is 90 degrees. It should be lower than MPC_XY_CRUISE</p><p><strong>Comment:</strong> Applies only in AUTO modes (includes also RTL / hold / etc.)</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">1.0 > ? (1)</td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_DEC_HOR_SLOW">MPC_DEC_HOR_SLOW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Slow horizontal manual deceleration for manual mode</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.5 > 10.0 (1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_HOLD_DZ">MPC_HOLD_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Deadzone of sticks where position hold is enabled</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_HOLD_MAX_XY">MPC_HOLD_MAX_XY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal velocity for which position hold is enabled (use 0 to disable check)</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 3.0 </td>
 <td style="vertical-align: top;">0.8 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_HOLD_MAX_Z">MPC_HOLD_MAX_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical velocity for which position hold is enabled (use 0 to disable check)</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 3.0 </td>
 <td style="vertical-align: top;">0.6 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_JERK_MAX">MPC_JERK_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum jerk in manual controlled mode for BRAKING to zero.
If this value is below MPC_JERK_MIN, the acceleration limit in xy and z
is MPC_ACC_HOR_MAX and MPC_ACC_UP_MAX respectively instantaneously when the
user demands brake (=zero stick input).
Otherwise the acceleration limit increases from current acceleration limit
towards MPC_ACC_HOR_MAX/MPC_ACC_UP_MAX with jerk limit</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 15.0 (1)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m/s/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_JERK_MIN">MPC_JERK_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum jerk in manual controlled mode for BRAKING to zero</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.5 > 10.0 (1)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m/s/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_LAND_ALT1">MPC_LAND_ALT1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Altitude for 1. step of slow landing (descend)</p><p><strong>Comment:</strong> Below this altitude descending velocity gets limited to a value between "MPC_Z_VEL_MAX" and "MPC_LAND_SPEED" to enable a smooth descent experience Value needs to be higher than "MPC_LAND_ALT2"</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0 > 122 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_LAND_ALT2">MPC_LAND_ALT2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Altitude for 2. step of slow landing (landing)</p><p><strong>Comment:</strong> Below this altitude descending velocity gets limited to "MPC_LAND_SPEED" Value needs to be lower than "MPC_LAND_ALT1"</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0 > 122 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_LAND_SPEED">MPC_LAND_SPEED</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Landing descend rate</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.6 > ? </td>
 <td style="vertical-align: top;">0.7 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_MANTHR_MAX">MPC_MANTHR_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum manual thrust</p><p><strong>Comment:</strong> Limit max allowed thrust. Setting a value of one can put the system into actuator saturation as no spread between the motors is possible any more. A value of 0.8 - 0.9 is recommended.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.9 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_MANTHR_MIN">MPC_MANTHR_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum manual thrust</p><p><strong>Comment:</strong> Minimum vertical thrust. It's recommended to set it > 0 to avoid free fall with zero thrust.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.08 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_MAN_TILT_MAX">MPC_MAN_TILT_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximal tilt angle in manual or altitude mode</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">35.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_MAN_Y_MAX">MPC_MAN_Y_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max manual yaw rate</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 400 </td>
 <td style="vertical-align: top;">200.0 </td>
 <td style="vertical-align: top;">deg/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_THR_HOVER">MPC_THR_HOVER</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Hover thrust</p><p><strong>Comment:</strong> Vertical thrust required to hover. This value is mapped to center stick for manual throttle control. With this value set to the thrust required to hover, transition from manual to ALTCTL mode while hovering will occur with the throttle stick near center, which is then interpreted as (near) zero demand for vertical speed.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.2 > 0.8 (0.01)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_THR_MAX">MPC_THR_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum thrust in auto thrust control</p><p><strong>Comment:</strong> Limit max allowed thrust. Setting a value of one can put the system into actuator saturation as no spread between the motors is possible any more. A value of 0.8 - 0.9 is recommended.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.95 (0.01)</td>
 <td style="vertical-align: top;">0.9 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_THR_MIN">MPC_THR_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum thrust in auto thrust control</p><p><strong>Comment:</strong> It's recommended to set it > 0 to avoid free fall with zero thrust.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.05 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.12 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_TILTMAX_AIR">MPC_TILTMAX_AIR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum tilt angle in air</p><p><strong>Comment:</strong> Limits maximum tilt in AUTO and POSCTRL modes during flight.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">45.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_TILTMAX_LND">MPC_TILTMAX_LND</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum tilt during landing</p><p><strong>Comment:</strong> Limits maximum tilt angle on landing.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">12.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_TKO_RAMP_T">MPC_TKO_RAMP_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position control smooth takeoff ramp time constant</p><p><strong>Comment:</strong> Increasing this value will make automatic and manual takeoff slower. If it's too slow the drone might scratch the ground and tip over.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.1 > 1 </td>
 <td style="vertical-align: top;">0.4 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_TKO_SPEED">MPC_TKO_SPEED</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Takeoff climb rate</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">1 > 5 </td>
 <td style="vertical-align: top;">1.5 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_VELD_LP">MPC_VELD_LP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Low pass filter cut freq. for numerical velocity derivative</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 10 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_VEL_MANUAL">MPC_VEL_MANUAL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal velocity setpoint for manual controlled mode
If velocity setpoint larger than MPC_XY_VEL_MAX is set, then
the setpoint will be capped to MPC_XY_VEL_MAX</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">3.0 > 20.0 (1)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_CRUISE">MPC_XY_CRUISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal velocity in mission</p><p><strong>Comment:</strong> Normal horizontal velocity in AUTO modes (includes also RTL / hold / etc.) and endpoint for position stabilized mode (POSCTRL).</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">3.0 > 20.0 (1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_MAN_EXPO">MPC_XY_MAN_EXPO</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Manual control stick exponential curve sensitivity attenuation with small velocity setpoints</p><p><strong>Comment:</strong> The higher the value the less sensitivity the stick has around zero while still reaching the maximum value with full stick deflection. 0 Purely linear input curve (default) 1 Purely cubic input curve</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_P">MPC_XY_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for horizontal position error</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 2.0 </td>
 <td style="vertical-align: top;">0.95 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_VEL_D">MPC_XY_VEL_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential gain for horizontal velocity error. Small values help reduce fast oscillations. If value is too big oscillations will appear again</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.005 > 0.1 </td>
 <td style="vertical-align: top;">0.01 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_VEL_I">MPC_XY_VEL_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Integral gain for horizontal velocity error</p><p><strong>Comment:</strong> Non-zero value allows to resist wind.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.1 </td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_VEL_MAX">MPC_XY_VEL_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal velocity</p><p><strong>Comment:</strong> Maximum horizontal velocity in AUTO mode. If higher speeds are commanded in a mission they will be capped to this velocity.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 20.0 (1)</td>
 <td style="vertical-align: top;">12.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_XY_VEL_P">MPC_XY_VEL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for horizontal velocity error</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.06 > 0.15 </td>
 <td style="vertical-align: top;">0.09 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_MAN_EXPO">MPC_Z_MAN_EXPO</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Manual control stick vertical exponential curve</p><p><strong>Comment:</strong> The higher the value the less sensitivity the stick has around zero while still reaching the maximum value with full stick deflection. 0 Purely linear input curve (default) 1 Purely cubic input curve</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_P">MPC_Z_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for vertical position error</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.5 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_VEL_D">MPC_Z_VEL_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential gain for vertical velocity error</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.0 > 0.1 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_VEL_I">MPC_Z_VEL_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Integral gain for vertical velocity error</p><p><strong>Comment:</strong> Non zero value allows hovering thrust estimation on stabilized or autonomous takeoff.</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.01 > 0.1 </td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_VEL_MAX_DN">MPC_Z_VEL_MAX_DN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical descent velocity</p><p><strong>Comment:</strong> Maximum vertical velocity in AUTO mode and endpoint for stabilized modes (ALTCTRL, POSCTRL).</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.5 > 4.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_VEL_MAX_UP">MPC_Z_VEL_MAX_UP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical ascent velocity</p><p><strong>Comment:</strong> Maximum vertical velocity in AUTO mode and endpoint for stabilized modes (ALTCTRL, POSCTRL).</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.5 > 8.0 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPC_Z_VEL_P">MPC_Z_VEL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for vertical velocity error</p>    <p><b>Module:</b> modules/mc_pos_control</p>
</td>
 <td style="vertical-align: top;">0.1 > 0.4 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_LAND_SPEED">MPP_LAND_SPEED</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Landing descend rate</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_THR_MAX">MPP_THR_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum thrust</p><p><strong>Comment:</strong> Limit max allowed thrust.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_THR_MIN">MPP_THR_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum thrust</p><p><strong>Comment:</strong> Minimum vertical thrust. It's recommended to set it > 0 to avoid free fall with zero thrust.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_TILTMAX_AIR">MPP_TILTMAX_AIR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum tilt angle in air</p><p><strong>Comment:</strong> Limits maximum tilt in AUTO and POSCTRL modes during flight.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">45.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_TILTMAX_LND">MPP_TILTMAX_LND</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum tilt during landing</p><p><strong>Comment:</strong> Limits maximum tilt angle on landing.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 90.0 </td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_XY_FF">MPP_XY_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Horizontal velocity feed forward</p><p><strong>Comment:</strong> Feed forward weight for position control in position control mode (POSCTRL). 0 will give slow responce and no overshot, 1 - fast responce and big overshot.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_XY_P">MPP_XY_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for horizontal position error</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_XY_VEL_D">MPP_XY_VEL_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential gain for horizontal velocity error. Small values help reduce fast oscillations. If value is too big oscillations will appear again</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.01 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_XY_VEL_I">MPP_XY_VEL_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Integral gain for horizontal velocity error</p><p><strong>Comment:</strong> Non-zero value allows to resist wind.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_XY_VEL_MAX">MPP_XY_VEL_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum horizontal velocity</p><p><strong>Comment:</strong> Maximum horizontal velocity in AUTO mode and endpoint for position stabilized mode (POSCTRL).</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_XY_VEL_P">MPP_XY_VEL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for horizontal velocity error</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_Z_FF">MPP_Z_FF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Vertical velocity feed forward</p><p><strong>Comment:</strong> Feed forward weight for altitude control in stabilized modes (ALTCTRL). 0 will give slow responce and no overshot, 1 - fast responce and big overshot.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_Z_P">MPP_Z_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for vertical position error</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_Z_VEL_D">MPP_Z_VEL_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential gain for vertical velocity error</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_Z_VEL_I">MPP_Z_VEL_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Integral gain for vertical velocity error</p><p><strong>Comment:</strong> Non zero value allows hovering thrust estimation on stabilized or autonomous takeoff.</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.02 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_Z_VEL_MAX">MPP_Z_VEL_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum vertical velocity</p><p><strong>Comment:</strong> Maximum vertical velocity in AUTO mode and endpoint for stabilized modes (ALTCTRL).</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="MPP_Z_VEL_P">MPP_Z_VEL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Proportional gain for vertical velocity error</p>    <p><b>Module:</b> examples/mc_pos_control_multiplatform</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## PWM Outputs

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="MOT_SLEW_MAX">MOT_SLEW_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum motor rise time (slew rate limit)</p><p><strong>Comment:</strong> Minimum time allowed for the motor input signal to pass through a range of 1000 PWM units. A value x means that the motor signal can only go from 1000 to 2000 PWM in maximum x seconds. Zero means that slew rate limiting is disabled.</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">0.0 > ? </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">s/(1000*PWM)</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DIS1">PWM_AUX_DIS1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the AUX 1 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DIS2">PWM_AUX_DIS2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the AUX 2 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DIS3">PWM_AUX_DIS3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the AUX 3 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DIS4">PWM_AUX_DIS4</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the AUX 4 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DIS5">PWM_AUX_DIS5</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the AUX 5 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DIS6">PWM_AUX_DIS6</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the AUX 6 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_DISARMED">PWM_AUX_DISARMED</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for auxiliary outputs</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. The main use of this parameter is to silence ESCs when they are disarmed.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 2200 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_MAX">PWM_AUX_MAX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the maximum PWM for the auxiliary outputs</p><p><strong>Comment:</strong> Set to 2000 for default or 2100 to increase servo travel</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1600 > 2200 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_MIN">PWM_AUX_MIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the minimum PWM for the auxiliary outputs</p><p><strong>Comment:</strong> Set to 1000 for default or 900 to increase servo travel</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800 > 1400 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_REV1">PWM_AUX_REV1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of aux output channel 1</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_REV2">PWM_AUX_REV2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of aux output channel 2</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_REV3">PWM_AUX_REV3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of aux output channel 3</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_REV4">PWM_AUX_REV4</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of aux output channel 4</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_REV5">PWM_AUX_REV5</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of aux output channel 5</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_REV6">PWM_AUX_REV6</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of aux output channel 6</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_TRIM1">PWM_AUX_TRIM1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for FMU PWM output channel 1</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_TRIM2">PWM_AUX_TRIM2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for FMU PWM output channel 2</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_TRIM3">PWM_AUX_TRIM3</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for FMU PWM output channel 3</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_TRIM4">PWM_AUX_TRIM4</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for FMU PWM output channel 4</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_TRIM5">PWM_AUX_TRIM5</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for FMU PWM output channel 5</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_AUX_TRIM6">PWM_AUX_TRIM6</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for FMU PWM output channel 6</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_DISARMED">PWM_DISARMED</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main outputs</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. The main use of this parameter is to silence ESCs when they are disarmed.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 2200 </td>
 <td style="vertical-align: top;">900 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS1">PWM_MAIN_DIS1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 1 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS2">PWM_MAIN_DIS2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 2 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS3">PWM_MAIN_DIS3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 3 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS4">PWM_MAIN_DIS4</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 4 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS5">PWM_MAIN_DIS5</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 5 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS6">PWM_MAIN_DIS6</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 6 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS7">PWM_MAIN_DIS7</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 7 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_DIS8">PWM_MAIN_DIS8</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the disarmed PWM for the main 8 output</p><p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2200 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV1">PWM_MAIN_REV1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 1</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV2">PWM_MAIN_REV2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 2</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV3">PWM_MAIN_REV3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 3</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV4">PWM_MAIN_REV4</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 4</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV5">PWM_MAIN_REV5</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 5</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV6">PWM_MAIN_REV6</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 6</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV7">PWM_MAIN_REV7</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 7</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_REV8">PWM_MAIN_REV8</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Invert direction of main output channel 8</p><p><strong>Comment:</strong> Set to 1 to invert the channel, 0 for default direction.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM1">PWM_MAIN_TRIM1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 1</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM2">PWM_MAIN_TRIM2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 2</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM3">PWM_MAIN_TRIM3</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 3</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM4">PWM_MAIN_TRIM4</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 4</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM5">PWM_MAIN_TRIM5</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 5</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM6">PWM_MAIN_TRIM6</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 6</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM7">PWM_MAIN_TRIM7</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 7</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAIN_TRIM8">PWM_MAIN_TRIM8</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim value for main output channel 8</p><p><strong>Comment:</strong> Set to normalized offset</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">-0.2 > 0.2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MAX">PWM_MAX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the maximum PWM for the main outputs</p><p><strong>Comment:</strong> Set to 2000 for industry default or 2100 to increase servo travel.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1600 > 2200 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_MIN">PWM_MIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the minimum PWM for the main outputs</p><p><strong>Comment:</strong> Set to 1000 for industry default or 900 to increase servo travel.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800 > 1400 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_RATE">PWM_RATE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set the PWM output frequency for the main outputs</p><p><strong>Comment:</strong> Set to 400 for industry default or 1000 for high frequency ESCs. Set to 0 for Oneshot125.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1 > 2000 </td>
 <td style="vertical-align: top;">400 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PWM_SBUS_MODE">PWM_SBUS_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>S.BUS out</p><p><strong>Comment:</strong> Set to 1 to enable S.BUS version 1 output instead of RSSI.</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="THR_MDL_FAC">THR_MDL_FAC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Thrust to PWM model parameter</p><p><strong>Comment:</strong> Parameter used to model the relationship between static thrust and motor input PWM. Model is: thrust = (1-factor)*PWM + factor * PWM^2</p>    <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Payload drop


The module where these parameters are defined is: *examples/bottle_drop*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="BD_GPROPERTIES">BD_GPROPERTIES</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Ground drag property</p><p><strong>Comment:</strong> This parameter encodes the ground drag coefficient and the corresponding decrease in wind speed from the plane altitude to ground altitude.</p>    </td>
 <td style="vertical-align: top;">0.001 > 0.1 </td>
 <td style="vertical-align: top;">0.03 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BD_OBJ_CD">BD_OBJ_CD</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Payload drag coefficient of the dropped object</p><p><strong>Comment:</strong> The drag coefficient (cd) is the typical drag constant for air. It is in general object specific, but the closest primitive shape to the actual object should give good results: http://en.wikipedia.org/wiki/Drag_coefficient</p>    </td>
 <td style="vertical-align: top;">0.08 > 1.5 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BD_OBJ_MASS">BD_OBJ_MASS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Payload mass</p><p><strong>Comment:</strong> A typical small toy ball: 0.025 kg OBC water bottle: 0.6 kg</p>    </td>
 <td style="vertical-align: top;">0.001 > 5.0 </td>
 <td style="vertical-align: top;">0.6 </td>
 <td style="vertical-align: top;">kg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BD_OBJ_SURFACE">BD_OBJ_SURFACE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Payload front surface area</p><p><strong>Comment:</strong> A typical small toy ball: (0.045 * 0.045) / 4.0 * pi = 0.001590 m^2 OBC water bottle: (0.063 * 0.063) / 4.0 * pi = 0.003117 m^2</p>    </td>
 <td style="vertical-align: top;">0.001 > 0.5 </td>
 <td style="vertical-align: top;">0.00311724531 </td>
 <td style="vertical-align: top;">m^2</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BD_PRECISION">BD_PRECISION</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Drop precision</p><p><strong>Comment:</strong> If the system is closer than this distance on passing over the drop position, it will release the payload. This is a safeguard to prevent a drop out of the required accuracy.</p>    </td>
 <td style="vertical-align: top;">1.0 > 80.0 </td>
 <td style="vertical-align: top;">30.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="BD_TURNRADIUS">BD_TURNRADIUS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Plane turn radius</p><p><strong>Comment:</strong> The planes known minimal turn radius - use a higher value to make the plane maneuver more distant from the actual drop position. This is to ensure the wings are level during the drop.</p>    </td>
 <td style="vertical-align: top;">30.0 > 500.0 </td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
</tbody></table>

## Position Estimator


The module where these parameters are defined is: *examples/ekf_att_pos_estimator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="PE_ABIAS_PNOISE">PE_ABIAS_PNOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer bias estimate process noise</p><p><strong>Comment:</strong> Generic defaults: 0.00001f, multicopters: 0.00001f, ground vehicles: 0.00001f. Increasing this value makes the bias estimation faster and noisier.</p>    </td>
 <td style="vertical-align: top;">0.00001 > 0.001 </td>
 <td style="vertical-align: top;">1e-05 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_ACC_PNOISE">PE_ACC_PNOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer process noise</p><p><strong>Comment:</strong> Generic defaults: 0.25, multicopters: 0.25, ground vehicles: 0.25. Increasing this value makes the filter trust the accelerometer less and other sensors more.</p>    </td>
 <td style="vertical-align: top;">0.05 > 1.0 </td>
 <td style="vertical-align: top;">0.125 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_EAS_NOISE">PE_EAS_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airspeed measurement noise</p><p><strong>Comment:</strong> Increasing this value will make the filter trust this sensor less and trust other sensors more.</p>    </td>
 <td style="vertical-align: top;">0.5 > 5.0 </td>
 <td style="vertical-align: top;">1.4 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_GBIAS_PNOISE">PE_GBIAS_PNOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro bias estimate process noise</p><p><strong>Comment:</strong> Generic defaults: 1e-07f, multicopters: 1e-07f, ground vehicles: 1e-07f. Increasing this value will make the gyro bias converge faster but noisier.</p>    </td>
 <td style="vertical-align: top;">0.00000005 > 0.00001 </td>
 <td style="vertical-align: top;">1e-07 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_GPS_ALT_WGT">PE_GPS_ALT_WGT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>GPS vs. barometric altitude update weight</p><p><strong>Comment:</strong> RE-CHECK this.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.9 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_GYRO_PNOISE">PE_GYRO_PNOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro process noise</p><p><strong>Comment:</strong> Generic defaults: 0.015, multicopters: 0.015, ground vehicles: 0.015. This noise controls how much the filter trusts the gyro measurements. Increasing it makes the filter trust the gyro less and other sensors more.</p>    </td>
 <td style="vertical-align: top;">0.001 > 0.05 </td>
 <td style="vertical-align: top;">0.015 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_HGT_DELAY_MS">PE_HGT_DELAY_MS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Height estimate delay</p><p><strong>Comment:</strong> The delay in milliseconds of the height estimate from the barometer.</p>    </td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">350 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAGB_PNOISE">PE_MAGB_PNOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer body frame offsets process noise</p><p><strong>Comment:</strong> Generic defaults: 0.0003, multicopters: 0.0003, ground vehicles: 0.0003. Increasing this value makes the magnetometer body bias estimate converge faster but also noisier.</p>    </td>
 <td style="vertical-align: top;">0.0001 > 0.01 </td>
 <td style="vertical-align: top;">0.0003 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAGB_X">PE_MAGB_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X bias</p><p><strong>Comment:</strong> The magnetometer bias. This bias is learnt by the filter over time and persists between boots.</p>    </td>
 <td style="vertical-align: top;">-0.6 > 0.6 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAGB_Y">PE_MAGB_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y bias</p><p><strong>Comment:</strong> The magnetometer bias. This bias is learnt by the filter over time and persists between boots.</p>    </td>
 <td style="vertical-align: top;">-0.6 > 0.6 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAGB_Z">PE_MAGB_Z</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z bias</p><p><strong>Comment:</strong> The magnetometer bias. This bias is learnt by the filter over time and persists between boots.</p>    </td>
 <td style="vertical-align: top;">-0.6 > 0.6 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAGE_PNOISE">PE_MAGE_PNOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer earth frame offsets process noise</p><p><strong>Comment:</strong> Generic defaults: 0.0001, multicopters: 0.0001, ground vehicles: 0.0001. Increasing this value makes the magnetometer earth bias estimate converge faster but also noisier.</p>    </td>
 <td style="vertical-align: top;">0.0001 > 0.01 </td>
 <td style="vertical-align: top;">0.0003 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAG_DELAY_MS">PE_MAG_DELAY_MS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mag estimate delay</p><p><strong>Comment:</strong> The delay in milliseconds of the magnetic field estimate from the magnetometer.</p>    </td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">30 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_MAG_NOISE">PE_MAG_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer measurement noise</p><p><strong>Comment:</strong> Generic defaults: 0.05, multicopters: 0.05, ground vehicles: 0.05</p>    </td>
 <td style="vertical-align: top;">0.01 > 1.0 </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_POSDEV_INIT">PE_POSDEV_INIT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for filter initialization</p><p><strong>Comment:</strong> If the standard deviation of the GPS position estimate is below this threshold in meters, the filter will initialize.</p>    </td>
 <td style="vertical-align: top;">0.3 > 10.0 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_POSD_NOISE">PE_POSD_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position noise in down (vertical) direction</p><p><strong>Comment:</strong> Generic defaults: 1.25, multicopters: 1.0, ground vehicles: 1.0</p>    </td>
 <td style="vertical-align: top;">0.5 > 3.0 </td>
 <td style="vertical-align: top;">1.25 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_POSNE_NOISE">PE_POSNE_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position noise in north-east (horizontal) direction</p><p><strong>Comment:</strong> Generic defaults: 0.5, multicopters: 0.5, ground vehicles: 0.5</p>    </td>
 <td style="vertical-align: top;">0.1 > 10.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_POS_DELAY_MS">PE_POS_DELAY_MS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Position estimate delay</p><p><strong>Comment:</strong> The delay in milliseconds of the position estimate from GPS.</p>    </td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">210 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_TAS_DELAY_MS">PE_TAS_DELAY_MS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>True airspeeed estimate delay</p><p><strong>Comment:</strong> The delay in milliseconds of the airspeed estimate.</p>    </td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">210 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_VELD_NOISE">PE_VELD_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Velocity noise in down (vertical) direction</p><p><strong>Comment:</strong> Generic default: 0.3, multicopters: 0.4, ground vehicles: 0.7</p>    </td>
 <td style="vertical-align: top;">0.2 > 3.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_VELNE_NOISE">PE_VELNE_NOISE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Velocity measurement noise in north-east (horizontal) direction</p><p><strong>Comment:</strong> Generic default: 0.3, multicopters: 0.5, ground vehicles: 0.5</p>    </td>
 <td style="vertical-align: top;">0.05 > 5.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="PE_VEL_DELAY_MS">PE_VEL_DELAY_MS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Velocity estimate delay</p><p><strong>Comment:</strong> The delay in milliseconds of the velocity estimate from GPS.</p>    </td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">230 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
</tbody></table>

## Position Estimator INAV


The module where these parameters are defined is: *modules/position_estimator_inav*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="CBRK_NO_VISION">CBRK_NO_VISION</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Disable vision input</p><p><strong>Comment:</strong> Set to the appropriate key (328754) to disable vision input.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 328754 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_DELAY_GPS">INAV_DELAY_GPS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>GPS delay</p><p><strong>Comment:</strong> GPS delay compensation</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_DISAB_MOCAP">INAV_DISAB_MOCAP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Mo-cap</p><p><strong>Comment:</strong> Set to 0 if using fake GPS</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Mo-cap enabled</li> 

<li><strong>1:</strong> Mo-cap disabled</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_FLOW_DIST_X">INAV_FLOW_DIST_X</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Flow module offset (center of rotation) in X direction</p><p><strong>Comment:</strong> Yaw X flow compensation</p>    </td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_FLOW_DIST_Y">INAV_FLOW_DIST_Y</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Flow module offset (center of rotation) in Y direction</p><p><strong>Comment:</strong> Yaw Y flow compensation</p>    </td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_FLOW_K">INAV_FLOW_K</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Optical flow scale factor</p><p><strong>Comment:</strong> Factor to scale optical flow</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">1.35 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_FLOW_Q_MIN">INAV_FLOW_Q_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimal acceptable optical flow quality</p><p><strong>Comment:</strong> 0 - lowest quality, 1 - best quality.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_LAND_DISP">INAV_LAND_DISP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Land detector altitude dispersion threshold</p><p><strong>Comment:</strong> Dispersion threshold for triggering land detector.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.7 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_LAND_T">INAV_LAND_T</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Land detector time</p><p><strong>Comment:</strong> Vehicle assumed landed if no altitude changes happened during this time on low throttle.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_LAND_THR">INAV_LAND_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Land detector throttle threshold</p><p><strong>Comment:</strong> Value should be lower than minimal hovering thrust. Half of it is good choice.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_LIDAR_ERR">INAV_LIDAR_ERR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Sonar maximal error for new surface</p><p><strong>Comment:</strong> If sonar measurement error is larger than this value it skiped (spike) or accepted as new surface level (if offset is stable).</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_LIDAR_EST">INAV_LIDAR_EST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>LIDAR for altitude estimation</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_LIDAR_OFF">INAV_LIDAR_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>LIDAR calibration offset</p><p><strong>Comment:</strong> LIDAR calibration offset. Value will be added to the measured distance</p>    </td>
 <td style="vertical-align: top;">-20 > 20 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_ACC_BIAS">INAV_W_ACC_BIAS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer bias estimation weight</p><p><strong>Comment:</strong> Weight (cutoff frequency) for accelerometer bias estimation. 0 to disable.</p>    </td>
 <td style="vertical-align: top;">0.0 > 0.1 </td>
 <td style="vertical-align: top;">0.05 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_GPS_FLOW">INAV_W_GPS_FLOW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight factor for GPS when optical flow available</p><p><strong>Comment:</strong> When optical flow data available, multiply GPS weights (for position and velocity) by this factor.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 </td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_MOC_P">INAV_W_MOC_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Weight for mocap system</p><p><strong>Comment:</strong> Weight (cutoff frequency) for mocap position measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_XY_FLOW">INAV_W_XY_FLOW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight for optical flow</p><p><strong>Comment:</strong> Weight (cutoff frequency) for optical flow (velocity) measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.8 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_XY_GPS_P">INAV_W_XY_GPS_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight for GPS position</p><p><strong>Comment:</strong> Weight (cutoff frequency) for GPS position measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_XY_GPS_V">INAV_W_XY_GPS_V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight for GPS velocity</p><p><strong>Comment:</strong> Weight (cutoff frequency) for GPS velocity measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_XY_RES_V">INAV_W_XY_RES_V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight for resetting velocity</p><p><strong>Comment:</strong> When velocity sources lost slowly decrease estimated horizontal velocity with this weight.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_XY_VIS_P">INAV_W_XY_VIS_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight for vision position</p><p><strong>Comment:</strong> Weight (cutoff frequency) for vision position measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">7.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_XY_VIS_V">INAV_W_XY_VIS_V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>XY axis weight for vision velocity</p><p><strong>Comment:</strong> Weight (cutoff frequency) for vision velocity measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_Z_BARO">INAV_W_Z_BARO</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z axis weight for barometer</p><p><strong>Comment:</strong> Weight (cutoff frequency) for barometer altitude measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_Z_GPS_P">INAV_W_Z_GPS_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z axis weight for GPS</p><p><strong>Comment:</strong> Weight (cutoff frequency) for GPS altitude measurements. GPS altitude data is very noisy and should be used only as slow correction for baro offset.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.005 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_Z_GPS_V">INAV_W_Z_GPS_V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z velocity weight for GPS</p><p><strong>Comment:</strong> Weight (cutoff frequency) for GPS altitude velocity measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_Z_LIDAR">INAV_W_Z_LIDAR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z axis weight for lidar</p><p><strong>Comment:</strong> Weight (cutoff frequency) for lidar measurements.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="INAV_W_Z_VIS_P">INAV_W_Z_VIS_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Z axis weight for vision</p><p><strong>Comment:</strong> Weight (cutoff frequency) for vision altitude measurements. vision altitude data is very noisy and should be used only as slow correction for baro offset.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Radio Calibration

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="RC10_DZ">RC10_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 10 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC10_MAX">RC10_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 10 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC10_MIN">RC10_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 10 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC10_REV">RC10_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 10 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC10_TRIM">RC10_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 10 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC11_DZ">RC11_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 11 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC11_MAX">RC11_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 11 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC11_MIN">RC11_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 11 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC11_REV">RC11_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 11 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC11_TRIM">RC11_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 11 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC12_DZ">RC12_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 12 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC12_MAX">RC12_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 12 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC12_MIN">RC12_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 12 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC12_REV">RC12_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 12 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC12_TRIM">RC12_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 12 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC13_DZ">RC13_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 13 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC13_MAX">RC13_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 13 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC13_MIN">RC13_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 13 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC13_REV">RC13_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 13 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC13_TRIM">RC13_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 13 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC14_DZ">RC14_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 14 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC14_MAX">RC14_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 14 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC14_MIN">RC14_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 14 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC14_REV">RC14_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 14 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC14_TRIM">RC14_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 14 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC15_DZ">RC15_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 15 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC15_MAX">RC15_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 15 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC15_MIN">RC15_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 15 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC15_REV">RC15_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 15 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC15_TRIM">RC15_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 15 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC16_DZ">RC16_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 16 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC16_MAX">RC16_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 16 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC16_MIN">RC16_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 16 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC16_REV">RC16_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 16 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC16_TRIM">RC16_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 16 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC17_DZ">RC17_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 17 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC17_MAX">RC17_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 17 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC17_MIN">RC17_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 17 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC17_REV">RC17_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 17 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC17_TRIM">RC17_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 17 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC18_DZ">RC18_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 18 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC18_MAX">RC18_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 18 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC18_MIN">RC18_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 18 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC18_REV">RC18_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 18 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC18_TRIM">RC18_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 18 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC1_DZ">RC1_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 1 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC1_MAX">RC1_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 1 maximum</p><p><strong>Comment:</strong> Maximum value for RC channel 1</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC1_MIN">RC1_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 1 minimum</p><p><strong>Comment:</strong> Minimum value for RC channel 1</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC1_REV">RC1_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 1 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC1_TRIM">RC1_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 1 trim</p><p><strong>Comment:</strong> Mid point value (same as min for throttle)</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC2_DZ">RC2_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 2 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC2_MAX">RC2_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 2 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC2_MIN">RC2_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 2 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC2_REV">RC2_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 2 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC2_TRIM">RC2_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 2 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC3_DZ">RC3_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 3 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC3_MAX">RC3_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 3 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC3_MIN">RC3_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 3 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC3_REV">RC3_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 3 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC3_TRIM">RC3_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 3 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC4_DZ">RC4_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 4 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC4_MAX">RC4_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 4 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC4_MIN">RC4_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 4 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC4_REV">RC4_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 4 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC4_TRIM">RC4_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 4 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC5_DZ">RC5_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 5 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC5_MAX">RC5_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 5 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC5_MIN">RC5_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 5 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC5_REV">RC5_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 5 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC5_TRIM">RC5_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 5 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC6_DZ">RC6_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 6 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC6_MAX">RC6_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 6 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC6_MIN">RC6_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 6 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC6_REV">RC6_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 6 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC6_TRIM">RC6_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 6 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC7_DZ">RC7_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 7 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC7_MAX">RC7_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 7 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC7_MIN">RC7_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 7 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC7_REV">RC7_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 7 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC7_TRIM">RC7_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 7 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC8_DZ">RC8_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 8 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC8_MAX">RC8_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 8 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC8_MIN">RC8_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 8 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC8_REV">RC8_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 8 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC8_TRIM">RC8_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 8 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC9_DZ">RC9_DZ</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 9 dead zone</p><p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.0 > 100.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC9_MAX">RC9_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 9 maximum</p><p><strong>Comment:</strong> Maximum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1500.0 > 2200.0 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC9_MIN">RC9_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 9 minimum</p><p><strong>Comment:</strong> Minimum value for this channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 1500.0 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC9_REV">RC9_REV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 9 reverse</p><p><strong>Comment:</strong> Set to -1 to reverse channel.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">-1.0 > 1.0 </td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC9_TRIM">RC9_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RC channel 9 trim</p><p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">800.0 > 2200.0 </td>
 <td style="vertical-align: top;">1500 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_CHAN_CNT">RC_CHAN_CNT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>RC channel count</p><p><strong>Comment:</strong> This parameter is used by Ground Station software to save the number of channels which were used during RC calibration. It is only meant for ground station use.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_FAILS_THR">RC_FAILS_THR</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Failsafe channel PWM threshold</p><p><strong>Comment:</strong> Set to a value slightly above the PWM value assumed by throttle in a failsafe event, but ensure it is below the PWM value assumed by throttle during normal operation.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 2200 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_FLT_CUTOFF">RC_FLT_CUTOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Cutoff frequency for the low pass filter on roll,pitch, yaw and throttle</p><p><strong>Comment:</strong> Does not get set unless below RC_FLT_SMP_RATE/2 because of filter instability characteristics.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0.1 > ? </td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_FLT_SMP_RATE">RC_FLT_SMP_RATE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Sample rate of the remote control values for the low pass filter on roll,pitch, yaw and throttle</p><p><strong>Comment:</strong> Has an influence on the cutoff frequency precision.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">1.0 > ? </td>
 <td style="vertical-align: top;">50.0 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_AUX1">RC_MAP_AUX1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>AUX1 Passthrough RC channel</p><p><strong>Comment:</strong> Default function: Camera pitch</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_AUX2">RC_MAP_AUX2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>AUX2 Passthrough RC channel</p><p><strong>Comment:</strong> Default function: Camera roll</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_AUX3">RC_MAP_AUX3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>AUX3 Passthrough RC channel</p><p><strong>Comment:</strong> Default function: Camera azimuth / yaw</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_AUX4">RC_MAP_AUX4</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>AUX4 Passthrough RC channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_AUX5">RC_MAP_AUX5</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>AUX5 Passthrough RC channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_FAILSAFE">RC_MAP_FAILSAFE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Failsafe channel mapping</p><p><strong>Comment:</strong> The RC mapping index indicates which channel is used for failsafe If 0, whichever channel is mapped to throttle is used otherwise the value indicates the specific RC channel to use</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_PARAM1">RC_MAP_PARAM1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>PARAM1 tuning channel</p><p><strong>Comment:</strong> Can be used for parameter tuning with the RC. This one is further referenced as the 1st parameter channel. Set to 0 to deactivate *</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_PARAM2">RC_MAP_PARAM2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>PARAM2 tuning channel</p><p><strong>Comment:</strong> Can be used for parameter tuning with the RC. This one is further referenced as the 2nd parameter channel. Set to 0 to deactivate *</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_PARAM3">RC_MAP_PARAM3</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>PARAM3 tuning channel</p><p><strong>Comment:</strong> Can be used for parameter tuning with the RC. This one is further referenced as the 3th parameter channel. Set to 0 to deactivate *</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_PITCH">RC_MAP_PITCH</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Pitch control channel mapping</p><p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading pitch inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_ROLL">RC_MAP_ROLL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Roll control channel mapping</p><p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading roll inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_THROTTLE">RC_MAP_THROTTLE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Throttle control channel mapping</p><p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading throttle inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_YAW">RC_MAP_YAW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Yaw control channel mapping</p><p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading yaw inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_RL1_DSM_VCC">RC_RL1_DSM_VCC</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Relay control of relay 1 mapped to the Spektrum receiver power supply</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Relay controls DSM power</li> 
</ul>
   <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_RSSI_PWM_CHAN">RC_RSSI_PWM_CHAN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>PWM input channel that provides RSSI</p><p><strong>Comment:</strong> 0: do not read RSSI from input channel 1-18: read RSSI from specified input channel Specify the range for RSSI input with RC_RSSI_PWM_MIN and RC_RSSI_PWM_MAX parameters.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_RSSI_PWM_MAX">RC_RSSI_PWM_MAX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Max input value for RSSI reading</p><p><strong>Comment:</strong> Only used if RC_RSSI_PWM_CHAN > 0</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">0 > 2000 </td>
 <td style="vertical-align: top;">1000 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_RSSI_PWM_MIN">RC_RSSI_PWM_MIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Min input value for RSSI reading</p><p><strong>Comment:</strong> Only used if RC_RSSI_PWM_CHAN > 0</p>    <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">0 > 2000 </td>
 <td style="vertical-align: top;">2000 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_TH_USER">RC_TH_USER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>RC mode switch threshold automatic distribution</p><p><strong>Comment:</strong> This parameter is used by Ground Station software to specify whether the threshold values for flight mode switches were automatically calculated. 0 indicates that the threshold values were set by the user. Any other value indicates that the threshold value where automatically set by the ground station software. It is only meant for ground station use.</p>    <p><b>Module:</b> modules/sensors</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIM_PITCH">TRIM_PITCH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch trim</p><p><strong>Comment:</strong> The trim value is the actuator control value the system needs for straight and level flight. It can be calibrated by flying manually straight and level using the RC trims and copying them using the GCS.</p>    <p><b>Module:</b> modules/commander</p>
</td>
 <td style="vertical-align: top;">-0.25 > 0.25 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIM_ROLL">TRIM_ROLL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Roll trim</p><p><strong>Comment:</strong> The trim value is the actuator control value the system needs for straight and level flight. It can be calibrated by flying manually straight and level using the RC trims and copying them using the GCS.</p>    <p><b>Module:</b> modules/commander</p>
</td>
 <td style="vertical-align: top;">-0.25 > 0.25 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TRIM_YAW">TRIM_YAW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Yaw trim</p><p><strong>Comment:</strong> The trim value is the actuator control value the system needs for straight and level flight. It can be calibrated by flying manually straight and level using the RC trims and copying them using the GCS.</p>    <p><b>Module:</b> modules/commander</p>
</td>
 <td style="vertical-align: top;">-0.25 > 0.25 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Radio Signal Loss


The module where these parameters are defined is: *modules/navigator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="NAV_RCL_LT">NAV_RCL_LT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Loiter Time</p><p><strong>Comment:</strong> The amount of time in seconds the system should loiter at current position before termination Set to -1 to make the system skip loitering</p>    </td>
 <td style="vertical-align: top;">-1.0 > ? (0.1)</td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
</tbody></table>

## Radio Switches


The module where these parameters are defined is: *modules/sensors*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="RC_ACRO_TH">RC_ACRO_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting acro mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_ARMSWITCH_TH">RC_ARMSWITCH_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for the arm switch</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_ASSIST_TH">RC_ASSIST_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting assist mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_AUTO_TH">RC_AUTO_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting auto mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.75 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_GEAR_TH">RC_GEAR_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for the landing gear switch</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_KILLSWITCH_TH">RC_KILLSWITCH_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for the kill switch</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_LOITER_TH">RC_LOITER_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting loiter mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAN_TH">RC_MAN_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for the manual switch</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_ACRO_SW">RC_MAP_ACRO_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Acro switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_ARM_SW">RC_MAP_ARM_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Arm switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_FLAPS">RC_MAP_FLAPS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Flaps channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_FLTMODE">RC_MAP_FLTMODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Single channel flight mode selection</p><p><strong>Comment:</strong> If this parameter is non-zero, flight modes are only selected by this channel and are assigned to six slots.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_GEAR_SW">RC_MAP_GEAR_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Landing gear switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_KILL_SW">RC_MAP_KILL_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Kill switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_LOITER_SW">RC_MAP_LOITER_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Loiter switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_MAN_SW">RC_MAP_MAN_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Manual switch channel mapping</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_MODE_SW">RC_MAP_MODE_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mode switch channel mapping</p><p><strong>Comment:</strong> This is the main flight mode selector. The channel index (starting from 1 for channel 1) indicates which channel should be used for deciding about the main mode. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_OFFB_SW">RC_MAP_OFFB_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Offboard switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_POSCTL_SW">RC_MAP_POSCTL_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Position Control switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_RATT_SW">RC_MAP_RATT_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Rattitude switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_RETURN_SW">RC_MAP_RETURN_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Return switch channel</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_STAB_SW">RC_MAP_STAB_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Stabilize switch channel mapping</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_MAP_TRANS_SW">RC_MAP_TRANS_SW</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>VTOL transition switch channel mapping</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Unassigned</li> 

<li><strong>1:</strong> Channel 1</li> 

<li><strong>2:</strong> Channel 2</li> 

<li><strong>3:</strong> Channel 3</li> 

<li><strong>4:</strong> Channel 4</li> 

<li><strong>5:</strong> Channel 5</li> 

<li><strong>6:</strong> Channel 6</li> 

<li><strong>7:</strong> Channel 7</li> 

<li><strong>8:</strong> Channel 8</li> 

<li><strong>9:</strong> Channel 9</li> 

<li><strong>10:</strong> Channel 10</li> 

<li><strong>11:</strong> Channel 11</li> 

<li><strong>12:</strong> Channel 12</li> 

<li><strong>13:</strong> Channel 13</li> 

<li><strong>14:</strong> Channel 14</li> 

<li><strong>15:</strong> Channel 15</li> 

<li><strong>16:</strong> Channel 16</li> 

<li><strong>17:</strong> Channel 17</li> 

<li><strong>18:</strong> Channel 18</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 18 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_OFFB_TH">RC_OFFB_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting offboard mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_POSCTL_TH">RC_POSCTL_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting posctl mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_RATT_TH">RC_RATT_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting rattitude mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_RETURN_TH">RC_RETURN_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for selecting return to launch mode</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_STAB_TH">RC_STAB_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for the stabilize switch</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RC_TRANS_TH">RC_TRANS_TH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold for the VTOL transition switch</p><p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>    </td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">0.25 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Return To Land


The module where these parameters are defined is: *modules/navigator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="RTL_DESCEND_ALT">RTL_DESCEND_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RTL loiter altitude</p><p><strong>Comment:</strong> Stay at this altitude above home position after RTL descending. Land (i.e. slowly descend) from this altitude if autolanding allowed.</p>    </td>
 <td style="vertical-align: top;">2 > 100 (0.5)</td>
 <td style="vertical-align: top;">30 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RTL_LAND_DELAY">RTL_LAND_DELAY</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RTL delay</p><p><strong>Comment:</strong> Delay after descend before landing in RTL mode. If set to -1 the system will not land but loiter at RTL_DESCEND_ALT.</p>    </td>
 <td style="vertical-align: top;">-1 > 300 (0.5)</td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RTL_MIN_DIST">RTL_MIN_DIST</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum distance to trigger rising to a safe altitude</p><p><strong>Comment:</strong> If the system is horizontally closer than this distance to home it will land straight on home instead of raising to the return altitude first.</p>    </td>
 <td style="vertical-align: top;">0.5 > 20 (0.5)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RTL_RETURN_ALT">RTL_RETURN_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>RTL altitude</p><p><strong>Comment:</strong> Altitude to fly back in RTL in meters</p>    </td>
 <td style="vertical-align: top;">0 > 150 (0.5)</td>
 <td style="vertical-align: top;">60 </td>
 <td style="vertical-align: top;">m</td>
</tr>
</tbody></table>

## Runway Takeoff


The module where these parameters are defined is: *lib/runway_takeoff*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_AIRSPD_SCL">RWTO_AIRSPD_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Min. airspeed scaling factor for takeoff.
Pitch up will be commanded when the following airspeed is reached:
FW_AIRSPD_MIN * RWTO_AIRSPD_SCL</p>    </td>
 <td style="vertical-align: top;">0.0 > 2.0 (0.01)</td>
 <td style="vertical-align: top;">1.3 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_HDG">RWTO_HDG</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Specifies which heading should be held during runnway takeoff</p><p><strong>Comment:</strong> 0: airframe heading, 1: heading towards takeoff waypoint</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Airframe</li> 

<li><strong>1:</strong> Waypoint</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_MAX_PITCH">RWTO_MAX_PITCH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max pitch during takeoff.
Fixed-wing settings are used if set to 0. Note that there is also a minimum
pitch of 10 degrees during takeoff, so this must be larger if set</p>    </td>
 <td style="vertical-align: top;">0.0 > 60.0 (0.5)</td>
 <td style="vertical-align: top;">20.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_MAX_ROLL">RWTO_MAX_ROLL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max roll during climbout.
Roll is limited during climbout to ensure enough lift and prevents aggressive
navigation before we're on a safe height</p>    </td>
 <td style="vertical-align: top;">0.0 > 60.0 (0.5)</td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_MAX_THR">RWTO_MAX_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Max throttle during runway takeoff.
(Can be used to test taxi on runway)</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;">norm</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_NAV_ALT">RWTO_NAV_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Altitude AGL at which we have enough ground clearance to allow some roll.
Until RWTO_NAV_ALT is reached the plane is held level and only
rudder is used to keep the heading (see RWTO_HDG). This should be below
FW_CLMBOUT_DIFF if FW_CLMBOUT_DIFF > 0</p>    </td>
 <td style="vertical-align: top;">0.0 > 100.0 (1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">m</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_PSP">RWTO_PSP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Pitch setpoint during taxi / before takeoff airspeed is reached.
A taildragger with stearable wheel might need to pitch up
a little to keep it's wheel on the ground before airspeed
to takeoff is reached</p>    </td>
 <td style="vertical-align: top;">0.0 > 20.0 (0.5)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RWTO_TKOFF">RWTO_TKOFF</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Runway takeoff with landing gear</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## SD Logging

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_DIRS_MAX">SDLOG_DIRS_MAX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Maximum number of log directories to keep</p><p><strong>Comment:</strong> If there are more log directories than this value, the system will delete the oldest directories during startup. In addition, the system will delete old logs if there is not enough free space left. The minimum amount is 300 MB. If this is set to 0, old directories will only be removed if the free space falls below the minimum.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/logger</p>
</td>
 <td style="vertical-align: top;">0 > 1000 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_EXT">SDLOG_EXT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Extended logging mode</p><p><strong>Comment:</strong> A value of -1 indicates the command line argument should be obeyed. A value of 0 disables extended logging mode, a value of 1 enables it. This parameter is only read out before logging starts (which commonly is before arming).</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Command Line</li> 

<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Enable</li> 
</ul>
   <p><b>Module:</b> modules/sdlog2</p>
</td>
 <td style="vertical-align: top;">-1 > 1 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_GPSTIME">SDLOG_GPSTIME</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Use timestamps only if GPS 3D fix is available</p><p><strong>Comment:</strong> Constrain the log folder creation to only use the time stamp if a 3D GPS lock is present.</p>    <p><b>Module:</b> modules/sdlog2</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_MODE">SDLOG_MODE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Logging Mode</p><p><strong>Comment:</strong> Determines when to start and stop logging. By default, logging is started when arming the system, and stopped when disarming. This parameter is only for the new logger (SYS_LOGGER=1).</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> when armed until disarm (default)</li> 

<li><strong>1:</strong> from boot until disarm</li> 

<li><strong>2:</strong> from boot until shutdown</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/logger</p>
</td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_PRIO_BOOST">SDLOG_PRIO_BOOST</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Give logging app higher thread priority to avoid data loss.
This is used for gathering replay logs for the ekf2 module</p><p><strong>Comment:</strong> A value of 0 indicates that the default priority is used. Increasing the parameter in steps of one increases the priority.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Low priority</li> 

<li><strong>1:</strong> Default priority</li> 

<li><strong>2:</strong> Medium priority</li> 

<li><strong>3:</strong> Max priority</li> 
</ul>
   <p><b>Module:</b> modules/sdlog2</p>
</td>
 <td style="vertical-align: top;">0 > 3 </td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_PROFILE">SDLOG_PROFILE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Logging Topic Profile</p><p><strong>Comment:</strong> This is an integer bitmask controlling the set and rates of logged topics. The default allows for general log analysis and estimator replay, while keeping the log file size reasonably small. Enabling multiple sets leads to higher bandwidth requirements and larger log files. Set bits in the following positions to enable: 0 : Set to true to use the default set (used for general log analysis) 1 : Set to true to enable full rate estimator (EKF2) replay topics 2 : Set to true to enable topics for thermal calibration (high rate raw IMU and Baro sensor data) 3 : Set to true to enable topics for system identification (high rate actuator control and IMU data) 4 : Set to true to enable full rates for analysis of fast maneuvers (RC, attitude, rates and actuators) 5 : Set to true to enable debugging topics (debug_*.msg topics, for custom code) 6 : Set to true to enable topics for sensor comparison (low rate raw IMU, Baro and Magnetomer data)</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> default set (log analysis)</li> 
  <li><strong>1:</strong> estimator replay (EKF2)</li> 
  <li><strong>2:</strong> thermal calibration</li> 
  <li><strong>3:</strong> system identification</li> 
  <li><strong>4:</strong> high rate</li> 
  <li><strong>5:</strong> debug</li> 
  <li><strong>6:</strong> sensor comparison</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/logger</p>
</td>
 <td style="vertical-align: top;">0 > 127 </td>
 <td style="vertical-align: top;">3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_RATE">SDLOG_RATE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Logging rate</p><p><strong>Comment:</strong> A value of -1 indicates the commandline argument should be obeyed. A value of 0 sets the minimum rate, any other value is interpreted as rate in Hertz. This parameter is only read out before logging starts (which commonly is before arming).</p>    <p><b>Module:</b> modules/sdlog2</p>
</td>
 <td style="vertical-align: top;">-1 > 250 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_UTC_OFFSET">SDLOG_UTC_OFFSET</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UTC offset (unit: min)</p><p><strong>Comment:</strong> the difference in hours and minutes from Coordinated Universal Time (UTC) for a your place and date. for example, In case of South Korea(UTC+09:00), UTC offset is 540 min (9*60) refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets</p>    <p><b>Module:</b> modules/logger</p>
</td>
 <td style="vertical-align: top;">-1000 > 1000 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;">min</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SDLOG_UUID">SDLOG_UUID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Log UUID</p><p><strong>Comment:</strong> If set to 1, add an ID to the log, which uniquely identifies the vehicle</p>    <p><b>Module:</b> modules/logger</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## SITL


The module where these parameters are defined is: *modules/simulator*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="SIM_BAT_DRAIN">SIM_BAT_DRAIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Simulator Battery drain interval</p>    </td>
 <td style="vertical-align: top;">1 > 86400 (1)</td>
 <td style="vertical-align: top;">60 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SITL_UDP_PRT">SITL_UDP_PRT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Simulator UDP port</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">14560 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Sensor Calibration


The module where these parameters are defined is: *modules/sensors*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_EN">CAL_ACC0_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Accelerometer 0 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_ID">CAL_ACC0_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of the Accelerometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_XOFF">CAL_ACC0_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_XSCALE">CAL_ACC0_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_YOFF">CAL_ACC0_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_YSCALE">CAL_ACC0_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_ZOFF">CAL_ACC0_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC0_ZSCALE">CAL_ACC0_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_EN">CAL_ACC1_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Accelerometer 1 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_ID">CAL_ACC1_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of the Accelerometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_XOFF">CAL_ACC1_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_XSCALE">CAL_ACC1_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_YOFF">CAL_ACC1_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_YSCALE">CAL_ACC1_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_ZOFF">CAL_ACC1_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC1_ZSCALE">CAL_ACC1_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_EN">CAL_ACC2_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Accelerometer 2 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_ID">CAL_ACC2_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of the Accelerometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_XOFF">CAL_ACC2_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_XSCALE">CAL_ACC2_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_YOFF">CAL_ACC2_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_YSCALE">CAL_ACC2_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_ZOFF">CAL_ACC2_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC2_ZSCALE">CAL_ACC2_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_ACC_PRIME">CAL_ACC_PRIME</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Primary accel ID</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_AIR_PMODEL">CAL_AIR_PMODEL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Airspeed sensor pitot model</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> HB Pitot</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_AIR_TUBELEN">CAL_AIR_TUBELEN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airspeed sensor tube length</p>    </td>
 <td style="vertical-align: top;">0.01 > 0.5 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;">meter</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_BARO_PRIME">CAL_BARO_PRIME</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Primary baro ID</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_EN">CAL_GYRO0_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Gyro 0 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_ID">CAL_GYRO0_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of the Gyro that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_XOFF">CAL_GYRO0_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_XSCALE">CAL_GYRO0_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_YOFF">CAL_GYRO0_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_YSCALE">CAL_GYRO0_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_ZOFF">CAL_GYRO0_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO0_ZSCALE">CAL_GYRO0_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_EN">CAL_GYRO1_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Gyro 1 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_ID">CAL_GYRO1_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of the Gyro that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_XOFF">CAL_GYRO1_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_XSCALE">CAL_GYRO1_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_YOFF">CAL_GYRO1_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_YSCALE">CAL_GYRO1_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_ZOFF">CAL_GYRO1_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO1_ZSCALE">CAL_GYRO1_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_EN">CAL_GYRO2_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Gyro 2 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_ID">CAL_GYRO2_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of the Gyro that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_XOFF">CAL_GYRO2_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_XSCALE">CAL_GYRO2_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_YOFF">CAL_GYRO2_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_YSCALE">CAL_GYRO2_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_ZOFF">CAL_GYRO2_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO2_ZSCALE">CAL_GYRO2_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_GYRO_PRIME">CAL_GYRO_PRIME</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Primary gyro ID</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_EN">CAL_MAG0_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mag 0 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_ID">CAL_MAG0_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Magnetometer the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_ROT">CAL_MAG0_ROT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Rotation of magnetometer 0 relative to airframe</p><p><strong>Comment:</strong> An internal magnetometer will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal mag</li> 

<li><strong>0:</strong> No rotation</li> 

<li><strong>1:</strong> Yaw 45°</li> 

<li><strong>2:</strong> Yaw 90°</li> 

<li><strong>3:</strong> Yaw 135°</li> 

<li><strong>4:</strong> Yaw 180°</li> 

<li><strong>5:</strong> Yaw 225°</li> 

<li><strong>6:</strong> Yaw 270°</li> 

<li><strong>7:</strong> Yaw 315°</li> 

<li><strong>8:</strong> Roll 180°</li> 

<li><strong>9:</strong> Roll 180°, Yaw 45°</li> 

<li><strong>10:</strong> Roll 180°, Yaw 90°</li> 

<li><strong>11:</strong> Roll 180°, Yaw 135°</li> 

<li><strong>12:</strong> Pitch 180°</li> 

<li><strong>13:</strong> Roll 180°, Yaw 225°</li> 

<li><strong>14:</strong> Roll 180°, Yaw 270°</li> 

<li><strong>15:</strong> Roll 180°, Yaw 315°</li> 

<li><strong>16:</strong> Roll 90°</li> 

<li><strong>17:</strong> Roll 90°, Yaw 45°</li> 

<li><strong>18:</strong> Roll 90°, Yaw 90°</li> 

<li><strong>19:</strong> Roll 90°, Yaw 135°</li> 

<li><strong>20:</strong> Roll 270°</li> 

<li><strong>21:</strong> Roll 270°, Yaw 45°</li> 

<li><strong>22:</strong> Roll 270°, Yaw 90°</li> 

<li><strong>23:</strong> Roll 270°, Yaw 135°</li> 

<li><strong>24:</strong> Pitch 90°</li> 

<li><strong>25:</strong> Pitch 270°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-1 > 30 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_XOFF">CAL_MAG0_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_XSCALE">CAL_MAG0_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_YOFF">CAL_MAG0_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_YSCALE">CAL_MAG0_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_ZOFF">CAL_MAG0_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG0_ZSCALE">CAL_MAG0_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_EN">CAL_MAG1_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mag 1 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_ID">CAL_MAG1_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Magnetometer the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_ROT">CAL_MAG1_ROT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Rotation of magnetometer 1 relative to airframe</p><p><strong>Comment:</strong> An internal magnetometer will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal mag</li> 

<li><strong>0:</strong> No rotation</li> 

<li><strong>1:</strong> Yaw 45°</li> 

<li><strong>2:</strong> Yaw 90°</li> 

<li><strong>3:</strong> Yaw 135°</li> 

<li><strong>4:</strong> Yaw 180°</li> 

<li><strong>5:</strong> Yaw 225°</li> 

<li><strong>6:</strong> Yaw 270°</li> 

<li><strong>7:</strong> Yaw 315°</li> 

<li><strong>8:</strong> Roll 180°</li> 

<li><strong>9:</strong> Roll 180°, Yaw 45°</li> 

<li><strong>10:</strong> Roll 180°, Yaw 90°</li> 

<li><strong>11:</strong> Roll 180°, Yaw 135°</li> 

<li><strong>12:</strong> Pitch 180°</li> 

<li><strong>13:</strong> Roll 180°, Yaw 225°</li> 

<li><strong>14:</strong> Roll 180°, Yaw 270°</li> 

<li><strong>15:</strong> Roll 180°, Yaw 315°</li> 

<li><strong>16:</strong> Roll 90°</li> 

<li><strong>17:</strong> Roll 90°, Yaw 45°</li> 

<li><strong>18:</strong> Roll 90°, Yaw 90°</li> 

<li><strong>19:</strong> Roll 90°, Yaw 135°</li> 

<li><strong>20:</strong> Roll 270°</li> 

<li><strong>21:</strong> Roll 270°, Yaw 45°</li> 

<li><strong>22:</strong> Roll 270°, Yaw 90°</li> 

<li><strong>23:</strong> Roll 270°, Yaw 135°</li> 

<li><strong>24:</strong> Pitch 90°</li> 

<li><strong>25:</strong> Pitch 270°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-1 > 30 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_XOFF">CAL_MAG1_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_XSCALE">CAL_MAG1_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_YOFF">CAL_MAG1_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_YSCALE">CAL_MAG1_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_ZOFF">CAL_MAG1_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG1_ZSCALE">CAL_MAG1_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_EN">CAL_MAG2_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mag 2 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_ID">CAL_MAG2_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Magnetometer the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_ROT">CAL_MAG2_ROT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Rotation of magnetometer 2 relative to airframe</p><p><strong>Comment:</strong> An internal magnetometer will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal mag</li> 

<li><strong>0:</strong> No rotation</li> 

<li><strong>1:</strong> Yaw 45°</li> 

<li><strong>2:</strong> Yaw 90°</li> 

<li><strong>3:</strong> Yaw 135°</li> 

<li><strong>4:</strong> Yaw 180°</li> 

<li><strong>5:</strong> Yaw 225°</li> 

<li><strong>6:</strong> Yaw 270°</li> 

<li><strong>7:</strong> Yaw 315°</li> 

<li><strong>8:</strong> Roll 180°</li> 

<li><strong>9:</strong> Roll 180°, Yaw 45°</li> 

<li><strong>10:</strong> Roll 180°, Yaw 90°</li> 

<li><strong>11:</strong> Roll 180°, Yaw 135°</li> 

<li><strong>12:</strong> Pitch 180°</li> 

<li><strong>13:</strong> Roll 180°, Yaw 225°</li> 

<li><strong>14:</strong> Roll 180°, Yaw 270°</li> 

<li><strong>15:</strong> Roll 180°, Yaw 315°</li> 

<li><strong>16:</strong> Roll 90°</li> 

<li><strong>17:</strong> Roll 90°, Yaw 45°</li> 

<li><strong>18:</strong> Roll 90°, Yaw 90°</li> 

<li><strong>19:</strong> Roll 90°, Yaw 135°</li> 

<li><strong>20:</strong> Roll 270°</li> 

<li><strong>21:</strong> Roll 270°, Yaw 45°</li> 

<li><strong>22:</strong> Roll 270°, Yaw 90°</li> 

<li><strong>23:</strong> Roll 270°, Yaw 135°</li> 

<li><strong>24:</strong> Pitch 90°</li> 

<li><strong>25:</strong> Pitch 270°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-1 > 30 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_XOFF">CAL_MAG2_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_XSCALE">CAL_MAG2_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_YOFF">CAL_MAG2_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_YSCALE">CAL_MAG2_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_ZOFF">CAL_MAG2_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG2_ZSCALE">CAL_MAG2_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_EN">CAL_MAG3_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Mag 3 enabled</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_ID">CAL_MAG3_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Magnetometer the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_ROT">CAL_MAG3_ROT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Rotation of magnetometer 2 relative to airframe</p><p><strong>Comment:</strong> An internal magnetometer will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal mag</li> 

<li><strong>0:</strong> No rotation</li> 

<li><strong>1:</strong> Yaw 45°</li> 

<li><strong>2:</strong> Yaw 90°</li> 

<li><strong>3:</strong> Yaw 135°</li> 

<li><strong>4:</strong> Yaw 180°</li> 

<li><strong>5:</strong> Yaw 225°</li> 

<li><strong>6:</strong> Yaw 270°</li> 

<li><strong>7:</strong> Yaw 315°</li> 

<li><strong>8:</strong> Roll 180°</li> 

<li><strong>9:</strong> Roll 180°, Yaw 45°</li> 

<li><strong>10:</strong> Roll 180°, Yaw 90°</li> 

<li><strong>11:</strong> Roll 180°, Yaw 135°</li> 

<li><strong>12:</strong> Pitch 180°</li> 

<li><strong>13:</strong> Roll 180°, Yaw 225°</li> 

<li><strong>14:</strong> Roll 180°, Yaw 270°</li> 

<li><strong>15:</strong> Roll 180°, Yaw 315°</li> 

<li><strong>16:</strong> Roll 90°</li> 

<li><strong>17:</strong> Roll 90°, Yaw 45°</li> 

<li><strong>18:</strong> Roll 90°, Yaw 90°</li> 

<li><strong>19:</strong> Roll 90°, Yaw 135°</li> 

<li><strong>20:</strong> Roll 270°</li> 

<li><strong>21:</strong> Roll 270°, Yaw 45°</li> 

<li><strong>22:</strong> Roll 270°, Yaw 90°</li> 

<li><strong>23:</strong> Roll 270°, Yaw 135°</li> 

<li><strong>24:</strong> Pitch 90°</li> 

<li><strong>25:</strong> Pitch 270°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">-1 > 30 </td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_XOFF">CAL_MAG3_XOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_XSCALE">CAL_MAG3_XSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer X-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_YOFF">CAL_MAG3_YOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_YSCALE">CAL_MAG3_YSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Y-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_ZOFF">CAL_MAG3_ZOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis offset</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG3_ZSCALE">CAL_MAG3_ZSCALE</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Magnetometer Z-axis scaling factor</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG_PRIME">CAL_MAG_PRIME</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Primary mag ID</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_DPRES_ANSC">SENS_DPRES_ANSC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential pressure sensor analog scaling</p><p><strong>Comment:</strong> Pick the appropriate scaling from the datasheet. this number defines the (linear) conversion from voltage to Pascal (pa). For the MPXV7002DP this is 1000. NOTE: If the sensor always registers zero, try switching the static and dynamic tubes.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_DPRES_OFF">SENS_DPRES_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential pressure sensor offset</p><p><strong>Comment:</strong> The offset (zero-reading) in Pascal</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Sensor Thermal Compensation


The module where these parameters are defined is: *modules/sensors*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_ID">TC_A0_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Accelerometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_SCL_0">TC_A0_SCL_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_SCL_1">TC_A0_SCL_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_SCL_2">TC_A0_SCL_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_TMAX">TC_A0_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_TMIN">TC_A0_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_TREF">TC_A0_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X0_0">TC_A0_X0_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X0_1">TC_A0_X0_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X0_2">TC_A0_X0_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X1_0">TC_A0_X1_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X1_1">TC_A0_X1_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X1_2">TC_A0_X1_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X2_0">TC_A0_X2_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X2_1">TC_A0_X2_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X2_2">TC_A0_X2_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X3_0">TC_A0_X3_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X3_1">TC_A0_X3_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A0_X3_2">TC_A0_X3_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_ID">TC_A1_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Accelerometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_SCL_0">TC_A1_SCL_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_SCL_1">TC_A1_SCL_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_SCL_2">TC_A1_SCL_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_TMAX">TC_A1_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_TMIN">TC_A1_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_TREF">TC_A1_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X0_0">TC_A1_X0_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X0_1">TC_A1_X0_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X0_2">TC_A1_X0_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X1_0">TC_A1_X1_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X1_1">TC_A1_X1_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X1_2">TC_A1_X1_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X2_0">TC_A1_X2_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X2_1">TC_A1_X2_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X2_2">TC_A1_X2_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X3_0">TC_A1_X3_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X3_1">TC_A1_X3_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A1_X3_2">TC_A1_X3_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_ID">TC_A2_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Accelerometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_SCL_0">TC_A2_SCL_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_SCL_1">TC_A2_SCL_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_SCL_2">TC_A2_SCL_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer scale factor - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_TMAX">TC_A2_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_TMIN">TC_A2_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_TREF">TC_A2_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X0_0">TC_A2_X0_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X0_1">TC_A2_X0_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X0_2">TC_A2_X0_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^0 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X1_0">TC_A2_X1_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X1_1">TC_A2_X1_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X1_2">TC_A2_X1_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^1 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X2_0">TC_A2_X2_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X2_1">TC_A2_X2_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X2_2">TC_A2_X2_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^2 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X3_0">TC_A2_X3_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X3_1">TC_A2_X3_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A2_X3_2">TC_A2_X3_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Accelerometer offset temperature ^3 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_A_ENABLE">TC_A_ENABLE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set to 1 to enable thermal compensation for accelerometer sensors. Set to 0 to disable</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_ID">TC_B0_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Barometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_SCL">TC_B0_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_TMAX">TC_B0_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">75.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_TMIN">TC_B0_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_TREF">TC_B0_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">40.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_X0">TC_B0_X0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^0 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_X1">TC_B0_X1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^1 polynomial coefficients</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_X2">TC_B0_X2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^2 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_X3">TC_B0_X3</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^3 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_X4">TC_B0_X4</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^4 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B0_X5">TC_B0_X5</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^5 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_ID">TC_B1_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Barometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_SCL">TC_B1_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_TMAX">TC_B1_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">75.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_TMIN">TC_B1_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_TREF">TC_B1_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">40.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_X0">TC_B1_X0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^0 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_X1">TC_B1_X1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^1 polynomial coefficients</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_X2">TC_B1_X2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^2 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_X3">TC_B1_X3</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^3 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_X4">TC_B1_X4</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^4 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B1_X5">TC_B1_X5</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^5 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_ID">TC_B2_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Barometer that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_SCL">TC_B2_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_TMAX">TC_B2_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">75.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_TMIN">TC_B2_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_TREF">TC_B2_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">40.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_X0">TC_B2_X0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^0 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_X1">TC_B2_X1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^1 polynomial coefficients</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_X2">TC_B2_X2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^2 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_X3">TC_B2_X3</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^3 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_X4">TC_B2_X4</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^4 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B2_X5">TC_B2_X5</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Barometer offset temperature ^5 polynomial coefficient</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_B_ENABLE">TC_B_ENABLE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set to 1 to enable thermal compensation for barometric pressure sensors. Set to 0 to disable</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_ID">TC_G0_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Gyro that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_SCL_0">TC_G0_SCL_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_SCL_1">TC_G0_SCL_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_SCL_2">TC_G0_SCL_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_TMAX">TC_G0_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_TMIN">TC_G0_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_TREF">TC_G0_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X0_0">TC_G0_X0_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X0_1">TC_G0_X0_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X0_2">TC_G0_X0_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X1_0">TC_G0_X1_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X1_1">TC_G0_X1_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X1_2">TC_G0_X1_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X2_0">TC_G0_X2_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X2_1">TC_G0_X2_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X2_2">TC_G0_X2_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X3_0">TC_G0_X3_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X3_1">TC_G0_X3_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G0_X3_2">TC_G0_X3_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_ID">TC_G1_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Gyro that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_SCL_0">TC_G1_SCL_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_SCL_1">TC_G1_SCL_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_SCL_2">TC_G1_SCL_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_TMAX">TC_G1_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_TMIN">TC_G1_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_TREF">TC_G1_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X0_0">TC_G1_X0_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X0_1">TC_G1_X0_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X0_2">TC_G1_X0_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X1_0">TC_G1_X1_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X1_1">TC_G1_X1_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X1_2">TC_G1_X1_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X2_0">TC_G1_X2_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X2_1">TC_G1_X2_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X2_2">TC_G1_X2_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X3_0">TC_G1_X3_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X3_1">TC_G1_X3_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G1_X3_2">TC_G1_X3_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_ID">TC_G2_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>ID of Gyro that the calibration is for</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_SCL_0">TC_G2_SCL_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_SCL_1">TC_G2_SCL_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_SCL_2">TC_G2_SCL_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro scale factor - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_TMAX">TC_G2_TMAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration maximum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_TMIN">TC_G2_TMIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration minimum temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_TREF">TC_G2_TREF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro calibration reference temperature</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">25.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X0_0">TC_G2_X0_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X0_1">TC_G2_X0_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X0_2">TC_G2_X0_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^0 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X1_0">TC_G2_X1_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X1_1">TC_G2_X1_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X1_2">TC_G2_X1_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^1 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X2_0">TC_G2_X2_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X2_1">TC_G2_X2_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X2_2">TC_G2_X2_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^2 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X3_0">TC_G2_X3_0</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - X axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X3_1">TC_G2_X3_1</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - Y axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G2_X3_2">TC_G2_X3_2</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Gyro rate offset temperature ^3 polynomial coefficient - Z axis</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TC_G_ENABLE">TC_G_ENABLE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set to 1 to enable thermal compensation for rate gyro sensors. Set to 0 to disable</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Sensors


The module where these parameters are defined is: *modules/sensors*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="ATT_VIBE_THRESH">ATT_VIBE_THRESH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Threshold (of RMS) to warn about high vibration levels</p>    </td>
 <td style="vertical-align: top;">0.01 > 10 </td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CAL_MAG_SIDES">CAL_MAG_SIDES</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Bitfield selecting mag sides for calibration</p><p><strong>Comment:</strong> DETECT_ORIENTATION_TAIL_DOWN = 1 DETECT_ORIENTATION_NOSE_DOWN = 2 DETECT_ORIENTATION_LEFT = 4 DETECT_ORIENTATION_RIGHT = 8 DETECT_ORIENTATION_UPSIDE_DOWN = 16 DETECT_ORIENTATION_RIGHTSIDE_UP = 32</p> <strong>Values:</strong><ul>
<li><strong>34:</strong> Two side calibration</li> 

<li><strong>38:</strong> Three side calibration</li> 

<li><strong>63:</strong> Six side calibration</li> 
</ul>
   </td>
 <td style="vertical-align: top;">34 > 63 </td>
 <td style="vertical-align: top;">63 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="IMU_ACCEL_CUTOFF">IMU_ACCEL_CUTOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Driver level cut frequency for accel</p><p><strong>Comment:</strong> The cut frequency for the 2nd order butterworth filter on the accel driver. This features is currently supported by the mpu6000 and mpu9250. This only affects the signal sent to the controllers, not the estimators. 0 disables the filter.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">5 > 1000 </td>
 <td style="vertical-align: top;">30.0 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="IMU_GYRO_CUTOFF">IMU_GYRO_CUTOFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Driver level cut frequency for gyro</p><p><strong>Comment:</strong> The cut frequency for the 2nd order butterworth filter on the gyro driver. This features is currently supported by the mpu6000 and mpu9250. This only affects the signal sent to the controllers, not the estimators. 0 disables the filter.</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">5 > 1000 </td>
 <td style="vertical-align: top;">30.0 </td>
 <td style="vertical-align: top;">Hz</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_BARO_QNH">SENS_BARO_QNH</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>QNH for barometer</p>    </td>
 <td style="vertical-align: top;">500 > 1500 </td>
 <td style="vertical-align: top;">1013.25 </td>
 <td style="vertical-align: top;">hPa</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_BOARD_ROT">SENS_BOARD_ROT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Board rotation</p><p><strong>Comment:</strong> This parameter defines the rotation of the FMU board relative to the platform.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> No rotation</li> 

<li><strong>1:</strong> Yaw 45°</li> 

<li><strong>2:</strong> Yaw 90°</li> 

<li><strong>3:</strong> Yaw 135°</li> 

<li><strong>4:</strong> Yaw 180°</li> 

<li><strong>5:</strong> Yaw 225°</li> 

<li><strong>6:</strong> Yaw 270°</li> 

<li><strong>7:</strong> Yaw 315°</li> 

<li><strong>8:</strong> Roll 180°</li> 

<li><strong>9:</strong> Roll 180°, Yaw 45°</li> 

<li><strong>10:</strong> Roll 180°, Yaw 90°</li> 

<li><strong>11:</strong> Roll 180°, Yaw 135°</li> 

<li><strong>12:</strong> Pitch 180°</li> 

<li><strong>13:</strong> Roll 180°, Yaw 225°</li> 

<li><strong>14:</strong> Roll 180°, Yaw 270°</li> 

<li><strong>15:</strong> Roll 180°, Yaw 315°</li> 

<li><strong>16:</strong> Roll 90°</li> 

<li><strong>17:</strong> Roll 90°, Yaw 45°</li> 

<li><strong>18:</strong> Roll 90°, Yaw 90°</li> 

<li><strong>19:</strong> Roll 90°, Yaw 135°</li> 

<li><strong>20:</strong> Roll 270°</li> 

<li><strong>21:</strong> Roll 270°, Yaw 45°</li> 

<li><strong>22:</strong> Roll 270°, Yaw 90°</li> 

<li><strong>23:</strong> Roll 270°, Yaw 135°</li> 

<li><strong>24:</strong> Pitch 90°</li> 

<li><strong>25:</strong> Pitch 270°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_BOARD_X_OFF">SENS_BOARD_X_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Board rotation X (Roll) offset</p><p><strong>Comment:</strong> This parameter defines a rotational offset in degrees around the X (Roll) axis It allows the user to fine tune the board offset in the event of misalignment.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_BOARD_Y_OFF">SENS_BOARD_Y_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Board rotation Y (Pitch) offset</p><p><strong>Comment:</strong> This parameter defines a rotational offset in degrees around the Y (Pitch) axis. It allows the user to fine tune the board offset in the event of misalignment.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_BOARD_Z_OFF">SENS_BOARD_Z_OFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Board rotation Z (YAW) offset</p><p><strong>Comment:</strong> This parameter defines a rotational offset in degrees around the Z (Yaw) axis. It allows the user to fine tune the board offset in the event of misalignment.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;">deg</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_EN_LL40LS">SENS_EN_LL40LS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Lidar-Lite (LL40LS)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> PWM</li> 

<li><strong>2:</strong> I2C</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_EN_MB12XX">SENS_EN_MB12XX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Maxbotix Soanr (mb12xx)</p>   <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_EN_SF0X">SENS_EN_SF0X</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Lightware laser rangefinder (serial)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> SF02</li> 

<li><strong>2:</strong> SF10/a</li> 

<li><strong>3:</strong> SF10/b</li> 

<li><strong>4:</strong> SF10/c</li> 

<li><strong>5:</strong> SF11/c</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 4 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_EN_SF1XX">SENS_EN_SF1XX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Lightware SF1xx/SF20/LW20 laser rangefinder (i2c)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> SF10/a</li> 

<li><strong>2:</strong> SF10/b</li> 

<li><strong>3:</strong> SF10/c</li> 

<li><strong>4:</strong> SF11/c</li> 

<li><strong>5:</strong> SF/LW20</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 5 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_EN_THERMAL">SENS_EN_THERMAL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Thermal control of sensor temperature</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Thermal control unavailable</li> 

<li><strong>0:</strong> Thermal control off</li> 
</ul>
   </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_EN_TRANGER">SENS_EN_TRANGER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>TeraRanger Rangefinder (i2c)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Autodetect</li> 

<li><strong>2:</strong> TROne</li> 

<li><strong>3:</strong> TREvo</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;">0 > 3 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SENS_FLOW_ROT">SENS_FLOW_ROT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>PX4Flow board rotation</p><p><strong>Comment:</strong> This parameter defines the yaw rotation of the PX4FLOW board relative to the vehicle body frame. Zero rotation is defined as X on flow board pointing towards front of vehicle. The recommneded installation default for the PX4FLOW board is with the Y axis forward (270 deg yaw).</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> No rotation</li> 

<li><strong>1:</strong> Yaw 45°</li> 

<li><strong>2:</strong> Yaw 90°</li> 

<li><strong>3:</strong> Yaw 135°</li> 

<li><strong>4:</strong> Yaw 180°</li> 

<li><strong>5:</strong> Yaw 225°</li> 

<li><strong>6:</strong> Yaw 270°</li> 

<li><strong>7:</strong> Yaw 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">6 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Subscriber Example


The module where these parameters are defined is: *examples/subscriber*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="SUB_INTERV">SUB_INTERV</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Interval of one subscriber in the example in ms</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">100 </td>
 <td style="vertical-align: top;">ms</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SUB_TESTF">SUB_TESTF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Float Demonstration Parameter in the Example</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">3.14 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Syslink


The module where these parameters are defined is: *modules/syslink*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="SLNK_RADIO_ADDR1">SLNK_RADIO_ADDR1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Operating address of the NRF51 (most significant byte)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">231 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SLNK_RADIO_ADDR2">SLNK_RADIO_ADDR2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Operating address of the NRF51 (least significant 4 bytes)</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">3890735079 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SLNK_RADIO_CHAN">SLNK_RADIO_CHAN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Operating channel of the NRF51</p>    </td>
 <td style="vertical-align: top;">0 > 125 </td>
 <td style="vertical-align: top;">80 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SLNK_RADIO_RATE">SLNK_RADIO_RATE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Operating datarate of the NRF51</p>    </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## System

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="LED_RGB_MAXBRT">LED_RGB_MAXBRT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>RGB Led brightness limit</p><p><strong>Comment:</strong> Set to 0 to disable, 1 for minimum brightness up to 15 (max)</p>    <p><b>Module:</b> drivers/rgbled</p>
</td>
 <td style="vertical-align: top;">0 > 15 </td>
 <td style="vertical-align: top;">15 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_AUTOCONFIG">SYS_AUTOCONFIG</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Automatically configure default values</p><p><strong>Comment:</strong> Set to 1 to reset parameters on next system startup (setting defaults). Platform-specific values are used if available. RC* parameters are preserved.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Keep parameters</li> 

<li><strong>1:</strong> Reset parameters</li> 
</ul>
   <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_AUTOSTART">SYS_AUTOSTART</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Auto-start script index</p><p><strong>Comment:</strong> CHANGING THIS VALUE REQUIRES A RESTART. Defines the auto-start script used to bootstrap the system.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 99999 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_CAL_ACCEL">SYS_CAL_ACCEL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable auto start of accelerometer thermal calibration at the next power up</p><p><strong>Comment:</strong> 0 : Set to 0 to do nothing 1 : Set to 1 to start a calibration at next boot This parameter is reset to zero when the the temperature calibration starts. default (0, no calibration)</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_CAL_BARO">SYS_CAL_BARO</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable auto start of barometer thermal calibration at the next power up</p><p><strong>Comment:</strong> 0 : Set to 0 to do nothing 1 : Set to 1 to start a calibration at next boot This parameter is reset to zero when the the temperature calibration starts. default (0, no calibration)</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_CAL_GYRO">SYS_CAL_GYRO</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable auto start of rate gyro thermal calibration at the next power up</p><p><strong>Comment:</strong> 0 : Set to 0 to do nothing 1 : Set to 1 to start a calibration at next boot This parameter is reset to zero when the the temperature calibration starts. default (0, no calibration)</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_CAL_TDEL">SYS_CAL_TDEL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Required temperature rise during thermal calibration</p><p><strong>Comment:</strong> A temperature increase greater than this value is required during calibration. Calibration will complete for each sensor when the temperature increase above the starting temeprature exceeds the value set by SYS_CAL_TDEL. If the temperature rise is insufficient, the calibration will continue indefinitely and the board will need to be repowered to exit.</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">10 > ? </td>
 <td style="vertical-align: top;">24 </td>
 <td style="vertical-align: top;">deg C</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_CAL_TMAX">SYS_CAL_TMAX</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Maximum starting temperature for thermal calibration</p><p><strong>Comment:</strong> Temperature calibration will not start if the temperature of any sensor is higher than the value set by SYS_CAL_TMAX.</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10 </td>
 <td style="vertical-align: top;">deg C</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_CAL_TMIN">SYS_CAL_TMIN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Minimum starting temperature for thermal calibration</p><p><strong>Comment:</strong> Temperature calibration for each sensor will ignore data if the temperature is lower than the value set by SYS_CAL_TMIN.</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">5 </td>
 <td style="vertical-align: top;">deg C</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_COMPANION">SYS_COMPANION</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>TELEM2 as companion computer link</p><p><strong>Comment:</strong> CHANGING THIS VALUE REQUIRES A RESTART. Configures the baud rate of the TELEM2 connector as companion computer interface.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>10:</strong> FrSky Telemetry</li> 

<li><strong>20:</strong> Crazyflie (Syslink)</li> 

<li><strong>57600:</strong> Companion Link (57600 baud, 8N1)</li> 

<li><strong>157600:</strong> OSD (57600 baud, 8N1)</li> 

<li><strong>257600:</strong> Command Receiver (57600 baud, 8N1)</li> 

<li><strong>319200:</strong> Normal Telemetry (19200 baud, 8N1)</li> 

<li><strong>338400:</strong> Normal Telemetry (38400 baud, 8N1)</li> 

<li><strong>357600:</strong> Normal Telemetry (57600 baud, 8N1)</li> 

<li><strong>419200:</strong> Iridium Telemetry (19200 baud, 8N1)</li> 

<li><strong>921600:</strong> Companion Link (921600 baud, 8N1)</li> 

<li><strong>1921600:</strong> ESP8266 (921600 baud, 8N1)</li> 

<li><strong>3115200:</strong> Normal Telemetry (115200 baud, 8N1)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 1921600 </td>
 <td style="vertical-align: top;">157600 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_FMU_TASK">SYS_FMU_TASK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Run the FMU as a task to reduce latency</p><p><strong>Comment:</strong> If true, the FMU will run in a separate task instead of on the work queue. Set this if low latency is required, for example for racing. This is a trade-off between RAM usage and latency: running as a task, it requires a separate stack and directly polls on the control topics, whereas running on the work queue, it runs at a fixed update rate.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4fmu</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_HITL">SYS_HITL</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable HITL mode on next boot</p><p><strong>Comment:</strong> While enabled the system will boot in HITL mode and not enable all sensors and checks. When disabled the same vehicle can be normally flown outdoors.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_LOGGER">SYS_LOGGER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>SD logger</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> sdlog2 (legacy)</li> 

<li><strong>1:</strong> logger (default)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_MC_EST_GROUP">SYS_MC_EST_GROUP</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set multicopter estimator group</p><p><strong>Comment:</strong> Set the group of estimators used for multicopters and VTOLs</p> <strong>Values:</strong><ul>
<li><strong>1:</strong> local_position_estimator, attitude_estimator_q</li> 

<li><strong>2:</strong> ekf2</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">1 > 2 </td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_PARAM_VER">SYS_PARAM_VER</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Parameter version</p><p><strong>Comment:</strong> This monotonically increasing number encodes the parameter compatibility set. whenever it increases parameters might not be backwards compatible and ground control stations should suggest a fresh configuration.</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > ? </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_RESTART_TYPE">SYS_RESTART_TYPE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set restart type</p><p><strong>Comment:</strong> Set by px4io to indicate type of restart</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Data survives resets</li> 

<li><strong>1:</strong> Data survives in-flight resets only</li> 

<li><strong>2:</strong> Data does not survive reset</li> 
</ul>
   <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_STCK_EN">SYS_STCK_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Enable stack checking</p>    <p><b>Module:</b> modules/systemlib</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SYS_USE_IO">SYS_USE_IO</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Set usage of IO board</p><p><strong>Comment:</strong> Can be used to use a standard startup script but with a FMU only set-up. Set to 0 to force the FMU only set-up.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> drivers/px4io</p>
</td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Testing

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_1">TEST_1</strong> (INT32)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> systemcmds/tests</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_2">TEST_2</strong> (INT32)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> systemcmds/tests</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">4 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_D">TEST_D</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.01 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_DEV">TEST_DEV</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_D_LP">TEST_D_LP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_HP">TEST_HP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_I">TEST_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_I_MAX">TEST_I_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_LP">TEST_LP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_MAX">TEST_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_MEAN">TEST_MEAN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_MIN">TEST_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">-1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_P">TEST_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_PARAMS">TEST_PARAMS</strong> (INT32)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> systemcmds/tests</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">12345678 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_RC2_X">TEST_RC2_X</strong> (INT32)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> systemcmds/tests</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">16 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_RC_X">TEST_RC_X</strong> (INT32)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> systemcmds/tests</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">8 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="TEST_TRIM">TEST_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> lib/controllib/controllib_test</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## UAVCAN

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="CANNODE_BITRATE">CANNODE_BITRATE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN CAN bus bitrate</p>    <p><b>Module:</b> modules/uavcannode</p>
</td>
 <td style="vertical-align: top;">20000 > 1000000 </td>
 <td style="vertical-align: top;">1000000 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="CANNODE_NODE_ID">CANNODE_NODE_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN Node ID</p><p><strong>Comment:</strong> Read the specs at http://uavcan.org to learn more about Node ID.</p>    <p><b>Module:</b> modules/uavcannode</p>
</td>
 <td style="vertical-align: top;">1 > 125 </td>
 <td style="vertical-align: top;">120 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ESC_BITRATE">ESC_BITRATE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN CAN bus bitrate</p>    <p><b>Module:</b> modules/uavcanesc</p>
</td>
 <td style="vertical-align: top;">20000 > 1000000 </td>
 <td style="vertical-align: top;">1000000 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="ESC_NODE_ID">ESC_NODE_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN Node ID</p><p><strong>Comment:</strong> Read the specs at http://uavcan.org to learn more about Node ID.</p>    <p><b>Module:</b> modules/uavcanesc</p>
</td>
 <td style="vertical-align: top;">1 > 125 </td>
 <td style="vertical-align: top;">120 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="UAVCAN_BITRATE">UAVCAN_BITRATE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN CAN bus bitrate</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/uavcan</p>
</td>
 <td style="vertical-align: top;">20000 > 1000000 </td>
 <td style="vertical-align: top;">1000000 </td>
 <td style="vertical-align: top;">bit/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="UAVCAN_ENABLE">UAVCAN_ENABLE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN mode</p><p><strong>Comment:</strong> 0 - UAVCAN disabled. 1 - Basic support for UAVCAN actuators and sensors. 2 - Full support for dynamic node ID allocation and firmware update. 3 - Sets the motor control outputs to UAVCAN and enables support for dynamic node ID allocation and firmware update.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>2:</strong> Only Sensors</li> 

<li><strong>3:</strong> Sensors and Motors</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/uavcan</p>
</td>
 <td style="vertical-align: top;">0 > 3 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="UAVCAN_ESC_IDLT">UAVCAN_ESC_IDLT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN ESC will spin at idle throttle when armed, even if the mixer outputs zero setpoints</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/uavcan</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="UAVCAN_NODE_ID">UAVCAN_NODE_ID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>UAVCAN Node ID</p><p><strong>Comment:</strong> Read the specs at http://uavcan.org to learn more about Node ID.</p>   <p><b>Reboot required:</b> true</p>
 <p><b>Module:</b> modules/uavcan</p>
</td>
 <td style="vertical-align: top;">1 > 125 </td>
 <td style="vertical-align: top;">1 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## VTOL Attitude Control


The module where these parameters are defined is: *modules/vtol_att_control*.

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="VT_ARSP_BLEND">VT_ARSP_BLEND</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Transition blending airspeed</p><p><strong>Comment:</strong> Airspeed at which we can start blending both fw and mc controls. Set to 0 to disable.</p>    </td>
 <td style="vertical-align: top;">0.00 > 30.00 (1)</td>
 <td style="vertical-align: top;">8.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_ARSP_LP_GAIN">VT_ARSP_LP_GAIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Total airspeed estimate low-pass filter gain</p><p><strong>Comment:</strong> Gain for tuning the low-pass filter for the total airspeed estimate</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_ARSP_TRANS">VT_ARSP_TRANS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Transition airspeed</p><p><strong>Comment:</strong> Airspeed at which we can switch to fw mode</p>    </td>
 <td style="vertical-align: top;">0.00 > 30.00 (1)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_B_DEC_MSS">VT_B_DEC_MSS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Approximate deceleration during back transition</p><p><strong>Comment:</strong> The approximate deceleration during a back transition in m/s/s Used to calculate back transition distance in mission mode. A lower value will make the VTOL transition further from the destination waypoint.</p>    </td>
 <td style="vertical-align: top;">0.00 > 20.00 (1)</td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">m/s/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_B_REV_DEL">VT_B_REV_DEL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Delay in seconds before applying back transition throttle
Set this to a value greater than 0 to give the motor time to spin down</p><p><strong>Comment:</strong> unit s</p>    </td>
 <td style="vertical-align: top;">0 > 10 (1)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_B_REV_OUT">VT_B_REV_OUT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Output on airbrakes channel during back transition
Used for airbrakes or with ESCs that have reverse thrust enabled on a seperate channel
Airbrakes need to be enables for your selected model/mixer</p>    </td>
 <td style="vertical-align: top;">0 > 1 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_B_TRANS_DUR">VT_B_TRANS_DUR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Duration of a back transition</p><p><strong>Comment:</strong> Time in seconds used for a back transition</p>    </td>
 <td style="vertical-align: top;">0.00 > 20.00 (1)</td>
 <td style="vertical-align: top;">4.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_B_TRANS_RAMP">VT_B_TRANS_RAMP</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Back transition MC motor ramp up time</p><p><strong>Comment:</strong> This sets the duration during wich the MC motors ramp up to the commanded thrust during the back transition stage.</p>    </td>
 <td style="vertical-align: top;">0.0 > 20.0 </td>
 <td style="vertical-align: top;">3.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_B_TRANS_THR">VT_B_TRANS_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Thottle output during back transition
For ESCs and mixers that support reverse thrust on low PWM values set this to a negative value to apply active breaking
For ESCs that support thrust reversal with a control channel please set VT_B_REV_OUT and set this to a positive value to apply active breaking</p>    </td>
 <td style="vertical-align: top;">-1 > 1 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_DWN_PITCH_MAX">VT_DWN_PITCH_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum allowed down-pitch the controller is able to demand. This prevents large, negative
lift values being created when facing strong winds. The vehicle will use the pusher motor
to accelerate forward if necessary</p>    </td>
 <td style="vertical-align: top;">0.0 > 45.0 </td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_ELEV_MC_LOCK">VT_ELEV_MC_LOCK</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Lock elevons in multicopter mode</p><p><strong>Comment:</strong> If set to 1 the elevons are locked in multicopter mode</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FWD_THRUST_SC">VT_FWD_THRUST_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixed wing thrust scale for hover forward flight</p><p><strong>Comment:</strong> Scale applied to fixed wing thrust being used as source for forward acceleration in multirotor mode. This technique can be used to avoid the plane having to pitch down a lot in order to move forward. Setting this value to 0 (default) will disable this strategy.</p>    </td>
 <td style="vertical-align: top;">0.0 > 2.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_ALT_ERR">VT_FW_ALT_ERR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Adaptive QuadChute</p><p><strong>Comment:</strong> Maximum negative altitude error, when in fixed wing the altitude drops below this copared to the altitude setpoint the vehicle will transition back to MC mode and enter failsafe RTL</p>    </td>
 <td style="vertical-align: top;">0.0 > 200.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_DIFTHR_EN">VT_FW_DIFTHR_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Differential thrust in forwards flight</p><p><strong>Comment:</strong> Set to 1 to enable differential thrust in fixed-wing flight.</p>    </td>
 <td style="vertical-align: top;">0 > 1 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_DIFTHR_SC">VT_FW_DIFTHR_SC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Differential thrust scaling factor</p><p><strong>Comment:</strong> This factor specifies how the yaw input gets mapped to differential thrust in forwards flight.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.1)</td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_MIN_ALT">VT_FW_MIN_ALT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>QuadChute Altitude</p><p><strong>Comment:</strong> Minimum altitude for fixed wing flight, when in fixed wing the altitude drops below this altitude the vehicle will transition back to MC mode and enter failsafe RTL</p>    </td>
 <td style="vertical-align: top;">0.0 > 200.0 </td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_MOT_OFFID">VT_FW_MOT_OFFID</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>The channel number of motors that must be turned off in fixed wing mode</p>    </td>
 <td style="vertical-align: top;">0 > 12345678 (1)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_PERM_STAB">VT_FW_PERM_STAB</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Permanent stabilization in fw mode</p><p><strong>Comment:</strong> If set to one this parameter will cause permanent attitude stabilization in fw mode. This parameter has been introduced for pure convenience sake.</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_PITCH_TRIM">VT_FW_PITCH_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Fixed wing pitch trim</p><p><strong>Comment:</strong> This parameter allows to adjust the neutral elevon position in fixed wing mode.</p>    </td>
 <td style="vertical-align: top;">-1.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_QC_P">VT_FW_QC_P</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>QuadChute Max Pitch</p><p><strong>Comment:</strong> Maximum pitch angle before QuadChute engages Above this the vehicle will transition back to MC mode and enter failsafe RTL</p>    </td>
 <td style="vertical-align: top;">0 > 180 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_FW_QC_R">VT_FW_QC_R</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>QuadChute Max Roll</p><p><strong>Comment:</strong> Maximum roll angle before QuadChute engages Above this the vehicle will transition back to MC mode and enter failsafe RTL</p>    </td>
 <td style="vertical-align: top;">0 > 180 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_F_TRANS_DUR">VT_F_TRANS_DUR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Duration of a front transition</p><p><strong>Comment:</strong> Time in seconds used for a transition</p>    </td>
 <td style="vertical-align: top;">0.00 > 20.00 (1)</td>
 <td style="vertical-align: top;">5.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_F_TR_OL_TM">VT_F_TR_OL_TM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Airspeed less front transition time (open loop)</p><p><strong>Comment:</strong> The duration of the front transition when there is no airspeed feedback available.</p>    </td>
 <td style="vertical-align: top;">1.0 > 30.0 </td>
 <td style="vertical-align: top;">6.0 </td>
 <td style="vertical-align: top;">seconds</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_IDLE_PWM_MC">VT_IDLE_PWM_MC</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Idle speed of VTOL when in multicopter mode</p>    </td>
 <td style="vertical-align: top;">900 > 2000 (1)</td>
 <td style="vertical-align: top;">900 </td>
 <td style="vertical-align: top;">us</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_MC_ARSPD_MAX">VT_MC_ARSPD_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Maximum airspeed in multicopter mode</p><p><strong>Comment:</strong> This is the maximum speed of the air flowing over the control surfaces.</p>    </td>
 <td style="vertical-align: top;">0.0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">30.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_MC_ARSPD_MIN">VT_MC_ARSPD_MIN</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Minimum airspeed in multicopter mode</p><p><strong>Comment:</strong> This is the minimum speed of the air flowing over the control surfaces.</p>    </td>
 <td style="vertical-align: top;">0.0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_MC_ARSPD_TRIM">VT_MC_ARSPD_TRIM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Trim airspeed when in multicopter mode</p><p><strong>Comment:</strong> This is the airflow over the control surfaces for which no airspeed scaling is applied in multicopter mode.</p>    </td>
 <td style="vertical-align: top;">0.0 > 30.0 (0.5)</td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;">m/s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_MOT_COUNT">VT_MOT_COUNT</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>VTOL number of engines</p>    </td>
 <td style="vertical-align: top;">0 > 8 (1)</td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_OPT_RECOV_EN">VT_OPT_RECOV_EN</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>Optimal recovery strategy for pitch-weak tailsitters</p>    </td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_POWER_MAX">VT_POWER_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Motor max power</p><p><strong>Comment:</strong> Indicates the maximum power the motor is able to produce. Used to calculate propeller efficiency map.</p>    </td>
 <td style="vertical-align: top;">1 > 10000 (1)</td>
 <td style="vertical-align: top;">120.0 </td>
 <td style="vertical-align: top;">W</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_PROP_EFF">VT_PROP_EFF</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Propeller efficiency parameter</p><p><strong>Comment:</strong> Influences propeller efficiency at different power settings. Should be tuned beforehand.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TILT_FW">VT_TILT_FW</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position of tilt servo in fw mode</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TILT_MC">VT_TILT_MC</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position of tilt servo in mc mode</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TILT_TRANS">VT_TILT_TRANS</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Position of tilt servo in transition mode</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.3 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TRANS_MIN_TM">VT_TRANS_MIN_TM</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Front transition minimum time</p><p><strong>Comment:</strong> Minimum time in seconds for front transition.</p>    </td>
 <td style="vertical-align: top;">0.0 > 10.0 </td>
 <td style="vertical-align: top;">2.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TRANS_P2_DUR">VT_TRANS_P2_DUR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Duration of front transition phase 2</p><p><strong>Comment:</strong> Time in seconds it should take for the rotors to rotate forward completely from the point when the plane has picked up enough airspeed and is ready to go into fixed wind mode.</p>    </td>
 <td style="vertical-align: top;">0.1 > 5.0 (0.01)</td>
 <td style="vertical-align: top;">0.5 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TRANS_THR">VT_TRANS_THR</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Target throttle value for pusher/puller motor during the transition to fw mode</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.6 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TRANS_TIMEOUT">VT_TRANS_TIMEOUT</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Front transition timeout</p><p><strong>Comment:</strong> Time in seconds after which transition will be cancelled. Disabled if set to 0.</p>    </td>
 <td style="vertical-align: top;">0.00 > 30.00 (1)</td>
 <td style="vertical-align: top;">15.0 </td>
 <td style="vertical-align: top;">s</td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_TYPE">VT_TYPE</strong> (INT32)</td>
 <td style="vertical-align: top;"><p>VTOL Type (Tailsitter=0, Tiltrotor=1, Standard=2)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Tailsitter</li> 

<li><strong>1:</strong> Tiltrotor</li> 

<li><strong>2:</strong> Standard</li> 
</ul>
   </td>
 <td style="vertical-align: top;">0 > 2 </td>
 <td style="vertical-align: top;">0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="VT_WV_YAWR_SCL">VT_WV_YAWR_SCL</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p>Weather-vane yaw rate scale</p><p><strong>Comment:</strong> The desired yawrate from the controller will be scaled in order to avoid yaw fighting against the wind.</p>    </td>
 <td style="vertical-align: top;">0.0 > 1.0 (0.01)</td>
 <td style="vertical-align: top;">0.15 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>

## Miscellaneous

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td style="vertical-align: top;"><strong id="EXFW_HDNG_P">EXFW_HDNG_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/fixedwing_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EXFW_PITCH_P">EXFW_PITCH_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/fixedwing_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="EXFW_ROLL_P">EXFW_ROLL_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/fixedwing_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.2 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="RV_YAW_P">RV_YAW_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/rover_steering_control</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.1 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SEG_Q2V">SEG_Q2V</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/segway</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">1.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SEG_TH2V_I">SEG_TH2V_I</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/segway</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SEG_TH2V_I_MAX">SEG_TH2V_I_MAX</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/segway</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">0.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
<tr>
 <td style="vertical-align: top;"><strong id="SEG_TH2V_P">SEG_TH2V_P</strong> (FLOAT)</td>
 <td style="vertical-align: top;"><p></p>    <p><b>Module:</b> examples/segway</p>
</td>
 <td style="vertical-align: top;"></td>
 <td style="vertical-align: top;">10.0 </td>
 <td style="vertical-align: top;"></td>
</tr>
</tbody></table>


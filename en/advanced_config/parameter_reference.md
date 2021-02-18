# Parameter Reference

:::note
This documentation was auto-generated from the source code for this PX4 version (using `make parameters_metadata`).
:::

:::tip
If a listed parameter is missing from the Firmware see: [Finding/Updating Parameters](http://docs.px4.io/master/en/advanced_config/parameters.html#missing).
:::

<!-- markdown generator: src/lib/parameters/px4params/markdownout.py -->

<style>
tr > * {
    vertical-align : top;
}
</style>

## UAVCAN Motor Parameters

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="ctl_bw">ctl_bw</strong> (INT32)</td>
 <td>Speed controller bandwidth <p><strong>Comment:</strong> Speed controller bandwidth, in Hz. Higher values result in faster speed and current rise times, but may result in overshoot and higher current consumption. For fixed-wing aircraft, this value should be less than 50 Hz; for multirotors, values up to 100 Hz may provide improvements in responsiveness.</p>   </td>
 <td>10 > 250 </td>
 <td>75</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="ctl_dir">ctl_dir</strong> (INT32)</td>
 <td>Reverse direction <p><strong>Comment:</strong> Motor spin direction as detected during initial enumeration. Use 0 or 1 to reverse direction.</p>   </td>
 <td>0 > 1 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ctl_gain">ctl_gain</strong> (FLOAT)</td>
 <td>Speed (RPM) controller gain <p><strong>Comment:</strong> Speed (RPM) controller gain. Determines controller
            aggressiveness; units are amp-seconds per radian. Systems with
            higher rotational inertia (large props) will need gain increased;
            systems with low rotational inertia (small props) may need gain
            decreased. Higher values result in faster response, but may result
            in oscillation and excessive overshoot. Lower values result in a
            slower, smoother response.</p>   </td>
 <td>0.00 > 1.00 </td>
 <td>1</td>
 <td>C/rad</td>
</tr>
<tr>
 <td><strong id="ctl_hz_idle">ctl_hz_idle</strong> (FLOAT)</td>
 <td>Idle speed (e Hz) <p><strong>Comment:</strong> Idle speed (e Hz)</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>3.5</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="ctl_start_rate">ctl_start_rate</strong> (INT32)</td>
 <td>Spin-up rate (e Hz/s) <p><strong>Comment:</strong> Spin-up rate (e Hz/s)</p>   </td>
 <td>5 > 1000 </td>
 <td>25</td>
 <td>1/s^2</td>
</tr>
<tr>
 <td><strong id="esc_index">esc_index</strong> (INT32)</td>
 <td>Index of this ESC in throttle command messages. <p><strong>Comment:</strong> Index of this ESC in throttle command messages.</p>   </td>
 <td>0 > 15 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="id_ext_status">id_ext_status</strong> (INT32)</td>
 <td>Extended status ID <p><strong>Comment:</strong> Extended status ID</p>   </td>
 <td>1 > 1000000 </td>
 <td>20034</td>
 <td></td>
</tr>
<tr>
 <td><strong id="int_ext_status">int_ext_status</strong> (INT32)</td>
 <td>Extended status interval (µs) <p><strong>Comment:</strong> Extended status interval (µs)</p>   </td>
 <td>0 > 1000000 </td>
 <td>50000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="int_status">int_status</strong> (INT32)</td>
 <td>ESC status interval (µs) <p><strong>Comment:</strong> ESC status interval (µs)</p>   </td>
 <td>? > 1000000 </td>
 <td>50000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="mot_i_max">mot_i_max</strong> (FLOAT)</td>
 <td>Motor current limit in amps <p><strong>Comment:</strong> Motor current limit in amps. This determines the maximum
            current controller setpoint, as well as the maximum allowable
            current setpoint slew rate. This value should generally be set to
            the continuous current rating listed in the motor’s specification
            sheet, or set equal to the motor’s specified continuous power
            divided by the motor voltage limit.</p>   </td>
 <td>1 > 80 </td>
 <td>12</td>
 <td>A</td>
</tr>
<tr>
 <td><strong id="mot_kv">mot_kv</strong> (INT32)</td>
 <td>Motor Kv in RPM per volt <p><strong>Comment:</strong> Motor Kv in RPM per volt. This can be taken from the motor’s
            specification sheet; accuracy will help control performance but
            some deviation from the specified value is acceptable.</p>   </td>
 <td>0 > 4000 </td>
 <td>2300</td>
 <td>rpm/V</td>
</tr>
<tr>
 <td><strong id="mot_ls">mot_ls</strong> (FLOAT)</td>
 <td>READ ONLY: Motor inductance in henries. <p><strong>Comment:</strong> READ ONLY: Motor inductance in henries. This is measured on start-up.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td>H</td>
</tr>
<tr>
 <td><strong id="mot_num_poles">mot_num_poles</strong> (INT32)</td>
 <td>Number of motor poles. <p><strong>Comment:</strong> Number of motor poles. Used to convert mechanical speeds to
            electrical speeds. This number should be taken from the motor’s
            specification sheet.</p>   </td>
 <td>2 > 40 </td>
 <td>14</td>
 <td></td>
</tr>
<tr>
 <td><strong id="mot_rs">mot_rs</strong> (FLOAT)</td>
 <td>READ ONLY: Motor resistance in ohms <p><strong>Comment:</strong> READ ONLY: Motor resistance in ohms. This is measured on start-up. When
            tuning a new motor, check that this value is approximately equal
            to the value shown in the motor’s specification sheet.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td>Ohm</td>
</tr>
<tr>
 <td><strong id="mot_v_accel">mot_v_accel</strong> (FLOAT)</td>
 <td>Acceleration limit (V) <p><strong>Comment:</strong> Acceleration limit (V)</p>   </td>
 <td>0.01 > 1.00 </td>
 <td>0.5</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="mot_v_max">mot_v_max</strong> (FLOAT)</td>
 <td>Motor voltage limit in volts <p><strong>Comment:</strong> Motor voltage limit in volts. The current controller’s
            commanded voltage will never exceed this value. Note that this may
            safely be above the nominal voltage of the motor; to determine the
            actual motor voltage limit, divide the motor’s rated power by the
            motor current limit.</p>   </td>
 <td>0 > ? </td>
 <td>14.8</td>
 <td>V</td>
</tr>
</tbody></table>

## UAVCAN GNSS

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="gnss.dyn_model">gnss.dyn_model</strong> (INT32)</td>
 <td>GNSS dynamic model <p><strong>Comment:</strong> Dynamic model used in the GNSS positioning engine. 0 –
        Automotive, 1 – Sea, 2 – Airborne.
      </p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Automotive</li> 

<li><strong>1:</strong> Sea</li> 

<li><strong>2:</strong> Airborne</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="gnss.old_fix_msg">gnss.old_fix_msg</strong> (INT32)</td>
 <td>Broadcast old GNSS fix message <p><strong>Comment:</strong> Broadcast the old (deprecated) GNSS fix message
        uavcan.equipment.gnss.Fix alongside the new alternative
        uavcan.equipment.gnss.Fix2. It is recommended to
        disable this feature to reduce the CAN bus traffic.
      </p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Fix2</li> 

<li><strong>1:</strong> Fix and Fix2</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="gnss.warn_dimens">gnss.warn_dimens</strong> (INT32)</td>
 <td>device health warning <p><strong>Comment:</strong> Set the device health to Warning if the dimensionality of
              the GNSS solution is less than this value. 3 for the full (3D)
              solution, 2 for planar (2D) solution, 1 for time-only solution,
              0 disables the feature.
      </p> <strong>Values:</strong><ul>
<li><strong>0:</strong> disables the feature</li> 

<li><strong>1:</strong> time-only solution</li> 

<li><strong>2:</strong> planar (2D) solution</li> 

<li><strong>3:</strong> full (3D) solution</li> 
</ul>
  </td>
 <td>0 > 3 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="gnss.warn_sats">gnss.warn_sats</strong> (INT32)</td>
 <td> <p><strong>Comment:</strong> Set the device health to Warning if the number of satellites
        used in the GNSS solution is below this threshold. Zero
        disables the feature
      </p>   </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="uavcan.pubp-pres">uavcan.pubp-pres</strong> (INT32)</td>
 <td> <p><strong>Comment:</strong> Set the device health to Warning if the number of satellites
        used in the GNSS solution is below this threshold. Zero
        disables the feature
      </p>   </td>
 <td>0 > 1000000 </td>
 <td>0</td>
 <td>us</td>
</tr>
</tbody></table>

## Airspeed Validator

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="ASPD_BETA_GATE">ASPD_BETA_GATE</strong> (INT32)</td>
 <td>Airspeed Selector: Gate size for sideslip angle fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1 > 5 </td>
 <td>1</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="ASPD_BETA_NOISE">ASPD_BETA_NOISE</strong> (FLOAT)</td>
 <td>Airspeed Selector: Wind estimator sideslip measurement noise <p><strong>Comment:</strong> Sideslip measurement noise of the internal wind estimator(s) of the airspeed selector.</p>   </td>
 <td>0 > 1 </td>
 <td>0.3</td>
 <td>rad</td>
</tr>
<tr>
 <td><strong id="ASPD_DO_CHECKS">ASPD_DO_CHECKS</strong> (INT32)</td>
 <td>Enable checks on airspeed sensors <p><strong>Comment:</strong> If set to true then the data comming from the airspeed sensors is checked for validity. Only applied if ASPD_PRIMARY > 0.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ASPD_FALLBACK_GW">ASPD_FALLBACK_GW</strong> (INT32)</td>
 <td>Enable fallback to sensor-less airspeed estimation <p><strong>Comment:</strong> If set to true and airspeed checks are enabled, it will use a sensor-less airspeed estimation based on groundspeed minus windspeed if no other airspeed sensor available to fall back to.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable fallback to sensor-less estimation</li> 

<li><strong>1:</strong> Enable fallback to sensor-less estimation</li> 
</ul>
  </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ASPD_FS_INNOV">ASPD_FS_INNOV</strong> (FLOAT)</td>
 <td>Airspeed failsafe consistency threshold <p><strong>Comment:</strong> This specifies the minimum airspeed test ratio required to trigger a failsafe. Larger values make the check less sensitive, smaller values make it more sensitive. Start with a value of 1.0 when tuning. When tas_test_ratio is > 1.0 it indicates the inconsistency between predicted and measured airspeed is large enough to cause the wind EKF to reject airspeed measurements. The time required to detect a fault when the threshold is exceeded depends on the size of the exceedance and is controlled by the ASPD_FS_INTEG parameter.</p>   </td>
 <td>0.5 > 3.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ASPD_FS_INTEG">ASPD_FS_INTEG</strong> (FLOAT)</td>
 <td>Airspeed failsafe consistency delay <p><strong>Comment:</strong> This sets the time integral of airspeed test ratio exceedance above ASPD_FS_INNOV required to trigger a failsafe. For example if ASPD_FS_INNOV is 1 and estimator_status.tas_test_ratio is 2.0, then the exceedance is 1.0 and the integral will rise at a rate of 1.0/second. A negative value disables the check. Larger positive values make the check less sensitive, smaller positive values make it more sensitive.</p>   </td>
 <td>? > 30.0 </td>
 <td>5.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="ASPD_FS_T_START">ASPD_FS_T_START</strong> (INT32)</td>
 <td>Airspeed failsafe start delay <p><strong>Comment:</strong> Delay before switching back to using airspeed sensor if checks indicate sensor is good. Set to a negative value to disable the re-enabling in flight.</p>   </td>
 <td>-1 > 1000 </td>
 <td>-1</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="ASPD_FS_T_STOP">ASPD_FS_T_STOP</strong> (INT32)</td>
 <td>Airspeed failsafe stop delay <p><strong>Comment:</strong> Delay before stopping use of airspeed sensor if checks indicate sensor is bad.</p>   </td>
 <td>1 > 10 </td>
 <td>2</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="ASPD_PRIMARY">ASPD_PRIMARY</strong> (INT32)</td>
 <td>Index or primary airspeed measurement source  <strong>Values:</strong><ul>
<li><strong>-1:</strong> Disabled</li> 

<li><strong>0:</strong> Groundspeed minus windspeed</li> 

<li><strong>1:</strong> First airspeed sensor</li> 

<li><strong>2:</strong> Second airspeed sensor</li> 

<li><strong>3:</strong> Third airspeed sensor</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ASPD_SCALE">ASPD_SCALE</strong> (FLOAT)</td>
 <td>Airspeed scale (scale from IAS to CAS) <p><strong>Comment:</strong> Scale can either be entered manually, or estimated in-flight by setting ASPD_SCALE_EST to 1.</p>   </td>
 <td>0.5 > 1.5 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ASPD_SCALE_EST">ASPD_SCALE_EST</strong> (INT32)</td>
 <td>Automatic airspeed scale estimation on <p><strong>Comment:</strong> Turns the automatic airspeed scale (scale from IAS to CAS) on or off. It is recommended to fly level altitude while performing the estimation. Set to 1 to start estimation (best when already flying). Set to 0 to end scale estimation. The estimated scale is then saved using the ASPD_SCALE parameter.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ASPD_SC_P_NOISE">ASPD_SC_P_NOISE</strong> (FLOAT)</td>
 <td>Airspeed Selector: Wind estimator true airspeed scale process noise <p><strong>Comment:</strong> Airspeed scale process noise of the internal wind estimator(s) of the airspeed selector.</p>   </td>
 <td>0 > 0.1 </td>
 <td>0.0001</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="ASPD_STALL">ASPD_STALL</strong> (FLOAT)</td>
 <td>Airspeed fault detection stall airspeed <p><strong>Comment:</strong> This is the minimum indicated airspeed at which the wing can produce 1g of lift. It is used by the airspeed sensor fault detection and failsafe calculation to detect a significant airspeed low measurement error condition and should be set based on flight test for reliable operation.</p>   </td>
 <td></td>
 <td>10.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="ASPD_TAS_GATE">ASPD_TAS_GATE</strong> (INT32)</td>
 <td>Airspeed Selector: Gate size for true airspeed fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1 > 5 </td>
 <td>3</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="ASPD_TAS_NOISE">ASPD_TAS_NOISE</strong> (FLOAT)</td>
 <td>Airspeed Selector: Wind estimator true airspeed measurement noise <p><strong>Comment:</strong> True airspeed measurement noise of the internal wind estimator(s) of the airspeed selector.</p>   </td>
 <td>0 > 4 </td>
 <td>1.4</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="ASPD_W_P_NOISE">ASPD_W_P_NOISE</strong> (FLOAT)</td>
 <td>Airspeed Selector: Wind estimator wind process noise <p><strong>Comment:</strong> Wind process noise of the internal wind estimator(s) of the airspeed selector.</p>   </td>
 <td>0 > 1 </td>
 <td>0.1</td>
 <td>m/s^2</td>
</tr>
</tbody></table>

## Angular Velocity Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="AVC_X_D">AVC_X_D</strong> (FLOAT)</td>
 <td>Body X axis angular velocity D gain <p><strong>Comment:</strong> Body X axis angular velocity differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>   </td>
 <td>0.0 > 2.0 (0.01)</td>
 <td>0.36</td>
 <td></td>
</tr>
<tr>
 <td><strong id="AVC_X_FF">AVC_X_FF</strong> (FLOAT)</td>
 <td>Body X axis angular velocity feedforward gain <p><strong>Comment:</strong> Improves tracking performance.</p>   </td>
 <td>0.0 > ? </td>
 <td>0.0</td>
 <td>Nm/(rad/s)</td>
</tr>
<tr>
 <td><strong id="AVC_X_I">AVC_X_I</strong> (FLOAT)</td>
 <td>Body X axis angular velocity I gain <p><strong>Comment:</strong> Body X axis angular velocity integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.2</td>
 <td>Nm/rad</td>
</tr>
<tr>
 <td><strong id="AVC_X_I_LIM">AVC_X_I_LIM</strong> (FLOAT)</td>
 <td>Body X axis angular velocity integrator limit <p><strong>Comment:</strong> Body X axis angular velocity integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large roll moment trim changes.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.3</td>
 <td>Nm</td>
</tr>
<tr>
 <td><strong id="AVC_X_K">AVC_X_K</strong> (FLOAT)</td>
 <td>Body X axis angular velocity controller gain <p><strong>Comment:</strong> Global gain of the controller. This gain scales the P, I and D terms of the controller: output = AVC_X_K * (AVC_X_P * error + AVC_X_I * error_integral + AVC_X_D * error_derivative) Set AVC_X_P=1 to implement a PID in the ideal form. Set AVC_X_K=1 to implement a PID in the parallel form.</p>   </td>
 <td>0.0 > 5.0 (0.0005)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="AVC_X_P">AVC_X_P</strong> (FLOAT)</td>
 <td>Body X axis angular velocity P gain <p><strong>Comment:</strong> Body X axis angular velocity proportional gain, i.e. control output for angular speed error 1 rad/s.</p>   </td>
 <td>0.0 > 20.0 (0.01)</td>
 <td>18.</td>
 <td>1/s</td>
</tr>
<tr>
 <td><strong id="AVC_Y_D">AVC_Y_D</strong> (FLOAT)</td>
 <td>Body Y axis angular velocity D gain <p><strong>Comment:</strong> Body Y axis angular velocity differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>   </td>
 <td>0.0 > 2.0 (0.01)</td>
 <td>0.36</td>
 <td></td>
</tr>
<tr>
 <td><strong id="AVC_Y_FF">AVC_Y_FF</strong> (FLOAT)</td>
 <td>Body Y axis angular velocity feedforward <p><strong>Comment:</strong> Improves tracking performance.</p>   </td>
 <td>0.0 > ? </td>
 <td>0.0</td>
 <td>Nm/(rad/s)</td>
</tr>
<tr>
 <td><strong id="AVC_Y_I">AVC_Y_I</strong> (FLOAT)</td>
 <td>Body Y axis angular velocity I gain <p><strong>Comment:</strong> Body Y axis angular velocity integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.2</td>
 <td>Nm/rad</td>
</tr>
<tr>
 <td><strong id="AVC_Y_I_LIM">AVC_Y_I_LIM</strong> (FLOAT)</td>
 <td>Body Y axis angular velocity integrator limit <p><strong>Comment:</strong> Body Y axis angular velocity integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large pitch moment trim changes.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.3</td>
 <td>Nm</td>
</tr>
<tr>
 <td><strong id="AVC_Y_K">AVC_Y_K</strong> (FLOAT)</td>
 <td>Body Y axis angular velocity controller gain <p><strong>Comment:</strong> Global gain of the controller. This gain scales the P, I and D terms of the controller: output = AVC_Y_K * (AVC_Y_P * error + AVC_Y_I * error_integral + AVC_Y_D * error_derivative) Set AVC_Y_P=1 to implement a PID in the ideal form. Set AVC_Y_K=1 to implement a PID in the parallel form.</p>   </td>
 <td>0.0 > 20.0 (0.0005)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="AVC_Y_P">AVC_Y_P</strong> (FLOAT)</td>
 <td>Body Y axis angular velocity P gain <p><strong>Comment:</strong> Body Y axis angular velocity proportional gain, i.e. control output for angular speed error 1 rad/s.</p>   </td>
 <td>0.0 > 20.0 (0.01)</td>
 <td>18.</td>
 <td>1/s</td>
</tr>
<tr>
 <td><strong id="AVC_Z_D">AVC_Z_D</strong> (FLOAT)</td>
 <td>Body Z axis angular velocity D gain <p><strong>Comment:</strong> Body Z axis angular velocity differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>   </td>
 <td>0.0 > 2.0 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="AVC_Z_FF">AVC_Z_FF</strong> (FLOAT)</td>
 <td>Body Z axis angular velocity feedforward <p><strong>Comment:</strong> Improves tracking performance.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.0</td>
 <td>Nm/(rad/s)</td>
</tr>
<tr>
 <td><strong id="AVC_Z_I">AVC_Z_I</strong> (FLOAT)</td>
 <td>Body Z axis angular velocity I gain <p><strong>Comment:</strong> Body Z axis angular velocity integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.1</td>
 <td>Nm/rad</td>
</tr>
<tr>
 <td><strong id="AVC_Z_I_LIM">AVC_Z_I_LIM</strong> (FLOAT)</td>
 <td>Body Z axis angular velocity integrator limit <p><strong>Comment:</strong> Body Z axis angular velocity integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large yaw moment trim changes.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.30</td>
 <td>Nm</td>
</tr>
<tr>
 <td><strong id="AVC_Z_K">AVC_Z_K</strong> (FLOAT)</td>
 <td>Body Z axis angular velocity controller gain <p><strong>Comment:</strong> Global gain of the controller. This gain scales the P, I and D terms of the controller: output = AVC_Z_K * (AVC_Z_P * error + AVC_Z_I * error_integral + AVC_Z_D * error_derivative) Set AVC_Z_P=1 to implement a PID in the ideal form. Set AVC_Z_K=1 to implement a PID in the parallel form.</p>   </td>
 <td>0.0 > 5.0 (0.0005)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="AVC_Z_P">AVC_Z_P</strong> (FLOAT)</td>
 <td>Body Z axis angular velocity P gain <p><strong>Comment:</strong> Body Z axis angular velocity proportional gain, i.e. control output for angular speed error 1 rad/s.</p>   </td>
 <td>0.0 > 20.0 (0.01)</td>
 <td>7.</td>
 <td>1/s</td>
</tr>
</tbody></table>

## Attitude Q estimator

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="ATT_ACC_COMP">ATT_ACC_COMP</strong> (INT32)</td>
 <td>Acceleration compensation based on GPS
velocity    </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ATT_BIAS_MAX">ATT_BIAS_MAX</strong> (FLOAT)</td>
 <td>Gyro bias limit    </td>
 <td>0 > 2 </td>
 <td>0.05</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="ATT_EXT_HDG_M">ATT_EXT_HDG_M</strong> (INT32)</td>
 <td>External heading usage mode (from Motion capture/Vision)
Set to 1 to use heading estimate from vision.
Set to 2 to use heading from motion capture  <strong>Values:</strong><ul>
<li><strong>0:</strong> None</li> 

<li><strong>1:</strong> Vision</li> 

<li><strong>2:</strong> Motion Capture</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ATT_MAG_DECL">ATT_MAG_DECL</strong> (FLOAT)</td>
 <td>Magnetic declination, in degrees <p><strong>Comment:</strong> This parameter is not used in normal operation, as the declination is looked up based on the GPS coordinates of the vehicle.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="ATT_MAG_DECL_A">ATT_MAG_DECL_A</strong> (INT32)</td>
 <td>Automatic GPS based declination compensation    </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ATT_W_ACC">ATT_W_ACC</strong> (FLOAT)</td>
 <td>Complimentary filter accelerometer weight    </td>
 <td>0 > 1 </td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ATT_W_EXT_HDG">ATT_W_EXT_HDG</strong> (FLOAT)</td>
 <td>Complimentary filter external heading weight    </td>
 <td>0 > 1 </td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ATT_W_GYRO_BIAS">ATT_W_GYRO_BIAS</strong> (FLOAT)</td>
 <td>Complimentary filter gyroscope bias weight    </td>
 <td>0 > 1 </td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ATT_W_MAG">ATT_W_MAG</strong> (FLOAT)</td>
 <td>Complimentary filter magnetometer weight <p><strong>Comment:</strong> Set to 0 to avoid using the magnetometer.</p>   </td>
 <td>0 > 1 </td>
 <td>0.1</td>
 <td></td>
</tr>
</tbody></table>

## Battery Calibration

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="BAT1_A_PER_V">BAT1_A_PER_V</strong> (FLOAT)</td>
 <td>Battery 1 current per volt (A/V) <p><strong>Comment:</strong> The voltage seen by the ADC multiplied by this factor will determine the battery current. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT1_CAPACITY">BAT1_CAPACITY</strong> (FLOAT)</td>
 <td>Battery 1 capacity <p><strong>Comment:</strong> Defines the capacity of battery 1 in mAh.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>-1.0 > 100000 (50)</td>
 <td>-1.0</td>
 <td>mAh</td>
</tr>
<tr>
 <td><strong id="BAT1_I_CHANNEL">BAT1_I_CHANNEL</strong> (INT32)</td>
 <td>Battery 1 Current ADC Channel <p><strong>Comment:</strong> This parameter specifies the ADC channel used to monitor current of main power battery. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT1_N_CELLS">BAT1_N_CELLS</strong> (INT32)</td>
 <td>Number of cells for battery 1 <p><strong>Comment:</strong> Defines the number of cells the attached battery consists of.</p> <strong>Values:</strong><ul>
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
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT1_R_INTERNAL">BAT1_R_INTERNAL</strong> (FLOAT)</td>
 <td>Explicitly defines the per cell internal resistance for battery 1 <p><strong>Comment:</strong> If non-negative, then this will be used in place of BAT1_V_LOAD_DROP for all calculations.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>-1.0 > 0.2 (0.01)</td>
 <td>-1.0</td>
 <td>Ohm</td>
</tr>
<tr>
 <td><strong id="BAT1_SOURCE">BAT1_SOURCE</strong> (INT32)</td>
 <td>Battery 1 monitoring source <p><strong>Comment:</strong> This parameter controls the source of battery data. The value 'Power Module' means that measurements are expected to come from a power module. If the value is set to 'External' then the system expects to receive mavlink battery status messages. If the value is set to 'ESCs', the battery information are taken from the esc_status message. This requires the ESC to provide both voltage as well as current.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Disabled</li> 

<li><strong>0:</strong> Power Module</li> 

<li><strong>1:</strong> External</li> 

<li><strong>2:</strong> ESCs</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT1_V_CHANNEL">BAT1_V_CHANNEL</strong> (INT32)</td>
 <td>Battery 1 Voltage ADC Channel <p><strong>Comment:</strong> This parameter specifies the ADC channel used to monitor voltage of main power battery. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT1_V_CHARGED">BAT1_V_CHARGED</strong> (FLOAT)</td>
 <td>Full cell voltage (5C load) <p><strong>Comment:</strong> Defines the voltage where a single cell of battery 1 is considered full under a mild load. This will never be the nominal voltage of 4.2V</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>(0.01)</td>
 <td>4.05</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT1_V_DIV">BAT1_V_DIV</strong> (FLOAT)</td>
 <td>Battery 1 voltage divider (V divider) <p><strong>Comment:</strong> This is the divider from battery 1 voltage to ADC voltage. If using e.g. Mauch power modules the value from the datasheet can be applied straight here. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT1_V_EMPTY">BAT1_V_EMPTY</strong> (FLOAT)</td>
 <td>Empty cell voltage (5C load) <p><strong>Comment:</strong> Defines the voltage where a single cell of battery 1 is considered empty. The voltage should be chosen before the steep dropoff to 2.8V. A typical lithium battery can only be discharged down to 10% before it drops off to a voltage level damaging the cells.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>(0.01)</td>
 <td>3.5</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT1_V_LOAD_DROP">BAT1_V_LOAD_DROP</strong> (FLOAT)</td>
 <td>Voltage drop per cell on full throttle <p><strong>Comment:</strong> This implicitely defines the internal resistance to maximum current ratio for battery 1 and assumes linearity. A good value to use is the difference between the 5C and 20-25C load. Not used if BAT1_R_INTERNAL is set.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>0.07 > 0.5 (0.01)</td>
 <td>0.3</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT2_A_PER_V">BAT2_A_PER_V</strong> (FLOAT)</td>
 <td>Battery 2 current per volt (A/V) <p><strong>Comment:</strong> The voltage seen by the ADC multiplied by this factor will determine the battery current. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT2_CAPACITY">BAT2_CAPACITY</strong> (FLOAT)</td>
 <td>Battery 2 capacity <p><strong>Comment:</strong> Defines the capacity of battery 2 in mAh.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>-1.0 > 100000 (50)</td>
 <td>-1.0</td>
 <td>mAh</td>
</tr>
<tr>
 <td><strong id="BAT2_I_CHANNEL">BAT2_I_CHANNEL</strong> (INT32)</td>
 <td>Battery 2 Current ADC Channel <p><strong>Comment:</strong> This parameter specifies the ADC channel used to monitor current of main power battery. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT2_N_CELLS">BAT2_N_CELLS</strong> (INT32)</td>
 <td>Number of cells for battery 2 <p><strong>Comment:</strong> Defines the number of cells the attached battery consists of.</p> <strong>Values:</strong><ul>
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
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT2_R_INTERNAL">BAT2_R_INTERNAL</strong> (FLOAT)</td>
 <td>Explicitly defines the per cell internal resistance for battery 2 <p><strong>Comment:</strong> If non-negative, then this will be used in place of BAT2_V_LOAD_DROP for all calculations.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>-1.0 > 0.2 (0.01)</td>
 <td>-1.0</td>
 <td>Ohm</td>
</tr>
<tr>
 <td><strong id="BAT2_SOURCE">BAT2_SOURCE</strong> (INT32)</td>
 <td>Battery 2 monitoring source <p><strong>Comment:</strong> This parameter controls the source of battery data. The value 'Power Module' means that measurements are expected to come from a power module. If the value is set to 'External' then the system expects to receive mavlink battery status messages. If the value is set to 'ESCs', the battery information are taken from the esc_status message. This requires the ESC to provide both voltage as well as current.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Disabled</li> 

<li><strong>0:</strong> Power Module</li> 

<li><strong>1:</strong> External</li> 

<li><strong>2:</strong> ESCs</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT2_V_CHANNEL">BAT2_V_CHANNEL</strong> (INT32)</td>
 <td>Battery 2 Voltage ADC Channel <p><strong>Comment:</strong> This parameter specifies the ADC channel used to monitor voltage of main power battery. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT2_V_CHARGED">BAT2_V_CHARGED</strong> (FLOAT)</td>
 <td>Full cell voltage (5C load) <p><strong>Comment:</strong> Defines the voltage where a single cell of battery 1 is considered full under a mild load. This will never be the nominal voltage of 4.2V</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>(0.01)</td>
 <td>4.05</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT2_V_DIV">BAT2_V_DIV</strong> (FLOAT)</td>
 <td>Battery 2 voltage divider (V divider) <p><strong>Comment:</strong> This is the divider from battery 2 voltage to ADC voltage. If using e.g. Mauch power modules the value from the datasheet can be applied straight here. A value of -1 means to use the board default.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT2_V_EMPTY">BAT2_V_EMPTY</strong> (FLOAT)</td>
 <td>Empty cell voltage (5C load) <p><strong>Comment:</strong> Defines the voltage where a single cell of battery 1 is considered empty. The voltage should be chosen before the steep dropoff to 2.8V. A typical lithium battery can only be discharged down to 10% before it drops off to a voltage level damaging the cells.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>(0.01)</td>
 <td>3.5</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT2_V_LOAD_DROP">BAT2_V_LOAD_DROP</strong> (FLOAT)</td>
 <td>Voltage drop per cell on full throttle <p><strong>Comment:</strong> This implicitely defines the internal resistance to maximum current ratio for battery 1 and assumes linearity. A good value to use is the difference between the 5C and 20-25C load. Not used if BAT2_R_INTERNAL is set.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>0.07 > 0.5 (0.01)</td>
 <td>0.3</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT_ADC_CHANNEL">BAT_ADC_CHANNEL</strong> (INT32)</td>
 <td>This parameter is deprecated. Please use BAT1_ADC_CHANNEL    </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT_A_PER_V">BAT_A_PER_V</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_A_PER_V    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT_CAPACITY">BAT_CAPACITY</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_CAPACITY instead <p><strong>Comment:</strong> Defines the capacity of battery 1.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>-1.0 > 100000 (50)</td>
 <td>-1.0</td>
 <td>mAh</td>
</tr>
<tr>
 <td><strong id="BAT_CRIT_THR">BAT_CRIT_THR</strong> (FLOAT)</td>
 <td>Critical threshold <p><strong>Comment:</strong> Sets the threshold when the battery will be reported as critically low. This has to be lower than the low threshold. This threshold commonly will trigger RTL.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0.05 > 0.25 (0.01)</td>
 <td>0.07</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="BAT_EMERGEN_THR">BAT_EMERGEN_THR</strong> (FLOAT)</td>
 <td>Emergency threshold <p><strong>Comment:</strong> Sets the threshold when the battery will be reported as dangerously low. This has to be lower than the critical threshold. This threshold commonly will trigger landing.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0.03 > 0.1 (0.01)</td>
 <td>0.05</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="BAT_LOW_THR">BAT_LOW_THR</strong> (FLOAT)</td>
 <td>Low threshold <p><strong>Comment:</strong> Sets the threshold when the battery will be reported as low. This has to be higher than the critical threshold.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0.12 > 0.5 (0.01)</td>
 <td>0.15</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="BAT_N_CELLS">BAT_N_CELLS</strong> (INT32)</td>
 <td>This parameter is deprecated. Please use BAT1_N_CELLS instead <p><strong>Comment:</strong> Defines the number of cells the attached battery consists of.</p> <strong>Values:</strong><ul>
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
</td>
 <td></td>
 <td>0</td>
 <td>S</td>
</tr>
<tr>
 <td><strong id="BAT_R_INTERNAL">BAT_R_INTERNAL</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_R_INTERNAL instead <p><strong>Comment:</strong> If non-negative, then this will be used in place of BAT_V_LOAD_DROP for all calculations.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>-1.0 > 0.2 </td>
 <td>-1.0</td>
 <td>Ohm</td>
</tr>
<tr>
 <td><strong id="BAT_SOURCE">BAT_SOURCE</strong> (INT32)</td>
 <td>This parameter is deprecated. Please use BAT1_SOURCE instead <p><strong>Comment:</strong> Battery monitoring source. This parameter controls the source of battery data. The value 'Power Module' means that measurements are expected to come from a power module. If the value is set to 'External' then the system expects to receive mavlink battery status messages.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Power Module</li> 

<li><strong>1:</strong> External</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT_V_CHARGED">BAT_V_CHARGED</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_V_CHARGED instead <p><strong>Comment:</strong> Defines the voltage where a single cell of battery 1 is considered full under a mild load. This will never be the nominal voltage of 4.2V</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>(0.01)</td>
 <td>4.05</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT_V_DIV">BAT_V_DIV</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_V_DIV    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT_V_EMPTY">BAT_V_EMPTY</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_V_EMPTY instead <p><strong>Comment:</strong> Defines the voltage where a single cell of battery 1 is considered empty. The voltage should be chosen before the steep dropoff to 2.8V. A typical lithium battery can only be discharged down to 10% before it drops off to a voltage level damaging the cells.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>(0.01)</td>
 <td>3.5</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT_V_LOAD_DROP">BAT_V_LOAD_DROP</strong> (FLOAT)</td>
 <td>This parameter is deprecated. Please use BAT1_V_LOAD_DROP instead <p><strong>Comment:</strong> This implicitely defines the internal resistance to maximum current ratio for battery 1 and assumes linearity. A good value to use is the difference between the 5C and 20-25C load. Not used if BAT_R_INTERNAL is set.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0.07 > 0.5 (0.01)</td>
 <td>0.3</td>
 <td>V</td>
</tr>
<tr>
 <td><strong id="BAT_V_OFFS_CURR">BAT_V_OFFS_CURR</strong> (FLOAT)</td>
 <td>Offset in volt as seen by the ADC input of the current sensor <p><strong>Comment:</strong> This offset will be subtracted before calculating the battery current based on the voltage.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
</tbody></table>

## Camera Capture

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CAM_CAP_DELAY">CAM_CAP_DELAY</strong> (FLOAT)</td>
 <td>Camera strobe delay <p><strong>Comment:</strong> This parameter sets the delay between image integration start and strobe firing</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td>ms</td>
</tr>
</tbody></table>

## Camera Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CAM_CAP_EDGE">CAM_CAP_EDGE</strong> (INT32)</td>
 <td>Camera capture edge  <strong>Values:</strong><ul>
<li><strong>0:</strong> Falling edge</li> 

<li><strong>1:</strong> Rising edge</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAM_CAP_FBACK">CAM_CAP_FBACK</strong> (INT32)</td>
 <td>Camera capture feedback <p><strong>Comment:</strong> Enables camera capture feedback</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAM_CAP_MODE">CAM_CAP_MODE</strong> (INT32)</td>
 <td>Camera capture timestamping mode <p><strong>Comment:</strong> Change time measurement</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Get absolute timestamp</li> 

<li><strong>1:</strong> Get timestamp of mid exposure (active high)</li> 

<li><strong>2:</strong> Get timestamp of mid exposure (active low)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Camera trigger

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="TRIG_ACT_TIME">TRIG_ACT_TIME</strong> (FLOAT)</td>
 <td>Camera trigger activation time <p><strong>Comment:</strong> This parameter sets the time the trigger needs to pulled high or low.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0.1 > 3000 </td>
 <td>40.0</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="TRIG_DISTANCE">TRIG_DISTANCE</strong> (FLOAT)</td>
 <td>Camera trigger distance <p><strong>Comment:</strong> Sets the distance at which to trigger the camera.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > ? (1)</td>
 <td>25.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="TRIG_INTERFACE">TRIG_INTERFACE</strong> (INT32)</td>
 <td>Camera trigger Interface <p><strong>Comment:</strong> Selects the trigger interface</p> <strong>Values:</strong><ul>
<li><strong>1:</strong> GPIO</li> 

<li><strong>2:</strong> Seagull MAP2 (over PWM)</li> 

<li><strong>3:</strong> MAVLink (forward via MAV_CMD_IMAGE_START_CAPTURE)</li> 

<li><strong>4:</strong> Generic PWM (IR trigger, servo)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>4</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIG_INTERVAL">TRIG_INTERVAL</strong> (FLOAT)</td>
 <td>Camera trigger interval <p><strong>Comment:</strong> This parameter sets the time between two consecutive trigger events</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>4.0 > 10000.0 </td>
 <td>40.0</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="TRIG_MIN_INTERVA">TRIG_MIN_INTERVA</strong> (FLOAT)</td>
 <td>Minimum camera trigger interval <p><strong>Comment:</strong> This parameter sets the minimum time between two consecutive trigger events the specific camera setup is supporting.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1.0 > 10000.0 </td>
 <td>1.0</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="TRIG_MODE">TRIG_MODE</strong> (INT32)</td>
 <td>Camera trigger mode  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Time based, on command</li> 

<li><strong>2:</strong> Time based, always on</li> 

<li><strong>3:</strong> Distance based, always on</li> 

<li><strong>4:</strong> Distance based, on command (Survey mode)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 4 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIG_PINS">TRIG_PINS</strong> (INT32)</td>
 <td>Camera trigger pin <p><strong>Comment:</strong> Selects which FMU pin is used (range: AUX1-AUX8 on Pixhawk controllers with an I/O board, MAIN1-MAIN8 on controllers without an I/O board. The PWM interface takes two pins per camera, while relay triggers on every pin individually. Example: Value 56 would trigger on pins 5 and 6. For GPIO mode Pin 6 will be triggered followed by 5. With a value of 65 pin 5 will be triggered followed by 6. Pins may be non contiguous. I.E. 16 or 61. In GPIO mode the delay pin to pin is < .2 uS. Note: only with a value of 56 or 78 it is possible to use the lower pins for actuator outputs (e.g. ESC's).</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 12345678 </td>
 <td>56</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIG_POLARITY">TRIG_POLARITY</strong> (INT32)</td>
 <td>Camera trigger polarity <p><strong>Comment:</strong> This parameter sets the polarity of the trigger (0 = active low, 1 = active high )</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Active low</li> 

<li><strong>1:</strong> Active high</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIG_PWM_NEUTRAL">TRIG_PWM_NEUTRAL</strong> (INT32)</td>
 <td>PWM neutral output on trigger pin    <p><b>Reboot required:</b> true</p>
</td>
 <td>1000 > 2000 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="TRIG_PWM_SHOOT">TRIG_PWM_SHOOT</strong> (INT32)</td>
 <td>PWM output to trigger shot    <p><b>Reboot required:</b> true</p>
</td>
 <td>1000 > 2000 </td>
 <td>1900</td>
 <td>us</td>
</tr>
</tbody></table>

## Circuit Breaker

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CBRK_AIRSPD_CHK">CBRK_AIRSPD_CHK</strong> (INT32)</td>
 <td>Circuit breaker for airspeed sensor <p><strong>Comment:</strong> Setting this parameter to 162128 will disable the check for an airspeed sensor. The sensor driver will not be started and it cannot be calibrated. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 162128 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_BUZZER">CBRK_BUZZER</strong> (INT32)</td>
 <td>Circuit breaker for disabling buzzer <p><strong>Comment:</strong> Setting this parameter to 782097 will disable the buzzer audio notification. Setting this parameter to 782090 will disable the startup tune, while keeping all others enabled.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 782097 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_ENGINEFAIL">CBRK_ENGINEFAIL</strong> (INT32)</td>
 <td>Circuit breaker for engine failure detection <p><strong>Comment:</strong> Setting this parameter to 284953 will disable the engine failure detection. If the aircraft is in engine failure mode the engine failure flag will be set to healthy WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 284953 </td>
 <td>284953</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_FLIGHTTERM">CBRK_FLIGHTTERM</strong> (INT32)</td>
 <td>Circuit breaker for flight termination <p><strong>Comment:</strong> Setting this parameter to 121212 will disable the flight termination action if triggered by the FailureDetector logic or if FMU is lost. This circuit breaker does not affect the RC loss, data link loss, geofence, and takeoff failure detection safety logic.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 121212 </td>
 <td>121212</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_IO_SAFETY">CBRK_IO_SAFETY</strong> (INT32)</td>
 <td>Circuit breaker for IO safety <p><strong>Comment:</strong> Setting this parameter to 22027 will disable IO safety. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 22027 </td>
 <td>22027</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_RATE_CTRL">CBRK_RATE_CTRL</strong> (INT32)</td>
 <td>Circuit breaker for rate controller output <p><strong>Comment:</strong> Setting this parameter to 140253 will disable the rate controller uORB publication. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 140253 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_SUPPLY_CHK">CBRK_SUPPLY_CHK</strong> (INT32)</td>
 <td>Circuit breaker for power supply check <p><strong>Comment:</strong> Setting this parameter to 894281 will disable the power valid checks in the commander. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 894281 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_USB_CHK">CBRK_USB_CHK</strong> (INT32)</td>
 <td>Circuit breaker for USB link check <p><strong>Comment:</strong> Setting this parameter to 197848 will disable the USB connected checks in the commander. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 197848 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_VELPOSERR">CBRK_VELPOSERR</strong> (INT32)</td>
 <td>Circuit breaker for position error check <p><strong>Comment:</strong> Setting this parameter to 201607 will disable the position and velocity accuracy checks in the commander. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 201607 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CBRK_VTOLARMING">CBRK_VTOLARMING</strong> (INT32)</td>
 <td>Circuit breaker for arming in fixed-wing mode check <p><strong>Comment:</strong> Setting this parameter to 159753 will enable arming in fixed-wing mode for VTOLs. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 159753 </td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Commander

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="COM_ARM_ARSP_EN">COM_ARM_ARSP_EN</strong> (INT32)</td>
 <td>Enable preflight check for maximal allowed airspeed when arming <p><strong>Comment:</strong> Deny arming if the current airspeed measurement is greater than half the stall speed (ASPD_STALL). Excessive airspeed measurements on ground are either caused by wind or bad airspeed calibration.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Enabled</li> 
</ul>
  </td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_AUTH_ID">COM_ARM_AUTH_ID</strong> (INT32)</td>
 <td>Arm authorizer system id <p><strong>Comment:</strong> Used if arm authorization is requested by COM_ARM_AUTH_REQ.</p>   </td>
 <td></td>
 <td>10</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_AUTH_MET">COM_ARM_AUTH_MET</strong> (INT32)</td>
 <td>Arm authorization method <p><strong>Comment:</strong> Methods: - one arm: request authorization and arm when authorization is received - two step arm: 1st arm command request an authorization and 2nd arm command arm the drone if authorized Used if arm authorization is requested by COM_ARM_AUTH_REQ.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> one arm</li> 

<li><strong>1:</strong> two step arm</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_AUTH_REQ">COM_ARM_AUTH_REQ</strong> (INT32)</td>
 <td>Require arm authorization to arm <p><strong>Comment:</strong> The default allows to arm the vehicle without a arm authorization.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_AUTH_TO">COM_ARM_AUTH_TO</strong> (FLOAT)</td>
 <td>Arm authorization timeout <p><strong>Comment:</strong> Timeout for authorizer answer. Used if arm authorization is requested by COM_ARM_AUTH_REQ.</p>   </td>
 <td>(0.1)</td>
 <td>1</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_ARM_CHK_ESCS">COM_ARM_CHK_ESCS</strong> (INT32)</td>
 <td>Require all the ESCs to be detected to arm <p><strong>Comment:</strong> This param is specific for ESCs reporting status. Normal ESCs configurations are not affected by the change of this param.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_EKF_HGT">COM_ARM_EKF_HGT</strong> (FLOAT)</td>
 <td>Maximum EKF height innovation test ratio that will allow arming    </td>
 <td>0.1 > 1.0 (0.05)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_EKF_POS">COM_ARM_EKF_POS</strong> (FLOAT)</td>
 <td>Maximum EKF position innovation test ratio that will allow arming    </td>
 <td>0.1 > 1.0 (0.05)</td>
 <td>0.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_EKF_VEL">COM_ARM_EKF_VEL</strong> (FLOAT)</td>
 <td>Maximum EKF velocity innovation test ratio that will allow arming    </td>
 <td>0.1 > 1.0 (0.05)</td>
 <td>0.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_EKF_YAW">COM_ARM_EKF_YAW</strong> (FLOAT)</td>
 <td>Maximum EKF yaw innovation test ratio that will allow arming    </td>
 <td>0.1 > 1.0 (0.05)</td>
 <td>0.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_IMU_ACC">COM_ARM_IMU_ACC</strong> (FLOAT)</td>
 <td>Maximum accelerometer inconsistency between IMU units that will allow arming    </td>
 <td>0.1 > 1.0 (0.05)</td>
 <td>0.7</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="COM_ARM_IMU_GYR">COM_ARM_IMU_GYR</strong> (FLOAT)</td>
 <td>Maximum rate gyro inconsistency between IMU units that will allow arming    </td>
 <td>0.02 > 0.3 (0.01)</td>
 <td>0.25</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="COM_ARM_MAG_ANG">COM_ARM_MAG_ANG</strong> (INT32)</td>
 <td>Maximum magnetic field inconsistency between units that will allow arming
Set -1 to disable the check    </td>
 <td>3 > 180 </td>
 <td>45</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="COM_ARM_MAG_STR">COM_ARM_MAG_STR</strong> (INT32)</td>
 <td>Enable mag strength preflight check <p><strong>Comment:</strong> Deny arming if the estimator detects a strong magnetic disturbance (check enabled by EKF2_MAG_CHECK)</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_MIS_REQ">COM_ARM_MIS_REQ</strong> (INT32)</td>
 <td>Require valid mission to arm <p><strong>Comment:</strong> The default allows to arm the vehicle without a valid mission.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_SDCARD">COM_ARM_SDCARD</strong> (INT32)</td>
 <td>Enable FMU SD card detection check <p><strong>Comment:</strong> This check detects if the FMU SD card is missing. Depending on the value of the parameter, the check can be disabled, warn only or deny arming.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Warning only</li> 

<li><strong>2:</strong> Enforce SD card presence</li> 
</ul>
  </td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_SWISBTN">COM_ARM_SWISBTN</strong> (INT32)</td>
 <td>Arm switch is only a button <p><strong>Comment:</strong> The default uses the arm switch as real switch. If parameter set button gets handled like stick arming.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_ARM_WO_GPS">COM_ARM_WO_GPS</strong> (INT32)</td>
 <td>Allow arming without GPS <p><strong>Comment:</strong> The default allows to arm the vehicle without GPS signal.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_CPU_MAX">COM_CPU_MAX</strong> (FLOAT)</td>
 <td>Maximum allowed CPU load to still arm <p><strong>Comment:</strong> A negative value disables the check.</p>   </td>
 <td>-1 > 100 (1)</td>
 <td>90.0</td>
 <td>%</td>
</tr>
<tr>
 <td><strong id="COM_DISARM_LAND">COM_DISARM_LAND</strong> (FLOAT)</td>
 <td>Time-out for auto disarm after landing <p><strong>Comment:</strong> A non-zero, positive value specifies the time-out period in seconds after which the vehicle will be automatically disarmed in case a landing situation has been detected during this period. A zero or negative value means that automatic disarming triggered by landing detection is disabled.</p>   </td>
 <td></td>
 <td>2.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_DISARM_PRFLT">COM_DISARM_PRFLT</strong> (FLOAT)</td>
 <td>Time-out for auto disarm if too slow to takeoff <p><strong>Comment:</strong> A non-zero, positive value specifies the time after arming, in seconds, within which the vehicle must take off (after which it will automatically disarm). A zero or negative value means that automatic disarming triggered by a pre-takeoff timeout is disabled.</p>   </td>
 <td></td>
 <td>10.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_DL_LOSS_T">COM_DL_LOSS_T</strong> (INT32)</td>
 <td>Datalink loss time threshold <p><strong>Comment:</strong> After this amount of seconds without datalink the data link lost mode triggers</p>   </td>
 <td>5 > 300 (1)</td>
 <td>10</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_EF_C2T">COM_EF_C2T</strong> (FLOAT)</td>
 <td>Engine Failure Current/Throttle Threshold <p><strong>Comment:</strong> Engine failure triggers only below this current value</p>   </td>
 <td>0.0 > 50.0 (1)</td>
 <td>5.0</td>
 <td>A/%</td>
</tr>
<tr>
 <td><strong id="COM_EF_THROT">COM_EF_THROT</strong> (FLOAT)</td>
 <td>Engine Failure Throttle Threshold <p><strong>Comment:</strong> Engine failure triggers only above this throttle value</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.5</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="COM_EF_TIME">COM_EF_TIME</strong> (FLOAT)</td>
 <td>Engine Failure Time Threshold <p><strong>Comment:</strong> Engine failure triggers only if the throttle threshold and the current to throttle threshold are violated for this time</p>   </td>
 <td>0.0 > 60.0 (1)</td>
 <td>10.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_FLIGHT_UUID">COM_FLIGHT_UUID</strong> (INT32)</td>
 <td>Next flight UUID <p><strong>Comment:</strong> This number is incremented automatically after every flight on disarming in order to remember the next flight UUID. The first flight is 0.</p>   </td>
 <td>0 > ? </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLTMODE1">COM_FLTMODE1</strong> (INT32)</td>
 <td>First flightmode slot (1000-1160) <p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLTMODE2">COM_FLTMODE2</strong> (INT32)</td>
 <td>Second flightmode slot (1160-1320) <p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLTMODE3">COM_FLTMODE3</strong> (INT32)</td>
 <td>Third flightmode slot (1320-1480) <p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLTMODE4">COM_FLTMODE4</strong> (INT32)</td>
 <td>Fourth flightmode slot (1480-1640) <p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLTMODE5">COM_FLTMODE5</strong> (INT32)</td>
 <td>Fifth flightmode slot (1640-1800) <p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLTMODE6">COM_FLTMODE6</strong> (INT32)</td>
 <td>Sixth flightmode slot (1800-2000) <p><strong>Comment:</strong> If the main switch channel is in this range the selected flight mode will be applied.</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_FLT_PROFILE">COM_FLT_PROFILE</strong> (INT32)</td>
 <td>User Flight Profile <p><strong>Comment:</strong> Describes the intended use of the vehicle. Can be used by ground control software or log post processing. This param does not influence the behavior within the firmware. This means for example the control logic is independent of the setting of this param (but depends on other params).</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Default</li> 

<li><strong>100:</strong> Pro User</li> 

<li><strong>200:</strong> Flight Tester</li> 

<li><strong>300:</strong> Developer</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_HLDL_LOSS_T">COM_HLDL_LOSS_T</strong> (INT32)</td>
 <td>High Latency Datalink loss time threshold <p><strong>Comment:</strong> After this amount of seconds without datalink the data link lost mode triggers</p>   </td>
 <td>60 > 3600 </td>
 <td>120</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_HLDL_REG_T">COM_HLDL_REG_T</strong> (INT32)</td>
 <td>High Latency Datalink regain time threshold <p><strong>Comment:</strong> After a data link loss: after this number of seconds with a healthy datalink the 'datalink loss' flag is set back to false</p>   </td>
 <td>0 > 60 </td>
 <td>0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_HOME_H_T">COM_HOME_H_T</strong> (FLOAT)</td>
 <td>Home set horizontal threshold <p><strong>Comment:</strong> The home position will be set if the estimated positioning accuracy is below the threshold.</p>   </td>
 <td>2 > 15 (0.5)</td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="COM_HOME_IN_AIR">COM_HOME_IN_AIR</strong> (INT32)</td>
 <td>Allows setting the home position after takeoff <p><strong>Comment:</strong> If set to true, the autopilot is allowed to set its home position after takeoff The true home position is back-computed if a local position is estimate if available. If no local position is available, home is set to the current position.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_HOME_V_T">COM_HOME_V_T</strong> (FLOAT)</td>
 <td>Home set vertical threshold <p><strong>Comment:</strong> The home position will be set if the estimated positioning accuracy is below the threshold.</p>   </td>
 <td>5 > 25 (0.5)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="COM_KILL_DISARM">COM_KILL_DISARM</strong> (FLOAT)</td>
 <td>Timeout value for disarming when kill switch is engaged    </td>
 <td>0.0 > 30.0 (0.1)</td>
 <td>5.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_LKDOWN_TKO">COM_LKDOWN_TKO</strong> (FLOAT)</td>
 <td>Timeout for detecting a failure after takeoff <p><strong>Comment:</strong> A non-zero, positive value specifies the timeframe in seconds within failure detector is allowed to put the vehicle into a lockdown state if attitude exceeds the limits defined in FD_FAIL_P and FD_FAIL_R. The check is not executed for flight modes that do support acrobatic maneuvers, e.g: Acro (MC/FW), Rattitude and Manual (FW). A zero or negative value means that the check is disabled.</p>   </td>
 <td>-1.0 > 5.0 </td>
 <td>3.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_LOW_BAT_ACT">COM_LOW_BAT_ACT</strong> (INT32)</td>
 <td>Battery failsafe mode <p><strong>Comment:</strong> Action the system takes at critical battery. See also BAT_CRIT_THR and BAT_EMERGEN_THR for definition of battery states.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Warning</li> 

<li><strong>2:</strong> Land mode</li> 

<li><strong>3:</strong> Return at critical level, land at emergency level</li> 
</ul>
  </td>
 <td>(1)</td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_MOT_TEST_EN">COM_MOT_TEST_EN</strong> (INT32)</td>
 <td>Enable Motor Testing <p><strong>Comment:</strong> If set, enables the motor test interface via MAVLink (DO_MOTOR_TEST), that allows spinning the motors for testing purposes.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_OBL_ACT">COM_OBL_ACT</strong> (INT32)</td>
 <td>Set offboard loss failsafe mode <p><strong>Comment:</strong> The offboard loss failsafe will only be entered after a timeout, set by COM_OF_LOSS_T in seconds.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Disabled</li> 

<li><strong>0:</strong> Land mode</li> 

<li><strong>1:</strong> Hold mode</li> 

<li><strong>2:</strong> Return mode</li> 

<li><strong>3:</strong> Terminate</li> 

<li><strong>4:</strong> Lockdown</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_OBL_RC_ACT">COM_OBL_RC_ACT</strong> (INT32)</td>
 <td>Set offboard loss failsafe mode when RC is available <p><strong>Comment:</strong> The offboard loss failsafe will only be entered after a timeout, set by COM_OF_LOSS_T in seconds.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Disabled</li> 

<li><strong>0:</strong> Position mode</li> 

<li><strong>1:</strong> Altitude mode</li> 

<li><strong>2:</strong> Manual</li> 

<li><strong>3:</strong> Return mode</li> 

<li><strong>4:</strong> Land mode</li> 

<li><strong>5:</strong> Hold mode</li> 

<li><strong>6:</strong> Terminate</li> 

<li><strong>7:</strong> Lockdown</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_OF_LOSS_T">COM_OF_LOSS_T</strong> (FLOAT)</td>
 <td>Time-out to wait when offboard connection is lost before triggering offboard lost action.
See COM_OBL_ACT and COM_OBL_RC_ACT to configure action    </td>
 <td>0 > 60 (0.01)</td>
 <td>0.5</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_POSCTL_NAVL">COM_POSCTL_NAVL</strong> (INT32)</td>
 <td>Position control navigation loss response <p><strong>Comment:</strong> This sets the flight mode that will be used if navigation accuracy is no longer adequate for position control. Navigation accuracy checks can be disabled using the CBRK_VELPOSERR parameter, but doing so will remove protection for all flight modes.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Altitude/Manual. Assume use of remote control after fallback. Switch to Altitude mode if a height estimate is available, else switch to MANUAL.</li> 

<li><strong>1:</strong> Land/Terminate. Assume no use of remote control after fallback. Switch to Land mode if a height estimate is available, else switch to TERMINATION.</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_POS_FS_DELAY">COM_POS_FS_DELAY</strong> (INT32)</td>
 <td>Loss of position failsafe activation delay <p><strong>Comment:</strong> This sets number of seconds that the position checks need to be failed before the failsafe will activate. The default value has been optimised for rotary wing applications. For fixed wing applications, a larger value between 5 and 10 should be used.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 100 </td>
 <td>1</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_POS_FS_EPH">COM_POS_FS_EPH</strong> (FLOAT)</td>
 <td>Horizontal position error threshold <p><strong>Comment:</strong> This is the horizontal position error (EPH) threshold that will trigger a failsafe. The default is appropriate for a multicopter. Can be increased for a fixed-wing.</p>   </td>
 <td></td>
 <td>5</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="COM_POS_FS_EPV">COM_POS_FS_EPV</strong> (FLOAT)</td>
 <td>Vertical position error threshold <p><strong>Comment:</strong> This is the vertical position error (EPV) threshold that will trigger a failsafe. The default is appropriate for a multicopter. Can be increased for a fixed-wing.</p>   </td>
 <td></td>
 <td>10</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="COM_POS_FS_GAIN">COM_POS_FS_GAIN</strong> (INT32)</td>
 <td>Loss of position probation gain factor <p><strong>Comment:</strong> This sets the rate that the loss of position probation time grows when position checks are failing. The default value has been optimised for rotary wing applications. For fixed wing applications a value of 0 should be used.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>10</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_POS_FS_PROB">COM_POS_FS_PROB</strong> (INT32)</td>
 <td>Loss of position probation delay at takeoff <p><strong>Comment:</strong> The probation delay is the number of seconds that the EKF innovation checks need to pass for the position to be declared good after it has been declared bad. The probation delay will be reset to this parameter value when takeoff is detected. After takeoff, if position checks are passing, the probation delay will reduce by one second for every lapsed second of valid position down to a minimum of 1 second. If position checks are failing, the probation delay will increase by COM_POS_FS_GAIN seconds for every lapsed second up to a maximum of 100 seconds. The default value has been optimised for rotary wing applications. For fixed wing applications, a value of 1 should be used.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 100 </td>
 <td>30</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_POWER_COUNT">COM_POWER_COUNT</strong> (INT32)</td>
 <td>Required number of redundant power modules <p><strong>Comment:</strong> This configures a check to verify the expected number of 5V rail power supplies are present. By default only one is expected. Note: CBRK_SUPPLY_CHK disables all power checks including this one.</p>   </td>
 <td>0 > 4 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_PREARM_MODE">COM_PREARM_MODE</strong> (INT32)</td>
 <td>Condition to enter prearmed mode <p><strong>Comment:</strong> Condition to enter the prearmed state, an intermediate state between disarmed and armed in which non-throttling actuators are active.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Safety button</li> 

<li><strong>2:</strong> Always</li> 
</ul>
  </td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_RCL_ACT_T">COM_RCL_ACT_T</strong> (FLOAT)</td>
 <td>Delay between RC loss and configured reaction <p><strong>Comment:</strong> RC signal not updated -> still use data for COM_RC_LOSS_T seconds Consider RC signal lost -> wait COM_RCL_ACT_T seconds on the spot waiting to regain signal React with failsafe action NAV_RCL_ACT A zero value disables the delay.</p>   </td>
 <td>0.0 > 25.0 </td>
 <td>15.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_RC_ARM_HYST">COM_RC_ARM_HYST</strong> (INT32)</td>
 <td>RC input arm/disarm command duration <p><strong>Comment:</strong> The default value of 1000 requires the stick to be held in the arm or disarm position for 1 second.</p>   </td>
 <td>100 > 1500 </td>
 <td>1000</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="COM_RC_IN_MODE">COM_RC_IN_MODE</strong> (INT32)</td>
 <td>RC control input mode <p><strong>Comment:</strong> The default value of 0 requires a valid RC transmitter setup. Setting this to 1 allows joystick control and disables RC input handling and the associated checks. A value of 2 will generate RC control data from manual input received via MAVLink instead of directly forwarding the manual input data.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> RC Transmitter</li> 

<li><strong>1:</strong> Joystick/No RC Checks</li> 

<li><strong>2:</strong> Virtual RC by Joystick</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_RC_LOSS_T">COM_RC_LOSS_T</strong> (FLOAT)</td>
 <td>RC loss time threshold <p><strong>Comment:</strong> After this amount of seconds without RC connection it's considered lost and not used anymore</p>   </td>
 <td>0 > 35 (0.1)</td>
 <td>0.5</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="COM_RC_OVERRIDE">COM_RC_OVERRIDE</strong> (INT32)</td>
 <td>Enable RC stick override of auto and/or offboard modes <p><strong>Comment:</strong> When RC stick override is enabled, moving the RC sticks more than COM_RC_STICK_OV from their center position immediately gives control back to the pilot by switching to Position mode. Note: Only has an effect on multicopters, and VTOLs in multicopter mode.</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> Enable override during auto modes (except for in critical battery reaction)</li> 
  <li><strong>1:</strong> Enable override during offboard mode</li> 
</ul>
 </td>
 <td>0 > 3 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_RC_STICK_OV">COM_RC_STICK_OV</strong> (FLOAT)</td>
 <td>RC stick override threshold <p><strong>Comment:</strong> If COM_RC_OVERRIDE is enabled and the joystick input controlling the horizontally axis (right stick for RC in mode 2) is moved more than this threshold from the center the autopilot switches to position mode and the pilot takes over control.</p>   </td>
 <td>5 > 80 (0.05)</td>
 <td>30.0</td>
 <td>%</td>
</tr>
<tr>
 <td><strong id="COM_REARM_GRACE">COM_REARM_GRACE</strong> (INT32)</td>
 <td>Rearming grace period <p><strong>Comment:</strong> Re-arming grace allows to rearm the drone with manual command without running prearmcheck during 5 s after disarming.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_VEL_FS_EVH">COM_VEL_FS_EVH</strong> (FLOAT)</td>
 <td>Horizontal velocity error threshold <p><strong>Comment:</strong> This is the horizontal velocity error (EVH) threshold that will trigger a failsafe. The default is appropriate for a multicopter. Can be increased for a fixed-wing.</p>   </td>
 <td></td>
 <td>1</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="RTL_FLT_TIME">RTL_FLT_TIME</strong> (FLOAT)</td>
 <td>Maximum allowed RTL flight in minutes <p><strong>Comment:</strong> This is used to determine when the vehicle should be switched to RTL due to low battery. Note, particularly for multirotors this should reflect flight time at cruise speed, not while stationary</p>   </td>
 <td></td>
 <td>15</td>
 <td>min</td>
</tr>
</tbody></table>

## Control Allocation

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CA_ACT0_MAX">CA_ACT0_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 0    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT0_MIN">CA_ACT0_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 0    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT10_MAX">CA_ACT10_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 10    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT10_MIN">CA_ACT10_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 10    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT11_MAX">CA_ACT11_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 11    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT11_MIN">CA_ACT11_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 11    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT12_MAX">CA_ACT12_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 12    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT12_MIN">CA_ACT12_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 12    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT13_MAX">CA_ACT13_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 13    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT13_MIN">CA_ACT13_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 13    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT14_MAX">CA_ACT14_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 14    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT14_MIN">CA_ACT14_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 14    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT15_MAX">CA_ACT15_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 15    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT15_MIN">CA_ACT15_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 15    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT1_MAX">CA_ACT1_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 1    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT1_MIN">CA_ACT1_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 1    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT2_MAX">CA_ACT2_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 2    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT2_MIN">CA_ACT2_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 2    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT3_MAX">CA_ACT3_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 3    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT3_MIN">CA_ACT3_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 3    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT4_MAX">CA_ACT4_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 4    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT4_MIN">CA_ACT4_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 4    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT5_MAX">CA_ACT5_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 5    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT5_MIN">CA_ACT5_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 5    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT6_MAX">CA_ACT6_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 6    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT6_MIN">CA_ACT6_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 6    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT7_MAX">CA_ACT7_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 7    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT7_MIN">CA_ACT7_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 7    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT8_MAX">CA_ACT8_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 8    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT8_MIN">CA_ACT8_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 8    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT9_MAX">CA_ACT9_MAX</strong> (FLOAT)</td>
 <td>Maximum value for actuator 9    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_ACT9_MIN">CA_ACT9_MIN</strong> (FLOAT)</td>
 <td>Minimum value for actuator 9    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_AIRFRAME">CA_AIRFRAME</strong> (INT32)</td>
 <td>Airframe ID <p><strong>Comment:</strong> This is used to retrieve pre-computed control effectiveness matrix</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Multirotor</li> 

<li><strong>1:</strong> Standard VTOL (WIP)</li> 

<li><strong>2:</strong> Tiltrotor VTOL (WIP)</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_AIR_SCALE_EN">CA_AIR_SCALE_EN</strong> (INT32)</td>
 <td>Airspeed scaler <p><strong>Comment:</strong> This compensates for the variation of flap effectiveness with airspeed.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_BAT_SCALE_EN">CA_BAT_SCALE_EN</strong> (INT32)</td>
 <td>Battery power level scaler <p><strong>Comment:</strong> This compensates for voltage drop of the battery over time by attempting to normalize performance across the operating range of the battery. The copter should constantly behave as if it was fully charged with reduced max acceleration at lower battery percentages. i.e. if hover is at 0.5 throttle at 100% battery, it will still be 0.5 at 60% battery.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_AX">CA_MC_R0_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 0 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_AY">CA_MC_R0_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 0 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_AZ">CA_MC_R0_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 0 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_CT">CA_MC_R0_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 0 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT0_MIN and CA_ACT0_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_KM">CA_MC_R0_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 0 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_PX">CA_MC_R0_PX</strong> (FLOAT)</td>
 <td>Position of rotor 0 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_PY">CA_MC_R0_PY</strong> (FLOAT)</td>
 <td>Position of rotor 0 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R0_PZ">CA_MC_R0_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 0 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_AX">CA_MC_R1_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 1 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_AY">CA_MC_R1_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 1 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_AZ">CA_MC_R1_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 1 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_CT">CA_MC_R1_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 1 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT1_MIN and CA_ACT1_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_KM">CA_MC_R1_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 1 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust, Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_PX">CA_MC_R1_PX</strong> (FLOAT)</td>
 <td>Position of rotor 1 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_PY">CA_MC_R1_PY</strong> (FLOAT)</td>
 <td>Position of rotor 1 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R1_PZ">CA_MC_R1_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 1 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_AX">CA_MC_R2_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 2 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_AY">CA_MC_R2_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 2 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_AZ">CA_MC_R2_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 2 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_CT">CA_MC_R2_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 2 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT2_MIN and CA_ACT2_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_KM">CA_MC_R2_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 2 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_PX">CA_MC_R2_PX</strong> (FLOAT)</td>
 <td>Position of rotor 2 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_PY">CA_MC_R2_PY</strong> (FLOAT)</td>
 <td>Position of rotor 2 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R2_PZ">CA_MC_R2_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 2 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_AX">CA_MC_R3_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 3 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_AY">CA_MC_R3_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 3 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_AZ">CA_MC_R3_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 3 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_CT">CA_MC_R3_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 3 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT3_MIN and CA_ACT3_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_KM">CA_MC_R3_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 3 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_PX">CA_MC_R3_PX</strong> (FLOAT)</td>
 <td>Position of rotor 3 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_PY">CA_MC_R3_PY</strong> (FLOAT)</td>
 <td>Position of rotor 3 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R3_PZ">CA_MC_R3_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 3 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_AX">CA_MC_R4_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 4 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_AY">CA_MC_R4_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 4 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_AZ">CA_MC_R4_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 4 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_CT">CA_MC_R4_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 4 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT4_MIN and CA_ACT4_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_KM">CA_MC_R4_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 4 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_PX">CA_MC_R4_PX</strong> (FLOAT)</td>
 <td>Position of rotor 4 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_PY">CA_MC_R4_PY</strong> (FLOAT)</td>
 <td>Position of rotor 4 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R4_PZ">CA_MC_R4_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 4 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_AX">CA_MC_R5_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 5 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_AY">CA_MC_R5_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 5 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_AZ">CA_MC_R5_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 5 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_CT">CA_MC_R5_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 5 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT5_MIN and CA_ACT5_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_KM">CA_MC_R5_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 5 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_PX">CA_MC_R5_PX</strong> (FLOAT)</td>
 <td>Position of rotor 5 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_PY">CA_MC_R5_PY</strong> (FLOAT)</td>
 <td>Position of rotor 5 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R5_PZ">CA_MC_R5_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 5 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_AX">CA_MC_R6_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 6 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_AY">CA_MC_R6_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 6 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_AZ">CA_MC_R6_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 6 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_CT">CA_MC_R6_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 6 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT6_MIN and CA_ACT6_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_KM">CA_MC_R6_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 6 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_PX">CA_MC_R6_PX</strong> (FLOAT)</td>
 <td>Position of rotor 6 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_PY">CA_MC_R6_PY</strong> (FLOAT)</td>
 <td>Position of rotor 6 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R6_PZ">CA_MC_R6_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 6 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_AX">CA_MC_R7_AX</strong> (FLOAT)</td>
 <td>Axis of rotor 7 thrust vector, X body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_AY">CA_MC_R7_AY</strong> (FLOAT)</td>
 <td>Axis of rotor 7 thrust vector, Y body axis component    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_AZ">CA_MC_R7_AZ</strong> (FLOAT)</td>
 <td>Axis of rotor 7 thrust vector, Z body axis component    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_CT">CA_MC_R7_CT</strong> (FLOAT)</td>
 <td>Thrust coefficient of rotor 7 <p><strong>Comment:</strong> The thrust coefficient if defined as Thrust = CT * u^2, where u (with value between CA_ACT7_MIN and CA_ACT7_MAX) is the output signal sent to the motor controller.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_KM">CA_MC_R7_KM</strong> (FLOAT)</td>
 <td>Moment coefficient of rotor 7 <p><strong>Comment:</strong> The moment coefficient if defined as Torque = KM * Thrust Use a positive value for a rotor with CCW rotation. Use a negative value for a rotor with CW rotation.</p>   </td>
 <td></td>
 <td>0.05</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_PX">CA_MC_R7_PX</strong> (FLOAT)</td>
 <td>Position of rotor 7 along X body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_PY">CA_MC_R7_PY</strong> (FLOAT)</td>
 <td>Position of rotor 7 along Y body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_MC_R7_PZ">CA_MC_R7_PZ</strong> (FLOAT)</td>
 <td>Position of rotor 7 along Z body axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CA_METHOD">CA_METHOD</strong> (INT32)</td>
 <td>Control allocation method  <strong>Values:</strong><ul>
<li><strong>0:</strong> Pseudo-inverse with output clipping (default)</li> 

<li><strong>1:</strong> Pseudo-inverse with sequential desaturation technique</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## DShot

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="DSHOT_CONFIG">DSHOT_CONFIG</strong> (INT32)</td>
 <td>Configure DShot <p><strong>Comment:</strong> This enables/disables DShot. The different modes define different speeds, for example DShot150 = 150kb/s. Not all ESCs support all modes. Note: this enables DShot on the FMU outputs. For boards with an IO it is the AUX outputs.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable (use PWM/Oneshot)</li> 

<li><strong>150:</strong> DShot150</li> 

<li><strong>300:</strong> DShot300</li> 

<li><strong>600:</strong> DShot600</li> 

<li><strong>1200:</strong> DShot1200</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="DSHOT_MIN">DSHOT_MIN</strong> (FLOAT)</td>
 <td>Minimum DShot Motor Output <p><strong>Comment:</strong> Minimum Output Value for DShot in percent. The value depends on the ESC. Make sure to set this high enough so that the motors are always spinning while armed.</p>   </td>
 <td>0 > 1 (0.01)</td>
 <td>0.055</td>
 <td>%</td>
</tr>
<tr>
 <td><strong id="DSHOT_TEL_CFG">DSHOT_TEL_CFG</strong> (INT32)</td>
 <td>Serial Configuration for DShot Driver <p><strong>Comment:</strong> Configure on which serial port to run DShot Driver.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MOT_POLE_COUNT">MOT_POLE_COUNT</strong> (INT32)</td>
 <td>Number of magnetic poles of the motors <p><strong>Comment:</strong> Specify the number of magnetic poles of the motors. It is required to compute the RPM value from the eRPM returned with the ESC telemetry. Either get the number from the motor spec sheet or count the magnets on the bell of the motor (not the stator magnets). Typical motors for 5 inch props have 14 poles.</p>   </td>
 <td></td>
 <td>14</td>
 <td></td>
</tr>
</tbody></table>

## Data Link Loss

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="NAV_AH_ALT">NAV_AH_ALT</strong> (FLOAT)</td>
 <td>Airfield home alt <p><strong>Comment:</strong> Altitude of airfield home waypoint</p>   </td>
 <td>-50 > ? (0.5)</td>
 <td>600.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_AH_LAT">NAV_AH_LAT</strong> (INT32)</td>
 <td>Airfield home Lat <p><strong>Comment:</strong> Latitude of airfield home waypoint</p>   </td>
 <td>-900000000 > 900000000 </td>
 <td>-265847810</td>
 <td>deg*1e7</td>
</tr>
<tr>
 <td><strong id="NAV_AH_LON">NAV_AH_LON</strong> (INT32)</td>
 <td>Airfield home Lon <p><strong>Comment:</strong> Longitude of airfield home waypoint</p>   </td>
 <td>-1800000000 > 1800000000 </td>
 <td>1518423250</td>
 <td>deg*1e7</td>
</tr>
</tbody></table>

## EKF2

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="EKF2_ABIAS_INIT">EKF2_ABIAS_INIT</strong> (FLOAT)</td>
 <td>1-sigma IMU accelerometer switch-on bias    <p><b>Reboot required:</b> true</p>
</td>
 <td>0.0 > 0.5 </td>
 <td>0.2</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_ABL_ACCLIM">EKF2_ABL_ACCLIM</strong> (FLOAT)</td>
 <td>Maximum IMU accel magnitude that allows IMU bias learning.
If the magnitude of the IMU accelerometer vector exceeds this value, the EKF delta velocity state estimation will be inhibited.
This reduces the adverse effect of high manoeuvre accelerations and IMU nonlinerity and scale factor errors on the delta velocity bias estimates    </td>
 <td>20.0 > 200.0 </td>
 <td>25.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_ABL_GYRLIM">EKF2_ABL_GYRLIM</strong> (FLOAT)</td>
 <td>Maximum IMU gyro angular rate magnitude that allows IMU bias learning.
If the magnitude of the IMU angular rate vector exceeds this value, the EKF delta velocity state estimation will be inhibited.
This reduces the adverse effect of rapid rotation rates and associated errors on the delta velocity bias estimates    </td>
 <td>2.0 > 20.0 </td>
 <td>3.0</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="EKF2_ABL_LIM">EKF2_ABL_LIM</strong> (FLOAT)</td>
 <td>Accelerometer bias learning limit. The ekf delta velocity bias states will be limited to within a range equivalent to +- of this value    </td>
 <td>0.0 > 0.8 </td>
 <td>0.4</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_ABL_TAU">EKF2_ABL_TAU</strong> (FLOAT)</td>
 <td>Time constant used by acceleration and angular rate magnitude checks used to inhibit delta velocity bias learning.
The vector magnitude of angular rate and acceleration used to check if learning should be inhibited has a peak hold filter applied to it with an exponential decay.
This parameter controls the time constant of the decay    </td>
 <td>0.1 > 1.0 </td>
 <td>0.5</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="EKF2_ACC_B_NOISE">EKF2_ACC_B_NOISE</strong> (FLOAT)</td>
 <td>Process noise for IMU accelerometer bias prediction    </td>
 <td>0.0 > 0.01 </td>
 <td>3.0e-3</td>
 <td>m/s^3</td>
</tr>
<tr>
 <td><strong id="EKF2_ACC_NOISE">EKF2_ACC_NOISE</strong> (FLOAT)</td>
 <td>Accelerometer noise for covariance prediction    </td>
 <td>0.01 > 1.0 </td>
 <td>3.5e-1</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_AID_MASK">EKF2_AID_MASK</strong> (INT32)</td>
 <td>Integer bitmask controlling data fusion and aiding methods <p><strong>Comment:</strong> Set bits in the following positions to enable: 0 : Set to true to use GPS data if available 1 : Set to true to use optical flow data if available 2 : Set to true to inhibit IMU delta velocity bias estimation 3 : Set to true to enable vision position fusion 4 : Set to true to enable vision yaw fusion. Cannot be used if bit position 7 is true. 5 : Set to true to enable multi-rotor drag specific force fusion 6 : set to true if the EV observations are in a non NED reference frame and need to be rotated before being used 7 : Set to true to enable GPS yaw fusion. Cannot be used if bit position 4 is true.</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> use GPS</li> 
  <li><strong>1:</strong> use optical flow</li> 
  <li><strong>2:</strong> inhibit IMU bias estimation</li> 
  <li><strong>3:</strong> vision position fusion</li> 
  <li><strong>4:</strong> vision yaw fusion</li> 
  <li><strong>5:</strong> multi-rotor drag fusion</li> 
  <li><strong>6:</strong> rotate external vision</li> 
  <li><strong>7:</strong> GPS yaw fusion</li> 
  <li><strong>8:</strong> vision velocity fusion</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 511 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_ANGERR_INIT">EKF2_ANGERR_INIT</strong> (FLOAT)</td>
 <td>1-sigma tilt angle uncertainty after gravity vector alignment    <p><b>Reboot required:</b> true</p>
</td>
 <td>0.0 > 0.5 </td>
 <td>0.1</td>
 <td>rad</td>
</tr>
<tr>
 <td><strong id="EKF2_ARSP_THR">EKF2_ARSP_THR</strong> (FLOAT)</td>
 <td>Airspeed fusion threshold. A value of zero will deactivate airspeed fusion. Any other positive
value will determine the minimum airspeed which will still be fused. Set to about 90% of the vehicles stall speed.
Both airspeed fusion and sideslip fusion must be active for the EKF to continue navigating after loss of GPS.
Use EKF2_FUSE_BETA to activate sideslip fusion    </td>
 <td>0.0 > ? </td>
 <td>0.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_ASPD_MAX">EKF2_ASPD_MAX</strong> (FLOAT)</td>
 <td>Upper limit on airspeed along individual axes used to correct baro for position error effects    </td>
 <td>5.0 > 50.0 </td>
 <td>20.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_ASP_DELAY">EKF2_ASP_DELAY</strong> (FLOAT)</td>
 <td>Airspeed measurement delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>100</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_AVEL_DELAY">EKF2_AVEL_DELAY</strong> (FLOAT)</td>
 <td>Auxillary Velocity Estimate (e.g from a landing target) delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>5</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_BARO_DELAY">EKF2_BARO_DELAY</strong> (FLOAT)</td>
 <td>Barometer measurement delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>0</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_BARO_GATE">EKF2_BARO_GATE</strong> (FLOAT)</td>
 <td>Gate size for barometric and GPS height fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>5.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_BARO_NOISE">EKF2_BARO_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for barometric altitude    </td>
 <td>0.01 > 15.0 </td>
 <td>3.5</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_BCOEF_X">EKF2_BCOEF_X</strong> (FLOAT)</td>
 <td>X-axis ballistic coefficient used by the multi-rotor specific drag force model.
This should be adjusted to minimise variance of the X-axis drag specific force innovation sequence    </td>
 <td>1.0 > 100.0 </td>
 <td>25.0</td>
 <td>kg/m^2</td>
</tr>
<tr>
 <td><strong id="EKF2_BCOEF_Y">EKF2_BCOEF_Y</strong> (FLOAT)</td>
 <td>Y-axis ballistic coefficient used by the multi-rotor specific drag force model.
This should be adjusted to minimise variance of the Y-axis drag specific force innovation sequence    </td>
 <td>1.0 > 100.0 </td>
 <td>25.0</td>
 <td>kg/m^2</td>
</tr>
<tr>
 <td><strong id="EKF2_BETA_GATE">EKF2_BETA_GATE</strong> (FLOAT)</td>
 <td>Gate size for synthetic sideslip fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>5.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_BETA_NOISE">EKF2_BETA_NOISE</strong> (FLOAT)</td>
 <td>Noise for synthetic sideslip fusion    </td>
 <td>0.1 > 1.0 </td>
 <td>0.3</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_DECL_TYPE">EKF2_DECL_TYPE</strong> (INT32)</td>
 <td>Integer bitmask controlling handling of magnetic declination <p><strong>Comment:</strong> Set bits in the following positions to enable functions. 0 : Set to true to use the declination from the geo_lookup library when the GPS position becomes available, set to false to always use the EKF2_MAG_DECL value. 1 : Set to true to save the EKF2_MAG_DECL parameter to the value returned by the EKF when the vehicle disarms. 2 : Set to true to always use the declination as an observation when 3-axis magnetometer fusion is being used.</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> use geo_lookup declination</li> 
  <li><strong>1:</strong> save EKF2_MAG_DECL on disarm</li> 
  <li><strong>2:</strong> use declination as an observation</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 7 </td>
 <td>7</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_DRAG_NOISE">EKF2_DRAG_NOISE</strong> (FLOAT)</td>
 <td>Specific drag force observation noise variance used by the multi-rotor specific drag force model.
Increasing it makes the multi-rotor wind estimates adjust more slowly    </td>
 <td>0.5 > 10.0 </td>
 <td>2.5</td>
 <td>(m/s^2)^2</td>
</tr>
<tr>
 <td><strong id="EKF2_EAS_NOISE">EKF2_EAS_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for airspeed fusion    </td>
 <td>0.5 > 5.0 </td>
 <td>1.4</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_EVA_NOISE">EKF2_EVA_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for vision angle observations used to lower bound or replace the uncertainty included in the message    </td>
 <td>0.05 > ? </td>
 <td>0.05</td>
 <td>rad</td>
</tr>
<tr>
 <td><strong id="EKF2_EVP_GATE">EKF2_EVP_GATE</strong> (FLOAT)</td>
 <td>Gate size for vision position fusion
Sets the number of standard deviations used by the innovation consistency test    </td>
 <td>1.0 > ? </td>
 <td>5.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_EVP_NOISE">EKF2_EVP_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for vision position observations used to lower bound or replace the uncertainty included in the message    </td>
 <td>0.01 > ? </td>
 <td>0.1</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_EVV_GATE">EKF2_EVV_GATE</strong> (FLOAT)</td>
 <td>Gate size for vision velocity estimate fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>3.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_EVV_NOISE">EKF2_EVV_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for vision velocity observations used to lower bound or replace the uncertainty included in the message    </td>
 <td>0.01 > ? </td>
 <td>0.1</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_EV_DELAY">EKF2_EV_DELAY</strong> (FLOAT)</td>
 <td>Vision Position Estimator delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>175</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_EV_NOISE_MD">EKF2_EV_NOISE_MD</strong> (INT32)</td>
 <td>Whether to set the external vision observation noise from the parameter or from vision message <p><strong>Comment:</strong> If set to true the observation noise is set from the parameters directly, if set to false the measurement noise is taken from the vision message and the parameter are used as a lower bound.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_EV_POS_X">EKF2_EV_POS_X</strong> (FLOAT)</td>
 <td>X position of VI sensor focal point in body frame (forward axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_EV_POS_Y">EKF2_EV_POS_Y</strong> (FLOAT)</td>
 <td>Y position of VI sensor focal point in body frame (right axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_EV_POS_Z">EKF2_EV_POS_Z</strong> (FLOAT)</td>
 <td>Z position of VI sensor focal point in body frame (down axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_FUSE_BETA">EKF2_FUSE_BETA</strong> (INT32)</td>
 <td>Boolean determining if synthetic sideslip measurements should fused <p><strong>Comment:</strong> A value of 1 indicates that fusion is active Both  sideslip fusion and airspeed fusion must be active for the EKF to continue navigating after loss of GPS. Use EKF2_ARSP_THR to activate airspeed fusion.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_GBIAS_INIT">EKF2_GBIAS_INIT</strong> (FLOAT)</td>
 <td>1-sigma IMU gyro switch-on bias    <p><b>Reboot required:</b> true</p>
</td>
 <td>0.0 > 0.2 </td>
 <td>0.1</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="EKF2_GND_EFF_DZ">EKF2_GND_EFF_DZ</strong> (FLOAT)</td>
 <td>Baro deadzone range for height fusion <p><strong>Comment:</strong> Sets the value of deadzone applied to negative baro innovations. Deadzone is enabled when EKF2_GND_EFF_DZ > 0.</p>   </td>
 <td>0.0 > 10.0 </td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_GND_MAX_HGT">EKF2_GND_MAX_HGT</strong> (FLOAT)</td>
 <td>Height above ground level for ground effect zone <p><strong>Comment:</strong> Sets the maximum distance to the ground level where negative baro innovations are expected.</p>   </td>
 <td>0.0 > 5.0 </td>
 <td>0.5</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_CHECK">EKF2_GPS_CHECK</strong> (INT32)</td>
 <td>Integer bitmask controlling GPS checks <p><strong>Comment:</strong> Set bits to 1 to enable checks. Checks enabled by the following bit positions 0 : Minimum required sat count set by EKF2_REQ_NSATS 1 : Maximum allowed PDOP set by EKF2_REQ_PDOP 2 : Maximum allowed horizontal position error set by EKF2_REQ_EPH 3 : Maximum allowed vertical position error set by EKF2_REQ_EPV 4 : Maximum allowed speed error set by EKF2_REQ_SACC 5 : Maximum allowed horizontal position rate set by EKF2_REQ_HDRIFT. This check will only run when the vehicle is on ground and stationary. Detecton of the stationary condition is controlled by the EKF2_MOVE_TEST parameter. 6 : Maximum allowed vertical position rate set by EKF2_REQ_VDRIFT. This check will only run when the vehicle is on ground and stationary. Detecton of the stationary condition is controlled by the EKF2_MOVE_TEST parameter. 7 : Maximum allowed horizontal speed set by EKF2_REQ_HDRIFT. This check will only run when the vehicle is on ground and stationary. Detecton of the stationary condition is controlled by the EKF2_MOVE_TEST parameter. 8 : Maximum allowed vertical velocity discrepancy set by EKF2_REQ_VDRIFT</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> Min sat count (EKF2_REQ_NSATS)</li> 
  <li><strong>1:</strong> Max PDOP (EKF2_REQ_PDOP)</li> 
  <li><strong>2:</strong> Max horizontal position error (EKF2_REQ_EPH)</li> 
  <li><strong>3:</strong> Max vertical position error (EKF2_REQ_EPV)</li> 
  <li><strong>4:</strong> Max speed error (EKF2_REQ_SACC)</li> 
  <li><strong>5:</strong> Max horizontal position rate (EKF2_REQ_HDRIFT)</li> 
  <li><strong>6:</strong> Max vertical position rate (EKF2_REQ_VDRIFT)</li> 
  <li><strong>7:</strong> Max horizontal speed (EKF2_REQ_HDRIFT)</li> 
  <li><strong>8:</strong> Max vertical velocity discrepancy (EKF2_REQ_VDRIFT)</li> 
</ul>
 </td>
 <td>0 > 511 </td>
 <td>245</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_DELAY">EKF2_GPS_DELAY</strong> (FLOAT)</td>
 <td>GPS measurement delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>110</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_POS_X">EKF2_GPS_POS_X</strong> (FLOAT)</td>
 <td>X position of GPS antenna in body frame (forward axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_POS_Y">EKF2_GPS_POS_Y</strong> (FLOAT)</td>
 <td>Y position of GPS antenna in body frame (right axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_POS_Z">EKF2_GPS_POS_Z</strong> (FLOAT)</td>
 <td>Z position of GPS antenna in body frame (down axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_P_GATE">EKF2_GPS_P_GATE</strong> (FLOAT)</td>
 <td>Gate size for GPS horizontal position fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>5.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_P_NOISE">EKF2_GPS_P_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for gps position    </td>
 <td>0.01 > 10.0 </td>
 <td>0.5</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_V_GATE">EKF2_GPS_V_GATE</strong> (FLOAT)</td>
 <td>Gate size for GPS velocity fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>5.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_GPS_V_NOISE">EKF2_GPS_V_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for gps horizontal velocity    </td>
 <td>0.01 > 5.0 </td>
 <td>0.3</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_GSF_TAS">EKF2_GSF_TAS</strong> (FLOAT)</td>
 <td>Default value of true airspeed used in EKF-GSF AHRS calculation.
If no airspeed measurements are avalable, the EKF-GSF AHRS calculation will assume this value of true airspeed when compensating for centripetal acceleration during turns. Set to zero to disable centripetal acceleration compensation during fixed wing flight modes    </td>
 <td>0.0 > 100.0 </td>
 <td>15.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_GYR_B_NOISE">EKF2_GYR_B_NOISE</strong> (FLOAT)</td>
 <td>Process noise for IMU rate gyro bias prediction    </td>
 <td>0.0 > 0.01 </td>
 <td>1.0e-3</td>
 <td>rad/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_GYR_NOISE">EKF2_GYR_NOISE</strong> (FLOAT)</td>
 <td>Rate gyro noise for covariance prediction    </td>
 <td>0.0001 > 0.1 </td>
 <td>1.5e-2</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="EKF2_HDG_GATE">EKF2_HDG_GATE</strong> (FLOAT)</td>
 <td>Gate size for magnetic heading fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>2.6</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_HEAD_NOISE">EKF2_HEAD_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for magnetic heading fusion    </td>
 <td>0.01 > 1.0 </td>
 <td>0.3</td>
 <td>rad</td>
</tr>
<tr>
 <td><strong id="EKF2_HGT_MODE">EKF2_HGT_MODE</strong> (INT32)</td>
 <td>Determines the primary source of height data used by the EKF <p><strong>Comment:</strong> The range sensor option should only be used when for operation over a flat surface as the local NED origin will move up and down with ground level.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Barometric pressure</li> 

<li><strong>1:</strong> GPS</li> 

<li><strong>2:</strong> Range sensor</li> 

<li><strong>3:</strong> Vision</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_IMU_POS_X">EKF2_IMU_POS_X</strong> (FLOAT)</td>
 <td>X position of IMU in body frame (forward axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_IMU_POS_Y">EKF2_IMU_POS_Y</strong> (FLOAT)</td>
 <td>Y position of IMU in body frame (right axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_IMU_POS_Z">EKF2_IMU_POS_Z</strong> (FLOAT)</td>
 <td>Z position of IMU in body frame (down axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_ACCLIM">EKF2_MAG_ACCLIM</strong> (FLOAT)</td>
 <td>Horizontal acceleration threshold used by automatic selection of magnetometer fusion method.
This parameter is used when the magnetometer fusion method is set automatically (EKF2_MAG_TYPE = 0). If the filtered horizontal acceleration is greater than this parameter value, then the EKF will use 3-axis magnetomer fusion    </td>
 <td>0.0 > 5.0 </td>
 <td>0.5</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_B_NOISE">EKF2_MAG_B_NOISE</strong> (FLOAT)</td>
 <td>Process noise for body magnetic field prediction    </td>
 <td>0.0 > 0.1 </td>
 <td>1.0e-4</td>
 <td>gauss/s</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_CHECK">EKF2_MAG_CHECK</strong> (INT32)</td>
 <td>Magnetic field strength test selection <p><strong>Comment:</strong> When set, the EKF checks the strength of the magnetic field to decide whether the magnetometer data is valid. If GPS data is received, the magnetic field is compared to a World Magnetic Model (WMM), otherwise an average value is used. This check is useful to reject occasional hard iron disturbance.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_DECL">EKF2_MAG_DECL</strong> (FLOAT)</td>
 <td>Magnetic declination    </td>
 <td></td>
 <td>0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_DELAY">EKF2_MAG_DELAY</strong> (FLOAT)</td>
 <td>Magnetometer measurement delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>0</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_E_NOISE">EKF2_MAG_E_NOISE</strong> (FLOAT)</td>
 <td>Process noise for earth magnetic field prediction    </td>
 <td>0.0 > 0.1 </td>
 <td>1.0e-3</td>
 <td>gauss/s</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_GATE">EKF2_MAG_GATE</strong> (FLOAT)</td>
 <td>Gate size for magnetometer XYZ component fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>3.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_NOISE">EKF2_MAG_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for magnetometer 3-axis fusion    </td>
 <td>0.001 > 1.0 </td>
 <td>5.0e-2</td>
 <td>gauss</td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_TYPE">EKF2_MAG_TYPE</strong> (INT32)</td>
 <td>Type of magnetometer fusion <p><strong>Comment:</strong> Integer controlling the type of magnetometer fusion used - magnetic heading or 3-component vector. The fuson of magnetomer data as a three component vector enables vehicle body fixed hard iron errors to be learned, but requires a stable earth field. If set to 'Automatic' magnetic heading fusion is used when on-ground and 3-axis magnetic field fusion in-flight with fallback to magnetic heading fusion if there is insufficient motion to make yaw or magnetic field states observable. If set to 'Magnetic heading' magnetic heading fusion is used at all times If set to '3-axis' 3-axis field fusion is used at all times. If set to 'VTOL custom' the behaviour is the same as 'Automatic', but if fusing airspeed, magnetometer fusion is only allowed to modify the magnetic field states. This can be used by VTOL platforms with large magnetic field disturbances to prevent incorrect bias states being learned during forward flight operation which can adversely affect estimation accuracy after transition to hovering flight. If set to 'MC custom' the behaviour is the same as 'Automatic, but if there are no earth frame position or velocity observations being used, the magnetometer will not be used. This enables vehicles to operate with no GPS in environments where the magnetic field cannot be used to provide a heading reference. Prior to flight, the yaw angle is assumed to be constant if movement tests controlled by the EKF2_MOVE_TEST parameter indicate that the vehicle is static. This allows the vehicle to be placed on the ground to learn the yaw gyro bias prior to flight. If set to 'None' the magnetometer will not be used under any circumstance. If no external source of yaw is available, it is possible to use post-takeoff horizontal movement combined with GPS velocity measurements to align the yaw angle with the timer required (depending on the amount of movement and GPS data quality). Other external sources of yaw may be used if selected via the EKF2_AID_MASK parameter.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Automatic</li> 

<li><strong>1:</strong> Magnetic heading</li> 

<li><strong>2:</strong> 3-axis</li> 

<li><strong>3:</strong> VTOL custom</li> 

<li><strong>4:</strong> MC custom</li> 

<li><strong>5:</strong> None</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_MAG_YAWLIM">EKF2_MAG_YAWLIM</strong> (FLOAT)</td>
 <td>Yaw rate threshold used by automatic selection of magnetometer fusion method.
This parameter is used when the magnetometer fusion method is set automatically (EKF2_MAG_TYPE = 0). If the filtered yaw rate is greater than this parameter value, then the EKF will use 3-axis magnetomer fusion    </td>
 <td>0.0 > 1.0 </td>
 <td>0.25</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="EKF2_MIN_OBS_DT">EKF2_MIN_OBS_DT</strong> (INT32)</td>
 <td>Minimum time of arrival delta between non-IMU observations before data is downsampled.
Baro and Magnetometer data will be averaged before downsampling, other data will be point sampled resulting in loss of information    <p><b>Reboot required:</b> true</p>
</td>
 <td>10 > 50 </td>
 <td>20</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_MIN_RNG">EKF2_MIN_RNG</strong> (FLOAT)</td>
 <td>Expected range finder reading when on ground <p><strong>Comment:</strong> If the vehicle is on ground, is not moving as determined by the motion test controlled by EKF2_MOVE_TEST and the range finder is returning invalid or no data, then an assumed range value of EKF2_MIN_RNG will be used by the terrain estimator so that a terrain height estimate is avilable at the start of flight in situations where the range finder may be inside its minimum measurements distance when on ground.</p>   </td>
 <td>0.01 > ? </td>
 <td>0.1</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_MOVE_TEST">EKF2_MOVE_TEST</strong> (FLOAT)</td>
 <td>Vehicle movement test threshold <p><strong>Comment:</strong> Scales the threshold tests applied to IMU data used to determine if the vehicle is static or moving. See parameter descriptions for EKF2_GPS_CHECK and EKF2_MAG_TYPE for further information on the functionality affected by this parameter.</p>   </td>
 <td>0.1 > 10.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_MULTI_IMU">EKF2_MULTI_IMU</strong> (INT32)</td>
 <td>Multi-EKF IMUs <p><strong>Comment:</strong> Maximum number of IMUs to use for Multi-EKF. Set 0 to disable. Requires SENS_IMU_MODE 0.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 4 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_MULTI_MAG">EKF2_MULTI_MAG</strong> (INT32)</td>
 <td>Multi-EKF Magnetometers <p><strong>Comment:</strong> Maximum number of magnetometers to use for Multi-EKF. Set 0 to disable. Requires SENS_MAG_MODE 0.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 4 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_NOAID_NOISE">EKF2_NOAID_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for non-aiding position hold    </td>
 <td>0.5 > 50.0 </td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_NOAID_TOUT">EKF2_NOAID_TOUT</strong> (INT32)</td>
 <td>Maximum lapsed time from last fusion of measurements that constrain velocity drift before the EKF will report the horizontal nav solution as invalid    </td>
 <td>500000 > 10000000 </td>
 <td>5000000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_DELAY">EKF2_OF_DELAY</strong> (FLOAT)</td>
 <td>Optical flow measurement delay relative to IMU measurements
Assumes measurement is timestamped at trailing edge of integration period    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>20</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_GATE">EKF2_OF_GATE</strong> (FLOAT)</td>
 <td>Gate size for optical flow fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>3.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_N_MAX">EKF2_OF_N_MAX</strong> (FLOAT)</td>
 <td>Measurement noise for the optical flow sensor <p><strong>Comment:</strong> (when it's reported quality metric is at the minimum set by EKF2_OF_QMIN). The following condition must be met: EKF2_OF_N_MAXN >= EKF2_OF_N_MIN</p>   </td>
 <td>0.05 > ? </td>
 <td>0.5</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_N_MIN">EKF2_OF_N_MIN</strong> (FLOAT)</td>
 <td>Measurement noise for the optical flow sensor when it's reported quality metric is at the maximum    </td>
 <td>0.05 > ? </td>
 <td>0.15</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_POS_X">EKF2_OF_POS_X</strong> (FLOAT)</td>
 <td>X position of optical flow focal point in body frame (forward axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_POS_Y">EKF2_OF_POS_Y</strong> (FLOAT)</td>
 <td>Y position of optical flow focal point in body frame (right axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_POS_Z">EKF2_OF_POS_Z</strong> (FLOAT)</td>
 <td>Z position of optical flow focal point in body frame (down axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_OF_QMIN">EKF2_OF_QMIN</strong> (INT32)</td>
 <td>Optical Flow data will only be used if the sensor reports a quality metric >= EKF2_OF_QMIN    </td>
 <td>0 > 255 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_PCOEF_XN">EKF2_PCOEF_XN</strong> (FLOAT)</td>
 <td>Static pressure position error coefficient for the negative X axis.
This is the ratio of static pressure error to dynamic pressure generated by a negative wind relative velocity along the X body axis.
If the baro height estimate rises during backwards flight, then this will be a negative number    </td>
 <td>-0.5 > 0.5 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_PCOEF_XP">EKF2_PCOEF_XP</strong> (FLOAT)</td>
 <td>Static pressure position error coefficient for the positive X axis
This is the ratio of static pressure error to dynamic pressure generated by a positive wind relative velocity along the X body axis.
If the baro height estimate rises during forward flight, then this will be a negative number    </td>
 <td>-0.5 > 0.5 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_PCOEF_YN">EKF2_PCOEF_YN</strong> (FLOAT)</td>
 <td>Pressure position error coefficient for the negative Y axis.
This is the ratio of static pressure error to dynamic pressure generated by a wind relative velocity along the negative Y (LH) body axis.
If the baro height estimate rises during sideways flight to the left, then this will be a negative number    </td>
 <td>-0.5 > 0.5 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_PCOEF_YP">EKF2_PCOEF_YP</strong> (FLOAT)</td>
 <td>Pressure position error coefficient for the positive Y axis.
This is the ratio of static pressure error to dynamic pressure generated by a wind relative velocity along the positive Y (RH) body axis.
If the baro height estimate rises during sideways flight to the right, then this will be a negative number    </td>
 <td>-0.5 > 0.5 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_PCOEF_Z">EKF2_PCOEF_Z</strong> (FLOAT)</td>
 <td>Static pressure position error coefficient for the Z axis.
This is the ratio of static pressure error to dynamic pressure generated by a wind relative velocity along the Z body axis    </td>
 <td>-0.5 > 0.5 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_EPH">EKF2_REQ_EPH</strong> (FLOAT)</td>
 <td>Required EPH to use GPS    </td>
 <td>2 > 100 </td>
 <td>3.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_EPV">EKF2_REQ_EPV</strong> (FLOAT)</td>
 <td>Required EPV to use GPS    </td>
 <td>2 > 100 </td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_GPS_H">EKF2_REQ_GPS_H</strong> (FLOAT)</td>
 <td>Required GPS health time on startup <p><strong>Comment:</strong> Minimum continuous period without GPS failure required to mark a healthy GPS status. It can be reduced to speed up initialization, but it's recommended to keep this unchanged for a vehicle.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0.1 > ? </td>
 <td>10.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_HDRIFT">EKF2_REQ_HDRIFT</strong> (FLOAT)</td>
 <td>Maximum horizontal drift speed to use GPS    </td>
 <td>0.1 > 1.0 </td>
 <td>0.1</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_NSATS">EKF2_REQ_NSATS</strong> (INT32)</td>
 <td>Required satellite count to use GPS    </td>
 <td>4 > 12 </td>
 <td>6</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_PDOP">EKF2_REQ_PDOP</strong> (FLOAT)</td>
 <td>Maximum PDOP to use GPS    </td>
 <td>1.5 > 5.0 </td>
 <td>2.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_SACC">EKF2_REQ_SACC</strong> (FLOAT)</td>
 <td>Required speed accuracy to use GPS    </td>
 <td>0.5 > 5.0 </td>
 <td>0.5</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_REQ_VDRIFT">EKF2_REQ_VDRIFT</strong> (FLOAT)</td>
 <td>Maximum vertical drift speed to use GPS    </td>
 <td>0.1 > 1.5 </td>
 <td>0.2</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_AID">EKF2_RNG_AID</strong> (INT32)</td>
 <td>Range sensor aid <p><strong>Comment:</strong> If this parameter is enabled then the estimator will make use of the range finder measurements to estimate it's height even if range sensor is not the primary height source. It will only do so if conditions for range measurement fusion are met. This enables the range finder to be used during low speed and low altitude operation, eg takeoff and landing, where baro interference from rotor wash is excessive and can corrupt EKF state estimates. It is intended to be used where a vertical takeoff and landing is performed, and horizontal flight does not occur until above EKF2_RNG_A_HMAX. If vehicle motion causes repeated switching between the primary height sensor and range finder, an offset in the local position origin can accumulate. Also range finder measurements are less reliable and can experience unexpected errors. For these reasons, if accurate control of height relative to ground is required, it is recommended to use the MPC_ALT_MODE parameter instead, unless baro errors are severe enough to cause problems with landing and takeoff.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Range aid disabled</li> 

<li><strong>1:</strong> Range aid enabled</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_A_HMAX">EKF2_RNG_A_HMAX</strong> (FLOAT)</td>
 <td>Maximum absolute altitude (height above ground level) allowed for range aid mode <p><strong>Comment:</strong> If the vehicle absolute altitude exceeds this value then the estimator will not fuse range measurements to estimate it's height. This only applies when range aid mode is activated (EKF2_RNG_AID = enabled).</p>   </td>
 <td>1.0 > 10.0 </td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_A_IGATE">EKF2_RNG_A_IGATE</strong> (FLOAT)</td>
 <td>Gate size used for innovation consistency checks for range aid fusion <p><strong>Comment:</strong> A lower value means HAGL needs to be more stable in order to use range finder for height estimation in range aid mode</p>   </td>
 <td>0.1 > 5.0 </td>
 <td>1.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_A_VMAX">EKF2_RNG_A_VMAX</strong> (FLOAT)</td>
 <td>Maximum horizontal velocity allowed for range aid mode <p><strong>Comment:</strong> If the vehicle horizontal speed exceeds this value then the estimator will not fuse range measurements to estimate it's height. This only applies when range aid mode is activated (EKF2_RNG_AID = enabled).</p>   </td>
 <td>0.1 > 2 </td>
 <td>1.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_DELAY">EKF2_RNG_DELAY</strong> (FLOAT)</td>
 <td>Range finder measurement delay relative to IMU measurements    <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 300 </td>
 <td>5</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_GATE">EKF2_RNG_GATE</strong> (FLOAT)</td>
 <td>Gate size for range finder fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>5.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_NOISE">EKF2_RNG_NOISE</strong> (FLOAT)</td>
 <td>Measurement noise for range finder fusion    </td>
 <td>0.01 > ? </td>
 <td>0.1</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_PITCH">EKF2_RNG_PITCH</strong> (FLOAT)</td>
 <td>Range sensor pitch offset    </td>
 <td>-0.75 > 0.75 </td>
 <td>0.0</td>
 <td>rad</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_POS_X">EKF2_RNG_POS_X</strong> (FLOAT)</td>
 <td>X position of range finder origin in body frame (forward axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_POS_Y">EKF2_RNG_POS_Y</strong> (FLOAT)</td>
 <td>Y position of range finder origin in body frame (right axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_POS_Z">EKF2_RNG_POS_Z</strong> (FLOAT)</td>
 <td>Z position of range finder origin in body frame (down axis with origin relative to vehicle centre of gravity)    </td>
 <td></td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_QLTY_T">EKF2_RNG_QLTY_T</strong> (FLOAT)</td>
 <td>Minimum duration during which the reported range finder signal quality needs to be non-zero in order to be declared valid (s)    </td>
 <td>0.1 > 5 </td>
 <td>1.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="EKF2_RNG_SFE">EKF2_RNG_SFE</strong> (FLOAT)</td>
 <td>Range finder range dependant noise scaler <p><strong>Comment:</strong> Specifies the increase in range finder noise with range.</p>   </td>
 <td>0.0 > 0.2 </td>
 <td>0.05</td>
 <td>m/m</td>
</tr>
<tr>
 <td><strong id="EKF2_SEL_ERR_RED">EKF2_SEL_ERR_RED</strong> (FLOAT)</td>
 <td>Selector error reduce threshold <p><strong>Comment:</strong> EKF2 instances have to be better than the selected by at least this amount before their relative score can be reduced.</p>   </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_SEL_IMU_ACC">EKF2_SEL_IMU_ACC</strong> (FLOAT)</td>
 <td>Selector acceleration threshold <p><strong>Comment:</strong> EKF2 selector acceleration error threshold for comparing accelerometers. Acceleration vector differences larger than this will result in accumulated velocity error.</p>   </td>
 <td></td>
 <td>1.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="EKF2_SEL_IMU_ANG">EKF2_SEL_IMU_ANG</strong> (FLOAT)</td>
 <td>Selector angular threshold <p><strong>Comment:</strong> EKF2 selector maximum accumulated angular error threshold for comparing gyros. Accumulated angular error larger than this will result in the sensor being declared faulty.</p>   </td>
 <td></td>
 <td>15.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="EKF2_SEL_IMU_RAT">EKF2_SEL_IMU_RAT</strong> (FLOAT)</td>
 <td>Selector angular rate threshold <p><strong>Comment:</strong> EKF2 selector angular rate error threshold for comparing gyros. Angular rate vector differences larger than this will result in accumulated angular error.</p>   </td>
 <td></td>
 <td>7.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="EKF2_SEL_IMU_VEL">EKF2_SEL_IMU_VEL</strong> (FLOAT)</td>
 <td>Selector angular threshold <p><strong>Comment:</strong> EKF2 selector maximum accumulated velocity threshold for comparing accelerometers. Accumulated velocity error larger than this will result in the sensor being declared faulty.</p>   </td>
 <td></td>
 <td>2.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_SYNT_MAG_Z">EKF2_SYNT_MAG_Z</strong> (INT32)</td>
 <td>Enable synthetic magnetometer Z component measurement <p><strong>Comment:</strong> Use for vehicles where the measured body Z magnetic field is subject to strong magnetic interference. For magnetic heading fusion the magnetometer Z measurement will be replaced by a synthetic value calculated using the knowledge of the 3D magnetic field vector at the location of the drone. Therefore, this parameter will only have an effect if the global position of the drone is known. For 3D mag fusion the magnetometer Z measurement will simply be ingored instead of fusing the synthetic value.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_TAS_GATE">EKF2_TAS_GATE</strong> (FLOAT)</td>
 <td>Gate size for TAS fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > ? </td>
 <td>3.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="EKF2_TAU_POS">EKF2_TAU_POS</strong> (FLOAT)</td>
 <td>Time constant of the position output prediction and smoothing filter. Controls how tightly the output track the EKF states    </td>
 <td>0.1 > 1.0 </td>
 <td>0.25</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="EKF2_TAU_VEL">EKF2_TAU_VEL</strong> (FLOAT)</td>
 <td>Time constant of the velocity output prediction and smoothing filter    </td>
 <td>? > 1.0 </td>
 <td>0.25</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="EKF2_TERR_GRAD">EKF2_TERR_GRAD</strong> (FLOAT)</td>
 <td>Magnitude of terrain gradient    </td>
 <td>0.0 > ? </td>
 <td>0.5</td>
 <td>m/m</td>
</tr>
<tr>
 <td><strong id="EKF2_TERR_MASK">EKF2_TERR_MASK</strong> (INT32)</td>
 <td>Integer bitmask controlling fusion sources of the terrain estimator <p><strong>Comment:</strong> Set bits in the following positions to enable: 0 : Set to true to use range finder data if available 1 : Set to true to use optical flow data if available</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> use range finder</li> 
  <li><strong>1:</strong> use optical flow</li> 
</ul>
 </td>
 <td>0 > 3 </td>
 <td>3</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EKF2_TERR_NOISE">EKF2_TERR_NOISE</strong> (FLOAT)</td>
 <td>Terrain altitude process noise - accounts for instability in vehicle height estimate    </td>
 <td>0.5 > ? </td>
 <td>5.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="EKF2_WIND_NOISE">EKF2_WIND_NOISE</strong> (FLOAT)</td>
 <td>Process noise for wind velocity prediction    </td>
 <td>0.0 > 1.0 </td>
 <td>1.0e-1</td>
 <td>m/s^2</td>
</tr>
</tbody></table>

## Events

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="EV_TSK_RC_LOSS">EV_TSK_RC_LOSS</strong> (INT32)</td>
 <td>RC Loss Alarm <p><strong>Comment:</strong> Enable/disable event task for RC Loss. When enabled, an alarm tune will be played via buzzer or ESCs, if supported. The alarm will sound after a disarm, if the vehicle was previously armed and only if the vehicle had RC signal at some point. Particularly useful for locating crashed drones without a GPS sensor.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EV_TSK_STAT_DIS">EV_TSK_STAT_DIS</strong> (INT32)</td>
 <td>Status Display <p><strong>Comment:</strong> Enable/disable event task for displaying the vehicle status using arm-mounted LEDs. When enabled and if the vehicle supports it, LEDs will flash indicating various vehicle status changes. Currently PX4 has not implemented any specific status events. -</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
</tbody></table>

## FW Attitude Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="FW_ACRO_X_MAX">FW_ACRO_X_MAX</strong> (FLOAT)</td>
 <td>Acro body x max rate <p><strong>Comment:</strong> This is the rate the controller is trying to achieve if the user applies full roll stick input in acro mode.</p>   </td>
 <td>45 > 720 </td>
 <td>90</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_ACRO_Y_MAX">FW_ACRO_Y_MAX</strong> (FLOAT)</td>
 <td>Acro body y max rate <p><strong>Comment:</strong> This is the body y rate the controller is trying to achieve if the user applies full pitch stick input in acro mode.</p>   </td>
 <td>45 > 720 </td>
 <td>90</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_ACRO_Z_MAX">FW_ACRO_Z_MAX</strong> (FLOAT)</td>
 <td>Acro body z max rate <p><strong>Comment:</strong> This is the body z rate the controller is trying to achieve if the user applies full yaw stick input in acro mode.</p>   </td>
 <td>10 > 180 </td>
 <td>45</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_ARSP_MODE">FW_ARSP_MODE</strong> (INT32)</td>
 <td>Airspeed mode <p><strong>Comment:</strong> For small wings or VTOL without airspeed sensor this parameter can be used to enable flying without an airspeed reading</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Normal (use airspeed if available)</li> 

<li><strong>1:</strong> Airspeed disabled</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_ARSP_SCALE_EN">FW_ARSP_SCALE_EN</strong> (INT32)</td>
 <td>Enable airspeed scaling <p><strong>Comment:</strong> This enables a logic that automatically adjusts the output of the rate controller to take into account the real torque produced by an aerodynamic control surface given the current deviation from the trim airspeed (FW_AIRSPD_TRIM). Enable when using aerodynamic control surfaces (e.g.: plane) Disable when using rotor wings (e.g.: autogyro)</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_BAT_SCALE_EN">FW_BAT_SCALE_EN</strong> (INT32)</td>
 <td>Whether to scale throttle by battery power level <p><strong>Comment:</strong> This compensates for voltage drop of the battery over time by attempting to normalize performance across the operating range of the battery. The fixed wing should constantly behave as if it was fully charged with reduced max thrust at lower battery percentages. i.e. if cruise speed is at 0.5 throttle at 100% battery, it will still be 0.5 at 60% battery.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_P_FLPS">FW_DTRIM_P_FLPS</strong> (FLOAT)</td>
 <td>Pitch trim increment for flaps configuration <p><strong>Comment:</strong> This increment is added to the pitch trim whenever flaps are fully deployed.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_P_VMAX">FW_DTRIM_P_VMAX</strong> (FLOAT)</td>
 <td>Pitch trim increment at maximum airspeed <p><strong>Comment:</strong> This increment is added to TRIM_PITCH when airspeed is FW_AIRSPD_MAX.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_P_VMIN">FW_DTRIM_P_VMIN</strong> (FLOAT)</td>
 <td>Pitch trim increment at minimum airspeed <p><strong>Comment:</strong> This increment is added to TRIM_PITCH when airspeed is FW_AIRSPD_MIN.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_R_FLPS">FW_DTRIM_R_FLPS</strong> (FLOAT)</td>
 <td>Roll trim increment for flaps configuration <p><strong>Comment:</strong> This increment is added to TRIM_ROLL whenever flaps are fully deployed.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_R_VMAX">FW_DTRIM_R_VMAX</strong> (FLOAT)</td>
 <td>Roll trim increment at maximum airspeed <p><strong>Comment:</strong> This increment is added to TRIM_ROLL when airspeed is FW_AIRSPD_MAX.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_R_VMIN">FW_DTRIM_R_VMIN</strong> (FLOAT)</td>
 <td>Roll trim increment at minimum airspeed <p><strong>Comment:</strong> This increment is added to TRIM_ROLL when airspeed is FW_AIRSPD_MIN.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_Y_VMAX">FW_DTRIM_Y_VMAX</strong> (FLOAT)</td>
 <td>Yaw trim increment at maximum airspeed <p><strong>Comment:</strong> This increment is added to TRIM_YAW when airspeed is FW_AIRSPD_MAX.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_DTRIM_Y_VMIN">FW_DTRIM_Y_VMIN</strong> (FLOAT)</td>
 <td>Yaw trim increment at minimum airspeed <p><strong>Comment:</strong> This increment is added to TRIM_YAW when airspeed is FW_AIRSPD_MIN.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_FLAPERON_SCL">FW_FLAPERON_SCL</strong> (FLOAT)</td>
 <td>Scale factor for flaperons    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_FLAPS_LND_SCL">FW_FLAPS_LND_SCL</strong> (FLOAT)</td>
 <td>Flaps setting during landing <p><strong>Comment:</strong> Sets a fraction of full flaps (FW_FLAPS_SCL) during landing</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_FLAPS_SCL">FW_FLAPS_SCL</strong> (FLOAT)</td>
 <td>Scale factor for flaps    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_FLAPS_TO_SCL">FW_FLAPS_TO_SCL</strong> (FLOAT)</td>
 <td>Flaps setting during take-off <p><strong>Comment:</strong> Sets a fraction of full flaps (FW_FLAPS_SCL) during take-off</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_MAN_P_MAX">FW_MAN_P_MAX</strong> (FLOAT)</td>
 <td>Max manual pitch <p><strong>Comment:</strong> Max pitch for manual control in attitude stabilized mode</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>45.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_MAN_P_SC">FW_MAN_P_SC</strong> (FLOAT)</td>
 <td>Manual pitch scale <p><strong>Comment:</strong> Scale factor applied to the desired pitch actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_MAN_R_MAX">FW_MAN_R_MAX</strong> (FLOAT)</td>
 <td>Max manual roll <p><strong>Comment:</strong> Max roll for manual control in attitude stabilized mode</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>45.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_MAN_R_SC">FW_MAN_R_SC</strong> (FLOAT)</td>
 <td>Manual roll scale <p><strong>Comment:</strong> Scale factor applied to the desired roll actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_MAN_Y_SC">FW_MAN_Y_SC</strong> (FLOAT)</td>
 <td>Manual yaw scale <p><strong>Comment:</strong> Scale factor applied to the desired yaw actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_PR_FF">FW_PR_FF</strong> (FLOAT)</td>
 <td>Pitch rate feed forward <p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>   </td>
 <td>0.0 > 10.0 (0.05)</td>
 <td>0.5</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_PR_I">FW_PR_I</strong> (FLOAT)</td>
 <td>Pitch rate integrator gain <p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>   </td>
 <td>0.005 > 0.5 (0.005)</td>
 <td>0.1</td>
 <td>%/rad</td>
</tr>
<tr>
 <td><strong id="FW_PR_IMAX">FW_PR_IMAX</strong> (FLOAT)</td>
 <td>Pitch rate integrator limit <p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>   </td>
 <td>0.0 > 1.0 (0.05)</td>
 <td>0.4</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_PR_P">FW_PR_P</strong> (FLOAT)</td>
 <td>Pitch rate proportional gain <p><strong>Comment:</strong> This defines how much the elevator input will be commanded depending on the current body angular rate error.</p>   </td>
 <td>0.005 > 1.0 (0.005)</td>
 <td>0.08</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_PSP_OFF">FW_PSP_OFF</strong> (FLOAT)</td>
 <td>Pitch setpoint offset (pitch at level flight) <p><strong>Comment:</strong> An airframe specific offset of the pitch setpoint in degrees, the value is added to the pitch setpoint and should correspond to the pitch at typical cruise speed of the airframe.</p>   </td>
 <td>-90.0 > 90.0 (0.5)</td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_P_RMAX_NEG">FW_P_RMAX_NEG</strong> (FLOAT)</td>
 <td>Maximum negative / down pitch rate <p><strong>Comment:</strong> This limits the maximum pitch down up angular rate the controller will output (in degrees per second).</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>60.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="FW_P_RMAX_POS">FW_P_RMAX_POS</strong> (FLOAT)</td>
 <td>Maximum positive / up pitch rate <p><strong>Comment:</strong> This limits the maximum pitch up angular rate the controller will output (in degrees per second).</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>60.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="FW_P_TC">FW_P_TC</strong> (FLOAT)</td>
 <td>Attitude pitch time constant <p><strong>Comment:</strong> This defines the latency between a pitch step input and the achieved setpoint (inverse to a P gain). Half a second is a good start value and fits for most average systems. Smaller systems may require smaller values, but as this will wear out servos faster, the value should only be decreased as needed.</p>   </td>
 <td>0.2 > 1.0 (0.05)</td>
 <td>0.4</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="FW_RATT_TH">FW_RATT_TH</strong> (FLOAT)</td>
 <td>Threshold for Rattitude mode <p><strong>Comment:</strong> Manual input needed in order to override attitude control rate setpoints and instead pass manual stick inputs as rate setpoints</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.8</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_RLL_TO_YAW_FF">FW_RLL_TO_YAW_FF</strong> (FLOAT)</td>
 <td>Roll control to yaw control feedforward gain <p><strong>Comment:</strong> This gain can be used to counteract the "adverse yaw" effect for fixed wings. When the plane enters a roll it will tend to yaw the nose out of the turn. This gain enables the use of a yaw actuator (rudder, airbrakes, ...) to counteract this effect.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_RR_FF">FW_RR_FF</strong> (FLOAT)</td>
 <td>Roll rate feed forward <p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output. Use this to obtain a tigher response of the controller without introducing noise amplification.</p>   </td>
 <td>0.0 > 10.0 (0.05)</td>
 <td>0.5</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_RR_I">FW_RR_I</strong> (FLOAT)</td>
 <td>Roll rate integrator Gain <p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>   </td>
 <td>0.005 > 0.2 (0.005)</td>
 <td>0.1</td>
 <td>%/rad</td>
</tr>
<tr>
 <td><strong id="FW_RR_IMAX">FW_RR_IMAX</strong> (FLOAT)</td>
 <td>Roll integrator anti-windup <p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value.</p>   </td>
 <td>0.0 > 1.0 (0.05)</td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_RR_P">FW_RR_P</strong> (FLOAT)</td>
 <td>Roll rate proportional Gain <p><strong>Comment:</strong> This defines how much the aileron input will be commanded depending on the current body angular rate error.</p>   </td>
 <td>0.005 > 1.0 (0.005)</td>
 <td>0.05</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_R_RMAX">FW_R_RMAX</strong> (FLOAT)</td>
 <td>Maximum roll rate <p><strong>Comment:</strong> This limits the maximum roll rate the controller will output (in degrees per second).</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>70.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="FW_R_TC">FW_R_TC</strong> (FLOAT)</td>
 <td>Attitude Roll Time Constant <p><strong>Comment:</strong> This defines the latency between a roll step input and the achieved setpoint (inverse to a P gain). Half a second is a good start value and fits for most average systems. Smaller systems may require smaller values, but as this will wear out servos faster, the value should only be decreased as needed.</p>   </td>
 <td>0.4 > 1.0 (0.05)</td>
 <td>0.4</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="FW_WR_FF">FW_WR_FF</strong> (FLOAT)</td>
 <td>Wheel steering rate feed forward <p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>   </td>
 <td>0.0 > 10.0 (0.05)</td>
 <td>0.2</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_WR_I">FW_WR_I</strong> (FLOAT)</td>
 <td>Wheel steering rate integrator gain <p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>   </td>
 <td>0.005 > 0.5 (0.005)</td>
 <td>0.1</td>
 <td>%/rad</td>
</tr>
<tr>
 <td><strong id="FW_WR_IMAX">FW_WR_IMAX</strong> (FLOAT)</td>
 <td>Wheel steering rate integrator limit <p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>   </td>
 <td>0.0 > 1.0 (0.05)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_WR_P">FW_WR_P</strong> (FLOAT)</td>
 <td>Wheel steering rate proportional gain <p><strong>Comment:</strong> This defines how much the wheel steering input will be commanded depending on the current body angular rate error.</p>   </td>
 <td>0.005 > 1.0 (0.005)</td>
 <td>0.5</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_W_EN">FW_W_EN</strong> (INT32)</td>
 <td>Enable wheel steering controller    </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_W_RMAX">FW_W_RMAX</strong> (FLOAT)</td>
 <td>Maximum wheel steering rate <p><strong>Comment:</strong> This limits the maximum wheel steering rate the controller will output (in degrees per second).</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>30.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="FW_YR_FF">FW_YR_FF</strong> (FLOAT)</td>
 <td>Yaw rate feed forward <p><strong>Comment:</strong> Direct feed forward from rate setpoint to control surface output</p>   </td>
 <td>0.0 > 10.0 (0.05)</td>
 <td>0.3</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_YR_I">FW_YR_I</strong> (FLOAT)</td>
 <td>Yaw rate integrator gain <p><strong>Comment:</strong> This gain defines how much control response will result out of a steady state error. It trims any constant error.</p>   </td>
 <td>0.0 > 50.0 (0.5)</td>
 <td>0.1</td>
 <td>%/rad</td>
</tr>
<tr>
 <td><strong id="FW_YR_IMAX">FW_YR_IMAX</strong> (FLOAT)</td>
 <td>Yaw rate integrator limit <p><strong>Comment:</strong> The portion of the integrator part in the control surface deflection is limited to this value</p>   </td>
 <td>0.0 > 1.0 (0.05)</td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_YR_P">FW_YR_P</strong> (FLOAT)</td>
 <td>Yaw rate proportional gain <p><strong>Comment:</strong> This defines how much the rudder input will be commanded depending on the current body angular rate error.</p>   </td>
 <td>0.005 > 1.0 (0.005)</td>
 <td>0.05</td>
 <td>%/rad/s</td>
</tr>
<tr>
 <td><strong id="FW_Y_RMAX">FW_Y_RMAX</strong> (FLOAT)</td>
 <td>Maximum yaw rate <p><strong>Comment:</strong> This limits the maximum yaw rate the controller will output (in degrees per second).</p>   </td>
 <td>0.0 > 90.0 (0.5)</td>
 <td>50.0</td>
 <td>deg/s</td>
</tr>
</tbody></table>

## FW L1 Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="FW_CLMBOUT_DIFF">FW_CLMBOUT_DIFF</strong> (FLOAT)</td>
 <td>Climbout Altitude difference <p><strong>Comment:</strong> If the altitude error exceeds this parameter, the system will climb out with maximum throttle and minimum airspeed until it is closer than this distance to the desired altitude. Mostly used for takeoff waypoints / modes. Set to 0 to disable climbout mode (not recommended).</p>   </td>
 <td>0.0 > 150.0 (0.5)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="FW_L1_DAMPING">FW_L1_DAMPING</strong> (FLOAT)</td>
 <td>L1 damping <p><strong>Comment:</strong> Damping factor for L1 control.</p>   </td>
 <td>0.6 > 0.9 (0.05)</td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_L1_PERIOD">FW_L1_PERIOD</strong> (FLOAT)</td>
 <td>L1 period <p><strong>Comment:</strong> This is the L1 distance and defines the tracking point ahead of the aircraft its following. A value of 18-25 meters works for most aircraft. Shorten slowly during tuning until response is sharp without oscillation.</p>   </td>
 <td>12.0 > 50.0 (0.5)</td>
 <td>20.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="FW_L1_R_SLEW_MAX">FW_L1_R_SLEW_MAX</strong> (FLOAT)</td>
 <td>L1 controller roll slew rate limit <p><strong>Comment:</strong> The maxium change in roll angle setpoint per second.</p>   </td>
 <td>0 > ? (1)</td>
 <td>90.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="FW_LND_AIRSPD_SC">FW_LND_AIRSPD_SC</strong> (FLOAT)</td>
 <td>Min. airspeed scaling factor for landing <p><strong>Comment:</strong> Multiplying this factor with the minimum airspeed of the plane gives the target airspeed the landing approach. FW_AIRSPD_MIN * FW_LND_AIRSPD_SC</p>   </td>
 <td>1.0 > 1.5 (0.01)</td>
 <td>1.3</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_LND_ANG">FW_LND_ANG</strong> (FLOAT)</td>
 <td>Landing slope angle    </td>
 <td>1.0 > 15.0 (0.5)</td>
 <td>5.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_LND_EARLYCFG">FW_LND_EARLYCFG</strong> (INT32)</td>
 <td>Early landing configuration deployment <p><strong>Comment:</strong> When disabled, the landing configuration (flaps, landing airspeed, etc.) is only activated on the final approach to landing. When enabled, it is already activated when entering the final loiter-down (loiter-to-alt) waypoint before the landing approach. This shifts the (often large) altitude and airspeed errors caused by the configuration change away from the ground such that these are not so critical. It also gives the controller enough time to adapt to the new configuration such that the landing approach starts with a cleaner initial state.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_LND_FLALT">FW_LND_FLALT</strong> (FLOAT)</td>
 <td>Landing flare altitude (relative to landing altitude)    </td>
 <td>0.0 > 25.0 (0.5)</td>
 <td>3.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="FW_LND_FL_PMAX">FW_LND_FL_PMAX</strong> (FLOAT)</td>
 <td>Flare, maximum pitch <p><strong>Comment:</strong> Maximum pitch during flare, a positive sign means nose up Applied once FW_LND_FLALT is reached</p>   </td>
 <td>0 > 45.0 (0.5)</td>
 <td>15.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_LND_FL_PMIN">FW_LND_FL_PMIN</strong> (FLOAT)</td>
 <td>Flare, minimum pitch <p><strong>Comment:</strong> Minimum pitch during flare, a positive sign means nose up Applied once FW_LND_FLALT is reached</p>   </td>
 <td>0 > 15.0 (0.5)</td>
 <td>2.5</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_LND_HHDIST">FW_LND_HHDIST</strong> (FLOAT)</td>
 <td>Landing heading hold horizontal distance.
Set to 0 to disable heading hold    </td>
 <td>0 > 30.0 (0.5)</td>
 <td>15.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="FW_LND_HVIRT">FW_LND_HVIRT</strong> (FLOAT)</td>
 <td>    </td>
 <td>1.0 > 15.0 (0.5)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="FW_LND_THRTC_SC">FW_LND_THRTC_SC</strong> (FLOAT)</td>
 <td>Altitude time constant factor for landing <p><strong>Comment:</strong> Set this parameter to less than 1.0 to make TECS react faster to altitude errors during landing than during normal flight (i.e. giving efficiency and low motor wear at high altitudes but control accuracy during landing). During landing, the TECS altitude time constant (FW_T_ALT_TC) is multiplied by this value.</p>   </td>
 <td>0.2 > 1.0 (0.1)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_LND_TLALT">FW_LND_TLALT</strong> (FLOAT)</td>
 <td>Landing throttle limit altitude (relative landing altitude) <p><strong>Comment:</strong> Default of -1.0 lets the system default to applying throttle limiting at 2/3 of the flare altitude.</p>   </td>
 <td>-1.0 > 30.0 (0.5)</td>
 <td>-1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="FW_LND_USETER">FW_LND_USETER</strong> (INT32)</td>
 <td>Use terrain estimate during landing <p><strong>Comment:</strong> This is turned off by default and a waypoint or return altitude is normally used (or sea level for an arbitrary land position).</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_POSCTL_INV_ST">FW_POSCTL_INV_ST</strong> (INT32)</td>
 <td>RC stick mapping fixed-wing <p><strong>Comment:</strong> Set RC/joystick configuration for fixed-wing position and altitude controlled flight.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Normal stick configuration (airspeed on throttle stick, altitude on pitch stick)</li> 

<li><strong>1:</strong> Alternative stick configuration (altitude on throttle stick, airspeed on pitch stick)</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_P_LIM_MAX">FW_P_LIM_MAX</strong> (FLOAT)</td>
 <td>Positive pitch limit <p><strong>Comment:</strong> The maximum positive pitch the controller will output.</p>   </td>
 <td>0.0 > 60.0 (0.5)</td>
 <td>45.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_P_LIM_MIN">FW_P_LIM_MIN</strong> (FLOAT)</td>
 <td>Negative pitch limit <p><strong>Comment:</strong> The minimum negative pitch the controller will output.</p>   </td>
 <td>-60.0 > 0.0 (0.5)</td>
 <td>-45.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_R_LIM">FW_R_LIM</strong> (FLOAT)</td>
 <td>Controller roll limit <p><strong>Comment:</strong> The maximum roll the controller will output.</p>   </td>
 <td>35.0 > 65.0 (0.5)</td>
 <td>50.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FW_THR_ALT_SCL">FW_THR_ALT_SCL</strong> (FLOAT)</td>
 <td>Scale throttle by pressure change <p><strong>Comment:</strong> Automatically adjust throttle to account for decreased air density at higher altitudes. Start with a scale factor of 1.0 and adjust for different propulsion systems. When flying without airspeed sensor this will help to keep a constant performance over large altitude ranges. The default value of 0 will disable scaling.</p>   </td>
 <td>0.0 > 10.0 (0.1)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_THR_CRUISE">FW_THR_CRUISE</strong> (FLOAT)</td>
 <td>Cruise throttle <p><strong>Comment:</strong> This is the throttle setting required to achieve the desired cruise speed. Most airframes have a value of 0.5-0.7.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.6</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_THR_IDLE">FW_THR_IDLE</strong> (FLOAT)</td>
 <td>Idle throttle <p><strong>Comment:</strong> This is the minimum throttle while on the ground For aircraft with internal combustion engine this parameter should be set above desired idle rpm.</p>   </td>
 <td>0.0 > 0.4 (0.01)</td>
 <td>0.15</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_THR_LND_MAX">FW_THR_LND_MAX</strong> (FLOAT)</td>
 <td>Throttle limit during landing below throttle limit altitude <p><strong>Comment:</strong> During the flare of the autonomous landing process, this value will be set as throttle limit when the aircraft altitude is below FW_LND_TLALT.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_THR_MAX">FW_THR_MAX</strong> (FLOAT)</td>
 <td>Throttle limit max <p><strong>Comment:</strong> This is the maximum throttle % that can be used by the controller. For overpowered aircraft, this should be reduced to a value that provides sufficient thrust to climb at the maximum pitch angle PTCH_MAX.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_THR_MIN">FW_THR_MIN</strong> (FLOAT)</td>
 <td>Throttle limit min <p><strong>Comment:</strong> This is the minimum throttle % that can be used by the controller. For electric aircraft this will normally be set to zero, but can be set to a small non-zero value if a folding prop is fitted to prevent the prop from folding and unfolding repeatedly in-flight or to provide some aerodynamic drag from a turning prop to improve the descent rate. For aircraft with internal combustion engine this parameter should be set for desired idle rpm.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="FW_THR_SLEW_MAX">FW_THR_SLEW_MAX</strong> (FLOAT)</td>
 <td>Throttle max slew rate <p><strong>Comment:</strong> Maximum slew rate for the commanded throttle</p>   </td>
 <td>0.0 > 1.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_TKO_PITCH_MIN">FW_TKO_PITCH_MIN</strong> (FLOAT)</td>
 <td>Minimum pitch during takeoff    </td>
 <td>-5.0 > 30.0 (0.5)</td>
 <td>10.0</td>
 <td>deg</td>
</tr>
</tbody></table>

## FW Launch detection

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="LAUN_ALL_ON">LAUN_ALL_ON</strong> (INT32)</td>
 <td>Launch detection    </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LAUN_CAT_A">LAUN_CAT_A</strong> (FLOAT)</td>
 <td>Catapult accelerometer threshold <p><strong>Comment:</strong> LAUN_CAT_A for LAUN_CAT_T serves as threshold to trigger launch detection.</p>   </td>
 <td>0 > ? (0.5)</td>
 <td>30.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="LAUN_CAT_MDEL">LAUN_CAT_MDEL</strong> (FLOAT)</td>
 <td>Motor delay <p><strong>Comment:</strong> Delay between starting attitude control and powering up the throttle (giving throttle control to the controller) Before this timespan is up the throttle will be set to FW_THR_IDLE, set to 0 to deactivate</p>   </td>
 <td>0.0 > 10.0 (0.5)</td>
 <td>0.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="LAUN_CAT_PMAX">LAUN_CAT_PMAX</strong> (FLOAT)</td>
 <td>Maximum pitch before the throttle is powered up (during motor delay phase) <p><strong>Comment:</strong> This is an extra limit for the maximum pitch which is imposed in the phase before the throttle turns on. This allows to limit the maximum pitch angle during a bungee launch (make the launch less steep).</p>   </td>
 <td>0.0 > 45.0 (0.5)</td>
 <td>30.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="LAUN_CAT_T">LAUN_CAT_T</strong> (FLOAT)</td>
 <td>Catapult time threshold <p><strong>Comment:</strong> LAUN_CAT_A for LAUN_CAT_T serves as threshold to trigger launch detection.</p>   </td>
 <td>0.0 > 5.0 (0.05)</td>
 <td>0.05</td>
 <td>s</td>
</tr>
</tbody></table>

## FW TECS

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="FW_AIRSPD_MAX">FW_AIRSPD_MAX</strong> (FLOAT)</td>
 <td>Maximum Airspeed (CAS) <p><strong>Comment:</strong> If the CAS (calibrated airspeed) is above this value, the TECS controller will try to decrease airspeed more aggressively.</p>   </td>
 <td>0.0 > 40 (0.5)</td>
 <td>20.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_AIRSPD_MIN">FW_AIRSPD_MIN</strong> (FLOAT)</td>
 <td>Minimum Airspeed (CAS) <p><strong>Comment:</strong> If the CAS (calibrated airspeed) falls below this value, the TECS controller will try to increase airspeed more aggressively.</p>   </td>
 <td>0.0 > 40 (0.5)</td>
 <td>10.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_AIRSPD_TRIM">FW_AIRSPD_TRIM</strong> (FLOAT)</td>
 <td>Cruise Airspeed (CAS) <p><strong>Comment:</strong> The trim CAS (calibrated airspeed) of the vehicle. If an airspeed controller is active, this is the default airspeed setpoint that the controller will try to achieve if no other airspeed setpoint sources are present (e.g. through non-centered RC sticks).</p>   </td>
 <td>0.0 > 40 (0.5)</td>
 <td>15.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_GND_SPD_MIN">FW_GND_SPD_MIN</strong> (FLOAT)</td>
 <td>Minimum groundspeed <p><strong>Comment:</strong> The controller will increase the commanded airspeed to maintain this minimum groundspeed to the next waypoint.</p>   </td>
 <td>0.0 > 40 (0.5)</td>
 <td>5.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_T_ALT_TC">FW_T_ALT_TC</strong> (FLOAT)</td>
 <td>Altitude error time constant    </td>
 <td>2.0 > ? (0.5)</td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_CLMB_MAX">FW_T_CLMB_MAX</strong> (FLOAT)</td>
 <td>Maximum climb rate <p><strong>Comment:</strong> This is the best climb rate that the aircraft can achieve with the throttle set to THR_MAX and the airspeed set to the default value. For electric aircraft make sure this number can be achieved towards the end of flight when the battery voltage has reduced. The setting of this parameter can be checked by commanding a positive altitude change of 100m in loiter, RTL or guided mode. If the throttle required to climb is close to THR_MAX and the aircraft is maintaining airspeed, then this parameter is set correctly. If the airspeed starts to reduce, then the parameter is set to high, and if the throttle demand required to climb and maintain speed is noticeably less than FW_THR_MAX, then either FW_T_CLMB_MAX should be increased or FW_THR_MAX reduced.</p>   </td>
 <td>1.0 > 15.0 (0.5)</td>
 <td>5.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_T_HRATE_FF">FW_T_HRATE_FF</strong> (FLOAT)</td>
 <td>Height rate feed forward    </td>
 <td>0.0 > 1.0 (0.05)</td>
 <td>0.3</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_I_GAIN_PIT">FW_T_I_GAIN_PIT</strong> (FLOAT)</td>
 <td>Integrator gain pitch <p><strong>Comment:</strong> This is the integrator gain on the pitch part of the control loop. Increasing this gain increases the speed at which speed and height offsets are trimmed out, but reduces damping and increases overshoot. Set this value to zero to completely disable all integrator action.</p>   </td>
 <td>0.0 > 2.0 (0.05)</td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_I_GAIN_THR">FW_T_I_GAIN_THR</strong> (FLOAT)</td>
 <td>Integrator gain throttle <p><strong>Comment:</strong> This is the integrator gain on the throttle part of the control loop. Increasing this gain increases the speed at which speed and height offsets are trimmed out, but reduces damping and increases overshoot. Set this value to zero to completely disable all integrator action.</p>   </td>
 <td>0.0 > 2.0 (0.05)</td>
 <td>0.3</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_PTCH_DAMP">FW_T_PTCH_DAMP</strong> (FLOAT)</td>
 <td>Pitch damping factor <p><strong>Comment:</strong> This is the damping gain for the pitch demand loop. Increase to add damping to correct for oscillations in height. The default value of 0.0 will work well provided the pitch to servo controller has been tuned properly.</p>   </td>
 <td>0.0 > 2.0 (0.1)</td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_RLL2THR">FW_T_RLL2THR</strong> (FLOAT)</td>
 <td>Roll -> Throttle feedforward <p><strong>Comment:</strong> Increasing this gain turn increases the amount of throttle that will be used to compensate for the additional drag created by turning. Ideally this should be set to  approximately 10 x the extra sink rate in m/s created by a 45 degree bank turn. Increase this gain if the aircraft initially loses energy in turns and reduce if the aircraft initially gains energy in turns. Efficient high aspect-ratio aircraft (eg powered sailplanes) can use a lower value, whereas inefficient low aspect-ratio models (eg delta wings) can use a higher value.</p>   </td>
 <td>0.0 > 20.0 (0.5)</td>
 <td>15.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_SINK_MAX">FW_T_SINK_MAX</strong> (FLOAT)</td>
 <td>Maximum descent rate <p><strong>Comment:</strong> This sets the maximum descent rate that the controller will use. If this value is too large, the aircraft can over-speed on descent. This should be set to a value that can be achieved without exceeding the lower pitch angle limit and without over-speeding the aircraft.</p>   </td>
 <td>1.0 > 15.0 (0.5)</td>
 <td>5.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_T_SINK_MIN">FW_T_SINK_MIN</strong> (FLOAT)</td>
 <td>Minimum descent rate <p><strong>Comment:</strong> This is the sink rate of the aircraft with the throttle set to THR_MIN and flown at the same airspeed as used to measure FW_T_CLMB_MAX.</p>   </td>
 <td>1.0 > 5.0 (0.5)</td>
 <td>2.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="FW_T_SPDWEIGHT">FW_T_SPDWEIGHT</strong> (FLOAT)</td>
 <td>Speed <--> Altitude priority <p><strong>Comment:</strong> This parameter adjusts the amount of weighting that the pitch control applies to speed vs height errors. Setting it to 0.0 will cause the pitch control to control height and ignore speed errors. This will normally improve height accuracy but give larger airspeed errors. Setting it to 2.0 will cause the pitch control loop to control speed and ignore height errors. This will normally reduce airspeed errors, but give larger height errors. The default value of 1.0 allows the pitch control to simultaneously control height and speed. Note to Glider Pilots - set this parameter to 2.0 (The glider will adjust its pitch angle to maintain airspeed, ignoring changes in height).</p>   </td>
 <td>0.0 > 2.0 (1.0)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_SPD_OMEGA">FW_T_SPD_OMEGA</strong> (FLOAT)</td>
 <td>Complementary filter "omega" parameter for speed <p><strong>Comment:</strong> This is the cross-over frequency (in radians/second) of the complementary filter used to fuse longitudinal acceleration and airspeed to obtain an improved airspeed estimate. Increasing this frequency weights the solution more towards use of the airspeed sensor, whilst reducing it weights the solution more towards use of the accelerometer data.</p>   </td>
 <td>1.0 > 10.0 (0.5)</td>
 <td>2.0</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="FW_T_STE_R_TC">FW_T_STE_R_TC</strong> (FLOAT)</td>
 <td>Specific total energy rate first order filter time constant <p><strong>Comment:</strong> This filter is applied to the specific total energy rate used for throttle damping.</p>   </td>
 <td>0.0 > 2 (0.01)</td>
 <td>0.4</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_TAS_R_TC">FW_T_TAS_R_TC</strong> (FLOAT)</td>
 <td>True airspeed rate first order filter time constant <p><strong>Comment:</strong> This filter is applied to the true airspeed rate.</p>   </td>
 <td>0.0 > 2 (0.01)</td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_TAS_TC">FW_T_TAS_TC</strong> (FLOAT)</td>
 <td>True airspeed error time constant    </td>
 <td>2.0 > ? (0.5)</td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_THR_DAMP">FW_T_THR_DAMP</strong> (FLOAT)</td>
 <td>Throttle damping factor <p><strong>Comment:</strong> This is the damping gain for the throttle demand loop. Increase to add damping to correct for oscillations in speed and height.</p>   </td>
 <td>0.0 > 2.0 (0.1)</td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FW_T_VERT_ACC">FW_T_VERT_ACC</strong> (FLOAT)</td>
 <td>Maximum vertical acceleration <p><strong>Comment:</strong> This is the maximum vertical acceleration (in m/s/s) either up or down that the controller will use to correct speed or height errors. The default value of 7 m/s/s (equivalent to +- 0.7 g) allows for reasonably aggressive pitch changes if required to recover from under-speed conditions.</p>   </td>
 <td>1.0 > 10.0 (0.5)</td>
 <td>7.0</td>
 <td>m/s^2</td>
</tr>
</tbody></table>

## Failure Detector

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="FD_ESCS_EN">FD_ESCS_EN</strong> (INT32)</td>
 <td>Enable checks on ESCs that report their arming state.
If enabled, failure detector will verify that all the ESCs have successfully armed when the vehicle has transitioned to the armed state.
Timeout for receiving an acknowledgement from the ESCs is 0.3s, if no feedback is received the failure detector will auto disarm the vehicle    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FD_EXT_ATS_EN">FD_EXT_ATS_EN</strong> (INT32)</td>
 <td>Enable PWM input on AUX5 or MAIN5 (depending on board) for engaging failsafe from an external
automatic trigger system (ATS) <p><strong>Comment:</strong> External ATS is required by ASTM F3322-18.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="FD_EXT_ATS_TRIG">FD_EXT_ATS_TRIG</strong> (INT32)</td>
 <td>The PWM threshold from external automatic trigger system for engaging failsafe <p><strong>Comment:</strong> External ATS is required by ASTM F3322-18.</p>   </td>
 <td></td>
 <td>1900</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="FD_FAIL_P">FD_FAIL_P</strong> (INT32)</td>
 <td>FailureDetector Max Pitch <p><strong>Comment:</strong> Maximum pitch angle before FailureDetector triggers the attitude_failure flag. The flag triggers flight termination (if @CBRK_FLIGHTTERM = 0), which sets outputs to their failsafe values. On takeoff the flag triggers lockdown (irrespective of @CBRK_FLIGHTTERM), which disarms motors but does not set outputs to failsafe values. Setting this parameter to 0 disables the check</p>   </td>
 <td>60 > 180 </td>
 <td>60</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FD_FAIL_P_TTRI">FD_FAIL_P_TTRI</strong> (FLOAT)</td>
 <td>Pitch failure trigger time <p><strong>Comment:</strong> Seconds (decimal) that pitch has to exceed FD_FAIL_P before being considered as a failure.</p>   </td>
 <td>0.02 > 5 </td>
 <td>0.3</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="FD_FAIL_R">FD_FAIL_R</strong> (INT32)</td>
 <td>FailureDetector Max Roll <p><strong>Comment:</strong> Maximum roll angle before FailureDetector triggers the attitude_failure flag. The flag triggers flight termination (if @CBRK_FLIGHTTERM = 0), which sets outputs to their failsafe values. On takeoff the flag triggers lockdown (irrespective of @CBRK_FLIGHTTERM), which disarms motors but does not set outputs to failsafe values. Setting this parameter to 0 disables the check</p>   </td>
 <td>60 > 180 </td>
 <td>60</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="FD_FAIL_R_TTRI">FD_FAIL_R_TTRI</strong> (FLOAT)</td>
 <td>Roll failure trigger time <p><strong>Comment:</strong> Seconds (decimal) that roll has to exceed FD_FAIL_R before being considered as a failure.</p>   </td>
 <td>0.02 > 5 </td>
 <td>0.3</td>
 <td>s</td>
</tr>
</tbody></table>

## Follow target

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="NAV_FT_DST">NAV_FT_DST</strong> (FLOAT)</td>
 <td>Distance to follow target from <p><strong>Comment:</strong> The distance in meters to follow the target at</p>   </td>
 <td>1.0 > ? </td>
 <td>8.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_FT_FS">NAV_FT_FS</strong> (INT32)</td>
 <td>Side to follow target from <p><strong>Comment:</strong> The side to follow the target from (front right = 0, behind = 1, front = 2, front left = 3)</p>   </td>
 <td>0 > 3 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_FT_RS">NAV_FT_RS</strong> (FLOAT)</td>
 <td>Dynamic filtering algorithm responsiveness to target movement
lower numbers increase the responsiveness to changing long lat
but also ignore less noise    </td>
 <td>0.0 > 1.0 </td>
 <td>0.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_MIN_FT_HT">NAV_MIN_FT_HT</strong> (FLOAT)</td>
 <td>Minimum follow target altitude <p><strong>Comment:</strong> The minimum height in meters relative to home for following a target</p>   </td>
 <td>8.0 > ? </td>
 <td>8.0</td>
 <td>m</td>
</tr>
</tbody></table>

## GPS

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="GPS_1_CONFIG">GPS_1_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for Main GPS <p><strong>Comment:</strong> Configure on which serial port to run Main GPS.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>201</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_1_GNSS">GPS_1_GNSS</strong> (INT32)</td>
 <td>GNSS Systems for Primary GPS (integer bitmask) <p><strong>Comment:</strong> This integer bitmask controls the set of GNSS systems used by the receiver. Check your receiver's documentation on how many systems are supported to be used in parallel. Currently this functionality is just implemented for u-blox receivers. When no bits are set, the receiver's default configuration should be used. Set bits true to enable: 0 : Use GPS (with QZSS) 1 : Use SBAS (multiple GPS augmentation systems) 2 : Use Galileo 3 : Use BeiDou 4 : Use GLONASS</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> GPS (with QZSS)</li> 
  <li><strong>1:</strong> SBAS</li> 
  <li><strong>2:</strong> Galileo</li> 
  <li><strong>3:</strong> BeiDou</li> 
  <li><strong>4:</strong> GLONASS</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 31 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_1_PROTOCOL">GPS_1_PROTOCOL</strong> (INT32)</td>
 <td>Protocol for Main GPS <p><strong>Comment:</strong> Select the GPS protocol over serial. Auto-detection will probe all protocols, and thus is a bit slower.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto detect</li> 

<li><strong>1:</strong> u-blox</li> 

<li><strong>2:</strong> MTK</li> 

<li><strong>3:</strong> Ashtech / Trimble</li> 

<li><strong>4:</strong> Emlid Reach</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 4 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_2_CONFIG">GPS_2_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for Secondary GPS <p><strong>Comment:</strong> Configure on which serial port to run Secondary GPS.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_2_GNSS">GPS_2_GNSS</strong> (INT32)</td>
 <td>GNSS Systems for Secondary GPS (integer bitmask) <p><strong>Comment:</strong> This integer bitmask controls the set of GNSS systems used by the receiver. Check your receiver's documentation on how many systems are supported to be used in parallel. Currently this functionality is just implemented for u-blox receivers. When no bits are set, the receiver's default configuration should be used. Set bits true to enable: 0 : Use GPS (with QZSS) 1 : Use SBAS (multiple GPS augmentation systems) 2 : Use Galileo 3 : Use BeiDou 4 : Use GLONASS</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> GPS (with QZSS)</li> 
  <li><strong>1:</strong> SBAS</li> 
  <li><strong>2:</strong> Galileo</li> 
  <li><strong>3:</strong> BeiDou</li> 
  <li><strong>4:</strong> GLONASS</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 31 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_2_PROTOCOL">GPS_2_PROTOCOL</strong> (INT32)</td>
 <td>Protocol for Secondary GPS <p><strong>Comment:</strong> Select the GPS protocol over serial. Auto-detection will probe all protocols, and thus is a bit slower.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto detect</li> 

<li><strong>1:</strong> u-blox</li> 

<li><strong>2:</strong> MTK</li> 

<li><strong>3:</strong> Ashtech / Trimble</li> 

<li><strong>4:</strong> Emlid Reach</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 4 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_DUMP_COMM">GPS_DUMP_COMM</strong> (INT32)</td>
 <td>Dump GPS communication to a file <p><strong>Comment:</strong> If this is set to 1, all GPS communication data will be published via uORB, and written to the log file as gps_dump message.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Enable</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_UBX_DYNMODEL">GPS_UBX_DYNMODEL</strong> (INT32)</td>
 <td>u-blox GPS dynamic platform model <p><strong>Comment:</strong> u-blox receivers support different dynamic platform models to adjust the navigation engine to the expected application environment.</p> <strong>Values:</strong><ul>
<li><strong>2:</strong> stationary</li> 

<li><strong>4:</strong> automotive</li> 

<li><strong>6:</strong> airborne with <1g acceleration</li> 

<li><strong>7:</strong> airborne with <2g acceleration</li> 

<li><strong>8:</strong> airborne with <4g acceleration</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 9 </td>
 <td>7</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_UBX_MODE">GPS_UBX_MODE</strong> (INT32)</td>
 <td>u-blox GPS Mode <p><strong>Comment:</strong> Select the u-blox configuration setup. Most setups will use the default, including RTK and dual GPS without heading. The Heading mode requires 2 F9P devices to be attached. The main GPS will act as rover and output heading information, whereas the secondary will act as moving base, sending RTCM on UART2 to the rover GPS. RTK is still possible with this setup.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Default</li> 

<li><strong>1:</strong> Heading</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GPS_YAW_OFFSET">GPS_YAW_OFFSET</strong> (FLOAT)</td>
 <td>Heading/Yaw offset for dual antenna GPS <p><strong>Comment:</strong> Heading offset angle for dual antenna GPS setups that support heading estimation. (currently only for the Trimble MB-Two). Set this to 0 if the antennas are parallel to the forward-facing direction of the vehicle and the first antenna is in front. The offset angle increases clockwise. Set this to 90 if the first antenna is placed on the right side and the second on the left side of the vehicle.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 360 </td>
 <td>0.</td>
 <td>deg</td>
</tr>
</tbody></table>

## GPS Failure Navigation

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="NAV_GPSF_LT">NAV_GPSF_LT</strong> (FLOAT)</td>
 <td>Loiter time <p><strong>Comment:</strong> The time in seconds the system should do open loop loiter and wait for GPS recovery before it goes into flight termination. Set to 0 to disable.</p>   </td>
 <td>0.0 > 3600.0 (1)</td>
 <td>0.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="NAV_GPSF_P">NAV_GPSF_P</strong> (FLOAT)</td>
 <td>Fixed pitch angle <p><strong>Comment:</strong> Pitch in degrees during the open loop loiter</p>   </td>
 <td>-30.0 > 30.0 (0.5)</td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="NAV_GPSF_R">NAV_GPSF_R</strong> (FLOAT)</td>
 <td>Fixed bank angle <p><strong>Comment:</strong> Roll in degrees during the loiter</p>   </td>
 <td>0.0 > 30.0 (0.5)</td>
 <td>15.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="NAV_GPSF_TR">NAV_GPSF_TR</strong> (FLOAT)</td>
 <td>Thrust <p><strong>Comment:</strong> Thrust value which is set during the open loop loiter</p>   </td>
 <td>0.0 > 1.0 (0.05)</td>
 <td>0.0</td>
 <td>norm</td>
</tr>
</tbody></table>

## Geofence

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="GF_ACTION">GF_ACTION</strong> (INT32)</td>
 <td>Geofence violation action <p><strong>Comment:</strong> Note: Setting this value to 4 enables flight termination, which will kill the vehicle on violation of the fence. Due to the inherent danger of this, this function is disabled using a software circuit breaker, which needs to be reset to 0 to really shut down the system.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> None</li> 

<li><strong>1:</strong> Warning</li> 

<li><strong>2:</strong> Hold mode</li> 

<li><strong>3:</strong> Return mode</li> 

<li><strong>4:</strong> Terminate</li> 

<li><strong>5:</strong> Land mode</li> 
</ul>
  </td>
 <td>0 > 5 </td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GF_ALTMODE">GF_ALTMODE</strong> (INT32)</td>
 <td>Geofence altitude mode <p><strong>Comment:</strong> Select which altitude (AMSL) source should be used for geofence calculations.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Autopilot estimator global position altitude (GPS)</li> 

<li><strong>1:</strong> Raw barometer altitude (assuming standard atmospheric pressure)</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GF_COUNT">GF_COUNT</strong> (INT32)</td>
 <td>Geofence counter limit <p><strong>Comment:</strong> Set how many subsequent position measurements outside of the fence are needed before geofence violation is triggered</p>   </td>
 <td>-1 > 10 (1)</td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GF_MAX_HOR_DIST">GF_MAX_HOR_DIST</strong> (FLOAT)</td>
 <td>Max horizontal distance in meters <p><strong>Comment:</strong> Maximum horizontal distance in meters the vehicle can be from home before triggering a geofence action. Disabled if 0.</p>   </td>
 <td>0 > 10000 (1)</td>
 <td>0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="GF_MAX_VER_DIST">GF_MAX_VER_DIST</strong> (FLOAT)</td>
 <td>Max vertical distance in meters <p><strong>Comment:</strong> Maximum vertical distance in meters the vehicle can be from home before triggering a geofence action. Disabled if 0.</p>   </td>
 <td>0 > 10000 (1)</td>
 <td>0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="GF_SOURCE">GF_SOURCE</strong> (INT32)</td>
 <td>Geofence source <p><strong>Comment:</strong> Select which position source should be used. Selecting GPS instead of global position makes sure that there is no dependence on the position estimator 0 = global position, 1 = GPS</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> GPOS</li> 

<li><strong>1:</strong> GPS</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Hover Thrust Estimator

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="HTE_ACC_GATE">HTE_ACC_GATE</strong> (FLOAT)</td>
 <td>Gate size for acceleration fusion <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>1.0 > 10.0 </td>
 <td>3.0</td>
 <td>SD</td>
</tr>
<tr>
 <td><strong id="HTE_HT_ERR_INIT">HTE_HT_ERR_INIT</strong> (FLOAT)</td>
 <td>1-sigma initial hover thrust uncertainty <p><strong>Comment:</strong> Sets the number of standard deviations used by the innovation consistency test.</p>   </td>
 <td>0.0 > 1.0 </td>
 <td>0.1</td>
 <td>normalized_thrust</td>
</tr>
<tr>
 <td><strong id="HTE_HT_NOISE">HTE_HT_NOISE</strong> (FLOAT)</td>
 <td>Hover thrust process noise <p><strong>Comment:</strong> Reduce to make the hover thrust estimate more stable, increase if the real hover thrust is expected to change quickly over time.</p>   </td>
 <td>0.0001 > 1.0 </td>
 <td>0.0036</td>
 <td>normalized_thrust/s</td>
</tr>
</tbody></table>

## Iridium SBD

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="ISBD_CONFIG">ISBD_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for Iridium (with MAVLink) <p><strong>Comment:</strong> Configure on which serial port to run Iridium (with MAVLink).</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="ISBD_READ_INT">ISBD_READ_INT</strong> (INT32)</td>
 <td>Satellite radio read interval. Only required to be nonzero if data is not sent using a ring call    </td>
 <td>0 > 5000 </td>
 <td>0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="ISBD_SBD_TIMEOUT">ISBD_SBD_TIMEOUT</strong> (INT32)</td>
 <td>Iridium SBD session timeout    </td>
 <td>0 > 300 </td>
 <td>60</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="ISBD_STACK_TIME">ISBD_STACK_TIME</strong> (INT32)</td>
 <td>Time [ms] the Iridium driver will wait for additional mavlink messages to combine them into one SBD message
Value 0 turns the functionality off    </td>
 <td>0 > 500 </td>
 <td>0</td>
 <td>ms</td>
</tr>
</tbody></table>

## Land Detector

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="LNDFW_AIRSPD_MAX">LNDFW_AIRSPD_MAX</strong> (FLOAT)</td>
 <td>Airspeed max <p><strong>Comment:</strong> Maximum airspeed allowed in the landed state (m/s)</p>   </td>
 <td>4 > 20 </td>
 <td>6.00</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LNDFW_VEL_XY_MAX">LNDFW_VEL_XY_MAX</strong> (FLOAT)</td>
 <td>Fixedwing max horizontal velocity <p><strong>Comment:</strong> Maximum horizontal velocity allowed in the landed state (m/s)</p>   </td>
 <td>0.5 > 10 </td>
 <td>5.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LNDFW_VEL_Z_MAX">LNDFW_VEL_Z_MAX</strong> (FLOAT)</td>
 <td>Fixedwing max climb rate <p><strong>Comment:</strong> Maximum vertical velocity allowed in the landed state (m/s up and down)</p>   </td>
 <td>0.1 > 20 </td>
 <td>3.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LNDFW_XYACC_MAX">LNDFW_XYACC_MAX</strong> (FLOAT)</td>
 <td>Fixedwing max horizontal acceleration <p><strong>Comment:</strong> Maximum horizontal (x,y body axes) acceleration allowed in the landed state (m/s^2)</p>   </td>
 <td>2 > 15 </td>
 <td>8.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="LNDMC_ALT_GND">LNDMC_ALT_GND</strong> (FLOAT)</td>
 <td>Ground effect altitude for multicopters <p><strong>Comment:</strong> The height above ground below which ground effect creates barometric altitude errors. A negative value indicates no ground effect.</p>   </td>
 <td>-1 > ? </td>
 <td>-1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LNDMC_ALT_MAX">LNDMC_ALT_MAX</strong> (FLOAT)</td>
 <td>Maximum altitude for multicopters <p><strong>Comment:</strong> The system will obey this limit as a hard altitude limit. This setting will be consolidated with the GF_MAX_VER_DIST parameter. A negative value indicates no altitude limitation.</p>   </td>
 <td>-1 > 10000 </td>
 <td>-1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LNDMC_ROT_MAX">LNDMC_ROT_MAX</strong> (FLOAT)</td>
 <td>Multicopter max rotation <p><strong>Comment:</strong> Maximum allowed angular velocity around each axis allowed in the landed state.</p>   </td>
 <td></td>
 <td>20.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="LNDMC_XY_VEL_MAX">LNDMC_XY_VEL_MAX</strong> (FLOAT)</td>
 <td>Multicopter max horizontal velocity <p><strong>Comment:</strong> Maximum horizontal velocity allowed in the landed state (m/s)</p>   </td>
 <td></td>
 <td>1.5</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LNDMC_Z_VEL_MAX">LNDMC_Z_VEL_MAX</strong> (FLOAT)</td>
 <td>Multicopter max climb rate <p><strong>Comment:</strong> Maximum vertical velocity allowed in the landed state (m/s up and down)</p>   </td>
 <td></td>
 <td>0.50</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LND_FLIGHT_T_HI">LND_FLIGHT_T_HI</strong> (INT32)</td>
 <td>Total flight time in microseconds <p><strong>Comment:</strong> Total flight time of this autopilot. Higher 32 bits of the value. Flight time in microseconds = (LND_FLIGHT_T_HI << 32) | LND_FLIGHT_T_LO.</p>   </td>
 <td>0 > ? </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LND_FLIGHT_T_LO">LND_FLIGHT_T_LO</strong> (INT32)</td>
 <td>Total flight time in microseconds <p><strong>Comment:</strong> Total flight time of this autopilot. Lower 32 bits of the value. Flight time in microseconds = (LND_FLIGHT_T_HI << 32) | LND_FLIGHT_T_LO.</p>   </td>
 <td>0 > ? </td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Landing target Estimator

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="LTEST_ACC_UNC">LTEST_ACC_UNC</strong> (FLOAT)</td>
 <td>Acceleration uncertainty <p><strong>Comment:</strong> Variance of acceleration measurement used for landing target position prediction. Higher values results in tighter following of the measurements and more lenient outlier rejection</p>   </td>
 <td>0.01 > ? </td>
 <td>10.0</td>
 <td>(m/s^2)^2</td>
</tr>
<tr>
 <td><strong id="LTEST_MEAS_UNC">LTEST_MEAS_UNC</strong> (FLOAT)</td>
 <td>Landing target measurement uncertainty <p><strong>Comment:</strong> Variance of the landing target measurement from the driver. Higher values results in less agressive following of the measurement and a smoother output as well as fewer rejected measurements.</p>   </td>
 <td></td>
 <td>0.005</td>
 <td>tan(rad)^2</td>
</tr>
<tr>
 <td><strong id="LTEST_MODE">LTEST_MODE</strong> (INT32)</td>
 <td>Landing target mode <p><strong>Comment:</strong> Configure the mode of the landing target. Depending on the mode, the landing target observations are used differently to aid position estimation. Mode Moving:     The landing target may be moving around while in the field of view of the vehicle. Landing target measurements are not used to aid positioning. Mode Stationary: The landing target is stationary. Measured velocity w.r.t. the landing target is used to aid velocity estimation.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Moving</li> 

<li><strong>1:</strong> Stationary</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LTEST_POS_UNC_IN">LTEST_POS_UNC_IN</strong> (FLOAT)</td>
 <td>Initial landing target position uncertainty <p><strong>Comment:</strong> Initial variance of the relative landing target position in x and y direction</p>   </td>
 <td>0.001 > ? </td>
 <td>0.1</td>
 <td>m^2</td>
</tr>
<tr>
 <td><strong id="LTEST_SCALE_X">LTEST_SCALE_X</strong> (FLOAT)</td>
 <td>Scale factor for sensor measurements in sensor x axis <p><strong>Comment:</strong> Landing target x measurements are scaled by this factor before being used</p>   </td>
 <td>0.01 > ? </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LTEST_SCALE_Y">LTEST_SCALE_Y</strong> (FLOAT)</td>
 <td>Scale factor for sensor measurements in sensor y axis <p><strong>Comment:</strong> Landing target y measurements are scaled by this factor before being used</p>   </td>
 <td>0.01 > ? </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LTEST_VEL_UNC_IN">LTEST_VEL_UNC_IN</strong> (FLOAT)</td>
 <td>Initial landing target velocity uncertainty <p><strong>Comment:</strong> Initial variance of the relative landing target velocity in x and y direction</p>   </td>
 <td>0.001 > ? </td>
 <td>0.1</td>
 <td>(m/s)^2</td>
</tr>
</tbody></table>

## Local Position Estimator

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="LPE_ACC_XY">LPE_ACC_XY</strong> (FLOAT)</td>
 <td>Accelerometer xy noise density <p><strong>Comment:</strong> Data sheet noise density = 150ug/sqrt(Hz) = 0.0015 m/s^2/sqrt(Hz) Larger than data sheet to account for tilt error.</p>   </td>
 <td>0.00001 > 2 </td>
 <td>0.012</td>
 <td>m/s^2/sqrt(Hz)</td>
</tr>
<tr>
 <td><strong id="LPE_ACC_Z">LPE_ACC_Z</strong> (FLOAT)</td>
 <td>Accelerometer z noise density <p><strong>Comment:</strong> Data sheet noise density = 150ug/sqrt(Hz) = 0.0015 m/s^2/sqrt(Hz)</p>   </td>
 <td>0.00001 > 2 </td>
 <td>0.02</td>
 <td>m/s^2/sqrt(Hz)</td>
</tr>
<tr>
 <td><strong id="LPE_BAR_Z">LPE_BAR_Z</strong> (FLOAT)</td>
 <td>Barometric presssure altitude z standard deviation    </td>
 <td>0.01 > 100 </td>
 <td>3.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_EPH_MAX">LPE_EPH_MAX</strong> (FLOAT)</td>
 <td>Max EPH allowed for GPS initialization    </td>
 <td>1.0 > 5.0 </td>
 <td>3.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_EPV_MAX">LPE_EPV_MAX</strong> (FLOAT)</td>
 <td>Max EPV allowed for GPS initialization    </td>
 <td>1.0 > 5.0 </td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_FAKE_ORIGIN">LPE_FAKE_ORIGIN</strong> (INT32)</td>
 <td>Enable publishing of a fake global position (e.g for AUTO missions using Optical Flow)
by initializing the estimator to the LPE_LAT/LON parameters when global information is unavailable    </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LPE_FGYRO_HP">LPE_FGYRO_HP</strong> (FLOAT)</td>
 <td>Flow gyro high pass filter cut off frequency    </td>
 <td>0 > 2 </td>
 <td>0.001</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="LPE_FLW_OFF_Z">LPE_FLW_OFF_Z</strong> (FLOAT)</td>
 <td>Optical flow z offset from center    </td>
 <td>-1 > 1 </td>
 <td>0.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_FLW_QMIN">LPE_FLW_QMIN</strong> (INT32)</td>
 <td>Optical flow minimum quality threshold    </td>
 <td>0 > 255 </td>
 <td>150</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LPE_FLW_R">LPE_FLW_R</strong> (FLOAT)</td>
 <td>Optical flow rotation (roll/pitch) noise gain    </td>
 <td>0.1 > 10.0 </td>
 <td>7.0</td>
 <td>m/s/rad</td>
</tr>
<tr>
 <td><strong id="LPE_FLW_RR">LPE_FLW_RR</strong> (FLOAT)</td>
 <td>Optical flow angular velocity noise gain    </td>
 <td>0.0 > 10.0 </td>
 <td>7.0</td>
 <td>m/rad</td>
</tr>
<tr>
 <td><strong id="LPE_FLW_SCALE">LPE_FLW_SCALE</strong> (FLOAT)</td>
 <td>Optical flow scale    </td>
 <td>0.1 > 10.0 </td>
 <td>1.3</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_FUSION">LPE_FUSION</strong> (INT32)</td>
 <td>Integer bitmask controlling data fusion <p><strong>Comment:</strong> Set bits in the following positions to enable: 0 : Set to true to fuse GPS data if available, also requires GPS for altitude init 1 : Set to true to fuse optical flow data if available 2 : Set to true to fuse vision position 3 : Set to true to enable landing target 4 : Set to true to fuse land detector 5 : Set to true to publish AGL as local position down component 6 : Set to true to enable flow gyro compensation 7 : Set to true to enable baro fusion default (145 - GPS, baro, land detector)</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> fuse GPS, requires GPS for alt. init</li> 
  <li><strong>1:</strong> fuse optical flow</li> 
  <li><strong>2:</strong> fuse vision position</li> 
  <li><strong>3:</strong> fuse landing target</li> 
  <li><strong>4:</strong> fuse land detector</li> 
  <li><strong>5:</strong> pub agl as lpos down</li> 
  <li><strong>6:</strong> flow gyro compensation</li> 
  <li><strong>7:</strong> fuse baro</li> 
</ul>
 </td>
 <td>0 > 255 </td>
 <td>145</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LPE_GPS_DELAY">LPE_GPS_DELAY</strong> (FLOAT)</td>
 <td>GPS delay compensaton    </td>
 <td>0 > 0.4 </td>
 <td>0.29</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="LPE_GPS_VXY">LPE_GPS_VXY</strong> (FLOAT)</td>
 <td>GPS xy velocity standard deviation.
EPV used if greater than this value    </td>
 <td>0.01 > 2 </td>
 <td>0.25</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LPE_GPS_VZ">LPE_GPS_VZ</strong> (FLOAT)</td>
 <td>GPS z velocity standard deviation    </td>
 <td>0.01 > 2 </td>
 <td>0.25</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LPE_GPS_XY">LPE_GPS_XY</strong> (FLOAT)</td>
 <td>Minimum GPS xy standard deviation, uses reported EPH if greater    </td>
 <td>0.01 > 5 </td>
 <td>1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_GPS_Z">LPE_GPS_Z</strong> (FLOAT)</td>
 <td>Minimum GPS z standard deviation, uses reported EPV if greater    </td>
 <td>0.01 > 200 </td>
 <td>3.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_LAND_VXY">LPE_LAND_VXY</strong> (FLOAT)</td>
 <td>Land detector xy velocity standard deviation    </td>
 <td>0.01 > 10.0 </td>
 <td>0.05</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LPE_LAND_Z">LPE_LAND_Z</strong> (FLOAT)</td>
 <td>Land detector z standard deviation    </td>
 <td>0.001 > 10.0 </td>
 <td>0.03</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_LAT">LPE_LAT</strong> (FLOAT)</td>
 <td>Local origin latitude for nav w/o GPS    </td>
 <td>-90 > 90 </td>
 <td>47.397742</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="LPE_LDR_OFF_Z">LPE_LDR_OFF_Z</strong> (FLOAT)</td>
 <td>Lidar z offset from center of vehicle +down    </td>
 <td>-1 > 1 </td>
 <td>0.00</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_LDR_Z">LPE_LDR_Z</strong> (FLOAT)</td>
 <td>Lidar z standard deviation    </td>
 <td>0.01 > 1 </td>
 <td>0.03</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_LON">LPE_LON</strong> (FLOAT)</td>
 <td>Local origin longitude for nav w/o GPS    </td>
 <td>-180 > 180 </td>
 <td>8.545594</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="LPE_LT_COV">LPE_LT_COV</strong> (FLOAT)</td>
 <td>Minimum landing target standard covariance, uses reported covariance if greater    </td>
 <td>0.0 > 10 </td>
 <td>0.0001</td>
 <td>m^2</td>
</tr>
<tr>
 <td><strong id="LPE_PN_B">LPE_PN_B</strong> (FLOAT)</td>
 <td>Accel bias propagation noise density    </td>
 <td>0 > 1 </td>
 <td>1e-3</td>
 <td>m/s^3/sqrt(Hz)</td>
</tr>
<tr>
 <td><strong id="LPE_PN_P">LPE_PN_P</strong> (FLOAT)</td>
 <td>Position propagation noise density <p><strong>Comment:</strong> Increase to trust measurements more. Decrease to trust model more.</p>   </td>
 <td>0 > 1 </td>
 <td>0.1</td>
 <td>m/s/sqrt(Hz)</td>
</tr>
<tr>
 <td><strong id="LPE_PN_T">LPE_PN_T</strong> (FLOAT)</td>
 <td>Terrain random walk noise density, hilly/outdoor (0.1), flat/Indoor (0.001)    </td>
 <td>0 > 1 </td>
 <td>0.001</td>
 <td>m/s/sqrt(Hz)</td>
</tr>
<tr>
 <td><strong id="LPE_PN_V">LPE_PN_V</strong> (FLOAT)</td>
 <td>Velocity propagation noise density <p><strong>Comment:</strong> Increase to trust measurements more. Decrease to trust model more.</p>   </td>
 <td>0 > 1 </td>
 <td>0.1</td>
 <td>m/s^2/sqrt(Hz)</td>
</tr>
<tr>
 <td><strong id="LPE_SNR_OFF_Z">LPE_SNR_OFF_Z</strong> (FLOAT)</td>
 <td>Sonar z offset from center of vehicle +down    </td>
 <td>-1 > 1 </td>
 <td>0.00</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_SNR_Z">LPE_SNR_Z</strong> (FLOAT)</td>
 <td>Sonar z standard deviation    </td>
 <td>0.01 > 1 </td>
 <td>0.05</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_T_MAX_GRADE">LPE_T_MAX_GRADE</strong> (FLOAT)</td>
 <td>Terrain maximum percent grade, hilly/outdoor (100 = 45 deg), flat/Indoor (0 = 0 deg)
Used to calculate increased terrain random walk nosie due to movement    </td>
 <td>0 > 100 </td>
 <td>1.0</td>
 <td>%</td>
</tr>
<tr>
 <td><strong id="LPE_VIC_P">LPE_VIC_P</strong> (FLOAT)</td>
 <td>Vicon position standard deviation    </td>
 <td>0.0001 > 1 </td>
 <td>0.001</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_VIS_DELAY">LPE_VIS_DELAY</strong> (FLOAT)</td>
 <td>Vision delay compensaton <p><strong>Comment:</strong> Set to zero to enable automatic compensation from measurement timestamps</p>   </td>
 <td>0 > 0.1 </td>
 <td>0.1</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="LPE_VIS_XY">LPE_VIS_XY</strong> (FLOAT)</td>
 <td>Vision xy standard deviation    </td>
 <td>0.01 > 1 </td>
 <td>0.1</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_VIS_Z">LPE_VIS_Z</strong> (FLOAT)</td>
 <td>Vision z standard deviation    </td>
 <td>0.01 > 100 </td>
 <td>0.5</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="LPE_VXY_PUB">LPE_VXY_PUB</strong> (FLOAT)</td>
 <td>Required velocity xy standard deviation to publish position    </td>
 <td>0.01 > 1.0 </td>
 <td>0.3</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="LPE_X_LP">LPE_X_LP</strong> (FLOAT)</td>
 <td>Cut frequency for state publication    </td>
 <td>5 > 1000 </td>
 <td>5.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="LPE_Z_PUB">LPE_Z_PUB</strong> (FLOAT)</td>
 <td>Required z standard deviation to publish altitude/ terrain    </td>
 <td>0.3 > 5.0 </td>
 <td>1.0</td>
 <td>m</td>
</tr>
</tbody></table>

## MAVLink

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="MAV_0_CONFIG">MAV_0_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for MAVLink (instance 0) <p><strong>Comment:</strong> Configure on which serial port to run MAVLink.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>101</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_0_FORWARD">MAV_0_FORWARD</strong> (INT32)</td>
 <td>Enable MAVLink Message forwarding for instance 0 <p><strong>Comment:</strong> If enabled, forward incoming MAVLink messages to other MAVLink ports if the message is either broadcast or the target is not the autopilot. This allows for example a GCS to talk to a camera that is connected to the autopilot via MAVLink (on a different link than the GCS).</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_0_MODE">MAV_0_MODE</strong> (INT32)</td>
 <td>MAVLink Mode for instance 0 <p><strong>Comment:</strong> The MAVLink Mode defines the set of streamed messages (for example the vehicle's attitude) and their sending rates.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Normal</li> 

<li><strong>1:</strong> Custom</li> 

<li><strong>2:</strong> Onboard</li> 

<li><strong>3:</strong> OSD</li> 

<li><strong>4:</strong> Magic</li> 

<li><strong>5:</strong> Config</li> 

<li><strong>7:</strong> Minimal</li> 

<li><strong>8:</strong> External Vision</li> 

<li><strong>10:</strong> Gimbal</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_0_RADIO_CTL">MAV_0_RADIO_CTL</strong> (INT32)</td>
 <td>Enable software throttling of mavlink on instance 0 <p><strong>Comment:</strong> If enabled, MAVLink messages will be throttled according to `txbuf` field reported by radio_status. Requires a radio to send the mavlink message RADIO_STATUS.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_0_RATE">MAV_0_RATE</strong> (INT32)</td>
 <td>Maximum MAVLink sending rate for instance 0 <p><strong>Comment:</strong> Configure the maximum sending rate for the MAVLink streams in Bytes/sec. If the configured streams exceed the maximum rate, the sending rate of each stream is automatically decreased. If this is set to 0 a value of half of the theoretical maximum bandwidth is used. This corresponds to baudrate/20 Bytes/s (baudrate/10 = maximum data rate on 8N1-configured links).</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>0 > ? </td>
 <td>1200</td>
 <td>B/s</td>
</tr>
<tr>
 <td><strong id="MAV_1_CONFIG">MAV_1_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for MAVLink (instance 1) <p><strong>Comment:</strong> Configure on which serial port to run MAVLink.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_1_FORWARD">MAV_1_FORWARD</strong> (INT32)</td>
 <td>Enable MAVLink Message forwarding for instance 1 <p><strong>Comment:</strong> If enabled, forward incoming MAVLink messages to other MAVLink ports if the message is either broadcast or the target is not the autopilot. This allows for example a GCS to talk to a camera that is connected to the autopilot via MAVLink (on a different link than the GCS).</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_1_MODE">MAV_1_MODE</strong> (INT32)</td>
 <td>MAVLink Mode for instance 1 <p><strong>Comment:</strong> The MAVLink Mode defines the set of streamed messages (for example the vehicle's attitude) and their sending rates.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Normal</li> 

<li><strong>1:</strong> Custom</li> 

<li><strong>2:</strong> Onboard</li> 

<li><strong>3:</strong> OSD</li> 

<li><strong>4:</strong> Magic</li> 

<li><strong>5:</strong> Config</li> 

<li><strong>7:</strong> Minimal</li> 

<li><strong>8:</strong> External Vision</li> 

<li><strong>10:</strong> Gimbal</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_1_RADIO_CTL">MAV_1_RADIO_CTL</strong> (INT32)</td>
 <td>Enable software throttling of mavlink on instance 1 <p><strong>Comment:</strong> If enabled, MAVLink messages will be throttled according to `txbuf` field reported by radio_status. Requires a radio to send the mavlink message RADIO_STATUS.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_1_RATE">MAV_1_RATE</strong> (INT32)</td>
 <td>Maximum MAVLink sending rate for instance 1 <p><strong>Comment:</strong> Configure the maximum sending rate for the MAVLink streams in Bytes/sec. If the configured streams exceed the maximum rate, the sending rate of each stream is automatically decreased. If this is set to 0 a value of half of the theoretical maximum bandwidth is used. This corresponds to baudrate/20 Bytes/s (baudrate/10 = maximum data rate on 8N1-configured links).</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>0 > ? </td>
 <td>0</td>
 <td>B/s</td>
</tr>
<tr>
 <td><strong id="MAV_2_CONFIG">MAV_2_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for MAVLink (instance 2) <p><strong>Comment:</strong> Configure on which serial port to run MAVLink.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_2_FORWARD">MAV_2_FORWARD</strong> (INT32)</td>
 <td>Enable MAVLink Message forwarding for instance 2 <p><strong>Comment:</strong> If enabled, forward incoming MAVLink messages to other MAVLink ports if the message is either broadcast or the target is not the autopilot. This allows for example a GCS to talk to a camera that is connected to the autopilot via MAVLink (on a different link than the GCS).</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_2_MODE">MAV_2_MODE</strong> (INT32)</td>
 <td>MAVLink Mode for instance 2 <p><strong>Comment:</strong> The MAVLink Mode defines the set of streamed messages (for example the vehicle's attitude) and their sending rates.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Normal</li> 

<li><strong>1:</strong> Custom</li> 

<li><strong>2:</strong> Onboard</li> 

<li><strong>3:</strong> OSD</li> 

<li><strong>4:</strong> Magic</li> 

<li><strong>5:</strong> Config</li> 

<li><strong>7:</strong> Minimal</li> 

<li><strong>8:</strong> External Vision</li> 

<li><strong>10:</strong> Gimbal</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_2_RADIO_CTL">MAV_2_RADIO_CTL</strong> (INT32)</td>
 <td>Enable software throttling of mavlink on instance 2 <p><strong>Comment:</strong> If enabled, MAVLink messages will be throttled according to `txbuf` field reported by radio_status. Requires a radio to send the mavlink message RADIO_STATUS.</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_2_RATE">MAV_2_RATE</strong> (INT32)</td>
 <td>Maximum MAVLink sending rate for instance 2 <p><strong>Comment:</strong> Configure the maximum sending rate for the MAVLink streams in Bytes/sec. If the configured streams exceed the maximum rate, the sending rate of each stream is automatically decreased. If this is set to 0 a value of half of the theoretical maximum bandwidth is used. This corresponds to baudrate/20 Bytes/s (baudrate/10 = maximum data rate on 8N1-configured links).</p>   <p><b>Reboot required:</b> True</p>
</td>
 <td>0 > ? </td>
 <td>0</td>
 <td>B/s</td>
</tr>
<tr>
 <td><strong id="MAV_BROADCAST">MAV_BROADCAST</strong> (INT32)</td>
 <td>Broadcast heartbeats on local network <p><strong>Comment:</strong> This allows a ground control station to automatically find the drone on the local network.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Never broadcast</li> 

<li><strong>1:</strong> Always broadcast</li> 

<li><strong>2:</strong> Only multicast</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_COMP_ID">MAV_COMP_ID</strong> (INT32)</td>
 <td>MAVLink component ID    <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 250 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_FWDEXTSP">MAV_FWDEXTSP</strong> (INT32)</td>
 <td>Forward external setpoint messages <p><strong>Comment:</strong> If set to 1 incoming external setpoint messages will be directly forwarded to the controllers if in offboard control mode</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_HASH_CHK_EN">MAV_HASH_CHK_EN</strong> (INT32)</td>
 <td>Parameter hash check <p><strong>Comment:</strong> Disabling the parameter hash check functionality will make the mavlink instance stream parameters continuously.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_HB_FORW_EN">MAV_HB_FORW_EN</strong> (INT32)</td>
 <td>Hearbeat message forwarding <p><strong>Comment:</strong> The mavlink hearbeat message will not be forwarded if this parameter is set to 'disabled'. The main reason for disabling heartbeats to be forwarded is because they confuse dronekit.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_ODOM_LP">MAV_ODOM_LP</strong> (INT32)</td>
 <td>Activate ODOMETRY loopback <p><strong>Comment:</strong> If set, it gets the data from 'vehicle_visual_odometry' instead of 'vehicle_odometry' serving as a loopback of the received ODOMETRY messages on the Mavlink receiver.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_PROTO_VER">MAV_PROTO_VER</strong> (INT32)</td>
 <td>MAVLink protocol version  <strong>Values:</strong><ul>
<li><strong>0:</strong> Default to 1, switch to 2 if GCS sends version 2</li> 

<li><strong>1:</strong> Always use version 1</li> 

<li><strong>2:</strong> Always use version 2</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_RADIO_TOUT">MAV_RADIO_TOUT</strong> (INT32)</td>
 <td>Timeout in seconds for the RADIO_STATUS reports coming in <p><strong>Comment:</strong> If the connected radio stops reporting RADIO_STATUS for a certain time, a warning is triggered and, if MAV_X_RADIO_CTL is enabled, the software-flow control is reset.</p>   </td>
 <td>1 > 250 </td>
 <td>5</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="MAV_SIK_RADIO_ID">MAV_SIK_RADIO_ID</strong> (INT32)</td>
 <td>MAVLink SiK Radio ID <p><strong>Comment:</strong> When non-zero the MAVLink app will attempt to configure the SiK radio to this ID and re-set the parameter to 0. If the value is negative it will reset the complete radio config to factory defaults. Only applies if this mavlink instance is going through a SiK radio</p>   </td>
 <td>-1 > 240 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_SYS_ID">MAV_SYS_ID</strong> (INT32)</td>
 <td>MAVLink system ID    <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 250 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_TYPE">MAV_TYPE</strong> (INT32)</td>
 <td>MAVLink airframe type  <strong>Values:</strong><ul>
<li><strong>0:</strong> Generic micro air vehicle</li> 

<li><strong>1:</strong> Fixed wing aircraft</li> 

<li><strong>2:</strong> Quadrotor</li> 

<li><strong>3:</strong> Coaxial helicopter</li> 

<li><strong>4:</strong> Normal helicopter with tail rotor</li> 

<li><strong>5:</strong> Ground installation</li> 

<li><strong>6:</strong> Operator control unit / ground control station</li> 

<li><strong>7:</strong> Airship, controlled</li> 

<li><strong>8:</strong> Free balloon, uncontrolled</li> 

<li><strong>9:</strong> Rocket</li> 

<li><strong>10:</strong> Ground rover</li> 

<li><strong>11:</strong> Surface vessel, boat, ship</li> 

<li><strong>12:</strong> Submarine</li> 

<li><strong>13:</strong> Hexarotor</li> 

<li><strong>14:</strong> Octorotor</li> 

<li><strong>15:</strong> Tricopter</li> 

<li><strong>16:</strong> Flapping wing</li> 

<li><strong>17:</strong> Kite</li> 

<li><strong>18:</strong> Onboard companion controller</li> 

<li><strong>19:</strong> Two-rotor VTOL using control surfaces in vertical operation in addition. Tailsitter.</li> 

<li><strong>20:</strong> Quad-rotor VTOL using a V-shaped quad config in vertical operation. Tailsitter.</li> 

<li><strong>21:</strong> Tiltrotor VTOL</li> 

<li><strong>22:</strong> VTOL reserved 2</li> 

<li><strong>23:</strong> VTOL reserved 3</li> 

<li><strong>24:</strong> VTOL reserved 4</li> 

<li><strong>25:</strong> VTOL reserved 5</li> 

<li><strong>26:</strong> Onboard gimbal</li> 

<li><strong>27:</strong> Onboard ADSB peripheral</li> 
</ul>
  </td>
 <td>1 > 27 </td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MAV_USEHILGPS">MAV_USEHILGPS</strong> (INT32)</td>
 <td>Use/Accept HIL GPS message even if not in HIL mode <p><strong>Comment:</strong> If set to 1 incoming HIL GPS messages are parsed.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
</tbody></table>

## Mission

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="COM_OBS_AVOID">COM_OBS_AVOID</strong> (INT32)</td>
 <td>Flag to enable obstacle avoidance    </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="COM_TAKEOFF_ACT">COM_TAKEOFF_ACT</strong> (INT32)</td>
 <td>Action after TAKEOFF has been accepted <p><strong>Comment:</strong> The mode transition after TAKEOFF has completed successfully.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Hold</li> 

<li><strong>1:</strong> Mission (if valid)</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MIS_DIST_1WP">MIS_DIST_1WP</strong> (FLOAT)</td>
 <td>Maximal horizontal distance from home to first waypoint <p><strong>Comment:</strong> Failsafe check to prevent running mission stored from previous flight at a new takeoff location. Set a value of zero or less to disable. The mission will not be started if the current waypoint is more distant than MIS_DIS_1WP from the home position.</p>   </td>
 <td>0 > 10000 (100)</td>
 <td>900</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="MIS_DIST_WPS">MIS_DIST_WPS</strong> (FLOAT)</td>
 <td>Maximal horizontal distance between waypoint <p><strong>Comment:</strong> Failsafe check to prevent running missions which are way too big. Set a value of zero or less to disable. The mission will not be started if any distance between two subsequent waypoints is greater than MIS_DIST_WPS.</p>   </td>
 <td>0 > 10000 (100)</td>
 <td>900</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="MIS_LTRMIN_ALT">MIS_LTRMIN_ALT</strong> (FLOAT)</td>
 <td>Minimum Loiter altitude <p><strong>Comment:</strong> This is the minimum altitude the system will always obey. The intent is to stay out of ground effect. set to -1, if there shouldn't be a minimum loiter altitude</p>   </td>
 <td>-1 > 80 (0.5)</td>
 <td>-1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="MIS_MNT_YAW_CTL">MIS_MNT_YAW_CTL</strong> (INT32)</td>
 <td>Enable yaw control of the mount. (Only affects multicopters and ROI mission items) <p><strong>Comment:</strong> If enabled, yaw commands will be sent to the mount and the vehicle will follow its heading towards the flight direction. If disabled, the vehicle will yaw towards the ROI.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Enable</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MIS_TAKEOFF_ALT">MIS_TAKEOFF_ALT</strong> (FLOAT)</td>
 <td>Take-off altitude <p><strong>Comment:</strong> This is the minimum altitude the system will take off to.</p>   </td>
 <td>0 > 80 (0.5)</td>
 <td>2.5</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="MIS_TAKEOFF_REQ">MIS_TAKEOFF_REQ</strong> (INT32)</td>
 <td>Take-off waypoint required <p><strong>Comment:</strong> If set, the mission feasibility checker will check for a takeoff waypoint on the mission.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MIS_YAW_ERR">MIS_YAW_ERR</strong> (FLOAT)</td>
 <td>Max yaw error in degrees needed for waypoint heading acceptance    </td>
 <td>0 > 90 (1)</td>
 <td>12.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="MIS_YAW_TMT">MIS_YAW_TMT</strong> (FLOAT)</td>
 <td>Time in seconds we wait on reaching target heading at a waypoint if it is forced <p><strong>Comment:</strong> If set > 0 it will ignore the target heading for normal waypoint acceptance. If the waypoint forces the heading the timeout will matter. For example on VTOL forwards transition. Mainly useful for VTOLs that have less yaw authority and might not reach target yaw in wind. Disabled by default.</p>   </td>
 <td>-1 > 20 (1)</td>
 <td>-1.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="MPC_YAW_MODE">MPC_YAW_MODE</strong> (INT32)</td>
 <td>Yaw mode <p><strong>Comment:</strong> Specifies the heading in Auto.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> towards waypoint</li> 

<li><strong>1:</strong> towards home</li> 

<li><strong>2:</strong> away from home</li> 

<li><strong>3:</strong> along trajectory</li> 

<li><strong>4:</strong> towards waypoint (yaw first)</li> 
</ul>
  </td>
 <td>0 > 4 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_ACC_RAD">NAV_ACC_RAD</strong> (FLOAT)</td>
 <td>Acceptance Radius <p><strong>Comment:</strong> Default acceptance radius, overridden by acceptance radius of waypoint if set. For fixed wing the L1 turning distance is used for horizontal acceptance.</p>   </td>
 <td>0.05 > 200.0 (0.5)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_DLL_ACT">NAV_DLL_ACT</strong> (INT32)</td>
 <td>Set data link loss failsafe mode <p><strong>Comment:</strong> The data link loss failsafe will only be entered after a timeout, set by COM_DL_LOSS_T in seconds. Once the timeout occurs the selected action will be executed.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Hold mode</li> 

<li><strong>2:</strong> Return mode</li> 

<li><strong>3:</strong> Land mode</li> 

<li><strong>5:</strong> Terminate</li> 

<li><strong>6:</strong> Lockdown</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_FORCE_VT">NAV_FORCE_VT</strong> (INT32)</td>
 <td>Force VTOL mode takeoff and land    </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_FW_ALTL_RAD">NAV_FW_ALTL_RAD</strong> (FLOAT)</td>
 <td>FW Altitude Acceptance Radius before a landing <p><strong>Comment:</strong> Altitude acceptance used for the last waypoint before a fixed-wing landing. This is usually smaller than the standard vertical acceptance because close to the ground higher accuracy is required.</p>   </td>
 <td>0.05 > 200.0 </td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_FW_ALT_RAD">NAV_FW_ALT_RAD</strong> (FLOAT)</td>
 <td>FW Altitude Acceptance Radius <p><strong>Comment:</strong> Acceptance radius for fixedwing altitude.</p>   </td>
 <td>0.05 > 200.0 (0.5)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_LOITER_RAD">NAV_LOITER_RAD</strong> (FLOAT)</td>
 <td>Loiter radius (FW only) <p><strong>Comment:</strong> Default value of loiter radius for missions, Hold mode, Return mode, etc. (fixedwing only).</p>   </td>
 <td>25 > 1000 (0.5)</td>
 <td>50.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_MC_ALT_RAD">NAV_MC_ALT_RAD</strong> (FLOAT)</td>
 <td>MC Altitude Acceptance Radius <p><strong>Comment:</strong> Acceptance radius for multicopter altitude.</p>   </td>
 <td>0.05 > 200.0 (0.5)</td>
 <td>0.8</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_RCL_ACT">NAV_RCL_ACT</strong> (INT32)</td>
 <td>Set RC loss failsafe mode <p><strong>Comment:</strong> The RC loss failsafe will only be entered after a timeout, set by COM_RC_LOSS_T in seconds. If RC input checks have been disabled by setting the COM_RC_IN_MODE param it will not be triggered.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Hold mode</li> 

<li><strong>2:</strong> Return mode</li> 

<li><strong>3:</strong> Land mode</li> 

<li><strong>5:</strong> Terminate</li> 

<li><strong>6:</strong> Lockdown</li> 
</ul>
  </td>
 <td></td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_TRAFF_AVOID">NAV_TRAFF_AVOID</strong> (INT32)</td>
 <td>Set traffic avoidance mode <p><strong>Comment:</strong> Enabling this will allow the system to respond to transponder data from e.g. ADSB transponders</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Warn only</li> 

<li><strong>2:</strong> Return mode</li> 

<li><strong>3:</strong> Land mode</li> 

<li><strong>4:</strong> Position Hold mode</li> 
</ul>
  </td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="NAV_TRAFF_A_RADM">NAV_TRAFF_A_RADM</strong> (FLOAT)</td>
 <td>Set NAV TRAFFIC AVOID RADIUS MANNED <p><strong>Comment:</strong> Defines the Radius where NAV TRAFFIC AVOID is Called For Manned Aviation</p>   </td>
 <td>500 > ? </td>
 <td>500</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="NAV_TRAFF_A_RADU">NAV_TRAFF_A_RADU</strong> (FLOAT)</td>
 <td>Set NAV TRAFFIC AVOID RADIUS <p><strong>Comment:</strong> Defines the Radius where NAV TRAFFIC AVOID is Called For Unmanned Aviation</p>   </td>
 <td>10 > 500 </td>
 <td>10</td>
 <td>m</td>
</tr>
</tbody></table>

## Mixer Output

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="MC_AIRMODE">MC_AIRMODE</strong> (INT32)</td>
 <td>Multicopter air-mode <p><strong>Comment:</strong> The air-mode enables the mixer to increase the total thrust of the multirotor in order to keep attitude and rate control even at low and high throttle. This function should be disabled during tuning as it will help the controller to diverge if the closed-loop is unstable (i.e. the vehicle is not tuned yet). Enabling air-mode for yaw requires the use of an arming switch.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Roll/Pitch</li> 

<li><strong>2:</strong> Roll/Pitch/Yaw</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MOT_ORDERING">MOT_ORDERING</strong> (INT32)</td>
 <td>Motor Ordering <p><strong>Comment:</strong> Determines the motor ordering. This can be used for example in combination with a 4-in-1 ESC that assumes a motor ordering which is different from PX4. ONLY supported for Quads. When changing this, make sure to test the motor response without props first.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> PX4</li> 

<li><strong>1:</strong> Betaflight / Cleanflight</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Mount

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="MNT_DO_STAB">MNT_DO_STAB</strong> (INT32)</td>
 <td>Stabilize the mount (set to true for servo gimbal, false for passthrough).
(This is required for a gimbal which is not capable of stabilizing itself
and relies on the IMU's attitude estimation.)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Stabilize all axis</li> 

<li><strong>2:</strong> Stabilize yaw for absolute/lock mode.</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MAN_PITCH">MNT_MAN_PITCH</strong> (INT32)</td>
 <td>Auxiliary channel to control pitch (in AUX input or manual mode)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> AUX1</li> 

<li><strong>2:</strong> AUX2</li> 

<li><strong>3:</strong> AUX3</li> 

<li><strong>4:</strong> AUX4</li> 

<li><strong>5:</strong> AUX5</li> 

<li><strong>6:</strong> AUX6</li> 
</ul>
  </td>
 <td>0 > 6 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MAN_ROLL">MNT_MAN_ROLL</strong> (INT32)</td>
 <td>Auxiliary channel to control roll (in AUX input or manual mode)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> AUX1</li> 

<li><strong>2:</strong> AUX2</li> 

<li><strong>3:</strong> AUX3</li> 

<li><strong>4:</strong> AUX4</li> 

<li><strong>5:</strong> AUX5</li> 

<li><strong>6:</strong> AUX6</li> 
</ul>
  </td>
 <td>0 > 6 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MAN_YAW">MNT_MAN_YAW</strong> (INT32)</td>
 <td>Auxiliary channel to control yaw (in AUX input or manual mode)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> AUX1</li> 

<li><strong>2:</strong> AUX2</li> 

<li><strong>3:</strong> AUX3</li> 

<li><strong>4:</strong> AUX4</li> 

<li><strong>5:</strong> AUX5</li> 

<li><strong>6:</strong> AUX6</li> 
</ul>
  </td>
 <td>0 > 6 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MAV_COMPID">MNT_MAV_COMPID</strong> (INT32)</td>
 <td>Mavlink Component ID of the mount <p><strong>Comment:</strong> If MNT_MODE_OUT is MAVLink protocol v2, mount configure/control commands will be sent with this component ID.</p>   </td>
 <td></td>
 <td>154</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MAV_SYSID">MNT_MAV_SYSID</strong> (INT32)</td>
 <td>Mavlink System ID of the mount <p><strong>Comment:</strong> If MNT_MODE_OUT is MAVLink gimbal protocol v1, mount configure/control commands will be sent with this target ID.</p>   </td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MODE_IN">MNT_MODE_IN</strong> (INT32)</td>
 <td>Mount input mode <p><strong>Comment:</strong> RC uses the AUX input channels (see MNT_MAN_* parameters), MAVLINK_ROI uses the MAV_CMD_DO_SET_ROI Mavlink message, and MAVLINK_DO_MOUNT the MAV_CMD_DO_MOUNT_CONFIGURE and MAV_CMD_DO_MOUNT_CONTROL messages to control a mount.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> DISABLED</li> 

<li><strong>0:</strong> AUTO</li> 

<li><strong>1:</strong> RC</li> 

<li><strong>2:</strong> MAVLINK_ROI (protocol v1)</li> 

<li><strong>3:</strong> MAVLINK_DO_MOUNT (protocol v1)</li> 

<li><strong>4:</strong> MAVlink gimbal protocol v2</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 3 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_MODE_OUT">MNT_MODE_OUT</strong> (INT32)</td>
 <td>Mount output mode <p><strong>Comment:</strong> AUX uses the mixer output Control Group #2. MAVLINK uses the MAV_CMD_DO_MOUNT_CONFIGURE and MAV_CMD_DO_MOUNT_CONTROL MavLink messages to control a mount (set MNT_MAV_SYSID & MNT_MAV_COMPID)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> AUX</li> 

<li><strong>1:</strong> MAVLink gimbal protocol v1</li> 

<li><strong>2:</strong> MAVLink gimbal protocol v2</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_OB_LOCK_MODE">MNT_OB_LOCK_MODE</strong> (FLOAT)</td>
 <td>Mixer value for selecting a locking mode
if required for the gimbal (only in AUX output mode)    </td>
 <td>-1.0 > 1.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_OB_NORM_MODE">MNT_OB_NORM_MODE</strong> (FLOAT)</td>
 <td>Mixer value for selecting normal mode
if required by the gimbal (only in AUX output mode)    </td>
 <td>-1.0 > 1.0 </td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_OFF_PITCH">MNT_OFF_PITCH</strong> (FLOAT)</td>
 <td>Offset for pitch channel output in degrees    </td>
 <td>-360.0 > 360.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_OFF_ROLL">MNT_OFF_ROLL</strong> (FLOAT)</td>
 <td>Offset for roll channel output in degrees    </td>
 <td>-360.0 > 360.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_OFF_YAW">MNT_OFF_YAW</strong> (FLOAT)</td>
 <td>Offset for yaw channel output in degrees    </td>
 <td>-360.0 > 360.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_RANGE_PITCH">MNT_RANGE_PITCH</strong> (FLOAT)</td>
 <td>Range of pitch channel output in degrees (only in AUX output mode)    </td>
 <td>1.0 > 720.0 </td>
 <td>360.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_RANGE_ROLL">MNT_RANGE_ROLL</strong> (FLOAT)</td>
 <td>Range of roll channel output in degrees (only in AUX output mode)    </td>
 <td>1.0 > 720.0 </td>
 <td>360.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_RANGE_YAW">MNT_RANGE_YAW</strong> (FLOAT)</td>
 <td>Range of yaw channel output in degrees (only in AUX output mode)    </td>
 <td>1.0 > 720.0 </td>
 <td>360.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_RATE_PITCH">MNT_RATE_PITCH</strong> (FLOAT)</td>
 <td>Angular pitch rate for manual input in degrees/second.
Full stick input [-1..1] translats to [-pitch rate..pitch rate]    </td>
 <td>1.0 > 90.0 </td>
 <td>30.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MNT_RATE_YAW">MNT_RATE_YAW</strong> (FLOAT)</td>
 <td>Angular yaw rate for manual input in degrees/second.
Full stick input [-1..1] translats to [-yaw rate..yaw rate]    </td>
 <td>1.0 > 90.0 </td>
 <td>30.0</td>
 <td></td>
</tr>
</tbody></table>

## Multicopter Attitude Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="MC_PITCHRATE_MAX">MC_PITCHRATE_MAX</strong> (FLOAT)</td>
 <td>Max pitch rate <p><strong>Comment:</strong> Limit for pitch rate in manual and auto modes (except acro). Has effect for large rotations in autonomous mode, to avoid large control output and mixer saturation. This is not only limited by the vehicle's properties, but also by the maximum measurement rate of the gyro.</p>   </td>
 <td>0.0 > 1800.0 (5)</td>
 <td>220.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MC_PITCH_P">MC_PITCH_P</strong> (FLOAT)</td>
 <td>Pitch P gain <p><strong>Comment:</strong> Pitch proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>   </td>
 <td>0.0 > 12 (0.1)</td>
 <td>6.5</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="MC_RATT_TH">MC_RATT_TH</strong> (FLOAT)</td>
 <td>Threshold for Rattitude mode <p><strong>Comment:</strong> Manual input needed in order to override attitude control rate setpoints and instead pass manual stick inputs as rate setpoints</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.8</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ROLLRATE_MAX">MC_ROLLRATE_MAX</strong> (FLOAT)</td>
 <td>Max roll rate <p><strong>Comment:</strong> Limit for roll rate in manual and auto modes (except acro). Has effect for large rotations in autonomous mode, to avoid large control output and mixer saturation. This is not only limited by the vehicle's properties, but also by the maximum measurement rate of the gyro.</p>   </td>
 <td>0.0 > 1800.0 (5)</td>
 <td>220.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MC_ROLL_P">MC_ROLL_P</strong> (FLOAT)</td>
 <td>Roll P gain <p><strong>Comment:</strong> Roll proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>   </td>
 <td>0.0 > 12 (0.1)</td>
 <td>6.5</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="MC_YAWRATE_MAX">MC_YAWRATE_MAX</strong> (FLOAT)</td>
 <td>Max yaw rate    </td>
 <td>0.0 > 1800.0 (5)</td>
 <td>200.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MC_YAW_P">MC_YAW_P</strong> (FLOAT)</td>
 <td>Yaw P gain <p><strong>Comment:</strong> Yaw proportional gain, i.e. desired angular speed in rad/s for error 1 rad.</p>   </td>
 <td>0.0 > 5 (0.1)</td>
 <td>2.8</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="MC_YAW_WEIGHT">MC_YAW_WEIGHT</strong> (FLOAT)</td>
 <td>Yaw weight <p><strong>Comment:</strong> A fraction [0,1] deprioritizing yaw compared to roll and pitch in non-linear attitude control. Deprioritizing yaw is necessary because multicopters have much less control authority in yaw compared to the other axes and it makes sense because yaw is not critical for stable hovering or 3D navigation. For yaw control tuning use MC_YAW_P. This ratio has no inpact on the yaw gain.</p>   </td>
 <td>0.0 > 1.0 (0.1)</td>
 <td>0.4</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="MPC_YAWRAUTO_MAX">MPC_YAWRAUTO_MAX</strong> (FLOAT)</td>
 <td>Max yaw rate in auto mode <p><strong>Comment:</strong> Limit the rate of change of the yaw setpoint in autonomous mode to avoid large control output and mixer saturation.</p>   </td>
 <td>0.0 > 360.0 (5)</td>
 <td>45.0</td>
 <td>deg/s</td>
</tr>
</tbody></table>

## Multicopter Position Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CP_DELAY">CP_DELAY</strong> (FLOAT)</td>
 <td>Average delay of the range sensor message plus the tracking delay of the position controller in seconds <p><strong>Comment:</strong> Only used in Position mode.</p>   </td>
 <td>0 > 1 </td>
 <td>0.4</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="CP_DIST">CP_DIST</strong> (FLOAT)</td>
 <td>Minimum distance the vehicle should keep to all obstacles <p><strong>Comment:</strong> Only used in Position mode. Collision avoidance is disabled by setting this parameter to a negative value</p>   </td>
 <td>-1 > 15 </td>
 <td>-1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="CP_GO_NO_DATA">CP_GO_NO_DATA</strong> (FLOAT)</td>
 <td>Boolean to allow moving into directions where there is no sensor data (outside FOV) <p><strong>Comment:</strong> Only used in Position mode.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CP_GUIDE_ANG">CP_GUIDE_ANG</strong> (FLOAT)</td>
 <td>Angle left/right from the commanded setpoint by which the collision prevention algorithm can choose to change the setpoint direction <p><strong>Comment:</strong> Only used in Position mode.</p>   </td>
 <td>0 > 90 </td>
 <td>30.</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="MC_MAN_TILT_TAU">MC_MAN_TILT_TAU</strong> (FLOAT)</td>
 <td>Manual tilt input filter time constant
Setting this parameter to 0 disables the filter    </td>
 <td>0.0 > 2.0 </td>
 <td>0.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="MPC_ACC_DOWN_MAX">MPC_ACC_DOWN_MAX</strong> (FLOAT)</td>
 <td>Maximum vertical acceleration in velocity controlled modes down    </td>
 <td>2.0 > 15.0 (1)</td>
 <td>3.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="MPC_ACC_HOR">MPC_ACC_HOR</strong> (FLOAT)</td>
 <td>Acceleration for auto and for manual <p><strong>Comment:</strong> Note: In manual, this parameter is only used in MPC_POS_MODE 1.</p>   </td>
 <td>2.0 > 15.0 (1)</td>
 <td>3.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="MPC_ACC_HOR_MAX">MPC_ACC_HOR_MAX</strong> (FLOAT)</td>
 <td>Maximum horizontal acceleration for auto mode and for manual mode <p><strong>Comment:</strong> MPC_POS_MODE 1 just deceleration 3 acceleration and deceleration 4 just acceleration</p>   </td>
 <td>2.0 > 15.0 (1)</td>
 <td>5.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="MPC_ACC_UP_MAX">MPC_ACC_UP_MAX</strong> (FLOAT)</td>
 <td>Maximum vertical acceleration in velocity controlled modes upward    </td>
 <td>2.0 > 15.0 (1)</td>
 <td>4.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="MPC_ALT_MODE">MPC_ALT_MODE</strong> (INT32)</td>
 <td>Altitude control mode <p><strong>Comment:</strong> Set to 0 to control height relative to the earth frame origin. This origin may move up and down in flight due to sensor drift. Set to 1 to control height relative to estimated distance to ground. The vehicle will move up and down with terrain height variation. Requires a distance to ground sensor. The height controller will revert to using height above origin if the distance to ground estimate becomes invalid as indicated by the local_position.distance_bottom_valid message being false. Set to 2 to control height relative to ground (requires a distance sensor) when stationary and relative to earth frame origin when moving horizontally. The speed threshold is controlled by the MPC_HOLD_MAX_XY parameter.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Altitude following</li> 

<li><strong>1:</strong> Terrain following</li> 

<li><strong>2:</strong> Terrain hold</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_DEC_HOR_SLOW">MPC_DEC_HOR_SLOW</strong> (FLOAT)</td>
 <td>Slow horizontal manual deceleration for manual mode <p><strong>Comment:</strong> Note: This is only used when MPC_POS_MODE is set to 1.</p>   </td>
 <td>0.5 > 10.0 (1)</td>
 <td>5.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="MPC_HOLD_DZ">MPC_HOLD_DZ</strong> (FLOAT)</td>
 <td>Deadzone of sticks where position hold is enabled    </td>
 <td>0.0 > 1.0 </td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_HOLD_MAX_XY">MPC_HOLD_MAX_XY</strong> (FLOAT)</td>
 <td>Maximum horizontal velocity for which position hold is enabled (use 0 to disable check)    </td>
 <td>0.0 > 3.0 </td>
 <td>0.8</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_HOLD_MAX_Z">MPC_HOLD_MAX_Z</strong> (FLOAT)</td>
 <td>Maximum vertical velocity for which position hold is enabled (use 0 to disable check)    </td>
 <td>0.0 > 3.0 </td>
 <td>0.6</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_JERK_AUTO">MPC_JERK_AUTO</strong> (FLOAT)</td>
 <td>Jerk limit in auto mode <p><strong>Comment:</strong> Limit the maximum jerk of the vehicle (how fast the acceleration can change). A lower value leads to smoother vehicle motions, but it also limits its agility.</p>   </td>
 <td>1.0 > 80.0 (1)</td>
 <td>4.0</td>
 <td>m/s^3</td>
</tr>
<tr>
 <td><strong id="MPC_JERK_MAX">MPC_JERK_MAX</strong> (FLOAT)</td>
 <td>Maximum jerk limit <p><strong>Comment:</strong> Limit the maximum jerk of the vehicle (how fast the acceleration can change). A lower value leads to smoother vehicle motions, but it also limits its agility (how fast it can change directions or break). Setting this to the maximum value essentially disables the limit. Note: This is only used when MPC_POS_MODE is set to a smoothing mode 1, 3 or 4.</p>   </td>
 <td>0.5 > 500.0 (1)</td>
 <td>8.0</td>
 <td>m/s^3</td>
</tr>
<tr>
 <td><strong id="MPC_JERK_MIN">MPC_JERK_MIN</strong> (FLOAT)</td>
 <td>Velocity-based jerk limit <p><strong>Comment:</strong> If this is not zero, a velocity-based maximum jerk limit is used: the applied jerk limit linearly increases with the vehicle's velocity between MPC_JERK_MIN (zero velocity) and MPC_JERK_MAX (maximum velocity). This means that the vehicle's motions are smooth for low velocities, but still allows fast direction changes or breaking at higher velocities. Set this to zero to use a fixed maximum jerk limit (MPC_JERK_MAX). Note: This is only used when MPC_POS_MODE is set to 1.</p>   </td>
 <td>0 > 30.0 (1)</td>
 <td>8.0</td>
 <td>m/s^3</td>
</tr>
<tr>
 <td><strong id="MPC_LAND_ALT1">MPC_LAND_ALT1</strong> (FLOAT)</td>
 <td>Altitude for 1. step of slow landing (descend) <p><strong>Comment:</strong> Below this altitude: - descending velocity gets limited to a value between "MPC_Z_VEL_MAX_DN" and "MPC_LAND_SPEED" - horizontal velocity gets limited to a value between "MPC_VEL_MANUAL" and "MPC_LAND_VEL_XY" for a smooth descent and landing experience. Value needs to be higher than "MPC_LAND_ALT2"</p>   </td>
 <td>0 > 122 </td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="MPC_LAND_ALT2">MPC_LAND_ALT2</strong> (FLOAT)</td>
 <td>Altitude for 2. step of slow landing (landing) <p><strong>Comment:</strong> Below this altitude descending and horizontal velocities get limited to "MPC_LAND_SPEED" and "MPC_LAND_VEL_XY", respectively. Value needs to be lower than "MPC_LAND_ALT1"</p>   </td>
 <td>0 > 122 </td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="MPC_LAND_SPEED">MPC_LAND_SPEED</strong> (FLOAT)</td>
 <td>Landing descend rate    </td>
 <td>0.6 > ? </td>
 <td>0.7</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_LAND_VEL_XY">MPC_LAND_VEL_XY</strong> (FLOAT)</td>
 <td>Maximum horizontal position mode velocity when close to ground/home altitude
Set the value higher than the otherwise expected maximum to disable any slowdown    </td>
 <td>0 > ? </td>
 <td>10.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_MANTHR_MIN">MPC_MANTHR_MIN</strong> (FLOAT)</td>
 <td>Minimum manual thrust <p><strong>Comment:</strong> Minimum vertical thrust. It's recommended to set it > 0 to avoid free fall with zero thrust. With MC_AIRMODE set to 1, this can safely be set to 0.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.08</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="MPC_MAN_TILT_MAX">MPC_MAN_TILT_MAX</strong> (FLOAT)</td>
 <td>Maximal tilt angle in manual or altitude mode    </td>
 <td>0.0 > 90.0 </td>
 <td>35.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="MPC_MAN_Y_MAX">MPC_MAN_Y_MAX</strong> (FLOAT)</td>
 <td>Max manual yaw rate    </td>
 <td>0.0 > 400 </td>
 <td>150.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MPC_MAN_Y_TAU">MPC_MAN_Y_TAU</strong> (FLOAT)</td>
 <td>Manual yaw rate input filter time constant
Setting this parameter to 0 disables the filter    </td>
 <td>0.0 > 5.0 </td>
 <td>0.08</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="MPC_POS_MODE">MPC_POS_MODE</strong> (INT32)</td>
 <td>Manual-Position control sub-mode <p><strong>Comment:</strong> The supported sub-modes are: 0 Simple position control where sticks map directly to velocity setpoints without smoothing. Useful for velocity control tuning. 1 Smooth position control with maximum acceleration and jerk limits based on slew-rates. 3 Smooth position control with maximum acceleration and jerk limits based on jerk optimized trajectory generator (different algorithm than 1). 4 Smooth position control where sticks map to acceleration and there's a virtual brake drag</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Simple position control</li> 

<li><strong>1:</strong> Smooth position control</li> 

<li><strong>3:</strong> Smooth position control (Jerk optimized)</li> 

<li><strong>4:</strong> Acceleration based input</li> 
</ul>
  </td>
 <td></td>
 <td>4</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_SPOOLUP_TIME">MPC_SPOOLUP_TIME</strong> (FLOAT)</td>
 <td>Enforced delay between arming and takeoff <p><strong>Comment:</strong> For altitude controlled modes the time from arming the motors until a takeoff is possible gets forced to be at least MPC_SPOOLUP_TIME seconds to ensure the motors and propellers can sppol up and reach idle speed before getting commanded to spin faster. This delay is particularly useful for vehicles with slow motor spin-up e.g. because of large propellers.</p>   </td>
 <td>0 > 10 </td>
 <td>1.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="MPC_THR_CURVE">MPC_THR_CURVE</strong> (INT32)</td>
 <td>Thrust curve in Manual Mode <p><strong>Comment:</strong> This parameter defines how the throttle stick input is mapped to commanded thrust in Manual/Stabilized flight mode. In case the default is used ('Rescale to hover thrust'), the stick input is linearly rescaled, such that a centered stick corresponds to the hover throttle (see MPC_THR_HOVER). Select 'No Rescale' to directly map the stick 1:1 to the output. This can be useful in case the hover thrust is very low and the default would lead to too much distortion (e.g. if hover thrust is set to 20%, 80% of the upper thrust range is squeezed into the upper half of the stick range). Note: In case MPC_THR_HOVER is set to 50%, the modes 0 and 1 are the same.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Rescale to hover thrust</li> 

<li><strong>1:</strong> No Rescale</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_THR_HOVER">MPC_THR_HOVER</strong> (FLOAT)</td>
 <td>Hover thrust <p><strong>Comment:</strong> Vertical thrust required to hover. This value is mapped to center stick for manual throttle control. With this value set to the thrust required to hover, transition from manual to Altitude or Position mode while hovering will occur with the throttle stick near center, which is then interpreted as (near) zero demand for vertical speed. This parameter is also important for the landing detection to work correctly.</p>   </td>
 <td>0.1 > 0.8 (0.01)</td>
 <td>0.5</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="MPC_THR_MAX">MPC_THR_MAX</strong> (FLOAT)</td>
 <td>Maximum thrust in auto thrust control <p><strong>Comment:</strong> Limit max allowed thrust</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="MPC_THR_MIN">MPC_THR_MIN</strong> (FLOAT)</td>
 <td>Minimum thrust in auto thrust control <p><strong>Comment:</strong> It's recommended to set it > 0 to avoid free fall with zero thrust.</p>   </td>
 <td>0.05 > 1.0 (0.01)</td>
 <td>0.12</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="MPC_TILTMAX_AIR">MPC_TILTMAX_AIR</strong> (FLOAT)</td>
 <td>Maximum tilt angle in air <p><strong>Comment:</strong> Limits maximum tilt in AUTO and POSCTRL modes during flight.</p>   </td>
 <td>20.0 > 89.0 </td>
 <td>45.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="MPC_TILTMAX_LND">MPC_TILTMAX_LND</strong> (FLOAT)</td>
 <td>Maximum tilt during landing <p><strong>Comment:</strong> Limits maximum tilt angle on landing.</p>   </td>
 <td>10.0 > 89.0 </td>
 <td>12.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="MPC_TKO_RAMP_T">MPC_TKO_RAMP_T</strong> (FLOAT)</td>
 <td>Position control smooth takeoff ramp time constant <p><strong>Comment:</strong> Increasing this value will make automatic and manual takeoff slower. If it's too slow the drone might scratch the ground and tip over. A time constant of 0 disables the ramp</p>   </td>
 <td>0 > 5 </td>
 <td>3.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_TKO_SPEED">MPC_TKO_SPEED</strong> (FLOAT)</td>
 <td>Takeoff climb rate    </td>
 <td>1 > 5 </td>
 <td>1.5</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_USE_HTE">MPC_USE_HTE</strong> (INT32)</td>
 <td>Hover thrust source selector <p><strong>Comment:</strong> Set false to use the fixed parameter MPC_THR_HOVER Set true to use the value computed by the hover thrust estimator</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_VELD_LP">MPC_VELD_LP</strong> (FLOAT)</td>
 <td>Low pass filter cut freq. for numerical velocity derivative    </td>
 <td>0.0 > 10 </td>
 <td>5.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="MPC_VEL_MANUAL">MPC_VEL_MANUAL</strong> (FLOAT)</td>
 <td>Maximum horizontal velocity setpoint for manual controlled mode
If velocity setpoint larger than MPC_XY_VEL_MAX is set, then
the setpoint will be capped to MPC_XY_VEL_MAX    </td>
 <td>3.0 > 20.0 (1)</td>
 <td>10.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_XY_CRUISE">MPC_XY_CRUISE</strong> (FLOAT)</td>
 <td>Maximum horizontal velocity in mission <p><strong>Comment:</strong> Normal horizontal velocity in AUTO modes (includes also RTL / hold / etc.) and endpoint for position stabilized mode (POSCTRL).</p>   </td>
 <td>3.0 > 20.0 (1)</td>
 <td>5.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_XY_ERR_MAX">MPC_XY_ERR_MAX</strong> (FLOAT)</td>
 <td>Maximum horizontal error allowed by the trajectory generator <p><strong>Comment:</strong> The integration speed of the trajectory setpoint is linearly reduced with the horizontal position tracking error. When the error is above this parameter, the integration of the trajectory is stopped to wait for the drone. This value can be adjusted depending on the tracking capabilities of the vehicle.</p>   </td>
 <td>0.1 > 10.0 </td>
 <td>2.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_XY_MAN_EXPO">MPC_XY_MAN_EXPO</strong> (FLOAT)</td>
 <td>Manual position control stick exponential curve sensitivity <p><strong>Comment:</strong> The higher the value the less sensitivity the stick has around zero while still reaching the maximum value with full stick deflection. 0 Purely linear input curve (default) 1 Purely cubic input curve</p>   </td>
 <td>0 > 1 </td>
 <td>0.6</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_XY_P">MPC_XY_P</strong> (FLOAT)</td>
 <td>Proportional gain for horizontal position error    </td>
 <td>0.0 > 2.0 </td>
 <td>0.95</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_XY_TRAJ_P">MPC_XY_TRAJ_P</strong> (FLOAT)</td>
 <td>Proportional gain for horizontal trajectory position error    </td>
 <td>0.1 > 1.0 </td>
 <td>0.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_XY_VEL_D_ACC">MPC_XY_VEL_D_ACC</strong> (FLOAT)</td>
 <td>Differential gain for horizontal velocity error. Small values help reduce fast oscillations. If value is too big oscillations will appear again <p><strong>Comment:</strong> defined as correction acceleration in m/s^2 per m/s^2 velocity derivative</p>   </td>
 <td>0.1 > 2.0 </td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_XY_VEL_I_ACC">MPC_XY_VEL_I_ACC</strong> (FLOAT)</td>
 <td>Integral gain for horizontal velocity error <p><strong>Comment:</strong> defined as correction acceleration in m/s^2 per m velocity integral Non-zero value allows to eliminate steady state errors in the presence of disturbances like wind.</p>   </td>
 <td>0.0 > 60.0 </td>
 <td>0.4</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_XY_VEL_MAX">MPC_XY_VEL_MAX</strong> (FLOAT)</td>
 <td>Maximum horizontal velocity <p><strong>Comment:</strong> Maximum horizontal velocity in AUTO mode. If higher speeds are commanded in a mission they will be capped to this velocity.</p>   </td>
 <td>0.0 > 20.0 (1)</td>
 <td>12.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_XY_VEL_P_ACC">MPC_XY_VEL_P_ACC</strong> (FLOAT)</td>
 <td>Proportional gain for horizontal velocity error <p><strong>Comment:</strong> defined as correction acceleration in m/s^2 per m/s velocity error</p>   </td>
 <td>1.2 > 3.0 </td>
 <td>1.8</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_YAW_EXPO">MPC_YAW_EXPO</strong> (FLOAT)</td>
 <td>Manual control stick yaw rotation exponential curve <p><strong>Comment:</strong> The higher the value the less sensitivity the stick has around zero while still reaching the maximum value with full stick deflection. 0 Purely linear input curve (default) 1 Purely cubic input curve</p>   </td>
 <td>0 > 1 </td>
 <td>0.6</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_Z_MAN_EXPO">MPC_Z_MAN_EXPO</strong> (FLOAT)</td>
 <td>Manual control stick vertical exponential curve <p><strong>Comment:</strong> The higher the value the less sensitivity the stick has around zero while still reaching the maximum value with full stick deflection. 0 Purely linear input curve (default) 1 Purely cubic input curve</p>   </td>
 <td>0 > 1 </td>
 <td>0.6</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_Z_P">MPC_Z_P</strong> (FLOAT)</td>
 <td>Proportional gain for vertical position error    </td>
 <td>0.0 > 1.5 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_Z_VEL_D_ACC">MPC_Z_VEL_D_ACC</strong> (FLOAT)</td>
 <td>Differential gain for vertical velocity error <p><strong>Comment:</strong> defined as correction acceleration in m/s^2 per m/s^2 velocity derivative</p>   </td>
 <td>0.0 > 2.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_Z_VEL_I_ACC">MPC_Z_VEL_I_ACC</strong> (FLOAT)</td>
 <td>Integral gain for vertical velocity error <p><strong>Comment:</strong> defined as correction acceleration in m/s^2 per m velocity integral Non zero value allows hovering thrust estimation on stabilized or autonomous takeoff.</p>   </td>
 <td>0.2 > 2.0 </td>
 <td>2.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_Z_VEL_MAX_DN">MPC_Z_VEL_MAX_DN</strong> (FLOAT)</td>
 <td>Maximum vertical descent velocity <p><strong>Comment:</strong> Maximum vertical velocity in AUTO mode and endpoint for stabilized modes (ALTCTRL, POSCTRL).</p>   </td>
 <td>0.5 > 4.0 </td>
 <td>1.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_Z_VEL_MAX_UP">MPC_Z_VEL_MAX_UP</strong> (FLOAT)</td>
 <td>Maximum vertical ascent velocity <p><strong>Comment:</strong> Maximum vertical velocity in AUTO mode and endpoint for stabilized modes (ALTCTRL, POSCTRL).</p>   </td>
 <td>0.5 > 8.0 </td>
 <td>3.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="MPC_Z_VEL_P_ACC">MPC_Z_VEL_P_ACC</strong> (FLOAT)</td>
 <td>Proportional gain for vertical velocity error <p><strong>Comment:</strong> defined as correction acceleration in m/s^2 per m/s velocity error</p>   </td>
 <td>2.0 > 8.0 </td>
 <td>4.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="WV_EN">WV_EN</strong> (INT32)</td>
 <td>Enable weathervane    </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="WV_ROLL_MIN">WV_ROLL_MIN</strong> (FLOAT)</td>
 <td>Minimum roll angle setpoint for weathervane controller to demand a yaw-rate    </td>
 <td>0 > 5 </td>
 <td>1.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="WV_YRATE_MAX">WV_YRATE_MAX</strong> (FLOAT)</td>
 <td>Maximum yawrate the weathervane controller is allowed to demand    </td>
 <td>0 > 120 </td>
 <td>90.0</td>
 <td>deg/s</td>
</tr>
</tbody></table>

## Multicopter Rate Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="MC_ACRO_EXPO">MC_ACRO_EXPO</strong> (FLOAT)</td>
 <td>Acro mode Expo factor for Roll and Pitch <p><strong>Comment:</strong> Exponential factor for tuning the input curve shape. 0 Purely linear input curve 1 Purely cubic input curve</p>   </td>
 <td>0 > 1 </td>
 <td>0.69</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ACRO_EXPO_Y">MC_ACRO_EXPO_Y</strong> (FLOAT)</td>
 <td>Acro mode Expo factor for Yaw <p><strong>Comment:</strong> Exponential factor for tuning the input curve shape. 0 Purely linear input curve 1 Purely cubic input curve</p>   </td>
 <td>0 > 1 </td>
 <td>0.69</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ACRO_P_MAX">MC_ACRO_P_MAX</strong> (FLOAT)</td>
 <td>Max acro pitch rate
default: 2 turns per second    </td>
 <td>0.0 > 1800.0 (5)</td>
 <td>720.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MC_ACRO_R_MAX">MC_ACRO_R_MAX</strong> (FLOAT)</td>
 <td>Max acro roll rate
default: 2 turns per second    </td>
 <td>0.0 > 1800.0 (5)</td>
 <td>720.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MC_ACRO_SUPEXPO">MC_ACRO_SUPEXPO</strong> (FLOAT)</td>
 <td>Acro mode SuperExpo factor for Roll and Pitch <p><strong>Comment:</strong> SuperExpo factor for refining the input curve shape tuned using MC_ACRO_EXPO. 0 Pure Expo function 0.7 resonable shape enhancement for intuitive stick feel 0.95 very strong bent input curve only near maxima have effect</p>   </td>
 <td>0 > 0.95 </td>
 <td>0.7</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ACRO_SUPEXPOY">MC_ACRO_SUPEXPOY</strong> (FLOAT)</td>
 <td>Acro mode SuperExpo factor for Yaw <p><strong>Comment:</strong> SuperExpo factor for refining the input curve shape tuned using MC_ACRO_EXPO_Y. 0 Pure Expo function 0.7 resonable shape enhancement for intuitive stick feel 0.95 very strong bent input curve only near maxima have effect</p>   </td>
 <td>0 > 0.95 </td>
 <td>0.7</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ACRO_Y_MAX">MC_ACRO_Y_MAX</strong> (FLOAT)</td>
 <td>Max acro yaw rate
default 1.5 turns per second    </td>
 <td>0.0 > 1800.0 (5)</td>
 <td>540.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="MC_BAT_SCALE_EN">MC_BAT_SCALE_EN</strong> (INT32)</td>
 <td>Battery power level scaler <p><strong>Comment:</strong> This compensates for voltage drop of the battery over time by attempting to normalize performance across the operating range of the battery. The copter should constantly behave as if it was fully charged with reduced max acceleration at lower battery percentages. i.e. if hover is at 0.5 throttle at 100% battery, it will still be 0.5 at 60% battery.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_PITCHRATE_D">MC_PITCHRATE_D</strong> (FLOAT)</td>
 <td>Pitch rate D gain <p><strong>Comment:</strong> Pitch rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>   </td>
 <td>0.0 > ? (0.0005)</td>
 <td>0.003</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_PITCHRATE_FF">MC_PITCHRATE_FF</strong> (FLOAT)</td>
 <td>Pitch rate feedforward <p><strong>Comment:</strong> Improves tracking performance.</p>   </td>
 <td>0.0 > ? </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_PITCHRATE_I">MC_PITCHRATE_I</strong> (FLOAT)</td>
 <td>Pitch rate I gain <p><strong>Comment:</strong> Pitch rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_PITCHRATE_K">MC_PITCHRATE_K</strong> (FLOAT)</td>
 <td>Pitch rate controller gain <p><strong>Comment:</strong> Global gain of the controller. This gain scales the P, I and D terms of the controller: output = MC_PITCHRATE_K * (MC_PITCHRATE_P * error + MC_PITCHRATE_I * error_integral + MC_PITCHRATE_D * error_derivative) Set MC_PITCHRATE_P=1 to implement a PID in the ideal form. Set MC_PITCHRATE_K=1 to implement a PID in the parallel form.</p>   </td>
 <td>0.01 > 5.0 (0.0005)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_PITCHRATE_P">MC_PITCHRATE_P</strong> (FLOAT)</td>
 <td>Pitch rate P gain <p><strong>Comment:</strong> Pitch rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>   </td>
 <td>0.01 > 0.6 (0.01)</td>
 <td>0.15</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_PR_INT_LIM">MC_PR_INT_LIM</strong> (FLOAT)</td>
 <td>Pitch rate integrator limit <p><strong>Comment:</strong> Pitch rate integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large pitch moment trim changes.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.30</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ROLLRATE_D">MC_ROLLRATE_D</strong> (FLOAT)</td>
 <td>Roll rate D gain <p><strong>Comment:</strong> Roll rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>   </td>
 <td>0.0 > 0.01 (0.0005)</td>
 <td>0.003</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ROLLRATE_FF">MC_ROLLRATE_FF</strong> (FLOAT)</td>
 <td>Roll rate feedforward <p><strong>Comment:</strong> Improves tracking performance.</p>   </td>
 <td>0.0 > ? </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ROLLRATE_I">MC_ROLLRATE_I</strong> (FLOAT)</td>
 <td>Roll rate I gain <p><strong>Comment:</strong> Roll rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ROLLRATE_K">MC_ROLLRATE_K</strong> (FLOAT)</td>
 <td>Roll rate controller gain <p><strong>Comment:</strong> Global gain of the controller. This gain scales the P, I and D terms of the controller: output = MC_ROLLRATE_K * (MC_ROLLRATE_P * error + MC_ROLLRATE_I * error_integral + MC_ROLLRATE_D * error_derivative) Set MC_ROLLRATE_P=1 to implement a PID in the ideal form. Set MC_ROLLRATE_K=1 to implement a PID in the parallel form.</p>   </td>
 <td>0.01 > 5.0 (0.0005)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_ROLLRATE_P">MC_ROLLRATE_P</strong> (FLOAT)</td>
 <td>Roll rate P gain <p><strong>Comment:</strong> Roll rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>   </td>
 <td>0.01 > 0.5 (0.01)</td>
 <td>0.15</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_RR_INT_LIM">MC_RR_INT_LIM</strong> (FLOAT)</td>
 <td>Roll rate integrator limit <p><strong>Comment:</strong> Roll rate integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large roll moment trim changes.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.30</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_YAWRATE_D">MC_YAWRATE_D</strong> (FLOAT)</td>
 <td>Yaw rate D gain <p><strong>Comment:</strong> Yaw rate differential gain. Small values help reduce fast oscillations. If value is too big oscillations will appear again.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_YAWRATE_FF">MC_YAWRATE_FF</strong> (FLOAT)</td>
 <td>Yaw rate feedforward <p><strong>Comment:</strong> Improves tracking performance.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_YAWRATE_I">MC_YAWRATE_I</strong> (FLOAT)</td>
 <td>Yaw rate I gain <p><strong>Comment:</strong> Yaw rate integral gain. Can be set to compensate static thrust difference or gravity center offset.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_YAWRATE_K">MC_YAWRATE_K</strong> (FLOAT)</td>
 <td>Yaw rate controller gain <p><strong>Comment:</strong> Global gain of the controller. This gain scales the P, I and D terms of the controller: output = MC_YAWRATE_K * (MC_YAWRATE_P * error + MC_YAWRATE_I * error_integral + MC_YAWRATE_D * error_derivative) Set MC_YAWRATE_P=1 to implement a PID in the ideal form. Set MC_YAWRATE_K=1 to implement a PID in the parallel form.</p>   </td>
 <td>0.0 > 5.0 (0.0005)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_YAWRATE_P">MC_YAWRATE_P</strong> (FLOAT)</td>
 <td>Yaw rate P gain <p><strong>Comment:</strong> Yaw rate proportional gain, i.e. control output for angular speed error 1 rad/s.</p>   </td>
 <td>0.0 > 0.6 (0.01)</td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MC_YR_INT_LIM">MC_YR_INT_LIM</strong> (FLOAT)</td>
 <td>Yaw rate integrator limit <p><strong>Comment:</strong> Yaw rate integrator limit. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large yaw moment trim changes.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.30</td>
 <td></td>
</tr>
</tbody></table>

## OSD

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="OSD_ATXXXX_CFG">OSD_ATXXXX_CFG</strong> (INT32)</td>
 <td>Enable/Disable the ATXXX OSD Chip <p><strong>Comment:</strong> Configure the ATXXXX OSD Chip (mounted on the OmnibusF4SD board) and select the transmission standard.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> NTSC</li> 

<li><strong>2:</strong> PAL</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## PWM Outputs

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="MOT_SLEW_MAX">MOT_SLEW_MAX</strong> (FLOAT)</td>
 <td>Minimum motor rise time (slew rate limit) <p><strong>Comment:</strong> Minimum time allowed for the motor input signal to pass through a range of 1000 PWM units. A value x means that the motor signal can only go from 1000 to 2000 PWM in maximum x seconds. Zero means that slew rate limiting is disabled.</p>   </td>
 <td>0.0 > ? </td>
 <td>0.0</td>
 <td>s/(1000*PWM)</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS1">PWM_AUX_DIS1</strong> (INT32)</td>
 <td>PWM aux 1 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS2">PWM_AUX_DIS2</strong> (INT32)</td>
 <td>PWM aux 2 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS3">PWM_AUX_DIS3</strong> (INT32)</td>
 <td>PWM aux 3 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS4">PWM_AUX_DIS4</strong> (INT32)</td>
 <td>PWM aux 4 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS5">PWM_AUX_DIS5</strong> (INT32)</td>
 <td>PWM aux 5 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS6">PWM_AUX_DIS6</strong> (INT32)</td>
 <td>PWM aux 6 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS7">PWM_AUX_DIS7</strong> (INT32)</td>
 <td>PWM aux 7 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DIS8">PWM_AUX_DIS8</strong> (INT32)</td>
 <td>PWM aux 8 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_AUX_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_DISARM">PWM_AUX_DISARM</strong> (INT32)</td>
 <td>PWM aux disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. The main use of this parameter is to silence ESCs when they are disarmed.</p>   </td>
 <td>0 > 2200 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL1">PWM_AUX_FAIL1</strong> (INT32)</td>
 <td>PWM aux 1 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL2">PWM_AUX_FAIL2</strong> (INT32)</td>
 <td>PWM aux 2 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL3">PWM_AUX_FAIL3</strong> (INT32)</td>
 <td>PWM aux 3 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL4">PWM_AUX_FAIL4</strong> (INT32)</td>
 <td>PWM aux 4 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL5">PWM_AUX_FAIL5</strong> (INT32)</td>
 <td>PWM aux 5 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL6">PWM_AUX_FAIL6</strong> (INT32)</td>
 <td>PWM aux 6 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL7">PWM_AUX_FAIL7</strong> (INT32)</td>
 <td>PWM aux 7 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_FAIL8">PWM_AUX_FAIL8</strong> (INT32)</td>
 <td>PWM aux 8 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX">PWM_AUX_MAX</strong> (INT32)</td>
 <td>PWM aux maximum value <p><strong>Comment:</strong> Set to 2000 for industry default or 2100 to increase servo travel.</p>   </td>
 <td>1600 > 2200 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX1">PWM_AUX_MAX1</strong> (INT32)</td>
 <td>PWM aux 1 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX2">PWM_AUX_MAX2</strong> (INT32)</td>
 <td>PWM aux 2 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX3">PWM_AUX_MAX3</strong> (INT32)</td>
 <td>PWM aux 3 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX4">PWM_AUX_MAX4</strong> (INT32)</td>
 <td>PWM aux 4 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX5">PWM_AUX_MAX5</strong> (INT32)</td>
 <td>PWM aux 5 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX6">PWM_AUX_MAX6</strong> (INT32)</td>
 <td>PWM aux 6 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX7">PWM_AUX_MAX7</strong> (INT32)</td>
 <td>PWM aux 7 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MAX8">PWM_AUX_MAX8</strong> (INT32)</td>
 <td>PWM aux 8 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN">PWM_AUX_MIN</strong> (INT32)</td>
 <td>PWM aux minimum value <p><strong>Comment:</strong> Set to 1000 for industry default or 900 to increase servo travel.</p>   </td>
 <td>800 > 1400 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN1">PWM_AUX_MIN1</strong> (INT32)</td>
 <td>PWM aux 1 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN2">PWM_AUX_MIN2</strong> (INT32)</td>
 <td>PWM aux 2 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN3">PWM_AUX_MIN3</strong> (INT32)</td>
 <td>PWM aux 3 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN4">PWM_AUX_MIN4</strong> (INT32)</td>
 <td>PWM aux 4 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN5">PWM_AUX_MIN5</strong> (INT32)</td>
 <td>PWM aux 5 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN6">PWM_AUX_MIN6</strong> (INT32)</td>
 <td>PWM aux 6 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN7">PWM_AUX_MIN7</strong> (INT32)</td>
 <td>PWM aux 7 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_MIN8">PWM_AUX_MIN8</strong> (INT32)</td>
 <td>PWM aux 8 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_AUX_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_RATE">PWM_AUX_RATE</strong> (INT32)</td>
 <td>PWM aux output frequency <p><strong>Comment:</strong> Set to 400 for industry default or 1000 for high frequency ESCs. Set to 0 for Oneshot125.</p>   </td>
 <td>-1 > 2000 </td>
 <td>50</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_RATE1">PWM_AUX_RATE1</strong> (INT32)</td>
 <td>PWM aux 1 rate <p><strong>Comment:</strong> Set the default PWM output frequency for the aux outputs</p>   </td>
 <td>0 > 400 </td>
 <td>50</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV1">PWM_AUX_REV1</strong> (INT32)</td>
 <td>PWM aux 1 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV2">PWM_AUX_REV2</strong> (INT32)</td>
 <td>PWM aux 2 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV3">PWM_AUX_REV3</strong> (INT32)</td>
 <td>PWM aux 3 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV4">PWM_AUX_REV4</strong> (INT32)</td>
 <td>PWM aux 4 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV5">PWM_AUX_REV5</strong> (INT32)</td>
 <td>PWM aux 5 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV6">PWM_AUX_REV6</strong> (INT32)</td>
 <td>PWM aux 6 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV7">PWM_AUX_REV7</strong> (INT32)</td>
 <td>PWM aux 7 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_REV8">PWM_AUX_REV8</strong> (INT32)</td>
 <td>PWM aux 8 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM1">PWM_AUX_TRIM1</strong> (FLOAT)</td>
 <td>PWM aux 1 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM2">PWM_AUX_TRIM2</strong> (FLOAT)</td>
 <td>PWM aux 2 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM3">PWM_AUX_TRIM3</strong> (FLOAT)</td>
 <td>PWM aux 3 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM4">PWM_AUX_TRIM4</strong> (FLOAT)</td>
 <td>PWM aux 4 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM5">PWM_AUX_TRIM5</strong> (FLOAT)</td>
 <td>PWM aux 5 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM6">PWM_AUX_TRIM6</strong> (FLOAT)</td>
 <td>PWM aux 6 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM7">PWM_AUX_TRIM7</strong> (FLOAT)</td>
 <td>PWM aux 7 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_AUX_TRIM8">PWM_AUX_TRIM8</strong> (FLOAT)</td>
 <td>PWM aux 8 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS1">PWM_EXTRA_DIS1</strong> (INT32)</td>
 <td>PWM extra 1 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS2">PWM_EXTRA_DIS2</strong> (INT32)</td>
 <td>PWM extra 2 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS3">PWM_EXTRA_DIS3</strong> (INT32)</td>
 <td>PWM extra 3 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS4">PWM_EXTRA_DIS4</strong> (INT32)</td>
 <td>PWM extra 4 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS5">PWM_EXTRA_DIS5</strong> (INT32)</td>
 <td>PWM extra 5 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS6">PWM_EXTRA_DIS6</strong> (INT32)</td>
 <td>PWM extra 6 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS7">PWM_EXTRA_DIS7</strong> (INT32)</td>
 <td>PWM extra 7 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DIS8">PWM_EXTRA_DIS8</strong> (INT32)</td>
 <td>PWM extra 8 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_EXTRA_DISARM will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_DISARM">PWM_EXTRA_DISARM</strong> (INT32)</td>
 <td>PWM extra disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. The main use of this parameter is to silence ESCs when they are disarmed.</p>   </td>
 <td>0 > 2200 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL1">PWM_EXTRA_FAIL1</strong> (INT32)</td>
 <td>PWM extra 1 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL2">PWM_EXTRA_FAIL2</strong> (INT32)</td>
 <td>PWM extra 2 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL3">PWM_EXTRA_FAIL3</strong> (INT32)</td>
 <td>PWM extra 3 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL4">PWM_EXTRA_FAIL4</strong> (INT32)</td>
 <td>PWM extra 4 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL5">PWM_EXTRA_FAIL5</strong> (INT32)</td>
 <td>PWM extra 5 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL6">PWM_EXTRA_FAIL6</strong> (INT32)</td>
 <td>PWM extra 6 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL7">PWM_EXTRA_FAIL7</strong> (INT32)</td>
 <td>PWM extra 7 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_FAIL8">PWM_EXTRA_FAIL8</strong> (INT32)</td>
 <td>PWM extra 8 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX">PWM_EXTRA_MAX</strong> (INT32)</td>
 <td>PWM extra maximum value <p><strong>Comment:</strong> Set to 2000 for industry default or 2100 to increase servo travel.</p>   </td>
 <td>1600 > 2200 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX1">PWM_EXTRA_MAX1</strong> (INT32)</td>
 <td>PWM extra 1 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX2">PWM_EXTRA_MAX2</strong> (INT32)</td>
 <td>PWM extra 2 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX3">PWM_EXTRA_MAX3</strong> (INT32)</td>
 <td>PWM extra 3 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX4">PWM_EXTRA_MAX4</strong> (INT32)</td>
 <td>PWM extra 4 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX5">PWM_EXTRA_MAX5</strong> (INT32)</td>
 <td>PWM extra 5 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX6">PWM_EXTRA_MAX6</strong> (INT32)</td>
 <td>PWM extra 6 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX7">PWM_EXTRA_MAX7</strong> (INT32)</td>
 <td>PWM extra 7 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MAX8">PWM_EXTRA_MAX8</strong> (INT32)</td>
 <td>PWM extra 8 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN">PWM_EXTRA_MIN</strong> (INT32)</td>
 <td>PWM extra minimum value <p><strong>Comment:</strong> Set to 1000 for industry default or 900 to increase servo travel.</p>   </td>
 <td>800 > 1400 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN1">PWM_EXTRA_MIN1</strong> (INT32)</td>
 <td>PWM extra 1 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN2">PWM_EXTRA_MIN2</strong> (INT32)</td>
 <td>PWM extra 2 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN3">PWM_EXTRA_MIN3</strong> (INT32)</td>
 <td>PWM extra 3 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN4">PWM_EXTRA_MIN4</strong> (INT32)</td>
 <td>PWM extra 4 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN5">PWM_EXTRA_MIN5</strong> (INT32)</td>
 <td>PWM extra 5 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN6">PWM_EXTRA_MIN6</strong> (INT32)</td>
 <td>PWM extra 6 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN7">PWM_EXTRA_MIN7</strong> (INT32)</td>
 <td>PWM extra 7 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_MIN8">PWM_EXTRA_MIN8</strong> (INT32)</td>
 <td>PWM extra 8 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_EXTRA_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_RATE">PWM_EXTRA_RATE</strong> (INT32)</td>
 <td>PWM extra output frequency <p><strong>Comment:</strong> Set to 400 for industry default or 1000 for high frequency ESCs. Set to 0 for Oneshot125.</p>   </td>
 <td>-1 > 2000 </td>
 <td>50</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_RATE1">PWM_EXTRA_RATE1</strong> (INT32)</td>
 <td>PWM extra 1 rate <p><strong>Comment:</strong> Set the default PWM output frequency for the main outputs</p>   </td>
 <td>0 > 400 </td>
 <td>50</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV1">PWM_EXTRA_REV1</strong> (INT32)</td>
 <td>PWM extra 1 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV2">PWM_EXTRA_REV2</strong> (INT32)</td>
 <td>PWM extra 2 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV3">PWM_EXTRA_REV3</strong> (INT32)</td>
 <td>PWM extra 3 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV4">PWM_EXTRA_REV4</strong> (INT32)</td>
 <td>PWM extra 4 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV5">PWM_EXTRA_REV5</strong> (INT32)</td>
 <td>PWM extra 5 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV6">PWM_EXTRA_REV6</strong> (INT32)</td>
 <td>PWM extra 6 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV7">PWM_EXTRA_REV7</strong> (INT32)</td>
 <td>PWM extra 7 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_REV8">PWM_EXTRA_REV8</strong> (INT32)</td>
 <td>PWM extra 8 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM1">PWM_EXTRA_TRIM1</strong> (FLOAT)</td>
 <td>PWM extra 1 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM2">PWM_EXTRA_TRIM2</strong> (FLOAT)</td>
 <td>PWM extra 2 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM3">PWM_EXTRA_TRIM3</strong> (FLOAT)</td>
 <td>PWM extra 3 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM4">PWM_EXTRA_TRIM4</strong> (FLOAT)</td>
 <td>PWM extra 4 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM5">PWM_EXTRA_TRIM5</strong> (FLOAT)</td>
 <td>PWM extra 5 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM6">PWM_EXTRA_TRIM6</strong> (FLOAT)</td>
 <td>PWM extra 6 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM7">PWM_EXTRA_TRIM7</strong> (FLOAT)</td>
 <td>PWM extra 7 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_EXTRA_TRIM8">PWM_EXTRA_TRIM8</strong> (FLOAT)</td>
 <td>PWM extra 8 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS1">PWM_MAIN_DIS1</strong> (INT32)</td>
 <td>PWM main 1 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS10">PWM_MAIN_DIS10</strong> (INT32)</td>
 <td>PWM main 10 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS11">PWM_MAIN_DIS11</strong> (INT32)</td>
 <td>PWM main 11 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS12">PWM_MAIN_DIS12</strong> (INT32)</td>
 <td>PWM main 12 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS13">PWM_MAIN_DIS13</strong> (INT32)</td>
 <td>PWM main 13 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS14">PWM_MAIN_DIS14</strong> (INT32)</td>
 <td>PWM main 14 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS2">PWM_MAIN_DIS2</strong> (INT32)</td>
 <td>PWM main 2 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS3">PWM_MAIN_DIS3</strong> (INT32)</td>
 <td>PWM main 3 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS4">PWM_MAIN_DIS4</strong> (INT32)</td>
 <td>PWM main 4 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS5">PWM_MAIN_DIS5</strong> (INT32)</td>
 <td>PWM main 5 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS6">PWM_MAIN_DIS6</strong> (INT32)</td>
 <td>PWM main 6 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS7">PWM_MAIN_DIS7</strong> (INT32)</td>
 <td>PWM main 7 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS8">PWM_MAIN_DIS8</strong> (INT32)</td>
 <td>PWM main 8 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DIS9">PWM_MAIN_DIS9</strong> (INT32)</td>
 <td>PWM main 9 disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. When set to -1 the value for PWM_DISARMED will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_DISARM">PWM_MAIN_DISARM</strong> (INT32)</td>
 <td>PWM main disarmed value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if not armed. The main use of this parameter is to silence ESCs when they are disarmed.</p>   </td>
 <td>0 > 2200 </td>
 <td>900</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL1">PWM_MAIN_FAIL1</strong> (INT32)</td>
 <td>PWM main 1 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL10">PWM_MAIN_FAIL10</strong> (INT32)</td>
 <td>PWM main 10 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL11">PWM_MAIN_FAIL11</strong> (INT32)</td>
 <td>PWM main 11 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL12">PWM_MAIN_FAIL12</strong> (INT32)</td>
 <td>PWM main 12 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL13">PWM_MAIN_FAIL13</strong> (INT32)</td>
 <td>PWM main 13 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL14">PWM_MAIN_FAIL14</strong> (INT32)</td>
 <td>PWM main 14 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL2">PWM_MAIN_FAIL2</strong> (INT32)</td>
 <td>PWM main 2 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL3">PWM_MAIN_FAIL3</strong> (INT32)</td>
 <td>PWM main 3 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL4">PWM_MAIN_FAIL4</strong> (INT32)</td>
 <td>PWM main 4 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL5">PWM_MAIN_FAIL5</strong> (INT32)</td>
 <td>PWM main 5 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL6">PWM_MAIN_FAIL6</strong> (INT32)</td>
 <td>PWM main 6 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL7">PWM_MAIN_FAIL7</strong> (INT32)</td>
 <td>PWM main 7 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL8">PWM_MAIN_FAIL8</strong> (INT32)</td>
 <td>PWM main 8 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_FAIL9">PWM_MAIN_FAIL9</strong> (INT32)</td>
 <td>PWM main 9 failsafe value <p><strong>Comment:</strong> This is the PWM pulse the autopilot is outputting if in failsafe mode. When set to -1 the value is set automatically depending if the actuator is a motor (900us) or a servo (1500us)</p>   </td>
 <td>0 > 2150 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX">PWM_MAIN_MAX</strong> (INT32)</td>
 <td>PWM main maximum value <p><strong>Comment:</strong> Set to 2000 for industry default or 2100 to increase servo travel.</p>   </td>
 <td>1600 > 2200 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX1">PWM_MAIN_MAX1</strong> (INT32)</td>
 <td>PWM main 1 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX10">PWM_MAIN_MAX10</strong> (INT32)</td>
 <td>PWM main 10 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX11">PWM_MAIN_MAX11</strong> (INT32)</td>
 <td>PWM main 11 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX12">PWM_MAIN_MAX12</strong> (INT32)</td>
 <td>PWM main 12 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX13">PWM_MAIN_MAX13</strong> (INT32)</td>
 <td>PWM main 13 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX14">PWM_MAIN_MAX14</strong> (INT32)</td>
 <td>PWM main 14 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX2">PWM_MAIN_MAX2</strong> (INT32)</td>
 <td>PWM main 2 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX3">PWM_MAIN_MAX3</strong> (INT32)</td>
 <td>PWM main 3 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX4">PWM_MAIN_MAX4</strong> (INT32)</td>
 <td>PWM main 4 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX5">PWM_MAIN_MAX5</strong> (INT32)</td>
 <td>PWM main 5 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX6">PWM_MAIN_MAX6</strong> (INT32)</td>
 <td>PWM main 6 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX7">PWM_MAIN_MAX7</strong> (INT32)</td>
 <td>PWM main 7 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX8">PWM_MAIN_MAX8</strong> (INT32)</td>
 <td>PWM main 8 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MAX9">PWM_MAIN_MAX9</strong> (INT32)</td>
 <td>PWM main 9 maximum value <p><strong>Comment:</strong> This is the maximum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MAX will be used</p>   </td>
 <td>-1 > 2150 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN">PWM_MAIN_MIN</strong> (INT32)</td>
 <td>PWM main minimum value <p><strong>Comment:</strong> Set to 1000 for industry default or 900 to increase servo travel.</p>   </td>
 <td>800 > 1400 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN1">PWM_MAIN_MIN1</strong> (INT32)</td>
 <td>PWM main 1 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN10">PWM_MAIN_MIN10</strong> (INT32)</td>
 <td>PWM main 10 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN11">PWM_MAIN_MIN11</strong> (INT32)</td>
 <td>PWM main 11 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN12">PWM_MAIN_MIN12</strong> (INT32)</td>
 <td>PWM main 12 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN13">PWM_MAIN_MIN13</strong> (INT32)</td>
 <td>PWM main 13 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN14">PWM_MAIN_MIN14</strong> (INT32)</td>
 <td>PWM main 14 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN2">PWM_MAIN_MIN2</strong> (INT32)</td>
 <td>PWM main 2 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN3">PWM_MAIN_MIN3</strong> (INT32)</td>
 <td>PWM main 3 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN4">PWM_MAIN_MIN4</strong> (INT32)</td>
 <td>PWM main 4 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN5">PWM_MAIN_MIN5</strong> (INT32)</td>
 <td>PWM main 5 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN6">PWM_MAIN_MIN6</strong> (INT32)</td>
 <td>PWM main 6 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN7">PWM_MAIN_MIN7</strong> (INT32)</td>
 <td>PWM main 7 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN8">PWM_MAIN_MIN8</strong> (INT32)</td>
 <td>PWM main 8 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_MIN9">PWM_MAIN_MIN9</strong> (INT32)</td>
 <td>PWM main 9 minimum value <p><strong>Comment:</strong> This is the minimum PWM pulse the autopilot is allowed to output. When set to -1 the value for PWM_MIN will be used</p>   </td>
 <td>-1 > 1600 </td>
 <td>-1</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_RATE">PWM_MAIN_RATE</strong> (INT32)</td>
 <td>PWM main output frequency <p><strong>Comment:</strong> Set to 400 for industry default or 1000 for high frequency ESCs. Set to 0 for Oneshot125.</p>   </td>
 <td>-1 > 2000 </td>
 <td>400</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_RATE1">PWM_MAIN_RATE1</strong> (INT32)</td>
 <td>PWM main 1 rate <p><strong>Comment:</strong> Set the default PWM output frequency for the main outputs</p>   </td>
 <td>0 > 400 </td>
 <td>50</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV1">PWM_MAIN_REV1</strong> (INT32)</td>
 <td>PWM main 1 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV10">PWM_MAIN_REV10</strong> (INT32)</td>
 <td>PWM main 10 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV11">PWM_MAIN_REV11</strong> (INT32)</td>
 <td>PWM main 11 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV12">PWM_MAIN_REV12</strong> (INT32)</td>
 <td>PWM main 12 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV13">PWM_MAIN_REV13</strong> (INT32)</td>
 <td>PWM main 13 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV14">PWM_MAIN_REV14</strong> (INT32)</td>
 <td>PWM main 14 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV2">PWM_MAIN_REV2</strong> (INT32)</td>
 <td>PWM main 2 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV3">PWM_MAIN_REV3</strong> (INT32)</td>
 <td>PWM main 3 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV4">PWM_MAIN_REV4</strong> (INT32)</td>
 <td>PWM main 4 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV5">PWM_MAIN_REV5</strong> (INT32)</td>
 <td>PWM main 5 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV6">PWM_MAIN_REV6</strong> (INT32)</td>
 <td>PWM main 6 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV7">PWM_MAIN_REV7</strong> (INT32)</td>
 <td>PWM main 7 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV8">PWM_MAIN_REV8</strong> (INT32)</td>
 <td>PWM main 8 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_REV9">PWM_MAIN_REV9</strong> (INT32)</td>
 <td>PWM main 9 reverse value <p><strong>Comment:</strong> Enable to invert the channel. Warning: Use this parameter when connected to a servo only. For a brushless motor, invert manually two phases to reverse the direction.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM1">PWM_MAIN_TRIM1</strong> (FLOAT)</td>
 <td>PWM main 1 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM10">PWM_MAIN_TRIM10</strong> (FLOAT)</td>
 <td>PWM main 10 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM11">PWM_MAIN_TRIM11</strong> (FLOAT)</td>
 <td>PWM main 11 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM12">PWM_MAIN_TRIM12</strong> (FLOAT)</td>
 <td>PWM main 12 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM13">PWM_MAIN_TRIM13</strong> (FLOAT)</td>
 <td>PWM main 13 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM14">PWM_MAIN_TRIM14</strong> (FLOAT)</td>
 <td>PWM main 14 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM2">PWM_MAIN_TRIM2</strong> (FLOAT)</td>
 <td>PWM main 2 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM3">PWM_MAIN_TRIM3</strong> (FLOAT)</td>
 <td>PWM main 3 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM4">PWM_MAIN_TRIM4</strong> (FLOAT)</td>
 <td>PWM main 4 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM5">PWM_MAIN_TRIM5</strong> (FLOAT)</td>
 <td>PWM main 5 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM6">PWM_MAIN_TRIM6</strong> (FLOAT)</td>
 <td>PWM main 6 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM7">PWM_MAIN_TRIM7</strong> (FLOAT)</td>
 <td>PWM main 7 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM8">PWM_MAIN_TRIM8</strong> (FLOAT)</td>
 <td>PWM main 8 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_MAIN_TRIM9">PWM_MAIN_TRIM9</strong> (FLOAT)</td>
 <td>PWM main 9 trim value <p><strong>Comment:</strong> Set to normalized offset</p>   </td>
 <td>-0.2 > 0.2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PWM_SBUS_MODE">PWM_SBUS_MODE</strong> (INT32)</td>
 <td>S.BUS out <p><strong>Comment:</strong> Set to 1 to enable S.BUS version 1 output instead of RSSI.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="THR_MDL_FAC">THR_MDL_FAC</strong> (FLOAT)</td>
 <td>Thrust to motor control signal model parameter <p><strong>Comment:</strong> Parameter used to model the nonlinear relationship between motor control signal (e.g. PWM) and static thrust. The model is: rel_thrust = factor * rel_signal^2 + (1-factor) * rel_signal, where rel_thrust is the normalized thrust between 0 and 1, and rel_signal is the relative motor control signal between 0 and 1.</p>   </td>
 <td>0.0 > 1.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
</tbody></table>

## Peripheral

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="LIGHT_EN_BLINKM">LIGHT_EN_BLINKM</strong> (INT32)</td>
 <td>BlinkM LED    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
</tbody></table>

## Precision Land

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="PLD_BTOUT">PLD_BTOUT</strong> (FLOAT)</td>
 <td>Landing Target Timeout <p><strong>Comment:</strong> Time after which the landing target is considered lost without any new measurements.</p>   </td>
 <td>0.0 > 50 (0.5)</td>
 <td>5.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="PLD_FAPPR_ALT">PLD_FAPPR_ALT</strong> (FLOAT)</td>
 <td>Final approach altitude <p><strong>Comment:</strong> Allow final approach (without horizontal positioning) if losing landing target closer than this to the ground.</p>   </td>
 <td>0.0 > 10 (0.1)</td>
 <td>0.1</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="PLD_HACC_RAD">PLD_HACC_RAD</strong> (FLOAT)</td>
 <td>Horizontal acceptance radius <p><strong>Comment:</strong> Start descending if closer above landing target than this.</p>   </td>
 <td>0.0 > 10 (0.1)</td>
 <td>0.2</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="PLD_MAX_SRCH">PLD_MAX_SRCH</strong> (INT32)</td>
 <td>Maximum number of search attempts <p><strong>Comment:</strong> Maximum number of times to seach for the landing target if it is lost during the precision landing.</p>   </td>
 <td>0 > 100 </td>
 <td>3</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PLD_SRCH_ALT">PLD_SRCH_ALT</strong> (FLOAT)</td>
 <td>Search altitude <p><strong>Comment:</strong> Altitude above home to which to climb when searching for the landing target.</p>   </td>
 <td>0.0 > 100 (0.1)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="PLD_SRCH_TOUT">PLD_SRCH_TOUT</strong> (FLOAT)</td>
 <td>Search timeout <p><strong>Comment:</strong> Time allowed to search for the landing target before falling back to normal landing.</p>   </td>
 <td>0.0 > 100 (0.1)</td>
 <td>10.0</td>
 <td>s</td>
</tr>
</tbody></table>

## RTPS

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RTPS_CONFIG">RTPS_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for FastRTPS <p><strong>Comment:</strong> Configure on which serial port to run FastRTPS.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RTPS_MAV_CONFIG">RTPS_MAV_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for MAVLink + FastRTPS <p><strong>Comment:</strong> Configure on which serial port to run MAVLink + FastRTPS.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Radio Calibration

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RC10_DZ">RC10_DZ</strong> (FLOAT)</td>
 <td>RC channel 10 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC10_MAX">RC10_MAX</strong> (FLOAT)</td>
 <td>RC channel 10 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC10_MIN">RC10_MIN</strong> (FLOAT)</td>
 <td>RC channel 10 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC10_REV">RC10_REV</strong> (FLOAT)</td>
 <td>RC channel 10 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC10_TRIM">RC10_TRIM</strong> (FLOAT)</td>
 <td>RC channel 10 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC11_DZ">RC11_DZ</strong> (FLOAT)</td>
 <td>RC channel 11 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC11_MAX">RC11_MAX</strong> (FLOAT)</td>
 <td>RC channel 11 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC11_MIN">RC11_MIN</strong> (FLOAT)</td>
 <td>RC channel 11 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC11_REV">RC11_REV</strong> (FLOAT)</td>
 <td>RC channel 11 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC11_TRIM">RC11_TRIM</strong> (FLOAT)</td>
 <td>RC channel 11 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC12_DZ">RC12_DZ</strong> (FLOAT)</td>
 <td>RC channel 12 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC12_MAX">RC12_MAX</strong> (FLOAT)</td>
 <td>RC channel 12 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC12_MIN">RC12_MIN</strong> (FLOAT)</td>
 <td>RC channel 12 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC12_REV">RC12_REV</strong> (FLOAT)</td>
 <td>RC channel 12 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC12_TRIM">RC12_TRIM</strong> (FLOAT)</td>
 <td>RC channel 12 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC13_DZ">RC13_DZ</strong> (FLOAT)</td>
 <td>RC channel 13 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC13_MAX">RC13_MAX</strong> (FLOAT)</td>
 <td>RC channel 13 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC13_MIN">RC13_MIN</strong> (FLOAT)</td>
 <td>RC channel 13 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC13_REV">RC13_REV</strong> (FLOAT)</td>
 <td>RC channel 13 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC13_TRIM">RC13_TRIM</strong> (FLOAT)</td>
 <td>RC channel 13 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC14_DZ">RC14_DZ</strong> (FLOAT)</td>
 <td>RC channel 14 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC14_MAX">RC14_MAX</strong> (FLOAT)</td>
 <td>RC channel 14 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC14_MIN">RC14_MIN</strong> (FLOAT)</td>
 <td>RC channel 14 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC14_REV">RC14_REV</strong> (FLOAT)</td>
 <td>RC channel 14 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC14_TRIM">RC14_TRIM</strong> (FLOAT)</td>
 <td>RC channel 14 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC15_DZ">RC15_DZ</strong> (FLOAT)</td>
 <td>RC channel 15 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC15_MAX">RC15_MAX</strong> (FLOAT)</td>
 <td>RC channel 15 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC15_MIN">RC15_MIN</strong> (FLOAT)</td>
 <td>RC channel 15 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC15_REV">RC15_REV</strong> (FLOAT)</td>
 <td>RC channel 15 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC15_TRIM">RC15_TRIM</strong> (FLOAT)</td>
 <td>RC channel 15 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC16_DZ">RC16_DZ</strong> (FLOAT)</td>
 <td>RC channel 16 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC16_MAX">RC16_MAX</strong> (FLOAT)</td>
 <td>RC channel 16 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC16_MIN">RC16_MIN</strong> (FLOAT)</td>
 <td>RC channel 16 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC16_REV">RC16_REV</strong> (FLOAT)</td>
 <td>RC channel 16 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC16_TRIM">RC16_TRIM</strong> (FLOAT)</td>
 <td>RC channel 16 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC17_DZ">RC17_DZ</strong> (FLOAT)</td>
 <td>RC channel 17 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC17_MAX">RC17_MAX</strong> (FLOAT)</td>
 <td>RC channel 17 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC17_MIN">RC17_MIN</strong> (FLOAT)</td>
 <td>RC channel 17 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC17_REV">RC17_REV</strong> (FLOAT)</td>
 <td>RC channel 17 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC17_TRIM">RC17_TRIM</strong> (FLOAT)</td>
 <td>RC channel 17 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC18_DZ">RC18_DZ</strong> (FLOAT)</td>
 <td>RC channel 18 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC18_MAX">RC18_MAX</strong> (FLOAT)</td>
 <td>RC channel 18 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC18_MIN">RC18_MIN</strong> (FLOAT)</td>
 <td>RC channel 18 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC18_REV">RC18_REV</strong> (FLOAT)</td>
 <td>RC channel 18 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC18_TRIM">RC18_TRIM</strong> (FLOAT)</td>
 <td>RC channel 18 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC1_DZ">RC1_DZ</strong> (FLOAT)</td>
 <td>RC channel 1 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC1_MAX">RC1_MAX</strong> (FLOAT)</td>
 <td>RC channel 1 maximum <p><strong>Comment:</strong> Maximum value for RC channel 1</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC1_MIN">RC1_MIN</strong> (FLOAT)</td>
 <td>RC channel 1 minimum <p><strong>Comment:</strong> Minimum value for RC channel 1</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC1_REV">RC1_REV</strong> (FLOAT)</td>
 <td>RC channel 1 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC1_TRIM">RC1_TRIM</strong> (FLOAT)</td>
 <td>RC channel 1 trim <p><strong>Comment:</strong> Mid point value (same as min for throttle)</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC2_DZ">RC2_DZ</strong> (FLOAT)</td>
 <td>RC channel 2 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC2_MAX">RC2_MAX</strong> (FLOAT)</td>
 <td>RC channel 2 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC2_MIN">RC2_MIN</strong> (FLOAT)</td>
 <td>RC channel 2 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC2_REV">RC2_REV</strong> (FLOAT)</td>
 <td>RC channel 2 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC2_TRIM">RC2_TRIM</strong> (FLOAT)</td>
 <td>RC channel 2 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC3_DZ">RC3_DZ</strong> (FLOAT)</td>
 <td>RC channel 3 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC3_MAX">RC3_MAX</strong> (FLOAT)</td>
 <td>RC channel 3 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC3_MIN">RC3_MIN</strong> (FLOAT)</td>
 <td>RC channel 3 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC3_REV">RC3_REV</strong> (FLOAT)</td>
 <td>RC channel 3 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC3_TRIM">RC3_TRIM</strong> (FLOAT)</td>
 <td>RC channel 3 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC4_DZ">RC4_DZ</strong> (FLOAT)</td>
 <td>RC channel 4 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC4_MAX">RC4_MAX</strong> (FLOAT)</td>
 <td>RC channel 4 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC4_MIN">RC4_MIN</strong> (FLOAT)</td>
 <td>RC channel 4 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC4_REV">RC4_REV</strong> (FLOAT)</td>
 <td>RC channel 4 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC4_TRIM">RC4_TRIM</strong> (FLOAT)</td>
 <td>RC channel 4 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC5_DZ">RC5_DZ</strong> (FLOAT)</td>
 <td>RC channel 5 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC5_MAX">RC5_MAX</strong> (FLOAT)</td>
 <td>RC channel 5 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC5_MIN">RC5_MIN</strong> (FLOAT)</td>
 <td>RC channel 5 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC5_REV">RC5_REV</strong> (FLOAT)</td>
 <td>RC channel 5 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC5_TRIM">RC5_TRIM</strong> (FLOAT)</td>
 <td>RC channel 5 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC6_DZ">RC6_DZ</strong> (FLOAT)</td>
 <td>RC channel 6 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC6_MAX">RC6_MAX</strong> (FLOAT)</td>
 <td>RC channel 6 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC6_MIN">RC6_MIN</strong> (FLOAT)</td>
 <td>RC channel 6 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC6_REV">RC6_REV</strong> (FLOAT)</td>
 <td>RC channel 6 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC6_TRIM">RC6_TRIM</strong> (FLOAT)</td>
 <td>RC channel 6 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC7_DZ">RC7_DZ</strong> (FLOAT)</td>
 <td>RC channel 7 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC7_MAX">RC7_MAX</strong> (FLOAT)</td>
 <td>RC channel 7 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC7_MIN">RC7_MIN</strong> (FLOAT)</td>
 <td>RC channel 7 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC7_REV">RC7_REV</strong> (FLOAT)</td>
 <td>RC channel 7 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC7_TRIM">RC7_TRIM</strong> (FLOAT)</td>
 <td>RC channel 7 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC8_DZ">RC8_DZ</strong> (FLOAT)</td>
 <td>RC channel 8 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC8_MAX">RC8_MAX</strong> (FLOAT)</td>
 <td>RC channel 8 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC8_MIN">RC8_MIN</strong> (FLOAT)</td>
 <td>RC channel 8 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC8_REV">RC8_REV</strong> (FLOAT)</td>
 <td>RC channel 8 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC8_TRIM">RC8_TRIM</strong> (FLOAT)</td>
 <td>RC channel 8 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC9_DZ">RC9_DZ</strong> (FLOAT)</td>
 <td>RC channel 9 dead zone <p><strong>Comment:</strong> The +- range of this value around the trim value will be considered as zero.</p>   </td>
 <td>0.0 > 100.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC9_MAX">RC9_MAX</strong> (FLOAT)</td>
 <td>RC channel 9 maximum <p><strong>Comment:</strong> Maximum value for this channel.</p>   </td>
 <td>1500.0 > 2200.0 </td>
 <td>2000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC9_MIN">RC9_MIN</strong> (FLOAT)</td>
 <td>RC channel 9 minimum <p><strong>Comment:</strong> Minimum value for this channel.</p>   </td>
 <td>800.0 > 1500.0 </td>
 <td>1000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC9_REV">RC9_REV</strong> (FLOAT)</td>
 <td>RC channel 9 reverse <p><strong>Comment:</strong> Set to -1 to reverse channel.</p> <strong>Values:</strong><ul>
<li><strong>-1.0:</strong> Reverse</li> 

<li><strong>1.0:</strong> Normal</li> 
</ul>
  </td>
 <td>-1.0 > 1.0 </td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC9_TRIM">RC9_TRIM</strong> (FLOAT)</td>
 <td>RC channel 9 trim <p><strong>Comment:</strong> Mid point value (has to be set to the same as min for throttle channel).</p>   </td>
 <td>800.0 > 2200.0 </td>
 <td>1500</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC_CHAN_CNT">RC_CHAN_CNT</strong> (INT32)</td>
 <td>RC channel count <p><strong>Comment:</strong> This parameter is used by Ground Station software to save the number of channels which were used during RC calibration. It is only meant for ground station use.</p>   </td>
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_FAILS_THR">RC_FAILS_THR</strong> (INT32)</td>
 <td>Failsafe channel PWM threshold <p><strong>Comment:</strong> Set to a value slightly above the PWM value assumed by throttle in a failsafe event, but ensure it is below the PWM value assumed by throttle during normal operation. Use RC_MAP_FAILSAFE to specify which channel is used to check. Note: The default value of 0 is below the epxed range and hence disables the feature.</p>   </td>
 <td>0 > 2200 </td>
 <td>0</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="RC_MAP_AUX1">RC_MAP_AUX1</strong> (INT32)</td>
 <td>AUX1 Passthrough RC channel <p><strong>Comment:</strong> Default function: Camera pitch</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_AUX2">RC_MAP_AUX2</strong> (INT32)</td>
 <td>AUX2 Passthrough RC channel <p><strong>Comment:</strong> Default function: Camera roll</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_AUX3">RC_MAP_AUX3</strong> (INT32)</td>
 <td>AUX3 Passthrough RC channel <p><strong>Comment:</strong> Default function: Camera azimuth / yaw</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_AUX4">RC_MAP_AUX4</strong> (INT32)</td>
 <td>AUX4 Passthrough RC channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_AUX5">RC_MAP_AUX5</strong> (INT32)</td>
 <td>AUX5 Passthrough RC channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_AUX6">RC_MAP_AUX6</strong> (INT32)</td>
 <td>AUX6 Passthrough RC channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_FAILSAFE">RC_MAP_FAILSAFE</strong> (INT32)</td>
 <td>Failsafe channel mapping <p><strong>Comment:</strong> Configures which channel is used by the receiver to indicate the signal was lost. Futaba receivers do report that way. If 0, whichever channel is mapped to throttle is used otherwise the value indicates the specific RC channel to use Use RC_FAILS_THR to set the threshold indicating lost signal. By default it's below the expected range and hence diabled.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_PARAM1">RC_MAP_PARAM1</strong> (INT32)</td>
 <td>PARAM1 tuning channel <p><strong>Comment:</strong> Can be used for parameter tuning with the RC. This one is further referenced as the 1st parameter channel. Set to 0 to deactivate *</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_PARAM2">RC_MAP_PARAM2</strong> (INT32)</td>
 <td>PARAM2 tuning channel <p><strong>Comment:</strong> Can be used for parameter tuning with the RC. This one is further referenced as the 2nd parameter channel. Set to 0 to deactivate *</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_PARAM3">RC_MAP_PARAM3</strong> (INT32)</td>
 <td>PARAM3 tuning channel <p><strong>Comment:</strong> Can be used for parameter tuning with the RC. This one is further referenced as the 3th parameter channel. Set to 0 to deactivate *</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_PITCH">RC_MAP_PITCH</strong> (INT32)</td>
 <td>Pitch control channel mapping <p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading pitch inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_ROLL">RC_MAP_ROLL</strong> (INT32)</td>
 <td>Roll control channel mapping <p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading roll inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_THROTTLE">RC_MAP_THROTTLE</strong> (INT32)</td>
 <td>Throttle control channel mapping <p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading throttle inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_YAW">RC_MAP_YAW</strong> (INT32)</td>
 <td>Yaw control channel mapping <p><strong>Comment:</strong> The channel index (starting from 1 for channel 1) indicates which channel should be used for reading yaw inputs from. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_RSSI_PWM_CHAN">RC_RSSI_PWM_CHAN</strong> (INT32)</td>
 <td>PWM input channel that provides RSSI <p><strong>Comment:</strong> 0: do not read RSSI from input channel 1-18: read RSSI from specified input channel Specify the range for RSSI input with RC_RSSI_PWM_MIN and RC_RSSI_PWM_MAX parameters.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_RSSI_PWM_MAX">RC_RSSI_PWM_MAX</strong> (INT32)</td>
 <td>Max input value for RSSI reading <p><strong>Comment:</strong> Only used if RC_RSSI_PWM_CHAN > 0</p>   </td>
 <td>0 > 2000 </td>
 <td>2000</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_RSSI_PWM_MIN">RC_RSSI_PWM_MIN</strong> (INT32)</td>
 <td>Min input value for RSSI reading <p><strong>Comment:</strong> Only used if RC_RSSI_PWM_CHAN > 0</p>   </td>
 <td>0 > 2000 </td>
 <td>1000</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIM_PITCH">TRIM_PITCH</strong> (FLOAT)</td>
 <td>Pitch trim <p><strong>Comment:</strong> The trim value is the actuator control value the system needs for straight and level flight. It can be calibrated by flying manually straight and level using the RC trims and copying them using the GCS.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIM_ROLL">TRIM_ROLL</strong> (FLOAT)</td>
 <td>Roll trim <p><strong>Comment:</strong> The trim value is the actuator control value the system needs for straight and level flight. It can be calibrated by flying manually straight and level using the RC trims and copying them using the GCS.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TRIM_YAW">TRIM_YAW</strong> (FLOAT)</td>
 <td>Yaw trim <p><strong>Comment:</strong> The trim value is the actuator control value the system needs for straight and level flight. It can be calibrated by flying manually straight and level using the RC trims and copying them using the GCS.</p>   </td>
 <td>-0.25 > 0.25 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
</tbody></table>

## Radio Switches

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RC_ACRO_TH">RC_ACRO_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting acro mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_ARMSWITCH_TH">RC_ARMSWITCH_TH</strong> (FLOAT)</td>
 <td>Threshold for the arm switch <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_ASSIST_TH">RC_ASSIST_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting assist mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.25</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_AUTO_TH">RC_AUTO_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting auto mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_GEAR_TH">RC_GEAR_TH</strong> (FLOAT)</td>
 <td>Threshold for the landing gear switch <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_KILLSWITCH_TH">RC_KILLSWITCH_TH</strong> (FLOAT)</td>
 <td>Threshold for the kill switch <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_LOITER_TH">RC_LOITER_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting loiter mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAN_TH">RC_MAN_TH</strong> (FLOAT)</td>
 <td>Threshold for the manual switch <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_ACRO_SW">RC_MAP_ACRO_SW</strong> (INT32)</td>
 <td>Acro switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_ARM_SW">RC_MAP_ARM_SW</strong> (INT32)</td>
 <td>Arm switch channel <p><strong>Comment:</strong> Use it to arm/disarm via switch instead of default throttle stick. If this is assigned, arming and disarming via stick is disabled.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_FLAPS">RC_MAP_FLAPS</strong> (INT32)</td>
 <td>Flaps channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_FLTMODE">RC_MAP_FLTMODE</strong> (INT32)</td>
 <td>Single channel flight mode selection <p><strong>Comment:</strong> If this parameter is non-zero, flight modes are only selected by this channel and are assigned to six slots.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_GEAR_SW">RC_MAP_GEAR_SW</strong> (INT32)</td>
 <td>Landing gear switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_KILL_SW">RC_MAP_KILL_SW</strong> (INT32)</td>
 <td>Emergency Kill switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_LOITER_SW">RC_MAP_LOITER_SW</strong> (INT32)</td>
 <td>Loiter switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_MAN_SW">RC_MAP_MAN_SW</strong> (INT32)</td>
 <td>Manual switch channel mapping  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_MODE_SW">RC_MAP_MODE_SW</strong> (INT32)</td>
 <td>Mode switch channel mapping <p><strong>Comment:</strong> This is the main flight mode selector. The channel index (starting from 1 for channel 1) indicates which channel should be used for deciding about the main mode. A value of zero indicates the switch is not assigned.</p> <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_OFFB_SW">RC_MAP_OFFB_SW</strong> (INT32)</td>
 <td>Offboard switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_POSCTL_SW">RC_MAP_POSCTL_SW</strong> (INT32)</td>
 <td>Position Control switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_RATT_SW">RC_MAP_RATT_SW</strong> (INT32)</td>
 <td>Rattitude switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_RETURN_SW">RC_MAP_RETURN_SW</strong> (INT32)</td>
 <td>Return switch channel  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_STAB_SW">RC_MAP_STAB_SW</strong> (INT32)</td>
 <td>Stabilize switch channel mapping  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_MAP_TRANS_SW">RC_MAP_TRANS_SW</strong> (INT32)</td>
 <td>VTOL transition switch channel mapping  <strong>Values:</strong><ul>
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
 <td>0 > 18 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_OFFB_TH">RC_OFFB_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting offboard mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_POSCTL_TH">RC_POSCTL_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting posctl mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_RATT_TH">RC_RATT_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting rattitude mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_RETURN_TH">RC_RETURN_TH</strong> (FLOAT)</td>
 <td>Threshold for selecting return to launch mode <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_STAB_TH">RC_STAB_TH</strong> (FLOAT)</td>
 <td>Threshold for the stabilize switch <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RC_TRANS_TH">RC_TRANS_TH</strong> (FLOAT)</td>
 <td>Threshold for the VTOL transition switch <p><strong>Comment:</strong> 0-1 indicate where in the full channel range the threshold sits 0 : min 1 : max sign indicates polarity of comparison positive : true when channel>th negative : true when channel<th</p>   </td>
 <td>-1 > 1 </td>
 <td>0.75</td>
 <td></td>
</tr>
</tbody></table>

## Return Mode

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RTL_CONE_ANG">RTL_CONE_ANG</strong> (INT32)</td>
 <td>Half-angle of the return mode altitude cone <p><strong>Comment:</strong> Defines the half-angle of a cone centered around the destination position that affects the altitude at which the vehicle returns.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> No cone, always climb to RTL_RETURN_ALT above destination.</li> 

<li><strong>25:</strong> 25 degrees half cone angle.</li> 

<li><strong>45:</strong> 45 degrees half cone angle.</li> 

<li><strong>65:</strong> 65 degrees half cone angle.</li> 

<li><strong>80:</strong> 80 degrees half cone angle.</li> 

<li><strong>90:</strong> Only climb to at least RTL_DESCEND_ALT above destination.</li> 
</ul>
  </td>
 <td>0 > 90 </td>
 <td>45</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="RTL_DESCEND_ALT">RTL_DESCEND_ALT</strong> (FLOAT)</td>
 <td>Return mode loiter altitude <p><strong>Comment:</strong> Descend to this altitude (above destination position) after return, and wait for time defined in RTL_LAND_DELAY. Land (i.e. slowly descend) from this altitude if autolanding allowed.</p>   </td>
 <td>2 > 100 (0.5)</td>
 <td>30</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="RTL_LAND_DELAY">RTL_LAND_DELAY</strong> (FLOAT)</td>
 <td>Return mode delay <p><strong>Comment:</strong> Delay before landing (after initial descent) in Return mode. If set to -1 the system will not land but loiter at RTL_DESCEND_ALT.</p>   </td>
 <td>-1 > 300 (0.5)</td>
 <td>0.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="RTL_MIN_DIST">RTL_MIN_DIST</strong> (FLOAT)</td>
 <td>Horizontal radius from return point within which special rules for return mode apply <p><strong>Comment:</strong> The return altitude will be calculated based on RTL_CONE_ANG parameter. The yaw setpoint will switch to the one defined by corresponding waypoint.</p>   </td>
 <td>0.5 > 100 (0.5)</td>
 <td>10.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="RTL_RETURN_ALT">RTL_RETURN_ALT</strong> (FLOAT)</td>
 <td>Return mode return altitude <p><strong>Comment:</strong> Default minimum altitude above destination (e.g. home, safe point, landing pattern) for return flight. This is affected by RTL_MIN_DIST and RTL_CONE_ANG.</p>   </td>
 <td>0 > 150 (0.5)</td>
 <td>60</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="RTL_TYPE">RTL_TYPE</strong> (INT32)</td>
 <td>Return type <p><strong>Comment:</strong> Return mode destination and flight path (home location, rally point, mission landing pattern, reverse mission)</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Return to closest safe point (home or rally point) via direct path.</li> 

<li><strong>1:</strong> Return to closest safe point other than home (mission landing pattern or rally point), via direct path. If no mission landing or rally points are defined return home via direct path.</li> 

<li><strong>2:</strong> Return to a planned mission landing, if available, using the mission path, else return to home via the reverse mission path. Do not consider rally points.</li> 

<li><strong>3:</strong> Return via direct path to closest destination: home, start of mission landing pattern or safe point. If the destination is a mission landing pattern, follow the pattern to land.</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Return To Land

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RTL_PLD_MD">RTL_PLD_MD</strong> (INT32)</td>
 <td>RTL precision land mode <p><strong>Comment:</strong> Use precision landing when doing an RTL landing phase.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> No precision landing</li> 

<li><strong>1:</strong> Opportunistic precision landing</li> 

<li><strong>2:</strong> Required precision landing</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Roboclaw

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RBCLW_SER_CFG">RBCLW_SER_CFG</strong> (INT32)</td>
 <td>Serial Configuration for Roboclaw Driver <p><strong>Comment:</strong> Configure on which serial port to run Roboclaw Driver.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Roboclaw driver

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RBCLW_ADDRESS">RBCLW_ADDRESS</strong> (INT32)</td>
 <td>Address of the Roboclaw <p><strong>Comment:</strong> The Roboclaw can be configured to have an address from 0x80 to 0x87, inclusive. It must be configured to match this parameter.</p> <strong>Values:</strong><ul>
<li><strong>128:</strong> 0x80</li> 

<li><strong>129:</strong> 0x81</li> 

<li><strong>130:</strong> 0x82</li> 

<li><strong>131:</strong> 0x83</li> 

<li><strong>132:</strong> 0x84</li> 

<li><strong>133:</strong> 0x85</li> 

<li><strong>134:</strong> 0x86</li> 

<li><strong>135:</strong> 0x87</li> 
</ul>
  </td>
 <td>128 > 135 </td>
 <td>128</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RBCLW_BAUD">RBCLW_BAUD</strong> (INT32)</td>
 <td>Roboclaw serial baud rate <p><strong>Comment:</strong> Baud rate of the serial communication with the Roboclaw. The Roboclaw must be configured to match this rate.</p> <strong>Values:</strong><ul>
<li><strong>2400:</strong> 2400 baud</li> 

<li><strong>9600:</strong> 9600 baud</li> 

<li><strong>19200:</strong> 19200 baud</li> 

<li><strong>38400:</strong> 38400 baud</li> 

<li><strong>57600:</strong> 57600 baud</li> 

<li><strong>115200:</strong> 115200 baud</li> 

<li><strong>230400:</strong> 230400 baud</li> 

<li><strong>460800:</strong> 460800 baud</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>2400 > 460800 </td>
 <td>2400</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RBCLW_COUNTS_REV">RBCLW_COUNTS_REV</strong> (INT32)</td>
 <td>Encoder counts per revolution <p><strong>Comment:</strong> Number of encoder counts for one revolution. The roboclaw treats analog encoders (potentiometers) as having 2047 counts per rev. The default value of 1200 corresponds to the default configuration of the Aion R1 rover.</p>   </td>
 <td>1 > ? </td>
 <td>1200</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RBCLW_READ_PER">RBCLW_READ_PER</strong> (INT32)</td>
 <td>Encoder read period <p><strong>Comment:</strong> How long to wait, in Milliseconds, between reading wheel encoder values over Uart from the Roboclaw</p>   </td>
 <td>1 > 1000 </td>
 <td>10</td>
 <td>ms</td>
</tr>
<tr>
 <td><strong id="RBCLW_WRITE_PER">RBCLW_WRITE_PER</strong> (INT32)</td>
 <td>Uart write period <p><strong>Comment:</strong> How long to wait, in Milliseconds, between writing actuator controls over Uart to the Roboclaw</p>   </td>
 <td>1 > 1000 </td>
 <td>10</td>
 <td>ms</td>
</tr>
</tbody></table>

## Rover Position Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="GND_L1_DAMPING">GND_L1_DAMPING</strong> (FLOAT)</td>
 <td>L1 damping <p><strong>Comment:</strong> Damping factor for L1 control.</p>   </td>
 <td>0.6 > 0.9 (0.05)</td>
 <td>0.75</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GND_L1_DIST">GND_L1_DIST</strong> (FLOAT)</td>
 <td>L1 distance <p><strong>Comment:</strong> This is the distance at which the next waypoint is activated. This should be set to about 2-4x of GND_WHEEL_BASE and not smaller than one meter (due to GPS accuracy).</p>   </td>
 <td>1.0 > 50.0 (0.1)</td>
 <td>1.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="GND_L1_PERIOD">GND_L1_PERIOD</strong> (FLOAT)</td>
 <td>L1 period <p><strong>Comment:</strong> This is the L1 distance and defines the tracking point ahead of the rover it's following. Use values around 2-5m for a 0.3m wheel base. Tuning instructions: Shorten slowly during tuning until response is sharp without oscillation.</p>   </td>
 <td>0.5 > 50.0 (0.5)</td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="GND_MAN_Y_MAX">GND_MAN_Y_MAX</strong> (FLOAT)</td>
 <td>Max manual yaw rate    </td>
 <td>0.0 > 400 </td>
 <td>150.0</td>
 <td>deg/s</td>
</tr>
<tr>
 <td><strong id="GND_MAX_ANG">GND_MAX_ANG</strong> (FLOAT)</td>
 <td>Maximum turn angle for Ackerman steering.
At a control output of 0, the steering wheels are at 0 radians.
At a control output of 1, the steering wheels are at GND_MAX_ANG radians    </td>
 <td>0.0 > 3.14159 (0.01)</td>
 <td>0.7854</td>
 <td>rad</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_D">GND_SPEED_D</strong> (FLOAT)</td>
 <td>Speed proportional gain <p><strong>Comment:</strong> This is the derivative gain for the speed closed loop controller</p>   </td>
 <td>0.00 > 50.0 (0.005)</td>
 <td>0.001</td>
 <td>%m/s</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_I">GND_SPEED_I</strong> (FLOAT)</td>
 <td>Speed Integral gain <p><strong>Comment:</strong> This is the integral gain for the speed closed loop controller</p>   </td>
 <td>0.00 > 50.0 (0.005)</td>
 <td>3.0</td>
 <td>%m/s</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_IMAX">GND_SPEED_IMAX</strong> (FLOAT)</td>
 <td>Speed integral maximum value <p><strong>Comment:</strong> This is the maxim value the integral can reach to prevent wind-up.</p>   </td>
 <td>0.005 > 50.0 (0.005)</td>
 <td>1.0</td>
 <td>%m/s</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_MAX">GND_SPEED_MAX</strong> (FLOAT)</td>
 <td>Maximum ground speed    </td>
 <td>0.0 > 40 (0.5)</td>
 <td>10.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_P">GND_SPEED_P</strong> (FLOAT)</td>
 <td>Speed proportional gain <p><strong>Comment:</strong> This is the proportional gain for the speed closed loop controller</p>   </td>
 <td>0.005 > 50.0 (0.005)</td>
 <td>2.0</td>
 <td>%m/s</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_THR_SC">GND_SPEED_THR_SC</strong> (FLOAT)</td>
 <td>Speed to throttle scaler <p><strong>Comment:</strong> This is a gain to map the speed control output to the throttle linearly.</p>   </td>
 <td>0.005 > 50.0 (0.005)</td>
 <td>1.0</td>
 <td>%m/s</td>
</tr>
<tr>
 <td><strong id="GND_SPEED_TRIM">GND_SPEED_TRIM</strong> (FLOAT)</td>
 <td>Trim ground speed    </td>
 <td>0.0 > 40 (0.5)</td>
 <td>3.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="GND_SP_CTRL_MODE">GND_SP_CTRL_MODE</strong> (INT32)</td>
 <td>Control mode for speed <p><strong>Comment:</strong> This allows the user to choose between closed loop gps speed or open loop cruise throttle speed</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> open loop control</li> 

<li><strong>1:</strong> close the loop with gps speed</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="GND_THR_CRUISE">GND_THR_CRUISE</strong> (FLOAT)</td>
 <td>Cruise throttle <p><strong>Comment:</strong> This is the throttle setting required to achieve the desired cruise speed. 10% is ok for a traxxas stampede vxl with ESC set to training mode</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.1</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="GND_THR_MAX">GND_THR_MAX</strong> (FLOAT)</td>
 <td>Throttle limit max <p><strong>Comment:</strong> This is the maximum throttle % that can be used by the controller. For a Traxxas stampede vxl with the ESC set to training, 30 % is enough</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.3</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="GND_THR_MIN">GND_THR_MIN</strong> (FLOAT)</td>
 <td>Throttle limit min <p><strong>Comment:</strong> This is the minimum throttle % that can be used by the controller. Set to 0 for rover</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="GND_WHEEL_BASE">GND_WHEEL_BASE</strong> (FLOAT)</td>
 <td>Distance from front axle to rear axle <p><strong>Comment:</strong> A value of 0.31 is typical for 1/10 RC cars.</p>   </td>
 <td>0.0 > ? (0.01)</td>
 <td>0.31</td>
 <td>m</td>
</tr>
</tbody></table>

## Runway Takeoff

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RWTO_AIRSPD_SCL">RWTO_AIRSPD_SCL</strong> (FLOAT)</td>
 <td>Min. airspeed scaling factor for takeoff.
Pitch up will be commanded when the following airspeed is reached:
FW_AIRSPD_MIN * RWTO_AIRSPD_SCL    </td>
 <td>0.0 > 2.0 (0.01)</td>
 <td>1.3</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="RWTO_HDG">RWTO_HDG</strong> (INT32)</td>
 <td>Specifies which heading should be held during runnway takeoff <p><strong>Comment:</strong> 0: airframe heading, 1: heading towards takeoff waypoint</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Airframe</li> 

<li><strong>1:</strong> Waypoint</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RWTO_MAX_PITCH">RWTO_MAX_PITCH</strong> (FLOAT)</td>
 <td>Max pitch during takeoff.
Fixed-wing settings are used if set to 0. Note that there is also a minimum
pitch of 10 degrees during takeoff, so this must be larger if set    </td>
 <td>0.0 > 60.0 (0.5)</td>
 <td>20.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="RWTO_MAX_ROLL">RWTO_MAX_ROLL</strong> (FLOAT)</td>
 <td>Max roll during climbout.
Roll is limited during climbout to ensure enough lift and prevents aggressive
navigation before we're on a safe height    </td>
 <td>0.0 > 60.0 (0.5)</td>
 <td>25.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="RWTO_MAX_THR">RWTO_MAX_THR</strong> (FLOAT)</td>
 <td>Max throttle during runway takeoff.
(Can be used to test taxi on runway)    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td>norm</td>
</tr>
<tr>
 <td><strong id="RWTO_NAV_ALT">RWTO_NAV_ALT</strong> (FLOAT)</td>
 <td>Altitude AGL at which we have enough ground clearance to allow some roll.
Until RWTO_NAV_ALT is reached the plane is held level and only
rudder is used to keep the heading (see RWTO_HDG). This should be below
FW_CLMBOUT_DIFF if FW_CLMBOUT_DIFF > 0    </td>
 <td>0.0 > 100.0 (1)</td>
 <td>5.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="RWTO_PSP">RWTO_PSP</strong> (FLOAT)</td>
 <td>Pitch setpoint during taxi / before takeoff airspeed is reached.
A taildragger with stearable wheel might need to pitch up
a little to keep it's wheel on the ground before airspeed
to takeoff is reached    </td>
 <td>-10.0 > 20.0 (0.5)</td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="RWTO_RAMP_TIME">RWTO_RAMP_TIME</strong> (FLOAT)</td>
 <td>Throttle ramp up time for runway takeoff    </td>
 <td>1.0 > 15.0 (0.1)</td>
 <td>2.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="RWTO_TKOFF">RWTO_TKOFF</strong> (INT32)</td>
 <td>Runway takeoff with landing gear    </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
</tbody></table>

## SD Logging

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="SDLOG_BOOT_BAT">SDLOG_BOOT_BAT</strong> (INT32)</td>
 <td>Battery-only Logging <p><strong>Comment:</strong> When enabled, logging will not start from boot if battery power is not detected (e.g. powered via USB on a test bench). This prevents extraneous flight logs from being created during bench testing. Note that this only applies to log-from-boot modes. This has no effect on arm-based modes.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SDLOG_DIRS_MAX">SDLOG_DIRS_MAX</strong> (INT32)</td>
 <td>Maximum number of log directories to keep <p><strong>Comment:</strong> If there are more log directories than this value, the system will delete the oldest directories during startup. In addition, the system will delete old logs if there is not enough free space left. The minimum amount is 300 MB. If this is set to 0, old directories will only be removed if the free space falls below the minimum. Note: this does not apply to mission log files.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1000 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SDLOG_MISSION">SDLOG_MISSION</strong> (INT32)</td>
 <td>Mission Log <p><strong>Comment:</strong> If enabled, a small additional "mission" log file will be written to the SD card. The log contains just those messages that are useful for tasks like generating flight statistics and geotagging. The different modes can be used to further reduce the logged data (and thus the log file size). For example, choose geotagging mode to only log data required for geotagging. Note that the normal/full log is still created, and contains all the data in the mission log (and more).</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> All mission messages</li> 

<li><strong>2:</strong> Geotagging messages</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SDLOG_MODE">SDLOG_MODE</strong> (INT32)</td>
 <td>Logging Mode <p><strong>Comment:</strong> Determines when to start and stop logging. By default, logging is started when arming the system, and stopped when disarming.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> disabled</li> 

<li><strong>0:</strong> when armed until disarm (default)</li> 

<li><strong>1:</strong> from boot until disarm</li> 

<li><strong>2:</strong> from boot until shutdown</li> 

<li><strong>3:</strong> depending on AUX1 RC channel</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SDLOG_PROFILE">SDLOG_PROFILE</strong> (INT32)</td>
 <td>Logging topic profile (integer bitmask) <p><strong>Comment:</strong> This integer bitmask controls the set and rates of logged topics. The default allows for general log analysis and estimator replay, while keeping the log file size reasonably small. Enabling multiple sets leads to higher bandwidth requirements and larger log files. Set bits true to enable: 0 : Default set (used for general log analysis) 1 : Full rate estimator (EKF2) replay topics 2 : Topics for thermal calibration (high rate raw IMU and Baro sensor data) 3 : Topics for system identification (high rate actuator control and IMU data) 4 : Full rates for analysis of fast maneuvers (RC, attitude, rates and actuators) 5 : Debugging topics (debug_*.msg topics, for custom code) 6 : Topics for sensor comparison (low rate raw IMU, Baro and Magnetomer data) 7 : Topics for computer vision and collision avoidance 8 : Raw FIFO high-rate IMU (Gyro) 9 : Raw FIFO high-rate IMU (Accel)</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> Default set (general log analysis)</li> 
  <li><strong>1:</strong> Estimator replay (EKF2)</li> 
  <li><strong>2:</strong> Thermal calibration</li> 
  <li><strong>3:</strong> System identification</li> 
  <li><strong>4:</strong> High rate</li> 
  <li><strong>5:</strong> Debug</li> 
  <li><strong>6:</strong> Sensor comparison</li> 
  <li><strong>7:</strong> Computer Vision and Avoidance</li> 
  <li><strong>8:</strong> Raw FIFO high-rate IMU (Gyro)</li> 
  <li><strong>9:</strong> Raw FIFO high-rate IMU (Accel)</li> 
</ul>
 <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1023 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SDLOG_UTC_OFFSET">SDLOG_UTC_OFFSET</strong> (INT32)</td>
 <td>UTC offset (unit: min) <p><strong>Comment:</strong> the difference in hours and minutes from Coordinated Universal Time (UTC) for a your place and date. for example, In case of South Korea(UTC+09:00), UTC offset is 540 min (9*60) refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets</p>   </td>
 <td>-1000 > 1000 </td>
 <td>0</td>
 <td>min</td>
</tr>
<tr>
 <td><strong id="SDLOG_UUID">SDLOG_UUID</strong> (INT32)</td>
 <td>Log UUID <p><strong>Comment:</strong> If set to 1, add an ID to the log, which uniquely identifies the vehicle</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
</tbody></table>

## SITL

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="SIM_BAT_DRAIN">SIM_BAT_DRAIN</strong> (FLOAT)</td>
 <td>Simulator Battery drain interval    </td>
 <td>1 > 86400 (1)</td>
 <td>60</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="SIM_BAT_MIN_PCT">SIM_BAT_MIN_PCT</strong> (FLOAT)</td>
 <td>Simulator Battery minimal percentage. Can be used to alter
the battery level during SITL- or HITL-simulation on the fly.
Particularly useful for testing different low-battery behaviour    </td>
 <td>0 > 100 (0.1)</td>
 <td>50.0</td>
 <td>%</td>
</tr>
</tbody></table>

## Sensor Calibration

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CAL_ACC0_ID">CAL_ACC0_ID</strong> (INT32)</td>
 <td>ID of the Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_PRIO">CAL_ACC0_PRIO</strong> (INT32)</td>
 <td>Accelerometer 0 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_ROT">CAL_ACC0_ROT</strong> (INT32)</td>
 <td>Rotation of accelerometer 0 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_XOFF">CAL_ACC0_XOFF</strong> (FLOAT)</td>
 <td>Accelerometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_XSCALE">CAL_ACC0_XSCALE</strong> (FLOAT)</td>
 <td>Accelerometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_YOFF">CAL_ACC0_YOFF</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_YSCALE">CAL_ACC0_YSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_ZOFF">CAL_ACC0_ZOFF</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC0_ZSCALE">CAL_ACC0_ZSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_ID">CAL_ACC1_ID</strong> (INT32)</td>
 <td>ID of the Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_PRIO">CAL_ACC1_PRIO</strong> (INT32)</td>
 <td>Accelerometer 1 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_ROT">CAL_ACC1_ROT</strong> (INT32)</td>
 <td>Rotation of accelerometer 1 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_XOFF">CAL_ACC1_XOFF</strong> (FLOAT)</td>
 <td>Accelerometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_XSCALE">CAL_ACC1_XSCALE</strong> (FLOAT)</td>
 <td>Accelerometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_YOFF">CAL_ACC1_YOFF</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_YSCALE">CAL_ACC1_YSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_ZOFF">CAL_ACC1_ZOFF</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC1_ZSCALE">CAL_ACC1_ZSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_ID">CAL_ACC2_ID</strong> (INT32)</td>
 <td>ID of the Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_PRIO">CAL_ACC2_PRIO</strong> (INT32)</td>
 <td>Accelerometer 2 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_ROT">CAL_ACC2_ROT</strong> (INT32)</td>
 <td>Rotation of accelerometer 2 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_XOFF">CAL_ACC2_XOFF</strong> (FLOAT)</td>
 <td>Accelerometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_XSCALE">CAL_ACC2_XSCALE</strong> (FLOAT)</td>
 <td>Accelerometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_YOFF">CAL_ACC2_YOFF</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_YSCALE">CAL_ACC2_YSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_ZOFF">CAL_ACC2_ZOFF</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC2_ZSCALE">CAL_ACC2_ZSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_ID">CAL_ACC3_ID</strong> (INT32)</td>
 <td>ID of the Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_PRIO">CAL_ACC3_PRIO</strong> (INT32)</td>
 <td>Accelerometer 3 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_ROT">CAL_ACC3_ROT</strong> (INT32)</td>
 <td>Rotation of accelerometer 3 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_XOFF">CAL_ACC3_XOFF</strong> (FLOAT)</td>
 <td>Accelerometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_XSCALE">CAL_ACC3_XSCALE</strong> (FLOAT)</td>
 <td>Accelerometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_YOFF">CAL_ACC3_YOFF</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_YSCALE">CAL_ACC3_YSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_ZOFF">CAL_ACC3_ZOFF</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_ACC3_ZSCALE">CAL_ACC3_ZSCALE</strong> (FLOAT)</td>
 <td>Accelerometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO0_ID">CAL_GYRO0_ID</strong> (INT32)</td>
 <td>ID of the Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO0_PRIO">CAL_GYRO0_PRIO</strong> (INT32)</td>
 <td>Gyro 0 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO0_ROT">CAL_GYRO0_ROT</strong> (INT32)</td>
 <td>Rotation of gyro 0 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO0_XOFF">CAL_GYRO0_XOFF</strong> (FLOAT)</td>
 <td>Gyro X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO0_YOFF">CAL_GYRO0_YOFF</strong> (FLOAT)</td>
 <td>Gyro Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO0_ZOFF">CAL_GYRO0_ZOFF</strong> (FLOAT)</td>
 <td>Gyro Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO1_ID">CAL_GYRO1_ID</strong> (INT32)</td>
 <td>ID of the Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO1_PRIO">CAL_GYRO1_PRIO</strong> (INT32)</td>
 <td>Gyro 1 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO1_ROT">CAL_GYRO1_ROT</strong> (INT32)</td>
 <td>Rotation of gyro 1 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO1_XOFF">CAL_GYRO1_XOFF</strong> (FLOAT)</td>
 <td>Gyro X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO1_YOFF">CAL_GYRO1_YOFF</strong> (FLOAT)</td>
 <td>Gyro Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO1_ZOFF">CAL_GYRO1_ZOFF</strong> (FLOAT)</td>
 <td>Gyro Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO2_ID">CAL_GYRO2_ID</strong> (INT32)</td>
 <td>ID of the Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO2_PRIO">CAL_GYRO2_PRIO</strong> (INT32)</td>
 <td>Gyro 2 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO2_ROT">CAL_GYRO2_ROT</strong> (INT32)</td>
 <td>Rotation of gyro 2 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO2_XOFF">CAL_GYRO2_XOFF</strong> (FLOAT)</td>
 <td>Gyro X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO2_YOFF">CAL_GYRO2_YOFF</strong> (FLOAT)</td>
 <td>Gyro Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO2_ZOFF">CAL_GYRO2_ZOFF</strong> (FLOAT)</td>
 <td>Gyro Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO3_ID">CAL_GYRO3_ID</strong> (INT32)</td>
 <td>ID of the Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO3_PRIO">CAL_GYRO3_PRIO</strong> (INT32)</td>
 <td>Gyro 3 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO3_ROT">CAL_GYRO3_ROT</strong> (INT32)</td>
 <td>Rotation of gyro 3 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO3_XOFF">CAL_GYRO3_XOFF</strong> (FLOAT)</td>
 <td>Gyro X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO3_YOFF">CAL_GYRO3_YOFF</strong> (FLOAT)</td>
 <td>Gyro Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_GYRO3_ZOFF">CAL_GYRO3_ZOFF</strong> (FLOAT)</td>
 <td>Gyro Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_ID">CAL_MAG0_ID</strong> (INT32)</td>
 <td>ID of Magnetometer the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_PRIO">CAL_MAG0_PRIO</strong> (INT32)</td>
 <td>Mag 0 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_ROT">CAL_MAG0_ROT</strong> (INT32)</td>
 <td>Rotation of magnetometer 0 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_XCOMP">CAL_MAG0_XCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
X component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_XODIAG">CAL_MAG0_XODIAG</strong> (FLOAT)</td>
 <td>Magnetometer X-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_XOFF">CAL_MAG0_XOFF</strong> (FLOAT)</td>
 <td>Magnetometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_XSCALE">CAL_MAG0_XSCALE</strong> (FLOAT)</td>
 <td>Magnetometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_YCOMP">CAL_MAG0_YCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Y component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_YODIAG">CAL_MAG0_YODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_YOFF">CAL_MAG0_YOFF</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_YSCALE">CAL_MAG0_YSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_ZCOMP">CAL_MAG0_ZCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Z component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_ZODIAG">CAL_MAG0_ZODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_ZOFF">CAL_MAG0_ZOFF</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG0_ZSCALE">CAL_MAG0_ZSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_ID">CAL_MAG1_ID</strong> (INT32)</td>
 <td>ID of Magnetometer the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_PRIO">CAL_MAG1_PRIO</strong> (INT32)</td>
 <td>Mag 1 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_ROT">CAL_MAG1_ROT</strong> (INT32)</td>
 <td>Rotation of magnetometer 1 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_XCOMP">CAL_MAG1_XCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
X component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_XODIAG">CAL_MAG1_XODIAG</strong> (FLOAT)</td>
 <td>Magnetometer X-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_XOFF">CAL_MAG1_XOFF</strong> (FLOAT)</td>
 <td>Magnetometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_XSCALE">CAL_MAG1_XSCALE</strong> (FLOAT)</td>
 <td>Magnetometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_YCOMP">CAL_MAG1_YCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Y component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_YODIAG">CAL_MAG1_YODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_YOFF">CAL_MAG1_YOFF</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_YSCALE">CAL_MAG1_YSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_ZCOMP">CAL_MAG1_ZCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Z component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_ZODIAG">CAL_MAG1_ZODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_ZOFF">CAL_MAG1_ZOFF</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG1_ZSCALE">CAL_MAG1_ZSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_ID">CAL_MAG2_ID</strong> (INT32)</td>
 <td>ID of Magnetometer the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_PRIO">CAL_MAG2_PRIO</strong> (INT32)</td>
 <td>Mag 2 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_ROT">CAL_MAG2_ROT</strong> (INT32)</td>
 <td>Rotation of magnetometer 2 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_XCOMP">CAL_MAG2_XCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
X component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_XODIAG">CAL_MAG2_XODIAG</strong> (FLOAT)</td>
 <td>Magnetometer X-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_XOFF">CAL_MAG2_XOFF</strong> (FLOAT)</td>
 <td>Magnetometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_XSCALE">CAL_MAG2_XSCALE</strong> (FLOAT)</td>
 <td>Magnetometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_YCOMP">CAL_MAG2_YCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Y component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_YODIAG">CAL_MAG2_YODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_YOFF">CAL_MAG2_YOFF</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_YSCALE">CAL_MAG2_YSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_ZCOMP">CAL_MAG2_ZCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Z component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_ZODIAG">CAL_MAG2_ZODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_ZOFF">CAL_MAG2_ZOFF</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG2_ZSCALE">CAL_MAG2_ZSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_ID">CAL_MAG3_ID</strong> (INT32)</td>
 <td>ID of Magnetometer the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_PRIO">CAL_MAG3_PRIO</strong> (INT32)</td>
 <td>Mag 3 priority  <strong>Values:</strong><ul>
<li><strong>-1:</strong>  Uninitialized</li> 

<li><strong>0:</strong>   Disabled</li> 

<li><strong>1:</strong>   Min</li> 

<li><strong>25:</strong>  Low</li> 

<li><strong>50:</strong>  Medium (Default)</li> 

<li><strong>75:</strong>  High</li> 

<li><strong>100:</strong> Max</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_ROT">CAL_MAG3_ROT</strong> (INT32)</td>
 <td>Rotation of magnetometer 3 relative to airframe <p><strong>Comment:</strong> An internal sensor will force a value of -1, so a GCS should only attempt to configure the rotation if the value is greater than or equal to zero.</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> Internal</li> 

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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_XCOMP">CAL_MAG3_XCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
X component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_XODIAG">CAL_MAG3_XODIAG</strong> (FLOAT)</td>
 <td>Magnetometer X-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_XOFF">CAL_MAG3_XOFF</strong> (FLOAT)</td>
 <td>Magnetometer X-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_XSCALE">CAL_MAG3_XSCALE</strong> (FLOAT)</td>
 <td>Magnetometer X-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_YCOMP">CAL_MAG3_YCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Y component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_YODIAG">CAL_MAG3_YODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_YOFF">CAL_MAG3_YOFF</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_YSCALE">CAL_MAG3_YSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Y-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_ZCOMP">CAL_MAG3_ZCOMP</strong> (FLOAT)</td>
 <td>Coefficient describing linear relationship between
Z component of magnetometer in body frame axis
and either current or throttle depending on value of CAL_MAG_COMP_TYP
Unit for throttle-based compensation is [G] and
for current-based compensation [G/kA]    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_ZODIAG">CAL_MAG3_ZODIAG</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis off diagonal factor    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_ZOFF">CAL_MAG3_ZOFF</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis offset    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG3_ZSCALE">CAL_MAG3_ZSCALE</strong> (FLOAT)</td>
 <td>Magnetometer Z-axis scaling factor    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG_COMP_TYP">CAL_MAG_COMP_TYP</strong> (INT32)</td>
 <td>Type of magnetometer compensation  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Throttle-based compensation</li> 

<li><strong>2:</strong> Current-based compensation (battery_status instance 0)</li> 

<li><strong>3:</strong> Current-based compensation (battery_status instance 1)</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_DPRES_ANSC">SENS_DPRES_ANSC</strong> (FLOAT)</td>
 <td>Differential pressure sensor analog scaling <p><strong>Comment:</strong> Pick the appropriate scaling from the datasheet. this number defines the (linear) conversion from voltage to Pascal (pa). For the MPXV7002DP this is 1000. NOTE: If the sensor always registers zero, try switching the static and dynamic tubes.</p>   </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_DPRES_OFF">SENS_DPRES_OFF</strong> (FLOAT)</td>
 <td>Differential pressure sensor offset <p><strong>Comment:</strong> The offset (zero-reading) in Pascal</p>   </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_FLOW_MAXHGT">SENS_FLOW_MAXHGT</strong> (FLOAT)</td>
 <td>Maximum height above ground when reliant on optical flow <p><strong>Comment:</strong> This parameter defines the maximum distance from ground at which the optical flow sensor operates reliably. The height setpoint will be limited to be no greater than this value when the navigation system is completely reliant on optical flow data and the height above ground estimate is valid. The sensor may be usable above this height, but accuracy will progressively degrade.</p>   </td>
 <td>1.0 > 25.0 (0.1)</td>
 <td>3.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="SENS_FLOW_MAXR">SENS_FLOW_MAXR</strong> (FLOAT)</td>
 <td>Magnitude of maximum angular flow rate reliably measurable by the optical flow sensor.
Optical flow data will not fused by the estimators if the magnitude of the flow rate exceeds this value and
control loops will be instructed to limit ground speed such that the flow rate produced by movement over ground
is less than 50% of this value    </td>
 <td>1.0 > ? </td>
 <td>2.5</td>
 <td>rad/s</td>
</tr>
<tr>
 <td><strong id="SENS_FLOW_MINHGT">SENS_FLOW_MINHGT</strong> (FLOAT)</td>
 <td>Minimum height above ground when reliant on optical flow <p><strong>Comment:</strong> This parameter defines the minimum distance from ground at which the optical flow sensor operates reliably. The sensor may be usable below this height, but accuracy will progressively reduce to loss of focus.</p>   </td>
 <td>0.0 > 1.0 (0.1)</td>
 <td>0.7</td>
 <td>m</td>
</tr>
</tbody></table>

## Sensors

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="BAT_C_MULT">BAT_C_MULT</strong> (FLOAT)</td>
 <td>Capacity/current multiplier for high-current capable SMBUS battery    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="BAT_SMBUS_MODEL">BAT_SMBUS_MODEL</strong> (INT32)</td>
 <td>Battery device model  <strong>Values:</strong><ul>
<li><strong>0:</strong> AutoDetect</li> 

<li><strong>1:</strong> BQ40Z50 based</li> 

<li><strong>2:</strong> BQ40Z80 based</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_AIR_CMODEL">CAL_AIR_CMODEL</strong> (INT32)</td>
 <td>Airspeed sensor compensation model for the SDP3x <p><strong>Comment:</strong> Model with Pitot CAL_AIR_TUBED_MM: Not used, 1.5 mm tubes assumed. CAL_AIR_TUBELEN: Length of the tubes connecting the pitot to the sensor. Model without Pitot (1.5 mm tubes) CAL_AIR_TUBED_MM: Not used, 1.5 mm tubes assumed. CAL_AIR_TUBELEN: Length of the tubes connecting the pitot to the sensor. Tube Pressure Drop CAL_AIR_TUBED_MM: Diameter in mm of the pitot and tubes, must have the same diameter. CAL_AIR_TUBELEN: Length of the tubes connecting the pitot to the sensor and the static + dynamic port length of the pitot.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Model with Pitot</li> 

<li><strong>1:</strong> Model without Pitot (1.5 mm tubes)</li> 

<li><strong>2:</strong> Tube Pressure Drop</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_AIR_TUBED_MM">CAL_AIR_TUBED_MM</strong> (FLOAT)</td>
 <td>Airspeed sensor tube diameter. Only used for the Tube Pressure Drop Compensation    </td>
 <td>0.1 > 100 </td>
 <td>1.5</td>
 <td>mm</td>
</tr>
<tr>
 <td><strong id="CAL_AIR_TUBELEN">CAL_AIR_TUBELEN</strong> (FLOAT)</td>
 <td>Airspeed sensor tube length <p><strong>Comment:</strong> See the CAL_AIR_CMODEL explanation on how this parameter should be set.</p>   </td>
 <td>0.01 > 2.00 </td>
 <td>0.2</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="CAL_MAG_ROT_AUTO">CAL_MAG_ROT_AUTO</strong> (INT32)</td>
 <td>Automatically set external rotations <p><strong>Comment:</strong> During calibration attempt to automatically determine the rotation of external magnetometers.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CAL_MAG_SIDES">CAL_MAG_SIDES</strong> (INT32)</td>
 <td>Bitfield selecting mag sides for calibration <p><strong>Comment:</strong> If set to two side calibration, only the offsets are estimated, the scale calibration is left unchanged. Thus an initial six side calibration is recommended. Bits: ORIENTATION_TAIL_DOWN = 1 ORIENTATION_NOSE_DOWN = 2 ORIENTATION_LEFT = 4 ORIENTATION_RIGHT = 8 ORIENTATION_UPSIDE_DOWN = 16 ORIENTATION_RIGHTSIDE_UP = 32</p> <strong>Values:</strong><ul>
<li><strong>34:</strong> Two side calibration</li> 

<li><strong>38:</strong> Three side calibration</li> 

<li><strong>63:</strong> Six side calibration</li> 
</ul>
  </td>
 <td>34 > 63 </td>
 <td>63</td>
 <td></td>
</tr>
<tr>
 <td><strong id="IMU_ACCEL_CUTOFF">IMU_ACCEL_CUTOFF</strong> (FLOAT)</td>
 <td>Low pass filter cutoff frequency for accel <p><strong>Comment:</strong> The cutoff frequency for the 2nd order butterworth filter on the primary accelerometer. This only affects the signal sent to the controllers, not the estimators. 0 disables the filter.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1000 </td>
 <td>30.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_DGYRO_CUTOFF">IMU_DGYRO_CUTOFF</strong> (FLOAT)</td>
 <td>Cutoff frequency for angular acceleration (D-Term filter) <p><strong>Comment:</strong> The cutoff frequency for the 2nd order butterworth filter used on the time derivative of the measured angular velocity, also known as the D-term filter in the rate controller. The D-term uses the derivative of the rate and thus is the most susceptible to noise. Therefore, using a D-term filter allows to increase IMU_GYRO_CUTOFF, which leads to reduced control latency and permits to increase the P gains. A value of 0 disables the filter.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1000 </td>
 <td>30.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_CUTOFF">IMU_GYRO_CUTOFF</strong> (FLOAT)</td>
 <td>Low pass filter cutoff frequency for gyro <p><strong>Comment:</strong> The cutoff frequency for the 2nd order butterworth filter on the primary gyro. This only affects the angular velocity sent to the controllers, not the estimators. It applies also to the angular acceleration (D-Term filter), see IMU_DGYRO_CUTOFF. A value of 0 disables the filter.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1000 </td>
 <td>30.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_FFT_EN">IMU_GYRO_FFT_EN</strong> (INT32)</td>
 <td>IMU gyro FFT enable    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_FFT_MAX">IMU_GYRO_FFT_MAX</strong> (FLOAT)</td>
 <td>IMU gyro FFT maximum frequency    <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 1000 </td>
 <td>200.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_FFT_MIN">IMU_GYRO_FFT_MIN</strong> (FLOAT)</td>
 <td>IMU gyro FFT minimum frequency    <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 1000 </td>
 <td>50.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_NF_BW">IMU_GYRO_NF_BW</strong> (FLOAT)</td>
 <td>Notch filter bandwidth for gyro <p><strong>Comment:</strong> The frequency width of the stop band for the 2nd order notch filter on the primary gyro. See "IMU_GYRO_NF_FREQ" to activate the filter and to set the notch frequency. Applies to both angular velocity and angular acceleration sent to the controllers.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 100 </td>
 <td>20.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_NF_FREQ">IMU_GYRO_NF_FREQ</strong> (FLOAT)</td>
 <td>Notch filter frequency for gyro <p><strong>Comment:</strong> The center frequency for the 2nd order notch filter on the primary gyro. This filter can be enabled to avoid feedback amplification of structural resonances at a specific frequency. This only affects the signal sent to the controllers, not the estimators. Applies to both angular velocity and angular acceleration sent to the controllers. See "IMU_GYRO_NF_BW" to set the bandwidth of the filter. A value of 0 disables the filter.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1000 </td>
 <td>0.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_GYRO_RATEMAX">IMU_GYRO_RATEMAX</strong> (INT32)</td>
 <td>Gyro control data maximum publication rate <p><strong>Comment:</strong> This is the maximum rate the gyro control data (sensor_gyro) will be allowed to publish at. Set to 0 to disable and publish at the native sensor sample rate.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> 0 (no limit)</li> 

<li><strong>50:</strong> 50 Hz</li> 

<li><strong>250:</strong> 250 Hz</li> 

<li><strong>400:</strong> 400 Hz</li> 

<li><strong>1000:</strong> 1000 Hz</li> 

<li><strong>2000:</strong> 2000 Hz</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 2000 </td>
 <td>0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="IMU_INTEG_RATE">IMU_INTEG_RATE</strong> (INT32)</td>
 <td>IMU integration rate <p><strong>Comment:</strong> The rate at which raw IMU data is integrated to produce delta angles and delta velocities. Recommended to set this to a multiple of the estimator update period (currently 10 ms for ekf2).</p> <strong>Values:</strong><ul>
<li><strong>100:</strong> 100 Hz</li> 

<li><strong>200:</strong> 200 Hz</li> 

<li><strong>400:</strong> 400 Hz</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>100 > 1000 </td>
 <td>200</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="INA226_CONFIG">INA226_CONFIG</strong> (INT32)</td>
 <td>INA226 Power Monitor Config    </td>
 <td>0 > 65535 (1)</td>
 <td>18139</td>
 <td></td>
</tr>
<tr>
 <td><strong id="INA226_CURRENT">INA226_CURRENT</strong> (FLOAT)</td>
 <td>INA226 Power Monitor Max Current    </td>
 <td>0.1 > 200.0 (0.1)</td>
 <td>164.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="INA226_SHUNT">INA226_SHUNT</strong> (FLOAT)</td>
 <td>INA226 Power Monitor Shunt    </td>
 <td>0.000000001 > 0.1 (.000000001)</td>
 <td>0.0005</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PCF8583_ADDR">PCF8583_ADDR</strong> (INT32)</td>
 <td>PCF8583 rotorfreq (i2c) i2c address  <strong>Values:</strong><ul>
<li><strong>80:</strong> Address 0x50 (80)</li> 

<li><strong>81:</strong> Address 0x51 (81)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>80</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PCF8583_MAGNET">PCF8583_MAGNET</strong> (INT32)</td>
 <td>PCF8583 rotorfreq (i2c) pulse count <p><strong>Comment:</strong> Nmumber of signals per rotation of actuator</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > ? </td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="PCF8583_POOL">PCF8583_POOL</strong> (INT32)</td>
 <td>PCF8583 rotorfreq (i2c) pool interval
How often the sensor is readout    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1000000</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="PCF8583_RESET">PCF8583_RESET</strong> (INT32)</td>
 <td>PCF8583 rotorfreq (i2c) pulse reset value <p><strong>Comment:</strong> Internal device counter is reset to 0 when overun this value, counter is able to store upto 6 digits reset of counter takes some time - measurement with reset has worse accurancy. 0 means reset counter after every measurement.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>500000</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_BARO_QNH">SENS_BARO_QNH</strong> (FLOAT)</td>
 <td>QNH for barometer    <p><b>Reboot required:</b> true</p>
</td>
 <td>500 > 1500 </td>
 <td>1013.25</td>
 <td>hPa</td>
</tr>
<tr>
 <td><strong id="SENS_BARO_RATE">SENS_BARO_RATE</strong> (FLOAT)</td>
 <td>Baro max rate <p><strong>Comment:</strong> Barometric air data maximum publication rate. This is an upper bound, actual barometric data rate is still dependant on the sensor.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 200 </td>
 <td>20.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="SENS_BOARD_ROT">SENS_BOARD_ROT</strong> (INT32)</td>
 <td>Board rotation <p><strong>Comment:</strong> This parameter defines the rotation of the FMU board relative to the platform.</p> <strong>Values:</strong><ul>
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

<li><strong>26:</strong> Pitch 180°, Yaw 90°</li> 

<li><strong>27:</strong> Pitch 180°, Yaw 270°</li> 

<li><strong>28:</strong> Roll 90°, Pitch 90°</li> 

<li><strong>29:</strong> Roll 180°, Pitch 90°</li> 

<li><strong>30:</strong> Roll 270°, Pitch 90°</li> 

<li><strong>31:</strong> Roll 90°, Pitch 180°</li> 

<li><strong>32:</strong> Roll 270°, Pitch 180°</li> 

<li><strong>33:</strong> Roll 90°, Pitch 270°</li> 

<li><strong>34:</strong> Roll 180°, Pitch 270°</li> 

<li><strong>35:</strong> Roll 270°, Pitch 270°</li> 

<li><strong>36:</strong> Roll 90°, Pitch 180°, Yaw 90°</li> 

<li><strong>37:</strong> Roll 90°, Yaw 270°</li> 

<li><strong>38:</strong> Roll 90°, Pitch 68°, Yaw 293°</li> 

<li><strong>39:</strong> Pitch 315°</li> 

<li><strong>40:</strong> Roll 90°, Pitch 315°</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>-1 > 40 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_BOARD_X_OFF">SENS_BOARD_X_OFF</strong> (FLOAT)</td>
 <td>Board rotation X (Roll) offset <p><strong>Comment:</strong> This parameter defines a rotational offset in degrees around the X (Roll) axis It allows the user to fine tune the board offset in the event of misalignment.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="SENS_BOARD_Y_OFF">SENS_BOARD_Y_OFF</strong> (FLOAT)</td>
 <td>Board rotation Y (Pitch) offset <p><strong>Comment:</strong> This parameter defines a rotational offset in degrees around the Y (Pitch) axis. It allows the user to fine tune the board offset in the event of misalignment.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="SENS_BOARD_Z_OFF">SENS_BOARD_Z_OFF</strong> (FLOAT)</td>
 <td>Board rotation Z (YAW) offset <p><strong>Comment:</strong> This parameter defines a rotational offset in degrees around the Z (Yaw) axis. It allows the user to fine tune the board offset in the event of misalignment.</p>   </td>
 <td></td>
 <td>0.0</td>
 <td>deg</td>
</tr>
<tr>
 <td><strong id="SENS_CM8JL65_CFG">SENS_CM8JL65_CFG</strong> (INT32)</td>
 <td>Serial Configuration for Lanbao PSK-CM8JL65-CC5 <p><strong>Comment:</strong> Configure on which serial port to run Lanbao PSK-CM8JL65-CC5.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_CM8JL65_R_0">SENS_CM8JL65_R_0</strong> (INT32)</td>
 <td>Distance Sensor Rotation <p><strong>Comment:</strong> Distance Sensor Rotation as MAV_SENSOR_ORIENTATION enum</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> ROTATION_FORWARD_FACING</li> 

<li><strong>2:</strong> ROTATION_RIGHT_FACING</li> 

<li><strong>6:</strong> ROTATION_LEFT_FACING</li> 

<li><strong>12:</strong> ROTATION_BACKWARD_FACING</li> 

<li><strong>24:</strong> ROTATION_UPWARD_FACING</li> 

<li><strong>25:</strong> ROTATION_DOWNWARD_FACING</li> 
</ul>
  <p><b>Reboot required:</b> True</p>
</td>
 <td></td>
 <td>25</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_BATT">SENS_EN_BATT</strong> (INT32)</td>
 <td>SMBUS Smart battery driver BQ40Z50 and BQ40Z80    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_LL40LS">SENS_EN_LL40LS</strong> (INT32)</td>
 <td>Lidar-Lite (LL40LS)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> PWM</li> 

<li><strong>2:</strong> I2C</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_MB12XX">SENS_EN_MB12XX</strong> (INT32)</td>
 <td>Maxbotix Sonar (mb12xx)    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_MPDT">SENS_EN_MPDT</strong> (INT32)</td>
 <td>Enable Mappydot rangefinder (i2c)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Autodetect</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_PAW3902">SENS_EN_PAW3902</strong> (INT32)</td>
 <td>PAW3902 & PAW3903 Optical Flow    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_PGA460">SENS_EN_PGA460</strong> (INT32)</td>
 <td>PGA460 Ultrasonic driver (PGA460)    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_PMW3901">SENS_EN_PMW3901</strong> (INT32)</td>
 <td>PMW3901 Optical Flow    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_PX4FLOW">SENS_EN_PX4FLOW</strong> (INT32)</td>
 <td>PX4 Flow Optical Flow    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_SF0X">SENS_EN_SF0X</strong> (INT32)</td>
 <td>Lightware Laser Rangefinder hardware model (serial)  <strong>Values:</strong><ul>
<li><strong>1:</strong> SF02</li> 

<li><strong>2:</strong> SF10/a</li> 

<li><strong>3:</strong> SF10/b</li> 

<li><strong>4:</strong> SF10/c</li> 

<li><strong>5:</strong> SF11/c</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_SF1XX">SENS_EN_SF1XX</strong> (INT32)</td>
 <td>Lightware SF1xx/SF20/LW20 laser rangefinder (i2c)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> SF10/a</li> 

<li><strong>2:</strong> SF10/b</li> 

<li><strong>3:</strong> SF10/c</li> 

<li><strong>4:</strong> SF11/c</li> 

<li><strong>5:</strong> SF/LW20/b</li> 

<li><strong>6:</strong> SF/LW20/c</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 6 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_SR05">SENS_EN_SR05</strong> (INT32)</td>
 <td>HY-SRF05 / HC-SR05    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_THERMAL">SENS_EN_THERMAL</strong> (INT32)</td>
 <td>Thermal control of sensor temperature  <strong>Values:</strong><ul>
<li><strong>-1:</strong> Thermal control unavailable</li> 

<li><strong>0:</strong> Thermal control off</li> 

<li><strong>1:</strong> Thermal control enabled</li> 
</ul>
  </td>
 <td></td>
 <td>-1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_TRANGER">SENS_EN_TRANGER</strong> (INT32)</td>
 <td>TeraRanger Rangefinder (i2c)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Autodetect</li> 

<li><strong>2:</strong> TROne</li> 

<li><strong>3:</strong> TREvo60m</li> 

<li><strong>4:</strong> TREvo600Hz</li> 

<li><strong>5:</strong> TREvo3m</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 3 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EN_VL53L1X">SENS_EN_VL53L1X</strong> (INT32)</td>
 <td>VL53L1X Distance Sensor    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_EXT_I2C_PRB">SENS_EXT_I2C_PRB</strong> (INT32)</td>
 <td>External I2C probe <p><strong>Comment:</strong> Probe for optional external I2C devices.</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_FLOW_ROT">SENS_FLOW_ROT</strong> (INT32)</td>
 <td>PX4Flow board rotation <p><strong>Comment:</strong> This parameter defines the yaw rotation of the PX4FLOW board relative to the vehicle body frame. Zero rotation is defined as X on flow board pointing towards front of vehicle. The recommneded installation default for the PX4FLOW board is with the Y axis forward (270 deg yaw).</p> <strong>Values:</strong><ul>
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
 <td></td>
 <td>6</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_GPS_MASK">SENS_GPS_MASK</strong> (INT32)</td>
 <td>Multi GPS Blending Control Mask <p><strong>Comment:</strong> Set bits in the following positions to set which GPS accuracy metrics will be used to calculate the blending weight. Set to zero to disable and always used first GPS instance. 0 : Set to true to use speed accuracy 1 : Set to true to use horizontal position accuracy 2 : Set to true to use vertical position accuracy</p>  <strong>Bitmask:</strong><ul>  <li><strong>0:</strong> use speed accuracy</li> 
  <li><strong>1:</strong> use hpos accuracy</li> 
  <li><strong>2:</strong> use vpos accuracy</li> 
</ul>
 </td>
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_GPS_PRIME">SENS_GPS_PRIME</strong> (INT32)</td>
 <td>Multi GPS primary instance <p><strong>Comment:</strong> When no blending is active, this defines the preferred GPS receiver instance. The GPS selection logic waits until the primary receiver is available to send data to the EKF even if a secondary instance is already available. The secondary instance is then only used if the primary one times out. To have an equal priority of all the instances, set this parameter to -1 and the best receiver will be used. This parameter has no effect if blending is active.</p>   </td>
 <td>-1 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_GPS_TAU">SENS_GPS_TAU</strong> (FLOAT)</td>
 <td>Multi GPS Blending Time Constant <p><strong>Comment:</strong> Sets the longest time constant that will be applied to the calculation of GPS position and height offsets used to correct data from multiple GPS data for steady state position differences.</p>   </td>
 <td>1.0 > 100.0 </td>
 <td>10.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="SENS_IMU_MODE">SENS_IMU_MODE</strong> (INT32)</td>
 <td>Sensors hub IMU mode  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Publish primary IMU selection</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_IMU_TEMP">SENS_IMU_TEMP</strong> (FLOAT)</td>
 <td>Target IMU temperature    </td>
 <td>0 > 85.0 </td>
 <td>55.0</td>
 <td>celcius</td>
</tr>
<tr>
 <td><strong id="SENS_IMU_TEMP_FF">SENS_IMU_TEMP_FF</strong> (FLOAT)</td>
 <td>IMU heater controller feedforward value    </td>
 <td>0 > 1.0 </td>
 <td>0.05</td>
 <td>%</td>
</tr>
<tr>
 <td><strong id="SENS_IMU_TEMP_I">SENS_IMU_TEMP_I</strong> (FLOAT)</td>
 <td>IMU heater controller integrator gain value    </td>
 <td>0 > 1.0 </td>
 <td>0.025</td>
 <td>us/C</td>
</tr>
<tr>
 <td><strong id="SENS_IMU_TEMP_P">SENS_IMU_TEMP_P</strong> (FLOAT)</td>
 <td>IMU heater controller proportional gain value    </td>
 <td>0 > 2.0 </td>
 <td>1.0</td>
 <td>us/C</td>
</tr>
<tr>
 <td><strong id="SENS_INT_BARO_EN">SENS_INT_BARO_EN</strong> (INT32)</td>
 <td>Enable internal barometers <p><strong>Comment:</strong> For systems with an external barometer, this should be set to false to make sure that the external is used.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_LEDDAR1_CFG">SENS_LEDDAR1_CFG</strong> (INT32)</td>
 <td>Serial Configuration for LeddarOne Rangefinder <p><strong>Comment:</strong> Configure on which serial port to run LeddarOne Rangefinder.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MAG_MODE">SENS_MAG_MODE</strong> (INT32)</td>
 <td>Sensors hub mag mode  <strong>Values:</strong><ul>
<li><strong>0:</strong> Publish all magnetometers</li> 

<li><strong>1:</strong> Publish primary magnetometer</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MAG_RATE">SENS_MAG_RATE</strong> (FLOAT)</td>
 <td>Magnetometer max rate <p><strong>Comment:</strong> Magnetometer data maximum publication rate. This is an upper bound, actual magnetometer data rate is still dependant on the sensor.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 200 </td>
 <td>50.0</td>
 <td>Hz</td>
</tr>
<tr>
 <td><strong id="SENS_MB12_0_ROT">SENS_MB12_0_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 0 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_10_ROT">SENS_MB12_10_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 10 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_11_ROT">SENS_MB12_11_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 12 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_1_ROT">SENS_MB12_1_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 1 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_2_ROT">SENS_MB12_2_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 2 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_3_ROT">SENS_MB12_3_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 3 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_4_ROT">SENS_MB12_4_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 4 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_5_ROT">SENS_MB12_5_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 5 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_6_ROT">SENS_MB12_6_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 6 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_7_ROT">SENS_MB12_7_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 7 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_8_ROT">SENS_MB12_8_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 8 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MB12_9_ROT">SENS_MB12_9_ROT</strong> (INT32)</td>
 <td>MaxBotix MB12XX Sensor 9 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT0_ROT">SENS_MPDT0_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 0 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT10_ROT">SENS_MPDT10_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 10 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT11_ROT">SENS_MPDT11_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 12 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT1_ROT">SENS_MPDT1_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 1 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT2_ROT">SENS_MPDT2_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 2 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT3_ROT">SENS_MPDT3_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 3 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT4_ROT">SENS_MPDT4_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 4 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT5_ROT">SENS_MPDT5_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 5 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT6_ROT">SENS_MPDT6_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 6 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT7_ROT">SENS_MPDT7_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 7 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT8_ROT">SENS_MPDT8_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 8 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_MPDT9_ROT">SENS_MPDT9_ROT</strong> (INT32)</td>
 <td>MappyDot Sensor 9 Rotation <p><strong>Comment:</strong> This parameter defines the rotation of the Mappydot sensor relative to the platform.</p> <strong>Values:</strong><ul>
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
 <td>0 > 7 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_SF0X_CFG">SENS_SF0X_CFG</strong> (INT32)</td>
 <td>Serial Configuration for Lightware Laser Rangefinder (serial) <p><strong>Comment:</strong> Configure on which serial port to run Lightware Laser Rangefinder (serial).</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_TEMP_ID">SENS_TEMP_ID</strong> (INT32)</td>
 <td>Target IMU device ID to regulate temperature    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_TFLOW_CFG">SENS_TFLOW_CFG</strong> (INT32)</td>
 <td>Serial Configuration for ThoneFlow-3901U optical flow sensor <p><strong>Comment:</strong> Configure on which serial port to run ThoneFlow-3901U optical flow sensor.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_TFMINI_CFG">SENS_TFMINI_CFG</strong> (INT32)</td>
 <td>Serial Configuration for Benewake TFmini Rangefinder <p><strong>Comment:</strong> Configure on which serial port to run Benewake TFmini Rangefinder.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SENS_ULAND_CFG">SENS_ULAND_CFG</strong> (INT32)</td>
 <td>Serial Configuration for uLanding Radar <p><strong>Comment:</strong> Configure on which serial port to run uLanding Radar.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VOXLPM_SHUNT_BAT">VOXLPM_SHUNT_BAT</strong> (FLOAT)</td>
 <td>VOXL Power Monitor Shunt, Battery    <p><b>Reboot required:</b> true</p>
</td>
 <td>0.000000001 > 0.1 (.000000001)</td>
 <td>0.00063</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VOXLPM_SHUNT_REG">VOXLPM_SHUNT_REG</strong> (FLOAT)</td>
 <td>VOXL Power Monitor Shunt, Regulator    <p><b>Reboot required:</b> true</p>
</td>
 <td>0.000000001 > 0.1 (.000000001)</td>
 <td>0.0056</td>
 <td></td>
</tr>
</tbody></table>

## Serial

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="RC_PORT_CONFIG">RC_PORT_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for RC Input Driver <p><strong>Comment:</strong> Configure on which serial port to run RC Input Driver. Setting this to 'Disabled' will use a board-specific default port for RC input.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>300</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_GPS1_BAUD">SER_GPS1_BAUD</strong> (INT32)</td>
 <td>Baudrate for the GPS 1 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the GPS 1 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_GPS2_BAUD">SER_GPS2_BAUD</strong> (INT32)</td>
 <td>Baudrate for the GPS 2 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the GPS 2 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_GPS3_BAUD">SER_GPS3_BAUD</strong> (INT32)</td>
 <td>Baudrate for the GPS 3 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the GPS 3 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_RC_BAUD">SER_RC_BAUD</strong> (INT32)</td>
 <td>Baudrate for the Radio Controller Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the Radio Controller Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_TEL1_BAUD">SER_TEL1_BAUD</strong> (INT32)</td>
 <td>Baudrate for the TELEM 1 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the TELEM 1 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>57600</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_TEL2_BAUD">SER_TEL2_BAUD</strong> (INT32)</td>
 <td>Baudrate for the TELEM 2 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the TELEM 2 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>921600</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_TEL3_BAUD">SER_TEL3_BAUD</strong> (INT32)</td>
 <td>Baudrate for the TELEM 3 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the TELEM 3 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>57600</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_TEL4_BAUD">SER_TEL4_BAUD</strong> (INT32)</td>
 <td>Baudrate for the TELEM/SERIAL 4 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the TELEM/SERIAL 4 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>57600</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_URT6_BAUD">SER_URT6_BAUD</strong> (INT32)</td>
 <td>Baudrate for the UART 6 Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the UART 6 Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>57600</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SER_WIFI_BAUD">SER_WIFI_BAUD</strong> (INT32)</td>
 <td>Baudrate for the Wifi Port Serial Port <p><strong>Comment:</strong> Configure the Baudrate for the Wifi Port Serial Port. Note: certain drivers such as the GPS can determine the Baudrate automatically.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Auto</li> 

<li><strong>50:</strong> 50 8N1</li> 

<li><strong>75:</strong> 75 8N1</li> 

<li><strong>110:</strong> 110 8N1</li> 

<li><strong>134:</strong> 134 8N1</li> 

<li><strong>150:</strong> 150 8N1</li> 

<li><strong>200:</strong> 200 8N1</li> 

<li><strong>300:</strong> 300 8N1</li> 

<li><strong>600:</strong> 600 8N1</li> 

<li><strong>1200:</strong> 1200 8N1</li> 

<li><strong>1800:</strong> 1800 8N1</li> 

<li><strong>2400:</strong> 2400 8N1</li> 

<li><strong>4800:</strong> 4800 8N1</li> 

<li><strong>9600:</strong> 9600 8N1</li> 

<li><strong>19200:</strong> 19200 8N1</li> 

<li><strong>38400:</strong> 38400 8N1</li> 

<li><strong>57600:</strong> 57600 8N1</li> 

<li><strong>115200:</strong> 115200 8N1</li> 

<li><strong>230400:</strong> 230400 8N1</li> 

<li><strong>460800:</strong> 460800 8N1</li> 

<li><strong>500000:</strong> 500000 8N1</li> 

<li><strong>921600:</strong> 921600 8N1</li> 

<li><strong>1000000:</strong> 1000000 8N1</li> 

<li><strong>1500000:</strong> 1500000 8N1</li> 

<li><strong>2000000:</strong> 2000000 8N1</li> 

<li><strong>3000000:</strong> 3000000 8N1</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
</tbody></table>

## Simulation In Hardware

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="SIH_IXX">SIH_IXX</strong> (FLOAT)</td>
 <td>Vehicle inertia about X axis <p><strong>Comment:</strong> The intertia is a 3 by 3 symmetric matrix. It represents the difficulty of the vehicle to modify its angular rate.</p>   </td>
 <td>0.0 > ? (0.005)</td>
 <td>0.025</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="SIH_IXY">SIH_IXY</strong> (FLOAT)</td>
 <td>Vehicle cross term inertia xy <p><strong>Comment:</strong> The intertia is a 3 by 3 symmetric matrix. This value can be set to 0 for a quad symmetric about its center of mass.</p>   </td>
 <td>(0.005)</td>
 <td>0.0</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="SIH_IXZ">SIH_IXZ</strong> (FLOAT)</td>
 <td>Vehicle cross term inertia xz <p><strong>Comment:</strong> The intertia is a 3 by 3 symmetric matrix. This value can be set to 0 for a quad symmetric about its center of mass.</p>   </td>
 <td>(0.005)</td>
 <td>0.0</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="SIH_IYY">SIH_IYY</strong> (FLOAT)</td>
 <td>Vehicle inertia about Y axis <p><strong>Comment:</strong> The intertia is a 3 by 3 symmetric matrix. It represents the difficulty of the vehicle to modify its angular rate.</p>   </td>
 <td>0.0 > ? (0.005)</td>
 <td>0.025</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="SIH_IYZ">SIH_IYZ</strong> (FLOAT)</td>
 <td>Vehicle cross term inertia yz <p><strong>Comment:</strong> The intertia is a 3 by 3 symmetric matrix. This value can be set to 0 for a quad symmetric about its center of mass.</p>   </td>
 <td>(0.005)</td>
 <td>0.0</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="SIH_IZZ">SIH_IZZ</strong> (FLOAT)</td>
 <td>Vehicle inertia about Z axis <p><strong>Comment:</strong> The intertia is a 3 by 3 symmetric matrix. It represents the difficulty of the vehicle to modify its angular rate.</p>   </td>
 <td>0.0 > ? (0.005)</td>
 <td>0.030</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="SIH_KDV">SIH_KDV</strong> (FLOAT)</td>
 <td>First order drag coefficient <p><strong>Comment:</strong> Physical coefficient representing the friction with air particules. The greater this value, the slower the quad will move. Drag force function of velocity: D=-KDV*V. The maximum freefall velocity can be computed as V=10*MASS/KDV [m/s]</p>   </td>
 <td>0.0 > ? (0.05)</td>
 <td>1.0</td>
 <td>N/(m/s)</td>
</tr>
<tr>
 <td><strong id="SIH_KDW">SIH_KDW</strong> (FLOAT)</td>
 <td>First order angular damper coefficient <p><strong>Comment:</strong> Physical coefficient representing the friction with air particules during rotations. The greater this value, the slower the quad will rotate. Aerodynamic moment function of body rate: Ma=-KDW*W_B. This value can be set to 0 if unknown.</p>   </td>
 <td>0.0 > ? (0.005)</td>
 <td>0.025</td>
 <td>Nm/(rad/s)</td>
</tr>
<tr>
 <td><strong id="SIH_LOC_H0">SIH_LOC_H0</strong> (FLOAT)</td>
 <td>Initial AMSL ground altitude <p><strong>Comment:</strong> This value represents the Above Mean Sea Level (AMSL) altitude where the simulation begins. If using FlightGear as a visual animation, this value can be tweaked such that the vehicle lies on the ground at takeoff. LAT0, LON0, H0, MU_X, MU_Y, and MU_Z should ideally be consistent among each others to represent a physical ground location on Earth.</p>   </td>
 <td>-420.0 > 8848.0 (0.01)</td>
 <td>32.34</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="SIH_LOC_LAT0">SIH_LOC_LAT0</strong> (INT32)</td>
 <td>Initial geodetic latitude <p><strong>Comment:</strong> This value represents the North-South location on Earth where the simulation begins. A value of 45 deg should be written 450000000. LAT0, LON0, H0, MU_X, MU_Y, and MU_Z should ideally be consistent among each others to represent a physical ground location on Earth.</p>   </td>
 <td>-850000000 > 850000000 </td>
 <td>454671160</td>
 <td>deg*1e7</td>
</tr>
<tr>
 <td><strong id="SIH_LOC_LON0">SIH_LOC_LON0</strong> (INT32)</td>
 <td>Initial geodetic longitude <p><strong>Comment:</strong> This value represents the East-West location on Earth where the simulation begins. A value of 45 deg should be written 450000000. LAT0, LON0, H0, MU_X, MU_Y, and MU_Z should ideally be consistent among each others to represent a physical ground location on Earth.</p>   </td>
 <td>-1800000000 > 1800000000 </td>
 <td>-737578370</td>
 <td>deg*1e7</td>
</tr>
<tr>
 <td><strong id="SIH_LOC_MU_X">SIH_LOC_MU_X</strong> (FLOAT)</td>
 <td>North magnetic field at the initial location <p><strong>Comment:</strong> This value represents the North magnetic field at the initial location. A magnetic field calculator can be found on the NOAA website Note, the values need to be converted from nano Tesla to Gauss LAT0, LON0, H0, MU_X, MU_Y, and MU_Z should ideally be consistent among each others to represent a physical ground location on Earth.</p>   </td>
 <td>-1.0 > 1.0 (0.001)</td>
 <td>0.179</td>
 <td>gauss</td>
</tr>
<tr>
 <td><strong id="SIH_LOC_MU_Y">SIH_LOC_MU_Y</strong> (FLOAT)</td>
 <td>East magnetic field at the initial location <p><strong>Comment:</strong> This value represents the East magnetic field at the initial location. A magnetic field calculator can be found on the NOAA website Note, the values need to be converted from nano Tesla to Gauss LAT0, LON0, H0, MU_X, MU_Y, and MU_Z should ideally be consistent among each others to represent a physical ground location on Earth.</p>   </td>
 <td>-1.0 > 1.0 (0.001)</td>
 <td>-0.045</td>
 <td>gauss</td>
</tr>
<tr>
 <td><strong id="SIH_LOC_MU_Z">SIH_LOC_MU_Z</strong> (FLOAT)</td>
 <td>Down magnetic field at the initial location <p><strong>Comment:</strong> This value represents the Down magnetic field at the initial location. A magnetic field calculator can be found on the NOAA website Note, the values need to be converted from nano Tesla to Gauss LAT0, LON0, H0, MU_X, MU_Y, and MU_Z should ideally be consistent among each others to represent a physical ground location on Earth.</p>   </td>
 <td>-1.0 > 1.0 (0.001)</td>
 <td>0.504</td>
 <td>gauss</td>
</tr>
<tr>
 <td><strong id="SIH_L_PITCH">SIH_L_PITCH</strong> (FLOAT)</td>
 <td>Pitch arm length <p><strong>Comment:</strong> This is the arm length generating the pitching moment This value can be measured with a ruler. This corresponds to half the distance between the front and rear motors.</p>   </td>
 <td>0.0 > ? (0.05)</td>
 <td>0.2</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="SIH_L_ROLL">SIH_L_ROLL</strong> (FLOAT)</td>
 <td>Roll arm length <p><strong>Comment:</strong> This is the arm length generating the rolling moment This value can be measured with a ruler. This corresponds to half the distance between the left and right motors.</p>   </td>
 <td>0.0 > ? (0.05)</td>
 <td>0.2</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="SIH_MASS">SIH_MASS</strong> (FLOAT)</td>
 <td>Vehicle mass <p><strong>Comment:</strong> This value can be measured by weighting the quad on a scale.</p>   </td>
 <td>0.0 > ? (0.1)</td>
 <td>1.0</td>
 <td>kg</td>
</tr>
<tr>
 <td><strong id="SIH_Q_MAX">SIH_Q_MAX</strong> (FLOAT)</td>
 <td>Max propeller torque <p><strong>Comment:</strong> This is the maximum torque delivered by one propeller when the motor is running at full speed. This value is usually about few percent of the maximum thrust force.</p>   </td>
 <td>0.0 > ? (0.05)</td>
 <td>0.1</td>
 <td>Nm</td>
</tr>
<tr>
 <td><strong id="SIH_T_MAX">SIH_T_MAX</strong> (FLOAT)</td>
 <td>Max propeller thrust force <p><strong>Comment:</strong> This is the maximum force delivered by one propeller when the motor is running at full speed. This value is usually about 5 times the mass of the quadrotor.</p>   </td>
 <td>0.0 > ? (0.5)</td>
 <td>5.0</td>
 <td>N</td>
</tr>
</tbody></table>

## System

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="LED_RGB1_MAXBRT">LED_RGB1_MAXBRT</strong> (INT32)</td>
 <td>RGB Led brightness limit <p><strong>Comment:</strong> Set to 0 to disable, 1 for minimum brightness up to 31 (max)</p>   </td>
 <td>0 > 31 </td>
 <td>31</td>
 <td></td>
</tr>
<tr>
 <td><strong id="LED_RGB_MAXBRT">LED_RGB_MAXBRT</strong> (INT32)</td>
 <td>RGB Led brightness limit <p><strong>Comment:</strong> Set to 0 to disable, 1 for minimum brightness up to 15 (max)</p>   </td>
 <td>0 > 15 </td>
 <td>15</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_AUTOCONFIG">SYS_AUTOCONFIG</strong> (INT32)</td>
 <td>Automatically configure default values <p><strong>Comment:</strong> Set to 1 to reset parameters on next system startup (setting defaults). Platform-specific values are used if available. RC* parameters are preserved.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Keep parameters</li> 

<li><strong>1:</strong> Reset parameters</li> 

<li><strong>2:</strong> Reload airframe parameters</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_AUTOSTART">SYS_AUTOSTART</strong> (INT32)</td>
 <td>Auto-start script index <p><strong>Comment:</strong> CHANGING THIS VALUE REQUIRES A RESTART. Defines the auto-start script used to bootstrap the system.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 9999999 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_BL_UPDATE">SYS_BL_UPDATE</strong> (INT32)</td>
 <td>Bootloader update <p><strong>Comment:</strong> If enabled, update the bootloader on the next boot. WARNING: do not cut the power during an update process, otherwise you will have to recover using some alternative method (e.g. JTAG). Instructions: - Insert an SD card - Enable this parameter - Reboot the board (plug the power or send a reboot command) - Wait until the board comes back up (or at least 2 minutes) - If it does not come back, check the file bootlog.txt on the SD card</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_CAL_ACCEL">SYS_CAL_ACCEL</strong> (INT32)</td>
 <td>Enable auto start of accelerometer thermal calibration at the next power up <p><strong>Comment:</strong> 0 : Set to 0 to do nothing 1 : Set to 1 to start a calibration at next boot This parameter is reset to zero when the temperature calibration starts. default (0, no calibration)</p>   </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_CAL_BARO">SYS_CAL_BARO</strong> (INT32)</td>
 <td>Enable auto start of barometer thermal calibration at the next power up <p><strong>Comment:</strong> 0 : Set to 0 to do nothing 1 : Set to 1 to start a calibration at next boot This parameter is reset to zero when the temperature calibration starts. default (0, no calibration)</p>   </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_CAL_GYRO">SYS_CAL_GYRO</strong> (INT32)</td>
 <td>Enable auto start of rate gyro thermal calibration at the next power up <p><strong>Comment:</strong> 0 : Set to 0 to do nothing 1 : Set to 1 to start a calibration at next boot This parameter is reset to zero when the temperature calibration starts. default (0, no calibration)</p>   </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_CAL_TDEL">SYS_CAL_TDEL</strong> (INT32)</td>
 <td>Required temperature rise during thermal calibration <p><strong>Comment:</strong> A temperature increase greater than this value is required during calibration. Calibration will complete for each sensor when the temperature increase above the starting temeprature exceeds the value set by SYS_CAL_TDEL. If the temperature rise is insufficient, the calibration will continue indefinitely and the board will need to be repowered to exit.</p>   </td>
 <td>10 > ? </td>
 <td>24</td>
 <td>celcius</td>
</tr>
<tr>
 <td><strong id="SYS_CAL_TMAX">SYS_CAL_TMAX</strong> (INT32)</td>
 <td>Maximum starting temperature for thermal calibration <p><strong>Comment:</strong> Temperature calibration will not start if the temperature of any sensor is higher than the value set by SYS_CAL_TMAX.</p>   </td>
 <td></td>
 <td>10</td>
 <td>celcius</td>
</tr>
<tr>
 <td><strong id="SYS_CAL_TMIN">SYS_CAL_TMIN</strong> (INT32)</td>
 <td>Minimum starting temperature for thermal calibration <p><strong>Comment:</strong> Temperature calibration for each sensor will ignore data if the temperature is lower than the value set by SYS_CAL_TMIN.</p>   </td>
 <td></td>
 <td>5</td>
 <td>celcius</td>
</tr>
<tr>
 <td><strong id="SYS_FAC_CAL_MODE">SYS_FAC_CAL_MODE</strong> (INT32)</td>
 <td>Enable factory calibration mode <p><strong>Comment:</strong> If enabled, future sensor calibrations will be stored to /fs/mtd_caldata. Note: this is only supported on boards with a separate calibration storage /fs/mtd_caldata.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_FAILURE_EN">SYS_FAILURE_EN</strong> (INT32)</td>
 <td>Enable failure injection <p><strong>Comment:</strong> If enabled allows MAVLink INJECT_FAILURE commands. WARNING: the failures can easily cause crashes and are to be used with caution!</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_HAS_BARO">SYS_HAS_BARO</strong> (INT32)</td>
 <td>Control if the vehicle has a barometer <p><strong>Comment:</strong> Disable this if the board has no barometer, such as some of the Omnibus F4 SD variants. If disabled, the preflight checks will not check for the presence of a barometer.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_HAS_MAG">SYS_HAS_MAG</strong> (INT32)</td>
 <td>Control if the vehicle has a magnetometer <p><strong>Comment:</strong> Disable this if the board has no magnetometer, such as the Omnibus F4 SD. If disabled, the preflight checks will not check for the presence of a magnetometer.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_HITL">SYS_HITL</strong> (INT32)</td>
 <td>Enable HITL/SIH mode on next boot <p><strong>Comment:</strong> While enabled the system will boot in Hardware-In-The-Loop (HITL) or Simulation-In-Hardware (SIH) mode and not enable all sensors and checks. When disabled the same vehicle can be flown normally. Set to 'external HITL', if the system should perform as if it were a real vehicle (the only difference to a real system is then only the parameter value, which can be used for log analysis).</p> <strong>Values:</strong><ul>
<li><strong>-1:</strong> external HITL</li> 

<li><strong>0:</strong> HITL and SIH disabled</li> 

<li><strong>1:</strong> HITL enabled</li> 

<li><strong>2:</strong> SIH enabled</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_MC_EST_GROUP">SYS_MC_EST_GROUP</strong> (INT32)</td>
 <td>Set multicopter estimator group <p><strong>Comment:</strong> Set the group of estimators used for multicopters and VTOLs</p> <strong>Values:</strong><ul>
<li><strong>1:</strong> local_position_estimator, attitude_estimator_q (unsupported)</li> 

<li><strong>2:</strong> ekf2 (recommended)</li> 

<li><strong>3:</strong> Q attitude estimator (no position)</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_PARAM_VER">SYS_PARAM_VER</strong> (INT32)</td>
 <td>Parameter version <p><strong>Comment:</strong> This is used internally only: an airframe configuration might set an expected parameter version value via PARAM_DEFAULTS_VER. This is checked on bootup against SYS_PARAM_VER, and if they do not match, parameters from the airframe configuration are reloaded.</p>   </td>
 <td>0 > ? </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_RESTART_TYPE">SYS_RESTART_TYPE</strong> (INT32)</td>
 <td>Set restart type <p><strong>Comment:</strong> Set by px4io to indicate type of restart</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Data survives resets</li> 

<li><strong>1:</strong> Data survives in-flight resets only</li> 

<li><strong>2:</strong> Data does not survive reset</li> 
</ul>
  </td>
 <td>0 > 2 </td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_STCK_EN">SYS_STCK_EN</strong> (INT32)</td>
 <td>Enable stack checking    </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="SYS_USE_IO">SYS_USE_IO</strong> (INT32)</td>
 <td>Set usage of IO board <p><strong>Comment:</strong> Can be used to use a standard startup script but with a FMU only set-up. Set to 0 to force the FMU only set-up.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 1 </td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
</tbody></table>

## Telemetry

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="TEL_BST_EN">TEL_BST_EN</strong> (INT32)</td>
 <td>Blacksheep telemetry Enable <p><strong>Comment:</strong> If true, the FMU will try to connect to Blacksheep telemetry on start up</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEL_FRSKY_CONFIG">TEL_FRSKY_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for FrSky Telemetry <p><strong>Comment:</strong> Configure on which serial port to run FrSky Telemetry.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEL_HOTT_CONFIG">TEL_HOTT_CONFIG</strong> (INT32)</td>
 <td>Serial Configuration for HoTT Telemetry <p><strong>Comment:</strong> Configure on which serial port to run HoTT Telemetry.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>6:</strong> UART 6</li> 

<li><strong>101:</strong> TELEM 1</li> 

<li><strong>102:</strong> TELEM 2</li> 

<li><strong>103:</strong> TELEM 3</li> 

<li><strong>104:</strong> TELEM/SERIAL 4</li> 

<li><strong>201:</strong> GPS 1</li> 

<li><strong>202:</strong> GPS 2</li> 

<li><strong>203:</strong> GPS 3</li> 

<li><strong>300:</strong> Radio Controller</li> 

<li><strong>301:</strong> Wifi Port</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>

## Testing

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="TEST_1">TEST_1</strong> (INT32)</td>
 <td>    </td>
 <td></td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_2">TEST_2</strong> (INT32)</td>
 <td>    </td>
 <td></td>
 <td>4</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_3">TEST_3</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_D">TEST_D</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.01</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_DEV">TEST_DEV</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>2.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_D_LP">TEST_D_LP</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_HP">TEST_HP</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_I">TEST_I</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_I_MAX">TEST_I_MAX</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_LP">TEST_LP</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>10.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_MAX">TEST_MAX</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_MEAN">TEST_MEAN</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_MIN">TEST_MIN</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>-1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_P">TEST_P</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_PARAMS">TEST_PARAMS</strong> (INT32)</td>
 <td>    </td>
 <td></td>
 <td>12345678</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_RC2_X">TEST_RC2_X</strong> (INT32)</td>
 <td>    </td>
 <td></td>
 <td>16</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_RC_X">TEST_RC_X</strong> (INT32)</td>
 <td>    </td>
 <td></td>
 <td>8</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TEST_TRIM">TEST_TRIM</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.5</td>
 <td></td>
</tr>
</tbody></table>

## Thermal Compensation

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="TC_A0_ID">TC_A0_ID</strong> (INT32)</td>
 <td>ID of Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_TMAX">TC_A0_TMAX</strong> (FLOAT)</td>
 <td>Accelerometer calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_TMIN">TC_A0_TMIN</strong> (FLOAT)</td>
 <td>Accelerometer calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_TREF">TC_A0_TREF</strong> (FLOAT)</td>
 <td>Accelerometer calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X0_0">TC_A0_X0_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X0_1">TC_A0_X0_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X0_2">TC_A0_X0_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X1_0">TC_A0_X1_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X1_1">TC_A0_X1_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X1_2">TC_A0_X1_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X2_0">TC_A0_X2_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X2_1">TC_A0_X2_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X2_2">TC_A0_X2_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X3_0">TC_A0_X3_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X3_1">TC_A0_X3_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A0_X3_2">TC_A0_X3_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_ID">TC_A1_ID</strong> (INT32)</td>
 <td>ID of Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_TMAX">TC_A1_TMAX</strong> (FLOAT)</td>
 <td>Accelerometer calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_TMIN">TC_A1_TMIN</strong> (FLOAT)</td>
 <td>Accelerometer calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_TREF">TC_A1_TREF</strong> (FLOAT)</td>
 <td>Accelerometer calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X0_0">TC_A1_X0_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X0_1">TC_A1_X0_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X0_2">TC_A1_X0_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X1_0">TC_A1_X1_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X1_1">TC_A1_X1_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X1_2">TC_A1_X1_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X2_0">TC_A1_X2_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X2_1">TC_A1_X2_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X2_2">TC_A1_X2_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X3_0">TC_A1_X3_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X3_1">TC_A1_X3_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A1_X3_2">TC_A1_X3_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_ID">TC_A2_ID</strong> (INT32)</td>
 <td>ID of Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_TMAX">TC_A2_TMAX</strong> (FLOAT)</td>
 <td>Accelerometer calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_TMIN">TC_A2_TMIN</strong> (FLOAT)</td>
 <td>Accelerometer calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_TREF">TC_A2_TREF</strong> (FLOAT)</td>
 <td>Accelerometer calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X0_0">TC_A2_X0_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X0_1">TC_A2_X0_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X0_2">TC_A2_X0_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X1_0">TC_A2_X1_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X1_1">TC_A2_X1_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X1_2">TC_A2_X1_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X2_0">TC_A2_X2_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X2_1">TC_A2_X2_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X2_2">TC_A2_X2_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X3_0">TC_A2_X3_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X3_1">TC_A2_X3_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A2_X3_2">TC_A2_X3_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_ID">TC_A3_ID</strong> (INT32)</td>
 <td>ID of Accelerometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_TMAX">TC_A3_TMAX</strong> (FLOAT)</td>
 <td>Accelerometer calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_TMIN">TC_A3_TMIN</strong> (FLOAT)</td>
 <td>Accelerometer calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_TREF">TC_A3_TREF</strong> (FLOAT)</td>
 <td>Accelerometer calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X0_0">TC_A3_X0_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X0_1">TC_A3_X0_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X0_2">TC_A3_X0_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X1_0">TC_A3_X1_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X1_1">TC_A3_X1_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X1_2">TC_A3_X1_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X2_0">TC_A3_X2_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X2_1">TC_A3_X2_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X2_2">TC_A3_X2_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X3_0">TC_A3_X3_0</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X3_1">TC_A3_X3_1</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A3_X3_2">TC_A3_X3_2</strong> (FLOAT)</td>
 <td>Accelerometer offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_A_ENABLE">TC_A_ENABLE</strong> (INT32)</td>
 <td>Thermal compensation for accelerometer sensors    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_ID">TC_B0_ID</strong> (INT32)</td>
 <td>ID of Barometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_TMAX">TC_B0_TMAX</strong> (FLOAT)</td>
 <td>Barometer calibration maximum temperature    </td>
 <td></td>
 <td>75.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_TMIN">TC_B0_TMIN</strong> (FLOAT)</td>
 <td>Barometer calibration minimum temperature    </td>
 <td></td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_TREF">TC_B0_TREF</strong> (FLOAT)</td>
 <td>Barometer calibration reference temperature    </td>
 <td></td>
 <td>40.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_X0">TC_B0_X0</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^0 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_X1">TC_B0_X1</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^1 polynomial coefficients    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_X2">TC_B0_X2</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^2 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_X3">TC_B0_X3</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^3 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_X4">TC_B0_X4</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^4 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B0_X5">TC_B0_X5</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^5 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_ID">TC_B1_ID</strong> (INT32)</td>
 <td>ID of Barometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_TMAX">TC_B1_TMAX</strong> (FLOAT)</td>
 <td>Barometer calibration maximum temperature    </td>
 <td></td>
 <td>75.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_TMIN">TC_B1_TMIN</strong> (FLOAT)</td>
 <td>Barometer calibration minimum temperature    </td>
 <td></td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_TREF">TC_B1_TREF</strong> (FLOAT)</td>
 <td>Barometer calibration reference temperature    </td>
 <td></td>
 <td>40.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_X0">TC_B1_X0</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^0 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_X1">TC_B1_X1</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^1 polynomial coefficients    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_X2">TC_B1_X2</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^2 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_X3">TC_B1_X3</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^3 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_X4">TC_B1_X4</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^4 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B1_X5">TC_B1_X5</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^5 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_ID">TC_B2_ID</strong> (INT32)</td>
 <td>ID of Barometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_TMAX">TC_B2_TMAX</strong> (FLOAT)</td>
 <td>Barometer calibration maximum temperature    </td>
 <td></td>
 <td>75.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_TMIN">TC_B2_TMIN</strong> (FLOAT)</td>
 <td>Barometer calibration minimum temperature    </td>
 <td></td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_TREF">TC_B2_TREF</strong> (FLOAT)</td>
 <td>Barometer calibration reference temperature    </td>
 <td></td>
 <td>40.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_X0">TC_B2_X0</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^0 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_X1">TC_B2_X1</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^1 polynomial coefficients    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_X2">TC_B2_X2</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^2 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_X3">TC_B2_X3</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^3 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_X4">TC_B2_X4</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^4 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B2_X5">TC_B2_X5</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^5 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_ID">TC_B3_ID</strong> (INT32)</td>
 <td>ID of Barometer that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_TMAX">TC_B3_TMAX</strong> (FLOAT)</td>
 <td>Barometer calibration maximum temperature    </td>
 <td></td>
 <td>75.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_TMIN">TC_B3_TMIN</strong> (FLOAT)</td>
 <td>Barometer calibration minimum temperature    </td>
 <td></td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_TREF">TC_B3_TREF</strong> (FLOAT)</td>
 <td>Barometer calibration reference temperature    </td>
 <td></td>
 <td>40.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_X0">TC_B3_X0</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^0 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_X1">TC_B3_X1</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^1 polynomial coefficients    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_X2">TC_B3_X2</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^2 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_X3">TC_B3_X3</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^3 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_X4">TC_B3_X4</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^4 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B3_X5">TC_B3_X5</strong> (FLOAT)</td>
 <td>Barometer offset temperature ^5 polynomial coefficient    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_B_ENABLE">TC_B_ENABLE</strong> (INT32)</td>
 <td>Thermal compensation for barometric pressure sensors    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_ID">TC_G0_ID</strong> (INT32)</td>
 <td>ID of Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_TMAX">TC_G0_TMAX</strong> (FLOAT)</td>
 <td>Gyro calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_TMIN">TC_G0_TMIN</strong> (FLOAT)</td>
 <td>Gyro calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_TREF">TC_G0_TREF</strong> (FLOAT)</td>
 <td>Gyro calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X0_0">TC_G0_X0_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X0_1">TC_G0_X0_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X0_2">TC_G0_X0_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X1_0">TC_G0_X1_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X1_1">TC_G0_X1_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X1_2">TC_G0_X1_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X2_0">TC_G0_X2_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X2_1">TC_G0_X2_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X2_2">TC_G0_X2_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X3_0">TC_G0_X3_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X3_1">TC_G0_X3_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G0_X3_2">TC_G0_X3_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_ID">TC_G1_ID</strong> (INT32)</td>
 <td>ID of Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_TMAX">TC_G1_TMAX</strong> (FLOAT)</td>
 <td>Gyro calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_TMIN">TC_G1_TMIN</strong> (FLOAT)</td>
 <td>Gyro calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_TREF">TC_G1_TREF</strong> (FLOAT)</td>
 <td>Gyro calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X0_0">TC_G1_X0_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X0_1">TC_G1_X0_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X0_2">TC_G1_X0_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X1_0">TC_G1_X1_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X1_1">TC_G1_X1_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X1_2">TC_G1_X1_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X2_0">TC_G1_X2_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X2_1">TC_G1_X2_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X2_2">TC_G1_X2_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X3_0">TC_G1_X3_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X3_1">TC_G1_X3_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G1_X3_2">TC_G1_X3_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_ID">TC_G2_ID</strong> (INT32)</td>
 <td>ID of Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_TMAX">TC_G2_TMAX</strong> (FLOAT)</td>
 <td>Gyro calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_TMIN">TC_G2_TMIN</strong> (FLOAT)</td>
 <td>Gyro calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_TREF">TC_G2_TREF</strong> (FLOAT)</td>
 <td>Gyro calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X0_0">TC_G2_X0_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X0_1">TC_G2_X0_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X0_2">TC_G2_X0_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X1_0">TC_G2_X1_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X1_1">TC_G2_X1_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X1_2">TC_G2_X1_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X2_0">TC_G2_X2_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X2_1">TC_G2_X2_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X2_2">TC_G2_X2_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X3_0">TC_G2_X3_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X3_1">TC_G2_X3_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G2_X3_2">TC_G2_X3_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_ID">TC_G3_ID</strong> (INT32)</td>
 <td>ID of Gyro that the calibration is for    </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_TMAX">TC_G3_TMAX</strong> (FLOAT)</td>
 <td>Gyro calibration maximum temperature    </td>
 <td></td>
 <td>100.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_TMIN">TC_G3_TMIN</strong> (FLOAT)</td>
 <td>Gyro calibration minimum temperature    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_TREF">TC_G3_TREF</strong> (FLOAT)</td>
 <td>Gyro calibration reference temperature    </td>
 <td></td>
 <td>25.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X0_0">TC_G3_X0_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X0_1">TC_G3_X0_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X0_2">TC_G3_X0_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^0 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X1_0">TC_G3_X1_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X1_1">TC_G3_X1_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X1_2">TC_G3_X1_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^1 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X2_0">TC_G3_X2_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X2_1">TC_G3_X2_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X2_2">TC_G3_X2_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^2 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X3_0">TC_G3_X3_0</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - X axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X3_1">TC_G3_X3_1</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Y axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G3_X3_2">TC_G3_X3_2</strong> (FLOAT)</td>
 <td>Gyro rate offset temperature ^3 polynomial coefficient - Z axis    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="TC_G_ENABLE">TC_G_ENABLE</strong> (INT32)</td>
 <td>Thermal compensation for rate gyro sensors    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
</tbody></table>

## UAVCAN

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="CANNODE_BITRATE">CANNODE_BITRATE</strong> (INT32)</td>
 <td>UAVCAN CAN bus bitrate    </td>
 <td>20000 > 1000000 </td>
 <td>1000000</td>
 <td></td>
</tr>
<tr>
 <td><strong id="CANNODE_NODE_ID">CANNODE_NODE_ID</strong> (INT32)</td>
 <td>UAVCAN Node ID <p><strong>Comment:</strong> Read the specs at http://uavcan.org to learn more about Node ID.</p>   </td>
 <td>1 > 125 </td>
 <td>120</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_BITRATE">UAVCAN_BITRATE</strong> (INT32)</td>
 <td>UAVCAN CAN bus bitrate    <p><b>Reboot required:</b> true</p>
</td>
 <td>20000 > 1000000 </td>
 <td>1000000</td>
 <td>bit/s</td>
</tr>
<tr>
 <td><strong id="UAVCAN_ENABLE">UAVCAN_ENABLE</strong> (INT32)</td>
 <td>UAVCAN mode <p><strong>Comment:</strong> 0 - UAVCAN disabled. 1 - Enables support for UAVCAN sensors without dynamic node ID allocation and firmware update. 2 - Enables support for UAVCAN sensors with dynamic node ID allocation and firmware update. 3 - Enables support for UAVCAN sensors and actuators with dynamic node ID allocation and firmware update. Also sets the motor control outputs to UAVCAN.</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Disabled</li> 

<li><strong>1:</strong> Sensors Manual Config</li> 

<li><strong>2:</strong> Sensors Automatic Config</li> 

<li><strong>3:</strong> Sensors and Actuators (ESCs) Automatic Config</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 3 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_ESC_IDLT">UAVCAN_ESC_IDLT</strong> (INT32)</td>
 <td>UAVCAN ESC will spin at idle throttle when armed, even if the mixer outputs zero setpoints    <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_LGT_ANTCL">UAVCAN_LGT_ANTCL</strong> (INT32)</td>
 <td>UAVCAN ANTI_COLLISION light operating mode <p><strong>Comment:</strong> This parameter defines the minimum condition under which the system will command the ANTI_COLLISION lights on 0 - Always off 1 - When autopilot is armed 2 - When autopilot is prearmed 3 - Always on</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Always off</li> 

<li><strong>1:</strong> When autopilot is armed</li> 

<li><strong>2:</strong> When autopilot is prearmed</li> 

<li><strong>3:</strong> Always on</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 3 </td>
 <td>2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_LGT_LAND">UAVCAN_LGT_LAND</strong> (INT32)</td>
 <td>UAVCAN LIGHT_ID_LANDING light operating mode <p><strong>Comment:</strong> This parameter defines the minimum condition under which the system will command the LIGHT_ID_LANDING lights on 0 - Always off 1 - When autopilot is armed 2 - When autopilot is prearmed 3 - Always on</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Always off</li> 

<li><strong>1:</strong> When autopilot is armed</li> 

<li><strong>2:</strong> When autopilot is prearmed</li> 

<li><strong>3:</strong> Always on</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 3 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_LGT_NAV">UAVCAN_LGT_NAV</strong> (INT32)</td>
 <td>UAVCAN RIGHT_OF_WAY light operating mode <p><strong>Comment:</strong> This parameter defines the minimum condition under which the system will command the RIGHT_OF_WAY lights on 0 - Always off 1 - When autopilot is armed 2 - When autopilot is prearmed 3 - Always on</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Always off</li> 

<li><strong>1:</strong> When autopilot is armed</li> 

<li><strong>2:</strong> When autopilot is prearmed</li> 

<li><strong>3:</strong> Always on</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 3 </td>
 <td>3</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_LGT_STROB">UAVCAN_LGT_STROB</strong> (INT32)</td>
 <td>UAVCAN STROBE light operating mode <p><strong>Comment:</strong> This parameter defines the minimum condition under which the system will command the STROBE lights on 0 - Always off 1 - When autopilot is armed 2 - When autopilot is prearmed 3 - Always on</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Always off</li> 

<li><strong>1:</strong> When autopilot is armed</li> 

<li><strong>2:</strong> When autopilot is prearmed</li> 

<li><strong>3:</strong> Always on</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 3 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_NODE_ID">UAVCAN_NODE_ID</strong> (INT32)</td>
 <td>UAVCAN Node ID <p><strong>Comment:</strong> Read the specs at http://uavcan.org to learn more about Node ID.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 125 </td>
 <td>1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_RNG_MAX">UAVCAN_RNG_MAX</strong> (FLOAT)</td>
 <td>UAVCAN rangefinder maximum range <p><strong>Comment:</strong> This parameter defines the maximum valid range for a rangefinder connected via UAVCAN.</p>   </td>
 <td></td>
 <td>200.0</td>
 <td>m</td>
</tr>
<tr>
 <td><strong id="UAVCAN_RNG_MIN">UAVCAN_RNG_MIN</strong> (FLOAT)</td>
 <td>UAVCAN rangefinder minimum range <p><strong>Comment:</strong> This parameter defines the minimum valid range for a rangefinder connected via UAVCAN.</p>   </td>
 <td></td>
 <td>0.3</td>
 <td>m</td>
</tr>
</tbody></table>

## UAVCAN v1

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="UAVCAN_V1_BAT_ID">UAVCAN_V1_BAT_ID</strong> (INT32)</td>
 <td>UAVCAN v1 battery port ID    </td>
 <td>1 > 32767 </td>
 <td>4242</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_V1_BAT_MD">UAVCAN_V1_BAT_MD</strong> (INT32)</td>
 <td>UAVCAN v1 battery mode  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable</li> 

<li><strong>1:</strong> Receive BMSStatus</li> 

<li><strong>2:</strong> Send BMSStatus</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UAVCAN_V1_BAUD">UAVCAN_V1_BAUD</strong> (INT32)</td>
 <td>UAVCAN/CAN v1 bus bitrate    <p><b>Reboot required:</b> true</p>
</td>
 <td>20000 > 1000000 </td>
 <td>1000000</td>
 <td>bit/s</td>
</tr>
<tr>
 <td><strong id="UAVCAN_V1_ENABLE">UAVCAN_V1_ENABLE</strong> (INT32)</td>
 <td>UAVCAN v1 <p><strong>Comment:</strong> 0 - UAVCAN disabled. 1 - Enables UAVCANv1</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
</tbody></table>

## UAVCANv1

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="UAVCAN_V1_ID">UAVCAN_V1_ID</strong> (INT32)</td>
 <td>UAVCAN v1 Node ID <p><strong>Comment:</strong> Read the specs at http://uavcan.org to learn more about Node ID.</p>   <p><b>Reboot required:</b> true</p>
</td>
 <td>1 > 125 </td>
 <td>1</td>
 <td></td>
</tr>
</tbody></table>

## UUV Attitude Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="UUV_DIRCT_PITCH">UUV_DIRCT_PITCH</strong> (FLOAT)</td>
 <td>Direct pitch input    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_DIRCT_ROLL">UUV_DIRCT_ROLL</strong> (FLOAT)</td>
 <td>Direct roll input    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_DIRCT_THRUST">UUV_DIRCT_THRUST</strong> (FLOAT)</td>
 <td>Direct thrust input    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_DIRCT_YAW">UUV_DIRCT_YAW</strong> (FLOAT)</td>
 <td>Direct yaw input    </td>
 <td></td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_INPUT_MODE">UUV_INPUT_MODE</strong> (INT32)</td>
 <td>Select Input Mode  <strong>Values:</strong><ul>
<li><strong>0:</strong> use Attitude Setpoints</li> 

<li><strong>1:</strong> Direct Feedthrough</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_PITCH_D">UUV_PITCH_D</strong> (FLOAT)</td>
 <td>Pitch differential gain    </td>
 <td></td>
 <td>2.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_PITCH_P">UUV_PITCH_P</strong> (FLOAT)</td>
 <td>Pitch proportional gain    </td>
 <td></td>
 <td>4.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_ROLL_D">UUV_ROLL_D</strong> (FLOAT)</td>
 <td>Roll differential gain    </td>
 <td></td>
 <td>1.5</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_ROLL_P">UUV_ROLL_P</strong> (FLOAT)</td>
 <td>Roll proportional gain    </td>
 <td></td>
 <td>4.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_YAW_D">UUV_YAW_D</strong> (FLOAT)</td>
 <td>Yaw differential gain    </td>
 <td></td>
 <td>2.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_YAW_P">UUV_YAW_P</strong> (FLOAT)</td>
 <td>Yawh proportional gain    </td>
 <td></td>
 <td>4.0</td>
 <td></td>
</tr>
</tbody></table>

## UUV Position Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="UUV_GAIN_X_D">UUV_GAIN_X_D</strong> (FLOAT)</td>
 <td>Gain of D controller X    </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_GAIN_X_P">UUV_GAIN_X_P</strong> (FLOAT)</td>
 <td>Gain of P controller X    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_GAIN_Y_D">UUV_GAIN_Y_D</strong> (FLOAT)</td>
 <td>Gain of D controller Y    </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_GAIN_Y_P">UUV_GAIN_Y_P</strong> (FLOAT)</td>
 <td>Gain of P controller Y    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_GAIN_Z_D">UUV_GAIN_Z_D</strong> (FLOAT)</td>
 <td>Gain of D controller Z    </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_GAIN_Z_P">UUV_GAIN_Z_P</strong> (FLOAT)</td>
 <td>Gain of P controller Z    </td>
 <td></td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_STAB_MODE">UUV_STAB_MODE</strong> (INT32)</td>
 <td>Stabilization mode(1) or Position Control(0)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Position Control</li> 

<li><strong>1:</strong> Stabilization Mode</li> 
</ul>
  </td>
 <td></td>
 <td>1</td>
 <td></td>
</tr>
</tbody></table>

## VTOL Attitude Control

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="VT_ARSP_BLEND">VT_ARSP_BLEND</strong> (FLOAT)</td>
 <td>Transition blending airspeed <p><strong>Comment:</strong> Airspeed at which we can start blending both fw and mc controls. Set to 0 to disable.</p>   </td>
 <td>0.00 > 30.00 (1)</td>
 <td>8.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="VT_ARSP_TRANS">VT_ARSP_TRANS</strong> (FLOAT)</td>
 <td>Transition airspeed <p><strong>Comment:</strong> Airspeed at which we can switch to fw mode</p>   </td>
 <td>0.00 > 30.00 (1)</td>
 <td>10.0</td>
 <td>m/s</td>
</tr>
<tr>
 <td><strong id="VT_B_DEC_FF">VT_B_DEC_FF</strong> (FLOAT)</td>
 <td>Backtransition deceleration setpoint to pitch feedforward gain    </td>
 <td>0 > 0.2 (0.05)</td>
 <td>0.12</td>
 <td>rad s^2/m</td>
</tr>
<tr>
 <td><strong id="VT_B_DEC_I">VT_B_DEC_I</strong> (FLOAT)</td>
 <td>Backtransition deceleration setpoint to pitch I gain    </td>
 <td>0 > 0.3 (0.05)</td>
 <td>0.1</td>
 <td>rad s/m</td>
</tr>
<tr>
 <td><strong id="VT_B_DEC_MSS">VT_B_DEC_MSS</strong> (FLOAT)</td>
 <td>Approximate deceleration during back transition <p><strong>Comment:</strong> The approximate deceleration during a back transition in m/s/s Used to calculate back transition distance in mission mode. A lower value will make the VTOL transition further from the destination waypoint. For standard vtol and tiltrotors a controller is used to track this value during the transition.</p>   </td>
 <td>0.5 > 10 (0.1)</td>
 <td>2.0</td>
 <td>m/s^2</td>
</tr>
<tr>
 <td><strong id="VT_B_REV_DEL">VT_B_REV_DEL</strong> (FLOAT)</td>
 <td>Delay in seconds before applying back transition throttle
Set this to a value greater than 0 to give the motor time to spin down <p><strong>Comment:</strong> unit s</p>   </td>
 <td>0 > 10 (1)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_B_REV_OUT">VT_B_REV_OUT</strong> (FLOAT)</td>
 <td>Output on airbrakes channel during back transition
Used for airbrakes or with ESCs that have reverse thrust enabled on a seperate channel
Airbrakes need to be enables for your selected model/mixer    </td>
 <td>0 > 1 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_B_TRANS_DUR">VT_B_TRANS_DUR</strong> (FLOAT)</td>
 <td>Duration of a back transition <p><strong>Comment:</strong> Time in seconds used for a back transition</p>   </td>
 <td>0.00 > 20.00 (1)</td>
 <td>4.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_B_TRANS_RAMP">VT_B_TRANS_RAMP</strong> (FLOAT)</td>
 <td>Back transition MC motor ramp up time <p><strong>Comment:</strong> This sets the duration during which the MC motors ramp up to the commanded thrust during the back transition stage.</p>   </td>
 <td>0.0 > 20.0 </td>
 <td>3.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_B_TRANS_THR">VT_B_TRANS_THR</strong> (FLOAT)</td>
 <td>Target throttle value for the transition to hover flight.
standard vtol: pusher
tailsitter, tiltrotor: main throttle <p><strong>Comment:</strong> Note for standard vtol: For ESCs and mixers that support reverse thrust on low PWM values set this to a negative value to apply active breaking For ESCs that support thrust reversal with a control channel please set VT_B_REV_OUT and set this to a positive value to apply active breaking</p>   </td>
 <td>-1 > 1 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_DWN_PITCH_MAX">VT_DWN_PITCH_MAX</strong> (FLOAT)</td>
 <td>Maximum allowed angle the vehicle is allowed to pitch down to generate forward force
when fixed-wing forward actuation is active (seeVT_FW_TRHUST_EN).
If demanded down pitch exceeds this limmit, the fixed-wing forward actuators are used instead    </td>
 <td>0.0 > 45.0 </td>
 <td>5.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_ELEV_MC_LOCK">VT_ELEV_MC_LOCK</strong> (INT32)</td>
 <td>Lock elevons in multicopter mode <p><strong>Comment:</strong> If set to 1 the elevons are locked in multicopter mode</p>   </td>
 <td></td>
 <td>Enabled (1)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FWD_THRUST_EN">VT_FWD_THRUST_EN</strong> (INT32)</td>
 <td>Enable/disable usage of fixed-wing actuators in hover to generate forward force (instead of pitching down).
This technique can be used to avoid the plane having to pitch down in order to move forward.
This prevents large, negative lift values being created when facing strong winds.
Fixed-wing forward actuators refers to puller/pusher (standard VTOL), or forward-tilt (tiltrotor VTOL).
Only active if demaded down pitch is above VT_DWN_PITCH_MAX, and uses VT_FWD_THRUST_SC to get from
demanded down pitch to fixed-wing actuation  <strong>Values:</strong><ul>
<li><strong>0:</strong> Disable FW forward actuation in hover.</li> 

<li><strong>1:</strong> Enable FW forward actuation in hover in altitude, position and auto modes (except LANDING).</li> 

<li><strong>2:</strong> Enable FW forward actuation in hover in altitude, position and auto modes if above MPC_LAND_ALT1.</li> 

<li><strong>3:</strong> Enable FW forward actuation in hover in altitude, position and auto modes if above MPC_LAND_ALT2.</li> 

<li><strong>4:</strong> Enable FW forward actuation in hover in altitude, position and auto modes.</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FWD_THRUST_SC">VT_FWD_THRUST_SC</strong> (FLOAT)</td>
 <td>Fixed-wing actuator thrust scale for hover forward flight <p><strong>Comment:</strong> Scale applied to the demanded down-pitch to get the fixed-wing forward actuation in hover mode. Only active if demaded down pitch is above VT_DWN_PITCH_MAX. Enabled via VT_FWD_THRUST_EN.</p>   </td>
 <td>0.0 > 2.0 </td>
 <td>0.7</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_ALT_ERR">VT_FW_ALT_ERR</strong> (FLOAT)</td>
 <td>Adaptive QuadChute <p><strong>Comment:</strong> Maximum negative altitude error for fixed wing flight. If the altitude drops below this value below the altitude setpoint the vehicle will transition back to MC mode and enter failsafe RTL.</p>   </td>
 <td>0.0 > 200.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_DIFTHR_EN">VT_FW_DIFTHR_EN</strong> (INT32)</td>
 <td>Differential thrust in forwards flight <p><strong>Comment:</strong> Set to 1 to enable differential thrust in fixed-wing flight.</p>   </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_DIFTHR_SC">VT_FW_DIFTHR_SC</strong> (FLOAT)</td>
 <td>Differential thrust scaling factor <p><strong>Comment:</strong> This factor specifies how the yaw input gets mapped to differential thrust in forwards flight.</p>   </td>
 <td>0.0 > 1.0 (0.1)</td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_MIN_ALT">VT_FW_MIN_ALT</strong> (FLOAT)</td>
 <td>QuadChute Altitude <p><strong>Comment:</strong> Minimum altitude for fixed wing flight, when in fixed wing the altitude drops below this altitude the vehicle will transition back to MC mode and enter failsafe RTL</p>   </td>
 <td>0.0 > 200.0 </td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_MOT_OFFID">VT_FW_MOT_OFFID</strong> (INT32)</td>
 <td>The channel number of motors that must be turned off in fixed wing mode    </td>
 <td>0 > 12345678 (1)</td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_PERM_STAB">VT_FW_PERM_STAB</strong> (INT32)</td>
 <td>Permanent stabilization in fw mode <p><strong>Comment:</strong> If set to one this parameter will cause permanent attitude stabilization in fw mode. This parameter has been introduced for pure convenience sake.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_QC_P">VT_FW_QC_P</strong> (INT32)</td>
 <td>QuadChute Max Pitch <p><strong>Comment:</strong> Maximum pitch angle before QuadChute engages Above this the vehicle will transition back to MC mode and enter failsafe RTL</p>   </td>
 <td>0 > 180 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_FW_QC_R">VT_FW_QC_R</strong> (INT32)</td>
 <td>QuadChute Max Roll <p><strong>Comment:</strong> Maximum roll angle before QuadChute engages Above this the vehicle will transition back to MC mode and enter failsafe RTL</p>   </td>
 <td>0 > 180 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_F_TRANS_DUR">VT_F_TRANS_DUR</strong> (FLOAT)</td>
 <td>Duration of a front transition <p><strong>Comment:</strong> Time in seconds used for a transition</p>   </td>
 <td>0.00 > 20.00 (1)</td>
 <td>5.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_F_TRANS_THR">VT_F_TRANS_THR</strong> (FLOAT)</td>
 <td>Target throttle value for the transition to fixed wing flight.
standard vtol: pusher
tailsitter, tiltrotor: main throttle    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_F_TR_OL_TM">VT_F_TR_OL_TM</strong> (FLOAT)</td>
 <td>Airspeed less front transition time (open loop) <p><strong>Comment:</strong> The duration of the front transition when there is no airspeed feedback available.</p>   </td>
 <td>1.0 > 30.0 </td>
 <td>6.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_IDLE_PWM_MC">VT_IDLE_PWM_MC</strong> (INT32)</td>
 <td>Idle speed of VTOL when in multicopter mode    </td>
 <td>900 > 2000 (1)</td>
 <td>900</td>
 <td>us</td>
</tr>
<tr>
 <td><strong id="VT_MC_ON_FMU">VT_MC_ON_FMU</strong> (INT32)</td>
 <td>Enable the usage of AUX outputs for hover motors <p><strong>Comment:</strong> Set this parameter to true if the vehicle's hover motors are connected to the FMU (AUX) port. Not required for boards that only have a FMU, and no IO. Only applies for standard VTOL and tiltrotor.</p>   </td>
 <td></td>
 <td>Disabled (0)</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_MOT_ID">VT_MOT_ID</strong> (INT32)</td>
 <td>The channel number of motors which provide lift during hover    </td>
 <td>0 > 12345678 (1)</td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_PSHER_RMP_DT">VT_PSHER_RMP_DT</strong> (FLOAT)</td>
 <td>Defines the time window during which the pusher throttle will be ramped up linearly to VT_F_TRANS_THR during a transition
to fixed wing mode. Zero or negative values will produce an instant throttle rise to VT_F_TRANS_THR    </td>
 <td>? > 20 (0.01)</td>
 <td>3.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_TILT_FW">VT_TILT_FW</strong> (FLOAT)</td>
 <td>Position of tilt servo in fw mode    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>1.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_TILT_MC">VT_TILT_MC</strong> (FLOAT)</td>
 <td>Position of tilt servo in mc mode    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_TILT_SPINUP">VT_TILT_SPINUP</strong> (FLOAT)</td>
 <td>Tilt actuator control value commanded when disarmed and during the first second after arming <p><strong>Comment:</strong> This specific tilt during spin-up is necessary for some systems whose motors otherwise don't spin-up freely.</p>   </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_TILT_TRANS">VT_TILT_TRANS</strong> (FLOAT)</td>
 <td>Position of tilt servo in transition mode    </td>
 <td>0.0 > 1.0 (0.01)</td>
 <td>0.3</td>
 <td></td>
</tr>
<tr>
 <td><strong id="VT_TRANS_MIN_TM">VT_TRANS_MIN_TM</strong> (FLOAT)</td>
 <td>Front transition minimum time <p><strong>Comment:</strong> Minimum time in seconds for front transition.</p>   </td>
 <td>0.0 > 20.0 </td>
 <td>2.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_TRANS_P2_DUR">VT_TRANS_P2_DUR</strong> (FLOAT)</td>
 <td>Duration of front transition phase 2 <p><strong>Comment:</strong> Time in seconds it should take for the rotors to rotate forward completely from the point when the plane has picked up enough airspeed and is ready to go into fixed wind mode.</p>   </td>
 <td>0.1 > 5.0 (0.01)</td>
 <td>0.5</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_TRANS_TIMEOUT">VT_TRANS_TIMEOUT</strong> (FLOAT)</td>
 <td>Front transition timeout <p><strong>Comment:</strong> Time in seconds after which transition will be cancelled. Disabled if set to 0.</p>   </td>
 <td>0.00 > 30.00 (1)</td>
 <td>15.0</td>
 <td>s</td>
</tr>
<tr>
 <td><strong id="VT_TYPE">VT_TYPE</strong> (INT32)</td>
 <td>VTOL Type (Tailsitter=0, Tiltrotor=1, Standard=2)  <strong>Values:</strong><ul>
<li><strong>0:</strong> Tailsitter</li> 

<li><strong>1:</strong> Tiltrotor</li> 

<li><strong>2:</strong> Standard</li> 
</ul>
  <p><b>Reboot required:</b> true</p>
</td>
 <td>0 > 2 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="WV_GAIN">WV_GAIN</strong> (FLOAT)</td>
 <td>Weather-vane roll angle to yawrate <p><strong>Comment:</strong> The desired gain to convert roll sp into yaw rate sp.</p>   </td>
 <td>0.0 > 3.0 (0.01)</td>
 <td>1.0</td>
 <td>Hz</td>
</tr>
</tbody></table>

## Vehicle Model

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="VM_INERTIA_XX">VM_INERTIA_XX</strong> (FLOAT)</td>
 <td>Inertia matrix, XX component    </td>
 <td>(0.00001)</td>
 <td>0.01</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="VM_INERTIA_XY">VM_INERTIA_XY</strong> (FLOAT)</td>
 <td>Inertia matrix, XY component    </td>
 <td>(0.00001)</td>
 <td>0.</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="VM_INERTIA_XZ">VM_INERTIA_XZ</strong> (FLOAT)</td>
 <td>Inertia matrix, XZ component    </td>
 <td>(0.00001)</td>
 <td>0.</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="VM_INERTIA_YY">VM_INERTIA_YY</strong> (FLOAT)</td>
 <td>Inertia matrix, YY component    </td>
 <td>(0.00001)</td>
 <td>0.01</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="VM_INERTIA_YZ">VM_INERTIA_YZ</strong> (FLOAT)</td>
 <td>Inertia matrix, YZ component    </td>
 <td>(0.00001)</td>
 <td>0.</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="VM_INERTIA_ZZ">VM_INERTIA_ZZ</strong> (FLOAT)</td>
 <td>Inertia matrix, ZZ component    </td>
 <td>(0.00001)</td>
 <td>0.01</td>
 <td>kg m^2</td>
</tr>
<tr>
 <td><strong id="VM_MASS">VM_MASS</strong> (FLOAT)</td>
 <td>Mass    </td>
 <td>(0.00001)</td>
 <td>1.</td>
 <td>kg</td>
</tr>
</tbody></table>

## Miscellaneous

<table>
 <colgroup><col style="width: 23%"><col style="width: 46%"><col style="width: 11%"><col style="width: 11%"><col style="width: 9%"></colgroup>
 <thead>
   <tr><th>Name</th><th>Description</th><th>Min > Max (Incr.)</th><th>Default</th><th>Units</th></tr>
 </thead>
<tbody>
<tr>
 <td><strong id="EXFW_HDNG_P">EXFW_HDNG_P</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EXFW_PITCH_P">EXFW_PITCH_P</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="EXFW_ROLL_P">EXFW_ROLL_P</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.2</td>
 <td></td>
</tr>
<tr>
 <td><strong id="MPC_LAND_RC_HELP">MPC_LAND_RC_HELP</strong> (INT32)</td>
 <td>Enable user assisted descent speed for autonomous land routine <p><strong>Comment:</strong> When enabled, descent speed will be: stick full up - 0 stick centered - MPC_LAND_SPEED stick full down - 2 * MPC_LAND_SPEED</p> <strong>Values:</strong><ul>
<li><strong>0:</strong> Fixed descent speed of MPC_LAND_SPEED</li> 

<li><strong>1:</strong> User assisted descent speed</li> 
</ul>
  </td>
 <td>0 > 1 </td>
 <td>0</td>
 <td></td>
</tr>
<tr>
 <td><strong id="RV_YAW_P">RV_YAW_P</strong> (FLOAT)</td>
 <td>    </td>
 <td></td>
 <td>0.1</td>
 <td></td>
</tr>
<tr>
 <td><strong id="UUV_SKIP_CTRL">UUV_SKIP_CTRL</strong> (INT32)</td>
 <td>Skip the controller  <strong>Values:</strong><ul>
<li><strong>0:</strong> use the module's controller</li> 

<li><strong>1:</strong> skip the controller and feedthrough the setpoints</li> 
</ul>
  </td>
 <td></td>
 <td>0</td>
 <td></td>
</tr>
</tbody></table>


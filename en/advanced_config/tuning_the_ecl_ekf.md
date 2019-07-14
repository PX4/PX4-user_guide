# Using the ECL EKF

This tutorial answers common questions about use of the ECL EKF algorithm.

> **Tip** The [PX4 State Estimation Overview](https://youtu.be/HkYRJJoyBwQ) video from the *PX4 Developer Summit 2019* (Dr. Paul Riseborough) provides an overview of the estimator, and additionally describes both the major changes from 2018/2019, and the expected improvements through 2020. 
 

## What is the ECL EKF?

The Estimation and Control Library (ECL) uses an Extended Kalman Filter (EKF) algorithm to process sensor measurements and provide an estimate of the following states:

* Quaternion defining the rotation from North, East, Down local earth frame to X,Y,Z body frame
* Velocity at the IMU - North,East,Down \(m/s\)
* Position at the IMU - North,East,Down \(m\)
* IMU delta angle bias estimates - X,Y,Z \(rad\)
* IMU delta velocity bias estimates - X,Y,Z\(m/s\)
* Earth Magnetic field components - North,East,Down \(gauss\)
* Vehicle body frame magnetic field bias - X,Y,Z \(gauss\)
* Wind velocity - North,East \(m/s\)

The EKF runs on a delayed 'fusion time horizon' to allow for different time delays on each measurement relative to the IMU. 
Data for each sensor is FIFO buffered and retrieved from the buffer by the EKF to be used at the correct time.
The delay compensation for each sensor is controlled by the [EKF2_*_DELAY](../advanced_config/parameter_reference.md#ekf2) parameters.

A complementary filter is used to propagate the states forward from the 'fusion time horizon' to current time using the buffered IMU data. 
The time constant for this filter is controlled by the [EKF2_TAU_VEL](../advanced_config/parameter_reference.md#EKF2_TAU_VEL) and [EKF2_TAU_POS](../advanced_config/parameter_reference.md#EKF2_TAU_POS) parameters.

> **Note** The 'fusion time horizon' delay and length of the buffers is determined by the largest of the `EKF2_*_DELAY` parameters. 
  If a sensor is not being used, it is recommended to set its time delay to zero. 
  Reducing the 'fusion time horizon' delay reduces errors in the complementary filter used to propagate states forward to current time.

The position and velocity states are adjusted to account for the offset between the IMU and the body frame before they are output to the control loops. 
The position of the IMU relative to the body frame is set by the `EKF2_IMU_POS_X,Y,Z` parameters.

The EKF uses the IMU data for state prediction only. IMU data is not used as an observation in the EKF derivation. 
The algebraic equations for the covariance prediction, state update and covariance update were derived using the Matlab symbolic toolbox and can be found here: [Matlab Symbolic Derivation](https://github.com/PX4/ecl/blob/master/EKF/matlab/scripts/Inertial Nav EKF/GenerateNavFilterEquations.m).

## What sensor measurements does it use?

The EKF has different modes of operation that allow for different combinations of sensor measurements. 
On start-up the filter checks for a minimum viable combination of sensors and after initial tilt, yaw and height alignment is completed, enters a mode that provides rotation, vertical velocity, vertical position, IMU delta angle bias and IMU delta velocity bias estimates.

This mode requires IMU data, a source of yaw (magnetometer or external vision) and a source of height data. 
This minimum data set is required for all EKF modes of operation. Other sensor data can then be used to estimate additional states.

### IMU

* Three axis body fixed Inertial Measurement unit delta angle and delta velocity data at a minimum rate of 100Hz. 
  Note: Coning corrections should be applied to the IMU delta angle data before it is used by the EKF.

### Magnetometer

Three axis body fixed magnetometer data (or external vision system pose data) at a minimum rate of 5Hz is required. Magnetometer data can be used in two ways:

* Magnetometer measurements are converted to a yaw angle using the tilt estimate and magnetic declination. 
  This yaw angle is then used as an observation by the EKF. 
  This method is less accurate and does not allow for learning of body frame field offsets, however it is more robust to magnetic anomalies and large start-up gyro biases. 
  It is the default method used during start-up and on ground.
* The  XYZ magnetometer readings are used as separate observations. 
  This method is more accurate and allows body frame offsets to be learned, but assumes the earth magnetic field environment only changes slowly and performs less well when there are significant external magnetic anomalies. 
  It is the default method when the vehicle is airborne and has climbed past 1.5 m altitude.

The logic used to select the mode is set by the [EKF2_MAG_TYPE](../advanced_config/parameter_reference.md#EKF2_MAG_TYPE) parameter.

### Height

A source of height data - either GPS, barometric pressure, range finder or external vision at a minimum rate of 5Hz is required. 
Note: The primary source of height data is controlled by the [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) parameter.

If these measurements are not present, the EKF will not start. 
When these measurements have been detected, the EKF will initialise the states and complete the tilt and yaw alignment. 
When tilt and yaw alignment is complete, the EKF can then transition to other modes of operation  enabling use of additional sensor data:

#### Correction for Static Pressure Position Error

Barometric pressure altitude is subject to errors generated by aerodynamic disturbances caused by vehicle wind relative velocity and orientation. 
This is known in aeronautics as *static pressure position error*. 
The EKF2 module that uses the ECL/EKF2 estimator library provides a method of compensating for these errors, provided wind speed state estimation is active.

For platforms operating in a fixed wing mode, wind speed state estimation requires either [Airspeed](#airspeed) and/or [Synthetic Sideslip](#synthetic-sideslip) fusion to be enabled.

For multi-rotors, fusion of [Drag Specific Forces](#mc_wind_estimation_using_drag) can be enabled and tuned to provide the required wind velocity state estimates.

The EKF2 module models the error as a body fixed ellipsoid that specifies the fraction of dynamic pressure that is added to/subtracted from the barometric pressure - before it is converted to a height estimate.
See the following parameter documentation for information on how to use this feature:
- [EKF2_PCOEF_XP](../advanced_config/parameter_reference.md#EKF2_PCOEF_XP)
- [EKF2_PCOEF_XN](../advanced_config/parameter_reference.md#EKF2_PCOEF_XN)
- [EKF2_PCOEF_YP](../advanced_config/parameter_reference.md#EKF2_PCOEF_YP)
- [EKF2_PCOEF_YN](../advanced_config/parameter_reference.md#EKF2_PCOEF_YN)
- [EKF2_PCOEF_Z](../advanced_config/parameter_reference.md#EKF2_PCOEF_Z)

### GPS

#### Position and Velocity Measurements

GPS measurements will be used for position and velocity if the following conditions are met:

* GPS use is enabled via setting of the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter.
* GPS quality checks have passed. 
  These checks are controlled by the [EKF2_GPS_CHECK](../advanced_config/parameter_reference.md#EKF2_GPS_CHECK) and `EKF2_REQ_*` parameters. 
* GPS height can be used directly by the EKF via setting of the [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) parameter.

#### Yaw Measurements

Some GPS receivers such as the [Trimble MB-Two RTK GPS receiver](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx) can be used to provide a heading measurement that replaces the use of magnetometer data. 
This can be a significant advantage when operating in an environment where large magnetic anomalies are present, or at latitudes here the earth's magnetic field has a high inclination. 
Use of GPS yaw measurements is enabled by setting bit position 7 to 1 (adding 128) in the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter.

#### Dual Receivers

Data from GPS receivers can be blended using an algorithm that weights data based on reported accuracy (this works best if both receivers output data at the same rate and use the same accuracy).
The mechanism also provides automatic failover if data from a receiver is lost (it allows, for example, a standard GPS to be used as a backup to a more accurate RTK receiver). 
This is controlled by the [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) parameter. 

The [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) parameter is set by default to disable blending and always use the first receiver, so it will have to be set to select which receiver accuracy metrics are used to decide how much each receiver output contributes to the blended solution. 
Where different receiver models are used, it is important that the [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) parameter is set to a value that uses accuracy metrics that are supported by both receivers. 
For example do not set bit position 0 to `true` unless the drivers for both receivers publish values in the `s_variance_m_s` field of the `vehicle_gps_position` message that are comparable.
This can be difficult with receivers from different manufacturers due to the different way that accuracy is defined, e.g. CEP vs 1-sigma, etc.

The following items should be checked during setup:

* Verify that data for the second receiver is present. 
  This will be logged as `vehicle_gps_position_1` and can also be checked when connected via the *nsh console* using the command `listener vehicle_gps_position -i 1`. 
  The [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter will need to be set correctly.
* Check the `s_variance_m_s`, `eph` and `epv` data from each receiver and decide which accuracy metrics can be used.
  If both receivers output sensible `s_variance_m_s` and `eph` data, and GPS vertical position is not being used directly for navigation, then setting [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) to 3 is recommended.
  Where only `eph` data is available and both receivers do not output `s_variance_m_s` data, set [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) to 2.
  Bit position 2 would only be set if the GPS had been selected as a primary height source with the [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) parameter and both receivers output sensible `epv` data.
* The output from the blended receiver data is logged as `ekf_gps_position`, and can be checked whilst connect via the nsh terminal using the command `listener ekf_gps_position`.
* Where receivers output at different rates, the blended output will be at the rate of slower receiver. 
  Where possible receivers should be configured to output at the same rate.


#### GPS Performance Requirements

For the ECL to accept GPS data for navigation, certain minimum requirements need to be satisfied over a period of 10 seconds (minimums are defined in the [EKF2_REQ_*](../advanced_config/parameter_reference.md#EKF2_REQ_EPH) parameters)

The table below shows the different metrics directly reported or calculated from the GPS data, and the minimum required values for the data to be used by ECL. 
In addition, the *Average Value* column shows typical values that might reasonably be obtained from a standard GNSS module (e.g. uBlox M8 series) - i.e. values that are considered good/acceptable.

Metric | Minimum required | Average Value | Units | Notes
--- | --- | --- | --- | ---
eph | 3&nbsp;([EKF2_REQ_EPH](../advanced_config/parameter_reference.md#EKF2_REQ_EPH)) | 0.8 | m | Standard deviation of horizontal position error
epv | 5&nbsp;([EKF2_REQ_EPV](../advanced_config/parameter_reference.md#EKF2_REQ_EPV)) | 1.5 | m | Standard deviation of vertical position error
Number of satellites | 6&nbsp;([EKF2_REQ_NSATS](../advanced_config/parameter_reference.md#EKF2_REQ_NSATS)) | 14 | - | 
Speed variance | 0.5 | 0.3 | m/s | 
Fix type | 3 | 4 | - | 
hpos_drift_rate | 0.1&nbsp;([EKF2_REQ_HDRIFT](../advanced_config/parameter_reference.md#EKF2_REQ_HDRIFT)) | 0.01 | m/s | Drift rate calculated from reported GPS position (when stationary).
vpos_drift_rate | 0.2&nbsp;([EKF2_REQ_VDRIFT](../advanced_config/parameter_reference.md#EKF2_REQ_VDRIFT)) | 0.02 | m/s | Drift rate calculated from reported GPS altitude (when stationary).
hspd | 0.1&nbsp;([EKF2_REQ_SACC](../advanced_config/parameter_reference.md#EKF2_REQ_SACC)) | 0.01 | m/s | Filtered magnitude of reported GPS horizontal velocity.

> **Note** The `hpos_drift_rate`, `vpos_drift_rate` and `hspd` are calculated over a period of 10 seconds and published in the `ekf2_gps_drift` topic. Note that `ekf2_gps_drift` is not logged!


### Range Finder

Range finder distance to ground is used by a single state filter to estimate the vertical position of the terrain relative to the height datum.

If operating over a flat surface that can be used as a zero height datum, the range finder data can also be used directly by the EKF to estimate height by setting the [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) parameter to 2.

### Airspeed

Equivalent Airspeed (EAS) data can be used to estimate wind velocity and reduce drift when GPS is lost by setting [EKF2_ARSP_THR](../advanced_config/parameter_reference.md#EKF2_ARSP_THR) to a positive value.
Airspeed data will be used when it exceeds the threshold set by a positive value for [EKF2_ARSP_THR](../advanced_config/parameter_reference.md#EKF2_ARSP_THR) and the vehicle type is not rotary wing.

### Synthetic Sideslip

Fixed wing platforms can take advantage of an assumed sideslip observation of zero to improve wind speed estimation and also enable wind speed estimation without an airspeed sensor. 
This is enabled by setting the [EKF2_FUSE_BETA](../advanced_config/parameter_reference.md#EKF2_FUSE_BETA) parameter to 1.

### Multicopter Wind Estimation using Drag Specific Forces {#mc_wind_estimation_using_drag}

Multi-rotor platforms can take advantage of the relationship between airspeed and drag force along the X and Y body axes to estimate North/East components of wind velocity.
This is enabled by setting bit position 5 in the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter to true. 
The relationship between airspeed and specific force (IMU acceleration) along the X and Y body axes is controlled by the [EKF2_BCOEF_X](../advanced_config/parameter_reference.md#EKF2_BCOEF_X) and [EKF2_BCOEF_Y](../advanced_config/parameter_reference.md#EKF2_BCOEF_Y) parameters which set the ballistic coefficients for flight in the X and Y directions respectively. 
The amount of specific force observation noise is set by the [EKF2_DRAG_NOISE](../advanced_config/parameter_reference.md#EKF2_DRAG_NOISE) parameter.

These can be tuned by flying the vehicle in [Position mode](../flight_modes/position_mc.md) repeatedly forwards/backwards between rest and maximum maximum speed, adjusting [EKF2_BCOEF_X](../advanced_config/parameter_reference.md#EKF2_BCOEF_X) so that the corresponding innovation sequence in the `ekf2_innovations_0.drag_innov[0]` log message is minimised. 
This is then repeated for right/left movement with adjustment of [EKF2_BCOEF_Y](../advanced_config/parameter_reference.md#EKF2_BCOEF_Y) to minimise the `ekf2_innovations_0.drag_innov[1]` innovation sequence. 
Tuning is easier if this testing is conducted in still conditions.

If you are able to log data without dropouts from boot using [SDLOG_MODE = 1](../advanced_config/parameter_reference.md#SDLOG_MODE) and [SDLOG_PROFILE = 2](../advanced_config/parameter_reference.md#SDLOG_PROFILE), have access to the development environment, and are able to build code, then we recommended you fly *once* and perform the tuning on logs generated via [EKF2 Replay](https://dev.px4.io/en/debug/system_wide_replay.html#ekf2-replay) of the flight data.

### Optical Flow

Optical flow data will be used if the following conditions are met:

* Valid range finder data is available.
* Bit position 1 in the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter is true.
* The quality metric returned by the flow sensor is greater than the minimum requirement set by the [EKF2_OF_QMIN](../advanced_config/parameter_reference.md#EKF2_OF_QMIN) parameter.

### External Vision System

Position and Pose Measurements from an external vision system, e.g. Vicon, can be used:

* External vision system horizontal position data will be used if bit position 3 in the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter is true.
* External vision system vertical position data will be used if the [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) parameter is set to 3.
* External vision system pose data will be used for yaw estimation if bit position 4 in the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter is true.

## How do I use the 'ecl' library EKF?

Set the [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) parameter to 2 to use the ecl EKF.

## What are the advantages and disadvantages of the ecl EKF over other estimators?

Like all estimators, much of the performance comes from the tuning to match sensor characteristics. Tuning is a compromise between accuracy and robustness and although we have attempted to provide a tune that meets the needs of most users, there will be applications where tuning changes are required.

For this reason, no claims for accuracy relative to the legacy combination of `attitude_estimator_q` + `local_position_estimator` have been made and the best choice of estimator will depend on the application and tuning.

### Disadvantages

* The ecl EKF is a complex algorithm that requires a good understanding of extended Kalman filter theory and its application to navigation problems to tune successfully. 
  It is therefore more difficult for users that are not achieving good results to know what to change.
* The ecl EKF uses more RAM and flash space.
* The ecl EKF uses more logging space.
* The ecl EKF has had less flight time.

### Advantages

* The ecl EKF is able to fuse data from sensors with different time delays and data rates in a mathematically consistent way which improves accuracy during dynamic manoeuvres once time delay parameters are set correctly.
* The ecl EKF is capable of fusing a large range of different sensor types.
* The ecl EKF detects and reports statistically significant inconsistencies in sensor data, assisting with diagnosis of sensor errors.
* For fixed wing operation, the ecl EKF estimates wind speed with or without an airspeed sensor and is able to use the estimated wind in combination with airspeed measurements and sideslip assumptions to extend the dead-reckoning time available if GPS is lost in flight.
* The ecl EKF estimates 3-axis accelerometer bias which improves accuracy for tailsitters and other vehicles that experience large attitude changes between flight phases.
* The federated architecture (combined attitude and position/velocity estimation) means that attitude estimation benefits from all sensor measurements. 
  This should provide the potential for improved attitude estimation if tuned correctly. 

## How do I check the EKF performance?

EKF outputs, states and status data are published to a number of uORB topics which are logged to the SD card during flight. 
The following guide assumes that data has been logged using the *.ulog file format*. The .ulog format data can be parsed in python by using the [PX4 pyulog library](https://github.com/PX4/pyulog).

Most of the EKF data is found in the [ekf2_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg) and [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) uORB messages that are logged to the .ulog file.

A python script that automatically generates analysis plots and metadata can be found [here](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/process_logdata_ekf.py). 
To use this script file, cd to the `Tools/ecl_ekf` directory and enter `python process_logdata_ekf.py <log_file.ulg>`. 
This saves performance metadata in a csv file named **<log_file>.mdat.csv** and plots in a pdf file named `<log_file>.pdf`.

Multiple log files in a directory can be analysed using the [batch\_process\_logdata\_ekf.py](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/batch_process_logdata_ekf.py) script. 
When this has been done, the performance metadata files can be processed to provide a statistical assessment of the estimator performance across the population of logs using the [batch\_process\_metadata\_ekf.py](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/batch_process_metadata_ekf.py) script.

### Output Data

* Attitude output data is found in the [vehicle\_attitude](https://github.com/PX4/Firmware/blob/master/msg/vehicle_attitude.msg) message.
* Local position output data is found in the [vehicle\_local\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_local_position.msg) message.
* Global \(WGS-84\) output data is found in the [vehicle\_global\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_global_position.msg) message.
* Wind velocity output data is found in the [wind\_estimate](https://github.com/PX4/Firmware/blob/master/msg/wind_estimate.msg) message.


### States

Refer to states\[32\] in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg). 
The index map for states\[32\] is as follows:

* \[0 ... 3\] Quaternions
* \[4 ... 6\] Velocity NED \(m/s\)
* \[7 ... 9\] Position NED \(m\)
* \[10 ... 12\] IMU delta angle bias XYZ \(rad\)
* \[13 ... 15\] IMU delta velocity bias XYZ \(m/s\)
* \[16 ... 18\] Earth magnetic field NED \(gauss\)
* \[19 ... 21\] Body magnetic field XYZ \(gauss\)
* \[22 ... 23\] Wind velocity NE \(m/s\)
* \[24 ... 32\] Not Used

### State Variances

Refer to covariances\[28\] in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg). 
The index map for covariances\[28\] is as follows:

* \[0 ... 3\] Quaternions
* \[4 ... 6\] Velocity NED \(m/s\)^2
* \[7 ... 9\] Position NED \(m^2\)
* \[10 ... 12\] IMU delta angle bias XYZ \(rad^2\)
* \[13 ... 15\] IMU delta velocity bias XYZ \(m/s\)^2
* \[16 ... 18\] Earth magnetic field NED \(gauss^2\)
* \[19 ... 21\] Body magnetic field XYZ \(gauss^2\)
* \[22 ... 23\] Wind velocity NE \(m/s\)^2
* \[24 ... 28\] Not Used

### Observation Innovations

* Magnetometer XYZ \(gauss\) : Refer to mag\_innov\[3\] in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Yaw angle \(rad\) : Refer to heading\_innov in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Velocity and position innovations : Refer to vel\_pos\_innov\[6\] in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg). The index map for vel\_pos\_innov\[6\] is as follows:
  * \[0 ... 2\] Velocity NED \(m/s\)
  * \[3 ... 5\] Position NED \(m\)
* True Airspeed \(m/s\) : Refer to airspeed\_innov in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Synthetic sideslip \(rad\) : Refer to beta\_innov in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Optical flow XY \(rad/sec\) : Refer to flow\_innov in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Height above ground \(m\) : Refer to hagl\_innov in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).

### Observation Innovation Variances

* Magnetometer XYZ \(gauss^2\) : Refer to mag\_innov\_var\[3\] in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Yaw angle \(rad^2\) : Refer to heading\_innov\_var in the ekf2\_innovations message.
* Velocity and position innovations : Refer to vel\_pos\_innov\_var\[6\] in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg). The index map for vel\_pos\_innov\_var\[6\] is as follows:
  * \[0 ... 2\] Velocity NED \(m/s\)^2
  * \[3 ... 5\] Position NED \(m^2\)
* True Airspeed \(m/s\)^2 : Refer to airspeed\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Synthetic sideslip \(rad^2\) : Refer to beta\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Optical flow XY \(rad/sec\)^2 : Refer to flow\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Height above ground \(m^2\) : Refer to hagl\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).

### Output Complementary Filter

The output complementary filter is used to propagate states forward from the fusion time horizon to current time. 
To check the magnitude of the angular, velocity and position tracking errors measured at the fusion time horizon, refer to `output_tracking_error[3]` in the `ekf2_innovations` message. 

The index map is as follows:

* [0] Angular tracking error magnitude (rad)
* [1] Velocity tracking error magnitude (m/s). 
  The velocity tracking time constant can be adjusted using the [EKF2_TAU_VEL](../advanced_config/parameter_reference.md#EKF2_TAU_VEL) parameter.
  Reducing this parameter reduces steady state errors but increases the amount of observation noise on the NED velocity outputs.
* [2] Position tracking error magnitude \(m\). The position tracking time constant can be adjusted using the [EKF2_TAU_POS](../advanced_config/parameter_reference.md#EKF2_TAU_POS) parameter. Reducing this parameter reduces steady state errors but increases the amount of observation noise on the NED position outputs.

### EKF Errors

The EKF contains internal error checking for badly conditioned state and covariance updates. Refer to the filter\_fault\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### Observation Errors

There are two categories of observation faults:

* Loss of data. 
  An example of this is a range finder failing to provide a return.
* The innovation, which is the difference between the state prediction and sensor observation is excessive. 
  An example of this is excessive vibration causing a large vertical position error, resulting in the barometer height measurement being rejected.

Both of these can result in observation data being rejected for long enough to cause the EKF to attempt a reset of the states using the sensor observations. 
All observations have a statistical confidence checks applied to the innovations. 
The number of standard deviations for the check are controlled by the `EKF2_*_GATE` parameter for each observation type.

Test levels are  available in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) as follows:

* `mag_test_ratio`: ratio of the largest magnetometer innovation component to the innovation test limit
* `vel_test_ratio`: ratio of the largest velocity innovation component to the innovation test limit
* `pos_test_ratio`: ratio of the largest horizontal position innovation component to the innovation test limit
* `hgt_test_ratio`: ratio of the vertical position innovation to the innovation test limit
* `tas_test_ratio`: ratio of the true airspeed innovation to the innovation test limit
* `hagl_test_ratio`: ratio of the height above ground innovation to the innovation test limit

For a binary pass/fail summary for each sensor, refer to innovation\_check\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### GPS Quality Checks

The EKF applies a number of GPS quality checks before commencing GPS aiding. 
These checks are controlled by the [EKF2_GPS_CHECK](../advanced_config/parameter_reference.md#EKF2_GPS_CHECK) and `EKF2_REQ_*` parameters. 
The pass/fail status for these checks is logged in the [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).gps\_check\_fail\_flags message. 
This integer will be zero when all required GPS checks have passed. 
If the EKF is not commencing GPS alignment, check the value of the integer against the bitmask definition `gps_check_fail_flags` in [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### EKF Numerical Errors

The EKF uses single precision floating point operations for all of its computations and first order approximations for derivation of the covariance prediction and update equations in order to reduce processing requirements. This means that it is possible when re-tuning the EKF to encounter conditions where the covariance matrix operations become badly conditioned enough to cause divergence or significant errors in the state estimates.

To prevent this, every covariance and state update step contains the following error detection and correction steps:

* If the innovation variance is less than the observation variance (this requires a negative state variance which is impossible) or the covariance update will produce a negative variance for any of the states, then:
  * The state and covariance update is skipped
  * The corresponding rows and columns in the covariance matrix are reset
  * The failure is recorded in the [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) filter\_fault\_flags message
* State variances (diagonals in the covariance matrix) are constrained to be non-negative.
* An upper limit is applied to state variances.
* Symmetry is forced on the covariance matrix.

After re-tuning the filter, particularly re-tuning that involve reducing the noise variables, the value of `estimator_status.gps_check_fail_flags` should be checked to ensure that it remains zero.

## What should I do if the height estimate is diverging?

The most common cause of EKF height diverging away from GPS and altimeter measurements during flight is clipping and/or aliasing of the IMU measurements caused by vibration. 
If this is occurring, then the following signs should be evident in the data

* [ekf2_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).vel\_pos\_innov\[2\] and  [ekf2_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).vel\_pos\_innov\[5\] will both have the same sign.
* [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).hgt\_test\_ratio will be greater than 1.0

The recommended first step is to ensure that the autopilot is isolated from the airframe using an effective isolation mounting system. 
An isolation mount has 6 degrees of freedom, and therefore 6 resonant frequencies. 
As a general rule, the 6 resonant frequencies of the autopilot on the isolation mount should be above 25Hz to avoid interaction with the autopilot dynamics and below the frequency of the motors.

An isolation mount can make vibration worse if the resonant frequencies coincide with motor or propeller blade passage frequencies.

The EKF can be made more resistant to vibration induced height divergence by making the following parameter changes:

* Double the value of the innovation gate for the primary height sensor. If using barometric height this is [EKF2_BARO_GATE](../advanced_config/parameter_reference.md#EKF2_BARO_GATE).
* Increase the value of [EKF2_ACC_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_NOISE) to 0.5 initially. If divergence is still occurring, increase in further increments of 0.1 but do not go above 1.0

Note that the effect of these changes will make the EKF more sensitive to errors in GPS vertical velocity and barometric pressure.

## What should I do if the position estimate is diverging?

The most common causes of position divergence are:

* High vibration levels. 
  * Fix by improving mechanical isolation of the autopilot.
  * Increasing the value of [EKF2_ACC_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_NOISE) and [EKF2_GYR_NOISE](../advanced_config/parameter_reference.md#EKF2_GYR_NOISE) can help, but does make the EKF more vulnerable to GPS glitches.
* Large gyro bias offsets. 
  * Fix by re-calibrating the gyro. 
    Check for excessive temperature sensitivity (&gt; 3 deg/sec bias change during warm-up from a cold start and replace the sensor if affected of insulate to to slow the rate of temperature change.
* Bad yaw alignment
  * Check the magnetometer calibration and alignment.
  * Check the heading shown QGC is within within 15 deg truth
* Poor GPS accuracy
  * Check for interference
  * Improve separation and shielding
  * Check flying location for GPS signal obstructions and reflectors \(nearby tall buildings\)
* Loss of GPS

Determining which of these is the primary cause requires a methodical approach to analysis of the EKF log data:

* Plot the velocity innovation test ratio - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vel\_test\_ratio
* Plot the horizontal position innovation test ratio - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).pos\_test\_ratio
* Plot the height innovation test ratio - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).hgt\_test\_ratio
* Plot the magnetometer innovation test ratio - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).mag\_test\_ratio
* Plot the GPS receiver reported speed accuracy - [vehicle\_gps\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_gps_position.msg).s\_variance\_m\_s
* Plot the IMU delta angle state estimates - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).states\[10\], states\[11\] and states\[12\]
* Plot the EKF internal high frequency vibration metrics:
  * Delta angle coning vibration - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[0\]
  * High frequency delta angle vibration - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[1\]
  * High frequency delta velocity vibration - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[2\]

During normal operation, all the test ratios should remain below 0.5 with only occasional spikes above this as shown in the example below from a successful flight:

![Position, Velocity, Height and Magnetometer Test Ratios](../../assets/ecl/test_ratios_-_successful.png)

The following plot shows the EKF vibration metrics for a multirotor with good isolation. 
The landing shock and the increased vibration during takeoff and landing can be seen. 
Insufficient data has been gathered with these metrics to provide specific advice on maximum thresholds.

![Vibration metrics - successful](../../assets/ecl/vibration_metrics_-_successful.png)

The above vibration metrics are of limited value as the presence of vibration at a frequency close to the IMU sampling frequency (1 kHz for most boards) will cause offsets to appear in the data that do not show up in the high frequency vibration metrics. 
The only way to detect aliasing errors is in their effect on inertial navigation accuracy and the rise in innovation levels.

In addition to generating large position and velocity test ratios of &gt; 1.0, the different error mechanisms affect the other test ratios in different ways:

### Determination of Excessive Vibration

High vibration levels normally affect vertical position and velocity innovations as well as the horizontal components. 
Magnetometer test levels are only affected to a small extent.

\(insert example plots showing bad vibration here\)

### Determination of Excessive Gyro Bias

Large gyro bias offsets are normally characterised by a change in the value of delta angle bias greater than 5E-4 during flight (equivalent to ~3 deg/sec) and can also cause a large increase in the magnetometer test ratio if the yaw axis is affected. 
Height is normally unaffected other than extreme cases. Switch on bias value of up to 5 deg/sec can be tolerated provided the filter is given time time settle before flying. 
Pre-flight checks performed by the commander should prevent arming if the position is diverging.

\(insert example plots showing bad gyro bias here\)

### Determination of Poor Yaw Accuracy

Bad yaw alignment causes a velocity test ratio that increases rapidly when the vehicle starts moving due inconsistency in the direction of velocity calculated by the inertial nav and the GPS measurement. 
Magnetometer innovations are slightly affected. 
Height is normally unaffected.

\(insert example plots showing bad yaw alignment here\)

### Determination of Poor GPS Accuracy

Poor GPS accuracy is normally accompanied by a rise in the reported velocity error of the receiver in conjunction with a rise in innovations. Transient errors due to multipath, obscuration and interference are more common causes. 
Here is an example of a temporary loss of GPS accuracy where the multi-rotor started drifting away from its loiter location and had to be corrected using the sticks. 
The rise in [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vel\_test\_ratio to greater than 1 indicates the GPs velocity was inconsistent with other measurements and has been rejected.

![GPS glitch - test ratios](../../assets/ecl/gps_glitch_-_test_ratios.png)

This is accompanied with rise in the GPS receivers reported velocity accuracy which indicates that it was likely a GPS error.

![GPS Glitch - reported receiver accuracy](../../assets/ecl/gps_glitch_-_reported_receiver_accuracy.png)

If we also look at the GPS horizontal velocity innovations and innovation variances, we can see the large spike in North velocity innovation that accompanies this GPS 'glitch' event.

![GPS Glitch - velocity innovations](../../assets/ecl/gps_glitch_-_velocity_innovations.png)

### Determination of GPS Data Loss

Loss of GPS data will be shown by the velocity and position innovation test ratios 'flat-lining'. 
If this occurs, check the other GPS status data in `vehicle_gps_position` for further information.

The following plot shows the NED GPS velocity innovations `ekf2_innovations_0.vel_pos_innov[0 ... 2]`, the GPS NE position innovations `ekf2_innovations_0.vel_pos_innov[3 ... 4]` and the Baro vertical position innovation `ekf2_innovations_0.vel_pos_innov[5]` generated from a simulated VTOL flight using SITL Gazebo.

The simulated GPS was made to lose lock at 73 seconds. 
Note the NED velocity innovations and NE position innovations 'flat-line' after GPS is lost. 
Note that after 10 seconds without GPS data, the EKF reverts back to a static position mode using the last known position and the NE position innovations start to change again.

![GPS Data Loss - in SITL](../../assets/ecl/gps_data_loss_-_velocity_innovations.png)

### Barometer Ground Effect Compensation

If the vehicle has the tendency during landing to climb back into the air when close to the ground, the most likely cause is barometer ground effect.

This is caused when air pushed down by the propellers hits the ground and creates a high pressure zone below the drone.
The result is a lower reading of pressure altitude, leading to an unwanted climb being commanded.
The figure below shows a typical situation where the ground effect is present. 
Note how the barometer signal dips at the beginning and end of the flight.

![Barometer ground effect](../../assets/ecl/gnd_effect.png)

You can enable *ground effect compensation* to fix this problem:
- From the plot estimate the magnitude of the barometer dip during takeoff or landing. In the plot above one can read a barometer dip of about 6 meters during landing.
- Then set the parameter [EKF2_GND_EFF_DZ](../advanced_config/parameter_reference.md#EKF2_GND_EFF_DZ) to that value and add a 10 percent margin. Therefore, in this case a value of 6.6 meters would be a good starting point.

If a terrain estimate is available (e.g. the vehicle is equipped with a range finder) then you can additionally specify [EKF2_GND_MAX_HGT](../advanced_config/parameter_reference.md#EKF2_GND_MAX_HGT), the above ground-level altitude below which ground effect compensation should be activated.
If no terrain estimate is available this parameter will have no effect and the system will use heuristics to determine if ground effect compensation should be activated.

## Further Information

* [PX4 State Estimation Overview](https://youtu.be/HkYRJJoyBwQ), *PX4 Developer Summit 2019*, Dr. Paul Riseborough): Overview of the estimator, and major changes from 2018/19, and the expected improvements through 2019/20. 
 

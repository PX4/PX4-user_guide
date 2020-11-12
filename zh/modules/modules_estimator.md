# 模块参考：估计器

## AttitudeEstimatorQ
Source: [modules/attitude_estimator_q](https://github.com/PX4/Firmware/tree/master/src/modules/attitude_estimator_q)


### 描述
Attitude and position estimator using an Extended Kalman Filter. It is used for Multirotors and Fixed-Wing.

<a id="AttitudeEstimatorQ_usage"></a>

### 用法
```
AttitudeEstimatorQ <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## wind_estimator
The documentation can be found on the [tuning_the_ecl_ekf](https://dev.px4.io/en/tutorials/tuning_the_ecl_ekf.html) page.


### 描述
This module provides a single airspeed_validated topic, containing indicated (IAS), calibrated (CAS), true airspeed (TAS) and the information if the estimation currently is invalid and if based sensor readings or on groundspeed minus windspeed. Supporting the input of multiple "raw" airspeed inputs, this module automatically switches to a valid sensor in case of failure detection. For failure detection as well as for the estimation of a scale factor from IAS to CAS, it runs several wind estimators and also publishes those.

<a id="airspeed_estimator_usage"></a>

### 用法
```
airspeed_estimator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## ekf2
Source: [modules/ekf2](https://github.com/PX4/Firmware/tree/master/src/modules/ekf2)


### 描述
Attitude and position estimator using an Extended Kalman Filter. It is used for Multirotors and Fixed-Wing.

Source: [modules/wind_estimator](https://github.com/PX4/Firmware/tree/master/src/modules/wind_estimator)

This module runs a combined wind and airspeed scale factor estimator. If provided the vehicle NED speed and attitude it can estimate the horizontal wind components based on a zero sideslip assumption. This makes the estimator only suitable for fixed wing vehicles. If provided an airspeed measurement this module also estimates an airspeed scale factor based on the following model: measured_airspeed = scale_factor * real_airspeed.

<a id="ekf2_usage"></a>

### 用法
```
ekf2 <command> [arguments...]
 ekf2 &lt;command&gt; [arguments...]
 Commands:
   start
     [-r]        启用 replay 模式

   stop

   status        打印状态信息
```
## local_position_estimator
Source: [modules/local_position_estimator](https://github.com/PX4/Firmware/tree/master/src/modules/local_position_estimator)


### Description
Attitude and position estimator using an Extended Kalman Filter.

<a id="local_position_estimator_usage"></a>

### Usage
```
local_position_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
 Commands:
   start

   stop

   status        print status info
```
## mc_hover_thrust_estimator
Source: [modules/mc_hover_thrust_estimator](https://github.com/PX4/Firmware/tree/master/src/modules/mc_hover_thrust_estimator)


### Description

<a id="mc_hover_thrust_estimator_usage"></a>

### Usage
```
mc_hover_thrust_estimator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```

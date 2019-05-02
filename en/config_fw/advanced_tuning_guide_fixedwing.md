# Advanced Fixed-wing Position Tuning


This guide offers some help in tuning the high-level fixed-wing controllers needed for flying missions or in altitude/position control mode. 
PX4 uses TECS for altitude and airspeed control, and L1 for horizontal heading/position control. 


> **Warning** This guide is for advanced users / experts only.  If you don't understand what a TECS tuning is you might crash your aircraft.

<span></span>
> **Note** 
>  - An incorrectly set gain during tuning can make altitude or heading control unstable. A pilot tuning the TECS gains should therefore be able to fly and land the plane in stabilized control mode.


<span></span>
> **Tip** All parameters are documented in the [Parameter Reference](../advanced_config/parameter_reference.md).
The most important parameters are covered in this guide.
 


## TECS Tuning (Altitude and Airspeed)

TECS (Total Energy Control System) is a guidance algorithm for fixed-wing aircraft that coordinates throttle and pitch angle setpoints to control the aircraft's altitude and airspeed. 
For a detailed description of the TECS algorithm and the control diagram, see [Controller Diagrams](https://dev.px4.io/en/flight_stack/controller_diagrams). 

A well-tuned attitude controller is required before tuning TECS [PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md).

The tuning of the TECS controller mainly is about setting the airframe properties correctly. 
A step-by-step procedure for the setting of the most important ones is provided below.
It consists of several flights performed in manual or stabilized flight mode, each to set a different group of parameters. 
Highly beneficial to do this with a second person reading the current vehicle states over telemetry.
To improve accuracy, taking a look at the flight logs afterwards is encouraged to set some parameters more precicely. 

#### 1st: Manual flight in trim condition
Fly in manual (or stabilized) flight mode. Set the throttle such that the aircraft is in level flight. 
Set the following parameters:
- [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) - set to the airspeed on a manual level flight
- [FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE) - set to the throttle (stick position between 0 and
  1.0) on a manual level flight at FW_AIRSPD_TRIM
- trim pitch? (if large offset from 0, get from logs)

#### 2nd: Manual ascends/descends
Fly multiple ascends/descends with various throttle and pitch setpoints. 
Fly them in a manner that appear aggressive but still save to you (the aim is to tune the absolute edge cases of TECS).
After the flight, get the following out of your logs:

- [FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN) - set to the minimal throttle you applied during the flight
- [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX) - set to the maximal throttle you applied during the flight
- [FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) - minimal airspeed at which the aircraft was still safely controllable during the maneuvers (add a safety margin if you think that it was close to stalling)
- [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) - maximal airspeed reached during the flight

#### 3rd: Manual extreme ascends/descends
- Fly with `FW_THR_MAX` and see at which pitch angle (up) the airspeed is corresponding to `FW_AIRSPD_TRIM` - set this angle as [FW_P_LIM_MAX](../advanced_config/parameter_reference.md#FW_P_LIM_MAX) and set [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) to the climb rate (in m/s) during this ascend
- Fly with `FW_THR_MIN` and see at which pitch angle (down) the airspeed is corresponding to [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) - set this angle as `FW_P_LIM_MIN` and set [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) to the sink rate during this descend
- Fly with `FW_THR_MIN` and at `FW_AIRSPD_TRIM` - set [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) to the sink rate during this descend


#### 4th: Flight in altitude control mode
Once these parameters are set, make the system follow a figure 8 pattern
with waypoints and observe the altitude hold and airspeed hold
performance. The default gains are “soft” and gentle. To improve
altitude hold (but also make the throttle response more twitchy),
decrease the time constant:

- [FW_T_TIME_CONST](../advanced_config/parameter_reference.md#FW_T_TIME_CONST) - decrease to improve altitude hold performance,
  but reduces efficiency and increases wear.



### L1 Controller Tuning (Position)

All L1 parameters are described [here](../advanced_config/parameter_reference.md#fw-l1-control).

- [FW_L1_PERIOD](../advanced_config/parameter_reference.md#FW_L1_PERIOD) - This is the L1 distance and defines the tracking
  point ahead of the aircraft it's following. A value of 25 meters
  works for most aircraft. A value of 16-18 will still work, and
  provide a sharper response. Shorten slowly during tuning until
  response is sharp without oscillation.




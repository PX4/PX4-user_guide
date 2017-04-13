# Fixedwing PID Tuning Guide

### Fixedwing Flight Controller Tuning Guide {#fixedwing_aircraft_controller_tuning_guide .sectionedit1}

This guide is for advanced users / experts only. If you don't understand
what a PID tuning is you might crash your aircraft.

> **Warning** 
  - An incorrectly set gain during tuning can
    make attitude control unstable. A pilot tuning gains should therefore be
    able to fly and land the plane in manual (override) control.
  - Excessive gains (and rapid servo motion)
    can violate the maximum forces of your airframe. Increase gains carefully.
  - Roll and pitch tuning follows the same
    sequence. The only difference is that pitch is more sensitive to trim
    offsets, so integrator gains need more attention to compensate this.

#### Parameter Reference

All parameters are documented in the 
[Parameter Reference](https://pixhawk.org/firmware/parameters "firmware:parameters").
The most important parameters are covered in this guide.
 

### Establishing the Airframe Baseline {#establishing_the_airframe_baseline .sectionedit2}

If a pilot capable of manual flight is available, its best to establish
a few core system properties on a manual trial. To do this, fly these
maneuvers. Even if you can't note all the quantities immediately on
paper, the log file will be very useful for later tuning.

> **Success** All these quantities will be automatically
  logged. You only need to take notes if you want to directly move on to
  tuning without looking at the log files

- Fly level with a convenient airspeed. Note throttle stick position
  and airspeed. (example: 70% → 0.7 throttle, 15 m/s airspeed)
- Climb with maximum throttle and sufficient airspeed for 10-30
  seconds. (example: 12 m/s airspeed, climbed 100 m in 30 seconds)
- Descend with zero throttle and reasonable airspeed for 10-30
  seconds. (example: 18 m/s airspeed, descended 80 m in 30 seconds)
- Bank hard right with full roll stick until 60 degrees roll, then
  bank hard left with full roll stick until 60 degrees in the opposite side.
- Pitch up hard 45 degrees, pitch down hard 45 degrees

This guide will use these quantities to set some of the controller gains
later on.


### Tune Roll

Tune first the roll axis, then pitch. The roll axis is safer as an
incorrect tuning leads only to motion, but not a loss of altitude.

#### Tuning the Feedforward Gain

To tune this gain, set the other gains to zero.


##### Gains to set to zero

- FW_RR_I = 0
- FW_RR_P = 0
- FW_RSP_OFF = 0


##### Gains to tune

- FW_RR_FF - start with a value of 0.4. Increase (doubling each
  time) this value until the plane rolls satisfactory and reaches the
  setpoint. Back down the gain 20% at the end of the process.

#### Tuning the Rate Gain

- FW_RR_P - start with a value of 0.06. Increase (doubling each
  time) this value until the system starts to wobble / twitch. Reduce
  by 50% then.

#### Tuning the Trim Offsets with the Integrator Gain

- FW\_RR\_I - start with a value of 0.01. Increase (doubling each
  time) this value until there is no offset between commanded and
  actual roll value (this will most likely require looking at a log
  file)

### Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch
offset.

#### Tuning the Feedforward Gain

To tune this gain, set the other gains to zero.


##### Gains to set to zero

- FW_PR_I = 0
- FW_PR_P = 0
- FW_PSP_OFF = 0


##### Gains to tune

- FW_PR_FF - start with a value of 0.4. Increase (doubling each
  time) this value until the plane pitches satisfactory and reaches
  the setpoint. Back down the gain 20% at the end of the process.

#### Tuning the Rate Gain

- FW_PR_P - start with a value of 0.04. Increase (doubling each
  time) this value until the system starts to wobble / twitch. Reduce
  by 50% then.
    
#### Tuning the Trim Offsets with the Integrator Gain

- FW_PR_I - start with a value of 0.01. Increase (doubling each
  time) this value until there is no offset between commanded and
  actual roll value (this will most likely require looking at a log
  file)


### Adjusting the Time Constant of the Outer Loop

The overall softness / hardness of the control loop can be adjusted by
the time constant. The default of 0.5 seconds should be fine for normal
fixed wing setups and usually does not require adjustment.

- FW_ATT_TC - set to a default of 0.5 seconds, increase to make the
  response softer, decrease to make the response harder.

### L1 Controller Tuning (Position)

All L1 parameters are described
[here](https://pixhawk.org/firmware/parameters#l1_control "firmware:parameters").

- FW_L1_PERIOD - This is the L1 distance and defines the tracking
  point ahead of the aircraft its following. A value of 25 meters
  works for most aircraft. A value of 16-18 will still work, and
  provide a sharper response. Shorten slowly during tuning until
  response is sharp without oscillation.


### TECS Tuning (Altitude)

The total energy control system almost always can use the default gains,
but needs some information about the main airframe properties to perform
correctly.

- FW_AIRSPD_TRIM - set to the airspeed on a manual level flight
- FW_AIRSPD_MIN - set to the airspeed on a manual climb
- FW_AIRSPD_MAX - set to the airspeed on a manual descend
- FW_THR_CRUISE - set to the throttle (stick position between 0 and
  1.0) on a manual level flight at FW\_AIRSPEED\_TRIM airspeed
- FW_THR_MIN - set to the throttle on the manual descend
- FW_THR_MAX - set to the throttle on the manual climb
- FW_T_CLMB_MAX - set to the climb rate in meters on the manual climb
- FW_T_SINK_MAX - set to the descend rate in the manual descend
- FW_T_SINK_MIN - This is the sink rate of the aircraft with the
  throttle set to FW_THR_MIN and flown at the same airspeed as used
  to measure FW_T_CLMB_MAX

Once these parameters are set, put the system into a figure 8 pattern
with waypoints and observer the altitude hold and airspeed hold
performance. The default gains are “soft” and gentle. To improve
altitude hold (but also make the throttle response more twitchy,
decrease the time constant:

- FW_T_TIME_CONST - decrease to improve altitude hold performance,
  but reduces efficiency and increases wear.
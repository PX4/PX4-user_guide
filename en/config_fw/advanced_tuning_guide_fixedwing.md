# Fixed-wing Advanced Tuning Guide

> **Warning** This guide is for advanced users / experts only.  If you don't understand what a TECS tuning is you might crash your aircraft.

<span></span>
> **Note** 
>  - An incorrectly set gain during tuning can make altitude or heading control unstable. A pilot tuning the TECS gains should therefore be able to fly and land the plane in stabilized control mode.


<span></span>
> **Tip** All parameters are documented in the [Parameter Reference](../advanced_config/parameter_reference.md).
The most important parameters are covered in this guide.
 

## Introduction

PX4 uses TECS for altitude and airspeed control, and L1 for horizontal heading control. When in fixed-wing flight, TECS is active in altitude, position or mission mode, and L1 in position or mission. 


## TECS (Total Energy Control System)

### Introduction
See a detailed description here: (devel guide).

### Tuning

#### Requirements

-a well-tuned [attitude controller](../config_fw/pid_tuning_guide_fixedwing.md).
-calibrated airspeed sensor (if available). Having an airspeed measurement is highly beneficial for TECS (and requirement if airspeed should be controlled besides altitude).


#### Set parameters from stabilized flight
-cruise throttle
-cruise airspeed
-min airspeed (eg slightly above stall)
-max throttle for TECS
-max airspeed (or set with max throttle?)
-max pitch (trim airspeed, max throttle)
-min pitch (max airspeed, min throttle)

-sink rate min (max pitch, trim throttle)
-sink rate max (min pitch, min throttle)
-max climb (max throttle, trim airspeed)
-

#### Fine tune it


## L1 

### Introduction


### Tuning






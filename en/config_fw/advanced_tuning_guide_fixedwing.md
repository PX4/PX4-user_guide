# Fixed-wing TECS Tuning Guide

> **Warning** This guide is for advanced users / experts only.  If you don't understand what a TECS tuning is you might crash your aircraft.

<span></span>
> **Note** 
>  - An incorrectly set gain during tuning can make altitude control unstable. A pilot tuning the TECS gains should therefore be able to fly and land the plane in stabilized control mode.


<span></span>
> **Tip** All parameters are documented in the [Parameter Reference](../advanced_config/parameter_reference.md).
The most important parameters are covered in this guide.
 

## Requirements for TECS tuning

-a well-tuned [attitude controller](../config_fw/pid_tuning_guide_fixedwing.md).
-calibrated airspeed sensor (if available). Having an airspeed measurement is highly beneficial for TECS (and requirement if airspeed should be controlled besides altitude).


## Parameters from Flight in Stabilized 

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



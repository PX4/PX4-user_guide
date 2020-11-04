# Modules Reference: Simulation

## sih
Source: [modules/sih](https://github.com/PX4/Firmware/tree/master/src/modules/sih)


### Description
This module provide a simulator for quadrotors running fully
inside the hardware autopilot.

This simulator subscribes to "actuator_outputs" which are the actuator pwm
signals given by the mixer.

This simulator publishes the sensors signals corrupted with realistic noise
in order to incorporate the state estimator in the loop.

### Implementation
The simulator implements the equations of motion using matrix algebra.
Quaternion representation is used for the attitude.
Forward Euler is used for integration.
Most of the variables are declared global in the .hpp file to avoid stack overflow.



### Usage {#sih_usage}
```
sih <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```

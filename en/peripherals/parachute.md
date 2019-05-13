# Parachute

PX4 can be configured to trigger a parachute connected to a free PWM output during [flight termination](../advanced_config/flight_termination.md).

This topic provides the specific example of how to set up a parachute, using a spring-loaded launcher from [Fruity Chutes](https://fruitychutes.com/buyachute/drone-and-uav-parachute-recovery-c-21/harrier-drone-parachute-launcher-c-21_33/).


> **Note** In fact PX4 does not know that it is launching a parachute; during flight termination it just turns off all controllers and sets all PWM outputs to their failsafe values.
  You can therefore use this feature to activate multiple complementary safety devices. 
  For more information see [Flight Termination Configuration](../advanced_config/flight_termination.md).


## Using Parachutes

Below are a few notes about using parachutes:
- Having a parachute does not guarantee that the vehicle will not be destroyed or cause harm!
  > **Warning** You must always fly with safety in mind.
- Parachutes require careful usage to be effective - for example, they must be folded correctly.
- Parachutes have a minimum effective altitude.
- A parachute may trigger while the vehicle is upside down.
  This will increase the time required to slow, and may even result in the drone collapsing the parachute.
- The system requires a working and powered flight controller.
  If something causes the flight stack to crash, the parachute will not deploy. 


## Parachute Setup

The setup below explains how you might configure a quad multicopter with motors on AUX 1-4 and a parachute on MAIN PWM port 5.
The PWM values mentioned are for the *Fruity Chutes* parachute we tested.

> **Tip** For the first test, try on the bench, without the props and with an unloaded parachute device!

Hardware setup:
- Connect the parachute to IO, channel 5 (starting from 1).
- Power the servo rail - i.e. connect a 5V BEC to the servo rail.

Enable flight termination:
- Set [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) to 0
- Set [Safety](../config/safety.md) action to *Flight termination* for checks where you want the parachute to trigger
- Set [Failure Detector](../config/safety.md#failure_detector) pitch and roll angles and time triggers for crash/flip detection. 

Parachute settings
- Set [PWM_MAIN_DIS5](../advanced_config/parameter_reference.md#PWM_MAIN_DIS5) to PWM value for parachute "OFF" position (usually between 700 and 1000ms)
- Set [PWM_MAIN_FAIL5](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL5) to PWM value for parachute "ON" position (usually between 1800 and 2200ms)

Motor settings:
- Set [PWM_AUX_FAILn](../advanced_config/parameter_reference.md#PWM_AUX_FAIL1), where n is 1 - 4, to 900ms such that the motors directly go to disarmed values.


> **Note** There is no way to recover from a Termination state!
  Reboot/power cycle the vehicle before your next test.


<!-- 
FD_FAIL_P
Comment: Maximum pitch angle before FailureDetector triggers the attitude_failure flag Does not affect the behavior of the vehicle for now; only for logging
-->

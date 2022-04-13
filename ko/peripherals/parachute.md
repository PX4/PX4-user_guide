# 낙하산

PX4는 [비행 종료](../advanced_config/flight_termination.md) 과정에서 여분의 PWM 출력에 낙하산을 연결할 수 있습니다.

[Fruity Chutes](https://fruitychutes.com/buyachute/drone-and-uav-parachute-recovery-c-21/harrier-drone-parachute-launcher-c-21_33/)의 스프링 장착 런처로 낙하산을 설정하는 방법에 대한 구체적인 방법을 설명합니다.

:::note PX4 does not know that it is launching a parachute; during flight termination it just turns off all controllers and sets all PWM outputs to their failsafe values. You can therefore use this feature to activate multiple complementary safety devices connected to different outputs. 자세한 내용은 [비행 종료 설정](../advanced_config/flight_termination.md)을 참고하십시오.
:::

## 낙하산 사용법

Below are a few considerations when using parachutes:

- A parachute does not guarantee that the vehicle will not be destroyed or cause harm! You must always fly with safety in mind.
- Parachutes require careful usage to be effective. For example, they must be folded correctly.
- 낙하산에는 최소 유효 고도가 있습니다.
- 기체가 뒤집힌 상태에서 낙하산이 작동할 수 있습니다. This will increase the time required to slow, and may result in the drone collapsing the parachute.
- The parachute will only deploy if the flight controller is powered and PX4 is running properly (unless it is triggered independently of PX4). It will not deploy if something causes the flight stack to crash.

## 낙하산 설정

Flight termination (and hence parachute deployment) may be triggered by safety checks such as RC Loss, geofence violation, and so on, from attitude triggers and other failure detector checks, or by a command from a ground station. During flight termination PX4 sets PWM outputs to their "failsafe" values (failsafe values turn off motors, but may be used to turn on/trigger the parachute.

Parachute setup therefore involves:

- Connecting the parachute to unused outputs and setting their failsafe values to levels that will trigger the parachute (using appropriate parameters).
- Configuring [flight termination](../advanced_config/flight_termination.md) as the appropriate action for those safety and failure cases where the parachute should be deployed.

The setup below explains how you might configure a quad multicopter with motors on MAIN 1-4 and a parachute on MAIN PWM port 7. The PWM values mentioned are for the *Fruity Chutes* parachute we tested.

:::tip
For the first test, try on the bench, without the props and with an unloaded parachute device!
:::

Hardware setup:

- Connect the parachute to the IO port (MAIN), channel 7 (starting from 1).
- Power the servo rail - i.e. connect a 5V BEC to the servo rail.

Enable flight termination:

- Set [Safety](../config/safety.md) action to *Flight termination* for checks where you want the parachute to trigger
- Set [Failure Detector](../config/safety.md#failure-detector) pitch angles, roll angles and time triggers for crash/flip detection, and disable the failure/IMU timeout circuit breaker (i.e. set [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)).
    
:::note
You can also configure an [external ATS](../config/safety.md#external-automatic-trigger-system-ats) for failure detection.
:::

Parachute settings

- Set [PWM_MAIN_DIS7](../advanced_config/parameter_reference.md#PWM_MAIN_DIS7) to PWM value for parachute "OFF" position (usually between 700 and 1000ms)
- Set [PWM_MAIN_FAIL7](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL7) to PWM value for parachute "ON" position (usually between 1800 and 2200ms)

Motor settings:

- Set [PWM_MAIN_FAILn](../advanced_config/parameter_reference.md#PWM_MAIN_FAIL1), where n is 1 - 4, to 900ms such that the motors directly go to disarmed values.

:::note
There is no way to recover from a Termination state! Reboot/power cycle the vehicle before your next test.
:::

<span id="testing"></span>

## 낙하산 시험

The parachute will trigger during [flight termination](../advanced_config/flight_termination.md).

The easiest way to test a (real) parachute is to enable the [failure detector attitude trigger](../config/safety.md#attitude-trigger) and tip the vehicle over.

You can also simulate a parachute/flight termination in Gazebo: [Development > Simulation > Gazebo > Simulated Parachute/Flight Termination](../simulation/gazebo.md#flight_termination).
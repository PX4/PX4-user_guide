# 낙하산

PX4는 [비행 종료](../advanced_config/flight_termination.md) 과정에서 여분의 PWM 출력에 낙하산을 연결할 수 있습니다.

[Fruity Chutes](https://fruitychutes.com/buyachute/drone-and-uav-parachute-recovery-c-21/harrier-drone-parachute-launcher-c-21_33/)의 스프링 장착 런처로 낙하산을 설정하는 방법에 대한 구체적인 방법을 설명합니다.

:::note
사실 PX4는 낙하산을 발사하고 있다는 사실을 모릅니다. 비행 종료중에는 모든 콘트롤러를 끄고 모든 PWM 출력을 안전 장치 값으로 설정합니다. 이 기능을 사용하여 여러 보완 안전장치를 활성화할 수 있습니다. 자세한 내용은 [비행 종료 설정](../advanced_config/flight_termination.md)을 참고하십시오.
:::

## 낙하산 사용법

Below are a few notes about using parachutes:

- Having a parachute does not guarantee that the vehicle will not be destroyed or cause harm!
    
:::warning
You must always fly with safety in mind.
:::

- Parachutes require careful usage to be effective - for example, they must be folded correctly.

- Parachutes have a minimum effective altitude.
- A parachute may trigger while the vehicle is upside down. This will increase the time required to slow, and may even result in the drone collapsing the parachute.
- The system requires a working and powered flight controller. If something causes the flight stack to crash, the parachute will not deploy. 

## Parachute Setup

The setup below explains how you might configure a quad multicopter with motors on MAIN 1-4 and a parachute on MAIN PWM port 7. The PWM values mentioned are for the *Fruity Chutes* parachute we tested.

:::tip
For the first test, try on the bench, without the props and with an unloaded parachute device!
:::

Hardware setup:

- Connect the parachute to the IO port (MAIN), channel 7 (starting from 1).
- Power the servo rail - i.e. connect a 5V BEC to the servo rail.

Enable flight termination:

- Set [Safety](../config/safety.md) action to *Flight termination* for checks where you want the parachute to trigger
- Set [Failure Detector](../config/safety.md#failure_detector) pitch angles, roll angles and time triggers for crash/flip detection, and disable the failure/IMU timeout circuit breaker (i.e. set [CBRK_FLIGHTTERM=0](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM)).
    
:::note
You can also configure an [external ATS](../config/safety.md#external_ats) for failure detection.
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

## Parachute Testing

The parachute will trigger during [flight termination](../advanced_config/flight_termination.md).

The easiest way to test a (real) parachute is to enable the [failure detector attitude trigger](../config/safety.md#attitude_trigger) and tip the vehicle over.

You can also simulate a parachute/flight termination in Gazebo: [Development > Simulation > Gazebo > Simulated Parachute/Flight Termination](../simulation/gazebo.md#flight_termination).
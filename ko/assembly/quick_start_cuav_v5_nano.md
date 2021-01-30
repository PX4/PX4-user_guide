# CUAV V5 nano 배선 빠른 시작

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://store.cuav.net/)와 상담하십시오.
:::

이 퀵 스타트 설명서는 [ CUAV V5 nano](../flight_controller/cuav_v5_nano.md) 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

![Nano Hero Image](../../assets/flight_controller/cuav_v5_nano/v5_nano_01.png)

## 배선 개요

아래의 이미지는 가장 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결하는 방법을 나타냅니다. 다음 섹션에서 각각의 장치에 대해 자세히 설명합니다.

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_02.png)

| 주요 인터페이스        | 기능                                                                                                                                                                                                 |
|:--------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 전원              | 전원 모듈을 연결하십시오. 전력 및 ANALOG 전압 및 전류 측정을 제공합니다.                                                                                                                                                      |
| PM2             | [PX4와 함께 사용하지 마십시오.](../flight_controller/cuav_v5_nano.md#compatibility_pm2)                                                                                                                       |
| TF CARD         | 로그 저장용 SD 카드 (카드와 함께 제공)                                                                                                                                                                           |
| M1~M8           | PWM 출력 모터와 서보 콘트롤합니다.                                                                                                                                                                              |
| A1~A3           | Capture pins (not *currently* supported on PX4).                                                                                                                                                   |
| nARMED          | Indicates the FMU armed state. It is active low (low when armed).                                                                                                                                  |
| DSU7            | Used for FMU debug, reading debug information.                                                                                                                                                     |
| I2C2/I2C3/I2C4  | Connect an I2C device such as an external compass.                                                                                                                                                 |
| CAN1/CAN2       | Connect UAVCAN devices such as CAN GPS.                                                                                                                                                            |
| TYPE-C\(USB\) | Connect to a computer for communication between the flight controller and the computer, such as loading firmware                                                                                   |
| GPS&SAFETY      | Connect to Neo GPS, which includes GPS, safety switch, buzzer interface.                                                                                                                           |
| TELEM1/TELEM2   | Connect to the Telemetry System.                                                                                                                                                                   |
| DSM/SBUS/RSSI   | Includes DSM, SBUS, RSSI signal input interface, DSM interface can be connected to DSM satellite receiver, SBUS interface to SBUS remote control receiver, RSSI for signal strength return module. |


:::note
For more interface information, please read [V5 nano Manual](http://manual.cuav.net/V5-nano.pdf).
:::

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_03.png)

:::note
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../advanced_features/rtk-gps.md).
:::

## GPS + Compass + Safety Switch + LED

The recommended GPS module is the *Neo v2 GPS*, which contains GPS, compass, safety switch, buzzer, LED status light.

:::note
Other GPS modules may not work (see [this compatibility issue](../flight_controller/cuav_v5_nano.md#compatibility_gps)).
:::

The GPS/Compass module should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (Neo GPS arrow is in the same direction as the flight control arrow). Connect to the flight control GPS interface using a cable.

:::note
If you use CAN GPS, please use the cable to connect to the flight control CAN interface.
:::

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_04.png)

## Safety Switch

The dedicated safety switch that comes with the V5+ is only required if you are not using the recommended *Neo v2 GPS* (which has an inbuilt safety switch).

If you are flying without the GPS you must attach the switch directly to the `GPS1` port in order to be able to arm the vehicle and fly (If you use the old 6-pin GPS, please read the definition of the bottom interface to change the line).

## Buzzer

If you do not use the recommended *Neo v2 GPS* the buzzer may not work.

## Radio Control

A remote control (RC) radio system is required if you want to manually control your vehicle (PX4 does not require a radio system for autonomous flight modes). You will need to select a compatible transmitter/receiver and then bind them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The figure below shows how you can access your remote receiver (please find the S.Bus cable in the kit)

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_05.png)

## Spektrum Satellite Receivers

The V5 nano has a dedicated DSM cable. If using a Spektrum satellite receiver, this should be connected to the flight controller `DSM/SBUS/RSSI` interface.

## Power

The *v5 nano* kit includes the *HV\_PM* module, which supports 2~14S LiPo batteries. Connect the 6pin connector of the *HW\_PM* module to the flight control `Power` interface.

:::warning
The supplied power module is unfused. Power **must** be turned off while connecting peripherals.
:::

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_06.png)

:::note
The power module is not a power source for peripherals connected to the PWM outputs. If you're connecting servos/actuators you will need to separately power them using a BEC.
:::

## Telemetry System (Optional)

A telemetry system allows you to communicate with, monitor, and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The communication channel is via Telemetry Radios. The vehicle-based radio should be connected to the **TELEM1** or **TELEM2** port (if connected to these ports, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually via USB).

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_07.png)

<span id="sd_card"></span>

## SD Card (Optional)

An [SD card](../getting_started/px4_basic_concepts.md#sd_cards) is inserted in the factory (you do not need to do anything).

## Motors

Motors/servos are connected to the MAIN ports in the order specified for your vehicle in the [Airframes Reference](../airframes/airframe_reference.md).

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_06.png)

## Pinouts

![V5 nano pinouts](../../assets/flight_controller/cuav_v5_nano/v5_nano_pinouts.png)

## Further Information

- [Airframe buildlog using CUAV v5 nano on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5nano.md)
- [CUAV V5 nano](../flight_controller/cuav_v5_nano.md)
- [V5 nano manual](http://manual.cuav.net/V5-nano.pdf) (CUAV)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
- [CUAV Github](https://github.com/cuav) (CUAV)
# CUAV V5+ 배선 빠른 시작

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://store.cuav.net/)와 상담하십시오.
:::

이 퀵 스타트 설명서는 [ CUAV V5+ ](../flight_controller/cuav_v5_plus.md) 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

![V5+ AutoPilot - Hero Image](../../assets/flight_controller/cuav_v5_plus/v5+_01.png)

## 배선 개요

아래의 이미지는 가장 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결하는 방법을 나타냅니다. 다음 섹션에서 각각의 장치에 대해 자세히 설명합니다.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)

| 주요 인터페이스        | 기능                                                                                                                                                                                                 |
|:--------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Power1          | 전원 연결 * 아날로그 * 전압 및 전류 감지 기능이있는 전원 입력. 이 커넥터에 Digital PM을 사용하지 마십시오!                                                                                                                               |
| Power2          | i2c 스마트 배터리를 연결합니다.                                                                                                                                                                                |
| TF CARD         | 로그 저장용 SD 카드 (카드는 공장에서 미리 삽입됨).                                                                                                                                                                    |
| M1~M8           | PWM outputs. Can be used to control motors or servos.                                                                                                                                              |
| A1~A6           | PWM outputs. Can be used to control motors or servos.                                                                                                                                              |
| DSU7            | Used for FMU debug, reading debug information.                                                                                                                                                     |
| I2C1/I2C2       | Connect an I2C device such as an external compass.                                                                                                                                                 |
| CAN1/CAN2       | Connect UAVCAN devices such as CAN GPS.                                                                                                                                                            |
| TYPE-C\(USB\) | Connect to a computer for communication between the flight controller and the computer, such as loading firmware.                                                                                  |
| SBUS OUT        | Connect SBUS devices (e.g. camera gimbals).                                                                                                                                                        |
| GPS&SAFETY      | Connect to Neo GPS, which includes GPS, safety switch, buzzer interface.                                                                                                                           |
| TELEM1/TELEM2   | Connect to the Telemetry System.                                                                                                                                                                   |
| DSM/SBUS/RSSI   | Includes DSM, SBUS, RSSI signal input interface, DSM interface can be connected to DSM satellite receiver, SBUS interface to SBUS remote control receiver, RSSI for signal strength return module. |


:::note
For more interface information, please read [V5+ Manual](http://manual.cuav.net/V5-Plus.pdf).
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_02.png)

:::note
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../advanced_features/rtk-gps.md).
:::

## GPS + Compass + Safety Switch + LED

The recommended GPS module is the *Neo v2 GPS*, which contains GPS, compass, safety switch, buzzer, LED status light.

:::note
Other GPS modules may not work (see [this compatibility issue](../flight_controller/cuav_v5_nano.md#compatibility_gps)\)).
:::

The GPS/Compass module should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (*Neo v2 GPS* arrow is in the same direction as the flight control arrow). Connect to the flight control GPS interface using a cable.

:::note
If you use the [NEO V2 PRO GNSS (CAN GPS)](http://doc.cuav.net/gps/neo-v2-pro/en/#enable), please use the cable to connect to the flight control CAN interface.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_03.png)

## Safety Switch

The dedicated safety switch that comes with the V5+ is only required if you are not using the recommended *Neo V2 GPS* (which has an inbuilt safety switch).

If you are flying without the GPS you must attach the switch directly to the `GPS1` port in order to be able to arm the vehicle and fly (if you use the old 6-pin GPS, please read the definition of the bottom interface to change the line).

## Buzzer

If you do not use the recommended GPS, the buzzer may not work.

## Radio Control

A remote control (RC) radio system is required if you want to manually control your vehicle (PX4 does not require a radio system for autonomous flight modes). You will need to select a compatible transmitter/receiver and then bind them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The figure below shows how you can access your remote receiver (please find the SBUS cable in the kit).

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_04.png)

## Spektrum Satellite Receivers

The V5+ has a dedicated DSM cable. If using a Spektrum satellite receiver, this should be connected to the flight controller DSM/SBUS/RSSI interface.

## Power

The V5+ kit includes the *HV\_PM* module, which supports 2~14S LiPo batteries. Connect the 6pin connector of the *HW\_PM* module to the flight control `Power1` interface.

:::warning
The supplied power module is unfused. Power **must** be turned off while connecting peripherals.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)

:::note
The power module is not a power source for peripherals connected to the PWM outputs. If you're connecting servos/actuators you will need to separately power them using a BEC.
:::

## Telemetry System (Optional)

A telemetry system allows you to communicate with, monitor, and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The communication channel is via Telemetry Radios. The vehicle-based radio should be connected to either the `TELEM1` or `TELEM2` port (if connected to these ports, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually via USB).

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_06.png)

<span id="sd_card"></span>

## SD Card (Optional)

An [SD card](../getting_started/px4_basic_concepts.md#sd_cards) is inserted in the factory (you do not need to do anything).

## Motors

Motors/servos are connected to the MAIN and AUX ports in the order specified for your vehicle in the [Airframes Reference](../airframes/airframe_reference.md).

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_07.png)

## Pinouts

Download **V5+** pinouts from [here](http://manual.cuav.net/V5-Plus.pdf).

## Further Information

- [Airframe build-log using CUAV v5+ on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5plus.md)
- [CUAV V5+ Manual](http://manual.cuav.net/V5-Plus.pdf) (CUAV)
- [CUAV V5+ docs](http://doc.cuav.net/flight-controller/v5-autopilot/en/v5+.html) (CUAV)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
- [CUAV Github](https://github.com/cuav) (CUAV)
- [Base board design reference](https://github.com/cuav/hardware/tree/master/V5_Autopilot/V5%2B/V5%2BBASE) (CUAV)
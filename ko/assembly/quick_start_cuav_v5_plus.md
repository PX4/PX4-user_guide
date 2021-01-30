# CUAV V5+ 배선 개요

:::warning PX4에서는 이런 종류의 자동 항법 장치를 제조하지는 않습니다. 하드웨어 지원 또는 호환 문제는 [제조사](https://store.cuav.net/)와 상담하십시오.
:::

이 퀵 스타트 설명서는 [ CUAV V5+ ](../flight_controller/cuav_v5_plus.md) 비행 컨트롤러에 전원을 공급하고 가장 중요한 주변 장치를 연결하는 방법을 설명합니다.

![V5+ AutoPilot - Hero Image](../../assets/flight_controller/cuav_v5_plus/v5+_01.png)

## 배선 개요

아래의 이미지는 가장 중요한 센서 및 주변 장치 (모터 및 서보 출력 제외)를 연결하는 방법을 나타냅니다. 다음 섹션에서 각각의 장치에 대해 자세히 설명합니다.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)

| 주요 인터페이스        | 기능                                                                                                                  |
|:--------------- |:------------------------------------------------------------------------------------------------------------------- |
| Power1          | 전원 연결 * 아날로그 * 전압 및 전류 감지 기능이있는 전원 입력. 이 커넥터에 Digital PM을 사용하지 마십시오!                                                |
| Power2          | i2c 스마트 배터리를 연결합니다.                                                                                                 |
| TF CARD         | 로그 저장용 SD 카드 (카드는 공장에서 미리 삽입됨).                                                                                     |
| M1~M8           | PWM 출력 모터와 서보 콘트롤합니다.                                                                                               |
| A1~A6           | PWM 출력 모터와 서보 콘트롤합니다.                                                                                               |
| DSU7            | FMU 디버그에 사용되며 디버그 정보를 읽습니다.                                                                                         |
| I2C1/I2C2       | 외부 나침반과 같은 I2C 장치를 연결합니다.                                                                                           |
| CAN1/CAN2       | CAN GPS와 같은 UAVCAN 장치를 연결합니다.                                                                                       |
| TYPE-C\(USB\) | 펌웨어로드와 같은 비행 컨트롤러와 컴퓨터간의 통신을 위해 컴퓨터에 연결합니다.                                                                         |
| SBUS OUT        | SBUS 장치(예 : 카메라 짐벌)를 연결합니다.                                                                                         |
| GPS & SAFETY    | GPS, 안전 스위치, 부저 인터페이스가 포함된 Neo GPS에 연결합니다.                                                                          |
| TELEM1/TELEM2   | 원격 측정 시스템에 연결합니다.                                                                                                   |
| DSM/SBUS/RSSI   | DSM, SBUS, RSSI 신호 입력 인터페이스, DSM 인터페이스는 DSM 위성 수신기에 연결 가능, SBUS 인터페이스는 SBUS 원격 제어 수신기에 연결 가능, 신호 강도 반환 모듈용 RSSI 포함. |


:::note
자세한 인터페이스 정보는 [ V5 + 매뉴얼 ](http://manual.cuav.net/V5-Plus.pdf)을 참조하십시오.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_02.png)

:::note
컨트롤러를 권장/기본 방향으로 장착 할 수없는 경우 (예 : 공간 제약으로 인해) 실제로 사용한 방향으로 자동 조종 소프트웨어를 구성해야합니다 : [ Flight Controller Orientation ](../advanced_features/rtk-gps.md).
:::

## GPS + 나침반 + 안전 스위치 + LED

권장되는 GPS 모듈은 GPS, 나침반, 안전 스위치, 부저, LED 상태 표시등이 포함된 * Neo v2 GPS *입니다.

:::note
다른 GPS 모듈은 작동하지 않을 수 있습니다 ([이 호환성 문제 ](../flight_controller/cuav_v5_nano.md#compatibility_gps) \ 참조).
:::

GPS/나침반 모듈은 차량 앞쪽을 향하는 방향 표시를 사용하여 가능한 한 다른 전자 장치에서 멀리 떨어진 프레임에 장착해야합니다 (* Neo v2 GPS * 화살표는 비행과 같은 방향에 있음). 컨트롤 화살표). 케이블을 사용하여 비행 제어 GPS 인터페이스에 연결합니다.

:::note
[NEO V2 PRO GNSS (CAN GPS)](http://doc.cuav.net/gps/neo-v2-pro/en/#enable)를 사용하는 경우 케이블을 사용하여 비행 제어 CAN 인터페이스에 연결하십시오.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_03.png)

## 안전 스위치

V5+에 제공되는 전용 안전 스위치는 권장되는 *Neo V2 GPS* (내장 안전 스위치가 있음)를 사용하지 않는 경우에만 필요합니다.

GPS없이 비행하는 경우 차량을 무장하고 비행 할 수 있도록 스위치를 `GPS1` 포트에 직접 연결해야합니다 (이전 6 핀 GPS를 사용하는 경우 정의를 읽으십시오. 라인을 변경하는 하단 인터페이스의).

## 부저

권장 GPS를 사용하지 않는 경우에는 부저가 작동하지 않을 수 있습니다.

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
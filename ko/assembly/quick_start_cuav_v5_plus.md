---
canonicalUrl: https://docs.px4.io/main/ko/assembly/quick_start_cuav_v5_plus
---

# CUAV V5+ 배선 개요

:::warning PX4에서는 이 자동 항법 장치를 제조하지 않습니다. 하드웨어 지원이나 호환 문제는 [제조사](https://store.cuav.net/)에 문의하십시오.
:::

[ CUAV V5+](../flight_controller/cuav_v5_plus.md) 비행 콘트롤러에 전원 공급 방법과 주요 주변 치 연결 방법을 설명합니다.

![V5 + AutoPilot-영웅 이미지](../../assets/flight_controller/cuav_v5_plus/v5+_01.png)


## 배선 개요

아래의 이미지는 중요한 센서와 주변 장치(모터와 서보 출력 제외) 연결 방법을 보여줍니다. 다음 섹션에서 각 장치에 대하여 자세히 설명합니다.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)


| 인터페이스           | 기능                                                                                                                  |
|:--------------- |:------------------------------------------------------------------------------------------------------------------- |
| Power1          | 전원 연결. *아날로그* 전압 및 전류 감지 기능이 있는 전원 입력. 이 커넥터에 Digital 전원모듈을 사용하지 마십시오!                                              |
| Power2          | i2c 스마트 배터리를 연결합니다.                                                                                                 |
| TF CARD         | 로그 저장용 SD 카드 (카드는 공장에서 미리 삽입됨).                                                                                     |
| M1~M8           | PWM 출력 모터와 서보를 콘트롤 합니다.                                                                                             |
| A1~A6           | PWM 출력 모터와 서보를 콘트롤 합니다.                                                                                             |
| DSU7            | FMU 디버그에 사용되며 디버그 정보를 읽습니다.                                                                                         |
| I2C1/I2C2       | 외부 나침반과 같은 I2C 장치를 연결합니다.                                                                                           |
| CAN1/CAN2       | CAN GPS와 같은 UAVCAN 장치를 연결합니다.                                                                                       |
| TYPE-C\(USB\) | 펌웨어로드 등의 작업을 위하여 비행 콘트롤러와 컴퓨터간의 통신을 위하여 컴퓨터에 연결합니다.                                                                 |
| SBUS OUT        | SBUS 장치(예 : 카메라 짐벌)를 연결합니다.                                                                                         |
| GPS & SAFETY    | GPS, 안전 스위치, 부저 인터페이스가 포함된 Neo GPS에 연결합니다.                                                                          |
| TELEM1/TELEM2   | 텔레메트리에 연결합니다.                                                                                                       |
| DSM/SBUS/RSSI   | DSM, SBUS, RSSI 신호 입력 인터페이스, DSM 인터페이스는 DSM 위성 수신기에 연결 가능, SBUS 인터페이스는 SBUS 원격 제어 수신기에 연결 가능, 신호 강도 반환 모듈용 RSSI 포함. |

:::note
자세한 인터페이스 정보는 [V5 + 매뉴얼](http://manual.cuav.net/V5-Plus.pdf)을 참고하십시오.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_02.png)

:::note
콘트롤러를 권장 기본 방향으로 장착 할 수 없는 경우(예 : 공간 제약으로 인해) 실 장착 방향을 자동항법장치 프로그램에서 설정하여야합니다. [비행 콘트롤러 방향](../advanced_features/rtk-gps.md)
:::


## GPS + 나침반 + 안전 스위치 + LED

권장되는 GPS 모듈은 GPS, 나침반, 안전 스위치, 부저 및 LED 상태 표시등이 포함된 *Neo v2 GPS*입니다.

:::note
다른 GPS 모듈은 작동하지 않을 수 있습니다 ([호환성 문제](../flight_controller/cuav_v5_nano.md#compatibility_gps) 참고).
:::

The GPS/Compass module should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction marker towards the front of the vehicle (*Neo v2 GPS* arrow is in the same direction as the flight control arrow). 케이블을 사용하여 비행제어 GPS 인터페이스에 연결합니다.

:::note
[NEO V2 PRO GNSS (CAN GPS)](http://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html)를 사용하면, 케이블을 사용하여 비행제어 CAN 인터페이스에 연결하십시오.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_03.png)

## 안전 스위치

V5+에 제공되는 전용 안전 스위치는 권장 *Neo V2 GPS* (안전 스위치 내장)를 사용하지 않는 경우에만 필요합니다.

GPS 없이 비행하는 경우 차량을 시동 스위치를 `GPS1` 포트에 직접 연결하여야합니다 (이전 6 핀 GPS를 사용하는 경우에는,  라인 변경에 관련된 하단 인터페이스 매뉴얼을 참고하십시오).

## 부저

권장 GPS를 사용하지 않는 경우에는 부저가 작동하지 않을 수 있습니다.

## 무선 조종

차량을 수동으로 제어하려면 무선 조종기가 필요합니다. PX4의 자율 비행은 무선조종기가 필수 사항은 아닙니다. 기체와 조종자가 통신하기 위하여 송신기와 수신기를 바인딩하여야 합니다. 송신기와 수신기의 매뉴얼을 참고하십시오.

아래 그림은 원격 수신기에 액세스하는 방법을 보여줍니다. 키트에서 SBUS 케이블을 찾으십시오.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_04.png)

## Spektrum Satellite 수신기

V5+에는 DSM 전용 케이블이 포함되어 있습니다. Spektrum 위성 수신기는 비행 콘트롤러 DSM/SBUS/RSSI 인터페이스에 연결하여야합니다.

## 전원

V5+ 키트에는 2~14S LiPo 배터리를 지원하는 *HV\ _PM* 모듈이 포함되어 있습니다. *HW\_PM* 모듈의 6 핀 커넥터를 비행 제어 `Power1` 인터페이스에 연결합니다.

:::warning
제공된 전원 모듈에는 퓨즈가 없습니다. 주변 장치를 연결하는 동안에는 전원을 **반드시** 꺼야 합니다.
:::

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)

:::note
전원 모듈은 PWM 출력에 연결된 주변 장치의 전원이 아닙니다.
서보/액추에이터를 연결하는 경우에는 BEC를 사용하여 별도로 전원을 공급하여야 합니다.
:::

## 텔레메트리(선택 사항)

텔레메트리는 지상국과 비행 기체와 통신, 모니터링, 제어할 수 있습니다. 기체를 특정 위치로 움직이도록 지시하거나, 새로운 미션을 업로드할 수 있습니다.

통신 채널은 텔레메트리 라디로를 통하여 이루어집니다. 차량 기반 라디오는 `TELEM1` 또는 `TELEM2` 포트에 연결하여야합니다. 이 포트에 연결되어있는 경우 추가 설정이 필요 없습니다. 송신기는 지상국 컴퓨터나 모바일 장치 USB로 연결합니다.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_06.png)

<span id="sd_card"></span>
## SD 카드(선택 사항)

An [SD card](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory) is inserted in the factory (you do not need to do anything).

## 모터

모터/서보는 [기체 정의서](../airframes/airframe_reference.md)에서 차량에 지정된 순서대로 MAIN 및 AUX 포트에 연결합니다.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_07.png)


## 핀배열

[여기](http://manual.cuav.net/V5-Plus.pdf)에서 **V5 +** 핀배열을 다운로드하십시오.


## 추가 정보

- [DJI FlameWheel450에서 CUAV v5 +를 사용하는 기체 빌드 로그](../frames_multicopter/dji_f450_cuav_5plus.md)
- [CUAV V5 + 수동](http://manual.cuav.net/V5-Plus.pdf) (CUAV)
- [CUAV V5 + 문서](http://doc.cuav.net/flight-controller/v5-autopilot/en/v5+.html) (CUAV)
- [FMUv5 참조 설계 핀아웃](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
- [CUAV Github](https://github.com/cuav) (CUAV)
- [베이스 보드 설계 참조](https://github.com/cuav/hardware/tree/master/V5_Autopilot/V5%2B/V5%2BBASE) (CUAV)

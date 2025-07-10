---
canonicalUrl: https://docs.px4.io/main/ko/advanced_features/traffic_avoidance_adsb
---

# 항공 사고 방지: ADS-B/FLARM

PX4는 [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance_%E2%80%93_broadcast) 또는 [FLARM](https://en.wikipedia.org/wiki/FLARM) 트랜스폰더를 사용하여 [임무](../flight_modes/mission.md)에서 간단한 항공 시고 방지를 지원할 수 있습니다. 잠재적인 충돌이 감지되면 PX4는 [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID)의 값에 따라 *경고*, 즉시 [착륙](../flight_modes/land.md) 또는 [귀환](../flight_modes/return.md) 할 수 있습니다.


<a id="supported_hardware"></a>

## 지원 하드웨어

PX4 사고방지는 MAVLink [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE) 메시지를 사용하여 트랜스폰더 데이터를 제공하는 ADS-B 또는 FLARM 제품에서 작동합니다.

다음 장치들로 테스트되었습니다:
- [PingRX ADS-B Receiver](https://uavionix.com/product/pingrx-pro/) (uAvionix)
- [FLARM](https://flarm.com/products/uav/atom-uav-flarm-for-drones/) <!-- I think originally https://flarm.com/products/powerflarm/uav/ -->


## 하드웨어 설정

두 장치 모두 비행컨트롤러의 직렬 포트에 연결할 수 있습니다. 가장 일반적으로 TELEM2에 연결됩니다 (다른 용도로 사용되지 않는 경우).

### PingRX

PingRX MAVLink 포트는 아래와 같이 핀아웃이있는 JST ZHR-4 메이팅 커넥터를 사용합니다.

| 핀       | 신호       | 전압           |
| ------- | -------- | ------------ |
| 1 (red) | RX (IN)  | +5V tolerant |
| 2 (blk) | TX (OUT) |              |
| 3 (blk) | Power    | +4 to 6V     |
| 4 (blk) | GND      | GND          |

PingRX에는 [mRo Pixhawk](../flight_controller/mro_pixhawk.md)의 TELEM2 포트 (DF13-6P)에 직접 연결가능한  커넥터 케이블이 함께 제공됩니다. 다른 포트나 보드의 경우 자체 케이블이 필요합니다.


## FLARM

FLARM에는 [mRo Pixhawk](../flight_controller/mro_pixhawk.md)와 동일한 핀아웃을 가진 온보드 DF-13 6 핀 커넥터가 있습니다.

| 핀       | 신호       | 전압          |
| ------- | -------- | ----------- |
| 1 (red) | VCC      | +4V to +36V |
| 2 (blk) | TX (OUT) | +3.3V       |
| 3 (blk) | RX (IN)  | +3.3V       |
| 4 (blk) | -        | +3.3V       |
| 5 (blk) | -        | +3.3V       |
| 6 (blk) | GND      | GND         |

:::note
비행 컨트롤러의 TX 및 RX는 FLARM의 RX 및 TX에 각각 연결되어야 합니다.
:::

## 소프트웨어 설정

### 포트 설정

Flarm/PingRX는 다른 [MAVLink 주변기기](../peripherals/mavlink_peripherals.md)와 동일한 방식으로 설정됩니다. 유일한 *특정* 설정은 포트 전송 속도가 57600 및 저 대역폭 프로필 (`MAV_X_MODE`)로 설정되어야 한다는 것입니다.

장치를 TELEM2 포트에 연결했다고 가정하고 다음과 같이 [매개 변수를 설정](../advanced_config/parameters.md)합니다.

- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = TELEM 2
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = Normal
- [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_1_RATE) = 0 (default sending rate for port).
- [MAV_1_FORWARD](../advanced_config/parameter_reference.md#MAV_1_FORWARD) = Enabled

기체를 재부팅합니다.

이제 57600으로 설정하여야 하는 [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD)라는 새 매개변수를 찾을 수 있습니다.

### 사고 방지 설정

아래의 매개변수를 사용하여 잠재적 충돌시의 동작을 설정합니다.

| 매개변수                                                                                                                | 설명                                                                    |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| <span id="NAV_TRAFF_AVOID"></span>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)    | 교통 회피 모드 활성화는 회피 대응을 지정합니다. 0 : 비활성화, 1 : 경고 만, 2 : 귀환 모드, 3 : 착륙 모드. |
| <span id="NAV_TRAFF_A_RADM"></span>[NAV_TRAFF_A_RADM](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADM) | *유인* 항공기에 대한 교통 회피 거리 설정                                              |
| <span id="NAV_TRAFF_A_RADU"></span>[NAV_TRAFF_A_RADU](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADU) | *무인* 항공기에 대한 교통 회피 거리 설정                                              |


## 구현

아래의 매개변수를 사용하여 잠재적 충돌 발생시 기체의 동작을 설정합니다.

유효한 트랜스폰더 보고서가 수신되면, PX4는 먼저 트랜스폰더 위치 및 방향 정보를 사용하여 기체가 서로 통과하기 전에 유사한 고도를 공유할지 여부를 추정합니다. PX4는 할 수 있다면 그것은 다음 웨이포인트까지의 경로와 다른 차량 사이의 가장 가까운 거리가 경로를 예측한 방법을 추정합니다. 교차점이 고도 및 경로에 대해 구성된 거리보다 작 으면 [교통 회피 페일 세이프](../config/safety.md#traffic-avoidance-failsafe) 작업이 시작되고 차량이 경고, 착륙 또는 귀환합니다. 탐지 거리는 유인 및 무인 항공기에 대해 별도로 설정할 수 있습니다.


코드는 `Navigator :: check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/navigator/navigator_main.cpp))을 참고하십시오.

MAVLink 인스턴스에 대해 구성된 경우 PX4는 트랜스폰더 데이터도 GCS로 전달합니다 (권장됨). GUID의 마지막 10 자리로 드론을 식별합니다.

## 추가 정보

* [MAVLink 주변장치](../peripherals/mavlink_peripherals.md)
* [직렬 포트 설정](../peripherals/serial_configuration.md)

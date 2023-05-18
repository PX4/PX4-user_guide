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

| 매개변수                                                                                                      | 설명                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="NAV_TRAFF_AVOID"></a>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)   | 교통 회피 모드 활성화는 회피 대응을 지정합니다. 0 : 비활성화, 1 : 경고 만, 2 : 귀환 모드, 3 : 착륙 모드.                                                                                                             |
| <a id="NAV_TRAFF_A_HOR"></a>[NAV_TRAFF_A_HOR](../advanced_config/parameter_reference.md#NAV_TRAFF_A_HOR)   | Horizonal radius of cylinder around the vehicle that defines its airspace (i.e. the airspace in the ground plane).                                                                |
| <a id="NAV_TRAFF_A_VER"></a>[NAV_TRAFF_A_VER](../advanced_config/parameter_reference.md#NAV_TRAFF_A_VER)   | Vertical height above and below vehicle of the cylinder that defines its airspace (also see [NAV_TRAFF_A_HOR](#NAV_TRAFF_A_HOR)).                                               |
| <a id="NAV_TRAFF_COLL_T"></a>[NAV_TRAFF_COLL_T](../advanced_config/parameter_reference.md#NAV_TRAFF_COLL_T) | Collision time threshold. Avoidance will trigger if the estimated time until collision drops below this value (the estimated time is based on relative speed of traffic and UAV). |

## 구현

아래의 매개변수를 사용하여 잠재적 충돌 발생시 기체의 동작을 설정합니다.

If a valid transponder report is received, PX4 first uses the traffic transponder information to estimate whether the traffic heading and height indicates there will be an intersection with the airspace of the UAV. The UAV airspace consists of a surrounding cylinder defined by the radius [NAV_TRAFF_A_HOR](#NAV_TRAFF_A_HOR) and height [NAV_TRAFF_A_VER](#NAV_TRAFF_A_VER), with the UAV at it's center. The traffic detector then checks if the time until intersection with the UAV airspace is below the [NAV_TRAFF_COLL_T](#NAV_TRAFF_COLL_T) threshold based on the relative speed. If the both checks are true, the [Traffic Avoidance Failsafe](../config/safety.md#traffic-avoidance-failsafe) action is started, and the vehicle will either warn, land, or return.

코드는 `Navigator :: check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/navigator/navigator_main.cpp))을 참고하십시오.

MAVLink 인스턴스에 대해 구성된 경우 PX4는 트랜스폰더 데이터도 GCS로 전달합니다 (권장됨). GUID의 마지막 10 자리로 드론을 식별합니다.

<!-- See also implementation PR: https://github.com/PX4/PX4-Autopilot/pull/21283 -->

## 추가 정보

- [MAVLink 주변장치](../peripherals/mavlink_peripherals.md)
- [직렬 포트 설정](../peripherals/serial_configuration.md)

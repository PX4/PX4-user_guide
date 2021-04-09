# 항공 사고 방지: ADS-B/FLARM

PX4는 [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance_%E2%80%93_broadcast) 또는 [FLARM](https://en.wikipedia.org/wiki/FLARM) 트랜스폰더를 사용하여 [임무](../flight_modes/mission.md)에서 간단한 항공 시고 방지를 지원할 수 있습니다. 잠재적인 충돌이 감지되면 PX4는 [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID)의 값에 따라 *경고*, 즉시 [착륙](../flight_modes/land.md) 또는 [귀환](../flight_modes/return.md) 할 수 있습니다.

<span id="supported_hardware"></span>
## 지원 하드웨어

PX4 사고방지는 MAVLink [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE) 메시지를 사용하여 트랜스폰더 데이터를 제공하는 ADS-B 또는 FLARM 제품에서 작동합니다.

다음 장치들로 테스트되었습니다:
- [PingRX ADS-B Receiver](https://uavionix.com/product/pingrx/) (uAvionix)
- [FLARM](https://flarm.com/products/powerflarm/uav/)


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
| 1(red)  | VCC      | +4V to +36V |
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

You will now find a new parameter called [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), which must be set to 57600.

:::note
Prior to PX4 v1.9 you can set up the port using the deprecated parameter: `SYS_COMPANION`.
:::

### Configure Traffic Avoidance

Configure the action when there is a potential collision using the parameter below:

| Parameter                                                                                                           | Description                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_TRAFF_AVOID"></span>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)    | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode. |
| <span id="NAV_TRAFF_A_RADM"></span>[NAV_TRAFF_A_RADM](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADM) | Set traffic avoidance distance for *manned* aviation                                                              |
| <span id="NAV_TRAFF_A_RADU"></span>[NAV_TRAFF_A_RADU](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADU) | Set traffic avoidance distance for *unmanned* aviation                                                            |


## Implementation

PX4 listens for valid transponder reports during missions.

If a valid transponder report is received, PX4 first uses the transponder position and heading information to estimate whether the vehicles will share a similar altitude before they pass each other. If they may then PX4 it estimates how the closest distance between the path to the next waypoint and the other vehicles predicted path. If the crossing point is less than the configured distance for altitude and path, the [Traffic Avoidance Failsafe](../config/safety.md#traffic-avoidance-failsafe) action is started, and the vehicle will either warn, land, or return. The detection distance can be configured separately for manned and unmanned aviation.


The code can be found in `Navigator::check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/navigator/navigator_main.cpp)).

PX4 will also forward the transponder data to a GCS if this has been configured for the MAVLink instance (this is recommended). The last 10 Digits of the GUID is displayed as Drone identification.

## Further Information

* [MAVLink Peripherals](../peripherals/mavlink_peripherals.md)
* [Serial Port Configuration](../peripherals/serial_configuration.md)

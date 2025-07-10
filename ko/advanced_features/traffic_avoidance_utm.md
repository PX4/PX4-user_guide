---
canonicalUrl: https://docs.px4.io/main/ko/advanced_features/traffic_avoidance_utm
---

# 항공 교통 회피 : UAS 교통 관리 (UTM)

PX4에서는 MAVLink [`UTM_GLOBAL_POSITION`](https://mavlink.io/en/messages/common.html#UTM_GLOBAL_POSITION) 메시지를 사용하여 [임무 수행](../flight_modes/mission.md)중 간단한 항공 교통 회피 기능을 지원할 수 있습니다. 잠재적 충돌이 감지되면 PX4는 [` NAV_TRAFF_AVOID`](#NAV_TRAFF_AVOID)의 값에 따라 *경고*, 즉시 [착륙](../flight_modes/land.md) 또는 [귀환](../flight_modes/return.md)할 수 있습니다.

:::note
동작 방식은 [ADS-B 교통 회피](../advanced_features/traffic_avoidance_adsb.md)의 경우와 정확히 동일합니다 (다른 차량 데이터 소스 제외). 자세한 내용은 아래 [구현](#implementation)을 참조하십시오.
:::


## 사고 방지 설정

아래의 매개변수들을 사용하여 잠재적 충돌이 있을 때 트리거 거리와 동작을 구성합니다.

| 매개변수                                                                                                      | 설명                                                                   |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <a id="NAV_TRAFF_AVOID"></a>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)   | 교통 회피 모드 활성화는 회피 대응을 지정합니다. 0 : 비활성화, 1 : 경고만, 2 : 귀환 모드, 3 : 착륙 모드. |
| <a id="NAV_TRAFF_A_RADM"></a>[NAV_TRAFF_A_RADM](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADM) | *유인* 항공기에 대한 교통 회피 트리거 거리 설정.                                        |
| <a id="NAV_TRAFF_A_RADU"></a>[NAV_TRAFF_A_RADU](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADU) | *무인* 항공기에 대한 교통 회피 트리거 거리 설정.                                        |


## 구현

PX4는 임무중에 `UTM_GLOBAL_POSITION` MAVLink 메시지를 수신합니다. 유효한 메시지가 수신되면, 유효성 플래그, 위치 및 제목이 *ADS-B 트래픽 회피*에 사용되는 동일한 `transponder_report` UORB 주제에 매핑됩니다.

구현은 [ADS-B 트래픽 회피 > 구현](../advanced_features/traffic_avoidance_adsb.md#implementation)에 기술한 바와 같이 *정확히* 구현됩니다.

:::note
[UTM_GLOBAL_POSITION](https://mavlink.io/en/messages/common.html#UTM_GLOBAL_POSITION)에는 ADSB 응답기에서 제공하지 않는 추가 필드가 포함되어 있습니다 ([ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE) 참조). 현재 구현에서는 단순히 추가 필드 (차량의 계획된 다음 웨이포인트에 대한 정보 포함)를 삭제합니다.
:::

## 추가 정보

* [ADS-B 교통 회피](../advanced_features/traffic_avoidance_adsb.md)

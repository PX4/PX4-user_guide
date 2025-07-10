---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/hold
---

# 유지 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*유지* 모드(예: "Loiter")는 기체의 현 위치와 고도를 유지합니다. 멀터콥터는 현 위치를 유지하며, 고정익은 현 위치 주변을 선회합니다.

:::tip
*유지 모드*를 사용하여 임무를 일시 중지하거나 비상시 기체를 제어합니다. 일반적으로 사전 프로그래밍 되어진 스위치로 작동시킵니다. :::

:::note
* 이 모드는 GPS가 필요합니다.
* 이 모드는 자동이며, 기체 제어에 사용자 개입이 *필요하지* 않습니다.
* RC 무선 조종기 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터와 VTOL 멀티콥터 모드에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다. :::

기체 유형에 따른 기능의 상세 내용이 아래에 설명합니다.

## 멀티코터 (MC)

멀티콥터는 현재 위치와 고도에서 호버링합니다.

RC 스틱을 움직이면, 차량이 [위치 모드](../flight_modes/position_mc.md)([기본값](#COM_RC_OVERRIDE))로 변경됩니다.

아래의 매개 변수를 사용하여 동작을 설정할 수 있습니다.

| 매개변수                                                                                                             | 설명                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT)    | 정지기 모드의 최소 높이(모드가 더 낮은 고도에서 작동하면 기체가 이 고도로 상승함).                                                                                                        |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 멀티콥터 (또는 MC 모드의 VTOL)에서 스틱 이동으로 인하여 모드가 [위치 모드](../flight_modes/position_mc.md)로 변경 여부를 제어합니다. 자동 모드와 오프보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | [위치 모드](../flight_modes/position_mc.md)로 전환하는 스틱 이동량 ([COM_RC_OVERRIDE](#COM_RC_OVERRIDE)이 활성화된 경우).                                                  |

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/navigator/loiter.cpp#L61 -->

## 고정익 (FW)

비행기는 현재 고도에서 GPS 유지 위치를 중심으로 선회한다. 모드가 동작시, 기체는 먼저 `MIS_LTRMIN_ALT` 고도로 상승합니다.

RC 스틱 이동은 무시됩니다.

아래의 매개 변수를 사용하여 동작을 설정할 수 있습니다.

| 매개변수                                                                         | 설명                                               |
| ---------------------------------------------------------------------------- | ------------------------------------------------ |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | 배회 원의 반경                                         |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | 정지기 모드의 최소 높이(모드가 더 낮은 고도에서 작동하면 기체가 이 고도로 상승함). |


## VTOL

VTOL은 고정익 모드에서는 유지 동작과 매개 변수는 [고정익](#fixed-wing-fw)를 따르며, 멀티콥터 모드에서는 [멀티콥터](#multi-copter-mc) 매개 변수를 따릅니다.

<!-- this maps to AUTO_LOITER in flight mode state machine -->

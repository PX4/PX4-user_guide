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

| 매개변수                                                                                                    | 설명                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="NAV_MIN_LTR_ALT"></a>[NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | This is the minimum altitude above Home the system will always obey in Loiter (Hold) mode if switched into this mode without specifying an altitude (e.g. through Loiter switch on RC). |

<span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). 자동 모드와 오프보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/navigator/loiter.cpp#L61 -->

## Fixed-wing (FW)

비행기는 현재 고도에서 GPS 유지 위치를 중심으로 선회한다. The vehicle will first ascend to `NAV_MIN_LTR_ALT` if the mode is engaged below this altitude (by default disabled).

RC 스틱 이동은 무시됩니다.

아래의 매개 변수를 사용하여 동작을 설정할 수 있습니다.

| 매개변수                                                                           | 설명                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------ |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)   | 배회 원의 반경                                         |
| [NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | 정지기 모드의 최소 높이(모드가 더 낮은 고도에서 작동하면 기체가 이 고도로 상승함). |


## VTOL

A VTOL follows the HOLD behavior and parameters of [Fixed-wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->

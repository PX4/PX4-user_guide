# 보류 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

* Hold * 비행 모드(예: "Loiter")는 기체를 정지시키고 현재의 GPS 위치와 고도를 유지합니다(MC 기체는 GPS 위치를 맴돌 것입니다).

> ** Tip ** * Hold 모드 *을(를) 사용하여 임무를 일시 중지하거나 비상 시 기체를 다시 제어할 수 있습니다. 일반적으로 사전 프로그래밍된 스위치로 활성화됩니다.

<span></span>

> **참고 ** * 이 모드에서는 GPS가 필요합니다. * 이 모드는 자동 모드입니다(RC 제어는 모드를 변경하는 경우를 제외하고 기본적으로 가 비활성화됩니다).</p> </blockquote> 
> 
> 각 기체 유형에 대한 구체적인 행동은 아래에 설명되어 있습니다.
> 
> ## 멀티코터(MC)
> 
> 멀티코터는 현재 위치와 고도를 따라 움직입니다.
> 
> 아래 매개 변수를 사용하여 동작을 구성할 수 있습니다.
> 
> | Parameter                                                                                             | Description                                      |
> | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
> | <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | 정지기 모드의 최소 높이(모드가 더 낮은 고도에서 작동하면 기체가 이 고도로 상승함). |
> 
> <!-- Code for this here: https://github.com/PX4/Firmware/blob/master/src/modules/navigator/loiter.cpp#L61 -->
> 
> ## 고정 날개(FW)
> 
> 비행기는 현재 고도에서 GPS 유지 위치를 중심으로 선회한다. 기체가 먼저 `으로 상승합니다.MIS_LTRMIN_ALT` 모드가 이 고도 이하에서 작동할 경우.
> 
> The behaviour can be configured using the parameters below.
> 
> | Parameter                                                                    | Description                                                                                                   |
> | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
> | [Na'Vi는 '라 오버랩'](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)   | 로터 원의 반지름.                                                                                                    |
> | [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |
> 
> ## VTOL
> 
> VTOL은 FW 모드일 때, 그리고 MC 모드일 때는 [ Fixed Wing ](#fixed-wing-fw)의 HOLD 동작과 파라미터를 따릅니다.
> 
> <!-- this maps to AUTO_LOITER in flight mode state machine -->
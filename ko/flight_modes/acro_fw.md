---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/acro_fw
---

# 아크로 모드 (고정 날개)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동 / 원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

곡예 기동을 수행하는 RC 모드 (예 : 롤, 뒤집기, 포장 마차 및 곡예 인물)

롤, 피치 및 요 스틱은 각 축을 중심으로 한 각도 회전 속도를 제어하고 조절판은 직접 출력 믹서로 전달됩니다. 스틱이 중앙에 놓여지면 기체는 회전을 멈추지만 현재 방향 (측면, 반전 등) 과 현재 모멘텀에 따라 움직입니다.

![FW 수동 곡예 비행](../../assets/flight_modes/manual_acrobatic_FW.png)

## 기술적 설명

곡예 기동을 수행하는 RC 모드 (예 : 롤, 뒤집기, 포장 마차 및 곡예 인물)

RPY 스틱 입력은 자동 조종 장치에 의해 안정화되는 각속도 명령으로 변환됩니다. Throttle은 출력 믹서에 직접 전달됩니다.


## 매개 변수

| 매개변수                                                                                                       | 설명                                                                                         |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| <span id="FW_ACRO_X_MAX"></span>[FW_ACRO_X_MAX](../advanced_config/parameter_reference.md#FW_ACRO_X_MAX) | 아크로 본체 x 최대 속도 (사용자가 acro 모드에서 전체 롤 스틱 입력을 적용한 경우 컨트롤러가 달성하려고 시도하는 본체 x 속도). 기본값: 90도.     |
| <span id="FW_ACRO_Y_MAX"></span>[FW_ACRO_Y_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Y_MAX) | Acro body y max rate (사용자가 acro 모드에서 전체 피치 스틱 입력을 적용한 경우 컨트롤러가 달성하려고하는 바디 y 비율). 기본값: 90도. |
| <span id="FW_ACRO_Z_MAX"></span>[FW_ACRO_Z_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Z_MAX) | Acro body z 최대 속도 (사용자가 acro 모드에서 전체 요 스틱 입력을 적용한 경우 컨트롤러가 달성하려고 시도하는 몸체 속도). 기본값: 45도.    |

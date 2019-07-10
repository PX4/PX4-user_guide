# 아크로 모드 (고정 날개)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동 / 원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

* 아크로 모드 </ 0>는 곡예 비행을 수행하기위한 RC 모드입니다. 롤, 플립, 노점 및 곡예 인물.</p> 

롤, 피치 및 요 스틱은 각 축을 중심으로 한 각도 회전 속도를 제어하고 조절판은 직접 출력 믹서로 전달됩니다. 스틱이 중앙에 놓여지면 기체는 회전을 멈추지만 현재 방향 (측면, 반전 등) 과 현재 모멘텀에 따라 움직입니다.

![FW 수동 곡예 비행](../../images/flight_modes/manual_acrobatic_FW.png)

## 기술적 설명

RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

RPY stick inputs are translated to angular rate commands that are stabilized by autopilot. Throttle is passed directly to the output mixer.

## 매개 변수

| Parameter                                                                                           | Description                                                                                           |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| <span id="FW_ACRO_X_MAX"></span>[FW_ACRO_X_MAX](../advanced_config/parameter_reference.md#FW_ACRO_X_MAX) | 아크로 본체 x 최대 속도 (사용자가 acro 모드에서 전체 롤 스틱 입력을 적용한 경우 컨트롤러가 달성하려고 시도하는 본체 x 속도). 기본값: 90도.                |
| <span id="FW_ACRO_Y_MAX"></span>[FW_ACRO_Y_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Y_MAX) | Acro body y max rate (사용자가 acro 모드에서 전체 피치 스틱 입력을 적용한 경우 컨트롤러가 달성하려고하는 바디 y 비율). Default: 90 degrees. |
| <span id="FW_ACRO_Z_MAX"></span>[FW_ACRO_Z_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Z_MAX) | Acro body z 최대 속도 (사용자가 acro 모드에서 전체 요 스틱 입력을 적용한 경우 컨트롤러가 달성하려고 시도하는 몸체 속도). 기본값: 45도.               |
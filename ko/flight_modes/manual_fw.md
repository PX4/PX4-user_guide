---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/manual_fw
---

# 수동 모드(고정 날개)

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*수동 모드*은 RC 스틱 입력을 출력 믹서에 직접 전송하여 수동 제어로만 기체를 비행합니다.

:::tip
이 모드는 안정화 기능이 없기 때문에, 가장 어려운 모드입니다 [아크로모드](../flight_modes/acro_fw.md)와 달리, RP 스틱이 중심일 경우 기체가 축 주위에서 자동으로 회전을 멈추지 않습니다. 조종사는 실제로 스틱을 이동하여 다른 방향으로 힘을 가해야 합니다.
:::

:::note
이 모드는 FMU를 재정의하는 유일한 모드입니다(명령어는 코프로세서를 통해 전송됩니다). FMU 펌웨어 오작동시 RC를 통해 스로틀, 엘리베이터, 에일러론 및 방향타를 제어할 수있는 안전 메커니즘을 제공합니다.
:::

## 기술적 설명

스틱 입력이 출력 믹서로 직접 전송되는 RC 모드 ( "완전한"수동 제어용).

FMU를 무시하는 유일한 모드입니다 (명령은 안전 코프로세서를 통해 전송 됨). FMU 펌웨어 오작동시 RC를 통해 스로틀, 엘리베이터, 에일러론 및 방향타를 제어할 수있는 안전 메커니즘을 제공합니다.

## 매개 변수

| 매개 변수                                                                                           | 설명                                                                                                      |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <span id="FW_MAN_P_SC"></span>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | 수동 피치 스케일. 전체 수동 모드에서 원하는 피치 액추에이터 명령에 적용되는 스케일 팩터. 이 매개 변수를 사용하면 제어 표면의 투사를 조정할 수 있습니다. 기본값: 1.0 norm. |
| <span id="FW_MAN_R_SC"></span>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | 수동 롤 스케일. 전체 수동 모드에서 원하는 롤 액추에이터 명령에 적용되는 스케일 팩터. 이 매개 변수를 사용하면 제어 표면의 투사를 조정할 수 있습니다. 기본값: 1.0 norm.   |
| <span id="FW_MAN_Y_SC"></span>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | 수동 요 스케일. 전체 수동 모드에서 원하는 요 액츄에이터 명령에 적용되는 스케일 계수. 이 매개 변수를 사용하면 제어 표면의 투사를 조정할 수 있습니다. 기본값: 1.0 norm.   |
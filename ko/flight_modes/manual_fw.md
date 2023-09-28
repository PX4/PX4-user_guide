<Redirect to="../flight_modes_fw/manual" />

# Manual Mode (Fixed-wing)

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Manual mode* sends RC stick input directly to control allocation for fully manual control.

:::tip
이 모드는 안정화 기능이 없기 때문에, 가장 어려운 모드입니다 Unlike [Acro Mode](../flight_modes_fw/acro.md) if the RP stick is centered the vehicle will not automatically stop rotating around the axis; the pilot actually has to move the stick to apply force in the other direction. :::

:::note
이 모드는 FMU를 재정의하는 유일한 모드입니다(명령어는 코프로세서를 통해 전송됩니다).
FMU 펌웨어 오작동시 RC를 통해 스로틀, 엘리베이터, 에일러론 및 방향타를 제어할 수있는 안전 메커니즘을 제공합니다.
:::

## 기술적 설명

RC mode where stick input is sent directly to control allocation (for "fully" manual control).

FMU를 무시하는 유일한 모드입니다 (명령은 안전 코프로세서를 통해 전송 됨). FMU 펌웨어 오작동시 RC를 통해 스로틀, 엘리베이터, 에일러론 및 방향타를 제어할 수있는 안전 메커니즘을 제공합니다.

## 매개 변수

| 매개 변수                                                                                           | 설명                                                                                                        |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <a id="FW_MAN_P_SC"></a>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | 수동 피치 스케일.  전체 수동 모드에서 원하는 피치 액추에이터 명령에 적용되는 스케일 팩터.  이 매개 변수를 사용하면 제어 표면의 투사를 조정할 수 있습니다. 기본값: 1.0 norm. |
| <a id="FW_MAN_R_SC"></a>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | 수동 롤 스케일. 전체 수동 모드에서 원하는 롤 액추에이터 명령에 적용되는 스케일 팩터. 이 매개 변수를 사용하면 제어 표면의 투사를 조정할 수 있습니다. 기본값: 1.0 norm.     |
| <a id="FW_MAN_Y_SC"></a>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | 수동 요 스케일. 전체 수동 모드에서 원하는 요 액츄에이터 명령에 적용되는 스케일 계수. 이 매개 변수를 사용하면 제어 표면의 투사를 조정할 수 있습니다. 기본값: 1.0 norm.     |

---
canonicalUrl: https://docs.px4.io/main/ko/config/flight_mode
---

# 비행 모드 설정

이 항목에서는 [비행 모드](../getting_started/flight_modes.md) 및 기타 기능을 무선 조종 송신기의 스위치에 매핑하는 방법을 설명합니다.

:::tip
비행 모드를 설정하려면 아래 사항들이 준비되어야 합니다.
- [라디오 설정](../config/radio.md)
- [송신기를 설정](#rc-transmitter-setup)하여 모드 스위치의 물리적 위치를 단일 채널로 인코딩합니다. [Setup your transmitter](#rc-transmitter-setup) to encode the physical positions of your mode switch(es) into a single channel. :::


## 어떤 비행 모드와 스위치를 설정하여야 합니까?

*Flight Modes* provide different types of *autopilot-assisted flight*, and *fully autonomous flight*. [여기에 설명된](../getting_started/flight_modes.md) 비행 모드를 설정하거나 설정하지 않을 수 있습니다. 대부분의 사용자는 다음 기능을 설정해야 차량이 더 쉽고 안전하게 비행할 수 있습니다.

- **Position mode** ([multicopter](../getting_started/flight_modes.md#position-mode-mc), [fixed-wing](../getting_started/flight_modes.md#position-mode-fw)) - Easiest and safest mode for manual flight.
- [복귀 모드](../flight_modes/return.md) - 안전한 경로와 착륙을 통해 이륙 위치로 되돌아갑니다(기본값).
- **VTOL Transition Switch** - Toggle between fixed-wing and multicopter flight configuration on VTOL vehicles.

스위치를 아래와 같이 일반적으로 매핑합니다.

- [미션](../flight_modes/mission.md) - 지상관제소에서 보낸 사전 프로그래밍된 미션을 실행합니다.
- <a id="kill_switch"></a> [킬 스위치](../config/safety.md#kill-switch) - 모든 모터 출력을 즉시 중지합니다. 기체가 충돌하는 상황에서는 계속 비행하는 것보다 사고를 방지할 수 있습니다.


## 비행 모드 선택

PX4를 사용하면 "모드" 채널을 지정하고 채널의 PWM 값에 따라 활성화될 최대 6개의 비행 모드를 선택할 수 있습니다. 킬 스위치 매핑, 시작 모드로 돌아 가기 및 오프 보드 모드를위한 채널을 별도로 지정할 수도 있습니다.

단일 채널 비행 모드 선택을 설정 방법

1. *QGroundControl*을 시작하고 기체를 연결합니다.
1. RC 송신기를 켭니다.
1. **QGroundControl 아이콘 > 차량 설정**을 선택한 다음 사이드바에서 **비행 모드**를 선택합니다.

   ![비행 모드 단일 채널](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)

1. *비행 모드 설정* 지정
   * **모드 채널**을 선택합니다 (위에 채널 5로 표시되지만 송신기 구성에 따라 다름).
   * 모드 선택을 위해 설정한 송신기 스위치를 사용 가능한 위치로 이동합니다. 모드 선택을 위해 설정한 송신기 스위치를 사용 가능한 위치로 이동합니다. :::note
6개 슬롯 중 어느 곳에서나 비행 모드를 설정할 수 있지만 스위치 위치에 매핑된 채널만 강조 표시/사용됩니다.
:::
   * 각 스위치 위치에 대해 트리거하려는 비행 모드를 선택합니다.
1. *스위치 설정* 지정
   * 송신기의 각 모드 스위치를 차례로 선택하고 원하는 비행 모드가 활성화되었는 지 확인합니다 (활성 모드의 *QGroundControl*에서 텍스트가 노란색으로 바뀜).

1. 모드가 올바른 송신기 스위치에 매핑되었는 지 테스트합니다.
   * *채널 모니터*를 확인하여 예상 채널이 각 스위치에 의해 변경되는 지 확인하십시오.
   * 그러면 *QGroundControl* 설정이 [위에서 설명한 대로](#single-channel-flight-mode-selection) 동작합니다.

모든 값은 변경시에 자동으로 저장됩니다.

## RC 송신기 설정

이 섹션에는 taranis에 대한 몇 가지 가능한 설정 방법을 설명합니다. QGroundControl에는 [다른 송신기에 대한 설정 정보가 *있을 수 있습니다*.](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#transmitter-setup)


<a id="taranis_setup"></a>

### Taranis 설정: 단일 채널 모드를 위한 3방향 스위치 설정

2개 또는 3개의 모드 중 선택만 지원해야 하는 경우 단일 3방향 스위치의 위치에 모드를 매핑할 수 있습니다. 아래에서는 Taranis 3-way "SD"스위치를 채널 5에 매핑하는 방법을 보여줍니다.

:::note
이 예는 인기있는 *FrSky Taranis* 송신기 설정법을 보여줍니다. 송신기 설정은 송신기마다 차이가 날 수 있습니다. :::

Taranis UI **MIXER** 페이지를 열고 아래와 같이 **CH5**까지 아래로 스크롤합니다.

![Taranis - 전환 채널 매핑](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

**ENT(ER)**를 눌러 **CH5** 구성을 편집한 다음 **소스**를 *SD* 버튼으로 변경합니다.

![Taranis - 채널 설정](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

이제 완료되었습니다! 채널 5는 이제 3개의 다른 **SD** 스위치 위치에 대해 3개의 다른 PWM 값을 출력합니다.

그런 다음 *QGroundControl* 설정 방법은 이전 섹션에서 설명한 대로입니다.


### Taranis 설정: 단일 채널 모드를 위한 다중 방향 스위치 설정

대부분의 송신기에는 6방향 스위치가 없으므로 사용 가능한 스위치 위치(최대 6개)보다 더 많은 모드를 지원할 수 있어야 하는 경우 여러 스위치를 사용하여 표시하여야 합니다. 일반적으로 이는 2위치 및 3위치 스위치의 위치를 단일 채널로 인코딩하여 수행되므로 각 스위치 위치에 따라 다른 PWM 값이 생성됩니다.

FrSky Taranis에서 이 프로세스는 두 개의 실제 스위치 위치의 각 조합에 "논리적 스위치"를 할당하는 것을 포함합니다. 그런 다음 각 논리적 스위치는 동일한 채널에서 다른 PWM 값에 할당됩니다.

아래 비디오는 *FrSky Taranis* 송신기로 어떻게 동작하는 지 보여줍니다.<!-- \[youtube\](https://youtu.be/scqO7vbH2jo) Video has gone private and is no longer available --><!-- @\[youtube\](https://youtu.be/BNzeVGD8IZI?t=427) - video showing how to set the QGC side - at about 7mins and 3 secs -->@https://youtu.be/TFEjEQZqdVA

The *QGroundControl* configuration is then [as described above](#flight-mode-selection).


## 추가 정보

* [PX4 비행 모드 개요](../flight_modes/README.md)
* [QGroundControl > 비행 모드](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 설정 비디오 - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (유튜브)
* [라디오 스위치 매개변수](../advanced_config/parameter_reference.md#radio-switches) - 매개변수를 통해 매핑을 설정하는 데 사용할 수 있습니다.




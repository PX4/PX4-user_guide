# 비행 모드 설정

이 항목에서는 [비행 모드](../getting_started/flight_modes.md) 및 기타 기능을 무선 조종 송신기의 스위치에 매핑하는 방법을 설명합니다.

:::tip
비행 모드를 설정하려면 아래 사항들이 준비되어야 합니다.
- [라디오 설정](../config/radio.md)
- [송신기를 설정](#rc-transmitter-setup)하여 모드 스위치의 물리적 위치를 단일 채널로 인코딩합니다. We provide examples for the popular *Taranis* transmitter [below](#taranis-setup-3-way-switch-configuration-for-single-channel-mode) (check your documentation if you use a different transmitter). :::


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

1. Start *QGroundControl* and connect the vehicle.
1. RC 송신기를 켭니다.
1. **QGroundControl 아이콘 > 차량 설정**을 선택한 다음 사이드바에서 **비행 모드**를 선택합니다.

   ![비행 모드 단일 채널](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)

1. Specify *Flight Mode Settings*:
   * Select the **Mode channel** (above this shown as Channel 5, but this will depend on your transmitter configuration).
   * Move the transmitter switch (or switches) that you have set up for mode selection through the available positions. The mode slot matching your current switch position will be highlighted (above this is *Flight Mode 1*). :::note
While you can set flight modes in any of the 6 slots, only the channels that are mapped to switch positions will be highlighted/used.
:::
   * Select the flight mode that you want triggered for each switch position.
1. Specify *Switch Settings*:
   * Select the channels that you want to map to specific actions - e.g.: *Return* mode, *Kill switch*, *offboard* mode, etc. (if you have spare switches and channels on your transmitter).

1. Test that the modes are mapped to the right transmitter switches:
   * Check the *Channel Monitor* to confirm that the expected channel is changed by each switch.
   * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).

모든 값은 변경시에 자동으로 저장됩니다.

## RC 송신기 설정

이 섹션에는 taranis에 대한 몇 가지 가능한 설정 방법을 설명합니다. QGroundControl에는 [다른 송신기에 대한 설정 정보가 *있을 수 있습니다*.](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#transmitter-setup)


<a id="taranis_setup"></a>

### Taranis 설정: 단일 채널 모드를 위한 3방향 스위치 설정

2개 또는 3개의 모드 중 선택만 지원해야 하는 경우 단일 3방향 스위치의 위치에 모드를 매핑할 수 있습니다. 아래에서는 Taranis 3-way "SD"스위치를 채널 5에 매핑하는 방법을 보여줍니다.

:::note
This example shows how to set up the popular *FrSky Taranis* transmitter. 송신기 설정은 송신기마다 차이가 날 수 있습니다. :::

Taranis UI **MIXER** 페이지를 열고 아래와 같이 **CH5**까지 아래로 스크롤합니다.

![Taranis - 전환 채널 매핑](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

Press **ENT(ER)** to edit the **CH5** configuration then change the **Source** to be the *SD* button.

![Taranis - 채널 설정](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

이제 완료되었습니다! 채널 5는 이제 3개의 다른 **SD** 스위치 위치에 대해 3개의 다른 PWM 값을 출력합니다.

The *QGroundControl* configuration is then as described in the previous section.


### Taranis 설정: 단일 채널 모드를 위한 다중 방향 스위치 설정

대부분의 송신기에는 6방향 스위치가 없으므로 사용 가능한 스위치 위치(최대 6개)보다 더 많은 모드를 지원할 수 있어야 하는 경우 여러 스위치를 사용하여 표시하여야 합니다. 일반적으로 이는 2위치 및 3위치 스위치의 위치를 단일 채널로 인코딩하여 수행되므로 각 스위치 위치에 따라 다른 PWM 값이 생성됩니다.

FrSky Taranis에서 이 프로세스는 두 개의 실제 스위치 위치의 각 조합에 "논리적 스위치"를 할당하는 것을 포함합니다. 그런 다음 각 논리적 스위치는 동일한 채널에서 다른 PWM 값에 할당됩니다.

The video below shows how this is done with the *FrSky Taranis* transmitter.<!-- \[youtube\](https://youtu.be/scqO7vbH2jo) Video has gone private and is no longer available --><!-- @\[youtube\](https://youtu.be/BNzeVGD8IZI?t=427) - video showing how to set the QGC side - at about 7mins and 3 secs -->@[youtube](https://youtu.be/TFEjEQZqdVA)

The *QGroundControl* configuration is then [as described above](#flight-mode-selection).


## 추가 정보

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)
* [Radio switch parameters](../advanced_config/parameter_reference.md#radio-switches) - Can be used to set mappings via parameters

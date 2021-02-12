# 비행 모드 설정

[비행 모드](../flight_modes/README.md)는 임무 또는 기내 (보조 컴퓨터) 제어를 통해 다양한 유형의 *자동 조종 장치 지원 비행*과 *완전 자율 비행*을 제공합니다. 다양한 비행 모드를 통해 사용자는 기본 RC 비행 보다 더욱 편리한 플랫폼에서의 비행법을 배울 수 있습니다. 또한, 이륙, 착륙 및 출발지 복귀와 같은 작업을 자동화할 수 있습니다.

PX4를 사용하면 지상국(태블릿 또는 데스크톱) 프로그램이나 무선 조종기에서 비행 모드를 선택할 수 있습니다. 무선 조종기와 태블릿이 모두 연결된 경우 두 시스템 중 하나가 모드를 변경하여 이전 설정을 변경하게 됩니다.

무선 제어 송신기의 스위치에서 비행 모드를 매핑하는 방법을 설명합니다.

:::tip
비행 모드를 설정하려면 이전에 [무선 조종기 설정](../config/radio.md)을 하여야 합니다.
:::

## 어떤 비행 모드를 설정해야 합니까?

[여기에 설명된](../flight_modes/README.md) 비행 모드를 설정하거나 설정하지 않을 수 있습니다.

초보 사용자는 편리한 비행을 위하여 다음 모드 중 하나를 설정하는 것이 좋습니다.

* **Stabilized** - 뒤집히기 어려운 기체에서 스틱이 풀린 상태에서도 수평을 유지합니다 (그러나 위치를 고정할 수는 없습니다).
* **포지션** - 스틱을 놓으면 기체가 그 위치에서 멈춥니다(그리고 부는 바람에 대한 위치를 유지함).
* **고도** - 상승 및 하강이 최대 속도로 제어됩니다.

스위치를 아래와 같이 일반적으로 매핑합니다.

* [복귀](../flight_modes/return.md) - 차량을 안전한 높이로 상승한 다음에 이륙 위치로 되돌아갑니다.
* [미션](../flight_modes/mission.md) - 지상관제소에서 보낸 사전 프로그래밍된 미션을 실행합니다.
* <span id="kill_switch"></span> [킬 스위치](../config/safety.md#kill_switch) - 모든 모터 출력을 즉시 중지합니다. 기체가 충돌하는 상황에서는 계속 비행하는 것보다 사고를 방지할 수 있습니다.

## 다중 채널과 단일 채널 모드 선택

*PX4* (*QGroundControl*)은 비행 모드를 송신기 스위치/다이얼에 매핑하는 두 가지 모드를 지원합니다.

* **단일 채널 모드 선택 :** 최대 6 개의 비행 모드를 할당하여 단일 채널에 인코딩 된 위치를 전환합니다.
* **다중 채널 모드 선택 :** 하나 이상의 채널에서 인코딩된 위치를 전환하는 모드를 할당합니다. 일부 모드는 채널을 공유하도록 하드 코딩되거나 다른 모드 선택에 따라 자동으로 설정됩니다 (다중 채널 모드 선택의 동작이 때때로 혼동 될 수 있음). 

:::tip
권장되는 접근 방식은 이해와 구성이 쉽기 때문에 *단일 채널 모드 선택*입니다.
:::

<span id="single_channel"></span>

## 단일 채널 비행 모드 선택

단일 채널 선택 모드를 사용하면 "모드"채널을 지정하고 채널의 PWM 값에 따라 활성화되는 최대 6 개의 비행 모드를 선택할 수 있습니다. 킬 스위치 매핑, 시작 모드로 돌아 가기 및 오프 보드 모드를위한 채널을 별도로 지정할 수도 있습니다.

:::note
이 접근 방식을 사용하려면 먼저 모드 스위치의 물리적 위치를 단일 채널로 인코딩하도록 *송신기*를 구성하여야 합니다. 많이 사용하는 *Taranis* 송신기에 대한 비디오 가이드를 [아래](#taranis_setup)에서 제공합니다 (다른 송신기를 사용하는 경우 문서를 확인하십시오).
:::

단일 채널 비행 모드 선택을 구성 방법

1. *QGroundControl*을 시작하고 기체를 연결합니다.
2. RC 송신기를 켭니다.
3. 상단 도구 모음에서 **톱니 바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **비행 모드**를 선택하십시오.
    
    ![Flight modes single-channel](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)
    
:::tip
화면이 *다중 채널 모드*로 열리면 **단일 채널 모드 선택 사용** 버튼을 클릭하여 화면을 변경합니다.
:::

4. *비행 모드 설정* 지정
    
    * **모드 채널**을 선택합니다 (위에 채널 5로 표시되지만 송신기 구성에 따라 다름). 
    * 최대 6 개의 **비행 모드**를 선택합니다.
5. *스위치 설정* 지정 
    * 특정 작업에 매핑 할 채널을 선택합니다 (예 : *복귀(Return)* 모드, *Kill 스위치*, *오프 보드* 모드 등). (송신기에 여분의 스위치와 채널이있는 경우).
6. 모드가 올바른 송신기 스위치에 매핑되었는 지 테스트합니다. 
    * *채널 모니터*를 확인하여 예상 채널이 각 스위치에 의해 변경되는 지 확인하십시오.
    * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).

All values are automatically saved as they are changed.

<span id="taranis_setup"></span>

### Single-Channel Setup Video Example (including Transmitter Setup)

It is common to use the positions of a 2- and a 3-position switch on the transmitter to represent the 6 flight modes, and encode each combination of switches as a particular PWM value for the mode that will be sent on a single channel.

The video below shows how this is done with the *FrSky Taranis* transmitter (a very popular and highly recommended RC transmitter). The process involves assigning a "logical switch" to each combination of positions of the two real switches. Each logical switch is then assigned to a different PWM value on the same channel.

The video then shows how to use *QGroundControl* to specify the mode channel and map modes to each of the 6 "slots".

@[youtube](https://youtu.be/scqO7vbH2jo)

### Single-Channel Setup Instructional Example

This example shows how you can configure a transmitter and PX4 with:

* A 3-way switch to choose between flight modes using the single-channel mode setting approach (Manual, Altitude, Acro).
* A 2-way switch that invokes some function (arm/disarm) (via a [Radio switch](../advanced_config/parameter_reference.md#radio-switches) parameter).

:::note
This example shows how to set up the popular *FrSky Taranis* transmitter. Configuration will be slightly different for other transmitters.
:::

First set up your transmitter. Below we show how to map the Taranis "SD" switch to channel 5. This is done in the Taranis UI 'mixer' page, as shown below:

![Taranis - Map channel to switch](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

![Taranis - Configure channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

You can then select the channel and the flight modes in single channel mode selection option in *QGroundControl*:

![QGC - Set mode channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_3.png)

The [Radio switch](../advanced_config/parameter_reference.md#radio-switches) parameters map a particular function to a channel. Assuming you have already mapped a channel in your transmitter you can assign the channel by [setting the parameter](../advanced_config/parameters.md).

For example, below we map channel 6 to the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter in *QGroundControl*.

![QGC - Map ARM switch to channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_4.png)

<span id="multi_channel"></span>

## Multi-Channel Flight Mode Selection

:::tip
We recommend you use [Single Channel Flight Mode](#single_channel) selection because the Multi Channel selection user interface can be confusing. If you do choose to use this method, then the best approach is to start assigning channels and take note of information displayed by *QGroundControl* following your selection.
:::

The multi-channel selection user interface allows you to map one or more modes to one or more channels. There are some modes (and hence switches) that must always be defined, and the channel to which they must be allocated.

To configure flight modes using the multi-channel UI:

1. Turn on your RC transmitter.
2. Start *QGroundControl* and connect the vehicle.
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
    
    ![Flight modes multi-channel](../../assets/qgc/setup/flight_modes/flight_modes_multi_channel.jpg)
    
:::tip
If the screen opens in *Single Channel Mode* click the **Use Multi Channel Mode Selection** button to change screen.
:::

4. Select the modes you want to assign to your switches and select the associated channel (selected modes will *move* in the user interface to be grouped by channel). There are a number of complications on the mode to channel assignments:
    
    * Some modes cannot be manually edited (are grayed out) because their channel and threshold level are automatically defined based on the values of other mode settings. For example: 
        * *Mission* mode - is automatically assigned the same channel number as *Hold* (if the channel for *Hold* is defined by the user). If the channel for *Hold* is not defined, *Mission* mode is automatically assigned the same channel as *Stabilized/Main* mode. This, for example, prevents the user from defining *Stabilized/Main* and *Mission* mode on different channels, to ensure that the user cannot switch both modes ON at the same time. 
        * *Altitude* mode - is automatically assigned the same channel number as *Position Control* (if it is defined), or otherwise the same channel as *Stabilized/Main* mode.
    * *Assist* mode - This mode is added to the same channel as *Stabilized/Main* mode if (and only if) *Position Control* is enabled and defined on a different channel than *Stabilized/Main*.
5. Click the **Generate Thresholds** button. 
    * This will automatically create threshold values for all modes, spread evenly across each channel for its assigned modes. For example, in the mode assignment shown above, most modes are assigned to mode 5, and you can see that the channel thresholds for each mode are spread evenly across the channel. 

This mode is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=6m53s) (youtube).

:::note
This flight mode selection mechanism is relatively complicated due to the way that PX4 works out which mode should be selected. You may be able to gain some insight from this [flow chart](../concept/flight_modes.md#flight-mode-evaluation-diagram).
:::

## Further Information

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)
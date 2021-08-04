# 비행 모드 설정

This topic explains how to map [flight modes](../getting_started/flight_modes.md) and other functions to the switches on your radio control transmitter.

:::tip
You must already have [configured your radio](../config/radio.md) in order to assign flight modes and functions.
:::

:::note PX4 allows you to select flight modes from a ground station (tablet or desktop) or from a radio control transmitter. If radio control and tablet are both connected, either system can change the mode and override the previous setting.
:::

## What Flight Modes and Switches Should I Set?

*Flight Modes* provide different types of *autopilot-assisted flight*, and *fully autonomous flight*. You can set any (or none) of the flight modes [described here](../getting_started/flight_modes.md). Most users should set the following functions, as these make the vehicle easier and safer to fly:

* **Position mode** ([multicopter](../getting_started/flight_modes.md#position-mode-mc), [fixed-wing](../getting_started/flight_modes.md#position-mode-fw)) - Easiest and safest mode for manual flight.
* [Return mode](../flight_modes/return.md) - Return to launch position by safe path and land (by default).
* **VTOL Transition Switch** - Toggle between fixed-wing and multicopter flight configuration on VTOL vehicles.

It is also common to map switches to:

* [Mission](../flight_modes/mission.md) - This mode runs a pre-programmed mission sent by the ground control station.
* <span id="kill_switch"></span> [Kill Switch](../config/safety.md#kill_switch) - Immediately stops all motor outputs (the vehicle will crash, which may in some circumstances be more desirable than allowing it to continue flying).

## 다중 채널과 단일 채널 모드 선택

*PX4* (*QGroundControl*) supports two modes for mapping flight modes to transmitter switches/dials:

* **단일 채널 모드 선택 :** 최대 6 개의 비행 모드를 할당하여 단일 채널에 인코딩 된 위치를 전환합니다.
* **다중 채널 모드 선택 :** 하나 이상의 채널에서 인코딩된 위치를 전환하는 모드를 할당합니다. 일부 모드는 채널을 공유하도록 하드 코딩되거나 다른 모드 선택에 따라 자동으로 설정됩니다 (다중 채널 모드 선택의 동작이 때때로 혼동 될 수 있음). 

:::tip
The recommended approach is use *Single Channel Mode Selection* because it easy to understand and configure.
:::

<span id="single_channel"></span>

## 단일 채널 비행 모드 선택

The single-channel selection mode allows you to specify a "mode" channel and select up to 6 flight modes that will be activated based on the PWM value of the channel. You can also separately specify channels for mapping a kill switch, return to launch mode, and offboard mode.

:::note
In order to use this approach you will first need to configure your *transmitter* to encode the physical positions of your mode switch(es) into a single channel. We provide a video guide of how this is done for the popular *Taranis* transmitter [below](#taranis_setup) (check your documentation if you use a different transmitter).
:::

To configure single-channel flight mode selection:

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
    * 송신기의 각 모드 스위치를 차례로 선택하고 원하는 비행 모드가 활성화되었는 지 확인합니다 (활성 모드의 *QGroundControl*에서 텍스트가 노란색으로 바뀜).

All values are automatically saved as they are changed.

<span id="taranis_setup"></span>

### 단일 채널 설정 비디오 예 (송신기 설정 포함)

It is common to use the positions of a 2- and a 3-position switch on the transmitter to represent the 6 flight modes, and encode each combination of switches as a particular PWM value for the mode that will be sent on a single channel.

The video below shows how this is done with the *FrSky Taranis* transmitter (a very popular and highly recommended RC transmitter). The process involves assigning a "logical switch" to each combination of positions of the two real switches. Each logical switch is then assigned to a different PWM value on the same channel.

The video then shows how to use *QGroundControl* to specify the mode channel and map modes to each of the 6 "slots".

@[youtube](https://youtu.be/scqO7vbH2jo)

### 단일 채널 설정 지침 예

This example shows how you can configure a transmitter and PX4 with:

* 단일 채널 모드 설정 방식 (수동, 고도, 아크로)을 사용하여 비행 모드를 선택할 수있는 3 방향 스위치.
* 일부 기능 (시동/시동 해제)을 호출하는 양방향 스위치 ([무선조종기 스위치](../advanced_config/parameter_reference.md#radio-switches) 매개 변수를 통해).

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

## 다중 채널 비행 모드 선택

:::tip
We recommend you use [Single Channel Flight Mode](#single_channel) selection because the Multi Channel selection user interface can be confusing. If you do choose to use this method, then the best approach is to start assigning channels and take note of information displayed by *QGroundControl* following your selection.
:::

The multi-channel selection user interface allows you to map one or more modes to one or more channels. There are some modes (and hence switches) that must always be defined, and the channel to which they must be allocated.

To configure flight modes using the multi-channel UI:

1. RC 송신기를 켭니다.
2. *QGroundControl*을 시작하고 기체를 연결합니다.
3. 상단 도구 모음에서 **톱니 바퀴** 아이콘(기체 설정)을 선택한 다음 가장자리 표시줄에서 **비행 모드**를 선택하십시오.
    
    ![비행 모드 다중 채널](../../assets/qgc/setup/flight_modes/flight_modes_multi_channel.jpg)
    
:::tip
화면이 *단일 채널 모드*로 열리면 **다중 채널 모드 선택** 버튼을 클릭하여 화면을 변경합니다.
:::

4. 스위치에 할당할 모드를 선택하고 관련 채널을 선택합니다 (선택된 모드는 사용자 인터페이스에서 *이동*되어 채널별로 그룹화됩니다). 채널 할당 모드에는 여러 가지 복잡한 문제가 있습니다.
    
    * 일부 모드는 다른 모드 설정 값에 따라 채널 및 임계 값 레벨이 자동으로 정의되기 때문에 수동으로 편집할 수 없습니다 (회색으로 표시됨). 예: 
        * *미션* 모드 - *보류*와 동일한 채널 번호가 자동으로 할당됩니다 (*보류*에 대한 채널이 사용자에 의해 정의 된 경우). *Hold*에 대한 채널이 정의되어 있지 않으면, *Mission* 모드는 *Stabilized/Main* 모드와 동일한 채널이 자동으로 할당됩니다. 예를 들어 사용자가 다른 채널에서 *Stabilized/Main* 및 *Mission* 모드를 정의하지 못하도록하여 사용자가 동시에 두 모드를 모두 켤 수 없도록합니다. 
        * *고도* 모드 - *위치 제어* (정의 된 경우)와 동일한 채널 번호가 자동으로 할당되거나 그렇지 않으면, *안정화/메인*과 동일한 채널이 자동으로 할당됩니다.
    * *Assist* 모드 - 이 모드는 *위치 제어*가 활성화되고 정의 된 경우 *안정화/메인* 모드와 동일한 채널에 추가됩니다. *안정화/기본*과 다른 채널입니다.
5. **임계치 생성** 버튼을 클릭합니다. 
    * 모든 모드에 대한 임계 값이 자동으로 생성되고 할당 모드에 대해 각 채널에 균등하게 분배됩니다. 예를 들어, 위에 표시된 모드 할당에서 대부분의 모드는 모드 5에 할당되며 각 모드의 채널 임계 값이 채널 전체에 고르게 분포되어 있음을 알 수 있습니다. 

This mode is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=6m53s) (youtube).

:::note
This flight mode selection mechanism is relatively complicated due to the way that PX4 works out which mode should be selected. You may be able to gain some insight from this [flow chart](../concept/flight_modes.md#flight-mode-evaluation-diagram).
:::

## 추가 정보

* [PX4 비행 모드 개요](../flight_modes/README.md)
* [QGroundControl > 비행 모드](https://docs.qgroundcontrol.com/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 설정 비디오 - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (유튜브)
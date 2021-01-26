# 무선 조종기(RC)

핸드 헬드 송신기로 차량을 * 수동으로 * 제어하려면 무선조종기(RC)가 필요합니다. 무선 조종기의 작동 방식, 차량에 적합한 무선 시스템 선택법 및 비행 제어기에 연결하는 법에 대하여 설명합니다.

:::note PX4는 자율 비행 모드에 대해 무선 조종기가 필수 사항은 아닙니다. [ 매개 변수 ](../advanced_config/parameters.md) : [ COM_RC_IN_MODE ](../advanced_config/parameter_reference.md#COM_RC_IN_MODE)를 1로 설정하여 무선 조종기 사용을 비활성화 할 수 있습니다.
:::

## 무선 조종기는 어떻게 작동합니까?

*무선 조종기*에는 운전자가 차량을 명령하는 데 사용하는 지상 기반 * 원격 제어 장치 *가 있습니다. 리모컨에는 차량 이동 (예 : 속도, 방향, 스로틀, 요, 피치, 롤 등)을 지정하고 자동 조종 [비행 모드 ](../flight_modes/README.md) (예 : 이륙, 착륙, 복귀)를 활성화하는 데 사용할 수있는 물리적 제어 기능이 있습니다. 착륙, 임무 등). *원격 측정이 가능한* 무선조종기는 차량에서 수신한 정보를 수신하고 표시할 수 있습니다 (예 : 배터리 잔량, 비행 모드).

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

무선 조종기에는 차량과 호환되는 통신용 무선 모듈이 포함되어 있습니다. 차량 기반 장치는 비행 제어기에 연결됩니다. 비행 제어기는 현재의 자동 조종 비행 모드와 차량 상태를 기준으로 명령을 해석하는 방법을 결정하고 차량 모터와 액추에이터를 구동합니다.

<!-- image showing the different parts here would be nice -->

:::note
지상 및 차량 기반 무선 모듈을 각각 송신기 및 수신기라고하며 (양방향 통신을 지원하더라도) 총칭하여 * 송신기 / 수신기 한쌍 *이라고합니다. 무선 제어기내의 라디오 모듈을 "송신기"라고도 합니다.
:::

무선 조종기의 중요한 품질중 하나는 지원하는 "채널"수 입니다. 채널 수는 차량에 명령을 보내는 데 사용할 수있는 리모컨의 물리적 컨트롤 수를 정의합니다 (예 : 실제로 사용할 수있는 스위치, 다이얼, 컨트롤 스틱 수).

항공기는 최소 4 개 채널 (롤, 피치, 요, 추력)을 지원하는 무선 조종기를 사용해야합니다. 지상 차량에는 최소 2 개의 채널 (조향 + 스로틀)이 필요합니다. 8 또는 16 채널 송신기는 다른 메커니즘을 제어하거나 자동 조종 장치에서 제공하는 다른 [ 비행 모드 ](../flight_modes/README.md)를 활성화하는 데 사용할 수있는 추가 채널을 제공합니다.

## 무선 조종기 종류

<span id="transmitter_modes"></span>

### 항공기 전용 무선 조종기 부품

UAV 용 원격 제어 장치의 가장 인기있는 * 형태는</ 0>은 아래와 같습니다. 롤/피치 및 스로틀/요를 제어하기위한 별도의 조종 스틱이 있습니다 (예 : 항공기에 최소 4 개의 채널이 필요함). </p> 

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

조종 스틱, 스위치의 배치 방식은 다양합니다. 통상적으로 많이 쓰이는 레이아웃을 가리키는 "모드"번호가 있습니다. *모드 1* 및 * 모드 2 * (아래 참조)는 스로틀의 배치 만 다릅니다. 

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

:::note
취향에 따라 선택을 하면 됩니다.(* 모드 2 *가 더 많이 사용됨).
:::

## Remote Control Units for Ground Vehicles

An Unmanned Ground Vehicle (UGV)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.

## Choosing RC System Components

You will need to select a transmitter/receiver pair that are compatible with each other. In addition, receivers have to be [compatible with PX4](#compatible_receivers) and the flight controller hardware.

Compatible radio systems are often sold together. For example, [FrSky Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) are a popular combination.

### Transmitter/Receiver Pairs

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. It also has a custom radio transmitter module slot and customizable open source OpenTX Firmware.

:::note
This remote control unit can display vehicle telemetry when used with [FrSky](../peripherals/frsky_telemetry.md) radio modules.
:::

Other popular transmitter/receiver pairs

* Turnigy remote using, for example, the FrSky transmitter/receiver modules.
* Futaba Transmitters and compatible Futaba S-Bus receivers.
* Long range ~900MHz, low latency: "Team Black Sheep Crossfire" or "Crossfire Micro" set with a compatible remote (e.g. Taranis)
* Long Range ~433MHz: ImmersionRC EzUHF set with a compatible remote (e.g. Taranis)

<span id="compatible_receivers"></span>

### PX4-Compatible Receivers

In addition to the transmitter/receiver pairs being compatible, the receiver must also be compatible with PX4 and the flight controller hardware.

*PX4* and *Pixhawk* have been validated with:

* All Spektrum DSM RC receivers
* All Futaba S.BUS and S.BUS2 RC receivers
* All FrSky PPM and S.Bus models
* Graupner HoTT
* All PPM models from other manufacturers

## Connecting Receivers

As general guidance, receivers connect to the flight controller using the port appropriate to their supported protocol:

* Spektrum and DSM receivers must connect to a **SPKT/DSM** input.
* Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
* PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
* PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

Instructions for connecting to specific flight controllers are given in the following quick-start guides:

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

:::tip
See the manufacturer's flight controller setup guide for additional information.
:::

<span id="binding"></span>

## Binding Transmitter/Receiver

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. The process for binding a transmitter and receiver pair is hardware specific (see your manual for instructions).

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spektrum_bind).

## Set Signal-Loss Behaviour

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value (you can [configure PX4 to detect this](../config/radio.md#rc_loss_detection)).
* Output the last received signal (PX4 cannot handle this case!)

Choose a receiver that can emit nothing (preferred) when RC is lost, or a low throttle value. This behaviour may require hardware configuration of the receiver (check the manual).

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc_loss_detection).

## Related Topics

* [Radio Control Setup](../config/radio.md) - Configuring your radio with PX4.
* [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.
# 비행 101

수동 또는 자동 조종 보조 비행 모드에서 [RC 송신기](../getting_started/rc_transmitter_receiver.md)를 사용하여 기체 비행의 기본적인 사항들을 설명합니다 (자율 비행의 경우 [미션](../flying/missions.md) 참조).

:::note
처음 비행하기 전에 [첫 비행 지침](../flying/first_flight_guidelines.md)을 읽어야 합니다.
:::

<span id="arm"></span>

## 기체 시동

비행 전에 먼저 시동</ 0>을 걸어야 합니다. 시동을 걸면 모든 모터와 액추에이터에 전원을 공급합니다. 멀티 콥터에서는 프로펠러가 회전할 수 있습니다.</p> 

드론 시동을 거는 방법

- 먼저 [안전 스위치](../getting_started/px4_basic_concepts.md#safety_switch)를 해제 하십시오.
- 기체에 arm 명령을 사용하십시오. 스로틀 스틱을 오른쪽 하단에 놓으면 시동 명령이 실행됩니다. 
  - 또는 [시동 스위치](../config/safety.md#arming_switch)를 설정하십시오.
  - *QGroundControl*에서 시동을 걸 수도 있습니다. PX4는 자율 비행을 위해서 무선 조종기가 반드시 필요하지 않습니다.

:::tip
기체는 [보정과 설정](../config/README.md)작업이 완료되고, 위치 잠금 설정시까지 시동을 걸 수 없습니다. [차량 상태 알림](../getting_started/vehicle_status.md) (차량용 LED, 오디오 알림 및 *QGroundControl* 업데이트 포함)은 기체가 비행 준비가 완료되면 알람을 표시합니다. 비행 준비 미비시에는 그 원인을 알려줍니다.
:::

:::note
이륙 시간이 너무 오래 걸리면 기체는 자동으로 ([기본값](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)) [무장 해제](../advanced_config/prearm_arm_disarm.md#auto-disarming) (모터 끄기) 됩니다! 이것은 기체를 사용하지 않을 때 안전한 상태로 되돌리는 안전 조치입니다.
:::

:::note VTOL은 멀티 콥터 모드에서만 시동이 가능합니다. 기본적으로 고정익 모드의 무장은 [CBRK_VTOLARMING](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)을 사용하여 활성화 할 수 있습니다.
:::

<span id="takeoff-and-landing"></span>

## 이륙

이륙하는 가장 용이한 방법([기체 시동](#arm) 후)은 자동 [이륙 모드](../flight_modes/takeoff.md)를 사용하는 것입니다. 일반적으로 [RC 스위치](../config/flight_mode.md) 또는 지상국 프로그램을 사용합니다.

멀티 콥터 (및 멀티 콥터 모드의 VTOL) [포지션 모드](../flight_modes/README.md#position_mc)를 활성화하고 기체 시동후 스로틀 스틱을 62.5 % 이상 올리면 *수동으로* 이륙할 수 있습니다. 이 값을 초과하면 모든 컨트롤러가 활성화되고 차량이 호버링에 필요한 스로틀 수준 ([ MPC_THR_HOVER ](../advanced_config/parameter_reference.md#MPC_THR_HOVER))으로 이동합니다

:::tip
특히 고정익에는 자동 이륙 모드를 적극 권장합니다!
:::

:::note
시동 후 이륙 시간이 너무 오래 걸리면 차량의 시동이 해제될 수 있습니다 ([COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)를 사용하여 시간 제한 조정).
:::

:::note
이륙시 문제가 발생하면 [고장 감지기](../config/safety.md#failure_detector)가 자동으로 엔진을 중지합니다.
:::

## 착륙

착륙하는 가장 용이한 방법은 자동 [착륙](../flight_modes/land.md) 또는 [복귀](../flight_modes/return.md) 모드를 사용하는 것입니다.

멀티 콥터 (및 멀티 콥터 모드의 VTOL)의 경우 차량이 착륙하고 무장 해제 될 때까지 스로틀 스틱을 아래로 눌러 수동으로 착륙할 수 있습니다.

차량은 기본적으로 착륙시 자동으로 무장 해제됩니다.

- 착륙 후 자동 해제 시간을 설정하려면 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)를 사용하십시오 (또는 모두 비활성화).
- 스로틀 스틱을 왼쪽 하단 모서리에 놓아 수동으로 무장 해제하십시오.

:::note
If you see the vehicle "twitch" during landing (turn down the motors, and then immediately turn them back up) this is probably caused by a poor [Land Detector Configuration](../advanced_config/land_detector.md) (specifically, a poorly set [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).
:::

:::tip
Automatic landing is highly recommended, in particular for Fixed Wing vehicles.
:::

## Flight Controls/Commands

All flying, including takeoff and landing, is controlled using the 4 basic commands: roll, yaw, pitch and throttle.

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

In order to control your aircraft you need to understand how the basic Roll, Pitch, Yaw and Throttle commands affect movement in 3D space. This differs depending on whether you're controlling a forward-flying aircraft like a plane, or a "hover aircraft" like a multicopter.

### Hover Aircraft

Hover aircraft (Copter, VTOL in hover mode) respond to the movement commands as shown below:

![Basic Movements Multicopter](../../assets/flying/basic_movements_multicopter.png)

- Pitch => Forward/back.
- Roll => Left/right.
- Yaw => Left/right rotation around the centre of the frame.
- Throttle => Changed altitude/speed.

### Forward-flying Aircraft

Forward-flying aircraft (planes, VTOL in forward flight) respond to the movement commands as shown below:

![Basic Movements Forward](../../assets/flying/basic_movements_forward.png)

- Pitch => Up/down.
- Roll => Left/right and a turn.
- Yaw => Left/right tail rotation and turn.
- Throttle => Changed forward speed.

:::note
The best turn for airplanes is called a coordinated turn, and is performed using roll and little yaw at the same time. This maneuver requires experience!
:::

## Assisted Flight

Even with an understanding of how the vehicle is controlled, flight in fully manual mode can be quite unforgiving. New users should [configure their transmitter](../config/flight_mode.md) to use flight modes where the autopilot automatically compensates for erratic user input or environmental factors.

The following three modes are highly recommended for new users:

- Stabilized - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position)
- Altitude - Climb and drop are controlled to have a maximum rate.
- Position - When sticks are released the vehicle will stop (and hold position against wind drift)

:::note
You can also access automatic modes through the buttons on the bottom of the *QGroundControl* main flight screen.
:::
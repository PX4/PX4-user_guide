# Manual Flying

수동 또는 자동 조종 보조 비행 모드에서 [RC 송신기](../getting_started/rc_transmitter_receiver.md)를 사용하여 기체 비행의 기본적인 사항들을 설명합니다 (자율 비행의 경우 [미션](../flying/missions.md) 참조).

:::note
처음 비행하기 전에 [첫 비행 지침](../flying/first_flight_guidelines.md)을 읽어야 합니다. :::

<a id="arm"></a>

## 기체 시동

Before you can fly the vehicle it must first be [armed](../getting_started/px4_basic_concepts.md#arming-and-disarming). 시동을 걸면 모든 모터와 액추에이터에 전원을 공급합니다. 멀티 콥터에서는 프로펠러가 회전할 수 있습니다.

드론 시동을 거는 방법
- First disengage the [safety switch](../getting_started/px4_basic_concepts.md#safety-switch).
- 기체에 arm 명령을 사용하십시오. 스로틀 스틱을 오른쪽 하단에 놓으면 시동 명령이 실행됩니다.
  - Alternatively configure an [arm/disarm switch](../config/safety.md#arm-disarm-switch).
  - *QGroundControl*에서 시동을 걸 수도 있습니다. PX4는 자율 비행을 위해서 무선 조종기가 반드시 필요하지 않습니다.

:::tip
기체는 [보정과 설정](../config/README.md)작업이 완료되고, 위치 잠금 설정시까지 시동을 걸 수 없습니다. :::note 이륙 시간이 너무 오래 걸리면 기체는 자동으로 ([기본값](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)) [무장 해제](../advanced_config/prearm_arm_disarm.md#auto-disarming) (모터 끄기) 됩니다! :::

:::note
이륙 시간이 너무 오래 걸리면 기체는 자동으로 ([기본값](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)) [무장 해제](../advanced_config/prearm_arm_disarm.md#auto-disarming) (모터 끄기) 됩니다! 이것은 기체를 사용하지 않을 때 안전한 상태로 되돌리는 안전 조치입니다. :::

:::note VTOL은 멀티 콥터 모드에서만 시동이 가능합니다. 기본적으로 고정익 모드의 무장은 [CBRK_VTOLARMING](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)을 사용하여 활성화 할 수 있습니다. :::

<a id="takeoff-and-landing"></a>

## 이륙

### Multicopter takeoff

The easiest way to takeoff (after [arming the vehicle](#arm)) is to use the automatic [Takeoff mode (MC)](../flight_modes_mc/takeoff.md). 일반적으로 [RC 스위치](../config/flight_mode.md) 또는 지상국 프로그램을 사용합니다.

Multicopter (and VTOL in multicopter mode) pilots can also take off *manually* by enabling [Position mode (MC)](../flight_modes/README.md#position_mc), arming the vehicle, and then raising the throttle stick above 62.5%. 이 값을 초과하면 모든 컨트롤러가 활성화되고 차량이 호버링에 필요한 스로틀 수준 ([ MPC_THR_HOVER ](../advanced_config/parameter_reference.md#MPC_THR_HOVER))으로 이동합니다

:::note
시동 후 이륙 시간이 너무 오래 걸리면 차량의 시동이 해제될 수 있습니다 ([COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)를 사용하여 시간 제한 조정). :::

:::note
The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::

### Fixed-wing Takeoff

Automatic takeoff using [Takeoff mode (FW)](../flight_modes_fw/takeoff.md) is highly recommended for fixed-wing vehicles! You can either [hand-launch](../flight_modes_fw/takeoff.md#catapult-hand-launch) (default) or use [runway takeoff](../flight_modes_fw/takeoff.md#runway-takeoff) (if supported by hardware and configured).

For runway takeoff:

1. Place the vehicle facing the planned takeoff direction (ideally facing the wind)
1. Activate [Takeoff mode (FW)](../flight_modes_fw/takeoff.md)
1. [Arm the vehicle](#arm) using an [RC switch](../config/flight_mode.md) or ground station

   The vehicle will ramp up motors, and fly in the indicated direction, until it reaches the (parameter set) clearance height, then enter Hold mode.


For catapult/hand-launch:

1. Point the vehicle in the direction you want it to take off, in order to set the course (ideally facing the wind)
1. Activate [Takeoff mode (FW)](../flight_modes_fw/takeoff.md)
1. [Arm the vehicle](#arm) using an [RC switch](../config/flight_mode.md) or ground station
1. Throw/launch the vehicle in the direction you want it to take off.

   Motors will start after the launch is detected, after which the behaviour is the same as for runway takeoff.

For more information see [Takeoff mode (FW)](../flight_modes_fw/takeoff.md). Using a takeoff item defined in [a mission plan](../flight_modes/mission.md#fw-mission-takeoff) is also recommended.


## 착륙

Landing a fixed-wing vehicle is not easy manually. The best way to land a fixed-wing vehicle is to use a [Fixed-Wing Mission Landing](../flight_modes/mission.md#fw-mission-landing). This landing is defined in a mission, and can be used in either [Mission](../flight_modes/mission.md) or [Return](../flight_modes/return.md) modes. The automatic [Land mode](../flight_modes_fw/land.md) mode is not recommended unless absolutely necessary, as it cannot account for underlying terrain.
<!-- Added this to make it more generic: We'll split this out later -->

The easiest way to land a multicopter or VTOL is to use the automatic [Land](../flight_modes_mc/land.md) or [Return](../flight_modes/return.md) modes. For multicopter (and VTOL in multicopter mode) pilots can also land manually in altitude or position mode by pressing the throttle stick down until the vehicle lands and disarms.

차량은 기본적으로 착륙시 자동으로 무장 해제됩니다.

- 착륙 후 자동 해제 시간을 설정하려면 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)를 사용하십시오 (또는 모두 비활성화).
- 스로틀 스틱을 왼쪽 하단 모서리에 놓아 수동으로 무장 해제하십시오.

:::note
착륙하는 동안 차량 "트위치"가 표시되는 경우 (모터를 껐다가 즉시 다시 켜십시오) 이는 잘못된 [토지 감지기 구성](../advanced_config/land_detector.md) (특히 잘못 설정된 [MPC_THR_HOVER ](../advanced_config/parameter_reference.md#MPC_THR_HOVER) 때문일 수 있습니다.). :::

:::tip
Automatic landing is highly recommended, in particular for Fixed-wing vehicles.
:::


## 비행 제어 명령어

이륙과 착륙을 포함한 모든 비행은 롤, 요, 피치 및 스로틀의 4 가지 기본 명령을 사용하여 제어됩니다.

![RC 기본 명령어](../../assets/flying/rc_basic_commands.png)

항공기를 제어하려면 기본 롤, 피치, 요 및 스로틀 명령이 3D 공간에서의 이동에 미치는 영향을 이해해야합니다 이것은 고정익과 같이 전진 비행기를 제어하는지, 아니면 다중기처럼 "공중 선회 항공기"를 제어하는 지에 따라 다릅니다.

### 항공기 선회

선회 항공기 (헬리콥터 모드, 호버 모드의 헬리콥터)는 다음과 같이 이동 명령에 응답합니다

![기본 동작 Multicopter](../../assets/flying/basic_movements_multicopter.png)

- 피치 => 앞으로 / 뒤로.
- 롤 => 왼쪽 / 오른쪽.
- Yaw => 프레임 중앙을 중심으로 좌우로 회전.
- Throttle => 고도/속도 제어

### 전방 비행 항공기

전방 비행 항공기 (항공기, 전방 비행 중 VTOL)는 다음과 같이 이동 명령에 응답합니다

![기본 동작 전달](../../assets/flying/basic_movements_forward.png)

- 피치 => 위 / 아래.
- 롤 => 왼쪽 / 오른쪽 및 차례.
- Yaw => 왼쪽 / 오른쪽 꼬리 회전과 방향 전환.
- Throttle => 고도/속도 제어

:::note
비행기에 가장 적합한 회전은 조정 회전이라고하며 롤과 작은 요를 동시에 사용하여 수행됩니다.
이 기동에는 많은 경험이 필요합니다!
:::

## 보조 비행

기체 제어 매커니즘을 충분히 이해하고 있어도, 완전 수동 모드 비행은 매우 어려운 작업입니다. 초보자는 비행 모드를 사용하도록 [ 송신기를 구성](../config/flight_mode.md) 하여야 합니다. 자동조종장치는 잘못된 사용자 입력이나 환경적인 요인을 자동으로 보완하여 비행합니다.

초보자에게 다음 세 가지 모드를 적극 권장합니다.

* 안정화 모드-차량을 뒤집기 어렵고 스틱을 놓으면 수평이됩니다 (정지 위치가 아님).
* 고도 - 상승 및 하강이 최대 속도로 제어됩니다.
* 위치 - 스틱을 놓으면 차량이 정지합니다. (그리고 바람 드리프트에 대한 위치 유지).

:::note
*QGroundControl* 기본 비행 화면 하단에있는 버튼을 통해 자동 모드를 액세스할 수 있습니다. :::

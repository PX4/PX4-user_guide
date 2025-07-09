---
canonicalUrl: https://docs.px4.io/main/ko/flying/basic_flying
---

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

### Multicopter Takeoff

Multicopter (and VTOL in multicopter mode) pilots can take off *manually* by enabling any manual mode, arming the vehicle and then raising the throttle stick until the motors produce enough thrust to leave the ground. In [Position mode (MC)](../flight_modes/README.md#position_mc) or [Altitude mode (MC)](../flight_modes/README.md#altitude_mc) the throttle stick has to be increased to above 62.5% to command a climb rate and make the vehicle leave the ground. 이 값을 초과하면 모든 컨트롤러가 활성화되고 차량이 호버링에 필요한 스로틀 수준 ([ MPC_THR_HOVER ](../advanced_config/parameter_reference.md#MPC_THR_HOVER))으로 이동합니다

Alternatively the takeoff can performed using the automatic [Takeoff mode (MC)](../flight_modes_mc/takeoff.md).

:::note
시동 후 이륙 시간이 너무 오래 걸리면 차량의 시동이 해제될 수 있습니다 ([COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)를 사용하여 시간 제한 조정). :::

:::note
The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::

### Fixed-wing Takeoff

:::note
Taking off manually (and landing) is not easy!
We recommend using with the automatic modes instead, especially for inexperienced pilots.
:::

[Stabilized mode](../flight_modes/README.md#stabilized_fw), [Acro mode](../flight_modes/README.md#acro_fw) or [Manual mode](../flight_modes/README.md#manual_fw) mode are recommended for manual takeoff. [Position mode](../flight_modes/README.md#position_fw) and [Altitude mode](../flight_modes/README.md#altitude_fw) can also be used, but it is important to accelerate the vehicle sufficiently before bringing them airborne — strong thrust if hand-launched, long runway phase for runway takeoff (this is required because the controller in these modes can prioritize airspeed over altitude tracking).

Manual takeoffs with hand-launched planes:
- Ramp up the motor and throw the vehicle horizontally.
- Do not pitch up too fast as this may stall the plane.
- A good vehicle trim is crucial for safe hand-launch takeoffs, because if the vehicle doesn't fly level there is only a very short time for the pilot to react before the vehicle crashes!

Manual takeoffs with runway-launched planes:
- Accelerate on the runway until the speed is sufficient for takeoff.
- If the plane has a steerable wheel, use the yaw stick to keep it on course.
- Once the speed is sufficient pull up the nose with the pitch stick.

Automatic takeoffs are possible in the [Mission mode](../flight_modes/mission.md#fw-mission-takeoff) or [Takeoff mode (FW)](../flight_modes_fw/takeoff.md). The pilot can take over manual control over the vehicle at any moment during the takeoff process or after it by changing into a manual flight mode.

## 착륙

### Multicopter Landing

Multicopters can be landed in any manual mode. Make sure to keep the throttle stick pulled down after touching down until the motors have switched off.

차량은 기본적으로 착륙시 자동으로 무장 해제됩니다.

- 착륙 후 자동 해제 시간을 설정하려면 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)를 사용하십시오 (또는 모두 비활성화).
- 스로틀 스틱을 왼쪽 하단 모서리에 놓아 수동으로 무장 해제하십시오.

There is also the option to let the vehicle land autonomously. For that engage the [Land mode](../flight_modes_mc/land.md) or [Return mode](../flight_modes/return.md).

:::note
착륙하는 동안 차량 "트위치"가 표시되는 경우 (모터를 껐다가 즉시 다시 켜십시오) 이는 잘못된 [토지 감지기 구성](../advanced_config/land_detector.md) (특히 잘못 설정된 [MPC_THR_HOVER ](../advanced_config/parameter_reference.md#MPC_THR_HOVER) 때문일 수 있습니다.). :::


### Fixed-wing Landing

[Stabilized mode](../flight_modes/README.md#stabilized_fw), [Acro mode](../flight_modes/README.md#acro_fw) or [Manual mode](../flight_modes/README.md#manual_fw) are recommended for landing (just as they are for takeoff). In these modes the pilot has full control over the motor thrust, which is required to perform a manual flaring maneuver when close to the ground (raising the vehicle nose without increasing throttle). You should perform the landing in headwind to reduce the groundspeed before touching down.

For auto landings you should use a [Fixed-Wing Mission Landing](../flight_modes/mission.md#fw-mission-landing). This landing is defined in a mission, and can be used in either [Mission](../flight_modes/mission.md) or [Return](../flight_modes/return.md) modes.

The automatic [Land mode](../flight_modes_fw/land.md) mode is not recommended unless absolutely necessary, as it cannot account for underlying terrain.
<!-- Added this to make it more generic: We'll split this out later -->

차량은 기본적으로 착륙시 자동으로 무장 해제됩니다.

- 착륙 후 자동 해제 시간을 설정하려면 [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)를 사용하십시오 (또는 모두 비활성화).
- 스로틀 스틱을 왼쪽 하단 모서리에 놓아 수동으로 무장 해제하십시오.

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

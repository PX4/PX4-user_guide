# 고정익 이륙

PX4는 [임무](#mission-takeoff)와 [이륙](#takeoff-flight-mode) 비행 모드에서 고정익 이륙을 지원합니다. 기체는 *투석기/수동 발사*를 사용하거나 활주로 이륙 모드를 사용할 수 있습니다. <!-- runway support in missions? -->
In all cases the vehicle takes off at a predefined pitch in its current direction (RC stick input is ignored).

아래 섹션에서는 주요 방법을 설명합니다.

## 위치 비행 모드

기체를 [FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF) 이하의 고도에서 발사했을 때, 충분한 발사 가속을 감지하면 [위치 모드](../flight_modes/position_fw.md)에서 이륙합니다.

이 모드에서 시작하려면 :
- 기체의 시동을 겁니다.
- 기체를 *위치 모드*로 설정합니다.
- 차량을 강한 바람에 직접 던져서 비행시킵니다.

The vehicle will ascend to `FW_CLMBOUT_DIFF` using the same climbout behaviour as for [Takeoff mode](#takeoff-flight-mode). It will then continue in *Postion mode*.

## Takeoff Flight Mode

[Takeoff Mode](../flight_modes/takeoff.md#fixed_wing) enables takeoff using either *catapult/hand-launch* (default) or *runway takeoff*.

### Catapult/Hand-Launch Mode

When armed and in takeoff mode the vehicle waits to detect launch (i.e. from acceleration due to catapult or hand launch). On launch detection, the vehicle ramps up to maximum throttle ([RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR)) in about 2 seconds and then performs a full throttle climbout at a 10 degree pitch. The vehicle climbout phase ends once the vehicle reaches the correct altitude (defined by [FW_CLMBOUT_DIFF](../advanced_config/parameter_reference.md#FW_CLMBOUT_DIFF)), after which regular navigation proceeds. All RC stick movement is ignored until climbout ends.

:::warning
The default climbout pitch may not be suitable for some vehicles. <!-- see https://github.com/PX4/PX4-Autopilot/pull/9243 -->
:::

To launch in this mode:
- Arm the vehicle.
- Put the vehicle into *Takeoff mode*.
- Launch/throw the vehicle (firmly) directly into the wind.

:::note
Most traditional fixed-wing vehicles must be flat and level on release (it is important the nose is neither up or down, and that the vehicle is not rolling/yawing).
:::

:::tip
Some users report improved takeoff performance by pre-triggering launch detection and ramping up to full throttle before release (to trigger launch detection pump/shake the aircraft forward).
:::

### Runway Takeoff Mode

Runway takeoff mode is enabled using [RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF).

The mode is documented in [Takeoff Mode > Fixed Wing > Runway Takeoff](../flight_modes/takeoff.md#runway_launch).

## Mission Takeoff

You can also hand/catapult launch a fixed wing vehicle in a mission.

To launch in a mission:
1. Add a fixed wing takeoff item to the **start** of the mission.

:::tip
Set the takeoff item minimum pitch parameter to an appropriate value for your airframe!
:::
1. Switch to mission mode.
1. Arm the vehicle.
1. Launch/throw the vehicle (firmly) directly into the wind.

:::note
Most traditional fixed-wing vehicles must be flat and level on release (it is important the nose is neither up or down, and that the vehicle is not rolling/yawing).
:::

:::tip
Some users report improved takeoff performance by pre-triggering launch detection and ramping up to full throttle before release (to trigger launch detection pump/shake the aircraft forward).
:::

Once launch/flight is detected the vehicle climbs out (using the minimum pitch parameter in the Takeoff waypoint) and navigates  towards the location of the Takeoff waypoint. It continues climbing until it reaches < `FW_CLMBOUT_DIFF` below the takeoff waypoint altitude (if it reaches the target waypoint before achieving this altitude it spirals up to this level).

:::note
The roll angle is limited to a maximum of 15 degrees during climbout (`FW_CLMBOUT_DIFF is > 0` and distance to takeoff altitude is > `FW_CLMBOUT_DIFF`).
:::

The mission transitions to the next waypoint when it has reached the altitude (within `FW_CLMBOUT_DIFF`) and location.

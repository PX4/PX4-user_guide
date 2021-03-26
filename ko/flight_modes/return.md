# 복귀 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*복귀* 모드는 대기(호버링 또는 선회) 또는 착륙 가능한 안전한 목적지까지 장애물이 없는 경로로 *기체를 안전하게 비행*하기 위하여 사용합니다. 

PX4는 홈 위치, 집결 ( "안전") 지점, 임무 경로 및 임무 착륙 시퀀스 사용을 포함하여 안전한 복귀 경로, 목적지 착륙을 위한 다양한 메커니즘을 제공합니다.

다음 섹션에서는 [복귀 유형 ](#return_types), [복귀 고도](#return_altitude) 및 [착륙/도착 동작](#arrival) 설정 방법을 설명합니다. 마지막에는 각 [기체 유형](#default_configuration)에 대한 *기본* (미리 구성된) 동작을 설명하는 섹션이 있습니다.

:::note

- 이 모드는 GPS가 필요합니다.
- 이 모드는 자동입니다. 기체 제어시 사용자 개입이 *필요하지* 않습니다.
- RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
- 멀티콥터 또는 VTOL 멀티콥터 모드에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다.
:::

<span id="return_types"></span>

## 복귀 유형(RTL_TYPE)

PX4는 안전한 목적지 또는 착륙지까지 방해받지 않는 경로를 검색하는 네 가지 대체 접근 방식 ([RTL_TYPE](#RTL_TYPE))을 제공합니다.

- [홈/랠리 포인트 복귀](#home_return) (`RTL_TYPE = 0 `) : 안전한 고도로 상승하여 가장 가까운 랠리 포인트 또는 홈 위치로 직접 경로를 통하여 복귀합니다.
- [미션 착륙/랠리 포인트 복귀](#mission_landing_return) (`RTL_TYPE = 1 `) : 안전한 고도로 상승, *홈 위치가 아닌 * 가장 가까운 목적지로 직행 : 랠리 미션 착륙 지점 또는 시작. 임무 착륙 또는 집결 지점이 정의되지 않은 경우에는 직접 경로를 통해 홈으로 복귀합니다.
- [미션 경로 복귀](#mission_path_return) (`RTL_TYPE = 2`) : 임무 경로를 사용하고 임무 착륙을 신속하게 진행합니다 (정의된 경우). 임무 착륙이 정의되지 않은 경우 홈으로 빠르게 역회전합니다. 정의된 임무가 없으면 집으로 직접 돌아갑니다 (랠리 포인트는 무시됨).
- [가장 가까운 안전한 목적지 복귀](#safety_point_return) (`RTL_TYPE = 3`) : 안전한 고도로 상승하여 가장 가까운 목적지 (홈, 임무 시작 착지 패턴 또는 집결지)로 직접 경로를 통하여 복귀합니다. 목적지가 임무 착륙 패턴인 경우 패턴을 따라 착륙합니다.

각 유형에 대한 자세한 설명은 다음 섹션에서 제공됩니다.

<span id="home_return"></span>

### 홈/랠리 포인트 복귀 유형 (RTL_TYPE = 0)

이 복귀 유형에서 기체의 동작:

- 안전한 [복귀 고도](#return_altitude) (예상 장애물 위)로 상승합니다.
- 홈 포지션 또는 랠리 포인트 (둘 중 가장 가까운 지점) 로의 직접 경로로 비행합니다.
- 하강 고도에서 [착륙 또는 대기](#arrival) (착륙 매개 변수에 따라 다름).

:::note
랠리 포인트가 정의되지 않은 경우 이는 *출발지 복귀* (RTL) / *홈으로 복귀* (RTH)과 동일합니다.
:::

<span id="mission_landing_return"></span>

### 임무 착륙/랠리 포인트 복귀 유형 (RTL_TYPE = 1)

이 복귀 유형에서 기체의 동작:

- 안전한 [복귀 고도](#return_altitude) (예상 장애물 위)로 상승합니다.
- 랠리 지점 또는 [임무 착륙 패턴](#mission_landing_pattern)의 시작점 (둘 중 가장 가까운 지점)으로 직접 이동합니다. 임무 착륙 또는 집결 지점이 정의되지 않은 경우에는 기체는 직접 경로를 통하여 홈으로 복귀합니다.
- 목적지가 임무 착륙 패턴인 경우 패턴을 따라 착륙합니다.
- If the destination is a rally point or home it will [land or wait](#arrival) at descent altitude (depending on landing parameters).

<span id="mission_landing_pattern"></span>
:::note
A mission landing pattern consists of a [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START), one or more position waypoints, and a [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND).
:::

:::warning
When this type is set PX4 will reject any mission without a valid landing pattern.
:::

<span id="mission_path_return"></span>

### Mission Path Return Type (RTL_TYPE=2)

This return type uses the mission (if defined) to provide a safe return *path*, and the mission landing pattern (if defined) to provide landing behaviour. If there is a mission but no mission landing pattern, the mission is flown *in reverse*. Rally points, if any, are ignored.

:::note
The behaviour is fairly complex because it depends on the flight mode, and whether a mission and mission landing are defined.
:::

Mission *with* landing pattern:

- **Mission mode:** Mission is continued in "fast-forward mode" (jumps, delay and any other non-position commands ignored, loiter and other position waypoints converted to simple waypoints) and then lands.
- **Auto mode other than mission mode:** 
  - Ascend to a safe [return altitude](#return_altitude) above any expected obstacles.
  - Fly directly to closest waypoint (for FW not a landing WP) and descend to waypoint altitude.
  - Continue mission in fast forward mode from that waypoint.
- **Manual modes:** 
  - Ascend to a safe [return altitude](#return_altitude) above any expected obstacles.
  - Fly directly to landing sequence position and descend to waypoint altitude
  - Land using mission landing pattern

Mission *without* landing pattern defined:

- **Mission mode:** 
  - Mission flown "fast-backward" (in reverse) starting from the previous waypoint 
    - Jumps, delay and any other non-position commands ignored, loiter and other position waypoints converted to simple waypoints.
    - VTOL vehicles transition to FW mode (if needed) before flying the mission in reverse.
  - On reaching waypoint 1, the vehicle ascends to the [return altitude](#return_altitude) and flies to the home position (where it [lands or waits](#arrival)).
- **Auto mode other than mission mode:** 
  - Fly directly to closest waypoint (for FW not a landing WP) and descend to waypoint altitude.
  - Continue the mission in reverse, exactly as though Return mode was triggered in mission mode (above)
- **Manual modes:** Fly directly to home location and land.

If no mission is defined PX4 will fly directly to home location and land (rally points are ignored).

If the mission changes during return mode, then the behaviour is re-evaluated based on the new mission following the same rules as above (e.g. if the new mission has no landing sequence and you're in a mission, the mission is reversed).

<span id="safety_point_return"></span>

### Closest Safe Destination Return Type (RTL_TYPE=3)

In this return type the vehicle:

- Ascends to a safe [return altitude](#return_altitude) (above any expected obstacles).
- Flies a direct path to the closest destination of: home location, mission landing pattern or rally point.
- If the destination is a mission landing pattern the vehicle will follow the pattern to land
- If the destination is a home location or rally point, the vehicle will descend to the descent altitude ([RTL_DESCEND_ALT](#RTL_DESCEND_ALT)) and then [Land or waits](#arrival).

<span id="return_altitude"></span>

## Return Altitude

A vehicle will usually first ascend to a safe altitude before returning, in order to avoid any obstacles between it and the destination.

:::note
This is true for most [return types](#return_types). The exception is when executing a [mission path return](#mission_path_return) from within a mission, where the vehicle follows mission waypoints (we can assume these avoid any obstacles).
:::

The return altitude for a fixed-wing vehicle is configured using the parameter [RTL_RETURN_ALT](#RTL_RETURN_ALT). The return altitude for multicopter and VTOL vehicles is configured using the parameters [RTL_RETURN_ALT](#RTL_RETURN_ALT) and [RTL_CONE_ANG](#RTL_CONE_ANG), which define a half cone centered around the destination (home location or safety point).

![Return mode cone](../../assets/flying/rtl_cone.jpg)

<!-- Original draw.io diagram can be found here: https://drive.google.com/file/d/1W72XeZYSOkRlBSbPXCCiam9NMAyAWSg-/view?usp=sharing -->

If the vehicle is:

- Above [RTL_RETURN_ALT](#RTL_RETURN_ALT) (1) it will return at its current altitude.
- Below the cone it will return where it intersects the cone (2) or [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (whichever is higher).
- Outside the cone (3) it will first climb until it reaches [RTL_RETURN_ALT](#RTL_RETURN_ALT).
- Inside the cone: 
  - Above [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (4) it will return at its current altitude.
  - Below [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) (5) it will first ascend to `RTL_DESCEND_ALT`.

Note:

- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 0 degrees there is no "cone": 
  - the vehicle returns at `RTL_RETURN_ALT` (or above).
- If [RTL_CONE_ANG](#RTL_CONE_ANG) is 90 degrees the vehicle will return at the greater of `RTL_DESCEND_ALT` and the current altitude.
- The vehicle will always ascend at least [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) for the return.

<span id="arrival"></span>

## Hover/Landing at Destination

Unless executing a mission landing (e.g. if executing a [home location return](#home_return) or [closest safe destination return](#safety_point_return)), the vehicle will arrive at its destination, and rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude.

The vehicle will the loiter for a specified time ([RTL_LAND_DELAY](#RTL_LAND_DELAY)) and then land. If [RTL_LAND_DELAY=-1](#RTL_LAND_DELAY) it will loiter indefinitely.

<span id="default_configuration"></span>

## Vehicle Default Behaviour

The mode is *implemented* in almost exactly the same way in all vehicle types (the exception being that fixed wing vehicles will circle rather than hover when waiting), and are hence tuned using the same parameters.

However the *default configuration* is tailored to suit the vehicle type, as described below.

### Multi-Copter (MC)

Multicopters use a [home location return](#home_return) by default (and the following configuration):

- Ascend to [RTL_RETURN_ALT](#RTL_RETURN_ALT) ([RTL_CONE_ANG=0](#RTL_CONE_ANG) - cone not used).
- Fly to the home position in a straight line and constant altitude (if already above the return altitude it will return at its current altitude).
- Rapidly descend to the [RTL_DESCEND_ALT](#RTL_DESCEND_ALT) altitude.
- Land more or less immediately (small [RTL_LAND_DELAY](#RTL_LAND_DELAY)).

### Fixed Wing (FW)

Fixed-wing aircraft use a [mission landing return type](#mission_landing_return) by default:

- If a mission landing is defined, fly direct to the mission landing start point and then land.
- Otherwise fly directly to the home position and circle above it at radius [NAV_LOITER_RAD](#NAV_LOITER_RAD).

If not following a mission landing, and [RTL_LAND_DELAY](#RTL_LAND_DELAY) is set to -1, the vehicle will land as described in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

The fixed wing [safe return altitude](#return_altitude) depends only on [RTL_RETURN_ALT](#RTL_RETURN_ALT) (the cone defined by [RTL_CONE_ANG](#RTL_CONE_ANG) is not used)

RC stick movement is ignored.

### VTOL

VTOL aircraft use a [mission landing return type](#mission_landing_return) by default:

- If a mission landing is defined, fly direct to the mission landing start point and then land.
- Otherwise fly directly to the home position, transition to multicopter mode, and land as a multicopter.
  
:::note
If not in a mission landing, a VTOL in FW mode will *always* transition back to MC just before landing (ignoring [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)).
:::

## Parameters

The RTL parameters are listed in [Parameter Reference > Return Mode](../advanced_config/parameter_reference.md#return-mode) (and summarised below).

| Parameter                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RTL_TYPE"></span>[RTL_TYPE](../advanced_config/parameter_reference.md#RTL_TYPE)                  | Return mechanism (path and destination).  
`0`: Return to a rally point or home (whichever is closest) via direct path.  
`1`: Return to a rally point or the mission landing pattern start point (whichever is closest), via direct path. If neither mission landing or rally points are defined return home via a direct path. If the destination is a mission landing pattern, follow the pattern to land.  
`2`: Use mission path fast-forward to landing if a landing pattern is defined, otherwise fast-reverse to home. Ignore rally points. Fly direct to home if no mission plan is defined.  
`3`: Return via direct path to closest destination: home, start of mission landing pattern or safe point. If the destination is a mission landing pattern, follow the pattern to land. |
| <span id="RTL_RETURN_ALT"></span>[RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | Return altitude in meters (default: 60m) when [RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG) is 0. If already above this value the vehicle will return at its current altitude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <span id="RTL_DESCEND_ALT"></span>[RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | Minimum return altitude and altitude at which the vehicle will slow or stop its initial descent from a higher return altitude (default: 30m)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <span id="RTL_LAND_DELAY"></span>[RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | Time to hover at `RTL_DESCEND_ALT` before landing (default: 0.5s) -by default this period is short so that the vehicle will simply slow and then land immediately. If set to -1 the system will loiter at `RTL_DESCEND_ALT` rather than landing. The delay is provided to allow you to configure time for landing gear to be deployed (triggered automatically).                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <span id="RTL_MIN_DIST"></span>[RTL_MIN_DIST](../advanced_config/parameter_reference.md#RTL_MIN_DIST)       | Minimum horizontal distance from home position to trigger ascent to the return altitude specified by the "cone". If the vehicle is horizontally closer than this distance to home, it will return at its current altitude or `RTL_DESCEND_ALT` (whichever is higher) instead of first ascending to RTL_RETURN_ALT).                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <span id="RTL_CONE_ANG"></span>[RTL_CONE_ANG](../advanced_config/parameter_reference.md#RTL_CONE_ANG)       | Half-angle of the cone that defines the vehicle RTL return altitude. Values (in degrees): 0, 25, 45, 65, 80, 90. Note that 0 is "no cone" (always return at `RTL_RETURN_ALT` or higher), while 90 indicates that the vehicle must return at the current altitude or `RTL_DESCEND_ALT` (whichever is higher).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <span id="NAV_LOITER_RAD"></span>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)   | [Fixed Wing Only] The radius of the loiter circle (at [RTL_LAND_DELAY](#RTL_LAND_DELAY).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
---
canonicalUrl: https://docs.px4.io/main/en/flying/missions
---

# Missions

## Planning Missions

Manually planning missions is straightforward:
- Switch to the mission view
- Select the **Add Waypoint** ("plus") icon in the top left. 
- Click on the map to add waypoints.
- Use the waypoint list on the right to modify the waypoint parameters/type
  The altitude indicator on the bottom provides a sense of the relative altitude of each waypoint.
- Once finished, click on the **Upload** button (top right) to send the mission to the vehicle.

You can also use the *Pattern* tool to automate creation of survey grids.

:::tip
For more information see the [QGroundControl User Guide](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html).
:::

![planning-mission](../../assets/flying/planning_mission.jpg)

### Setting Vehicle Yaw

If set, a multi-rotor vehicle will yaw to face the **Heading** value specified in the target waypoint (corresponding to [MAV_CMD_NAV_WAYPOINT.param4](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)).

If **Heading** has not been explicitly set for the target waypoint (`param4=NaN`) then the vehicle will yaw towards a location specified in the parameter [MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE).
By default this is the next waypoint.

Vehicle types that cannot independently control yaw and direction of travel will ignore yaw settings (e.g. Fixed Wing).

### Setting Acceptance/Turning Radius

The *acceptance radius* defines the circle around a waypoint within which a vehicle considers it has reached the waypoint, and will immediately switch to (and start turning towards) the next waypoint.

For a multi-rotor drones, the acceptance radius is tuned using the parameter [NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD).
By default, the radius is small to ensure that multirotors pass above the waypoints, but it can be increased to create a smoother path such that the drone starts to turn before reaching the waypoint.

The image below shows the same mission flown with different acceptance radius parameters:

![acceptance radius comparison](../../assets/flying/acceptance_radius_comparison.jpg)

The speed in the turn is automatically computed based on the acceptance radius (= turning radius) and the maximum allowed acceleration and jerk (see [Jerk-limited Type Trajectory for Multicopters](../config_mc/mc_jerk_limited_type_trajectory.md#auto-mode)).

:::tip
For more information about the impact of the acceptance radius around the waypoint see: [Mission Mode > Inter-waypoint Trajectory](../flight_modes/mission.md#rounded-turns-inter-waypoint-trajectory).
:::

## Flying Missions

Once the mission is uploaded, switch to the flight view.
The mission is displayed in a way that makes it easy to track progress (it cannot be modified in this view). 

![flying-mission](../../assets/flying/flying_mission.jpg)


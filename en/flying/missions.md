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
For more information see the [QGroundControl User Guide](https://docs.qgroundcontrol.com/master/en/PlanView/PlanView.html).
:::

![planning-mission](../../assets/flying/planning_mission.jpg)

### Mission Feasibility Checks

Upon receiving an updated mission file from the ground station, the flight controller runs some feasibility checks that are meant to ensure the safety of the vehicle and catch unintended mission settings. If one of the checks fails, the user is notified and it is not possible to start the mission.

A subset of the most important checks are listed below:
- First mission item too far away from vehicle
- Distance between two subsequent items is too large
- Any mission item conflicts with a plan or safety geofence
- More than one land start mission item defined ([MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START))
- A fixed-wing landing has an infeasible slope angle
- Land start item (`MAV_CMD_DO_LAND_START`) appears in mission before an RTL item ([MAV_CMD_NAV_RETURN_TO_LAUNCH](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_RETURN_TO_LAUNCH))
- Missing takeoff and/or land item when these are configured as a requirement (see parameter list below for configuration)


The relevant parameters are shown below:

Parameter | Description
--- | ---
[MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | The mission will not be started if the current waypoint is more distant than this value from the home position. Disabled if value is 0 or less.
[MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | The mission will not be started if any distance between two subsequent waypoints is greater than this value. Disabled if value is 0 or less.
[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG) | Maximum landing slope angle.
[MIS_TKO_LAND_REQ](../advanced_config/parameter_reference.md#MIS_TKO_LAND_REQ) | Mission takeoff/landing requirement configuration. FW and VTOL both have it set to 2 by default, which means that the mission has to contain a landing.

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


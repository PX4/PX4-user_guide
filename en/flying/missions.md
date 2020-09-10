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

> **Tip** For more information see the [QGroundControl User Guide](https://docs.qgroundcontrol.com/en/PlanView/PlanView.html).

![planning-mission](../../assets/flying/planning_mission.jpg)

### Setting Vehicle Yaw

If set, a multi-rotor vehicle will yaw to face the **Heading** value specified in the target waypoint (corresponding to [MAV_CMD_NAV_WAYPOINT.param4](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)).

If **Heading** has not been explicitly set for the target waypoint (`param4=NaN`) then the vehicle will yaw towards a location specified in the parameter [MPC_YAW_MODE](../advanced_config/parameter_reference.md#MPC_YAW_MODE).
By default this is the next waypoint.

Vehicle types that cannot independently control yaw and direction of travel will ignore yaw settings (e.g. Fixed Wing).

## Flying Missions

Once the mission is uploaded, switch to the flight view.
The mission is displayed in a way that makes it easy to track progress (it cannot be modified in this view). 

![flying-mission](../../assets/flying/flying_mission.jpg)


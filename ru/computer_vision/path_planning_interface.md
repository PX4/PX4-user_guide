---
canonicalUrl: https://docs.px4.io/main/ru/computer_vision/path_planning_interface
---

# Path Planning Interface

PX4 uses a number of MAVLink interfaces for integrating path planning services from a companion computer (including obstacle avoidance in missions, [safe landing](../computer_vision/safe_landing.md), and future services):

- There are two [MAVLink Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) interfaces: 
  - [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS): Used by PX4 to send the *desired path*. May be used by path planning software to send PX4 a stream of setpoints for the *planned path*.
  - [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) may (alternatively) be used by path planning software to send PX4 the *planned path* as a bezier curve. The curve indicates the (moving) position setpoint of the vehicle over a given time period.
- The [HEARTBEAT/Connection Protocol](https://mavlink.io/en/services/heartbeat.html) is used for "proof of life" detection.
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) and [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) send the vehicle local position and altitude, respectively.

Path planning is enabled on PX4 in automatic modes (landing, takeoff, hold, mission, return) if [COM_OBS_AVOID=1](../advanced_config/parameter_reference.md#COM_OBS_AVOID). In these modes planning software is expected to supply setpoints to PX4; if the software cannot support a particular flight mode it must mirror back setpoints from the vehicle.

:::tip
The message flows from PX4 UORB topics, through MAVLink, to ROS and back again are all documented in: [PX4/avoidance > Message Flows](https://github.com/PX4/avoidance#message-flows).
:::

All services that use this interface send and receive messages of the same type/format. Developers can therefore use this interface to create their own new companion-side path planning services, or tweak the existing planner software.

:::note
The [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) is recommended for developing path planning software. It comes with [PX4 avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) software pre-installed, and can be used as the base for your own algorithms.
:::

## PX4 Configuration

Path planning is activated in PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

## Companion Computer Setup

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

The actual setup/configuration required depends on the planner being used.

:::warning
Only one planner can run on the companion computer at a time (at time of writing). This means that offboard features that use different planners cannot be enabled on the same vehicle. a vehicle at the same time (e.g. a vehicle can support obstacle avoidance and collision prevent, but not also safe landing - or visa versa).
:::

<span id="waypoint_interface"></span>

## Trajectory Interface

PX4 sends information about the *desired path* to the companion computer (when `COM_OBS_AVOID=1`, in *auto* modes), and receives back a stream of setpoints for the *planned path* from the path planning software.

The desired path information is sent by PX4 using [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages, as described below in [PX4 Waypoint Interface](#px4_waypoint_interface).

Path planner software sends back setpoints for the *planned path* using either `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [Companion Waypoint Interface](#companion_waypoint_interface)) or [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) (see [Companion Bezier Trajectory Interface](#bezier_interface)). The difference is that the waypoint just specifies the next setpoint destination, while the bezier trajectory describes the exact vehicle motion (i.e. a setpoint that moves in time).

:::warning
Route planning software should not mix these interfaces while executing a task (PX4 will use the last received message of either type).
:::

<span id="px4_waypoint_interface"></span>

### PX4 Waypoint Interface

PX4 sends the desired path in [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages at 5Hz.

The fields set by PX4 as shown:

- `time_usec`: UNIX Epoch time.
- `valid_points`: 3
- Point 0 - Current waypoint *type adapted* by FlightTaskAutoMapper (see [notes below](#type_adapted)): 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: Type adapted x-y-z NED local position of *current* mission waypoint.
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: Type adapted x-y-z NED local velocity of *current* mission waypoint.
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Current yaw angle
  - `vel_yaw[0]`: NaN
  - `command[0]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the current waypoint. 
- Point 1 - Current waypoint (Unmodified/not type adapted)): 
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED local position of *current* mission waypoint
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: Yaw setpoint
  - `vel_yaw[1]`: Yaw speed setpoint
  - `command[1]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the current waypoint.
- Point 2 - Next waypoint in local coordinates (unmodified/not type adapted): 
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED local position of *next* mission waypoint
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: Yaw setpoint
  - `vel_yaw[2]`: Yaw speed setpoint
  - `command[2]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the next waypoint.
- All other indices/fields are set as NaN.

<span id="type_adapted"></span>
Notes:

- Point 0 is the current waypoint/target modified based on the type of target. For example, it makes sense when landing to specify the target x, y coordinates and a descent velocity. To achieve this `FlightTaskAutoMapper` modifies land waypoints in Point 0 to set the z component of position to NAN and the z-velocity to a desired value.
- Point 1 and 2 are not used by the safe landing planner.
- Point 1 is used by local and global planner.

<span id="companion-failure-handling"></span>

#### Handling of Companion Failure

PX4 safely handles the case where messages are not received from the offboard system:

- If no planner is running and `COM_OBS_AVOID` is enabled at/from boot: 
  - preflight checks will fail (irrespective of vehicle mode) and it won't fly until `COM_OBS_AVOID` is set to 0.
- If no planner is running and `COM_OBS_AVOID` is enabled after boot: 
  - the vehicle will run normally in manual modes.
  - if you switch to an autonomous mode (e.g. Land Mode) it will immediately fall back to [Hold mode](../flight_modes/hold.md).
- When external path planning is enabled: 
  - if the `HEARTBEAT` is lost PX4 will emit a status message (which is displayed in *QGroundControl*) stating either "Avoidance system lost" or "Avoidance system timeout" (depending on the vehicle state). This is irrespective of the current flight mode.
  - if a trajectory message is not received for more than 0.5 seconds and the vehicle is in an autonomous mode (Return, Mission, Takeoff, Land), the vehicle will switch into [Hold mode](../flight_modes/hold.md). :::note A planner must always provide points in this timeframe.
  - A planner will mirror back setpoints it receives when the vehicle is in a mode/state for which it doesn't provide path planning. (i.e. the vehicle will follow its desired path, delayed by a very small amount).
:::
  - If the execution time of the last-supplied bezier trajectory expires during path planning (when using the [Bezier Trajectory Interface](#bezier_interface)), this is treated the same as not getting a new message within 0.5 seconds (i.e. vehicle switches to [Hold mode](../flight_modes/hold.md)).

<span id="companion_waypoint_interface"></span>

## Companion Waypoint Interface

The path planning software (running on the companion computer) *may* send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages that have the setpoint in Point 0.

The fields for the messages from the companion computer are set as shown:

- `time_usec`: UNIX Epoch time.
- `valid_points`: 1
- Current vehicle information: 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED vehicle local position setpoint
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED velocity setpoint
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Yaw angle setpoint
  - `vel_yaw[0]`: Yaw speed setpoint
  - `command[0]`: NaN.
- All other indices/fields are set as NaN.

A planner that implements this interface must:

- Emit setpoints at more than 2Hz when receiving messages from PX4. PX4 will enter [Hold mode](../flight_modes/hold.md) if no message is received for more than 0.5s.
- Mirror back setpoints it receives when it doesn't support planning for the current vehicle state (e.g. the local planner would mirror back messages sent during safe landing, because it does not support Land mode).

<span id="bezier_interface"></span>

## Companion Bezier Trajectory Interface

The path planning software (running on the companion computer) *may* send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) messages.

The message defines the path that the vehicle should follow in terms of a curve (defined by the control points), starting at the message `timestamp` and reaching the final point after time `delta`. PX4 calculates its new setpoint (the expected current position/velocity/acceleration along the curve) using the time that the message was sent, the current time, and the total time for the curve (delta).

:::note
For example, say the message was sent 0.1 seconds ago and `delta` (curve duration) is 0.3s. PX4 can calculate its setpoint at the 0.1s position in the curve.
:::

In more detail, the `TRAJECTORY_REPRESENTATION_BEZIER` is parsed as follows:

- The number of bezier control points determines the degree of the bezier curve. For example, 3 points makes a quadratic bezier curve with constant acceleration.
- The bezier curve must be the same degree in x, y, z, and yaw, with all bezier control points finite
- The `delta` array should have the value corresponding with the last bezier control point indicate the duration that the waypoint takes to execute the curve to that point, from beginning to end. Other values in the `delta` array are ignored.
- The timestamp of the MAVLink message should be the time that the curve starts, and communication delay and clock mismatch will be compensated for on the flight controller via the timesync mechanism.
- The control points should all be specified in local coordinates ([MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
- Bezier curves expire after the execution time of the bezier curve has been reached. Ensure that new messages are sent at a high enough rate/with long enough execution time that this does not happen (or the vehicle will switch to Hold mode).

## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi and @jkflying are the experts! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for MAVLink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->
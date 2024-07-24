# Differential-steering Rovers

<LinkedBadge type="warning" text="Experimental" url="../airframes/#experimental-vehicles"/>

:::warning
Support for rover is [experimental](../airframes/index.md#experimental-vehicles).
Maintainer volunteers, [contribution](../contribute/index.md) of new features, new frame configurations, or other improvements would all be very welcome!
:::


An rover with _differential steering_ controls its direction by moving the left- and right-side wheels at different speeds.
This kind of steering commonly used on bulldozers, tanks, and other tracked vehicles.

::: info
PX4 supports this kind of rover using a generic rover module that was derived from the fixed wing controller.
This is the same code that is used for [Ackermann steering (v1)](../frames_rover/ackermann_rover_v1.md) vehicles.
:::

## PX4 Configuration

1. In the [Airframe](../config/airframe.md) configuration, select either the _Aion Robotics R1 UGV_ or _NXP Cup car: DF Robot GPX_

   ![Select Differential steered airframe](../../assets/config/airframe/airframe_rover_aion.png)

   Select the **Apply and Restart** button.

1. Open the [Actuators Configuration & Testing](../config/actuators.md) and map the left and right motor functions to flight controller outputs.

## Drive Modes

Drive modes (aka "Flight modes") provide autopilot support to make it easier to manually drive the vehicle, to execute autonomous missions, or to defer control to an external system.

PX4 ground vehicles only support [manual mode](#manual-mode), [mission mode](#mission-mode) and [offboard mode](#offboard-mode) (other modes may be offered in a ground station, but these all behave just like manual mode).

### Manual Mode

_Manual mode_ is the only manual mode for ground vehicles on PX4, and requires a manual controller (RC controller, gamepad, joystick etc.).

In this mode, motors are stopped when RC control sticks are centered.
To move the vehicle you move the sticks outside of the center.

As soon as you release the control sticks they will return to the center deadzone.
This will turn off the motors and center the wheels.
There is no active braking, so the vehicle may continue to move until its momentum dissipates.

### Mission Mode

[Mission mode](../flight_modes/mission.md) is an automatic mode that causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) plan that has been uploaded to the flight controller.
The mission is typically created and uploaded with a Ground Control Station (GCS) application, such as [QGroundControl](https://docs.qgroundcontrol.com/master/en/).

### Offboard Mode

[Offboard mode](../flight_modes/offboard.md) causes the vehicle to obey position, velocity, or attitude, setpoints provided over MAVLink.
Not all setpoint types make sense for a ground vehicle, or are supported.

::: info
This mode is intended for vehicle control from companion computers and ground stations!
:::



## Simulation

[Gazebo Classic](../sim_gazebo_classic/index.md) provides the following simulations for vehicles with differential steering:

- [r1 rover](../sim_gazebo_classic/vehicles.md#differential-ugv)

# Helicopter Configuration

This section contains topics related to helicopter configuration and tuning.

:::note
Helicopters are less well-supported than other types of vehicles.
We would welcome your [contribution](../contribute/README.md) of new features, new frame configurations, or other improvements.
:::

## Supported Configurations

Supported helicopter configurations:

- Single main rotor with any type of swash-plate and an ESC tail rotor.


## Setup

To setup and configure a helicopter: 

1. Select the helicopter [Airframe](../config/airframe.md) in QGroundControl
1. Configure actuator geometry: [Actuator Configuration and Testing > Geometry: Helicopter](../config/actuators.md#geometry-helicopter)
1. Remove the rotor blades and propellers
1. Assign motors and servos to outputs and test (also in [Actuator configuration](../config/actuators.md)):

   1. Assign the [motors and servos to the outputs](../config/actuators.md#actuator-outputs).
   1. Power the vehicle with a battery and use the [actuator testing sliders](../config/actuators.md#actuator-testing) to validate correct servo and motor assignment and direction.
1. Using an RC in [Acro mode](../flight_modes/acro_mc.md), verify the correct movement of the swash-plate:

   - Moving the roll stick to the right should tilt the swash-plate to the right.
   - Moving the pitch stick forward should tilt the swash-plate forward.
1. Arm the vehicle and check the main rotor spins up slowly.
   Adjust the throttle spoolup time as needed.
   You can also adjust the throttle curve with the parameters [CA_HELI_THR_Cx](../advanced_config/parameter_reference.md#CA_HELI_THR_C0).
   The default is constant, maximum throttle (suitable for most setups).
3. Disarm again and power off.
4. Put the rotor blades on and power the vehicle.
5. Configure the collective pitch curve using the parameters [CA_HELI_PITCH_Cx](../advanced_config/parameter_reference.md#CA_HELI_PITCH_C0).
  Set the minimum and maximum according to the minimum and maximum blade angles you want.
  Make sure the minimum is low enough so the vehicle can still descend.
  Instead start off with a too low value.
  The default is slightly negative for that reason and should be a good starting point.

## Tuning

After completing the previous steps you are ready to arm with blades mounted.

First tune the [rate controller](#rate-controller) and [yaw compensation](#yaw-compensation) as shown in the following sections (these are helicopter-specific).

Attitude, velocity, and position controller tuning is then performed in the [same as for multicopters](../config_mc/README.md).

Note that autotuning is not supported/tested (at time of writing).

### Rate Controller

The rate controller should be tuned in [Acro mode](../flight_modes/acro_mc.md), but can also be done in [Stabilized mode](../flight_modes/manual_stabilized_mc.md) if you cannot fly Acro mode.

Start off with disabled rate controller gains, and only some feedforward:

```
param set MC_ROLLRATE_P 0
param set MC_ROLLRATE_I 0
param set MC_ROLLRATE_D 0
param set MC_ROLLRATE_FF 0.1
param set MC_PITCHRATE_P 0
param set MC_PITCHRATE_I 0
param set MC_PITCHRATE_D 0
param set MC_PITCHRATE_FF 0.1
```

Take off slowly and provide some roll and stick movements.
Use the QGC tuning UI to check the response:

![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)

Increase the FF gains until the response reaches the setpoint when giving a step input.

Then enable the PID gains.
Start off with `P=FF/4`, `I=0.2` and `D=0.001`.
Then increase the `P` and `D` gains as needed until it tracks well.
It is expected that the `P` gain is considerably smaller than the `FF` gain.

### Yaw Compensation

There are two parameters to compensate yaw for the main rotor's collective and throttle.
A negative value is needed when positive thrust of the tail rotor rotates the vehicle opposite to the main rotor turn direction.

TODO: add log + explain


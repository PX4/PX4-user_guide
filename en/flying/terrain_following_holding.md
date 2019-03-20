# Terrain Following/Holding

PX4 supports *Terrain Following* and *Terrain Hold* on **multicopters** that have a [distance sensor](../sensor/rangefinders.md).

The features are available in manual altitude-control modes: [Position](../flight_modes/position_mc.md), [Altitude](../flight_modes/altitude_mc.md).
They are not available in acrobatic modes or automatic modes (e.g. Return, Land, Mission, etc.).

## Terrain Following

Terrain-following allows a low-flying vehicle to automatically maintain a (relatively) constant altitude above ground level.
It is useful for avoiding obstacles when traveling over varied terrain, and for maintaining constant height for aerial photography.

In this mode:
- At low altitude the vehicle moves up and down with terrain height variation (using the distance sensor for altitude data while within its effective range).
- At higher altitudes the vehicle will typically fly at a near-constant height above mean sea level (AMSL) using the barometer for altitude data.
  > **Note** More precisely, the vehicle will use the *primary source of altitude data* as defined in [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE).
    This is, by default, the barometer.

## Terrain Hold

Terrain-holding helps a vehicle to better hold/track altitude in [Position](../flight_modes/position_mc.md) or [Altitude](../flight_modes/altitude_mc.md) modes when horizontally stationary at low altitude.
This allows a vehicle to avoid altitude changes due to barometer drift or excessive baro interference from rotor wash.

In this mode:
- When stationary (horizontally) the vehicle uses the distance sensor for altitude data (while within its effective range).
- When moving (`speed > MPC_HOLD_MAX_XY`) or at higher altitudes the vehicle gets altitude data from the *primary source of altitude data* ( [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)).


> **Tip** *Range Aid* ([EKF2_RNG_AID=1](../advanced_config/parameter_reference.md#EKF2_RNG_AID)) has similar behaviour to terrain hold, but operates in all flight modes.


## Setup

Both terrain following and hold features require a [distance sensor](../sensor/rangefinders.md).
Set up and activation/enabling of the sensor depends on the specific device (see docs for each sensor).
The generic configuration that is common to all rangefinders (e.g. setting the position offset relative to the frame) is covered in [Distance Sensor > Configuration/Setup](../sensor/rangefinders.md#configuration).

Terrain following and holding are then enabled using [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE):
- `MPC_ALT_MODE=1` - Terrain Following enabled
- `MPC_ALT_MODE=2` - Terrain Holding enabled

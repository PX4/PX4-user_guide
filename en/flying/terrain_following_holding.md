# Terrain Following/Holding & Range Aid

PX4 supports [Terrain Following](#terrain_following) and [Terrain Hold](#terrain_hold) in [Position](../flight_modes/position_mc.md) and [Altitude modes](../flight_modes/altitude_mc.md), on *multicopters* and *VTOL vehicles in MC mode* that have a [distance sensor](../sensor/rangefinders.md).

PX4 also supports [using a distance sensor as the primary source of altitude data](#distance_sensor_primary_altitude_source) in any mode, either all the time, or just when flying at low altitudes at low velocities ([Range Aid](#range_aid)).


## Terrain Following {#terrain_following}

When *terrain following* is enabled, a vehicle will automatically maintain a relatively constant height above *ground level* if traveling at low altitudes.
This is useful for avoiding obstacles and for maintaining constant height (e.g. for aerial photography) when flying over varied terrain.

*Terrain following* uses the output of the EKF estimator to provide the altitude estimate, and the estimated terrain altitude (calculated from distance sensor measurements using another estimator) to provide the altitude setpoint.
As the distance to ground changes, the altitude setpoint adjusts to keep the height above ground constant.

At higher altitudes (when the estimator reports that the distance sensor data is invalid) the vehicle switches to *altitude following*, and will typically fly at a near-constant height above mean sea level (AMSL) using the barometer for altitude data.

> **Note** More precisely, the vehicle will use the *primary source of altitude data* as defined in [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE).
    This is, by default, the barometer.

Terrain following is enabled by setting [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE) to `1`.


## Terrain Hold {#terrain_hold}

Terrain holding uses a distance sensor to help a vehicle to better maintain a constant height above ground in [position](../flight_modes/position_mc.md) or [altitude](../flight_modes/altitude_mc.md) modes, when horizontally stationary at low altitude.
This allows a vehicle to avoid altitude changes due to barometer drift or excessive barometer interference from rotor wash.

> **Note** Terrain hold is enabled only in *multicopters* and *VTOL vehicles in MC mode*.

When moving horizontally (`speed >` [MPC_HOLD_MAX_XY](../advanced_config/parameter_reference.md#MPC_HOLD_MAX_XY), or above the altitude where the distance sensor is providing valid data, the vehicle will switch into *altitude following*.

Terrain holding is enabled by setting [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE) to `2`.

> **Note** *Terrain hold* is implemented similarly to *terrain following.
  It uses the output of the EKF estimator to provide the altitude estimate, and the estimated terrain altitude (calculated from distance sensor measurements using separate, single state terrain estimator) to provide the altitude setpoint.
  As the distance to ground changes due to external forces, the altitude setpoint adjusts to keep the height above ground constant.


## Distance Sensor as Primary Source of Height {#distance_sensor_primary_altitude_source}

PX4 allows you to make a distance sensor the *primary source of altitude data*.
This may be useful when no barometer is available, or for applications when the vehicle is *guaranteed* to only fly over a near-flat surface (e.g. indoors).

> **Tip** The default and preferred altitude sensor for most use cases is the barometer (when available).

When using a distance sensor as the primary source of height, fliers should be aware:
- Flying over obstacles can lead to the estimator rejecting rangefinder data (due to internal data consistency checks), which can result in poor altitude holding while the estimator 
  is relying purely on accelerometer estimates.
  > **Note** A scenario where this can occur is when the vehicle is ascending a slope at a near-constant height above ground;
    The altitude measured/estimated from the rangefinder does not change while that from the accelerometer does (i.e. they are not consistent).
- The local NED origin will move up and down with ground level.
- Rangefinder performance over uneven surfaces (e.g. trees) can be very poor, resulting in noisy and inconsistent data.
  This again leads to poor altitude hold.

The feature is enabled by setting: [EKF2_HGT_MODE=2](../advanced_config/parameter_reference.md#EKF2_HGT_MODE).


## Range Aid {#range_aid}

*Range Aid* uses a distance sensor as the primary source of height estimation during low speed/low altitude operation, but will otherwise use the primary source of altitude data defined in [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) - typically the barometer.
It is primarily intended for *takeoff and landing*, in cases where the barometer setup is such that interference from rotor wash is excessive and can corrupt EKF state estimates.

Range aid may also be used to improve altitude hold when the vehicle is stationary.

> **Tip** [Terrain Hold](#terrain_hold) is recommended over *Range Aid* for terrain holding.
  This is because terrain hold uses the normal ECL/EKF estimator for determining height, and this is generally more reliable than a distance sensor in most conditions.

*Range Aid* is enabled by setting [EKF2_RNG_AID=1](../advanced_config/parameter_reference.md#EKF2_RNG_AID) (when the primary source of altitude data ([EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)) is *not* the rangefinder).

Range aid is further configured using the `EKF2_RNG_A_` parameters:
- [EKF2_RNG_A_VMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_VMAX): Maximum horizonatal speed, above which range aid is disabled.
- [EKF2_RNG_A_HMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_HMAX): Maximum height, above which range aid is disabled.
- [EKF2_RNG_A_IGATE](../advanced_config/parameter_reference.md#EKF2_RNG_A_IGATE): Range aid consistency checks "gate" (a measure of the error before range aid is disabled).

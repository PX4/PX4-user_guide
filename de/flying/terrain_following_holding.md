---
canonicalUrl: https://docs.px4.io/main/de/flying/terrain_following_holding
---

# Terrain Following/Holding & Range Aid

PX4 supports [Terrain Following](#terrain_following) and [Terrain Hold](#terrain_hold) in [Position](../flight_modes/position_mc.md) and [Altitude modes](../flight_modes/altitude_mc.md), on *multicopters* and *VTOL vehicles in MC mode* that have a [distance sensor](../sensor/rangefinders.md).

PX4 also supports using a *distance sensor* as the [primary source of altitude data](#distance_sensor_primary_altitude_source) in any mode, either all the time, or just when flying at low altitudes at low velocities ([Range Aid](#range_aid)).

:::note PX4 does not "natively" support terrain following in missions. *QGroundControl* can be used to define missions that *approximately* follow terrain (this just sets waypoint altitudes based on height above terrain, where terrain height at waypoints is obtained from a map database).
:::

<span id="terrain_following"></span>

## Terrain Following

*Terrain following* enables a vehicle to automatically maintain a relatively constant height above ground level when traveling at low altitudes. This is useful for avoiding obstacles and for maintaining constant height when flying over varied terrain (e.g. for aerial photography).

:::tip
This feature can be enabled in [Position](../flight_modes/position_mc.md) and [Altitude modes](../flight_modes/altitude_mc.md), on *multicopters* and *VTOL vehicles in MC mode* that have a [distance sensor](../sensor/rangefinders.md).
:::

When *terrain following* is enabled, PX4 uses the output of the EKF estimator to provide the altitude estimate, and the estimated terrain altitude (calculated from distance sensor measurements using another estimator) to provide the altitude setpoint. As the distance to ground changes, the altitude setpoint adjusts to keep the height above ground constant.

At higher altitudes (when the estimator reports that the distance sensor data is invalid) the vehicle switches to *altitude following*, and will typically fly at a near-constant height above mean sea level (AMSL) using the barometer for altitude data.

:::note
More precisely, the vehicle will use the *primary source of altitude data* as defined in [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE). This is, by default, the barometer.
:::

Terrain following is enabled by setting [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE) to `1`.

<span id="terrain_hold"></span>

## Terrain Hold

*Terrain hold* uses a distance sensor to help a vehicle to better maintain a constant height above ground in altitude control modes, when horizontally stationary at low altitude. This allows a vehicle to avoid altitude changes due to barometer drift or excessive barometer interference from rotor wash.

:::note
This feature can be enabled in [Position](../flight_modes/position_mc.md) and [Altitude modes](../flight_modes/altitude_mc.md), on *multicopters* and *VTOL vehicles in MC mode* that have a [distance sensor](../sensor/rangefinders.md).
:::

When moving horizontally (`speed >` [MPC_HOLD_MAX_XY](../advanced_config/parameter_reference.md#MPC_HOLD_MAX_XY)), or above the altitude where the distance sensor is providing valid data, the vehicle will switch into *altitude following*.

Terrain holding is enabled by setting [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE) to `2`.

:::note
*Terrain hold* is implemented similarly to [terrain following](#terrain_following). It uses the output of the EKF estimator to provide the altitude estimate, and the estimated terrain altitude (calculated from distance sensor measurements using a separate, single state terrain estimator) to provide the altitude setpoint. If the distance to ground changes due to external forces, the altitude setpoint adjusts to keep the height above ground constant.
:::

<span id="distance_sensor_primary_altitude_source"></span>

## Distance Sensor as Primary Source of Height

PX4 allows you to make a distance sensor the *primary source of altitude data* (in any flight mode/vehicle type). This may be useful when no barometer is available, or for applications when the vehicle is *guaranteed* to only fly over a near-flat surface (e.g. indoors).

:::tip
The default and preferred altitude sensor for most use cases is the barometer (when available).
:::

When using a distance sensor as the primary source of height, fliers should be aware:

- Flying over obstacles can lead to the estimator rejecting rangefinder data (due to internal data consistency checks), which can result in poor altitude holding while the estimator is relying purely on accelerometer estimates.
    
:::note
This scenario might occur when a vehicle ascends a slope at a near-constant height above ground, because the rangefinder altitude does not change while that estimated from the accelerometer does.  
    The ECL performs innovation consistency checks that take into account the error between measurement and current state as well as the estimated variance of the state and the variance of the measurement itself. If the checks fail the rangefinder data will be rejected, and the altitude will be estimated from the accelerometer. After 5 seconds of inconsistent data the estimator resets the state (in this case height) to match the current distance sensor data. The measurements might also become consistent again, for example, if the vehicle descends, or if the estimated height drifts to match the measured rangefinder height. <!-- see discussion https://github.com/PX4/px4_user_guide/pull/457#pullrequestreview-221010392 -->
:::

- The local NED origin will move up and down with ground level.

- Rangefinder performance over uneven surfaces (e.g. trees) can be very poor, resulting in noisy and inconsistent data. This again leads to poor altitude hold.

The feature is enabled by setting: [EKF2_HGT_MODE=2](../advanced_config/parameter_reference.md#EKF2_HGT_MODE).

<span id="range_aid"></span>

## Range Aid

*Range Aid* uses a distance sensor as the primary source of height estimation during low speed/low altitude operation, but will otherwise use the primary source of altitude data defined in [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) (typically a barometer). It is primarily intended for *takeoff and landing*, in cases where the barometer setup is such that interference from rotor wash is excessive and can corrupt EKF state estimates.

Range aid may also be used to improve altitude hold when the vehicle is stationary.

:::tip
[Terrain Hold](#terrain_hold) is recommended over *Range Aid* for terrain holding. This is because terrain hold uses the normal ECL/EKF estimator for determining height, and this is generally more reliable than a distance sensor in most conditions.
:::

*Range Aid* is enabled by setting [EKF2_RNG_AID=1](../advanced_config/parameter_reference.md#EKF2_RNG_AID) (when the primary source of altitude data ([EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)) is *not* the rangefinder).

Range aid is further configured using the `EKF2_RNG_A_` parameters:

- [EKF2_RNG_A_VMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_VMAX): Maximum horizontal speed, above which range aid is disabled.
- [EKF2_RNG_A_HMAX](../advanced_config/parameter_reference.md#EKF2_RNG_A_HMAX): Maximum height, above which range aid is disabled.
- [EKF2_RNG_A_IGATE](../advanced_config/parameter_reference.md#EKF2_RNG_A_IGATE): Range aid consistency checks "gate" (a measure of the error before range aid is disabled).
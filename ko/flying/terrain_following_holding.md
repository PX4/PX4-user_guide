# 지형 추적/유지 & 범위 지원

PX4는 *멀티 콥터*에서 [위치](../flight_modes/position_mc.md) 및 [고도 모드](../flight_modes/altitude_mc.md)에서 [지형 추적](#terrain_following) 및 [지형 유지](#terrain_hold), 및 [거리 센서](../sensor/rangefinders.md)가 있는 *MC 모드의 VTOL 차량*를 지원합니다. 

PX4는 모든 모드에서 저속 저고도([범위지원](#range_aid))에서 비행시 [고도 데이터의 기본 소스](#distance_sensor_primary_altitude_source)로 *거리 센서*를사용합니다.

:::note PX4는 임무 모드에서는 지형 추적을 "기본적으로" 지원하지 않습니다. *QGroundControl*을 사용하여 지형을 *대략* 따르는 임무를 정의 할 수 있습니다 (이는 지형 위의 높이를 기준으로 웨이포인트 고도를 설정하며, 웨이포인트의 지형 높이는 지도 데이터베이스에서 가져옴).
:::

<span id="terrain_following"></span>

## 지형 추적

*지형 추적*을 사용하면 기체가 저고도 비행시 지면에서 비교적 일정한 고도를 자동으로 유지할 수 있습니다. 이것은 장애물을 피하고 다양한 지형을 비행시 일정 고도 유지에 유용합니다 (예 : 항공 사진).

이 기능은 [위치 모드](../flight_modes/position_mc.md)와 [고도 모드](../flight_modes/altitude_mc.md), *멀티콥터* 및 [거리 센서](../sensor/rangefinders.md)를 장착한 *MC 모드의 VTOL 기체*에서 사용할 수 있습니다.
:::

*지형 추적*이 활성화되면 PX4는 EKF 추정기의 출력을 사용하여 고도 추정치를 제공하고 추정 지형 고도 (다른 추정기를 사용하여 거리 센서 측정에서 계산)를 제공하여 고도 설정치를 제공합니다. 지면까지의 거리가 변하면, 고도 설정 값이 조정되어지면 위의 높이를 일정하게 유지합니다.

더 높은 고도에서 (추정기가 거리 센서 데이터가 유효하지 않다고보고하는 경우) 기체는 *다음 고도*로 전환되며, 일반적으로 기압계를 사용하여 고도 데이터를 측정하여 평균 해발(AMSL) 위의 거의 일정한 고도로 비행합니다.

:::note
보다 정확하게는 기체는 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)에 정의한 *고도 데이터의 기본 소스*를 사용합니다. 이것은 기본적으로 기압계입니다.
:::

지형 추적은 [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE)를 `1`로 설정하면 활성화됩니다.

<span id="terrain_hold"></span>

## 지형 유지

*지형 유지*는 거리 센서를 사용하여 고도 제어 모드에서 기체가 낮은 고도에서 수평으로 고정되어 있을 때 지면에서 일정한 높이를 유지하도록 도와줍니다. 이를 통해 기체는 기압계 드리프트 또는 로터 세척으로 인한 과도한 기압계 간섭으로 인한 고도 변화를 피할 수 있습니다.

:::note
이 기능은 [위치 모드](../flight_modes/position_mc.md)와 [고도 모드](../flight_modes/altitude_mc.md), *멀티콥터* 및 [거리 센서](../sensor/rangefinders.md)를 장착한 *MC 모드의 VTOL 기체*에서 사용할 수 있습니다.
:::

수평으로 (`속도 >` [MPC_HOLD_MAX_XY](../advanced_config/parameter_reference.md#MPC_HOLD_MAX_XY)) 이동하거나 거리 센서가 유효한 데이터를 제공하는 고도 이상으로 이동할 때 기체는 *추종 고도*로 전환됩니다.

지형 유지는[MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE)를 `2`로 설정하면 활성화됩니다.

:::note
*지형 유지*는 [지형 추적](#terrain_following)과 유사하게 구현됩니다. EKF 추정기의 출력을 사용하여 고도 추정치를 제공하고 추정 지형 고도 (별도의 단일 상태 지형 추정기를 사용하여 거리 센서 측정에서 계산 됨)를 사용하여 고도 설정치를 제공합니다. If the distance to ground changes due to external forces, the altitude setpoint adjusts to keep the height above ground constant.
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
# 정밀 착륙

PX4는 고정 또는 이동 표적에 대한 *멀티콥터*의 정밀 착륙을 지원합니다. 표적은 온보드 IR 센서와 착륙 표지 또는 오프보드 포지셔닝 시스템에 의해 제공될 수 있습니다.

정밀 착륙은 [미션](#mission)의 일부로, [복귀 모드](#return-mode-precision-landing) 착륙 또는 [* Precision Land* 비행 모드](#precision-landing-flight-mode)로 시작할 수 있습니다.

:::note
정밀 착륙은 유효한 전역 위치에서만 가능합니다(현재 위치 컨트롤러 구현의 제한으로 인해).
:::

## 개요

### 착륙 모드

정밀 착륙은 "필수" 또는 "가능성 탐색"으로 설정 가능합니다. 선택한 모드에 따라 정밀착륙 매커니즘은 달라집니다.

#### 필수 모드

*필수 모드*에서 착륙을 시작할 때 아무런 신호를 찾을 수 없으면 기체는 목표물을 찾기 시작합니다. 목표물을 찾은 경우에는 기체는 정밀 착륙을 실행합니다.

이런 탐색 과정은 탐색 고도까지 상승을 포함합니다([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). 기체가 목표물을 탐색 고도에서 찾을 수 없고, 탐색시간 초과 ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT))이후에는 현재 위치에서 일반 착륙을 시작합니다.

:::note
오프보드 포지셔닝 시스템을 사용하는 경우 PX4는 MAVLink [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) 메시지를 수신할 때 대상이 보인다고 가정합니다.
:::

#### 가능성 탐색 모드

*가능성 탐색 모드*에서는 기체가 착륙이 시행될 때 목표물이 가시적이면 정밀 착륙을 시작합니다. 목표물이 보이지 않으면, 기체는 즉시 현재 위치에서 *일반* 착륙을 수행합니다.

### 착륙 과정

정밀 착륙에는 세 단계가 있습니다.

1. **수평 접근 방식:** 기체는 현재 고도를 유지하면서 목표물에 수평으로 접근합니다. 기체에 대한 목표물 위치가 임계값([PLD_HACC_RAD ](../advanced_config/parameter_reference.md#PLD_HACC_RAD)) 미만인 경우 다음 단계가 입력됩니다. 이 단계에서 목표물이 일정 시간([PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT) 이상의 시간) 동안 잡히지 않으면, 탐색 과정이 시작되거나 (정밀 착륙이 "필수" 모드일 때,) 기체는 일반 착륙을 수행합니다 ( "가능성 탐색" 정밀 착륙 모드일 때).

2. **목표물 위로 하강:** 기체는 목표물의 중앙에 위치하여 하강합니다. 이 단계에서 목표물이 일정 시간(`PLD_BTOUT` 이상의 시간) 동안 잡히지 않으면, 탐색 과정이 시작되거나 (정밀 착륙이 "필수" 모드일 때,) 기체는 일반 착륙을 수행합니다 ( "가능성 탐색" 정밀 착륙 모드일 때).

3. **최종 접근 방식:** 기체가 지면과 가까울 때 ([PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), 기체는 목표물의 중앙에 위치하여 하강합니다. 만약 목표물이 이 단계에서 잡히지 않는다면, 기체는 정밀 착륙의 모드와 무관하게 계속 하강합니다.

검색 절차는 첫 번째 및 두 번째 단계에서 시작되며, 최대 [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH)회 실행됩니다. 착륙 단계 흐름도

단계를 보여주는 [착륙 단계 흐름도](#landing-phases-flow-diagram)는 아래와 같습니다.

## 정밀 착륙 수행

Precision landing can be used in missions, during the landing phase in *Return mode*, or by entering the *Precision Land* mode.

<span id="mission"></span>

### Mission Precision Landing

Precision landing can be initiated as part of a [mission](../flying/missions.md) using [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) with `param2` set appropriately:

- `0`: Normal landing without using the target.
- `1`: [Opportunistic](#opportunistic-mode) precision landing.
- `2`: [Required](#required-mode) precision landing.

### Return Mode Precision Landing

Precision landing can be used in the [Return mode](../flight_modes/return.md) landing phase.

This is enabled using the parameter [RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD), which takes the following values:

- `0`: Precision landing disabled (land as normal).
- `1`: [Opportunistic](#opportunistic-mode) precision landing.
- `2`: [Required](#required-mode) precision landing.

### Precision Landing Flight Mode

Precision landing can be enabled by switching to the *Precision Landing* flight mode.

You can verify this using the [*QGroundControl* MAVLink Console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) to enter the following command:

    commander mode auto:precland
    

:::note
When switching to the mode in this way, the precision landing is always "required"; there is no way to specify the type of landing.
:::

:::note
At time of writing is no *convenient* way to directly invoke precision landing (other than commanding return mode):

- *QGroundControl* does not provide it as a UI option.
- [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) only works in missions.
- [MAV_CMD_SET_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MODE) should work, but you will need to determine the appropriate base and custom modes used by PX4 to represent the precision landing mode.
:::

## Hardware Setup

### IR Sensor/Beacon Setup

The IR sensor/landing beacon solution requires an [IR-LOCK Sensor](https://irlock.com/products/ir-lock-sensor-precision-landing-kit) and downward facing [distance sensor](../sensor/rangefinders.md) connected to the flight controller, and an IR beacon as a target (e.g. [IR-LOCK MarkOne](https://irlock.com/collections/markone)). This enables landing with a precision of roughly 10 cm (GPS precision, by contrast, may be as large as several meters).

Install the IR-LOCK sensor by following the [official guide](https://irlock.readme.io/v2.0/docs). Ensure that the sensor's x axis is aligned with the vehicle's y axis and the sensor's y axis aligned with the vehicle's -x direction (this is the case if the camera is pitched down 90 degrees from facing forward).

Install a [range/distance sensor](../getting_started/sensor_selection.md#distance) (the *LidarLite v3* has been found to work well).

:::note
Many infrared based range sensors do not perform well in the presence of the IR-LOCK beacon. Refer to the IR-LOCK guide for other compatible sensors.
:::

## Offboard Positioning

The offboard solution requires a positioning system that implements the MAVLink [Landing Target Protocol](https://mavlink.io/en/services/landing_target.html). This can use any positioning mechanism to determine the landing target, for example computer vision and a visual marker.

The system must publish the coordinates of the target in the [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) message. Note that PX4 *requires* `LANDING_TARGET.frame` to be [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and only populates the fields `x`, `y`, and `z`. The origin of the local NED frame [0,0] is the home position (you can map this home position to global coordinates using [GPS_GLOBAL_ORIGIN](https://mavlink.io/en/messages/common.html#GPS_GLOBAL_ORIGIN)).

PX4 does not explicitly require a [distance sensor](../sensor/rangefinders.md) or other sensors, but will perform better if it can more precisely determine its own position.

## Firmware Configuration

Precision landing requires the modules `irlock` and `landing_target_estimator`. These are included in PX4 firmware by default, for most flight controllers.

They are not included by default on FMUv2-based controllers. On these, and other boards where they are not included, you can add them by setting the following keys to 'y' in the relevant configuration file for your flight controller (e.g. as done here for FMUv5: [PX4-Autopilot/boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.px4board)):

    CONFIG_DRIVERS_IRLOCK=y
    CONFIG_MODULES_LANDING_TARGET_ESTIMATOR=y
    

## PX4 Configuration (Parameters)

The IR-Lock sensor is disabled by default. Enable it by setting [SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) to `1` (true).

[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE) determines if the target is assumed to be stationary or moving. If `LTEST_MODE` is set to moving (e.g. it is installed on a vehicle on which the multicopter is to land), target measurements are only used to generate position setpoints in the precision landing controller. If `LTEST_MODE` is set to stationary, the target measurements are also used by the vehicle position estimator (EKF2 or LPE).

Other relevant parameters are listed in the parameter reference under [Landing_target estimator](../advanced_config/parameter_reference.md#landing-target-estimator) and [Precision land](../advanced_config/parameter_reference.md#precision-land) parameters. Some of the most useful ones are listed below.

| Parameter                                                                                             | Description                                                                                                         |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| <a id="SENS_EN_IRLOCK"></a>[SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) | IR-LOCK Sensor (external I2C). Disable: `0` (default): Enable: `1`).                                                |
| <a id="LTEST_MODE"></a>[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)           | Landing target is moving (`0`) or stationary (`1`). Default is moving.                                              |
| <a id="PLD_HACC_RAD"></a>[PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)     | Horizontal acceptance radius, within which the vehicle will start descending. Default is 0.2m.                      |
| <a id="PLD_BTOUT"></a>[PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)             | Landing Target Timeout, after which the target is assumed lost. Default is 5 seconds.                               |
| <a id="PLD_FAPPR_ALT"></a>[PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)   | Final approach altitude. Default is 0.1 metres.                                                                     |
| <a id="PLD_MAX_SRCH"></a>[PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH)     | Maximum number of search attempts in an required landing.                                                           |
| <a id="RTL_PLD_MD"></a>[RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD)         | RTL precision land mode. `0`: disabled, `1`: [Opportunistic](#opportunistic-mode), `2`: [Required](#required-mode). |

### IR Beacon Scaling

Measurement scaling may be necessary due to lens distortions of the IR-LOCK sensor.

[LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X) and [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y) can be used to scale beacon measurements before they are used to estimate the beacon's position and velocity relative to the vehicle. Note that `LTEST_SCALE_X` and `LTEST_SCALE_Y` are considered in the sensor frame, not the vehicle frame.

To calibrate these scale parameters, set `LTEST_MODE` to moving, fly your multicopter above the beacon and perform forward-backward and left-right motions with the vehicle, while [logging](../dev_log/logging.md#configuration) `landing_target_pose` and `vehicle_local_position`. Then, compare `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel` to `vehicle_local_position.vx` and `vehicle_local_position.vy`, respectively (both measurements are in NED frame). If the estimated beacon velocities are consistently smaller or larger than the vehicle velocities, adjust the scale parameters to compensate.

If you observe slow sideways oscillations of the vehicle while doing a precision landing with `LTEST_MODE` set to stationary, the beacon measurements are likely scaled too high and you should reduce the scale parameter in the relevant direction.

## Simulation

Precision landing with the IR-LOCK sensor and beacon can be simulated in [SITL Gazebo](../simulation/gazebo.md).

To start the simulation with the world that contains a IR-LOCK beacon and a vehicle with a range sensor and IR-LOCK camera, run:

    make px4_sitl gazebo_iris_irlock
    

You can change the location of the beacon either by moving it in the Gazebo GUI or by changing its location in the [Gazebo world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42).

## Operating Principles

### Landing Target Estimator

The `landing_target_estimator` takes measurements from the `irlock` driver as well as the estimated terrain height to estimate the beacon's position relative to the vehicle.

The measurements in `irlock_report` contain the tangent of the angles from the image center to the beacon. In other words, the measurements are the x and y components of the vector pointing towards the beacon, where the z component has length "1". This means that scaling the measurement by the distance from the camera to the beacon results in the vector from the camera to the beacon. This relative position is then rotated into the north-aligned, level body frame using the vehicle's attitude estimate. Both x and y components of the relative position measurement are filtered in separate Kalman Filters, which act as simple low-pass filters that also produce a velocity estimate and allow for outlier rejection.

The `landing_target_estimator` publishes the estimated relative position and velocity whenever a new `irlock_report` is fused into the estimate. Nothing is published if the beacon is not seen or beacon measurements are rejected. The landing target estimate is published in the `landing_target_pose` uORB message.

### Enhanced Vehicle Position Estimation

If the target is specified to be stationary using the parameter `LTEST_MODE`, the vehicle's position/velocity estimate can be improved with the help of the target measurements. This is done by fusing the target's velocity as a measurement of the negative velocity of the vehicle.

### Landing Phases Flow Diagram

This image shows the [landing phases](#landing-phases) as a flow diagram.

![Precision Landing Flow Diagram](../../assets/precision_land/precland-flow-diagram.png)
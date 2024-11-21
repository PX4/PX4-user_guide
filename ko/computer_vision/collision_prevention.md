# 충돌 방지

_Collision Prevention_ may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes_mc/position.md), and can use sensor data from an offboard companion computer, offboard rangefinders over MAVLink, a rangefinder attached to the flight controller, or any combination of the above.

충돌 방지는 센서 범위가 충분히 크지 않으면, 기체의 최대 속도를 제한할 수 있습니다!
또한 센서 데이터를 사용할 수 없는 방향으로의 움직임을 방지합니다 (즉, 후방 센서 데이터가없는 경우 뒤로 비행할 수 없음).

:::tip
If high flight speeds are critical, consider disabling collision prevention when not needed.
:::

:::tip
Ensure that you have sensors/sensor data in all directions that you want to fly (when collision prevention is enabled).
:::

## 개요

_Collision Prevention_ is enabled on PX4 by setting the parameter for minimum allowed approach distance ([CP_DIST](#CP_DIST)).

The feature requires obstacle information from an external system (sent using the MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) and/or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

:::info
Multiple sensors can be used to get information about, and prevent collisions with, objects _around_ the vehicle.
If multiple sources supply data for the _same_ orientation, the system uses the data that reports the smallest distance to an object.
:::

기체는 장애물에 가까워 질 때 속도를 줄이기 위하여 최대 속도를 제한하고 허용된 최소 간격에 도달하면 정지합니다.
장애물에서 멀어지거나 평행하게 이동하려면 사용자는 기체를 장애물에 더 가깝게 만들지 않는 설정 값으로 이동하도록 명령하여야 합니다.
알고리즘은 "더 나은"설정점이 요청된 설정 값의 양쪽에있는 고정된 마진내에 존재한다고 판단되면 설정값 방향을 약간 조정합니다.

Users are notified through _QGroundControl_ while _Collision Prevention_ is actively controlling velocity setpoints.

PX4 소프트웨어 설정은 다음 섹션에서 다룹니다.
If you are using a distance sensor attached to your flight controller for collision prevention, it will need to be attached and configured as described in [PX4 Distance Sensor](#rangefinder).
If you are using a companion computer to provide obstacle information see [companion setup](#companion).

## PX4 소프트웨어 설정

Configure collision prevention by [setting the following parameters](../advanced_config/parameters.md) in _QGroundControl_:

| 매개변수                                                                                                                                                              | 설명                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CP_DIST"></a>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)                                                             | 최소 허용 거리 (기체가 장애물에 접근할 수있는 가장 가까운 거리)를 설정합니다. Set negative to disable _collision prevention_. <br>> **Warning** This value is the distance to the sensors, not the outside of your vehicle or propellers. 충분한 거리를 남겨 두십시오! |
| <a id="CP_DELAY"></a>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)                                                          | 센서 및 속도 설정점 추적 지연을 설정합니다. See [Delay Tuning](#delay_tuning) below.                                                                                                                                                                                            |
| <a id="CP_GUIDE_ANG"></a>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)                         | 해당 방향에서 장애물이 적을 경우 기체가 이탈할 수있는 각도 (명령된 방향의 양쪽으로)를 설정합니다. See [Guidance Tuning](#angle_change_tuning) below.                                                                                                                                |
| <a id="CP_GO_NO_DATA"></a>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | Set to 1 to allow the vehicle to move in directions where there is no sensor coverage (default is 0/`False`).                                                                                                                                              |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)                         | Set to `Direct velocity` or `Smoothed velocity` to enable Collision Prevention in Position Mode (default is `Acceleration based`).                                                                                                                         |

## 알고리즘 설명

모든 센서의 데이터는 기체 주변의 36 개 섹터의 내부 표현으로 통합되며, 각 섹터에는 센서 데이터와 마지막 관찰 시점에 대한 정보 또는 해당 섹터에 대한 데이터를 사용할 수 없다는 표시가 포함됩니다.
기체가 특정 방향으로 이동하도록 명령을 받으면, 해당 방향의 반구에있는 모든 섹터를 확인하여 이동으로 인하여 기체가 장애물에 더 가까워 지는지 확인합니다.
그러한 경우에는, 차량 속도가 제한됩니다.

This velocity restriction takes into account both the inner velocity loop tuned by [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P), as well as the [jerk-optimal velocity controller](../config_mc/mc_jerk_limited_type_trajectory.md) via [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR).
The velocity is restricted such that the vehicle will stop in time to maintain the distance specified in [CP_DIST](#CP_DIST).
각 섹터의 센서 범위도 고려되어 동일한 메커니즘을 통하여 속도를 제한합니다.

:::info
If there is no sensor data in a particular direction, velocity in that direction is restricted to 0 (preventing the vehicle from crashing into unseen objects).
If you wish to move freely into directions without sensor coverage, this can be enabled by setting [CP_GO_NO_DATA](#CP_GO_NO_DATA) to 1.
:::

Delay, both in the vehicle tracking velocity setpoints and in receiving sensor data from external sources, is conservatively estimated via the [CP_DELAY](#CP_DELAY) parameter.
This should be [tuned](#delay_tuning) to the specific vehicle.

If the sectors adjacent to the commanded sectors are 'better' by a significant margin, the direction of the requested input can be modified by up to the angle specified in [CP_GUIDE_ANG](#CP_GUIDE_ANG).
이는 장애물에 걸리지 않고 장애물 주변으로 차량을 '안내'하기 위하여 사용자 입력을 미세 조정하는 데 도움이 됩니다.

### 범위 데이터 손실

If the autopilot does not receive range data from any sensor for longer than 0.5s, it will output a warning _No range data received, no movement allowed_.
이렇게하면 xy의 속도 설정값이 0이 됩니다.
After 5 seconds of not receiving any data, the vehicle will switch into [HOLD mode](../flight_modes_mc/hold.md).
If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes_mc/position.md) (e.g. to _Altitude mode_ or _Stabilized mode_).

여러 센서가 연결되어 있고, 그 중 하나와의 연결이 끊어진 경우에도 보고 센서의 시야 (FOV) 내부를 비행할 수 있습니다.
결함이 있는 센서의 데이터가 만료되고, 이 센서가 포함하는 영역이 커버되지 않은 것으로 처리되므로 그 곳으로 이동할 수 없습니다.

:::warning
Be careful when enabling [CP_GO_NO_DATA=1](#CP_GO_NO_DATA), which allows the vehicle to fly outside the area with sensor coverage.
여러 센서 중 하나라도 연결이 끊어지면 결함이있는 센서의 영역이 무시되어, 제약없이 이동할 수 있습니다.
:::

### CP_DELAY Delay Tuning {#delay_tuning}

There are two main sources of delay which should be accounted for: _sensor delay_, and vehicle _velocity setpoint tracking delay_.
Both sources of delay are tuned using the [CP_DELAY](#CP_DELAY) parameter.

The _sensor delay_ for distance sensors connected directly to the flight controller can be assumed to be 0.
외부 비전 기반 시스템의 경우 센서 지연이 최대 0.2 초 일 수 있습니다.

Vehicle _velocity setpoint tracking delay_ can be measured by flying at full speed in [Position mode](../flight_modes_mc/position.md), then commanding a stop.
실제 속도와 속도 설정점 사이의 지연은 로그에서 측정할 수 있습니다.
추적 지연은 일반적으로 기체 크기와 튜닝에 따라 0.1 초에서 0.5 초 사이입니다.

:::tip
If vehicle speed oscillates as it approaches the obstacle (i.e. it slows down, speeds up, slows down) the delay is set too high.
:::

### CP_GUIDE_ANG Guidance Tuning {#angle_change_tuning}

차량, 환경 유형 및 조종사의 기술에 따라 각기 다른 가이던스가 필요할 수 있습니다.
Setting the [CP_GUIDE_ANG](#CP_GUIDE_ANG) parameter to 0 will disable the guidance, resulting in the vehicle only moving exactly in the directions commanded.
이 매개 변수를 높이면 기체가 장애물을 피할 수 있는 최적의 방향을 선택할 수 있으므로 좁은 틈새를 더 쉽게 통과하고 물체를 돌아 다니는 동안 최소 거리를 정확하게 유지할 수 있습니다.

이 매개 변수가 너무 작으면 장애물에 가까워 졌을 때 기체가  '고착'된 느낌을 받을 수 있습니다. 장애물에서 멀어지는 이동만 허용되기 때문입니다.
매개 변수가 너무 크면 운전자가 지시하지 않은 방향으로 기체가 장애물에서 멀어지는 것처럼 느껴질 수 있습니다.
테스트에서 30도는 적절한 값이지만,  기체마다 값이 달라질 수 있습니다.

:::info
The guidance feature will never direct the vehicle in a direction without sensor data.
단 하나의 거리 센서만 전방을 향하고 있는 상태에서 기체가 '고착'된 느낌이 드는 경우, 이는 정보 부족으로 인하여 가이던스가 방향을 안전하게 조정할 수 없기 때문일 수 있습니다.
:::

## PX4 Distance Sensor {#rangefinder}

### Lanbao PSK-CM8JL65-CC5

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using [CP_DIST](#CP_DIST)).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

### LightWare LiDAR SF45 Rotating Lidar

PX4 v1.14 (and later) supports the [LightWare LiDAR SF45](https://www.lightwarelidar.com/shop/sf45-b-50-m/) rotating lidar which provides 320 degree sensing.

The SF45 must be connected via a UART/serial port and configured as described below (In addition to the [collision prevention setup](#px4-software-setup)).

[LightWare Studio](https://www.lightwarelidar.com/resources-software) configuration:

- In the LightWare Studio app enable scanning, set the scan angle, and change the baud rate to `921600`.

PX4 Configuration:

- Add the [lightware_sf45_serial](../modules/modules_driver_distance_sensor.md#lightware-sf45-serial) driver in [menuconfig](../hardware/porting_guide_config.md#px4-menuconfig-setup):
  - Under **drivers > Distance sensors** select `lightware_sf45_serial`.
  - Recompile and upload to the flight controller.
- [Set the following parameters](../advanced_config/parameters.md) via QGC:
  - [SENS_EN_SF45_CFG](../advanced_config/parameter_reference.md#SENS_EN_SF45_CFG): Set to the serial port you have the sensor connected to.
    Make sure GPS or Telemetry are not enabled on this port.
  - [SF45_ORIENT_CFG](../advanced_config/parameter_reference.md#SF45_ORIENT_CFG): Set the orientation of the sensor (facing up or down)
  - [SF45_UPDATE_CFG](../advanced_config/parameter_reference.md#SF45_UPDATE_CFG): Set the update rate
  - [SF45_YAW_CFG](../advanced_config/parameter_reference.md#SF45_YAW_CFG): Set the yaw orientation

In QGroundControl you should see an [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message in the [MAVLink console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) if collision prevention is configured correctly and active.

The obstacle overlay in QGC will look like this:

![sf45](../../assets/sf45/sf45_obstacle_map.png)

### Rangefinder Support

다른 센서를 활성화 할 수 있지만, 이를 위해서는 센서 방향과 시야를 설정하기 위하여 드라이버 코드를 수정하여야 합니다.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using [CP_DIST](#CP_DIST).
- 방향을 설정하려면 드라이버를 수정하십시오.
  This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor _module.yaml_ file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the _field of view_ in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
You can see the required modifications from the [feature PR](https://github.com/PX4/PX4-Autopilot/pull/12179).
변경 사항에 기여하여 주십시오!
:::

## Companion Setup {#companion}

If using a companion computer or external sensor, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages, which should reflect when and where obstacle were detected.

The minimum rate at which messages _must_ be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

:::info
Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 10Hz (the maximum rate supported by the vision system).
시스템은 상당히 빠른 속도와 낮은 주파수 거리 업데이트에서 잘 작동 할 수 있습니다.
:::

The tested companion software is the _local_planner_ from the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.
For more information on hardware and software setup see: [PX4/PX4-Avoidance > Run on Hardware](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- hardware platform used for testing not readily available, so have removed -->

The hardware and software should be set up as described in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.
In order to emit `OBSTACLE_DISTANCE` messages you must use the _rqt_reconfigure_ tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo 시뮬레이션

_Collision Prevention_ can be tested using [Gazebo](../sim_gazebo_gz/index.md) with the [x500_lidar_2d](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar) model.
To do this, start a simulation with the x500 lidar model by running the following command:

```sh
make px4_sitl gz_x500_lidar_2d
```

Next, adjust the relevant parameters to the appropriate values and add arbitrary obstacles to your simulation world to test the collision prevention functionality.

The diagram below shows how the simulation looks when viewed in Gazebo.

![RViz image of collision detection using the x500\_lidar\_2d model in Gazebo](../../assets/simulation/gazebo/vehicles/x500_lidar_2d_viz.png)

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->

<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->

<!-- using rangefinder? -->

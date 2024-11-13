# 충돌 방지

_Collision Prevention_ may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes_mc/position.md), and can use sensor data from an offboard companion computer, offboard rangefinders over MAVLink, a rangefinder attached to the flight controller, or any combination of the above.

충돌 방지는 센서 범위가 충분히 크지 않으면, 기체의 최대 속도를 제한할 수 있습니다! 또한 센서 데이터를 사용할 수 없는 방향으로의 움직임을 방지합니다 (즉, 후방 센서 데이터가없는 경우 뒤로 비행할 수 없음).

:::tip
고속 비행이 주 목적인 경우에는 필요하지 않으면 충돌 방지 기능을 비활성화하는 것이 좋습니다.
:::

:::tip
모든 비행 방향으로 센서와 센서 데이터가 있는 지 확인하십시오 (충돌 방지가 활성화된 경우).
:::

## 개요

_Collision Prevention_ is enabled on PX4 by setting the parameter for minimum allowed approach distance ([CP_DIST](#CP_DIST)).

이 기능에는 외부 시스템의 장애물 정보 (MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) 메시지를 사용하여 전송) 또는 비행 컨트롤러에 연결된 [거리 센서](../sensor/rangefinders.md)가 필요합니다.

::: info Multiple sensors can be used to get information about, and prevent collisions with, objects _around_ the vehicle. If multiple sources supply data for the _same_ orientation, the system uses the data that reports the smallest distance to an object.
:::

기체는 장애물에 가까워 질 때 속도를 줄이기 위하여 최대 속도를 제한하고 허용된 최소 간격에 도달하면 정지합니다. 장애물에서 멀어지거나 평행하게 이동하려면 사용자는 기체를 장애물에 더 가깝게 만들지 않는 설정 값으로 이동하도록 명령하여야 합니다. 알고리즘은 "더 나은"설정점이 요청된 설정 값의 양쪽에있는 고정된 마진내에 존재한다고 판단되면 설정값 방향을 약간 조정합니다.

Users are notified through _QGroundControl_ while _Collision Prevention_ is actively controlling velocity setpoints.

PX4 소프트웨어 설정은 다음 섹션에서 다룹니다. 충돌 방지를 위해 비행 컨트롤러에 장착된 거리 센서를 사용하는 경우 [PX4 거리 센서](#rangefinder)에 설명된대로 부착하고 설정하여야 합니다. 보조 컴퓨터를 사용하여 장애물 정보를 제공하는 경우에는 [보조 컴퓨터 설정](#companion)을 참조하십시오.

## PX4 소프트웨어 설정

Configure collision prevention by [setting the following parameters](../advanced_config/parameters.md) in _QGroundControl_:

| 매개변수                                                                                                | 설명                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CP_DIST"></a>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)               | 최소 허용 거리 (기체가 장애물에 접근할 수있는 가장 가까운 거리)를 설정합니다. Set negative to disable _collision prevention_. **Warning** 이 값은 기체 또는 프로펠러 외부가 아닌 센서까지의 거리입니다. 충분한 거리를 남겨 두십시오! |
| <a id="CP_DELAY"></a>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)             | 센서 및 속도 설정점 추적 지연을 설정합니다. 아래의 [지연 조정](#delay_tuning)을 참조하십시오.                                                                                                  |
| <a id="CP_GUIDE_ANG"></a>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)   | 해당 방향에서 장애물이 적을 경우 기체가 이탈할 수있는 각도 (명령된 방향의 양쪽으로)를 설정합니다. 아래의 [가이던스 튜닝](#angle_change_tuning)을 참조하십시오.                                                          |
| <a id="CP_GO_NO_DATA"></a>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | 기체가 센서 범위 외부의 방향으로 이동할 수 있도록 하려면 1로 설정합니다 (기본값은 0/`False`).                                                                                                    |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)   | Set to `Direct velocity` or `Smoothed velocity` to enable Collision Prevention in Position Mode (default is `Acceleration based`).                             |

## 알고리즘 설명

모든 센서의 데이터는 기체 주변의 36 개 섹터의 내부 표현으로 통합되며, 각 섹터에는 센서 데이터와 마지막 관찰 시점에 대한 정보 또는 해당 섹터에 대한 데이터를 사용할 수 없다는 표시가 포함됩니다. 기체가 특정 방향으로 이동하도록 명령을 받으면, 해당 방향의 반구에있는 모든 섹터를 확인하여 이동으로 인하여 기체가 장애물에 더 가까워 지는지 확인합니다. 그러한 경우에는, 차량 속도가 제한됩니다.

이 속도 제한은 [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P)에 의해 튜닝된 내부 속도 루프와 [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) 및 [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)을 통하여 [저크 최적 속도컨트롤러](../config_mc/mc_jerk_limited_type_trajectory.md)를 모두 고려합니다. 속도는 [CP_DIST](#CP_DIST)에 지정된 거리를 유지하기 위하여 기체가 제 시간에 정지하도록 제한됩니다. 각 섹터의 센서 범위도 고려되어 동일한 메커니즘을 통하여 속도를 제한합니다.

:::note
특정 방향에 센서 데이터가 없는 경우에는 해당 방향의 속도는 0으로 제한됩니다 (기체가 보이지 않는 물체에 충돌하는 것을 방지). 센서 커버리지 없이 자유롭게 방향으로 이동하려면 [CP_GO_NO_DATA](#CP_GO_NO_DATA)를 1로 설정하여 활성화할 수 있습니다.
:::

차량 추적 속도 설정 점과 외부 소스로부터 센서 데이터를 수신시의 지연은 [CP_DELAY](#CP_DELAY) 매개 변수를 통하여 보수적으로 추정됩니다. 특정 기체마다 [튜닝](#delay_tuning)하여야 합니다.

명령된 섹터에 인접한 섹터가 상당한 여백 만큼 '더 나은' 경우, 요청된 입력 방향은 [CP_GUIDE_ANG](#CP_GUIDE_ANG)에 지정된 각도까지 수정할 수 있습니다. 이는 장애물에 걸리지 않고 장애물 주변으로 차량을 '안내'하기 위하여 사용자 입력을 미세 조정하는 데 도움이 됩니다.

### 범위 데이터 손실

If the autopilot does not receive range data from any sensor for longer than 0.5s, it will output a warning _No range data received, no movement allowed_. 이렇게하면 xy의 속도 설정값이 0이 됩니다. After 5 seconds of not receiving any data, the vehicle will switch into [HOLD mode](../flight_modes_mc/hold.md). If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes_mc/position.md) (e.g. to _Altitude mode_ or _Stabilized mode_).

여러 센서가 연결되어 있고, 그 중 하나와의 연결이 끊어진 경우에도 보고 센서의 시야 (FOV) 내부를 비행할 수 있습니다. 결함이 있는 센서의 데이터가 만료되고, 이 센서가 포함하는 영역이 커버되지 않은 것으로 처리되므로 그 곳으로 이동할 수 없습니다.

:::warning
[CP_GO_NO_DATA = 1](#CP_GO_NO_DATA)을 활성화시에는 주의하여야 합니다. 간혹, 기체가 센서 범위 외부로 벗어날 수 있습니다. 여러 센서 중 하나라도 연결이 끊어지면 결함이있는 센서의 영역이 무시되어, 제약없이 이동할 수 있습니다.
:::

### CP_DELAY Delay Tuning {#delay_tuning}

There are two main sources of delay which should be accounted for: _sensor delay_, and vehicle _velocity setpoint tracking delay_. 두 지연 소스 모두 [CP_DELAY](#CP_DELAY) 매개변수를 사용하여 튜닝됩니다.

The _sensor delay_ for distance sensors connected directly to the flight controller can be assumed to be 0. 외부 비전 기반 시스템의 경우 센서 지연이 최대 0.2 초 일 수 있습니다.

Vehicle _velocity setpoint tracking delay_ can be measured by flying at full speed in [Position mode](../flight_modes_mc/position.md), then commanding a stop. 실제 속도와 속도 설정점 사이의 지연은 로그에서 측정할 수 있습니다. 추적 지연은 일반적으로 기체 크기와 튜닝에 따라 0.1 초에서 0.5 초 사이입니다.

:::tip
장애물에 접근시 기체 속도가 진동하면 (즉, 감속, 가속, 감속), 지연이 너무 높게 설정됩니다.
:::

### CP_GUIDE_ANG Guidance Tuning {#angle_change_tuning}

차량, 환경 유형 및 조종사의 기술에 따라 각기 다른 가이던스가 필요할 수 있습니다. [CP_GUIDE_ANG](#CP_GUIDE_ANG) 매개 변수를 0으로 설정하면 안내가 비활성화되어 기체가 명령된 방향으로만 정확하게 이동합니다. 이 매개 변수를 높이면 기체가 장애물을 피할 수 있는 최적의 방향을 선택할 수 있으므로 좁은 틈새를 더 쉽게 통과하고 물체를 돌아 다니는 동안 최소 거리를 정확하게 유지할 수 있습니다.

이 매개 변수가 너무 작으면 장애물에 가까워 졌을 때 기체가  '고착'된 느낌을 받을 수 있습니다. 장애물에서 멀어지는 이동만 허용되기 때문입니다. 매개 변수가 너무 크면 운전자가 지시하지 않은 방향으로 기체가 장애물에서 멀어지는 것처럼 느껴질 수 있습니다. 테스트에서 30도는 적절한 값이지만,  기체마다 값이 달라질 수 있습니다.

:::note
가이던스 기능은 센서 데이터가 없는 방향으로 기체를 이동시키지 않습니다.
단 하나의 거리 센서만 전방을 향하고 있는 상태에서 기체가 '고착'된 느낌이 드는 경우, 이는 정보 부족으로 인하여 가이던스가 방향을 안전하게 조정할 수 없기 때문일 수 있습니다.
:::

## PX4 Distance Sensor {#rangefinder}

### Lanbao PSK-CM8JL65-CC5

작성 시점에 PX4를 사용하면 최소한의 추가 설정으로 충돌 방지용으로 [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR 거리 센서를 사용할 수 있습니다.

- 먼저 [센서를 장착 설정](../sensor/cm8jl65_ir_distance_sensor.md)하고 충돌 방지를 활성화합니다 (위에서 설명한대로 [CP_DIST](#CP_DIST) 사용).
- [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0)을 사용하여 센서 방향을 설정합니다.

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
  - [SENS_EN_SF45_CFG](../advanced_config/parameter_reference.md#SENS_EN_SF45_CFG): Set to the serial port you have the sensor connected to. Make sure GPS or Telemetry are not enabled on this port.
  - [SF45_ORIENT_CFG](../advanced_config/parameter_reference.md#SF45_ORIENT_CFG): Set the orientation of the sensor (facing up or down)
  - [SF45_UPDATE_CFG](../advanced_config/parameter_reference.md#SF45_UPDATE_CFG): Set the update rate
  - [SF45_YAW_CFG](../advanced_config/parameter_reference.md#SF45_YAW_CFG): Set the yaw orientation

In QGroundControl you should see an [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message in the [MAVLink console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) if collision prevention is configured correctly and active.

The obstacle overlay in QGC will look like this:

![sf45](../../assets/sf45/sf45_obstacle_map.png)

### Rangefinder Support

다른 센서를 활성화 할 수 있지만, 이를 위해서는 센서 방향과 시야를 설정하기 위하여 드라이버 코드를 수정하여야 합니다.

- 특정 포트에 거리 센서를 연결 설정하고 ([센서 별 문서](../sensor/rangefinders.md) 참조) [CP_DIST](#CP_DIST)를 사용하여 충돌 방지를 활성화합니다.
- 방향을 설정하려면 드라이버를 수정하십시오. This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor _module.yaml_ file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the _field of view_ in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
[기능 PR](https://github.com/PX4/PX4-Autopilot/pull/12179)에서 필요한 수정 사항을 확인할 수 있습니다. 변경 사항에 기여하여 주십시오!
:::

## Companion Setup {#companion}

보조 컴퓨터 또는 외부 센서를 사용하는 경우 장애물이 감지된 시기와 위치를 반영하는 [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) 메시지 스트림을 제공하여야 합니다.

The minimum rate at which messages _must_ be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

:::note
시스템의 초기 테스트에서는 `OBSTACLE_DISTANCE` 메시지가 10Hz (비전 시스템에서 지원하는 최대 속도)에서 방출되는 4m/s로 움직이는 기체를 사용하였습니다. 시스템은 상당히 빠른 속도와 낮은 주파수 거리 업데이트에서 잘 작동 할 수 있습니다.
:::

The tested companion software is the _local_planner_ from the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo. For more information on hardware and software setup see: [PX4/PX4-Avoidance > Run on Hardware](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- hardware platform used for testing not readily available, so have removed -->

The hardware and software should be set up as described in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo. In order to emit `OBSTACLE_DISTANCE` messages you must use the _rqt_reconfigure_ tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo Simulation

_Collision Prevention_ can be tested using [Gazebo](../sim_gazebo_gz/index.md) with the [x500_lidar_2d](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar) model. To do this, start a simulation with the x500 lidar model by running the following command:

```sh
make px4_sitl gz_x500_lidar_2d
```

Next, adjust the relevant parameters to the appropriate values and add arbitrary obstacles to your simulation world to test the collision prevention functionality.

The diagram below shows how the simulation looks when viewed in Gazebo.

![RViz image of collision detection using the x500_lidar_2d model in Gazebo](../../assets/simulation/gazebo/vehicles/x500_lidar_2d_viz.png)

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->
<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->
<!-- using rangefinder? -->

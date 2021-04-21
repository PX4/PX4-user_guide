# 충돌 방지

*충돌방지* 기능은 기체가 장애물을 만나면 자동으로 속도를 늦추거나 정지합니다

[위치 모드](../flight_modes/position_mc.md)에서 멀티콥터에 대해 활성화할 수 있으며, 오프보드 보조 컴퓨터, MAVLink를 통한 오프보드 거리계, 비행 컨트롤러에 부착된 거리계 또는 위의 조합에서 센서 데이터를 사용할 수 있습니다.

충돌 방지는 센서 범위가 충분히 크지 않으면, 기체의 최대 속도를 제한할 수 있습니다! 또한 센서 데이터를 사용할 수 없는 방향으로의 움직임을 방지합니다 (즉, 후방 센서 데이터가없는 경우 뒤로 비행할 수 없음).

:::tip
고속 비행이 주 목적인 경우에는 필요하지 않으면 충돌 방지 기능을 비활성화하는 것이 좋습니다.
:::

:::tip
모든 비행 방향으로 센서와 센서 데이터가 있는 지 확인하십시오 (충돌 방지가 활성화된 경우).
:::

## 개요

*충돌 방지*는 최소 허용 접근 거리 ([CP_DIST](#CP_DIST)) 매개 변수를 설정하여 PX4에서 활성화됩니다.

이 기능에는 외부 시스템의 장애물 정보 (MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) 메시지를 사용하여 전송) 또는 비행 컨트롤러에 연결된 [거리 센서](../sensor/rangefinders.md)가 필요합니다.

:::note
기체 *주변*에 대한 정보를 얻고 충돌을 방지하기 위하여 여러가지 센서를 사용할 수 있습니다. 여러 소스가 *동일한* 방향에 대한 데이터를 제공하는 경우에는 시스템은 물체까지의 최소 거리를 판별 데이터로 사용합니다.
:::

기체는 장애물에 가까워 질 때 속도를 줄이기 위하여 최대 속도를 제한하고 허용된 최소 간격에 도달하면 정지합니다. 장애물에서 멀어지거나 평행하게 이동하려면 사용자는 기체를 장애물에 더 가깝게 만들지 않는 설정 값으로 이동하도록 명령하여야 합니다. 알고리즘은 "더 나은"설정점이 요청된 설정 값의 양쪽에있는 고정된 마진내에 존재한다고 판단되면 설정값 방향을 약간 조정합니다.

사용자는 *QGroundControl*을 통해 알림을 받고 *충돌 방지*는 속도 설정 값을 능동적으로 제어합니다.

PX4 소프트웨어 설정은 다음 섹션에서 다룹니다. 충돌 방지를 위해 비행 컨트롤러에 장착된 거리 센서를 사용하는 경우 [PX4 거리 센서](#rangefinder)에 설명된대로 부착하고 설정하여야 합니다. 보조 컴퓨터를 사용하여 장애물 정보를 제공하는 경우에는 [보조 컴퓨터 설정](#companion)을 참조하십시오.

## PX4 소프트웨어 설정

*QGroundControl*에서 [다음 매개 변수를 설정](../advanced_config/parameters.md)하여 충돌 방지를 설정합니다.

| 매개변수                                                                                                | 설명                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="CP_DIST"></span>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)               | 최소 허용 거리 (기체가 장애물에 접근할 수있는 가장 가까운 거리)를 설정합니다. *충돌 방지*를 비활성화하려면 음수로 설정하십시오.   
> **Warning** 이 값은 기체 또는 프로펠러 외부가 아닌 센서까지의 거리입니다. 충분한 거리를 남겨 두십시오! |
| <span id="CP_DELAY"></span>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)             | 센서 및 속도 설정점 추적 지연을 설정합니다. 아래의 [지연 조정](#delay_tuning)을 참조하십시오.                                                                                    |
| <span id="CP_GUIDE_ANG"></span>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)   | 해당 방향에서 장애물이 적을 경우 기체가 이탈할 수있는 각도 (명령된 방향의 양쪽으로)를 설정합니다. 아래의 [가이던스 튜닝](#angle_change_tuning)을 참조하십시오.                                            |
| <span id="CP_GO_NO_DATA"></span>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | 기체가 센서 범위 외부의 방향으로 이동할 수 있도록 하려면 1로 설정합니다 (기본값은 0/`False`).                                                                                      |

<span id="algorithm"></span>

## 알고리즘 설명

모든 센서의 데이터는 기체 주변의 36 개 섹터의 내부 표현으로 통합되며, 각 섹터에는 센서 데이터와 마지막 관찰 시점에 대한 정보 또는 해당 섹터에 대한 데이터를 사용할 수 없다는 표시가 포함됩니다. 기체가 특정 방향으로 이동하도록 명령을 받으면, 해당 방향의 반구에있는 모든 섹터를 확인하여 이동으로 인하여 기체가 장애물에 더 가까워 지는지 확인합니다. 그러한 경우에는, 차량 속도가 제한됩니다.

이 속도 제한은 [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P)에 의해 튜닝된 내부 속도 루프와 [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) 및 [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)을 통하여 [저크 최적 속도컨트롤러](../config_mc/mc_jerk_limited_type_trajectory.md)를 모두 고려합니다. 속도는 [CP_DIST](#CP_DIST)에 지정된 거리를 유지하기 위하여 기체가 제 시간에 정지하도록 제한됩니다. 각 섹터의 센서 범위도 고려되어 동일한 메커니즘을 통하여 속도를 제한합니다.

:::note
특정 방향에 센서 데이터가 없는 경우에는 해당 방향의 속도는 0으로 제한됩니다 (기체가 보이지 않는 물체에 충돌하는 것을 방지). 센서 커버리지 없이 자유롭게 방향으로 이동하려면 [CP_GO_NO_DATA](#CP_GO_NO_DATA)를 1로 설정하여 활성화할 수 있습니다.
:::

차량 추적 속도 설정 점과 외부 소스로부터 센서 데이터를 수신시의 지연은 [CP_DELAY](#CP_DELAY) 매개 변수를 통하여 보수적으로 추정됩니다. 특정 기체마다 [튜닝](#delay_tuning)하여야 합니다.

명령된 섹터에 인접한 섹터가 상당한 여백 만큼 '더 나은' 경우, 요청된 입력 방향은 [CP_GUIDE_ANG](#CP_GUIDE_ANG)에 지정된 각도까지 수정할 수 있습니다. 이는 장애물에 걸리지 않고 장애물 주변으로 차량을 '안내'하기 위하여 사용자 입력을 미세 조정하는 데 도움이 됩니다.

<span id="data_loss"></span>

### 범위 데이터 손실

자동항법장치가 0.5 초 이상 센서로부터 범위 데이터를 수신하지 못하면 *수신된 범위 데이터 없음, 이동 허용 없음* 경고 메시지를 출력합니다. 이렇게하면 xy의 속도 설정값이 0이 됩니다. 5초 동안 데이터를 수신하지 않으면 기체는 [유지 모드](../flight_modes/hold.md)로 전환됩니다. If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes/position_mc.md) (e.g. to *Altitude mode* or *Stabilized mode*).

If you have multiple sensors connected and you lose connection to one of them, you will still be able to fly inside the field of view (FOV) of the reporting sensors. The data of the faulty sensor will expire and the region covered by this sensor will be treated as uncovered, meaning you will not be able to move there.

:::warning
Be careful when enabling [CP_GO_NO_DATA=1](#CP_GO_NO_DATA), which allows the vehicle to fly outside the area with sensor coverage. If you lose connection to one of multiple sensors, the area covered by the faulty sensor is also treated as uncovered and you will be able to move there without constraint.
:::

<span id="delay_tuning"></span>

### CP_DELAY Delay Tuning

There are two main sources of delay which should be accounted for: *sensor delay*, and vehicle *velocity setpoint tracking delay*. Both sources of delay are tuned using the [CP_DELAY](#CP_DELAY) parameter.

The *sensor delay* for distance sensors connected directly to the flight controller can be assumed to be 0. For external vision-based systems the sensor delay may be as high as 0.2s.

Vehicle *velocity setpoint tracking delay* can be measured by flying at full speed in [Position mode](../flight_modes/position_mc.md), then commanding a stop. The delay between the actual velocity and the velocity setpoint can then be measured from the logs. The tracking delay is typically between 0.1 and 0.5 seconds, depending on vehicle size and tuning.

:::tip
If vehicle speed oscillates as it approaches the obstacle (i.e. it slows down, speeds up, slows down) the delay is set too high.
:::

<span id="angle_change_tuning"></span>

### CP_GUIDE_ANG Guidance Tuning

Depending on the vehicle, type of environment and pilot skill different amounts of guidance may be desired. Setting the [CP_GUIDE_ANG](#CP_GUIDE_ANG) parameter to 0 will disable the guidance, resulting in the vehicle only moving exactly in the directions commanded. Increasing this parameter will let the vehicle choose optimal directions to avoid obstacles, making it easier to fly through tight gaps and to keep the minimum distance exactly while going around objects.

If this parameter is too small the vehicle may feel 'stuck' when close to obstacles, because only movement away from obstacles at minimum distance are allowed. If the parameter is too large the vehicle may feel like it 'slides' away from obstacles in directions not commanded by the operator. From testing, 30 degrees is a good balance, although different vehicles may have different requirements.

:::note
The guidance feature will never direct the vehicle in a direction without sensor data. If the vehicle feels 'stuck' with only a single distance sensor pointing forwards, this is probably because the guidance cannot safely adapt the direction due to lack of information.
:::

<span id="rangefinder"></span>

## PX4 Distance Sensor

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using [CP_DIST](#CP_DIST)).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

Other sensors may be enabled, but this requires modification of driver code to set the sensor orientation and field of view.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using [CP_DIST](#CP_DIST).
- Modify the driver to set the orientation. This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor *module.yaml* file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the *field of view* in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
You can see the required modifications from the [feature PR](https://github.com/PX4/PX4-Autopilot/pull/12179). Please contribute back your changes!
:::

<span id="companion"></span>

## Companion Setup

If using a companion computer or external sensor, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages, which should reflect when and where obstacle were detected.

The minimum rate at which messages *must* be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

:::note
Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 10Hz (the maximum rate supported by the vision system). The system may work well at significantly higher speeds and lower frequency distance updates.
:::

The tested companion software is the *local_planner* from the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo. For more information on hardware and software setup see: [PX4/avoidance > Run on Hardware](https://github.com/PX4/avoidance#run-on-hardware). <!-- hardware platform used for testing not readily available, so have removed -->

The hardware and software should be set up as described in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo. In order to emit `OBSTACLE_DISTANCE` messages you must use the *rqt_reconfigure* tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo Setup

*Collision Prevention* can also be tested using Gazebo. See [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) for setup instructions.

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->

<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->
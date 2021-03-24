# 궤도 모드(멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*궤도* 유도 비행 모드를 사용하면 멀티콥터 (또는 멀티 콥터 모드의 VTOL)가 항상 중앙을 향하도록 [기본](https://mavlink.io/en/messages/common.html#ORBIT_YAW_BEHAVIOUR) 요잉으로 원을 그리는 비행하도록 명령할 수 있습니다.

![Orbit Mode - MC](../../assets/flying/orbit.jpg)

모드를 활성화하고 궤도의 중심 위치, 초기 반경 및 고도를 설정하려면 *QGroundControl* (또는 기타 호환 가능한 GCS 또는 MAVLink API)이 *필요*합니다. 활성화되면 기체는 명령된 원 궤적에서 가장 가까운 지점까지 최대한 빠르게 비행하고 계획된 원에서 시계 방향으로 천천히 (1m / s) 궤도를 돌면서 중앙을 향합니다.

궤도를 시작하는 방법에 대한 지침은 [FlyView > 궤도 위치](https://docs.qgroundcontrol.com/en/FlyView/FlyView.html#orbit) (*QGroundControl* 가이드)에서 찾을 수 있습니다.

:::note RC
무선 조종기 사용은 *선택 사항*입니다. RC 제어가 없는 경우 궤도는 위에서 설명한 대로 진행됩니다. RC 제어를 사용하여 모드를 시작할 수 없습니다 (RC를 통해 모드로 전환하면 유휴 상태가됩니다).
:::

RC 제어를 사용하여 궤도 고도, 반경, 속도 및 궤도 방향을 변경할 수 있습니다.

- **왼쪽 스틱:** 
  - *위/아래 :*는 [위치 모드](../flight_modes/position_mc.md)에서와 같이 상승/하강 속도를 제어합니다. 중앙 데드 존에 있으면 현재 고도가 유지됩니다.
  - *왼쪽/오른쪽 :* 효과 없음.
- **오른쪽 스틱:** 
  - *좌/우* 시계 방향/반시계 방향으로 궤도의 가속도를 제어합니다. 중앙에 위치하면 현재 속도가 고정됩니다. 
    - 최대 속도는 10m/s이며 구심 가속도를 2m/s ^ 2 미만으로 유지하도록 제한됩니다. 
  - *상/하* 궤도 반경을 제어합니다 (더 작게 / 더 크게). 중앙에 위치하면 현재 반경이 유지됩니다. 
    - 최소 반경은 1m 입니다. 최대 반경은 1m 입니다.

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 ([모드 2 송신기](../getting_started/rc_transmitter_receiver.md#transmitter_modes)의 경우).

![Orbit Mode - MC](../../assets/flight_modes/orbit_MC.png)

다른 비행 모드 (RC 또는 QGC 사용)로 전환하여 모드를 중지할 수 있습니다.

## 매개 변수 / 제약 사항

궤도 모드 별 매개 변수는 없습니다.

다음의 제약 사항들은 하드 코딩되어 있습니다.

- 초기 기본 회전은 시계 방향으로 1m/s 입니다.
- The maximum acceleration is limited to 2 m/s^2, with priority on keeping the commanded circle trajectory rather than commanded ground speed (i.e. the vehicle will slow down in order to achieve the correct circle if the acceleration exceeds 2m/s^2).
- Maximum radius is 100m.

## MAVLink Messages (Developers)

Orbit mode uses the following MAVLink commands:

- [MAV_CMD_DO_ORBIT](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_ORBIT) - Start an orbit with specified center point, radius, direction, altitude, speed and [yaw direction](https://mavlink.io/en/messages/common.html#ORBIT_YAW_BEHAVIOUR) (vehicle defaults to faceing centre of orbit).
- [ORBIT_EXECUTION_STATUS](https://mavlink.io/en/messages/common.html#ORBIT_EXECUTION_STATUS) - Orbit status emitted during orbit to update GCS of current orbit parameters (these may be changed by the RC controller).
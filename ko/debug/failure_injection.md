# 시스템 장애 주입

[MAVSDK 오류 플러그인](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_failure.html)을 사용하는 프로그래밍 방식이나 [MAVLink 셸](../debug/mavlink_shell.md#mavlink-shell)과 같은 PX4 콘솔을 통하여, 수동으로 다양한 유형의 센서등과 같은 시스템 오류를 주입할 수 있습니다. This enables easier testing of [safety failsafe](../config/safety.md) behaviour, and more generally, of how PX4 behaves when systems and sensors stop working correctly.

실패 주입은 기본적으로 비활성화되어 있으며, [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN) 매개변수를 사용하여 활성화할 수 있습니다.

:::warning
실패 주입은 아직 개발 중입니다. At time of writing (PX4 v1.14):

- 시뮬레이션에서만 사용할 수 있습니다(실제 비행에서 실패 주입 모두 지원 예정).
- It requires support in the simulator. It is supported in Gazebo Classic
- 많은 실패 유형이 광범위하게 구현되지 않았습니다. 이러한 경우 명령은 "지원되지 않는" 메시지와 함께 반환됩니다.

:::

## 장애 시스템 명령

Failures can be injected using the [failure system command](../modules/modules_command.md#failure) from any PX4 console/shell, specifying both the target and type of the failure.

### 구문

The full syntax of the [failure](../modules/modules_command.md#failure) command is:

```sh
failure <component> <failure_type> [-i <instance_number>]
```

where:

- _구성요소_:
  - 센서:
    - `gyro`: 자이로
    - `accel`: 가속도계
    - `mag`: 자기계
    - `baro`: 기압계
    - `gps`: GPS
    - `optical_flow`: 광류 센서
    - `vio`: 시각적 관성 주행 거리
    - `distance_sensor`: 거리 센서(거리 측정기)
    - `airspeed`: 대기속도 센서
  - 시스템:
    - `battery`: 배터리
    - `motor`: 모터
    - `servo`: 서보
    - `avoidance`: 회피
    - `rc_signal`: RC 신호
    - `mavlink_signal`: MAVLink 신호(데이터 텔레메트리)
- _failure_type_:
  - `ok`: 정상적으로 게시합니다(실패 주입 비활성화).
  - `off`: 게시를 중지합니다.
  - `stuck`: 매번 같은 값을 보고합니다(센서 오작동을 _나타낼 수 있음_).
  - `garbage`: 무작위 노이즈를 게시합니다. 초기화되지 않은 메모리를 읽는 것처럼 보입니다.
  - `wrong`: 잘못된 값을 게시합니다(여전히 합리적으로 보이거나 "쓰레기"가 아님).
  - `slow`: 낮은 속도로 게시합니다.
  - `delayed`: 상당한 지연으로 유효한 데이터를 게시합니다.
  - `intermittent`: 간헐적으로 게시합니다.
- _instance number_(선택 사항): 영향을 받는 센서의 인스턴스 번호입니다. 0 (기본값) 지정된 유형의 모든 센서를 나타냅니다.

### 예

To simulate losing RC signal without having to turn off your RC controller:

1. 매개변수 [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN)을 활성화합니다.
1. Enter the following commands on the MAVLink console or SITL _pxh shell_:

   ```sh
   # Fail RC (turn publishing off)
   failure rc_signal off

   # Restart RC publishing
   failure rc_signal ok
   ```

## MAVSDK 실패 플러그인

The [MAVSDK failure plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_failure.html) can be used to programmatically inject failures. It is used in [PX4 Integration Testing](../test_and_ci/integration_testing_mavsdk.md) to simulate failure cases (for example, see [PX4-Autopilot/test/mavsdk_tests/autopilot_tester.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/test/mavsdk_tests/autopilot_tester.cpp)).

The plugin API is a direct mapping of the failure command shown above, with a few additional error signals related to the connection.

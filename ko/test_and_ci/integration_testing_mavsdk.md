# MAVSDK 통합 시험

PX4는 [MAVSDK](https://mavsdk.mavlink.io)를 기반으로 종단간 통합 시험을 진행할 수 있습니다.

시험 절차는 이제부터 근본적으로 SITL을 대상으로 개발하며, 지속 통합 체계(CI)에서 실행합니다. 그러나, 실제 시험도 일반화할 수 있습니다.

## MAVSDK C++ 라이브러리 설치

시스템 영역(예: `/usr/lib` 또는 `/usr/local/lib`)에 MAVSDK C++ 라이브러리를 설치해야 시험을 진행할 수 있습니다.

바이너리를 그대로 설치하거나 소스코드를 컴파일하여 설치하십시오:
- [MAVSDK > Installation > C++](https://mavsdk.mavlink.io/develop/en/getting_started/installation.html#cpp): 지원 플랫폼에 사전 빌드한 라이브러리를 설치(추천)
- [MAVSDK > Contributing > Building from Source](https://mavsdk.mavlink.io/develop/en/contributing/build.html#build_sdk_cpp): C++ 소스 코드를 라이브러리로 빌드.

## PX4 코드 준비

PX4 코드를 빌드하려면 다음 명령을 내리십시오:

```sh
DONT_RUN=1 make px4_sitl gazebo mavsdk_tests
```

### 모든 PX4 시험 절차 실행

SITL 시험을 [sitl.json](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/configs/sitl.json)에 지정한대로 실행하려면 다음 명령을 내리십시오:

```sh
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10
```

모든 가능한 명령행 인자를 살펴보려면 다음 내용을 살펴보십시오:

```sh
test/mavsdk_tests/mavsdk_test_runner.py -h

usage: mavsdk_test_runner.py [-h] [--log-dir LOG_DIR] [--speed-factor SPEED_FACTOR] [--iterations ITERATIONS] [--abort-early] [--gui] [--model MODEL]
                             [--case CASE] [--debugger DEBUGGER] [--verbose]
                             config_file

positional arguments:
  config_file           JSON config file to use

optional arguments:
  -h, --help            show this help message and exit
  --log-dir LOG_DIR     Directory for log files
  --speed-factor SPEED_FACTOR
                        how fast to run the simulation
  --iterations ITERATIONS
                        how often to run all tests
  --abort-early         abort on first unsuccessful test
  --gui                 display the visualization for a simulation
  --model MODEL         only run tests for one model
  --case CASE           only run tests for one case
  --debugger DEBUGGER   choice from valgrind, callgrind, gdb, lldb
  --verbose             enable more verbose output
```

## 구현상 참고


- 시험 절차는 파이썬 코드로 작성한 시험 실행 스크립트 [mavsdk_test_runner.py](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/mavsdk_test_runner.py) 파일로 진행합니다. 이 실행 주체는 `px4`를 SITL 시험 용도의 가제보와 마찬가지로 시작하며, 처리 과정의 기록을 수집합니다.
- 시험 진행 주체는 C++ 라이브러리이며, 다음 특징이 있습니다.
  - 인자를 분석하는 [main](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_main.cpp) 함수.
  - [autopilot_tester](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/autopilot_tester.h)를 호출하는 MAVSDK의 추상체.
  - [test_multicopter_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_multicopter_mission.cpp)와 같이, MAVSDK의 추상체를 활용한 실제 시험 절차.
  - 시험 코드에서는 [catch2](https://github.com/catchorg/Catch2) 단위 시험 프레임워크를 활용합니다. 이 프레임워크를 사용하고자 하는 동기는 다음과 같습니다:
      - 함수 내부에 존재할 수 있는 시험 대상을 멈춰야 할 경우에 대해 단언(`REQUIRE`) 합니다(그리고 [gtest 시험](https://github.com/google/googletest/blob/master/googletest/docs/advanced.md#assertion-placement)과 같이 최상위의 시험만 진행하는것은 아닙니다).
      - *catch2*에 헤더만 있는 라이브러리를 넣을 수 있기 때문에 의존 관리가 간편해집니다.
      - *catch2*에서 시험 과정의 유연한 조합을 허용하는 [tag](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md#tags)를 지원합니다.


활용 용어:
- "모델": 선택한 가제보 모델, 예: `iris`
- "테스트 케이스": [catch2용 조건 시험 코드 단위](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md).

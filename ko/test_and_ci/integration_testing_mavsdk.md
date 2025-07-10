---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/integration_testing_mavsdk
---

# MAVSDK 통합 테스트

PX4는 [MAVSDK](https://mavsdk.mavlink.io)를 기반으로 종단간 통합 테스트를 할 수 있습니다.

테스트는 주로 SITL에 대해 개발되고, CI(지속적 통합)에서 실행됩니다. 앞으로, 모든 플랫폼/하드웨어으로 일반화할 계획입니다.

아래 지침은 로컬에서 테스트를 설정하고 진행하는 방법을 설명합니다.

## 전제 조건

### 개발 환경 설정

아직 하지 않은 경우:
- [Linux](../dev_setup/dev_env_linux_ubuntu.md) 또는 [MacOS](../dev_setup/dev_env_mac.md)용 개발 도구 모음을 설치합니다(Windows는 지원되지 않음). Gazebo는 필수이며 기본적으로 설치되어야 합니다.
- [PX4 소스 코드 받기](../dev_setup/building_px4.md#download-the-px4-source-code):

  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git --recursive
  cd PX4-Autopilot
  ```


### 테스트용 PX4 빌드

시뮬레이터 테스트를 위한 PX4를 빌드하려면 다음 명령어를 실행하십시오.

```sh
DONT_RUN=1 make px4_sitl gazebo mavsdk_tests
```

### MAVSDK C++ 라이브러리 설치

테스트에는 시스템에 설치된 MAVSDK C++ 라이브러리가 필요합니다(예: `/usr/lib` 또는 `/usr/local/lib`).

바이너리 또는 소스에서 설치:
- [MAVSDK > C++ > C++ QuickStart](https://mavsdk.mavlink.io/main/en/cpp/quickstart.html): Install as a prebuilt library on supported platforms (recommended)
- [MAVSDK > C++ Guide > Building from Source](https://mavsdk.mavlink.io/main/en/cpp/guide/build.html): Build  C++ library from source.

## 모든 PX4 테스트 실행

[sitl.json](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/configs/sitl.json)에 정의된 대로 모든 SITL 테스트를 실행하려면 다음을 실행하십시오.

```sh
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10
```

그러면, 모든 테스트가 나열되고 순차적으로 실행됩니다.


가능한 모든 명령줄 인수를 보려면 `-h` 인수를 사용하십시오.

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

## 단일 테스트 실행

`모델` 및 테스트 `케이스`를 명령줄 옵션으로 지정하여, 단일 테스트를 실행합니다. 예를 들어, 임무에서 테일시터 비행을 테스트하려면, 다음을 실행합니다.

```bash
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10 --model tailsitter --case 'Fly square Multicopter Missions including RTL'
```

현재 모델 세트와 관련 테스트 사례를 찾는 가장 용이한 방법은 [위에 표시된 대로](#run-all-px4-tests) 모든 PX4 테스트를 실행하는 것입니다(참고로 하나만 테스트하려는 경우 빌드를 취소할 수 있습니다).

이 문서 작성 시점에서 모든 테스트를 실행하여 생성된 목록은 다음과 같습니다.
```
About to run 39 test cases for 3 selected models (1 iteration):
  - iris:
    - 'Land on GPS lost during mission (baro height mode)'
    - 'Land on GPS lost during mission (GPS height mode)'
    - 'Continue on mag lost during mission'
    - 'Continue on baro lost during mission (baro height mode)'
    - 'Continue on baro lost during mission (GPS height mode)'
    - 'Continue on baro stuck during mission (baro height mode)'
    - 'Continue on baro stuck during mission (GPS height mode)'
    - 'Takeoff and Land'
    - 'Fly square Multicopter Missions including RTL'
    - 'Fly square Multicopter Missions with manual RTL'
    - 'Fly straight Multicopter Mission'
    - 'Offboard takeoff and land'
    - 'Offboard position control'
    - 'Fly forward in position control'
    - 'Fly forward in altitude control'
  - standard_vtol:
    - 'Land on GPS lost during mission (baro height mode)'
    - 'Land on GPS lost during mission (GPS height mode)'
    - 'Continue on mag lost during mission'
    - 'Continue on baro lost during mission (baro height mode)'
    - 'Continue on baro lost during mission (GPS height mode)'
    - 'Continue on baro stuck during mission (baro height mode)'
    - 'Continue on baro stuck during mission (GPS height mode)'
    - 'Takeoff and Land'
    - 'Fly square Multicopter Missions including RTL'
    - 'Fly square Multicopter Missions with manual RTL'
    - 'Fly forward in position control'
    - 'Fly forward in altitude control'
  - tailsitter:
    - 'Land on GPS lost during mission (baro height mode)'
    - 'Land on GPS lost during mission (GPS height mode)'
    - 'Continue on mag lost during mission'
    - 'Continue on baro lost during mission (baro height mode)'
    - 'Continue on baro lost during mission (GPS height mode)'
    - 'Continue on baro stuck during mission (baro height mode)'
    - 'Continue on baro stuck during mission (GPS height mode)'
    - 'Takeoff and Land'
    - 'Fly square Multicopter Missions including RTL'
    - 'Fly square Multicopter Missions with manual RTL'
    - 'Fly forward in position control'
    - 'Fly forward in altitude control'
```


## 구현 참고 사항

- 테스트는 Python으로 작성된 테스트 스크립트 [mavsdk_test_runner.py](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/mavsdk_test_runner.py)와 호출됩니다.

  MAVSDK 외에도 `px4`와 Gazebo for SITL 테스트를 시작하고 이러한 프로세스의 로그를 수집합니다.
- 테스트 실행기는 다음을 포함하는 C++ 바이너리입니다.
  - 인수를 구문 분석하는 [main](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_main.cpp) 함수입니다.
  - [autopilot_tester](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/autopilot_tester.h)라는 MAVSDK에 대한 추상화입니다.
  - MAVSDK에 대한 추상화를 사용한 실제 테스트. 예:  [test_multicopter_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_multicopter_mission.cpp).
  - 테스트는 [catch2](https://github.com/catchorg/Catch2) 단위 테스트 프레임워크를 사용합니다. 이 프레임워크를 사용하는 이유는 다음과 같습니다.
      - Asserts (`REQUIRE`) which are needed to abort a test can be inside of functions (and not just in the top level test as is [the case with gtest](https://github.com/google/googletest/blob/main/docs/advanced.md#assertion-placement)).
      - *catch2*를 헤더 전용 라이브러리로 포함할 수 있기 때문에, 종속성 관리가 용이합니다.
      - *Catch2* supports [tags](https://github.com/catchorg/Catch2/blob/devel/docs/test-cases-and-sections.md#tags), which allows for flexible composition of tests.


사용된 용어:
- "모델": 선택한 Gazebo 모델입니다. 예: `iris`.
- "테스트 케이스": [catch2 테스트 케이스](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md)입니다.

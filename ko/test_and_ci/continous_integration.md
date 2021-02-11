# PX4 지속 통합

PX4는 다중 지속 통합 서비스로 빌드와 테스트 과정을 확장할 수 있습니다.

Travis-ci는 [QGroundControl](http://qgroundcontrol.com/)을 통해 플래싱할 수 있는 바이너리를 공식 안정/베타/개발 버전으로 빌드할 수 있습니다. 도커 이미지 [px4io/px4-dev-base](https://hub.docker.com/r/px4io/px4-dev-base/) 에서는 GCC 4.9.3을 사용하며 makefile 타켓 qgc_firmware로 px4fmu-{v2, v4}, mindpx-v2, tap-v1 펌웨어를 컴파일합니다.

## Travis-ci

[Travis-ci](https://travis-ci.org/PX4/PX4-Autopilot) is responsible for the official stable/beta/development binaries that are flashable through [QGroundControl](http://qgroundcontrol.com/). It currently uses GCC 4.9.3 included in the docker image [px4io/px4-dev-base](https://hub.docker.com/r/px4io/px4-dev-base/) and compiles px4fmu-{v2, v4}, mindpx-v2, tap-v1 with makefile target qgc_firmware.

Travis-ci also has a macOS px4_sitl build which includes testing.

## Semaphore

CircleCI는 [px4io/px4-dev-nuttx-gcc_next](https://hub.docker.com/r/px4io/px4-dev-nuttx-gcc_next/) 도커 이미지를 활용하여 안정 펌웨어 릴리즈에 활용할 GCC의 다음 제안 버전을 시험합니다. 이 환경에서는 `px4_fmu-v4_default`, `px4_sitl_default`를 컴파일하고 테스트를 수행하며 코드 형식을 검증하는 `makefile 타겟`을 사용합니다.

## CircleCI

[CircleCI](https://circleci.com/gh/PX4/PX4-Autopilot) tests the proposed next version of GCC to be used for stable firmware releases using the docker image [px4io/px4-dev-nuttx-gcc_next](https://hub.docker.com/r/px4io/px4-dev-nuttx-gcc_next/). It uses the makefile target `quick_check` which compiles `px4_fmu-v4_default`, `px4_sitl_default`, runs testing, and verifies code style.

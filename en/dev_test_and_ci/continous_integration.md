# PX4 Continuous Integration

PX4 builds and testing are spread out over multiple continuous integration services. 

## [Travis-ci](https://travis-ci.org/PX4/PX4-Autopilot)

Travis-ci is responsible for the official stable/beta/development binaries that are flashable through [QGroundControl](http://qgroundcontrol.com/). It currently uses GCC 4.9.3 included in the docker image [px4io/px4-dev-base](https://hub.docker.com/r/px4io/px4-dev-base/) and compiles px4fmu-{v2, v4}, mindpx-v2, tap-v1 with makefile target qgc_firmware.

Travis-ci also has a macOS px4_sitl build which includes testing.

## [Semaphore](https://semaphoreci.com/px4/PX4-Autopilot)

Semaphore is primarily used to compile changes for the Qualcomm Snapdragon platform, but also serves as a backup to Travis-ci using the the same [px4io/px4-dev-base](https://hub.docker.com/r/px4io/px4-dev-base/) docker image. In addition to the set of firmware compiled by Travis-ci, Semaphore also builds for the stm32discovery, crazyflie, runs unit testing, and verifies code style.

## [CircleCI](https://circleci.com/gh/PX4/PX4-Autopilot)

CircleCI tests the proposed next version of GCC to be used for stable firmware releases using the docker image [px4io/px4-dev-nuttx-gcc_next](https://hub.docker.com/r/px4io/px4-dev-nuttx-gcc_next/). 
It uses the makefile target `quick_check` which compiles `px4_fmu-v4_default`, `px4_sitl_default`, runs testing, and verifies code style.


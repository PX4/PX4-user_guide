# PX4 持续集成

PX4 构建和测试分布在多个持续集成服务上。

Travis-ci 负责通过[ QGroundControl ](http://qgroundcontrol.com/)刷新的官方稳定/测试/开发二进制文件。 它目前使用包含在 docker image [ px4io/px4-dev-base ](https://hub.docker.com/r/px4io/px4-dev-base/)中的 GCC 4.9.3，并使用 makefile target qgc_firmware 编译 px4fmu-{v2，v4}，mindpx-v2，tap-v1。

## Travis-ci

[Travis-ci](https://travis-ci.org/PX4/PX4-Autopilot) is responsible for the official stable/beta/development binaries that are flashable through [QGroundControl](http://qgroundcontrol.com/). It currently uses GCC 4.9.3 included in the docker image [px4io/px4-dev-base](https://hub.docker.com/r/px4io/px4-dev-base/) and compiles px4fmu-{v2, v4}, mindpx-v2, tap-v1 with makefile target qgc_firmware.

Travis-ci also has a macOS px4_sitl build which includes testing.

## Semaphore

CircleCI 使用 docker image [ px4io/px4-dev-nuttx-gcc_next ](https://hub.docker.com/r/px4io/px4-dev-nuttx-gcc_next/)测试建议的下一版 GCC，以用于稳定的固件版本。 它使用 makefile target `quick_check`，会编译 `px4_fmu-v4_default`，`px4_sitl_default`，运行测试，并验证代码样式。

## CircleCI

[CircleCI](https://circleci.com/gh/PX4/PX4-Autopilot) tests the proposed next version of GCC to be used for stable firmware releases using the docker image [px4io/px4-dev-nuttx-gcc_next](https://hub.docker.com/r/px4io/px4-dev-nuttx-gcc_next/). It uses the makefile target `quick_check` which compiles `px4_fmu-v4_default`, `px4_sitl_default`, runs testing, and verifies code style.

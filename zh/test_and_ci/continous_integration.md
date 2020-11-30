# PX4 持续集成

PX4 构建和测试分布在多个持续集成服务上。

## [Travis-ci](https://travis-ci.org/PX4/PX4-Autopilot)

Travis-ci 负责通过[ QGroundControl ](http://qgroundcontrol.com/)刷新的官方稳定/测试/开发二进制文件。 它目前使用包含在 docker image [ px4io/px4-dev-base ](https://hub.docker.com/r/px4io/px4-dev-base/)中的 GCC 4.9.3，并使用 makefile target qgc_firmware 编译 px4fmu-{v2，v4}，mindpx-v2，tap-v1。

Travis-ci 还有一个包含测试的 macOS px4_sitl 版本。

## [Semaphore](https://semaphoreci.com/px4/PX4-Autopilot)

信号量主要用于编译 Qualcomm Snapdragon 平台的更改，但也可以使用相同的[ px4io/px4-dev-base ](https://hub.docker.com/r/px4io/px4-dev-base/) docker 镜像作为 Travis-ci 的备份。 除了由 Travis-ci 编译的固件集之外，Semaphore 还为 stm32discovery 构建过程，进行编解码，运行单元测试，并验证代码样式。

## [CircleCI](https://circleci.com/gh/PX4/PX4-Autopilot)

CircleCI 使用 docker image [ px4io/px4-dev-nuttx-gcc_next ](https://hub.docker.com/r/px4io/px4-dev-nuttx-gcc_next/)测试建议的下一版 GCC，以用于稳定的固件版本。 它使用 makefile target `quick_check`，会编译 `px4_fmu-v4_default`，`px4_sitl_default`，运行测试，并验证代码样式。


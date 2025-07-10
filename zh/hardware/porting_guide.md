---
canonicalUrl: https://docs.px4.io/main/zh/hardware/porting_guide
---

# 飞行控制器移植指南

本主题主要针对希望将 PX4 移植到 *新* 飞控硬件平台上的开发人员。

## PX4 架构

PX4 consists of two main layers: The [board support and middleware layer](../middleware/README.md) on top of the host OS (NuttX, Linux or any other POSIX platform like Mac OS), and the applications (Flight Stack in [src/modules](https://github.com/PX4/Firmware/tree/master/src/modules)\). Please reference the [PX4 Architectural Overview](../concept/architecture.md) for more information.  更多有关详细信息请参阅： [PX4 系统架构概述](../concept/architecture.md) 。

本指南仅关注主机操作系统和中间件，因为 应用层/飞行控制栈 可以在任何目标平台上运行。

## 飞行控制器配置文件分布位置

Board startup and configuration files are located under [/boards](https://github.com/PX4/Firmware/tree/master/boards/) in each board's vendor-specific directory (i.e. **boards/*VENDOR*/*MODEL*/**)).

例如，对于 FMUv5 飞控硬件平台：
* (All) Board-specific files: [/boards/px4/fmu-v5](https://github.com/PX4/Firmware/tree/master/boards/px4/fmu-v5).<!-- NEED px4_version -->
* Build configuration: [/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v5/default.cmake).<!-- NEED px4_version -->
* Board-specific initialisation file: [/boards/px4/fmu-v5/init/rc.board](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v5/init/rc.board) <!-- NEED px4_version -->
  - 如果在飞控板平台目录下可以找到 **init/rc.board** 文件，则针对该飞控板平台的初始化文件将会自动包含在启动脚本中。
  - 该文件用于启动仅存在于特定主板上的传感器 (和其他东西)。 The file is used to start sensors (and other things) that only exist on a particular board. It may also be used to set a board's default parameters, UART mappings, and any other special cases.
  - For FMUv5 you can see all the Pixhawk 4 sensors being started, and it also sets a larger LOGGER_BUF, and in AUTOCNF section (fresh setups) it sets the [SYS_FMU_TASK](../advanced/parameter_reference.md#SYS_FMU_TASK) parameter.

## 主机操作系统配置

本节介绍了移植每个受支持的主机操作系统到新的飞控板硬件平台上需要用到的配置文件的用途和所处位置。

### NuttX

See [NuttX Board Porting Guide](porting_guide_nuttx.md).

### Linux

基于 Linux 的飞控板不包含任何 操作系统和内核的配置。 Linux boards do not include the OS and kernel configuration. These are already provided by the Linux image available for the board (which needs to support the inertial sensors out of the box).

* The boot file system (startup script) is located in: [ROMFS/px4fmu\_common](https://github.com/PX4/Firmware/tree/master/ROMFS/px4fmu_common) <!-- NEED px4_version -->

## 中间件组件和配置

本节介绍各类中间件组件，以及将它们移植到新的飞行控制器硬件所需更新的配置文件。

### QuRT / Hexagon

* The start script is located in [posix-configs/](https://github.com/PX4/Firmware/tree/master/posix-configs). <!-- NEED px4_version -->
* 操作系统配置是默认 Linux 镜像的一部分（TODO: 需要提供 LINUX 镜像文件位置和程序烧写指南）。
* The PX4 middleware configuration is located in [src/drivers/boards](https://github.com/PX4/Firmware/tree/master/src/drivers/boards). TODO: ADD BUS CONFIG <!-- NEED px4_version --> TODO: ADD BUS CONFIG


## RC UART 接线建议

It is generally recommended to connect RC via separate RX and TX pins to the microcontroller. If however RX and TX are connected together, the UART has to be put into singlewire mode to prevent any contention. This is done via board config and manifest files. One example is [px4fmu-v5](https://github.com/PX4/Firmware/blob/master/src/drivers/boards/px4fmu-v5/manifest.c). 如果 RX 和 TX 连在了一起，那么 UART 需要设置为单线模式以防止出现争用。 这可以用过对飞控板的配置文件和 manifest 文件进行更改来实现。 示例可见： [px4fmu-v5](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/manifest.c)。 <!-- NEED px4_version -->


## 官方支持的硬件

PX4 项目支持并维护着 [FMU 标准参考硬件](../hardware/reference_design.md) 及任何与标准相兼容的飞控板平台。 This includes the [Pixhawk-series](../flight_controller/pixhawk_series.md) (see the user guide for a [full list of officially supported hardware](../flight_controller/README.md)).

每个受官方支持的飞控板平台都将受益于：
* PX4 项目仓库中可用的 PX4 移植
* 可从 *QGroundControl* 中直接访问的自动固件编译
* 与生态系统其余部分的兼容性
* 可通过 CI 进行自动检查 — 安全仍是这个社区的重中之重
* [飞行测试](../test_and_ci/test_flights.md)

我们鼓励飞控板制造商以与 [FMU 规格](https://pixhawk.org/) 完全兼容为目标进行生产。 We encourage board manufacturers to aim for full compatibility with the [FMU spec](https://pixhawk.org/). With full compatibility you benefit from the ongoing day-to-day development of PX4, but have none of the maintenance costs that come from supporting deviations from the specification.

:::tip
Manufacturers should carefully consider the cost of maintenance before deviating from the specification (the cost to the manufacturer is proportional to the level of divergence).
:::

还需要注意的是 PX4 开发团队有责任发布安全的软件，因此我们要求所有飞控板制造商都应投入必要的资源来保证他们的意志平台始终处于最新状态并且可用。

如果你想让你的飞控板被 PX4 项目正式支持：

If you want to have your board officially supported in PX4:
* 你的硬件必须在市场上可用（例如它可以被任何开发人员不受限制地购买到） 。
* Hardware must be made available to the PX4 Dev Team so that they can validate the port (contact <lorenz@px4.io> for guidance on where to ship hardware for testing).
* 飞控板必须通过完整的 [测试套件（test suite）](../test_and_ci/README.md) 和 [飞行测试](../test_and_ci/test_flights.md)。

**The PX4 project reserves the right to refuse acceptance of new ports (or remove current ports) for failure to meet the requirements set by the project.**

You can reach out to the core developer team and community on the [official support channels](../contribute/support.md).


## 相关信息

* [Device Drivers](../middleware/drivers.md) - 如何支持新的外围硬件设备（设备驱动）
* [Building the Code](../setup/building_px4.md) - How to build source and upload firmware
* 受支持的飞行控制器：
  * [自动驾驶仪硬件](../flight_controller/README.md)
  * [Supported boards list](https://github.com/PX4/Firmware/#supported-hardware) (Github)
* [Supported Peripherals](../peripherals/README.md)

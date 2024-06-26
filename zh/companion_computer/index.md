# 机载计算机

机载计算机（“任务计算机”）是连接到飞控的独立机载计算机，使得诸如[避障](../computer_vision/obstacle_avoidance.md)和[防撞](../computer_vision/collision_prevention.md)等计算密集型功能成为可能。

下图显示了一个可能的无人驾驶架构，其中包括飞控和机载计算机。

![PX4 架构 - 飞控 + 机载计算机](../../assets/diagrams/px4_companion_computer_simple.svg)

<!-- source for drawing: https://docs.google.com/drawings/d/1ZDSyj5djKCEbabgx8K4ESdTeEUizgEt8spUWrMGbHUE/edit?usp=sharing -->

飞控在 NuttX 上运行 PX4, 提供核心飞控和安全代码。 机载计算机通常运行 Linux, 因为这是一个“通用”软件开发的更好平台。 他们使用快速串行或以太网连接，通常使用 [MAVLink 协议](https://mavlink.io/en/) 或 uXRCE-DDS进行通信。

地面站和云端的通信通常使用机载计算机路由(例如使用[MAVLink Router](https://github.com/mavlink-router/mavlink-router))。

## Pixhawk 自动驾驶仪总线载板与机载计算机

以下载板可以很方便的将 Pixhaw 飞控和机载计算机集成，极大地简化了硬件和软件设置。 这些板支持[Pixhawk Autopilot Bus (PAB)](../flight_controller/pixhawk_autopilot_bus.md)开放标准，因此您可以插入任何兼容的控制器：

- [Holybro Pixhawk Jetson 基板](https://holybro.com/products/pixhawk-jetson-baseboard)
- [Holybro Pixhawk RPI CM4 基板](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md)
- [ARK Jetson PAB 载板](https://arkelectron.gitbook.io/ark-documentation/flight-controllers/ark-jetson-pab-carrier)

## 管理集成系统

以下集成的机载计算机/飞控系统默认使用受控/自定义版本的飞控和机载计算机软件。 它们在这里列出，因为它们可以使用 "vanilla" PX4 固件进行更新，以进行测试/快速开发。

- [Auterion Skynode](../companion_computer/auterion_skynode.md)
- [ModalAI VOXL 2](https://docs.modalai.com/voxl-2/)

## 机载计算机选项

PX4 可以与计算机一起使用，可以配置为通过基于串口(或以太网端口) 的 MAVLink 或 microROS/uXRCE-DDS 进行通信。 以下列出了一小部分可能的替代方案。

高性能计算机：

- [ModalAI VOXL 2](https://docs.modalai.com/voxl2-external-flight-controller/)
- [NXP NavQPlus](https://nxp.gitbook.io/navqplus/user-contributed-content/ros2/microdds)
- [Nvidia Jetson TX2](https://developer.nvidia.com/embedded/jetson-tx2)
* [Intel NUC](https://www.intel.com/content/www/us/en/products/details/nuc.html)
* [Gigabyte Brix](https://www.gigabyte.com/Mini-PcBarebone/BRIX)

小型/低功耗设备如：

- [树莓派](../companion_computer/pixhawk_rpi.md)

::: info
计算机的选择取决于：成本，重量，安装方便和所需的计算资源的权衡。
:::

## 机载计算机软件

机载计算机需要运行能与飞控通信的软件，并将消息路由到地面站和云端。

#### 无人机应用程序

Drone API 和 SDK 允许您编写能够控制 PX4 的软件。 主流的可选方案有：

- 不同编程语言的 [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) - 库是 MAVLink 系统接口，用于无人机，相机或地面站系统。
- [ROS 2](../ros2/index.md) 用于与 ROS 2 节点进行通信（也可以使用）。
- [ROS 1 和 MAVROS](../ros/mavros_installation.md)

MAVSDK 通常更容易学习和使用，而 ROS 提供更多预先编写的软件，用于像计算机视觉这样的高级案例。 [Drone APIs and SDKs > 我该使用哪个 API?](../robotics/index.md#what-api-should-i-use) 详细解释了不同的选项。

您还可以从头开始编写您的自定义 MAVLink 库：

- [C/C++ 示例代码](https://github.com/mavlink/c_uart_interface_example) 显示如何连接自定义代码
- MAVLink 还可以与[许多其他编程语言](https://mavlink.io/en/#mavlink-project-generatorslanguages)一起使用

#### 路由

如果您需要将 MAVLink 从载具桥接到地面站或 IP 网络，您将需要一个路由器。 或者如果您需要多个连接：

- [MAVLink 路由器](https://github.com/intel/mavlink-router) （推荐）
- [MAVProxy](https://ardupilot.org/mavproxy/)

## 以太网设置

以太网是推荐的连接方式，如果飞行控制器支持的话。 请参阅[以太网设置](../advanced_config/ethernet_setup.md)获取说明。

## 飞控特定设置

以下章节介绍了如何为特定的飞控设置机载计算机，特别是当您不是使用以太网连接时。

- [使用机载计算机与 Pixhawk 控制器](../companion_computer/pixhawk_companion.md)

## 更多信息

- [机载计算机外设](../companion_computer/companion_computer_peripherals.md)
- [PX4 系统架构 > 飞控和机载计算机](../concept/px4_systems_architecture.md#fc-and-companion-computer)

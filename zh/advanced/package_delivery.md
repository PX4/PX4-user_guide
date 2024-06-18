# 包裹投递任务

<Badge type="tip" text="PX4 v1.14" />

包裹投递任务是航点任务的拓展，用户可以计划将包裹作为航点进行投递。

本节解释了包裹投递功能的架构。 它的目的是为从事扩展架构的开发者提供支持，例如支持新的有效载荷投递机制。

::: 信息
目前只有 [Glrippers](../peripherals/gripper.md) 可以用投递包裹。 绞盘尚未支持。
:::

::: info
关于如何设置包裹投递任务计划的详细文档可以在这里找到 [here](../flying/package_delivery_mission.md)。 `payload_deliverr` 模块的设置已包含在包裹投递机制的文档中，例如 [Gripper](../peripherals/gripper.md#px4-configuration)
:::

## 包裹投递架构图

![包裹投递架构概述](../../assets/advanced_config/payload_delivery_mission_architecture.png)

包裹投递功能围绕着 [VehicleCommand](../msg_docs/VehicleCommand.md) & [VehicleCommandAck](../msg_docs/VehicleCommandAck.md) 消息。

中心思想是拥有一个处理 `DO_GRIPPER` 或 `DO_WINCH` 车辆命令的实体。 执行它并在确认成功投递时发送回确认。

因为 PX4 自动将 `VehicleCommand` uORB消息转播到一个用于 MAVLink 的 UART 端口，该端口被配置为 [`COMMAND_LONG`](https://mavlink.io/en/messages/common.html#COMMAND_LONG) 消息， 外部有效载荷可以接收命令并执行它。

同样， 从 PX4 自动将 [`COMMAND_ACK`](https://mavlink.io/en/messages/common.html#COMMAND_ACK) 来自外部来源的消息通过为 MAVLink 配置的 UART 端口传入到 `vehicle_command_ack` uORB 消息， PX4的 `navigator` 模块可以收到外部有效载荷对成功部署包的确认。

下面解释了包裹投递架构中涉及的每个实体。

## 导航器

导航器处理接收车辆命令 ACK (下文所述)。 在收到成功部署确认消息后，它会设置任务块级别中的标志，以表示有效载荷部署已成功。

这允许任务安全地继续到下一个项目(例如路径点)，因为我们确信部署已成功得到确认。

## 车辆命令 ACK

我们正在等待来自内部的 ACK (通过 `payload_deliver` 模块)， 或外部(发送MAVLink消息的外部实体 `COMMAND_ACK`) 以确定包交付行动是否成功( `DO_GRIPPER` 或 `DO_WINCH`)。

## 任务

夹持器/绞盘命令被放置为一个`Mission Item`。 这是可能的，因为所有任务项目都有执行`MAV_CMD`（例如降落、起飞、航点等）的命令，可以设置为`DO_GRIPPER`或`DO_WINCH`。

在任务逻辑（上方的绿色框）中，如果到达夹持器/绞盘任务项目中的任一项，它将为旋翼飞行器（例如多轴飞行器）实现刹车保持功能（将下一个任务项目航点的`valid`标志设置为`false`），以便在执行部署时车辆将保持其位置。

固定翼飞机和其他车辆不考虑特殊制动条件。 所以如果你有一个固定翼的悬停任务，飞机在悬停的同时投递包裹，飞机不会停止 (因为这是不可能的)。

## 任务块

`MissionBlock`是`Mission`的父类，处理"任务是否已完成？"

这一切都在 `是指任务_item_reached_or_completed` 函数中执行，以处理时间延迟/任务项目的提升。

同时它实现了实际的issue_command函数，这将发布与任务项的 `MAV_CMD` 对应的机体命令，然后由外部有效载荷或内部的 `payload_deliverer` 模块接收。

## 有效载荷投递

这是一个专用模块，用于处理夹具/绞盘支持，用于标准[package delivery mission plan](../flying/package_delivery_mission.md)。

`payload_deliverer` 模块的设置已包含在设置实际包裹释放机制设置文档中，如 [Gripper](../peripherals/gripper.md#px4-configuration).

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

![Package delivery architecture overview](../../assets/advanced_config/payload_delivery_mission_architecture.png)

包裹投递功能围绕着 [VehicleCommand](../msg_docs/VehicleCommand.md) & [VehicleCommandAck](../msg_docs/VehicleCommandAck.md) 消息。

中心思想是拥有一个处理 `DO_GRIPPER` 或 `DO_WINCH` 车辆命令的实体。 执行它并在确认成功投递时发送回确认。

因为 PX4 自动将 `VehicleCommand` uORB消息转播到一个用于 MAVLink 的 UART 端口，该端口被配置为 [`COMMAND_LONG`](https://mavlink.io/en/messages/common.html#COMMAND_LONG) 消息， 外部有效载荷可以接收命令并执行它。

同样， 从 PX4 自动将 [`COMMAND_ACK`](https://mavlink.io/en/messages/common.html#COMMAND_ACK) 来自外部来源的消息通过为 MAVLink 配置的 UART 端口传入到 `vehicle_command_ack` uORB 消息， PX4的 `navigator` 模块可以收到外部有效载荷对成功部署包的确认。

下面解释了包裹投递架构中涉及的每个实体。

## 导航器

导航器处理接收车辆命令 ACK (下文所述)。 在收到成功部署确认消息后，它会设置任务块级别中的标志，以表示有效载荷部署已成功。

这允许任务安全地继续到下一个项目(例如路径点)，因为我们确信部署已成功得到确认。

## 车辆命令 ACK

We are waiting for the ACK coming from either internally (via `payload_deliverer` module), or externally (external entity sending the MAVLink message `COMMAND_ACK`) to determine if the package delivery action has been successful (either `DO_GRIPPER` or `DO_WINCH`).

## Mission

The Gripper / Winch command is placed as a `Mission Item`. This is possible since all the Mission item has the `MAV_CMD` to execute (e.g. Land, Takeoff, Waypoint, etc) which can get set to either `DO_GRIPPER` or `DO_WINCH`.

In the Mission logic (green box above) if either Gripper/Winch mission item is reached, it implements brake_for_hold functionality (which sets the `valid` flag of the next mission item waypoint to `false`) for rotary wings (e.g. Multicopter) so that the vehicle would hold it's position while the deployment is getting executed.

For fixed-wing and other vehicles, no special braking condition is considered. So if you have a loiter mission item for a fixed-wing, it will execute the delivery whilst doing the loiter, and won’t come to a stop (as it’s impossible)

## Mission Block

`MissionBlock` is the parent class of `Mission` that handles the part "Is Mission completed?".

This all performed in the `is_mission_item_reached_or_completed` function, to handle the time delay / mission item advancement.

Also it implements the actual issue_command function, which will issue a vehicle command corresponding to the mission item's `MAV_CMD`, which will then be received by an external payload or the `payload_deliverer` module internally.

## Payload Deliverer

This is a dedicated module that handles gripper / winch support, which is used for the standard [package delivery mission plan](../flying/package_delivery_mission.md).

Setup for the `payload_deliverer` module is covered within setting up an actual package release mechanism setup documentation like [Gripper](../peripherals/gripper.md#px4-configuration).

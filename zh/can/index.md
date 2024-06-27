# CAN

[局域网控制器(CAN)](https://en.wikipedia.org/wiki/CAN_bus) 是一种强大的有线网络，允许无人机组件 (如飞控，电调，传感器和其他外设) 之间相互通信。 因为它的设计有仲裁，使用差分信号，即使在较长的电缆 (大型车辆上) 上也非常强大，避免单点故障。 CAN 还允许来自外设的状态反馈，并通过总线方便的进行固件升级。

PX4 支持与 CAN 设备通信的两个软件协议：

- [DroneCAN](../dronecan/index.md): PX4 推荐大多数常见设置使用此协议。 它得到了 PX4 的很好支持，是一个成熟的产品，具有广泛的外围支持，并经过多年的测试。
- [Cyphal](https://opencyphal.org): PX4 支持仍在"进行中"。 Cyphal 是一种更新的协议，允许更多的灵活性和配置，尤其是对于较大和较复杂的载具。 它还没有被广泛应用。

::: info DroneCAN 和 Cyphal 都源自于较早的 UAVCAN 项目。 在2022年，该项目分为两个部分：原始版本的 UAVCAN (UAVCAN v0) 更名为 DroneCAN，较新的 UAVCAN v1 更名为 Cyphal。 这两种协议之间的区别在[Cyphal vs. DroneCAN](https://forum.opencyphal.org/t/cyphal-vs-dronecan/1814)中有描述。
:::

:::warning
PX4 目前不支持其他无人机使用的 CAN 软件协议，如 KDECAN (截至撰写本文时)。
:::

## 接线

CAN 网络的接线对于 DroneCAN 和 Cyphal/CAN 是一样 (实际上对所有的 CAN 网络都一样)。

设备以任意顺序连接成链。 在链的任一端，应该在两个数据线之间连接一个 120Ω 的终端电阻。 飞控和一些 GNSS 模块为了方便使用内置了终端电阻， 因此应该放在链的终端。 否则你可以使用[来自 Zubax Robotics](https://shop.zubax.com/products/uavcan-micro-termination-plug?variant=6007985111069) 的终端电阻，或者您可以使用 JST-GH 端子自己焊一个。

下图显示了一个 CAN 总线连接飞控到 4 个 CAN 电调和一个 GNSS 的示例。

![CAN 接线](../../assets/can/uavcan_wiring.svg)

图中未显示任何电源接线。 参考制造商的说明，确认组件是否需要单独供电，还是可以通过 CAN 总线供电。

欲了解更多信息，请参阅[Cyphal/CAN 设备互连](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (kb.zubax.com)。 虽然本文是以 Cyphal 协议为基础编写的，但同样适用于 DroneCAN 硬件和任何其他 CAN 设置。 有关更高级的场景，请咨询[关于CAN 总线拓扑和终端](https://forum.opencyphal.org/t/on-can-bus-topology-and-termination/1685)。

### 连接器

Pixhawk standard compatible CAN devices use 4 pin JST-GH connectors for CAN. Two connectors are used for input and output when wiring in a chain (except for flight controllers and some GNSS devices with builtin termination, which only have a single JST-GH connector).

Other (non-Pixhawk compatible) devices may use different connectors. However, as long as the device firmware supports DroneCAN or Cyphal, it can be used.

### 冗余

DroneCAN and Cyphal/CAN support using a second (redundant) CAN interface. This is completely optional but increases the robustness of the connection. All Pixhawk flight controllers come with 2 CAN interfaces; if your peripherals support 2 CAN interfaces as well, it is recommended to wire both up for increased safety.

## 固件

CAN peripherals may run proprietary or open source firmware (check manufacturer guides to confirm the required setup).

PX4 can be built to run as open-source DroneCAN firmware on supported CAN hardware. See [PX4 DroneCAN Firmware](../dronecan/px4_cannode_fw.md) for more information.

## 支持和配置

[DroneCAN 设置和配置](../dronecan/index.md)

[PX4 DroneCAN 固件](../dronecan/px4_cannode_fw.md)

## 视频

### DroneCAN

关于 DroneCAN (UAVCANv0) 的介绍和在 QGroundControl 中设置的实用示例：

@[youtube](https://youtu.be/IZMTq9fTiOM)

### Cyphal

无人机 UAVCAN v1 — PX4 开发者虚拟峰会 2020

@[youtube](https://youtu.be/6Bvtn_g8liU)

---

在NXP UAVCAN 板上使用 PX4 开始使用 UAVCAN v1- PX4 开发者虚拟峰会 2020 @[youtube](https://youtu.be/MwdHwjaXYKs)

---

UAVCAN：一个高度可靠的发布-订阅协议，用于硬实时车辆内网络 — PX4 开发者虚拟峰会 2019

@[youtube](https://youtu.be/MBtROivYPik)

---
canonicalUrl: https://docs.px4.io/main/zh/advanced/gimbal_control
---

# 云台控制设置

如果你想要去控制一个装在飞机上带相机的云台（或者是其他的挂载设备），你需要配置使用什么去控制它和 PX4 怎样才能命令它。 本页内容就是讲解这些设置。

PX4 包含了一个通用的挂载设备/云台的控制驱动，它含有多种输入输出方式。
- 输入就是你使用什么去控制云台：通过遥控器或者 MAVLink 命令（例如处在任务模式或者搜索模式时）。
- 输出定义了云台连接方式：或者通过 MAVLink 命令，或者使用飞控的 AUX PWM 端口。 可以选择任何的输入方式去驱动任何的输出。 两种方式都需要通过参数配置。

## 参数

这些[Mount](../advanced_config/parameter_reference.md#mount) 参数被用于配置挂载设备的驱动。

其中最重要的是输入模式 ([ MNT_MODE_IN ](../advanced_config/parameter_reference.md#MNT_MODE_IN)) 和输出模式 ([ MNT_MODE_OUT ](../advanced_config/parameter_reference.md#MNT_MODE_OUT)) 。 默认情况下，输入是没有被使能的，所以这个驱动没有运行。 选择了输入模式之后，重启飞机便可以使设备驱动开始工作。

如果输入模式设置为 `AUTO`，则模式将根据最新输入进行自动切换。 如果需要从 MAVLink 切换为 RC 输入，则需要一个较大的杆量。

## MAVLink 云台(MNT_MODE_OUT=MAVLINK)

要启用 MAVLink 云台，先设置参数[MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN)为`MAVLINK_DO_MOUNT`，和参数[MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT)为`MAVLINK`。

云台可以参照[MAVLink 外设 (GCS/OSD/Companion)(../peripherals/mavlink_peripherals.md#mavlink-peripherals-gcsosdcompanion)中的说明连接到*任何空闲串口*，（也可以参照[串口配置](../peripherals/serial_configuration.md#serial-port-configuration)）。

常见的配置是从飞控的 TELEM2 串口连接到云台（假设 TELEM2 是空闲的）。 您将为此配置设置：
- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG)为**TELEM2**（如果`MAV_1_CONFIG`已经用于连接机载计算机，使用`MAV_2_CONFIG`）。
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE)为**NORMAL**
- [SER_TEL2)BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD)设置为厂家建议的波特率。

这将使用户能够使用 [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL) 和 [MAV_CMD_DOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE) 来命令云台。


## 飞控云台（MNT_MODE_OUT=AUX）

可以通过设置输出模式`MNT_MODE_OUT=AUX`，这样云台可以连接到飞控的 AUX 端口。

需要一个混控器文件来定义输出引脚的映射，并自动选择[ mount mixer](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/mount.aux.mix)（这会覆盖机架配置提供的任何 AUX 混控器）。

输出分配如下所示：
- **AUX1**: Pitch
- **AUX2**: Roll
- **AUX3**: Yaw
- **AUX4**: Shutter/retract

### 自定义混控器配置

:::tip
阅读[混控和执行器](../concept/mixing.md)来理解混控器的工作方式和混控器的文件格式。
:::

输出自定义可以通过在 SD卡上[创建一个混控器文件](../concept/system_startup.md#starting-a-custom-mixer)名字为`etc/mixers/mount.aux.mix`实现。

下面是一个挂载基本混控器的配置。

```
# roll
M: 1
O:      10000  10000      0 -10000  10000
S: 2 0  10000  10000      0 -10000  10000

# pitch
M: 1
O:      10000  10000      0 -10000  10000
S: 2 1  10000  10000      0 -10000  10000

# yaw
M: 1
O:      10000  10000      0 -10000  10000
S: 2 2  10000  10000      0 -10000  10000

```


## SITL

Typhoon H480 型号带有预先配置的模拟云台。

要运行它，请使用：
```
make px4_sitl gazebo_typhoon_h480
```

为了能够在其他模型或者仿真器件下测试挂载驱动，请使用 `vmount start` 去确保驱动正在运行。 然后再配置它的参数。


## 测试
驱动程序提供了一个简单的测试指令。 首先它需要使用 </code>vmount stop</0> 指令来停止。 接下来描述了在SITL中的测试方式，但是这些指令也可以在真实的设备中使用。

使用下面这条指令开始仿真（不需要修改任何参数）：
```
make px4_sitl gazebo_typhoon_h480
```
确保无人机是上锁状态，例如使用`命令行 takeoff`， 然后用下面的命令来控制云台（例如）：
```
vmount test yaw 30
```

注意模拟的云台自身稳定，因此如果发送 MAVLink 命令，设置`stabilize`标志为`false`。

![Gazebo 云台仿真](../../assets/simulation/gazebo/gimbal-simulation.png)


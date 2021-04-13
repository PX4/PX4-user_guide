# 云台控制设置

如果你想要去控制一个装在飞机上带相机的云台（或者是其他的挂载设备），你需要配置使用什么去控制它和 PX4 怎样才能命令它。 本页内容就是讲解这些设置。

PX4 包含了一个通用的挂载设备/云台的控制驱动，它含有多种输入输出方式。
- 输入就是你使用什么去控制云台：通过遥控器或者 MAVLink 命令（例如处在任务模式或者搜索模式时）。
- 输出定义了云台连接方式：或者通过 MAVLink 命令，或者使用飞控的 AUX PWM 端口。 可以选择任何的输入方式去驱动任何的输出。 两种方式都需要通过参数配置。

## 参数

这些[Mount](../advanced_config/parameter_reference.md#mount) 参数被用于配置挂载设备的驱动。

其中最重要的是输入模式 ([ MNT_MODE_IN ](../advanced_config/parameter_reference.md#MNT_MODE_IN)) 和输出模式 ([ MNT_MODE_OUT ](../advanced_config/parameter_reference.md#MNT_MODE_OUT)) 。 默认情况下，输入是没有被使能的，所以这个驱动没有运行。 选择了输入模式之后，重启飞机便可以使设备驱动开始工作。

如果输入模式设置为 `AUTO`，则模式将根据最新输入进行自动切换。 如果需要从 MAVLink 切换为 RC 输入，则需要一个较大的杆量。

## AUX 输出

输出分配如下所示:

The gimbal can be connected to *any free serial port* using the instructions in [MAVLink Peripherals (GCS/OSD/Companion)(../peripherals/mavlink_peripherals.md#mavlink-peripherals-gcsosdcompanion) (also see [Serial Port Configuration](../peripherals/serial_configuration.md#serial-port-configuration)).

A common configuration is to have a serial connection to the gimbal from the Flight Controller TELEM2 port (assuming TELEM2 is free). For this configuration you would set:
- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) to **TELEM2** (if `MAV_1_CONFIG` is already used for a companion computer (say), use `MAV_2_CONFIG`).
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) to **NORMAL**
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) to manufacturer recommended baud rate.

This will enable the user to command the gimbal using [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL) and [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE).


## 软件在环仿真（ SITL ）

The gimbal can be connected to the Flight controller AUX ports by setting the output mode to `MNT_MODE_OUT=AUX`.

如果输出模式设置为`AUX`，需要定义混控器文件去重新映射输出引脚，[挂载混控器](https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/mixers/mount.aux.mix)会被自动选择（机型配置文件提供了覆盖任何一款的 AUX 混控器）。

使用下面这条指令开始仿真（不需要修改任何参数）：
- **AUX1**: Pitch
- **AUX2**: Roll
- **AUX3**: Yaw
- **AUX4**: Shutter/retract

### 自定义混控器配置

:::tip
Read [Mixing and Actuators](../concept/mixing.md) for an explanation of how mixers work and the format of the mixer file.
:::

下面举例的是挂载设备的基本混控器配置：

台风 H480 的模型带有一个预先配置的仿真云台。

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


## 测试

若要运行它，请使用：

为了能够在其他模型或者仿真器件下测试挂载驱动，请使用 `vmount start` 去确保驱动正在运行。 然后再配置它的参数。
```
make px4_sitl gazebo_typhoon_h480
```

To just test the mount driver on other models or simulators, make sure the driver runs (using `vmount start`), then configure its parameters.


## 测试
The driver provides a simple test command - it needs to be stopped first with `vmount stop`. The following describes testing in SITL, but the commands also work on a real device.

Start the simulation with (no parameter needs to be changed for that):
```
make px4_sitl gazebo_typhoon_h480
```
因此，如果发送 mavlink 命令，请将 `stabilize` 标志设置为 false。
```
vmount test yaw 30
```

Note that the simulated gimbal stabilizes itself, so if you send MAVLink commands, set the `stabilize` flags to `false`.

![Gazebo Gimbal Simulation](../../assets/simulation/gazebo/gimbal-simulation.png)


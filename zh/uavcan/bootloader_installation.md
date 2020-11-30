# UAVCAN Bootloader 安装

> ** 警告 **UAVCAN 设备通常使用预安装的引导程序装运。 除非您正在开发 UAVCAN 设备, 否则请不要按照本节中的说明操作。

## 概述

PX4 项目包含一个用于 STM32 设备的标准 UAVCAN 引导程序。

引导程序占用第一个 8–16 KB 的闪存, 并且是第一个在开机时执行的代码。 通常, 引导程序执行低级设备初始化, 自动确定 can 总线波特率, 充当 UAVCAN 动态节点 id 客户端以获取唯一的节点 id, 并等待飞行控制器的确认, 然后再继续应用程序启动。

此过程确保 UAVCAN 设备可以从无效或损坏的应用程序固件中恢复, 而无需用户干预, 并且还允许自动固件更新。

## 系统必备组件

安装或更新 UAVCAN 引导加载程序需要：

* SWD或 JTAG 接口 (视设备而定), 例如 [ BlackMagic Probe ](http://www.blacksphere.co.nz/main/blackmagic) 或 [ ST Link v2 ](http://www.st.com/internet/evalboard/product/251168.jsp);
* 用于将您的SWD或 JTAG 接口连接到 UAVCAN 设备的调试端口的适配器电缆;
* [ 支持的 ARM 工具链 ](../setup/dev_env.md)。

## 设备准备

如果无法使用下面的说明连接到设备, 则该设备上已存在的固件可能已禁用 MCU 的调试针脚。 要从中恢复, 您需要将接口的 NRST 或 nSRST pin (标准20针连接器上的 15引脚) 连接到 MCU 的 NRST 引脚。 获取设备示意图和 PCB 布局, 或与制造商联系以了解详细信息。

## 安装

在编译或获取设备的引导程序映像后 (有关详细信息, 请参阅设备文档), 引导加载程序必须复制到设备闪存的开头。

这样做的过程取决于SWD或 JTAG 的使用接口。

## BlackMagic Probe

确保 BlackMagic Probe [firmware is up to date](https://github.com/blacksphere/blackmagic/wiki/Hacking)。

将探头连接到 UAVCAN 设备，然后将探头连接到计算机。

识别探针的设备名称。 Identify the probe's device name. This will typically be `/dev/ttyACM<x>` or `/dev/ttyUSB<x>`.

启动 UAVCAN 设备，然后运行：

```sh
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

在 `gdb` 提示符下，运行：

```sh
target extended /dev/ttyACM0
monitor connect_srst enable
monitor swdp_scan
attach 1
set mem inaccessible-by-default off
load
run
```

如果 `monitor swdp_scan` 返回错误，请确保您的接线正确，并且您拥有最新版本的 BlackMagic 固件。

## ST-Link v2

确保您拥有最新版本-至少 0.9.0-of [OpenOCD](http://openocd.org)。

将 ST-Link 连接到 UAVCAN 设备，然后将 ST-Link 连接到计算机。

启动 UAVCAN 设备，然后运行：

```sh
openocd -f /path/to/your/openocd.cfg &
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

在 `gdb` 提示符下，运行：

```sh
target extended-remote localhost:3333
monitor reset halt
set mem inaccessible-by-default off
load
run
```

## Segger J-Link 调试器

将 JLink 调试器连接到 UAVCAN 设备，并将 JLink 调试器连接到计算机。

启动 UAVCAN 设备，然后运行：

```
JLinkGDBServer -select USB=0 -device STM32F446RE -if SWD-DP -speed 20000 -vd
```

打开第二个终端，转到包含 esc 的 px4esc_1_6-bootloader.elf 的目录并运行：

```
arm-none-eabi-gdb px4esc_1_6-bootloader.elf
```

在 `gdb` 提示符下，运行：

```
tar ext :2331
load
```

## 使用SEGGER Jink 调试器擦除Flash

As a recovery method it may be useful to erase flash to factory defaults such that the firmware is using the default parameters. Go to the directory of your SEGGER installation and launch JLinkExe, then run: 转到 SEGGER 安装目录并启动 JLinkExe，然后运行：

```
device &lt;name-of-device&gt;
erase
```

将 `&lt;name-of-device&gt;`替换为微控制器的名称，例如 用于 Pixhawk ESC 1.6 的 STM32F446RE 或用于 SV2470VC ESC 的 STM32F302K8。
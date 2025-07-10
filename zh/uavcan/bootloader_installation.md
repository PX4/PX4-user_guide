---
canonicalUrl: https://docs.px4.io/main/zh/uavcan/bootloader_installation
---

# UAVCAN Bootloader 安装

:::warning
UAVCAN devices typically ship with a bootloader pre-installed.
Do not follow the instructions in this section unless you are developing UAVCAN devices.
:::

## 概述

The PX4 project includes a standard UAVCAN bootloader for STM32 devices.

The bootloader occupies the first 8–16 KB of flash, and is the first code executed on power-up. Typically, the bootloader performs low-level device initialization, automatically determines the CAN bus baud rate, acts as a UAVCAN dynamic node ID client to obtain a unique node ID, and waits for confirmation from the flight controller before proceeding with application boot.

安装或更新 UAVCAN 引导加载程序需要：

## 系统必备组件

Installing or updating the UAVCAN bootloader requires:

* SWD或 JTAG 接口 (视设备而定), 例如 [ BlackMagic Probe ](http://www.blacksphere.co.nz/main/blackmagic) 或 [ ST Link v2 ](http://www.st.com/internet/evalboard/product/251168.jsp);
* 用于将您的SWD或 JTAG 接口连接到 UAVCAN 设备的调试端口的适配器电缆;
* [ 支持的 ARM 工具链 ](../setup/dev_env.md)。

## 设备准备

If you are unable to connect to your device using the instructions below, it's possible that firmware already on the device has disabled the MCU's debug pins. To recover from this, you will need to connect your interface's NRST or nSRST pin (pin 15 on the standard ARM 20-pin connector) to your MCU's NRST pin. Obtain your device schematics and PCB layout or contact the manufacturer for details.

## 安装

这样做的过程取决于SWD或 JTAG 的使用接口。

确保 BlackMagic Probe [firmware is up to date](https://github.com/blacksphere/blackmagic/wiki/Hacking)。

## BlackMagic Probe

将探头连接到 UAVCAN 设备，然后将探头连接到计算机。

Connect the probe to your UAVCAN device, and connect the probe to your computer.

Identify the probe's device name. This will typically be `/dev/ttyACM<x>` or `/dev/ttyUSB<x>`.

在 `gdb` 提示符下，运行：

```sh
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

如果 `monitor swdp_scan` 返回错误，请确保您的接线正确，并且您拥有最新版本的 BlackMagic 固件。

```sh
target extended /dev/ttyACM0
monitor connect_srst enable
monitor swdp_scan
attach 1
set mem inaccessible-by-default off
load
run
```

确保您拥有最新版本-至少 0.9.0-of [OpenOCD](http://openocd.org)。

## ST-Link v2

将 ST-Link 连接到 UAVCAN 设备，然后将 ST-Link 连接到计算机。

启动 UAVCAN 设备，然后运行：

在 `gdb` 提示符下，运行：

```sh
openocd -f /path/to/your/openocd.cfg &
arm-none-eabi-gdb /path/to/your/bootloader/image.elf
```

将 JLink 调试器连接到 UAVCAN 设备，并将 JLink 调试器连接到计算机。

```sh
target extended-remote localhost:3333
monitor reset halt
set mem inaccessible-by-default off
load
run
```

## Segger J-Link 调试器

启动 UAVCAN 设备，然后运行：

打开第二个终端，转到包含 esc 的 px4esc_1_6-bootloader.elf 的目录并运行：

```
JLinkGDBServer -select USB=0 -device STM32F446RE -if SWD-DP -speed 20000 -vd
```

在 `gdb` 提示符下，运行：

```
arm-none-eabi-gdb px4esc_1_6-bootloader.elf
```

At the `gdb` prompt, run:

```
tar ext :2331
load
```

## 使用SEGGER Jink 调试器擦除Flash

As a recovery method it may be useful to erase flash to factory defaults such that the firmware is using the default parameters. Go to the directory of your SEGGER installation and launch JLinkExe, then run:

```
device &lt;name-of-device&gt;
erase
```

Replace `<name-of-device>` with the name of the microcontroller, e.g. STM32F446RE for the Pixhawk ESC 1.6 or STM32F302K8 for the SV2470VC ESC.
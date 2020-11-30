# STM32 Bootloader

PX4 引导加载程序的代码可从 Github [ Bootloader ](https://github.com/px4/bootloader)存储库获得。

## 支持的飞控板

* FMUv2 (Pixhawk 1, STM32F4)
* FMUv3 (Pixhawk 2, STM32F4)
* FMUv4 (Pixracer 3 and Pixhawk 3 Pro, STM32F4)
* FMUv5 (Pixhawk 4, STM32F7)
* TAPv1 (TBA, STM32F4)
* ASCv1 (TBA, STM32F4)

## 构建 Bootloader

```bash
git clone https://github.com/PX4/Bootloader.git
cd Bootloader
git submodule init
git submodule update
make
```

在此步骤之后，所有支持的主板的 elf 文件范围都出现在引导 Bootloader 目录中。

## 刷写 Bootloader

> **Important** 正确的电源序列对于某些电路板允来许 JTAG/SWD 访问至关重要。 请完全按照所述步骤操作。

以下说明适用于 Blackmagic/Dronecode probe。 其他 JTAG 仿真器需要不同但相似的步骤。 试图刷新引导加载程序的开发人员应具备所需的知识。 如果您不知道如何执行此操作，您可能应该重新考虑是否确实需要更改引导加载程序的任何内容。

顺序为：
1. 断开 JTAG 电缆的连接
1. 连接 USB 电源线
1. 连接 JTAG 电缆

### 黑魔法/无人机探测器

#### 使用正确的串行端口

* 在 Linux 上： `/dev/serial/by-id/usb-Black_Sphere_XXX-if00`
* 在 MAC OS 上：确保使用 cu.xxx 端口，而不是 tty.xxx 端口： `tar ext /dev/tty.usbmodemDDEasdf`

```bash
arm-none-eabi-gdb
  (gdb) tar ext /dev/serial/by-id/usb-Black_Sphere_XXX-if00
  (gdb) mon swdp_scan
  (gdb) attach 1
  (gdb) mon option erase
  (gdb) mon erase_mass
  (gdb) load tapv1_bl.elf
        ...
        Transfer rate: 17 KB/sec, 828 bytes/write.
  (gdb) kill
        Transfer rate: 17 KB/sec, 828 bytes/write.
  (gdb) kill
```

### J-Link

这些指令适用于[ J-Link GDB server](https://www.segger.com/jlink-gdb-server.html)。

#### 系统必备组件

[ Download the J-Link software ](https://www.segger.com/downloads/jlink)并按照 Segger 网站的说明进行安装。

#### 运行 JLink GDB 服务器

以下命令用于为使用 STM32F427VI SoC 的飞行控制器运行服务器：

```bash
JLinkGDBServer -select USB=0 -device STM32F427VI -if SWD-DP -speed 20000
```

常见目标的 `--device`/SoC是：

* **FMUv2、FMUv3、FMUv4、aerofc-v1、mindpx-v2：**STM32F427VI
* **px4_fmu-v4pro：**STM32F469II
* **px4_fmu-v5：** STM32F765II
* **crazyflie：**STM32F405RG


#### 连接 GDB

```bash
arm-none-eabi-gdb
  (gdb) tar ext :2331
  (gdb) load aerofcv1_bl.elf
```

### 故障处理

如果找不到上述任何命令，则表示您未使用 Blackmagic 探针或其软件已过期。 首先更新 on-probe 软件。

如果出现此错误消息： `Error erasing flash with vFlashErase packet`
```
Error erasing flash with vFlashErase packet
```

断开目标连接（同时保持 JTAG 连接）并运行

```bash
mon tpwr disable
swdp_scan
attach 1
load tapv1_bl.elf
```
这将禁用目标供电并尝试另一个闪光周期。

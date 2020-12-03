# UAVCAN 固件升级

## Ectorcontrol ESC 代码库（Pixhawk ESC 1.6 和 S2740VC）

下载电调代码

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

### 刷写 Bootloader

Before updating firmware via UAVCAN, the Pixhawk ESC 1.6 requires the UAVCAN bootloader be flashed. To build the bootloader, run: 要构建引导加载程序，请运行：

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

After building, the bootloader image is located at `firmware/px4esc_1_6-bootloader.bin`, and the OpenOCD configuration is located at `openocd_px4esc_1_6.cfg`. Follow [these instructions](../uavcan/bootloader_installation.md) to install the bootloader on the ESC. 按照 [these instructions](../uavcan/bootloader_installation.md) 在 ESC 上安装引导加载程序。

### 编译二进制文件

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

This will build the UAVCAN node firmware for both supported ESCs. The firmware images will be located at `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin` and `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.binn`. 固件将位于 `com.thiemar.s2740vc-v1-1.0-1.0。&lt;git hash&gt;.bin` 和 `org.pixhawk.px4esc-v1-1.6-1.0。&lt;git hash&gt;.binn`。

## Sapog 代码库（Pixhawk ESC 1.4和Zubax Orel 20）

下载 Sapog 代码库：

```sh
git clone https://github.com/PX4/sapog
cd sapog
git submodule update --init --recursive
```

### 刷写 Bootloader

Before updating firmware via UAVCAN, the ESC requires the UAVCAN bootloader to be flashed. The bootloader can be built as follows: 引导加载程序可以构建如下：

```sh
cd bootloader
make clean && make -j8
cd ..
```

The bootloader image is located at `bootloader/firmware/bootloader.bin`, and the OpenOCD configuration is located at `openocd.cfg`. Follow [these instructions](../uavcan/bootloader_installation.md) to install the bootloader on the ESC. 按照 [these instructions](../uavcan/bootloader_installation.md) 在 ESC 上安装引导加载程序。

### 编译二进制文件

```sh
cd firmware
make RELEASE=1 # RELEASE 是可选的；省略掉可构建调试版本
```

请注意，一些较新版本的 GCC 会在链接期间导致段错误。 版本 4.9 在撰写本文时确实有效。 固件映像将位于 `firmware/build/io.px4.sapog-1.1-1.7。&lt;xxxxxxxx&gt;.application.bin`, where`&lt;xxxxxxxx&gt;`是数字和字母的任意序列。 Zubax Orel 20 有两个硬件版本（1.0 和 1.1）。 确保将二进制文件复制到后续说明中的正确文件夹中。 ESC 固件将检查硬件版本并适用于这两种产品。

## Zubax GNSS

请参阅 [project page](https://github.com/Zubax/zubax_gnss) 以了解如何构建和刷新固件。 Please refer to the [project page](https://github.com/Zubax/zubax_gnss) to learn how to build and flash the firmware. Zubax GNSS comes with a UAVCAN-capable bootloader, so its firmware can be updated in a uniform fashion via UAVCAN as described below.

## 无人机上的固件安装

The UAVCAN node file names follow a naming convention which allows the Pixhawk to update all UAVCAN devices on the network, regardless of manufacturer. The firmware files generated in the steps above must therefore be copied to the correct locations on an SD card or the PX4 ROMFS in order for the devices to be updated. 因此，必须将上述步骤中生成的固件文件复制到 SD 卡或 PX4 ROMFS 上的正确位置，以便更新设备。

固件映像名称的规则是:

```
<uavcan name>-<hw version major>.<hw version minor>-<sw version major>.<sw version minor>.<version hash>.bin
```

e.g. `com.thiemar.s2740vc-v1-1.0-1.0.68e34de6.bin`

但是，由于空间/性能限制（名称可能不超过 28 个字符），UAVCAN 固件更新程序要求将这些文件名拆分并存储在如下目录结构中：

```
/fs/microsd/fw/<node name>/<hw version major>.<hw version minor>/<hw name>-<sw version major>.<sw version minor>.<git hash>.bin
```

例如
```
s2740vc-v1-1.0.68e34de6.bin 
/fs/microsd/fw/io.px4.sapog/1.1/sapog-1.7.87c7bc0.bin
```

The ROMFS-based updater follows that pattern, but prepends the file name with `_` so you add the firmware in:

```
/etc/uavcan/fw/<device name>/<hw version major>.<hw version minor>/_<hw name>-<sw version major>.<sw version minor>.<git hash>.bin
```

## 将二进制文件放置在 PX4 ROMFS 中

生成的最终文件位置是：

* S2740VC ESC: `ROMFS/px4fmu_common/uavcan/fw/com.thiemar.s2740vc-v1/1.0/_s2740vc-v1-1.0.&lt;git hash&gt;.bin`
* Pixhawk ESC 1.6: `ROMFS/px4fmu_common/uavcan/fw/org.pixhawk.px4esc-v1/1.6/_px4esc-v1-1.6.&lt;git hash&gt;.bin`
* Pixhawk ESC 1.4: `ROMFS/px4fmu_common/uavcan/fw/org.pixhawk.sapog-v1/1.4/_sapog-v1-1.4.<git hash>.bin`
* Zubax GNSS v1: `ROMFS/px4fmu_common/uavcan/fw/com.zubax.gnss/1.0/gnss-1.0.&lt;git has&gt;.bin`
* Zubax GNSS v2: `ROMFS/px4fmu_common/uavcan/fw/com.zubax.gnss/2.0/gnss-2.0.&lt;git has&gt;.bin`

<0>Note</0>将 ROMFS/px4fmu_common 目录挂载到 Pixhawk 上的 /etc。

### 启动固件升级过程


使用 PX4 Flight Stack 时，请在“Power Config”部分启用 UAVCAN，然后在尝试进行 UAVCAN 固件升级之前重新启动系统。


或者，可以通过以下方式在 NSH 上手动启动 UAVCAN 固件升级：

```sh
uavcan start
uavcan start fw
```

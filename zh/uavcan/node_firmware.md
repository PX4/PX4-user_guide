---
canonicalUrl: https://docs.px4.io/main/zh/uavcan/node_firmware
---

# UAVCAN 固件升级

PX4 will automatically upgrade firmware on UAVCAN nodes if the appropriate firmware is supplied. The firmware build process is manufacturer dependent (instructions for different firmware linked below).

Before updating firmware via UAVCAN, the Pixhawk ESC 1.6 requires the UAVCAN bootloader be flashed. To build the bootloader, run: 要构建引导加载程序，请运行：
:::

## Ectorcontrol ESC 代码库（Pixhawk ESC 1.6 和 S2740VC）

To flash the UAVCAN device, all you need to do is copy the UAVCAN firmware binary into the root directory of the flight controller’s SD card and reboot.

This will build the UAVCAN node firmware for both supported ESCs. The firmware images will be located at `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin` and `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.binn`. 固件将位于 `com.thiemar.s2740vc-v1-1.0-1.0。&lt;git hash&gt;.bin` 和 `org.pixhawk.px4esc-v1-1.6-1.0。&lt;git hash&gt;.binn`。

:::note UAVCAN
firmware is usually created as part of the build process. Commonly the firmware image is built in **build/_name_of_your_uavcan_device_**,  where _name_of_your_uavcan_device_ is specific to the device you are flashing (e.g. **build/ark_can-flow_default**), and will be named with the format **XX-X.X.XXXXXXXX.uavcan.bin**.
:::

## Sapog 代码库（Pixhawk ESC 1.4和Zubax Orel 20）

### 刷写 Bootloader

Please refer to the [Ark Flow documentation](./ark_flow.md) under **Building Ark Flow Firmware** to learn how to build and flash this firmware.

### 编译二进制文件

Please refer to the [project page](https://github.com/PX4/sapog) to learn how to build and flash this firmware.

### 刷写 Bootloader

Please refer to the [project page](https://github.com/Zubax/zubax_gnss) to learn how to build and flash this firmware.

### 编译二进制文件

Download the ESC code:

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

#### Flashing the UAVCAN Bootloader

The UAVCAN node file names follow a naming convention which allows the Pixhawk to update all UAVCAN devices on the network, regardless of manufacturer. The firmware files generated in the steps above must therefore be copied to the correct locations on an SD card or the PX4 ROMFS in order for the devices to be updated. 因此，必须将上述步骤中生成的固件文件复制到 SD 卡或 PX4 ROMFS 上的正确位置，以便更新设备。

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

After building, the bootloader image is located at `firmware/px4esc_1_6-bootloader.bin`, and the OpenOCD configuration is located at `openocd_px4esc_1_6.cfg`. Follow [these instructions](../uavcan/bootloader_installation.md) to install the bootloader on the ESC.

#### Compiling the Main Binary

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

This will build the UAVCAN node firmware for both supported ESCs. The firmware images will be located at `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin` and `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.bin`.

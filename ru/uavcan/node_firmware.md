---
canonicalUrl: https://docs.px4.io/main/ru/uavcan/node_firmware
---

# UAVCAN Firmware Upgrading

PX4 will automatically upgrade firmware on UAVCAN nodes if the appropriate firmware is supplied. The firmware build process is manufacturer dependent (instructions for different firmware linked below).

:::warning
UAVCAN devices typically ship with appropriate firmware preinstalled. 
These instructions are primarily needed when developing UAVCAN devices.
:::

## Flashing/Updating a UAVCAN Binary

To flash the UAVCAN device, all you need to do is copy the UAVCAN firmware binary into the root directory of the flight controller’s SD card and reboot.

After restarting the flight controller the UAVCAN device will automatically be updated with new firmware. If successful the firmware binary will be removed from the root directory and there will be a file named **XX.bin** in the **/ufw** directory of the SD card.

:::note UAVCAN
firmware is usually created as part of the build process. Commonly the firmware image is built in **build/_name_of_your_uavcan_device_**,  where _name_of_your_uavcan_device_ is specific to the device you are flashing (e.g. **build/ark_can-flow_default**), and will be named with the format **XX-X.X.XXXXXXXX.uavcan.bin**.
:::

## Building UAVCAN Firmware

### ARK Flow

Please refer to the [Ark Flow documentation](./ark_flow.md) under **Building Ark Flow Firmware** to learn how to build and flash this firmware.

### Sapog Codebase (Pixhawk ESC 1.4 and Zubax Orel 20)

Please refer to the [project page](https://github.com/PX4/sapog) to learn how to build and flash this firmware.

### Zubax GNSS

Please refer to the [project page](https://github.com/Zubax/zubax_gnss) to learn how to build and flash this firmware.

### Vectorcontrol ESC Codebase (Pixhawk ESC 1.6 and S2740VC)

Download the ESC code:

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

#### Flashing the UAVCAN Bootloader

Before updating firmware via UAVCAN, the Pixhawk ESC 1.6 requires the UAVCAN bootloader be flashed. To build the bootloader, run:

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

After building, the bootloader image is located at `firmware/px4esc_1_6-bootloader.bin`, and the OpenOCD configuration is located at `openocd_px4esc_1_6.cfg`. Follow [these instructions](../uavcan/bootloader_installation.md) to install the bootloader on the ESC.

#### Compiling the Main Binary

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

This will build the UAVCAN node firmware for both supported ESCs. The firmware images will be located at `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin` and `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.bin`.

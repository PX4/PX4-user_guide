# UAVCAN Firmware Upgrading

The firmware build process is firmware dependent, however, PX4 will automatically upgrade firmware on UAVCAN nodes if the matching firmware is supplied.

:::warning
UAVCAN devices typically ship with appropriate firmware preinstalled. 
These instructions are primarily needed when developing UAVCAN devices.
:::

### General Flashing of a UAVCAN Binary

Clone and navigate to the PX4 Autopilot repository. Then build the firmware specific to your UAVCAN device. For example, to build the ARK Flow firmware:

```sh
git clone https://github.com/PX4/PX4-Autopilot --recursive
cd PX4-Autopilot
make ark_can-flow_default
```

This will build the UAVCAN node firmware. The firmware image will be located in `build/YOUR_UAVCAN_DEVICE` and will be named `XX-X.X.XXXXXXXX.uavcan.bin`, where `YOUR_UAVCAN_DEVICE` is specific to what device's firmware you are flashing, such as `build/ark_can-flow_default`. Put this binary on the root directory of the flight controller’s SD card to flash the UAVCAN device. The next time you power your flight controller with the SD card installed, your UAVCAN device will automatically be flashed and you should notice the binary is no longer in the root directory and there is now a file named `XX.bin` in the ufw directory of the SD card.

## Sapog Codebase (Pixhawk ESC 1.4 and Zubax Orel 20)

Please refer to the [project page](https://github.com/PX4/sapog) to learn how to build and flash this firmware.

## Zubax GNSS

Please refer to the [project page](https://github.com/Zubax/zubax_gnss) to learn how to build and flash this firmware.

## Vectorcontrol ESC Codebase (Pixhawk ESC 1.6 and S2740VC)

Download the ESC code:

```sh
git clone https://github.com/thiemar/vectorcontrol
cd vectorcontrol
```

### Flashing the UAVCAN Bootloader

Before updating firmware via UAVCAN, the Pixhawk ESC 1.6 requires the UAVCAN bootloader be flashed.
To build the bootloader, run:

```sh
make clean && BOARD=px4esc_1_6 make -j8
```

After building, the bootloader image is located at `firmware/px4esc_1_6-bootloader.bin`, and the OpenOCD configuration is located at `openocd_px4esc_1_6.cfg`. Follow [these instructions](../uavcan/bootloader_installation.md) to install the bootloader on the ESC.

### Compiling the Main Binary

```sh
BOARD=s2740vc_1_0 make && BOARD=px4esc_1_6 make
```

This will build the UAVCAN node firmware for both supported ESCs. The firmware images will be located at `com.thiemar.s2740vc-v1-1.0-1.0.<git hash>.bin` and `org.pixhawk.px4esc-v1-1.6-1.0.<git hash>.bin`.

# ModalAI VOXL 2

:::warning
PX4 does not manufacture this (or any) autopilot.
Contact the [manufacturer](https://forum.modalai.com/) for hardware support or compliance issues.
:::

The ModalAI [VOXL 2](https://modalai.com/voxl-2) ([Datasheet](https://docs.modalai.com/voxl2-datasheets/))  is ModalAI’s next-gen autonomous computing platform built around the Qualcomm QRB5165 processor. VOXL 2 boasts 8 cores, integrated PX4, seven camera concurrency, advanced onboard AI up to 15+ TOPS, and 5G connectivity. At 16 grams, VOXL 2 is the future of fully autonomous and connected drones!

![VOXL-2](../../assets/flight_controller/modalai/voxl_2/voxl-2-hero.jpg)

:::note
This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).
:::


## Specifications

### System


| Feature                                                                       | VOXL 2                                                           |
|-------------------------------------------------------------------------------|------------------------------------------------------------------|
| CPU                                                                           | QRB5165 <br>8 cores up to 3.091GHz <br>8GB LPDDR5<br>128GB Flash |
| OS                                                                            | Ubuntu 18.04 - Linux Kernel v4.19                                |
| GPU                                                                           | Adreno 650 GPU – 1024 ALU                                        |
| NPU                                                                           | 15 TOPS                                                          |
| Flight Controller Embedded                                                    | Yes (Sensors DSP)                                                |
| Built in WiFi                                                                 | No                                                               |
| Add-on Connectivity                                                           | WiFi, 5G, 4G/LTE, Microhard                                      |
| Video Encoding                                                                | 8K30 h.264/h.265 108MP still images                              |
| Computer Vision Sensors                                                       | QTY. 2 Stereo Pair<br>QTY. 1 Tracking                            |
| Tracking Sensor                                                               | Yes                                                              |
| Dimensions                                                                    | 70mm x 36mm                                                      |
| Weight                                                                        | 16g                                                              |
| VOXL SDK: GPS-denied navigation, SLAM, obstacle avoidance, object recognition | Yes                                                              |
| ROS                                                                           | ROS 1 & 2                                                        |
| QGroundControl                                                                | Yes                                                              |
| ATAK                                                                          | Yes                                                              |
| NDAA ’20 Section 848 Compliant                                                | Yes, Assembled in USA                                            |
| PMD TOF                                                                       | Pending                                                          |
| FLIR Boson                                                                    | USB                                                              |
| FLIR Lepton                                                                   | USB, SPI in development                                          |


:::note
More detailed hardware documentation can be found [here](https://docs.modalai.com/voxl-flight-datasheet/).
:::


## Dimensions

### 2D Dimensions

![VOXL2Dimensions](../../assets/flight_controller/modalai/voxl_2/voxl-2-dimensions.jpg)

### 3D Dimensions

[3D STEP File](https://storage.googleapis.com/modalai_public/modal_drawings/M0054_VOXL2_PVT_SIP_REVA.step)


## PX4 Firmware Compatibility

*VOXL 2* is currently being mainlined into PX4, and ModalAI is actively working on a [branched PX4 version](https://github.com/modalai/px4-firmware/tree/voxl-dev) that can be used.

As VOXL 2 runs Ubuntu, the production releases of PX4 for VOXL 2 are distributed through [apt package management](https://docs.modalai.com/configure-pkg-manager/) and the [VOXL SDK](https://docs.modalai.com/voxl-sdk/).

More information about the firmware can be found [here](https://docs.modalai.com/voxl2-px4-developer-guide/).


## QGroundControl Support

This board supported in QGroundControl 4.0 and later.

## Availability

- [VOXL Flight Complete Kit](https://modalai.com/voxl-flight)
- [VOXL Flight Board](https://www.modalai.com/products/voxl-flight?variant=31707275362355) (only)
- [VOXL Flight integrated with Obstacle Avoidance Cameras (VOXL Flight Deck)](https://modalai.com/flight-deck) ([Datasheet](https://docs.modalai.com/voxl-flight-deck-platform-datasheet/))
- [VOXL Flight in a ready to fly VOXL m500 Development Drone](https://www.modalai.com/collections/development-drones/products/voxl-m500) ([Datasheet](https://docs.modalai.com/voxl-m500-reference-drone-datasheet/))


## Quick Start

A quickstart from the vendor is located [here](https://docs.modalai.com/voxl-flight-quickstart/).

### voxl-vision-px4

The VOXL Flight runs [voxl-vision-px4](https://gitlab.com/voxl-public/modal-pipe-architecture/voxl-vision-px4) on the  companion computer portion of the hardware serving as a sort of MAVLink proxy.
For details, the source code is available [here](https://gitlab.com/voxl-public/modal-pipe-architecture/voxl-vision-px4)

### Connectors

Detailed information about the pinouts can be found [here](https://docs.modalai.com/voxl-flight-datasheet-connectors/).

All single ended signals on B2B connectors J3, J5, J6, J7, and J8 are 1.8V CMOS unless explicitly noted. 
All single ended signals on cable-to-board connectors J10, J18, & J19 are 3.3V CMOS unless explicitly noted.

| Connector | Description                   | MPN (Board Side)        | Mating MPN (Board/Cable Side) | Type                         | Signal Feature Summary                                                                                                                                                                                     |
|-----------|-------------------------------|-------------------------|-------------------------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| J2        | Fan                           | SM02B-SRSS-TB(LF)(SN)   | SHR-02V-S                     | Cable Header, 2-pin R/A      | 5V DC for FAN + PWM Controlled FAN-Return (GND)                                                                                                                                                            |
| J3        | Legacy B2B                    | QSH-030-01-L-D-K-TR     | QTH-030-01-L-D-A-K-TR         | B2B Receptacle, 60-pin       | 5V/3.8V/3.3V/1.8V power for plug-in boards, JTAG and Debug Signals, QUP expansion, GPIOs, USB3.1 Gen 2 (USB1)                                                                                              |
| J4        | Prime Power In                | 22057045                | 0050375043                    | Cable Connector, 4-pin R/A   | +5V main DC power in + GND, I2C@5V for power monitors                                                                                                                                                      |
| J5        | High Speed B2B                | ADF6-30-03.5-L-4-2-A-TR | ADM6-30-01.5-L-4-2-A-TR       | B2B Socket, 120-pin          | More 3.8V/3.3V/1.8V power for plug-in boards, 5V power in for “SOM Mode”, QUP expansion, GPIOS (including I2S), SDCC (SD Card V3.0), UFS1 (secondary UFS Flash), 2L PCIe Gen 3, AMUX and SPMI PMIC signals |
| J6        | Camera Group 0                | DF40C-60DP-0.4V(51)     | DF40C-60DS-0.4V               | B2B Plug, 60-pin             | Qty-2 4L MIPI CSI ports, CCI and camera control signals, 8 power rails (from 1.05V up to 5V) for cameras and other sensors, dedicated SPI (QUP) port                                                       |
| J7        | Camera Group 1                | DF40C-60DP-0.4V(51)     | DF40C-60DS-0.4V               | B2B Plug, 60-pin             | Qty-2 4L MIPI CSI ports, CCI and camera control signals, 8 power rails (from 1.05V up to 5V) for cameras and other sensors, dedicated SPI (QUP) port                                                       |
| J8        | Camera Group 2                | DF40C-60DP-0.4V(51)     | DF40C-60DS-0.4V               | B2B Plug, 60-pin             | Qty-2 4L MIPI CSI ports, CCI and camera control signals, 8 power rails (from 1.05V up to 5V) for cameras and other sensors, dedicated SPI (QUP) port                                                       |
| J9        | USB-C (ADB)                   | UJ31-CH-3-SMT-TR        | USB Type-C                    | Cable Receptacle, 24-pin R/A | ADB USB-C with re-driver and display port alternate mode (USB0)                                                                                                                                            |
| J10       | SPI Expansion                 | SM08B-GHS-TB(LF)(SN)    | GHR-08V-S                     | Cable Header, 8-pin R/A      | SPI@3.3V with 2 CS_N pins, 32kHz CLK_OUT@3.3V                                                                                                                                                              |
| J18       | ESC (SLPI Access)             | SM04B-GHS-TB(LF)(SN)    | GHR-04V-S                     | Cable Header, 4-pin R/A      | ESC UART@3.3V, 3.3V reference voltage                                                                                                                                                                      |
| J19       | GNSS/MAG/RC/I2C (SLPI Access) | SM12B-GHS-TB(LF)(SN)    | GHR-12V-S                     | Cable Header, 6-pin R/A      | GNSS UART@3.3V, Magnetometer I2C@3.3V, 5V, RC UART, Spare I2C                                                                                                                                              |


### User Guide

The full user guide is available [here](https://docs.modalai.com/voxl-flight-quickstart).


### How to Build

To [build PX4](../dev_setup/building_px4.md) for this target:

```
make modalai_fc-v1
```

## Serial Port Mapping

*Note: mappings shown are for the PX4 controlled interfaces only*

UART | Device | Port
--- | --- | ---
USART1 | /dev/ttyS0 | GPS1 (J1012) |
USART2 | /dev/ttyS1 | TELEM3 (J1002) |
USART3 | /dev/ttyS2 | Debug Console (J1001) |
UART4 | /dev/ttyS3 | Expansion UART (J6) |
UART5 | /dev/ttyS4 | UART between PX4 and Companion Computer |
USART6 | /dev/ttyS5 | RC (J1004)
UART7 | /dev/ttyS6 | TELEM1 (J1010)
UART8 | /dev/ttyS7 | N/A

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

## Support

Please visit the [ModalAI Forum](https://forum.modalai.com/category/8/voxl-flight) for more information.

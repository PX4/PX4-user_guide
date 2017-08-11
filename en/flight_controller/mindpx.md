# MindPX Hardware

The MindPX series were created by AirMind. Please refer to: http://mindpx.net

![](../../assets/hardware/hardware-mindpx.png)

## Quick Summary

> **Note** The main hardware documentation is [here](http://mindpx.net/assets/accessories/Specification9.18_3_pdf.pdf).

MindPX is a new generation autopilot system branched from Pixhawk, been revised in schematic and structure, and been further enhanced with new features to make un-manned vehicle more smart and more friendly to use.

MindPX increases total PWM output channels to 16 (8 main outputs + 8 aux outputs).  This makes MindPX can support more complicated VTOL configurations and more fine control. It is especially meaningful for those FMU-V4 based flight controllers as MindPX implements main and aux output in one single FMU.

![](../../assets/hardware/hardware-mindpx-specs.png)

  * Main System-on-Chip: STM32F427
    * CPU: 32bits, 168 MHz ARM Cortex M4 with FPU
    * RAM: 256 KB SRAM
    * 2MB Flash
    * ST Micro LSM303D 14 bit accelerometer/magnetometer
    * MEAS MS5611 barometer
    * InvenSense MPU6500 integrated 6-axis sensors


  * Highlighted features:
    * CNC processed aluminum alloy case, light and solid
    * Built-in isolated IMU redundancy
    * Total 16 PWM output channel (8 main + 8 aux)
    * 1 extra I2C port for flow connection.
    * 1 extra USB port for companion computer connection (built-in UART-to-USB converter)
    * Exposed debug port for development 

## Quick Start

### Mounting

![](../../assets/hardware/hardware-mindpx-mounting.png)

### Wiring

![](../../assets/hardware/hardware-mindpx-wiring1.png)

![](../../assets/hardware/hardware-mindpx-wiring2.png)

### Pin

![](../../assets/hardware/hardware-mindpx-pin.png)

|Num.|Description|Num.|Description|
|:--:|:--:|:--:|:--:|
|1|Power|9|I2C2 (MindFLow)|
|2|Debug (refresh bootloader)|10|USB2 (Serial 2 to USB)|
|3|USB1 (refresh firmware)|11|UART4,5|
|4|Reset|12|UART1 (Telemetry)|
|5|UART3 (GPS)|13|CAN|
|6|I2C1(external compass)|14|ADC|
|7|TF card slot|15|Tricolor Light|
|8|NRF/SPI(Remote Control)|16|Looper|

![](../../assets/hardware/hardware-mindpx-looper.png)

### Radio Receiver

MindPX supports a wide variety of radio receivers (since V2.6) including: PPM/SBUS/DSM/DSM2/DSMX.  MindPX also support FrSky bi-direction telemetry D and S.Port. 

For detailed Pin diagram, please refer to the [User Guide](http://mindpx.net/assets/accessories/UserGuide9.18_2_pdf.pdf).

### How to build

Please follow [Getting Started](../setup/getting_started.md) and [Building the Code](../setup/building_px4.md). The target for MindPX is `nuttx_mindpx-v2_default`:

```
make nuttx_mindpx-v2_default
```

### Companion PC connection

MindPX has a USB-TO-UART Bridge IC on the board.  A micro-USB to USB type A cable is used for the connection. Connect micro-USB end to the 'OBC' port of MindPX and USB type A end to companion computer.

And the max BAUD rate is the same with px4 family, which is up to 921600.

### User Guide

> **Note** The user guide is [here](http://mindpx.net/assets/accessories/UserGuide9.18_2_pdf.pdf).

## Where to buy

MindRacer is available at [AirMind Store](http://drupal.xitronet.com/?q=catalog) on internet. You can also find MindRacer at Amazon or eBay.

## Support

Please visit http://www.mindpx.org for more information. Or you can send email to [support@mindpx.net](mailto://support@mindpx.net) for any inquiries or help.

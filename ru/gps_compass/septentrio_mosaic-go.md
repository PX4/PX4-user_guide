---
canonicalUrl: https://docs.px4.io/main/ru/gps_compass/septentrio_mosaic-go
---

# Septentrio mosaic-go evaluation kit

The mosaic-go Evaluation Kit is composed of the mosaic module soldered on an interface board inside a metallic housing.

Sized at only 71 x 59 x 12 mm and weighing only 58 g, mosaic-go offers unmatched size to performance ratio. mosaic-go includes:

- High update rate (>100 Hz) and low latency, both crucial for control systems of autonomous applications
- Reliable centimetre-level positioning
- Full L2 support via P(Y) code

  Mosaic-go part number: Single-antenna version, incorporating mosaic-X5: 410386(including accessories). Dual-antennaversion, incorporatingmosaic-H: 410397(including accessories).

- Size: 71 x 59 x 12 mm ± 1mm
- Weight: 58g ± 1g

![Highly accurate GNSS receiver module](../../assets/hardware/gps/septentrio_sbf/mosaic-go.png "Highly accurate GNSS receiver module")


## Purchase

The mosaic-go kit is available on the [official shop](https://web.septentrio.com/l/858493/2022-04-19/xgrnz) of Septentrio.

- [mosaic-go heading GNSS module evaluation kit](https://web.septentrio.com/l/858493/2022-04-19/xgrp9)
- [mosaic-go GNSS module receiver evaluation kit](https://web.septentrio.com/l/858493/2022-04-19/xgrpd)

Other PX4 supported devices from Septentrio:

- [AsteRx OEM with Robotics Interface Board](../gps_compass/septentrio_asterx-rib.md)

## The mosaic-go Heading Evaluation Kit Contains:

- 1 mosaic-H or mosaic-X5 module soldered on an interface board inside a metallic housing.
- 1 USB cable
- 6-pin COM1 open-ended cable
- 4-pin COM2 open-ended cable
- Help user guide card

## Interfaces

### USB
_Connector type: micro-USB type B._

This micro-B connector is used to access the mosaic-go over USB. It can also be used to power the mosaic-go.

### RSV USB
_Connector type: micro-USB type B._

This connector is reserved and should not be used.

### RF_IN1 and RF_IN2
_Connector type: SMA._

These are the main and auxiliary antenna connectors, connected to the ANT_1 and ANT_2 pins of the internal mosaic. Mosaic-go provides a 5V DC supply to both antenna connectors. The combined main and auxiliary antenna power consumption must not exceed 150mA.

Note that RF_IN2 is only available on the dual-antenna mosaic-go.

### TF Card
_Connector type: MicroSD._

Socket for a micro SD Card. The module can log (SBF/NMEA) files on the micro SD Card in this socket.

### 6-pin Connector
_Connector type: GH connector, 1.25mm pitch, 6 way. Mating connector housing: GHR-06V-S._

| Pin Name | Direction | Level      | Description               | Comment                                                           |
| -------- | --------- | ---------- | ------------------------- | ----------------------------------------------------------------- |
| VCC      | PWR       | 4.75V-5.5V | Main power supply         |                                                                   |
| GND      |           | 0          | Ground                    |                                                                   |
| TXD1     | Out       | 3V3_LVTTL  | Serial COM1 transmit line | Directly connects to TXD1 of internal mosaic                      |
| RXD1     | In        | 3V3_LVTTL  | Serial COM1 receive line  | Directly connects to RXD1 of internal mosaic                      |
| PPS      | Out       | 3V3_LVTTL  | PPSoutput                 | PPSO from mosaic converted to 3.3V                                |
| EVENT    | In        | 3V3_LVTTL  | Event timer input         | Connects to EVENTA of mosaic through a 3V3to 1V8 level translator |

### 4-pin Connector
_Connector type: GH connector, 1.25mm pitch, 4way. Mating connector housing: GHR-04V-S._

| Pin Name | Direction | Level     | Description               | Comment                                         |
| -------- | --------- | --------- | ------------------------- | ----------------------------------------------- |
| NRST     | In        | 3V3_LVTTL | Reset input               | Directly connects to nRST_IN of internal mosaic |
| TXD2     | Out       | 3V3_LVTTL | Serial COM2 transmit line | Directly connects to TXD2 of internal mosaic    |
| RXD2     | In        | 3V3_LVTTL | Serial COM2 receive line  | Directly connects to RXD2 of internal mosaic    |
| GND      |           | 0         | Ground                    |                                                 |

## Hardware setup

![Wiring diagram, Pixhawk 4 - mosaic-go](../../assets/hardware/gps/septentrio_sbf/mosaic-go_wiring.png "Wiring diagram, Pixhawk 4 - mosaic-go")

1. Make sure the receiver is powered with at least 3.3V. You can use the micro USB connector or the 6-pin connector.
2. Connect one or two GNSS antennas to the RF-IN ports on the mosaic-go.
3. Connect the 6-pin connector (COM1) to the Pixhawk's `GPS MODULE` port. This will provide power to the mosaic-go and with this single connection it will be able to send single and dual antenna information to the Pixhawk 4.
4. In the web interface or with Rx Tools, set the receiver's baud rate to 115200 **Admin > Expert Control > Control Panel > Communication > COM Port Settings** (this is the default value).

:::warning
Make sure the JST cable is wired correctly (since this is not a standard cable):

![Wiring of JST cable](../../assets/hardware/gps/septentrio_sbf/jst_cable.png)

:::

:::note

PX4 will ensure that the GNSS module is automatically configured however, if you have a dual antenna setup, it is required to set the layout as accurately as possible in the web app.
:::

### Dual antenna

The attitude (heading/pitch) can be computed from the orientation of the baseline between the main and the aux1 GNSS antennas.

![Multi-antenna attitude determination setup](../../assets/hardware/gps/septentrio_sbf/multi-antenna_attitude_setup.png)

To enable multi-antenna attitude determination, follow the following procedure:

1. Attach two antennas to your vehicle, using cables of approximately the same length. The default antenna configuration is as depicted in the figure. It consists in placing the antennas aligned with the longitudinal axis of the vehicle, main antenna behind aux1. For best accuracy, try to maximize the distance between the antennas, and avoid significant height difference between the antenna ARPs.
2. In practice, the two antenna ARPs may not be exactly at the same height in the vehicle frame, or the main-aux1 baseline may not be exactly parallel or perpendicular to the longitudinal axis of the vehicle. This leads to offsets in the computed attitude angles. These offsets can be compensated for with the **setAttitudeOffset** command.

:::note

For optimal heading results, the two antennas should be seperated by at least 30cm / 11.8 in (ideally 50cm / 19.7in or more)

For additional configuration of the dual antenna setup, please refer to our [Knowledge Base](https://support.septentrio.com/l/858493/2022-04-19/xgrqd) or the [hardware manual](https://web.septentrio.com/l/858493/2022-04-19/xgrql)
:::

### Web app

mosaic-H GPS/GNSS receiver module with heading comes with fully documented interfaces, commands and data messages. The included GNSS receiver control and analysis software [RxTools](https://web.septentrio.com/l/858493/2022-04-19/xgrqp) allows receiver configuration, monitoring as well as data logging and analysis.

The receiver includes an intuitive web user interface for easy operation and monitoring allowing you to control the receiver from any mobile device or computer. The web interface also uses easy-to-read quality indicators ideal to monitor the receiver operation during the job at hand.

![Septentrio web user interface](../../assets/hardware/gps/septentrio_sbf/septentrio_mosaic_a5_h_t_clas_gnss_module_receiverwebui.png)

## PX4 setup

![QGroundControl parameter settings](../../assets/hardware/gps/septentrio_sbf/qgc_param.png)

### Single antenna

Edit the following parameters in the GPS tab:

- [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG): GPS 1
- [GPS_1_GNSS](../advanced_config/parameter_reference.md#GPS_1_GNSS): 31
- [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL): Auto detect (or SBF)
- [SER_TEL1_BAUD](../advanced_config/parameter_reference.md#SER_TEL1_BAUD): 115200 8N1

Go to **Tools > Reboot Vehicle**

### Dual antenna

Edit the following parameters in the GPS tab:

- [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG): TELEM1
- [GPS_1_GNSS](../advanced_config/parameter_reference.md#GPS_1_GNSS): 31
- [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL): Auto detect (or SBF)
- [SER_TEL1_BAUD](../advanced_config/parameter_reference.md#SER_TEL1_BAUD): 115200 8N1
- [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL): Bit 3 Dual antenna heading
- [GPS_PITCH_OFFSET](../advanced_config/parameter_reference.md#GPS_PITCH_OFFSET): set according to your setup
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET): set according to your setup

Go to **Tools > Reboot Vehicle**


## LED Status

| LED Color     | Powered  | SD card mounted | PVT Solution | Logging enabled |
| ------------- |:--------:|:---------------:|:------------:|:---------------:|
| Red           | &check;️ |                 |              |                 |
| Green         | &check;️ |    &check;️     |              |                 |
| Blue          | &check;️ |    &check;️     |   &check;️   |                 |
| Purple        | &check;️ |                 |   &check;️   |                 |
| Purple + Blue | &check;️ |    &check;️     |   &check;️   |    &check;️     |
| Red + Green   | &check;️ |    &check;️     |              |    &check;️     |

:::tip

For more detailed information about the mosaic-go and its module, please refer to the [hardware manual](https://web.septentrio.com/l/858493/2022-04-19/xgrrd) or the [Septentrio Support](https://support.septentrio.com/l/858493/2022-04-19/xgrrl) page.
:::


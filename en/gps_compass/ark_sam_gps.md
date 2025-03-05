# ARK SAM GPS

[ARK SAM GPS](https://arkelectron.gitbook.io/ark-documentation/gps/ark-sam-gps>) is a made in the USA and NDAA-compliant [GNSS/GPS](../gps_compass/index.md) u-blox SAM-M10Q GPS and industrial magnetometer.

![ARK SAM GPS](../../assets/hardware/gps/ark/ark_sam_gps.jpg)

## Where to Buy

Order this module from:

- [ARK Electronics](https://arkelectron.com/product/ark-sam-gps/) (US)

## Hardware Specifications

- [Open Source Schematic and BOM](https://github.com/ARK-Electronics/ARK_SAM_GPS/tree/main)
- Sensors
  - [u-blox SAM-M10Q](https://www.u-blox.com/en/product/sam-m10q-module)
    - Less than 38 mW power consumption without compromising GNSS performance
    - Maximum position availability with 4 concurrent GNSS reception
    - Advanced spoofing and jamming detection
  - [ST IIS2MDC Magnetometer](https://www.st.com/en/mems-and-sensors/iis2mdc.html)
- Pixhawk Standard UART/I2C Connector (6 Pin JST SH)
- Power Requirements
  - 5V
  - 15mA Average
  - 20mA Max
- LED Indicators
  - GPS Fix
- USA Built
- NDAA Compliant
- 6 Pin Pixhawk Standard UART/I2C Cable

## Pinout

### Pixhawk Standard UART/I2C Connector - 6 Pin JST-SH

| Pin Number | Signal Name | Voltage |
| ---------- | ----------- | ------- |
| 1          | 5V          | 5.0V    |
| 2          | RX          | 3.3V    |
| 3          | TX          | 3.3V    |
| 4          | SCL         | 3.3V    |
| 5          | SDA         | 3.3V    |
| 6          | GND         | GND     |

## See Also

- [ARK SAM GPS Documentation](https://arkelectron.gitbook.io/ark-documentation/gps/ark-sam-gps) (ARK Docs)

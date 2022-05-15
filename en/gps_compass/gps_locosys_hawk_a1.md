# LOCOSYS HAWK A1 GPS/GNSS

The [LOCOSYS GPS/GNSS RECEIVER](https://www.locosystech.com/en/product/hawk-a1-LU23031-V2.html) is a dual frequency multi-constellation GNSS receiver GPS receiver compatible with PX4.

Main features include:
- Concurrent reception of L1 and L5 band signals
- Support GPS, GLONASS,BEIDOU, GALILEO, QZSS
- Capable of SBAS (WAAS, EGNOS, MSAS, GAGAN)
- Support 135-channel GNSS
- Fast TTFF at low signal level
- Free hybrid ephemeris prediction to achieve faster cold start
- Default 5Hz, up to 10 Hz update rate*
- Build-in super capacitor to reserve system data for rapid satellite acquisition
- Three LED indicator for Power, PPS and Data transmit
* Note: SBAS support 5Hz only.

<img src="../../assets/hardware/gps/locosys_hawk_a1_gps.png" />

## Purchase

* [LOCOSYS](https://www.locosystech.com/en/product/hawk-a1-LU23031-V2.html) (Taiwan)

## Configuration

Since the current connectors is compatible with GPS2 port on pixhawk (FMU-v5 and up), two scenarios could be considred for configuration:

1. Using LOCOSYS as your main GPS device, then below settings are needed to be done:

Parameter | Value | Description
--- | --- | ---
[GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG) | 102 (Telem 2 or another available serial port) | Configure main GPS port
[GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL) | 1 (u-blox) | Configure GPS protocol
[SER_TEL_2_BAUD](../advanced_config/parameter_reference.md#SER_TEL_2_BAUD) | 9600 | Configure the serial port baudrate (here the GPS is connected to TELEM2 for instance)

2. Using as an auxillary GPS device in addition to the main GPS:

Parameter | Value | Description
--- | --- | ---
[GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) | 102 (Telem 2 or another available serial port) | Configure main GPS port
[GPS_2_PROTOCOL](../advanced_config/parameter_reference.md#GPS_2_PROTOCOL) | 1 (u-blox) | Configure GPS protocol
[SER_TEL_2_BAUD](../advanced_config/parameter_reference.md#SER_TEL_2_BAUD) | 9600 | Configure the serial port baudrate (here the GPS is connected to TELEM2 for instance)

## Wiring and Connections

The Locosys GPS comes with an 6-pin JST-GH connector that can be inserted directly into the GPS2 UART port. 

<img src="../../assets/hardware/gps/locosys_gps_cable.png" width="500px" /> 

### Pinout

The LOCOSYS GPS pinout is provided below. This can be used to help modify the connector for other autopilot boards.

| pin | Locosys GPS   | pin | Pixhawk GPS 2 |
| --- | ------------- | --- | ----------------- |
| 1   | VCC_5V        | 1   | VCC               |
| 2   | GPS_RX        | 2   | GPS_TX            |
| 3   | GPS_TX        | 3   | GPS_RX            |
| 4   | NC           | 4   | SDA             |
| 5   | NC         | 5   |    SCL           |
| 6   | GND           | 6   | GND               |

## Specifications
- **Receiver Type:** 135-channel LOCOSYS MC-1612-V2b engine, GPS/QZSS L1 C/A, L5C, GLONASS L1OF, BeiDou B1I, B2a Galileo:E1, E5a SBAS L1 C/A: WAAS, EGNOS, MSAS, GAGAN
- **Navigation Update Rate:** Max: 5Hz default Max: 10 Hz
- **Positionaing Accuracy:** 3D Fix
- **Time to first fix:**
  - **Cold start:** 28s
  - **Aided start:** EASY
- **Sensitivity:**
  - **Tracking & Navigation:** -165 dBm
- **Assisted GNSS:** EASY DGPS                                             
- **Oscillator:** 26Mhz TCXO
- **RTC crystal:** 32.768KHz
- **Available Antennas:** L1+L5 multi frequency antenna
- **Signal Integrity:** L1+L5 GPS GLONASS GALILEO BEIDOU QZSS SBAS
- **Protocols & Interfaces:**
  - **UART/I2C:** JST_GH Main interface, Switch internally.
                                                  
## Further info

- [LOCOSYS GPS User Manual](https://www.locosystech.com/Templates/att/LU23031-V2%20datasheet_v0.2.pdf?lng=en)

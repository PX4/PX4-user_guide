# Freefly Systems RTK GPS

The [LOCOSYS Hawk R1](https://www.locosystech.com/en/product/hawk-r1.html) is a dual-frequency [RTK GPS module](../gps_compass/rtk_gps.md) RTL receiver designed based on compatibility with Pixhawk from Locosys.
The module can act as rover when installed on the aircraft. The receiver is capable of concurrently tracking all global civil navigation systems, including GPS, GLONASS, GALILEO, BEIDOU and QZSS. It acquires both L1 and L5 signals at the same time while providing the centimeter-level RTK positioning accuracy.

The built-in lightweight helical antenna not only enhances RTK positioning stability, but also increases the flight time of the drone. The fast Time-To-First-Fix, RTK convergence, superior sensitivity, low power consumption make it a better choice for Pixhawk(PX4)-based platform UAV.

Main features include:
- Concurrent reception of L1 and L5 band signals
- Support GPS, GLONASS, BEIDOU, GALILEO, QZSS
- Capable of SBAS (WAAS, EGNOS, MSAS, GAGAN)
- Support 135-channel GNSS
- Fast TTFF at low signal level
- Free hybrid ephemeris prediction to achieve faster cold start
- Default 5Hz, up to 10 Hz update rate*
- Build-in super capacitor to reserve system data for rapid satellite acquisition

Three LED indicator for Power, PPS and Data transmit
:::note
This module can be used with PX4 v1.13 or above.
:::

![LOCOSYS Hawk R1](../../assets/hardware/gps/locosys_hawk_a1/locosys_hawk_a1_gps.png)


## Where to Buy

* [LOCOSYS Hawk R1](https://www.locosystech.com/en/product/hawk-r1.html)

## Kit Contents

An RTK GPS kit includes:
- 1x GPS Module
- 1x Helix antenna
- 1x 6-pin JST-GH 


## Configuration

RTK setup and use on PX4 via *QGroundControl* is largely plug and play (see [RTK GPS](../advanced_features/rtk-gps.md) for more information).
You need to connect your Hawk R1 to either GPS2 port on compatible Pixhawk boards or your preferred UART port on the boards without a seperate 
For the aircraft, you should set the parameter [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD) to 115200 8N1 to ensure that PX4 configures the correct baudrate.

## Wiring and Connections

The Freefly RTK GPS comes with an 8 pin JST-GH connector that can be plugged into a PixHawk autopilot.
For use as a base station, the module has a USB-C connector

### Pinout

The Freefly GPS pinout is provided below.
For some autopilots, like the [Hex Cube](../flight_controller/pixhawk-2.md) and [PixRacer](../flight_controller/pixracer.md), all that is needed is a 1-1 8-pin JST-GH cable.

Pin | Freefly GPS
--- | ---
1 | VCC_5V
2 | GPS_RX
3 | GPS_TX
4 | Null
5 | Null
6 | BUTTON
7 | BUTTON_LED
8 | GND

## Specification

- u-blox ZED-F9P GPS Receiver
  - Ultracap backup power for fast (hot-start) restarts
  - EMI shield over receiver for improved EMI immunity
- IST8310 Magnetometer
- Safety-switch and safety LED
- RGB LEDs for status indication
  - NCP5623CMUTBG I2C Driver
- BMP388 Baro on I2C bus
- External, active antenna (Maxtena M7HCT)
  - SMA connector
- STM32 MCU for future CAN-based communication
  - FW updates through USB connector
- Connectivity:
  - USB-C
  - 2-way USB Switch to MCU and F9P
  - SMA for active antenna (20mA max)
  - 4-pin JST-GH CAN Bus (dronecode compliant)
  - 8-pin JST-GH UART/I2C
-** Power:
  - Input from either (diode OR'd): 
  - USB (5V)
  - CAN (4.7 to 25.2V)
  - (4.7 to 25.2V)
  - Power consumption <1W
	
## More Information

More information can be found on [Freefly's Wiki](https://freefly.gitbook.io/freefly-public/products/rtk-gps)
  

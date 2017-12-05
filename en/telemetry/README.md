# Telemetry Radios/Modems

Telemetry Radios can (optionally) be used to provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc. 

PX4 supports the following telemetry radios:
* Radios that use [SiK Radio](../telemetry/sik_radio.md) based firmware
* [3DR Telemetry Wifi](../telemetry/telemetry_wifi.md)

See [Pixhawk.org > Radio Modems](https://pixhawk.org/peripherals/radio-modems/start) for more information.

> **Tip** WiFi telemetry has shorter range, higher data rates, and makes it easier to support FPV/video feeds. Also you only need to purchase a single radio unit for your vehicle (assuming the ground station already has WiFi).
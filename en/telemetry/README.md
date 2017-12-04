# Telemetry Radios

Telemetry Radios can (optionally) be used to provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc. 

PX4 supports telemetry radios that use the [SiK Radio](../telemetry/sik_radio.md) firmware and also [Telemetry Wifi](../telemetry/telemetry_wifi.md).

> **Tip** WiFi telemetry has shorter range, higher data rates, and makes it easier to support FPV/video feeds. Also you only need to purchase a single radio unit for your vehicle (assuming the ground station already has WiFi).
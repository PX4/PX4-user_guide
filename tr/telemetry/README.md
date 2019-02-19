# Telemetry Radios/Modems

Telemetry Radios can (optionally) be used to provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

PX4 supports a number of types of telemetry radios:

* [SiK Radio](../telemetry/sik_radio.md) based firmware (more generally, any radio with a UART interface should work). 
  * [RFD900 Telemetry Radio](../telemetry/rfd900_telemetry.md)
  * [HKPilot (SIK) Telemetry Radio](../telemetry/hkpilot_sik_radio.md)
  * [HolyBro (SIK) Telemetry Radio](../telemetry/holybro_sik_radio.md)
* [Telemetry Wifi](../telemetry/telemetry_wifi.md)

PX4 is protocol compatible with [SiK Radio](../telemetry/sik_radio.md) and will generally work out of the box (though you may need to change/use an appropriate connector).

WiFi telemetry typically has shorter range, higher data rates, and makes it easier to support FPV/video feeds. One benefit of WiFi radios is that you only need to purchase a single radio unit for your vehicle (assuming the ground station already has WiFi).
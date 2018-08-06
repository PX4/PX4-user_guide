# MAVLink (OSD/Telemetry)

## TELEM1 Port

The telemetry 1 port defaults to 57600 baud, 8N1 and transmits a MAVLink stream.

## TELEM2 Port

The MAVLink settings default to OSD mode at 57600 baud.

The **drop-down menu** for the [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) parameter is used to set the optimal mode depending on the application scenario.

- Companion computer mode at 921600 baud
- Companion computer mode at 57600 baud
- OSD mode at 57600 baud
- Command / RC input mode (receive only) at 57600 baud
- Normal telemetry mode at 57600 baud

> **Note** OSD mode defines the MAVLink stream required by OSD (set of activated messages & their rates). The other modes are for other specific hardware (e.g. ESP8266 for WiFi), and use the optimal baud rate settings for their link.

![QGC Telemetry Setup](../../images/qgc_telemetry_setup.png)
# FrSky Telemetry

PX4 supports D (old) and S (new) FrSky telemetry. FMUv4 based boards
(Pixracer) include the required electronics for the interface, older
boards (Pixhawk) need a UART to S.PORT adapter board.

## Pixracer

> **Success** FrSky telemetry auto-starts on Pixracer and
  detects D or S mode, there is no need to configure anything.

For receivers with D-port (D4R-II and similar): Connect the Pixracer
FrSky TX line to the D4R-II RX line. Also connect GND.

For receivers with S-port: Connect the Pixracer FrSky TX and RX lines
together (solder the wires together) to the X series receiver's S.port
pin. Also connect GND.


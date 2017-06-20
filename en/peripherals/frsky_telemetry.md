# FrSky Telemetry

PX4 supports D (old) and S (new) FrSky telemetry. FMUv4 based boards
(Pixracer) include the required electronics for the interface, older
boards (Pixhawk) need a UART to S.PORT adapter board.

Ready-made cables for Pixhawk are available from [Craft and Theory](http://www.craftandtheoryllc.com/telemetry-cable).
<a href="http://www.craftandtheoryllc.com/telemetry-cable"><img src="http://www.craftandtheoryllc.com/wp-content/uploads/2017/05/Composite-cable-1.jpg" width="50%" alt="Purchase cable here from Craft and Theory"></a>

## Pixracer

> **Success** FrSky telemetry auto-starts on Pixracer and
  detects D or S mode, there is no need to configure anything.

For receivers with D-port (D4R-II and similar): Connect the Pixracer
FrSky TX line to the D4R-II RX line. Also connect GND.

For receivers with S-port: Connect the Pixracer FrSky TX and RX lines
together (solder the wires together) to the X series receiver's S.port
pin. Also connect GND.


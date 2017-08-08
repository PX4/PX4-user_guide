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

## LuaPilot: Telemetry Screen on the Taranis
If you have a Taranis that can receive the telemetry stream (e.g. a Taranis X9D
Plus), you can install a script that shows you a nice overview of the received
telemetry:
![](../../images/taranis_telemetry.jpg)

You can see:
- Current flight mode
- GPS fix
- Vehicle heading
- Battery level
- RC signal strength
- Current speed and altitude
- and more

Once you have the hardware connected, follow the instructions on
http://ilihack.github.io/LuaPilot_Taranis_Telemetry/, Section **Taranis Setup OpenTX**.

If you open the `LuaPil.lua` script with a text editor, you can edit the
configuration. Suggested modifications:
```
local BattLevelmAh = -1  -- use the battery level calculation from the vehicle
local SayFlightMode = 0  -- there are no WAV files for the PX4 flight modes
```



## Cable/adapter sources

Ready-made cables (which include the required adapters) are available from:
* [Craft and Theory](http://www.craftandtheoryllc.com/telemetry-cable). Versions are available with DF-13 compatible *PicoBlade connectors* (for FMUv2/3DR Pixhawk, FMUv2/HKPilot32) and *JST-GH connectors* (for FMUv3/Pixhawk 2 "The Cube" and FMUv4/PixRacer v1).

   <a href="http://www.craftandtheoryllc.com/telemetry-cable"><img src="http://www.craftandtheoryllc.com/wp-content/uploads/2017/05/Composite-cable-1.jpg" width="50%" alt="Purchase cable here from Craft and Theory"></a>
   
UART to S.PORT adapters can be sourced from:
* SPC: [getfpv.com](http://www.getfpv.com/frsky-smart-port-converter-cable.html), [unmannedtechshop.co.uk](https://www.unmannedtechshop.co.uk/frsky-smart-port-converter-spc/) 
* FUL-1: [unmannedtech.co.uk](https://www.unmannedtechshop.co.uk/frsky-transmitter-receiver-upgrade-adapter-ful-1/)

# FrSky Telemetry

FrSky telemetry allows you to access vehicle telemetry and error information on a compatible RC transmitter.

This information includes: flight mode, battery level, RC signal strength, speed, altitude etc. Some transmitters can additionally provide audible and vibration feedback, which is particularly useful for low battery and other failsafe warnings.

## Flight Controller Hardware

Pixhawk/PX4 supports D (old) and S (new) FrSky telemetry. FMUv4 based boards (Pixracer) include the required electronics for the interface, older boards (Pixhawk) need a UART to S.PORT adapter board.

### Pixracer

#### Configuration

There is no need to configure anything in PX4 itself. Once connected (as discussed below) FrSky telemetry auto-starts on Pixracer and detects D or S mode. 

#### Connecting Receivers with D-port

Connect the Pixracer FrSky TX line to the receiver's RX line. Also connect GND (This applies to D4R-II and similar).

![Radio Connection](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg)


#### Connecting Receivers with S-port

Connect the Pixracer FrSky TX and RX lines together (solder the wires together) to the X series receiver's S.port pin. 
Also connect GND. The S-port connection is shown below (using the provided I/O Connector).

![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

![Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.png)



### Pixhawk v2

#### Configuration

After connecting the board (see below), you also need to configure the port for use with FrSky, by setting the [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) parameter to 10 (see [Parameters](../advanced_config/parameters.md) for information on how).

#### Connecting Receivers

[Pixhawk 1](../flight_controller/pixhawk.md) (and [mRo Pixhawk](../flight_controller/mro_pixhawk.md) and other FMUv2 boards) connected to the receiver for FrSky telemetry via the TELEM2 UART. 

You will need to connect via a UART to S.PORT adapter board, or using a [ready-made cable](#ready_made_cable).

<!-- ideally add diagram here -->

### Pixhawk Pro

[Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md) can be connected to TELEM4 (no additional software configuration is needed).

You will need to connect via a UART to S.PORT adapter board, or using a [ready-made cable](#ready_made_cable).


## RC Transmitter Setup

### Taranis - LuaPilot Setup

If you have a Taranis that can receive the telemetry stream (e.g. a Taranis X9D Plus), you can install a script that shows you a nice overview of the received telemetry:

![Telemetry Screen on the Taranis](../../images/taranis_telemetry.jpg)

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

If you open the `LuaPil.lua` script with a text editor, you can edit the configuration. 
Suggested modifications include:
```
local BattLevelmAh = -1  -- use the battery level calculation from the vehicle
local SayFlightMode = 0  -- there are no WAV files for the PX4 flight modes
```


## Cable/adapter sources {#ready_made_cable}

Ready-made cables (which include the required adapters) are available from:
* [Craft and Theory](http://www.craftandtheoryllc.com/telemetry-cable). Versions are available with DF-13 compatible *PicoBlade connectors* (for FMUv2/3DR Pixhawk, FMUv2/HKPilot32) and *JST-GH connectors* (for FMUv3/Pixhawk 2 "The Cube" and FMUv4/PixRacer v1).

   <a href="http://www.craftandtheoryllc.com/telemetry-cable"><img src="http://www.craftandtheoryllc.com/wp-content/uploads/2017/09/Telemetry-cable.jpg" width="50%" alt="Purchase cable here from Craft and Theory"></a>
   
UART to S.PORT adapters can be sourced from:
* SPC: [getfpv.com](http://www.getfpv.com/frsky-smart-port-converter-cable.html), [unmannedtechshop.co.uk](https://www.unmannedtechshop.co.uk/frsky-smart-port-converter-spc/) 
* FUL-1: [unmannedtech.co.uk](https://www.unmannedtechshop.co.uk/frsky-transmitter-receiver-upgrade-adapter-ful-1/)


## Additional Information

For additional information, see the following links:
* [FrSky Taranis Telemetry](https://github.com/Clooney82/MavLink_FrSkySPort/wiki/1.2.-FrSky-Taranis-Telemetry)
* [Taranis X9D: Setting Up Telemetry](https://www.youtube.com/watch?v=x14DyvOU0Vc) (Video Tutorial)

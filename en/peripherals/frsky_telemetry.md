# FrSky Telemetry

FrSky telemetry allows you to access vehicle telemetry and error information on a compatible RC transmitter.

This information includes: flight mode, battery level, RC signal strength, speed, altitude etc. Some transmitters can additionally provide audible and vibration feedback, which is particularly useful for low battery and other failsafe warnings.

Pixhawk/PX4 supports D (old) and S (new) FrSky telemetry. FMUv4 based boards ([Pixracer](../flight_controller/pixracer.md)) include the required electronics for the interface, older boards (Pixhawk) need a UART to S.PORT adapter board.

## Flight Controller Hardware



### Pixracer

#### Configuration

There is no need to configure anything in PX4 itself. Once connected (as discussed below) FrSky telemetry auto-starts on Pixracer and detects D or S mode. 

#### Connecting Receivers with S-port

Connect the Pixracer FrSky TX and RX lines together (solder the wires together) to the X series receiver's S.port pin. GND need not be attached as this will have been done when attaching to S.Bus (normal RC connection).

The S-port connection is shown below (using the provided I/O Connector).

![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

![Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/pixracer_FrSkyTelemetry.png)

#### Connecting Receivers with D-port

> **Tip** The vast majority of users now prefer to use S.PORT.

Connect the Pixracer FrSky TX line (FS out) to the receiver's RX line. Connect the Pixracer FrSky RX line (FS in) to the receivers TX line. GND need not be connected as this will have been done when attaching to RC/SBus (for normal RC). 

<!-- ![Radio Connection](../../assets/flight_controller/pixracer/grau_setup_pixracer_radio.jpg) -->


### Pixhawk v2

#### Configuration

Configure the TELEM2 port for use with FrSky by setting the [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) parameter to 10 ( [Parameters](../advanced_config/parameters.md) explains how to set parameters).

#### Connecting Receivers

[Pixhawk 1](../flight_controller/pixhawk.md) (and [mRo Pixhawk](../flight_controller/mro_pixhawk.md) and other FMUv2 boards) connect to the receiver for FrSky telemetry via the TELEM2 UART. 

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

## FrSky Telemetry Receivers

Pixhawk/PX4 supports D (old) and S (new) FrSky telemetry. The table belows all FrSky receivers that support telemetry via a D/S.PORT (in theory all of these should work). 

> **Tip** Note that only the more common D and X series receivers listed below have actually been tested/validated for use with PX4. The X-series receivers are recommended!


Receiver | Range | Combined output | Digital telemetry input | Dimensions | Weight
--- | --- | --- | --- | --- | ---
D4R-II | 1.5km | CPPM (8) | D.Port | 40x22.5x6mm | 5.8g
D8R-XP | 1.5km | CPPM (8) | D.Port | 55x25x14mm | 12.4g
D8R-II Plus | 1.5km | no | D.Port | 55x25x14mm | 12.4g
X4R | 1.5km | CPPM (8) | Smart Port | 40x22.5x6mm | 5.8g
X4R-SB | 1.5km | S.Bus (16) | Smart Port | 40x22.5x6mm | 5.8g
X6R / S6R | 1.5km | S.Bus (16) | Smart Port | 47.42×23.84×14.7mm | 15.4g
X8R / S8R | 1.5km | S.Bus (16) | Smart Port | 46.25 x 26.6 x 14.2mm | 16.6g
XSR / XSR-M | 1.5km | S.Bus (16) / CPPM (8) | Smart Port | 26x19.2x5mm | 3.8g
RX8R | 1.5km | S.Bus (16) | Smart Port | 46.25x26.6x14.2mm | 12.1g
RX8R PRO | 1.5km | S.Bus (16) | Smart Port | 46.25x26.6x14.2mm | 12.1g
R-XSR | 1.5km | S.Bus (16) / CPPM (8) | Smart Port | 16x11x5.4mm | 1.5g
G-RX8 | 1.5km | S.Bus (16) | Smart Port + integrated vario | 55.26*17*8mm | 5.8g
R9 | 10km | S.Bus (16) | Smart Port | 43.3x26.8x13.9mm | 15.8g
R9 slim | 10km | S.Bus (16) | Smart Port | 43.3x26.8x13.9mm | 15.8g


> **Note** The above table originates from http://www.redsilico.com/frsky-receiver-chart and the FrSky product documentation.


## Ready-Made Cables {#ready_made_cable}

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

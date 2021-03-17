# Microhard Serial Radio

[Microhard Pico Serial](http://microhardcorp.com/P900.php) radios enable MAVLink communication between a radio on a vehicle and a GCS.  
Microhard Pico Serial radios are 1 watt output radios that support point to point, point to multi-point, and mesh modes.
A single ground station radio can be used to communicate with multiple vehicles using point to multi-point or mesh. Vehicles must have different IDs.

![Microhard Radio](../../assets/hardware/telemetry/ark_microhard_serial.jpg)

## Purchase:

* [1W 900MHz Serial Telemetry Radio](https://arkelectron.com/product/1w-900mhz-serial-telemetry-air-radio/)
* [1W 900MHz USB Serial Telemetry Radio](https://arkelectron.com/product/1w-900mhz-serial-telemetry-ground-radio/)
* [1W 2.4GHz Serial Telemetry Radio](https://arkelectron.com/product/1w-2400mhz-serial-telemetry-radio/)
* [1W 2.4GHz USB Serial Telemetry Radio](https://arkelectron.com/product/1w-2400mhz-usb-serial-telemetry-radio/)

### Connecting

Connection on the autopilot is done using a Pixhawk standard 6 pin JST GH Telemetry cable.
When set to 100mW output power or less, power from the telemtry cable is sufficient.
For higher radio output powers above 100mW, a battery connection is needed on the 2 Pin Molex Nano-Fit.

Connection on the groundstation is done through USB C. 1W output powers are supported when using USB PD.

![Microhard Radio on Vehicle](../../assets/hardware/telemetry/microhard_serial_on_vehicle.jpg)

## Setup/Configuration

Using [Pico Config](https://arkelectron.com/wp-content/uploads/2020/09/PicoConfig-1.7.zip) on Windows, the radio settings can be adjusted.

![Pico Config](../../assets/hardware/telemetry/pico_configurator.png)

The ground station-based radio is connected via USB C. Pico Config will automatically connect to the configuration port and the settings can be adjusted.
To connect in QGroundcontrol, add a new serial connection using the baud rate set in Pico Config. There are two serial ports over USB, the first is for data and the second is for configuration in Pico Config.

The vehicle-based radio is connected to the flight-controller's `TELEM1` port.
Using an FTDI adapter, connect the 3 pin JST-GH Config port to a Windows PC running Pico Config. The application will automatically connect the the radio and the settings can be adjusted.
Match the baud rate on the ground radio, air radio, and autopilot.

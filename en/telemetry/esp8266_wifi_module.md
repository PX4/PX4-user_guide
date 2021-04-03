# ESP8266 WiFi Module

The ESP8266 and its clones are low-cost and readily available Wi-Fi modules with full TCP/IP stack and microcontroller capability.
They can be used with any Pixhawk series controller.

:::tip
ESP8266 is the *defacto* default WiFi module for use with [Pixracer](../flight_controller/pixracer.md) (and is usually bundled with it).
:::

## Where to Buy

The module is readily available, and usually have the firmware already installed and configured to useable defaults.  A few vendors are listed below.

### Accept 3.3v Supply:
* [Sparkfun](https://www.sparkfun.com/products/13678)
* (discontinued) [GearBeast](https://us.gearbest.com/boards-shields/pp_009604906563.html)

### Accept 5.0v Supply:
* [Banggood]( https://www.banggood.com/Wireless-Wifi-to-Uart-Telemetry-Module-With-Antenna-for-Mini-APM-Flight-Controller-p-1065339.html )
* [Banggood]( https://www.banggood.com/MAVLink-Wifi-Bridge-2_4G-Wireless-Wifi-Telemetry-Module-with-Antenna-for-Pixhawk-APM-Flight-Controller-p-1428590.html )


## Module Setup

Your board or packaging should include this information.  Often it is simply printed on the reverse side of the board.


1. Factory settings -- Example 1:

    - SSID: PixRacer
    - Password: pixracer
    - WiFi Channel: 11
    - UART speed 921600

2. Factory Settings -- Example 2:

    - SSID: IFFRC_xxxxxxxx
    - Password: 12345678
    - IP: 192.168.4.1
    - Port: 6789 (TCP) 




### Build From Sources

The [firmware repository](https://github.com/dogmaphobic/mavesp8266) contains instructions and all the tools needed for building and flashing the firmware.


### Pre Built Binaries

[MavLink ESP8266 Firmware V 1.2.2](http://www.grubba.com/mavesp8266/firmware-1.2.2.bin)

### Updating the Firmware

If you have firmware 1.0.4 or greater installed, you can do the update using the ESP's *Over The Air Update* feature.
Just connect to its AP WiFi link and browse to: `http://192.168.4.1/update`. 
You can then select the firmware file you downloaded above and upload it to the WiFi Module.

### Flashing the ESP8266 Firmware

Before flashing, make sure you boot the ESP8266 in *Flash Mode* as described below.
If you cloned the [MavESP8266](https://github.com/dogmaphobic/mavesp8266) repository, you can build and flash the firmware using the provided [PlatformIO](http://platformio.org) tools and environment. 
If you downloaded the pre-built firmware above, download the [esptool](https://github.com/espressif/esptool) utility and use the command line below:

```
esptool.py --baud 921600 --port /dev/your_serial_port write_flash 0x00000 firmware_xxxxx.bin
```

Where:

* **firmware_xxxxx.bin** is the firmware you downloaded above
* **your_serial_port** is the name of the serial port where the ESP8266 is connected to (`/dev/cu.usbmodem` for example)

### Wiring for Flashing the Firmware

:::warning
Most ESP8266 units must only accept 3.3 volts!
:::

:::warning
Some boards (like the pixhawk 4) only supply 5.0 volts! Check your compatibility
:::


There are various methods for setting the ESP8266 into *Flash Mode* but not all USB/UART adapters provide all the necessary pins for automatic mode switching. 
In order to boot the ESP8266 in *Flash Mode*, the GPIO-0 pin must be set low (GND) and the CH_PD pin must be set high (VCC). 
This is what my own setup looks like:

![esp8266 flashing rig](../../assets/hardware/telemetry/esp8266_flashing_rig.jpg)

I built a cable where RX, TX, VCC, and GND are properly wired directly from the FTDI adapter to the ESP8266. 
From the ESP8266, I left two wires connected to GPIO-0 and CH_PD free so I can boot it either normally or in flash mode by connecting them to GND and VCC respectively.

### ESP8266 (ESP-01) Pinout

![esp8266 wifi module pinout](../../assets/hardware/telemetry/esp8266_pinout.jpg)


### Flashing Diagram using an FTDI USB/UART Adapter

![esp8266 flashing](../../assets/hardware/telemetry/esp8266_flashing_ftdi.jpg)


<span id="px4_config"></span>

## Pixhawk/PX4 Setup & Configuration

:::tip
If using PX4 1.8.2 (and earlier) you should connect the ESP8266 to TELEM2 and configure the port by [setting the parameter](../advanced_config/parameters.md) `SYS_COMPANION` to 1921600 (remember to reboot after setting the parameter).
The following instructions assume you are using PX4 versions after 1.8.2
:::

Connect your ESP8266 to your Pixhawk-series flight controller (e.g. Pixracer) on any free UART.

Connect the flight controller to your ground station via USB (as WiFi is not yet fully set up).

Using *QGroundControl*:
- [Load recent PX4 firwmare](../config/firmware.md)
- [Configure the serial port](../peripherals/serial_configuration.md) used to connect the ESP8266.
  Remember to set the baud rate to 921600 in order to match the value set for the ESP8266.

Once the firmware (port) is set up you can remove the physical USB connection between the ground station and the vehicle.

## Connect via ESP8266 to QGC

On your wifi-enabled *QGroundControl* ground station computer/tablet, find and connect to the open wireless network for your ESP8266.
- A common ESP8266 network is named **PixRacer** and the default password is **pixracer**.
- Other Wifi network names may need to be configured in QGC. See below. 
- On Windows, the connection settings will look like this:
  
  ![Windows Network Setup: Connection](../../assets/peripherals/pixracer_network_setup_connection_windows.png)

  ![Windows Network Setup: Security](../../assets/peripherals/pixracer_network_setup_security_windows.png)

QGC automatically starts its UDP link on boot.
Once your computer/tablet is connected to the **PixRacer** WiFi Access Point, it will automatically make the connection.

## Configure QGC with non-standard Wifi connections

QGC supports a variety of other wifi connections, if manually configured: 

https://docs.qgroundcontrol.com/master/en/SettingsView/SettingsView.html

If QGC doesn't automatically connect to your vehicle, add it's network connection as a custom comm link.

1. Go to "Application Settings" > "Comm Links"
       https://docs.qgroundcontrol.com/master/en/SettingsView/SettingsView.html
2. add new one matching your settings above.
3. select the new connection, and click "Connect".
4. You vehicle should now automatically connect.

## Verify

You should now see HUD movement on your QGC computer via wireless link and be able to view the summary panel for the ESP8266 WiFi Bridge (as shown below).

![QGC Summary showing Wifi Bridge](../../assets/qgc/summary/wifi_bridge.png)

:::tip
If you have any problem connecting, see [QGC Installation/Configuration Problems](https://docs.qgroundcontrol.com/en/Support/troubleshooting_qgc.html#waiting_for_connection).
:::

# ESP32 WiFi Module

The ESP32 are readily available Wi-Fi modules with full TCP/IP stack and microcontroller capability. They offer 
dedicated UART, SPI and I2C interfaces. 
They can be used with any Pixhawk series controller.

## DroneBridge for ESP32

**DroneBridge for ESP32 offers a transparent and bi-directional serial to WiFi bridge.**  
Despite the original DroneBridge (for Raspberry Pi) 
it uses the WiFi protocol. Therefore, it can not offer the same range as the other DroneBridge implementations. 
Typical WiFi range is ~50m-200m depending on the antennas. High gain directional antennas might offer even more range.
![DroneBridge for ESP32 connection concept](https://raw.githubusercontent.com/DroneBridge/ESP32/master/wiki/db_ESP32_setup.png)
## Recommended Hardware
Almost every ESP32 development board is capable to run DroneBridge for ESP32. Boards and modules with an external 
antenna connector are recommended, since those will offer more range.
**Many ESP32 modules support 3.3V and 5V power supply input, while some flight controllers (e.g. Pixhawk 4) output at 5V (you will need to 
check compatibility and step down the voltage if needed).**
Modules and DevKits that accept 3.3V and 5V power supply:
* AZDelivery DevKit C
* [TinyPICO - ESP32 Development Board - V2](https://www.adafruit.com/product/4335)
* [Adafruit HUZZAH32 – ESP32 Feather Board](https://www.adafruit.com/product/3405)
* [Adafruit AirLift – ESP32 WiFi Co-Processor Breakout Board](https://www.adafruit.com/product/4201) (requires FTDI adapter for flashing firmware)
* [Adafruit HUZZAH32](https://www.adafruit.com/product/4172) (requires FTDI adapter for flashing firmware)
Boards with an IPEX port for an external antenna often also offer an onboard antenna that is activated by default. You 
  may need to resolder a resistor to activate the external antenna port.
## Downloading and Flashing the Firmware
[Download the firmware from the GitHub repository](https://github.com/DroneBridge/ESP32/releases) and
[follow the flashing instructions there](https://github.com/DroneBridge/ESP32#installationflashing-using-precompiled-binaries). 
They are always up to date. 
:::tip
[Follow the flashing instructions inside the GitHub Repository.](https://github.com/DroneBridge/ESP32#installationflashing-using-precompiled-binaries) 
The exact parameters may differ from release to release of DroneBridge for ESP32.
:::
For convenience reasons some short instructions are given here:
* [Download the pre-compiled firmware binaries](https://github.com/DroneBridge/ESP32/releases)
* Connect your DEVKit to your computer via USB/Serial bridge (most DevKits already offer a USB port for flashing and debugging)
* Erase the flash and flash the DroneBridge for ESP32 firmware onto your ESP32
  * Using [Espressif Flash Download Tool](https://www.espressif.com/en/support/download/other-tools) (Windows only)  
  * Using esp-idf/esptool (all platforms)  
* Power Cycle the ESP32
* [Connect to the "DroneBridge for ESP32" WiFi network and configure the firmware for your application](#configuring-dronebridge-for-esp32)

## Configuring DroneBridge for ESP32

### Default Configuration
* SSID: `DroneBridge for ESP32`
* Password: `dronebridge`
* Transparent/MAVLink
* UART baud rate `115200`
* UART TX pin `17`
* UART RX pin `16`
* Gateway IP: `192.168.2.1`

### Custom Settings & Webinterface

You can change the default configuration via the Webinterface.  
Connect to the ESP32 via WiFi and enter `dronebridge.local`, `http://dronebridge.local` or `192.168.2.1` in the address 
bar of your browser.

![DroneBridge for ESP32 Webinterface](https://raw.githubusercontent.com/DroneBridge/ESP32/master/wiki/dbesp32_webinterface.png)

:::tip
Some settings require you to reboot the ESP32 to take effect.
:::

## Wiring
Wiring is very simple and mostly the same for all devices connected to the TELEM1/2 ports of a Pixhawk. That is why this 
guide does not go into detail here.

* Connect UART of ESP32 to a UART of your flight controller (e.g. TELEM 1 or TELEM 2 port). Make sure the voltage levels 
  match! Most ESP32 DevKits can only take 3.3V!
  * TX to RX
  * RX to TX
  * GND to GND
  * Stable 3.3V or 5V power supply to the ESP32 (depending on the available inputs of your DevKit)
* Set the flight controller port to the desired protocol.

:::tip
Some manufacturers of ESP32 DevKits have wrong labels for the pins on their products. Make sure that the PINs on your 
board are labeled correctly if you encounter issues.
:::

![Example for wiring an ESP32 to the TELEM port](https://raw.githubusercontent.com/DroneBridge/ESP32/master/wiki/Pixhawk_wiring.png)

:::note
Follow the ESP32 board manufacturers recommendations on power supply. Some boards might have issues if they are simultaneously connected to a 5V power source and have a USB cable connected to the USB/Serial bridge (USB socket of the ESP32 dev board).
:::

## Configuring GCS like QGroundControl

The following connection options are available:
* UDP unicast on port `14550` to all connected devices.
* TCP on port `5760`

:::tip
DroneBridge for ESP32 will automatically forward all data to all connected WiFi devices via UDP to port 14550. 
QGroundControl should auto-detect the connection and no further actions should be necessary.
:::

## Toubleshooting

* Always erase the flash of the ESP32 before flashing a new release/firmware
* Check if the pins on your ESP board are labeled correctly.
* Enter the IP address in your browsers address bar `http://192.168.2.1`. No https supported! You may need to disconnect 
  from the cellular network when using a phone to be able to access the webinterface.
* If your network is operating in the same IP range as DB for ESP32 you need to change the Gateway IP address in the 
  Webinterface to something like `192.168.5.1`.

## API
DroneBridge for ESP32 offers a REST:API that allows you to read and write configuration options. You are not limited to 
the options presented by the Webinterface (e.g. baud rates). You can use the API to set custom baud rates or to integrate 
the system into your own setup.

**To request the settings**
``` http request
http://dronebridge.local/api/settings/request
```

**To request stats**
``` http request
http://dronebridge.local/api/system/stats
```

**Trigger a reboot**
``` http request
http://dronebridge.local/api/system/reboot
```

**Trigger a settings change:** Send a valid JSON
``` json
{
  "wifi_ssid": "DroneBridge ESP32",
  "wifi_pass": "dronebridge",
  "ap_channel": 6,
  "tx_pin": 17,
  "rx_pin": 16,
  "telem_proto": 4,
  "baud": 115200,
  "msp_ltm_port": 0,
  "ltm_pp": 2,
  "trans_pack_size": 64,
  "ap_ip": "192.168.2.1"
}
```
to
``` http request
http://dronebridge.local/api/settings/change
```
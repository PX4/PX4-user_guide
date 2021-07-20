# ESP32 WiFi Module

The ESP32 are readily available Wi-Fi modules with full TCP/IP stack and microcontroller capability. They offer dedicated UART, SPI and I2C interfaces. 
They can be used with any Pixhawk series controller.

## DroneBridge for ESP32

**DroneBridge for ESP32 offers a transparent and bi-directional serial to WiFi bridge.**  
Despite the original DroneBridge (for Raspberry Pi) 
it uses the WiFi protocol. Therefore, it can not offer the same range as the other DroneBridge implementations. 
Typical WiFi range is ~50m-200m depending on the antennas. High gain directional antennas might offer even more range.

## Recommended Hardware

Almost every ESP32 development board is capable to run DroneBridge for ESP32. Boards and modules with an external 
antenna connector are recommended, since those will offer more range.

**Most modules support 3.3V input (only), while some flight controllers (e.g. Pixhawk 4) output at 5V (you will need to 
check compatibility and step down the voltage if needed).**

Modules and DevKits that accept 3.3V supply:
* ESP32-WROOM-32UE
* ESP32-WROOM-32E
* AZDelivery DevKit C
* NodeMCU DevKit

## Downloading and Flashing the Firmware

Download the firmware from the GitHub repository and follow the flashing instructions there. They are always up to date.  
For convenience reasons some short instructions are given:
* Download the firmware pre-compiled binaries
* Connect your DEVKit to your computer via USB/Serial bridge
* Erase the flash and flash the DroneBridge for ESP32 firmware onto your ESP32
  * Using Espressif Flash Download Tools (Windows only)
  * Using esp-idf (all platforms)
* Power Cycle the ESP32
* [Connect to the "DroneBridge for ESP32" WiFi network and configure the firmware for your application](#configuring-dronebridge-for-esp32)

## Configuring DroneBridge for ESP32

### Default Configuration
* SSID: DroneBridge for ESP32
* Password: dronebridge
* Transparent/MAVLink
* UART baud rate 115200
* UART TX pin 17
* UART RX pin 16

### Custom Settings & Webinterface

## Wiring

## Configuring GCS like QGroundControl

## API
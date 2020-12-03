# ESP8266 WiFi 模块

ESP8266 是一款低成本且易于使用的 Wi-Fi 模块，具有完整的 TCP/IP 协议栈和微控制器功能。 It can be used with any Pixhawk series controller.

:::tip
ESP8266 is the *defacto* default WiFi module for use with [Pixracer](../flight_controller/pixracer.md) (and is usually bundled with it).
:::

## 购买地点

The module is readily available. A few vendors are listed below.

- [Sparkfun](https://www.sparkfun.com/products/13678)
- [GearBeast](https://us.gearbest.com/boards-shields/pp_009604906563.html)

## 模块设置

The ESP8266 firmware has these *factory* settings:

- SSID: PixRacer
- Password: pixracer
- WiFi Channel: 11
- UART speed 921600

### 从源文件编译

The [firmware repository](https://github.com/dogmaphobic/mavesp8266) contains instructions and all the tools needed for building and flashing the firmware.

### 预编译二进制文件

[MavLink ESP8266 Firmware V 1.2.2](http://www.grubba.com/mavesp8266/firmware-1.2.2.bin)

### 更新固件

If you have firmware 1.0.4 or greater installed, you can do the update using the ESP's *Over The Air Update* feature. Just connect to its AP WiFi link and browse to: `http://192.168.4.1/update`. You can then select the firmware file you downloaded above and upload it to the WiFi Module.

### Flashing the ESP8266 Firmware

Before flashing, make sure you boot the ESP8266 in *Flash Mode* as described below. If you cloned the [MavESP8266](https://github.com/dogmaphobic/mavesp8266) repository, you can build and flash the firmware using the provided [PlatformIO](http://platformio.org) tools and environment. If you downloaded the pre-built firmware above, download the [esptool](https://github.com/espressif/esptool) utility and use the command line below:

    esptool.py --baud 921600 --port /dev/your_serial_port write_flash 0x00000 firmware_xxxxx.bin
    

Where:

- **firmware_xxxxx.bin** 是您上面下载的固件
- **your_serial_port** 是ESP 8266连接到的串行端口的名称 (例如 `/dev/cu.usbmodem`) 。

### 下载固件接线

:::warning
ESP8266 must be powered with 3.3 volts only.
:::

There are various methods for setting the ESP8266 into *Flash Mode* but not all USB/UART adapters provide all the necessary pins for automatic mode switching. In order to boot the ESP8266 in *Flash Mode*, the GPIO-0 pin must be set low (GND) and the CH_PD pin must be set high (VCC). This is what my own setup looks like:

![esp8266 flashing rig](../../assets/hardware/telemetry/esp8266_flashing_rig.jpg)

I built a cable where RX, TX, VCC, and GND are properly wired directly from the FTDI adapter to the ESP8266. From the ESP8266, I left two wires connected to GPIO-0 and CH_PD free so I can boot it either normally or in flash mode by connecting them to GND and VCC respectively.

### ESP8266 (ESP-01) 引脚图

![esp8266 wifi module pinout](../../assets/hardware/telemetry/esp8266_pinout.jpg)

### Flashing Diagram using an FTDI USB/UART Adapter

![esp8266 flashing](../../assets/hardware/telemetry/esp8266_flashing_ftdi.jpg)

<span id="px4_config"></span>

## Pixhawk/PX4 Setup & Configuration

:::tip
If using PX4 1.8.2 (and earlier) you should connect the ESP8266 to TELEM2 and configure the port by [setting the parameter](../advanced_config/parameters.md) `SYS_COMPANION` to 1921600 (remember to reboot after setting the parameter). The following instructions assume you are using PX4 versions after 1.8.2
:::

Connect your ESP8266 to your Pixhawk-series flight controller (e.g. Pixracer) on any free UART.

Connect the flight controller to your ground station via USB (as WiFi is not yet fully set up).

Using *QGroundControl*:

- [Load recent PX4 firwmare](../config/firmware.md)
- [Configure the serial port](../peripherals/serial_configuration.md) used to connect the ESP8266. Remember to set the baud rate to 921600 in order to match the value set for the ESP8266.

Once the firmware (port) is set up you can remove the physical USB connection between the ground station and the vehicle.

## Connect via ESP8266 to QGC

On your wifi-enabled *QGroundControl* ground station computer/tablet, find and connect to the open wireless network for your ESP8266.

- By default the ESP8266 network is named **PixRacer** and the default password is **pixracer**.
- On Windows, the connection settings will look like this:
    
    ![Windows Network Setup: Connection](../../assets/peripherals/pixracer_network_setup_connection_windows.png)
    
    ![Windows Network Setup: Security](../../assets/peripherals/pixracer_network_setup_security_windows.png)

QGC automatically starts its UDP link on boot. Once your computer/tablet is connected to the **PixRacer** WiFi Access Point, it will automatically make the connection.

You should now see HUD movement on your QGC computer via wireless link and be able to view the summary panel for the ESP8266 WiFi Bridge (as shown below).

![QGC Summary showing Wifi Bridge](../../assets/qgc/summary/wifi_bridge.png)

:::tip
If you have any problem connecting, see [QGC Installation/Configuration Problems](https://docs.qgroundcontrol.com/en/Support/troubleshooting_qgc.html#waiting_for_connection).
:::
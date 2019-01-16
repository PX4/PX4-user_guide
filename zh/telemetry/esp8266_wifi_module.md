# ESP8266 WiFi 模块

ESP8266 是一款低成本且易于使用的 Wi-Fi 模块，具有完整的 TCP/IP 协议栈和微控制器功能。 它可以与任何 Pixhawk 系列控制器一起使用。

> **Tip** ESP8266是 *事实上的* 默认WiFi模块，用于 [Pixracer](../flight_controller/pixracer.md) (通常与其捆绑在一起)。

## 购买地点

该模块是现成的。 下面列出了一些供应商。

* [Sparkfun](https://www.sparkfun.com/products/13678)
* [GearBeast](https://us.gearbest.com/esp8266-wifi-module-_gear/)

## 模块设置

ESP8266固件具有以下 *工厂* 设置：

* SSID: PixRacer
* Password: pixracer
* WiFi Channel: 11
* UART speed 921600

### 从源文件编译

[固件仓库](https://github.com/dogmaphobic/mavesp8266) 包含编译和下载固件所需的所有指令和工具。

### 预编译二进制文件

[MavLink ESP8266 Firmware V 1.1.1](http://www.grubba.com/mavesp8266/firmware-1.1.1.bin)

### 更新固件

如果您安装了 1.0.4 或更高版本的固件，则可以通过使用 ESP 的 *Over The Air Update* 特性进行更新。 只需连接到其 AP WiFi 链接并浏览：http：//192.168.4.1/update 。 然后，您可以选择上面下载的固件文件，并将其上传到 WiFi 模块。

### 下载固件

在下载之前，请确保在 *Flash Mode* 中启动 ESP8266，如下所述。 如果您克隆了 [MavESP8266](https://github.com/dogmaphobic/mavesp8266)存储库，您可以使用提供的 [PlatformIO](http://platformio.org) 工具和环境编译和下载固件。 如果下载了上面预先编译的固件，请下载 [esptool](https://github.com/espressif/esptool) 实用程序，并使用下面的命令行：

    esptool.py --baud 921600 --port /dev/your_serial_port write_flash 0x00000 firmware_xxxxx.bin
    

其中：

* **firmware_xxxxx.bin** 是您上面下载的固件
* **your_serial_port** 是ESP 8266连接到的串行端口的名称 (例如 `/dev/cu.usbmodem`) 。

### 下载固件接线

> **Warning** ESP8266 必须仅以 3.3 伏特供电。

将 ESP8266 设置为 *Flash Mode* 有多种方法，但并非所有 USB/UART 适配器都为自动模式切换提供了所有必要的引脚。 为了以 *Flash Mode* 启动 ESP8266，必须将 GPIO-0 引脚设置为低(GND)，必须将 CH_PD 引脚设置为高(VCC)。 这就是我自己的设置：

![eSP8266 下载图](../../assets/hardware/telemetry/esp8266_flashing_rig.jpg)

我制作了一条电缆，其中 RX、TX、VCC 和 GND 可以从 FTDI 适配器直接连接到 ESP8266。 我为 ESP8266 留下了两条空闲线，并连接到 GPIO-0 和 CH_PD ，这样我可以通过把它们分别连接到 GND 和 VCC 而在正常或在 Flash Mode 下启动 ESP8266。

### ESP8266 (ESP-01) 引脚图

![eSP8266 无线模块引脚图](../../assets/hardware/telemetry/esp8266_pinout.jpg)

### 使用 FTDI USB/UART 适配器下载图

![eSP8266 下载](../../assets/hardware/telemetry/esp8266_flashing_ftdi.jpg)

## 配置

安装 ESP8266 到你的 PixRacer 。

下载 PX4 master (当前副本或通过 QGroundControl) 到您的 Pixracer。

使用带有 WiFi 的计算机或平板电脑，并找到到 ESP8266的开放无线网络。 默认情况下，它将被命名为 **Pixracer**。 连接到这个网络。 默认密码是 **pixracer** 。

## 使用 QGC

QGC 在启动时自动启动其 UDP 连接。 一旦您的计算机/平板连接到 **Pixracer** WiFi ，它将自动进行连接。

现在您应该可以通过无线链接在 QGC 计算机上看到 HUD 移动，如果使用最新的 QGC，您将能够访问 ESP8266 WiFi 桥的设置面板。
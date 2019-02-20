# Companion Computer Peripherals

This section contains information about peripherals for connecting Pixhawk (PX4) to a companion computer, and peripherals that might be connected to such a companion computer (and potentially triggered/accessed by PX4).


## Companion/Pixhawk Communication

Typical companion computer work with Pixhawk requires a companion link to transmit/receive the data between the companion computer and Pixhawk hardware (e.g. Intel NUC and Pixhawk 4).

There are a few devices that allow this communication bridge such as FTDI USB breakouts and level shifters (see below).

> **Note** PX4 configuration for communicating with a companion computer over MAVLink configuration is covered in [MAVLink \(OSD / Telemetry\)](../peripherals/mavlink_peripherals.md#TELEM2).
  Relevant topics/sections in the developer guide include: [Companion Computer for Pixhawk Series](http://dev.px4.io/en/companion_computer/pixhawk_companion.html), [Robotics](http://dev.px4.io/en/robotics/) and [RTPS/ROS2 Interface: PX4-FastRTPS Bridge](http://dev.px4.io/en/middleware/micrortps.html).

### FTDI Devices

The FTDI USB adapters are the most common way of communicating between companion computer and Pixhawk.
They are usually plug and play as long as the IO of the adapter is set to 3.3v.
In order to utilize the full capability/reliability of the serial link offered on the Pixhawk hardware, flow control is recommended.

#### Where To Buy and Features

Device | 3.3v IO (Default) | Flow Control | Tx/Rx LEDs | JST-GH
--- | --- | --- | --- | ---
[PixDev FTDI JST-GH Breakout](https://pixdev.myshopify.com/products/ftdi-breakout-jst-gh) | Yes | Yes | Yes | Yes
[mRo USB FTDI Serial to JST-GH (Basic)](https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm) | Capable | Capable | No | Yes
[SparkFun FTDI Basic Breakout](https://www.sparkfun.com/products/9873) | Yes | No | Yes | No
[Hyperion Adapter USB-FTDI](https://www.brack.ch/hyperion-adapter-usb-ftdi-510688) | Yes | No | Yes | No


### Logic Level Shifters

On occasion a companion computer may expose hardware level IO that is often run at 1.8v or 5v, while the Pixhawk hardware operates at 3.3v IO. 
In order to resolve this, a level shifter can be implemented to safely convert the transmitting/receiving signal voltage.

#### Where To Buy

* [SparkFun Logic Level Converter - Bi-Directional](https://www.sparkfun.com/products/12009)
* [4-channel I2C-safe Bi-directional Logic Level Converter - BSS138](https://www.adafruit.com/product/757)

## Cameras

Cameras are among the most common form of data collection on a drone whether it be hobbyist, educational, or industrial use.

### Stereo Cameras

Stereo cameras are typically used for depth perception, path planning and SLAM. 
They are in no way guaranteed to be plug and play with your companion computer.

#### Where To Buy
* [Intel® RealSense™ Depth Camera D435](https://click.intel.com/intelr-realsensetm-depth-camera-d435.html)
* [Intel® RealSense™ Depth Camera D415](https://click.intel.com/intelr-realsensetm-depth-camera-d415.html)
* [DUO MLX ](https://duo3d.com/product/duo-minilx-lv1)
* [Ironsides](https://www.perceptin.io/products)


## Data Telephony (LTE) {#data_telephony}

An LTE USB module can be attached to a companion computer and used to route MAVLink traffic between the flight controller and the Internet.

There is no standard approach for a ground station and companion to connect (i.e. for the GCS to discover the vehicle IP address, and visa versa).
Typically the companion will use a VPN system to connect to an already known GCS IP address and publish MAVLink on its UDP port.

Some USB modules that are known to work include:
- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) and [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/) 
  > **Tip** The *E8372* includes WiFi which you can use to configure the SIM while it is plugged into the companion (making the development workflow a little easier). The *E3372* annd lacks WiFi, so you have to configure it by plugging the stick into a laptop.

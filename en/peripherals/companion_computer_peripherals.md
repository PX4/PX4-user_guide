# Companion Computer Peripherals

This section contains information about peripherals for connecting Pixhawk (PX4) to a companion computer, and peripherals that might be connected to such a companion computer (and potentially triggered/accessed by PX4).


## Companion/Pixhawk Communication

Typical companion computer work with Pixhawk requires a companion link to transmit/receive the data between the companion computer and Pixhawk hardware (e.g. Intel NUC and Pixhawk 4).

There are a few devices that allow this communication bridge such as FTDI USB breakouts and level shifters (see below).

> **Note** PX4 configuration for communicating with a companion computer over MAVLink configuration is covered in [MAVLink \(OSD / Telemetry\)](../peripherals/mavlink_peripherals.md#example).
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
* [Ironsides](https://www.perceptin.io/products)
* [DUO MLX](https://duo3d.com/product/duo-minilx-lv1) <!-- note, timeout on link 18Nov2019 -->

## Data Telephony (LTE) {#data_telephony}

An LTE USB module can be attached to a companion computer and used to route MAVLink traffic between the flight controller and the Internet.

There is no "standard method" for a ground station and companion to connect over the Internet.
Generally you can't connect them directly because neither of them will have a public/static IP on the Internet.

> **Note** Typically your router (or the mobile network) has a public IP address, and your GCS computer/vehicle are on a *local* network.
  The router uses network address translation (NAT) to map *outgoing* requests from your local network to the Internet, and can use the map to route the *responses* back to requesting system.
  However NAT has no way to know where to direct the traffic from an arbitrary external system, so there is no way to *initiate* a connection to a GCS or vehicle running in the local network.

A common approach is to set up a virtual private network between the companion and GCS computer (i.e. install a VPN system like [zerotier](https://www.zerotier.com/) on both computers).
The companion then uses [mavlink-router](https://github.com/intel/mavlink-router) to route traffic between the serial interface (flight controller) and GCS computer on the VPN network.

This method has the benefit that the GCS computer address can be static within the VPN, so the configuration of the *mavlink router* does not need to change over time.
In addition, the communication link is secure because all VPN traffic is encrypted (MAVLink 2 itself does not support encryption).

> **Note** You can also choose to route to the VPN broadcast address (i.e. `x.x.x.255:14550`, where 'x' depends on the VPN system).
  This approach means that you do not need to know the IP address of the GCS computer, but may result in more traffic than desired (since packets are broadcast to every computer on the VPN network).


Some USB modules that are known to work include:
- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) and [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/) 
  - The *E8372* includes WiFi which you can use to configure the SIM while it is plugged into the companion (making the development workflow a little easier). The *E3372* lacks WiFi, so you have to configure it by plugging the stick into a laptop.

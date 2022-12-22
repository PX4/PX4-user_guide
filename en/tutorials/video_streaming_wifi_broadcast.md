
# Long-distance data link using wifi in raw mode

This page shows how to set up a companion computer with a camera (Logitech C920 or RaspberryPi camera) such that the video stream is transferred from the UAV to a ground computer and displayed in *QGroundControl*. It also provide a bidirectional telemetry link (i.e. like SiK radio) and tcp/ip tunnel for drone access during flight.

This setup uses WiFi in unconnected (broadcast) mode and software from the [WFB-ng project](https://github.com/svpcom/wfb-ng).
If you control drone via mavlink (via joystick in QGC) then you can use WFB-ng as single link for all drone communications.

:::note
Before using *WFB-ng* check regulators allow this kind of WiFi use in your country. 
:::

## WFB-ng Overview

The *WFB-ng project* provides data transport that use low-level WiFi packets to avoid the distance and latency limitations of the ordinary IEEE 802.11 stack.

The high level benefits of *WFB-ng* include:

- Low-latency video link
- Bidirectional telemetry (mavlink) link
- TCP/IP tunnel
- Automatic TX diversity - use multiple cards on the ground to avoid antenna tracker.
- Full link encryption and authentication (using [libsodium](https://download.libsodium.org/doc/)).
- Aggregation of MAVLink packets (pack small packets into batches before transmitting)
- Enhanced [OSD](https://github.com/svpcom/wfb-ng-osd) for Raspberry PI or generic linux desktop with gstreamer

Additional information is provided in the [FAQ](#faq) below.

## Hardware Setup

The hardware setup consists of the following parts:

On the UAV side:
* Raspberry PI 3B/3B+/ZeroW
* One of:

  a. [Raspberry Pi camera](https://www.raspberrypi.org/products/camera-module-v2/) connected via CSI.

  b. [Logitech camera C920](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34) connected via USB

* WiFi module  [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) or any other **RTL8812au** card.

On the ground side:
* One of:

  a. Any computer with usb port and Linux (tested on ubuntu 18.04 x86-64)
  b. Raspberry PI connected via ethernet to computer running QGroundControl with any OS.
  
* WiFi module  [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) or any other **RTL8812au** card. 
  See [WFB-ng wiki > WiFi hardware](https://github.com/svpcom/wfb-ng/wiki/WiFi-hardware) for more information on supported modules.

## Hardware Modification

Alpha AWUS036ACH is a medium power card and uses much current while transmitting. 
If you power it from ordinary USB2 it will reset the port on most **ARM boards**.
But if you connect it to **USB3** port via **native USB3 cable** to **linux laptop** you can use it without modifications.

For **Raspberry PI** (UAV or ground) it must be directly connected to 5V BEC (or high current power adapter in case of ground pi) in one of two ways:

1. Make a custom USB cable ([cut `+5V` wire from USB plug and connect it to BEC])(https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables)
2. Cut a `+5V` wire on PCB near USB port and wire it to BEC (don't do this if doubt - use custom cable instead).
   
Also you must to add 470uF **low ESR capacitor** (like ESC has) between **card +5v and ground** to filter voltage spikes.
You can integrate capacitor to custom usb cable. Without capacitor you can got strange issues like packets corruption or loss.
Be aware of [ground loop](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29) when using several ground wires.

**But if you use special very high power cards from taobao/aliexpress then you MUST power it as described above in ANY case.**

### UAV configuration
1. Download Raspberry PI image from [latest wfb-ng release](https://github.com/svpcom/wfb-ng/releases/)
2. Flash it to the **UAV** Raspberry PI
3. Reboot it and ssh with standard credentials (pi/raspberry).
4. Run actions for **air** role as displayed in motd.
5. Setup camera pipeline. Open `/etc/systemd/system/fpv-camera.service` and uncomment pipeline according to your camera (PI camera or Logitech camera)
6. Open `/etc/wifibroadcast.cfg` and configure WiFi channel according to your antenna setup (or use default #165 for 5.8GHz)
7. Configure PX4 to output telemetry stream at speed 1500kbps (other UART speeds doesn't match well to RPI frequency dividers).
   Connect Pixhawk uart to Raspberry PI uart. In `/etc/wifibroadcast.cfg` uncomment `peer = 'serial:ttyS0:1500000'` in `[drone_mavlink]` section.

### Using linux laptop as ground computer (the hard way)
1. On **ground** linux development computer:
   ```
   sudo apt install libpcap-dev libsodium-dev python3-all python3-twisted
   git clone -b stable https://github.com/svpcom/wfb-ng.git
   cd wfb-ng && make deb && sudo apt install ./deb_dist/wfb-ng*.deb
   ```
4. Follow [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO) to complete installation
5. Don't forget to copy `/etc/gs.key` from **UAV** side to **ground** side to bind two setups.
6. Also don't forget to use the same frequency channel as on the UAV side.

### Using Raspberry PI as ground computer (the easy way)
If you have Windows, OSX or doesn't want to setup WFB-ng to your linux laptop then you can use the same prebuilt image and another rasperry pi:

1. Flash image to the **ground** Rasbperry PI
2. Reboot it and ssh with standard credentials (pi/raspberry).
3. Run actions for **ground** role as displayed in motd, but skip setup of `fpv-video` service and `osd` service.
4. Connect your laptop and ground pi via ethernet and configure ip addresses
5. Edit `/etc/wifibroadcast.cfg` and set ip address of the laptop instead of `127.0.0.1` in `[gs_mavlink]` and `[gs_video]` sections.

### QGroundControl setup

1. Run *QGroundControl* and set `RTP h264` on port 5600 as video source
2. Use default settings (udp on port 14550) as mavlink source

## Tuning Radio Settings

With default settings WFB use radio channel 165 (5825 MHz), width 20MHz, MCS #1 (QPSK 1/2) with long GI. 
This provides ~7 mbit/s of **effective** speed (i.e. usable speed after FEC and packet encoding) for **both directions** in sum, because WiFi is half-duplex. 
So it is suitable for video down stream 720p@49fps (4 mbit/s) + two full-speed telemetry streams (uplink and downlink). 
If you need a higher bandwidth you can use other MCS index (for example 2 or greater)

## Antennas and Diversity

For simple cases you can use omnidirectional antennas with linear (that bundled with wifi cards) or circular leaf ([circularly polarized Coverleaf Antenna](http://www.antenna-theory.com/antennas/cloverleaf.php)) polarization. 
If you want to setup long distance link you can use multiple wifi adapters with directional and omnidirectional antennas. TX/RX diversity for multiple adapters supported out of box (just add multiple NICs to ``/etc/default/wifibroadcast``).
If your WiFi adapter has two antennas (like Alfa AWU036ACH) TX diversity is implemented via [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code). 
Cards with 4 ports (like Alfa AWUS1900) are currently not supported

## FAQ

**Q:** *What type of data can be transmitted using wfb-ng?*

**A:** Any UDP with packet size <= 1445. 
  For example x264 inside RTP or MAVLink.

**Q:** *What are transmission guarantees?*

**A:** Wifibrodcast use FEC (forward error correction). You can tune it (both TX and RX simultaneously!) to fit your needs.

**Q** *How long I can fly?*

**A** It depends on your antennas and wifi cards. With Alfa AWU036ACH and 20dBi patch antenna on the ground ~20km is possible.

:::caution
Don't use band that the RC TX operates on! 
Or setup RTL properly to avoid model loss.
:::

**Q:** *Is only Raspberry PI supported?*

**A:** WFB-ng is not tied to any GPU - it operates with UDP packets. 
  But to get RTP stream you need a video encoder (with encode raw data from camera to x264 stream) or use camera with hw video codec like Logitech C920 or ethernet securiry cameras.
  
#### What ARM Boards are recommended for the UAV?

- RPI3b/3b+/ZeroW. Prebuild images available, but it supports only h264 video for CSI cameras.
- Jetson Nano. It supports h264 and h265 but you need to setup it yourself according to [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO)

You can use any other linux arm board, but you need to use ethernet or usb camera with builtin hw video codecs (like Logitech C920)
## Theory

WFB-ng puts the WiFi cards into monitor mode. This mode allows to send and receive arbitrary packets without association and waiting for ACK packets.
[Analysis of Injection Capabilities and Media Access of IEEE 802.11 Hardware in Monitor Mode](https://github.com/svpcom/wfb-ng/blob/master/doc/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf)
[802.11 timings](https://github.com/ewa/802.11-data)


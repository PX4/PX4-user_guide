---
canonicalUrl: https://docs.px4.io/main/zh/tutorials/video_streaming_wifi_broadcast
---

# Long-distance Video Streaming in QGroundControl

This page shows how to set up a companion computer with a camera (Logitech C920 or RaspberryPi camera) such that the video stream is transferred from the UAV to a ground computer and displayed in *QGroundControl*. This setup uses WiFi in unconnected (broadcast) mode and software from the [Wifibroadcast project](https://github.com/svpcom/wifibroadcast/wiki). The mechanism also provide a bidirectional telemetry link (i.e. like SiK radio). 此设置使用未连接 (广播) 模式下的 wifi 和 [Wifibroadcast project](https://github.com/svpcom/wifibroadcast/wiki) 中的软件。

:::note
Before using *Wifibroadcast* check regulators allow this kind of WiFi use in your country.
:::

## 无线广播概述

*Wifibroadcast* 的高级别优势包括:

有关详细信息，请参阅 [FAQ](#faq)。

- Minimal latency by encoding every incoming RTP packet to a single WiFi (IEEE80211) packet and immediately sending (doesn't serialize to byte stream).
- 智能 FEC 支持（如果 FEC 管道没有间隔，立即将数据包提供给视频解码器）。
- [Bidirectional MAVLink telemetry](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO). You can use it for MAVLink up/down and video down link.
- Automatic TX diversity (select TX card based on RX RSSI).
- Aggregation of MAVLink packets. It doesn't send WiFi packet for every MAVLink packet.
- 分布式操作。 It can gather data from cards on different hosts. Distributed operation. It can gather data from cards on different hosts, so that bandwidth is not limited to that of a single USB bus.
- Inject packets with radio link RSSI to MAVLink stream Doesn't send WiFi packet for every MAVLink packet.
- [Enhanced OSD for Raspberry Pi](https://github.com/svpcom/wifibroadcast_osd) (consumes 10% CPU on Pi Zero).
- Compatible with any screen resolution. Supports aspect correction for PAL to HD scaling.

硬件由如下部分组成：


## 硬件安装

在发送端（无人机）：

在接收端（地面站）：
* [NanoPI NEO2](http://www.friendlyarm.com/index.php?route=product/product&product_id=180) (and/or Raspberry Pi if use Pi camera).
* [Logitech camera C920](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34) 或者 [Raspberry Pi camera](https://www.raspberrypi.org/products/camera-module-v2/).
* WiFi module [ALPHA AWUS051NH v2](https://www.alfa.com.tw/products_show.php?pc=67&ps=241).

Alpha WUS051NH is a high power card that uses too much current while transmitting. If you power it from USB it will reset the port on most ARM boards. So you need to connect it to 5V BEC directly. You can do this two ways:
* 任何使用 linux 的计算机 (在 fedora 25 x86-64 上测试)。
* WiFi module [ALPHA AWUS051NH v2](https://www.alfa.com.tw/products_show.php?pc=67&ps=241). See [wifibroadcast wiki > WiFi hardware](https://github.com/svpcom/wifibroadcast/wiki/WiFi-hardware) for more information on supported modules.

If you don't need high-power cards, you can use any card with **rtl8812au** chipset.

## 硬件设置

Alpha AWUS036ACH is a high power card that uses too much current while transmitting. If you power it from USB it will reset the port on most ARM boards. So it must be directly connected to 5V BEC in one of two ways:

1. Make a custom USB cable. [You need to cut `+5V` wire from USB plug and connect it to BEC](https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables)
2. Cut a `+5V` wire on PCB near USB port and wire it to BEC. Don't do this if doubt. Use custom cable instead! Also I suggest to add 470uF low ESR capacitor (like ESC has) between power and ground to filter voltage spikes. Be aware of [ground loop](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29) when using several ground wires. 还建议在电源和接地之间添加 470uf 低 ESR 电容器 (如电调电容器) 来过滤电压峰值。 使用多根地线时，请注意 [ground loop](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29)。


## 软件设置

To setup the (Linux) development computer:
1. Install **libpcap** and **libsodium** development libs.
1. 下载 [wifibroadcast sources](https://github.com/svpcom/wifibroadcast)。
1. [Patch](https://github.com/svpcom/wifibroadcast/wiki/Kernel-patches) your kernel. You only need to patch the kernel on TX (except if you want to use a WiFi channel which is disabled in your region by CRDA).

### Generate Encryption Keys

1. Setup camera to output RTP stream:

   a. a. Logitech camera C920 camera:
      ```
      gst-launch-1.0 uvch264src device=/dev/video0 initial-bitrate=6000000 average-bitrate=6000000 iframe-period=1000 name=src auto-start=true \
            src.vidsrc ! queue ! video/x-h264,width=1920,height=1080,framerate=30/1 ! h264parse ! rtph264pay ! udpsink host=localhost port=5600 b. RaspberryPi camera: ```raspivid --nopreview --awb auto -ih -t 0 -w 1920 -h 1080 -fps 30 -b 4000000 -g 30 -pf high -o - | gst-launch-1.0 fdsrc ! h264parse !  rtph264pay !  udpsink host=127.0.0.1 port=5600``` queue ! video/x-h264,width=1280,height=720,framerate=30/1 ! h264parse ! rtph264pay ! udpsink host=localhost port=5602
      ```
   b. RaspberryPi camera:
      ```
      raspivid --nopreview --awb auto -ih -t 0 -w 1280 -h 720 -fps 49 -b 4000000 -g 147 -pf high -o - | gst-launch-1.0 fdsrc ! h264parse !  rtph264pay !  udpsink host=127.0.0.1 port=5602
      ```
1. Setup *Wifibroadcast* in TX mode:
1. Configure autopilot (px4 stack) to output telemetry stream at 1500kbps (other UART speeds doesn't match well to NEO2 frequency dividers). Setup [mavlink-router](https://github.com/intel/mavlink-router) to route MAVLink packets to/from WFB:
   ```
   [UdpEndpoint wifibroadcast]
   Mode = Normal
   Address = 127.0.0.1
   Port = 14550
   ```

### UAV Setup (TX)

1. Run *QGroundControl* or use the following command to decode video:
   ```
   gst-launch-1.0 udpsrc port=5600 caps='application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264' \
          ! rtph264depay ! avdec_h264 clockoverlay valignment=bottom ! autovideosink fps-update-interval=1000 sync=false rtph264depay ! avdec_h264 clockoverlay valignment=bottom ! autovideosink fps-update-interval=1000 sync=false
   ```
1. Run qgroundcontrol or

## Enhanced setup with RX antenna array, FPV goggles and OSD

With default settings WFB use radio channel 165 (5825 MHz), width 20MHz, MCS #1 (QPSK 1/2) with long GI. This provides ~7 mbit/s of **effective** speed (i.e. usable speed after FEC and packet encoding) for **both directions** in sum, because WiFi is half-duplex. So it is suitable for video down stream 720p@49fps (4 mbit/s) + two full-speed telemetry streams (uplink and downlink). If you need a higher bandwidth you can use other MCS index (for example 2 or greater) and/or 40MHz channel.

## Antennas and Diversity

For simple cases you can use omnidirectional antennas with linear (that bundled with wifi cards) or circular leaf ([circularly polarized Coverleaf Antenna](http://www.antenna-theory.com/antennas/cloverleaf.php)) polarization. If you want to setup long distance link you can use multiple wifi adapters with directional and omnidirectional antennas. TX/RX diversity for multiple adapters supported out of box (just add multiple NICs to `/etc/default/wifibroadcast`). If your WiFi adapter has two antennas (like Alfa AWU036ACH) TX diversity is implemented via [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code). Cards with 4 ports (like Alfa AWUS1900) are currently not supported for TX diversity (only RX is supported).

## 常见问题

**Q:** *What is a difference from original wifibroadcast?*

The new version has been rewritten to use UDP as data source and pack one source UDP packet into one radio packet. Radio packets now have variable size depends on payload size. This is reduces a video latency a lot. With this scheme if radio packets were lost (and this was not corrected by FEC) the result was random/unexpected holes in the stream. This is especially bad if the data protocol is not resistant to such random erasures.

The new version was rewritten to use UDP as data source and pack one source UDP packet into one radio packet. Radio packets now have variable size that depends on payload size. This significantly reduces a video latency.

**Q:** *What type of data can be transmitted using wifibroadcast?*

**A:** Any UDP with packet size <= 1466. For example x264 inside RTP or MAVLink.

**Q:** *What are transmission guarantees?*

**A:** Wifibrodcast use FEC (forward error correction) which can recover 4 lost packets from 12 packets block with default settings. You can tune it (both TX and RX simultaneously!) to fit your needs.

:::caution
Don't use band that the RC TX operates on! Or setup RTL properly to avoid model loss.
:::

**Q:** *Is only Raspberry PI supported?*

**A:** Wifibroadcast is not tied to any GPU - it operates with UDP packets. But to get RTP stream you need a video encoder (with encode raw data from camera to x264 stream). In my case RPI is only used for video encoding (because RPI Zero is too slow to do anything else) and all other tasks (including wifibroadcast) are done by other board (NanoPI NEO2).

## Theory

Wifibroadcast puts the WiFi cards into monitor mode. This mode allows to send and receive arbitrary packets without association and waiting for ACK packets. [Analysis of Injection Capabilities and Media Access of IEEE 802.11 Hardware in Monitor Mode](https://github.com/svpcom/wifibroadcast/blob/master/patches/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf) [802.11 timings](https://github.com/ewa/802.11-data)


#### What ARM Boards are recommended for the UAV?

| Board                                                                        | Pros                                                                                                                                                                                                                                              | Cons                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Raspberry Pi Zero](https://www.raspberrypi.org/products/raspberry-pi-zero/) | - Huge community                                                                                                                                                                                                                                  | - Hard to buy outside US (shipping costs >> its price)<br>- Slow CPU<br>- Only one USB bus<br>- 512MB SDRAM                                                                                                  |
| [Odroid C0](https://www.hardkernel.com/shop/odroid-c0/)                      | 1GB SDRAM                                                                                                                                                                | - Very sensitive to radio interference                                 | Bad PCB quality (too thin, ground pins without [thermal relief](https://en.wikipedia.org/wiki/Thermal_relief)) | | [NanoPI NEO2](http://www.friendlyarm.com/index.php?route=product/product&product_id=180) | - ARM 64-bit CPU |
| [NanoPI NEO2](http://nanopi.io/nanopi-neo2.html)                             | - ARM 64-bit CPU<br>- Very cheap<br>- Supported by mainline kernel<br>- 3 independent USB busses<br>- 1Gbps Ethernet port<br>- 3 UARTs<br>- Very small form-factor<br>- Resistant to radio interference | No camera interface                                                                                                                                                                                       |                    |

This article chose to use Pi Zero as camera board (encode video) and NEO2 as main UAV board (wifibroadcast, MAVLink telemetry, etc.)


## 待完成

1. Make prebuilt images. Pull requests are welcome.
2. 使用不同的卡天线进行飞行测试。

---
canonicalUrl: https://docs.px4.io/main/ko/tutorials/video_streaming_wifi_broadcast
---


# Long-distance Data-link using WiFi in Raw Mode

UAV에서 동영상을 지상 컴퓨터로 전송하고 *QGroundControl*에 표출하기 위하여 카메라(Logitech C920 또는 RaspberryPi 카메라)가 있는 보조 컴퓨터 설정 방법을 설명합니다. It also provide a bidirectional [telemetry](../telemetry/README.md) link and TCP/IP tunnel for drone control during flight. If you manually control the drone with a Joystick from QGroundControl (which uses MAVLink) then you can use WFB-ng as single link for all drone communications (Video, MAVLink telemetry, remote control using a Joystick).

This setup uses WiFi in unconnected (broadcast) mode and software from the [WFB-ng project](https://github.com/svpcom/wfb-ng).

:::note
Before using *WFB-ng* check regulators allow this kind of WiFi use in your country.
:::

## WFB-ng Overview

The *WFB-ng project* provides a data transport that use low-level WiFi packets to avoid the distance and latency limitations of the ordinary IEEE 802.11 stack.

The high level benefits of *WFB-ng* include:

- Low-latency video link.
- Bidirectional telemetry link (MAVLink).
- TCP/IP tunnel.
- Automatic TX diversity - use multiple cards on the ground to avoid antenna tracker.
- Full link encryption and authentication (using [libsodium](https://download.libsodium.org/doc/)).
- Aggregation of MAVLink packets (pack small packets into batches before transmitting).
- Enhanced [OSD](https://github.com/svpcom/wfb-ng-osd) for Raspberry PI or generic linux desktop with gstreamer.

추가 정보는 아래 [FAQ](#faq)을 참고하십시오.

## 하드웨어 설정

하드웨어 설정은 다음과 같습니다.

On the UAV side:
* Raspberry PI 3B/3B+/ZeroW
* One of:

  - [Raspberry Pi camera](https://www.raspberrypi.org/products/camera-module-v2/) connected via CSI.

  - [Logitech camera C920](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34) connected via USB

- WiFi module  [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) or any other **RTL8812au** card.

On the ground side:
- One of:

  - Any computer with USB port and Linux (tested on ubuntu 18.04 x86-64)
  - Raspberry PI connected via Ethernet to computer running QGroundControl on any OS.

- WiFi module  [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) or any other **RTL8812au** card. See [WFB-ng wiki > WiFi hardware](https://github.com/svpcom/wfb-ng/wiki/WiFi-hardware) for more information on supported modules.

## 하드웨어 수정

Alpha AWUS036ACH is a medium power card that uses a lot of current while transmitting. If you power it from ordinary USB2 it will reset the port on most **ARM boards**. If you connect it to **USB3** port via **native USB3 cable** to a **Linux laptop** you can use it without modification.

For **Raspberry PI** (UAV or ground) it must be directly connected to 5V BEC (or high current power adapter in case of ground pi) in one of two ways:

- Make a custom USB cable ([cut `+5V` wire from USB plug and connect it to BEC])(https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables)
- USB 포트 인근의 PCB 기판에서 <1>+5V</1> 선을 뽑아 BEC에 연결(동작 여부가 의심스럽다면 진행하지 마십시오 - 대신 자체 제작 케이블을 쓰십시오).

You must also add a 470uF **low ESR capacitor** (like ESC has) between **card +5v and ground** to filter voltage spikes. You should integrate the capacitor with a custom USB cable. Without the capacitor you can get packet corruption or packet loss. 여러개의 접지선을 사용하면, [접지 루프](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29)가 나타날 수 있음을 명심하십시오.

**But if you use special very high power cards from taobao/aliexpress then you MUST power it as described above in ANY case.**

### UAV configuration
1. Download Raspberry PI image from [latest wfb-ng release](https://github.com/svpcom/wfb-ng/releases/)
2. Flash it to the **UAV** Raspberry PI
3. Reboot it and ssh with standard credentials (pi/raspberry).
4. Run actions for **air** role as displayed in motd.
5. Setup camera pipeline. Open `/etc/systemd/system/fpv-camera.service` and uncomment pipeline according to your camera (PI camera or Logitech camera)
6. Open `/etc/wifibroadcast.cfg` and configure WiFi channel according to your antenna setup (or use default #165 for 5.8GHz)
7. Configure PX4 to output telemetry stream at speed 1500kbps (other UART speeds doesn't match well to RPI frequency dividers). Connect Pixhawk uart to Raspberry PI uart. In `/etc/wifibroadcast.cfg` uncomment `peer = 'serial:ttyS0:1500000'` in `[drone_mavlink]` section.

### Using a Linux Laptop as GCS (Harder than using a RasPi)
1. On **ground** Linux development computer:
   ```
   sudo apt install libpcap-dev libsodium-dev python3-all python3-twisted
   git clone -b stable https://github.com/svpcom/wfb-ng.git
   cd wfb-ng && make deb && sudo apt install ./deb_dist/wfb-ng*.deb
   ```
4. Follow [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO) to complete installation
5. Don't forget to copy `/etc/gs.key` from **UAV** side to **ground** side to bind two setups.
6. Also don't forget to use the same frequency channel as on the UAV side.

### Using Raspberry PI as GCS (Easier)

If you have Windows, OSX, or don't want to setup WFB-ng to your Linux laptop then you can use the same prebuilt image and another Raspberry Pi:

1. Flash image to the **ground** Raspberry Pi.
2. Reboot it and SSH in with standard credentials (pi/raspberry).
3. Run actions for **ground** role as displayed in motd, but skip setup of `fpv-video` service and `osd` service.
4. Connect your laptop and ground RasPi via ethernet and configure IP addresses
5. Edit `/etc/wifibroadcast.cfg` and set the IP address of the laptop in `[gs_mavlink]` and `[gs_video]` sections (replacing `127.0.0.1`).

### QGroundControl Setup

1. Run *QGroundControl* and set `RTP h264` on port 5600 as video source
2. Use default settings (udp on port 14550) as mavlink source

## 라디오 설정 튜닝

기본 설정으로 WFB는 라디오 채널 165(5825MHz), 너비 20MHz, 긴 GI가 있는 MCS #1(QPSK 1/2)을 사용합니다. WiiFi가 반이중 방식이기 때문에 총 **양방향**에 대해 ~7mbit/s의 **유효** 속도(즉, FEC 및 패킷 인코딩 후 사용 가능한 속도)를 제공합니다. 따라서, 비디오 다운 스트림 720p@49fps(4mbit/s) + 2개의 전속 원격 측정 스트림(업링크 및 다운링크)에 적합합니다. If you need a higher bandwidth you can use other MCS index (for example 2 or greater)

## 안테나와 다양성

간단한 경우에는 선형(Wi-Fi 카드와 함께 제공됨) 또는 원형 리프([원편파 Coverleaf 안테나](http://www.antenna-theory.com/antennas/cloverleaf.php)) 편파가 있는 무지향성 안테나를 사용할 수 있습니다. 장거리 통신 설정에는 지향성 또는 무지향성 안테나가 있는 여러 Wi-Fi 어댑터를 사용할 수 있습니다. 기본적으로 지원되는 어댑터들은 TX/RX 다양성(여러 NIC를 `/etc/default/wifibroadcast`에 추가하기만 하면 됨)을 지원합니다. WiFi 어댑터에 두 개의 안테나(예: Alfa AWU036ACH)가 있는 경우에는 TX 다양성은 [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code)를 통해 구현됩니다. Cards with 4 ports (like Alfa AWUS1900) are currently not supported.

## 자주 묻는 질문

**Q:** *What type of data can be transmitted using wfb-ng?*

**A:** Any UDP with packet size <= 1445. 예를 들어, RTP 또는 MAVLink로 전송하는 x264 데이터가 있습니다.

**문:** *전송을 보장하는 기술은 무엇입니까?*

**A:** Wifibroadcast uses FEC (forward error correction). 필요에 따라 (TX, RX에서 동시에!) 설정 값을 조율할 수 있습니다.

**Q** *How far I can fly and still connect?*

**A** It depends on your antennas and WiFi cards. With Alfa AWU036ACH and 20dBi patch antenna on the ground ~20km is possible.

:::warning
Don't use band that the RC TX operates on! 
만일 그대로 사용하려면 모델 손상을 막기 위해 RTL 속성을 설정하십시오.
:::

**Q:** *라즈베리파이만 지원되나요?*

**A:** WFB-ng is not tied to any GPU - it operates with UDP packets. But to get RTP stream you need a video encoder (which encodes raw data from camera to x264 stream), or you must use a camera with a hardware video codec like Logitech C920 or Ethernet security cameras.

#### What ARM Boards are Recommended for the UAV?

- RPI3b/3b+/ZeroW. Prebuilt images are available, but it supports only h264 video for CSI cameras.
- Jetson Nano. It supports h264 and h265 but you need to setup it yourself according to [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO)

You can use any other Linux ARM board, but you need to use an Ethernet or USB camera with built-in hardware video codecs (such as Logitech C920).

## 이론

WFB-ng puts the WiFi cards into monitor mode. 이 모드를 사용하면 연관 없이 임의의 패킷을 송수신할 수 있으며, ACK 패킷을 기다릴 수 있습니다. [Analysis of Injection Capabilities and Media Access of IEEE 802.11 Hardware in Monitor Mode](https://github.com/svpcom/wfb-ng/blob/master/doc/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf) [802.11 timings](https://github.com/ewa/802.11-data)


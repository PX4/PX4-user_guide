---
canonicalUrl: https://docs.px4.io/main/ko/tutorials/video_streaming_wifi_broadcast
---

# 장거리 실시간 동영상 전송 및 원시 무선랜 전파를 통한 텔레메트리 통신

이 페이지에서는 UAV에서 지상 통제 장치로 실시간으로 동영상을 전송하여 *QGroundControl*에 나타내도록 카메라(Logitech C920 또는 라즈베리 파이 카메라)가 붙은 보조 컴퓨터의 설정 방법을 알려드리겠습니다. 매커니즘에서는 양방향 텔레메트리 연결(SiK 무선 통신)을 제공합니다. 이 설정 과정에서는 미연결 (브로드캐스팅) 모드로 [Wifibroadcast project](https://github.com/svpcom/wifibroadcast/wiki)의 프로그램을 활용합니다.

:::note
*Wifibroadcast*를 활용하기 전 사용자 여러분의 국가에서 합법적으로 WiFi 무선 통신을 활용할 수 있는지 확인하십시오.
:::

## wifibroadcast 개요

고수준 관점에서 *wifibroadcast* 가 주는 장점은 다음과 같습니다:

추가 정보는 하단 [자주 묻는 질문](#faq)에 있습니다.

- 지연 최소화를 위해 RTP를 IEEE 802.11 패킷으로 1:1 대응합니다(바이트 스트림으로 직렬화하지 않음).
- 지능형 FEC 지원(FEC 파이프라인에 갭이 존재하지 않을 경우 동영상 디코더로 즉시 패킷을 넘겨줌).
- [양방향 MAVLink 텔레메트리](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO) 전송을 지원합니다. MAVLink 상하향 송수신과 동영상 다운 링크 용도로 활용할 수 있습니다.
- 자동 TX 다변화(RX RSSI에 따라 TX 카드 선택).
- 실시간 전송 데이터 암호화 및 인증 ([libsodium](https://download.libsodium.org/doc/)).
- 분산 처리. 다양한 호스트의 카드에서 데이터를 수신할 수 있습니다. 따라서 단일 USB 버스의 대역폭에 제한을 받지 않습니다.
- MAVLink 패킷 수신을 일원화합니다. 모든 MAVLink 패킷에 대해 무선랜 패킷을 보내지 않습니다.
- 개선된 라즈베리 파이용 [OSD](https://github.com/svpcom/wifibroadcast_osd) (파이 제로에서 CPU에게 10% 부하를 안겨줌).
- 어떤 스크린 해상도에든 호환됩니다. PAL에서 HD 화면으로의 화면 비율 보정을 지원합니다.

하드웨어 설정은 다음 두 부분으로 나누어 구성했습니다:


## 하드웨어 설정

TX(무인 항공기) 측:

RX(지상 통제 장치) 측:
* [나노파이 네오2](http://www.friendlyarm.com/index.php?route=product/product&product_id=180)(그리고 파이 카메라 활용시 라즈베리 파이)
* [로지텍 C920 카메라](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34)  또는 [라즈베리 파이 카메라](https://www.raspberrypi.org/products/camera-module-v2/).
* [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) 무선랜 모듈.

고수준 신호세기 지원 카드가 필요하지 않으면 **rtl8812au** 칩셋이 달린 카드를 사용해도 됩니다.
* 리눅스를 설치한 아무 컴퓨터(페도라 25 x86_64 시험 완료).
* [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) 무선랜 모듈. 더 많은 지원 모듈 정보를 보려면 [wifibroadcast 위키 > 무선랜 하드웨어](https://github.com/svpcom/wifibroadcast/wiki/WiFi-hardware) 를 참고하십시오.

고출력 지원 카드가 필요하지 않으면 **rtl8812au** 칩셋이 달린 카드를 사용해도 됩니다.

## 하드웨어 개조

Alpha AWUS036ACH는 고출력 무선랜 카드로, 전송하는 동안 최대 전류를 소모합니다. USB 전원을 사용하면 대부분의 ARM 보드를 다시 시작하는 현상이 나타납니다. 따라서 다음 두가지 방법중 하나로 5V  배터리 전력 분배 회로(BEC)에 바로 연결해야합니다:

1. 자체 USB 케이블 제작([USB 플러그에서 `+5V`를 뽑아 BEC에 연결](https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables))
2. USB 포트 인근의 PCB 기판에서 <1>+5V</1> 선을 뽑아 BEC에 연결(동작 여부가 의심스럽다면 진행하지 마십시오 - 대신 자체 제작 케이블을 쓰십시오). 또한 (전동 변속기 같은) 470uF 낮은 등가저항 축전기를 전원과 접지부를 브릿징하여 전압 스파이크 현상을 방지하는걸 추천합니다. 여러 접지선을 사용하면 [접지 루프](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29)가 나타날 수 있음을 명심하십시오.


## 소프트웨어 설정

(리눅스)개발 컴퓨터를 설치하려면:
1. **libpcap**과 **libsodium** 개발 라이브러리와 **python2.7** + **python-twisted** 패키지를 설치하십시오.
1. [wifibroadcast 소스 코드](https://github.com/svpcom/wifibroadcast)를 다운로드하십시오.
1. [설치 방법](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO)을 참고하여 데비안, rpm, tar.gz 패키지를 빌드하고 설정하는 방법을 살펴보십시오.

### 무인 항공기 설정

1. 카메라에 RTP 실시간 전송 데이터 출력을 설정하십시오:

   가. 로지텍 C920 카메라:
      ```
      gst-launch-1.0 uvch264src device=/dev/video0 initial-bitrate=4000000 average-bitrate=4000000 iframe-period=3000 name=src auto-start=true \
               src.vidsrc ! queue ! video/x-h264,width=1280,height=720,framerate=30/1 ! h264parse ! rtph264pay ! udpsink host=localhost port=5602
      ```
   나. 라즈베리 파이 카메라:
      ```
      raspivid --nopreview --awb auto -ih -t 0 -w 1280 -h 720 -fps 49 -b 4000000 -g 147 -pf high -o - | gst-launch-1.0 fdsrc ! h264parse !  rtph264pay !  udpsink host=127.0.0.1 port=5602
      ```
1. [설정 방법](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO)에 따라 무인 항공기의 무선랜 광역 전송을 설정하십시오
1. 자동 항법 장치(px4 스택)에서 1500kbps 전송률로 텔레메트리 실시간 전송 데이터를 내보내도록 설정하십시오(기타 UART 속도는 네오2 주파수 분할 장치와 잘 맞지 않음). WFB간에 MAVLink 패킷을 주고받을 수 있도록 [mavlink-router](https://github.com/intel/mavlink-router)를 설정하십시오:
   ```
   [UdpEndpoint wifibroadcast]
   Mode = Normal
   Address = 127.0.0.1
   Port = 14550
   ```

### 지상 통제 장치 설정

1. 동영상을 디코딩하려면 *QGroundStation*을 실행하거나 다음 명령을 실행하십시오:
   ```
   gst-launch-1.0 udpsrc port=5600 caps='application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264' \
             ! rtph264depay ! avdec_h264 ! clockoverlay valignment=bottom ! autovideosink fps-update-interval=1000 sync=false
   ```
1. [설정 방법](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO)에 따라 지상 통제 장치의 무선랜 광역 전송을 설정하십시오.

## 미세 전파 조정

간단한 경우를 예로 들어, 선형 양극화(무선랜 카드에 붙어있음) 또는 환엽형 양극화([환형 양극화 엽상 안테나](http://www.antenna-theory.com/antennas/cloverleaf.php)) 무지향성 안테나를 사용할 수 있습니다. 장거리 연결을 설정하려 한다면, 지항성 및 무지향성 안테나를 다중 무선랜 어댑터에 붙여 사용할 수 있습니다. 다중 어댑터에서는 송수신 다양성을 특별히 지원합니다(단지 `/etc/default/wifibroadcast`에 여러 NIC를 추가하면 됨). WiFi 어댑터에 (Alfa AWU036ACH 처럼)안테나가 둘 붙어있을 경우, TX 다향성은 [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code)로 구현합니다.

## 안테나와 다양성

간단한 경우를 예로 들어, 선형 양극화(무선랜 카드에 붙어있음) 또는 환엽형 양극화([환형 양극화 엽상 안테나](http://www.antenna-theory.com/antennas/cloverleaf.php)) 무지향성 안테나를 사용할 수 있습니다. 장거리 연결을 설정하려 한다면, 지항성 및 무지향성 안테나를 다중 무선랜 어댑터에 붙여 사용할 수 있습니다. 다중 어댑터에서는 송수신 다양성을 특별히 지원합니다(단지 `/etc/default/wifibroadcast`에 여러 NIC를 추가하면 됨). WiFi 어댑터에 (Alfa AWU036ACH 처럼)안테나가 둘 붙어있을 경우, TX 다향성은 [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code)로 구현합니다. (Alfa AWU036ACH 같이) 4 포트가 붙은 카드는 현재 TX 다양성을 지원하지 않습니다(RX만 지원).

## 자주 묻는 질문

**문:** *원래 wifibroadcast와의 차이는 뭔가요?*

새 버전은 UDP를 데이터 전송 수단으로, 데이터를 UDP 패킷에 실어 무선 통신 패킷으로 보내도록 재작성했습니다. 이제 무선 통신 패킷은 내장 데이터 길이에 따라 크기가 바뀝니다. 이렇게 하여 동영상 처리 지연을 줄입니다.

새 버전은 UDP를 데이터 전송 수단으로, 데이터를 UDP 패킷에 실어 무선 통신 패킷으로 보내도록 재작성했습니다. 이제 무선 통신 패킷은 내장 데이터 길이에 따라 크기가 바뀝니다. 이렇게 하여 동영상 처리 지연을 확연히 줄입니다.

**문:** *어떤 데이터 형식을 wifibroadcast로 보낼 수 있나요?*

**A:** 임의의 UDP 패킷 크키는 <= 1466 입니다. 예를 들어 RTP 또는 MAVLink에 실어 보내는 x264 데이터가 있습니다.

**문:** *전송을 보장하는 기술은 무엇인가요?*

**답:** wifibroadcast는 전송 오류 수정(FEC) 기법을 통해 기본 설정에 따라 12패킷 단위로 들어가는 한 블록에서 손실 패킷 4개 정도 복구할 수 있습니다. 필요에 따라 (TX, RX에서 동시에!) 설정 값을 조율할 수 있습니다.

:::caution RC
TX 동작시 해당 대역을 사용하지 마십시오! 만일 그대로 사용하려면 모델 손상을 막기 위해 RTL 속성을 설정하십시오.
:::

**문:** *라즈베리 파이에서만 지원하나요?*

**답:** wifibroadcast 기술은 어떤 GPU에 한정하지 않습니다. UDP 패킷에 대해 동작합니다. 그런데 RTP 실시간 전송 데이터를 받으려면 (카메라 원시 데이터에서 x264 실시간 전송 데이터로 변환하는) 동영상 인코더가 필요합니다. 라즈베리 파이의 경우 동영상 인코딩 목적으로만 활용(라즈베리 파이 제로에서 다른 작업을 동시에 하기엔 너무 느리므로)하고 기타 다른 작업(wifibroadcast 동작 포함)은 다른 보드(나노파이 네오2)에서 수행합니다.

## 이론

wifibroadcast는 무선랜 카드를 감시자 모드로 둡니다. 이 모드를 통해 ACK 패킷을 기다리거나 (3-way handshake 등을 통한) 연결을 진행하지 않고도 임의의 패킷을 주고받을 수 있습니다. [802.11 타이밍](https://github.com/ewa/802.11-data) [감시자 모드에서의 IEEE 802.11 하드웨어 데이터 강제 전송 기능 및 미디어 접근 분석](https://github.com/svpcom/wifibroadcast/blob/master/patches/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf)


#### 무인 항공기에 추천할 ARM 보드는 무엇입니까?

| 보드                                                                                    | 장점                                                                                                                                                                           | 단점                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [라즈베리 파이 제로](https://www.raspberrypi.org/products/raspberry-pi-zero/)                 | - 대형 커뮤니티<br>- 카메라 지원<br>- OMX API를 통한 하드웨어 기반<br/>동영상 인코더/디코더 지원                                                                                          | - 북미 외 지역에서의 구매시 어려움( 운송비 >> 구매비 )<br>- 느린 CPU<br>- USB 버스만 있음<br>- 512MB SDRAM                                                                                           |
| [오드로이드 C0](https://www.hardkernel.com/shop/odroid-c0/)                                | - 빠른 CPU<br>- EMMC<br>- 1GB SDRAM                                                                                                                                | - 무선 통신 혼선에 매우 민감<br>- 메인 라인 커널을 지원하지 않음<br>- 높은 가격대<br>- 하드웨어 동영상 인코더 동작 안함<br>- 인쇄기판 품질 불량(너무 얇고, 접지 핀에 [내열](https://en.wikipedia.org/wiki/Thermal_relief)기능이 없음) |
| [나노파이 네오2](http://www.friendlyarm.com/index.php?route=product/product&product_id=180) | - ARM 64비트 CPU<br>- 매우 쌈<br>- 메인라인 커널 지원<br>- 독립 USB 버스 3개 장착<br>- 1Gbps 이더넷 포트<br>- UART 포트 3개<br>- 기판이 매우 작음<br>- 무선 통신 혼선에 잘 견딤 | - 커뮤니티 조직이 작음<br>- 512MB SDRAM<br>- 카메라 인터페이스 없음                                                                                                                                |

위 내용을 통해 라즈베리 파이 제로를 카메라 보드(동영상 인코딩 용)로, 네오2를 무인항공기 메인보드(wifibroadcast, MAVLink 텔레메트리 통신 등)로 선택했습니다.


## 할 일

1. 사전 빌드 이미지를 만들어야합니다. pull 요청은 언제든 환영합니다.
2. 여러가지 카드/안테나로 비행 시험을 진행해야합니다.

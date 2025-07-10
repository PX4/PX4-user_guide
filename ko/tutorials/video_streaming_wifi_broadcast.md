---
canonicalUrl: https://docs.px4.io/main/ko/tutorials/video_streaming_wifi_broadcast
---

# Raw Wi-Fi 라디오를 통한 장거리 비디오 스트리밍 및 텔레메트리

UAV에서 동영상을 지상 컴퓨터로 전송하고 *QGroundControl*에 표출하기 위하여 카메라(Logitech C920 또는 RaspberryPi 카메라)가 있는 보조 컴퓨터 설정 방법을 설명합니다. 이 메커니즘은 양방향 텔레메트리(예: SiK 라디오)통신을 제공합니다. 이 설정은 연결되지 않은(브로드캐스트) 모드의 Wi-Fi와 [Wifibroadcast 프로젝트](https://github.com/svpcom/wifibroadcast/wiki)의 소프트웨어를 사용합니다.

:::note
*Wifibroadcast*를 사용하기 전에, 법적으로 허용되는 지 미리 확인하십시오.
:::

## Wifibroadcast 개요

*Wifibroadcast 프로젝트*는 일반 IEEE 802.11 스택의 거리 및 대기 시간 제한을 해결할 수 있는 저수준의 WiFi 패킷을 사용하는 비디오 및 텔레메트리 전송 기술입니다.

*Wifibroadcast*의 장점은 다음과 같습니다.

- 최소 대기 시간을 위해 RTP를 IEEE 802.11 패킷에 1:1 매핑합니다(바이트 스팀으로 직렬화하지 않음).
- 스마트 FEC 지원(간격이 없는 FEC 파이프라인인 경우 비디오 디코더에 패킷을 즉시 양보).
- [양방향 MAVLink 텔레메트리](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO) MAVLink 송수신과 비디오 전송이 가능합니다.
- 자동 TX 다변화(RX RSSI에 따라 TX 카드 선택).
- 실시간 전송 데이터 암호화 및 인증 ([libsodium](https://download.libsodium.org/doc/)).
- 분산 작업. 다양한 호스트의 카드에서 데이터를 수신할 수 있습니다. 따라서 단일 USB 버스의 대역폭에 제한을 받지 않습니다.
- MAVLink 패킷 수신을 일원화합니다. 모든 MAVLink 패킷에 대해 무선랜 패킷을 전송하지 않습니다.
- 개선된 라즈베리 파이용 [OSD](https://github.com/svpcom/wifibroadcast_osd) (파이 제로에서 CPU에게 10% 부하를 안겨줌).
- 다양한 화면 해상도와 호환됩니다. PAL에서 HD 화면으로의 화면 비율 보정을 지원합니다.

추가 정보는 아래 [FAQ](#faq)을 참고하십시오.


## 하드웨어 설정

하드웨어 설정은 다음과 같습니다.

TX(UAV) 측:
* [NanoPI NEO2](http://nanopi.io/nanopi-neo2.html)(또는 라즈베리파이 카메라를 사용하는 경우)
* [로지텍 C920 카메라](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34)  또는 [라즈베리파이 카메라](https://www.raspberrypi.org/products/camera-module-v2/).
* [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) Wi-Fi  모듈.

RX(지상국 측):
* Linux가 설치된 컴퓨터(Fedora 25 x86-64에서 테스트).
* [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) Wi-Fi  모듈. 지원되는 모듈에 대한 자세한 내용은 [Wifibroadcast 위키 > WiFi 하드웨어](https://github.com/svpcom/wifibroadcast/wiki/WiFi-hardware)를 참고하십시오.

고출력 지원 카드가 필요하지 않으면, **rtl8812au** 칩셋 카드를 사용하여도 됩니다.

## 하드웨어 수정

Alpha AWUS036ACH는 전송시에 과도한 전류를 사용하는 고전력 카드입니다. USB 전원을 사용하면, 대부분의 ARM 보드를 다시 시작하는 현상이 나타납니다. 따라서, 다음 두 가지 방법중 하나로 5V BEC에 직접 연결하여야 합니다.

1. 자체 USB 케이블 제작([USB 플러그에서 `+5V`를 뽑아 BEC에 연결](https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables))
2. USB 포트 인근의 PCB 기판에서 <1>+5V</1> 선을 뽑아 BEC에 연결(동작 여부가 의심스럽다면 진행하지 마십시오 - 대신 자체 제작 케이블을 쓰십시오). 또한 (전동 변속기 같은) 470uF 낮은 등가저항 축전기를 전원과 접지부를 브릿징하여 전압 스파이크 현상을 방지하는것을 추천합니다. 여러개의 접지선을 사용하면, [접지 루프](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29)가 나타날 수 있음을 명심하십시오.


## 소프트웨어 설정

(리눅스)개발 컴퓨터를 설치하려면:
1. **libpcap**과 **libsodium** 개발 라이브러리와 **python2.7**에서 **python-twisted** 패키지를 설치합니다.
1. [Wifibroadcast 소스 코드](https://github.com/svpcom/wifibroadcast)를 다운로드합니다.
1. debian, rpm 또는 tar.gz 패키지를 빌드하고 구성하는 방법은 [설정 방법](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO)을 참고하십시오.

### UAV 설정

1. RTP 스트림을 출력하도록 카메라를 설정합니다.

   a.  로지텍 C920 카메라:
      ```
      gst-launch-1.0 uvch264src device=/dev/video0 initial-bitrate=4000000 average-bitrate=4000000 iframe-period=3000 name=src auto-start=true \
               src.vidsrc ! queue ! video/x-h264,width=1280,height=720,framerate=30/1 ! h264parse ! rtph264pay ! udpsink host=localhost port=5602
      ```
   나. 라즈베리파이 카메라:
      ```
      raspivid --nopreview --awb auto -ih -t 0 -w 1280 -h 720 -fps 49 -b 4000000 -g 147 -pf high -o - | gst-launch-1.0 fdsrc ! h264parse !  rtph264pay !  udpsink host=127.0.0.1 port=5602
      ```
1. [설정 방법](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO)에 따라 드론용 WFB를 설정합니다.
1. 1500kbps에서 텔레메트리 데이터를 출력하도록 자동조종장치(px4 스택)를 설정합니다(다른 UART 속도는 NEO2 주파수 분배기와 일치하지 않음). WFB간에 MAVLink 패킷을 송수신하도록 [mavlink-router](https://github.com/intel/mavlink-router)를 설정하십시오:
   ```
   [UdpEndpoint wifibroadcast]
   Mode = Normal
   Address = 127.0.0.1
   Port = 14550
   ```

### 지상국 설정

1. *QGroundControl*을 실행하거나 다음 명령을 사용하여 비디오를 디코딩하십시오.
   ```
   gst-launch-1.0 udpsrc port=5600 caps='application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264' \
             ! rtph264depay ! avdec_h264 ! clockoverlay valignment=bottom ! autovideosink fps-update-interval=1000 sync=false
   ```
1. [설정 방법](https://github.com/svpcom/wifibroadcast/wiki/Setup-HOWTO)에 따라 지상국 WFB를 설정합니다.

## 라디오 설정 튜닝

기본 설정으로 WFB는 라디오 채널 165(5825MHz), 너비 20MHz, 긴 GI가 있는 MCS #1(QPSK 1/2)을 사용합니다. WiiFi가 반이중 방식이기 때문에 총 **양방향**에 대해 ~7mbit/s의 **유효** 속도(즉, FEC 및 패킷 인코딩 후 사용 가능한 속도)를 제공합니다. 따라서, 비디오 다운 스트림 720p@49fps(4mbit/s) + 2개의 전속 원격 측정 스트림(업링크 및 다운링크)에 적합합니다. 더 높은 대역폭이 필요한 경우에는 다른 MCS 인덱스(예: 2 이상) 및/또는 40MHz 채널을 사용할 수 있습니다.

## 안테나와 다양성

간단한 경우에는 선형(Wi-Fi 카드와 함께 제공됨) 또는 원형 리프([원편파 Coverleaf 안테나](http://www.antenna-theory.com/antennas/cloverleaf.php)) 편파가 있는 무지향성 안테나를 사용할 수 있습니다. 장거리 통신 설정에는 지향성 또는 무지향성 안테나가 있는 여러 Wi-Fi 어댑터를 사용할 수 있습니다. 기본적으로 지원되는 어댑터들은 TX/RX 다양성(여러 NIC를 `/etc/default/wifibroadcast`에 추가하기만 하면 됨)을 지원합니다. WiFi 어댑터에 두 개의 안테나(예: Alfa AWU036ACH)가 있는 경우에는 TX 다양성은 [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code)를 통해 구현됩니다. 4개의 포트가 있는 카드(예: Alfa AWUS1900)는 현재 TX 다양성이 지원되지 않습니다(RX만 지원됨).

## 자주 묻는 질문

**Q:** *원래 Wifibroadcast와의 차이점은 무엇입니까?*

**A:** Wifibroadcast의 원래 버전은 바이트 스트림을 입력으로 사용하고, 고정 크기 패킷으로 분할합니다(기본값은 1024). 이 방식을 사용하면 무선 패킷이 손실되고, FEC에 의해 수정되지 않은 경우에는 스트림에 예기치 않은 손실이 발생합니다. 데이터 프로토콜이 이러한 임의 삭제에 처리하지 않으면 좋은 결과를 얻을 수 없습니다.

새 버전은 UDP를 데이터 소스로 사용하고, 하나의 소스 UDP 패킷을 하나의 무선 패킷으로 압축하도록 재작성되었습니다. 무선통신 패킷은 내장 데이터 길이에 따라 크기가 바뀝니다. 이렇게 하여 동영상 처리 지연이 확연히 줄어듭니다.

**Q:** *Wifibroadcast를 사용하여 어떤 유형의 데이터를 전송할 수 있습니까?*

**A:** 패킷 크기가 1466 이하인 모든 UDP를 전송할 수 있습니다. 예를 들어, RTP 또는 MAVLink로 전송하는 x264 데이터가 있습니다.

**문:** *전송을 보장하는 기술은 무엇입니까?*

**A:** Wifibrodcast는 기본 설정으로 12개의 패킷 블록에서 4개의 손실된 패킷을 복구할 수 있는 FEC(순방향 오류 수정)를 사용합니다. 필요에 따라 (TX, RX에서 동시에!) 설정 값을 조율할 수 있습니다.

:::caution
RC TX 동작시 해당 대역을 사용하지 마십시오! 
만일 그대로 사용하려면 모델 손상을 막기 위해 RTL 속성을 설정하십시오.
:::

**Q:** *라즈베리파이만 지원되나요?*

**A:** Wifibroadcast는 GPU에 연결되지 않고 UDP 패킷으로 작동합니다. 그러나 RTP 스트림을 얻으려면 비디오 인코더가 필요합니다(카메라에서 x264 스트림으로 원시 데이터 인코딩 포함). 라즈베리파이는 동영상 인코딩 목적으로만 활용(라즈베리 파이 제로에서 다른 작업을 동시에 하기엔 너무 느리므로)하고, 기타 다른 작업(wifibroadcast 동작 포함)은 다른 보드(나노파이 네오2)에서 수행합니다.

## 이론

Wifibroadcast는 Wi-Fi 카드를 모니터 모드로 전환합니다. 이 모드를 사용하면 연관 없이 임의의 패킷을 송수신할 수 있으며, ACK 패킷을 기다릴 수 있습니다. [802.11 타이밍](https://github.com/ewa/802.11-data) [감시자 모드에서의 IEEE 802.11 하드웨어 데이터 강제 전송 기능 및 미디어 접근 분석](https://github.com/svpcom/wifibroadcast/blob/master/patches/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf)


#### UAV에 권장되는 ARM 보드는 무엇입니까?

| 보드                                                                                    | 장점                                                                                                                                                                                                                                               | 단점                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [라즈베리파이 제로](https://www.raspberrypi.org/products/raspberry-pi-zero/)                  | - 대형 커뮤니티<br>- 카메라 지원<br>- OMX API를 통한 하드웨어 기반<br/>동영상 인코더/디코더 지원                                                                                                                                                              | - 북미 외 지역에서의 구매시 어려움( 운송비 >> 구매비 ) <br>- 느린 CPU <br>- USB 버스만 있음 <br>- 512MB SDRAM                                                                                        |
| [오드로이드 C0](https://www.hardkernel.com/shop/odroid-c0/)                                | - 빠른 CPU <br>- EMMC<br> - 1GB SDRAM                                                                                                                                                                                                  | - 무선 통신 혼선에 매우 민감<br>- 메인 라인 커널을 지원하지 않음<br>- 높은 가격대<br>- 하드웨어 동영상 인코더 동작 안함<br>- 인쇄기판 품질 불량(너무 얇고, 접지 핀에 [내열](https://en.wikipedia.org/wiki/Thermal_relief)기능이 없음) |
| [나노파이 네오2](http://www.friendlyarm.com/index.php?route=product/product&product_id=180) | - ARM 64-bit CPU<br>- Very cheap<br>- Supported by mainline kernel<br>- 3 independent USB buses<br>- 1Gbps Ethernet port<br>- 3 UARTs<br>- Very small form-factor<br>- Resistant to radio interference | - 커뮤니티가 작음<br>- 512MB SDRAM<br>- 카메라 인터페이스 없음                                                                                                                                   |

이 섹션에서는 Pi Zero를 카메라 보드(비디오 인코딩)로 사용하고, NEO2를 메인 UAV 보드(Wifibroadcast, MAVLink 원격 측정 등)로 사용하였습니다.


## 할 일

1. 사전 빌드 이미지를 생성합니다. pull 요청은 언제든 환영합니다.
2. 여러가지 카드와 안테나로 시험 비행을 진행합니다.

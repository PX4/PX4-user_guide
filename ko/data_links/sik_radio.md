---
canonicalUrl: https://docs.px4.io/main/ko/data_links/sik_radio
---

# SiK 라디오 통합

[SiK 라디오](https://github.com/LorenzMeier/SiK)는 텔레메트리 펌웨어와 도구들입니다.

SiK Radio *사용법*은 [주변장치 > 원격 측정 > SiK 라디오](../telemetry/sik_radio.md)를 참고하십시오.

아래의 "개발자" 정보는 소스에서 SiK 펌웨어를 빌드하고 AT 명령을 사용하여 구성하는 방법에 대하여 설명합니다.

## 지원 라디오 하드웨어

SiK 저장소에는 다음 텔레메트리(2020-02-25)들의 부트로더와 펌웨어를 제공합니다.
- HopeRF HM-TRP
- HopeRF RF50-DEMO
- RFD900
- RFD900a
- RFD900p
- RFD900pe
- RFD900u
- RFD900ue

:::note
SiK 저장소는 RFD900x 와 RFD900ux의 텔레메트리 펌웨어를 현재는 제공하지 않습니다. 이러한 라디오의 펌웨어를 업데이트하려면(예: MAVLink v2.0을 지원하기 위해) 다음 프로세스를 참고하십시오.

1. [RFDesign 웹사이트](https://files.rfdesign.com.au/firmware/)에서 적절한 펌웨어를 다운로드합니다.
1. Windows PC에서 [RFD 모뎀 도구](https://files.rfdesign.com.au/tools/)를 다운로드하여 설치합니다.
1. RFD 모뎀 도구 GUI를 사용하여, RFD900x 또는 RFD900ux 원격 측정 라디오에 펌웨어를 업로드합니다.
:::

## 빌드 방법

필수 8051 컴파일러는 기본 PX4 빌드 도구 체인에 포함되어 있지 않아서, 설치하여야 합니다.

### 맥 OS

툴체인을 설치합니다:

```sh
brew install sdcc
```

표준 SiK 라디오/3DR 라디오 이미지를 빌드합니다:

```sh
git clone https://github.com/LorenzMeier/SiK.git
cd SiK/Firmware
make install
```

라디오에 업로드합니다 \(**직렬 포트 이름 변경**\):

```
라디오에 업로드 \(<0>직렬 포트 이름 변경</0>\):
```

## 설정 방법

AT 명령을 사용하여 라디오를 설정합니다.

```sh
screen /dev/tty.usbserial-CHANGETHIS 57600 8N1
```

그런 다음 명령 모드를 시작합니다:

:::note
1초 전후에 아무 것도 입력하지 마십시오.
:::


```
+++
```

현재 설정을 출력합니다.

```
ATI5
```

그런 다음 네트 ID를 설정하고, 설정을 저장한 다음 라디오를 재부팅합니다:

```
ATS3=55
AT&W
ATZ
```

:::note
두 번째 라디오에 연결하려면, 라디오의 전원을 껐다가 켜야 할 수 있습니다.
:::

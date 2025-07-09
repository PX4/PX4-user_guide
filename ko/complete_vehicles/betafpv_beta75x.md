---
canonicalUrl: https://docs.px4.io/main/ko/complete_vehicles/betafpv_beta75x
---

# BetaFPV Beta75X 2S 브러시리스 후프

:::warning
This frame has been [discontinued](../flight_controller/autopilot_experimental.md) and is no longer commercially available.
:::

[BetaFPV Beta75X](https://betafpv.com/products/beta75x-2s-whoop-quadcopter)는 실내 또는 실외, FPV 또는 가시선으로 비행할 수있는 작은 쿼드콥터입니다.

![BetaFPV Beta75X](../../assets/hardware/betafpv_beta75x.jpg)

## 구매처

*Beta75X*는 여러 곳에서 구매할 수 있습니다.
- [GetFPV](https://www.getfpv.com/beta75x-2s-brushless-whoop-micro-quadcopter-xt30-frsky.html)
- [아마존](https://www.amazon.com/BETAFPV-Beta75X-Brushless-Quadcopter-Smartaudio/dp/B07H86XSPW)

추가로 다음과 같은 것들이 필요합니다.
- RC 송신기. *Beta75X*는 수신기와 함께 배송될 수 있습니다. PX4는 이들과 호환되지만 송신기와 일치하는 버전을 선택하는 것이 좋습니다.
- LiPo 배터리 충전기(배터리 1개와 함께 배송되지만 여분이 필요할 수 있습니다).
- FPV를 비행하고 싶다면 FPV 고글을 사용하십시오. There are many compatible options, including these ones from [Fatshark](https://www.fatshark.com/product-page/dominator-v3).

  :::note
FPV 지원은 PX4와 비행 컨트롤러와는 관련이 없습니다.
:::

## PX4 부트로더 플래싱하기

*Beta75X*에는 Betaflight가 사전 설치되어 있습니다.

PX4 펌웨어를 업로드전에 PX4 부트 로더를 먼저 설치하여야 합니다. 부트 로더 설치 방법은 [Omnibus F4](../flight_controller/omnibus_f4_sd.md#bootloader) 항목(*Beta75X*의 비행 컨트롤러 보드)를 참고하십시오.

:::tip
You can always [reinstall Betaflight](../advanced_config/bootloader_update_from_betaflight.md#reinstall-betaflight) later if you want!
:::

## 설치 및 설정

부트 로더가 설치되면 USB 케이블을 통해 기체를 *QGroundControl*에 연결할 수 있습니다.

:::note
이 문서 작성 시점에는 *Omnibus F4*는 QGroundControl *Daily Build*에서 지원되며 사전 빌드된 펌웨어는 마스터 브랜치에 대해서만 제공됩니다 (안정적인 릴리스는 아직 제공되지 않음).
:::

PX4를 설치 및 설정:
- [PX4 펌웨어 로드](../config/firmware.md).
- [Airframe](../config/airframe.md)을 *BetaFPV Beta75X 2S Brushless Whoop*로 설정합니다.
- 센서 보정과 무선 설정을 포함하여 [기본 설정](../config/README.md)을 진행합니다.

## 비디오

@[유투브](https://youtu.be/_-O0kv0Qsh4)

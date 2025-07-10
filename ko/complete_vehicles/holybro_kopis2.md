---
canonicalUrl: https://docs.px4.io/main/ko/complete_vehicles/holybro_kopis2
---

# Holybro Kopis 2

[Holybro Kopis 2](https://shop.holybro.com/c/kopis_0480l)는 FPV 또는 가시선 비행을 위한 즉시 비행 가능한 레이서 쿼드입니다.

![Kopis 2](../../assets/hardware/holybro_kopis2.jpg)

## 구매처

*Kopis 2*는 여러 곳에서 구매 가능합니다.

- [Holybro](https://shop.holybro.com/c/kopis_0480) <!-- item code 30069, 30070 -->

- [GetFPV](https://www.getfpv.com/holybro-kopis-2-fpv-racing-drone-pnp.html)

추가로 다음과 같은 것들이 필요합니다.

- RC 송신기. *Kopis 2*에는 FrSky 수신기가 포함되지 않은 체로 배송될 수도 있습니다.
- LiPo 배터리 및 충전기.
- FPV를 비행하고 싶다면 FPV 고글을 사용하십시오. [Fatshark](https://www.fatshark.com/product/dominator-hd-v3-fpv-headset-goggles/)의 포함한 여러가지 호환 옵션들이 있습니다. Kopis 2의 HD 버전이있는 경우 DJI FPV 고글을 사용할 수도 있습니다.
    
:::note FPV
지원은 PX4와 비행 컨트롤러와는 관련이 없습니다.
:::

## PX4 부트로더 플래싱하기

*Kopis 2*에는 Betaflight가 사전 설치되어 있습니다.

PX4 펌웨어를 업로드 하기 위하여 PX4 부트 로더를 먼저 설치하여야 합니다. 부트 로더 설치 방법은 [Kakute F7](../flight_controller/kakutef7.md#bootloader) 항목(*Kopis 2*의 비행 컨트롤러 보드)을 참고하십시오.

:::tip
필요하면 언제든지 [Betaflight를 다시 설치](../advanced_config/bootloader_update_from_betaflight.md#reinstall_betaflight)할 수 있습니다!
:::

## 설치 및 설정

부트 로더가 설치되면 USB 케이블을 통하여 기체를 *QGroundControl*에 연결할 수 있습니다.

:::note
이 문서 작성 시점에는 *Kopis 2*는 QGroundControl *Daily Build*에서 지원되며 사전 빌드된 펌웨어는 마스터 브랜치에 대해서만 제공됩니다 (안정적인 릴리스는 아직 제공되지 않음).
:::

PX4를 설치 및 설정:

- [PX4 펌웨어 로드](../config/firmware.md). 
- [Airframe](../config/airframe.md)을 *Holybro Kopis 2*로 설정합니다.
- 센서 보정과 무선 설정을 포함하여 [기본 설정](../config/README.md)을 진행합니다.
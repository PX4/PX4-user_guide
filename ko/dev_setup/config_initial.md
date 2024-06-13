# 초기 설정과 구성

개발자는 아래(또는 이와 유사한)에 설명된 기본 장비와 소프트웨어를 사용하는 것이 좋습니다.

## 기본 장비

:::tip
PX4는 여기에 설명한 것보다 더 다양한 장비를 사용할 수 있지만, 새로운 개발자는 표준 설정중 하나를 사용하는 것이 좋습니다.
A Taranis RC and a mid-range Android tablet make a very inexpensive field kit.
:::

아래 장비를 적극 권장합니다.

- **RC controller** for the safety pilot
  - [Taranis Plus](https://www.frsky-rc.com/product/taranis-x9d-plus-2/) RC control (or equivalent)
- **Development computer**

  ::: info
The listed computers have acceptable performance, but a more recent and powerful computer is recommended.
:::

  - Lenovo Thinkpad with i5-core running Windows 11
  - MacBook Pro (early 2015 and later) with macOS 10.15 or later
  - Lenovo Thinkpad i5 with Ubuntu Linux 20.04 or later

- **지상 관제소** (컴퓨터 또는 태블릿):
  - iPad (may require Wifi telemetry adapter)
  - 모든 MacBook 또는 Ubuntu Linux 노트북(개발 컴퓨터일 수 있음)
  - A recent mid-range Android tablet or phone with a large enough screen to run _QGroundControl_ effectively (6 inches).
- **PX4를 실행 가능한 기체**:
  - [사전 제작된 기체를 준비하십시오.](../complete_vehicles_mc/index.md)
  - [나만의 빌드를 만드십시오.](../frames_multicopter/kits.md)
- **보안경**
- **테더**(멀티콥터 전용 - 더 위험한 테스트용)

## 기체 설정

Install the [QGroundControl Daily Build](../dev_setup/qgc_daily_build.md) for a **desktop OS**.

기체를 설정하려면:

1. [Install PX4 firmware](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) (including "custom" firmware with your own changes).
1. [기체 참조](../airframes/airframe_reference.md)에서 귀하의 기체와 가장 잘 어울리는 [기체](../config/airframe.md)부터 시작하십시오.
1. [기본 설정](../config/README.md)에서는 기본 설정 방법을 설명합니다.
1. [매개변수 설정](../advanced_config/parameters.md)에서는 개별 매개변수를 검색하고 수정하는 방법을 설명합니다.

:::note

- _QGroundControl_ mobile variants do not support vehicle configuration.
- The _daily build_ includes development tools and new features that are not available in the official release.
- Configuration in the airframe reference have been flown on real vehicles, and are a good starting point for "getting off the ground".

:::

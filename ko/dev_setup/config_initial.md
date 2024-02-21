# 초기 설정과 구성

개발자는 아래(또는 이와 유사한)에 설명된 기본 장비와 소프트웨어를 사용하는 것이 좋습니다.

## 기본 장비

:::tip
PX4는 여기에 설명한 것보다 더 다양한 장비를 사용할 수 있지만, 새로운 개발자는 표준 설정중 하나를 사용하는 것이 좋습니다.
Taranis RC와 Note 4 태블릿은 매우 저렴한 현장 키트를 구성합니다.
:::

아래 장비를 적극 권장합니다.

- 안전 조종를 위한 **리모콘**
  - Taranis Plus 리모콘(또는 동급)
- **개발 컴퓨터**
  - OSX 10.15 이상이 설치된 MacBook Pro(2015년 초 및 이후 모델)
  - Ubuntu Linux 18.04 이상이 설치된 Lenovo Thinkpad 450(i5)
- **지상 관제소** (컴퓨터 또는 태블릿):
  - iPad(Wifi 텔레메트리 어댑터 필요)
  - 모든 MacBook 또는 Ubuntu Linux 노트북(개발 컴퓨터일 수 있음)
  - Samsung Note 4 or equivalent (any recent Android tablet or phone with a large enough screen to run _QGroundControl_ effectively).
- **PX4를 실행 가능한 기체**:
  - [사전 제작된 기체를 준비하십시오.](../complete_vehicles_mc/README.md)
  - [나만의 빌드를 만드십시오.](../airframes/README.md)
- **보안경**
- **테더**(멀티콥터 전용 - 더 위험한 테스트용)

## 기체 설정

Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/daily_builds.html) for a **desktop OS**.

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

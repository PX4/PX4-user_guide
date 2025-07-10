---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/config_initial
---

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
  * OSX 10.15 이상이 설치된 MacBook Pro(2015년 초 및 이후 모델)
  * Ubuntu Linux 18.04 이상이 설치된 Lenovo Thinkpad 450(i5)
- **지상 관제소** (컴퓨터 또는 태블릿):
  * iPad(Wifi 텔레메트리 어댑터 필요)
  * 모든 MacBook 또는 Ubuntu Linux 노트북(개발 컴퓨터일 수 있음)
  * Samsung Note 4 또는 동급 (*QGroundControl*을 실행하기에 충분한 화면이있는 최신 Android 태블릿 또는 휴대 전화).
- **PX4를 실행 가능한 기체**:
  - [사전 제작된 기체를 준비하십시오.](../complete_vehicles/README.md)
  - [나만의 빌드를 만드십시오.](../airframes/README.md)
- **보안경**
- **테더**(멀티콥터 전용 - 더 위험한 테스트용)

## 기체 설정

**데스크톱 OS**용 [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)를 설치합니다.

기체를 설정하려면:
1. [PX4 펌웨어를 설치](../config/firmware.md#installing-px4-master-beta-or-custom-firmware)합니다(자신이 변경한 "맞춤형" 펌웨어 포함).
1. [기체 참조](../airframes/airframe_reference.md)에서 귀하의 기체와 가장 잘 어울리는 [기체](../config/airframe.md)부터 시작하십시오.
1. [기본 설정](../config/README.md)에서는 기본 설정 방법을 설명합니다.
1. [매개변수 설정](../advanced_config/parameters.md)에서는 개별 매개변수를 검색하고 수정하는 방법을 설명합니다.

:::note
- *QGroundControl* 모바일 변형은 기체 설정을 지원하지 않습니다.
- *일일 빌드*에는 공식 릴리스에서 사용할 수 없는 개발 도구와 새로운 기능이 포함되어 있습니다.
- 기체 참조의 설정은 실제 기체를 가지고 비행하였으며, "땅에서 이륙"을 위한 좋은 출발점입니다.
:::

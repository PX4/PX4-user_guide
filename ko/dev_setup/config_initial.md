# 초기 설정과 구성

개발자는 아래(또는 이와 유사한)에 설명된 기본 장비와 소프트웨어를 사용하는 것이 좋습니다.

## 기본 장비

:::tip PX4는 여기에 설명한 것보다 더 다양한 장비를 사용할 수 있지만, 새로운 개발자는 표준 설정중 하나를 사용하는 것이 좋습니다. Taranis RC와 Note 4 태블릿은 매우 저렴한 현장 키트를 구성합니다.
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
  - [Build your own](../airframes/README.md)
- **Safety glasses**
- **Tether** (multicopter only - for more risky tests)

## 비행기 구성

Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) for a **desktop OS**.

To configure the vehicle:
1. 개발 플랫폼을 위해 [QGroundControl 데일리 빌드](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)를 다운로드 하십시오.
1. [기본 구성](https://docs.px4.io/en/config/) (PX4 사용자 가이드)는 기본 구성 수행법을 설명합니다.
1. [매개변수 구성](https://docs.px4.io/en/advanced_config/parameters.html) (PX4 사용자 가이드)는 개별 매개변수를 찾고 수정하는 방법을 설명합니다.
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.

:::note
- *QGroundControl* mobile variants do not support vehicle configuration.
- The *daily build* includes development tools and new features that are not available in the official release.
- Configuration in the airframe reference have been flown on real vehicles, and are a good starting point for "getting off the ground".
:::

# 초기 설정과 구성

개발자는 아래에 소개된 (또는 유사한) 기본 장비로 "기본" [에어프레임](../airframes/airframe_reference.md) 구성을 사용할 것을 권장합니다.

## 기본 장비

:::tip
PX4 can be used with a much wider range of equipment than described here, but new developers will benefit from going with one of the standard setups. A Taranis RC plus a Note 4 tablet make up for a very inexpensive field kit.
:::

비행기를 구성하려면:

* 안전 조종을 위해 Taranis Plus 원격 조종기 (또는 동급)
* 개발 컴퓨터:
  * OSX 10.13 또는 그 이후 운영체제가 설치된 MacBook Pro (2015 초기 버전 이후)
  * 우분투 16.04 또는 그 이후 운영체제가 설치된 Lenovo Thinkpad 450 (i5)
* 지상통제소 장비:
  * iPad(Wifi 텔레메트리 어댑터 필요)
  * 모든 MacBook 또는 Ubuntu Linux 랩톱(은 개발용 컴퓨터가 될 수 있음)
  * 삼성 Note 4 또는 동급 (*QGroundControl*를 효과적으로 실행하는 충분히 큰 화면을 갖는 모든 최신 Android 태블릿 또는 휴대폰)
* 보안경
* 보다 위험한 시험을 위한 멀티콥터용 끈

## 비행기 구성

:::tip
*QGroundControl* for a **desktop OS** is required for vehicle configuration. You should use (and regularly update) the daily build in order to take advantage of the latest features in PX4.
:::

To configure the vehicle:

1. 개발 플랫폼을 위해 [QGroundControl 데일리 빌드](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)를 다운로드 하십시오.
1. [기본 구성](https://docs.px4.io/en/config/) (PX4 사용자 가이드)는 기본 구성 수행법을 설명합니다.
1. [매개변수 구성](https://docs.px4.io/en/advanced_config/parameters.html) (PX4 사용자 가이드)는 개별 매개변수를 찾고 수정하는 방법을 설명합니다.

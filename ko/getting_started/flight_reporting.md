---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/flight_reporting
---

# 비행 기록

PX4는 성능 문제를 분석을 위하여 항공기 상태 및 센서 데이터를 자세하게 기록합니다. 이 항목에서는 로그를 다운로드 및 분석하고 검토를 위해 개발 팀과 공유하는 방법을 설명합니다.

:::tip
비행 기록을 보관하는 것은 일부 지역에서는 법적인 요구 사항일 수 있습니다.
:::

## 비행 컨트롤러에서 로그 다운로드

로그는 [ QGroundControl ](http://qgroundcontrol.com/) : **[ 분석보기> 로그 다운로드 ](https://docs.qgroundcontrol.com/en/analyze_view/log_download.html)**를 사용하여 다운로드 할 수 있습니다.

![비행 로그 다운로드](../../assets/qgc/analyze/log_download.jpg)

## 로그 분석

온라인 [ Flight Review ](http://logs.px4.io) 도구에 로그 파일을 업로드합니다. 업로드 후 로그에 대한 분석 페이지 링크를 이메일로 보내드립니다.

[ 비행 검토를 사용한 로그 분석 ](../log/flight_review.md)은 플롯을 해석하는 방법을 설명하고 과도한 진동, 불량한 PID 튜닝, 포화 된 컨트롤러, 불균형 차량, GPS 소음 등 일반적인 문제의 원인을 확인하는 데 도움이 됩니다.

:::note PX4 로그를 시각화하고 분석하기위한 다른 많은 훌륭한 도구가 있습니다. 자세한 내용은 [ 비행 분석 ](../dev_log/flight_log_analysis.md)을 참조하십시오.
:::

:::tip
차량에 대한 일정한 고속 MAVLink 연결이있는 경우 (원격 분석 링크뿐만 아니라) * QGroundControl *을 사용하여 로그를 * Flight Review *에 직접 자동으로 업로드 할 수 있습니다. 자세한 내용은 [ 설정> MAVLink 설정> MAVLink 2 로깅 (PX4 만 해당) ](https://docs.qgroundcontrol.com/en/SettingsView/MAVLink.html#logging)을 참조하십시오.
:::

## PX4 개발자가 검토할 로그 파일 공유

The [Flight Review](http://logs.px4.io) log file link can be shared for discussion in the [support forums](../contribute/support.md#forums-and-chat) or a [Github issue](../README.md#reporting-bugs-issues).

## 로그 설정

로깅 시스템은 기본적으로 [ Flight Review ](http://logs.px4.io)와 함께 사용하기 위해 합리적인 로그를 수집하도록 구성됩니다.

Logging may further be configured using the [SD Logging](../advanced_config/parameter_reference.md#sd-logging) parameters or with a file on the SD card. Details on configuration can be found in the [logging configuration documentation](../dev_log/logging.md#configuration).

## 주요 링크

- [비행 검토](http://logs.px4.io)
- [비행 검토 기록을 이용한 로그 분석](../log/flight_review.md)
- [비행 로그 분석](../dev_log/flight_log_analysis.md)
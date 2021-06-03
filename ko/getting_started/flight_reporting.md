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

로깅은 [ SD 로깅 ](../advanced_config/parameter_reference.md#sd-logging) 매개 변수를 사용하여 추가로 구성할 수 있습니다. 자주 변경하는 매개 변수는 다음과 같습니다.

| 매개변수                                                                     | 설명                                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE)       | 로깅 모드는 로깅 시작 및 중지시기를 정의합니다. -` 0 ` : 무장 해제 될 때까지 무장시 기록 (기본값). - ` 1 ` : 부팅 시점부터 disarm. - ` 2 ` : 부팅부터 종료까지 기록합니다. |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | 로깅 프로파일. 이를 사용하여 덜 일반적인 로깅/분석을 활성화합니다 (예 : EKF2 재생, PID 및 필터 튜닝을위한 고속 로깅, 열 온도 교정).                                 |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | 아주 작은 추가 "미션 로그"를 생성합니다. 이 로그는 * Flight Review *와 함께 사용할 수 * 없습니다 *.하지만 지오 태깅 또는 규정 준수를 위해 작은 로그가 필요할 때 유용합니다.      |

:::note
* 개발자 *는 [ logger ](../modules/modules_system.md#logger) 모듈을 통해 기록되는 정보를 추가로 구성 할 수 있습니다 (예 : 자신의 주제를 기록하려는 경우 이를 사용합니다). 자세한 정보는 [로그 작성](../dev_log/logging.md)을 참고하십시오.
:::

## 주요 링크

- [비행 검토](http://logs.px4.io)
- [비행 검토 기록을 이용한 로그 분석](../log/flight_review.md)
- [비행 로그 분석](../dev_log/flight_log_analysis.md)
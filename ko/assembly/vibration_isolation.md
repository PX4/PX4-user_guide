---
canonicalUrl: https://docs.px4.io/main/ko/assembly/vibration_isolation
---

# 진동 방지

이 절에서는 진동의 세기를 판단 방법과 진동 특성 개선 방법을 설명합니다.

## 개요

내장 가속도 센서나 자이로스코프 센서가 있는 비행 콘트롤러는 진동에 민감합니다. 큰 진동은 비행 효율 저하, 성능 감소, 비행 시간 단축, 기체 내구도 감소 등의 다양한 문제을 일으킵니다. 극단적인 경우에는 진동으로 인하여 센서가 오작동하거나 파손될 수 있으며, 이로 인하여 자세/위치 추정에 실패하여 기체가 멀리 날아가 버릴 수 있습니다.

잘 설계된 기체는 비행 콘트롤러 장착된 근방의 진동의 구조적 공명 진폭을 감쇠시킵니다. 몇몇 비행 콘트롤러는 반진동 폼을 사용하여 기체에 장착하여야 합니다. 민감한 장치들은 충분히 감당할 수 있는 수준까지 진동을 줄이기 위하여 추가적인 방법이 필요합니다.


## 진동 분석

[로그 분석의 비행 검토 &gt; 진동](../log/flight_review.md#vibration)에서 로그를 사용하여 진동으로 인한 문제를 분석하는 방법을 설명합니다.


## 기초적인 진동 해결 방법

간단한 몇 가지의 단계로 진동을 줄일 수 있습니다:
- 모든 장비(랜딩 기어, GPS 지지대 등)가 기체에 단단히 고정되어 있는 지 확인하십시오.
- 균형 잡힌 프로펠러를 사용하십시오.
- 고품질의 프로펠러, 모터, ESC와 기체 프레임을 사용하십시오. 품질에서 큰 차이가 발생합니다.
- 비행 콘트롤러 장착시에 방진이 필요합니다. 대부분 비행 콘트롤러는 방진을 위하여 *장착 폼*과 함께 설치됩니다. 몇몇 다른 제품들은 자체 내장 방진 메커니즘을 가지고 있습니다.
- *마지막* 방법으로, 소프트웨어 필터를 조정하십시오 ([여기](../config_mc/filter_tuning.md)를 참고하십시오). 그러나, 진동 원인을 근원적으로 제거하는 것이 소프트웨어 필터링보다 좋은 방법입니다.

## 참고

유용한 참고사항들입니다.
- [An Introduction to Shock & Vibration Response Spectra, Tom Irvine](http://www.vibrationdata.com/tutorials2/srs_intr.pdf) (ebook, 무료)
- [Structural Dynamics and Vibration in Practice - An Engineering Handbook, Douglas Thorby](https://books.google.ch/books?id=PwzDuWDc8AgC&printsec=frontcover) (preview).


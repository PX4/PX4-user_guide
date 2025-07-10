---
canonicalUrl: https://docs.px4.io/main/ko/assembly/vibration_isolation
---

# 진동 방지

이 절에서는 진동의 세기를 판단하는 방법과 진동 특성을 개선하는 방법을 설명합니다.

## 개요

내장된 가속도 센서 또는 자이로스코프 센서가 있는 비행 제어 보드는 진동에 민감합니다. 큰 규모의 진동은 비행 효율과 성능의 감소, 짧은 비행 시간, 기체 내구도 감소 등 다양한 문제을 일으킵니다. 극단적인 경우 진동으로 인해 센서가 오작동하거나 파손될 수 있으며, 이로 인해 자세/위치 추정에 실패하고 기체가 영원히 날아가버릴 수 있습니다.

잘 설계된 기체는 특정한 비행 컨트롤러 장착 위치에서의 진동의 구조적 공명 진폭을 감쇠시킵니다. 민감한 장치(예: 몇몇 비행 컨트롤러는 반진동 폼을 사용해 기체에 장착해야 합니다)가 충분히 감당할 수 있는 수준까지 진동을 줄이기 위해 추가적인 방법이 필요할 수 있습니다.

## 진동 분석

[로그 분석의 비행 검토 > 진동](../log/flight_review.md#vibration)에서 로그를 사용해 진동이 문제를 일으키는지 확인하는 방법을 설명합니다.

## 기본적인 진동 해결법

몇몇 간단한 단계로 진동을 감쇠할 수 있습니다:

- 모든 장비 (랜딩 기어, GPS 지지대 등)가 기체에 단단히 고정되었는지 확인하십시오.
- 균형 잡힌 프로펠러를 사용하십시오.
- 고품질의 프로펠러, 모터, ESC와 기체 프레임을 사용하십시오. 품질은 큰 차이를 만듭니다.
- 비행 컨트롤러를 장착할 때 방진법을 사용하십시오. 많은 비행 컨트롤러는 방진을 위한 *장착 폼*과 함께 구성됩니다. 몇몇 다른 제품들은 독자적인 내장 방진 메커니즘을 가집니다.
- *마지막* 방법으로, 소프트웨어 필터를 조정하십시오 ([여기](../config_mc/racer_setup.md#filters)를 참고하십시오). 그러나 진동 원인을 없애는 것이 소프트웨어를 사용한 필터링보다 좋습니다.

## 참고

다음 레퍼런스가 유용할 수 있습니다:

- [An Introduction to Shock & Vibration Response Spectra, Tom Irvine](https://info.mide.com/hubfs/eBooks/ebook-tom-irvine-shock-vibration-response-spectra.pdf) (ebook, 무료)
- [Structural Dynamics and Vibration in Practice - An Engineering Handbook, Douglas Thorby](https://books.google.ch/books?id=PwzDuWDc8AgC&printsec=frontcover) (preview).
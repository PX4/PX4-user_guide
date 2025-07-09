---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/test_flights
---

# 시험 비행

<div v-if="$themeConfig.px4_version != 'main'">
  <div class="custom-block danger"><p class="custom-block-title">이 페이지는 오래되었습니다.</p>. <p>The latest version <a href="https://docs.px4.io/main/en/test_and_ci/test_flights.html">can be found here</a>.</p>
  </div>
</div>

시험 비행은 품질 보증에 매우 중요한 과정입니다.

When submitting [Pull Requests](../contribute/code.md#pull-requests) for new functionality or bug fixes you should provide information about the feature-relative tests performed, along with accompanying flight logs.

For significant changes to the system you should also run general flight tests using the test cards listed below.

## 테스트 카드

These test cards define "standard" flight tests. These are run by the test team as part of release testing, and for more significant system changes.

* [MC_01 - 수동 모드](../test_cards/mc_01_manual_modes.md)
* [MC_02 - 완전 자동화](../test_cards/mc_02_full_autonomous.md)
* [MC_03 - 자동 / 수동 혼합](../test_cards/mc_03_auto_manual_mix.md)
* [MC_04 - 안전 장치 시험](../test_cards/mc_04_failsafe_testing.md)
* [MC_05 - 실내 비행 (수동 모드)](../test_cards/mc_05_indoor_flight_manual_modes.md)

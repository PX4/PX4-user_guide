---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/test_flights
---

# 시험 비행

<div v-if="$themeConfig.px4_version != 'main'">
  <div class="custom-block danger"><p class="custom-block-title">이 페이지는 오래되었습니다.</p>. <p>The latest version <a href="https://docs.px4.io/main/en/test_and_ci/test_flights.html">can be found here</a>.</p>
  </div>
</div>

시험 비행은 품질 보증에 매우 중요한 과정입니다. Dronecode 테스트 팀은 pull 요청을 검토(테스트 비행)하고 피드백 및 로그를 제공하는 데 도움을 줄 수 있습니다.


## 시험 비행 요청 방법

* 풀 리퀘스트에서 변경 사항에 대하여 자세한 설명을 추가합니다.
* **@PX4/testflight**를 사용하여 댓글로 테스트 팀을 태그합니다.
* 테스트 팀의 답변을 기다립니다.
* 테스트 팀이 [귀하의 PR/이슈를 대기열에 추가](https://github.com/PX4/PX4-Autopilot/projects/18)할 것입니다.

## 응답 시간

* 멀티콥터: 최대 48시간(보통 24시간 이내)
* 수직이착륙기, 고정익: 최대 4일(보통 2일)

## 테스트 카드

각 플랫폼을 대상으로 수행할 시험은 아래 링크와 같습니다.

* [MC_01 - 수동 모드](../test_cards/mc_01_manual_modes.md)
* [MC_02 - 완전 자동화](../test_cards/mc_02_full_autonomous.md)
* [MC_03 - 자동 / 수동 혼합](../test_cards/mc_03_auto_manual_mix.md)
* [MC_04 - 안전 장치 시험](../test_cards/mc_04_failsafe_testing.md)
* [MC_05 - 실내 비행 (수동 모드)](../test_cards/mc_05_indoor_flight_manual_modes.md)


<a id="fleet"></a>

## 테스트 차량/자동비행장치

멀티콥터

| 프레임                                                                                                                                                                                                                                                               | 비행 콘트롤러                                                                                                                                                                                                                                                          | UUID                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스호크 미니](../flight_controller/pixhawk_mini.md)                                                                                                                                                                                                                  | 002400283335510A33373538 (f450-v3)                          |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스호크 1](../flight_controller/pixhawk.md)                                                                                                                                                                                                                        | 000100000000363533353336510900500021 (f450-v3)              |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | 픽스호크 2.1 [큐브](../flight_controller/pixhawk-2.md)                                                                                                                                                                                                                 | 00010000000033343537313751050040001c (F450 Pixhawk v2 cube) |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스레이서](../flight_controller/pixracer.md)                                                                                                                                                                                                                        | 00010000000037373430333551170037002a (F450-Pixracer)        |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스호크 3 프로](../flight_controller/pixhawk3_pro.md)                                                                                                                                                                                                                | 000100000000303236353136510500180036 (Pixhawk pro)          |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스핵 V3](../flight_controller/pixhack_v3.md)                                                                                                                                                                                                                     | 003200293036511638363834 (f450-v5-m)                        |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스호크 4](../flight_controller/pixhawk4.md)                                                                                                                                                                                                                       | 000200000000383339333038510700320016 (F450-v5)              |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [픽스호크 4 미니](../flight_controller/pixhawk4_mini.md)                                                                                                                                                                                                               | 0002000000003432333830385115003a0033 (F450-v5-m)            |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) [UAVCAN](https://zubax.com/technologies/uavcan)                                                                                                                                             | [픽스호크 4](../flight_controller/pixhawk4.md)                                                                                                                                                                                                                       | 000200000000323634353237511800200021 (F450-Pixhawk4)        |
| Holybro [QAV250](../frames_multicopter/holybro_qav250_pixhawk4_mini.md)                                                                                                                                                                                           | [픽스호크 4 미니](../flight_controller/pixhawk4_mini.md)                                                                                                                                                                                                               | 000200000000343233383038511500420032 (f450-v5-m)            |
| NXP Semiconductor [KIT-HGDRONEK66](https://www.nxp.com/applications/solutions/industrial/unmanned-aerial-vehicles-uavs/uavs-drones-and-rovers/rddrone-fmuk66-px4-robotic-drone-fmu-reference-design:RDDRONE-FMUK66) ("[Hovergames](https://www.hovergames.com/)") | [RDDRONE-FMUK66](https://www.nxp.com/products/processors-and-microcontrollers/arm-based-processors-and-mcus/kinetis-cortex-m-mcus/k-seriesperformancem4/k6x-ethernet/rddrone-fmuk66-px4-robotic-drone-fmu-reference-design:RDDRONE-FMUK66?tid=vanRDDRONE-FMUK66) | 00030016ffffffffffff4e45362050130029                        |

고정익

| 프레임                                                                                                 | 비행 콘트롤러                                   | UUID                                           |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| [Phantom Wing](https://hobbyking.com/en_us/phantom-fpv-flying-wing-epo-airplane-1550mm-v2-kit.html) | [픽스호크 1](../flight_controller/pixhawk.md) | 0001000000003035333330365104003c0020 (f450-v2) |


VTOL

| 프레임                                                                         | 비행 콘트롤러                                            | UUID                                             |
| --------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| [혼합 VTOL](https://www.horizonhobby.com/convergence-vtol-bnf-basic-efl11050) | [픽스호크 4 미니](../flight_controller/pixhawk4_mini.md) | 000200000000343233383038511500350039 (vtol-v5-m) |
| [Delta Quad Pro](https://px4.io/portfolio/deltaquad-vtol/)                  | [드로픽스](../flight_controller/dropix.md)             | 0001000000003437393931375114004c0042 (delta-v2)  |

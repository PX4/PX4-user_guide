---
canonicalUrl: https://docs.px4.io/main/zh/test_and_ci/test_flights
---

# 测试飞行

<div v-if="$themeConfig.px4_version != 'master'">
  <div class="custom-block danger"><p class="custom-block-title">This page may be out of date</p> <p>The latest version <a href="https://docs.px4.io/master/en/test_and_ci/test_flights.html">can be found here</a>.</p>
  </div>
</div>

测试飞行对于质量保证很重要。 Dronecode 测试团队可以帮助您检查（测试飞行）您的拉取请求并提供反馈和日志。


## 如何申请测试飞行

* 在拉取请求中添加对更改的完整而全面的描述
* 使用 **@PX4/testflight** 在评论中标记测试团队
* 等待测试团队的反馈
* 测试团队将 [add your PR/issue to their queue](https://github.com/PX4/Firmware/projects/18)

## 响应速度

* Multi-Copter：最多 48 小时（通常在 24 小时内）
* VTOL，固定翼：最多 4 天（通常为 2 天）

## 测试卡

针对每个平台执行的测试链接如下：

* [测试 MC_01 - 手动模式](../test_cards/mc_01_manual_modes.md)
* [MC_02 - 完全自主](../test_cards/mc_02_full_autonomous.md)
* [测试 MC_03 - 自动手动混合](../test_cards/mc_03_auto_manual_mix.md)
* [MC_04 - 故障安全测试](../test_cards/mc_04_failsafe_testing.md)
* [MC_05 - 室内飞行（手动模式）](../test_cards/mc_05_indoor_flight_manual_modes.md)

<a id="fleet"></a>

## 测试设备/自动驾驶仪

http://px4.io/portfolio/multicopter-portfolio/

| 机型                                                                                                                                                                                                                                                                | Aerotenna OcPoc                                                                                                                                                                                                                                                  | UUID                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixhawk Mini](../flight_controller/pixhawk_mini.md)                                                                                                                                                                                                             | 002400283335510A33373538 (f450-v3)                          |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixhawk 1](../flight_controller/pixhawk.md)                                                                                                                                                                                                                     | 000100000000363533353336510900500021 (f450-v3)              |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | Pixhawk 2.1 Cube                                                                                                                                                                                                                                                 | 00010000000033343537313751050040001c (F450 Pixhawk v2 cube) |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixracer](../flight_controller/pixracer.md)                                                                                                                                                                                                                     | 00010000000037373430333551170037002a (F450-Pixracer)        |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)                                                                                                                                                                                                            | Pixhawk                                                     |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixhack V3](../flight_controller/pixhack_v3.md)                                                                                                                                                                                                                 | 003200293036511638363834 (f450-v5-m)                        |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixhawk 4](../flight_controller/pixhawk4.md)                                                                                                                                                                                                                    | 000200000000383339333038510700320016 (F450-v5)              |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html)                                                                                                                                                                                             | [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md)                                                                                                                                                                                                          | 0002000000003432333830385115003a0033 (F450-v5-m)            |
| [DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) [UAVCAN](https://zubax.com/technologies/uavcan)                                                                                                                                             | [Pixhawk 4](../flight_controller/pixhawk4.md)                                                                                                                                                                                                                    | 000200000000323634353237511800200021 (F450-Pixhawk4)        |
| [QAV 250](http://px4.io/portfolio/multicopter-portfolio/) （PWM-ESC）                                                                                                                                                                                               | [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md)                                                                                                                                                                                                          | 000200000000343233383038511500420032 (f450-v5-m)            |
| NXP Semiconductor [KIT-HGDRONEK66](https://www.nxp.com/applications/solutions/industrial/unmanned-aerial-vehicles-uavs/uavs-drones-and-rovers/rddrone-fmuk66-px4-robotic-drone-fmu-reference-design:RDDRONE-FMUK66) ("[Hovergames](https://www.hovergames.com/)") | [RDDRONE-FMUK66](https://www.nxp.com/products/processors-and-microcontrollers/arm-based-processors-and-mcus/kinetis-cortex-m-mcus/k-seriesperformancem4/k6x-ethernet/rddrone-fmuk66-px4-robotic-drone-fmu-reference-design:RDDRONE-FMUK66?tid=vanRDDRONE-FMUK66) | 00030016ffffffffffff4e45362050130029                        |

固定翼

| 框架                                                                                                                    | 飞控                                              | UUID                                           |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| [Booole Phantom FPV Flying Wing](https://hobbyking.com/en_us/phantom-fpv-flying-wing-epo-airplane-1550mm-v2-kit.html) | [Phantom Wing](../flight_controller/pixhawk.md) | 0001000000003035333330365104003c0020 (f450-v2) |


融合 VTOL

| 框架                                                                                   | 飞控                                                      | UUID                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------ |
| [Convergence VTOL](https://www.horizonhobby.com/convergence-vtol-bnf-basic-efl11050) | [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) | 000200000000343233383038511500350039 (vtol-v5-m) |
| [Delta Quad Pro](https://px4.io/portfolio/deltaquad-vtol/)                           | [Dropix](../flight_controller/dropix.md)                | 0001000000003437393931375114004c0042 (delta-v2)  |

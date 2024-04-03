# 测试飞行

<script setup>
import { useData } from 'vitepress'
const { site } = useData();
</script>

<div v-if="site.title !== 'PX4 Guide (main)'">
  <div class="custom-block danger">
    <p class="custom-block-title">This page may be out out of date. <a href="https://docs.px4.io/main/en/test_and_ci/test_flights.html">See the latest version</a>.</p>
  </div>
</div>

测试飞行对于质量保证很重要。

When submitting [Pull Requests](../contribute/code.md#pull-requests) for new functionality or bug fixes you should provide information about the feature-relative tests performed, along with accompanying flight logs.

For significant changes to the system you should also run general flight tests using the test cards listed below.

## 测试卡

These test cards define "standard" flight tests. These are run by the test team as part of release testing, and for more significant system changes.

- [测试 MC_01 - 手动模式](../test_cards/mc_01_manual_modes.md)
- [MC_02 - 完全自主](../test_cards/mc_02_full_autonomous.md)
- [测试 MC_03 - 自动手动混合](../test_cards/mc_03_auto_manual_mix.md)
- [MC_04 - 故障安全测试](../test_cards/mc_04_failsafe_testing.md)
- [MC_05 - 室内飞行（手动模式）](../test_cards/mc_05_indoor_flight_manual_modes.md)

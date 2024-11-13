# Community

<script setup>
import { useData } from 'vitepress'
const { site } = useData();
</script>

<div v-if="site.title !== 'PX4 Guide (main)'">
  <div class="custom-block danger">
    <p class="custom-block-title">This page may be out out of date. <a href="https://docs.px4.io/main/en/contribute/">See the latest version</a>.</p>
  </div>
</div>

Welcome to the PX4 Community!

:::tip
We pledge to adhere to the [PX4 code of conduct](https://github.com/PX4/PX4-Autopilot/blob/main/CODE_OF_CONDUCT.md), which aims to foster an open and welcoming environment.
:::

This section contains information about how you can meet with the community and contribute to PX4:

- [온라인 미팅](../contribute/dev_call.md)  - 아키텍쳐, pull 요청, 문제 및 이슈에 대하여 개발팀과 논의
- [Maintainers](./maintainers.md) - Maintainers of PX4 Subsystems and Ecosystem
- [지원](../contribute/support.md) - 도움 요청 및 문제 제기
- [Source Code Management](../contribute/code.md) - Work with PX4 code
- [문서](../contribute/docs.md) - 문서 작업
- [번역](../contribute/translation.md) - 클라우드인(Crowdin)에서의 번역
- [Terminology/Notation](../contribute/notation.md) - Terms and symbols used in the docs
- [Licenses](../contribute/licenses.md) - PX4 and Pixhawk licensing

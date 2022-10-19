# 지원 방법

<div v-if="$themeConfig.px4_version != 'main'">
  <div class="custom-block danger"><p class="custom-block-title">이 페이지는 오래된 페이지입니다.</p>. <p>The latest version <a href="https://docs.px4.io/main/en/contribute/support.html">can be found here</a>.</p>
  </div>
</div>

이 절에서는 핵심 개발팀과 커뮤니티의 지원을 받는 방법을 알려드립니다.

## 포럼 및 채팅

The core development team and community are active on the following channels.

<a href="https://discord.gg/dronecode" style="padding:20px" ><img src="../../assets/site/logo_discord.png" alt="Discord Logo" width="110px"/></a>

<a href="https://discuss.px4.io/" style="padding:20px" ><img src="../../assets/site/logo_pro_small.png" alt="PX4 Discuss Forum Logo" width="110px"/></a>

:::tip
Post on [PX4 Discuss](https://discuss.px4.io/) first! Discuss is indexed by search engines and serves as a common knowledge base

If you don't get a response in a few days then ping us on Discord with a link to the post.

:::

## 문제 진단

문제의 원인이 무엇인지 확실하지 않고 문제 분석의 도움을 원하시면,

* [Flight Log Review](http://logs.px4.io/)에 로그를 업로드하십시오
* Open a discussion on [PX4 Discuss](https://discuss.px4.io/c/flight-testing/) with a flight report and links to logs.
* The dev team may prompt you to [raise an issue](#issue-bug-reporting) if the problem is caused by a bug.

## 문제와 버그 보고

* [Flight Log Review](http://logs.px4.io/)에 로그를 업로드하십시오
* [Open a Github Issue](https://github.com/PX4/PX4-Autopilot/issues) with a flight report with as much detail as possible and links to logs.

## 주간 온라인 개발자 회의

:::tip
개발자 여러분들께서는 [주간 온라인 개발자 회의](../contribute/dev_call.md)와 [개발자 행사](../README.md#calendar)에 참여하여 프로젝트에 적극적으로 참여해주십시오.
:::

[온라인 개발자 회의(Dev Call)](../contribute/dev_call.md)은 PX4 개발팀이 주관하는 주간 회의이며, 플랫폼 기술 상세, 활동 조정 및 심층 분석/수행 관련하여 논의합니다.

Pull 요청, 주요 현안, Q&A를 의논하는 시간도 있습니다.


## 시험 비행

드론코드 시험 팀에서는 여러분이 보낸 pull 요청의 검토(시험 비행)를 지원할 수 있고 기록에 대한 의견을 제시할 수 있습니다.

진행할 기체 시험, 자동 운항 시험, 운항 요청 방법, 결과 응답 시간 정보는 [시험 비행](../test_and_ci/test_flights.md)을 참고 하십시오.
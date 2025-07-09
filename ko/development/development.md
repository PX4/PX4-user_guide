---
canonicalUrl: https://docs.px4.io/main/ko/development/development
---

# PX4 개발

신규 기체 개발, 기체 변경, 비행 알고리즘 수정, 신규 모드 추가, 신규 하드웨어 통합, 그리고 PX4 통신 방법 등을 설명합니다.

:::tip
This section is for software developers and (new) hardware integrators.
기존 기체 조립이나 PX4 비행 방법을 설명하지 않습니다.
:::

다음과 같은 것을 설명합니다.

* [개발자 최소 설정](../dev_setup/config_initial.md), [PX4 소스 코드 빌드](../dev_setup/building_px4.md), 그리고 [다양한 자동조정장치](../flight_controller/README.md) 배포 방법을 이해합니다.
* [PX4 시스템 구조](../concept/architecture.md)와 핵심 개념을 이해합니다.
* 플라이트 스택과 미들웨어 수정 방법을 배웁니다:
  - 비행 알고리즘 수정 및 신규 [비행 상태](../concept/flight_modes.md) 추가.
  - 새로운 [기체](../dev_airframes/README.md)를 지원합니다.
* PX4에 새 하드웨어를 조합하는 방법을 배웁니다:
  - 카메라, 거리 센서 등과 같은 신규 센서와 액츄에이터를 지원합니다.
  - 신규 자동조종장치에서 실행하도록 PX4 수정합니다.
* PX4를 [시뮬레이션](../simulation/README.md), [테스트](../test_and_ci/README.md), [디버그/로그](../debug/README.md) 합니다.
* 외부 로보틱스 API와 통신/통합합니다.


## 주요 개발자 링크

- [지원](../contribute/support.md): [토론 게시판](https://discuss.px4.io//)과 기타 지원 채널에서 도움을 받을 수 있습니다.
- [주간 개발 회의](../contribute/dev_call.md): PX4 개발 팀과 플랫폼 기술 세부 사항(풀 리퀘스트, 주요 문제, 일반 Q&A 포함)에 대하여 논의할 수 있는 좋은 기회입니다.
- [라이센스](../contribute/licenses.md): 코드로 할 수 있는 작업(허용적인 [BSD 3절 라이선스](https://opensource.org/licenses/BSD-3-Clause) 조건에 따라 자유롭게 사용 및 수정 가능합니다)
- [기여](../contribute/README.md): [소스 코드](../contribute/code.md)로 작업하는 방법.

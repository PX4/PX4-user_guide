# PX4 개발

신규 기체 개발 및 변경 방법, 비행 알고리즘을 수정, 새 모드를 추가, 새 하드웨어를 통합, 및 비행 컨트롤러 외부에서 PX4와 통신하는 방법을 설명합니다.

::: tip
이 섹션은 소프트웨어 개발자와 (신규) 하드웨어 통합자를위한 것입니다. 기존 기체를 구축하거나 PX4 차량을 사용하여 비행하는 경우에는 필요하지 않습니다.
:::

다음 방법을 설명합니다.

* <0개발자 최소 설정</a>, [PX4 소스 코드 빌드](../dev_setup/building_px4.md), [다양한 오토파일럿](../flight_controller/README.md) 펌웨어 배포 방법을 배웁니다.
* [PX4 시스템 구조](../concept/architecture.md)와 핵심 개념을 이해합니다.
* 플라이트 스택과 미들웨어 수정 방법을 배웁니다:
  - 비행 알고리즘 수정 및 새 [비행 상태](../concept/flight_modes.md) 추가.
  - 새로운 [기체](../dev_airframes/README.md)를 지원합니다.
* PX4에 새 하드웨어를 조합하는 방법을 배웁니다:
  - 카메라, 범위 검색 센서 등과 같은 새 센서, 액츄에이터를 지원합니다.
  - 새 자동 항법 장치에서 실행하도록 PX4 수정.
* PX4를 [모의시험](../simulation/README.md), [실제 시험](../test_and_ci/README.md), [오류 탐색/동작 기록](../debug/README.md) 합니다.
* 외부 로보틱스 API와 통신/통합합니다.


## 주요 개발자 링크

- [지원](contribute/support.md) 페이지에서는 [토의 게시판](http://discuss.px4.io/)과 기타 지원 채널로의 링크를 제공합니다.
- [주간 개발자 온라인 미팅](../contribute/dev_call.md) : PX4 개발 팀을 만나 플랫폼 기술 세부 사항 (Pull Request, 주요 문제, 일반 Q&A 포함)을 논의 할 수 있는 좋은 기회입니다.
- [라이선스](../contribute/licenses.md) : 코드로 수행 할 수있는 작업 (허용되는 [BSD 3 절 라이선스](https://opensource.org/licenses/BSD-3-Clause) 조건에 따라 무료로 사용 및 수정 가능!)
- [기여](../contribute/README.md) : [소스 코드](../contribute/code.md)로 작업하는 방법.

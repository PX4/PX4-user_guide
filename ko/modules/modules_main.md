---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_main
---


# 모듈 및 명령어 참조
다음 페이지들은 PX4 모듈, 드라이버 및 명령어에 대하여 설명합니다. 제공되는 기능, 높은 수준의 구현 개요 및 방법과 명령줄 인터페이스 사용 방법을 설명합니다.

> **참고** **소스 코드에서 자동 생성**되며, 최신의 모듈 문서가 포함되어 있습니다.

완전한 목록은 아니며, NuttX는 몇 가지 추가 명령(예: `free`)도 제공합니다. 콘솔에서 `help`을 사용하여 사용 가능한 모든 명령어 목록을 조회할 수 있습니다. 대부분의 경우 `command help` 명령어는 도움말과 사용법을 출력합니다.

이것은 소스에서 생성되므로, [PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) 저장소에서 오류를 보고/수정하여 주십시오. 문서 페이지는 PX4-Autopilot 디렉토리의 루트에서 다음 명령어를 실행하여 생성합니다.
```
make module_documentation
```
생성된 파일은 `modules` 디렉토리에 저장됩니다.

## 카테고리
- [명령어](modules_autotune.md)
- [통신](modules_command.md)
- [콘트롤러](modules_communication.md)
- [드라이버](modules_controller.md)
- [추정기](modules_driver.md)
- [시뮬레이션](modules_estimator.md)
- [시스템](modules_simulation.md)
- [템플릿](modules_system.md)
- [Template](modules_template.md)

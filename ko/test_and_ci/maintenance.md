---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/maintenance
---

# 유지보수 참고

코드 베이스 상태를 분석하고 유지 관리를 지원하는 도구들을 설명합니다.

## 변경 분석

변동량(파일에 수행된 변경 수)은 리팩토링이 필요한 파일을 나타내는 지표가 될 수 있습니다.

변경 횟수의 척도를 찾는 도구 [Churn](https://github.com/danmayer/churn)을 이 용도로 사용할 수 있습니다.

```
gem install churn
```

`v1.6.0-rc2` 출력 예제는 다음과 같습니다:

```
cd src/PX4-Autopilot
churn --start_date "6 months ago"
**********************************************************************
* Revision Changes
**********************************************************************
Files
+------------------------------------------+
| file                                     |
+------------------------------------------+
| src/modules/navigator/mission.cpp        |
| src/modules/navigator/navigator_main.cpp |
| src/modules/navigator/rtl.cpp            |
+------------------------------------------+



**********************************************************************
* Project Churn
**********************************************************************

Files
+---------------------------------------------------------------------------+---------------+
| file_path                                                                 | times_changed |
+---------------------------------------------------------------------------+---------------+
| src/modules/mc_pos_control/mc_pos_control_main.cpp                        | 107           |
| src/modules/commander/commander.cpp                                       | 67            |
| ROMFS/px4fmu_common/init.d/rcS                                            | 52            |
| Makefile                                                                  | 49            |
| src/drivers/px4fmu/fmu.cpp                                                | 47            |
| ROMFS/px4fmu_common/init.d/rc.sensors                                     | 40            |
| src/drivers/boards/aerofc-v1/board_config.h                               | 31            |
| src/modules/logger/logger.cpp                                             | 29            |
| src/modules/navigator/navigator_main.cpp                                  | 28            |
```

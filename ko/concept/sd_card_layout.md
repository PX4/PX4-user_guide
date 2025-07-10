---
canonicalUrl: https://docs.px4.io/main/ko/concept/sd_card_layout
---

# PX4 SD 카드 디렉토리 구조

PX4에서는 SD 카드에 구성 파일, 비행 로그, 임무 정보 등을 저장합니다.

:::tip
PX4에서는 SD 카드는 FAT32 포맷이어야 합니다(SD 카드의 기본값).
다른 파일 시스템의 카드는 다시 포맷하여야 합니다.
:::

디렉토리 구조는 아래와 같습니다.

| 디렉토리/파일                       | 설명                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/etc`                        | 추가 설정 (+믹서). [시스템 시작 > 시스템 시작 설정 바꾸기](../concept/system_startup.md#replacing-the-system-startup)를 참고하십시오. |
| `/etc/mixers`                 | [믹서](../concept/mixing.md)                                                                                |
| `/log`                        | 전체 [비행 기록](../dev_log/logging.md)                                                                         |
| `/mission_log`                | 일부 비행 기록                                                                                                  |
| `/fw`                         | [UAVCAN](../uavcan/README.md) 펌웨어                                                                         |
| `/uavcan.db`                  | UAVCAN DB + 로그                                                                                            |
| `/params`                     | 매개변수들 (FRAM/FLASH에 없을 경우)                                                                                 |
| `/dataman`                    | 임무 저장 파일                                                                                                  |
| `/fault_<datetime>.txt` | 하드폴트 파일                                                                                                   |
| `/bootlog.txt`                | 부팅 로그 파일                                                                                                  |

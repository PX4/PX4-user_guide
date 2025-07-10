---
canonicalUrl: https://docs.px4.io/main/ko/concept/sd_card_layout
---

# PX4 SD 카드 배치

PX4 SD 카드는 설정 파일, 비행 기록, 임무 정보 등을 저장하는 용도로 사용합니다.

:::tip
The SD card should be FAT32 formatted for use with PX4 (this is the default for SD cards). We recommend that you reformat cards that are using a different file system.
:::

The directory structure/layout is shown below.

| 디렉터리/파일                       | 설명                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/etc/`                       | 추가 설정 (+믹서). [시스템 시작 > 시스템 시작 설정 바꾸기](../concept/system_startup.md#replacing-the-system-startup)를 참고하십시오. |
| `/etc/mixers/`                | [믹서](../concept/mixing.md)                                                                                |
| `/log/`                       | 전체 [비행 기록](../dev_log/logging.md)                                                                         |
| `/mission_log/`               | 일부 비행 기록                                                                                                  |
| `/fw/`                        | [UAVCAN](../uavcan/README.md) 펌웨어                                                                         |
| `/uavcan.db/`                 | UAVCAN DB + 로그                                                                                            |
| `/params`                     | 매개변수 값 (FRAM/FLASH에 없을 경우)                                                                                |
| `/dataman`                    | 임무 저장소 파일                                                                                                 |
| `/fault_<datetime>.txt` | 하드 폴트 파일                                                                                                  |
| `/bootlog.txt`                | 부팅 기록 파일                                                                                                  |

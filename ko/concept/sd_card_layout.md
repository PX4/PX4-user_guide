# PX4 SD 카드 배치

PX4 SD 카드는 설정 파일, 비행 기록, 임무 정보 등을 저장하는 용도로 사용합니다.

> **Tip** SD 카드는 PX4에서 활용하려면 FAT32 방식으로 포맷해야합니다(SD 카드 기본 파일 시스템 형식). 다른 파일 시스템을 사용한다면, 카드를 다시 포맷하시는게 좋습니다.

디렉터리 구조와 배치는 다음과 같습니다.

| 디렉터리/파일               | 설명                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| /etc/                 | 추가 설정 (+믹서). [시스템 시작 > 시스템 시작 설정 바꾸기](../concept/system_startup.md#replacing-the-system-startup)를 참고하십시오. |
| /etc/mixers/          | [믹서](../concept/mixing.md)                                                                                |
| /log/                 | 전체 [비행 기록](../dev_log/logging.md)                                                                         |
| /mission_log/         | 일부 비행 기록                                                                                                  |
| /fw/                  | [UAVCAN](../uavcan/README.md) 펌웨어                                                                         |
| /uavcan.db/           | UAVCAN DB + 로그                                                                                            |
| /params               | 매개변수 값 (FRAM/FLASH에 없을 경우)                                                                                |
| /dataman              | 임무 저장소 파일                                                                                                 |
| /fault_<datetime>.txt | 하드 폴트 파일                                                                                                  |
| /bootlog.txt          | 부팅 기록 파일                                                                                                  |

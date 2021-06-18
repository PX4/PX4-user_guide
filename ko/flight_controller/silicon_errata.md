# 실리콘 정오표

Pixhawk 보드 시리즈에 사용되는 타사 부품(마이크로 컨트롤러, 센서 등)의 실리콘 (하드웨어) 정오표와 관련된 문제점들을 설명합니다. 실리콘 오류 유형에 따라 이러한 오류는 소프트웨어에서 수정할 수 없으며 특정 제한이 적용될 수 있습니다.

## FMUV2/ 픽쇼크 실리콘 에라타

### STM32F427VIT6 (정오표)

플래시 뱅크 2 및 전속 USB 장치 전용.

rev 2까지의 실리콘 개정판(개정판 3은 영향을받지 않음)은 USB 데이터 라인중 하나 인 PA12에 활동이있는 동안 두 번째 플래시 뱅크에 액세스시 오류/데이터 손상을 일으킬 수 있습니다. 플래시 뱅크 #2를 사용하지 않는 것 외에는 해결 방법은 없습니다. 장치를 프로그래밍하려면 USB가 필요하기 때문에 실리콘 리비전 < rv3으로 제작된 픽사는 마이크로프로세서의 2MB 플래시 중 최대 1MB만 사용할 수 있습니다

:::tip
The errata is fixed in later versions, but this may not be detected if you are using an older bootloader. See [Firmware > FMUv2 Bootloader Update](../config/firmware.md#bootloader) for more information.
:::

## FMU- 픽쇼크 실리콘 얼라타

No known issues.
# 시리얼 포트 매핑

직렬 포트(UART), 장치(예: "ttyS0")와 PX4에서 활성화된 특정 기능(예: TELEM1, TELEM2, GPS1, RC SBUS, 디버그 콘솔)간의 매핑 방법을 설명합니다.

:::note
지침은 비행 콘트롤러 문서에서 직렬 포트 매핑 테이블을 생성합니다. 예: [Pixhawk 4 > 직렬 포트 매핑](../flight_controller/pixhawk4.md#serial-port-mapping).
:::

## STMxxyyy의 NuttX

<!-- instructions from DavidS here: https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

보드 설정 파일을 검사하여 STMxxyyy 아키텍처에서 NuttX 빌드에 대한 매핑 획득 방법을 설명합니다. FMUv5를 사용하지만, 다른 FMU 버전/NuttX 보드에도 유사하게 확장할 수 있습니다.

### default.cmake

**default.cmake**는 여러 직렬 포트 매핑을 나열합니다(텍스트 "SERIAL_PORTS" 검색).

[/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake#L13-L17)에서:

```
SERIAL_PORTS
    GPS1:/dev/ttyS0
    TEL1:/dev/ttyS1
    TEL2:/dev/ttyS2
    TEL4:/dev/ttyS3
```

### nsh/defconfig

*nsh/defconfig*를 사용하여 정의된 포트, UART인지, USART인지, USART/UART와 장치 간의 매핑을 결정할 수 있습니다. [직렬/디버그 콘솔](../debug/system_console.md)에 사용되는 포트를 결정할 수 있습니다.

보드의 defconfig 파일을 엽니다(예: [/boards/px4/fmu-v5/nuttx-config/nsh/defconfig](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/nsh/defconfig#L191-L197)).

`CONFIG_STM32xx_USARTn=y`와 같은 형식의 항목이 있는 섹션을 찾을 때까지 텍스트 "ART"를 검색합니다. 여기서 `xx`는 프로세서 유형이고 `n`은 포트 번호입니다. 예를 들면:

```
CONFIG_STM32F7_UART4=y
CONFIG_STM32F7_UART7=y
CONFIG_STM32F7_UART8=y
CONFIG_STM32F7_USART1=y
CONFIG_STM32F7_USART2=y
CONFIG_STM32F7_USART3=y
CONFIG_STM32F7_USART6=y
```

항목은 정의된 포트와 UART인지 USART인지 알려줍니다.

위의 섹션을 복사하고 "n"으로 번호를 재정렬 합니다. 장치 대 직렬 포트 매핑을 얻으려면, 장치 번호 _ttyS**n**_을 (0 기반)과 함께 증가시킵니다.
```
ttyS0 CONFIG_STM32F7_USART1=y
ttyS1 CONFIG_STM32F7_USART2=y
ttyS2 CONFIG_STM32F7_USART3=y
ttyS3 CONFIG_STM32F7_UART4=y
ttyS4 CONFIG_STM32F7_USART6=y
ttyS5 CONFIG_STM32F7_UART7=y
ttyS6 CONFIG_STM32F7_UART8=y
```

DEBUG 콘솔 매핑을 가져오기 위해 `SERIAL_CONSOLE`에 대한 [defconfig 파일](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/nsh/defconfig#L212)을 검색합니다. 아래에서 콘솔이 UART7에 있음을 알 수 있습니다.

```
CONFIG_UART7_SERIAL_CONSOLE=y
```

### board_config.h

IO 보드가 있는 비행 콘트롤러의 경우 `PX4IO_SERIAL_DEVICE`를 검색하여 **board_config.h**에서 PX4IO 연결을 확인합니다.

예: [/boards/px4/fmu-v5/src/board_config.h](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/board_config.h#L59)
```
#define PX4IO_SERIAL_DEVICE            "/dev/ttyS6"
#define PX4IO_SERIAL_TX_GPIO           GPIO_UART8_TX
#define PX4IO_SERIAL_RX_GPIO           GPIO_UART8_RX
#define PX4IO_SERIAL_BASE              STM32_UART8_BASE
```
따라서 PX4IO는 `ttyS6`에 있습니다(이전 섹션에서 이미 알고 있는 UART8에 매핑되는 것도 볼 수 있습니다).

### 결합

최종 매핑은 다음과 같습니다.
```
ttyS0 CONFIG_STM32F7_USART1=y GPS1
ttyS1 CONFIG_STM32F7_USART2=y TEL1
ttyS2 CONFIG_STM32F7_USART3=y TEL2
ttyS3 CONFIG_STM32F7_UART4=y TEL4
ttyS4 CONFIG_STM32F7_USART6=y
ttyS5 CONFIG_STM32F7_UART7=y DEBUG
ttyS6 CONFIG_STM32F7_UART8=y PX4IO
```

[비행 콘트롤러 문서](../flight_controller/pixhawk4.md#serial-port-mapping)의 결과 표는 다음과 같습니다.

| UART   | 장치         | 포트             |
| ------ | ---------- | -------------- |
| UART1  | /dev/ttyS0 | GPS            |
| USART2 | /dev/ttyS1 | TELEM1 (흐름 제어) |
| USART3 | /dev/ttyS2 | TELEM2 (흐름 제어) |
| UART4  | /dev/ttyS3 | TELEM4         |
| USART6 | /dev/ttyS4 | RC SBUS        |
| UART7  | /dev/ttyS5 | 디버그 콘솔         |
| UART8  | /dev/ttyS6 | PX4IO          |


## 기타 아키텍처

:::note
기여를 환영합니다!
:::

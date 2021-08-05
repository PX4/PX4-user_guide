# ULog 파일 형식

ULog는 시스템 데이터 로깅의 파일 형식입니다.

형식은 자체 설명적입니다. 즉, 기록되는 형식과 메시지 유형이 포함됩니다. [시스템 로거](../dev_log/logging.md)를 사용하여 기록된 주제의 *기본 설정*을 SD 카드에서 변경할 수 있습니다..

장치 입력(센서 등), 내부 상태(cpu 부하, 태도 등) 및 `printf` 로그 메시지를 로깅할 수 있습니다.

형식은 모든 바이너리 유형에 대해 Little Endian을 사용합니다.

## 데이터 형식

다음 바이너리 형식을 사용합니다. C의 자료형에 해당합니다:

| 형식                  | 바이트 크기 |
| ------------------- | ------ |
| int8_t, uint8_t   | 1      |
| int16_t, uint16_t | 2      |
| int32_t, uint32_t | 4      |
| int64_t, uint64_t | 8      |
| float               | 4      |
| double              | 8      |
| bool, char          | 1      |

또한 다음과 같이 배열에도 활용할 수 있습니다. `float[5]`. 일반적으로 모든 문자열(`char[length]`)은 끝에 `'\0'`을 포함하지 않습니다. 문자열 비교는 대소문자를 구분합니다.


## 파일 구조

파일은 세 섹션으로 구성됩니다.
```
----------------------
|       Header       |
----------------------
|    Definitions     |
----------------------
|        Data        |
----------------------
```

### 헤더 섹션

헤더는 고정 크기 섹션이며, 다음 형식(16바이트)을 갖습니다.
```
----------------------------------------------------------------------
| 0x55 0x4c 0x6f 0x67 0x01 0x12 0x35 | 0x01         | uint64_t       |
| File magic (7B)                    | Version (1B) | Timestamp (8B) |
----------------------------------------------------------------------
```

버전은 파일 형식 버전이며, 현재 값은 1입니다. 타임스탬프는 `uint64_t` 정수형이며, 로깅을 시작한 시각을 마이크로초 단위로 표기합니다.


### 정의 섹션

가변 길이 섹션에는 버전 정보, 형식 정의 및 (초기) 매개변수 값이 포함됩니다.

데이터 섹션 정의는 메시지 스트림으로 구성됩니다. 각 데이터 섹션은 다음의 헤더로 시작합니다:
```c
struct message_header_s {
    uint16_t msg_size;
    uint8_t msg_type
};
```

`msg_size`는 헤더가 없는 바이트 단위의 메시지 크기입니다(`hdr_size`= 3바이트). `msg_type`은 콘텐츠를 정의하며 다음 중 하나입니다.

- 'B': 비트 집합 메시지에 플래그를 지정합니다.
  ```
  struct ulog_message_flag_bits_s {
    struct message_header_s;
    uint8_t compat_flags[8];
    uint8_t incompat_flags[8];
    uint64_t appended_offsets[3]; ///< file offset(s) for appended data if appending bit is set
  };
  ```
  이 메시지는 처음 메시지 **이어야 합니다**. 그 다음에는 고정 상수 오프셋 값이 들어간 헤더 섹션이 옵니다.

  - `compat_flags`: 호환 플래그 비트값
    - `compat_flags[0]`, 비트 0, *DEFAULT_PARAMETERS*: 설정되면 로그에 매개변수 기본값(메시지 'Q')이 포함됩니다.

    나머지 비트는 현재 정의되지 않았으며 ,모두 0으로 설정하여야 합니다. 이 비트는 향후 기존 파서와 호환되는 ULog 변경에 사용할 수 있습니다. 이는 알 수 없는 비트 중 하나가 설정되어 있으면, 파서가 해당 비트를 무시할 수 있음을 의미합니다.
  - `incompat_flags`: 비호환성 플래그 비트값. 로그에 추가 데이터가 포함되어 있고, `appended_offsets` 중 하나 이상이 0이 아닌 경우 인덱스 0의 LSB 비트가 1로 설정됩니다. 다른 모든 비트는 정의되지 않으며, 0으로 설정하여야 합니다. 파서는 이러한 비트 세트 중 하나를 찾으면, 로그 파싱을 거부합니다. 이것은 기존 파서가 처리할 수 없는 주요 변경 사항을 도입하는 데 사용할 수 있습니다.
  - `appended_offsets`: 추가된 데이터에 대한 파일 오프셋(0부터 시작). 데이터가 추가되지 않은 경우에는 모든 오프셋은 0이어야 합니다. 이것은 메시지 중간에 멈출 수 있는 로그에 대한 데이터를 안정적으로 추가할 수 있습니다.

    데이터를 추가하는 프로세스는 다음과 같습니다.
    - 관련 `incompat_flags` 비트 값을 설정합니다.
    - `append_offsets` 처음 값을 로그 파일 길이 값인 0으로 설정합니다.
    - 그런 다음 데이터 섹션에 유효한 모든 유형의 메시지를 추가합니다.

  향후 ULog 사양에서 이 메시지 끝에 추가 필드가 존재할 수 있습니다. 이것은 파서가 이 메시지의 고정된 길이를 가정해서는 안 된다는 것을 의미합니다. 메시지가 예상보다 길면(현재 40바이트) 초과 바이트는 무시합니다.


- 'F': 다른 정의에서 중첩 유형으로 기록되거나 사용될 수 있는 단일(복합) 유형에 대한 형식 정의입니다.
  ```
  struct message_format_s {
    struct message_header_s header;
    char format[header.msg_size];
  };
  ```
  `format`: 다음 형식의 일반 텍스트 문자열: `message_name:field0;field1;` `;`으로 구분된 임의의 양의 필드(최소 1개)가 있을 수 있습니다. 필드 형식은 배열의 경우 `type field_name` 또는 `type[array_length] field_name`입니다(고정 크기 배열만 지원됨). `type`은 기본 바이너리 유형 중 하나이거나 다른 형식 정의(중첩 사용)의 `message_name`입니다. 유형은 정의되기 전에 사용할 수 있습니다. 임의의 중첩이 있을 수 있지만, 순환 종속성은 없습니다.

  일부 필드 이름은 특별합니다.
  - `timestamp`: 기록된 모든 메시지(`message_add_logged_s`)에는 타임스탬프 필드가 포함되어야 합니다(첫 번째 필드일 필요는 없음). 유형은 `uint64_t`(현재 유일하게 사용됨), `uint32_t`, `uint16_t` 또는 `uint8_t`일 수 있습니다. 단위는 항상 마이크로초이며 `uint8_t` 단위는 밀리초입니다. 로그 작성기는 랩어라운드를 감지할 수 있을 만큼 충분히 자주 메시지를 기록해야 하고, 로그 판독기는 랩어라운드를 처리하여야 합니다(그리고 드롭아웃을 고려해야 함). 타임스탬프는 `msg_id`가 동일한 메시지 시리즈에 대해 항상 단조 증가해야 합니다.
  - 패딩: `_padding`으로 시작하는 필드 이름은 표시되지 않아야 하며, 해당 데이터는 독자가 무시하여야 합니다. 이 필드는 올바른 정렬을 보장하기 위하여 작성자가 삽입할 수 있습니다.

    패딩 필드가 마지막 필드인 경우 불필요한 데이터 쓰기를 방지하기 위하여, 이 필드는 기록되지 않습니다. 즉, `message_data_s.data`가 패딩 크기만큼 짧아집니다. 그러나 메시지가 중첩 정의에서 사용될 때 패딩은 여전히 필요합니다.

- 'I': 정보 메세지
  ```c
  struct message_info_s {
    struct message_header_s header;
    uint8_t key_len;
    char key[key_len];
    char value[header.msg_size-1-key_len]
  };
  ```
  `key`는 형식 메시지에서와 같이 일반 문자열(사용자 정의 유형일 수도 있음)이지만, `;`으로 끝나지 않는 단일 필드로 구성됩니다. `float[3] myvalues`. `value`에는 `key`에 의해 설명된 데이터가 포함됩니다.

  특정 키가 포함된 정보 메시지는 전체 로그에서 최대 한 번만 발생하여야 합니다. 파서는 정보 메시지를 사전으로 저장할 수 있습니다.

  사전 정의된 정보 메시지는 다음과 같습니다.

| 키                                   | 설명                      | 예제 값               |
| ----------------------------------- | ----------------------- | ------------------ |
| char[value_len] sys_name          | 시스템 이름                  | "PX4"              |
| char[value_len] ver_hw            | 하드웨어 버전 (보드)            | "PX4FMU_V4"        |
| char[value_len] ver_hw_subtype    | 보드 하위 버전(변형판)           | "V2"               |
| char[value_len] ver_sw            | 소프트웨어 버전(git tag)       | "7f65e01"          |
| char[value_len] ver_sw_branch     | git branch              | "master"           |
| uint32_t ver_sw_release           | 소프트웨어 버전 (아래 참고)        | 0x010401ff         |
| char[value_len] sys_os_name       | 운영체제 이름                 | "Linux"            |
| char[value_len] sys_os_ver        | 운영체제 버전 (git tag)       | "9f82919"          |
| uint32_t ver_os_release           | 운영체제 버전 (아래 참고)         | 0x010401ff         |
| char[value_len] sys_toolchain     | 툴체인 이름                  | "GNU GCC"          |
| char[value_len] sys_toolchain_ver | 툴체인 버전                  | "6.2.1"            |
| char[value_len] sys_mcu           | 칩 이름과 버전                | "STM32F42x, rev A" |
| char[value_len] sys_uuid          | 차량 고유 식별자(예: MCU ID)    | "392a93e32fa3"...  |
| char[value_len] log_type          | 로그 형식(지정하지 않으면 전체 기록)   | "mission"          |
| char[value_len] replay              | 재생 모드인 경우 재생된 로그의 파일 이름 | "log001.ulg"       |
| int32_t time_ref_utc              | UTC 시간 오프셋(초)           | -3600              |

  `ver_sw_release` 및 `ver_os_release` 형식은 0xAABBCCTT입니다. 여기서 AA는 메이저, BB는 마이너, CC는 패치, TT는 유형입니다. 유형은 다음과 같이 정의됩니다. `>= 0`: 개발, `>= 64`: 알파 버전, `>= 128`: 베타 버전, `>= 192`: RC 버전, `== 255`: 릴리스 버전. 예를 들어 0x010402ff는 릴리스 버전 v1.4.2로 변환됩니다.

  이 메시지는 데이터 섹션에서도 사용할 수 있습니다(그러나 선호하는 섹션임).


- 'M': 다중 정보 메세지
  ```c
  struct ulog_message_info_multiple_header_s {
    struct message_header_s header;
    uint8_t is_continued; ///< can be used for arrays
    uint8_t key_len;
    char key[key_len];
    char value[header.msg_size-2-key_len]
  };
  ```
  동일한 키를 가진 여러 메시지가 있을 수 있다는 점을 제외하고는 정보 메시지와 동일합니다(파서는 목록으로 저장함). `is_continued`는 분할 메시지에 사용할 수 있습니다. 1로 설정하면 동일한 키를 가진 이전 메시지의 일부입니다. 파서는 다중 메시지를 로그에서 발생하는 메시지와 동일한 순서를 사용하여 2D 목록으로 저장할 수 있습니다.

- 'P': 매개변수 메세지 `message_info_s`와 동일한 형식입니다. 매개변수가 런타임 중에 동적으로 변경되는 경우에는 이 메시지는 데이터 섹션에서도 사용할 수 있습니다. 데이터 유형은 `int32_t`, `float`으로 제한됩니다.

- 'Q': 매개변수 기본 메시지
  ```c
  struct ulog_message_parameter_default_header_s {
    struct message_header_s header;
    uint8_t default_types;
    uint8_t key_len;
    char key[key_len];
    char value[header.msg_size-2-key_len]
  };
  ```
  `default_types`는 비트 필드이며 값이 속한 그룹을 정의합니다. 최소한 하나의 비트가 설정되어야 합니다.
  - `1<<0`:: 시스템 전체 기본값
  - `1<<1`: 현재 설정(예: 기체)의 기본값

  로그에는 모든 매개변수에 대한 기본값이 포함되어 있지 않을 수 있습니다. 이러한 경우 기본값은 매개변수 값과 같고, 다른 기본 유형은 독립적으로 처리됩니다. 이 메시지는 데이터 섹션에서도 사용할 수 있습니다. 데이터 유형은 `int32_t`, `float`으로 제한됩니다.

이 섹션은 첫 번째 `message_add_logged_s` 또는 `message_logging_s` 메시지가 시작되기 전에 끝납니다.

### 데이터 섹션

다음 메시지는 이 섹션에 속합니다.
- 'A': 이름으로 메시지를 구독하고 `message_data_s`에서 사용되는 ID를 지정합니다. 이것은 첫 번째 해당 `message_data_s`보다 이전에 위치하여야 합니다.
  ```c
  struct message_add_logged_s {
    struct message_header_s header;
    uint8_t multi_id;
    uint16_t msg_id;
    char message_name[header.msg_size-3];
  };
  ```
  `multi_id`: 동일한 메시지 형식에 여러 인스턴스가 있을 수 있습니다(예: 시스템에 동일한 유형의 센서가 두 개 있는 경우). 기본 및 첫 번째 인스턴스는 0이어야 합니다. `msg_id`: `message_data_s` 데이터와 일치하는 고유 ID입니다. 처음 사용할 때는 이것을 0으로 설정한 다음 증가시켜야 합니다. 구독 취소 후에도 동일한 `msg_id`를 다른 구독에 두 번 사용해서는 안 됩니다. `message_name`: 구독할 메시지 이름입니다. `message_format_s` 정의 중 하나와 일치하여야 합니다.

- 'R': 메시지를 구독 취소하여 더 이상 기록되지 않음을 표시합니다(현재 사용되지 않음).
  ```c
  struct message_remove_logged_s {
    struct message_header_s header;
    uint16_t msg_id;
  };
  ```

- 'D': 기록된 데이터를 포함합니다.
  ```
  struct message_data_s {
    struct message_header_s header;
    uint16_t msg_id;
    uint8_t data[header.msg_size-2];
  };
  ```
  `msg_id`: `message_add_logged_s` 메시지로 정의됩니다. `data`에는 `message_format_s`에 정의된 대로 기록된 바이너리 메시지가 포함됩니다. 패딩 필드의 특수 처리에 대해서는 위를 참고하십시오.

- 'L': 로깅 문자열 메시지, 즉 printf 출력.
  ```
  struct message_logging_s {
    struct message_header_s header;
    uint8_t log_level;
    uint64_t timestamp;
    char message[header.msg_size-9]
  };
  ```
  `timestamp`: 마이크로초 단위, `log_level`: Linux 커널에서와 동일:

| 이름      | 레벨  | 설명            |
| ------- | --- | ------------- |
| EMERG   | '0' | 시스템 사용 불가     |
| ALERT   | '1' | 즉시 조치         |
| CRIT    | '2' | 임계 조건         |
| ERR     | '3' | 오류 조건         |
| WARNING | '4' | 경고 조건         |
| NOTICE  | '5' | 정상적이지만 중요한 상태 |
| INFO    | '6' | 정보 제공         |
| DEBUG   | '7' | 디버그 수준 메시지    |

- 'C': 태그가 지정된 로깅된 문자열 메시지
  ```
  struct message_logging_tagged_s {
    struct message_header_s header;
    uint8_t log_level;
    uint16_t tag;
    uint64_t timestamp;
    char message[header.msg_size-9]
  };
  ```
  `tag`: 기록된 메시지 문자열의 소스를 나타내는 ID입니다. 시스템 아키텍처에 따라 프로세스, 스레드 또는 클래스를 나타낼 수 있습니다. 예를 들어, 다양한 페이로드, 외부 디스크, 직렬 장치 등을 제어하기 위해 여러 프로세스를 실행하는 온보드 컴퓨터에 대한 참조 구현은 `uint16_t 열거형`을 사용하여 이러한 프로세스 식별자를 `message_logging_tagged_s`의 태그 속성으로 인코딩할 수 있습니다. 구조체는 다음과 같습니다.

  ```
  enum class ulog_tag : uint16_t {
    unassigned,
    mavlink_handler,
    ppk_handler,
    camera_handler,
    ptp_handler,
    serial_handler,
    watchdog,
    io_service,
    cbuf,
    ulg
  };
  ```

  `타임스탬프`: 마이크로초 `log_level`: Linux 커널과 동일

| 이름      | 레벨  | 설명            |
| ------- | --- | ------------- |
| EMERG   | '0' | 시스템 사용 불가     |
| ALERT   | '1' | 즉시 조치         |
| CRIT    | '2' | 임계 조건         |
| ERR     | '3' | 오류 조건         |
| WARNING | '4' | 경고 조건         |
| NOTICE  | '5' | 정상적이지만 중요한 상태 |
| INFO    | '6' | 정보 제공         |
| DEBUG   | '7' | 디버그 수준 메시지    |

- 'S': 독자가 다음 동기화 메시지를 검색하여 손상된 메시지에서 복구할 수 있도록 동기화하는 메시지입니다.
  ```
  struct message_sync_s {
    struct message_header_s header;
    uint8_t sync_magic[8];
  };
  ```
  `sync_magic`: [0x2F, 0x73, 0x13, 0x20, 0x25, 0x0C, 0xBB, 0x12]

- 'O': 주어진 기간(ms 단위)의 드롭아웃(로깅 메시지 손실)을 표시합니다. 장치가 충분히 빠르지 않은 경우에는 손실이 발생할 수 있습니다.
  ```
  struct message_dropout_s {
    struct message_header_s header;
    uint16_t duration;
  };
  ```

- 'I': 정보 메세지. 위 참조.

- 'M': 다중 정보 메세지 위 참조.

- 'P': 매개변수 메세지 위 참조.

- 'Q': 매개변수 메시지 위 참조.

## 파서 요구 사항

유효한 ULog 파서는 요구 사항은 다음과 같습니다.
- 알 수 없는 메시지를 무시하여야 합니다(하지만 경고를 인쇄할 수 있음).
- 미래의/알 수 없는 파일 형식 버전도 구문 분석합니다(하지만 경고를 인쇄할 수 있음).
- 알 수 없는 비호환성 비트 세트(`ulog_message_flag_bits_s` 메시지의 `incompat_flags`)가 포함된 로그의 구문 분석을 거부해야 합니다. 이는 로그에 파서가 처리할 수 없는 주요 변경 사항이 포함되어 있음을 의미합니다.
- 파서는 메시지 중간에 갑자기 끝나는 로그를 올바르게 처리할 수 있어야 합니다. 완료되지 않은 메시지는 무시하여야 합니다.
- 추가된 데이터의 경우: 파서는 데이터 섹션이 존재한다고 가정할 수 있습니다. 즉 오프셋은 정의 섹션 뒤의 위치를 가리킵니다.

  추가된 데이터는 일반 데이터 섹션의 일부인 것처럼 처리하여야 합니다.


## 알려진 구현

- PX4-오토파일럿: C++
  - [로거 모듈](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/logger)
  - [재생 모듈](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/replay)
  - [hardfault_log 모듈](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/hardfault_log): hardfault 충돌 데이터를 추가합니다.
- [pyulog](https://github.com/PX4/pyulog): python, CLI 스크립트가 있는 ULog 파서 라이브러리
- [FlightPlot](https://github.com/PX4/FlightPlot): 자바, 로그 플로터
- [pyFlightAnalysis](https://github.com/Marxlp/pyFlightAnalysis): Python, pyulog 기반의 로그 플로터 및 3D 시각화 도구입니다.
- [MAVLink](https://github.com/mavlink/mavlink): MAVLink를 통한 ULog 스트리밍용 메시지(적어도 잘린 메시지의 경우 데이터 추가는 지원되지 않습니다.)
- [QGroundControl](https://github.com/mavlink/qgroundcontrol): C++, MAVLink를 통한 ULog 스트리밍 및 GeoTagging에 대한 최소한의 구문 분석
- [mavlink-router](https://github.com/01org/mavlink-router): C++, MAVLink를 통한 ULog 스트리밍
- [MAVGAnalysis](https://github.com/ecmnet/MAVGCL): Java, MAVLink를 통한 ULog 스트리밍 및 플로팅 및 분석용 파서
- [PlotJuggler](https://github.com/facontidavide/PlotJuggler): 로그 및 시계열을 플롯하는 C++/Qt 응용 프로그램입니다. 버전 2.1.3부터 ULog를 지원합니다.
- [ulogreader](https://github.com/maxsun/ulogreader): Javascript, ULog 리더 및 파서는 JSON 개체 형식의 로그를 출력합니다.


## 파일 형식 버전 이력

### 버전 2의 변경 사항

`ulog_message_info_multiple_header_s` 및 `ulog_message_flag_bits_s` 메시지 추가 및 로그에 데이터 추가 기능. 기존 로그에 충돌 데이터를 추가하는 데 사용됩니다. 메시지 중간에 잘린 로그에 데이터가 추가되면, 버전 1 파서로 파싱할 수 없습니다. 그 외의 파서가 알 수 없는 메시지를 무시하면, 순방향 및 역방향 호환성이 제공됩니다.

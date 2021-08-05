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

  향후 ULog 사양에서 이 메시지 끝에 추가 필드가 존재할 수 있습니다. This means a parser must not assume a fixed length of this message. If the message is longer than expected (currently 40 bytes), the exceeding bytes must just be ignored.


- 'F': format definition for a single (composite) type that can be logged or used in another definition as a nested type.
  ```
  struct message_format_s {
  struct message_header_s header;
  char format[header.msg_size-hdr_size];
};
  ```
  `format`: plain-text string with the following format: `message_name:field0;field1;` There can be an arbitrary amount of fields (at least 1), separated by `;`. A field has the format: `type field_name` or `type[array_length] field_name` for arrays (only fixed size arrays are supported). `type` is one of the basic binary types or a `message_name` of another format definition (nested usage). A type can be used before it's defined. There can be arbitrary nesting but no circular dependencies.

  Some field names are special:
  - `timestamp`: every logged message (`message_add_logged_s`) must include a timestamp field (does not need to be the first field). Its type can be: `uint64_t` (currently the only one used), `uint32_t`, `uint16_t` or `uint8_t`. The unit is always microseconds, except for `uint8_t` it's milliseconds. A log writer must make sure to log messages often enough to be able to detect wrap-arounds and a log reader must handle wrap-arounds (and take into account dropouts). The timestamp must always be monotonic increasing for a message serie with the same `msg_id`.
  - Padding: field names that start with `_padding` should not be displayed and their data must be ignored by a reader. These fields can be inserted by a writer to ensure correct alignment.

    If the padding field is the last field, then this field will not be logged, to avoid writing unnecessary data. This means the `message_data_s.data` will be shorter by the size of the padding. However the padding is still needed when the message is used in a nested definition.

- 'I': information message.
  ```c
  struct message_info_s {
  struct message_header_s header;
  uint8_t key_len;
  char key[key_len];
  char value[header.msg_size-hdr_size-1-key_len]
};
  ```
  `key` is a plain string, as in the format message (can also be a custom type), but consists of only a single field without ending `;`, eg. `float[3] myvalues`. `value` contains the data as described by `key`.

  Note that an information message with a certain key must occur at most once in the entire log. Parsers can store information messages as a dictionary.

  Predefined information messages are:

| key                                 | Description                                 | Example for value  |
| ----------------------------------- | ------------------------------------------- | ------------------ |
| char[value_len] sys_name          | Name of the system                          | "PX4"              |
| char[value_len] ver_hw            | Hardware version (board)                    | "PX4FMU_V4"        |
| char[value_len] ver_hw_subtype    | Board subversion (variation)                | "V2"               |
| char[value_len] ver_sw            | Software version (git tag)                  | "7f65e01"          |
| char[value_len] ver_sw_branch     | git branch                                  | "master"           |
| uint32_t ver_sw_release           | Software version (see below)                | 0x010401ff         |
| char[value_len] sys_os_name       | Operating System Name                       | "Linux"            |
| char[value_len] sys_os_ver        | OS version (git tag)                        | "9f82919"          |
| uint32_t ver_os_release           | OS version (see below)                      | 0x010401ff         |
| char[value_len] sys_toolchain     | Toolchain Name                              | "GNU GCC"          |
| char[value_len] sys_toolchain_ver | Toolchain Version                           | "6.2.1"            |
| char[value_len] sys_mcu           | Chip name and revision                      | "STM32F42x, rev A" |
| char[value_len] sys_uuid          | Unique identifier for vehicle (eg. MCU ID)  | "392a93e32fa3"...  |
| char[value_len] log_type          | Type of the log (full log if not specified) | "mission"          |
| char[value_len] replay              | File name of replayed log if in replay mode | "log001.ulg"       |
| int32_t time_ref_utc              | UTC Time offset in seconds                  | -3600              |

  The format of `ver_sw_release` and `ver_os_release` is: 0xAABBCCTT, where AA is major, BB is minor, CC is patch and TT is the type. Type is defined as following: `>= 0`: development, `>= 64`: alpha version, `>= 128`: beta version, `>= 192`: RC version, `== 255`: release version. So for example 0x010402ff translates into the release version v1.4.2.

  This message can also be used in the Data section (this is however the preferred section).


- 'M': information message multi.
  ```c
  struct ulog_message_info_multiple_header_s {
      uint8_t is_continued; ///&#060; can be used for arrays
      uint8_t key_len;
      char key[key_len];
      char value[header.msg_size-hdr_size-2-key_len]
  };
  ```
  The same as the information message, except that there can be multiple messages with the same key (parsers store them as a list). The `is_continued` can be used for split-up messages: if set to 1, it is part of the previous message with the same key. Parsers can store all information multi messages as a 2D list, using the same order as the messages occur in the log.

- 'P': parameter message. Same format as `message_info_s`. If a parameter dynamically changes during runtime, this message can also be used in the Data section. The data type is restricted to: `int32_t`, `float`.

- 'Q': parameter default message.
  ```c
  struct ulog_message_parameter_default_header_s {
    struct message_header_s header;
    uint8_t default_types;
    uint8_t key_len;
    char key[key_len];
    char value[header.msg_size-2-key_len]
  };
  ```
  `default_types` is a bitfield and defines to which group(s) the value belongs to. At least one bit must be set:
  - `1<<0`: system wide default
  - `1<<1`: default for the current configuration (e.g. an airframe)

  A log may not contain default values for all parameters. In those cases the default is equal to the parameter value, and different default types are treated independently. This message can also be used in the Data section. The data type is restricted to: `int32_t`, `float`.

This section ends before the start of the first `message_add_logged_s` or `message_logging_s` message, whichever comes first.

### Data Section

The following messages belong to this section:
- 'A': subscribe a message by name and give it an id that is used in `message_data_s`. This must come before the first corresponding `message_data_s`.
  ```c
  struct message_add_logged_s {
      struct message_header_s header;
      uint8_t multi_id;
      uint16_t msg_id;
      char message_name[header.msg_size-hdr_size-3];
  };
  ```
  `multi_id`: the same message format can have multiple instances, for example if the system has two sensors of the same type. The default and first instance must be 0. `msg_id`: unique id to match `message_data_s` data. The first use must set this to 0, then increase it. The same `msg_id` must not be used twice for different subscriptions, not even after unsubscribing. `message_name`: message name to subscribe to. Must match one of the `message_format_s` definitions.

- 'R': unsubscribe a message, to mark that it will not be logged anymore (not used currently).
  ```c
  struct message_remove_logged_s {
      struct message_header_s header;
      uint16_t msg_id;
  };
  ```

- 'D': contains logged data.
  ```
  struct message_data_s {
      struct message_header_s header;
      uint16_t msg_id;
      uint8_t data[header.msg_size-hdr_size];
  };
  ```
  `msg_id`: as defined by a `message_add_logged_s` message. `data` contains the logged binary message as defined by `message_format_s`. See above for special treatment of padding fields.

- 'L': Logged string message, i.e. printf output.
  ```
  struct message_logging_s {
      struct message_header_s header;
      uint8_t log_level;
      uint64_t timestamp;
      char message[header.msg_size-hdr_size-9]
  };
  ```
  `timestamp`: in microseconds, `log_level`: same as in the Linux kernel:

| Name    | Level value | Meaning                          |
| ------- | ----------- | -------------------------------- |
| EMERG   | '0'         | System is unusable               |
| ALERT   | '1'         | Action must be taken immediately |
| CRIT    | '2'         | Critical conditions              |
| ERR     | '3'         | Error conditions                 |
| WARNING | '4'         | Warning conditions               |
| NOTICE  | '5'         | Normal but significant condition |
| INFO    | '6'         | Informational                    |
| DEBUG   | '7'         | Debug-level messages             |

- 'C': Tagged Logged string message
  ```
  struct message_dropout_s {
      struct message_header_s header;
      uint16_t duration;
  };
  ```
  `tag`: id representing source of logged message string. It could represent a process, thread or a class depending upon the system architecture. For example, a reference implementation for an onboard computer running multiple processes to control different payloads, external disks, serial devices etc can encode these process identifiers using a `uint16_t enum` into the tag attribute of `message_logging_tagged_s` struct as follows:

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

  `timestamp`: in microseconds `log_level`: same as in the Linux kernel:

| Name    | Level value | Meaning                          |
| ------- | ----------- | -------------------------------- |
| EMERG   | '0'         | System is unusable               |
| ALERT   | '1'         | Action must be taken immediately |
| CRIT    | '2'         | Critical conditions              |
| ERR     | '3'         | Error conditions                 |
| WARNING | '4'         | Warning conditions               |
| NOTICE  | '5'         | Normal but significant condition |
| INFO    | '6'         | Informational                    |
| DEBUG   | '7'         | Debug-level messages             |

- 'S': synchronization message so that a reader can recover from a corrupt message by searching for the next sync message (not used currently).
  ```
  struct message_sync_s {
      struct message_header_s header;
      uint8_t sync_magic[8];
  };
  ```
  `sync_magic`: to be defined.

- 'O': mark a dropout (lost logging messages) of a given duration in ms. Dropouts can occur e.g. if the device is not fast enough.
  ```
  struct message_dropout_s {
    struct message_header_s header;
    uint16_t duration;
  };
  ```

- 'I': information message. See above.

- 'M': information message multi. See above.

- 'P': parameter message. See above.

- 'Q': parameter message. See above.

## Requirements for Parsers

A valid ULog parser must fulfill the following requirements:
- Must ignore unknown messages (but it can print a warning).
- Parse future/unknown file format versions as well (but it can print a warning).
- Must refuse to parse a log which contains unknown incompatibility bits set (`incompat_flags` of `ulog_message_flag_bits_s` message), meaning the log contains breaking changes that the parser cannot handle.
- A parser must be able to correctly handle logs that end abruptly, in the middle of a message. The unfinished message should just be discarged.
- For appended data: a parser can assume the Data section exists, i.e. the offset points to a place after the Definitions section.

  Appended data must be treated as if it was part of the regular Data section.


## Known Implementations

- PX4 Firmware: C++
  - [logger module](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/logger)
  - [replay module](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/replay)
  - [hardfault_log module](https://github.com/PX4/Firmware/tree/master/src/systemcmds/hardfault_log): append hardfault crash data.
- [pyulog](https://github.com/PX4/pyulog): python, ULog parser library with CLI scripts.
- [FlightPlot](https://github.com/PX4/FlightPlot): Java, log plotter.
- [pyFlightAnalysis](https://github.com/Marxlp/pyFlightAnalysis): Python, log plotter and 3D visualization tool based on pyulog.
- [MAVLink](https://github.com/mavlink/mavlink): Messages for ULog streaming via MAVLink (note that appending data is not supported, at least not for cut off messages).
- [QGroundControl](https://github.com/mavlink/qgroundcontrol): C++, ULog streaming via MAVLink and minimal parsing for GeoTagging.
- [mavlink-router](https://github.com/01org/mavlink-router): C++, ULog streaming via MAVLink.
- [MAVGAnalysis](https://github.com/ecmnet/MAVGCL): Java, ULog streaming via MAVLink and parser for plotting and analysis.
- [PlotJuggler](https://github.com/facontidavide/PlotJuggler): C++/Qt application to plot logs and time series. Supports ULog since version 2.1.3.
- [ulogreader](https://github.com/maxsun/ulogreader): Javascript, ULog reader and parser outputs log in JSON object format.


## File Format Version History

### Changes in version 2

Addition of `ulog_message_info_multiple_header_s` and `ulog_message_flag_bits_s` messages and the ability to append data to a log. This is used to add crash data to an existing log. If data is appended to a log that is cut in the middle of a message, it cannot be parsed with version 1 parsers. Other than that forward and backward compatibility is given if parsers ignore unknown messages.

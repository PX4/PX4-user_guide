---
canonicalUrl: https://docs.px4.io/main/zh/dev_log/ulog_file_format
---

# ULog 文件格式

ULog is the file format used for logging system data. The format is self-describing, i.e. it contains the format and message types that are logged.

It can be used for logging device inputs (sensors, etc.), internal states (cpu load, attitude, etc.) and printf log messages.

It can be used for logging device inputs (sensors, etc.), internal states (cpu load, attitude, etc.) and `printf` log messages.

这种格式对所有的二进制类型采用小端模式。

## 数据类型

使用以下二进制类型。 The following binary types are used. They all correspond to the types in C:

| 类型                  | 大小（以字节为单位） |
| ------------------- | ---------- |
| int8_t, uint8_t   | 1          |
| int16_t, uint16_t | 2          |
| int32_t, uint32_t | 4          |
| int64_t, uint64_t | 8          |
| float               | 4          |
| double              | 8          |
| bool, char          | 1          |

此外，所有的类型还可以作为数组使用，比如 `float[5]`。 Additionally all can be used as an array, eg. `float[5]`. In general all strings (`char[length]`) do not contain a `'\0'` at the end. String comparisons are case sensitive. 字符串比较区分大小写。


## 文件结构

该文件由三个部分组成：
```
----------------------
|         头         |
----------------------
|        定义        |
----------------------
|        数据        |
----------------------
```

### 头部分

头是一个固定大小的部分，具有以下格式（16个字节）：
```
----------------------------------------------------------------------
| 0x55 0x4c 0x6f 0x67 0x01 0x12 0x35 | 0x01         | uint64_t       |
| File magic(7B)                     | Version (1B) |  Timestamp (8B) |
----------------------------------------------------------------------
```

Version 是文件的格式的版本，目前是 1。 Version is the file format version, currently 1. Timestamp is a `uint64_t` integer, denotes the start of the logging in microseconds.


### 定义部分

可变长度部分，包含版本信息、格式定义和 (初始) 参数值。

The Definitions and Data sections consist of a stream of messages. Each starts with this header: 每个数据流包含此标头：
```c
struct message_header_s {
    uint16_t msg_size;
    uint8_t msg_type
};
```

`msg_size` is the size of the message in bytes without the header (`hdr_size`= 3 bytes). `msg_type` defines the content and is one of the following: `msg_type` 定义内容类型，是以下的一种：

- 'B' ：标记 bitset 报文。
  ```
  struct ulog_message_flag_bits_s {
      uint8_t compat_flags[8];
      uint8_t incompat_flags[8];
      uint64_t appended_offsets[3]; ///&#060; file offset(s) for appended data if appending bit is set
  };
  ```
  这条消息**必须**是头后面的第一条消息，这样才有固定的常数偏移量。

  - `compat_flags`: compatible flag bits.
    - `compat_flags[0]`, bit 0, *DEFAULT_PARAMETERS*: if set, the log contains parameter defaults (message 'Q').

    The rest of the bits is currently not defined and all must be set to 0. These bits can be used for future ULog changes that are compatible with existing parsers. It means parsers can just ignore the bits if one of the unknown bits is set.
  - `incompat_flags`: 不兼容的标志位。 `incompat_flags`: incompatible flag bits. The LSB bit of index 0 is set to one if the log contains appended data and at lease one of the `appended_offsets` is non-zero. All other bits are undefined und must be set to 0. If a parser finds one of these bits set, it must refuse to parse the log. This can be used to introduce breaking changes that existing parsers cannot handle. 其他位都是未定义的，必须将设置为 0。 如果解析器发现这些位置 1，它必须拒绝解析日志。 这可用于引入现有解析器无法处理的重大更改。
  - `appended_offsets`: File offsets (0-based) for appended data. If no data is appended, all offsets must be zero. This can be used to reliably append data for logs that may stop in the middle of a message. A process appending data should do: 如果没有附加数据，则所有偏移量必须为零。 这可以用于消息中途暂停的情况下可靠的添加数据。

    附加数据的过程应该做到：
    - 置位相关的 `incompat_flags` 位，
    - 设置 `append_offsets` 的第一个元素为日志文件相对于 0 的长度，
    - 然后为数据部分添加有效的任何类型的消息。

  It is possible that there are more fields appended at the end of this message in future ULog specifications. This means a parser must not assume a fixed length of this message. If the message is longer than expected (currently 40 bytes), the exceeding bytes must just be ignored. 这意味着解析器必须不能假定此消息的长度是固定的。 如果消息比预期的长（当前为 40 字节），则必须忽略超过的字节。


- 'F': 可以在另一个定义中作为嵌套类型记录或使用的单个 (组合) 类型的格式定义。
  ```
  struct message_format_s {
  struct message_header_s header;
  char format[header.msg_size-hdr_size];
};
  ```
  `format`: plain-text string with the following format: `message_name:field0;field1;` There can be an arbitrary amount of fields (at least 1), separated by `;`. A field has the format: `type field_name` or `type[array_length] field_name` for arrays (only fixed size arrays are supported). `type` is one of the basic binary types or a `message_name` of another format definition (nested usage). A type can be used before it's defined. There can be arbitrary nesting but no circular dependencies. 字段的格式为：`type field_name` 或者 `type[array_length] field_name` 数组（只支持固定大小的数组）。 `type` 是一种基本的二进制类型或者是 `message_name` 的其他类型定义（嵌套使用）。 一个类型可以在定义之前使用。 可以任意嵌套，但没有循环依赖。

  有些字段名是特殊的：
  - `timestamp`：每个消息报文 (`message_add_logged_s`) 必须包含时间戳字段 (不必是第一个字段)。 它的类型可以是：`uint64_t` (目前唯一使用的)，`uint32_t`, `uint16_t` 或者是 `uint8_t` 。 它的单位一直是微秒，除了 `uint8_t`，它的单位是毫秒。 日志写入器必须确保足够频繁的写入报文使其能够检测到绕回，并且日志的读取器必须能够处理绕回 (还要把丢帧考虑在内)。 对于具有相同 `msg_id` 报文的时间戳必须是单调递增的。
  - Padding: field names that start with `_padding` should not be displayed and their data must be ignored by a reader. These fields can be inserted by a writer to ensure correct alignment. 写入器可以通过插入这个字段确保正确对齐。

    If the padding field is the last field, then this field will not be logged, to avoid writing unnecessary data. This means the `message_data_s.data` will be shorter by the size of the padding. However the padding is still needed when the message is used in a nested definition. 这意味着 `message_data_s.data` 会因为填充大小而更短。 但是当报文在嵌套定义中使用时任然需要填充。

- 'I'：信息报文。
  ```c
  struct message_info_s {
  struct message_header_s header;
  uint8_t key_len;
  char key[key_len];
  char value[header.msg_size-hdr_size-1-key_len]
};
  ```
  `key` is a plain string, as in the format message (can also be a custom type), but consists of only a single field without ending `;`, eg. `float[3] myvalues`. `value` contains the data as described by `key`. `float[3] myvalues`. `value` 包含 `key` 所描述的字段

  Note that an information message with a certain key must occur at most once in the entire log. Parsers can store information messages as a dictionary. 解析器可以将报文信息存储为字典。

  预定义的信息报文有：

| 键                                   | 描述                                          | 示例值                |
| ----------------------------------- | ------------------------------------------- | ------------------ |
| char[value_len] sys_name          | 系统名称                                        | "PX4"              |
| char[value_len] ver_hw            | 硬件版本 (主板)                                   | "PX4FMU_V4"        |
| char[value_len] ver_hw_subtype    | 主办子版本 (变化的)                                 | "V2"               |
| char[value_len] ver_sw            | 软件版本 (git 标签)                               | "7f65e01"          |
| char[value_len] ver_sw_branch     | git branch                                  | "master"           |
| uint32_t ver_sw_release           | 软件版本 (见下文)                                  | 0x010401ff         |
| char[value_len] sys_os_name       | 操作系统名称                                      | "Linux"            |
| char[value_len] sys_os_ver        | 操作系统版本 (git 标签)                             | "9f82919"          |
| uint32_t ver_os_release           | 操作系统版本 (见下文)                                | 0x010401ff         |
| char[value_len] sys_toolchain     | 工具链名称                                       | "GNU GCC"          |
| char[value_len] sys_toolchain_ver | 工具链版本                                       | "6.2.1"            |
| char[value_len] sys_mcu           | 芯片名称和修订                                     | "STM32F42x, rev A" |
| char[value_len] sys_uuid          | Unique identifier for vehicle (eg. MCU ID)  | "392a93e32fa3"...  |
| char[value_len] log_type          | Type of the log (full log if not specified) | "mission"          |
| char[value_len] replay              | 重播日志的文件名如果处于重播模式                            | "log001.ulg"       |
| int32_t time_ref_utc              | UTC 时间的秒偏移量                                 | -3600              |

  The format of `ver_sw_release` and `ver_os_release` is: 0xAABBCCTT, where AA is major, BB is minor, CC is patch and TT is the type. Type is defined as following: `>= 0`: development, `>= 64`: alpha version, `>= 128`: beta version, `>= 192`: RC version, `== 255`: release version. So for example 0x010402ff translates into the release version v1.4.2. Type is defined as following: `>= 0`: development, `>= 64`: alpha version, `>= 128`: beta version, `>= 192`: RC version, `== 255`: release version. 所以例如 0x010402ff 转换过来是 v1.4.2 的 release 版本。

  This message can also be used in the Data section (this is however the preferred section).


- 'M'：多报文信息。
  ```c
  struct ulog_message_info_multiple_header_s {
      uint8_t is_continued; ///&#060; can be used for arrays
      uint8_t key_len;
      char key[key_len];
      char value[header.msg_size-hdr_size-2-key_len]
  };
  ```
  The same as the information message, except that there can be multiple messages with the same key (parsers store them as a list). The `is_continued` can be used for split-up messages: if set to 1, it is part of the previous message with the same key. Parsers can store all information multi messages as a 2D list, using the same order as the messages occur in the log. `is_continued` 可以用于分割报文：如果置 1，则它是具有相同键的前一条报文的一部分。 解析器可以将所有多报文信息存储为一个 2D 列表，使用与日志中报文相同的顺序。

- 'P'：报文参数。 格式与 `message_info_s` 相同。 'P': parameter message. Same format as `message_info_s`. If a parameter dynamically changes during runtime, this message can also be used in the Data section. The data type is restricted to: `int32_t`, `float`. 数据类型限制为：`int32_t`，`float` 。

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

这部分在第一个 `message_add_logged_s` 或者 `message_logging_s` 开始之前结束 (以先出现的消息为准) 。

### 数据部分

以下消息属于本部分：
- 'A': subscribe a message by name and give it an id that is used in `message_data_s`. This must come before the first corresponding `message_data_s`. 这必须在第一个对应的 `message_data_s` 之前。
  ```c
  struct message_add_logged_s {
      struct message_header_s header;
      uint8_t multi_id;
      uint16_t msg_id;
      char message_name[header.msg_size-hdr_size-3];
  };
  ```
  `multi_id`: the same message format can have multiple instances, for example if the system has two sensors of the same type. The default and first instance must be 0. `msg_id`: unique id to match `message_data_s` data. The first use must set this to 0, then increase it. The same `msg_id` must not be used twice for different subscriptions, not even after unsubscribing. `message_name`: message name to subscribe to. Must match one of the `message_format_s` definitions. 默认值以及第一个实例一定是0. `msg_id`：匹配 `message_data_s` 数据的惟一 id。 第一次使用一定要设置为 0，然后递增。 相同的 `msg_id` 不能用于两次不同的订阅，甚至在取消订阅后也不行。 `msg_name`：订阅的消息名称。 必须匹配其中一个 `message_format_s` 的定义。

- 'R'：取消订阅一条消息，以标记它将不再被记录 (当前未使用)。
  ```c
  struct message_remove_logged_s {
      struct message_header_s header;
      uint16_t msg_id;
  };
  ```

- 'D'：包含日志数据。
  ```
  struct message_data_s {
      struct message_header_s header;
      uint16_t msg_id;
      uint8_t data[header.msg_size-hdr_size];
  };
  ```
  `msg_id`：由 `message_add_logged_s` 报文定义。 `msg_id`: as defined by a `message_add_logged_s` message. `data` contains the logged binary message as defined by `message_format_s`. See above for special treatment of padding fields. 有关填充字段的特殊处理，请参见上文。

- 'L'：字符串日志报文，比如打印输出。
  ```
  struct message_logging_s {
      struct message_header_s header;
      uint8_t log_level;
      uint64_t timestamp;
      char message[header.msg_size-hdr_size-9]
  };
  ```
  `timestamp`: 以微秒为单位，`log_level`: 和 Linux 内核一样。

| 名称      | 对应值 | 含义       |
| ------- | --- | -------- |
| EMERG   | '0' | 系统无法使用   |
| ALERT   | '1' | 操作必须立即执行 |
| CRIT    | '2' | 紧急情况     |
| ERR     | '3' | 错误情况     |
| WARNING | '4' | 警告情况     |
| NOTICE  | '5' | 正常但重要的情况 |
| INFO    | '6' | 信息       |
| DEBUG   | '7' | 调试级别的消息  |

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

  `timestamp`: every logged message (`message_add_logged_s`) must include a timestamp field (does not need to be the first field). Its type can be: `uint64_t` (currently the only one used), `uint32_t`, `uint16_t` or `uint8_t`. The unit is always microseconds, except for `uint8_t` it's milliseconds. A log writer must make sure to log messages often enough to be able to detect wrap-arounds and a log reader must handle wrap-arounds (and take into account dropouts). The timestamp must always be monotonic increasing for a message serie with the same `msg_id`.

| 参数名     | 对应值 | 含义       |
| ------- | --- | -------- |
| EMERG   | '0' | 系统无法使用   |
| ALERT   | '1' | 操作必须立即执行 |
| CRIT    | '2' | 紧急情况     |
| ERR     | '3' | 错误情况     |
| WARNING | '4' | 警告情况     |
| NOTICE  | '5' | 正常但重要的情况 |
| INFO    | '6' | 信息       |
| DEBUG   | '7' | 调试级别的消息  |

- 'S': synchronization message so that a reader can recover from a corrupt message by searching for the next sync message (not used currently).
  ```
  struct message_sync_s {
      struct message_header_s header;
      uint8_t sync_magic[8];
  };
  ```
  `sync_magic`: to be defined.

- 'O': mark a dropout (lost logging messages) of a given duration in ms. Dropouts can occur e.g. if the device is not fast enough. 例如当设备不够快的情况下会出现丢包。
  ```
  struct message_dropout_s {
    struct message_header_s header;
    uint16_t duration;
  };
  ```

- 'I': information message. See above. 见上文。

- 'M': information message multi. See above. 见上文。

- 'P': parameter message. See above. 见上文。

- 'Q': parameter message. See above.

## 解析器的要求

一个有效的 ULog 解析器必须满足以下要求:
- 必须忽略未知消息 (但可以打印警告) 。
- 解析未来/未知的文件格式版本 (但可以打印警告) 。
- 必须拒绝解析包含未知不兼容位集 (`ulog_message_flag_bits_s` 报文中的 `incompat_flags`) 的日志，这意味着日志包含解析器无法处理的突发改变。
- A parser must be able to correctly handle logs that end abruptly, in the middle of a message. The unfinished message should just be discarged. 未完成的报文应该丢弃。
- 对于附加数据:解析器可以假设数据部分存在，即在定义部分之后的位置有一个偏移点。

  必须将附加数据视为常规数据部分的一部分。


## 已知的实现

- PX4 Firmware: C++
  - [日志模块](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/logger)
  - [回放模块](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/replay)
  - [hardfault_log module](https://github.com/PX4/Firmware/tree/master/src/systemcmds/hardfault_log): append hardfault crash data.
- [pyulog](https://github.com/PX4/pyulog)：Python，使用 CLI 脚本的 Ulog 解析库。
- [FlightPlot](https://github.com/PX4/FlightPlot): Java，日志绘图仪。
- [pyFlightAnalysis](https://github.com/Marxlp/pyFlightAnalysis)：Python，日志绘图仪和基于 pyulog 的三维可视化工具。
- [MAVLink](https://github.com/mavlink/mavlink)：通过 MAVLink 进行 ULog 流的消息 (注意，不支持追加数据，至少不支持截断消息)。
- [QGroundControl](https://github.com/mavlink/qgroundcontrol)：C++，通过 MAVLink 的 Ulog 流和最小的 GeoTagging。
- [mavlink-router](https://github.com/01org/mavlink-router)：C++，通过 MAVLink 的 ULog 流。
- [MAVGAnalysis](https://github.com/ecmnet/MAVGCL)：Java，通过 MAVLink 的数据流和日志的绘制、分析。
- [PlotJuggler](https://github.com/facontidavide/PlotJuggler): 绘制日志和时间序列的 C++/Qt 应用。 自版本2.1.3支持 ULog。
- [ulogreader](https://github.com/maxsun/ulogreader): Javascript, ULog reader and parser outputs log in JSON object format.


## 文件格式版本历史

### 版本 2 中的改变

Addition of `ulog_message_info_multiple_header_s` and `ulog_message_flag_bits_s` messages and the ability to append data to a log. This is used to add crash data to an existing log. If data is appended to a log that is cut in the middle of a message, it cannot be parsed with version 1 parsers. Other than that forward and backward compatibility is given if parsers ignore unknown messages. 这被用来给现有的日志添加损坏的数据。 如果从中间切开的报文数据被附加到日志中，这不能被版本 1 解析器解析。 除此之外，如果解析器忽略未知消息，则提供向前和向后的兼容性。

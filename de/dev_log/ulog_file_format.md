---
canonicalUrl: https://docs.px4.io/main/de/dev_log/ulog_file_format
---

# ULog File Format

ULog is the file format used for logging system data.

The format is self-describing, i.e. it contains the format and message types that are logged (note that the [system logger](../dev_log/logging.md) allows the *default set* of logged topics to be replaced from an SD card).

It can be used for logging device inputs (sensors, etc.), internal states (cpu load, attitude, etc.) and `printf` log messages.

The format uses Little Endian for all binary types.

## Data types

The following binary types are used. They all correspond to the types in C:

| Type                | Size in Bytes |
| ------------------- | ------------- |
| int8_t,  uint8_t  | 1             |
| int16_t, uint16_t | 2             |
| int32_t, uint32_t | 4             |
| int64_t, uint64_t | 8             |
| float               | 4             |
| double              | 8             |
| bool, char          | 1             |

Additionally all can be used as an array, eg. `float[5]`. In general all strings (`char[length]`) do not contain a `'\0'` at the end. String comparisons are case sensitive.


## File structure

The file consists of three sections:
```
----------------------
|       Header       |
----------------------
|    Definitions     |
----------------------
|        Data        |
----------------------
```

### Header Section

The header is a fixed-size section and has the following format (16 bytes):
```
----------------------------------------------------------------------
| 0x55 0x4c 0x6f 0x67 0x01 0x12 0x35 | 0x01         | uint64_t       |
| File magic (7B)                    | Version (1B) | Timestamp (8B) |
----------------------------------------------------------------------
```

Version is the file format version, currently 1. Timestamp is a `uint64_t` integer, denotes the start of the logging in microseconds.


### Definitions Section

Variable length section, contains version information, format definitions, and (initial) parameter values.

The Definitions and Data sections consist of a stream of messages. Each starts with this header:
```c
struct message_header_s {
    uint16_t msg_size;
    uint8_t msg_type
};
```

`msg_size` is the size of the message in bytes without the header (`hdr_size`= 3 bytes). `msg_type` defines the content and is one of the following:

- 'B': Flag bitset message.
  ```
  struct ulog_message_flag_bits_s {
    struct message_header_s;
    uint8_t compat_flags[8];
    uint8_t incompat_flags[8];
    uint64_t appended_offsets[3]; ///< file offset(s) for appended data if appending bit is set
  };
  ```
  This message **must** be the first message, right after the header section, so that it has a fixed constant offset.

  - `compat_flags`: compatible flag bits.
    - `compat_flags[0]`, bit 0, *DEFAULT_PARAMETERS*: if set, the log contains parameter defaults (message 'Q').

    The rest of the bits is currently not defined and all must be set to 0. These bits can be used for future ULog changes that are compatible with existing parsers. It means parsers can just ignore the bits if one of the unknown bits is set.
  - `incompat_flags`: incompatible flag bits. The LSB bit of index 0 is set to one if the log contains appended data and at least one of the `appended_offsets` is non-zero. All other bits are undefined and must be set to 0. If a parser finds one of these bits set, it must refuse to parse the log. This can be used to introduce breaking changes that existing parsers cannot handle.
  - `appended_offsets`: File offsets (0-based) for appended data. If no data is appended, all offsets must be zero. This can be used to reliably append data for logs that may stop in the middle of a message.

    A process appending data should do:
    - set the relevant `incompat_flags` bit,
    - set the first `appended_offsets` that is 0 to the length of the log file,
    - then append any type of messages that are valid for the Data section.

  It is possible that there are more fields appended at the end of this message in future ULog specifications. This means a parser must not assume a fixed length of this message. If the message is longer than expected (currently 40 bytes), the exceeding bytes must just be ignored.


- 'F': format definition for a single (composite) type that can be logged or used in another definition as a nested type.
  ```
  struct message_format_s {
    struct message_header_s header;
    char format[header.msg_size];
  };
  ```
  `format`: plain-text string with the following format: `message_name:field0;field1;` There can be an arbitrary amount of fields (at least 1), separated by `;`. A field has the format: `type field_name` or `type[array_length] field_name` for arrays (only fixed size arrays are supported). `type` is one of the basic binary types or a `message_name` of another format definition (nested usage). A type can be used before it's defined. There can be arbitrary nesting but no circular dependencies.

  Some field names are special:
  - `timestamp`: every logged message (`message_add_logged_s`) must include a timestamp field (does not need to be the first field). Its type can be: `uint64_t` (currently the only one used), `uint32_t`, `uint16_t` or `uint8_t`. The unit is always microseconds, except for in `uint8_t` it's milliseconds. A log writer must make sure to log messages often enough to be able to detect wrap-arounds and a log reader must handle wrap-arounds (and take into account dropouts). The timestamp must always be monotonic increasing for a message series with the same `msg_id`.
  - Padding: field names that start with `_padding` should not be displayed and their data must be ignored by a reader. These fields can be inserted by a writer to ensure correct alignment.

    If the padding field is the last field, then this field will not be logged, to avoid writing unnecessary data. This means the `message_data_s.data` will be shorter by the size of the padding. However the padding is still needed when the message is used in a nested definition.

- 'I': information message.
  ```c
  struct message_info_s {
    struct message_header_s header;
    uint8_t key_len;
    char key[key_len];
    char value[header.msg_size-1-key_len]
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
    struct message_header_s header;
    uint8_t is_continued; ///< can be used for arrays
    uint8_t key_len;
    char key[key_len];
    char value[header.msg_size-2-key_len]
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
    char message_name[header.msg_size-3];
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
    uint8_t data[header.msg_size-2];
  };
  ```
  `msg_id`: as defined by a `message_add_logged_s` message. `data` contains the logged binary message as defined by `message_format_s`. See above for special treatment of padding fields.

- 'L': Logged string message, i.e. printf output.
  ```
  struct message_logging_s {
    struct message_header_s header;
    uint8_t log_level;
    uint64_t timestamp;
    char message[header.msg_size-9]
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
  struct message_logging_tagged_s {
    struct message_header_s header;
    uint8_t log_level;
    uint16_t tag;
    uint64_t timestamp;
    char message[header.msg_size-9]
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

- 'S': synchronization message so that a reader can recover from a corrupt message by searching for the next sync message.
  ```
  struct message_sync_s {
    struct message_header_s header;
    uint8_t sync_magic[8];
  };
  ```
  `sync_magic`: [0x2F, 0x73, 0x13, 0x20, 0x25, 0x0C, 0xBB, 0x12]

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
- A parser must be able to correctly handle logs that end abruptly, in the middle of a message. The unfinished message should just be discarded.
- For appended data: a parser can assume the Data section exists, i.e. the offset points to a place after the Definitions section.

  Appended data must be treated as if it was part of the regular Data section.


## Known Implementations

- PX4-Autopilot: C++
  - [logger module](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/logger)
  - [replay module](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/replay)
  - [hardfault_log module](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/hardfault_log): append hardfault crash data.
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

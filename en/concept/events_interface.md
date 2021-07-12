# Events Interface

The *Events Interface* provides a system-wide API to inform a user about certain events.
It is meant to replace existing usage of `mavlink_log_*` calls.

## Usage
### Basic
To use the API, add this include:
```cpp
#include <px4_platform_common/events.h>
```
And then define and send the event from the desired code location:
```cpp
events::send(events::ID("mymodule_test"), events::Log::Info, "Test Message");
```

#### Backward compatibility
For older GCS versions without events interface support, PX4 currently sends out all events also as `mavlink_log_*` `STATUSTEXT` message.
In addition, the message must be tagged with an appended tab (`\t`) so that newer GCS's can ignore that and only show the event.

So whenever adding an event, be sure to also add a `mavlink_log_` call. For example:
```cpp
mavlink_log_info(mavlink_log_pub, "Test Message\t");
events::send(events::ID("mymodule_test"), events::Log::Info, "Test Message");
```
All such `mavlink_log_` calls will be removed after the next release.

### Detailed
The above is a minimal example, this is a more extensive one:
```cpp
uint8_t arg1 = 0;
float arg2 = -1.f;
/* EVENT
 * @description
 * This is the detailed event description.
 *
 * - value of arg1: {1}
 * - value of arg2: {2:.1}
 *
 * <profile name="dev">
 * (This paragraph is only meant to be shown to developers).
 * This behavior can be configured with the parameter <param>COM_EXAMPLE</param>.
 * </profile>
 *
 * Link to documentation: <a>https://docs.px4.io</a>
 */
events::send<uint8_t, float>(events::ID("event_name"),
	{events::Log::Error, events::LogInternal::Info}, "Event Message", arg1, arg2);
```

Explanations and requirements:
- `/* EVENT`: this is an indicator for the parser that there is additional metadata following as comment.
- **event_name**: the event name.
  - must be unique within the whole source code of PX4.
    As a general convention, prefix it with the module name, or the source file for larger modules.
  - must be a valid variable name, i.e. must not contain spaces, colons, etc.
  - from that name, a 24 bit event ID is derived using a hash function.
    This means as long as the event name stays the same, the ID is as well.
- **Log Level**:
  - valid log levels are (in descending importance):
    ```
	Emergency,
	Alert,
	Critical,
	Error,
	Warning,
	Notice,
	Info,
	Debug,
	Disabled,
	```
  - It is possible to specify an internal log level (for the log file) that is different from the external (that is shown to the GCS user).
    By default (if only a single log level is passed), both are the same, which is the majority of the use-cases.
	However in some cases it makes sense to have two different log levels, for example an RTL failsafe action: the user should see it as Warning/Error, whereas in the log, it is an expected system response, so it can be set to Info.
- **Event Message**:
  - Single-line, short description of the event. It may contain arguments (see below).
- **Event Description**:
  - detailed, optional event description.
  - can be multiple lines/paragraphs.

#### Arguments and Enums
Events can have a fixed set of arguments that can be shown in the message or description.

Valid types: `uint8_t`, `int8_t`, `uint16_t`, `int16_t`, `uint32_t`, `int32_t`, `uint64_t`, `int64_t` and `float`.

It is also possible to define and use custom enumerations.
These are defined in [src/lib/events/enums.json](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/events/enums.json), and can then be used as event argument in the form of `events::send<events::px4::enums::my_enum_t>(...)`.

#### Text format
Text format for event message description:
- characters can be escaped with \\

  These have to be escaped: '\\\\', '\\<', '\\{'.
- supported tags:
  - Profiles: `<profile name="[!]NAME">CONTENT</profile>`

    `CONTENT` will only be shown if the name matches the configured profile.
	This can be used for example to hide developer information from end-users.
  - URLs: `<a [href="URL"]>CONTENT</a>`.
    If href is not set, use `CONTENT` as `URL`
  - Parameters: `<param>PARAM_NAME</param>`
  - no nested tags of the same type are allowed
- arguments: following python syntax, with 1-based indexing (instead of 0)
  - general form: `{ARG_IDX[:.NUM_DECIMAL_DIGITS][UNIT]}`

    UNIT:
      - m: horizontal distance in meters
      - m_v: vertical distance in meters
      - m^2: area in m^2
      - m/s: speed in m/s
      - C: temperature in degrees celcius

## Logging
Events are logged according to the internal log level, and [Flight Review](../log/flight_review.md) displays events.

:::note
Flight review downloads metadata based on PX4 master, so if a definition is not yet on master, it will only be able to display the event ID.
:::


## Implementation
During build, only the event ID, log level(s) and arguments (if any) are added to the binary by the compiler.
At the same time, a python script scans the whole source code for event calls, extracts the metadata and assembles a JSON metadata file.

As for parameter metadata, the events metadata is [compiled into the firmware](../advanced/parameters_and_configurations.md#publishing-parameter-metadata-to-a-gcs),
and made available to ground stations via the [MAVLink Component Information service](https://mavlink.io/en/services/component_information.html).



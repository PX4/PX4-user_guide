---
canonicalUrl: https://docs.px4.io/main/ja/msg_docs/event
---

# event (UORB message)

Events interface

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/event.msg)

```c
# Events interface
uint64 timestamp            # time since system start (microseconds)

uint32 id                   # Event ID
uint16 event_sequence       # Event sequence number
uint8[25] arguments         # (optional) arguments, depend on event id

uint8 log_levels            # Log levels: 4 bits MSB: internal, 4 bits LSB: external

uint8 ORB_QUEUE_LENGTH = 8

```

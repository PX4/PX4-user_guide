---
canonicalUrl: https://docs.px4.io/main/ko/msg_docs/log_message
---

# log_message (UORB message)

A logging message, output with PX4_{WARN,ERR,INFO}

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/log_message.msg)

```c
# A logging message, output with PX4_{WARN,ERR,INFO}

uint64 timestamp        # time since system start (microseconds)

uint8 severity # log level (same as in the linux kernel, starting with 0)
char[127] text

uint8 ORB_QUEUE_LENGTH = 4

```

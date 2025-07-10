---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/button_event
---

# button_event (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/button_event.msg)

```c
uint64 timestamp			# time since system start (microseconds)
bool triggered				# Set to true if the event is triggered

# TOPICS button_event safety_button

uint8 ORB_QUEUE_LENGTH = 2
```

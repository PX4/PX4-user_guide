---
canonicalUrl: https://docs.px4.io/main/ru/msg_docs/mission
---

# mission (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/mission.msg)

```c
uint64 timestamp    # time since system start (microseconds)
uint8 dataman_id    # default 0, there are two offboard storage places in the dataman: 0 or 1

uint16 count        # count of the missions stored in the dataman
int32 current_seq   # default -1, start at the one changed latest

```

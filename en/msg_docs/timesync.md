---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/timesync
---

# timesync (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/timesync.msg)

```c
uint64 timestamp	       # time since system start (microseconds)
uint8 seq		       # timesync msg sequence
int64 tc1		       # time sync timestamp 1
int64 ts1		       # time sync timestamp 2

```

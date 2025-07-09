---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/DatamanRequest
---

# DatamanRequest (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/DatamanRequest.msg)

```c
uint64 timestamp    # time since system start (microseconds)

uint8 client_id
uint8 request_type  # id/read/write/clear
uint8 item          # dm_item_t
uint32 index
uint8[56] data
uint32 data_length
```

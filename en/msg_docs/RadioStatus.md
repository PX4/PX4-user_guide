---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/RadioStatus
---

# RadioStatus (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/RadioStatus.msg)

```c

uint64 timestamp	# time since system start (microseconds)

uint8 rssi				# local signal strength
uint8 remote_rssi			# remote signal strength

uint8 txbuf				# how full the tx buffer is as a percentage
uint8 noise				# background noise level

uint8 remote_noise			# remote background noise level
uint16 rxerrors				# receive errors

uint16 fix				# count of error corrected packets

```

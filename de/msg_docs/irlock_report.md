---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/irlock_report
---

# irlock_report (UORB message)

IRLOCK_REPORT message data

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/irlock_report.msg)

```c
# IRLOCK_REPORT message data

uint64 timestamp        # time since system start (microseconds)

uint16 signature

# When looking along the optical axis of the camera, x points right, y points down, and z points along the optical axis.
float32 pos_x # tan(theta), where theta is the angle between the target and the camera center of projection in camera x-axis
float32 pos_y # tan(theta), where theta is the angle between the target and the camera center of projection in camera y-axis
float32 size_x #/** size of target along camera x-axis in units of tan(theta) **/
float32 size_y #/** size of target along camera y-axis in units of tan(theta) **/

```

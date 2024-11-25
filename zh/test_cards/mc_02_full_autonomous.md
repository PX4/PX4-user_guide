# 测试 MC_02-完全自主

## 创建和上传任务

❏ 任务标准

&nbsp;&nbsp;&nbsp;&nbsp;❏ Auto take-off

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ First waypoint set to Takeoff

&nbsp;&nbsp;&nbsp;&nbsp;❏ Enable Mission End RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 5 to 6 minutes

❏ Upload mission to vehicle using _QGroundControl_

## 解锁并起飞

❏ 在任何手动模式下解锁

❏ 接合自动触发起飞

❏ 观察跟踪，转弯和正确的 RTL 性能

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## 预期成果

- 当油门升高时，起飞应该是平稳的
- 任务应该在第一次尝试时上传
- 使用 Auto 时飞机应自动起飞
- 着陆时，直升机不应在地面上反弹

<!--
MC_002 - Full autonomous

-	Make sure the auto-disarm is enabled
-	QGC open test1_mission.plan and sync to the vehicle
-	Takeoff from QGC start mission slider
-	Check the vehicle completes the mission
-	Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-	Check the vehicle disarms by itself.
-->

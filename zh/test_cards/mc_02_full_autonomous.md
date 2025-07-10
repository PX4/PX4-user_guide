---
canonicalUrl: https://docs.px4.io/main/zh/test_cards/mc_02_full_autonomous
---

# 测试 MC_02-完全自主

## 创建和上传任务

❏ 任务标准

&nbsp;&nbsp;&nbsp;&nbsp;❏ 自动起飞

&nbsp;&nbsp;&nbsp;&nbsp;❏ 整个任务期间高度的变化

&nbsp;&nbsp;&nbsp;&nbsp;❏ 第一个航点设置为起飞

&nbsp;&nbsp;&nbsp;&nbsp;❏ 启用 Mission End RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ 持续时间为 5 到 6 分钟

❏ 使用 *QGroundControl* 将任务上传到无人机


## 解锁并起飞

❏ 手臂处于任何手动模式

❏ 接合自动触发起飞

❏ 观察跟踪，转弯和正确的 RTL 性能

❏ 接地后，旋翼机应在 2 秒内自动撤防（撤防时间由参数设置：[COM_DISARM_LAND](../advanced/parameter_reference.md#COM_DISARM_LAND)）



## 预期成果

* 当油门升高时，起飞应该是平稳的
* 任务应该在第一次尝试时上传
* 使用 Auto 时飞机应自动起飞
* 着陆时，直升机不应在地面上反弹




<!-- 
MC_002 - Full autonomous

-   Make sure the auto-disarm is enabled
-   QGC open test1_mission.plan and sync to the vehicle
-   Takeoff from QGC start mission slider
-   Check the vehicle completes the mission
-   Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-   Check the vehicle disarms by itself.
-->

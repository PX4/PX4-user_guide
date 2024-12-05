# 测试 MC_03 - 自动手动混合

## 创建和上传任务

❏ 任务标准

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ Mission should end in the air and NOT Land/RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 3 to 4 minutes

❏ Upload mission to vehicle using _QGroundControl_

## 飞行

❏ 位置模式下的摆臂和起飞

❏ 参与自动模式

❏ 观察跟踪和转弯

❏ 任务完成后，切换回位置模式

&nbsp;&nbsp;&nbsp;&nbsp;❏ Horizontal position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Vertical position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response set to Pitch/Roll/Yaw rates

❏ 启动返航

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## 预期成果

- 当油门升高时，起飞应该是平稳的
- 在上述任何飞行模式中都不应出现振荡
- 着陆时，直升机不应在地面上反弹

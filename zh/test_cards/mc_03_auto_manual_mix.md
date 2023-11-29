# 测试 MC_03 - 自动手动混合

## 创建和上传任务

❏ 任务标准

&nbsp;&nbsp;&nbsp;&nbsp;❏ 整个任务期间高度的变化

&nbsp;&nbsp;&nbsp;&nbsp;❏ 任务应该在空中结束，而不是Land/RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ 持续时间为 3 到 4 分钟

❏ 使用* QGroundControl *将任务上传到无人机

## 飞行

❏ 位置模式下的摆臂和起飞

❏ 参与自动模式

❏ 观察跟踪和转弯

❏ 任务完成后，切换回位置模式

&nbsp;&nbsp;&nbsp;&nbsp;❏ 水平位置应以棒为中心保持当前值不变

&nbsp;&nbsp;&nbsp;&nbsp;❏ 垂直位置应以棒为中心保持当前值

&nbsp;&nbsp;&nbsp;&nbsp;❏ 将油门响应设置为爬升/下降速率

&nbsp;&nbsp;&nbsp;&nbsp;❏ 俯仰/翻转/偏航响应设置为俯仰/翻滚/偏航率

❏ 启动返航

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## 预期成果

- 当油门升高时，起飞应该是平稳的
- 在上述任何飞行模式中都不应出现振荡
- 着陆时，直升机不应在地面上反弹

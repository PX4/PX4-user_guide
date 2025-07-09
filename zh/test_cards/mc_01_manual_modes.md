---
canonicalUrl: https://docs.px4.io/main/zh/test_cards/mc_01_manual_modes
---

# 测试 MC_01 - 手动模式

## 解锁并起飞

❏ 设置飞行模式以稳定和布防

❏ 升高油门起飞


## 飞行

❏ 自稳

&nbsp;&nbsp;&nbsp;&nbsp;❏ 俯仰/滚转/偏航响应 1：1

&nbsp;&nbsp;&nbsp;&nbsp;❏ 节气门响应 1：1

❏ 高度

&nbsp;&nbsp;&nbsp;&nbsp;❏ 垂直位置应以棒为中心保持当前值

&nbsp;&nbsp;&nbsp;&nbsp;❏ 俯仰/滚转/偏航响应 1：1

&nbsp;&nbsp;&nbsp;&nbsp;❏ 将节气门响应设置为爬升/下降速率

❏ 定点

&nbsp;&nbsp;&nbsp;&nbsp;❏ 水平位置应以棒为中心保持当前值

&nbsp;&nbsp;&nbsp;&nbsp;❏ 垂直位置应以棒为中心保持当前值

&nbsp;&nbsp;&nbsp;&nbsp;❏ 将节气门响应设置为爬升/下降速率

&nbsp;&nbsp;&nbsp;&nbsp;❏ 俯仰/翻转/偏航响应设置为俯仰/翻滚/偏航率


## 着陆

❏ 降落位置模式，油门低于 40％

❏ 接地后，直升机应在 2 秒内自动撤防（撤防时间由参数设置：[COM_DISARM_LAND](../advanced/parameter_reference.md#COM_DISARM_LAND)）


## 预期成果

* 当油门升高时，起飞应该是平稳的
* 在上述任何飞行模式中都不应出现振荡
* 着陆时，直升机不应在地面上反弹

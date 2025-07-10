---
canonicalUrl: https://docs.px4.io/main/zh/test_cards/mc_05_indoor_flight_manual_modes
---

# 测试 MC_05-室内飞行（手动模式）

## 何时使用此测试卡

* 新建初次飞行
* 当需要在受限区域复制问题时
* 可能存在稳定性问题的实验性构建
* 测试已更换和/或修改的硬件

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

## 着陆

❏ 以稳定或高度模式着陆，油门低于 40％

❏ 接地后，直升机应在 2 秒内自动撤防（撤防时间由参数设置：[COM_DISARM_LAND](../advanced/parameter_reference.md#COM_DISARM_LAND)）

## 期待的结果

* 当油门升高时，起飞应该是平稳的
* 在上述任何飞行模式中都不应出现振荡
* 着陆时，直升机不应在地面上反弹

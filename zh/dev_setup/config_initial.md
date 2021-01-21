# 初始配置

我们建议开发者们获取下文描述的基本配置的硬件设备（或者相似的设备）并使用"默认" [机架](../airframes/airframe_reference.md) 构型。

## 基本设备

:::tip PX4 can be used with a much wider range of equipment than described here, but new developers will benefit from going with one of the standard setups. A Taranis RC plus a Note 4 tablet make up for a very inexpensive field kit.
:::

飞机配置流程：

* 一个供安全飞行员（或等效职能人员）使用的 Taranis Plus Rm 遥控器
* 开发用计算机：
  * MacBook Pro （2015 年初及以后），OSX 10.13 或者更高版本
  * Lenovo Thinkpad 450 (i5)，Ubuntu Linux 16.04 或者更高版本
* 一个地面控制站设备:
  * iPad （需要 Wifi 无线适配器）
  * 任意 MacBook 或者 Ubuntu Linux 笔记本电脑（可使用开发用计算机兼任）
  * Samsung Note 4 或者等效设备 （任意最近发布的 Android 平板或者有足够大屏幕可以有效运行 *QGroundControl* 的手机）。
* 安全眼镜
* 针对多轴无人机 - 束缚绳（用于高风险的飞行测试）

## 飞机配置

:::tip
*QGroundControl* for a **desktop OS** is required for vehicle configuration. You should use (and regularly update) the daily build in order to take advantage of the latest features in PX4.
:::

To configure the vehicle:

1. 下载并安装 [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)。
1. [基本配置](https://docs.px4.io/en/config/)（PX4 用户指南）说明了如何执行基本配置。
1. [参数配置](https://docs.px4.io/en/advanced_config/parameters.html) （PX4 用户指南）说明了如何查找和修改单个的参数。

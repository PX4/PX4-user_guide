# 初始配置

我们建议开发者们获取下文描述的基本配置的硬件设备（或者相似的设备）并使用"默认" [机架](../airframes/airframe_reference.md) 构型。

## 基本设备

> **提示：** 除了这里提及的设备外 PX4 还适用于很多其他硬件设备，但新晋开发人员可以受益于使用下文的标准配置进行开发。 一个Taranis RC 遥控器加上一个 Note 4 平板电脑可以组成一套物美价廉的外场套件。

强烈建议使用以下硬件设备:

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

> **提示：** 进行飞机配置时需要使用运行在 **桌面操作系统** 上的 *QGroundControl* 。 您应该使用 (并定期更新) daily build版本的 QGroundControl，以便使用 PX4 的最新功能。

飞机配置流程：

1. 下载并安装 [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)。
1. [基本配置](https://docs.px4.io/en/config/)（PX4 用户指南）说明了如何执行基本配置。
1. [参数配置](https://docs.px4.io/en/advanced_config/parameters.html) （PX4 用户指南）说明了如何查找和修改单个的参数。

---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/config_initial
---

# 初始配置

我们建议开发者们获取下文描述的基本配置的硬件设备（或者相似的设备）并使用"默认" [机架](../airframes/airframe_reference.md) 构型。

## 基本设备

:::tip
PX4 can be used with a much wider range of equipment than described here, but new developers will benefit from going with one of the standard setups.
A Taranis RC plus a Note 4 tablet make up for a very inexpensive field kit.
:::

飞机配置流程：

- **Remote control** for the safety pilot
  - Taranis Plus remote control (or equivalent)
- **Development computer**
  * MacBook Pro （2015 年初及以后），OSX 10.13 或者更高版本
  * Lenovo Thinkpad 450 (i5)，Ubuntu Linux 16.04 或者更高版本
- **Ground control station** (computer or tablet):
  * iPad （需要 Wifi 无线适配器）
  * 任意 MacBook 或者 Ubuntu Linux 笔记本电脑（可使用开发用计算机兼任）
  * Samsung Note 4 或者等效设备 （任意最近发布的 Android 平板或者有足够大屏幕可以有效运行 *QGroundControl* 的手机）。
- **Vehicle capable of running PX4**:
  - [Get a prebuilt vehicle](../complete_vehicles/README.md)
  - [Build your own](../airframes/README.md)
- **Safety glasses**
- **Tether** (multicopter only - for more risky tests)

## 飞机配置

Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html) for a **desktop OS**.

To configure the vehicle:
1. [Install PX4 firmware](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) (including "custom" firmware with your own changes).
1. [基本配置](https://docs.px4.io/en/config/)（PX4 用户指南）说明了如何执行基本配置。
1. [参数配置](https://docs.px4.io/en/advanced_config/parameters.html) （PX4 用户指南）说明了如何查找和修改单个的参数。
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.

:::note
- *QGroundControl* mobile variants do not support vehicle configuration.
- The *daily build* includes development tools and new features that are not available in the official release.
- Configuration in the airframe reference have been flown on real vehicles, and are a good starting point for "getting off the ground".
:::

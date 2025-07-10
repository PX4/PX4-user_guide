---
canonicalUrl: https://docs.px4.io/main/zh/config/airframe
---

# 机架设置

安装固件后，您需要选择最适合您载具的 [机架配置](../airframes/airframe_reference.md)。

:::note
Select the airframe configuration for your vehicle brand and model, if one exists, as this should be tuned well enough to fly following standard configuration.
Otherwise select the closest "Generic" frame option.
:::

## 设置机架类型

To set the airframe:

1. Start *QGroundControl* and connect the vehicle.
1. Select **"Q" icon > Vehicle Setup > Airframe** (sidebar) to open *Airframe Setup*.
1. 先选择你的机架符合的大致分类，然后在下拉菜单中选择最匹配的机架类型。

   ![](../../assets/qgc/setup/airframe/airframe_px4.jpg)

   The example above shows *Generic Hexarotor X geometry* selected from the *Hexarotor X* group.


1. Click **Apply and Restart**. Click **Apply** in the following prompt to save the settings and restart the vehicle.

   <img src="../../assets/qgc/setup/airframe/airframe_px4_apply_prompt.jpg" width="300px" title="应用机架选择提示" />


## 更多信息：

* [QGroundControl User Guide > Airframe](https://docs.qgroundcontrol.com/en/SetupView/Airframe.html)
* [PX4 设置视频 - @37s](https://youtu.be/91VGmdSlbo4?t=35s) (Youtube)
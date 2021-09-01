# 机架安装

After installing firmware you need to select the [airframe configuration](../airframes/airframe_reference.md) that best matches your vehicle.

:::note
Select the airframe configuration for your vehicle brand and model, if one exists, as this should be tuned well enough to fly following standard configuration. Otherwise select the closest "Generic" frame option.
:::

## 设置机架类型

To set the airframe:

1. 打开 *QGroundControl* 并连接上飞机。
2. Select **"Q" icon > Vehicle Setup > Airframe** (sidebar) to open *Airframe Setup*.
3. 先选择你的机架符合的大致分类，然后在下拉菜单中选择最匹配的机架类型。
    
    ![](../../assets/qgc/setup/airframe/airframe_px4.jpg)
    
    The example above shows *Generic Hexarotor X geometry* selected from the *Hexarotor X* group.

4. 点击 **应用并重启**。 看到提示后点击 **应用** 保存设置并重启载具 (飞机)。
    
    <img src="../../assets/qgc/setup/airframe/airframe_px4_apply_prompt.jpg" width="300px" title="应用机架选择提示" />

## 更多信息：

* [QGroundControl 用户手册 > 机架](https://docs.qgroundcontrol.com/en/SetupView/Airframe.html)
* [PX4 设置视频 - @37s](https://youtu.be/91VGmdSlbo4?t=35s) (Youtube)
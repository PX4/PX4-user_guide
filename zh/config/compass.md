---
canonicalUrl: https://docs.px4.io/main/zh/config/compass
---

# 罗盘校准

罗盘校准过程配置了所有连接的外部和内部 [magnetometers](../gps_compass/README.md)。 *QGroundControl* 将指定您把飞行器定位在一系列方向并在指定轴上旋转飞行器。

:::note
If you are using an external magnetometer/compass (e.g. a compass integrated into a GPS module) make sure you mount the external compass on your vehicle properly and connect it to the autopilot hardware. Instructions for connecting your GPS+compass can be found in [Basic Assembly](../assembly/README.md) for your specific autopilot hardware. Once connected, *QGroundControl* will automatically detect the external magnetometer.
:::

:::tip
You will need to calibrate your compass on first use, and you may need to recalibrate it if the vehicles is ever exposed to a very strong magnetic field, or if it is used in an area with abnormal magnetic characteristics. Indications of a poor compass calibration include multicopter circling during hover, toilet bowling (circling at increasing radius/spiraling-out, usually constant altitude, leading to fly-way), or veering off-path when attempting to fly straight.
:::

## 执行校准

The calibration steps are:

1. Choose a location away from large metal objects or magnetic fields. :::tip Metal is not always obvious! Avoid calibrating on top of an office table (often contain metal bars) or next to a vehicle. Calibration can even be affected if you're standing on a slab of concrete with uneven distribution of re-bar.
:::
2. 打开 *QGroundControl* 并连接上飞机。
3. 在工具栏选择 **齿轮** 图标（机体设置），然后在侧边栏选择 **传感器**。
4. 点击 **Compass** 传感器按钮。
    
    ![选择 Compass 校准 PX4](../../assets/qgc/setup/sensor/sensor_compass_select_px4.jpg)
    
:::note
You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.
:::

5. 点击**确定**开始校准。

6. 把你的飞机放置在下面显示的某一个方向，并保持静止。 随后提示（方向图像变为黄色）在指定方向旋转飞行器。 该位置标定完成后，屏幕上的相应图示将变成绿色。
    
    ![PX4 上的罗盘校准步骤](../../assets/qgc/setup/sensor/sensor_compass_calibrate_px4.jpg)

7. 在机体的所有方向上重复校准步骤。

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## 更多信息：

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 Setup Video - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (Youtube)
* [Compass Power Compensation](../advanced_config/compass_power_compensation.md) (Advanced Configuration)
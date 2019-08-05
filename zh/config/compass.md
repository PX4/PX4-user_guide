# 罗盘校准

罗盘校准过程配置了所有连接的外部和内部 [magnetometers](../gps_compass/README.md)。 *QGroundControl* 将指定您把飞行器定位在一系列方向并在指定轴上旋转飞行器。

> **Note** 如果您使用外部地磁计/罗盘（例如，集成GPS模块的罗盘），请确保正确安装外部罗盘并连接到飞行控制器硬件。 连接特定飞行器的 GPS 和罗盘的指南可以在 [Basic Assembly](../assembly/README.md) 中找到。 连接后， QGroundControl 将自动检测外部罗盘。

## 执行校准

标定步骤如下：

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. 点击 **Compass** 传感器按钮。
    
    ![选择 Compass 校准 PX4](../../images/qgc/setup/sensor_compass_select_px4.jpg)
    
    > **注意** 你必须首先设置好 [自动驾驶仪坐标系](../config/flight_controller_orientation.md)。 如果没有，也可以在这里设置。

4. 点击**确定**开始标定。

5. 把你的飞机放置在下面显示的某一个方向，并保持静止。 随后提示（方向图像变为黄色）在指定方向旋转飞行器。 该位置标定完成后，屏幕上的相应图示将变成绿色。
    
    ![PX4 上的罗盘校准步骤](../../images/qgc/setup/sensor_compass_calibrate_px4.jpg)

6. 在所有标定位置重复步骤5。

所有位置都标定完成后，*QGroundControl*将显示*标定完成* (所有标定位置都变成绿色，进度条也显示完成)。 然后可以开始标定下一个传感器。

## 更多信息：

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 Setup Video - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (Youtube)
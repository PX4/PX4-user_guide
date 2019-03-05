# 加速度计

按照*QGroundControl*的指引，将机体翻转到一系列的位置并静置 (需要翻转到下一个位置时，QGC会有提示)。

> **Tip** 加速度计校准与 [罗盘标定](../config/compass.md) 类似，不同的只是在每个位置将机体静置（而非旋转）。

## 执行校准

标定步骤如下：

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. 点击 **加速度计** 传感器按钮。
    
    ![加速度计校准](../../assets/qgc/setup/sensor/accelerometer.jpg)
    
    > **注意** 你必须首先设置好 [自动驾驶仪坐标系](../config/flight_controller_orientation.md)。 如果没有，也可以在这里设置。

4. 点击**确定**开始标定。

5. 按照屏幕上的*图示*引导，将机体翻转到指定位置。 看到 (图示位置变成黄色) 的提示，握紧机体并保持静止。 该位置标定完成后，屏幕上的相应图示将变成绿色。
    
    ![加速度计校准](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

6. 在所有标定位置重复步骤5。

所有位置都标定完成后，*QGroundControl*将显示*标定完成* (所有标定位置都变成绿色，进度条也显示完成)。 然后可以开始标定下一个传感器。

## 更多信息：

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#accelerometer)
* [PX4 设置视频 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)
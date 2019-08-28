# 加速度计

按照*QGroundControl*的指引，将机体翻转到一系列的位置并静置 (需要翻转到下一个位置时，QGC会有提示)。

> **Tip** This is similar to [compass calibration](../config/compass.md) except that you hold the vehicle still (rather than rotate it) in each orientation.

<span></span>

> **Note** The calibration uses a least squares 'fit' algorithm that doesn't reaquire you to have "perfect" 90 degree orientations. Provided each axis is pointed mostly up and down at some time in the calibration sequence, and the vehicle is held stationary, the precise orientation doesn't matter.

## 执行校准

The calibration steps are:

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. 点击 **加速度计** 传感器按钮。
    
    ![加速度计校准](../../assets/qgc/setup/sensor/accelerometer.jpg)
    
    > **注意** 你必须首先设置好 [自动驾驶仪坐标系](../config/flight_controller_orientation.md)。 如果没有，也可以在这里设置。

4. 点击**确定**开始标定。

5. 按照屏幕上的*图示*引导，将机体翻转到指定位置。 看到 (图示位置变成黄色) 的提示，握紧机体并保持静止。 该位置标定完成后，屏幕上的相应图示将变成绿色。
    
    ![加速度计校准](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

6. 在所有标定位置重复步骤5。

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## 更多信息：

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#accelerometer)
* [PX4 设置视频 - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)
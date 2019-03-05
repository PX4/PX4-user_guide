# Compass Calibration

The compass calibration process configures all connected internal and external [magnetometers](../gps_compass/README.md). *QGroundControl* will guide you to position the vehicle in a number of set orientations and rotate the vehicle about the specified axis.

> **Note** If you are using an external magnetometer/compass (e.g. a compass integrated into a GPS module) make sure you mount the external compass on your vehicle properly and connect it to the autopilot hardware. Instructions for connecting your GPS+compass can be found in [Basic Assembly](../assembly/README.md) for your specific autopilot hardware. Once connected, QGroundControl will automatically detect the external magnetometer.

## 执行校准

标定步骤如下：

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. Click the **Compass** sensor button.
    
    ![Select Compass calibration PX4](../../images/qgc/setup/sensor_compass_select_px4.jpg)
    
    > **注意** 你必须首先设置好 [自动驾驶仪坐标系](../config/flight_controller_orientation.md)。 如果没有，也可以在这里设置。

4. 点击**确定**开始标定。

5. Place the vehicle in any of the orientations shown in red (incomplete) and hold it still. Once prompted (the orientation-image turns yellow) rotate the vehicle around the specified axis in either/both directions. 该位置标定完成后，屏幕上的相应图示将变成绿色。
    
    ![Compass calibration steps on PX4](../../images/qgc/setup/sensor_compass_calibrate_px4.jpg)

6. 在所有标定位置重复步骤5。

所有位置都标定完成后，*QGroundControl*将显示*标定完成* (所有标定位置都变成绿色，进度条也显示完成)。 然后可以开始标定下一个传感器。

## 更多信息：

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 Setup Video - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (Youtube)
# 空速校准

空速校准需要读取零空速的稳定基础数据以确定偏移量。 将手放在皮托管上以阻挡风（如果在室内校准传感器则不需要），然后用嘴向管中吹气（表示完成校准）。

> **注**固定翼和VTOL飞机通常有一个空速传感器。

## 执行校准

校准空速传感器

1. 打开 *QGroundControl* 并连接上飞机。
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. Click the **Airspeed** sensor button.
    
    ![Airspeed calibration](../../images/qgc/setup/sensor_airspeed.jpg)

4. Shield the sensor from the wind (i.e. cup it with your hand). Take care not to block any of its holes.

5. 点击**确定**开始标定。
6. Blow into the tip of the pitot tube to signal the end of calibration.
    
    > **Tip** Blowing into the tube is also a basic check that the dynamic and static ports are installed correctly. If they are swapped then the sensor will read a large negative differential pressure when you blow into the tube, and the calibration will abort with an error.

7. Wait for 2-3 seconds before removing the covering (calibration completes silently after several seconds)

## 测试

After calibration a quick test is to press your finger against the tip of the pitot and hold it. You should see the system read and hold a positive airspeed until you release.

## 更多信息

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#airspeed)
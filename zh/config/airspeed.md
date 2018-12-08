# AirSpeed Calibration

The airspeed calibration needs to read a stable baseline with 0 airspeed in order to determine an offset. Cup your hands over the pitot to block any wind (if calibrating the sensor indoors this is not needed) and then blow into the tube using your mouth (to signal completion of the calibration).

> **Note** Fixed Wing and VTOL vehicles usually have an airspeed sensor.

## Performing the Calibration

To calibrate the airspeed sensor:

1. Start *QGroundControl* and connect the vehicle.
2. 在工具栏选择 **齿轮** 图标 (机体设置)，然后在侧边栏选择 **传感器**。
3. Click the **Airspeed** sensor button.
    
    ![Airspeed calibration](../../images/qgc/setup/sensor_airspeed.jpg)

4. Shield the sensor from the wind (i.e. cup it with your hand). Take care not to block any of its holes.

5. 点击**确定**开始标定。
6. Blow into the tip of the pitot tube to signal the end of calibration.
    
    > **Tip** Blowing into the tube is also a basic check that the dynamic and static ports are installed correctly. If they are swapped then the sensor will read a large negative differential pressure when you blow into the tube, and the calibration will abort with an error.

7. Wait for 2-3 seconds before removing the covering (calibration completes silently after several seconds)

## Testing

After calibration a quick test is to press your finger against the tip of the pitot and hold it. You should see the system read and hold a positive airspeed until you release.

## 更多信息：

* [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/en/SetupView/Sensors.html#airspeed)
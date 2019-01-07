# TBS Caipiroshka

Caipiroshka VTOL是由 TBS Caipirinha轻度改装而来。

{% youtube %}https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720{% endyoutube %}

## 配件列表

* TBS Caipirinha 机翼（[Eflight 商城](http://www.eflight.ch/shop/USER_ARTIKEL_HANDLING_AUFRUF.php?von_suchresultat=true&Ziel_ID=19638&Kategorie_ID=110923)）
* 3D 打印的左右电机安装架（<a href="https://github.com/PX4/px4_user_guide/raw/master/assets/airframes/vtol/caipiroshka/motor_mounts.zip" target="_blank">设计文件 </a>）
* CW 8045螺旋桨（[Eflight 商城](http://www.eflight.ch/shop/USER_ARTIKEL_HANDLING_AUFRUF.php?von_suchresultat=true&Ziel_ID=19532&Kategorie_ID=288)）
* CCW 8045螺旋桨（[Eflight商店](http://www.eflight.ch/shop/USER_ARTIKEL_HANDLING_AUFRUF.php?von_suchresultat=true&Ziel_ID=19533&Kategorie_ID=288)）
* 2 x 1800kv 120-180W电机 
  * [Quanum MT2208 1800 kV](http://www.hobbyking.com/hobbyking/store/__67014__Quanum_MT_Series_2208_1800KV_Brushless_Multirotor_Motor_Built_by_DYS.html)
  * [ePower 2208](http://www.eflight.ch/pi/ePower-X-22081.html)
* 2 x 20-30S 电调 
  * [Eflight 商城](http://www.eflight.ch/shop/USER_ARTIKEL_HANDLING_AUFRUF.php?von_suchresultat=true&Ziel_ID=19713&Kategorie_ID=36077)
* BEC（3A，5-5.3V）（如果你的电调不能提供5V的输出，可以用这个）
* 3S 2200 mA锂电池 
  * Team Orion 3S 11.1V 50 C（[Hobbyshop 商城](https://www.hobbyshop.ch/modellbau-elektronik/akku/team-orion-lipo-2200-3s-11-1v-50c-xt60-ori60163.html)）
* [Pixracer 飞控 + 电源模块](../flight_controller/pixracer.md)
* [数字空速传感器](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)

## 组装

下面有一种装好的 Caipiroshka 的照片。

![Caipiroshka](../../assets/airframes/vtol/caipiroshka/caipiroshka.jpg)

下面有一些如何装机的小技巧。

### 飞控

在靠近飞机重心的地方安装飞控。

### 安装电机

Print the motor mount (2 times) of which the link to the STL file was specified in the part list. Attach one motor mount on each wing side such that the motor axis will be roughly going through the center of the elevons (see picture). In the upper picture the horizontal distance between the two motor mounts is 56cm. Once you have marked the correct position on the wing you can cover the area which will be in contact with the mount with standard transparent tape on both the upper and lower wing side. Then apply a layer of hot glue onto this area and glue the motor mount onto the wing. The reason for having tape in between the wing surface and the hot glue is that you can very easily remove the motor mount by ripping of the tape from the wing without any damage. This is useful when trying to replace a damaged motor mount.

### 电调:

The motor controllers can be directly mounted on a flat surface of the motor mounts using glue or a cable binder. You will have to route the power cables to the battery bay. You can use an old soldering iron to melt channels into the foam. Connect the power cables of both motor controllers in the battery bay and solder a plug to the end. This will enable you to connect both the motor controllers to the power module. If you don't have motor controllers which can provide 5V for the output rail of the autopilot then you will have to use an external power supply (BEC).

### GPS

The GPS can be mounted in the middle at the very back of the airframe. This helps shifting the weight of the plane to the back since the two motors, a camera and a potentially bigger battery can make it quite nose heavy. Also the large distance to the 12V power cables is beneficial for reducing magnetic interference of the external magnetometer.

### 空速传感器

Attach the pitot tube close to the outside edge of one of the wing sides. Make sure that the pitot is not affected by the airflow of the propeller. You should be fine if the horizontal distance from the tube to the axis of the motors is larger than the radius of the propeller. Use e.g. an old soldering iron to create a recess for the pitot tube, the tubing and the actual sensor (see picture). Create a channel for routing the cable across the wing to the other components.

### 连接传感器到 I2C 接口

Both the airspeed sensor and the external magnetometer (located in the gps housing) need to be connected to the I2C bus of the autopilot. Therefore, you will have to use an I2C splitter like the one indicated in the part list. Connect the splitter board with the I2C bus of the autopilot. Then connect both the external magnetometer and the airspeed sensor to the splitter board with a standard I2C cable. In the upper picture the splitter board is located on the left side of the GPS unit.

### 升降副翼

The elevons can be attached to the back side of the wing using transparent tape. You can follow the instructions provided by Team Blacksheep in the build manual for the TBS Caiprinha airframe.

### General assembly rules

在你安装机翼的所有组件之前，可以使用胶带固定它们在安装位置，然后检查重心是否在要求的位置。 根据你增加的设备重量（例如，GoPro 或更大的电池），然后改变部件的位置来匹配重心。

## 机架设置

连接传感器 Scroll down the list to find the *VTOL Duo Tailsitter* icon. Select the *Caipiroshka Duo Tailsitter* from the drop-down list.

![](../../images/qgc/setup/airframe_px4_vtol_caipiroshka_duo_tailsitter.jpg)

## 连接舵机

The descriptions in the table below are referring to the user facing the front of the vehicle when it lies flat on its belly on a table.

| 输出    | 频率     | 执行器  |
| ----- | ------ | ---- |
| MAIN1 | 400 Hz | 右侧电机 |
| MAIN2 | 400 Hz | 左侧电机 |
| MAIN3 | 400 Hz | 空    |
| MAIN4 | 400 Hz | 空    |
| MAIN5 | 50 Hz  | 右副翼  |
| MAIN6 | 50 Hz  | 左副翼  |
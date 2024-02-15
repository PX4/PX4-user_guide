# Польоти з використанням систем захоплення руху (VICON, NOKOV, Optitrack)

::: попередження **РОБОТА В ПРОЦЕСІ**

Ця тема має значні перекриття з [Зовнішня оцінка позиції (ROS)](../ros/external_position_estimation.md).
:::

Системи захоплення руху у приміщенні, такі як VICON, NOKOV та Optitrack, можуть бути використані для надання даних про положення та орієнтацію для оцінки стану транспортного засобу або можуть бути використані як основа для аналізу. Дані з систем захоплення руху можуть бути використані для оновлення локальної оцінки положення PX4 відносно локального початку координат Курс (поворот) з системи захоплення руху також може бути опціонально інтегрований оцінювачем положення.

Дані про положення (позицію та орієнтацію) з системи захоплення руху надсилаються автопілоту через MAVLink, використовуючи повідомлення [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP). Дивіться розділ нижче про системи координат для норм представлення даних. ROS-Mavlink інтерфейс [mavros](../ros/mavros_installation.md) має стандартний плагін для надсилання цього повідомлення. Їх також можна надсилати, використовуючи чистий код на мовах програмування C/C++ та бібліотеки MAVLink.

## Архітектура обчислювальних систем

**Дуже рекомендується** надсилати дані захоплення руху через **бортовий** комп'ютер (наприклад, Raspberry Pi, ODroid і т. д.) для надійного зв'язку. The onboard computer can be connected to the motion capture computer through WiFi, which offers reliable, high-bandwidth connection.

Most standard telemetry links like 3DR/SiK radios are **not** suitable for high-bandwidth motion capture applications.

## Coordinate Frames

This section shows how to setup the system with the proper reference frames. There are various representations but we will use two of them: ENU and NED.

- ENU is a ground-fixed frame where **X** axis points East, **Y** points North and **Z** up. The robot/vehicle body frame is **X** towards the front, **Z** up and **Y** towards the left.
- NED has **X** towards North, **Y** East and **Z** down. The robot/vehicle body frame has **X** towards the front, **Z** down and **Y** accordingly.

Frames are shown in the image below. NED on the left, ENU on the right:

![Reference frames](../../assets/lpe/ref_frames.png)

With the external heading estimation, however, magnetic North is ignored and faked with a vector corresponding to world _x_ axis (which can be placed freely at mocap calibration); yaw angle will be given respect to local _x_.

:::warning
When creating the rigid body in the motion capture software, remember to first align the robot with the world **X** axis otherwise yaw estimation will have an initial offset.
:::

## Estimator Choice

EKF2 is recommended for GPS-enabled systems (LPE is deprecated, and hence no longer supported or maintained). The Q-Estimator is recommended if you don't have GPS, as it works without a magnetometer or barometer.

See [Switching State Estimators](../advanced/switching_state_estimators.md) for more information.

### EKF2

The ROS topic for motion cap `mocap_pose_estimate` for mocap systems and `vision_pose_estimate` for vision. Check [mavros_extras](http://wiki.ros.org/mavros_extras) for further info.

## Testing

## Troubleshooting

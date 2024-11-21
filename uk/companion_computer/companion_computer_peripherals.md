# Супутні комп'ютерні периферійні пристрої

У цьому розділі міститься інформація про периферійні пристрої супутнього комп'ютера.
Сюди включаються як компоненти, які можуть бути підключені до супутнього комп'ютера (потенційно активовані/звертані PX4), так і для підключення комп'ютера до контролера польоту.

## Зв'язок Супутник/ Pixhawk

У цьому розділі перелічені пристрої, які можуть використовуватися для фізичного послідовного/даних з'єднання між супутнім комп'ютером та контролером польоту.

:::info
PX4 configuration for communicating with a companion computer over MAVLink via TELEM2 is covered in [MAVLink (OSD / Telemetry)](../peripherals/mavlink_peripherals.md#telem2).
Other relevant topics/sections include: [Companion Computers](../companion_computer/index.md), [Robotics](../robotics/index.md) and [uXRCE-DDS (PX4-ROS 2/DDS Bridge)](../middleware/uxrce_dds.md).
:::

### Пристрої FTDI

USB-адаптери FTDI є найбільш поширеним способом зв'язку між супутнім комп'ютером та Pixhawk.
Зазвичай вони прості у використанні, якщо IO адаптера встановлено на 3,3 В.
Для використання повного потенціалу/надійності послідовного зв'язку, який пропонується в апаратній частині Pixhawk, рекомендується використовувати керування потоком.

Нижче наведено кілька опцій «turnkey»:

| Пристрій                                                                                                                                                                                                                       | 3.3v IO (Default) | Flow Control | Tx/Rx LEDs | JST-GH |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------ | ---------- | ------ |
| [mRo USB FTDI Serial to JST-GH (Basic)][mro_usb_ftdi_serial_to_jst_gh]                                                                                                                                                         | Capable                                              | Capable      | Ні         | Так    |
| [SparkFun FTDI Basic Breakout][sparkfun_ftdi__breakout] | Так                                                  | Ні           | Так        | Ні     |

<!-- Reference links for above table -->

[mro_usb_ftdi_serial_to_jst_gh]: https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm
[sparkfun_ftdi basic_breakout]: https://www.sparkfun.com/products/9873

You can also use an off-the-shelf FTDI cable [like this one](https://www.sparkfun.com/products/9717) and connect it to flight controller using the appropriate header adaptor
(JST-GH connectors are specified in the Pixhawk standard, but you should confirm the connectors for your flight controller).

### Рівні логічних перетворювачів

Час від часу супутній комп'ютер може використовувати апаратні введення-виведення, які часто працюють на рівні 1,8 В або 5 В, тоді як апаратне забезпечення Pixhawk працює на рівні 3,3 В.
Для вирішення цієї проблеми може бути використаний рівневий перетворювач, що безпечно конвертує напругу сигналів передачі/приймання.

Інші варіанти включають:

- [SparkFun Logic Level Converter - Bi-Directional](https://www.sparkfun.com/products/12009)
- [4-channel I2C-safe Bi-directional Logic Level Converter - BSS138](https://www.adafruit.com/product/757)

## Камери

Cameras are used image and video capture, and more generally to provide data for [computer vision](../computer_vision/index.md) applications (in this case the "cameras" may only provide processed data, not raw images).

### Стереокамери

Стереокамери зазвичай використовуються для сприйняття глибини, планування шляху та SLAM.
Жодним чином не гарантується, що вони підключаються та працюють із вашим комп’ютером-супутником.

Серед популярних стереокамер:

- [Intel® RealSense™ Depth Camera D435](https://www.intelrealsense.com/depth-camera-d435/)
- [Intel® RealSense™ Depth Camera D415](https://www.intelrealsense.com/depth-camera-d415/)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1)

### VIO Камера/Сенсори

The following sensors can be used for [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md):

- [T265 Realsense Tracking Camera](../peripherals/camera_t265_vio.md)

## Телефонія даних (LTE)

Модуль LTE USB може бути підключений до супутнього комп'ютера і використаний для маршрутизації трафіку MAVLink між контролером польоту та Інтернетом.

Немає "стандартного методу" для підключення наземної станції та супутника через Інтернет.
Загалом ви не можете підключати їх безпосередньо, оскільки в обох немає публічної/статичної IP-адреси в Інтернеті.

:::info
Typically your router (or the mobile network) has a public IP address, and your GCS computer/vehicle are on a _local_ network.
The router uses network address translation (NAT) to map _outgoing_ requests from your local network to the Internet, and can use the map to route the _responses_ back to requesting system.
However NAT has no way to know where to direct the traffic from an arbitrary external system, so there is no way to _initiate_ a connection to a GCS or vehicle running in the local network.
:::

A common approach is to set up a virtual private network between the companion and GCS computer (i.e. install a VPN system like [zerotier](https://www.zerotier.com/) on both computers).
The companion then uses [mavlink-router](https://github.com/intel/mavlink-router) to route traffic between the serial interface (flight controller) and GCS computer on the VPN network.

This method has the benefit that the GCS computer address can be static within the VPN, so the configuration of the _mavlink router_ does not need to change over time.
Крім того, комунікаційний зв'язок є безпечним, оскільки весь трафік VPN зашифрований (сам MAVLink 2 не підтримує шифрування).

:::info
You can also choose to route to the VPN broadcast address (i.e. `x.x.x.255:14550`, where 'x' depends on the VPN system).
Цей підхід означає, що вам не потрібно знати IP-адресу комп'ютера GCS, але може призвести до більшого трафіку, ніж очікувалося (оскільки пакети транслюються на кожен комп'ютер в мережі VPN).
:::

Деякі USB-модулі, які відомі своєю сумісністю, включають:

- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) and [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/)
  - The _E8372_ includes WiFi which you can use to configure the SIM while it is plugged into the companion (making the development workflow a little easier). The _E3372_ lacks WiFi, so you have to configure it by plugging the stick into a laptop.

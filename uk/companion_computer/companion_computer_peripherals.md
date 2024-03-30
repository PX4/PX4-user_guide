# Периферійні пристрої супутнього комп'ютера

У цьому розділі міститься інформація про периферійні пристрої супутнього комп'ютера. Сюди включаються як компоненти, які можуть бути підключені до супутнього комп'ютера (потенційно активовані/звертані PX4), так і для підключення комп'ютера до контролера польоту.

## Зв'язок Супутник/ Pixhawk

У цьому розділі перелічені пристрої, які можуть використовуватися для фізичного послідовного/даних з'єднання між супутнім комп'ютером та контролером польоту.

:::note
Конфігурація PX4 для зв'язку з супутнім комп'ютером через MAVLink через TELEM2 описана в [MAVLink (OSD / Telemetry)](../peripherals/mavlink_peripherals.md#telem2). Інші відповідні теми/розділи включають: [Супутникові комп'ютери](../companion_computer/README.md), [Робототехніка](../robotics/README.md) та [uXRCE-DDS (PX4-ROS 2/DDS Bridge)](../middleware/uxrce_dds.md).
:::

### Пристрої FTDI

USB-адаптери FTDI є найбільш поширеним способом зв'язку між супутнім комп'ютером та Pixhawk. Зазвичай вони прості у використанні, якщо IO адаптера встановлено на 3,3 В. Для використання повного потенціалу/надійності послідовного зв'язку, який пропонується в апаратній частині Pixhawk, рекомендується використовувати керування потоком.

Нижче наведено кілька опцій «turnkey»:

| Пристрій                                                               | 3.3v IO (Default) | Flow Control | Tx/Rx LEDs | JST-GH |
| ---------------------------------------------------------------------- | ----------------- | ------------ | ---------- | ------ |
| [mRo USB FTDI Serial to JST-GH (Basic)][mro_usb_ftdi_serial_to_jst_gh] | Capable           | Capable      | Ні         | Так    |
| \[SparkFun FTDI Basic Breakout\]\[sparkfun_ftdi__breakout\]          | Так               | Ні           | Так        | Ні     |

<!-- Reference links for above table -->

You can also use an off-the-shelf FTDI cable [like this one](https://www.sparkfun.com/products/9717) and connect it to flight controller using the appropriate header adaptor (JST-GH connectors are specified in the Pixhawk standard, but you should confirm the connectors for your flight controller).

### Logic Level Shifters

On occasion a companion computer may expose hardware level IO that is often run at 1.8v or 5v, while the Pixhawk hardware operates at 3.3v IO. In order to resolve this, a level shifter can be implemented to safely convert the transmitting/receiving signal voltage.

Options include:

- [SparkFun Logic Level Converter - Bi-Directional](https://www.sparkfun.com/products/12009)
- [4-channel I2C-safe Bi-directional Logic Level Converter - BSS138](https://www.adafruit.com/product/757)

## Камери

Cameras are used image and video capture, and more generally to provide data for [computer vision](../computer_vision/README.md) applications (in this case the "cameras" may only provide processed data, not raw images).

### Stereo Cameras

Stereo cameras are typically used for depth perception, path planning and SLAM. They are in no way guaranteed to be plug and play with your companion computer.

Popular stereo cameras include:

- [Intel® RealSense™ Depth Camera D435](https://www.intelrealsense.com/depth-camera-d435/)
- [Intel® RealSense™ Depth Camera D415](https://www.intelrealsense.com/depth-camera-d415/)
- [DUO MLX](https://duo3d.com/product/duo-minilx-lv1)

### VIO Камера/Сенсори

Наступні датчики можуть бути використані для [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md):

- [T265 Realsense Tracking Camera](../peripherals/camera_t265_vio.md)

## Телефонія даних (LTE)

Модуль LTE USB може бути підключений до супутнього комп'ютера і використаний для маршрутизації трафіку MAVLink між контролером польоту та Інтернетом.

Немає "стандартного методу" для підключення наземної станції та супутника через Інтернет. Загалом ви не можете підключати їх безпосередньо, оскільки в обох немає публічної/статичної IP-адреси в Інтернеті.

:::note
Зазвичай ваш маршрутизатор (або мобільна мережа) має публічну IP-адресу, а ваш комп'ютер GCS/транспортний засіб знаходиться в _локальній мережі_. Маршрутизатор використовує мережеве перетворення адрес (NAT), щоб відображати _outgoing_ вихідні запити з вашої локальної мережі в Інтернеті і може використовувати це відображення для маршрутизації _відповідей_ назад до запитаючої системи. Однак NAT не має способу знати, куди направити трафік з будь-якої зовнішньої системи, тому немає способу _ініціювати_ підключення до GCS або транспортного засобу, що працює в локальній мережі.
:::

Загальним підходом є налаштування віртуальної приватної мережі між супутником та комп'ютером GCS (тобто встановлення системи VPN, такої як [zerotier](https://www.zerotier.com/), на обох комп'ютерах). Потім супутник використовує [mavlink-router](https://github.com/intel/mavlink-router) для маршрутизації трафіку між послідовним інтерфейсом (контролером польоту) та комп'ютером GCS в VPN-мережі.

Цей метод має перевагу у тому, що IP-адреса комп'ютера GCS може бути статичною в межах VPN, тому конфігурацію _маршрутизатора mavlink_ не потрібно змінювати з часом. Крім того, комунікаційний зв'язок є безпечним, оскільки весь трафік VPN зашифрований (сам MAVLink 2 не підтримує шифрування).

:::note
Ви також можете вибрати маршрутизацію на трансляцію VPN-адреси (тобто `x.x.x.255:14550`, де 'x' залежить від системи VPN). Цей підхід означає, що вам не потрібно знати IP-адресу комп'ютера GCS, але може призвести до більшого трафіку, ніж очікувалося (оскільки пакети транслюються на кожен комп'ютер в мережі VPN).
:::

Деякі USB-модулі, які відомі своєю сумісністю, включають:

- [Huawei E8372](https://consumer.huawei.com/en/mobile-broadband/e8372/) та [Huawei E3372](https://consumer.huawei.com/en/mobile-broadband/e3372/)
  - Модель _E8372_ має Wi-Fi, яке можна використовувати для налаштування SIM-карти, коли вона підключена до супутника (що полегшує процес розробки). Модель _E3372_ не має Wi-Fi, тому вам потрібно налаштувати її, підключивши пристрій до ноутбука.

[mro_usb_ftdi_serial_to_jst_gh]: https://store.mrobotics.io/USB-FTDI-Serial-to-JST-GH-p/mro-ftdi-jstgh01-mr.htm

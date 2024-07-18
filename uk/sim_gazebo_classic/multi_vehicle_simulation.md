# Симуляція кількох рухомих засобів з Gazebo Classic

Цей розділ пояснює як моделювати кілька безпілотних ЛА використовуючи [Gazebo Classic](../sim_gazebo_classic/README.md) та SITL (тільки для Linux). Різний підхід використовуються для симуляції з та без ROS.

## Кілька рухомих засобів з Gazebo Classic

Щоб змоделювати кілька засобів типу iris або літаків в Gazebo Classic використовуйте наступні команди в терміналі (з кореня дерева вихідного коду _Прошивки_):

```sh
Tools/simulation/gazebo-classic/sitl_multiple_run.sh [-m <model>] [-n <number_of_vehicles>] [-w <world>] [-s <script>] [-t <target>] [-l <label>]
```

- `<model>`: [Тип/модель засобу](../sim_gazebo_classic/vehicles.md) для відтворення, наприклад: `iris` (за замовчуванням), `plane`, `standard_vtol`, `rover`, `r1_rover` `typhoon_h480`.
- `<number_of_vehicles>`: Кількість рухомих засобів для відтворення. Значення за замовчуванням - 3. Максимум - 254.
- `<world>`: [Світ](../sim_gazebo_classic/worlds.md) в якому потрібно відтворити засоби, наприклад: `empty` (за замовчуванням)
- `<script>`: Відтворити кілька засобів різних типів (замінюючи значення в `-m` та `-n`). Наприклад:

  ```sh
  -s "iris:3,plane:2,standard_vtol:3"
  ```

  - Типи засобів що підтримуються: `iris`, `plane`, `standard_vtol`, `rover`, `r1_rover` `typhoon_h480`.
  - Число після двокрапки вказує на кількість рухомих засобів (цього типу) для відтворення.
  - Максимальна кількість засобів - 254.

- `<target>`: ціль збірки, наприклад: `px4_sitl_default` (за замовчуванням), `px4_sitl_nolockstep`
- `<label>` : певна мітка для моделі, наприклад: `rplidar`

Кожному екземпляру рухомого засобу виділяється унікальний системний ідентифікатор MAVLink (2, 3, 4 тощо). MAVLink system id 1 is skipped in order to have consistency among [namespaces](../ros2/multi_vehicle.md#principle-of-operation). Екземпляри засобів доступні з послідовно виділених віддалених UDP портів PX4: `14541` - `14548` (усі додаткові екземпляри доступні по тому ж самому UDP порту `14549`).

:::info
Обмеження на 254 засоби з'явилось тому що системний ідентифікатор mavlink `MAV_SYS_ID` підтримує тільки 255 засобів в одній мережі (а перша мережа пропускається). `MAV_SYS_ID` виділяється у SITL rcS: [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS#L131)
:::

### Відео: кілька мультикоптерів (Iris)

<lite-youtube videoid="Mskx_WxzeCk" title="Multiple vehicle simulation in SITL gazebo"/>

### Відео: кілька літаків

<lite-youtube videoid="aEzFKPMEfjc" title="PX4 Multivehicle SITL gazebo for fixedwing"/>

### Відео: кілька ВЗІП

<lite-youtube videoid="lAjjTFFZebI" title="PX4 Multivehicle SITL gazebo for VTOL"/>

### Збірка та тестування (XRCE-DDS)

`Tools/simulation/gazebo-classic/sitl_multiple_run.sh` може бути використано для симуляції кількох засобів, з'єднаних за допомогою XRCE-DDS в Gazebo Classic.

::: info
Потрібно буде встановити залежності XRCE-DDS. For more information see: [ROS 2 User Guide (PX4-ROS 2 Bridge)](../ros2/user_guide.md), for interfacing with ROS 2 nodes.
:::

Для збірки прикладу установки дотримуйтесь наступних кроків:

1. Клонуйте код PX4/Прошивки і зберіть код SITL:

   ```sh
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl gazebo-classic
   ```

1. Build the `micro xrce-dds agent` and the interface package following the [instructions here](../ros2/user_guide.md).

1. Запустіть `Tools/simulation/gazebo-classic/sitl_multiple_run.sh`. Наприклад, для відтворення 4 рухомих засобів виконайте:

   ```sh
   ./Tools/simulation/gazebo-classic/sitl_multiple_run.sh -m iris -n 4
   ```

   :::info
Кожному екземпляру рухомого засобу виділяється унікальний системний ідентифікатор MAVLink (2, 3, 4 тощо).
Системний ідентифікатор MAVLink 1 пропускається.
:::

1. Запустіть `MicroXRCEAgent`. Він автоматично під'єднається до усіх чотирьох рухомих засобів:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

   ::: info The simulator startup script automatically assigns a [unique namespace](../ros2/multi_vehicle.md) to each vehicle.
:::

## Кілька рухомих засобів з MAVROS та Gazebo Classic

Цей приклад демонструє установку, яка відкриває клієнтський графічний інтерфейс Gazebo Classic, показуючи два засоби типу Iris у порожньому світі. Можна керувати засобами за допомогою _QGroundControl_ та MAVROS подібним способом до того як керувати одним засобом.

### Вимоги

- Current [PX4 ROS/Gazebo development environment](../ros/mavros_installation.md) (which includes the [MAVROS package](http://wiki.ros.org/mavros)).
- Клонований вихідний код [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot)

### Збірка та тестування

Для збірки прикладу установки дотримуйтесь наступних кроків:

1. Клонуйте код PX4/PX4-Autopilot і зберіть код SITL

   ```sh
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl_default gazebo-classic
   ```

1. Виконайте команду source у вашому середовищі:

   ```sh
   source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
   export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd):$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo
   ```

1. Виконайте файл запуску:

   ```sh
   roslaunch px4 multi_uav_mavros_sitl.launch
   ```

   :::info Можна вказати `gui:=false` в команді _roslaunch_ вище для запуску Gazebo Classic без інтерфейсу.
:::

Навчальний приклад відкриває клієнтський графічний інтерфейс Gazebo Classic, показуючи два засоби типу Iris у порожньому світі.

Можна керувати засобами за допомогою _QGroundControl_ та MAVROS подібним способом до того як керувати одним засобом:

- _QGroundControl_ матиме список, що випадає для вибору засобу, який буде "у фокусі"
- MAVROS потребує включити правильний простір імен перед рубрікою/шляхом до сервісу (наприклад для `<group ns="uav1">` потрібно використати _/uav1/mavros/mission/push_).

### Що відбувається?

Для кожного змодельованого засобу необхідно наступне:

- **Модель Gazebo Classic**: визначена як файл `xacro` у `PX4-Autopilot/Tools/simulation/gazebo-classic/sitl_gazebo-classic/models/rotors_description/urdf/<model>_base.xacro` дивіться [тут](https://github.com/PX4/PX4-SITL_gazebo-classic/tree/02060a86652b736ca7dd945a524a8bf84eaf5a05/models/rotors_description/urdf). На цей момент, `xacro` файл моделі передбачається завершувати з **base.xacro**. Ця модель повинна мати аргумент під назвою `mavlink_udp_port` який визначає UDP-порт, на якому Gazebo Classic буде спілкуватися з вузлом PX4. `xacro` файл моделі буде використаний для генерації `urdf` моделі, яка містить UDP-порт, який ви обрали. Для визначення порту UDP, вкажіть `mavlink_udp_port` у файлі запуску для кожного рухомого засобу, як приклад дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L37).

  :::info Якщо ви використовуєте одну і ту саму модель засобу, не потрібно відокремлювати **`xacro`** файл для кожного засобу. Той самий **`xacro`** файл підходить.
:::

- **Вузол PX4**: це застосунок SITL PX4. Він спілкується з симулятором Gazebo Classic через той самий UDP порт, що визначено в моделі засобу Gazebo Classic, тобто у `mavlink_udp_port`. Для налаштування UDP порту на стороні застосунку PX4 SITL, потрібно встановити параметр `SITL_UDP_PRT` у файлі запуску який збігається з `mavlink_udp_port`, що обговорювався раніше, дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L46). Шлях стартового файлу у файлі запуску генерується на основі аргументів `vehicle` та `ID`, дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L36). `MAV_SYS_ID` для кожного засобу в стартовому файлі, дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L4), повинен збігатися з `ID` для цього засобу у файлі запуску [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L25). Це допоможе переконатися, що ви тримаєте налаштування узгоджено між файлом запуску та стартовим файлом.

- **Вузол MAVROS** \(не обов'язково\): окремий вузол MAVROS може бути запущено у файлі запуску, дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L41), для того щоб під'єднатися до застосунку PX4 SITL, якщо ви бажаєте керувати своїм засобом через ROS. Ви повинні запустити потік MAVLink на індивідуальному наборі портів у стартовому файлі, дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_1#L68). Цей набір портів повинен збігатися з тими, що у файлі запуску для вузла MAVROS, дивіться [тут](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L26).

Файл запуску `multi_uav_mavros_sitl.launch`робить наступне,

- завантажує світ у Gazebo Classic,

  ```xml
    <!-- Gazebo sim -->
    <include file="$(find gazebo_ros)/launch/empty_world.launch">
        <arg name="gui" value="$(arg gui)"/>
        <arg name="world_name" value="$(arg world)"/>
        <arg name="debug" value="$(arg debug)"/>
        <arg name="verbose" value="$(arg verbose)"/>
        <arg name="paused" value="$(arg paused)"/>
    </include>
  ```

- для кожного рухомого засобу,

  - створює модель urdf із xacro, завантажує модель gazebo classic і запускає екземпляр застосунку PX4 SITL

    ```xml
      <!-- PX4 SITL and vehicle spawn -->
      <include file="$(find px4)/launch/single_vehicle_spawn.launch">
          <arg name="x" value="0"/>
          <arg name="y" value="0"/>
          <arg name="z" value="0"/>
          <arg name="R" value="0"/>
          <arg name="P" value="0"/>
          <arg name="Y" value="0"/>
          <arg name="vehicle" value="$(arg vehicle)"/>
          <arg name="rcS" value="$(find px4)/posix-configs/SITL/init/$(arg est)/$(arg vehicle)_$(arg ID)"/>
          <arg name="mavlink_tcp_port" value="4560"/>
          <arg name="ID" value="$(arg ID)"/>
      </include>
    ```

  - запускає вузол Mavros

    ```xml
      <!-- MAVROS -->
      <include file="$(find mavros)/launch/px4.launch">
          <arg name="fcu_url" value="$(arg fcu_url)"/>
          <arg name="gcs_url" value=""/>
          <arg name="tgt_system" value="$(arg ID)"/>
          <arg name="tgt_component" value="1"/>
      </include>
    ```

  ::: info Повний блок налаштувань для кожного засобу обернений в набір тегів `<group>`  для відокремлення простору імен ROS для рухомих засобів.
:::

Щоб додати третій засіб типу iris до цієї симуляції потрібно врахувати два основні компоненти:

- додати `UAV3` до **multi_uav_mavros_sitl.launch**
  - скопіювати групу наявного засобу (`UAV1` або `UAV2`)
  - збільшити аргумент `ID` до `3`
  - обрати інший порт для аргументу `mavlink_udp_port` для спілкування з Gazebo Classic
  - обрати порти для спілкування з MAVROS шляхом модифікації обох номерів портів в аргументі `fcu_url`
- створити стартовий файл і змінити файл наступним чином:

  - створити копію наявного стартового файлу rcS для iris (`iris_1` або `iris_2`) та перейменувати його `iris_3`
  - встановити значення `MAV_SYS_ID` у `3`
  - значення `SITL_UDP_PRT` узгодити з аргументом `mavlink_udp_port` у файлі запуску
  - перші значення порту `mavlink start` та порту `mavlink stream` встановити в такі ж значення, що використовуються для спілкування з QGC
  - другі порти `mavlink start` потрібно узгодити з тими, що використовуються в аргументі `fcu_url` файлу запуску

    :::info Будьте уважні який порт `src` і `dst` для різних кінцевих точок.
:::

## Кілька рухомих засобів з використанням моделей SDF

Цей розділ показує, як розробнику симулювати декілька засобів за допомогою моделей рухомих засобів, визначених у SDF файлах Gazebo Classic (замість використання моделей, визначених у ROS Xacro файлах, як обговорювалося у решті цієї теми).

Кроки наступні:

1. Встановіть _xmlstarlet_ з термінала Linux:

   ```sh
   sudo apt install xmlstarlet
   ```

1. Використовуйте _roslaunch_ з файлом **multi_uav_mavros_sitl_sdf.launch**:

   ````sh
   roslaunch multi_uav_mavros_sitl_sdf.launch vehicle:=<model_file_name>
   ```

   ::: info
   Note that the vehicle model file name argument is optional (`vehicle:=<model_file_name>`); if omitted the [plane model](https://github.com/PX4/PX4-SITL_gazebo-classic/tree/master/models/plane) will be used by default.

:::
   ````
Цей метод подібний до використання xacro моделі за винятком того, що номери портів SITL/Gazebo Classic автоматично додаються _xmstarlet_ для кожного відтвореного засобу і його не потрібно вказувати у SDF файлі.
Щоб додати новий рухомий засіб, вам потрібно переконатися, що модель можна знайти (для відтворення у Gazebo Classic) та PX4 повинен мати відповідний скрипт запуску.
1. Можна обрати зробити щось одне з:
- змінити **single_vehicle_spawn_sdf.launch**, щоб він вказував на розташування моделі, змінивши рядок нижче та вказавши на вашу модель:

     ```sh
     $(find px4)/Tools/simulation/gazebo/sitl_gazebo-classic/models/$(arg vehicle)/$(arg vehicle).sdf
     ```

     :::info Переконайтесь, що вказали аргумент `vehicle` навіть якщо ви явно закодували шлях до вашої моделі.
:::

   - скопіювати свою модель в директорію, позначену вище (дотримуючись тих же правил шляху).

1. Аргумент `vehicle` використовується для встановлення змінної середовища `PX4_SIM_MODEL`, яка використовується rcS (стартовим скриптом) за замовчуванням щоб знайти відповідний файл налаштувань для моделі. У PX4 ці стартові файли можна знайти у директорії **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/**. Для прикладу ось [стартовий скрипт](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/1030_gazebo-classic_plane) моделі літака. Для того, щоб це працювало, вузлу PX4 у файлі запуску передаються аргументи що визначають файл _rcS_ (**etc/init.d/rcS**) та розташування etc директорії (`$(find px4)/build_px4_sitl_default/etc`) у корені файлової системи. Для спрощення пропонується, що початковий файл для моделі розміщується поруч з PX4 в **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/**.

## Додаткові ресурси

- Дивіться [Симуляція](../simulation/README.md) для опису налаштувань UDP порту.
- Дивіться [URDF у Gazebo](http://wiki.ros.org/urdf/Tutorials/Using%20a%20URDF%20in%20Gazebo) для додаткової інформації про відтворення моделі з xacro.
- Дивіться [RotorS](https://github.com/ethz-asl/rotors_simulator/tree/master/rotors_description/urdf) для додаткових моделей xacro.

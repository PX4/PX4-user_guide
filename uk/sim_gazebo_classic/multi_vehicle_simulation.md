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

Кожному екземпляру рухомого засобу виділяється унікальний системний ідентифікатор MAVLink (2, 3, 4 тощо). Системний ідентифікатор MAVLink 1 пропускається, щоб мати узгодженість у [просторі імен](../ros/ros2_multi_vehicle.md#principle-of-operation). Екземпляри засобів доступні з послідовно виділених віддалених UDP портів PX4: `14541` - `14548` (усі додаткові екземпляри доступні по тому ж самому UDP порту `14549`).

:::note
Обмеження на 254 засоби з'явилось тому що системний ідентифікатор mavlink `MAV_SYS_ID` підтримує тільки 255 засобів в одній мережі (а перша мережа пропускається). `MAV_SYS_ID` виділяється у SITL rcS: [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS#L131)
:::

### Відео: кілька мультикоптерів (Iris)

@[youtube](https://youtu.be/Mskx_WxzeCk)

### Відео: кілька літаків

@[youtube](https://youtu.be/aEzFKPMEfjc)

### Відео: кілька ВЗІП

@[youtube](https://youtu.be/lAjjTFFZebI)

### Збірка та тестування (XRCE-DDS)

`Tools/simulation/gazebo-classic/sitl_multiple_run.sh` може бути використано для симуляції кількох засобів, з'єднаних за допомогою XRCE-DDS в Gazebo Classic.

:::note
Потрібно буде встановити залежності XRCE-DDS. Для додаткової інформації дивіться: [Посібник користувача ROS 2 (Міст PX4-ROS 2)](../ros/ros2_comm.md) для взаємодії з вузлами ROS 2.
:::

Для збірки прикладу установки дотримуйтесь наступних кроків:

1. Клонуйте код PX4/Прошивки і зберіть код SITL:

   ```sh
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl gazebo-classic
   ```

1. Зберіть `мікроагента xrce-dds` та пакунок взаємодії дотримуючись [інструкцій тут](../ros/ros2_comm.md).

1. Запустіть `Tools/simulation/gazebo-classic/sitl_multiple_run.sh`. Наприклад, для відтворення 4 рухомих засобів виконайте:

   ```sh
   ./Tools/simulation/gazebo-classic/sitl_multiple_run.sh -m iris -n 4
   ```

   :::note
Кожному екземпляру рухомого засобу виділяється унікальний системний ідентифікатор MAVLink (2, 3, 4 тощо).
Системний ідентифікатор MAVLink 1 пропускається.
:::

1. Запустіть `MicroXRCEAgent`. Він автоматично під'єднається до усіх чотирьох рухомих засобів:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

:::note
Скрипт запуску симулятора автоматично призначить [унікальний простір імен](../ros/ros2_multi_vehicle.md) кожному засобу.
:::

## Кілька рухомих засобів з MAVROS та Gazebo Classic

Цей приклад демонструє установку, яка відкриває клієнтський графічний інтерфейс Gazebo Classic, показуючи два засоби типу Iris у порожньому світі. Можна керувати засобами за допомогою _QGroundControl_ та MAVROS подібним способом до того як керувати одним засобом.

### Вимоги

- Поточне [Середовище розробки PX4 ROS/Gazebo](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)

:::note
На момент написання це Ubuntu 18.04 з ROS Melodic/Gazebo 9. Дивіться також [Симуляція Gazebo Classic](../sim_gazebo_classic/README.md).
:::

- [Пакет MAVROS](http://wiki.ros.org/mavros)
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

:::note
Можна вказати `gui:=false` в команді _roslaunch_ вище для запуску Gazebo Classic без інтерфейсу.
:::

Навчальний приклад відкриває клієнтський графічний інтерфейс Gazebo Classic, показуючи два засоби типу Iris у порожньому світі.

Можна керувати засобами за допомогою _QGroundControl_ та MAVROS подібним способом до того як керувати одним засобом:

- _QGroundControl_ матиме список, що випадає для вибору засобу, який буде "у фокусі"
- MAVROS потребує включити правильний простір імен перед рубрікою/шляхом до сервісу (наприклад для `<group ns="uav1">` потрібно використати _/uav1/mavros/mission/push_).

### Що відбувається?

Для кожного змодельованого засобу необхідно наступне:

- **Модель Gazebo Classic**: визначена як файл `xacro` у `PX4-Autopilot/Tools/simulation/gazebo-classic/sitl_gazebo-classic/models/rotors_description/urdf/<model>_base.xacro` дивіться [тут](https://github.com/PX4/PX4-SITL_gazebo-classic/tree/02060a86652b736ca7dd945a524a8bf84eaf5a05/models/rotors_description/urdf). На цей момент, `xacro` файл моделі передбачається завершувати з **base.xacro**. This model should have an argument called `mavlink_udp_port` which defines the UDP port on which Gazebo Classic will communicate with PX4 node. The model's `xacro` file will be used to generate an `urdf` model that contains UDP port that you select. To define the UDP port, set the `mavlink_udp_port` in the launch file for each vehicle, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L37) as an example.

:::note
If you are using the same vehicle model, you don't need a separate **`xacro`** file for each vehicle. The same **`xacro`** file is adequate.
:::

- **PX4 node**: This is the SITL PX4 app. It communicates with the simulator, Gazebo Classic, through the same UDP port defined in the Gazebo Classic vehicle model, i.e. `mavlink_udp_port`. To set the UDP port on the PX4 SITL app side, you need to set the `SITL_UDP_PRT` parameter in the startup file to match the `mavlink_udp_port` discussed previously, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L46). The path of the startup file in the launch file is generated based on the `vehicle` and `ID` arguments, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L36). The `MAV_SYS_ID` for each vehicle in the startup file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L4), should match the `ID` for that vehicle in the launch file [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L25). This will help make sure you keep the configurations consistent between the launch file and the startup file.

- **MAVROS node** \(optional\): A separate MAVROS node can be run in the launch file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L41), in order to connect to PX4 SITL app, if you want to control your vehicle through ROS. You need to start a MAVLink stream on a unique set of ports in the startup file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_1#L68). Those unique set of ports need to match those in the launch file for the MAVROS node, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L26).

The launch file `multi_uav_mavros_sitl.launch`does the following,

- loads a world in Gazebo Classic,

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

- for each vehicle,

  - creates urdf model from xacro, loads gazebo classic model and runs PX4 SITL app instance

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

  - runs a mavros node

    ```xml
      <!-- MAVROS -->
      <include file="$(find mavros)/launch/px4.launch">
          <arg name="fcu_url" value="$(arg fcu_url)"/>
          <arg name="gcs_url" value=""/>
          <arg name="tgt_system" value="$(arg ID)"/>
          <arg name="tgt_component" value="1"/>
      </include>
    ```

:::note
The complete block for each vehicle is enclosed in a set of `<group>` tags to separate the ROS namespaces of the vehicles.
:::

To add a third iris to this simulation there are two main components to consider:

- add `UAV3` to **multi_uav_mavros_sitl.launch**
  - duplicate the group of either existing vehicle (`UAV1` or `UAV2`)
  - increment the `ID` arg to `3`
  - select a different port for `mavlink_udp_port` arg for communication with Gazebo Classic
  - selects ports for MAVROS communication by modifying both port numbers in the `fcu_url` arg
- create a startup file, and change the file as follows:

  - make a copy of an existing iris rcS startup file (`iris_1` or `iris_2`) and rename it `iris_3`
  - `MAV_SYS_ID` value to `3`
  - `SITL_UDP_PRT` value to match that of the `mavlink_udp_port` launch file arg
  - the first `mavlink start` port and the `mavlink stream` port values to the same values, which is to be used for QGC communication
  - the second `mavlink start` ports need to match those used in the launch file `fcu_url` arg

:::note
Be aware of which port is `src` and `dst` for the different endpoints.
:::

## Multiple Vehicles using SDF Models

This section shows how developers can simulate multiple vehicles using vehicle models defined in Gazebo Classic SDF files (instead of using models defined in the ROS Xacro file, as discussed in the rest of this topic).

The steps are:

1. Install _xmlstarlet_ from your Linux terminal:

   ```sh
   sudo apt install xmlstarlet
   ```

1. Use _roslaunch_ with the **multi_uav_mavros_sitl_sdf.launch** launch file:

   ````sh
   roslaunch multi_uav_mavros_sitl_sdf.launch vehicle:=<model_file_name>
   ```

   :::note
   Note that the vehicle model file name argument is optional (`vehicle:=<model_file_name>`); if omitted the [plane model](https://github.com/PX4/PX4-SITL_gazebo-classic/tree/master/models/plane) will be used by default.

:::
   ````
This method is similar to using the xacro except that the SITL/Gazebo Classic port number is automatically inserted by _xmstarlet_ for each spawned vehicle, and does not need to be specified in the SDF file.
To add a new vehicle, you need to make sure the model can be found (in order to spawn it in Gazebo Classic), and PX4 needs to have an appropriate corresponding startup script.
1. You can choose to do either of:
- modify the **single_vehicle_spawn_sdf.launch** file to point to the location of your model by changing the line below to point to your model:

     ```sh
     $(find px4)/Tools/simulation/gazebo/sitl_gazebo-classic/models/$(arg vehicle)/$(arg vehicle).sdf
     ```

:::note
Ensure you set the `vehicle` argument even if you hardcode the path to your model.
:::

   - copy your model into the folder indicated above (following the same path convention).

1. The `vehicle` argument is used to set the `PX4_SIM_MODEL` environment variable, which is used by the default rcS (startup script) to find the corresponding startup settings file for the model. Within PX4 these startup files can be found in the **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/** directory. For example, here is the plane model's [startup script](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/1030_gazebo-classic_plane). For this to work, the PX4 node in the launch file is passed arguments that specify the _rcS_ file (**etc/init.d/rcS**) and the location of the rootfs etc directory (`$(find px4)/build_px4_sitl_default/etc`). For simplicity, it is suggested that the startup file for the model be placed alongside PX4's in **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/**.

## Additional Resources

- See [Simulation](../simulation/README.md) for a description of the UDP port configuration.
- See [URDF in Gazebo](http://wiki.ros.org/urdf/Tutorials/Using%20a%20URDF%20in%20Gazebo) for more information about spawning the model with xacro.
- See [RotorS](https://github.com/ethz-asl/rotors_simulator/tree/master/rotors_description/urdf) for more xacro models.

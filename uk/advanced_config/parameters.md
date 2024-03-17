# Пошук/оновлення параметрів

Поведінку PX4 можна налаштувати/настроїти за допомогою [параметрів](../advanced_config/parameter_reference.md) (наприклад, [Коефіцієнти PID для багатокоптерів](../config_mc/pid_tuning_guide_multicopter.md), інформація про калібрування і т. д.).

Екран _Параметри QGroundControl_ дозволяє вам знайти та змінити **будь-які** параметри, пов'язані з транспортним засобом. Доступ до цього екрану здійснюється за допомогою натискання значка застосунка **Q** > **Налаштування транспортного засобу**, а потім _Параметри_ у бічному меню.

:::note
Більшість з найбільш поширених параметрів зручніше налаштовувати за допомогою відповідних екранів налаштувань, як описано в розділі [Стандартна конфігурація](../config/README.md). The _Parameters_ screen is needed when modifying less commonly modified parameters - for example while tuning a new vehicle.
:::

:::warning
Хоча деякі параметри можна змінювати в польоті, це не рекомендується (за винятком випадків, якщо це явно зазначено в керівництві).
:::

<a id="finding"></a>

## Пошук параметра

You can search for a parameter by entering a term in the _Search_ field. This will show you a list of all parameter names and descriptions that contain the entered substring (press **Clear** to reset the search, and use the **Show modified only** checkbox to filter out unchanged parameters).

![Parameters Search](../../assets/qgc/setup/parameters/parameters_search.png)

You can also browse the parameters by type and group by clicking on the buttons to the left (in the image below the _DShot_ group in the _Standard_ parameters is selected).

![Parameters Screen](../../assets/qgc/setup/parameters/parameters_px4.png)

You can expand/collapse the "type" groupings as shown. Note that the groups at the bottom named _Component X_ are attached [DroneCAN peripherals](../dronecan/README.md#qgc-cannode-parameter-configuration) ("X" is the node id). [QGC can set the parameters](../dronecan/README.md#qgc-cannode-parameter-configuration) of these peripherals if they are attached to the Flight Controller when QGC is started.

![Parameters Types - collapsed](../../assets/qgc/setup/parameters/parameters_types.png)

:::tip
If you can't find an expected parameter, see the [next section](#missing).
:::

<a id="missing"></a>

## Відсутні Параметри

Parameters are usually not visible because either they are conditional on other parameters, or they are not present in the firmware (see below).

### Умовні параметри

A parameter may not be displayed if it is conditional on another parameter that is not enabled.

You can usually find out what parameters are conditional by searching the [full parameter reference](../advanced_config/parameter_reference.md) and other documentation. In particular [serial port configuration parameters](../peripherals/serial_configuration.md) depend on what service is assigned to a serial port.

### Parameter Not In Firmware

A parameter may not be present in the firmware because you're using a different version of PX4 or because you're using a build in which the associated module is not included.

New parameters are added in each PX4 version, and existing parameters are sometimes removed or renamed. You can check whether a parameter _should_ be present by reviewing the [full parameter reference](../advanced_config/parameter_reference.md) for the version you're targeting. You can also search for the parameter in the source tree and in the release notes.

The other reason that a parameter might not be in firmware is if its associated module has not been included. This is a problem (in particular) for _FMUv2 firmware_, which omits many modules so that PX4 can fit into the 1MB of available flash. There are two options to solve this problem:

- Check if you can update your board to run FMUv3 firmware, which includes all modules: [Firmware > FMUv2 Bootloader Update](../config/firmware.md#bootloader)
- If your board can only run FMUv2 firmware you will need to [rebuild PX4](../dev_setup/building_px4.md) with the missing modules enabled. You need reconfigure the PX4 firmware itself through make px4_fmuv2_default boardconfig where you can enabled/disable modules.

  :::note
You may also need to disable other modules in order to fit the rebuilt firmware into 1MB flash.
Finding modules to remove requires some trial/error and depends on what use cases you need the vehicle to meet.
:::

<a id="changing"></a>

## Changing a Parameter

To change the value of a parameter click on the parameter row in a group or search list. This will open a side dialog in which you can update the value (this dialog also provides additional detailed information about the parameter - including whether a reboot is required for the change to take effect).

![Changing a parameter value](../../assets/qgc/setup/parameters/parameters_changing.png)

:::note
When you click **Save** the parameter is automatically and silently uploaded to the connected vehicle. Depending on the parameter, you may then need to reboot the flight controller for the change to take effect.
:::

## Інструменти

Ви можете вибрати додаткові опції у меню **Інструменти** у верхньому правому куті екрану.

![Tools menu](../../assets/qgc/setup/parameters/parameters_tools_menu.png)

**Оновити** <br>Оновити значення параметрів, повторно запросивши їх усі від транспортного засобу.

**Скинути все на заводські налаштування прошивки** <br>Скидання всіх параметрів до їхніх початкових значень за замовчуванням в прошивці.

**Скинути на налаштування за замовчуванням транспортного засобу** <br>Скидання всіх параметрів до їхніх початкових значень за замовчуванням для вибраної конфігурації транспортного засобу.

**Завантажити з файлу / Зберегти до файлу** <br>Завантажте параметри з існуючого файлу або збережіть поточні налаштування параметрів у файл.

**Очистити всі RC до Param** <br>Це очищає всі асоціації між керуванням радіо передавача та параметрами. For more information see: [Radio Setup > Param Tuning Channels](../config/radio.md#param-tuning-channels).

**Перезавантажити Транспортний Засіб** <br>Перезавантажити транспортний засіб (необхідно після зміни деяких параметрів).v

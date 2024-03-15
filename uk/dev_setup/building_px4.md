# Збірка програмного забезпечення PX4

Збірку прошивки PX4 для цільових апаратних платформ та симуляції можна здійснити з вихідного коду в консолі або в IDE.

Вам потрібно зібрати PX4 для того, щоб використовувати [симулятори](../simulation/README.md), або якщо ви хочете модифікувати PX4 і створити свою збірку. Якщо ви просто хочете спробувати PX4 на реальному обладнанні, тоді [завантажте попередньо зібрані бінарні файли](../config/firmware.md) за допомогою QGroundControl (не потрібно виконувати ці інструкції).

Перед виконанням цих інструкцій вам слід встановити [Інструментарій розробника](../dev_setup/dev_env.md) для вашої операційної системи та цільової апаратної платформи. Якщо у вас виникли проблеми після виконання цих кроків, див. розділ [Усунення проблем](#troubleshooting) нижче.
:::

## Завантаження вихідного коду PX4

Вихідний код PX4 зберігається на Github в репозиторії [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot).

Для завантаження _найсвіжішої_ ("main") версії на свій комп'ютер, введіть у терміналі наступну команду:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::note
Це все, що вам необхідно для збірки найновішого коду. За потреби ви також можете [отримати вихідний код певного релізу](../contribute/git_examples.md#get-a-specific-release). [Приклади GIT](../contribute/git_examples.md) пропонують значно більше інформації про роботу з релізами та внеску у PX4.
:::

## Перша збірка (з використанням симулятору jMAVSim)

Спочатку ми зберемо цільову платформу симуляції з використанням консольного середовища. Це дозволяє нам перевірити налаштування системи перед її запуском на реальному обладнанні та IDE.

Перейдіть до директорії **PX4-Autopilot** та запустіть [jMAVSim](../sim_jmavsim/README.md) використовуючи команду нижче:

```sh
make px4_sitl jmavsim
```

Це запустить консоль PX4 як показано нижче:

![PX4 Console (jMAVSim)](../../assets/toolchain/console_jmavsim.png)

:::note
Можливо, ще знадобиться запустити _QGroundControl_ перед тим, як рушити далі, оскільки стандартне налаштування PX4 вимагає наявність звʼязку з наземним оператором перед злетом. Його можна завантажити [звідси](https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html).
:::

Для злету дрону наберіть наступну команду:

```sh
pxh> commander takeoff
```

![jMAVSim UI](../../assets/toolchain/jmavsim_first_takeoff.png)

Дрон можна приземлити, набравши `commander land`. Зупинити симуляцію можна через клавіатурну комбінацію  **CTRL+C** (або через введення `shutdown`).

Симуляція польоту з управлінням з боку наземного оператора є ближчою до реального запуску дрону. В польоті (режимі зльоту) натисніть на місце розташування на карті та пересуньте (увімкніть) повзунковий перемикач. Це перемістить літальний засіб.

![QGroundControl GoTo](../../assets/toolchain/qgc_goto.jpg)

PX4 можна використовувати з низкою інших [симуляторів](../simulation/README.md), включаючи [Gazebo](../sim_gazebo_gz/README.md), [Gazebo Classic](../sim_gazebo_classic/README.md) і [AirSim](../sim_airsim/README.md). Вони також запускаються за допомогою _make_, наприклад:

```sh
make px4_sitl gazebo-classic
```

:::

## Плати на основі NuttX / Pixhawk

### Збірка під NuttX

Щоб зібрати прошивку для плат на основі NuttX або Pixhawk, перейдіть в директорію **PX4-Autopilot** та запустіть `make` з відповідними параметрами для вашої плати.

Наприклад, збірка для плат на основі [Pixhawk 4](../flight_controller/pixhawk4.md) запускається наступною командою:

```sh
cd PX4-Autopilot
make px4_fmu-v5_default
```

Успішне виконання виведе в консолі приблизно наступне в кінці:

```sh
-- Build files have been written to: /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default
[954/954] Creating /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default/px4_fmu-v4_default.px4
```

Перша частина параметру збірки `px4_fmu-v4` вказує на програмне та апаратне забезпечення цільового контролера польоту. Суфікс, у цьому випадку  - `_default`, вказує на _конфігурацію прошивки_, наприклад, підтримку або відсутність певних функцій.

Суфікс `_default` вказувати не обовʼязково. Наприклад, вказування `px4_fmu-v5` чи `px4_fmu-v5_default` приведе до збірки тієї самої прошивки.
:::

У наведеному нижче списку показано команди збірки для плат [Pixhawk standard](../flight_controller/autopilot_pixhawk_standard.md):

- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): `make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): `make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [mRo Pixhawk (FMUv3)](../flight_controller/mro_pixhawk.md): `make px4_fmu-v3_default` (підтримка до 2MB флеш-памʼяті)
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): ` make px4_fmu-v6x_default`

  Для збірки прошивки для цієї плати вам **необхідно** використовувати саме ту версію GCC, яка підтримується (наприклад, ту саму, що використовується у [CI/docker](../test_and_ci/docker.md)), або вилучити ці модулі зі збірки. Збірка прошивки за допомогою компілятора GCC, який не підтримується може зазнати невдачі, оскільки обсяг памʼяті, який займає PX4, близький до ліміту пам'яті плати в 1 МБ.
:::

- Pixhawk 1 з 2 Мб флеш-памʼяті: ` make px4_fmu-v3_default`

Команди збірки для польотних контролерів з NuttX на основі плат відмінних від Pixhawk (та всіх інших плат) надаються в документації для окремих [плат польотних контролерів](../flight_controller/README.md).

### Завантаження прошивки (Прошивка плати)

Додайте `upload` до команд make для завантаження скомпільованого двійкового файлу в апаратне забезпечення автопілоту через USB. Наприклад

```sh
make px4_fmu-v4_default upload
```

Успішне виконання виведе в консолі приблизно наступне:

```sh
Erase : [======================] 100.0%
Програма: [==================100.0%
Перевірка : [================================] 100.0%
Перезавантаження .

[100%] Built target upload
```

## Інші плати

Команди збірки для інших плат надані на [сторінках плат відповідних польотних контролерів](../flight_controller/README.md) (зазвичай під заголовком _Збірка прошивки_).

Список усіх конфігурацій й цілей можна викликати командою:

```sh
make list_config_targets
```

## Компіляція в графічному IDE

[VSCode](../dev_setup/vscode.md) офіційно підтримується (і рекомендується) в якості IDE для PX4-розробки. VSCode просто налаштувати та може використатися для компіляції PX4 як для симуляцій так і для апаратних середовищ.

## Усунення проблем

### Загальні помилки збірки

Більшість проблем при збірці спричинені залежними гілками коду які не збігаються або не до кінця очищеним середовищем збірки. Усунути такі помилки можна через оновлення цих гілок або командою  `distclean`

```sh
git submodule update --recursive
make distclean
```

### Прошивка переповнена на XXX байт

Помилка ` region 'flash' overflowed by XXXX bytes ` вказує на те, що обсяг прошивки перевищує обсяг доступної памʼяті для цільової платформи. Така помилка найчастіше виникає при виконанні команди `make px4_fmu-v2_default`, де обсяг памʼяті обмежений 1 МБ.

При збірці _vanilla_ майстер-гілки (тобто "чистої" майстер-гілки), найімовірнішою причиною виникнення помилки є використання непідтримуваної версії GCC. У такому випадку встановіть версію, зазначену в [Інструментарій розробника](../dev_setup/dev_env.md).

При збірці своєї гілки є ймовірність, що ви збільшили розмір прошивки вище ліміту 1 МБ. В цьому випадку вам доведеться видалити всі не потрібні при цій збірці модулі та драйвера.

### macOS: Помилка "надто багато відкритих файлів"

MacOS дозволяє тримати за замовчуванням відкритими не більше 256 файлів в усіх запущених процесах. При збірці PX4 відкривається велика кількість файлів, тож може статися перевищення цього ліміту.

У ланцюжку збірки (build toolchain) зʼявиться повідомлення `Надто багато відкритих файлів`, як показано нижче:

```sh
/usr/local/Cellar/gcc-arm-none-eabi/20171218/bin/../lib/gcc/arm-none-eabi/7.2.1/../../../../arm-none-eabi/bin/ld: cannot find NuttX/nuttx/fs/libfs.a: Too many open files
```

Рішення полягає в збільшенні максимально дозволеної кількості відкритих файлів (наприклад, до 300). В macOS це можна зробити в _Terminal_ для кожного сеансу:

- Запустіть цей скрипт [Tools/mac_set_ulimit.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/mac_set_ulimit.sh) або
- Введіть наступну команду:

  ```sh
  ulimit -S -n 300
  ```

### macOS Catalina: Складнощі при використанні cmake

При роботі в macOS Catalina 10.15.1 можуть виникнути складнощі при збірці симулятору за допомогою _cmake_. Якщо у вас виникли проблеми на цій платформі, спробуйте виконати наступну команду в терміналі:

```sh
xcode-select --install
sudo ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/* /usr/local/include/
```

### Ubuntu 18.04: Помилки компіляції пов'язані з arm_none_eabi_gcc

Проблеми збірки пов'язані з `arm_none_eabi_gcc` можуть бути спричинені некоректною установкою інструментарію g++. Ви можете перевірити чи це так, перевіряючи чи є відсутні залежності:

```sh
arm-none-eabi-gcc --version
arm-none-eabi-g++ --version
arm-none-eabi-gdb --version
arm-none-eabi-size --version
```

Приклад виводу bash з відсутніми залежностями:

```sh
arm-none-eabi-gdb --version
arm-none-eabi-gdb: command not found
```

Це можна виправити видаливши та [перевстановивши компілятор](https://askubuntu.com/questions/1243252/how-to-install-arm-none-eabi-gdb-on-ubuntu-20-04-lts-focal-fossa).

### Ubuntu 18.04: "Visual Studio Code не може спостерігати за змінами в коді у великому робочому середовищі

Дивіться [Visual Studio Code IDE (VSCode) > Усунення проблем](../dev_setup/vscode.md#troubleshooting).

### Не вдалося імпортувати пакети Python

Помилки "Failed to import" при виконанні команди `make px4_sitl jmavsim` вказує, що деякі пакети Python не встановлені (де очікується).

```sh
Failed to import jinja2: No module named 'jinja2'
You may need to install it using:
    pip3 install --user jinja2
```

Якщо ці залежності вже встановлені, це може бути тому, що на комп'ютері є декілька версій Python (наприклад Python 2.7.16, Python 3.8.3) і модуль не існує в версії, яка використовується в інструментарії збірки.

Ви зможете виправити це явним чином встановивши залежності як показано:

```sh
pip3 install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```

## Цілі збірки PX4

Попередні розділи показали як ви можете запустити _make_, щоб зібрати ряд різних цілей, запустити симулятори, використати IDE і т. ін. Цей розділ показує як параметри _make_ побудовані та як знайти доступний вибір варіантів.

Повний синтаксис для виклику _make_ з певними налаштуваннями та файлом ініціалізації:

```sh
make [VENDOR_][MODEL][_VARIANT] [VIEWER_MODEL_DEBUGGER_WORLD]
```

**VENDOR_MODEL_VARIANT**: (також відома як `CONFIGURATION_TARGET`)

- **VENDOR:** Виробник плати: `px4`, `aerotenna`, `airmind`, `atlflight`, `auav`, `beaglebone`, `intel`, `nxp` тощо. Назва виробника для плат серій Pixhawk - `px4`.
- **MODEL:** _Модель плати_: `sitl`, `fmu-v2`, `fmu-v3`, `fmu-v4`, `fmu-v5`, `navio2` тощо.
- **VARIANT:** Вказує на певні налаштування: наприклад `bootloader`, `cyphal`, що містять компоненти, яких не має в `default` налаштуванні. Найчастіше це саме `default`, тому може бути опущене.

:::tip
Ви можете отримати список _всіх_ доступних параметрів `CONFIGURATION_TARGET` використавши наступну команду:

```sh
make list_config_targets
```

:::

**VIEWER_MODEL_DEBUGGER_WORLD:**

- **VIEWER:** This is the simulator ("viewer") to launch and connect: `gz`, `gazebo`, `jmavsim`, `none` <!-- , ?airsim -->

:::tip
`none` can be used if you want to launch PX4 and wait for a simulator (jmavsim, Gazebo, Gazebo Classic, or some other simulator). For example, `make px4_sitl none_iris` launches PX4 without a simulator (but with the iris airframe).
:::

- **MODEL:** The _vehicle_ model to use (e.g. `iris` (_default_), `rover`, `tailsitter`, etc), which will be loaded by the simulator. The environment variable `PX4_SIM_MODEL` will be set to the selected model, which is then used in the [startup script](../simulation/README.md#startup-scripts) to select appropriate parameters.
- **DEBUGGER:** Debugger to use: `none` (_default_), `ide`, `gdb`, `lldb`, `ddd`, `valgrind`, `callgrind`. For more information see [Simulation Debugging](../debug/simulation_debugging.md).
- **WORLD:** (Gazebo Classic only). Set the world ([PX4-Autopilot/Tools/simulation/gazebo-classic/sitl_gazebo-classic/worlds](https://github.com/PX4/PX4-SITL_gazebo-classic/tree/main/worlds)) that is loaded. Default is [empty.world](https://github.com/PX4/PX4-SITL_gazebo-classic/blob/main/worlds/empty.world). For more information see [Gazebo Classic > Loading a Specific World](../sim_gazebo_classic/README.md#loading-a-specific-world).

:::tip
You can get a list of _all_ available `VIEWER_MODEL_DEBUGGER_WORLD` options using the command below:

```sh
make px4_sitl list_vmd_make_targets
```

:::

Notes:

- Most of the values in the `CONFIGURATION_TARGET` and `VIEWER_MODEL_DEBUGGER` have defaults, and are hence optional. For example, `gazebo-classic` is equivalent to `gazebo-classic_iris` or `gazebo-classic_iris_none`.
- You can use three underscores if you want to specify a default value between two other settings. For example, `gazebo-classic___gdb` is equivalent to `gazebo-classic_iris_gdb`.
- You can use a `none` value for `VIEWER_MODEL_DEBUGGER` to start PX4 and wait for a simulator. For example start PX4 using `make px4_sitl_default none` and jMAVSim using `./Tools/simulation/jmavsim/jmavsim_run.sh -l`.

The `VENDOR_MODEL_VARIANT` options map to particular _px4board_ configuration files in the PX4 source tree under the [/boards](https://github.com/PX4/PX4-Autopilot/tree/main/boards) directory. Specifically `VENDOR_MODEL_VARIANT` maps to a configuration file **boards/VENDOR/MODEL/VARIANT.px4board** (e.g. `px4_fmu-v5_default` corresponds to [boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/default.px4board)).

Additional make targets are discussed in relevant sections:

- `bloaty_compare_master`: [Binary Size Profiling](../debug/binary_size_profiling.md)
- ...

## Firmware Version & Git Tags

The _PX4 Firmware Version_ and _Custom Firmware Version_ are published using the MAVLink [AUTOPILOT_VERSION](https://mavlink.io/en/messages/common.html#AUTOPILOT_VERSION) message, and displayed in the _QGroundControl_ **Setup > Summary** airframe panel:

![Firmware info](../../assets/gcs/qgc_setup_summary_airframe_firmware.jpg)

These are extracted at build time from the active _git tag_ for your repo tree. The git tag should be formatted as `<PX4-version>-<vendor-version>` (e.g. the tag in the image above was set to `v1.8.1-2.22.1`).

:::warning
If you use a different git tag format, versions information may not be displayed properly.
:::

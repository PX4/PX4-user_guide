# Середовище розробки MacOS

Наступні інструкції для встановлення середовища розробки PX4 для macOS. Це середовище може бути використане для збірки PX4 для:

- Pixhawk та іншого апаратного забезпечення на основі NuttX
- [Симуляція jMAVSim](../sim_jmavsim/README.md)
- [Симуляція Gazebo Classic](../sim_gazebo_classic/README.md)

:::tip
Ця установка підтримується командою розробників PX4. Для збірки для інших цільових платформ потрібно використати [інші ОС](../dev_setup/dev_env.md#supported-targets) (або [середовище розробки що не підтримується](../advanced/community_supported_dev_env.md)).
:::

## Відеоінструкція

@[youtube](https://youtu.be/tMbMGiMs1cQ)

## Базове налаштування

"Базове" налаштування macOS встановлює інструменти, необхідні для збірки прошивки та включає загальні інструменти, які будуть потрібні для встановлення/використання симуляторів.

### Налаштування середовища

:::details
Користувачі Apple M1 Macbook! Якщо у вас є Apple M1 Macbook, переконайтеся, що запускаєте x86 термінал шляхом налаштування термінала:

1. Знайдіть термінальний додаток в теці Utilities (**Finder > Меню > Utilities**)
2. Виберіть _Terminal.app_ та клацніть правою кнопкою миші, а потім оберіть **Копіювати**
3. Перейменуйте скопійований додаток терміналу, наприклад _x86 Terminal_
4. Тепер оберіть перейменований додаток _x86 Terminal_ і клацніть правою кнопкою миші та оберіть _Отримати Інформацію_
5. Поставте відмітку **Відкрити з Rosetta** та закрийте вікно
6. Запустіть _x86 Terminal_ як зазвичай, який тепер повинен підтримувати інструментарій PX4 ::

Спочатку налаштуйте середовище

1. Збільште кількість одночасно відкритих файлів додавши наступний рядок у файл `~/.zshenv` (створивши його якщо необхідно):

   ```sh
   echo ulimit -S -n 2048 >> ~/.zshenv
   ```

   ::::note Якщо ви цього не зробите, інструментарій збірки може повідомити про помилку: `"LD: too many open files"` :: :

1. Забезпечте виконання Python 3 додаванням наступних рядків до `~/.zshenv`

   ```sh
   # Направляємо pip3 на системний pip MacOS 
   alias pip3=/usr/bin/pip3
   ```

### Загальні інструменти

To setup the environment to be able to build for Pixhawk/NuttX hardware (and install the common tools for using simulators):

1. Install Homebrew by following these [installation instructions](https://brew.sh).
1. Run these commands in your shell to install the common tools:

   ```sh
   brew tap PX4/px4
   brew install px4-dev
   ```

1. Install the required Python packages:

   ```sh
   # install required packages using pip3
   python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
   # if this fails with a permissions error, your Python install is in a system path - use this command instead:
   sudo -H python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
   ```

## Gazebo Classic Simulation

To setup the environment for [Gazebo Classic](../sim_gazebo_classic/README.md) simulation:

1. Run the following commands in your shell:

   ```sh
   brew unlink tbb
   sed -i.bak '/disable! date:/s/^/  /; /disable! date:/s/./#/3' $(brew --prefix)/Library/Taps/homebrew/homebrew-core/Formula/tbb@2020.rb
   brew install tbb@2020
   brew link tbb@2020
   ```

:::note
September 2021: The commands above are a workaround to this bug: [PX4-Autopilot#17644](https://github.com/PX4/PX4-Autopilot/issues/17644). They can be removed once it is fixed (along with this note).
:::

1. To install SITL simulation with Gazebo Classic:

   ```sh
   brew install --cask temurin
   brew install --cask xquartz
   brew install px4-sim-gazebo
   ```

1. Run the macOS setup script: `PX4-Autopilot/Tools/setup/macos.sh` The easiest way to do this is to clone the PX4 source, and then run the script from the directory, as shown:

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   cd PX4-Autopilot/Tools/setup
   sh macos.sh
   ```

## jMAVSim Simulation

To setup the environment for [jMAVSim](../sim_jmavsim/README.md) simulation:

1. Install a recent version of Java (e.g. Java 15). You can download [Java 15 (or later) from Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) or use [Eclipse Temurin](https://adoptium.net):

   ```sh
   brew install --cask temurin
   ```

1. Install jMAVSim:

   ```sh
   brew install px4-sim-jmavsim
   ```

   :::warning PX4 v1.11 and beyond require at least JDK 15 for jMAVSim simulation.

   For earlier versions, macOS users might see the error `Exception in thread "main" java.lang.UnsupportedClassVersionError:`. You can find the fix in the [jMAVSim with SITL > Troubleshooting](../sim_jmavsim/README.md#troubleshooting)).
:::

## Next Steps

Once you have finished setting up the command-line toolchain:

- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/daily_builds.html)

:::tip
The _daily build_ includes development tools that are hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::

- Continue to the [build instructions](../dev_setup/building_px4.md).

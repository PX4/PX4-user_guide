# Середовище розробки MacOS

Наступні інструкції для встановлення середовища розробки PX4 для macOS. Це середовище може бути використане для збірки PX4 для:

- Pixhawk та іншого апаратного забезпечення на основі NuttX
- [Симуляція Gazebo Classic](../sim_gazebo_classic/index.md)

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
6. Запустіть _x86 Terminal_ як зазвичай, який тепер повинен підтримувати інструментарій PX4
:::

Спочатку налаштуйте середовище

1. Збільште кількість одночасно відкритих файлів додавши наступний рядок у файл `~/.zshenv` (створивши його якщо необхідно):

   ```sh
   echo ulimit -S -n 2048 >> ~/.zshenv
   ```

:::note
Якщо ви цього не зробите, інструментарій збірки може повідомити про помилку: `"LD: too many open files"`
:::

1. Забезпечте виконання Python 3 додаванням наступних рядків до `~/.zshenv`

   ```sh
   # Направляємо pip3 на системний pip MacOS 
   alias pip3=/usr/bin/pip3
   ```

### Загальні інструменти

Для налаштування середовища з можливістю збірки для обладнання Pixhawk/NuttX (і встановлення загальних інструментів для використання симуляторів):

1. Встановіть Homebrew дотримуючись наступних [інструкцій установки](https://brew.sh).
1. Виконайте ці команди в командній оболонці для встановлення загальних інструментів:

   ```sh
   brew tap PX4/px4
   brew install px4-dev
   ```

1. Встановіть необхідні пакети Python:

   ```sh
   # install required packages using pip3
   python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
   # if this fails with a permissions error, your Python install is in a system path - use this command instead:
   sudo -H python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
   ```

## Симуляція Gazebo Classic

Для встановлення середовища [Gazebo Classic](../sim_gazebo_classic/README.md):

1. Виконайте наступні команди в командній оболонці:

   ```sh
   brew unlink tbb
   sed -i.bak '/disable! date:/s/^/  /; /disable! date:/s/./#/3' $(brew --prefix)/Library/Taps/homebrew/homebrew-core/Formula/tbb@2020.rb
   brew install tbb@2020
   brew link tbb@2020
   ```

:::note
Станом на вересень 2021: Команди вище - це обхідний шлях для помилки: [PX4-Autopilot#17644](https://github.com/PX4/PX4-Autopilot/issues/17644). Вони можуть бути видалені після того, як вона буде виправлена (разом з цією нотаткою).
:::

1. Для встановлення симуляції SITL з Gazebo Classic:

   ```sh
   brew install --cask temurin
   brew install --cask xquartz
   brew install px4-sim-gazebo
   ```

1. Запустіть скрипт налаштування macOS: `PX4-Autopilot/Tools/setup/macos.sh` Найпростіший спосіб зробити це - клонувати вихідний код PX4 і потім виконати скрипт з директорії, як показано:

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   cd PX4-Autopilot/Tools/setup
   sh macos.sh
   ```


## Наступні кроки

Після того, як ви закінчите налаштування інструментів командного рядка:

- Встановіть [VSCode](../dev_setup/vscode.md) (якщо ви надаєте перевагу IDE ніж командному рядку).
- Install the [QGroundControl Daily Build](../dev_setup/qgc_daily_build.md)

:::tip
_Денна збірка_ включає інструменти розробки яких немає в релізних збірках. Вона також може надати доступ до нових функцій PX4, які ще не підтримуються в релізних збірках.
:::

- Переходьте до [інструкцій збірки](../dev_setup/building_px4.md).

# Інтеграційне тестування за допомогою MAVSDK

PX4 можна протестувати від початку до кінця за допомогою інтеграційних тестів на основі [MAVSDK](https://mavsdk.mavlink.io).

Тести в основному розробляються для SITL і запускаються в режимі безперервної інтеграції (CI). В майбутньому ми плануємо зробити їх універсальними для будь-якої платформи/обладнання.

Інструкції нижче пояснюють, як налаштувати та запустити тести локально.

## Попередня підготовка

### Налаштування середовища розробника

Якщо ви цього ще не зробили:

- Встановіть набір інструментів розробки для [Linux](../dev_setup/dev_env_linux_ubuntu.md) або [macOS](../dev_setup/dev_env_mac.md) (Windows не підтримується). [Gazebo Classic](../sim_gazebo_classic/README.md) є обов'язковим і має бути встановлений за замовчуванням.
- [Отримати код PX4](../dev_setup/building_px4.md#download-the-px4-source-code):

  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git --recursive
  cd PX4-Autopilot
  ```

### Збірка PX4 для тестування

Щоб зібрати вихідний код PX4 для тестування на симуляторі, скористайтеся:

```sh
DONT_RUN=1 make px4_sitl gazebo-classic mavsdk_tests
```

### Встановлення бібліотеки C++ MAVSDK

Для запуску тестів потрібна бібліотека C++ MAVSDK, встановлена у системі (наприклад, у `/usr/lib` або `/usr/local/lib`).

Встановлюйте або з бінарних файлів, або з джерела:

- [MAVSDK > C++ > C++ QuickStart](https://mavsdk.mavlink.io/main/en/cpp/quickstart.html): Інсталювати як попередньо зібрану бібліотеку на підтримуваних платформах (рекомендовано)
- [MAVSDK > C++ Guide > Building from Source](https://mavsdk.mavlink.io/main/en/cpp/guide/build.html): Зберіть бібліотеку C++ з коду.

## Запуск усіх PX4 тестів

Щоб запустити всі тести SITL, визначені в [sitl.json](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/test/mavsdk_tests/configs/sitl.json), виконайте:

```sh
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10
```

Буде перелічено всі тести, а потім запущено їх послідовно.

Щоб побачити всі можливі аргументи командного рядка, використовуйте аргумент `-h`:

```sh
test/mavsdk_tests/mavsdk_test_runner.py -h

usage: mavsdk_test_runner.py [-h] [--log-dir LOG_DIR] [--speed-factor SPEED_FACTOR] [--iterations ITERATIONS] [--abort-early] [--gui] [--model MODEL]
                             [--case CASE] [--debugger DEBUGGER] [--verbose]
                             config_file

positional arguments:
  config_file           JSON config file to use

optional arguments:
  -h, --help            show this help message and exit
  --log-dir LOG_DIR     Directory for log files
  --speed-factor SPEED_FACTOR
                        how fast to run the simulation
  --iterations ITERATIONS
                        how often to run all tests
  --abort-early         abort on first unsuccessful test
  --gui                 display the visualization for a simulation
  --model MODEL         only run tests for one model
  --case CASE           only run tests for one case
  --debugger DEBUGGER   choice from valgrind, callgrind, gdb, lldb
  --verbose             enable more verbose output
```

## Запуск одного тесту

Запустіть один тест, вказавши `модель` і тест `кейс` як параметри командного рядка. Наприклад, щоб протестувати керування хвостовиком у місії, ви можете виконати:

```sh
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10 --model tailsitter --case 'Fly VTOL mission'
```

Найпростіший спосіб дізнатися поточний набір моделей і пов'язаних з ними тестових випадків - запустити всі тести PX4 [, як показано вище](#run-all-px4-tests) (зауважте, що потім ви можете скасувати збірку, якщо хочете протестувати лише один).

На момент написання статті список, згенерований в результаті запуску всіх тестів, є таким:

```sh
About to run 39 test cases for 3 selected models (1 iteration):
  - iris:
    - 'Land on GPS lost during mission (baro height mode)'
    - 'Land on GPS lost during mission (GPS height mode)'
    - 'Continue on mag lost during mission'
    - 'Continue on baro lost during mission (baro height mode)'
    - 'Continue on baro lost during mission (GPS height mode)'
    - 'Continue on baro stuck during mission (baro height mode)'
    - 'Continue on baro stuck during mission (GPS height mode)'
    - 'Takeoff and Land'
    - 'Fly square Multicopter Missions including RTL'
    - 'Fly square Multicopter Missions with manual RTL'
    - 'Fly straight Multicopter Mission'
    - 'Offboard takeoff and land'
    - 'Offboard position control'
    - 'Fly forward in position control'
    - 'Fly forward in altitude control'
  - standard_vtol:
    - 'Land on GPS lost during mission (baro height mode)'
    - 'Land on GPS lost during mission (GPS height mode)'
    - 'Continue on mag lost during mission'
    - 'Continue on baro lost during mission (baro height mode)'
    - 'Continue on baro lost during mission (GPS height mode)'
    - 'Continue on baro stuck during mission (baro height mode)'
    - 'Continue on baro stuck during mission (GPS height mode)'
    - 'Takeoff and Land'
    - 'Fly square Multicopter Missions including RTL'
    - 'Fly square Multicopter Missions with manual RTL'
    - 'Fly forward in position control'
    - 'Fly forward in altitude control'
  - tailsitter:
    - 'Land on GPS lost during mission (baro height mode)'
    - 'Land on GPS lost during mission (GPS height mode)'
    - 'Continue on mag lost during mission'
    - 'Continue on baro lost during mission (baro height mode)'
    - 'Continue on baro lost during mission (GPS height mode)'
    - 'Continue on baro stuck during mission (baro height mode)'
    - 'Continue on baro stuck during mission (GPS height mode)'
    - 'Takeoff and Land'
    - 'Fly square Multicopter Missions including RTL'
    - 'Fly square Multicopter Missions with manual RTL'
    - 'Fly forward in position control'
    - 'Fly forward in altitude control'
```

## Примітки щодо реалізацій:

- Тести викликаються зі скрипта запуску [mavsdk_test_runner.py](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/test/mavsdk_tests/mavsdk_test_runner.py), який написано на мові Python.

  Окрім MAVSDK, цей модуль запускає `px4`, а також Gazebo для SITL-тестів, і збирає логи цих процесів.

- Модуль виконання тесту - це бінарний файл на мові C++, який містить:
  - Функція [main](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/test/mavsdk_tests/test_main.cpp) для аналізу аргументів.
  - Абстракція навколо MAVSDK з назвою [autopilot_tester](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/test/mavsdk_tests/autopilot_tester.h).
  - Тести з використанням абстракції навколо MAVSDK, наприклад, [test_multicopter_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/test/mavsdk_tests/test_multicopter_mission.cpp).
  - Тести використовують фреймворк модульного тестування [catch2](https://github.com/catchorg/Catch2). Причини використання цього фреймворку наступні:
    - Оператори (`REQUIRE`), необхідні для переривання тесту, можуть бути всередині функцій (а не лише у тесті верхнього рівня, як у [випадку з gtest](https://github.com/google/googletest/blob/main/docs/advanced.md#assertion-placement)).
    - Керування залежностями спрощується, оскільки _catch2_ можна просто включити як бібліотеку, що містить лише заголовки.
    - _Catch2_ підтримує [теги](https://github.com/catchorg/Catch2/blob/devel/docs/test-cases-and-sections.md#tags), що дозволяє легко компонувати тести.

Терміни:

- "модель": Це вибрана модель Gazebo, наприклад, `iris`.
- "тест кейс": Це тест кейс [catch2](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md).

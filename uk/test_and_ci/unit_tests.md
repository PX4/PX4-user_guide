# Модульні Тести

Розробникам рекомендується писати модульні тести на всіх етапах розробки, включаючи додавання нових функцій, виправлення помилок і рефакторинг

PX4 надає декілька методів для написання юніт тестів:

1. Модульні тести з [Google Test](https://github.com/google/googletest/blob/main/docs/primer.md) ("GTest") – тести, які мають мінімальні внутрішні залежності
1. Функціональні тести з GTest - тести, які залежать від параметрів та uORB повідомлень
1. SITL unit tests. This is for tests that need to run in full SITL. Ці тести виконуються набагато повільніше та важче налагодити, тому, якщо можливо, замість них рекомендується використовувати GTest.

## Написання GTest Unit Test

**Порада**: загалом, якщо вам потрібен доступ до розширених утиліт GTest, структур даних із STL або потрібно зв’язатися з `параметрами` чи бібліотеками `uorb`, натомість слід використовувати функціональні тести.

Кроки для створення нових функціональних тестів такі:

1. Unit tests should be arranged in three sections: setup, run, check results. Each test should test one very specific behavior or setup case, so if a test fails it is obvious what is wrong. Please try to follow these standards when possible.
1. Copy and rename the example unit test [AttitudeControlTest](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mc_att_control/AttitudeControl/AttitudeControlTest.cpp) to the directory the code to be tested is in.
1. Add the new file to the directory's `CMakeLists.txt`. It should look something like `px4_add_unit_gtest(SRC MyNewUnitTest.cpp LINKLIBS <library_to_be_tested>)`
1. Add the desired test functionality. This will mean including the header files required for your specific tests, adding new tests (each with an individual name) and putting the logic for the setup, running the code to be tested and verifying that it behaves as expected.
1. If additional library dependencies are required, they should also be added to the CMakeLists after the `LINKLIBS` as shown above.

Тести можна запустити за допомогою `make tests`, після чого ви знайдете двійковий файл у `build/px4_sitl_test/unit-MyNewUnit`. Він може бути запущений безпосередньо в налагоджувачі.

## Написання GTest Functional Test

Функціональні тести GTest слід використовувати, коли тест або компоненти, що тестуються, залежать від параметрів, повідомлень uORB та/або розширеної функціональності GTest. Крім того, функціональні тести можуть містити локальне використання структур даних STL (хоча і будьте обережні відмінності платформ між такими як macOS і Linux).

Кроки для створення нових функціональних тестів такі:

1. Загалом (і подібно до модульних тестів), функціональні тести мають бути організовані за трьома розділами: налаштування, запуск, перевірка результатів. Кожен тест повинен перевіряти одну дуже конкретну поведінку або випадок налаштування, тому, якщо тест провалиться, стане очевидним, що не так. Будь ласка, намагайтеся дотримуватися цих стандартів, коли це можливо.
1. Скопіюйте та перейменуйте приклад функціонального тесту [ParameterTest](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/parameters/ParameterTest.cpp) у каталог, у якому знаходиться код, який потрібно перевірити.
1. Перейменуйте клас з ParameterTest на те, що краще представляє код, що тестується
1. Додайте новий файл до `CMakeLists.txt` каталогу. Це має виглядати приблизно так: `px4_add_functional_gtest(SRC MyNewFunctionalTest.cpp LINKLIBS <library_to_be_tested><library_to_be_tested>)`
1. Додайте бажану функцію тестування. Це означатиме включення файлів заголовків, необхідних для ваших конкретних тестів, додавання нових тестів (кожен з індивідуальною назвою) і розміщення логіки для налаштування тесту, запуск коду, який потрібно перевірити, і перевірку його поведінки, як очікувалося.
1. Якщо потрібні додаткові бібліотечні залежності, їх також слід додати до CMakeLists після `LINKLIBS`, як показано вище.

Tests can be run via `make tests`, after which you will find the binary in `build/px4_sitl_test/functional-MyNewFunctional`. It can be run directly in a debugger, however be careful to only run one test per executable invocation using the [--gtest_filter=\<regex\>](https://github.com/google/googletest/blob/main/docs/advanced.md#running-a-subset-of-the-tests) arguments, as some parts of the uORB and parameter libraries don't clean themselves up perfectly and may result in undefined behavior if set up multiple times.

## Написання SITL Unit Test

SITL unit tests should be used when you specifically need all of the flight controller components - drivers, time, and more. These tests are slower to run (1s+ for each new module), and harder to debug, so in general they should only be used when necessary.

Кроки для створення нових модульних тестів SITL такі:

1. Examine the sample [Unittest-class](https://github.com/PX4/PX4-Autopilot/blob/main/src/include/unit_test.h).
1. Create a new .cpp file within [tests](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/tests) with name **test\_[description].cpp**.
1. Within **test\_[description].cpp** include the base unittest-class `<unit_test.h>` and all files required to write a test for the new feature.
1. Within **test\_[description].cpp** create a class `[Description]Test` that inherits from `UnitTest`.
1. Within `[Description]Test` class declare the public method `virtual bool run_tests()`.
1. Within `[Description]Test` class declare all private methods required to test the feature in question (`test1()`, `test2()`,...).
1. Within **test\_[description].cpp** implement the `run_tests()` method where each test[1,2,...] will be run.
1. Within **test\_[description].cpp**, implement the various tests.
1. At the bottom within **test\_[description].cpp** declare the test.

   ```cpp
   ut_declare_test_c(test_[description], [Description]Test)
   ```

   Тут є шаблон:

   ```cpp
   #include <unit_test.h>
   #include "[new feature].h"
   ...

   class [Description]Test : public UnitTest
   {
   public:
       virtual bool run_tests();

   private:
       bool test1();
       bool test2();
       ...
   };

   bool [Description]Test::run_tests()
   {
       ut_run_test(test1)
       ut_run_test(test2)
       ...

       return (_tests_failed == 0);
   }

   bool [Description]Test::test1()
   {
       ut_[name of one of the unit test functions](...
       ut_[name of one of the unit test functions](...
       ...

       return true;
   }

   bool [Description]Test::test2()
   {
       ut_[name of one of the unit test functions](...
       ut_[name of one of the unit test functions](...
       ...

       return true;
   }
   ...

   ut_declare_test_c(test_[description], [Description]Test)
   ```

   Зауважте, що `ut_[назва однієї з функцій модульного тестування]` відповідає одній із функцій модульного тестування, визначених у [unit_test.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/include/unit_test.h).

1. У [tests_main.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/systemcmds/tests/tests_main.h) визначте новий тест:

   ```cpp
   extern int test_[description](int argc, char *argv[]);
   ```

1. У [tests_main.c](https://github.com/PX4/PX4-Autopilot/blob/main/src/systemcmds/tests/tests_main.c) додайте назву опису, тестову функцію та параметр:

   ```cpp
   ...
   } tests[] = {
       {...
       {"[description]", test_[description], OPTION},
       ...
   }
   ```

   `OPTION` може бути `OPT_NOALLTEST`,`OPT_NOJIGTEST` або `0` і розглядається, якщо в оболонці px4 викликається одна з двох команд:

   ```sh
   pxh> tests all
   ```

   або

   ```sh
   pxh> tests jig
   ```

   Якщо тест має параметр `OPT_NOALLTEST`, тоді цей тест буде виключено під час виклику `tests all`. Те саме стосується `OPT_NOJITEST`, коли викликається команда `test jig`. Варіант `0` означає, що тест ніколи не виключається, і це те, що хоче використовувати більшість розробників.

1. Додайте тест `test_[description].cpp` до [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/src/systemcmds/tests/CMakeLists.txt).

## Тестування на локальній машині

Запустіть повний список модульних тестів GTest, функціональних тестів GTest і модульних тестів SITL прямо з bash:

```sh
make tests
```

Окремі тестові двійкові файли GTest знаходяться в каталозі `build/px4_sitl_test/` і можуть бути запущені безпосередньо в налагоджувачі більшості IDE.

Фільтр, щоб запустити лише підмножину тестів, використовуючи регулярний вираз для імені ctest за допомогою цієї команди:

```sh
make tests TESTFILTER=<regex filter expression>
```

Наприклад:

- `make tests TESTFILTER=unit` лише запускає GTest unit tests
- `make tests TESTFILTER=sitl` лише запускає simulation tests
- `make tests TESTFILTER=Attitude` лише запускає `AttitudeControl` test

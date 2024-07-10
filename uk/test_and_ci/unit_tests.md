# Модульні Тести

Розробникам рекомендується писати модульні тести на всіх етапах розробки, включаючи додавання нових функцій, виправлення помилок і рефакторинг

PX4 надає декілька методів для написання юніт тестів:

1. Модульні тести з [Google Test](https://github.com/google/googletest/blob/main/docs/primer.md) ("GTest") – тести, які мають мінімальні внутрішні залежності
1. Функціональні тести з GTest - тести, які залежать від параметрів та uORB повідомлень
1. Модульні тести SITL. Це і є тести, які повинні запускатися в повному SITL. Ці тести виконуються набагато повільніше та важче налагодити, тому, якщо можливо, замість них рекомендується використовувати GTest.

## Написання GTest Unit Test

**Порада**: загалом, якщо вам потрібен доступ до розширених утиліт GTest, структур даних із STL або потрібно зв’язатися з `параметрами` чи бібліотеками `uorb`, натомість слід використовувати функціональні тести.

Кроки для створення нових функціональних тестів такі:

1. Модульні тести мають бути організовані в три секції: налаштування, запуск, перевірка результатів. Кожен тест повинен перевіряти одну дуже конкретну поведінку або випадок налаштування, тому, якщо тест провалиться, стане очевидним, що не так. Будь ласка, намагайтеся дотримуватися цих стандартів, коли це можливо.
1. Скопіюйте та перейменуйте приклад модульного тесту [AttitudeControlTest](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/modules/mc_att_control/AttitudeControl/AttitudeControlTest.cpp) у каталог, у якому знаходиться код для перевірки.
1. Додайте новий файл до `CMakeLists.txt` каталогу. Це має виглядати приблизно так: `px4_add_unit_gtest(SRC MyNewUnitTest.cpp LINKLIBS <library_to_be_tested><library_to_be_tested>)`
1. Додайте бажану функцію тестування. Це означатиме включення файлів заголовків, необхідних для ваших конкретних тестів, додавання нових тестів (кожен з індивідуальною назвою) і розміщення логіки для налаштування, запуск коду для перевірки та перевірка його поведінки, як очікувалося.
1. Якщо потрібні додаткові бібліотечні залежності, їх також слід додати до CMakeLists після `LINKLIBS`, як показано вище.

Тести можна запустити за допомогою `make tests`, після чого ви знайдете двійковий файл у `build/px4_sitl_test/unit-MyNewUnit`. Він може бути запущений безпосередньо в налагоджувачі.

## Написання GTest Functional Test

Функціональні тести GTest слід використовувати, коли тест або компоненти, що тестуються, залежать від параметрів, повідомлень uORB та/або розширеної функціональності GTest. Крім того, функціональні тести можуть містити локальне використання структур даних STL (хоча і будьте обережні відмінності платформ між такими як macOS і Linux).

Кроки для створення нових функціональних тестів такі:

1. Загалом (і подібно до модульних тестів), функціональні тести мають бути організовані за трьома розділами: налаштування, запуск, перевірка результатів. Кожен тест повинен перевіряти одну дуже конкретну поведінку або випадок налаштування, тому, якщо тест провалиться, стане очевидним, що не так. Будь ласка, намагайтеся дотримуватися цих стандартів, коли це можливо.
1. Скопіюйте та перейменуйте приклад функціонального тесту [ParameterTest](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/lib/parameters/ParameterTest.cpp) у каталог, у якому знаходиться код, який потрібно перевірити.
1. Перейменуйте клас з ParameterTest на те, що краще представляє код, що тестується
1. Додайте новий файл до `CMakeLists.txt` каталогу. Це має виглядати приблизно так: `px4_add_functional_gtest(SRC MyNewFunctionalTest.cpp LINKLIBS <library_to_be_tested><library_to_be_tested>)`
1. Додайте бажану функцію тестування. Це означатиме включення файлів заголовків, необхідних для ваших конкретних тестів, додавання нових тестів (кожен з індивідуальною назвою) і розміщення логіки для налаштування тесту, запуск коду, який потрібно перевірити, і перевірку його поведінки, як очікувалося.
1. Якщо потрібні додаткові бібліотечні залежності, їх також слід додати до CMakeLists після `LINKLIBS`, як показано вище.

Тести можна запускати за допомогою `make tests`, після чого ви знайдете двійковий файл у `build/px4_sitl_test/functional-MyNewFunctional`. Його можна запустити безпосередньо в налагоджувачі, однак будьте обережні, щоб запустити лише один тест для кожного виклику виконуваного файлу, використовуючи аргументи --[--gtest_filter=\<regex\>](https://github.com/google/googletest/blob/main/docs/advanced.md#running-a-subset-of-the-tests), оскільки деякі частини uORB і бібліотек параметрів не очищаються ідеально та може призвести до невизначеної поведінки, якщо налаштувати кілька разів.

## Написання SITL Unit Test

Модульні тести SITL слід використовувати, коли вам конкретно потрібні всі компоненти контролера польоту – водії, час тощо. Ці тести виконуються повільніше (1 с+ для кожного нового модуля) і їх важче налагодити, тому їх слід використовувати лише за необхідності.

Кроки для створення нових модульних тестів SITL такі:

1. Перегляньте зразок [Unittest-класу](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/include/unit_test.h).
1. Створіть новий файл .cpp у тестах [tests](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/tests) із назвою **test\_[description].cpp**.
1. У **test\_[description].cpp** включається базовий unittest-class unit_test.h`<unit_test.h>` і всі файли, необхідні для написання тесту для нової функції.
1. У межах **test\_[description].cpp** створіть клас `[Description]Test`, який успадковує `UnitTest`.
1. У класі `[Description]Test `оголосите відкритий метод `virtual bool run_tests()`.
1. У класі `[Description]Test` оголосити всі приватні методи, необхідні для тестування відповідної функції (`test1()`, `test2()`,...).
1. У межах **test\_[description].cpp** реалізуйте метод `run_tests()`, де запускатиметься кожен тест [1,2,...].
1. У **test\_[description].cpp** реалізуйте різні тести.
1. У нижній частині **test\_[description].cpp** оголосите тест.

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

   Зауважте, що `ut_[назва однієї з функцій модульного тестування]` відповідає одній із функцій модульного тестування, визначених у [unit_test.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/include/unit_test.h).

1. У [tests_main.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/systemcmds/tests/tests_main.h) визначте новий тест:

   ```cpp
   extern int test_[description](int argc, char *argv[]);
   ```

1. У [tests_main.c](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/systemcmds/tests/tests_main.c) додайте назву опису, тестову функцію та параметр:

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

1. Додайте тест `test_[description].cpp` до [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/systemcmds/tests/CMakeLists.txt).

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

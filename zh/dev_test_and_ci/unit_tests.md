# 单元测试

 Developers are encouraged to write unit tests during all parts of development, including adding new features, fixing bugs, and refactoring.

 或者，也可以直接从 bash 运行完整的单元测试：

1. 在 [tests](https://github.com/PX4/Firmware/tree/master/src/systemcmds/tests) 中创建名为 **test_ [description] .cpp** 的新 .cpp 文件。
1. 在 **test_[description].cpp** 中包括基本 unittest-class`&lt;unit_test.h&gt;` 以及为新功能编写测试所需的所有文件。
1. SITL unit tests. This is for tests that need to run in full SITL. These tests are much slower to run and harder to debug, so it is recommended to use GTest instead when possible.

## 编写测试

要查看 px4 shell 中可用测试的完整列表，请执行以下操作：

The steps to create new unit tests are as follows:

1. Unit tests should be arranged in three sections: setup, run, check results. Each test should test one very specific behavior or setup case, so if a test fails it is obvious what is wrong. Please try to follow these standards when possible.
1. 在 [tests_main.c](https://github.com/PX4/Firmware/blob/master/src/systemcmds/tests/tests_main.c) 中添加描述名称，测试功能和选项：
1. Add the new file to the directory's `CMakeLists.txt`. It should look something like `px4_add_unit_gtest(SRC MyNewUnitTest.cpp LINKLIBS <library_to_be_tested>)`
1. Add the desired test functionality. This will mean including the header files required for your specific tests, adding new tests (each with an individual name) and putting the logic for the setup, running the code to be tested and verifying that it behaves as expected.
1. If additional library dependencies are required, they should also be added to the CMakeLists after the `LINKLIBS` as shown above.

Tests can be run via `make tests`, after which you will find the binary in `build/px4_sitl_test/unit-MyNewUnit`. It can be run directly in a debugger.

## Writing a GTest Functional Test

GTest functional tests should be used when the test or the components being tested depend on parameters, uORB messages and/or advanced GTest functionality. Additionally, functional tests can contain local usage of STL data structures (although be careful of platform differences between eg. macOS and Linux).

The steps to creating new functional tests are as follows:

1. In general (and similar to unit tests), functional tests should be arranged in three sections: setup, run, check results. Each test should test one very specific behavior or setup case, so if a test fails it is obvious what is wrong. Please try to follow these standards when possible.
1. 注意，`ut_[name of one of the unit test functions]` 对应于 [unit_test.h ](https://github.com/PX4/Firmware/blob/master/src/include/unit_test.h) 中定义的单元测试函数之一。
1. Rename the class from ParameterTest to something better representing the code being testing
1. Add the new file to the directory's `CMakeLists.txt`. It should look something like `px4_add_functional_gtest(SRC MyNewFunctionalTest.cpp LINKLIBS <library_to_be_tested>)`
1. Add the desired test functionality. This will mean including the header files required for your specific tests, adding new tests (each with an individual name) and putting the logic for the test setup, running the code to be tested and verifying that it behaves as expected.
1. If additional library dependencies are required, they should also be added to the CMakeLists after the `LINKLIBS` as shown above.

Tests can be run via `make tests`, after which you will find the binary in `build/px4_sitl_test/functional-MyNewFunctional`. It can be run directly in a debugger, however be careful to only run one test per executable invocation using the [--gtest_filter=<regex>](https://github.com/google/googletest/blob/master/googletest/docs/advanced.md#running-a-subset-of-the-tests) arguments, as some parts of the uORB and parameter libraries don't clean themselves up perfectly and may result in undefined behavior if set up multiple times.

## Writing a SITL Unit Test

SITL unit tests should be used when you specifically need all of the flight controller components - drivers, time, and more. These tests are slower to run (1s+ for each new module), and harder to debug, so in general they should only be used when necessary.

The steps to create new SITL unit tests are as follows:

1. 在 [tests_main.h](https://github.com/PX4/Firmware/blob/master/src/systemcmds/tests/tests_main.h) 中定义新测试：
1. 在 **test_[description].cpp** 中创建一个继承自 `UnitTest` 的类 `[Description]Test`。
1. 在 **test_ [description].cpp** 中，实现各种测试。
1. 在 **test_ [description].cpp** 中实现 `run_tests（）` 方法，其中将运行每个测试[1,2，...]。
1. 在 `[Description]Test` 类中，声明公共方法 `virtual bool run_tests（）`。
1. 在 `[Description]Test` 类中，声明测试相关特征所需的所有私有方法（`test1（）`，`test2（）`，...）。
1. 在 **test_ [description].cpp** 的底部声明测试。
1. Within **test_[description].cpp**, implement the various tests.
1. At the bottom within **test_[description].cpp** declare the test.
   ```cpp
   ut_declare_test_c(test_[description], [Description]Test)
   ```
   下面是一个模板：
   ```cpp
   #include <unit_test.h>
   #include "[new feature].h"
   ...

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
   PX4 提供了一个简单的基础 [Unittest-class](https://github.com/PX4/Firmware/blob/master/src/include/unit_test.h)。

1. 将测试`test_ [desciption].cpp`添加到 [CMakeLists.txt]（https://github.com/PX4/Firmware/blob/master/src/systemcmds/tests/CMakeLists.txt）。

   ```cpp
   extern int test_[description](int argc, char *argv[]);
   ```
1. Within [tests_main.c](https://github.com/PX4/PX4-Autopilot/blob/master/src/systemcmds/tests/tests_main.c) add description name, test function and option:

   ```cpp
   ...
   } tests[] = {
       {...
       {"[description]", test_[description], OPTION},
       ...
   }
```
   `OPTION` can be `OPT_NOALLTEST`,`OPT_NOJIGTEST` or `0` and is considered if within px4 shell one of the two commands are called: ```bash pxh&gt; tests all

   ```bash
   pxh> tests all
   ```
   or

   ```bash
   pxh> tests jig
   ```
   If a test has option `OPT_NOALLTEST`, then that test will be excluded when calling `tests all`. The same is true for `OPT_NOJITEST` when command `test jig` is called. 选项“0”表示从不排除测试，这是大多数开发人员想要使用的。 The same is true for `OPT_NOJITEST` when command `test jig` is called. Option `0` means that the test is never excluded, which is what most developer want to use.

1. Add the test `test_[description].cpp` to the [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/systemcmds/tests/CMakeLists.txt).


## 在本地计算机上进行测试

Run the complete list of GTest Unit Tests, GTest Functional Tests and SITL Unit Tests right from bash:

```bash
make tests
```

The individual GTest test binaries are in the `build/px4_sitl_test/` directory, and can be run directly in most IDEs' debugger.

Filter to run only a subset of tests using a regular expression for the ctest name with this command:

```bash
pxh> tests help
```

For example:
- `make tests TESTFILTER=unit` only run GTest unit tests
- `make tests TESTFILTER=sitl` only run simulation tests
- `make tests TESTFILTER=Attitude` only run the `AttitudeControl` test

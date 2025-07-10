---
canonicalUrl: https://docs.px4.io/main/zh/test_and_ci/unit_tests
---

# 单元测试

我们鼓励开发人员在开发的每个模块时编写单元测试，包括添加新功能，修复错误和重构。

或者，也可以直接从 bash 运行完整的单元测试：

1. Unit tests with [Google Test](https://github.com/google/googletest/blob/main/docs/primer.md) ("GTest") - tests that have minimal, internal-only dependencies
1. 在 **test_[description].cpp** 中包括基本 unittest-class`&lt;unit_test.h&gt;` 以及为新功能编写测试所需的所有文件。
1. 软件在环(SITL)单元测试。 这些测试需要运行在完整的SITL环境中， 运行起来更慢，更难调试，所以建议尽可能使用GTest代替。

## 编写测试

要查看 px4 shell 中可用测试的完整列表，请执行以下操作：

创建新的单元测试步骤如下：

1. 单元测试分成三个部分：设置、运行、检查结果。 每个单元测试都应该测试一个特定行为或设置案例，如果测试失败，则很明显你的测试代码有错误。 请尽可能遵循这些标准。
1. Copy and rename the example unit test [AttitudeControlTest](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/mc_att_control/AttitudeControl/AttitudeControlTest.cpp) to the directory the code to be tested is in.
1. 将新文件到该目录的`CMakeLists.txt`文件中。 文件看起来像`px4_add_unit_gtest(SRC MyNewUnitTest.cpp LINKLIBS <library_to_be_tested>)`
1. 添加你想要的测试功能。 这包括了添加所需的头文件、新测试(每个测试都应该有单独的名称)，并加入相关逻辑，运行测试代码并验证其行为是否符合预期。
1. 如果需要添加新的依赖库，只要在如上所说的CMakeLists文件中`LINKLIBS`后面加入库的名字。

可以通用 `make tests`命令来运行所有测试，然后在 `build/px4_sitl_test/unit-MyNewUnit`目录中找到二进行制文件。 也可以直接通过调试器中运行。

## 写一个GTest功能测试

当测试或测试的组件依赖参数、uORB 消息、或更高级的GTest功能的时候，应当使用GTest功能测试。 Additionally, functional tests can contain local usage of STL data structures (although be careful of platform differences between e.g. macOS and Linux).

创建一个新的功能测试步骤如下：

1. 一般来说（与单元测试类似）功能测试应分为三个部分：设置，运行，检查结果。 每个单元测试都应该测试一个特定行为或设置案例，如果测试失败，则很明显你的测试代码有错误。 请尽可能遵循这些标准。
1. Copy and rename the example functional test [ParameterTest](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/parameters/ParameterTest.cpp) to the directory the code to be tested is in.
1. 将ParameterTest 重命名为更符合你正在测试的代码功能。
1. 将新文件到该目录的`CMakeLists.txt`文件中。 文件内容看起来像 `px4_add_functional_gtest(SRC MyNewFunctionalTest.cpp LINKLIBS <library_to_be_tested>)`
1. 添加你想要的测试功能。 这包括了，添加特定的头文件、新测试（每个测试都应该使用不同的命名），并设置相关逻辑，运行测试代码并验证是否符合预期。
1. 如果需要添加新的依赖库，只要在如上所说的CMakeLists文件中LINKLIBS后面加入库的名字。

可以通用`make tests`命令来运行所有测试，然后在 `build/px4_sitl_test/functional-MyNewFunctional`目录中找到二进行制文件。 也可以直接通过调试器中运行。 It can be run directly in a debugger, however be careful to only run one test per executable invocation using the [--gtest_filter=\<regex\>](https://github.com/google/googletest/blob/main/docs/advanced.md#running-a-subset-of-the-tests) arguments, as some parts of the uORB and parameter libraries don't clean themselves up perfectly and may result in undefined behavior if set up multiple times.

## 写一个软件在环（SITL）单元测试

当需要所有的飞行控制组件：驱动、时间或者更多时，应该SITL单元测试。 这些测试运行较慢(每个模块至少1秒+)，同时难以测试，所以仅在必要时使用它们。

创建一个新的SITL单元测试步骤如下：

1. Examine the sample [Unittest-class](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/include/unit_test.h).
1. Create a new .cpp file within [tests](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/tests) with name **test_[description].cpp**.
1. 在 **test_ [description].cpp** 中，实现各种测试。
1. 在 **test_ [description].cpp** 中实现 `run_tests（）` 方法，其中将运行每个测试[1,2，...]。
1. 在 `[Description]Test` 类中，声明公共方法 `virtual bool run_tests（）`。
1. 在 `[Description]Test` 类中，声明测试相关特征所需的所有私有方法（`test1（）`，`test2（）`，...）。
1. 在 **test_ [description].cpp** 的底部声明测试。
1. 在 **test_ [description].cpp** 中，实现各种测试。
1. 在 **test_ [description].cpp** 的底部声明测试。
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
   Note that `ut_[name of one of the unit test functions]` corresponds to one of the unittest functions defined within [unit_test.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/include/unit_test.h).

1. Within [tests_main.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/systemcmds/tests/tests_main.h) define the new test:

   ```cpp
   extern int test_[description](int argc, char *argv[]);
   ```
1. Within [tests_main.c](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/systemcmds/tests/tests_main.c) add description name, test function and option:

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
   或

   ```bash
   pxh> tests jig
   ```
   If a test has option `OPT_NOALLTEST`, then that test will be excluded when calling `tests all`. The same is true for `OPT_NOJITEST` when command `test jig` is called. 选项“0”表示从不排除测试，这是大多数开发人员想要使用的。 The same is true for `OPT_NOJITEST` when command `test jig` is called. Option `0` means that the test is never excluded, which is what most developer want to use.

1. Add the test `test_[description].cpp` to the [CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/systemcmds/tests/CMakeLists.txt).


## 在本地计算机上进行测试

Run the complete list of GTest Unit Tests, GTest Functional Tests and SITL Unit Tests right from bash:

```bash
make tests
```

单独的 GTest 测试二进制文件处于`build/px4_sitl_test/` 目录中，可以直接在大多数IDE的调试器中运行。

使用以下命令对ctest名称使用正则表达式对要运行的测试子集进行筛选：

```bash
pxh> tests help
```

例如：
- `make tests TESTFILTER=unit` only run GTest unit tests
- `make tests TESTFILTER=sitl` only run simulation tests
- `make tests TESTFILTER=Attitude` only run the `AttitudeControl` test

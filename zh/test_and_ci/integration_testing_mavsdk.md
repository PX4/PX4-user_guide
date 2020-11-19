# 使用 MAVSDK 进行集成测试

可以使用基于 [MAVSDK](https://mavsdk.mavlink.io) 的集成测试对 PX4 进行端到端测试。

目前主要针对 SITL 开发测试，并在持续集成（CI）中运行。 但是，它们最终旨在推广到实际测试。

## 安装 MAVSDK C++ 库

测试需要将MAVSAK C++库安装到系统目录（如： `/usr/lib` or `/usr/local/lib`）

二进行安装或源码安装：
- [MAVSDK > 安装 > C++](https://mavsdk.mavlink.io/develop/en/getting_started/installation.html#cpp)：以支持的系统上安装预构建库（推荐）
- [MAVSDK > 贡献 > 从源码构建](https://mavsdk.mavlink.io/develop/en/contributing/build.html#build_sdk_cpp)：从源码编译构建 C++ 库。

## 准备 PX4 源码

使用以下命令构建 PX4 源码：

```sh
DONT_RUN=1 make px4_sitl gazebo mavsdk_tests
```

### 运行所有PX4测试

运行 [sitl.json](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/configs/sitl.json) 中定义的所有SITL测试，执行：

```sh
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10
```

要看所有可用的命令行参数，运行：

```sh
test/mavsdk_tests/mavsdk_test_runner.py -h

用法：mavsdk_test_runner。 y [-h] [--log-dir LOG_DIR] [--speed-factor SPEED_FACTOR] [--trerations ITERATION] [--abort-early] [--gui] [--model MODEL]
                             [--case CASE] [--debugger DEBUGER] [--verbose]
                             config_file

posital 参数：
  config_file JSON 使用的JSON配置文件

optional 参数：
  -h, --help 显示此帮助信息并退出
  --log-dir LOG_DIR 日志文件目录
  --speed-factor SPEED_FACTOR
                        模拟运行的速度因子
  --迭代ITERATION
                        在首次失败的测试中运行所有测试的频率
  --abort-early 中止
  --guide 显示模拟的可视化化
  MODEL 只为一个模型运行测试
  --case CASE 只运行测试一个案例
  --debugger DEBUGER 调试器：callgrind, gdb, lldb
  --verbose 启用更详细的输出
```

## 关于实现的说明


- The tests are invoked from the test runner script [mavsdk_test_runner.py](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/mavsdk_test_runner.py), which is written in Python. 该运行程序还启动 `px4` 以及用于 SITL 测试的 Gazebo，并收集这些进程的日志。
- 这个测试运行器是一个 C++ 库 它包含了：
  - The [main](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_main.cpp) function to parse the arguments.
  - An abstraction around MAVSDK called [autopilot_tester](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/autopilot_tester.h).
  - The actual tests using the abstraction around MAVSDK as e.g. [test_multicopter_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_multicopter_mission.cpp).
  - 测试使用 [catch2](https://github.com/catchorg/Catch2) 单元测试框架。 使用这个框架的原因如下：
      - 终止测试所需的断言（`REQUIRE`）可以位于函数内部（而不仅仅是顶层，如 [gtest 测试所示](https://github.com/google/googletest/blob/master/googletest/docs/advanced.md#assertion-placement)）。
      - 依赖关系管理比较容易，因为* catch2 *可以只作为头文件库包含在内。
      - * Catch2 *支持[ tags ](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md#tags)，从而可以灵活地组成测试。


使用的术语：
- "model"：这是选定的Gazebo模型，例如 `iris`。
- "test case": 这是 [catch2 测试用例](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md)。

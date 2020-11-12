# Integration Testing using MAVSDK

PX4 can be tested end to end to using integration tests based on [MAVSDK](https://mavsdk.mavlink.io).

The tests are primarily developed against SITL for now and run in continuous integration (CI). However, they are meant to generalize to real tests eventually.

## Install the MAVSDK C++ Library

The tests need the MAVSDK C++ library installed system-wide (e.g. in `/usr/lib` or `/usr/local/lib`).

Install either from binaries or source:
- [MAVSDK > Installation > C++](https://mavsdk.mavlink.io/develop/en/getting_started/installation.html#cpp): Install as a prebuilt library on supported platforms (recommended)
- [MAVSDK > Contributing > Building from Source](https://mavsdk.mavlink.io/develop/en/contributing/build.html#build_sdk_cpp): Build  C++ library from source.

## Prepare PX4 Code

To build the PX4 code, use:

```sh
DONT_RUN=1 make px4_sitl gazebo mavsdk_tests
```

### Run All PX4 Tests

To run all SITL tests as defined in [sitl.json](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/configs/sitl.json), do:

```sh
test/mavsdk_tests/mavsdk_test_runner.py test/mavsdk_tests/configs/sitl.json --speed-factor 10
```

To see all possible command line arguments, check out:

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

## Notes on implementation


- The tests are invoked from the test runner script [mavsdk_test_runner.py](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/mavsdk_test_runner.py), which is written in Python. This runner also starts `px4` as well as Gazebo for SITL tests, and collects the logs of these processes.
- The test runner is a C++ binary It contains:
  - The [main](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_main.cpp) function to parse the arguments.
  - An abstraction around MAVSDK called [autopilot_tester](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/autopilot_tester.h).
  - The actual tests using the abstraction around MAVSDK as e.g. [test_multicopter_mission.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/test/mavsdk_tests/test_multicopter_mission.cpp).
  - The tests use the [catch2](https://github.com/catchorg/Catch2) unit testing framework. The reasons for using this framework are:
      - Asserts (`REQUIRE`) which are needed to abort a test can be inside of functions (and not just in the top level test as is [the case with gtest](https://github.com/google/googletest/blob/master/googletest/docs/advanced.md#assertion-placement)).
      - Dependency management is easier because *catch2* can just be included as a header-only library.
      - *Catch2* supports [tags](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md#tags), which allows for flexible composition of tests.


Terms used:
- "model": This is the selected Gazebo model, e.g. `iris`.
- "test case": This is a [catch2 test case](https://github.com/catchorg/Catch2/blob/master/docs/test-cases-and-sections.md).

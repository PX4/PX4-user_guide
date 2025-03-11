# PX4 Continuous Integration

PX4 builds and testing are performed using GitHub Actions and a Jenkins server

Tests are running on GitHub Actions using a mix of GitHub Hosted Runners and Self Hosted Runners using Dronecode's Infrastructure on AWS thanks to the [Runs-On project](https://runs-on.com), which helps us run on more advanced compute and to allocate more runners to expensive tasks like building the matrix of supported boards.

## List of GitHub Actions (Workflows)

* [Build all targets](https://github.com/PX4/PX4-Autopilot/actions/workflows/build_all_targets.yml)
* [Checks](https://github.com/PX4/PX4-Autopilot/actions/workflows/checks.yml)

### Build all targets

This action is in charge of testing builds of all the supported hardware available under the `boards/` directory. It depends on a few container images, tools and hard coded file paths that are worth mentioning here for anyone interested in understanding how the builds are done, and how to expand the tests.

#### About the workflow

The workflow runs on Dronecode AWS Infrastructure, as noted in the `runs-on:` tag on the yaml file, using base Ubuntu 22.04. The workflow is divided in three steps describe below:

1. Scan for Board Targets: this step runs the `generate_board_targets_json.py` script which scans the `boards/` directory at the source of the PX4-Autopilot repository, this script outputs targets grouped (more info on the script below) 

**NOTE:** If you are planning on running this workflow on your own fork using GitHub Runners you can comment our runner and uncomment the `ubuntu-latest` one, this is supported.

#### List of dependencies

* `./Tools/ci/generate_board_targets_json.py`: this script is responsible for generating the list of targets to build by each runner (more info below).
* `./Tools/setup/requirements.txt`: for the python requirements of the file above.
* `./Tools/ci/build_all_runner.sh`: this script builds a group of targets (more info below).
* `./Tools/ci/package_build_artifacts.sh`: is responsible for capturing the build artifacts from the `build_all_runner.sh` script (more info below).

#### List of Container Images

As of writing the container images used to build each platform are as follows

* `base`: [px4io/px4-dev-base-focal:2021-09-08](https://hub.docker.com/layers/px4io/px4-dev-base-focal/2021-09-08/images/sha256-2c8f4f1705a7f15e39c1e30043bb7ce0970300297287679b3f2280404d8d8958)
* `nuttx`: [px4io/px4-dev-nuttx-focal:2022-08-12](https://hub.docker.com/layers/px4io/px4-dev-nuttx-focal/2022-08-12/images/sha256-30881ed09e03f0512ac84351c75a4b564431cad868aca8634b033042c153e6c4)
* `aarch64`: [px4io/px4-dev-aarch64:2022-08-12](https://hub.docker.com/layers/px4io/px4-dev-aarch64/2022-08-12/images/sha256-9814428a463b935b29d67b0da07ce0b8ba460714a88a798dd67aa5fce74893db)
* `armhf`: [px4io/px4-dev-armhf:2023-06-26](https://hub.docker.com/layers/px4io/px4-dev-armhf/2023-06-26/images/sha256-a40450559a433f98e93285d8757e775190ae7e3aa0a94590422e4b8a526d7728)

**NOTE:** Source for the containers listed above can be found in the [PX4-Containers repository](https://github.com/PX4/PX4-containers).

#### Scripts

##### Generate Board Targets

This script scans the `./boards/` directory and outputs a JSON string with all targets grouped by the following conditions:

* By manufacturer, when the manufacturer has more than 5 targets, and makes groups of 10 if more than are available 10.
* By platform, when a manufacturer has less boards than 5, it groups them in a generic group for example `nuttx-0, nuttx-1, nuttx-2, armhf-0, aarch64-0`.

In addition to grouping board targets, the JSON file also contains valuable information for the test builder such as:

* `container`: The name of the container name that should be used to build targets as a string.
* `targets`: The list of targets in a group as an array.
* `arch`: The target platform for the group as a string, possible options are [**base**, **nuttx**, **aarch64**, **armhf**].
* `group`: The name of this group, used to identify the test runner in GitHub Actions
* `len`: The length of the array of targets as a string.

**Example of a Group:**

```JSON
{
  'container': 'px4io/px4-dev-nuttx-focal:2022-08-12',
  'targets': 'flywoo_gn-f405_default,omnibus_f4sd_icm20608g,omnibus_f4sd_default,bitcraze_crazyflie_default,bitcraze_crazyflie21_default,hkust_nxt-v1_bootloader,hkust_nxt-v1_default,hkust_nxt-dual_bootloader,hkust_nxt-dual_default,av_x-v1_default',
  'arch': 'nuttx',
  'group': 'nuttx-0',
  'len': 10
},
```

###### How To Run Locally

The main intention of this script is to be run trough CI but it can also be ran locally for debugging. In order to run this script make sure you have the latest python packages installed as defined in `./Tools/setup/requirements.txt`.

**Simple Non Group**

```bash
./Tools/ci/generate_board_targets_json.py
```

**Example Output (truncated):**

```JSON
{
    "include": [
        {
            "target": "flywoo_gn-f405_default",
            "container": "px4io/px4-dev-nuttx-focal:2022-08-12"
        },
        {
            "target": "omnibus_f4sd_icm20608g",
            "container": "px4io/px4-dev-nuttx-focal:2022-08-12"
        },
      ...
    ]
}
```

**Simple Group**

```bash
./Tools/ci/generate_board_targets_json.py --groups
```

**Example Output (truncated):**

```JSON
{
    "include": [
        {
            "container": "px4io/px4-dev-base-focal:2021-09-08",
            "targets": "airframe_metadata,parameters_metadata,extract_events,px4_sitl_allyes,px4_sitl_spacecraft,px4_sitl_default,px4_sitl_zenoh",
            "arch": "base",
            "group": "base-px4",
            "len": 7
        },
        ...
    ]
}
```

**How to Debug Output**

```bash
./Tools/ci/generate_board_targets_json.py --groups --verbose
```

**Example Output (truncated):**

```text
=======================
= scanning for boards =
=======================
excluding label test (nxp_fmuk66-v3_test)
excluding board modalai_voxl2 (modalai_voxl2_default)
excluding label test (cuav_x7pro_test)
excluding label test (cubepilot_cubeorangeplus_test)
excluding label test (cubepilot_cubeorange_test)
excluding label test (px4_fmu-v5x_test)
excluding board px4_ros2 (px4_ros2_default)
excluding label replay (px4_sitl_replay)
excluding label nolockstep (px4_sitl_nolockstep)
excluding label test (px4_sitl_test)
excluding label test (px4_fmu-v4pro_test)
excluding label test (px4_fmu-v4_test)
excluding label stackcheck (px4_fmu-v5_stackcheck)
excluding label test (px4_fmu-v5_test)
============================
= Boards found in ./boards =
============================
{'base': {'container': 'px4io/px4-dev-base-focal:2021-09-08',
          'manufacturers': {'px4': ['airframe_metadata',
                                    'parameters_metadata',
                                    'extract_events',
                                    'px4_sitl_allyes',
                                    'px4_sitl_spacecraft',
                                    'px4_sitl_default',
                                    'px4_sitl_zenoh']}},
  ...
 }
 ...
 ```

##### Build Runner Script

This script is only mean to be run from a GitHub Runner, either a GitHub Runner or a Self Hosted Runner. It's very simple and takes a comma delimited list of targets in a single string. It splits the string using the comma as a separator and builds each target, it also outputs a few nice verbose strings like build time, and lastly groups the build output so it doesn't clutter the log.

**Example Output in the Workflow View**

```text
Building: [airframe_metadata]
Building: [parameters_metadata]
Building: [extract_events]
Building: [px4_sitl_spacecraft]
Building: [px4_sitl_default]
Building: [px4_sitl_allyes]
Building: [px4_sitl_zenoh]
```

Additionally it outputs a summary of the job in the Summary of the GitHub Workflow

```
### :clock1: Build Times
* **airframe_metadata** - 0h 0m 7s elapsed
* **parameters_metadata** - 0h 0m 4s elapsed
* **extract_events** - 0h 0m 1s elapsed
* **px4_sitl_spacecraft** - 0h 0m 47s elapsed
* **px4_sitl_default** - 0h 0m 37s elapsed
* **px4_sitl_allyes** - 0h 1m 45s elapsed
* **px4_sitl_zenoh** - 0h 1m 34s elapsed
```

##### Package Artifacts

The `./Tools/ci/package_build_artifacts.sh` script is also only meant to be ran trough a GitHub Runner. The main goal is to copy all the build artifacts found under `./build/` into a directory where it can be later uploaded to the GitHub Workflow Artifacts for each run, so anyone can download the binaries and test them. The script moves everything to an "artifacts" directory created at the root of the project, and separates artifacts by creating a sub-directory with the target name e.g.: `/artifacts/px4_sitl/`

List of Artifacts it tries to Package from the build directory

* `*.px4` files
* `*.elf` files
* `airframes.xml`
* `parameters.xml`
* `parameters.json`
* `parameters.json.xz`
* `actuators.json`
* `actuators.json.xz`

### Checks

This is an older test that has been used to append tests that don't fit elsewhere, it has a collection of tests (listed below) that vary in usefulness and are overall styling checks. They are mostly build checks and ran using the `px4io/px4-dev-nuttx-focal:2022-08-12` container image. Developers are encouraged to run these locally if they find an error in CI.

* "check_format"
* "check_newlines"
* "tests"
* "tests_coverage"
* "px4_fmu-v2_default stack_check"
* "validate_module_configs"
* "shellcheck_all"
* "NO_NINJA_BUILD=1 px4_fmu-v5_default"
* "NO_NINJA_BUILD=1 px4_sitl_default"
* "px4_sitl_allyes"
* "module_documentation"

### Clang Tidy

Runs [Clang-Tidy](https://clang.llvm.org/docs/ClangFormatStyleOptions.html) lint and static code analysis checks on every pull request using the `px4io/px4-dev-clang:2021-09-08` container image. It runs the `make clang-tidy-quiet` target which builds PX4 and runs clang-tidy.

### Compile MacOS

Runs on GitHub Runner for MacOS with the explicit `macos-latest` label, it installs the pythong packages under `./Tools/setup/requirements.txt` and runs the installer for MacOS under `./Tools/setup/macos.sh` before trying to build the following targets.

* `px4_fmu-v5_default`
* `px4_sitl`

### Compile Ubuntu

Runs on a Self Hosted GitHub Runner on Dronecode AWS Infrastructure (thanks to Runs-On), this workflow runs a matrix of the two supported Ubuntu versions, as of writing they are the latest Ubuntu LTS (24.04), and the prior (Ubuntu 22.04), using the [ubuntu:22.04](https://hub.docker.com/layers/library/ubuntu/22.04/images/sha256-33d782143e3a76315de8570db1673fda6d5b17c854190b74e9e890d8e95c85cf), and [ubuntu:24.04](https://hub.docker.com/layers/library/ubuntu/24.04/images/sha256-3afff29dffbc200d202546dc6c4f614edc3b109691e7ab4aa23d02b42ba86790) containers from docker hub.

The test is simple, run the `./Tools/setup/ubuntu.sh` script to install dependencies and try to build `make quick_check`. This test guarantees we have a valid `./Tools/setup/ubuntu.sh` installer script and we continue to support the two last LTS releases from Ubuntu.

### Development Container

This workflow creates a development container for PX4 installing all the required dependencies under Ubuntu 24.04, and when triggered via a tag event (for releases) it builds and publishes a `px4-dev` container to both the GitHub and Docker Hub Registries.

Additionally, the container images are built with multi-arch support for both **x86**, and **arm64**, guaranteeing native builds and better performance.

**Note:** These containers are intended to replace the development containers found under `PX4/PX4-Containers` repository.


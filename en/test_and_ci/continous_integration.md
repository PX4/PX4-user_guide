# PX4 Continuous Integration

PX4 uses continuous integration (CI) to build and run tests against every pull request (PR) and release, and to generate build artifacts such as firmware, documentation updates, and various metadata files needed by other components, like QGroundControl.

The integration system uses GitHub actions and a Jenkins server.
Most of the major configuration files for these systems can be found in the [PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) repo main branch:
- [Jenkinsfile](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile)
- [.ci/Jenkinsfile-hardware](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-hardware)
- [.ci/Jenkinsfile-compile](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-compile)
- [.github/workflows/](https://github.com/PX4/PX4-Autopilot/tree/main/.github/workflows)

## Jenkins

Although referred to as "Jenkins", PX4 has two Jenkins servers, and multiple pipelines running in parallel. Here are the summary of most pipelines:

### Non-hardware Jenkins

A Webhook is configured to [ci.px4.io/](http://ci.px4.io/) for every event of Pushes (new commits, branches) and Pull Requests in PX4-Autopilot repository.

| Pipeline Name | Description | Trigger | Script |
|---|---|---|---|
| [PX4_misc/*](http://ci.px4.io/job/PX4_misc/) | These are helper pipelines for once-in-a-while, miscellaneous tasks needed for PX4 ecosystem, and the scripts are not documented within the PX4-Autopilot repository. | NA | NA |
| [PX4_misc/Firmware-compile](http://ci.px4.io/job/PX4_misc/job/Firmware-compile/) (On Github shown as **Jenkins Compile All Boards**) | Builds specific list of board targets to check if they all compile. | Pushes & Pull Requests (all Webhook events) | [.ci/Jenkinsfile-compile](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-compile) |
| [PX4_misc/Firmware_update-world_magnetic_model](http://ci.px4.io/job/PX4_misc/job/Firmware_update-world_magnetic_model/) | Create PR updating world magnetic model data | Manual | In Jenkins |
| [PX4_misc/Firmware_update_nuttx_kconfigs](http://ci.px4.io/job/PX4_misc/job/Firmware_update_nuttx_kconfigs/) | Create PR updating inconsistent NuttX KConfig files | Manual | In Jenkins |
| [PX4_misc/Firmware_update_submodules](http://ci.px4.io/job/PX4_misc/job/Firmware_update_submodules/) | Create PRs updating the submodules to latest | Manual | In Jenkins |
| [PX4/*](http://ci.px4.io/job/PX4/) | Main CI pipelines for PX4 ecosystem | NA | NA |
| [PX4/PX4-Autopilot](http://ci.px4.io/job/PX4/job/PX4-Autopilot/) (On Github shown as **continuous-integration/jenkins/branch or pr-head**) | Updates the `master` metadata files in the S3 bucket | Push to `main` | [Jenkinsfile](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile) |
| [PX4/PX4-user_guide](http://ci.px4.io/job/PX4/job/PX4-user_guide/) | Builds the Html version of the user guide from the markdown format and deploys to the web | Updates in `main` (latest) or `v1.*` (past releases) branches | [PX4-user_guide/Jenkinsfile](https://github.com/PX4/PX4-user_guide/blob/main/Jenkinsfile) |

For the full view of all different pipelines, visit [ci.px4.io/](http://ci.px4.io/).

### Hardware testing Jenkins

A Webhook is configured to [px4-jenkins.dagar.ca](http://px4-jenkins.dagar.ca:8080/) for every event of Pushes (new commits, branches) and Pull Requests in PX4-Autopilot repository.

| Pipeline Name | Description | Trigger | Script |
|---|---|---|---|
| [PX4-Autopilot](http://px4-jenkins.dagar.ca:8080/job/PX4-Autopilot/) (On Github shown as **continuous-integration/jenkins/branch**) | Runs hardware test script | Pushes & Pull Requests (all Webhook events) | [.ci/Jenkinsfile-hardware](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-hardware) |

Hardware rack is composed of actual hardware connected via USB, each connected with separate Jenkins nodes currently as following:

- `cubepilot_cubeorange_test`: Cubepilot CubeOrange
- `cuav_x7pro_test`: CUAV X7 Pro
- `px4_fmu-v4_test`: FMU v4
- `px4_fmu-v4pro_test`: FMU v4 Pro
- `px4_fmu-v5_debug`: FMU v5 with debug flag, prints out debug information
- `px4_fmu-v5_stackcheck`: FMU v5 compiled with stackcheck, detects stack overflow, etc.
- `px4_fmu-v5_test`: FMU v4
- `nxp_fmuk66-v3_test`: FMU k66 v3

Note that `_test` label for the target means ... (TODO)

It performs the following tests on each build node targets:

- Build: Build bootloader and firmware binary files
- Flash: Flash the hardware via USB, JLink, and other methods (specific to hardware)
- Tests: Various tests regarding sensors, commander module, uorb topics, etc.
- Status: Reboot and check filesystem (/proc, /dev, etc), module, system commands, and do quick IMU calibration
- Print topics: Print out selected set of uORB topic data (for debugging purposes)

This CI is crucial for detecting failures in hardware that can't be detected via Software CI tools, such as hardfault, NuttShell, NuttX bugs, etc.

For the full test script, visit [.ci/Jenkinsfile-hardware](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-hardware).

To view all the past runs of the hardware rack CI, visit [px4-jenkins.dagar.ca](http://px4-jenkins.dagar.ca:8080/job/PX4-Autopilot/).

<!--
- [PX4_misc/*](http://ci.px4.io/job/PX4_misc/): These are helper pipelines for once-in-a-while, miscellaneous tasks needed for PX4 ecosystem, and the scripts are not documented within the PX4-Autopilot repository.
  - [PX4_misc/Firmware-compile](http://ci.px4.io/job/PX4_misc/job/Firmware-compile/) (**Jenkins Compile All Boards**): Builds specific list of board targets to check if they all compile. This is redundant with the [deploy_all](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/deploy_all.yml) Github Action, and is configured via [.ci/Jenkinsfile-compile](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-compile)
  - [PX4_misc/Firmware_update-world_magnetic_model](http://ci.px4.io/job/PX4_misc/job/Firmware_update-world_magnetic_model/)
  - [PX4_misc/Firmware_update_nuttx_kconfigs](http://ci.px4.io/job/PX4_misc/job/Firmware_update_nuttx_kconfigs/)
  - [PX4_misc/Firmware_update_submodules](http://ci.px4.io/job/PX4_misc/job/Firmware_update_submodules/)
- [PX4/*](http://ci.px4.io/job/PX4/): These contain main continuous-integration pipelines needed for PX4 ecosystem
  - [PX4/PX4-user_guide](http://ci.px4.io/job/PX4/job/PX4-user_guide/): Builds the Html version of the user guide from the markdown format and deploys to the web
  - [PX4/PX4-Autopilot](http://ci.px4.io/job/PX4/job/PX4-Autopilot/) (**continuous-integration/jenkins/branch**): Main Jenkins handling updating the metadata when the `main` branch is updated (Configured via the [Jenkinsfile](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile) in PX4-Autopilot repository)
- [px4-jenkins.dagar.ca:8080/](http://px4-jenkins.dagar.ca:8080/): Separate Jenkins from Daniel, maintainer of PX4-Autopilot
  - [PX4-Autopilot](http://px4-jenkins.dagar.ca:8080/job/PX4-Autopilot/) (**continuous-integration/jenkins/branch**) hardware test rack CI, configured from the [.ci/Jenkinsfile-hardware](https://github.com/PX4/PX4-Autopilot/blob/main/.ci/Jenkinsfile-hardware)

This document outlines how the different parts of the CI system are configured and connected.
-->

## Pull Requests

Automated CI checks are run for every [Pull-Request (PR)](https://github.com/PX4/PX4-Autopilot/pulls).

Most of the test are run using the Github workflows in [.github/workflows](https://github.com/PX4/PX4-Autopilot/tree/main/.github/workflows):

- `compile_nuttx.yml`:
  Builds NuttX flight controller board targets.
  It can detect Flash overflows and code syntax errors.
- `sitl_tests.yml`:
  Executes [MAVSDK SITL Tests](./integration_testing_mavsdk.md).
  It runs Missions, Offboard control, Failsafe, Follow me, etc to check functionality of various features of PX4 (and uploads test logs to [Flight Review](../log/flight_review.md))
- `mavros_mission_tests.yml`:
  Executes mission plans using MAVROS.
  Detects system level bugs in close, and also verifies compatibility between MAVROS and PX4.
- `checks.yml`:
  Runs various make targets (using `make` command).
  The commands for each targets are documented in the [Makefile](https://github.com/PX4/PX4-Autopilot/blob/main/Makefile)
  - `check_format`: Checks the coding style format using AStyle.
  - `airframe_metadata`: Builds airframe XML metadata
  - `parameters_metadata`: Builds parameter XML metadata
  - `module_documentation`: Builds module documentation
  - `tests`: Runs unit tests
  - `tests_coverage`: Runs coverage tests
  - ... (other auxiliary tests)
- `ekf_functional_change_indicator.yml`: Check if there's any functionality change in EKF by feeding data of a log and comparing the estimator output with expected values in .csv file
- `ekf_update_change_indicator.yml`: Updates the test data (.csv file) for the EKF functional change test
- `failsafe_sim.yml`: Builds [failsafe simulator](../config/safety_simulation.md)
- `clang-tidy.yml`: Runs Clang Tidy to detect problematic code patterns (e.g. dead code)
- `compile_linux.yml`: Builds linux flight controller board targets
- `deploy_all.yml`: Uploads updated metadata to S3 when `main` or `release/*` branches are updated

You can check the past runs of the Github Actions from the [Actions tab](https://github.com/PX4/PX4-Autopilot/actions) of the PX4-Autopilot repository.

Aside from that, there is also a (currently disabled) hardware rack CI running from Jenkins, as documented [above](#hardware-testing-jenkins).

## PX4 Releases/main

Upon updates to the past release branches (`release/*`), `main`, or creation of a new release tag, several CI pipelines run together.

### Firmware

PX4 manages firmware (.px4 file) files in 3 different categories onboard the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/) to enable download through QGC's Firmware page:

- Stable: Latest stable release that has went though beta tests (`stable` branch)
- Beta: Latest release candidate / beta releases for early bird testing (`beta` branch)
- Master: Latest development build (`main` branch)

These are stored in separate directories (e.g. for the latest stable firmware for FMUv5x target: https://px4-travis.s3.amazonaws.com/Firmware/stable/px4_fmu-v5x_default.px4).

Process of updating the firmware files are done manually upon updates to the branches (stable, beta, main) by a maintainer, via triggering appropriate pipeline in the Jenkins Server:

- [PX4_misc/Firmware_s3_deploy_stable](http://ci.px4.io/blue/organizations/jenkins/PX4_misc%2FFirmware_s3_deploy_stable/activity)
- [PX4_misc/Firmware_s3_deploy_beta](http://ci.px4.io/blue/organizations/jenkins/PX4_misc%2FFirmware_s3_deploy_beta/activity)
- [PX4_misc/Firmware_s3_deploy_main](http://ci.px4.io/blue/organizations/jenkins/PX4_misc%2FFirmware_s3_deploy_main/activity)


### Metadata (machine-readable)

Machine-readable metadata files (parameters, events, etc) are newly built upon changes to the release / `main` branch, and new release tags.

They are mainly used by QGroundControl to fetch the latest metadata necessary to display an up-to-date version specific UI for Actuators page / Airframes, etc.

Metadata deployment is managed by the [.github/workflows/deploy_all.yml](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/deploy_all.yml) workflow.

For each board target, the artifacts built are:

- Parameter metadata (`parameters.*`)
- Events metadata (`events/*.xz`)
- Actuators metadata (`actuators.json*`)

These files are uploaded to the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/) into appropriate folders (e.g. http://px4-travis.s3.amazonaws.com/Firmware/master/px4_fmu-v5_default/actuators.json).

### Updates to other repositories

As explained in detail below, there is a separate Jenkins pipeline updating the relevant metadata / documents in various repositories within PX4 ecosystem upon changes to the release / `main` branch, and new release tags.

This pipeline, [PX4/PX4-Autopilot](http://ci.px4.io/job/PX4/job/PX4-Autopilot/) is defined via the [PX4-Autopilot/Jenkinsfile](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile), and does the following:

- Analysis
  - Airframe metadata
  - Module documentation
  - Parameter metadata
  - Failsafe documentation
  - uORB Message file documentation
  - uORB Graph file
- Deployment
  - Update of PX4 Documentation
  - Update on QGroundControl
  - Update on PX4 ROS Messages
  - Update of metadata in S3 (redundant to `deploy_all.yml` Github Action)


## PX4 Documentation

Jenkins uses the [PX4BuildBot](https://github.com/PX4BuildBot) account to upload the following metadata to the [PX4-user_guide](https://github.com/PX4/PX4-user_guide) repo when the PX4-Autopilot `main` branch is altered.

- `airframes_reference.md`: Markdown for [Airframes Reference Documentation](../airframes/airframe_reference.md)
- `parameter_reference.md`: Markdown for [Parameter Reference Documentation](../advanced_config/parameter_reference.md)
- `modules/*.md`: Markdown for [Modules documentation](../modules/README.md)
- `graph_*.json`: JSON defining uORB Graph, visualized in [uORB Graph](../middleware/uorb_graph.md) page
- `msg_docs/*.md`: Markdown for [uORB Messages documentation](../msg_docs/README.md)
- `failsafe_sim/*`: Files for [Failsafe Simulator Interface](../config/safety_simulation.md)

An example commit can be found [here](https://github.com/PX4/PX4-user_guide/commit/a4ffaf5fc32df8650da614aa3129b3b90794584f).

The PX4 user guide is built when there are any changes to the [PX4-user_guide](https://github.com/PX4/PX4-user_guide) repo `main` or `v1.*` branches, including the addition of the metadata above.
This ensures ensures that the "main" version of the documentation is always up to date.

Note that the documentation build is also run using Jenkins CI, and is based on the definition in [PX4-user_guide/Jenkinsfile](https://github.com/PX4/PX4-user_guide/blob/main/Jenkinsfile).


## QGroundControl

The PX4 firmware uploaded by Jenkins is used by QGroundControl for [PX4 Firmware updates](../config/firmware.md) (stable: `release/*` / beta: `main`).

The Jenkins server uses the [PX4BuildBot](https://github.com/PX4BuildBot) account to update the following metadata files in QGC source tree.

- `airframes.xml`: Airframes metadata describing all supported airframes
- `parameters.xml`: Parameters metadata describing all supported parameters

QGC uses the above information for populating the [airframe selection](../config/airframe.md) page for PX4 and the _default_ parameter metadata information (QGC will use parameter metadata from the vehicle instead if it is available).
An example commit of parameter metadata can be found [here](https://github.com/mavlink/qgroundcontrol/commit/7f4f3b6253fe80a881e9a91a1f5b6d960ad11834).

Note that QGroundControl normally gets metadata for [Events](../concept/events_interface.md#implementation)and [Parameters](../advanced/parameters_and_configurations.md#publishing-parameter-metadata-to-a-gcs) from the vehicle (it is built into the firmware, or a URL is provided in the firmware from which it can be downloaded).


## Other

Jenkins also updates the PX4 ROS messages repository [PX4/px4_msgs](https://github.com/PX4/px4_msgs) and uploads the metadata to the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/).
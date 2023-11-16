# PX4 Continuous Integration

PX4 uses continuous integration (CI) to build and run tests against every pull request (PR) and release, and to generate build artifacts such as firmware, documentation updates, and various metadata files needed by other components, like QGroundControl.

The integration system uses GitHub actions and a Jenkins server.
The configuration files for these systems can be found in the [PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) repo main branch:
- [Jenkinsfile](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile)
- [.github/workflows/](https://github.com/PX4/PX4-Autopilot/tree/main/.github/workflows).

The Jenkins build status can be viewed in [ci.px4.io:8080/job/PX4/](http://ci.px4.io:8080/job/PX4/)

This document outlines how the different parts of the CI system are configured and connected.

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

## PX4 Releases/main

### Firmware

PX4 manages firmware (.px4 file) files in 3 different categories onboard the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/):

- Stable: Latest stable release that has went though beta tests
- Beta: Latest release candidate / beta releases for early bird testing
- Master: Latest build directly from the `main` branch

These are stored in separate directories (e.g. for the latest stable firmware for FMUv5x target: https://px4-travis.s3.amazonaws.com/Firmware/stable/px4_fmu-v5x_default.px4).

Process of updating the firmware files are done when appropriate branches (stable, beta) are updated by a maintainer, via the Jenkins Server by following pipelines:

- [PX4_misc/Firmware_s3_deploy_stable](http://ci.px4.io/blue/organizations/jenkins/PX4_misc%2FFirmware_s3_deploy_stable/activity)
- [PX4_misc/Firmware_s3_deploy_beta](http://ci.px4.io/blue/organizations/jenkins/PX4_misc%2FFirmware_s3_deploy_beta/activity)
- [PX4_misc/Firmware_s3_deploy_main](http://ci.px4.io/blue/organizations/jenkins/PX4_misc%2FFirmware_s3_deploy_main/activity)

### Metadata (machine-readable)

Machine-readable metadata files (parameters, events, etc) are built when changes are made to the `main` branch or to `release/*` branches (any releases).
They are used by QGroundControl mainly to fetch the latest metadata necessary to display an up-to-date UI for Actuators page / Airframes, etc.

Metadata deployment is managed by the [.github/workflows/deploy_all.yml](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/deploy_all.yml) workflow.

For each board target, the artifacts built are:

- Parameter metadata (`parameters.*`)
- Events metadata (`events/*.xz`)
- Actuators metadata (`actuators.json*`)

These files are uploaded to the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/) into appropriate folders (e.g. http://px4-travis.s3.amazonaws.com/Firmware/master/px4_fmu-v5_default/actuators.json).

### Metadata (human-readable)

If there are changes to the `main` branch Jenkins builds / deploys metadata to the documentation and QGroundControl repository directly, based on the definitions in [PX4-Autopilot/Jenkinsfile](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile).
This is documented below.

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

The PX4 firmware uploaded by `deploy_all.yml` is used by QGroundControl for [PX4 Firmware updates](../config/firmware.md) (stable: `release/*` / beta: `main`).
 
The Jenkins server uses the [PX4BuildBot](https://github.com/PX4BuildBot) account to upload the following metadata to QGC whenever there is an update to main or a release branch:

- `airframes.xml`: Airframes metadata describing all supported airframes
- `parameters.xml`: Parameters metadata describing all supported parameters

QGC uses the above information for populating the [airframe selection](../config/airframe.md) page for PX4 and the _default_ parameter metadata information (QGC will use parameter metadata from the vehicle instead if it is available).
An example commit of parameter metadata can be found [here](https://github.com/mavlink/qgroundcontrol/commit/7f4f3b6253fe80a881e9a91a1f5b6d960ad11834).

Note that QGroundControl normally gets metadata for [Events](../concept/events_interface.md#implementation)and [Parameters](../advanced/parameters_and_configurations.md#publishing-parameter-metadata-to-a-gcs) from the vehicle (it is built into the firmware, or a URL is provided in the firmware from which it can be downloaded).


## Other

Jenkins also updates the PX4 ROS messages repository [PX4/px4_msgs](https://github.com/PX4/px4_msgs) and uploads the metadata to the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/).
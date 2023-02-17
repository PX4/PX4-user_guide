# PX4 Continuous Integration / Automation

PX4 has multiple automated CI build that runs to keep different systems in sync. This document describes how they are configured & connected, to hopefully clear-up confusion in how everything is connected!

:::note
CI scripts are subject to change, and the links below may get broken in the future. If that happens, please contribute the fix for the documentation!
:::

## PX4-Autopilot Pull Request CI tests
For every [Pull-Request](https://github.com/PX4/PX4-Autopilot/pulls), there are automated CI that checks the PR.
Most of the workflows are done with Github workflows, which can be found [here](https://github.com/PX4/PX4-Autopilot/tree/main/.github/workflows).

- `compile_nuttx.yml`: Builds NuttX flight controller board targets. It can detect Flash overflows and code syntax errors
- `sitl_tests.yml`: Executes [MAVSDK SITL Tests](./integration_testing_mavsdk.md). It can detect functional bugs in the code (e.g. VTOL doesn't return to home)
- `mavros_mission_tests.yml`: Executes Mission plans using MAVROS. It can check for functional compatibility between MAVROS and PX4
- `checks.yml`: Runs various make targets (using `make` command). The commands for each targets are documented in the [Makefile](https://github.com/PX4/PX4-Autopilot/blob/main/Makefile)
  - `check_format`: Checks the coding style format using Clang Tidy ?
  - `airframe_metadata`: Builds airframe XML metadata
  - `parameters_metadata`: Builds parameter XML metadata
  - `module_documentation`: Builds module documentation
  - `tests`: Runs unit tests
  - `tests_coverage`: Runs coverage tests
  - ... (other auxiliary tests)
- `ekf_functional_change_indicator.yml`: Check if there's any functionality change in EKF ?
- `ekf_update_change_indicator.yml`: Check if there's any functionality change in EKF ?
- `failsafe_sim.yml`: Builds [failsafe simulator](../config/safety_simulation.md)
- `clang-tidy.yml`: Runs Clang Tidy to check if coding style is consistent
- `compile_linux.yml`: Builds linux flight controller board targets

## PX4 release / main branch artifacts (+ Board specific files)
Upon changes to the `main` branch, or to `release/*` branches (any releases), certain artifact files need to be built and uploaded to the server.
This is handled by [this](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/deploy_all.yml) workflow.

For each board targets, the artifacts built are:
- Parameter metadata (`parameters.*`)
- Events metadata (`events/*.xz`)
- Actuators metadata (`actuators.json*`)
- Target binary (`*.px4`)

Then these files get uploaded to the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/).

### Usage by QGC
These files then get used in QGroundControl for:
- Flashing PX4 binaries (stable: `release/*` / beta: `main`) through Firmware tab
- Downloading & Caching the Events / Actuators / Parameters metadata for boards that doesn't support [MAVLink Component Information service](https://mavlink.io/en/services/component_information.html) based metadata retrieval

Without these artifacts getting uploaded, QGroundControl would quickly go out of sync / won't be able to download & flash target binaries. So this is a crucial part of CI.

## Generic metadata for Documentation & QGC by main branch (Not board specific)
Whenever there are changes to the `main` branch, separately from the `deploy_all.yml` workflow above, Jenkins builds / deploys metadata.
Jenkins file can be found [here](https://github.com/PX4/PX4-Autopilot/blob/main/Jenkinsfile).

### PX4 Documentation update
It uses the [PX4BuildBot](https://github.com/PX4BuildBot) account to upload the following metadata to update the documentation:
- `airframes_reference.md`: Markdown for [Airframes Reference Documentation](../airframes/airframe_reference.md)
- `parameter_reference.md`: Markdown for [Parameter Reference Documentation](../advanced_config/parameter_reference.md)
- `modules/*.md`: Markdown for [Modules documentation](../modules/README.md)
- `graph_*.json`: JSON defining uORB Graph, visualized in [uORB Graph](../middleware/uorb_graph.md) page
- `msg_docs/*.md`: Markdown for [uORB Messages documentation](../msg_docs/README.md)
- `failsafe_sim/*`: Files for [Failsafe Simulator Interface](../config/safety_simulation.md)

An example commit can be found [here](https://github.com/PX4/PX4-user_guide/commit/a4ffaf5fc32df8650da614aa3129b3b90794584f).

Without these metadata getting pushed, PX4 documentation will go out of sync very quickly! So it's a crucial piece of CI.

### QGC internal airframes / parameters update
It uses the [PX4BuildBot](https://github.com/PX4BuildBot) account to upload the following metadata to keep new QGC releases to contain most up-to-date metadata:
- `airframes.xml`: Airframes metadata describing all supported airframes
- `parameters.xml`: Parameters metadata describing all supported parameters

Note, that when the boards are connected, QGC would effectively download the board specific parameter metadata if it has internet connection (as described above) so the file won't be used in that case.
However, since airframes are not built specific to each board, QGC will always used the cached Airframe metadata to display Airframes page.

An example commit can be found [here](https://github.com/mavlink/qgroundcontrol/commit/7f4f3b6253fe80a881e9a91a1f5b6d960ad11834).

### Other
It also updates the PX4 ROS messages repository & uploads the metadata to the [Amazon S3 bucket server](https://px4-travis.s3.amazonaws.com/) again, but they are not covered here.Main
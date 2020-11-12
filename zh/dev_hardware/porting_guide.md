# Flight Controller Porting Guide

This topic is for developers who want to port PX4 to work with *new* flight controller hardware.

## PX4 Architecture

PX4 consists of two main layers: The [board support and middleware layer](../middleware/README.md) on top of the host OS (NuttX, Linux or any other POSIX platform like Mac OS), and the applications (Flight Stack in [src/modules](https://github.com/PX4/Firmware/tree/master/src/modules)\). Please reference the [PX4 Architectural Overview](../concept/architecture.md) for more information.  Please reference the [PX4 Architectural Overview](../concept/architecture.md) for more information.

This guide is focused only on the host OS and middleware as the applications/flight stack will run on any board target.

## Flight Controller Configuration File Layout

Board startup and configuration files are located under [/boards](https://github.com/PX4/Firmware/tree/master/boards/) in each board's vendor-specific directory (i.e. **boards/*VENDOR*/*MODEL*/**)).

For example, for FMUv5:
* (All) Board-specific files: [/boards/px4/fmu-v5](https://github.com/PX4/Firmware/tree/master/boards/px4/fmu-v5).
* Build configuration: [/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v5/default.cmake).
* Board-specific initialisation file: [/boards/px4/fmu-v5/init/rc.board](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v5/init/rc.board)
  - A board-specific initialisation file is automatically included in startup scripts if found under the boards directory at **init/rc.board**.
  - The file is used to start sensors (and other things) that only exist on a particular board. The file is used to start sensors (and other things) that only exist on a particular board. It may also be used to set a board's default parameters, UART mappings, and any other special cases.
  - For FMUv5 you can see all the Pixhawk 4 sensors being started, and it also sets a larger LOGGER_BUF, and in AUTOCNF section (fresh setups) it sets the [SYS_FMU_TASK](../advanced/parameter_reference.md#SYS_FMU_TASK) parameter.

## Host Operating System Configuration

This section describes the purpose and location of the configuration files required for each supported host operating system to port them to new flight controller hardware.

### NuttX

See [NuttX Board Porting Guide](porting_guide_nuttx.md).

### Linux

Linux boards do not include the OS and kernel configuration. Linux boards do not include the OS and kernel configuration. These are already provided by the Linux image available for the board (which needs to support the inertial sensors out of the box).

* The boot file system (startup script) is located in: [ROMFS/px4fmu\_common](https://github.com/PX4/Firmware/tree/master/ROMFS/px4fmu_common)

## Middleware Components and Configuration

This section describes the various middleware components, and the configuration file updates needed to port them to new flight controller hardware.

### QuRT / Hexagon

* Running `make px4_fmu-v5_default` from the **Firmware** directory will build the FMUv5 config
* The OS configuration is part of the default Linux image (TODO: Provide location of LINUX IMAGE and flash instructions).
* The PX4 middleware configuration is located in [src/drivers/boards](https://github.com/PX4/Firmware/tree/master/src/drivers/boards). TODO: ADD BUS CONFIG TODO: ADD BUS CONFIG
* Reference config: Running `make eagle_default` builds the Snapdragon Flight reference config.


## RC UART Wiring Recommendations

It is generally recommended to connect RC via separate RX and TX pins to the microcontroller. If however RX and TX are connected together, the UART has to be put into singlewire mode to prevent any contention. This is done via board config and manifest files. One example is [px4fmu-v5](https://github.com/PX4/Firmware/blob/master/src/drivers/boards/px4fmu-v5/manifest.c). If however RX and TX are connected together, the UART has to be put into singlewire mode to prevent any contention. This is done via board config and manifest files. One example is [px4fmu-v5](https://github.com/PX4/PX4-Autopilot/blob/{{ book.px4_version }}/boards/px4/fmu-v5/src/manifest.c).


## Officially Supported Hardware

The PX4 project supports and maintains the [FMU standard reference hardware](../hardware/reference_design.md) and any boards that are compatible with the standard. The PX4 project supports and maintains the [FMU standard reference hardware](../debug/reference-design.md) and any boards that are compatible with the standard. This includes the [Pixhawk-series](https://docs.px4.io/en/flight_controller/pixhawk_series.html) (see the user guide for a [full list of officially supported hardware](https://docs.px4.io/en/flight_controller/)).

Every officially supported board benefits from:
* PX4 Port available in the PX4 repository
* Automatic firmware builds that are accessible from *QGroundControl*
* Compatibility with the rest of the ecosystem
* Automated checks via CI - safety remains paramount to this community
* [Flight testing](../test_and_ci/test_flights.md)

We encourage board manufacturers to aim for full compatibility with the [FMU spec](https://pixhawk.org/). We encourage board manufacturers to aim for full compatibility with the [FMU spec](https://pixhawk.org/). With full compatibility you benefit from the ongoing day-to-day development of PX4, but have none of the maintenance costs that come from supporting deviations from the specification.

> **Note** The following steps are not required if using the [px4-dev-nuttx](https://hub.docker.com/r/px4io/px4-dev-nuttx/) docker container or have installed to macOS using our normal instructions (as these include`kconfig-mconf`).

For fresh installs of PX4 onto Ubuntu using [ubuntu_sim_nuttx.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_nuttx.sh) you will also need to install *kconfig* tools from [NuttX tools](https://bitbucket.org/nuttx/tools/src/master/).

It's also important to note that the PX4 dev team has a responsibility to release safe software, and as such we require any board manufacturer to commit any resources necessary to keep their port up-to-date, and in a working state.

If you want to have your board officially supported in PX4:
* Your hardware must be available in the market (i.e. it can be purchased by any developer without restriction).
* Hardware must be made available to the PX4 Dev Team so that they can validate the port (contact <lorenz@px4.io> for guidance on where to ship hardware for testing).
* The board must pass full [test suite](../test_and_ci/README.md) and [flight testing](../test_and_ci/test_flights.md).

**The PX4 project reserves the right to refuse acceptance of new ports (or remove current ports) for failure to meet the requirements set by the project.**

You can reach out to the core developer team and community on the official [Forums and Chat](../README.md#support).


## Related Information

* [Device Drivers](../middleware/drivers.md) - How to support new peripheral hardware (device drivers)
* [Building the Code](../setup/building_px4.md) - How to build source and upload firmware
* Supported Flight Controllers:
  * [Autopilot Hardware](https://docs.px4.io/en/flight_controller/) (PX4 User Guide)
  * [Supported boards list](https://github.com/PX4/Firmware/#supported-hardware) (Github)
* [Supported Peripherals](https://docs.px4.io/en/peripherals/) (PX4 User Guide)

---
canonicalUrl: https://docs.px4.io/main/de/dev_setup/config_initial
---

# Initial Setup & Configuration

We recommend that developers obtain the basic equipment and software described below (or similar)

## Basic Equipment

:::tip
PX4 can be used with a much wider range of equipment than described here, but new developers will benefit from going with one of the standard setups.
A Taranis RC plus a Note 4 tablet make up for a very inexpensive field kit.
:::

The equipment below is highly recommended:

- **Remote control** for the safety pilot
  - Taranis Plus remote control (or equivalent)
- **Development computer**
  * MacBook Pro (early 2015 and later) with OSX 10.15 or later
  * Lenovo Thinkpad 450 (i5) with Ubuntu Linux 18.04 or later
- **Ground control station** (computer or tablet):
  * iPad (requires Wifi telemetry adapter)
  * Any MacBook or Ubuntu Linux laptop (can be the development computer)
  * Samsung Note 4 or equivalent (any recent Android tablet or phone with a large enough screen to run *QGroundControl* effectively).
- **Vehicle capable of running PX4**:
  - [Get a prebuilt vehicle](../complete_vehicles/README.md)
  - [Build your own](../airframes/README.md)
- **Safety glasses**
- **Tether** (multicopter only - for more risky tests)

## Vehicle Configuration

Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html) for a **desktop OS**.

To configure the vehicle:
1. [Install PX4 firmware](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) (including "custom" firmware with your own changes).
1. [Start with the airframe](../config/airframe.md) that best-matches your vehicle from the [airframe reference](../airframes/airframe_reference.md).
1. [Basic Configuration](../config/README.md) explains how to perform basic configuration.
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.

:::note
- *QGroundControl* mobile variants do not support vehicle configuration.
- The *daily build* includes development tools and new features that are not available in the official release.
- Configuration in the airframe reference have been flown on real vehicles, and are a good starting point for "getting off the ground".
:::

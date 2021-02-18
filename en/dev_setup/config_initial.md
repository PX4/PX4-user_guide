# Initial Setup & Configuration

We recommend that developers obtain the basic equipment described below (or similar) and use a "default" [airframe](../airframes/airframe_reference.md) configuration.

## Basic Equipment

:::tip
PX4 can be used with a much wider range of equipment than described here, but new developers will benefit from going with one of the standard setups.
A Taranis RC plus a Note 4 tablet make up for a very inexpensive field kit.
:::

The equipment below is highly recommended:

* A Taranis Plus remote control for the safety pilot (or equivalent)
* A development computer:
  * MacBook Pro (early 2015 and later) with OSX 10.15 or later 
  * Lenovo Thinkpad 450 (i5) with Ubuntu Linux 18.04 or later 
* A ground control station device:
  * iPad (requires Wifi telemetry adapter)
  * Any MacBook or Ubuntu Linux laptop (can be the development computer)
  * Samsung Note 4 or equivalent (any recent Android tablet or phone with a large enough screen to run *QGroundControl* effectively).
* Safety glasses
* For multicopters - tether for more risky tests

## Vehicle Configuration

*QGroundControl* for a **desktop OS** is required for vehicle configuration.

:::tip
You should use (and regularly update) the *daily build* in order to take advantage of development tools and new features that are not available in the official release.
:::

To configure the vehicle:

1. Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
1. [Basic Configuration](../config/README.md) explains how to perform basic configuration. 
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.

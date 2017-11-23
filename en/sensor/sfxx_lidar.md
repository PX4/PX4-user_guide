# Lightware SF1XX lidar setup
----------------------------------------------------

This page shows you how to set up one of following lidars:
 1. SF10/a
 2. SF10/b
 3. SF10/c
 4. SF11/c

Driver supports only i2c connection.
![SF1XX LIDAR to I2C connection](../../assets/hardware/sensors/sf1xx_i2c.jpg)

## Configuring lidar
--------------------------------------------------------

You should connect to sensor via usb (it has internal usb to serial converter), run terminal, press `space` and check that i2c address equal to `0x66`.
Newer sensor versions already have `0x66` preconfigured. Older have `0x55` which conflicts with `rgbled` module.


## Configuring PX4
--------------------------------------------------------

Use the `SENS_EN_SF1XX` parameter to select the lidar model and then reboot.
* `0` lidar disabled
* `1` SF10/a
* `2` SF10/b
* `3` SF10/c
* `4` SF11/c

# Holybro Pixhawk 4 Power Module (PM02D)

This power module providing regulated power to flight controller & power distribution board, it sends information to the autopilot about battery’s voltage and current supplied to the flight controller and the motors.

:::note
This power module using digital I2C protocol for voltage and current monitoring that is designed for flight controller based on FMUv5X & FMUv6X open standard such as the [Pixhawk 5X](../flight_controller/pixhawk5x.md).
It is **NOT** compatible with flight controller that uses analog power module like the [Pixhawk 4](../flight_controller/pixhawk4.md), [Durandal](../flight_controller/durandal.md), [Pix32 v5](../flight_controller/holybro_pix32_v5.md), etc.
:::

![PM02D](../../assets/hardware/power_module/holybro_pm02d/pm02d_hero.jpg)

## Specifications

- **Max input voltage**: 36V
- **Rated current**: 60A
- **Max current**: 120A (<60S)
- **Max current sensing**: 164A
- **Battery supported**: up to 6S battery
- **Communication protocol**: I2C
- **Switching regulator outputs**: 5.2V and 3A max
- **Weight**: 20g

## Package Contents

- PM02D board with XT60 connectors
- 6pin 2.00mm pitch CLIK-Mate cable to power flight controller

## Purchase

[Order from Holybro Store](https://shop.holybro.com/pm02d-power-module_p1285.html)

## Wiring/Connections

<img src="../../assets/hardware/power_module/holybro_pm02d/pm02d_pinout.png" width="550px" title="pm02d_pinout" />

Additional wiring and connection information can be found in: [Pixhawk 5X](../assembly/quick_start_pixhawk5x.html).

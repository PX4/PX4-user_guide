---
canonicalUrl: https://docs.px4.io/main/ja/power_module/holybro_pm02d
---

# Holybro PM02D Power Module

This digital power module provides regulated power to flight controller and power distribution board, and sends information to the autopilot about battery voltage and current supplied to the flight controller and the motors.

The power module is connected using the I2C protocol. It is designed for flight controllers based on the Pixhawk FMUv5X and FMUv6X open standard, including the [Pixhawk 5X](../flight_controller/pixhawk5x.md).

:::note
The PM is **NOT** compatible with flight controllers that require an analog power module, including: [Pixhawk 4](../flight_controller/pixhawk4.md), [Durandal](../flight_controller/durandal.md), [Pix32 v5](../flight_controller/holybro_pix32_v5.md), etc.
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

![pm02d_pinout](../../assets/hardware/power_module/holybro_pm02d/pm02d_pinout.png)

Additional wiring and connection information can be found in: [Holybro Pixhawk 5x Wiring Quick Start](../assembly/quick_start_pixhawk5x.html).

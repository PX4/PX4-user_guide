# Holybro Pixhawk 4 Power Module (PM03D)

This board serves the purpose of a Power Module as well as a Power Distribution Board.

In addition to providing regulated power to Pixhawk 5X and the ESCs, it sends information to the autopilot about battery’s voltage and current supplied to the flight controller and the motors.

:::note
This power module using digital I2C protocol for voltage and current monitoring that is designed for flight controller based on FMUv5X & FMUv6X open standard such as the [Pixhawk 5X](../flight_controller/pixhawk5x.md).
It is **NOT** compatible with flight controller that uses analog power module like the [Pixhawk 4](../flight_controller/pixhawk4.md), [Durandal](../flight_controller/durandal.md), [Pix32 v5](../flight_controller/holybro_pix32_v5.md), etc.
:::

<img src="../../assets/hardware/power_module/holybro_pm03d/pm03d_pinout.jpg" width="850px" title="Pixhawk5x Upright Image" />

## Features

- Plug & play, no additional setup required for QGroundcontrol & Mission Planner
- XT-30 connectors and solder pads for easy motor ESC connection
- Onboard voltage regulators: two 5.2V & one selectable 8V/12V
- 5V/A ports for powering companion computer or peripheral device
- Selectable 8V or 12V triple row pin header for powering peripheral device

## Specifications

- **Maximum input voltage**: 6S battery
- **Rated current**: 60A
- **Max current**: 120A (<60 Sec)
- **Max current sensing**: 164A
- **Communication protocol**: I2C
- **Dimension**: 84 x 78 x 12mm (excluding wires)
- **Mounting**: 45 x 45mm
- **Weight**: 59g
- **Connections**:
 - XT-60 for battery
 - XT-30 for motor & peripheral device (battery voltage)
 - Solder pads in each corner (battery voltage)
 - CLIK-Mate 2.0mm for flight controller (5.2V/3A standalone BEC)
 - JST GH 4pin (5.2V/3A, BEC shared with 5.2V triple row pin header)
 - 2x Triple row pin header (5.2V/3A, BEC shared with JST GH 4pin)
 - 2x Triple row pin header (8V or 12V selectable by moving header jumper, 3A)

## Package Contents

- 1x PM06 board
- 1x 80mm XT60 connector wire (pre-soldered)
- 1x Electrolytic capacitor: 220uF 63V (pre-soldered)
- 1x 2.0mm pitch CLIK-Mate 6pin cable (To power flight controller)
- 4pin JST GH to USB Type C
- 4pin JST GH to barrel plug (2.1*5.5mm)
- 4pin JST GH to barrel plug (2.5*5.5mm)
- 4pin Pin Dupont Cable (2pc)
- Nylon standoffs & nuts

<img src="../../assets/hardware/power_module/holybro_pm03d/pm03d_contents.jpg" width="650px" title="Pixhawk5x Upright Image" />

## Purchase

[Order from Holybro Store](https://shop.holybro.com/pm03d-power-module_p1315.html)

## Wiring/Connections

<img src="../../assets/hardware/power_module/holybro_pm02d/pm02d_pinout.png" width="550px" title="pinout" />

Additional wiring and connection information can be found in: [Pixhawk 5X](../assembly/quick_start_pixhawk5x.html).

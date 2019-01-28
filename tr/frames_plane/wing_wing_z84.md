# Wing Wing Z-84 Pixracer Build

The Wing Wing Z-84 is our gold standard airframe: Small, rugged and just large enough to host a [Pixracer](../flight_controller/pixracer.md).

Key information:

- **Frame:** Wing Wing Z-84
- **Flight controller:** Pixracer

![Wing Wing Z-84 build](../../images/wing_wing_build11.jpg)

## Parts List

### Z-84 Plug n' Fly (PNF/PNP) or Kit

One of these:

- [Banggood](https://www.banggood.com/Wing-Wing-Z-84-Z84-EPO-845mm-Wingspan-Flying-Wing-PNP-p-973125.html)
- [Hobbyking US Warehouse](https://hobbyking.com/en_us/catalogsearch/result/?q=z-84&order=relevance&dir=asc)

> **Tip** PNF (or "PNP") versions include motor, propeller and electronic speed controller. The "kit" version does not include these components, which must be purchased separately.

### Electronic Speed Controller (ESC)

One of these:

- [Blue Series 12A ESC](https://hobbyking.com/en_us/hobbyking-12a-blueseries-brushless-speed-controller.html) (Hobbyking)
- [ePower Pro 12A](http://www.eflight.ch/pi/ePower-Pro-12A.html) (Eflight - Switzerland)

### Autopilot and Essential Components

- [Pixracer](../flight_controller/pixracer.md) kit (including GPS and power module)
- FrSky D4R-II receiver or equivalent (jumpered to PPM sum output according to its manual)
- [Mini telemetry set](../flight_controller/pixfalcon.md#availability) for HKPilot32
- [Digital airspeed sensor](../flight_controller/pixfalcon.md#availability) for HKPilot32 / Pixfalcon
- 1800 mAh 2S LiPo Battery - e.g. [Team Orion 1800mAh 7.4V 50C 2S1P](https://teamorion.com/en/batteries-en/lipo/soft-case/team-orion-lipo-1800-2s-7-4v-50c-xt60-en/)

### Recommended spare parts

- 1 cm diameter O-ring for prop saver ([Hobbyking International Warehouse](http://www.hobbyking.com/hobbyking/store/__27339__Wing_Wing_Z_84_O_Ring_10pcs_.html))
- 125x110 mm propellers ([Hobbyking](https://hobbyking.com/en_us/gws-ep-propeller-dd-5043-125x110mm-green-6pcs-set.html))

## Wiring

The wiring below is valid for Pixhawk and Pixracer. Use the main outputs, not the ones labeled with AUX. The motor controller needs to have an in-built BEC, as the autopilot is not powering the servo rail.

| Port   | Connection                  |
| ------ | --------------------------- |
| RC IN  | PPM or S.BUS / S.BUS2 input |
| MAIN 1 | Left Aileron                |
| MAIN 2 | Right Aileron               |
| MAIN 3 | Empty                       |
| MAIN 4 | Throttle                    |

## Build Log

The images below give a rough idea about the assembly process, which is simple and can be done with a hot glue gun.

![wing\_wing\_build01](../../images/wing_wing_build01.jpg) ![wing\_wing\_build02](../../images/wing_wing_build02.jpg) ![wing\_wing\_build03](../../images/wing_wing_build03.jpg) ![wing\_wing\_build04](../../images/wing_wing_build04.jpg) ![wing\_wing\_build09](../../images/wing_wing_build09.jpg) ![Wing Wing Z-84 build](../../images/wing_wing_build11.jpg)

## Airframe Configuration

Select the Z-84 in the flying wing section of the QGC airframe config:

![QGC - select firmware for West Wing](../../images/qgc_firmware_flying_wing_west_wing.png)
# Reptile Dragon 2 (RD2) Build
The Reptile Dragon 2 is a twin motor RC airplane specifically designed for efficient FPV (first person view) flying.
Being specific for FPV, the airplane is optimized for easy mounting of cameras, sensors, logic electronics, large batteries, antennas, and other components which would be found on a typical FPV setup. 
This emphasis on payload makes this airplane an ideal candidate for a PX4 installation.

## Overview

The goal of this build was to create an efficient, long endurance FPV platform to be used for general PX4 testing and development.

Key airframe features:

- Spacious interior
- Easy access to the entire fuselage cavity with large top hatch
- Rear hatch
- Removable V tail or conventional tail options included
- Threaded inserts in the wings and fuselage top for external mounting
- Numerous mounting features
  - Top antenna hole
  - Top GPS cover
  - Side "T" antenna mounts
  - Rear electronics tray
  - Front facing "action cam" cutout
  - Front facing FPV camera cutout 
- Removable wings
- Low stall speed
- Gentle handling 

Key build features

- Easy overall build
- Easy access to Pixhawk and all peripherals
- FPV with camera pan mount
- Air data from pitot/static probe
- ~40 minute long flight times

## Parts list

- [Reptile Dragon 2 kit](https://usa.banggood.com/REPTILE-DRAGON-2-1200mm-Wingspan-Twin-Motor-Double-Tail-EPP-FPV-RC-Airplane-KIT-or-PNP-p-1805237.html?cur_warehouse=CN&ID=531466)
- [Pixhawk 5x Carrier board](https://shop.holybro.com/pixhawk-5x_p1279.html)
- [ARK6X FMU](https://arkelectron.com/product/arkv6x/)
- MS4525DO differential pressure module and pitot tube
- [Caddx Vista FPV air unit](https://caddxfpv.com/products/caddx-vista-kit)
- [DJI FPV Goggles](https://www.dji.com/fpv)
- [ExpressLRS Matek Diversity RX](http://www.mateksys.com/?portfolio=elrs-r24)
- Misc hardware: M3 hardware (standoffs, washers, bolts), XT30 connector, hot glue, heatshrink, Molex Microfit connectors
- Silicone wiring (14awg for high current, 16awg for low current, 22awg for low power and signals)
- 4s2p 18650 LiIon flight battery

## Tools
- Servo tester (with centering button)
- Screw driver set
- 3D printer
- Wrench set
- Hot glue, CA glue, Foamtac glue
- Sandpaper

## Airframe Build

The airplane comes out of the box and needs some assembly.
Servos, wings, and the tail will need to be installed.

:: note
For this portion of assembly, the instructions included with the kit should be sufficent, but some helpful tips are listed below
:::

### Gluing Foam
When gluing foam parts of the RD2 together, it's recommended to use sandpaper to rough the mating surface, then use CA glue.
If the foam is not roughed with sandpaper, the glue will not have enough material to "grab" and the bond will be poor.
Foamtac doesn't seem to stick well to this foam, so I used CA glue for all foam-to-foam mates

### Servo Installation
Prior to servo installation, it is recommended to use the sandpaper to rough the side of the servo facing the servo cover. During final installation, put a drop of Foamtac between the servo and the cover. This will prevent the servo from moving once installed.

The servos on the RD2 are connected to control surfaces with adjustable servo linkages.
The instructions will note that each servo installation will have a speciifc length of linkage included in the kit. 
It's very important to align the servos such that the mechanical range of the servo is well aligned with the mechanical range of the control surface -- this means that at the servo center point, the servo arm is roughly centered, and so is the control surface. 

The following steps can be used to perform servo alignment
1. With the servo by itself, not in the airplane, use the servo tester to move the servo to its center point
2. Install the servo horn with the included retaining screw, taking care to align the horn to extend 90 degrees out on the correct side of the servo. 
3. Install the servo in the servo pocket
4. Install the linkage, and twist to adjust it such that the control surface is as close to centered as possible

:: note
When installing the servo horn on the servo, the horn will likely not sit exactly at a 90 degree angle to the servo due to the teeth on the servo shaft forcing it to only be installed at certain angles. 
Just get it close enough to 90 degrees, and the remaining offset will be removed either with the linkage, or later in software.
:::

## FPV Pod

The FPV pod was mounted on top of the battery hatch using M3 nylon hardware.

## Flight Computer installation 

A custom mount for the Pixhawk 5X carrier board was designed and 3D printed. this mount adapts the RD2's internal mounting plate hole pattern to the mounting holes on the Pixhawk 5X carrier board.
It's important to install this mount in the correct location inside the RD2; as far back as possible.
with a large battery and the FPV pod up front, the airplane will be very noseheavy.
Mounting the flight computer far back will help to keep the airframe balanced in CG.


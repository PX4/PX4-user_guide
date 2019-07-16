# DJI F450 + CUAV V5+ Build

This topic provides full instructions for building the kit and configuring PX4 using *QGroundControl*.

Key information

- **Frame:** DJI F450
- **Flight controller:** [CUAV V5+]
- **Assembly time (approx.):** 1.5 hours (1 for frame, 0.5 autopilot installation/configuration)

## Bill of materials

* Power module holybro
* Fully assembled Power Management Board with ESCs
* Motors - DR2205 KV2300
* 5” Plastic Props
* Carbon fiber 250 airframe with hardware
* Foxer camera
* Vtx 5.8ghz
* Receiver FR SKY D4R-II
* Battery 4S 1300 mAh
* DJI F450 Frame 

Additionally you will need a battery and receiver (+compatible transmitter).
This build uses:
* Receiver: [FR SKY D4R-II](http://www.getfpv.com/radios/receivers/frsky-d4r-ii-4ch-2-4ghz-accst-receiver-w-telemetry.html)
* Battery: [3S 5200mAh]()


## Hardware

Description | Quantity
---|---

Unibody Frame Plate           | 1
Flight Controller Cover Plate | 1
Camera Plate                  | 1
35mm Standoffs                | 6
Vinyl screws & Nuts           | 4
15mm Steel Screws             | 8
Steel Nuts                    | 8
7mm Steel Screws              | 12
Velcro Battery Strap          | 1
Foam for Battery              | 1
Landing Pads                  | 4

## Package
Description | Quantity (Default Package) | Quantity (GPS Package)
---|---|---

V5+ Autopilot              |      1     |     1  
DuPont Cable               |      2     |     2
I2C/CAN Cable              |      2     |     2
ADC 6.6 Vable              |      2     |     2
SBUS Signal Cable          |      1     |     1
IRSSI Cable                |      1     |     1
DSM Signal Cable           |      1     |     1
ADC 3.3 Cable              |      1     |     1
Debug Cable                |      1     |     1
Safety Switch Cable        |      1     |     1
Voltage & Current Cable    |      1     |     1
PW-Link Module Cable       |      1     |     1
Power Module               |      1     |     1
SanDisk 16GB Memory Card   |      1     |     1
12C Expansion Boward       |      1     |     1
TTL Plate                  |      1     |     1
NEO GPS                    |      -     |     1
GPS Bracket                |      -     |     1

### Electronics
Description | Quantity
--- | --- 

Motors - DR2205 KV2300                            |     4
Fully assembled Power Management Board with ESCs  |     4
Holybro power module                              |     1
Fr-sky D4R-II receiver                            |     1
CUAV V5+                                  |     1
Holybro GPS Neo-M8N                               |     1
Battery lumenier 1300 mAh 4S 14.8V               |     1
Vtx 5.8gHz                                        |     1
FPV camera                                        |     1

### Tools needed

The following tools are used in this assembly:

- 2.0mm Hex screwdriver
- 3mm Phillips screwdriver
- Wire cutters
- Precision tweezers

## Assembly

Estimated time to assemble frame is 2 hours and 1.5 hours installing the autopilot and configuring the airframe in *QGroundControl*.

Step 1: Attach the 4 armed to the bottom plate as seen in figure 1.

Step 2:  Solder ESC (Electronic Speed Controller) to the board, Red to the positive side and Black for the negative side as shown on figure 2. 

Step 3: Solder the Power Module, positive (red) and negative (black).
See figure 3.

Step 4: Plug in the motors to the ESCs according to its positions. For example on Figure 4.   

Step 5: Attach the motors to the corresponding arm, see example in figures 5 and 6

Step 6: Place the top board as shown on figure 7

Step 7: Paste the damping foam on the CUAV V5+ flight controller.
See figure 8.

Step 8: Paste FrSky with double tape to the bottom board. See figure 9

Step 9: Using double tape place telemetry to the vehicle’s bottom board.
See figures 10 and 11.

Step 10: Put the aluminium standoffs on the button plate.

Step 11: Plug in Telemetry and GPS module to the flight controller as seen in figure 13; plug in the RC receiver, all 4 ESC’s to the flight controller as well as the power module as shown in figure 14.

### Vehicle calibration/setup
Vehicle calibration/setup is similar for all vehicles. 

** Radio calibration **

1. Turn on the remote control.
2. Select **Radio** in the left-sidebar.
3. Select the "mode" of your remote control (top right).
4. Click the **Calibrate** button and follow the on-screen
   instructions.

** Calibrate sensors **

1. Select **Sensors** in the left-sidebar.
2. Select the **Compass** button and then follow the on-screen instructions.
3. Select the **Gyroscope **button and then follow the on-screen instructions.
4. Select the **Accelerometer **button and then follow the on-screen instructions.

** Select flight modes **

[Flight Modes](../flight_modes/README.md) provide
autopilot assisted or fully controlled flight. New users should
configure their receiver to support the following three modes (these
make the vehicle much easier to fly):

- *Stabilized* - Vehicle hard to flip, and will level-out if the
  sticks are released (but not hold position)
- *Altitude* - Climb and drop are controlled to have a maximum rate.
- *Position* - When sticks are released the vehicle will stop (and
  hold position against wind drift)

There are a number of ways to [configure flight modes](../config/flight_mode.md). In this case
we have a three-way switch on the receiver that we map to a single channel (5).

** Calibrate ESC **

1. Remove propellers.

   > **Warning** Propellers must be removed from vehicle prior
     to performing ESC calibration!
2. Select **Power **in the left-sidebar.
3. Select the **Calibrate **button and then follow the on-screen
   instructions (Connect your battery. When the tones stop, press OK
   and unplug battery).
   
### Tuning
Firmware installation sets *default* autopilot parameters that have been
configured for the selected frame. 
These are good enough to fly with, but it is a good idea to tune the parameters for a specific frame build.
The parameters below are recommended for this build (the yellow
parameters are the ones that have changed). These were generated by
flight testing.

## Acknowledgements
This build log was provided by the Dronecode Test Flight Team.

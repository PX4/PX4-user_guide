# Holybro X500 + Pixhawk4 Build

This topic provides full instructions for building the kit and configuring PX4 using *QGroundControl*.

## Key information

- **Frame:** Holybro X500
- **Flight controller:** [Pixhawk 4]
- **Assembly time (approx.):** 120 minutes (75 minutes for frame, 45 minutes for autopilot installation/configuration)

## Bill of materials

* Pixhawk 4 autopilot
* Pixhawk 4 GPS
* Battery Strap
* Propellers - 1045
* Motors - 2216 KV880
* Power and Radio Cables
* Power Management - PM07
* Wheelbase - 500 mm
* Dimensions - 410*410*300 mm
* 433 MHz Telemetry Radio/915 MHz Telemetry Radio

Note: No LiPo battery included. In addition, we use a FrSky Taranis controller.


## Hardware

Item | Description | Quantity
---|---|---
Socket cap scre               |  Used for motor fixing, stainless steel screw M3*5    | 16
Carbon fiber tube - Arm       |  Diameter: 16mm length: 200mm                         | 4
Motor base                    |  Consists of 6 parts and 4 screws 4 nuts              | 4
Slide bar                     |  Diameter: 10mm length: 250mm                         | 2
Battery mounting board        |  Thickness: 2mm                                       | 1
Battery pad                   |  3mm Silicone sheet black                             | 1
Pylons                        |  Engineering plastic embedded with copper nut         | 2
Cross countersunk head screw  |  Stainless steel M2.5*5mm                             | 12
PAN/TILT platform board       |  Thickness: 2mm                                       | 1
Hanger rubber ring gasket     |  Inner hole diameter: 10mm black                      | 8
Hanger                        |  Engineering plastic embedded with copper nut         | 8
Carbon fiber - Bottom plate   |  The thickness of 2mm                                 | 1
Socket cap screw              |  Stainless steel M2.5*6mm                             | 8
Nylon stud                    |  Black M3*6+6                                         | 4
Nylon screw                   |  Black M3*6                                           | 4
Carbon fiber - Top plate      |  Thickness: 1.5mm                                     | 1
Pan head screw                |  Metal black M3*30mm                                  | 16
Nylon strap                   |  U- shape, of 16mm carbon fiber tube                  | 16
Nylon nut                     |  Black M3                                             | 4
Locknut                       |  Metal black M3                                       | 16
Socket cap screw              |  Metal black M3*8mm                                   | 8
Landing gear- Vertical pole   |  Carbon fiber tube+engineering plastic+fastener       | 2
Landing gear- Cross bar       |  Composed of carbon fiber tube and multiple parts     | 2


## Package
Items | Package
---|---
Pixhawk 4                        |  1
Pixhawk4 GPS MODULE              |  1
I2C splitter Board               |  2
6 to 6 pin cable (power)         |  3
4 to 4 pin cable (CAN)           |  2
6 to 4 pin cable (Data)          |  1
10 to 10 pin cable (PWM)         |  2
8 to 8 pin cable(AUX)            |  1
7 to 7 pin cable(SPI)            |  1
6 to 6 pin cable(Debug)          |  1
PPM/SBUS out cable               |  1
XSR receiver cable               |  1
DSMX receiver cable              |  1
SBUS receiver cable              |  1
USB cable                        |  1
'X'type folding pedestal mount   |  1
70mm & 140mm carbon rod standoff |  2
6*3 2.54mm pitch Horizontal Pin  |  1
8*3 2.54mm pitch Horizontal Pin  |  2
Foam Set                         |  1
Pixhawk4 Quick Start Guide       |  1
Pixhawk4 Pinouts                 |  1
GPS Quick Start Guide            |  1


### Electronics
Item Description | Quantity
--- | --- 
Pixhawk 4 autopilot（PM06 not included)            |  1
Power Management PM02（Assembled)                  |  1
Motors - 2216 KV880（V2 Update)                    |  4
Pixhawk 4 GPS                                      |  1
Fully assembled Power Management Board with ESCs   |  1
433MHz Telemetry Radio / 915MHz Telemetry Radio    |  1


### Tools needed

The following tools are used in this assembly:

- 1.5 mm Hex screwdriver
- 2.0 mm Hex screwdriver
- 2.5 mm Hex screwdriver
- 3mm Phillips screwdriver
- Wire cutters
- Precision tweezers


## Assembly

Estimate time to assemble is 120 minutes, about 75 minutes for frame assembly and 45 minutes installing and configuring the autopilot in QGroundControl.

**Step 1:** We are going to start by assembling the landing gear to the vertical pole.
Unscrew the landing gear screws and insert the vertical pole, see figures 1 and 2.

**Step 2:** We proceed to arm the motor holder by using 4 U-shaped nylon straps to attach the holder to the carbon fiber arm as shown in figure 3.

**Step 3:** Attach the power management PM02 to the bottom plate as shown in Figures 4 and 5.

**Step 4:**  Assemble the lower plate to the landing gears.
Screw the landing gear with a vertical pole to the bottom plate. The lower plate has 4 holes (see Figure 4 arrows) use the M3X8 screws, a total of 8 pieces, 4 on each side. 

**Step 5:** Assembling the Battery Mount to the frame. 
For this we will need the M2 5X6 screws and the battery mount see Figure 7. Insert the long rods to the small rings see Figure 8 and 9. Also, with the battery holder completely armed, screw it where arrow shown in the image as shown in Figure 10; keep in mind GPS module will be facing front.

**Step 6:** Assemble the 8*3 2.54mm pitch Horizontal Pin to the 10 to 10 pin cable (PWM) to the Power Management Board. 
Connect the 10 to 10 pin cable (PWM) to the 8*3 2.54mm pitch Horizontal Pin, see Figure 11. Cut a piece of 3M Tape and attach to the bottom of the Horizontal Pin, see Figure 12  stick the Horizontal Pin to the Power Management Board, see Figure 13. 

**Step 7:** Install vehicle Arms to the main body.
Take the ESC and push it in the Arm tube as shown in FIgure 14 and make sure that the ESC cables are not too long since we will push them back in as shown in Figure 15.

**Step 8:** Assemble arm to main body.
With 4 more U-shaped nylon straps attach the arm with the motor installed to the body of the vehicle as shown in Figure 16, this way you also attach the bottom plate to the top plate. Also keep in mind to have the arm tube a bit pushed in to that it can be kept securely in place as shown in the Red Square from Figure 16.

**Step 9:** Connect Motors cables.
After the 4 arms are mounted on to the main body, connect the cables (red, blue, black) and push them into the arm tube, see Figures 17. The 3 cables that are color-coded go connected to the ESC. 

**Step 10:** Mounting the GPS on the frame.
For this, we will need the Pixhawk 4 GPS and the mounting plate. Mount GPS mast to the plate, use the 4 screws see the red circle in Figure 18, keep in mind that the plate is mounted to the battery holder tubes as indicated by the arrows in Figure 18. Use the tape and stick the GPS to the top of the GPS mast, see Figure 19.

**Step 11:** Pixhawk 4 wiring
The Pixhawk 4, which has several different wires and connections with it. Included below is a picture of every wire needed with the Pixhawk and how it looks when connected.
Plugin Telemetry and GPS module to the flight controller as seen in Figure 20; plug in the RC receiver, all 4 ESCs to the flight controller as well as the power module as shown in Figure 21.


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

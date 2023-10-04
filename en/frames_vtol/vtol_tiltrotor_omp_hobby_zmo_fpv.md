# OMP Hobby ZMO FPV

The OMP Hobby ZMO is a small sized tiltrotor VTOL that is available as RTF kit.

![Finished ZMO hover 1](../../assets/airframes/vtol/omp_hobby_zmo_fpv/airframe-hover.jpg)

![Finished ZMO hover 2](../../assets/airframes/vtol/omp_hobby_zmo_fpv/airframe-hover2.jpg)

## Overview

Key airframe features:

- Compact and easy to transport
- Pre installed actuators
- Quick release wing connecting system
- Transport case in kit included
- ~35 minute long flight times (depending on takeoff weight)
- VTOL enables flying in locations where a fixed wing couldn't fly
- Battery and charger included in the kit
- Easy overall build
- Space to mount FPV and/or action camera in the front

Depending on the final takeoff weight the hover time might be limited, since there is not a lot of air circulation inside the fuselage when the vehicle is hovering. Therefore the ESC's might overheat.

## Where to Buy

- [OMP-Hobby](https://www.omphobby.com/OMPHOBBY-ZMO-VTOL-FPV-Aircraft-With-DJI-Goggles-And-Remote-Controller-p3069854.html)
- [GetFPV](https://www.getfpv.com/omphobby-zmo-z3-vtol-fpv-1200mm-arf-plane-kit-no-fpv-system.html)
- [FoxtechFPV](https://www.foxtechfpv.com/zmo-pro-fpv-vtol.html)

## Flight Controller

The following options have been tested:

- [Auterion Skynode evaluation kit](../companion_computer/auterion_skynode.md)
- [Pixhawk 6C](../flight_controller/pixhawk6c.md) with [PM02 V3](../power_module/holybro_pm02.md)
- [Pixhawk 6C mini](../flight_controller/pixhawk6c_mini.md) with [PM02 V3](../power_module/holybro_pm02.md)

The approximate maximum size of the FC is: 50x110x22mm

## Additional accessories

- [GPS F9P (included in Skynode eval. kit)](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)
- [GPS M9N (cheaper alternative to F9P)](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)
- [Airspeed sensor (included in Skynode eval. kit)](https://www.dualrc.com/parts/airspeed-sensor-sdp33) — recommended for improved safety and performance
- [Airspeed sensor (cheaper alternative)](https://holybro.com/products/digital-air-speed-sensor?pr_prod_strat=use_description&pr_rec_id=236dfda00&pr_rec_pid=7150470561981&pr_ref_pid=7150472462525&pr_seq=uniform)
- [Lidar Lightware lw20-c (included in Skynode eval. kit)](../sensor/sfxx_lidar.md) (Optional)
- [Lidar (cheaper alternative)](https://www.seeedstudio.com/PSK-CM8JL65-CC5-Infrared-Distance-Measuring-Sensor-p-4028.html)
- [5V BEC](http://www.mateksys.com/?portfolio=bec12s-pro)
- RC receiver of your preference
- [Servo cable extension cable male 30cm 10 pcs](https://www.getfpv.com/male-to-male-servo-extension-cable-twisted-22awg-jr-style-5-pcs.html)
- [USB-C extension cable](https://www.digitec.ch/en/s1/product/powerguard-usb-c-usb-c-025-m-usb-cables-22529949?dbq=1&gclid=Cj0KCQjw2cWgBhDYARIsALggUhrh-z-7DSU0wKfLBVa8filkXLQaxUpi7pC0ffQyRzLng8Ph01h2R1gaAp0mEALw_wcB&gclsrc=aw.ds)
- [3M VHB tape](https://www.amazon.in/3M-VHB-Tape-4910-Length/dp/B00GTABM3Y)
- [3D-Printed mounts](../../assets/airframes/vtol/omp_hobby_zmo_fpv/OMP-Hobby-ZMO-3D-Prints.zip)
  - 2x wing connector mount
  - 1x Airspeed sensor mount
  - 1x GPS-Mount
  - 1x Lidar-Mount
  - 1x Skynode mount
- [USB camera (included in Skynode dev kit)](https://www.amazon.com/ELP-megapixel-surveillance-machine-monitor/dp/B015FIKTZC)
- Screws, inserts, heat shrink, etc.

## Tools

The following tools were used for this build.

- Hex driver set
- Wrench set
- Soldering station
- Glue: Hot glue, 5 min Epoxy
- Tape
- 3M Double sided tape ([3M VHB tape](https://www.amazon.in/3M-VHB-Tape-4910-Length/dp/B00GTABM3Y))
- Sandpaper
- 3D-Printer

## Hardware Integration

### Preparations

Remove the original flight controller, ESC and wing connector cables. Remove also the propellers. This will help you with the handling of the vehicle and will reduce the risk of an injury due to an unintentional motor startup.

ZMO FPV in it's original state.

![ZMO 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/zmo-01.jpg)

Flight controller and wing connectors removed from the vehicle.

![ZMO 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/zmo-02.jpg)

### ESCs

Unsolder the PWM-signal and ground pins of the ESC and solder some servo extension wire to the pins.
The cable should be long enough to connect the wire to the FMU pins of the flight controller.
Unsolder the 3 female banana plug connectors of the rear motor (might not be necessary for the Pixhawk 6 integration). Screw the ESC back in place with 4 M2.5 x 12 screws.
Shorten the rear motor wires and solder them as shown in the picture into place.

Solder signal and GND wires to the PWM input ot the ESC.

![ESC 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/esc-01.jpg)

Remove the female banana plug of the ESC. This will give you more space to install the flight controller.

![ESC 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/esc-02.jpg)

Solder the rear motor wires to the ESC. Make sure to have to order correct, so that the motor spins in the correct direction.

![ESC 03](../../assets/airframes/vtol/omp_hobby_zmo_fpv/esc-03.jpg)

### Wing Connector

To directly connect the wing connector when the wing gets attached, some 3D-printed mounts are needed to center the connector.
This step is not necessary but makes the handling much easier and there is one step less you need to worry about when you mount the plane in the field. Glue the wing connectors into the 3D-Printed part with hot-glue or 5 min epoxy.
Glue the 3D-printed part with the connector in to the fuselage. Make sure to properly align the connector while the glue cures.
The easiest way to align the connector is to mount the wing while the glue is curing, but make sure that no glue is between the fuselage and the wing, otherwise the wing might get stuck.

The connector glued into the 3D-Printed part

![Wing connector 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/wing-connector-01.jpg)

The connector glued into the fuselage. Make sure to properly align the connector.

![Wing connector 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/wing-connector-02.jpg)

### Pixhawk Adapter Boards and BEC

Cut the foam as shown in the pictures to create space to mount the Pixhawk adapter boards and BEC with double sided tape.
The FMU board is placed on the left side (in flight direction) of the fuselage. Solder a servo connector and a cable for the battery voltage to the BEC.

![Foam cutout 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/foam-cut-01.png)
![Pixhawk adapter board mount 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/pixhawk-adapter-01.jpg)

Prepare the BEC to connect to the IO board and to the battery. The BEC can also be soldered directly to the battery pads of the ESC.

![BEC 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/bec-01.jpg)

Mount the BEC with double sided tape.

![BEC 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/bec-02.jpg)

### Cables

Cut off the connectors of the servos and solder the servo extension cables to the cables.
Make sure that the cables are long enough to reach the Pixhawk adapter board.
If you own a crimp tool, then you can also directly add the connectors without soldering.

Plug the servo cables into the adapter IO board in the following order:

- 1 - Aileron left
- 2 - Aileron right
- 3 - V-Tail left
- 4 - V-Tail right
- 5 - Tilt left
- 6 - Tilt right

Pug in the motor signal cables into the FMU adapter board in the following order:

- 1 - front left
- 2 - front right
- 3 - rear

### Sensors

#### Pitot Tube

Check first if the pitot tube fits into the 3D-Printed mount. If this is the case, glue the pitot tube mount into place.
To align the tube feed it through the second hole from the right of the FPV front plate.
The mount will enable you to push the tube back into the fuselage to protect it during transportation and handling. The sensor unit can be mounted on top of the 3D-Printed mount with double sided tape.

Glue the 3D-Printed mount into place.

![Pitot tube 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/pitot-tube-01.png)

The sensor can be mounted on top of the 3D-Printed mount.

![Pitot tube 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/pitot-tube-02.png)

#### Lidar

If needed a lidar can be installed in the front of the fuselage.
To install the Lidar, remove the heat sink, and glue the lidar together with the 3D-Printed lidar mount into place.

![Lidar 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/lidar-01.jpg)

#### GPS/Compass

To mount the GPS, screw the two 3D-Printed parts with 3x M3x10 screws together. Take the GPS out of the plastic case and unplug the connector.
Feed the cable through the carbon spar. Glue the 3D-Printed part with 5 min epoxy in place.
After the glue has cured, screw the GPS with 4x M2.5x10 screws to the plate.

Glue the GPS mount into place

![GPS 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/gps-01.jpg)

Screw the GPS to the mount

![GPS 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/gps-02.jpg)

#### USB-Camera

Cut the USB cable of the camera so that the length is 15 cm. Cut the USB-Adapter cable to be 25 cm and solder the two cables together.
To install the camera you need to cut a hole into the foam of the wall.
Then you can mount the camera with double sided tape to the wall.

Hole to feed the USB cable through the wall.

![USB Camera 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/camera-01.jpg)

### Flight Controller

The Flight controller can be installed above the ESC.
If a Pixhawk 6c or 6c mini is used, simply stick the flight controller with double sided tape into place.

If a Skynode is used, place it at the on top of the ESCs and mark the 2 rear mounting locations on the injection molded plastic part of the ZMO.
Remove the Skynode from the vehicle and drill 2 holes with a 2.8 mm drill bit into the plastic part.
Put the Skynode back into place and screw it down with 2x M3x10 screws.
An other option is to add some threaded inserts into the holes. Since the injection molded part of the ZMO is very thin, they need to be glued in place. Screw the front Skynode mount with 2x M3x10 screws at the Skynode.
Then add some 5 min epoxy at the bottom of the mount and put a weight on top of the Skynode until the glue is cured.
To better reach the 2 mounting screws at the front, poke 2 holes from the top through the foam so you can access the screws.

Mounting holes for the Skynode in the back

![Flight controller 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/flight-controller-01.jpg)

Skynode mount in the front

![Flight controller 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/flight-controller-02.jpg)

### Antennas and RC Receiver

:::note
If a Skynode is installed the LTE can be used as telemetry and video link.
If a Pixhawk is used a different [telemetry link](../telemetry/README.md) will be needed.
An inexpensive example would be a [SiK Telemetry Radio](../telemetry/sik_radio.md).
:::

One LTE antenna can be installed at the bottom of the vehicle. For that you can feed the antenna wire through the opening for the ESC heat-sink.
The second antenna can be installed on the inside of the vehicle on the left side of the battery compartment.
The RC receiver can also be placed at the left side of the battery compartment.

LTE antenna 1

![LTE antenna 01](../../assets/airframes/vtol/omp_hobby_zmo_fpv/lte-antenna-01.jpg)

LTE antenna 2 and RC receiver

![LTE antenna 02](../../assets/airframes/vtol/omp_hobby_zmo_fpv/lte-antenna-02.jpg)

## Software Setup

### Select Airframe

1. Open QGC and go under vehicle setup.


1. Open QGC and go under vehicle setup.
1. Search for [SYS_AUTO](../advanced_config/parameter_reference.md#SYS_AUTOSTART) in the parameters tab.
1. Set [SYS_AUTOCONFIG](../advanced_config/parameter_reference.md#SYS_AUTOCONFIG) to "Reset parameters to airframe defaults" and [SYS_AUTOSTART](../advanced_config/parameter_reference.md#SYS_AUTOSTART) to `1230113`.
1. Reboot the vehicle.
1. Load the [parameter-file]() up to the vehicle. To do so, go into the parameter tab and press on tools in the top-right corner. Select "Load from file.." and select the file.

### Sensor Calibration

First make sure to set the [correct orientation of the flight controller](../config/flight_controller_orientation.md).
This should be the default (`ROTATION_NONE`).

Then calibrate the main sensors:

- [Compass](../config/compass.md)
- [Gyroscope](../config/gyroscope.md)
- [Accelerometer](../config/accelerometer.md)
- [Airspeed](../config/airspeed.md)


### RC-Setup

[Calibrate your RC Controller](../config/radio.md) and setup the [flight mode switches](../config/flight_mode.md).

### Actuator Setup

:::warning
Make sure the props are removed!
The motors are easy to start in the actuators tab by accident.
:::

Motors, control surfaces, and other actuators are configured in the QGroundControl [Actuator Configuration & Testing](../config/actuators.md).


#### Tilt Servos

Switch the vehicle into manual mode. Either via the flight mode switch or type "commander mode manual" into the mavlink shell.
Check if the motors are pointing upwards. If they are pointing forwards they need to be reversed.
To do so select the checkbox under PWM-Main for each servo. Adjust the minimum or maximum value that the servo is pointing vertical up.
Then type "commander transition" into the mavlink shell to adjust the horizontal position.

![Tilt Servo adjustment](../../assets/airframes/vtol/omp_hobby_zmo_fpv/tilt-limits-01.jpg)

#### Control Surfaces

Check with RC-Controller, if the actuators need to be reversed.

- Roll stick to the right -> Right aileron up, left aileron down
- Pitch stick to the back (fly upwards) -> both V-tail surfaces up
- Yaw stick to the right -> both surfaces to the right

Now adjust the trim value that all the surfaces are in neutral position.

![Servo trim](../../assets/airframes/vtol/omp_hobby_zmo_fpv/servo_trim.png)

#### Motor Direction and Orientation

Make sure the props are removed!!!

- Motor 1: Front left motor should spin CW
- Motor 2: Front right motor should spin CCW
- Motor 3: Rear motor should spin CCW

If the motor spins in the wrong directions two of the three motor wires need to be swapped. The direction can not be changed in software since the ESCs are not using dshot.

## First Flight

- Check CG (There are markings underneath the wing)
- Check actuator orientations and neutral trim
- Check tilt rotor reactions in [Stabilized mode](../flight_modes_fw/stabilized.md)
  - Yaw the vehicle to the right (nose to the right) -> right motor should tilt down
  - Yaw the vehicle to the left (nose to the left) -> left motor should tilt down
- Check tilt rotor reactions in [Stabilized mode](../flight_modes_fw/stabilized.md)
  - Roll the vehicle to the right -> Right aileron should go down
  - Pitch the vehicle up (nose up) -> both elevons should go down
  - Yaw the vehicle to the right (nose to the right) -> both elevons should go to the right,
- Check kill switch
- Arm in [Stabilized mode](../flight_modes_fw/stabilized.md) and check if motors respond to the commands, e.g. roll left increases throttle on the right motor
- Takeoff in stabilized and make some basic maneuvers
- If everything went without any issue, takeoff in [Position mode](../flight_modes_fw/position.md) and do a transition at around 50m. If something goes wrong switch back to MC mode as fast as possible.

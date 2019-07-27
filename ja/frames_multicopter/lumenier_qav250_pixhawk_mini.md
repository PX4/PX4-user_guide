# Lumenier QAV250 Pixhawk Mini Build

The [Lumenier QAV250 Mini FPV Quadcopter](http://www.lumenier.com/products/multirotors/qav250) is a small but fully functional FPV multicopter frame. This topic provides full build and configuration instructions for using the frame with the *Pixhawk Mini* flight controller, including how to install and configure the PX4 autopilot using *QGroundControl*.

Key information

- **Frame:** Lumenier QAV250 CF
- **Flight controller:** Pixhawk Mini
- **Assembly time (approx.):** 3.5 hours (2 for frame, 1.5 autopilot setup)

![QAV250 - Complete build with pixhawk
mini](../../images/qav250_complete_build_with_pixhawk_mini.jpg)

## Bill of materials

The components used in this build are listed below (along with links to where they can be purchased). In general we used hardware recommended by the manufacturers for the flight controller and frame.

- **Flight controller:** [Pixhawk Mini (Discontinued)](../flight_controller/pixhawk_mini.md)
- **Power module:** 3DR 10s Power Module (Discontinued)
- **ESC:** Lumenier f390 with Blheli ([getfpv.com](http://www.getfpv.com/electronics/electronic-speed-controllers-esc/lumenier-f390-30a-blheli-esc-opto-2-4s.html)). These come with the motors.
- **Motors:** Lumenier RX2204 -14 2300KV ([getfpv.com](http://www.getfpv.com/motors/lumenier-rx2204-14-2300kv.html))
- **Propellers:** Lumenier 5x4.5 2 blade ([getfpv.com](http://www.getfpv.com/propellers/lumenier-5x3-5-2-blade-propeller-set-of-4-black.html))
- **Frame:** Lumenier QAV250 - CF ([getfpv.com](http://www.getfpv.com/multi-rotor-frames/qav250-mini-fpv-quad/qav250-mini-fpv-quadcopter-carbon-fiber-edition.html))
- **Receiver:** FR SKY D4R-II ([getfpv.com](http://www.getfpv.com/radios/receivers/frsky-d4r-ii-4ch-2-4ghz-accst-receiver-w-telemetry.html))
- **Battery:** Lumenier 4S 1300 mAh ([getfpv.com](http://www.getfpv.com/lumenier-1300mah-4s-60c-lipo-battery-xt60.html))

Notes:

- The 4S Power Module that comes with the *Pixhawk Mini* can be used for the battery size above (instead of the 10S Power Module). Assembly is the same with either power module.
- We also recommend these ESC: Lumenier 12 amp ESC w/ SimonK AutoShot (2-4s N-FET) ([getfpv.com](http://www.getfpv.com/lumenier-12a-esc-w-simonk-autoshot-2-4s-n-fet.html)).

## Hardware

This section lists all hardware for the frame and the autopilot installation.

### Frame QAV250

| Description                   | Quantity |
| ----------------------------- | -------- |
| Unibody frame plate           | 1        |
| Flight controller cover plate | 1        |
| PDB                           | 1        |
| Camera plate                  | 1        |
| 35mm standoffs                | 6        |
| 25mm standoffs                | 4        |
| 10mm standoffs                | 4        |
| Vinyl caps                    | 4        |
| 20mm steel screws             | 4        |
| 18mm steel screws             | 10       |
| Velcro battery strap          | 1        |
| Foam for battery              | 1        |
| LEDs strip                    | 2        |

![Hardware for QAV250 frame](../../images/qav250_framehardware_displayall.jpg)

### Electronics

| Description                        | Quantity |
| ---------------------------------- | -------- |
| Motors lumenier Rx2204-14 2300KV   | 4        |
| ESC lumenier 30A                   | 4        |
| 3DR power module 10S               | 1        |
| Fr-sky D4R-II receiver             | 1        |
| 3DR Pixhawk Mini autopilot         | 1        |
| 3DR GPS Neo-M8N                    | 1        |
| 8 PWM servo output                 | 1        |
| External safety switch             | 1        |
| Micro SD card                      | 1        |
| Battery Lumenier 1300 mAh 4S 14.8V | 1        |

![QAV250/PixhawkMini Electronics before assembly](../../images/qav250_pixhawk_mini_electronics_unassembled.jpg)

### Telemetry radio (optional)

A telemetry radio is an optional component that can be used to wirelessly connect a ground control station (GCS) computer with the autopilot. This allows you to view in-flight data, change missions on the fly, and tune in the vehicle during flight.

PX4/Pixhawk Mini support many different telemetry radios. The radio used in this build is the (highly recommended) *3DR Telemetry Radio (915MHz)* (Discontinued).

> **Note** Telemetry radios use different frequency bands in order to comply with local regulations. Select a version appropriate for your region: USA - 915 MHz, Europe/Australia - 433MHz

The telemetry kit includes:

- Two telemetry transceivers (for vehicle and GCS)
- Micro USB cable
- Android OTG adapter cable
- Double-sided tape

![3DR Telemetry Radio Kit - unboxed](../../images/3dr_telemetry_radio_kit.jpg)

## Assembly tools

The following tools are used in this assembly:

- 2.0mm Hex screwdriver
- 3mm Philips screwdriver
- Wire cutters
- Soldering iron and solder
- Precision tweezers

![Tools required for assembling QAV250](../../images/qav250_pixhawk_mini_assembly_tools_needed.jpg)

## Off-frame assembly

This section shows how the electronics are wired (off frame) and how the frame is assembled without the electronics. This information can be used for reference if the on-the-frame screenshots are not sufficiently clear.

### Electronics Wiring/Connections (off frame)

The image below shows the *standard* multicopter wiring for *Pixhawk Mini*. It uses the *Quad Power Distribution Board* to power the ESCs, Pixhawk and Pixhawk power rail (the board includes an integrated power module that supports batteries up to 4S).

> **Note** For this QAV250 build we instead use the separate 10S Power module to power the ESCs and Pixhawk, and we don't use the optional external switch. The wiring is otherwise similar!

![Pixhawk Mini Electronics Wiring for QAV250 (off frame)](../../images/qav250_wiring_image_pixhawk_mini.jpg)

### Frame-only assembly

> **Note** This section shows how the frame is assembled without the complication of the electronics. It is references in the full assembly documentation below.

To assemble the frame:

**Step 1:** Use the 10mm standoffs and 20mm steels screws for PDB as shown in the picture.

![Add standoffs and screws to PDB](../../images/qav250_frame_assembly_1_pdb_standoffs.jpg)

**Step 2:** Place the frame on the standoffs.

![Place frame on top of standoffs (on top of PDB)](../../images/qav250_frame_assembly_frame_with_pdb_no_standoffs.jpg)

> **Note** Ensure that you have the frame-plate mounted the correct way. This cut indicated below shows the bottom of the frame. ![Diagram indicating which side is bottom of QAV250 frame plate](../../images/qav250_frame_assembly_indicate_bottom_of_frame.jpg)

**Step 3:** Put the 35mm standoffs on the screws (you will need 2.0mm Hex screwdriver).

![Place standoffs on top of frame](../../images/qav250_frame_assembly_frame_on_pdb_standoffs.jpg)

**Step 4:** Attach the camera plate and add remaining standoffs.

![Add camera place and remaining standoffs to the frame.](../../images/qav250_frame_assembly_camera_plate_and_remaining_standoffs.jpg)

**Step 5:** Place the flight controller cover plate on the standoffs and screw into place.

![Attach flight controller cover plate](../../images/qav250_frame_assembly_add_flight_controller_cover_plate.jpg)

Additional/manufacturer assembly can be found here: [Lumenier QAV250 Carbon Fiber Build Manual](http://www.lumenier.com/products/multirotors/qav250/build-manual-carbon-fiber).

## FULL Assembly with electronics

This section describes the full assembly of the QAV250 along with the *Pixhawk Mini*, motors and other electronics.

**Step 1:** Install motors

The red mark indicates the front of the frame. Make sure you place the motors in the correct order on the frame and pass the cables through the bottom of the frame.

![Add motors to QAV250 frame](../../images/qav250_add_motors.jpg)

**Step 2:** Solder the 4 ESCs to the PDB

The red cables must be soldered to the positive pad and the black cables to the negative pad (as shown for a single ESC below).

![Solder ESC to QAV250 PDB](../../images/qav250_solder_esc_pdb.jpg)

**Step 3:** Solder the power module to the PDB

The red cable should be soldered to the positive pad and the black cable to the negative pad. Solder in a way that fits your build.

![Solder power module to QAV250 pdb](../../images/qav250_solder_power_module_to_pdb.jpg)

**Step 4:** Solder LEDs to the PDB

Red cables should connect to the positive pad and black cables with negative pads. The white LEDs are for the front and the red LEDs are for back.

![Solder LEDS to QAV250 PDB](../../images/qav250_solder_leds_to_pdb.jpg)

**Step 5:** Solder the motors with the ESC

Solder the motor cables to the ESC pads as shown below. Make sure the motors turns in the correct direction. If not, swap the positions of cables A and C on the ESC.

![Solder motors to ESC.](../../images/qav250_solder_motors_to_esc.jpg)

> **Note** Once the cables are soldered in the correct order, cover the pads with electrical tape or tubing. ![Cover ESC in tape for safety](../../images/qav250_esc_covered_in_tape_for_safety.jpg)

**Step 6:** Attach the PDB to the frame

Follow the steps described in the Frame assembly section.

![Attach wired PDB to frame on QAV250](../../images/qav250_finished_pdb_attach_frame.jpg)

**Step 7:** Attach the LEDs to the frame using the Phillips screws provided.

![Attach LEDS to frame](../../images/qav250_attach_LEDs_to_frame.jpg)

> **Warning** The carbon fiber is conductive use silicon to avoid the contact with the weld in the frame.

![Use silicon to isolate LEDs from frame](../../images/qav250_use_silicon_with_leds.jpg)

**Step 8:** Attach vibration damping foam to the frame as shown (the foam is included in the *Pixhawk Mini* kit).

The foam reduces vibrations that may otherwise affect Pixhawk performance. The foam is sticky on both sides.

![Add damping foam to frame (for Pixhawk)](../../images/qav250_attach_pixhawk_damping_foam.jpg)

**Step 9:** Attach the *Pixhawk Mini* to the frame using the damping foam.

The Pixhawk should be oriented so that the arrow faces the front of the frame.

![Attach Pixhawk Mini on top of damping foam](../../images/qav250_attach_pixhawk_mini.jpg)

**Step 10:** Connect the power module.

Connect the Power Module and *Pixhawk Mini* using the supplied 6pin cable (as shown). If you're using the Power Module from the *Pixhawk Mini* kit it is connected in the same way.

![Connect the Pixhawk Mini to the power module](../../images/qav250_connectpowermodule.jpg)

**Step 11:** Connect ESC to the PWM output

Attach the ESCs to the *Pixhawk Mini* in the correct order, using either a PWM output cable *or* a PWM board as shown below (both are supplied in the *Pixhawk Mini* kit ).

![Connect Pixhawk to QAV250 ESCs using PWM Board](../../images/qav250_connect_pwm_board_escs.jpg) ![Connect Pixhawk to QAV250 ESCs using PWM cable](../../images/qav250_connect_pixhawk_to_esc_via_pwm_cables.jpg)

**Step 12:** Connect the receiver

Connect the *FRSky D4-R* receiver channel 1 to the **RCIN** port on the *Pixhawk Mini* (as shown).

![Connect FRSKY](../../images/qav250_connect_frsky_rc_reciever.jpg)

> **Note** Notes on receivers:

- The *Pixhawk Mini* **RCIN** port accepts PPM input (i.e. multiplexed channels). You can use a PWM receiver (with individual cables for each channel) but you will have to connect via PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html).
- You can also use a Spektrum receiver. These are connected to the **SPKT/DSM** input next to **RCIN** on the *Pixhawk Mini*.
- For more information see: Pixhawk Mini Receiver Compatibility <fix link>

**Step 13:** Connect the GPS/COMPASS module

Connect the GPS/COMPASS module to the *Pixhawk Mini*'s **GPS&I2C** port as shown below.

![Connect GPS to Pixhawk Mini](../../images/qav250_connect_gps_to_pixhawk_mini.jpg)

**Step 14:** Mount the GPS/COMPASS module

Attach flight controller cover plate (see frame assembly instructions) and then paste the GPS module onto the cover plate with the arrow to the front (paste included in kit).

![Mount GPS on QAV250](../../images/qav250_mount_gps.jpg)

**Step 15:** Connect and mount the telemetry radio (Optional)

Connect the telemetry radio to the *Pixhawk Mini* **TELEM** port as shown.

![Connect 3DR Wifi Telemetry Radio Kit to Pixhawk Mini](../../images/qav250_pixhawk_mini_to_telemetry_radio_connections.jpg)

Then mount the radio using the double-sided tape included in the telemetry radio kit (for this build we mounted the radio below the PDB, as shown below).

![Mount 3DR Wifi Telemetry Radio Kit to QAV250](../../images/qav250_mount_telemetry_radio.jpg)

**Step 16:** Attach landing standoffs to the arms

![QAV250 Landing Standoffs](../../images/qav250_landing_standoffs.jpg)

**Step 17:** Attach the battery foam and velcro battery strap to the cover plate (the battery strap and foam come with the frame kit)

![QAV250 with battery foam and velcro strap](../../images/qav250_battery_foam_and_velcro_strap.jpg)

The frame build is now complete! In the next step we can install and configure the PX4 autopilot.

![QAV250 - Complete build with pixhawk mini](../../images/qav250_complete_build_with_pixhawk_mini.jpg)

## PX4 installation and configuration

This section explains how you can use [QGroundControl](http://qgroundcontrol.com/) to install the PX4 autopilot and configure/tune it for the QAV250 frame.

> **Note** *QGroundControl* can be used to install and configure your autopilot, and also to plan missions and control your vehicle remotely.

[Download and install](http://qgroundcontrol.com/downloads/) *QGroundControl* for your platform.

### Firmware update

Update the *Pixhawk Mini* with the PX4 firmware, configured for the Lumenier QAV250.

**Step 1:** Start *QGroundControl* and select **Firmware** from the sidebar. Connect your vehicle to the USB port

![QGroundControl - Update firmware](../../images/qgc_firmware_menu.png)

**Step 2:** Select the airframe (**Quadrotor x > Lumenier QAV250**).

Then click **Apply and Restart**.

![QGroundControl - Select firmware to update](../../images/qav250_qgc_firmware.png)

> **Note** For additional information see:

- [Autopilot Configuration](../config/README.md)
- [Firmware setup](https://donlakeflyer.gitbooks.io/qgroundcontrol-user-guide/content/SetupView/Firmware.html) (QGroundControl)

### Vehicle calibration/setup

Vehicle calibration/setup is typically similar for all vehicles. You can follow the instructions below, or see  [Autopilot Configuration](../config/README.md).

**Step 3:** Radio calibration

1. Turn on the remote control.
2. Select **Radio** in the left-sidebar.
3. Select the "mode" of your remote control (top right).
4. Click the **Calibrate** button and follow the on-screen instructions.

![QGroundControl - Radio Calibration](../../images/qgc_radio_calibration.jpg)

**Step 4:** Calibrate sensors

1. Select **Sensors** in the left-sidebar.
2. Select the **Compass** button and then follow the on-screen instructions.
3. Select the **Gyroscope **button and then follow the on-screen instructions.
4. Select the **Accelerometer **button and then follow the on-screen instructions.

![QGroundControl - Calibrate Sensors](../../images/qgc_calibrate_sensors.png)

**Step 5:** Select flight modes.

[Flight Modes](../flight_modes/README.md) provide autopilot assisted or fully controlled flight. New users should configure their receiver to support the following three modes (these make the vehicle much easier to fly):

- *Stabilized* - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position)
- *Altitude* - Climb and drop are controlled to have a maximum rate.
- *Position* - When sticks are released the vehicle will stop (and hold position against wind drift)

There are a number of ways to [configure flight modes](../config/flight_mode.md). In this case we have a three-way switch on the receiver that we map to a single channel (5).

![QGroundControl - Set flight modes](../../images/qgc_flight_mode_selection_qav250.png)

For more information see:

- [Flight Mode Configuration](../config/flight_mode.md)
- [Flight Modes](../flight_modes/README.md)
- [Flight Modes](https://donlakeflyer.gitbooks.io/qgroundcontrol-user-guide/content/SetupView/FlightModes.html) (QGroundControl)

**Step 6:** Calibrate ESC

1. Remove propellers.
    
    > **Warning** Propellers must be removed from vehicle prior to performing ESC calibration!

2. Select **Power **in the left-sidebar.

3. Select the **Calibrate **button and then follow the on-screen instructions (Connect your battery. When the tones stop, press OK and unplug battery).
    
    ![QGroundControl - Calibrate ESCs](../../images/qgc_esc_calibration.png)
    
    ![QGroundControl - Calibrate ESCs](../../images/qgc_esc_calibration_power.png)

### Tuning

Firmware installation sets *default* autopilot parameters that have been configured for the selected frame (in this case for the *Lumenier QAV250*). As builds may use different components and place them differently, it is a good idea to tune the parameters for a specific frame build.

The parameters below are recommended for this build (the yellow parameters are the ones that have changed). These were generated by flight testing.

![Recommended parameters for QAV250](../../images/qav250_recommended_parameters.jpg)

For general information on tuning see: [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md).

## Video

The video below shows this QAV250 on a test flight.

{% youtube %} http://www.youtube.com/watch?v=MZzo4DMNkug {% endyoutube %}

## Acknowledgements

This build log was provided by: *Abimael Suarez, 3DRobotics*. Video was provided by *Santiago Escala*, *3DRobotics*.

<!-- Open Questions/ACTIONS - Need to update with cross links to other PX4 docs. At moment many of these do not exist: Pixhawk wiring overviews, receivers, gps etc, flight modes. -Tidy up some of the diagrams do remove unnecessary complication (e.g. remove OS footer from QGroundControl screens) -->
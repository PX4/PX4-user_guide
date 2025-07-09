---
canonicalUrl: https://docs.px4.io/main/tr/frames_multicopter/lumenier_qav250_pixhawk_mini
---

# Lumenier QAV250 Pixhawk Mini Build

The [Lumenier QAV250 Mini FPV Quadcopter](https://www.lumenier.com/products/legacy/qav250) is a small but fully functional FPV multicopter frame. This topic provides full build and configuration instructions for using the frame with the *Pixhawk Mini* flight controller, including how to install and configure the PX4 autopilot using *QGroundControl*.

Key information

- **Frame:** Lumenier QAV250 CF
- **Flight controller:** Pixhawk Mini
- **Assembly time (approx.):** 3.5 hours (2 for frame, 1.5 autopilot setup)

![QAV250 - Complete build with pixhawk mini](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_complete_build_with_pixhawk_mini.jpg)

![QAV250 - Complete build with pixhawk mini and props](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_complete_build.jpg)

## Bill of Materials

The components used in this build are listed below (along with links to where they can be purchased). In general we used hardware recommended by the manufacturers for the flight controller and frame.

- **Flight controller:** [Holybro Pixhawk Mini](../flight_controller/pixhawk_mini.md)
- **Power module:** 3DR 10s Power Module (Discontinued)
- **ESC:** Lumenier f390 with Blheli ([getfpv.com](https://www.getfpv.com/lumenier-f390-30a-blheli-esc-opto-2-4s.html)). These come with the motors.
- **Motors:** Lumenier RX2204 -14 2300KV ([getfpv.com](https://www.getfpv.com/lumenier-rx2204-14-2300kv-motor.html))
- **Propellers:** Lumenier 5x4.5 2 blade ([getfpv.com](http://www.getfpv.com/propellers/lumenier-5x3-5-2-blade-propeller-set-of-4-black.html))
- **Frame:** Lumenier QAV250 - CF ([getfpv.com](https://www.getfpv.com/qav250-mini-fpv-quadcopter-rtf-carbon-fiber-edition.html)) (Discontinued)
- **Receiver:** [FrSSKY D4R-II](https://www.frsky-rc.com/product/d4r-ii/)
- **Battery:** Lumenier 4S 1300 mAh ([getfpv.com](http://www.getfpv.com/lumenier-1300mah-4s-60c-lipo-battery-xt60.html))

Notes:

- The 4S Power Module that comes with the *Pixhawk Mini* can be used for the battery size above (instead of the 10S Power Module). Assembly is the same with either power module.
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


![Hardware for QAV250 frame](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_framehardware_displayall.jpg)

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


![QAV250/PixhawkMini Electronics before assembly](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_pixhawk_mini_electronics_unassembled.jpg)

### Telemetry radio (optional)

A telemetry radio is an optional component that can be used to wirelessly connect a ground control station (GCS) computer with the autopilot. This allows you to view in-flight data, change missions on the fly, and tune in the vehicle during flight.

PX4/Pixhawk Mini support many different telemetry radios. The radio used in this build is the (highly recommended) *3DR Telemetry Radio (915MHz)* (Discontinued).

:::note
Telemetry radios use different frequency bands in order to comply with local regulations. 
Select a version appropriate for your region: USA - 915 MHz, Europe/Australia - 433MHz
:::

The telemetry kit includes:

- Two telemetry transceivers (for vehicle and GCS)
- Micro USB cable
- Android OTG adapter cable
- Double-sided tape

![3DR Telemetry Radio Kit - unboxed](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/3dr_telemetry_radio_kit.jpg)

## Assembly tools

The following tools are used in this assembly:

- 2.0mm Hex screwdriver
- 3mm Philips screwdriver
- Wire cutters
- Soldering iron and solder
- Precision tweezers

![Tools required for assembling QAV250](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_pixhawk_mini_assembly_tools_needed.jpg)

## Off-frame assembly

This section shows how the electronics are wired (off frame) and how the frame is assembled without the electronics. This information can be used for reference if the on-the-frame screenshots are not sufficiently clear.

### Electronics Wiring/Connections (off frame)

The image below shows the *standard* multicopter wiring for *Pixhawk Mini*. It uses the *Quad Power Distribution Board* to power the ESCs, Pixhawk and Pixhawk power rail (the board includes an integrated power module that supports batteries up to 4S).

:::note
For this QAV250 build we instead use the separate 10S Power module to power the ESCs and Pixhawk, and we don't use the optional external switch.
The wiring is otherwise similar!
:::

![Pixhawk Mini Electronics Wiring for QAV250 (off frame)](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_wiring_image_pixhawk_mini.jpg)

### Frame-only assembly

:::note
This section shows how the frame is assembled without the complication of the electronics.
It is referenced in the full assembly documentation below.
:::

To assemble the frame:

**Step 1:** Use the 10mm standoffs and 20mm steels screws for PDB as shown in the picture.

![Add standoffs and screws to PDB](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_frame_assembly_1_pdb_standoffs.jpg)

**Step 2:** Place the frame on the standoffs.

![Place frame on top of standoffs (on top of PDB)](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_frame_assembly_frame_with_pdb_no_standoffs.jpg)

:::note
Ensure that you have the frame-plate mounted the correct way. The cut indicated below shows the bottom of the frame. ![Diagram indicating which side is bottom of QAV250 frame plate](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_frame_assembly_indicate_bottom_of_frame.jpg) :::

**Step 3:** Put the 35mm standoffs on the screws (you will need 2.0mm Hex screwdriver).

![Place standoffs on top of frame](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_frame_assembly_frame_on_pdb_standoffs.jpg)

**Step 4:** Attach the camera plate and add remaining standoffs.

![Add camera place and remaining standoffs to the frame.](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_frame_assembly_camera_plate_and_remaining_standoffs.jpg)

**Step 5:** Place the flight controller cover plate on the standoffs and screw into place.

![Attach flight controller cover plate](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_frame_assembly_add_flight_controller_cover_plate.jpg)

Additional/manufacturer assembly can be found here: [Lumenier QAV250 Carbon Fiber Build Manual](https://www.lumenier.com/products/legacy/build-manual-carbon-fiber).

## FULL Assembly with electronics

This section describes the full assembly of the QAV250 along with the *Pixhawk Mini*, motors and other electronics.

**Step 1:** Install motors

The red mark indicates the front of the frame. Make sure you place the motors in the correct order on the frame and pass the cables through the bottom of the frame.

![Add motors to QAV250 frame](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_add_motors.jpg)

**Step 2:** Solder the 4 ESCs to the PDB

The red cables must be soldered to the positive pad and the black cables to the negative pad (as shown for a single ESC below).

![Solder ESC to QAV250 PDB](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_solder_esc_pdb.jpg)

**Step 3:** Solder the power module to the PDB

The red cable should be soldered to the positive pad and the black cable to the negative pad. Solder in a way that fits your build.

![Solder power module to QAV250 pdb](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_solder_power_module_to_pdb.jpg)

**Step 4:** Solder LEDs to the PDB

Red cables should connect to the positive pad and black cables with negative pads. The white LEDs are for the front and the red LEDs are for back.

![Solder LEDS to QAV250 PDB](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_solder_leds_to_pdb.jpg)

**Step 5:** Solder the motors with the ESC

Solder the motor cables to the ESC pads as shown below. Make sure the motors turns in the correct direction. If not, swap the positions of cables A and C on the ESC.

![Solder motors to ESC.](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_solder_motors_to_esc.jpg)

:::note
Once the cables are soldered in the correct order, cover the pads with electrical tape or tubing. ![Cover ESC in tape for safety](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_esc_covered_in_tape_for_safety.jpg) :::

**Step 6:** Attach the PDB to the frame

Follow the steps described in the Frame assembly section.

![Attach wired PDB to frame on QAV250](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_finished_pdb_attach_frame.jpg)

**Step 7:** Attach the LEDs to the frame using the Phillips screws provided.

![Attach LEDS to frame](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_attach_LEDs_to_frame.jpg)

:::warning
The carbon fiber is conductive use silicon to avoid the contact with the weld in the frame. ![Use silicon to isolate LEDs from frame](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_use_silicon_with_leds.jpg) :::

**Step 8:** Attach vibration damping foam to the frame as shown (the foam is included in the *Pixhawk Mini* kit).

The foam reduces vibrations that may otherwise affect Pixhawk performance. The foam is sticky on both sides.

![Add damping foam to frame (for Pixhawk)](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_attach_pixhawk_damping_foam.jpg)

**Step 9:** Attach the *Pixhawk Mini* to the frame using the damping foam.

The Pixhawk should be oriented so that the arrow faces the front of the frame.

![Attach Pixhawk Mini on top of damping foam](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_attach_pixhawk_mini.jpg)

**Step 10:** Connect the power module.

Connect the Power Module and *Pixhawk Mini* using the supplied 6pin cable (as shown). If you're using the Power Module from the *Pixhawk Mini* kit it is connected in the same way.

![Connect the Pixhawk Mini to the power module](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_connectpowermodule.jpg)

**Step 11:** Connect ESC to the PWM output

Attach the ESCs to the *Pixhawk Mini* in the correct order, using either a PWM output cable *or* a PWM board as shown below (both are supplied in the *Pixhawk Mini* kit ).

![Connect Pixhawk to QAV250 ESCs using PWM Board](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_connect_pwm_board_escs.jpg) ![Connect Pixhawk to QAV250 ESCs using PWM cable](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_connect_pixhawk_to_esc_via_pwm_cables.jpg)

**Step 12:** Connect the receiver

Connect the *FRSky D4-R* receiver channel 1 to the **RCIN** port on the *Pixhawk Mini* (as shown).

![Connect FRSKY](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_connect_frsky_rc_reciever.jpg)


:::note
Notes on receivers:
- The *Pixhawk Mini* **RCIN** port accepts PPM input (i.e. multiplexed channels). You can use a PWM receiver (with individual cables for each channel) but you will have to connect via PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html).
- You can also use a Spektrum receiver. These are connected to the **SPKT/DSM** input next to **RCIN** on the *Pixhawk Mini*.
- For more information see: [Pixhawk Mini Receiver Compatibility](../flight_controller/pixhawk_mini.md#rc-radio) :::

**Step 13:** Connect the GPS/COMPASS module

Connect the GPS/COMPASS module to the *Pixhawk Mini*'s **GPS&I2C** port as shown below.

![Connect GPS to Pixhawk Mini](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_connect_gps_to_pixhawk_mini.jpg)

**Step 14:** Mount the GPS/COMPASS module

Attach flight controller cover plate (see frame assembly instructions) and then paste the GPS module onto the cover plate with the arrow to the front (paste included in kit).

![Mount GPS on QAV250](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_mount_gps.jpg)

**Step 15:** Connect and mount the telemetry radio (Optional)

Connect the telemetry radio to the *Pixhawk Mini* **TELEM** port as shown.

![Connect 3DR Wifi Telemetry Radio Kit to Pixhawk Mini](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_pixhawk_mini_to_telemetry_radio_connections.jpg)

Then mount the radio using the double-sided tape included in the telemetry radio kit (for this build we mounted the radio below the PDB, as shown below).

![Mount 3DR Wifi Telemetry Radio Kit to QAV250](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_mount_telemetry_radio.jpg)

**Step 16:** Attach landing standoffs to the arms

![QAV250 Landing Standoffs](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_landing_standoffs.jpg)

**Step 17:** Attach the battery foam and velcro battery strap to the cover plate (the battery strap and foam come with the frame kit)

![QAV250 with battery foam and velcro strap](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_battery_foam_and_velcro_strap.jpg)

The frame build is now complete! In the next step we can install and configure the PX4 autopilot.

![QAV250 - Complete build with pixhawk mini](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qav250_complete_build_with_pixhawk_mini.jpg)


## PX4 Configuration

*QGroundControl* is used to install the PX4 autopilot and configure/tune it for the frame. [Download and install](http://qgroundcontrol.com/downloads/) *QGroundControl* for your platform.

:::tip
Full instructions for installing and configuring PX4 can be found in [Basic Configuration](../config/README.md). :::

:::warning
Always make sure to have either battery or propellers physically removed from your vehicle during any initial configuration.
Better safe than sorry!
:::

First update the firmware, airframe, and actuator mappings:

- [Firmware](../config/firmware.md)
- [Airframe](../config/airframe.md)

  You will need to select the *Generic 250 Racer* airframe (**Quadrotor x > Generic 250 Racer**).

  ![QGC airframe selection of generic 250 racer](../../assets/airframes/multicopter/lumenier_qav250_pixhawk_mini/qgc_airframe_generic_250_racer.png)

- [Actuators](../config/actuators.md)
  - You should not need to update the vehicle geometry (as this is a preconfigured airframe).
  - Assign actuator functions to outputs to match your wiring.
  - Test the configuration using the sliders.

Then perform the mandatory setup/calibration:

* [Sensor Orientation](../config/flight_controller_orientation.md)
* [Compass](../config/compass.md)
* [Accelerometer](../config/accelerometer.md)
* [Level Horizon Calibration](../config/level_horizon_calibration.md)
* [Radio Setup](../config/radio.md)
* [Flight Modes](../config/flight_mode.md)

Ideally you should also do:

- [ESC Calibration](../advanced_config/esc_calibration.md)
- [Battery](../config/battery.md)
  - 4S (4 cell LiPo) with charged cell voltage 4.05V and empty cell voltage 3.4V (or appropriate values for your battery).
- [Safety](../config/safety.md)


### Tuning

Airframe selection sets *default* autopilot parameters for the frame. These are good enough to fly with, but it is a good idea to tune the parameters for a specific frame build.

For instructions on how, start from [Autotune](../config/autotune.md).



## Acknowledgements

This build log was provided by: *Abimael Suarez, 3DRobotics*.

<!-- Open Questions/ACTIONS - Need to update with cross links to other PX4 docs. At moment many of these do not exist: Pixhawk wiring overviews, receivers, gps etc, flight modes. -Tidy up some of the diagrams do remove unnecessary complication (e.g. remove OS footer from QGroundControl screens) -->

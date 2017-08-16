# Camera Trigger
The camera trigger driver allows the use of the AUX ports to send out pulses in order to trigger a camera. This can be used for multiple applications including timestamping photos for aerial surveying and reconstruction, synchronising a multi-camera system or visual-inertial navigation.

In addition to a pulse being sent out, a MAVLink message is published containing a sequence number (thus the current session's image sequence number) and the corresponding timestamp.

### Trigger modes

Four different modes are supported, controlled by the `TRIG_MODE` parameter:
* `TRIG_MODE` 1 works like a basic intervalometer that can be enabled and disabled by using the MAVLink command `MAV_CMD_DO_TRIGGER_CONTROL`. See [command interface](camera_trigger.md#command-interface) for more details.
* `TRIG_MODE` 2 switches the intervalometer constantly on.
* `TRIG_MODE` 3 triggers based on distance. A shot is taken every time the set horizontal distance is exceeded. The minimum time interval between two shots is however limited by the set triggering interval.
* `TRIG_MODE` 4 triggers automatically when flying a survey in Mission mode.
 
In `TRIG_MODE` 0, camera triggering is disabled.

> **Info : ** If it is your first time enabling the camera trigger app, remember to reboot after changing the `TRIG_MODE` parameter.

### Trigger hardware configuration

You can choose which AUX pins to use for triggering using the `TRIG_PINS` parameter. The default is 56, which means that trigger is enabled on AUX 5 and AUX 6. 

**IMPORTANT :** With `TRIG_PINS` set to its **default** value of 56, you can use the AUX pins 1, 2, 3 and 4 as actuator outputs (for servos/ESCs). Due to the way the hardware timers are handled (1234 are 56 are 2 different groups handled by 2 timers), this is the ONLY combination which allows the simultaneous usage of camera trigger and FMU actuator outputs. **DO NOT CHANGE THE DEFAULT VALUE OF `TRIG_PINS` IF YOU NEED ACTUATOR OUTPUTS.**

### Trigger interface backends

The camera trigger driver supports several backends - each for a specific application, controlled by the `TRIG_INTERFACE` parameter : 
* `TRIG_INTERFACE` 1 enables the GPIO interface. The AUX outputs are pulsed high or low (depending on the `TRIG_POLARITY` parameter) every `TRIG_INTERVAL` duration. This can be used to trigger most standard machine vision cameras directly. Note that on PX4FMU series hardware (Pixhawk, Pixracer, etc.), the signal level on the AUX pins is 3.3v.
* `TRIG_INTERFACE` 2 enables the Seagull MAP2 interface. This allows the use of the [Seagull MAP2](http://www.seagulluav.com/product/seagull-map2/) to interface to a multitude of supported cameras. Pin 1 of the MAP2 should be connected to the lower AUX pin of `TRIG_PINS` (therefore, pin 1 to AUX 5 and pin 2 to AUX 6 by default). In this mode, PX4 also supports automatic power control and keep-alive functionalities of Sony Multiport cameras like the QX-1.
* `TRIG_INTERFACE` 3 enables the MAVLink interface. In this mode, no actual hardware output is used. Only the `CAMERA_TRIGGER` MAVLink message is sent by the autopilot (by default, if the MAVLink application is in `onboard` mode. Otherwise, a custom stream will need to be enabled).
* `TRIG_INTERFACE` 4 enables the generic PWM interface. This allows the use of  [infrared triggers](https://hobbyking.com/en_us/universal-remote-control-infrared-shutter-ir-rc-1g.html) or servos to trigger your camera.

### Other parameters 

* `TRIG_POLARITY` - Relevant only while using the GPIO interface. Sets the polarity of the trigger pin. Active high means that the pin is pulled low normally and pulled high on a trigger event. Active low is vice-versa.
* `TRIG_INTERVAL` - Defines the time between two consecutive trigger events in milliseconds.
* `TRIG_ACTIVATION_TIME`- Defines the time in milliseconds the trigger pin is held in the "active" state before returning to neutral. In PWM modes, the minimum is limited to 40 ms to make sure we always fit an activate pulse into the 50Hz PWM signal.

The full list of parameters pertaining to the camera trigger module can be found on the [parameter reference](../advanced/parameter_reference.md#camera-trigger) page.

### Command interface 

**TODO : needs updating**

The camera trigger driver supports several commands -

**`MAV_CMD_DO_TRIGGER_CONTROL`** - Accepted in "command controlled" mode (`TRIG_MODE` 1).

| Command Parameter | Description |
| -- | -- |
| Param #1 | Trigger enable/disable (set to 0 for disable, 1 for start) |
| Param #2 | Trigger cycle time in milliseconds (sets the `TRIG_INTERVAL` parameter. ) |
| Param #3 | Sequence reset (set to 1 to reset image sequence number, 0 to keep current sequence number) |

**`MAV_CMD_DO_DIGICAM_CONTROL` ** - Accepted in all modes. This is used by the GCS to test-shoot the camera from the user interface. The trigger driver does not yet support all camera control parameters defined by the MAVLink spec.

| Command Parameter | Description |
| -- | -- |
| Param #5 | Trigger one-shot command (set to 1 to trigger a single image frame) |

**`MAV_CMD_DO_SET_CAM_TRIGG_DIST`** - Accepted in "mission controlled" mode (`TRIG_MODE` 4)

This command is autogenerated during missions to trigger the camera based on survey missions from the GCS.

### Testing trigger functionality

1. On the PX4 console : 
`camera_trigger test`

2. From QGroundControl : 

Click on "Trigger Camera" in the main instrument panel. These shots are not logged or counted for geotagging.

![](../../assets/qgc_test_camera.png)

## Sony QX-1 example (Photogrammetry)

![](../../assets/photogrammetry.png)

In this example, we will use a Seagull MAP2 trigger cable to interface to a Sony QX-1 and use the setup to create orthomosaics after flying a fully autonomous survey mission. 

#### Trigger settings : 

The camera trigger can be configured from QGroundControl's "Camera" page under the settings tab

* `TRIG_INTERFACE`: 2, Seagull MAP2.
* `TRIG_MODE`: 4, Mission controlled.

Leave the rest of the parameters at their defaults.

![](../../assets/trigger_pins.png)

You will need to connect the Seagull MAP2 to the auxiliary/FMU pins on your autopilot. Pin 1 goes to AUX 5, and Pin 2 to AUX 6. The other end of the MAP2 cable will go into the QX-1's "MULTI" port.

#### Camera configuration :

We use a Sony QX-1 with a 16-50mm f3.5-5.6 lens for this example.

To avoid autofocus and metering lag when the camera is triggered, the following guidelines should be followed :

* Manual focus to infinity
* Set camera to continuous shooting mode
* Manually set exposure and aperture
* ISO should be set as low as possible
* Manual white balance suitable for scene

#### Mission planning :

![](../../assets/qgc_survey_polygon.jpeg)

![](../..//assets/qgc_survey_parameters.jpg)

#### Geotagging : 

Download/copy the logfile and images from the flight and point QGroundControl to them. Then click on "Start Tagging".

![](../../assets/qgc_geotag.png)

You can verify the geotagging using a free online service like [Pic2Map](https://www.pic2map.com/). Note that Pic2Map is limited to only 40 images.

#### Reconstruction :

We use [Pix4D](https://pix4d.com/) for 3D reconstruction.

![](../../assets/geotag.jpg)

## Camera-IMU sync example (VIO)
In this example, we will go over the basics of synchronising IMU measurements with visual data to build a stereo Visual-Inertial Navigation System (VINS). To be clear, the idea here isn't to take an IMU measurement exactly at the same time as we take a picture but rather to correctly time stamp our images so as to provide accurate data to our VIO algorithm.

The autopilot and companion have different clock bases (boot-time for the autopilot and UNIX epoch for companion), so instead of skewing either clock, we directly observe the time offset between the clocks. This offset is added or subtracted from the timestamps in the mavlink messages (e.g `HIGHRES_IMU`) in the cross-middleware translator component (e.g Mavros on the companion and `mavlink_receiver` in PX4). The actual synchronisation algorithm is a modified version of the Network Time Protocol (NTP) algorithm and uses an exponential moving average to smooth the tracked time offset. This synchronisation is done automatically if Mavros is used with a high-bandwidth onboard link (MAVLink mode `onboard`).

For acquiring synchronised image frames and inertial measurements, we connect the trigger inputs of the two cameras to a GPIO pin on the autopilot. The timestamp of the inertial measurement from start of exposure and a image sequence number is recorded and sent to the companion computer (`CAMERA_TRIGGER` message), which buffers these packets and the image frames acquired from the camera. They are matched based on the sequence number (first image frame is sequence 0), the images timestamped (with the timestamp from the `CAMERA_TRIGGER` message) and then published.

The following diagram illustrates the sequence of events which must happen in order to correctly timestamp our images.

{% mermaid %}
sequenceDiagram
  Note right of PX4 : Time sync with mavros is done automatically
  PX4 ->> mavros : Camera Trigger ready
  Note right of camera driver : Camera driver boots and is ready
  camera driver ->> mavros : mavros_msgs::CommandTriggerControl
  mavros ->> PX4 : MAVLink::MAV_CMD_DO_TRIGGER_CONTROL
  loop Every TRIG_INTERVAL milliseconds
  PX4 ->> mavros : MAVLink::CAMERA_TRIGGER
  mavros ->> camera driver : mavros_msgs::CamIMUStamp
  camera driver ->> camera driver : Match sequence number
  camera driver ->> camera driver : Stamp image and publish
end
{% endmermaid %}

#### Step 1
First, set the TRIG_MODE to 1 to make the driver wait for the start command and
reboot your FCU to obtain the remaining parameters.

#### Step 2
For the purposes of this example we will be configuring the trigger to operate
in conjunction with a Point Grey Firefly MV camera running at 30 FPS.

* `TRIG_INTERVAL`: 33.33 ms
* `TRIG_POLARITY`: 0 (active low)
* `TRIG_ACT_TIME`: 0.5 ms. The manual specifies it only has to be a minimum of 1 microsecond.
* `TRIG_MODE`: 1, because we want our camera driver to be ready to receive images before starting to trigger. This is essential to properly process sequence numbers.
* `TRIG_PINS`: 56, Leave default.

#### Step 3
Wire up your cameras to your AUX port by connecting the ground and signal pins to the appropriate place.

#### Step 4
You will have to modify your driver to follow the sequence diagram above. Public reference implementations for [IDS Imaging UEye](https://github.com/ProjectArtemis/ueye_cam) cameras and for [IEEE1394 compliant](https://github.com/andre-nguyen/camera1394) cameras are available.

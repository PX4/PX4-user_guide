# Cameras

Cameras are important for many [payload use cases](../payloads/use_cases.md), including mapping and surveying, surveillance, search & rescue, crop health and pest detection, and so on.
They are commonly mounted on a [gimbal](../advanced/gimbal_control.md) that can provide camera stabilisation, point tracking, and movement independent of the hosting vehicle.

## Camera Types

PX4 integrates with two types of cameras (follow links for setup/configuration information):

- [MAVLink cameras](../camera/mavlink_camera.md) that are controlled using the [MAVLink camera protocol](https://mavlink.io/en/services/camera.html).

  These provide full access to any feature of the camera that has been exposed via the protocol, such as image and video capture, video streaming to a ground station, control over zoom and focus, selecting between infrared and visible light feeds, and so on.

  Usually a camera manager running on a companion computer is used to interface between MAVLink and a camera's native protocol.

- [Cameras Attached to Flight Controller Outputs](../camera/fc_connected_camera.md)

  Photo capture can be triggered from a flight controller pin, and in some cases an additional pin can toggle camera modes.

Both approaches allow image capture in missions and when commanded by a ground station, and are suitable for mapping and survey applications.
MAVlink cameras support many more functions, such as streaming and video capture, and can be used for a broader range of applications.

## Overview

### Mission Camera Commands

PX4 _allows_ the following camera commands in missions (i.e. does not reject the mission if they are included):

- `MAV_CMD_DO_TRIGGER_CONTROL`, `MAV_CMD_DO_DIGICAM_CONTROL`, `MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL`, `MAV_CMD_DO_SET_CAM_TRIGG_DIST`, `MAV_CMD_OBLIQUE_SURVEY`.
- `MAV_CMD_IMAGE_START_CAPTURE`, `MAV_CMD_IMAGE_STOP_CAPTURE`, `MAV_CMD_VIDEO_START_CAPTURE`, `MAV_CMD_VIDEO_STOP_CAPTURE`, `MAV_CMD_DO_CONTROL_VIDEO`,  `MAV_CMD_SET_CAMERA_MODE`, `NAV_CMD_SET_CAMERA_FOCUS`.

PX4 automatically emits these as MAVLink commands, specifying a target component ID of [MAV_COMP_ID_CAMERA (100)](https://mavlink.io/en/messages/common.html#MAV_COMP_ID_CAMERA) (and its own system id).
If there is a MAVLink camera associated with the system that has this component ID, it will execute the indicated command.

<!-- Note, not sure about `MAV_CMD_SET_CAMERA_MODE`, `NAV_CMD_SET_CAMERA_FOCUS` - do not seem to be resent??? -->

:::info
PX4 currently ignores the target camera `id` in [MAV_CMD_IMAGE_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_START_CAPTURE) and other camera messages.
See [PX4-Autopilot#23083](https://github.com/PX4/PX4-Autopilot/issues/23083).
:::

When using a camera attached to the flight controller outputs, only the commands in the first bullet point above can be used for triggering the camera.

The [Camera Driver](#camera-driver) monitors for the trigger commands it supports and will emit the [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message for each trigger event (even when configured with a MAVLink camera backend).
Note that the commands in the second bullet point, such as `MAV_CMD_IMAGE_START_CAPTURE`, are not supported by the [Camera Driver](#camera-driver).

<!-- void Navigator::publish_vehicle_cmd(vehicle_command_s *vcmd)
https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/navigator/navigator_main.cpp#L1381
https://github.com/PX4/PX4-Autopilot/issues/23083
-->

### Camera Commands

When using a camera connected to the flight controller, the [Camera Driver](#camera-driver) will trigger the camera if PX4 recieves any of the supported set of commands, and emit the [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message for each trigger event.
The supported set of commands is the same as for missions (see [Camera Driver](#camera-driver) below).

When using a MAVLink camera, PX4 should be configured to forward all camera commands and messages to the camera.
As for missions, the camera driver will emit `CAMERA_TRIGGER` for the supported subset of commands.

### Joystick

When using a MAVLink camera, Joystick buttons can be mapped to capture images, and to toggle video capture on and off.

Note that this only works for MAVLink cameras because the implementation emits messages such as `MAV_CMD_IMAGE_START_CAPTURE` that are not supported by the [Camera Driver](#camera-driver).

### Camera Driver

The camera driver triggers a connected camera and then emits `CAMERA_TRIGGER`, as appropriate based on the following commands (which can be set by a command or in a mission):

- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) — set time interval between captures.
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) — set distance between captures
- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) — start/stop capturing (using distance or time, as defined using above messages).
- [MAV_CMD_OBLIQUE_SURVEY](https://mavlink.io/en/messages/common.html#MAV_CMD_OBLIQUE_SURVEY) — start/stop oblique survey

The driver supports a number of backends, for connecting to different types of output pins.

Note that the MAVLink camera driver backend simply emits the `CAMERA_TRIGGER` message as appropriate.
PX4 MAVLink forwarding must be set up to ensure that the commands/messages are sent to the MAVLink camera.

### Camera Capture

PX4 also support camera-capture notification through a flight controller pin.
The pin can be connected to the camera hotshoe and the PX4 camera capture driver will then emit `CAMERA_TRIGGER` if a camera capture event is detected.
This is more accurate than the timestamp provided by the `CAMERA_TRIGGER` emitted when the camera is commanded to capture the image.

## Subtopics

- [MAVLink Cameras](../camera/mavlink_camera.md)
- [Cameras Attached to Flight Controller Outputs](../camera/fc_connected_camera.md)

## See Also

- [Gimbal (Camera Mount)](../advanced/gimbal_control.md)

Developers:

- Camera trigger driver: [source code](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/camera_trigger) <!-- no module doc -->
- Camera capture driver: [source code](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/camera_capture) <!-- no module doc -->
- [`Navigator::publish_vehicle_cmd()`](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/navigator/navigator_main.cpp#) - Method to publish camera commands in missions.

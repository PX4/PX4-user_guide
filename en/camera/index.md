# Cameras

Cameras are important for many [payload use cases](../payloads/use_cases.md), including mapping and surveying, surveillance, search & rescue, crop health and pest detection, and so on.
They are commonly mounted on a [gimbal](../advanced/gimbal_control.md) that can provide camera stabilisation, point tracking, and movement independent of the hosting vehicle.

PX4 can be used with with two classes of cameras:

- [MAVLink cameras](../camera/mavlink_camera.md), which are controlled using the [MAVLink camera protocol](https://mavlink.io/en/services/camera.html).

  These are suitable for most use cases, because they allow access to any feature of the camera that has been exposed via the protocol, such as image and video capture and control over where the data is saved, video streaming to a ground station, control over zoom and focus, selecting between infrared and visible light feeds, and so on.
  
  However, since most cameras do not support the MAVLink camera protocol, you'll generally need a camera manager running on a companion computer to interface between MAVLink and the camera's native protocol.

- Cameras that are attached directly to the flight controller outputs.

  PX4 can use this type of camera to trigger photo capture in missions, and when commanded by a ground station via MAVLink.
  This approach is suitable for use cases that require only image capture, such as mapping and survey applications.

## MAVLink Trigger Commands

### Commands Supported by all Cameras

The following MAVLink image capture commands are supported by _all_ cameras:

- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) — set time interval between captures.
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) — set distance between captures
- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) — start/stop capturing (using distance or time, as defined using above messages).

When using the MAVLink camera driver backend, PX4 will emit these commands if they are found when processing a mission, or forward them if received from a ground stations.

## MAVLink Cameras

MAVLink cameras support the full [MAVLink camera protocol](https://mavlink.io/en/services/camera.html).

PX4 just acts as a pass-through for these commands, and may need to be configured to forward traffic between the camera and ground station.

## Subtopics

- [MAVLink Cameras](../camera/mavlink_camera.md)
- [Configuration](../camera/configuration.md)

## See Also

- [Gimbal (Camera Mount)](../advanced/gimbal_control.md)

<!--

Whenever a camera is triggered, the MAVLink [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message is published containing a sequence number (i.e. the current session's image sequence number) and the corresponding timestamp.
This timestamp can be used for several applications, including: timestamping photos for aerial surveying and reconstruction, synchronising a multi-camera system or visual-inertial navigation.

Cameras can also (optionally) signal PX4 at the exact moment that a photo/frame is taken using a camera capture pin.
This allows more precise mapping of images to GPS position for geotagging, or the right IMU sample for VIO synchronization, etc.
-->
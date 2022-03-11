---
author: Jimmy Johnson
---

# Follow-Me Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Follow Me* mode allows a multicopter to autonomously follow and track another system that is broadcasting its position using the [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) MAVLink message.

The vehicle will automatically yaw to face and follow the target from a specified [relative orientation](#NAV_FT_FS), [distance](#NAV_FT_DST) and [height](#NAV_MIN_FT_HT) (reference point : home, ground (with distance sensor), target's GPS altitude, depending on the [altitude control mode](#NAV_FT_ALT_M)).

By default it will follow from directly behind the target at a distance of 8 meters, and a height of 8 meters above the home/arming position.

User has an option to control the follow orientation, height and distance by :
- Follow Orientation : Yaw input (left and right yaw translates into movement around the user, as seen from the user)
- Follow Height : Throttle input ()
- Follow Distance : Pitch input (distance will increase / decrease accordingly to the pitch command)

The mode is supported by *QGroundControl* on Android devices with a GPS module, and [MAVSDK](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_follow_me.html).

:::note
* This mode requires GPS.
* This mode is currently only supported on multicopter.
* The follow target must also be able to supply position information.
* *QGroundControl* only supports this mode on Android devices that have GPS.
:::

@[youtube](https://youtu.be/RxDL4CtkzAQ)

## Safety Precautions

:::warning
**Follow-me mode** does not implement any type of obstacle avoidance.
Special care must be taken when this mode is used.
:::

The following flight precautions should be observed:
- Follow me mode should only be used in wide open areas that are unobstructed by trees, power lines, houses, etc.
  - Set the [follow-me height](#NAV_MIN_FT_HT) to a value that is well above any surrounding obstructions.
    By *default* this is 8 metres/26 feet above the home (arming) position.
- It is *safer* to manually fly to a safe height before engaging follow-me mode than to engage follow-me mode when landed (even though the mode implements auto take off).
- Give your vehicle sufficient room to stop, especially when it is moving fast.
- Be ready to switch back to Position mode, etc, if something goes wrong when using follow me mode for the first time.
  If the target system (e.g. Android Phone)'s GPS is not accurate, this can affect the behavior.

## How to use Follow Me

*Follow Me* mode is supported by *QGroundControl* on ground station hardware that has a GPS module.
The recommended configuration is a USB OTG-capable Android device with two telemetry radios.

To setup *Follow Me* mode:
- Connect a telemetry radio to your ground station device and another to the vehicle (this allows positioning information to be relayed between the two radios).
- Disable sleep-mode on your Android device:
  - This setting can usually be found under: **Settings \> Display**.
  - It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals.
- Takeoff to a height of at least 2-3 metres (recommended even though auto-takeoff is supported).
  - Set the vehicle on the ground, press the safety switch and step back at least 10 meters.
  - Arm the vehicle and takeoff.
- Switch into follow me mode.
  - The copter will first ascend to the specified [minimum height](#NAV_MIN_FT_HT) while facing the target, then move horizontally, to avoid potential collisions

At this point you can start moving, and the drone will be following you.

The mode has been tested on the following Android devices:
- Nexus 5
- Nexus 7 Tablet
- Galaxy S10

## Configuration

:::warning
Setting the **Altitude mode ([NAV_FT_ALT_M](../advanced_config/parameter_reference.md#NAV_FT_ALT_M)**) to '3D Tracking' can be dangerous and unstable, as Android phones for example are known for having huge altitude errors in their GPS coordinates, around 10 to 50 meters. Therefore, 3D Tracking is only advised if you have an accurate GPS source for the Ground Station!
:::

The follow-me behavior can be configured using the following parameters:

Parameter | Description
--- | ---
NAV_FT_ALT_M
<span id="NAV_FT_ALT_M"></span>[NAV_FT_ALT_M](../advanced_config/parameter_reference.md#NAV_FT_ALT_M) | Altitude control mode. This defines where the baseline for the follow height will be.<br>- `0` = 2D Tracking <br>- `1` = 2D Tracking + Terrain Following <br>- `2` = 3D Tracking
<span id="NAV_MIN_FT_HT"></span>[NAV_MIN_FT_HT](../advanced_config/parameter_reference.md#NAV_MIN_FT_HT) | Vehicle follow-me height. Note that this height is fixed *relative to the home/arming position* (not the target vehicle). Default and minimum height is 8 meters (about 26 ft).
<span id="NAV_FT_DST"></span>[NAV_FT_DST](../advanced_config/parameter_reference.md#NAV_FT_DST) | Vehicle/ground station separation in the *horizontal* (x,y) plane. Minimum allowed separation is 1 meter. Default distance is 8 meters (about 26 ft).
<span id="NAV_FT_FS"></span>[NAV_FT_FS](../advanced_config/parameter_reference.md#NAV_FT_FS) | Flight position relative to the user when follow-me mode is active.<br>- `0` = Follow from the front right.<br>- `1` = Follow from behind or trail the user (Default).<br>- `2` = Follow from the front.<br>- `3` = Follow from the front left.


## Known Issues

- The SiK 915 Mhz [telemetry radio](../telemetry/sik_radio.md) is known to interfere with the GPS signal being received by some Android devices.
  Keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.

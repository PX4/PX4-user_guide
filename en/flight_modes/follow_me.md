---
author: Jimmy Johnson
---

# Follow-Me Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Follow Me* mode allows a multicopter to autonomously follow and track another system that is broadcasting its position using the [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) MAVLink message.

![Follow-me Concept](../../assets/flight_modes/followme_concept.png)

The vehicle will automatically yaw to face and follow the target from a specified [relative angle](#NAV_FT_FS), [distance](#NAV_FT_DST) and [height](#NAV_FT_HT) and altitude, depending on the [altitude control mode](#NAV_FT_ALT_M)).

By default it will follow from directly behind the target at a distance of 8 meters, and a height of 8 meters above the home(arming) position.

User has an option to control the follow angle, height and distance by :
- Follow Angle : Roll input. Left and right command will be as if you were controlling the drone's roll while facing it, i.e. Left command moves drone around counter clockwise
- Follow Height : Throttle input. Center the stick to keep follow height constant, increase or decrease to adjust height
- Follow Distance : Pitch input. Pushing pitch stick up increases the follow distance, pulling it down decreases the distance.

Follow Angle is defined as increasing in clockwise direction, and it get's applied relative to where the target is headed:

![Follow-me Angle Diagram](../../assets/flight_modes/followme_angle.png)

The mode is supported by *QGroundControl* on Android devices with a GPS module, and [MAVSDK](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_follow_me.html).

:::note
* This mode requires GPS.
* This mode is currently only supported on multicopter.
* The follow target must also be able to supply position information.
* *QGroundControl* only supports this mode on Android devices that have GPS.
:::

Demo video:

@[youtube](https://www.youtube.com/watch?v=myPFVJJkm04)

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

## How to use Follow Me using QGroundControl

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
  - The copter will first ascend to minimum safety altitude of 1 meters above the ground or home, depending on the presence of a distance sensor.
  - It will ascend until it is 3 meters within the [follow height](#FLW_TGT_HT) to avoid potential collisions before moving horizontally.
  - Copter will always adjust it's heading to face the target

At this point you can start moving, and the drone will be following you.

The mode has been tested on the following Android devices:
- Galaxy S10
- Nexus 7 Tablet

## Using MAVSDK to use Follow Me
MAVSDK supports [Follow Me](https://mavsdk.mavlink.io/main/en/cpp/guide/follow_me.html). However it currently has a bug where a same message is getting sent twice occasionally, which can mess with the target position and velocity estimator.

Therefore using MAVSDK for a Follow Me isn't covered here for now.

## Configuration

:::warning
Do not set the **Altitude mode ([FLW_TGT_ALT_M](#FLW_TGT_ALT_M)**) to `3D Tracking`!
The MAVLink [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) message definition requires the Altitude above Mean Sea Level (AMSL) for the target altitude. Testing of QGC on Android phone however showed that it's reporting Altitude above Ellipsoid (which can differ as much as 200 meters!), which is a bug in QGC right now.
Therefore it's not recommended to turn on 3D tracking mode
:::

The follow-me behavior can be configured using the following parameters:

Parameter | Description
--- | ---
<a id="FLW_TGT_ALT_M"></a>[FLW_TGT_ALT_M](../advanced_config/parameter_reference.md#FLW_TGT_ALT_M) | Altitude control mode. <br>- `0` = 2D Tracking <br>- `1` = 2D Tracking + Terrain Following <br>- `2` = 3D Tracking of the target's altitude
<a id="FLW_TGT_HT"></a>[FLW_TGT_HT](../advanced_config/parameter_reference.md#FLW_TGT_HT) | Vehicle follow-me height. Note that this height is fixed *relative to the home/arming position* (not the target vehicle). Default and minimum height is 8 meters (about 26 ft)
<a id="FLW_TGT_DST"></a>[FLW_TGT_DST](../advanced_config/parameter_reference.md#FLW_TGT_DST) | Vehicle/ground station separation in the *horizontal* (x,y) plane. Minimum allowed separation is 1 meter. Default distance is 8 meters (about 26 ft).
<a id="FLW_TGT_FS"></a>[FLW_TGT_FS](../advanced_config/parameter_reference.md#FLW_TGT_FS) | Flight position relative to the user when follow-me mode is active.<br>- `0` = Follow from the front right.<br>- `1` = Follow from behind or trail the user (Default).<br>- `2` = Follow from the front.<br>- `3` = Follow from the front left.

### Altitude Control mode explanation
To make Follow Me simple, the default [altitude mode](#FLW_TGT_ALT_M), 2D tracking, keeps drone's altitude constant unless user adjusts them via parameter or RC stick input. This means that if you are going up on a hill, drone wouldn't know about this and would assume that you are at a constant altitude.

The 2D + Terrain mode can compensate for the terrain's altitude change using a distance sensor. However if your drone doesn't have the distance sensor, it would behave exactly the same as 2D tracking mode. However this can make drone very jumpy as distance sensors aren't always accurate. Also since it's assuming that the ground under the drone is at the same level as you (the target), if the field isn't flat enough it can lead to drone flying at the wrong altitude.

The 3D tracking mode will take your GPS altitude into account, therefore adapting to the altitude changes, e.g. You walking up hill. BUT as mentioned above in the beginning, due to the bug in QGC, using this mode without checking the altitude output of the ground station can lead to a faulty altitude being sent to the drone, making it think that you are either high up in the sky or deep underneath the earth.

The drone would likely not crash into the ground due to the built in minimum safety altitude limit (1 meter), but it may fly high up into the sky. If the drone's altitude is way off, assume that the ground station's altitude output is wrong and use 2D tracking.

## Known Issues

- The SiK 915 Mhz [telemetry radio](../telemetry/sik_radio.md) is known to interfere with the GPS signal being received by some Android devices.
  Keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.

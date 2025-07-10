---
canonicalUrl: https://docs.px4.io/main/ru/flight_modes/follow_me
---

---
author: Jimmy Johnson
---

# Follow-Me Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Follow Me* mode allows a multicopter to autonomously follow and track another system that is broadcasting its position using the [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) MAVLink message.

The vehicle will automatically yaw to face and follow the target from a specified [relative position](#NAV_FT_FS), [horizontal separation](#NAV_FT_DST) and [height](#NAV_MIN_FT_HT) above the home position. By default it will follow from directly behind the target at a distance of 8 meters, and a height of 8 meters above the home/arming position. While in this mode no user input is required.

:::tip PX4 currently ignores the altitude of/from the target and follows at a constant altitude above home. This limitation is because altitude sources from GPS on ground stations are often inaccurate.
:::

The mode is supported by *QGroundControl* on Android tablets that have a GPS module, and by the [MAVSDK](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_follow_me.html).

:::note
* This mode requires GPS. * This mode is currently only supported on multicopter. * The follow target must also be able to supply position information. * *QGroundControl* only supports this mode on Android devices that have GPS.
:::

@[youtube](https://youtu.be/RxDL4CtkzAQ)

## Safety Precautions

:::warning
**Follow-me mode** does not implement any type of obstacle avoidance. Special care must be taken when this mode is used.
:::

The following flight precautions should be observed: - Follow me mode should only be used in wide open areas that are unobstructed by trees, power lines, houses, etc. - Set the [follow-me height](#NAV_MIN_FT_HT) to a value that is well above any surrounding obstructions. By *default* this is 8 metres/26 feet above the home (arming) position. - It is *safer* to manually fly to a safe height before engaging follow-me mode than to engage follow-me mode when landed (even though the mode implements auto take off). - Give your vehicle sufficient room to stop, especially when it is moving fast. Many Android devices do not update their position very frequently, and autopilot estimations of the speed and direction can be inaccurate. - Be ready to take manual RC control if something goes wrong when using follow me mode for the first time. The accuracy of positioning is dependent on the quality of the GPS used by target system. If the GPS is not accurate, this will be reflected in follow me.

## Using Follow Me with QGroundControl

*Follow Me* mode is supported by *QGroundControl* on ground station hardware that has a GPS module. The recommended configuration is a USB OTG-capable Android device with two telemetry radios.

To setup *Follow Me* mode: - Connect a telemetry radio to your Android device and another to the vehicle (this allows positioning information to be relayed between the two radios). - Disable sleep-mode on your Android device: - This setting can usually be found under: **Settings \> Display**. - It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals. - Takeoff to a height of at least 2-3 metres (recommended even though auto-takeoff is supported). - Set the vehicle on the ground, press the safety switch and step back at least 10 meters. - Arm the vehicle and takeoff. - Switch into follow me mode. - The copter will ascend to the specified [minimum height](#NAV_MIN_FT_HT) and then pause for a moment to assess the radio link. If the link update rate is OK the multicopter will then yaw to face the target.

At this point you should be able to start moving and the copter should follow your movements.

The mode has been tested on the following Android devices: - Nexus 5 - Nexus 7 Tablet

## Configuration

The follow-me behaviour can be configured using the following parameters:

| Parameter                                                                                           | Description                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_FT_DST"></span>[NAV_FT_DST](../advanced_config/parameter_reference.md#NAV_FT_DST)       | Vehicle/ground station separation in the *horizontal* (x,y) plane. Minimum allowed separation is 1 meter. Default distance is 8 meters (about 26 ft).                                                                                       |
| <span id="NAV_MIN_FT_HT"></span>[NAV_MIN_FT_HT](../advanced_config/parameter_reference.md#NAV_MIN_FT_HT) | Vehicle follow-me height. Note that this height is fixed *relative to the home/arming position* (not the target vehicle). Default and minimum height is 8 meters (about 26 ft).                                                             |
| <span id="NAV_FT_FS"></span>[NAV_FT_FS](../advanced_config/parameter_reference.md#NAV_FT_FS)         | Flight position relative to the user when follow-me mode is active.  
- `0` = Follow from the front right.  
- `1` = Follow from behind or trail the user (Default).  
- `2` = Follow from the front.  
- `3` = Follow from the front left. |

## Known Issues

- The SiK 915 Mhz [telemetry radio](../telemetry/sik_radio.md) is known to interfere with the GPS signal being received by some Android devices. Keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.
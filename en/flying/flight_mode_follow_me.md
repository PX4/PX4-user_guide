---
author: Jimmy Johnson
---

# Follow-Me Mode

Follow-me mode allows a vehicle to autonomously follow and track a user on a phone/tablet running QGroundControl. Currently this only works for multicopters and using Android devices.

By using GPS and other positioning information a multicopter is able to automatically yaw to face and follow a user at a specified position and distance. While in this mode no user input is required.


{% youtube %}
https://www.youtube.com/watch?v=RxDL4CtkzAQ
{% endyoutube %}

<!-- Updated to Follow me 1.4 -->

## Safety precautions

> **Warning** **Follow-me mode** does not implement any type of obstacle avoidance. Special care must be taken when this mode is used.

The following flight precautions should be observed.

-   Follow me mode should only be used in wide open areas that are unobstructed by trees, power lines, houses, etc.
    -   Set the follow-me height to a value that is well above any surrounding obstructions
    -   The **default** follow-me height is set to 8 metres (about 26 feet) relative to the home and arming position.
-   It is *safer* to manually fly to a safe height before engaging follow-me mode than to engage follow-me mode when landed (even though follow me mode does implement auto take off).
-   Give your vehicle a lot of room to stop, especially when it is moving fast. This is required because most Android devices do not update their position very frequently, and autopilot estimations of the speed and direction can be inaccurate.
-   Be ready to take manual RC control if something goes wrong when using follow me mode for the first time. The accuracy of positioning is dependent on the quality of the GPS used by the Android device. If the GPS is not accurate, this will be reflected in follow me.

## Getting started

You will need a USB OTG-capable Android device and two telemetry radios.

-   Connect a telemetry radio to your Android device and another to the vehicle (this allows positioning information to be relayed between the two radios).
-   Disable sleep-mode on your Android device
    -   This setting can usually be found under: **Settings \> Display**.
    -   It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals.
-   Fly the vehicle to a height of at least 2-3 metres.
    -   Set the vehicle on the ground, press the safety switch and step back at least 10 meters.
    -   Arm the vehicle and fly to a height of at least 2-3 meters
-   Switch into follow me mode.
    -   The copter will ascend to the minimum height required (default is 8 meters) and then pause for a moment to assess the radio link. If the link update rate is OK the copter will then yaw to face the user.

At this point you should be able to start moving and the copter should follow your movements.

The default settings for follow me mode are follow from behind the user at a distance of 8 meters, at a height 8 meters above the home/arming position. You can change this behaviour using the parameters described in the following section.


## Configuration

The follow-me behaviour can be configured using the following parameters:

-   **NAV_FT_DST:** Vehicle/ground station separation in the horizontal plane. Minimum distance is 1 meter. Default distance is 8 meters (about 26 ft).
-   **NAV_FT_MIN_HT: **Vehicle follow-me height relative to the home/arming position. Default and minimum height is 8 meters (about 26 ft).
-   **NAV_FT_FS:** Flight position relative to the user when follow-me mode is active.
    -   0 = Follow from the front right.
    -   1 = Follow from behind or trail the user (Default).
    -   2 = Follow from the front.
    -   3 = Follow from the front left.

## Known Issues

-   The SiK 915 Mhz radio is known to interfere with the GPS signal being received by an Android device. Be sure to keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.

## Verified Android Devices

Follow-me has been tested with the following devices:

-   Nexus 5
-   Nexus 7 Tablet

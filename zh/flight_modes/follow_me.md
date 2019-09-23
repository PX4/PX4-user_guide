---
author: Jimmy Johnson
---

# 跟随模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*跟随*模式允许多旋翼飞行器在运行*QGroundControl*的Android手机/平板电脑上自动跟踪和追踪用户。

By using GPS and other positioning information a multicopter is able to automatically yaw to face and follow a user at a specified position and distance. While in this mode no user input is required.

> **Note** * This mode requires GPS. * This mode is currently only supported on multicopter. * This mode only works when using an Android device as the control station.

{% youtube %} https://www.youtube.com/watch?v=RxDL4CtkzAQ {% endyoutube %}

<!-- Updated to Follow me 1.4 -->

## Safety Precautions

> **Warning** **Follow-me mode** does not implement any type of obstacle avoidance. Special care must be taken when this mode is used.

The following flight precautions should be observed. - Follow me mode should only be used in wide open areas that are unobstructed by trees, power lines, houses, etc. - Set the follow-me height to a value that is well above any surrounding obstructions - The **default** follow-me height is set to 8 metres (about 26 feet) relative to the home and arming position. - It is *safer* to manually fly to a safe height before engaging follow-me mode than to engage follow-me mode when landed (even though follow me mode does implement auto take off). - Give your vehicle a lot of room to stop, especially when it is moving fast. This is required because most Android devices do not update their position very frequently, and autopilot estimations of the speed and direction can be inaccurate. - Be ready to take manual RC control if something goes wrong when using follow me mode for the first time. The accuracy of positioning is dependent on the quality of the GPS used by the Android device. If the GPS is not accurate, this will be reflected in follow me.

## Getting Started

You will need a USB OTG-capable Android device and two telemetry radios. - Connect a telemetry radio to your Android device and another to the vehicle (this allows positioning information to be relayed between the two radios). - Disable sleep-mode on your Android device - This setting can usually be found under: **Settings \> Display**. - It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals. - Fly the vehicle to a height of at least 2-3 metres. - Set the vehicle on the ground, press the safety switch and step back at least 10 meters. - Arm the vehicle and fly to a height of at least 2-3 meters - Switch into follow me mode. - The copter will ascend to the minimum height required (default is 8 meters) and then pause for a moment to assess the radio link. If the link update rate is OK the copter will then yaw to face the user.

此时你应该能够开始移动并且多旋翼应该跟随你的动作。

跟随模式的默认设置是在用户后面8米处，在家庭/布防位置上方8米处跟随。 您可以使用以下部分中描述的参数更改此行为。

## 配置

可以使用以下参数配置跟随的行为：

- **NAV_FT_DST:** Vehicle/ground station separation in the horizontal plane. Minimum distance is 1 meter. Default distance is 8 meters (about 26 ft).
- **NAV_FT_MIN_HT:** Vehicle follow-me height relative to the home/arming position. Default and minimum height is 8 meters (about 26 ft).
- **NAV_FT_FS:** Flight position relative to the user when follow-me mode is active. 
  - 0 = Follow from the front right.
  - 1 = Follow from behind or trail the user (Default).
  - 2 = Follow from the front.
  - 3 = Follow from the front left.

## 已知的问题

- The SiK 915 Mhz radio is known to interfere with the GPS signal being received by an Android device. Be sure to keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.

## 已验证的Android设备

Follow-me has been tested with the following devices: - Nexus 5 - Nexus 7 Tablet
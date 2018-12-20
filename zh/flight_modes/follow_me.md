---
author: Jimmy Johnson
---
# 跟随模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*跟随*模式允许多旋翼飞行器在运行*QGroundControl*的Android手机/平板电脑上自动跟踪和追踪用户。

通过使用GPS和其他定位信息，多旋翼飞行器能够在指定的位置和距离处自动偏航以面向并跟随用户。在此模式下，无需用户输入。

> **注** *该模式需要使用GPS。 *该模式目前只支持多旋翼。 *该模式仅可在使用安卓设备作为控制站时使用。

{% youtube %} https://www.youtube.com/watch?v=RxDL4CtkzAQ {% endyoutube %}

<!-- Updated to Follow me 1.4 -->

## 安全须知

> **警告****跟随模式**不会实施任何类型的避障。使用此模式时必须特别小心。

应遵守以下飞行须知。

- 跟随模式应只用于不受树木、电线、房屋等阻挡的开阔区域。 
    - 将跟随高度设置为远高于任何周围障碍物的值
    - 对于家庭和布防位置，**默认**跟随高度设置为8米（约26英尺）。
- 在进入跟随模式之前手动飞到安全高度，比着陆时使用跟随模式（即使按照我模式执行自动起飞）*更安全*。
- 给你的飞机留足够的空间，特别是当它快速移动时。 这是必需的，因为大多数Android设备不会非常频繁地更新其位置，并且自动驾驶仪对速度和方向的估计可能是不准确的。
- 如果第一次使用跟随模式时，请做好手动遥控准备以应对问题发生。 定位的准确性取决于Android设备使用的GPS的质量。 如果GPS不准确，这将反映在跟随模式中。

## Getting started

You will need a USB OTG-capable Android device and two telemetry radios.

- Connect a telemetry radio to your Android device and another to the vehicle (this allows positioning information to be relayed between the two radios).
- Disable sleep-mode on your Android device 
    - This setting can usually be found under: **Settings \> Display**.
    - It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals.
- Fly the vehicle to a height of at least 2-3 metres. 
    - Set the vehicle on the ground, press the safety switch and step back at least 10 meters.
    - Arm the vehicle and fly to a height of at least 2-3 meters
- Switch into follow me mode. 
    - The copter will ascend to the minimum height required (default is 8 meters) and then pause for a moment to assess the radio link. If the link update rate is OK the copter will then yaw to face the user.

At this point you should be able to start moving and the copter should follow your movements.

The default settings for follow me mode are follow from behind the user at a distance of 8 meters, at a height 8 meters above the home/arming position. You can change this behaviour using the parameters described in the following section.

## Configuration

The follow-me behaviour can be configured using the following parameters:

- **NAV_FT_DST:** Vehicle/ground station separation in the horizontal plane. Minimum distance is 1 meter. Default distance is 8 meters (about 26 ft).
- **NAV_FT_MIN_HT: **Vehicle follow-me height relative to the home/arming position. Default and minimum height is 8 meters (about 26 ft).
- **NAV_FT_FS:** Flight position relative to the user when follow-me mode is active. 
    - 0 = Follow from the front right.
    - 1 = Follow from behind or trail the user (Default).
    - 2 = Follow from the front.
    - 3 = Follow from the front left.

## Known Issues

- The SiK 915 Mhz radio is known to interfere with the GPS signal being received by an Android device. Be sure to keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.

## Verified Android Devices

Follow-me has been tested with the following devices:

- Nexus 5
- Nexus 7 Tablet
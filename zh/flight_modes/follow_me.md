---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/follow_me
---

---
author: Jimmy Johnson
---

# 跟随模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Follow Me* mode allows a multicopter to autonomously follow and track another system that is broadcasting its position using the [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) MAVLink message.

无人机将自动偏航到朝向并跟随指定的[相对位置](#NAV_FT_FS)目标，目标的[水平间距](#NAV_FT_DST)和[高度](#NAV_MIN_FT_HT)是从起始位置上方。 默认情况下跟随是从距离目标后面 8 米， 距离起始 / 解锁位置以上 8 米高的位置开始。 在此模式下不需要用户输入。

:::tip
PX4 当前忽略目标的高度 / 从目标开始的高度，并与高于起始位置的恒定高度跟随。
这一限制是因为来自地面站 GPS 的高度源通常不准确。
:::

The mode is supported by *QGroundControl* on Android tablets that have a GPS module, and by the [MAVSDK](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_follow_me.html).

:::note
* This mode requires GPS.
* This mode is currently only supported on multicopter.
* The follow target must also be able to supply position information.
* *QGroundControl* only supports this mode on Android devices that have GPS. :::

@[youtube](https://youtu.be/RxDL4CtkzAQ)

## 安全须知

:::warning
**Follow-me mode** does not implement any type of obstacle avoidance. Special care must be taken when this mode is used. :::

The following flight precautions should be observed:
- Follow me mode should only be used in wide open areas that are unobstructed by trees, power lines, houses, etc.
  - Set the [follow-me height](#NAV_MIN_FT_HT) to a value that is well above any surrounding obstructions. By *default* this is 8 metres/26 feet above the home (arming) position.
- It is *safer* to manually fly to a safe height before engaging follow-me mode than to engage follow-me mode when landed (even though the mode implements auto take off).
- Give your vehicle sufficient room to stop, especially when it is moving fast. 许多安卓设备不会非常频繁的更新其位置，并且自驾仪对速度和方向的估计可能是不准确的。
- Be ready to take manual RC control if something goes wrong when using follow me mode for the first time. 定位的准确性取决于目标系统使用的 GPS 的质量。 如果 GPS 不准确，这将反映在跟随模式中。

## 配合QGroundControl使用跟随模式

*Follow Me* mode is supported by *QGroundControl* on ground station hardware that has a GPS module. 推荐的配置是一个能使用 USB OTG 的安卓设备，配备两个数传。

To setup *Follow Me* mode:
- Connect a telemetry radio to your Android device and another to the vehicle (this allows positioning information to be relayed between the two radios).
- Disable sleep-mode on your Android device:
  - This setting can usually be found under: **Settings \> Display**.
  - It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals.
- Takeoff to a height of at least 2-3 metres (recommended even though auto-takeoff is supported).
  - Set the vehicle on the ground, press the safety switch and step back at least 10 meters.
  - Arm the vehicle and takeoff.
- Switch into follow me mode.
  - The copter will ascend to the specified [minimum height](#NAV_MIN_FT_HT) and then pause for a moment to assess the radio link. 如果链路更新速率正常， 多旋翼无人机将偏航到朝向目标。

此时应该可以移动了，并且无人机会跟随你的移动。

The mode has been tested on the following Android devices:
- Nexus 5
- Nexus 7 Tablet


## 配置

可以使用以下参数配置跟随的行为：

| 参数                                                                                                         | 描述                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_FT_DST"></span>[NAV_FT_DST](../advanced_config/parameter_reference.md#NAV_FT_DST)          | Vehicle/ground station separation in the *horizontal* (x,y) plane. Minimum allowed separation is 1 meter. Default distance is 8 meters (about 26 ft).                           |
| <span id="NAV_MIN_FT_HT"></span>[NAV_MIN_FT_HT](../advanced_config/parameter_reference.md#NAV_MIN_FT_HT) | Vehicle follow-me height. Note that this height is fixed *relative to the home/arming position* (not the target vehicle). Default and minimum height is 8 meters (about 26 ft). |
| <span id="NAV_FT_FS"></span>[NAV_FT_FS](../advanced_config/parameter_reference.md#NAV_FT_FS)             | 当跟随模式处于激活状态，相对于用户的飞行位置。<br>- `0` = 从右前方跟随。<br>- `1` = 从用户后方或者尾部跟随（默认）。<br>- `2` = 从正前方跟随。<br>- `3` = 从左前方跟随。                                            |


## 已知的问题

- 已知 SiK 915 Mhz [数传](../telemetry/sik_radio.md) 会干扰某些安卓设备的 GPS 信号接收。 保持数传和安卓设备之间尽可能远的距离，避免使用跟随模式时受到干扰。

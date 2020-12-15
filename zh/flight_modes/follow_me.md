---
author: Jimmy Johnson
---

# 跟随模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*跟随*模式允许多旋翼无人机自主跟随并跟踪使用[FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) MAVLink消息广播其位置的另一个系统。

无人机将自动偏航到朝向并跟随指定的[相对位置](#NAV_FT_FS)目标，目标的[水平间距](#NAV_FT_DST)和[高度](#NAV_MIN_FT_HT)是从起始位置上方。 默认情况下跟随是从距离目标后面 8 米， 距离起始 / 解锁位置以上 8 米高的位置开始。 在此模式下不需要用户输入。

:::tip
PX4 当前忽略目标的高度 / 从目标开始的高度，并与高于起始位置的恒定高度跟随。 这一限制是因为来自地面站 GPS 的高度源通常不准确。
:::

该模式支持具有 GPS 模块的 安卓平板上的 *QGroundControl* 和 [MAVSDK](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_follow_me.html)。

:::note
* 该模式需要 GPS。 * 该模式目前仅支持多旋翼。 * 跟随的目标必须能够提供位置信息。 * *QGroundControl* 仅在有 GPS 的安卓设备上支持该模式。
:::

{% youtube %} https://www.youtube.com/watch?v=RxDL4CtkzAQ {% endyoutube %}

## 安全须知

:::warning
**跟随模式**没有实现任何类型的避障功能，使用此模式是必须格外小心。
:::

应遵守以下飞行预防措施： - 跟随模式只能再不受树木，电线，房屋等遮挡的广阔区域中使用。 - 将 [跟随高度](#NAV_MIN_FT_HT) 设置为远高于周围障碍物的值。 *默认*这个值是高于起始（解锁）位置 8 米 / 26 英尺。 - 在进入跟随我模式之前，手动飞到安全高度比降落时进入跟随我模式更安全（即使该模式实现了自动起飞）。 - 给无人机留足够的空间来停止，尤其是在快速移动是。 许多安卓设备不会非常频繁的更新其位置，并且自驾仪对速度和方向的估计可能是不准确的。 如果第一次使用跟随模式时发生问题，随时准备手动遥控。 定位的准确性取决于目标系统使用的 GPS 的质量。 如果 GPS 不准确，这将反映在跟随模式中。

## 配合QGroundControl使用跟随模式

*QGroundControl* 在拥有 GPS 模块的地面站硬件上支持*跟随*模式。 推荐的配置是一个能使用 USB OTG 的安卓设备，配备两个数传。

配置 *跟随* 模式： - 将一个数传连接到安卓设备，另外一个连接到无人机（这使得位置信息可以在两个数传之间中继）。 - 禁用安卓设备的休眠模式： - 这个设置通常可以在 **设置 \> 显示** 中找到。 将安卓设备设置为不进入睡眠状态非常重要，因为这可能导致 GPS 信号停止定期发射。 - 起飞到至少 2-3 米的高度（及时支持自动起飞也建议使用）。 - 将飞机放在地面上，按下安全开关并向后退至少 10 米。 - 解锁并起飞。 - 切换到跟随模式。 - The copter will ascend to the specified [minimum height](#NAV_MIN_FT_HT) and then pause for a moment to assess the radio link. If the link update rate is OK the multicopter will then yaw to face the target.

At this point you should be able to start moving and the copter should follow your movements.

The mode has been tested on the following Android devices: - Nexus 5 - Nexus 7 Tablet

## 配置

The follow-me behaviour can be configured using the following parameters:

| 参数                                                                                                  | 描述                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_FT_DST"></span>[NAV_FT_DST](../advanced_config/parameter_reference.md#NAV_FT_DST)       | Vehicle/ground station separation in the *horizontal* (x,y) plane. Minimum allowed separation is 1 meter. Default distance is 8 meters (about 26 ft).                                                                                       |
| <span id="NAV_MIN_FT_HT"></span>[NAV_MIN_FT_HT](../advanced_config/parameter_reference.md#NAV_MIN_FT_HT) | Vehicle follow-me height. Note that this height is fixed *relative to the home/arming position* (not the target vehicle). Default and minimum height is 8 meters (about 26 ft).                                                             |
| <span id="NAV_FT_FS"></span>[NAV_FT_FS](../advanced_config/parameter_reference.md#NAV_FT_FS)         | Flight position relative to the user when follow-me mode is active.  
- `0` = Follow from the front right.  
- `1` = Follow from behind or trail the user (Default).  
- `2` = Follow from the front.  
- `3` = Follow from the front left. |

## 已知的问题

- The SiK 915 Mhz [telemetry radio](../telemetry/sik_radio.md) is known to interfere with the GPS signal being received by some Android devices. Keep the radio and Android device as far apart as possible when using the follow target mode to avoid interference.
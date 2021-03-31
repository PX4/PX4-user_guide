---
author: Jimmy Johnson
---

# 추적 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*추적* 모드를 사용하면 멀티콥터가 MAVLINK message [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET)을 사용하여 위치를 전송하는 대상을 자율적으로 추적할 수 있습니다.

기체는 지정된 [상대 위치](#NAV_FT_FS), [수평 분리](#NAV_FT_DST) 및 홈 [ 높이 ](#NAV_MIN_FT_HT)에서 목표를 자동으로 추적합니다. 기본적으로 8 미터 거리와 홈/시동 위치에서 8 미터 높이에서 타겟 바로 뒤에서 따라갑니다. 이 모드에서는 사용자 입력이 필요하지 않습니다.

:::tip PX4는 현재 타겟의 고도를 무시하고 홈 위의 일정한 고도를 유지합니다. 이 제한은 지상국 GPS의 고도 소스가 종종 부정확하기 때문입니다.
:::

이 모드는 GPS 모듈이있는 Android 태블릿의 *QGroundControl* 및 <a href = "https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_follow_me.html">MAVSDK</a>에서 지원됩니다.

:::note
* 이 모드는 GPS가 필요합니다. *이 모드는 현재 멀티콥터에서만 지원됩니다. * 추적 대상은 위치 정보를 제공할 수 있어야 합니다. * *QGroundControl*은 GPS가있는 Android 기기에서만 이 모드를 지원합니다.
:::

@[유투브](https://youtu.be/RxDL4CtkzAQ)

## 안전 주의 사항

:::warning
**추적 모드**는 장애물 회피 유형을 지원하지 않습니다. 이 모드를 사용시에는 특별한 주의가 필요합니다.
:::

다음의 비행주의 사항을 준수하여야 합니다. - 추적 모드는 나무, 전선, 집 등에 의해 방해받지 않는 넓고 열린 공간에서만 사용하여야 합니다. -[추적 높이](#NAV_MIN_FT_HT)를 주위 장애물보다 훨씬 높은 값으로 설정합니다. *기본값*은 홈 (시동) 위치에서 8 미터 위 입니다. - 모드가 자동 이륙을 구현하더라도 착륙시 추적 모드로 전환하는 것보다 추적 모드를 시작하기 전에 수동으로 안전한 높이로 비행하는 것이 *안전*합니다. - Give your vehicle sufficient room to stop, especially when it is moving fast. Many Android devices do not update their position very frequently, and autopilot estimations of the speed and direction can be inaccurate. - Be ready to take manual RC control if something goes wrong when using follow me mode for the first time. The accuracy of positioning is dependent on the quality of the GPS used by target system. If the GPS is not accurate, this will be reflected in follow me.

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
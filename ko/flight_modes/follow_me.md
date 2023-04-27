---
author: Jimmy Johnson and Junwoo Hwang
---

# 추적 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Follow Me* mode allows a multicopter to autonomously hold position and altitude relative to another system that is broadcasting its position (and optionally velocity) using the [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) MAVLink message.

![Follow-me Concept](../../assets/flight_modes/followme_concept.png)

The vehicle will automatically yaw to face and follow the target from a specified [relative angle](#FLW_TGT_FA), [distance](#FLW_TGT_DST) and [height](#FLW_TGT_HT) and altitude, depending on the [altitude control mode](#FLW_TGT_ALT_M).

By default it will follow from directly behind the target at a distance of 8 meters, and a height of 8 meters above the home (arming) position.

Users can adjust the follow angle, height and distance using an RC controller as shown above:

- _Follow Height_ is controlled with the `up-down` input ("Throttle"). Center the stick to keep follow the target at a constant hight. Raise or lower the stick to adjust height.
- _Follow Distance_ is controlled with the `forward-back` input ("Pitch"). Pushing the stick forward increases the follow distance, pulling it back decreases the distance.
- _Follow Angle_ is controlled with the `left-right` input ("Roll"). The movement is from the user's perspective, so if you face the drone and move the stick left, it will move to your left. From above if you move the stick left the drone will move counter-clockwise.

  Follow Angle is defined as increasing in clockwise direction relative to the target's heading (which is 0 degrees)

  ![Follow-me Angle Diagram](../../assets/flight_modes/followme_angle.png)


:::note
Angle, height, and distance values set using the RC controller are discarded when you exit follow-me mode.
If you exit Follow-Me mode and activate it again the values will be reset to their defaults.
:::


Demo video:

@[youtube](https://youtu.be/csuMtU6seXI?t=155)


## How to Use Follow Me

Follow-me mode is supported by *QGroundControl* on Android devices with a GPS module, and [MAVSDK](#follow-me-with-mavsdk).

:::note
* 이 모드는 GPS가 필요합니다.
* *이 모드는 현재 멀티콥터에서만 지원됩니다.</li>
* The follow target must also be able to supply position information.
* * *QGroundControl</em>은 GPS가있는 Android 기기에서만 이 모드를 지원합니다. :::</ul>

### 안전 주의 사항

:::warning
**추적 모드**는 장애물 회피 유형을 지원하지 않습니다. 이 모드를 사용시에는 특별한 주의가 필요합니다. :::

The following flight precautions should be observed:
- Follow me mode should only be used in wide open areas that are unobstructed by trees, power lines, houses, etc.
  - Set the [follow-me height](#FLW_TGT_HT) to a value that is well above any surrounding obstructions. By *default* this is 8 metres above the home (arming) position.
- - 모드가 자동 이륙을 구현하더라도 착륙시 추적 모드로 전환하는 것보다 추적 모드를 시작하기 전에 수동으로 안전한 높이로 비행하는 것이 *안전*합니다.
- Give your vehicle sufficient room to stop, especially when it is moving fast.
- Be ready to switch back to Position mode if something goes wrong, in particular when using follow-me mode for the first time.
- You can't switch follow-me mode off using RC stick movements (as that will adjust the properties). You either need to have a GroundStation that can send flight mode switch signals or a flight mode switch configured in your RC transmitter.

### Follow-Me with QGroundControl

![Follow-me QGC Example](../../assets/flight_modes/followme_qgc_example.jpg)

*Follow Me* mode is supported using *QGroundControl* as a target on ground station hardware that has a GPS module. 권장 구성은 텔레메트리를 사용하는 USB OTG 지원 Android 장치입니다.

To setup *Follow Me* mode:
- Connect a telemetry radio to your ground station device and another to the vehicle (this allows positioning information to be relayed between the two radios).
- Disable sleep-mode on your Android device:
  - This setting can usually be found under: **Settings > Display**.
  - It is important that you set your Android device to not go to sleep as this could cause the GPS signal to cease being emitted at regular intervals.
- Takeoff to a height of at least 2-3 metres (recommended even though auto-takeoff is supported).
  - Set the vehicle on the ground, press the safety switch and step back at least 10 meters.
  - Arm the vehicle and takeoff.
- Switch into follow-me mode.
  - The copter will first ascend to minimum safety altitude of 1 meters above the ground or home, depending on the presence of a distance sensor.
  - It will ascend until it is 3 meters within the [follow height](#FLW_TGT_HT) to avoid potential collisions before moving horizontally.
  - Copter will always adjust it's heading to face the target

At this point you can start moving, and the drone will be following you.

이 모드는 다음 Android 장치에서 테스트되었습니다.
- Galaxy S10
- - 넥서스 5 - Nexus 7 태블릿

### Follow-me with MAVSDK

[MAVSDK](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_follow_me.html) supports [Follow Me](https://mavsdk.mavlink.io/main/en/cpp/guide/follow_me.html), allowing you to create a drone app that is a follow-me target.

For more information see the [Follow Me class](https://mavsdk.mavlink.io/main/en/cpp/guide/follow_me.html) documentation as well as the [Follow Me Example](https://mavsdk.mavlink.io/main/en/cpp/examples/follow_me.html).

:::note MAVSDK
is not currently recommended, due to a bug ([MAVSDK#1756](https://github.com/mavlink/MAVSDK/issues/1756) where the same message is occasionally sent twice. This can confuse the target position and velocity estimator. :::

## 설정

### Altitude Control Mode

![Follow Me Altitude Modes](../../assets/flight_modes/followme_altitude_modes.png)

The altitude control mode determine whether the vehicle altitude is relative to the home position, terrain height, or the altitude reported by the follow target.

- `2D tracking` (the default [altitude mode](#FLW_TGT_ALT_M)) makes the drone follow at a height relative to the fixed home position (takeoff altitude). The relative distance to the drone to the target will change as you ascend and descend (use with care in hilly terrain).

- `2D + Terrain` makes the drone follow at a fixed height relative to the terrain underneath it, using information from a distance sensor.

  - If the vehicle does not have a distance sensor following will be identical to `2D tracking`.
  - Distance sensors aren't always accurate and vehicles may be "jumpy" when flying in this mode.
  - Note that that height is relative to the ground underneath the vehicle, not the follow target. The drone may not follow altitude changes of the target!

-  `3D tracking` mode makes the drone follow at a height relative to the follow target, as supplied by its GPS sensor. This adapts to target altitude changes, such as when you walk up a hill.

:::warning
Do not set the **Altitude mode ([FLW_TGT_ALT_M](#FLW_TGT_ALT_M)**) to `3D Tracking` when using QGC for Android (or more generally, without checking that [FOLLOW_TARGET.altitude](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) is an AMSL value).

  The MAVLink [FOLLOW_TARGET](https://mavlink.io/en/messages/common.html#FOLLOW_TARGET) message definition expects an altitude relative to mean sea level (AMSL) while QGC on Android is sending an altitude relative to the GPS ellipsoid. This can differ as much as 200 meters!

  The drone probably won't crash due to the built-in minimum safety altitude limit (1 meter), but it may fly much higher than expected. If the drone's altitude is significantly different than specified, assume that the ground station's altitude output is wrong and use 2D tracking. :::

### Parameters

The follow-me behavior can be configured using the following parameters:

| 매개변수                                                                                                    | 설명                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="FLW_TGT_HT"></a>[FLW_TGT_HT](../advanced_config/parameter_reference.md#FLW_TGT_HT)           | Vehicle follow-me height, in metres. 이 높이는 *홈/시동 위치를 기준으로* 고정되어 있습니다 (대상 기체 아님). Default and minimum height is 8 meters (about 26 ft)                                                                                                                                                                                                                                  |
| <a id="FLW_TGT_DST"></a>[FLW_TGT_DST](../advanced_config/parameter_reference.md#FLW_TGT_DST)         | Vehicle/ground station separation in the *horizontal* (x,y) plane, in metres. 최소 허용 간격은 1 미터입니다. 기본 거리는 8 미터 (약 26 피트)입니다.                                                                                                                                                                                                                                             |
| <a id="FLW_TGT_FA"></a>[FLW_TGT_FA](../advanced_config/parameter_reference.md#FLW_TGT_FA)           | Follow angle relative to the target's heading, in degrees. If a value out of the range [`-180.0`, `+180.0`] is entered, it will get automatically wrapped and applied (e.g. `480.0` will be converted to `120.0`)                                                                                                                                                      |
| <a id="FLW_TGT_ALT_M"></a>[FLW_TGT_ALT_M](../advanced_config/parameter_reference.md#FLW_TGT_ALT_M)     | Altitude control mode. <br>- `0` = 2D Tracking (Altitude Fixed) <br>- `1` = 2D Tracking + Terrain Following <br>- `2` = 3D Tracking of the target's GPS altitude **WARNING: [DO NOT USE WITH QGC for Android](#altitude-control-mode)**.                                                                                                             |
| <a id="FLW_TGT_MAX_VEL"></a>[FLW_TGT_MAX_VEL](../advanced_config/parameter_reference.md#FLW_TGT_MAX_VEL) | Maximum relative velocity for orbital motion around the target, in m/s.<br>- 10 m/s has proven to be a sweet spot for aggressiveness vs smoothness.<br>- Setting it to higher value means the orbit trajectory around the target will move faster, but if the drone is physically not capable of achieving that speed, it leads to an aggressive behavior. |
| <a id="FLW_TGT_RS"></a>[FLW_TGT_RS](../advanced_config/parameter_reference.md#FLW_TGT_RS)           | Dynamic filtering algorithm responsiveness that filters incoming target location.<br>- `0.0` = Very sensitive to movements and noisy estimates of position, velocity and acceleration.<br>- `1.0` = Very stable but not responsive filter                                                                                                                  |


### Tips and tricks


1. Set the [follow distance](#FLW_TGT_DST) to more than 12 meters (8 meters is a "recommended minimum").

   There is an inherent position bias (3 ~ 5 meters) between the target and the drone's GPS sensor, which makes the drone follow a 'ghost target' somewhere near the actual target. This is more obvious when the follow distance is very small. We recommend that the follow distance is set to be large enough such that the GPS bias is not significant.

2. The speed at which you can change the follow angle depends on the [maximum tangential velocity](#FLW_TGT_MAX_VEL) setting.

   Experimentation shows that values between `5 m/s` are `10 m/s` are usually suitable.

3. Using the RC Adjustment for height, distance and angle, you can get some creative camera shots.


   @[youtube](https://www.youtube.com/watch?v=o3DhvCL_M1E) This video demonstrates a Google-Earth view perspective, by adjusting the height to around 50 meters (high), distance to 1 meter (close). Which allows a perspective as shot from a satellite.

## 알려진 이슈들

- SiK 915 Mhz [텔레메트리](../telemetry/sik_radio.md)는 일부 Android 기기에서 수신하는 GPS 신호를 방해하는 것으로 알려져 있습니다. 간섭을 피하기 위해 추적 대상 모드를 사용할 때 텔레메트리와 Android 장치를 가능한 멀리 두십시오.
- QGC for Android reports an incorrect altitude (altitude above elipsoid rather than AMSL). The follow altitude can be off by up to 200m! 
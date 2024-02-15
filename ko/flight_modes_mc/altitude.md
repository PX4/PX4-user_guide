# 고도 모드 (멀티콥터)

<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />&nbsp;<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />&nbsp;<img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계)" width="30px" />

_Altitude mode_ is a _relatively_ easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will level and maintain the current _altitude_. 수평면에서 이동하는 경우 차량은 바람 저항에 의해 모멘텀이 소실 될 때까지 계속됩니다. 바람이 불면 기체는 바람의 방향으로 표류합니다.

:::tip
_Altitude mode_ is the safest non-GPS manual mode for new fliers. [수동 / 안정화](../flight_modes/manual_stabilized_mc.md) 모드와 비슷하지만 스틱을 놓으면 기체의 고도가 계속 유지됩니다.
:::

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 ([모드 2 송신기](../getting_started/rc_transmitter_receiver.md#transmitter_modes)의 경우).

![고도 제어 MC-Mode2 RC 컨트롤러](../../assets/flight_modes/altitude_mc.png)

## 기술 요약

RC/manual mode like [Manual/Stabilized (MC)](../flight_modes_mc/manual_stabilized.md) mode but with _altitude stabilization_ (centered sticks level vehicle and hold it to fixed altitude). The horizontal position of the vehicle can move due to wind (or pre-existing momentum).

- 중앙 스틱 (데드밴드 내부) :
  - RPY sticks levels vehicle.
  - 스로틀(~ 50 %)은 현재 고도를 바람에 대해 일정하게 유지합니다.
- 센터  외부:
  - 롤/피치 스틱은 각각의 방향에서 틸트 각도를 제어하여 해당하는 좌우와 전후 방향으로 이동합니다.
  - 스로틀 스틱은 미리 정해진 최대 속도 (및 다른 축의 이동 속도)로 속도를 올리거나 내립니다.
  - 요 스틱은 수평면 위의  회전 각속도를 제어합니다.
- 이륙:
  - 착륙했을 때 스로틀 스틱을 62.5 % (하단에서 전체 범위) 이상으로 올리면 기체가 이륙합니다.
- Altitude is normally measured using a barometer, which may become inaccurate in extreme weather conditions. LIDAR/거리 센서가 장착된 기체는 높은 정확도로 고도를 제어할 수 있습니다.
- Manual control input is required (such as RC control, joystick).
  - Roll, Pitch: Assistance from autopilot to stabilize the attitude. Position of RC stick maps to the orientation of vehicle.
  - Throttle: Assistance from autopilot to hold position against wind.
  - Yaw: Assistance from autopilot to stabilize the attitude rate. Position of RC stick maps to the rate of rotation of vehicle in that orientation.

## 매개 변수

이 모드는 아래의 매개 변수의 영향을받습니다.

| 매개 변수                                                                                                       | 설명                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_Z_VEL_MAX_UP"></a>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 최대 수직 상승 속도. 기본값: 3 m/s.                                                                                                                                                                                                                                  |
| <a id="MPC_Z_VEL_MAX_DN"></a>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 최대 수직 하강 속도. 기본값: 1 m/s.                                                                                                                                                                                                                                  |
| <a id="RCX_DZ"></a>`RCX_DZ`                                                                           | 채널 X의 RC 데드 존. 스로틀에 대한 X 값은 [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE) 값에 따라 달라집니다. For example, if the throttle is channel 4 then [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ) specifies the deadzone. |
| <a id="MPC_xxx"></a>`MPC_XXXX`                                                                         | 대부분의 MPC_xxx 매개 변수는이 모드에서 비행 동작에 어느정도 영향을 미칩니다 . 예를 들어, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)는 기체의 호버링 추력을 정의합니다.                                                                                                    |

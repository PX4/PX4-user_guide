# 수동/안정화 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*수동/안정화*모드는 RC 조종 스틱이 중앙에 있을 때 멀티콥터를 안정화합니다. 기체를 수동으로 움직이거나 조종하려면 스틱을 중앙의 바깥쪽으로 제어합니다.

:::note
이 멀티콥터 모드는 *수동* 또는 *안정화* 모드를 설정하여 활성화됩니다.
:::

수동 제어에서 롤과 피치 스틱이 각 축을 중심으로 기체의 자세를 * 각도*로 제어하닙니다. 요 스틱은 수평면 위의 회전 속도를 제어하고 스로틀은 고도/속도를 제어합니다 .

조종 스틱을 놓으면 중앙 데드 존으로 돌아갑니다. 롤 포크와 피치 스틱이 중앙에 오면 멀티 피터가 수평을 유지하고 정지합니다. 기체는 적절하게 균형을 잡고, 스로틀이 적절하게 설정되고([아래 참조](#params)), 외력이 가해지지 않으면 (예 : 바람), 고도에 유지되거나 유지됩니다. 기체는는 바람 방향으로 표류하게 되며, 고도를 유지하기 위해서는 스로틀을 제어하여야 합니다.

![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)

## 기술적 설명

조종사의 입력은 롤 및 피치 각 명령과 요 율 명령으로 전달됩니다. 스로틀은 크기가 조정되고 ([아래](#params) 참조) 출력 믹서로 직접 전달됩니다. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered inside the controller deadzone (consequently leveling-out the attitude). The autopilot does not compensate for drift due to wind (or other sources).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
:::

<span id="params"></span>

## Parameters

| Parameter                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_THR_HOVER"></span>[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) | Hover throttle that is output when the throttle stick is centered and `MPC_THR_CURVE` is set to default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <span id="MPC_THR_CURVE"></span>[MPC_THR_CURVE](../advanced_config/parameter_reference.md#MPC_THR_CURVE) | Defines the throttle scaling. By default this is set to **Rescale to hover thrust**, which means that when the throttle stick is centered the configured hover throttle is output (`MPC_THR_HOVER`) and the stick input is linearly rescaled below and above that (allowing for a smooth transition between Stabilized and Altitude/Position control).   
On powerful vehicles the hover throttle might be very low (e.g. below 20%) so that rescaling distorts the throttle input - i.e. here 80% of the thrust would be controlled by just the top half of the stick input and 20% by the bottom. If needed `MPC_THR_CURVE` can be set to **No Rescale** so that there is no rescaling (stick input to throttle mapping is independent of `MPC_THR_HOVER`). |
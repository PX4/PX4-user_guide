# 수동 / 안정 모드 (멀티 태스킹)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

* Manual / Stabilized </ 0> 모드는 RC 컨트롤 스틱이 중앙에있을 때 멀티탭을 안정시킵니다. 기체를 수동으로 움직이거나 조종하려면 스틱을 중앙의 바깥쪽으로 움직입니다.</p> 

> ** 참고 </ 0>이 다중 모드는 * 수동 </ 1> 또는 * 안정화 </ 1> 모드를 설정하면 활성화됩니다.</p> </blockquote> 
> 
> 수동 제어에서 롤과 피치 스틱이 각 축을 중심으로 기체 (자세)을 * 각도로 제어하면 요 스틱이 수평면 위의 회전 속도를 제어하고 스로틀은 고도 / 속도를 제어합니다 .</p> 
> 
> As soon as you release the control sticks they will return to the center deadzone. 롤 포크와 피치 스틱이 중앙에 오면 멀티 피터가 수평을 유지하고 정지합니다. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately (see [below](#params)), and no external forces are applied (e.g. wind). 항공기는 바람의 방향으로 표류하고 고도를 유지하기 위해 스로틀을 제어해야합니다.
> 
> ![MC 수동 비행](../../assets/flight_modes/manual_stabilized_MC.png)
> 
> ## Technical Description
> 
> 조종사의 입력은 롤 및 피치 각 명령과 요 율 명령으로 전달됩니다. Throttle is rescaled (see [below](#params)) and passed directly to the output mixer. 자동 조종 장치는 자세를 제어합니다. 즉, RC 스틱이 컨트롤러 데드 존 내부에 집중 될 때 롤과 피치 각을 제로로 조절합니다 (결과적으로 태도가 수평이 됨). 자동 조종 장치는 바람 (또는 다른 원인)으로 인한 드리프트를 보상하지 않습니다.
> 
> > **Note** * Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
> 
> ## Parameters {#params}
> 
> | Parameter                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
> | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | <span id="MPC_THR_HOVER"></span>[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) | Hover throttle that is output when the throttle stick is centered and `MPC_THR_CURVE` is set to default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
> | <span id="MPC_THR_CURVE"></span>[MPC_THR_CURVE](../advanced_config/parameter_reference.md#MPC_THR_CURVE) | Defines the throttle scaling. By default this is set to **Rescale to hover thrust**, which means that when the throttle stick is centered the configured hover throttle is output (`MPC_THR_HOVER`) and the stick input is linearly rescaled below and above that (allowing for a smooth transition between Stabilized and Altitude/Position control).   
> On powerful vehicles the hover throttle might be very low (e.g. below 20%) so that rescaling distorts the throttle input - i.e. here 80% of the thrust would be controlled by just the top half of the stick input and 20% by the bottom. If needed `MPC_THR_CURVE` can be set to **No Rescale** so that there is no rescaling (stick input to throttle mapping is independent of `MPC_THR_HOVER`). |
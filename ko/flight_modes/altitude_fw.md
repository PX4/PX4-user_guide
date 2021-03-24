# 고도 모드(고정익)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" />](../getting_started/flight_modes.md#altitude_only)

*고도* 비행모드는 사용자가 기체의 고도를 제어하거나 특정 고도를 유지하는것을 용이하게 합니다. 이 모드 하에서 바람이 있을 때 기체는 방향을 유지하지 않습니다.

기체의 상승/하강률을 피치/엘리베이터 스틱을 이용하여 제어할 수 있습니다. 일단 중앙에 위치하면 자동조종장치가 현재 고도에 고정되고 요/롤 및 모든 대기 속도에서 이 고도를 유지합니다.

스로틀 입력은 대기 속도를 제어합니다. 롤과 피치는 각도로 제어됩니다 (따라서 차량을 롤오버하거나 루프할 수 없습니다).

모든 원격 제어 입력이 중앙에 있을 때 (롤, 피치, 요 및 ~ 50 % 스로틀 없음) 기체는 직선, 수평 비행 (바람에 따라)으로 돌아가 현재 고도를 유지합니다.

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 ([모드 2 송신기](../getting_started/rc_transmitter_receiver.md#transmitter_modes)의 경우).

![Altitude Control FW](../../assets/flight_modes/altitude_control_mode_fw.png)

## 기술 요약

RC/manual mode like Stabilized mode but with altitude stabilization (centered sticks put vehicle into straight and level flight and maintain current altitude). The vehicle course is not maintained, and can drift due to wind.

* Centered Roll/Pitch/Yaw inputs (inside deadband): 
  * Autopilot levels vehicle/wings and maintains altitude.
  * Throttle stick controls the airspeed of the aircraft if an airspeed sensor is connected. Without an airspeed sensor the user cannot control throttle (in which case the vehicle will fly level at cruise throttle ([FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE)), increasing or decreasing throttle as needed to climb or descend).
* Outside center: 
  * Pitch stick controls altitude.
  * Throttle stick controls the airspeed of the aircraft (as for centered Roll/Pitch/Yaw inputs).
  * Roll stick controls roll angle. Autopilot will maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight). This is same as in [Stabilized mode](../flight_modes/stabilized_fw.md).
  * Yaw stick actuates the rudder (signal will be added to the one calculated by the autopilot to maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight)). This is same as in [Stabilized mode](../flight_modes/stabilized_fw.md).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
* The altitude is normally measured using a barometer, which may become inaccurate in extreme weather conditions. Vehicles that include a LIDAR/range sensor will be able to control altitude with greater reliability and accuracy.
:::

## Parameters

The mode is affected by the following parameters:<span id="FW_MAN_P_MAX"><a href="../advanced_config/parameter_reference.md#FW_MAN_P_MAX">FW_MAN_P_MAX</a></td> 

<td>
  Max pitch for manual control in attitude stabilized mode. Default: 45 degrees.
</td></tr> 

<tr>
  <td>
    <span id="FW_MAN_R_MAX"><a href="../advanced_config/parameter_reference.md#FW_MAN_R_MAX">FW_MAN_R_MAX</a></td> 
    
    <td>
      Max roll for manual control in attitude stabilized mode. Default: 45 degrees.
    </td></tr> 
    
    <tr>
      <td>
        <span id="FW_L1_CONTROL"><a href="../advanced_config/parameter_reference.md#fw-l1-control">FW L1 Control</a></td> 
        
        <td>
          The roll/yaw needed to maintain the commanded altitude and airspeed are also affected by the FW L1 Control parameters.
        </td></tr> </tbody> </table> 
        
        <!-- 
FW notes: 
FW position controller is basically 2 independent pieces

* L1 is for navigation - determines the roll and yaw needed to achieve the desired waypoint (or loiter)
* TECS is for speed and height control - determines throttle and elevator position needed to achieve the commanded altitude and airspeed
Overall that gives you an attitude setpoint (roll, pitch, yaw) and throttle which is sent off to the attitude controller
-->
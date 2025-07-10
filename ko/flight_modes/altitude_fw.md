---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/altitude_fw
---

# 고도 모드(고정익)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계)" width="30px" />](../getting_started/flight_modes.md#altitude_only)

*고도* 비행모드는 사용자가 기체의 고도를 제어하거나 특정 고도를 유지하는것을 용이하게 합니다. 이 모드 하에서 바람이 있을 때 기체는 방향을 유지하지 않습니다.

기체의 상승/하강률을 피치/엘리베이터 스틱을 이용하여 제어할 수 있습니다. 일단 중앙에 위치하면 자동조종장치가 현재 고도에 고정되고 요/롤 및 모든 대기 속도에서 이 고도를 유지합니다.

스로틀 입력은 대기 속도를 제어합니다.  롤과 피치는 각도로 제어됩니다 (따라서 차량을 롤오버하거나 루프할 수 없습니다).

모든 원격 제어 입력이 중앙에 있을 때 (롤, 피치, 요 및 ~ 50 % 스로틀 없음) 기체는 직선, 수평 비행 (바람에 따라)으로 돌아가 현재 고도를 유지합니다.

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 ([모드 2 송신기](../getting_started/rc_transmitter_receiver.md#transmitter_modes)의 경우).

![고정익 고도 제어](../../assets/flight_modes/altitude_control_mode_fw.png)

## 기술 요약

RC 수동 모드는 안정화 모드와 같지만 고도 안정화를 사용합니다 (중앙 스틱은 차량을 직선 및 수평 비행 상태로 만들고 현재 고도를 유지합니다). 기체의 경로가 유지되지 않고 바람에 표류할 수 있습니다.

* 중앙 롤/피치/요 입력 (데드 밴드 내부) :
  * 자동조종장치는 기체/날개를 수평으로 유지하고 고도를 유지합니다.
  * 스로틀 스틱은 대기 속도 센서가 연결된 경우 기체의 대기 속도를 제어합니다. 대기 속도 센서가 없으면 사용자는 스로틀을 제어할 수 없습니다 (이 경우 기체는 크루즈 스로틀 ([FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE))에서 수평으로 날아 오르거나 내리는 데 필요한만큼 스로틀을 높이거나 낮춥니 다).
* 센터  외부:
  * 피치 스틱은 고도를 제어합니다.
  * 스로틀 스틱은 기체의 대기 속도를 제어합니다 (중앙 롤/피치/요 입력의 경우).
  * 롤 스틱은 롤 각도를 제어합니다. 자동 조종 장치는 [조정 비행](https://en.wikipedia.org/wiki/Coordinated_flight)을 유지합니다. 이것은 [안정화 모드](../flight_modes/stabilized_fw.md)와 동일합니다.
  * 요 스틱은 방향타를 작동합니다 ([조정 비행](https://en.wikipedia.org/wiki/Coordinated_flight)을 유지하기 위해 자동 조종 장치에 의해 계산된 신호에 신호가 추가됩니다). 이것은 [안정화 모드](../flight_modes/stabilized_fw.md)와 동일합니다.

:::note
* 수동 입력이 필요합니다 (RC 컨트롤러 또는 MAVLink를 통한 게임 패드/엄지 스틱).
* 고도는 일반적으로 기압계로 측정되며 극단적인 기상 조건에서는 정확하지 않을 수 있습니다. LIDAR/거리 센서가 장착된 기체는 높은 정확도로 고도를 제어할 수 있습니다. :::

## 매개 변수

이 모드는 아래의 매개 변수의 영향을받습니다.<span id="FW_MAN_P_MAX"><a href="../advanced_config/parameter_reference.md#FW_MAN_P_MAX">FW_MAN_P_MAX</a></td> 

<td>
  자세 안정화 모드에서 수동 제어를위한 최대 피치. 기본값: 45도.
</td></tr> 

<tr>
  <td>
    <span id="FW_MAN_R_MAX"><a href="../advanced_config/parameter_reference.md#FW_MAN_R_MAX">FW_MAN_R_MAX</a></td> 
    
    <td>
      자세 안정화 모드에서 수동 제어를 위한 최대 롤. 기본값: 45도.
    </td></tr> 
    
    <tr>
      <td>
        <span id="FW_L1_CONTROL"><a href="../advanced_config/parameter_reference.md#fw-l1-control">FW L1 Control</a></td> 
        
        <td>
          명령된 고도 및 대기 속도를 유지하는 데 필요한 롤/요는 FW L1 제어 매개 변수의 영향을 받습니다.
        </td></tr> </tbody> </table> 
        
        <p spaces-before="0">
          <!-- 
FW notes: 
FW position controller is basically 2 independent pieces
* L1 is for navigation - determines the roll and yaw needed to achieve the desired waypoint (or loiter)
* TECS is for speed and height control - determines throttle and elevator position needed to achieve the commanded altitude and airspeed
Overall that gives you an attitude setpoint (roll, pitch, yaw) and throttle which is sent off to the attitude controller
-->
        </p>

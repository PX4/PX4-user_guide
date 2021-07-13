# 콘트롤러 다이어그램

이 섹션에는 PX4 컨트롤러에 대한 주요 다이어그램들이 있습니다.

다이어그램은 표준 [PX4 표기법](../contribute/notation.md)을 사용합니다(각각 주석이 달린 범례가 있음).

<!--    The diagrams were created with LaTeX / TikZ.
        The code can be found in assets/diagrams/mc_control_arch_tikz.tex.
        The easiest way to generate the diagrams and edit them is to copy the code and paste it an Overleaf (www.overleaf.com/) document to see the output.
-->

## 멀티콥터 제어 아키텍처

![MC Controller Diagram](../../assets/diagrams/mc_control_arch.jpg)

* 이것은 표준 계단식 제어 아키텍처입니다.
* 컨트롤러는 P 및 PID 컨트롤러를 혼합한 것입니다.
* 추정치는 [EKF2](../advanced_config/tuning_the_ecl_ekf.md)를 사용합니다.
* 모드에 따라 외부(위치) 루프는 바이패스됩니다(외부 루프 뒤에 멀티플렉서로 표시됨). 위치 루프는 위치를 유지하거나, 축에서 요청한 속도가 null인 경우에만 사용됩니다.

### Multicopter 각속도 컨트롤러

![MC Rate Control Diagram](../../assets/diagrams/mc_angular_rate_diagram.jpg)

* K-PID 컨트롤러. 자세한 내용은 [속도 컨트롤러](../config_mc/pid_tuning_guide_multicopter.md#rate-controller)를 참고하십시오.
* 통합 권한은 종료를 방지를 위하여 제한됩니다.
* 출력은 (믹서에서) 일반적으로 -1과 1로 제한됩니다.
* 저역 통과 필터(LPF)는 파생 경로에 사용되어 노이즈를 줄입니다(자이로 드라이버는 컨트롤러에 필터링된 파생물을 제공함).

:::note IMU
파이프라인은 다음과 같습니다. 자이로 데이터 > 보정 매개변수 적용 > 추정 편향 제거 > 노치 필터(`IMU_GYRO_NF_BW` 및 `IMU_GYRO_NF_FREQ`) > 저역 통과 필터(`IMU_GYRO_CUTOFF`) > 차량_각도_속도(*P 및 I 컨트롤러에서 사용하는 필터링된 각속도*) > 파생상품 -> 저역 통과 필터(`IMU_DGYRO_CUTOFF`) > vehicle_angular_acceleration(*D 컨트롤러에서 사용하는 필터링된 각가속도*)

  ![IMU pipeline](../../assets/diagrams/px4_imu_pipeline.png)
:::
  
  <!-- source for image is https://github.com/PX4/PX4-Autopilot/blob/850d0bc588af79186286652af4c8293daafd2c4c/src/lib/mixer/MultirotorMixer/MultirotorMixer.cpp#L323-L326 -->

### 멀티콥터 자세 컨트롤러

![MC Angle Control Diagram](../../assets/diagrams/mc_angle_diagram.jpg)

* 자세 컨트롤러는 [쿼터니언](https://en.wikipedia.org/wiki/Quaternion)을 사용합니다.
* 콘트롤러는 이 [문서](https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf)에서 구현됩니다.
* 이 컨트롤러를 조정시 고려할 유일한 매개변수는 P 게인입니다.
* rate 명령은 포화됩니다.

### 멀티콥터 속도 컨트롤러

![MC Velocity Control Diagram](../../assets/diagrams/mc_velocity_diagram.jpg)

* 속도를 안정화하는 PID 컨트롤러. 가속을 명령합니다.
* 적분기는 클램핑 방식을 사용하는 ARW(Anti-Reset Windup)를 포함합니다.
* 가속도 명령어는 포화됩니다.

### 멀티콥터 위치 콘트롤러

![MC Position Control Diagram](../../assets/diagrams/mc_position_diagram.jpg)

* 속도를 명령하는 간단한 P 컨트롤러.
* 명령된 속도는 특정 한계에서 속도를 유지하기 위해 포화됩니다.

#### 결합된 위치 및 속도 컨트롤러 다이어그램

![MC Position Controller Diagram](../../assets/diagrams/px4_mc_position_controller_diagram.png)

<!-- The drawing is on draw.io: https://drive.google.com/open?id=13Mzjks1KqBiZZQs15nDN0r0Y9gM_EjtX
Request access from dev team. -->

## 고정익 위치 콘트롤러

### 총 에너지 제어 시스템(TECS)
총 에너지 제어 시스템(TECS)의 PX4 구현을 통하여 고정익 항공기의 실제 속도와 고도를 동시에 제어할 수 있습니다. 코드는 고정익 위치 제어 모듈에서 사용되는 라이브러리로 구현됩니다.

![TECS](../../assets/diagrams/tecs_in_context.svg)

위의 다이어그램과 같이 TECS는 대기 속도와 고도 설정값을 입력하여 스로틀 및 피치 각도 설정값을 출력합니다. 이 두 개의 출력은 자세 제어 솔루션을 구현하는 고정익 자세 콘트롤러로 전송됩니다. 따라서 TECS의 성능이 피치 제어 루프의 성능에 직접적인 영향을 끼치는 것을 이해하는 것이 중요합니다. 속도와 고도의 잘못된 추적은 종종 항공기 피치 각도의 잘못된 추적으로 인하여 발생합니다.

:::note TECS를 조정하기 전에 자세 컨트롤러를 조정하여야 합니다.
:::

실제 속도와 높이를 동시에 제어하는 것은 쉽지 않습니다. 항공기 피치 각도를 높이면 높이가 증가하지만 속도도 감소합니다. 스로틀을 높이면 속도가 증가하지만, 양력 증가로 인하여 높이도 증가합니다. 따라서 제어 문제를 어렵게 만드는 두 개의 출력(대기 속도 및 고도)에 모두 영향을 미치는 두 개의 입력(피치 각도 및 스로틀)이 존재합니다.

TECS는 원래 설정이 아닌 에너지 측면에서 문제를 표현하여 솔루션을 제공합니다. 항공기의 총 에너지는 운동 에너지와 위치 에너지의 합입니다. 추력(스로틀 제어를 통해)은 항공기의 총 에너지를 증가시킵니다. 주어진 총 에너지 상태는 위치 에너지와 운동 에너지의 조합입니다. 즉, 높은 고도에서 느린 속도로 비행하는 것은 총 에너지 측면에서 낮은 고도에서 더 빠른 속도로 비행하는 것과 동일합니다. 이를 특정 에너지 균형이라고 하며, 현재 고도와 실제 속도 설정값으로 계산합니다. 특정 에너지 균형은 항공기 피치 각도를 통하여 제어됩니다. 피치 각도의 증가는 운동을 위치 에너지로 변환하고, 음의 피치 각도는 그 반대로 변환합니다. 따라서, 제어 문제를 초기 설정값을 독립적으로 제어 가능한 에너지 양으로 변환하여 분리하였습니다. 추력을 사용하여 차량의 특정 총 에너지를 조절하고, 피치는 위치(높이)와 운동(속도) 에너지 사이의 균형을 유지합니다.


#### 총 에너지 제어 루프

![Energy loop](../../assets/diagrams/TECS_throttle.jpg)


#### 총 에너지 균형 제어 루프

![Energy balance loop](../../assets/diagrams/TECS_pitch.jpg)

항공기의 총 에너지는 운동 에너지와 위치 에너지의 합입니다.

$$E_T = \frac{1}{2} m V_T^2 + m g h$$

시간에 대한 미분을 취하면 총 에너지 비율이 됩니다.

$$\dot{E_T} = m V_T \dot{V_T} + m g \dot{h}$$

이로부터 특정 에너지율은 다음과 같습니다.

$$\dot{E} = \frac{\dot{E_T}}{mgV_T}  = \frac{\dot{V_T}}{g} + \frac{\dot{h}}{V_T} = \frac{\dot{V_T}}{g} + sin(\gamma)$$

여기서 $\gamma{}$는 비행 계획 각도입니다. 작은 $\gamma{}$의 경우 다음과 같이 근사할 수 있습니다.

$$\dot{E} \approx  \frac{\dot{V_T}}{g} + \gamma$$

항공기의 동적 방정식에서 다음 관계를 얻습니다.

$$T - D = mg(\frac{\dot{V_T}}{g} + sin(\gamma)) \approx mg(\frac{\dot{V_T}}{g} + \gamma)$$

여기서 T와 D는 추력과 항력입니다. 수평 비행에서 초기 추력은 항력에 대해 조정되고, 추력의 변화는 다음과 같은 결과를 나타냅니다.

$$\Delta T = mg(\frac{\dot{V_T}}{g} + \gamma)$$

보시다시피 $\Delta T{}$는 $\dot{E}{}$에 비례하므로, 추력 설정값을 전체 에너지 제어에 사용합니다.

반면에 엘리베이터 제어는 에너지를 보존하므로, 위치 에너지를 운동 에너지로 또는 그 반대로 전환합니다. 이를 위하여, 특정 에너지 균형 비율은 다음과 같이 정의합니다.

$$\dot{B} = \gamma - \frac{\dot{V_T}}{g}$$

## 고정익 자세 콘트롤러

![FW Attitude Controller Diagram](../../assets/diagrams/px4_fw_attitude_controller_diagram.png)

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1ibxekmtc6Ljq60DvNMplgnnU-JOvKYLQ/view?usp=sharing
Request access from dev team. -->

자세 제어기는 계단식 루프 방식을 사용합니다. 외부 루프는 자세 설정값과 추정된 자세 사이의 오차를 계산하여 이득(P 콘트롤러)을 곱하여 속도 설정값을 계산합니다. 그런 다음 내부 루프는 비율의 오류를 계산하고 PI(비례 + 적분) 콘트롤러를 사용하여 목표치 각가속도를 생성합니다.

제어 이펙터(에일러론, 엘리베이터, 방향타 등)의 각도 위치는 원하는 각도 가속도와 제어 할당(혼합이라고도 함)을 통해 시스템에 대한 사전 지식을 사용하여 계산됩니다. 또한 제어 표면은 고속에서 더 효과적이고 저속에서는 덜 효과적이기 때문에, 순항 속도에 맞게 조정된 컨트롤러는 속도 측정을 사용하여 조정됩니다(이러한 센서가 사용되는 경우).

:::note
속도 센서가 사용되지 않으면 고정익 자세 콘트롤러에 대한 게인 스케줄링이 비활성화됩니다(개방형 루프). 속도 피드백을 사용하여 TECS에서 수정할 수 없습니다.
:::

피드포워드 이득은 공기역학적 감쇠를 보상합니다. 기본적으로 항공기의 차체 축 모멘트의 두 가지 주요 구성 요소는 제어 표면(에일러론, 엘리베이터, 방향타, - 움직임 생성)과 공기역학적 감쇠(몸체 속도에 비례 - 움직임에 대응)에 의하여 생성됩니다. 일정한 속도를 유지하기 위하여, 이 댐핑은 속도 루프에서 피드포워드를 사용하여 보상할 수 있습니다.

롤 및 피치 컨트롤러는 동일한 구조를 가지며, 종방향 역학과 횡방향 역학은 독립적으로 작동하기에 충분히 분리되어 있다고 가정합니다. 그러나, 요 콘트롤러는 항공기가 미끄러질 때 생성되는 측면 가속도를 최소화하기 위해 선회 조정 제약 조건을 사용하여 요 각속도 설정점을 계산합니다. 요 각속도 콘트롤러는 또한 역방향 댐핑을 제공하여 역 요 효과(https://youtu.be/sNV_SDDxuWk)에 대응하고 [더치 롤 모드](https://en.wikipedia.org/wiki/Dutch_roll)를 댐핑하는 데 도움이 됩니다.


## VTOL 콘트롤러

![VTOL Attitude Controller Diagram](../../assets/diagrams/VTOL_controller_diagram.png)

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1tVpmFhLosYjAtVI46lfZkxBz_vTNi8VH/view?usp=sharing
Request access from dev team. -->

이 섹션에서는 수직 이착륙기(VTOL) 제어 구조에 대한 간략한 개요를 제공합니다. VTOL 비행 컨트롤러는 멀티콥터와 고정익 컨트롤러로 구성되며, 해당 VTOL 모드에서 별도로 실행되거나 전환중에 동시에 실행됩니다. 위의 다이어그램은 간단한 제어 다이어그램입니다. VTOL 자세 컨트롤러 블록은 주로 다양한 VTOL 모드에 필요한 전환 및 혼합 논리를 용이하게 하고, 전환 중 VTOL 유형별 제어 작업(예: 순방향 전환 동안 표준 VTOL의 푸셔 모터 램프 업)을 용이하게 합니다. VTOL 현재 모드에 따라 일부는 콘트롤러에서 무시되므로, 이 블록에 대한 입력을 "가상"이라고 합니다.

표준 및 틸트로터 VTOL의 경우에는 전환 중에 고정익 자세 콘트롤러가 속도 설정값을 생성한 다음 별도의 속도 콘트롤러에 입력하여 멀티콥터와 고정익 액추에이터에 대한 토크 명령을 생성합니다. 테일시터의 경우 전환중에는 멀티콥터 자세 콘트롤러가 실행됩니다.

VTOL 자세 블록의 출력은 멀티콥터(일반적으로 `actuator_controls_0`) 및 고정익(일반적으로 `actuator_controls_1`) 액추에이터에 대한 별도의 토크와 힘 명령입니다. 이는 기체별 믹서 파일에서 처리됩니다([믹싱](../concept/mixing.md) 참조).

VTOL 블록 내부의 전환 논리 조정에 대한 자세한 내용은 [VTOL 설정](../config_vtol/README.md)을 참고하십시오.


### 풍속 조정

이 섹션에서는 속도 PI 및 피드포워드(FF) 컨트롤러의 출력이 제어 성능을 향상시키기 위하여, 속도에 따라 조정될 수 있는 이유와 방법을 방정식으로 설명합니다. 먼저, 롤 축에 대한 단순화된 선형 치수 모멘트 방정식을 제시한 다음, 직접 모멘트 생성에 대한 속도의 영향을 보여주고, 마지막으로 일정한 롤 동안 속도의 영향을 보여줍니다.

As shown in the fixed-wing attitude controller above, the rate controllers produce angular acceleration setpoints for the control allocator (here named "mixer"). In order to generate these desired angular accelerations, the mixer produces torques using available aerodynamic control surfaces (e.g.: a standard airplane typically has two ailerons, two elevators and a rudder). The torques generated by those control surfaces is highly influenced by the relative airspeed and the air density, or more precisely, by the dynamic pressure. If no airspeed scaling is made, a controller tightly tuned for a certain cruise airspeed will make the aircraft oscillate at higher airspeed or will give bad tracking performance at low airspeed.

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$.

The definition of the dynamic pressure is

$$\bar{q} = \frac{1}{2} \rho V_T^2$$

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$.

Taking the roll axis for the rest of this section as an example, the dimensional roll moment can be written

$$\ell = \frac{1}{2}\rho V_T^2 S b C_\ell = \bar{q} S b C_\ell$$

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$.

The nondimensional roll moment derivative $C_\ell{}$ can be modeled using the aileron effectiveness derivative $C_{\ell_{\delta_a}}{}$, the roll damping derivative $C_{\ell_p}{}$ and the dihedral derivative $C_{\ell_\beta}{}$

$$C_\ell = C_{\ell_0} + C_{\ell_\beta}\:\beta + C_{\ell_p}\:\frac{b}{2V_T}\:p + C_{\ell_{\delta_a}} \:\delta_a$$

$$\delta_{a} = \frac{V_{I_0}^2}{V_I^2} \delta_{a_{PI}} + \frac{V_{T_0}}{V_T} \delta_{a_{FF}}$$,

Assuming a symmetric ($C_{\ell_0} = 0{}$) and coordinated ($\beta = 0{}$) aircraft, the equation can be simplified using only the rollrate damping and the roll moment produced by the ailerons

$$\ell = \frac{1}{2}\rho V_T^2 S b \left [C_{\ell_{\delta_a}} \:\delta_a + C_{\ell_p}\:\frac{b}{2V_T} \: p \right ]$$

This final equation is then taken as a baseline for the two next subsections to determine the airspeed scaling expression required for the PI and the FF controllers.

#### Static torque (PI) scaling

At a zero rates condition ($p = 0{}$), the damping term vanishes and a constant - instantaneous - torque can be generated using:

$$\ell = \frac{1}{2}\rho V_T^2 S b \: C_{\ell_{\delta_a}} \:\delta_a = \bar{q} S b \: C_{\ell_{\delta_a}} \:\delta_a$$

Extracting $\delta_a{}$ gives

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}} \frac{1}{\rho V_T^2} \ell = \frac{bS}{C_{\ell_{\delta_a}}} \frac{1}{\bar{q}} \ell$$

where the first fraction is constant and the second one depends on the air density and the true airspeed squared.

Furthermore, instead of scaling with the air density and the TAS, it can be shown that the indicated airspeed (IAS, $V_I{}$) is inherently adjusted by the air density since at low altitude and speed, IAS can be converted to TAS using a simple density error factor

$$V_T = V_I \sqrt{\frac{\rho_0}{\rho}}$$

, where $\rho_o{}$ is the air density as sea level, 15°C.

Squaring, rearranging and adding a 1/2 factor to both sides makes the dynamic pressure $\bar{q}{}$ expression appear

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$

We can now easily see that the dynamic pressure is proportional to the IAS squared:

$$\bar{q} \propto V_I^2$$

The scaler previously containing TAS and the air density can finally be written using IAS only

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$

#### Rate (FF) scaling

The main use of the feedforward of the rate controller is to compensate for the natural rate damping. Starting again from the baseline dimensional equation but this time, during a roll at constant speed, the torque produced by the ailerons should exactly compensate for the damping such as

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$

Rearranging to extract the ideal ailerons deflection gives

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$

The first fraction gives the value of the ideal feedforward and we can see that the scaling is linear to the TAS. Note that the negative sign is then absorbed by the roll damping derivative which is also negative.

#### Conclusion

The output of the rate PI controller has to be scaled with the indicated airspeed (IAS) squared and the output of the rate feedforward (FF) has to be scaled with the true airspeed (TAS)

$$\delta_{a} = \frac{V_{I_0}^2}{V_I^2} \delta_{a_{PI}} + \frac{V_{T_0}}{V_T} \delta_{a_{FF}}$$

where $V_{I_0}{}$ and $V_{T_0}{}$ are the IAS and TAS at trim conditions.

Finally, since the actuator outputs are normalized and that the mixer and the servo blocks are assumed to be linear, we can rewrite this last equation as follows:

$$\dot{\mathbf{\omega}}_{sp}^b = \frac{V_{I_0}^2}{V_I^2} \dot{\mathbf{\omega}}_{sp_{PI}}^b + \frac{V_{T_0}}{V_T} \dot{\mathbf{\omega}}_{sp_{FF}}^b$$

and implement it directly in the rollrate, pitchrate and yawrate controllers.

#### Tuning recommendations

The beauty of this airspeed scaling algorithm is that it does not require any specific tuning. However, the quality of the airspeed measurements directly influences its performance.

Furthermore, to get the largest stable flight envelope, one should tune the attitude controllers at an airspeed value centered between the stall speed and the maximum airspeed of the vehicle (e.g.: an airplane that can fly between 15 and 25m/s should be tuned at 20m/s). This "tuning" airspeed should be set in the [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) parameter.

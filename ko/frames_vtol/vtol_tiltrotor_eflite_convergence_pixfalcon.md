# E-flite 컨버전스 Tiltrotor VTOL (Pixfalcon)

 E-Flite 컨버전스 </ 0> PX4를 사용하여 완전히 자율적 인 VTOL로 쉽게 변환 할 수 있습니다. 있다 별다른 공간은 아니지만 GPS와 원격 측정 기능이있는 Pixfalcon에는 충분합니다.</p> 

{% youtube %} http://www.youtube.com/watch?v=E61P2f2WPNU {% endyoutube %}

## 하드웨어설정 

컨버전스는 7 개의 PWM 신호를 필요로하며 Pixfalcon과 다음과 같은 방법 (PX4의 기체 구성과 일치, 비행기 뒤에서 바라본 왼쪽 / 오른쪽) 

| Port   | Connection       |
| ------ | ---------------- |
| MAIN 1 | Motor right      |
| MAIN 2 | Motor left       |
| MAIN 3 | Motor back       |
| MAIN 4 | empty            |
| MAIN 5 | Tilt servo right |
| MAIN 6 | Tilt servo left  |
| MAIN 7 | Elevon right     |
| MAIN 8 | Elevon left      |

Pixfalcon은 원래 자동 조종 장치가 있던 동일한 장소에 장착 할 수 있습니다.

![](../../images/eflight_convergence_pixfalcon_mounting.jpg)

텔레 메 트리 모듈은 FPV 변속기를 수용 할 수있는 베이에 장착됩니다.

![](../../images/eflight_convergence_telemetry_module.jpg)

GPS를 위해 우리는 "조종실"내부의 거품 섹션을 잘라 냈습니다. 그런 식으로 GPS는 몸 안쪽에 넣을 수 있으며 외모를 손상시킨다.

![](../../images/eflight_convergence_gps_mounting.jpg)

## Configuration

자동 조종 장치가 정상적으로 구성되기 전에 (라디오, 센서, 비행 모드)에서 기체 구성 "E-flite Convergence"를 선택하십시오 QGC에서 "VTOL Tiltrotor"를 선택하고 다시 시작하십시오.

기체가 QGC에 아직 보이지 않으면 다음 매개 변수를 설정하십시오 다시 시작 :

- SYS\_AUTOSTART: 13012
- SYS\_AUTOCONFIG: 1

Notes:

- Remember to assign the transition switch for switching to fixed-wing.
- By default permanent stabilization is enabled. If you like fully manual flying in fixed-wing, set VT\_FW\_PERM\_STAB to 0.
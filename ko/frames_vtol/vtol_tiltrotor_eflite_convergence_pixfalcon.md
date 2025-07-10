---
canonicalUrl: https://docs.px4.io/main/ko/frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon
---

# E-flite Convergence Tiltrotor VTOL (Pixfalcon)

[E-Flite 컨버전스](https://www.modelflight.com.au/e-flite-convergence-vtol-bnf-basic.html) PX4의 자율 비행 기능을 지원하는 VTOL로 변환 할 수 있습니다. 공간이 여유가 많지는 않지만, GPS, 텔레메트리와 Pixfalcon은 충분히 창작가능합니다.

@[유투브](https://youtu.be/E61P2f2WPNU)

## 하드웨어 설정

컨버전스에는 7 개의 PWM 신호가 필요하며 다음과 같은 방식으로 Pixfalcon에 연결됩니다 (PX4의 기체 구성과 일치, 비행기 뒤에서 본 왼쪽 / 오른쪽).

| 포트     | 연결       |
| ------ | -------- |
| MAIN 1 | 우측 모터    |
| MAIN 2 | 좌측 모터    |
| MAIN 3 | 후면 모터    |
| MAIN 4 | 없음       |
| MAIN 5 | 우측 틸트 서보 |
| MAIN 6 | 좌측 틸트 서보 |
| MAIN 7 | 우측 엘레본   |
| MAIN 8 | 좌측 엘레본   |

Pixfalcon은 원래 자동조종장치가 있었던 동일한 장소에 장착 가능합니다.

![Pixfalcon 장착](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_pixfalcon_mounting.jpg)

텔레메트리 모듈은 FPV 전송 기어를 고정하기 위한 베이에 장착합니다.

![텔레메트리 모듈 장착](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_telemetry_module.jpg)

GPS 장착을 위하여 "조종실" 내부의 발포 재질 부분을 잘라냈습니다. GPS를 기체 내부에 손상 없이 장착 가능합니다.

![GPS 장착](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_gps_mounting.jpg)

## 설정

자동조종 장치를 정상적으로 설정하기 전에 (무선, 센서, 비행 모드) 아래에서 기체 구성 "E-flite Convergence"를 선택합니다. QGC에서 "VTOL Tiltrotor"를 실행하고 다시 시작합니다.

기체가 아직 QGC에 표시되지 않으면 다음 매개 변수를 설정하고 다시 시작하십시오.

- `SYS_AUTOSTART`: 13012
- `SYS_AUTOCONFIG`: 1

참고:

- 고정 날개로 전환하려면 전환 스위치를 지정하여야 합니다.
- 기본적으로 영구 안정화가 활성화됩니다. 고정익에서 완전 수동 비행을 위해서는 VT\_FW\_PERM\_STAB를 0으로 설정하십시오.
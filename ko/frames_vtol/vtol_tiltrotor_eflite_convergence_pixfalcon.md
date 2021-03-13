# E-flite Convergence Tiltrotor VTOL (Pixfalcon)

[E-Flite 컨버전스](https://www.modelflight.com.au/e-flite-convergence-vtol-bnf-basic.html) PX4의 자율 비행 기능을 지원하는 VTOL로 변환 할 수 있습니다. 공간이 많지는 않지만 GPS, 텔레메트리와 Pixfalcon을 충분히 장착할 수 있습니다.

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

![Mount Pixfalcon](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_pixfalcon_mounting.jpg)

텔레메트리 모듈은 FPV 전송 기어를 고정하기 위한 베이에 장착합니다.

![Mount telemetry module](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_telemetry_module.jpg)

GPS 장착을 위하여 "조종실" 내부의 발포 재질 부분을 잘라냈습니다. That way the GPS can be put inside the body and is nicely stowed away without compromising the looks :).

![Mount GPS](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_gps_mounting.jpg)

## Configuration

Before the autopilot is configured normally (radio, sensors, flight modes), select the airframe configuration "E-flite Convergence" under "VTOL Tiltrotor" in QGC and restart.

If the airframe is not yet visible in QGC, set the following parameters and restart:

- `SYS_AUTOSTART`: 13012
- `SYS_AUTOCONFIG`: 1

Notes:

- Remember to assign the transition switch for switching to fixed-wing.
- By default permanent stabilization is enabled. If you like fully manual flying in fixed-wing, set VT\_FW\_PERM\_STAB to 0.
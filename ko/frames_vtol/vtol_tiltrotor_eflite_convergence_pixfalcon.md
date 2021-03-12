# E-flite Convergence Tiltrotor VTOL (Pixfalcon)

[E-Flite 컨버전스](https://www.modelflight.com.au/e-flite-convergence-vtol-bnf-basic.html) PX4의 자율 비행 기능을 지원하는 VTOL로 변환 할 수 있습니다. 공간이 많지는 않지만 GPS, 텔레메트리와 Pixfalcon을 충분히 장착할 수 있습니다.

@[유투브](https://youtu.be/E61P2f2WPNU)

## 하드웨어 설정

The convergence needs 7 PWM signals and is connected to a Pixfalcon in the following way (matching the airframe configuration in PX4, left/right seen looking from behind the plane):

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

![Mount Pixfalcon](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_pixfalcon_mounting.jpg)

텔레 메 트리 모듈은 FPV 변속기를 수용 할 수있는 베이에 장착됩니다.

![Mount telemetry module](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_telemetry_module.jpg)

GPS를 넣기 위해 "조종실" 내부의 발포 재질 부분을 잘라냈습니다. That way the GPS can be put inside the body and is nicely stowed away without compromising the looks :).

![Mount GPS](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_gps_mounting.jpg)

## Configuration

Before the autopilot is configured normally (radio, sensors, flight modes), select the airframe configuration "E-flite Convergence" under "VTOL Tiltrotor" in QGC and restart.

If the airframe is not yet visible in QGC, set the following parameters and restart:

- `SYS_AUTOSTART`: 13012
- `SYS_AUTOCONFIG`: 1

Notes:

- Remember to assign the transition switch for switching to fixed-wing.
- By default permanent stabilization is enabled. If you like fully manual flying in fixed-wing, set VT\_FW\_PERM\_STAB to 0.
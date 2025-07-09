---
canonicalUrl: https://docs.px4.io/main/ko/concept/pwm_limit
---

# PWM 제한 상태 머신

The`PWM_limit State Machine` controls PWM outputs as a function of pre-armed and armed inputs. "armed"의 어설션과 준비된 신호의 어설션에 대한 스로틀 증가 사이의 지연을 제공합니다.

## 요약

**입력**
  * armed: 회전하는 프로펠러와 같은 위험한 행동을 가능하게 한다고 주장
  * pre-armed: 제어 표면을 움직이는 것과 같은 양성 행동을 가능하게 하기 위하여 주장
   * 이 입력은 현재 상태를 재정의합니다
   * 사전 시동의 주장은 현재 상태에 관계없이 상태의 동작을 즉시 강제 실행합니다.
   * 사전 시동 해제는 행동을 현재 상태로 되돌립니다.

**상태**
  * INIT과 OFF
    * pwm 출력은 무장 해제된 값으로 설정됩니다.
  * RAMP
    * pwm outputs ramp from disarmed values to min values.
  * ON
    * pwm 출력은 제어 값에 따라 설정됩니다.


## 상태 전환 다이어그램

![PWM Limit state machine diagram](../../assets/diagrams/pwm_limit_state_diagram.svg)


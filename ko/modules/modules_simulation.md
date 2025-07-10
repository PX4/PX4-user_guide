---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_simulation
---

# 모듈 참조: 시뮬레이션

## sih
소스: [modules/sih](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/sih)


### 설명
이 모듈은 하드웨어 자동 조종 장치 내에서 완전히 실행되는 쿼드로터용 시뮬레이터를 제공합니다.

이 시뮬레이터는 믹서에서 제공하는 액추에이터 pwm 신호인 "actuator_outputs"를 구독합니다.

이 시뮬레이터는 루프에 상태 추정기를 통합하기 위하여 실제 노이즈로 손상된 센서 신호를 게시합니다.

### 구현
시뮬레이터는 선형대수를 사용하여 운동 방정식을 구현합니다. 쿼터니언 표현은 태도에 사용됩니다. 적분에는 순방향 오일러가 사용됩니다. 대부분의 변수는 스택 오버플로를 피하기 위하여 .hpp 파일에서 전역으로 선언됩니다.



<a id="sih_usage"></a>

### 사용법
```
sih <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```

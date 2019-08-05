# 프레임 선택

## 기체

PX4를 항공기에 사용하려는 경우, 답해야 하는 가장 중요한 질문은 어디에 활용할 것인가입니다. 재미를 위한 것인지 일을 위한 것인지, 그리고 계획된 비행 시간과 적용 범위는 무엇인지 입니다.

- 정밀한 호버링이 필요하고 더 짧은 비행은 염두하지 경우, **멀티콥터**에 촛점을 맞추면 됩니다.
- 더 길고 넓은 범위 영역의 비행에는 고정익 항공기가 필요합니다. 예: **비행기**.
- **VTOL** - 수직 이착률 항공기라고 불리는 혼합 유형의 항공기도 있습니다. 멀티콥터와 같이 수직 방향으로 이륙하고, 비행기처럼 전방을 향해 비행하도록 변환됩니다.

PX4 오토파일럿으로 완벽한 비행을 위해 튜닝된 기체들로 계속 추가되고 있는 [기체 프레임](http://px4.io/technology/airframes/) 목록을 볼 수 있습니다.

일단 기체를 선택하고 구입하여 조립하면, [초기 설정 과정](../config/README.md) 동안 QGroundControl에서 템플릿으로 미리 설정해야 할 것입니다.

![프레임 선택](../../images/frame_selection.png)

<!-- 
### Types of VTOL

Depending on the way the VTOL flies in copter mode or how it makes the transition there are three main types of VTOL aircraft.

**Multicopter - Airplane** - Generic airplane with pusher/puller motor and separate motors for vertical thrust. The VTOL hovers with its vertical motors. The transition is done when the forward motors are enabled and after the plane reaches cruising speed the hover motors are disabled in horizontal flight.

**Tail-sitter** - Airplane with two or more motors that sits on its tail while landed, then in vertical flight it balances in vertical frame orientation. The transition is made when the whole airplane changes its orientation from vertical to horizontal.

**Tilt-rotor** - Airplane with two or more motors that mechanical swing around an Y axis. The transition is done when gradually the motors change the thrust vector from vertical to horizontal.

-->

## 지상 기체

## 해양 기체
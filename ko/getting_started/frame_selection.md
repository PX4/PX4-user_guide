# 프레임 선택

## 항공 기체

PX4를 항공기에 사용하려는 경우, 가장 중요한 질문은 어디에 활용할 것인가 입니다. 취미 생활을 위한 것인지, 일을 위한 것인지, 그리고 계획된 비행 시간과 적용 범위는 무엇인지를 결정하여야 합니다.

- 정밀한 호버링이 필요하고 더 짧은 비행이 아니라면, **멀티콥터**를 사용하면 무난합니다.
- 장거리 광역 비행에는 고정익이 적절합니다.(예: **비행기**.)
- **VTOL** - 수직 이착륙인 가능한 혼합 유형의 비행기도 있습니다. 멀티콥터와 같이 수직 방향으로 이착륙하고, 고정익처럼 전방 비행도 가능합니다.

[기체 정의](../airframes/airframe_reference.md)에서 PX4와 연동 가능한 프레임들을 참고할 수 있습니다.

기체를 선택/구입/조립하면, [초기 설정 과정](../config/README.md)중에 QGroundControl에서 템플릿으로 미리 설정해야 할 것입니다.

![프레임 선택](../../assets/qgc/setup/airframe/frame_selection.png)

<!-- 
### Types of VTOL

Depending on the way the VTOL flies in copter mode or how it makes the transition there are three main types of VTOL aircraft.

**Multicopter - Airplane** - Generic airplane with pusher/puller motor and separate motors for vertical thrust. The VTOL hovers with its vertical motors. The transition is done when the forward motors are enabled and after the plane reaches cruising speed the hover motors are disabled in horizontal flight.

**Tail-sitter** - Airplane with two or more motors that sits on its tail while landed, then in vertical flight it balances in vertical frame orientation. The transition is made when the whole airplane changes its orientation from vertical to horizontal.

**Tilt-rotor** - Airplane with two or more motors that mechanical swing around an Y axis. The transition is done when gradually the motors change the thrust vector from vertical to horizontal.

-->

## 지상 기체

## 해양 기체
---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/stabilized_fw
---

# 안정화 모드 (고정익)

[<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

안정화 모드 *는 RC 스틱이 중앙에있을 때 차량을 똑바로 수평 비행으로 전환하여 바람에 대한 수평 자세를 유지합니다 (차량 방향 및 고도 제외).

기체는 피치 입력을 기반으로 상승/하강하며, 롤/피치 스틱이 0이 아닌 경우 회전합니다. 롤과 피치는 각도가 제어됩니다 (거꾸로 굴리거나 반복할 수 없음).

:::tip
*안정화 모드*는 굴리거나 뒤집을 수 없기 때문에 [수동 모드](../flight_modes/manual_fw.md)보다 비행하기 훨씬 쉽고 조종 스틱을 중앙에 배치하여 기체의 수평을 유지가 용이합니다. :::

스로틀을 0%로 낮추면 기체가 미끄러집니다 (모터 정지). 회전을 수행하기 위해 명령은 기동 내내 지켜 져야합니다. 롤이 풀리면 비행기는 회전을 멈추고 스스로 수평을 맞출 것입니다 (피치 및 요 명령도 마찬가지입니다).

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 ([모드 2 송신기](../getting_started/rc_transmitter_receiver.md#transmitter_modes)의 경우).

![고정익 수동 비행](../../assets/flight_modes/manual_stabilized_FW.png)


## 기술적 설명

중앙 RP가 기체의 수평을 고정하는 RC 수동 모드.
* 중앙 스틱은 기체를 직선 및 수평 비행 상태로 만듭니다. 기체의 고도와 경로가가 유지되지 않고 바람에 표류할 수 있습니다.
* 롤/피치 스틱이 0이 아닌 경우 차량은 조정된 회전을 수행합니다 (사이드 슬립을 제어하기 위해 수동 요 입력이 방향타 제어 입력에 추가됨).

## 매개 변수

| 매개 변수  | 설명 |
| ------ | -- |
| &nbsp; |    | 

<!-- this document needs to be extended -->

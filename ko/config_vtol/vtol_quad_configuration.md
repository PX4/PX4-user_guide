# QuadPlane VTOL 구성 및 튜닝

181/5000 이것은 QuadPlane VTOL 설정 (Quadcopter와 결합 된 Plane)에 대한 설정 문서입니다. For airframe specific documentation and build instructions see [VTOL Framebuilds](../frames_vtol/README.md).

## 펌웨어 및 기본 설정

1. Run *QGroundControl*
2. 마스터 펌웨어를 플래시하십시오.
3. 설정 탭에서 적절한 VTOL 기체를 선택하십시오. 기체가 목록에 없으면 Fun Cub VTOL 기체를 선택하십시오. 

### 비행 / 전환 모드 스위치

In *QGroundControl* assign a switch of your remote to the transition function during the RC calibration step or by setting [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW).

This allows you to switch between the multicopter- and fixed wing mode. 오프 위치에있는 스위치는 멀티탭 모드로 비행하고 있음을 의미합니다.

### 멀티 로터 / 고정 날개 튜닝

고정 날개 비행으로 첫 번째 전환을 시도하기 전에 VTOL이 멀티 로터 모드에서 잘 조정되어 있는지 확인하십시오. 이유 중 하나는 이것이 무언가가 간다면 돌아올 모드입니다. 이미 전환에 문제가있어 상당히 빨리 움직일 수 있습니다. 잘 조정되지 않으면 사고가 일어날 수 있습니다.

활주로를 이용할 수 있고 총 중량이 너무 높지 않으면 또한 고정 날개 비행을 조정하고 싶을 것입니다 . 그렇지 않다면 고정 날개 모드로 전환 할 때이를 시도해야합니다. 방법이 뭔가잘못되면 멀티 로터로 다시 전환 할 준비가 되어 있어야 합니다.

멀티 로터 튜닝 방법에 대해서는 각 튜닝 설명서를 따르고 고정 날개.

### 전환 조정

당신이 날 수있는 기체를 다루고있는 것처럼 보일 수도 있지만 두 가지 모드 (수직 이륙 및 착륙을위한 멀티 로터 및 고정익 전달 항공편의 경우) 조정할 필요가있는 추가 상태가 있습니다. 전이. 전환 조정을 올바르게하는 것이 중요합니다. 고정 날개 모드로 안전하게 진입 할 수 있습니다. 예를 들어, 속도가 너무 느려 전환 될 수 있습니다.

#### 전이 스로틀

Parameter: [VT_TRANS_THR](../advanced_config/parameter_reference.md#VT_TRANS_THR)

전이 스로틀은 엔진이 작동하는 동안 사용할 최대 스로틀을 정의합니다. 전이. 이 값을 너무 낮게 설정하지 않으면 절대 도달하지 않습니다. 천이 속도. 당신이 원하는 것보다 너무 높게 설정하면 더 많은 전력을 사용하게됩니다. 처음으로 전환 할 때 더 높을수록 좋습니다. 여기보다 낮습니다.

#### 전이 전환 기간

Parameter: [VT_F_TRANS_DUR](../advanced_config/parameter_reference.md#VT_F_TRANS_DUR)

전방 전이 란 다중 로터에서 고정 전이로의 전환을 가리킨다. 날개 모드. This is the amount of time in seconds that should be spent ramping up the throttle to the target value (defined by `VT_TRANS_THR`). 0 값은 전이 스로틀 값을 명령하게됩니다 즉시 설정됩니다. 스로틀 업을 원활하게하려면이 값을 3과 같이 큰 값으로 늘릴 수 있습니다.

램프 업 기간이 끝나면 스로틀은 목표 설정 상태가되어 전환 속도에 도달 할 때까지 그대로 남아있게됩니다.

#### 블렌딩 속도

Parameter: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

By default, as the airspeed gets close to the transition speed, multirotor attitude control will be reduced and fixed wing control will start increasing continuously until the transition occurs.

이 매개 변수를 0으로 설정하여 블렌딩을 비활성화하면 전환이 발생할 때까지 완전한 다중 로터 제어 및 제로 고정 날개 제어가 유지됩니다.

#### 천이 속도

Parameter: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

이 속도가 도달하면 다중로 터 모드에서 고정 날개 모드로의 전환을 트리거합니다. 속도 센서를 올바르게 캘리브레이션하는 것이 중요합니다. 현재 점검되지 않은 기체 속도 (기체 FW \ _AIRSPD \ _MIN을 확인하십시오) 이상으로 기체 속도를 선택하는 것도 중요합니다.

#### 고정 날개 영구 안정화

Parameter: [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB)

영구 안정화를 활성화하면 고정익 비행이 자동 조종 장치에 의해 항상 안정화됩니다. 고정 날개로의 전환이 일어나 자마자 안정화됩니다.

고정 날개 모드를 아직 조정하지 않았다면이 모드에서 정상적으로 작동 할 때까지이 설정을 해제해야합니다.

### 전환 팁 {#transitioning_tips.sectionedit9}

이미 언급했듯이 멀티 튜너 모드가 잘 조정되어 있는지 확인하십시오. 전환 중에 뭔가 잘못되면이 모드로 다시 전환되며 매우 부드럽습니다.

당신이 비행하기 전에 당신이 그 중 하나에있을 때 무엇인가 잘못되었을 때 당신이 3 단계 (다 회전기, 전환기, 고정 날개) 각각에서 무엇을 할 것인지 계획을 세우십시오.

배터리 잔량 : 항공편이 끝날 때 착륙을위한 다중 로터리 전환을위한 충분한 여유를 남겨 둡니다. 착륙하기 위해 멀티로 터 모드에서 더 많은 전력이 필요하므로 배터리를 너무 낮게 사용하지 마십시오. 보수적이어야합니다.

#### 전환: 준비하기

지상에서 적어도 20 미터 이상 떨어져 있는지 확인하고 전환을 완료 할 충분한 공간이 있는지 확인하십시오. 고정 날개 모드로 전환 할 때 VTOL이 높이를 잃을 수 있습니다 (특히 대기 속도가 충분히 높지 않은 경우).

가능하면 바람이 불 때마다 전환되기 전에 더 멀리 여행 할 것입니다.

전환을 시작하기 전에 VTOL이 안정된 호버에 있는지 확인하십시오.

#### Transition: Multirotor to Fixed Wing (Front-transition)

전환을 시작하십시오 그것은 50 - 100 미터 내에서 전환해야합니다 그렇지 않은 경우 또는 안정된 방식으로 비행하지 않는 경우 전환을 중단하고 (아래 참조) 착륙하거나 출발 위치 및 땅으로 다시 이동하십시오. Try increasing the transition throttle (`VT_TRANS_THR`) value. Also consider reducing the transition duration (`VT_F_TRANS_DUR`).

전환이 일어나는 것을 확인하자마자 급격히 감소하는 등 고도 손실을 처리 할 준비가되어 있습니다.

> **Caution** The following feature has been discussed but not implemented yet: Once the transition happens the multirotor motors will stop and the pusher/puller throttle will remain at the `VT_TRANS_THR` level until you move the throttle stick, assuming you are in manual mode.

#### Transition: Fixed Wing to Multirotor (Back-transition)

Transition: Multirotor 로의 고정 날개 Multirotor 모드로 전환하면 항공기를 똑바로 접근하여 속도를 줄이고 전환 스위치를 반전하면 다중 로터 모터가 시동되고 푸셔 / 풀러 소품이 즉시 멈추고 매우 매끄러운 활주 전이. 

전환 할 때 가지고있는 스로틀 값이 전환하는 순간 멀티 로터의 추력을 명령한다고 가정하십시오. 날개가 여전히 날아가고 있기 때문에 당신은 스로틀을 달성 / 호버를 잡을 시간을 충분히 가질 수 있습니다.

For advanced tuning of the back-transition please refer to the [Back-transition Tuning Guide](vtol_back_transition_tuning.md)

#### 전환 중단 {#aborting_a_transition}

*전환하는 동안* 전환 명령을 되돌릴 때 기대할 사항을 아는 것이 중요합니다.

전환 할 때 가지고있는 스로틀 값이 전환하는 순간 멀티 로터의 추력을 명령한다고 가정하십시오.

이 유형의** VTOL에서 고정 날개에서 다중 회전으로 전환 할 때** 전환이 즉시 이루어 지므로 기울임 로터 VTOL과 달리 전환 옵션이 실제로는 없습니다. 고정 날개로 돌아가려면 전체 전환을 수행해야합니다. 여전히 빠르게 여행하고 있다면이 일이 빨리 이루어져야합니다. 여전히 빠르게 여행하고 있다면이 일이 빨리 이루어져야합니다.

### 지원

VTOL 변환과 관련하여 질문이 있거나 구성http://discuss.px4.io/c/vtol</0을 방문하십시오.

 
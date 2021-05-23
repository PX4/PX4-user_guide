# QuadPlane VTOL 설정 및 튜닝

이것은 QuadPlane VTOL(Quadcopter와 결합된 비행기)에 대한 설정 문서입니다. 기체별 문서와 조립 방법은 [VTOL 프레임 조립](../frames_vtol/README.md)를 참고하십시오.

## 펌웨어 및 기본 설정

1. *QGroundControl*을 실행합니다
2. 마스터 펌웨어 플래시
3. 설정 탭에서 적절한 VTOL 기체를 선택하고, 기체가 목록에 없으면 Fun Cub VTOL 기체를 선택합니다.

### 비행 / 전환 모드 스위치 

*QGroundControl*에서 RC 보정 과정이나 [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW)를 설정에서 전환 기능에 리모컨 스위치를 할당합니다.

이를 통하여 멀티콥터와 고정익 모드간의 전환이 가능해집니다. 오프 포지션의 스위치는 멀티콥터 모드로 비행하고 있음을 의미합니다.

### 멀티콥터 / 고정익 튜닝

고정익 전환을 처음 시도하기 전에 VTOL이 멀티콥터 모드 튜닝 여부를 반드시 확인하여야 합니다. 그 이유는 전환과정에 문제가 생기면 복귀할 모드이며 매우 빠른 속도로 움직일 수 있기 때문입니다. 제대로 튜닝되지 않으면 사고가 발생할 수 있습니다.

활주로에서 총중량이 과도하지 않으면 고정익을 튜닝하는 것이 바람직합니다. 그렇지 않은면, 고정익 모드로 전환시에 이것을 시도합니다. 문제가 발생시에는 멀티콥터 모드로 다시 전환할 수있는 준비가 되어있어야 합니다.

멀티콥터와 고정익 튜닝 방법에 대한 가이드를 참고하십시오.

### 전환 튜닝

두 가지 모드 (수직 이착륙을 위한 멀티콥터와 전진 비행을 위한 고정익)로 비행기능한 기체를 다루는 것처럼 보일 수 있지만, 튜닝이 필요한 추가 상태가 있습니다.

전환 튜닝을 올바르게하는 것은 고정익 모드 전환 과정에 매우 중요합니다. 예를 들어, 전환시 속도가 너무 느리면 정지할 수 있습니다.

<span id="transition_throttle"></span>

#### 전환 스로틀

매개변수: [VT_F_TRANS_THR](../advanced_config/parameter_reference.md#VT_F_TRANS_THR)

전방 전환 스로틀은 전방 전환 중 푸셔/풀러 모터의 목표 스로틀을 정의합니다.

이는 전환 대기 속도에 도달할 수 있도록 충분히 높게 설정되어야 합니다. 기체에 대기 속도 센서가 장착된 경우이 매개변수를 늘려 전면 전환을 더 빠르게 완료할 수 있습니다. 첫 번째 전환의 경우 값을 더 낮게 설정하는 것이 좋습니다.

매개변수: [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR)

일반적으로 전진 추력이 바람직하지 않기 때문에 (대부분의 경우) 역 전환 스로틀을 0으로 설정할 수 있습니다. 그러나, 모터 컨트롤러가 역 추력을 지원하는 경우 음수 값을 설정하여 이를 달성할 수 있습니다.

#### 순방향 전환 푸셔/풀러 램프 업 시간

매개변수: [VT_PSHER_RMP_DT](../advanced_config/parameter_reference.md#VT_PSHER_RMP_DT)

전방 전환은 멀티콥터에서 고정익 모드로 전환하는 것입니다. 스로틀을 목표값(`VT_F_TRANS_THR`에 의해 정의됨)까지 증가시키는 데 소요되는 시간(단위, 초)입니다. 값이 0이면, 전환 스로틀 값이 즉시 설정되도록 명령합니다. 스로틀을 부드럽게 하려면, 이 값을 3과 같이 더 큰 값으로 늘릴 수 있습니다.

램프 업 기간이 종료되면, 스로틀은 목표 설정에 있으며 전환 속도에 도달할 때까지 유지됩니다.

#### 블렌딩 속도

매개변수: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

기본적으로 대기 속도가 전환 속도에 가까워지면 멀티콤터 자세 제어가 감소하고 고정익 제어가 전환이 발생할 때까지 계속 증가하기 시작합니다.

이 매개 변수를 0으로 설정하여 블렌딩을 비활성화하면, 전환이 발생할 때까지 완전한 멀티콥터 제어 및 제로 고정익 제어가 유지됩니다.

#### 전환 대기속도

매개변수: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

멀티콥터 모드에서 고정익 모드로 전환을 트리거하는 대기 속도입니다. 대기속도 센서를 적절하게 보정하는 것이 중요합니다. 현재는 확인되지 않았으므로, 기체 실속 속도(`FW_AIRSPD_MIN` 확인) 보다 편안한 속도를 선택하는 것도 중요합니다.

#### 고정익 영구 안정화

매개변수: [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB)

영구 안정화를 활성화하면 항상 자동조종장치에 의한 고정익 비행이 안정화됩니다. As soon as a transition to fixed wing occurs it will be stabilised.

Note that if you have not yet tuned your fixed wing mode you should leave this off until you are sure it behaves well in this mode.

<span id="transitioning_tips"></span>

### Transitioning Tips

As already mentioned make sure you have a well tuned multirotor mode. If during a transition something goes wrong you will switch back to this mode and it should be quite smooth.

Before you fly have a plan for what you will do in each of the three phases (multirotor, transition, fixed wing) when you are in any of them and something goes wrong.

Battery levels: leave enough margin for a multirotor transition for landing at the end of your flight. Don’t run your batteries too low as you will need more power in multirotor mode to land. Be conservative.

#### 전환: 준비하기

Make sure you are at least 20 meters above ground and have enough room to complete a transition. It could be that your VTOL will lose height when it switches to fixed wing mode, especially if the airspeed isn’t high enough.

Transition into the wind, whenever possible otherwise it will travel further from you before it transitions.

Make sure the VTOL is in a stable hover before you start the transition.

#### Transition: Multirotor to Fixed Wing (Front-transition)

Start your transition. It should transition within 50 – 100 meters. If it doesn’t or it isn’t flying in a stable fashion abort the transition (see below) and land or hover back to the start position and land. Try increasing the [transition throttle](#transition_throttle) (`VT_F_TRANS_THR`) value. Also consider reducing the transition duration (`VT_F_TRANS_DUR`) if you are not using an airspeed sensor. If you are using an airspeed sensor consider lowering the transition airspeed but stay well above the stall speed.

As soon as you notice the transition happen be ready to handle height loss which may include throttling up quickly.

:::caution
The following feature has been discussed but not implemented yet: Once the transition happens the multirotor motors will stop and the pusher/puller throttle will remain at the `VT_F_TRANS_THR` level until you move the throttle stick, assuming you are in manual mode.
:::

#### Transition: Fixed Wing to Multirotor (Back-transition)

When you transition back to multirotor mode bring your aircraft in on a straight level approach and reduce its speed, flip the transition switch and it will start the multirotor motors and stop the pusher/puller prop immediately and should result in a fairly smooth gliding transition.

Consider that the throttle value you have when you transition will command the amount of thrust your multirotor has at the moment of the switch. Because the wing will still be flying you’ll find you have plenty of time to adjust your throttle to achieve/hold a hover.

For advanced tuning of the back-transition please refer to the [Back-transition Tuning Guide](vtol_back_transition_tuning.md)

<span id="aborting_a_transition"></span>

#### Aborting a Transition

It’s important to know what to expect when you revert a transition command *during* a transition.

When transitioning from **multirotor to fixed wing** (transition switch is on/fixed wing) then reverting the switch back (off/multirotor position) *before* the transition happens it will immediately return to multirotor mode.

When transitioning from **fixed wing to multirotor** for this type of VTOL the switch is immediate so there isn’t really a backing out option here, unlike for tilt rotor VTOLs. If you want it to go back into fixed wing you will need to go through the full transition. If it’s still travelling fast this should happen quickly.

### 지원

If you have any questions regarding your VTOL conversion or configuration please see <https://discuss.px4.io/c/px4/vtol>.
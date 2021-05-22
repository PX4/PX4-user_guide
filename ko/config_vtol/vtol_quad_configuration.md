# QuadPlane VTOL 설정 및 튜닝

이것은 QuadPlane VTOL(Quadcopter와 결합된 비행기)에 대한 설정 문서입니다. 기체별 문서와 조립 방법은 [VTOL 프레임 조립](../frames_vtol/README.md)를 참고하십시오.

## 펌웨어 및 기본 설정

1. *QGroundControl*을 실행합니다
2. 마스터 펌웨어 플래시
3. 설정 탭에서 적절한 VTOL 기체를 선택하고, 기체가 목록에 없으면 Fun Cub VTOL 기체를 선택합니다.

### 비행/전환 모드 스위치

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

Front transition throttle defines the target throttle for the pusher/puller motor during the front transition.

This must be set high enough to ensure that the transition airspeed is reached. If your vehicle is equipped with an airspeed sensor then you can increase this parameter to make the front transition complete faster. For your first transition you are better off setting the value higher than lower.

Parameter: [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR)

Generally back-transition throttle can be set to 0 since forward thrust is not (in most cases) desirable. If the motor controller supports reverse thrust however, you can achieve this by setting a negative value.

#### Forward Transition Pusher/Puller Ramp-up Time

Parameter: [VT_PSHER_RMP_DT](../advanced_config/parameter_reference.md#VT_PSHER_RMP_DT)

A forward transition refers to the transition from multirotor to fixed wing mode. This is the amount of time in seconds that should be spent ramping up the throttle to the target value (defined by `VT_F_TRANS_THR`). A value of 0 will result in commanding the transition throttle value being set immediately. If you wish to smooth the throttling up you can increase this to a larger value, such as 3.

Note that once the ramp up period ends throttle will be at its target setting and will remain there until (hopefully) the transition speed is reached.

#### 블렌딩 속도

Parameter: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

By default, as the airspeed gets close to the transition speed, multirotor attitude control will be reduced and fixed wing control will start increasing continuously until the transition occurs.

Disable blending by setting this parameter to 0 which will keep full multirotor control and zero fixed wing control until the transition occurs.

#### 천이 속도

Parameter: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

This is the airspeed which, when reached, will trigger the transition out of multirotor mode into fixed wing mode. It is critical that you have properly calibrated your airspeed sensor. It is also important that you pick an airspeed that is comfortably above your airframes stall speed (check `FW_AIRSPD_MIN`) as this is currently not checked.

#### 고정 날개 영구 안정화

Parameter: [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB)

Activating permanent stabilisation will result in fixed wing flight being stabilised by the autopilot at all times. As soon as a transition to fixed wing occurs it will be stabilised.

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
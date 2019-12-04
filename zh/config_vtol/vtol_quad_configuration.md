# QuadPlane VTOL 配置 & 调参

这是一份垂直起降固定翼飞行器的的配置文档（固定翼+四旋翼）。 对于具体的机型和构建指南请看[VTOL Framebuilds](../frames_vtol/README.md)。

## 固件 & 基础设置

1. 运行 *QGroundControl*
2. 刷固件
3. 再启动界面选择合适的VTOL机型，如果你的机型没有列出的话，请选择Fun Cub VTOL机型。 

### 飞行模式/模式转换

In *QGroundControl* assign a switch of your remote to the transition function during the RC calibration step or by setting [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW).

这个按钮可以让你在固定翼和多旋翼两个模式进行切换。 The switch in the off-position means that you are flying in multicopter mode.

### 多旋翼/固定翼调参

Before you attempt your first transition to fixed wing flight you need to make absolutely sure that your VTOL is well tuned in multirotor mode. One reason is this is the mode you will return to if something goes wrong with a transition and it could be it will be moving fairly quickly already. 如果你多旋翼模式没调好的话，可能会炸机。

If you have a runway available and the total weight isn’t too high you will also want to tune fixed wing flight as well. If not then you will be attempting this when it switches to fixed wing mode. If something goes wrong you need to be ready (and able) to switch back to multirotor mode.

Follow the the respective tuning guides on how to tune multirotors and fixed wings.

### 转换调参

While it might seem that you are dealing with a vehicle that can fly in two modes (multirotor for vertical takeoffs and landings and fixed wing for forwards flight) there is an additional state you also need to tune: transition.

Getting your transition tuning right is important for obtaining a safe entry into fixed wing mode, for example, if your airspeed is too slow when it transitions it might stall.

#### 过渡阶段油门

Parameter: [VT_TRANS_THR](../advanced_config/parameter_reference.md#VT_TRANS_THR)

Transition throttle defines the maximum throttle to use during the transition. Don’t set this too low otherwise you will never reach the transition airspeed. If you set it too high it will just use more power than you may want. For your first transition you are better off higher than lower here.

#### 前转换时间

Parameter: [VT_F_TRANS_DUR](../advanced_config/parameter_reference.md#VT_F_TRANS_DUR)

A forward transition refers to the transition from multirotor to fixed wing mode. This is the amount of time in seconds that should be spent ramping up the throttle to the target value (defined by `VT_TRANS_THR`). A value of 0 will result in commanding the transition throttle value being set immediately. If you wish to smooth the throttling up you can increase this to a larger value, such as 3.

Note that once the ramp up period ends throttle will be at its target setting and will remain there until (hopefully) the transition speed is reached.

#### 混合控制空速

Parameter: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

By default, as the airspeed gets close to the transition speed, multirotor attitude control will be reduced and fixed wing control will start increasing continuously until the transition occurs.

Disable blending by setting this parameter to 0 which will keep full multirotor control and zero fixed wing control until the transition occurs.

#### 转换空速

Parameter: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

This is the airspeed which, when reached, will trigger the transition out of multirotor mode into fixed wing mode. It is critical that you have properly calibrated your airspeed sensor. It is also important that you pick an airspeed that is comfortably above your airframes stall speed (check `FW_AIRSPD_MIN`) as this is currently not checked.

#### 固定翼永久稳定模式

Parameter: [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB)

Activating permanent stabilisation will result in fixed wing flight being stabilised by the autopilot at all times. As soon as a transition to fixed wing occurs it will be stabilised.

Note that if you have not yet tuned your fixed wing mode you should leave this off until you are sure it behaves well in this mode.

### 过渡模式小提示 {#transitioning_tips.sectionedit9}

As already mentioned make sure you have a well tuned multirotor mode. If during a transition something goes wrong you will switch back to this mode and it should be quite smooth.

Before you fly have a plan for what you will do in each of the three phases (multirotor, transition, fixed wing) when you are in any of them and something goes wrong.

Battery levels: leave enough margin for a multirotor transition for landing at the end of your flight. Don’t run your batteries too low as you will need more power in multirotor mode to land. Be conservative.

#### 过渡模式：

Make sure you are at least 20 meters above ground and have enough room to complete a transition. It could be that your VTOL will lose height when it switches to fixed wing mode, especially if the airspeed isn’t high enough.

Transition into the wind, whenever possible otherwise it will travel further from you before it transitions.

Make sure the VTOL is in a stable hover before you start the transition.

#### 过渡：从多旋翼过渡到固定翼模式（前过渡）

Start your transition. It should transition within 50 – 100 meters. If it doesn’t or it isn’t flying in a stable fashion abort the transition (see below) and land or hover back to the start position and land. Try increasing the transition throttle (`VT_TRANS_THR`) value. Also consider reducing the transition duration (`VT_F_TRANS_DUR`).

As soon as you notice the transition happen be ready to handle height loss which may include throttling up quickly.

> **Caution** The following feature has been discussed but not implemented yet: Once the transition happens the multirotor motors will stop and the pusher/puller throttle will remain at the `VT_TRANS_THR` level until you move the throttle stick, assuming you are in manual mode.

#### 过渡：从固定翼模式过渡到多旋翼模式（后转换）

When you transition back to multirotor mode bring your aircraft in on a straight level approach and reduce its speed, flip the transition switch and it will start the multirotor motors and stop the pusher/puller prop immediately and should result in a fairly smooth gliding transition.

Consider that the throttle value you have when you transition will command the amount of thrust your multirotor has at the moment of the switch. Because the wing will still be flying you’ll find you have plenty of time to adjust your throttle to achieve/hold a hover.

For advanced tuning of the back-transition please refer to the [Back-transition Tuning Guide](vtol_back_transition_tuning.md)

#### 紧急切出过渡模式 {#aborting_a_transition}

It’s important to know what to expect when you revert a transition command *during* a transition.

When transitioning from **multirotor to fixed wing** (transition switch is on/fixed wing) then reverting the switch back (off/multirotor position) *before* the transition happens it will immediately return to multirotor mode.

When transitioning from **fixed wing to multirotor** for this type of VTOL the switch is immediate so there isn’t really a backing out option here, unlike for tilt rotor VTOLs. If you want it to go back into fixed wing you will need to go through the full transition. If it’s still travelling fast this should happen quickly.

### 技术支持

If you have any questions regarding your VTOL conversion or configuration please see <https://discuss.px4.io/c/px4/vtol>.
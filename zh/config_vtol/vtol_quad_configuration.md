# 垂直起降固定翼配置 & 调参

这是一份垂直起降固定翼飞行器的的配置文档（固定翼+四旋翼）。 对于具体的机型和构建指南请看[VTOL Framebuilds](../frames_vtol/README.md)。

## 固件 & 基础设置

1. 运行 *QGroundControl*
2. 刷固件
3. 再启动界面选择合适的VTOL机型，如果你的机型没有列出的话，请选择Fun Cub VTOL机型。 

### 飞行模式/模式转换

在 *QGroundControl* 地面站中在进行RC遥控器校准的时候给你的遥控器设置一个四旋翼-固定翼模式转换按钮，或者通过调整参数 [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW)来设置这个按钮也行。

这个按钮可以让你在固定翼和多旋翼两个模式进行切换。 这个按钮在关闭的时候是多旋翼模式。

### 多旋翼/固定翼调参

在你尝试着第一次从多旋翼模式转换到固定翼模式之前，你需要先确保你的VTOL飞机在多旋翼模式已经调好了。 这样做的原因之一是，如果转换出了问题 ，它可以安全地以多旋翼模式返航。 如果你多旋翼模式没调好的话，可能会炸机。

如果你有跑道并且起飞重量不是太大的话，你最好也把固定翼模式调好。 如果你还没调好的话，你可以把它调到固定翼模式来搞这个。 如果出了什么问题，你要随时准备切换回多旋翼模式。

请遵循固定翼和多旋翼的调参指南分别把两种模式的参数调好。

### 转换调参

尽管你看起来好像是在玩一个可以在两种模式下飞行的飞机（多旋翼模式起降、固定翼模式前飞），但实际上你还有一个中间状态要调整：转换状态。 把转换模式调好对于安全地切入固定翼模式是很重要的，举个例子，如果你的空速太低的话在转换时飞机有可能会失速。

#### 过渡阶段油门

参数: [VT_TRANS_THR](../advanced_config/parameter_reference.md#VT_TRANS_THR)

过渡油门定义了在过渡过程中的最大油门。 这个值不要设的太低，否则你可能会永远达不到转换空速。 如果你把这个值设得太高的话，飞机可能会使用比你预计的更多的能量。 对于你的第一次模式切换来说，这个值高了要比低了好。

#### 前转换时间

参数: [VT_F_TRANS_DUR](../advanced_config/parameter_reference.md#VT_F_TRANS_DUR)

前转换指的是从多旋翼模式转换到固定翼模式。 这个参数是你从转换到到达最大油门所用的秒数。（用 `VT_TRANS_THR`来定义） 设为0意味着转换时的油门立刻达到设定值。 如果你希望这个过程平滑一点的话你可以设一个大一点的值，比如说3.

注意一旦加速阶段结束，油门会达到设定值并且会保持这个值直到飞机飞到转换空速。

#### 混合控制空速

参数: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

默认情况下，当空速接近转换控诉的时候，多旋翼的姿态控制会减弱，而固定翼的控制则会开始增加，直到转换完成。

把这个值设为0，在转换之前将完全使用多旋翼控制，完全不使用固定翼控制，直到转换完成。

#### 转换空速

参数: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

当达到这个空速的时候，飞机将会从多旋翼模式转换到固定翼模式。 把空速计调好是非常重要的。 你是否选择了一个高于你飞机失速速度（检查一下参数FW\_AIRSPD\_MIN）的转换空速也是非常重要的，因为这一点目前还没法自动检查。

#### Fixed Wing Permanent Stabilisation

参数: [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB)

打开永久稳定模式将会使固定翼一直在自稳模式下飞行。 只要转换到固定翼模式，他就会自动自稳。

注意如果你还没有调过你的固定翼，你应该把这个模式关掉，直到你确定了你能在这种模式下飞得很好。

### 过渡模式小提示 {#transitioning_tips.sectionedit9}

正如之前已经说过的，确保你的多旋翼模式已经调好了。 If during a transition something goes wrong you will switch back to this mode and it should be quite smooth.

Before you fly have a plan for what you will do in each of the three phases (multirotor, transition, fixed wing) when you are in any of them and something goes wrong.

Battery levels: leave enough margin for a multirotor transition for landing at the end of your flight. Don’t run your batteries too low as you will need more power in multirotor mode to land. Be conservative.

#### Transition: Getting Ready

Make sure you are at least 20 meters above ground and have enough room to complete a transition. It could be that your VTOL will lose height when it switches to fixed wing mode, especially if the airspeed isn’t high enough.

Transition into the wind, whenever possible otherwise it will travel further from you before it transitions.

Make sure the VTOL is in a stable hover before you start the transition.

#### Transition: Multirotor to Fixed Wing (Front-transition)

Start your transition. It should transition within 50 – 100 meters. If it doesn’t or it isn’t flying in a stable fashion abort the transition (see below) and land or hover back to the start position and land. Try increasing the transition throttle (`VT_TRANS_THR`) value. Also consider reducing the transition duration (`VT_F_TRANS_DUR`).

As soon as you notice the transition happen be ready to handle height loss which may include throttling up quickly.

> **Caution** The following feature has been discussed but not implemented yet: Once the transition happens the multirotor motors will stop and the pusher/puller throttle will remain at the `VT_TRANS_THR` level until you move the throttle stick, assuming you are in manual mode.

#### Transition: Fixed Wing to Multirotor (Back-transition)

When you transition back to multirotor mode bring your aircraft in on a straight level approach and reduce its speed, flip the transition switch and it will start the multirotor motors and stop the pusher/puller prop immediately and should result in a fairly smooth gliding transition.

Consider that the throttle value you have when you transition will command the amount of thrust your multirotor has at the moment of the switch. Because the wing will still be flying you’ll find you have plenty of time to adjust your throttle to achieve/hold a hover.

For advanced tuning of the back-transition please refer to the [Back-transition Tuning Guide](vtol_back_transition_tuning.md)

#### Aborting a Transition {#aborting_a_transition}

It’s important to know what to expect when you revert a transition command *during* a transition.

When transitioning from **multirotor to fixed wing** (transition switch is on/fixed wing) then reverting the switch back (off/multirotor position) *before* the transition happens it will immediately return to multirotor mode.

When transitioning from **fixed wing to multirotor** for this type of VTOL the switch is immediate so there isn’t really a backing out option here, unlike for tilt rotor VTOLs. If you want it to go back into fixed wing you will need to go through the full transition. If it’s still travelling fast this should happen quickly.

### 技术支持

If you have any questions regarding your VTOL conversion or configuration please visit <http://discuss.px4.io/c/vtol>.

 
---
canonicalUrl: https://docs.px4.io/main/ja/config_vtol/vtol_quad_configuration
---

# QuadPlane VTOL Configuration & Tuning

This is the configuration documentation for a QuadPlane VTOL setup (Plane combined with Quadcopter). For airframe specific documentation and build instructions see [VTOL Framebuilds](../frames_vtol/README.md).

## Firmware & Basic Settings

1. Run *QGroundControl*
2. Flash the master firmware
3. In the Setup tab select the appropriate VTOL airframe, if your airframe is not listed select the Fun Cub VTOL airframe.

### Flight / Transition Mode Switch

In *QGroundControl* assign a switch of your remote to the transition function during the RC calibration step or by setting [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW).

This allows you to switch between the multicopter- and fixed wing mode. The switch in the off-position means that you are flying in multicopter mode.

### Multirotor / Fixed Wing Tuning

Before you attempt your first transition to fixed wing flight you need to make absolutely sure that your VTOL is well tuned in multirotor mode. One reason is this is the mode you will return to if something goes wrong with a transition and it could be it will be moving fairly quickly already. If it isn’t well tuned bad things might happen.

If you have a runway available and the total weight isn’t too high you will also want to tune fixed wing flight as well. If not then you will be attempting this when it switches to fixed wing mode. If something goes wrong you need to be ready (and able) to switch back to multirotor mode.

Follow the respective tuning guides on how to tune multirotors and fixed wings.

### Transition Tuning

While it might seem that you are dealing with a vehicle that can fly in two modes (multirotor for vertical takeoffs and landings and fixed wing for forwards flight) there is an additional state you also need to tune: transition.

Getting your transition tuning right is important for obtaining a safe entry into fixed wing mode, for example, if your airspeed is too slow when it transitions it might stall.

<span id="transition_throttle"></span>

#### Transition Throttle

Parameter: [VT_F_TRANS_THR](../advanced_config/parameter_reference.md#VT_F_TRANS_THR)

Front transition throttle defines the target throttle for the pusher/puller motor during the front transition.

This must be set high enough to ensure that the transition airspeed is reached. If your vehicle is equipped with an airspeed sensor then you can increase this parameter to make the front transition complete faster. For your first transition you are better off setting the value higher than lower.

Parameter: [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR)

Generally back-transition throttle can be set to 0 since forward thrust is not (in most cases) desirable. If the motor controller supports reverse thrust however, you can achieve this by setting a negative value.

#### Forward Transition Pusher/Puller Ramp-up Time

Parameter: [VT_PSHER_RMP_DT](../advanced_config/parameter_reference.md#VT_PSHER_RMP_DT)

A forward transition refers to the transition from multirotor to fixed wing mode. This is the amount of time in seconds that should be spent ramping up the throttle to the target value (defined by `VT_F_TRANS_THR`). A value of 0 will result in commanding the transition throttle value being set immediately. If you wish to smooth the throttling up you can increase this to a larger value, such as 3.

Note that once the ramp up period ends throttle will be at its target setting and will remain there until (hopefully) the transition speed is reached.

#### Blending Airspeed

Parameter: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

By default, as the airspeed gets close to the transition speed, multirotor attitude control will be reduced and fixed wing control will start increasing continuously until the transition occurs.

Disable blending by setting this parameter to 0 which will keep full multirotor control and zero fixed wing control until the transition occurs.

#### Transition Airspeed

Parameter: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

This is the airspeed which, when reached, will trigger the transition out of multirotor mode into fixed wing mode. It is critical that you have properly calibrated your airspeed sensor. It is also important that you pick an airspeed that is comfortably above your airframes stall speed (check `FW_AIRSPD_MIN`) as this is currently not checked.

#### Fixed Wing Permanent Stabilisation

Parameter: [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB)

Activating permanent stabilisation will result in fixed wing flight being stabilised by the autopilot at all times. As soon as a transition to fixed wing occurs it will be stabilised.

Note that if you have not yet tuned your fixed wing mode you should leave this off until you are sure it behaves well in this mode.

<span id="transitioning_tips"></span>

### Transitioning Tips

As already mentioned make sure you have a well tuned multirotor mode. If during a transition something goes wrong you will switch back to this mode and it should be quite smooth.

Before you fly have a plan for what you will do in each of the three phases (multirotor, transition, fixed wing) when you are in any of them and something goes wrong.

Battery levels: leave enough margin for a multirotor transition for landing at the end of your flight. Don’t run your batteries too low as you will need more power in multirotor mode to land. Be conservative.

#### Transition: Getting Ready

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

### Support

If you have any questions regarding your VTOL conversion or configuration please see <https://discuss.px4.io/c/px4/vtol>.
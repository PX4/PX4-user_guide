# Multicopter PID Tuning Guide

## Multicopter Flight Controller Tuning Guide

> **Warning** This guide is for advanced users / experts only. If you don’t understand
  what a PID tuning is you might crash your aircraft.

&nbsp;
> **Warning** NEVER do multirotor tuning with carbon fiber or
carbon fiber reinforced blades. NEVER use damaged blades.

&nbsp;
> **Note** For SAFETY reason, the default gains are set to
small value. You HAVE TO increase the gains before you can expect any
control responses. 

This tutorial is valid for all multi rotor setups (AR.Drone, PWM Quads /
Hexa / Octo setups). **P**roportional, **I**ntegral, **D**erivative
controllers are the most widespread control technique. There are
substantially better performing control techniques (LQR/LQG) from the
model predictive control, since these techniques require a more or less
accurate model of the system, they not as widely used. The goal of all
PX4 control infrastructure is move as soon as possible on MPC, since not
for all supported systems models are available, PID tuning is very
relevant (and PID control sufficient for many cases).

## Introduction 

The PX4 `multirotor_att_control` app executes an outer loop of
orientation controller, controlled by parameters:

- Roll control (MC_ROLL_P)
- Pitch control (MC_PITCH_P)
- Yaw control (MC_YAW_P)

And an inner loop with three independent PID controllers to control the
attitude rates:

- Roll rate control (MC_ROLLRATE_P, MC_ROLLRATE_I, MC_ROLLRATE_D)
- Pitch rate control (MC_PITCHRATE_P, MC_PITCHRATE_I, MC_PITCHRATE_D)
- Yaw rate control (MC_YAWRATE_P, MC_YAWRATE_I, MC_YAWRATE_D)

The outer loop's output are desired body rates (e.g. if the multirotor
should be level but currently has 30 degrees roll, the control output
will be e.g. a rotation speed of 60 degrees per second). The inner rate
control loop changes the rotor motor outputs so that the copter rotates
with the desired angular speed.

The gains actually have an intuitive meaning, e.g.: if the MC_ROLL_P
gain is 6.0, the copter will try to compensate 0.5 radian offset in
attitude (\~30 degrees) with 6 times the angular speed, i.e. 3 radians/s
or \~170 degrees/s. Then if gain for the inner loop MC_ROLLRATE_P is
0.1 then thrust control output for roll will be 3 \* 0.1 = 0.3. This
means that it will lower the speed of rotors on one side by 30% and
increase the speed on the other one to induce angular momentum in order
to go back to level.

There is also MC_YAW_FF parameter that controls how much of user input
need to feed forward to yaw rate controller. 0 means very slow control,
controller will start to move yaw only when sees yaw position error, 1
means very responsive control, but with some overshot, controller will
move yaw immediately, always keeping yaw error near zero.


#### Motor Band / Limiting

As the above example illustrates, under certain conditions it would be
possible that one motor gets an input higher than its maximum speed and
another gets an input lower than zero. If this happens, the forces
created by the motors violate the control model and the multi rotor will
likely flip. To prevent this, the multi rotor mixers on PX4 include a
band-limit. If one of the rotors leaves this safety band, the total
thrust of the system is lowered so that the relative percentage that the
controller did output can be satisfied. As a result the multi rotor
might not climb or lose altitude a bit, but it will never flip over. The
same for lower side, even if commanded roll is large, it will be scaled
to not exceed commanded summary thrust and copter will not flip on
takeoff at near-zero thrust.

### Step 1: Preparation

First of all set all parameters to initial values:

1. Set all MC_XXX_P to zero (ROLL, PITCH, YAW)
2. Set all MC_XXXRATE_P, MC_XXXRATE_I, MC_XXXRATE_D to zero,
   except MC_ROLLRATE_P and MC_PITCHRATE_P
3. Set MC_ROLLRATE_P and MC_PITCHRATE_P to a small value, e.g. 0.02
4. Set MC_YAW_FF to 0.5

All gains should be increased very slowly, by 20%-30% per iteration, and
even 10% for final fine tuning. Note, that too large gain (even only
1.5-2 times more than optimal!) may cause very dangerous oscillations!


### Step 2: Stabilize Roll and Pitch Rates

#### P Gain Tuning

Parameters: MC_ROLLRATE_P, MC_PITCHRATE_P.

If copter is symmetrical, then values for ROLL and PITCH should be
equal, if not - then tune it separately.

Keep the multi rotor in your hand and increase the thrust to about 50%,
so that the weight is virtually zero. Tilt it in roll or pitch
direction, and observe the response. It should mildly fight the motion,
but it will NOT try to go back to level. If it oscillates, tune down
RATE_P. Once the control response is slow but correct, increase RATE_P
until it starts to oscillate. Cut back RATE_P until it does only mildly
oscillate or not oscillate any more (about 10% cutback), just
over-shoots. Typical value is around 0.1.

#### D Gain Tuning

Parameters: MC_ROLLRATE_D, MC_PITCHRATE_D.

Assuming the gains are in a state where the multi rotor oscillated and
RATE\_P was slightly reduced. Slowly increase RATE\_D, starting from
0.01. Increase RATE\_D to stop the last bit of oscillation. If the
motors become twitchy, the RATE\_D is too large, cut it back. By playing
with the magnitudes of RATE\_P and RATE\_D the response can be
fine-tuned. Typical value is around 0.01…0.02.

In QGroundControl you can plot roll and pitch rates
(ATTITUDE.rollspeed/pitchspeed). It must not oscillate, but some
overshot (10-20%) is ok.


#### I Gain Tuning

If the roll and pitch rates never reach the setpoint but have an offset,
add MC_ROLLRATE_I and MC_PITCHRATE_I gains, starting at 5-10% of the
MC_ROLLRATE_P gain value.

### Step 3: Stabilize Roll and Pitch Angles {#step_3stabilize_roll_and_pitch_angles .sectionedit5}

#### P Gain Tuning

Parameters: MC_RATE_P, MC_RATE_P.

- Set MC_ROLL_P and MC_PITCH_P to a small value, e.g. 3

Keep the multi rotor in your hand and increase the thrust to about 50%,
so that the weight is virtually zero. Tilt it in roll or pitch
direction, and observe the response. It should go slowly back to level.
If it oscillates, tune down P. Once the control response is slow but
correct, increase P until it starts to oscillate. Optimal response is
some overshot (\~10-20%). After getting stable response fine tune
RATE_P, RATE_D again.

In QGroundControl you can plot roll and pitch (ATTITUDE.roll/pitch) and
control (ctrl0, ctrl1). Attitude angles overshot should be not more than
10-20%.


### Step 4: Stabilize Yaw Rate

#### P Gain Tuning

Parameters: MC_YAWRATE_P.

- Set MC_YAWRATE_P to small value, e.g. 0.1

Keep the multi rotor in your hand and increase the thrust to about 50%,
so that the weight is virtually zero. Turn it around its yaw axis,
observe the response. The motor sound should change and the system
should fight the yaw rotation. The response will be substantially weaker
than roll and pitch, which is fine. If it oscillates or becomes twitchy,
tune down RATE_P. If response is very large even on small movements
(full throttle spinning vs idle spinning propellers) reduce RATE_P.
Typical value is around 0.2…0.3.

The yaw rate control, if very strong or oscillating, can deteriorate the
roll and pitch response. Check the total response by turning around,
roll, pitch and yaw.


### Step 5: Stabilize Yaw Angle


#### P Gain Tuning

Parameters: MC_YAW_P.

- Set MC_YAW_P to a low value, e.g. 1

Keep the multi rotor in your hand and increase the thrust to about 50%,
so that the weight is virtually zero. Rotate it around yaw, and observe
the response. It should go slowly back to the initial heading. If it
oscillates, tune down P. Once the control response is slow but correct,
increase P until the response is firm, but it does not oscillate.
Typical value is around 2…3.

Look at ATTITUDE.yaw in QGroundControl. Yaw overshot should be not more
than 2-5% (less than for attitude).


#### Feed Forward Tuning

Parameters: MC_YAW_FF.

This parameter is not critical and can be tuned in flight, in worst case
yaw response will be sluggish or too fast. Play with FF parameter to get
comfortable response. Valid range is 0…1. Typical value is 0.8…0.9. (For
aerial video optimal value may be much smaller to get smooth response.)

Look at ATTITUDE.yaw in QGroundControl. Yaw overshot should be not more
than 2-5% (less than for attitude).

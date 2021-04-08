# Geometry Files

- Associated dev guide issue: https://github.com/PX4/PX4-Devguide/issues/349
- Geometry files are found here: https://github.com/PX4/PX4-Autopilot/tree/master/src/lib/mixer/MultirotorMixer/geometries
- They are TOML files

@[youtube](https://youtu.be/orvng_11ngQ?t=1080) - Control Allocation - 18 minute in.

[Slide 14 has info](https://static.sched.com/hosted_files/px4developersummitvirtual2020/1b/PX4%20Developer%20Summit%202020%20-%20Overview%20of%20multicopter%20control%20from%20sensors%20to%20motors.pdf)

<!-- stuff just copied from the slide
In a nutshell
Desired forces
and torques (m)
?
Actuator
outputs (u)
Control allocation
matrix
Actuator
effectiveness
matrix (B)
Inverse
Control
allocation
Matrix (P=B
+
Moore-Penrose )
-->


## How to add a new geometry

1. Create new TOML geometry file in [/src/lib/mixer/MultirotorMixer/geometries](https://github.com/PX4/PX4-Autopilot/tree/master/src/lib/mixer/MultirotorMixer/geometries).
   For example "foo.toml".
   with a new key (e.g.: key = "4fo") and add to **CMakeLists.txt** <!-- which one? -->

2. In ROMFS/px4fmu_common/Create new mixer file **mixers/foo.main.mix** with a line containing the new key:
   ```
   R 4fo 10000 10000 10000 0  
   ```
   <!-- There was a comment that the numbers are not needed? Why are they needed in quad then -->
3. Set the new mixer in **init.d/airframes/myconfig**
   ```
   set MIXER foo
   ```
   
   
## Fragment from some files

Looking at the toml files they all have this first. So I am assuming file description follwed by info. 
- Is key random?
- Where is the description used?

```
# Generic Quadcopter in H configuration

[info]
key = "4h"
description = "Generic Quadcopter in H configuration"
```
Then we have rotor default which always has this structure
```
[rotor_default]
axis      = [0.0, 0.0, -1.0]
Ct        = 1.0
Cm        = 0.05

direction = "CW" - except I Only see THIS line on Tri
```
Then we have one of these for each rotor - so 3 for a tri
```
[[rotors]]
name      = "front_right_top"
position  = [0.729, 0.684, 0.1]
direction = "CW"
```

- How do I work out what each of these fields mean?
- Are there geometries we can't capture? ie what if roto is on angle say?
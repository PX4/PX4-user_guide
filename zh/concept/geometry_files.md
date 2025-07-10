---
canonicalUrl: https://docs.px4.io/main/zh/concept/geometry_files
---

# Multicopter Geometry Files

:::note
Mixer files will be replaced by [Control Allocation](../concept/control_allocation.md) parameters in the next version (after PX4 v1.13). You can enable control allocation in PX4 v1.13 by setting [SYS_CTRL_ALLOC=1](../advanced_config/parameter_reference.md#SYS_CTRL_ALLOC).
:::

Geometry files are used by PX4 to generate mixer definitions that map the outputs of PX4 rate controllers to specific motors. The files describe the positions, direction of thrust, rotation direction, thrust and drag coefficients of each of the rotors.

## How to add a New Geometry

1. Create new TOML geometry file (e.g. "foo.toml") in [/src/lib/mixer/MultirotorMixer/geometries](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/lib/mixer/MultirotorMixer/geometries). The file must include a new **key** (e.g.: `key = "4fo"`). See [Geometry File Format](#geometry-file-format) for information on the required fields.
1. Add the geometry file to [/src/lib/mixer/MultirotorMixer/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/mixer/MultirotorMixer/CMakeLists.txt).
1. Create a new [mixer file](../concept/mixing.md) that uses the new geometry. For example you might create **ROMFS/px4fmu_common/mixers/foo.main.mix** with a line containing the new key (in this case `4fo`):
   ```
   R 4fo
   ```
1. Set the new mixer in your [airframe configuration](../dev_airframes/adding_a_new_frame.md#add-new-airframe-to-qgroundcontrol) (e.g. **init.d/airframes/myconfig**)
   ```
   set MIXER foo
   ```

## Geometry File Format

Geometry files are plain-text files that are divided into sections deliniated by the headers: `[info]`, `[rotor_default]`, and `[[rotor]]` (there is a `[[rotor]]` section for each rotor in the geometry).

The fields allowed in each section are listed below (as defined in the [px_generate_mixers.py](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/mixer/MultirotorMixer/geometries/tools/px_generate_mixers.py) script).


### [info] section

The `[info]` section identifies the files for readers and for PX4.

It must define values for:
- **key:** An arbitrary identifier to allow the file to be distinguished from other geometry files. By convention the key is usually the number of rotors followed by one or two letters (these letters _may_ hint at the configuration). For example: "4hb"
- **description:** A human readable description of the configuration described by the geometry file. For example: "Generic Quadcopter in H configuration"



### [rotor_default]

The `[rotor_default]` section specifies default values will be applied to a rotor if the corresponding key is not provided in the `[[rotor]]` definition. For example, the rotation direction might be defined for every rotor, or a default might be specified in th

The allowed keys are described in the `[[rotor]]` section below (noting that it doesn't make sense to define a default value for a key like *name* that is unique to each rotor).

### [[rotor]]

Each `[rotor]` section describes the geometry values for a rotor. Default values may be supplied in `[rotor_default]` (the values in the rotor section take precedence).

The allowed keys are:
- **name:** Human-readable name for the rotor. For example: "front_right_top"
- **position:** A vector describing the location of the rotor relative to the vehicle centre of gravity in the body frame (Forward-Right-Down). This can be any units (e.g. metres, fathoms, whatever) because the mixer is normalised (only only the ratio between the distances is really important).
- **axis:** A vector in the in the body frame (Forward-Right-Down) describing the direction of the thrust produced by the rotor. For example `[1.0, 0.0, -1.0]` means that the rotor produces upward and forward thrust equally (i.e.: angle of 45 degrees).
- **direction:** specifies the direction of rotation of a rotor, `CW` (clockwise) or `CCW` (counter clockwise)
- **Ct:** Non-dimensional thrust coefficient. For example, a rotor with a `Ct` of 2.0 produces 2 times the thrust of a rotor with a `Ct` of 1.0
- **Cm:** Non-dimensional drag torque coefficient. This relates to the axial torque produced by a spinning propeller. This needs to be set relative to `Ct` if some torque can be produced by drag and thrust together. If set to 0, the mixer will assume that the rotor does not produce any axial torque.


## Example File

There are numerous examples in the source tree: [/src/lib/mixer/MultirotorMixer/geometries/](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/mixer/MultirotorMixer/geometries/).

A tri-copter geometry ([tri_y.toml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/mixer/MultirotorMixer/geometries/tri_y.toml)) is reproduced below.

```
# Tri Y

[info]
key = "3y"
description = "Tri Y"

[rotor_default]
axis      = [0.0, 0.0, -1.0]
Ct        = 1.0
Cm        = 0.0
direction = "CW"

[[rotors]]
name      = "front_right"
position  = [0.5, 0.866025, 0.0]

[[rotors]]
name      = "front_left"
position  = [0.5, -0.866025, 0.0]

[[rotors]]
name      = "rear"
position  = [-1.0, 0.0, 0.0]
```


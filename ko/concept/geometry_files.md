# 멀티콥터 지오메트리 파일

지오메트리 파일은 PX4 속도 콘트롤러의 출력을 특정 모터에 매핑하는 믹서를 정의합니다. 파일은 각 로터의 위치, 추력 방향, 회전 방향, 추력 및 항력 계수를 기술합니다.

## 신규 지오메트리 추가 방법

1. [/src/lib/mixer/MultirotorMixer/geometry](https://github.com/PX4/PX4-Autopilot/tree/master/src/lib/mixer/MultirotorMixer/geometries)에 새 TOML 지오메트리 파일(예: "foo.toml")을 생성합니다. 파일에는 새로운 **키**가 포함되어야 합니다(예: `key = "4fo"`). 필수 필드에 대한 정보는 [기하학 파일 형식](#geometry-file-format)을 참고하십시오.
1. [/src/lib/mixer/MultirotorMixer/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/mixer/MultirotorMixer/CMakeLists.txt)에 지오메트리 파일을 추가합니다.
1. 새 지오메트리를 사용하는 새로운 [믹서 파일](../concept/mixing.md)을 생성합니다. 예를 들어 새로운 키(이 경우 `4fo`)가 포함된 행으로 **ROMFS/px4fmu_common/mixers/foo.main.mix**를 만들 수 있습니다.
   ```
   R 4fo
   ```
1. [기체 설정](../dev_airframes/adding_a_new_frame.md#add-new-airframe-to-qgroundcontrol)에서 새 믹서를 설정합니다(예: **init.d/airframes/myconfig**).
   ```
   set MIXER foo
   ```

## 지오메트리 파일 형식

지오메트리 파일은 `[info]`, `[rotor_default]` 및 `[[rotor]]` 헤더로 구분되는 섹션으로 구분되는 일반 텍스트 파일입니다(지오메트리의 각 로터에 대한 `[[rotor]]` 섹션이 있음).

각 섹션에서 허용되는 필드는 아래에 나열되어 있습니다([px_generate_mixers.py](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/mixer/MultirotorMixer/geometries/tools/px_generate_mixers.py) 스크립트에 정의됨).


### [info] section

`[info]` 섹션은 리더 및 PX4용 파일을 식별합니다.

다음 값들을 정의하여야 합니다.
- **key:** 파일이 다른 기하 도형 파일과 구별될 수 있도록 하는 임의의 식별자입니다. 관례에 따라 키는 일반적으로 로터의 수와 그 뒤에 하나 또는 두 개의 문자가 있습니다(이 문자는 설정을 암시할 수 _있습니다_). 예: "4hb"
- **description:** 지오메트리 파일에 설정에 대하여 사람이 읽을 수 있는 설명입니다. 예: "H 구성의 일반 쿼드콥터"



### [rotor_default]

`[rotor_default]` 섹션은 해당 키가 `[[rotor]]` 정의에 제공되지 않은 경우에는 로터에 기본값이 적용되도록 지정합니다. 예를 들어, 회전 방향은 모든 로터에 대해 정의되거나 기본값이 지정될 수 있습니다.

허용되는 키는 아래 `[[rotor]]` 섹션에 설명되어 있습니다(고유한 *name*과 같은 키에 대한 기본값을 정의하는 것은 의미가 없습니다.

### [[rotor]]

각 `[rotor]` 섹션은 로터의 지오메트리 값을 설명합니다. 기본값은 `[rotor_default]`에 제공될 수 있습니다(로터 섹션의 값이 우선함).

허용되는 키는 다음과 같습니다.
- **name:** Human-readable name for the rotor. For example: "front_right_top"
- **position:** A vector describing the location of the rotor relative to the vehicle centre of gravity in the body frame (Forward-Right-Down). This can be any units (e.g. metres, fathoms, whatever) because the mixer is normalised (only only the ratio between the distances is really important).
- **axis:** A vector in the in the body frame (Forward-Right-Down) describing the direction of the thrust produced by the rotor. For example `[1.0, 0.0, -1.0]` means that the rotor produces upward and forward thrust equally (i.e.: angle of 45 degrees).
- **direction:** specifies the direction of rotation of a rotor, `CW` (clockwise) or `CCW` (counter clockwise)
- **Ct:** Non-dimensional thrust coefficient. For example, a rotor with a `Ct` of 2.0 produces 2 times the thrust of a rotor with a `Ct` of 1.0
- **Cm:** Non-dimensional drag torque coefficient. This relates to the axial torque produced by a spinning propeller. This needs to be set relative to `Ct` if some torque can be produced by drag and thrust together. If set to 0, the mixer will assume that the rotor does not produce any axial torque.


## Example File

There are numerous exmaples in the source tree: [/src/lib/mixer/MultirotorMixer/geometries/](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/mixer/MultirotorMixer/geometries/).

A tri-copter geometry ([tri_y.toml](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/mixer/MultirotorMixer/geometries/tri_y.toml)) is reproduced below.

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


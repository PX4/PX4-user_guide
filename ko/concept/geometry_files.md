---
canonicalUrl: https://docs.px4.io/main/ko/concept/geometry_files
---

# 멀티콥터 지오메트리 파일

:::note
Mixer files will be replaced by [Control Allocation](../concept/control_allocation.md) parameters in the next version (after PX4 v1.13). You can enable control allocation in PX4 v1.13 by setting [SYS_CTRL_ALLOC=1](../advanced_config/parameter_reference.md#SYS_CTRL_ALLOC).
:::

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

허용되는 키들은 다음과 같습니다.
- **name:** 사람이 읽을 수 있는 로터의 이름입니다. 예: "front_right_top"
- **position:** 차체 프레임에서 기체 무게 중심을 기준으로 로터의 위치를 설명하는 벡터입니다(앞-오른쪽-아래). 이것은 믹서가 정규화되어 있으므로, 어떤 단위(예: 미터, 패덤, 무엇이든)든지 상관없습니다(거리 사이의 비율이 중요함).
- **axis:** 로터에 의해 생성된 추력의 방향을 설명하는 몸체 프레임 벡터(전방-우향-하향). 예를 들어 `[1.0, 0.0, -1.0]`은 로터가 상향 및 전방 추력을 동일하게 생성함을 의미합니다(예: 각도 45도).
- **direction:** 로터의 회전 방향을 지정합니다. `CW`(시계 방향) 또는 `CCW`(반시계 방향)
- **Ct:** 무차원 추력 계수. 예를 들어, `Ct`가 2.0인 로터는 `Ct`가 1.0인 로터보다 2배의 추력을 생성합니다.
- **Cm:** 무차원 드래그 토크 계수. 이것은 회전하는 프로펠러에 의해 생성되는 축방향 토크와 관련이 있습니다. 드래그와 추력을 함께 사용하여 일부 토크를 생성할 수 있는 경우 `Ct`를 기준으로 설정하여야 합니다. 0으로 설정하면, 믹서는 로터가 축방향 토크를 생성하지 않음을 가정합니다.


## 예제 파일

There are numerous examples in the source tree: [/src/lib/mixer/MultirotorMixer/geometries/](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/mixer/MultirotorMixer/geometries/).

트라이콥터 지오메트리([tri_y.toml](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/mixer/MultirotorMixer/geometries/tri_y.toml))는 다음과 같습니다.

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


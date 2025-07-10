---
canonicalUrl: https://docs.px4.io/main/ko/advanced/parameters_and_configurations
---

# 매개변수와 설정

PX4는 *param 하위 시스템*(`float` 및 `int32_t` 값의 플랫 테이블)과 텍스트 파일(믹서 및 시작 스크립트용)로 설정을 저장합니다.

이 섹션에서는 *param* 하위 시스템을 자세히 설명합니다. 매개변수를 나열, 저장 및 로드하는 방법과 매개변수를 정의하고 지상국에서 사용하는 방법을 설명합니다.

:::tip
[시스템 시작](../concept/system_startup.md)과 [기체 구성](../dev_airframes/adding_a_new_frame.md)은 다른 페이지에 자세히 설명합니다.
:::


## 명령줄 사용법

PX4 [시스템 콘솔](../debug/system_console.md)은 매개변수를 설정하고, 값을 읽고, 저장하고, 파일로 내보내고 복원하는  [param](../modules/modules_command.md#param) 도구를 제공합니다.

### 매개변수 가져오기 및 설정

`param show` 명령은 모든 시스템 매개변수를 나열합니다.
```sh
param show
```

매개변수 이름 인수에 와일드카드 "*"를 사용할 수 있습니다.
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

`-c` 플래그를 사용하여 (기본값에서) 변경된 모든 매개변수를 표시할 수 있습니다.
```sh
param show -c
```

`param show-for-airframe`을 사용하여 현재 기체의 정의 파일에 대해서만 기본값에서 변경된 모든 매개변수를 표시할 수 있습니다.


### 매개변수 내보내기 및 로드

*변경된* 매개변수를 저장할 수 있습니다(기체 기본값과 다름).

표준 `param save` 명령은 현재 기본 파일에 매개변수를 저장합니다.
```sh
param save
```

인수가 제공되면, 이 새 위치 대신 매개변수를 저장합니다.
```sh
param save /fs/microsd/vtol_param_backup
```

매개변수를 *로드*하는 두 가지 명령어가 있습니다.
- `param load`는 모든 매개변수를 기본값으로 완전히 재설정한 다음, 매개변수를 파일에 저장된 값으로 덮어씁니다.
- `param import`는 매개변수 값을 파일의 값으로 덮어쓴 다음 결과를 저장합니다(즉, `param save`를 효과적으로 호출).

`load` 명령은 "실질적"으로 매개변수 값을 저장했을 때의 상태로 초기화합니다("실질적"이란 표현을 쓴 이유는 파일에 저장한 어떤 매개변수 값이든 업데이트하겠지만, 다른 매개변수는 파일을 만들었을 때의 매개변수 값과는 다른 펌웨어 지정 기본 값을 가집니다).

반면에, `import` 명령은 기체의 현재 상태 값과 파일의 매개변수 값을 병합합니다. 예를 들어, 시스템 설정의 나머지 부분을 덮어쓰지 않고 보정 데이터가 포함된 매개변수 파일을 가져오는 데 사용할 수 있습니다.

두 경우에 대한 예를 아래에서 설명합니다.

```sh
# 파일을 저장하고 나면 매개변수 값 초기화
param load /fs/microsd/vtol_param_backup
# 추가로 매개변수 값 저장 (불러온다고 해서 자동으로 끝나지는 않음)
param save
```
```sh
# 현재 매개변수 값 목록에 저장한 매개변수 값 병합
param import /fs/microsd/vtol_param_backup  
```

## 매개변수 생성/정의

매개변수 정의에는 두 부분이 있습니다.
- [매개변수 메타데이터](#parameter-metadata)는 지상 관제소와 문서에서 매개변수의 표시(및 편집)를 위한 다른 메타데이터와 함께 펌웨어의 매개변수에 대한 기본값들을 지정합니다.
- PX4 모듈 및 드라이버 내에서 매개변수 값을 가져오거나 구독할 수 있는 [C/C++ 코드](#c-c-api)가 있습니다.

메타데이터와 코드를 작성하기 위한 몇 가지 접근 방식을 아래에서 설명합니다. 코드는 더 유연하고 강력하기 때문에 이전의 C 매개변수/코드 정의보다 최신 [YAML 메타데이터](#yaml-metadata) 및 [C++ API](#c-api)를 사용하여야 합니다.

매개변수 메타데이터는 [펌웨어로 컴파일](#publishing-parameter-metadata-to-a-gcs)되고, [MAVLink 구성 요소 정보 서비스](https://mavlink.io/en/services/component_information.html)를 통하여 지상국에서 사용할 수 있습니다.


### 매개변수 이름

매개변수 이름은 ASCII 문자 16자 이하입니다.

관례에 따라, 그룹의 모든 매개변수는 동일한(의미 있는) 문자열 접두사 뒤에 밑줄이 와야 하며, 특히 멀티콥터 또는 고정익 관련 매개변수에는 `MC_` 및 `FW_`가 사용됩니다. 이 관례는 강제 사항은 아닙니다.

매개변수를 해당 메타데이터(펌웨어의 기본값 포함)와 올바르게 연결하려면, 이름이 코드와 [매개변수 메타데이터](#parameter-metadata)에서 일치하여야 합니다.


### C / C++ API

PX4 모듈 및 드라이버에서 매개변수 사용할 수 있는 C 및 C++ API가 있습니다.

API 간의 중요한 차이점 중 하나는 C++ 버전이 매개변수 값(예: GCS에서) 변경과 동기화하는 보다 효율적인 표준화 메커니즘이 있다는 것입니다.

매개변수는 언제든지 다른 값으로 변경될 수 있으므로, 동기화가 중요합니다. 코드는 매개변수 저장소에서 최신 값을 *항상* 사용하여야 합니다. 최신 버전을 가져올 수 없는 경우에는, 매개변수를 변경한 후 재부팅합니다(`@reboot_required` 메타데이터를 사용하여 이 요구사항 설정).

또한, C++ 버전은 유형 안전성이 더 우수하고 메모리 사용량이 적습니다. 단점은 매개변수 이름을 컴파일 타임에 알아야 하는 반면에, C API는 동적으로 생성된 이름을 문자열로 사용할 수 있습니다.


#### C++ API

C++ API는 매개변수를 *클래스 속성*으로 선언하는 매크로를 제공합니다. *모든* 매개변수 업데이트와 관련된 [uORB 주제](../middleware/uorb.md)의 변경 사항을 정기적으로 수신하기 위하여 일부 "보일러 플레이트" 코드를 추가합니다. 그런 다음, 프레임워크 코드는 매개변수 속성에 영향을 미치는 uORB 메시지 추적을 처리하고 동기화 상태를 유지합니다. 나머지 코드에서는 정의된 매개변수 속성을 사용할 수 있으며, 항상 최신 상태를 유지합니다!

제일 먼저, 모듈 또는 드라이버의 클래스 헤더에 필요한 필수 헤더를 포함합니다.
- **px4_platform_common/module_params.h**를 사용하여 `DEFINE_PARAMETERS` 매크로를 가져옵니다.
  ```cpp
  #include <px4_platform_common/module_params.h>
  ```
- uORB `parameter_update` 메시지에 액세스하려면 **parameter_update.h**를 인클루드합니다.
  ```cpp
  #include <uORB/topics/parameter_update.h>
  ```
- uORB C++ 구독 API용 **Subscription.hpp**를 인클루드합니다.:
  ```cpp
  #include <uORB/Subscription.hpp>
  ```

`ModuleParams`에서 클래스를 파생하고, `DEFINE_PARAMETERS`를 사용하여 매개변수 목록 및 관련 매개변수 속성을 지정합니다. 매개변수의 이름은 매개변수 메타데이터 정의와 동일하여야 합니다.
```cpp
class MyModule : ..., public ModuleParams
{
public:
    ...

private:

    /**
     * Check for parameter changes and update them if needed.
     */
    void parameters_update();

    DEFINE_PARAMETERS(
        (ParamInt<px4::params::SYS_AUTOSTART>) _sys_autostart,   /**< example parameter */
        (ParamFloat<px4::params::ATT_BIAS_MAX>) _att_bias_max  /**< another parameter */
    )

    // Subscriptions
    uORB::SubscriptionInterval _parameter_update_sub{ORB_ID(parameter_update), 1_s};

};
```


매개변수 업데이트와 관련된 uORB 메시지를 확인하기 위해 상용구로 cpp 파일을 업데이트합니다.

코드에서 주기적으로 `parameters_update();`를 호출하여 업데이트합니다.
```cpp 
void Module::parameters_update()
{
    if (_parameter_update_sub.updated()) {
        parameter_update_s param_update;
        _parameter_update_sub.copy(&param_update);

        // If any parameter updated, call updateParams() to check if
        // this class attributes need updating (and do so). 
        updateParams();
    }
}
```
위의 함수에서 :
- `_parameter_update_sub.updated()`는 `param_update` uORB 메시지에 대한 *업데이트 여부를* 알려줍니다(영향을 받는 매개변수는 아님).
- "일부" 매개변수가 업데이트된 경우에는, 보류 중인 업데이트를 지우기 위하여 업데이트를 `parameter_update_s`(`param_update`)에 복사합니다.
- 그런 다음 `ModuleParams::updateParams()`를 호출합니다. 이 "내부"는 `DEFINE_PARAMETERS` 목록에 나열된 모든 매개변수 속성을 업데이트합니다.

그런 다음, 매개변수 속성(이 경우 `_sys_autostart` 및 `_att_bias_max`)을 사용하여 매개변수를 나타낼 수 있으며, 매개변수 변경시에 업데이트됩니다.

:::tip
[애플리케이션/모듈 템플릿](../modules/module_template.md)은 새로운 스타일의 C++ API를 사용하지만, [매개변수 메타데이터](#parameter-metadata)는 포함하지 않습니다.
:::

#### C API

C API는 모듈과 드라이버 모두에서 사용할 수 있습니다.

먼저 매개변수 API를 포함합니다.
```C
#include <parameters/param.h>
```

그런 다음 `PARAM_NAME`에 대해 아래와 같이 매개변수를 검색하고, 변수(여기서는 `my_param`)에 할당합니다. The variable `my_param` can then be used in your module code.
```C
int32_t my_param = 0;
param_get(param_find("PARAM_NAME"), &my_param);
```

:::note
`PARAM_NAME`이 매개변수 메타데이터에 선언된 경우 기본값이 설정되고, 매개변수를 찾기 위한 위의 호출은 항상 성공하여야 합니다. 매개변수를 여러줄에서 가져올 경우, 필요할 때 핸들 값을 캐싱한 다음 `param_get()` 값을 사용합니다.

`param_find()`는 `param_get()`에서 사용할 수 있는 핸들을 반환하는 "비싼" 작업입니다. 매개변수를 여러 번 읽으려는 경우에는, 핸들을 캐시하고 필요할 때 `param_get()`에서 사용할 수 있습니다.
```cpp
# Get the handle to the parameter
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# Query the value of the parameter when needed
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```


### 매개변수 메타데이터

PX4는 확장 매개변수 메타데이터 시스템을 사용하여 사용자에게 매개변수를 표시하고 펌웨어의 매개변수들의 기본값을 설정합니다.

:::tip
적절한 메타데이터는 지상국 사용자에게 매우 중요합니다.
:::

매개변수 메타데이터는 소스 트리의 어느 위치에나 **.c** 또는 **.yaml** 매개변수 정의로 저장할 수 있습니다(YAML 정의가 더 새롭고 더 유연함). 일반적으로 연결된 모듈과 함께 저장됩니다.

빌드 시스템은 메타데이터를 추출(`make parameters_metadata` 사용)하여 [매개변수 참조](../advanced_config/parameter_reference.md)와 [지상국에서 사용하는](#publishing-parameter-metadata-to-a-gcs) 매개변수 정보를 작성합니다.

:::warning
*new* 매개변수 파일을 추가한 후 새 매개변수를 생성하기 위하여 빌드전에 `make clean`을 호출하여야 합니다. 매개변수 파일은 *cmake* 설정 단계 일부(클린 빌드 및 cmake 파일이 수정된 경우에 발생하는 단계)로 추가됩니다.
:::


#### YAML 메타데이터

:::note
이 문서 작성 시점에는 YAML 매개변수 정의는 *라이브러리*에서는 사용할 수 없습니다.
:::

YAML 메타 데이터는 **.c** 정의를 대체합니다. 다중 인스턴스 정의와 같은 새로운 기능과 함께 동일한 메타데이터를 모두 지원합니다.

- The YAML parameter metadata schema is here: [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/validation/module_schema.yaml).
- An example of YAML definitions being used can be found in the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/mavlink/module.yaml).
- YAML 파일은 다음을 추가하여 cmake 빌드 시스템에 등록됩니다.
  ```
  MODULE_CONFIG
    module.yaml
  ```
  해당 모듈의 `CMakeLists.txt` 파일의 `px4_add_module` 섹션에 추가합니다.


#### 다중 인스턴스(템플릿) YAML 메타 데이터

Templated parameter definitions are supported in [YAML parameter definitions](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/validation/module_schema.yaml) (templated parameter code is not supported).

YAML을 사용하면 `${i}`를 사용하여 매개변수 이름, 설명 등에 인스턴스 번호를 정의할 수 있습니다. 예를 들어 아래는 MY_PARAM_1_RATE, MY_PARAM_2_RATE 등을 생성합니다.
```
MY_PARAM_${i}_RATE:
            description:
                short: Maximum rate for instance ${i}
```

다음 YAML 정의는 시작과 끝 인덱스를 제공합니다.
- `num_instances`(기본값 1): 생성할 인스턴스 수(>=1)
- `instance_start`(기본값 0): 첫 번째 인스턴스 번호입니다. 0이면 `${i}`가 [0, N-1]`로 확장됩니다.

For a full example see the MAVLink parameter definitions: [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/mavlink/module.yaml)


#### c 매개변수 메타데이터

매개변수 메타데이터를 정의하기 위한 레거시 접근 방식은 확장자가 **.c**인 파일에 있습니다(작성 당시 소스 트리에서 가장 일반적으로 사용되는 접근 방식임).

매개변수 메타데이터 섹션은 다음 예와 같습니다.

```cpp
/**
 * Pitch P gain
 *
 * Pitch proportional gain, i.e. desired angular speed in rad/s for error 1 rad.
 *
 * @unit 1/s
 * @min 0.0
 * @max 10
 * @decimal 2
 * @increment 0.0005
 * @reboot_required true
 * @group Multicopter Attitude Control
 */
PARAM_DEFINE_FLOAT(MC_PITCH_P, 6.5f);
```
```cpp
/**
 * Acceleration compensation based on GPS
 * velocity.
 *
 * @group Attitude Q estimator
 * @boolean
 */
PARAM_DEFINE_INT32(ATT_ACC_COMP, 1);
```

끝에 있는 `PARAM_DEFINE_*` 매크로는 매개변수 유형(`PARAM_DEFINE_FLOAT` 또는 `PARAM_DEFINE_INT32`), 매개변수 이름(이름과 일치해야 함 코드에서 사용됨) 및 펌웨어의 기본값입니다.

주석 블록의 행은 모두 선택 사항이며, 주로 지상국에서 표시 및 편집 옵션을 제어합니다. The purpose of each line is given below (for more detail see [module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/validation/module_schema.yaml)).

```cpp
/**
 * <title>
 *
 * <longer description, can be multi-line>
 *
 * @unit <the unit, e.g. m for meters>
 * @min <the minimum sane value. Can be overridden by the user>
 * @max <the maximum sane value. Can be overridden by the user>
 * @decimal <the minimum sane value. Can be overridden by the user>
 * @increment <the "ticks" in which this value will increment in the UI>
 * @reboot_required true <add this if changing the param requires a system restart.>
 * @boolean <add this for integer parameters that represent a boolean value>
 * @group <a title for parameters that form a group>
 */
```

## GCS에 매개변수 메타데이터 게시

매개변수 메타데이터는 PX4 빌드중에 JSON 또는 XML 파일로 저장됩니다.

대부분의 비행 컨트롤러(대부분의 FLASH가 충분히 사용 가능)의 경우 JSON 파일은 xz 압축되어 생성된 바이너리 내에 저장됩니다. 그런 다음 파일은 [MAVLink 구성 요소 정보 프로토콜](https://mavlink.io/en/services/component_information.html)을 사용하여 지상국과 공유됩니다. 이렇게 하면 매개변수 메타데이터가 차량에서 실행되는 코드와 함께 항상 최신 상태를 유지합니다.

메모리가 제한된 비행 콘트롤러 대상의 바이너리는 매개변수 메타데이터를 바이너리에 저장하지 않고, `px4-travis.s3.amazonaws.com`에 저장된 동일한 데이터를 참조합니다. 이는 예를 들어 [Omnibus F4 SD](../flight_controller/omnibus_f4_sd.md)에 적용됩니다. The metadata is uploaded via [github CI](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/.github/workflows/metadata.yml) for all build targets (and hence will only be available once parameters have been merged into master).

:::note
You can identify memory constrained boards because they specify `CONFIG_BOARD_CONSTRAINED_FLASH=y` in their [px4board definition file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/boards/omnibus/f4sd/default.px4board).
:::

:::note
매개변수 메타데이터가 차량에 없는 경우 `px4-travis.s3.amazonaws.com`의 메타데이터가 사용됩니다. 또한 저속 텔레메트리 통신에서 느린 다운로드를 방지하기 위한 대체 수단으로 사용될 수 있습니다.
:::

Anyone doing custom development on a FLASH-constrained board can adjust the URL [here](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/component_information/CMakeLists.txt#L41) to point to another server.

마스터 분기의 XML 파일은 CI를 통해 QGC 소스 트리에 복사되고, 구성 요소 정보 서비스를 통해 사용할 수 있는 메타데이터가 없는 경우의 대체 수단으로 사용됩니다(이 접근 방식은 구성 요소 정보 프로토콜이 존재하기 이전).


## 추가 정보

- [매개변수 검색 및수정](../advanced_config/parameters.md)
- [매개변수 정의서](../advanced_config/parameter_reference.md)
- [Param implementation](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/platforms/common/include/px4_platform_common/param.h#L129) (information on `.get()`, `.commit()`, and other methods)

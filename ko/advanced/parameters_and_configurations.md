# 매개변수와 구성

PX4는 설정 값을 저장하는 수단으로 *매개변수 하위 체계* (`float`형과 `int32_t`형 값의 단순 집합)와 텍스트 파일(믹서, 시작 스크립트용)을 사용합니다.

이 장에서는 *매개변수* 하위 시스템을 자세하게 다루도록 하겠습니다. 매개변수를 살펴보고, 저장하고, 불러오고, 지정하는 방법의 내용을 다룹니다.

:::note
[시스템 시작](../concept/system_startup.md)과 [에어프레임 구성](../dev_airframes/adding_a_new_frame.md) 방법은 다른 페이지에서 자세하게 언급합니다.
:::


## 명령행 사용법

`param show` 명령은 전체 시스템 매개변수 값 목록을 보여줍니다:

### 매개변수 값 가져오고 설정하기

좀 더 원하는 부분을 선택할 경우, 매개변수 이름 일부 대신 와일드 카드 문자 "*"를 사용할 수 있습니다:
```sh
param show
```

`-c` 플래그를 사용하여 (기본값으로부터) 값이 바뀐 모든 매개변수를 확인할 수 있습니다:
```sh
nsh> param show RC_MAP_A*
Symbols: x = used, + = saved, * = unsaved
x   RC_MAP_AUX1 [359,498] : 0
x   RC_MAP_AUX2 [360,499] : 0
x   RC_MAP_AUX3 [361,500] : 0
x   RC_MAP_ACRO_SW [375,514] : 0

 723 parameters total, 532 used.
```

`param show-for-airframe` 명령으로 현재 에어프레임 정의 파일용 기본 설정(과 가져온 모든 기본값)을 바꾼 모든 매개변수 값을 보여줄 수 있습니다.
```sh
param show -c
```

모든 매개변수 값을 펌웨어 지정 기본값으로 초기화한 이래로 *값을 바꾼*적이 있는 임의의 매개변수를 저장할 수 있습니다(기본값으로 되돌린 적이 있다 하더라도 바뀐 매개변수 값이 들어감).


### 매개변수 값 불러오고 내보내기

`param save` 표준 명령은 현재 기본 파일에 매개변수 값을 저장합니다:

인자 값을 추가로 기재했다면, 인자 값에 해당하는 새 위치에 매개변수 값을 저장합니다:
```sh
param save
```

매개변수를 *불러오는(load)* 명령에는 두가지가 있습니다:
```sh
param save /fs/microsd/vtol_param_backup
```

`load` 명령은 "실질적"으로 매개변수 값을 저장했을 때의 상태로 초기화합니다("실질적"이란 표현을 쓴 이유는 파일에 저장한 어떤 매개변수 값이든 업데이트하겠지만, 다른 매개변수는 파일을 만들었을 때의 매개변수 값과는 다른 펌웨어 지정 기본 값을 가집니다).
- 우선 `param load` 명령은 모든 매개변수 값을 기본값으로 초기화하며, 파일에 저장한 어떤 값이든 덮어씁니다.
- `param import`는 파일에서 가져온 매개변수 값을 덮어쓰기만 하고, 결과를 저장합니다(예: `param save` 명령 호출과 동일한 결과).

`load` 명령은 "실질적"으로 매개변수 값을 저장했을 때의 상태로 초기화합니다("실질적"이란 표현을 쓴 이유는 파일에 저장한 어떤 매개변수 값이든 업데이트하겠지만, 다른 매개변수는 파일을 만들었을 때의 매개변수 값과는 다른 펌웨어 지정 기본 값을 가집니다).

반면에, `import` 명령은 기체의 현재 상태 값과 파일의 매개변수 값을 병합합니다. 이를테면 시스템 설정의 나머지 부분을 덮어쓰기 하지 않고 보정 값을 동반하여 매개변수 값 파일을  내용을 가져올 때 사용할 수 있습니다.

아래 예제에 두가지 경우를 모두 보여드립니다:

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


## 매개변수 이름

매개변수 이름은 ASCII 문자 16개를 넘어서는 안됩니다.

관례에 따르면, 그룹의 모든 매개변수는 밑줄 문자가 뒤따라오는 동일한(의미를 가진) 문자열을 공유하며, 다중 프로펠러 항공기 또는 고정익 항공기의 여부에 따라 `MC_`와 `FW_`를 매개변수 이름에 활용합니다. 이 관례는 강제 사항이 아닙니다.

PX4 모듈과 드라이버에서 매개변수 값에 접근하는 용도로 C와 C++언어로 활용할 수 있는 개별 API가 있습니다.


## C / C++ API

PX4 모듈과 드라이버에서 매개변수 값에 접근하는 용도로 C와 C++언어로 활용할 수 있는 개별 API가 있습니다.

API간 중요한 차이점이 있다면, C++ 버전은 매개변수 값을 바꿀 때 동기화하는 표준 매커니즘이 더욱 효율적입니다(예: GCS에서 업데이트).

매개변수 값이 다른 값으로 언제든 바뀔 수 있으므로 동기화는 중요합니다. 코드는 매개변수 저장소에 *항상* 현재 값을 사용해야합니다. 최근 버전을 가져올 수 없다면, 매개변수 값을 바꾼 후 다시 부팅해야 합니다(`@reboot_required` 메타데이터로 필수 여부 설정).

C++ API에서는 *클래스 속성*으로 매개변수를 선언하는 매크로를 제공합니다. *임의의*  매개변수 업데이트와 관련된 [uORB 토픽](../middleware/uorb.md)의 변경을 주기적으로 확인하는 "상용구" 코드를 추가합니다.


### C++ API

C++ API에서는 *클래스 속성*으로 매개변수를 선언하는 매크로를 제공합니다. *임의의*  매개변수 업데이트와 관련된 [uORB 토픽](../middleware/uorb.md)의 변경을 주기적으로 확인하는 "상용구" 코드를 추가합니다. 이렇게 하면 프레임워크 코드는 매개변수 속성 값에 영향을 주는 uORB 메시지를 (감쪽같이) 추적하고 동기화 과정을 통해 매개변수 속성 값을 유지합니다. 나머지 코드에서 지정한 매개변수 속성을 활용하고 항상 최신으로 유지할 수 있습니다!

모듈 또는 드라이버에 **px4_platform_common/module_params.h** 헤더를 클래스 헤더에 넣으십시오(`DEFINE_PARAMETERS` 매크로를 가져옵니다):
```cpp
#include <px4_platform_common/module_params.h>
```

`ModuleParams` 클래스를 상송하고 매개변수 목록과 관련 매개변수 속성을 정의할 때 `DEFINE_PARAMETERS`를 활용하십시오. 매개변수 이름은 매개변수 메타데이터 정의와 정확히 일치해야합니다.
```cpp
class MyModule : ..., public ModuleParams
{
public:
    ...

private:

    /**
     * Check for parameter changes and update them if needed.
     * @param parameter_update_sub uorb subscription to parameter_update
     */
    void parameters_update(int parameter_update_sub, bool force = false);

    DEFINE_PARAMETERS(
        (ParamInt<px4::params::SYS_AUTOSTART>) _sys_autostart,   /**< example parameter */
        (ParamFloat<px4::params::ATT_BIAS_MAX>) _att_bias_max  /**< another parameter */
    )
};
```

상용구 코드로 cpp 파일을 업데이트하여 매개변수 업데이트와 관련 있는 uORB 메시지를 확인하십시오.

우선 헤더를 포함하여 uORB parameter_update 메시지에 접근하게 합니다:
```cpp
#include <uORB/topics/parameter_update.h>
```
모듈 또는 드라이버를 시작할 때 메시지 업데이트 과정에 참여하며, 과정이 끝나면 해제합니다. `orb_subscribe()`에서 반환하는 `parameter_update_sub` 값은  메시지 업데이트 과정 참여시 참고할 핸들입니다.
```cpp
# Subscribe to parameter_update message
int parameter_update_sub = orb_subscribe(ORB_ID(parameter_update));
...
# Unsubscribe to parameter_update messages
orb_unsubscribe(parameter_update_sub);
```

위 메서드에서:
```cpp
void Module::parameters_update(int parameter_update_sub, bool force)
{
    bool updated;
    struct parameter_update_s param_upd;

    // Check if any parameter updated
    orb_check(parameter_update_sub, &updated);

    // If any parameter updated copy it to: param_upd
    if (updated) {
        orb_copy(ORB_ID(parameter_update), parameter_update_sub, &param_upd);
    }

    if (force || updated) {
        // If any parameter updated, call updateParams() to check if
        // this class attributes need updating (and do so). 
        updateParams();
    }
}
```
매개변수 속성(이 경우, `_sys_autostart` 와 `_att_bias_max`)은 매개변수를 대신할 목적으로 활용할 수 있으며, 매개변수 값이 바뀔 때마다 업데이트합니다.
- `param_update` uORB 메시지에 *어떤* 업데이트 사항이 있다면 `orb_check()`에서 알려주고 (다만 어떤 매개변수가 영향을 받았는지 정보는 아님) `updated` 부울린 값을 설정합니다.
- "일부" 매개변수를 업데이트했다면 `parameter_update_s` (`param_upd`)에 최신 매개변수 값을 복사합니다
- 그 다음 `ModuleParams::updateParams()` 메서드를 호출합니다. 이 "하부" 에서는 `DEFINE_PARAMETERS`  목록에 있는 특정 매개변수 속성을 업데이트해야 하는지 확인하고, 필요할 경우 진행합니다.
- 이 예제에서는 `Module::parameters_update()` 메서드를 `force=True` 인자 값을 대입하여 호출하지 않습니다. 만약 함수에 넣은 일반 패턴을 설정해야 할 다른 값이 있다면, 초기화를 진행하는  동안 `force=True` 값을 대입하여 1회 호출합니다.

C API는 모듈과 드라이버 모두에서 활용할 수 있습니다.

:::Tip [어플리케이션/모듈 서식](../modules/module_template.md)에서는 새 방식의 C++ API를 사용하나 [매개변수 메타데이터](#parameter-metadata)는 들어있지 않습니다.
:::

### C API

C API는 모듈과 드라이버 모두에서 활용할 수 있습니다.

우선 매개변수 API를 넣으십시오:
```C
#include <parameters/param.h>
```

그리고 아래와 같이 `PARAM_NAME` 매개변수를 가져와서 변수에 할당하십시오(여기서는 `my_param`). `my_param` 변수는 여러분이 작성한 모듈 코드에서 활용할 수 있습니다.
```C
int32_t my_param = 0;
param_get(param_find("PARAM_NAME"), &my_param);
```

:::note
`PARAM_NAME`을 매개변수 메타데이터에서 선언했다면 우선 이 기본값을 설정하며, 위 코드에서의 매개변수 검색 호출은 언제든 성공합니다.
:::

`param_find()`은 "실행 시간이 조금 걸리는" 동작이며, 이 함수에서 나온 핸들 값은 `param_get()` 함수에서 사용할 수 있습니다. 매개변수를 여러줄에서 가져올 경우, 필요할 때 핸들 값을 캐싱한 다음 `param_get()` 값을 사용합니다.
```cpp
# Get the handle to the parameter
param_t my_param_handle = PARAM_INVALID;
my_param_handle = param_find("PARAM_NAME");

# Query the value of the parameter when needed
int32_t my_param = 0;
param_get(my_param_handle, &my_param);
```


## 매개변수 메타데이터

기존의 매개변수 메타데이터 정의 방식의 접근은 **.c** 확장자를 가진 파일을 활용하는 방식입니다(이 글을 작성하는 시점에는 소스트리에서 가장 일반적으로 활용하는 접근법입니다).

:::tip
올바른 메타데이터는 지상 장치에서의 바람직한 사용자 경험에 중요합니다.
:::

매개변수 메타데이터는 소스트리 어디에든 **.c** 또는 **.yaml** 매개변수 정의파일로 저장할 수 있습니다(YAML 정의가 더 최신이며 다루기에 유연합니다). 보통 관련 모듈과 함께 저장합니다.

빌드 시스템에서는 (`make parameters_metadata` 명령을 활용하여) 메타데이터를 추출하여 지상 관제 프로그램에서 활용할 [매개변수 참조](../advanced_config/parameter_reference.md)와 매개변수 정보를 빌드합니다.

:::warning
*새* 매개변수 파일을 추가하고 나면, 새 매개변수를 만들기 전 `make clean`을 실행해야합니다(매개변수 파일은 *cmake* 설정 단계의 일부로서 추가하며, 이 명령을 실행하면 cmake 파일을 수정했을 때, 기존의 빌드 파일을 정리합니다).
:::


### C 매개변수 메타데이터

서식화 매개변수 정의는 [YAML 매개변수 정의](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에서 지원합니다(서식화 매개변수 코드는 지원하지 않습니다).

매개변수 메타데이터 부분은 다음 예제와 같습니다:

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

위 코드 마지막의 `PARAM_DEFINE_*` 매크로는 매개변수 형식(`PARAM_DEFINE_FLOAT` 또는 `PARAM_DEFINE_INT32`), 매개변수 이름(코드에서 사용할 이름과 일치해야 함), 펌웨어의 기본값을 지정합니다.

주석 블록 행 내용은 모두 취사선택 요소이며, 기본적으로 지상 통제 장치에서 화면을 제어하고 옵션을 편집할 때 활용합니다. 각 행의 목적은 다음과 같습니다(자세한 내용은 [module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)을 참고하십시오).

```cpp
/**
 * <title>
 *
 * <longer description, can be multi-line>
 *
 * @unit <the unit, e.g. m for meters>
 * @min <the minimum sane value. Can be overridden by the user>
 * @max <the maximum sane value. Can be overridden by the user>
 * @max <the maximum sane value. Can be overridden by the user>
 * @increment <the "ticks" in which this value will increment in the UI>
 * @reboot_required true <add this if changing the param requires a system restart.>
 * @boolean <add this for integer parameters that represent a boolean value>
 * @group <a title for parameters that form a group>
 */
```

### YAML 메타데이터

:::note
이 내용을 작성하는 시점에서는 YAML 매개변수 정의를 *라이브러리*에서 활용할 수 없습니다.
:::

YAML 메타데이터는 **.c**의 정의를 완전히 대체할 용도로 존재합니다. 모든 동일한 메타데이터를 지원하며, 다중 인스턴스 정의와 같은 새 기능도 있습니다.

- YAML 매개변수 메타데이터 스키마는 [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에 있습니다.
- 활용 중인 YAML 정의 예제는 [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml) MAVLink 매개변수 정의파일에서 찾을 수 있습니다.


#### 다중 인스턴스 (서식화) 메타데이터

서식화 매개변수 정의는 [YAML 매개변수 정의](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml)에서 지원합니다(서식화 매개변수 코드는 지원하지 않습니다).

YAML 형식 코드에서는 매개변수 이름, 설명의 인스턴스 번호를 `${i}`로 정할 수 있습니다. 예를 들어, 아래 예제에서는 MY_PARAM_1_RATE, MY_PARAM_2_RATE 등을 만듭니다.
```
MY_PARAM_${i}_RATE:
            description:
                short: Maximum rate for instance ${i}
```

다음 YAML 정의에서는 시작, 끝 인덱스 번호를 제공합니다.
- `num_instances` (기본값 1): 생성할 인스턴스 갯수(하나 이상)
- `instance_start` (기본값 0): 첫번재 인스턴스 번호. 0으로 지정하면, `${i}` 값은 0부터 N-1 까지 갑니다.

전체 예제를 보려면 [/src/modules/mavlink/module.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/module.yaml) MAVLink 매개변수 정의 파일을 살펴보십시오

## 추가 정보

- [매개변수 검색/업데이트](../advanced_config/parameters.md)
- [매개변수 참고](../advanced_config/parameter_reference.md)

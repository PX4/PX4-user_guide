# 혼합과 액추에이터

<!-- there is a useful doc here that we should still mine to further improve this topic: https://docs.google.com/document/d/1xCEQh48uDWyo7TjqedW6gYxBxMtNyuYZ2Xkt2MBb2-w -->

PX4 아키텍처는 기체 레이아웃이 코어 콘트롤러에서 특별한 케이스들을 처리 하지 않도록 합니다.

혼합이란 강제 명령(예: `우회전`)을 받아 모터나 서보를 제어하는 액추에이터 명령으로 변환하는 것을 의미합니다. 에일러론당 하나의 서보가 있는 비행기에는 하나는 높게, 다른 하나는 낮게 명령하는 것을 의미합니다. 멀티콥터에도 동일하게 적용됩니다. 앞으로 나아가려면 모든 모터의 속도를 변경하여야 합니다.

실제 자세 콘트롤러에서 믹서 로직을 분리하면 재사용성이 크게 향상됩니다.

## 파이프라인 콘트롤

특정 콘트롤러는 특정 정규화된 힘 또는 토크 요구(-1..+1에서 조정됨)를 믹서로 보내고, 이에 따라 개별 액추에이터를 설정합니다. 그런 다음 출력 드라이버(예: UART, UAVCAN 또는 PWM)를 액츄에이터 기본 단위로 확장합니다. PWM 값은 1300입니다.

![Mixer Control Pipeline](../../assets/concepts/mermaid_mixer_control_pipeline.png)

<!-- Mermaid Live Version: https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIGF0dF9jdHJsW0F0dGl0dWRlIENvbnRyb2xsZXJdIC0tPiBhY3RfZ3JvdXAwW0FjdHVhdG9yIENvbnRyb2wgR3JvdXAgMF1cbiAgZ2ltYmFsX2N0cmxbR2ltYmFsIENvbnRyb2xsZXJdIC0tPiBhY3RfZ3JvdXAyW0FjdHVhdG9yIENvbnRyb2wgR3JvdXAgMl1cbiAgYWN0X2dyb3VwMCAtLT4gb3V0cHV0X2dyb3VwNVtBY3R1YXRvciA1XVxuICBhY3RfZ3JvdXAwIC0tPiBvdXRwdXRfZ3JvdXA2W0FjdHVhdG9yIDZdXG4gIGFjdF9ncm91cDJbQWN0dWF0b3IgQ29udHJvbCBHcm91cCAyXSAtLT4gb3V0cHV0X2dyb3VwMFtBY3R1YXRvciA1XVxuXHRcdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19 --->

## 콘트롤 그룹

PX4는 제어 그룹(입력)과 출력 그룹을 사용합니다. 개념적으로 매우 간단합니다. 통제 그룹은 예를 들어 핵심 비행 제어의 경우 `attitude`, 페이로드의 경우 `gimbal` 입니다. 출력 그룹은 하나의 물리적 버스(예: 서보용 처음 8개의 PWM 출력)입니다. 이 그룹 각각에는 믹서를 통하여 매핑하고 확장할 수 있는 8개의 정규화된(-1..+1) 명령 포트가 있습니다. 믹서는 컨트롤의 이러한 8개 신호 각각이 8개의 출력에 연결되는 방식을 정의합니다.

간단한 평면 제어의 경우 0(롤)은 출력 0(에일러론)에 직접 연결됩니다. 멀티콥터의 경우 상황이 약간 다릅니다. 컨트롤 0(롤)은 4개의 모터 모두에 연결되고 스로틀과 결합됩니다.

### 콘트롤 그룹 #0(비행 콘트롤)

* 0: roll (-1..1)
* 1: pitch (-1..1)
* 2: yaw (-1..1)
* 3: throttle(0..1 정상 범위, 가변 피치/추력 리버서의 경우 -1..1)
* 4: flaps (-1..1)
* 5: spoilers (-1..1)
* 6: airbrakes (-1..1)
* 7: landing gear (-1..1)

### 콘트롤 그룹 #1(비행 제어 VTOL/대체)

* 0: roll ALT (-1..1)
* 1: pitch ALT (-1..1)
* 2: yaw ALT (-1..1)
* 3: throttle ALT(0..1 정상 범위, 가변 피치/추력 리버서의 경우 -1..1)
* 4: reserved / aux0
* 5: reserved / aux1
* 6: reserved / aux2
* 7: reserved / aux3

### 컨트롤 그룹 #2 (Gimbal)

* 0: gimbal roll
* 1: gimbal pitch
* 2: gimbal yaw
* 3: gimbal shutter
* 4: camera zoom
* 5: reserved
* 6: reserved
* 7: reserved (낙하산, -1..1)

### 콘트롤 그룹 #3 (수동 통과)

* 0: RC roll
* 1: RC pitch
* 2: RC yaw
* 3: RC throttle
* 4: RC 모드 스위치([RC_MAP_FLAPS](../advanced_config/parameter_reference.md#RC_MAP_FLAPS)에 의해 매핑된 RC 채널의 통과)
* 5: RC aux1([RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1)에 의해 매핑된 RC 채널의 통과)
* 6: RC aux2([RC_MAP_AUX2](../advanced_config/parameter_reference.md#RC_MAP_AUX2)에 의해 매핑된 RC 채널의 통과)
* 7: RC aux3([RC_MAP_AUX3](../advanced_config/parameter_reference.md#RC_MAP_AUX3)에 의해 매핑된 RC 채널의 통과)

:::note
이 그룹은 *일반 작동* 동안 특정 출력에 대한 RC 입력의 매핑을 정의하는 데만 사용됩니다(믹서에서 AUX2가 조정되는 예는 [quad_x.main.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/quad_x.main.mix#L7) 참조). 수동 IO 안전 장치 무시의 경우(PX4FMU가 PX4IO 보드와의 통신을 중지하는 경우) 롤, 피치, 요 및 스로틀에 대해 제어 그룹 0 입력으로 정의된 매핑/믹싱만 사용됩니다(다른 매핑은 무시됨).
:::

<a id="control_group_6"></a>

### 컨트롤 그룹 #6 (첫째 페이로드)

* 0: function 0
* 1: function 1
* 2: function 2
* 3: function 3
* 4: function 4
* 5: function 5
* 6: function 6
* 7: function 7

## 가상 콘트롤 그룹

:::warning
*가상 콘트롤 그룹*은 VTOL 코드를 생성하는 개발자에게만 관련이 있습니다. 믹서에 사용하면 안 되며, "완벽함"을 위해서만 제공됩니다.
:::

이 그룹은 믹서 입력이 아니지만 고정익과 멀티콥터 컨트롤러 출력을 VTOL 거버너 모듈에 공급하는 메타 채널 역할을 합니다.

### 콘트롤 그룹 #4 (비행 콘트롤 멀티콥터 가상)

* 0: roll ALT (-1..1)
* 1: pitch ALT (-1..1)
* 2: yaw ALT (-1..1)
* 3: throttle ALT(0..1 정상 범위, 가변 피치/추력 리버서의 경우 -1..1)
* 4: reserved / aux0
* 5: reserved / aux1
* 6: reserved / aux2
* 7: reserved / aux3

### 콘트롤 그룹 #5 (비행 콘트롤 고정익 가상)

* 0: roll ALT (-1..1)
* 1: pitch ALT (-1..1)
* 2: yaw ALT (-1..1)
* 3: throttle ALT(0..1 정상 범위, 가변 피치/추력 리버서의 경우 -1..1)
* 4: reserved / aux0
* 5: reserved / aux1
* 6: reserved / aux2
* 7: reserved / aux3

## 출력 그룹 / 매핑

출력 그룹은 믹서를 통해 매핑/확장 가능한 N(보통 8) 정규화된(-1..+1) 명령 포트가 있는 물리적 버스(예: FMU PWM 출력, IO PWM 출력, UAVCAN 등)입니다.

믹서 파일은 출력이 적용되는 실제 *출력 그룹*(물리적 버스)을 명시적으로 정의하지 않습니다. 대신 믹서의 목적(예: MAIN 또는 AUX 출력 제어)이 믹서 [파일 이름](#mixer_file_names)에서 유추되고, 시스템 [시작 스크립트](../concept/system_startup.md)(특히 [rc.interface](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rc.interface))의 적절한 물리적 버스에 매핑됩니다.

:::note MAIN
출력에 사용되는 물리적 버스가 항상 같지 않기 때문에 이 접근 방식이 필요합니다. 비행 컨트롤러에 IO 보드가 있는지([PX4 참조 비행 컨트롤러 설계 > 주/IO 기능 분석](../hardware/reference_design.md#main-io-function-breakdown) 참조) 또는 모터 제어를 위해 UAVCAN을 사용 여부에 따라 달라집니다. 시작 스크립트는 "장치"의 추상화를 사용하여 믹서 파일을 보드에 적합한 장치 드라이버로 로드합니다. 메인 믹서는 UAVCAN이 활성화된 경우 장치 `/dev/uavcan/esc`(uavcan)에 로드되고, 그렇지 않으면 `/dev/pwm_output0`(이 장치는 IO 드라이버에 매핑됩니다. I/O 보드가 있는 컨트롤러와 그렇지 않은 보드의 FMU 드라이버)에 로드됩니다. 보조 믹서 파일은 I/O 보드가 있는 Pixhawk 컨트롤러의 FMU 드라이버에 매핑되는 `/dev/pwm_output1` 장치에 로드됩니다.
:::

여러 제어 그룹(비행 제어, 페이로드 등)과 여러 출력 그룹(버스)이 있기 때문에 하나의 제어 그룹이 여러 출력 그룹에 명령을 전송할 수 있습니다.

![Mixer Input/Output Mapping](../../assets/concepts/mermaid_mixer_inputs_outputs.png)
<!--- Mermaid Live Version: https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGFjdHVhdG9yX2dyb3VwXzAtLT5vdXRwdXRfZ3JvdXBfNVxuICBhY3R1YXRvcl9ncm91cF8wLS0-b3V0cHV0X2dyb3VwXzZcbiAgYWN0dWF0b3JfZ3JvdXBfMS0tPm91dHB1dF9ncm91cF8wIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0 -->

:::note
실제 시작 스크립트는 믹서를 단일 장치(출력 그룹)에만 로드합니다. 이것은 기술적 제한이 아니라 설정입니다. 메인 믹서를 여러 드라이버에 로드할 수 있습니다. 예를 들어 UAVCAN과 메인 핀 모두에서 동일한 신호를 가질 수 있습니다.
:::

## PX4 믹서 정의

믹서는 아래 [구문](#mixer_syntax)을 사용하여 일반 텍스트 파일로 정의됩니다.

미리 정의된 기체에 대한 파일은 [ROMFS/px4fmu_common/mixers](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/mixers)을 참고하십시오. 이들은 사용자 정의를 위한 기초로 사용하거나, 테스트 목적으로 사용할 수 있습니다.

<a id="mixer_file_names"></a>

### 믹서 파일 이름

mix</strong> AUX 출력을 믹스하는 경우에는 MAIN 출력 또는 **XXXX._aux_의 믹싱을 담당하는 경우 믹서 파일의 이름은 **XXXX._main_.mix**이어야 합니다. </p>

<a id="loading_mixer"></a>

### 믹서 로딩

기본 믹서 파일 세트(PX4 펌웨어)는 [px4fmu_common/init.d/airframes/](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/airframes/)에 정의되어 있습니다. 이는 SD 카드 디렉토리 **/etc/mixers/**에서 동일한 이름을 가진 믹서 파일로 재정의할 수 있습니다(SD 카드 믹서 파일은 기본 설정에 따라 로드됨).

PX4는 **XXXX._main_.mix**라는 이름의 믹서 파일을 MAIN 출력에 로드하고 **YYYY._aux_.mix**라는 이름의 믹서 파일을 MAIN 출력에 로드합니다. 접두사가 기체 및 기체 구성에 따라 달라집니다. 일반적으로 MAIN 및 AUX 출력은 MAIN 및 AUX PWM 출력에 해당하지만, 활성화되면 UAVCAN(또는 기타) 버스에 로드될 수 있습니다.

MAIN 믹서 파일 이름(접두사 `XXXX`)은 `set MIXER XXXX`(예: [airframes/10015_tbs_discovery](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/airframes/10015_tbs_discovery) 호출 `set MIXER)를 사용하여 기체를 설정합니다. quad_w`를 사용하여 메인 믹서 파일 **quad_w._main_.mix**를 로드합니다.

AUX 믹서 파일 이름(위의 접두사 `YYYY`)은 기체 설정과 기본값에 따라 다릅니다.
- `MIXER_AUX`는 로드되는 AUX 파일을 *명시적으로* 설정하는 데 사용할 수 있습니다(예: aiframe 구성에서 `set MIXER_AUX vtol_AAERT`는 `vtol_AAERT.aux.mix`를 로드합니다).
- 멀티콥터와 고정익은 기본적으로 [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix)를 로드합니다(즉, `MIXER_AUX`를 사용하여 설정하지 않은 경우). :::tip `pass.aux.mix`는 4개의 사용자 정의 RC 채널([RC_MAP_AUXx/RC_MAP_FLAPS](../advanced_config/parameter_reference.md#RC_MAP_AUX1) 매개변수를 사용하여 설정됨) 값을 전달하는 *RC 패스스루 믹서*입니다.
:::
- VTOL 프레임은 설정된 경우 `MIXER_AUX`를 사용하여 지정된 AUX 파일을 로드하고, 그렇지 않은면 `MIXER`로 지정된 값을 로드합니다.
- 짐벌 제어가 활성화된(및 출력 모드가 AUX로 설정된) 프레임은 기체별 MIXER_AUX 설정을 *재정의*하고 AUX 출력에 `mount.aux.mix`를 로드합니다.

:::note
믹서 파일 로드는 [ROMFS/px4fmu_common/init.d/rc.interface](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rc.interface)에서 구현됩니다.
:::

<a id="loading_custom_mixer"></a>

### 사용자 정의 믹서 로드

PX4는 기본 설정에 따라 SD 카드 디렉토리 **/etc/mixers/**에서 적절하게 명명된 믹서 파일을 로드한 다음 펌웨어의 버전을 로드합니다.

사용자 정의 믹서를 로드하려면 "일반" 믹서 파일과 동일한 이름을 지정해야 하며(비행기에서 로드할 파일) 컨트롤러의 SD 카드의 **etc/mixers** 디렉토리에 저장하여야 합니다.

가장 일반적으로 현재 기체(RC 패스스루 믹서 - [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix)일 수 있음)에 대한 **AUX** 믹서 파일을 재정의합니다. [믹서 로딩](#loading_mixer)에 대한 자세한 내용은 위를 참고하십시오.

:::tip
또한 [mixer load](../modules/modules_command.md#mixer) 명령을 사용하여 런타임에 믹서를 *수동으로* 로드할 수 있습니다(따라서 재부팅할 필요가 없음). 예를 들어, 믹서 **/etc/mixers/test_mixer.mix**를 MAIN PWM 출력에 로드하려면 [콘솔](../debug/consoles.md)에 다음 명령어를 실행합니다.
```
mixer load /dev/pwm_output0 /fs/microsd/etc/mixers/test_mixer.mix
```
:::

<a id="mixer_syntax"></a>

### 구문

믹서 파일은 하나 이상의 믹서 정의, 즉 입력과 출력간의 매핑 정의 텍스트 파일입니다.

믹서 정의에는 [멀티로터 믹서](#multirotor_mixer), [헬리콥터 믹서](#helicopter_mixer), [서밍 믹서](#summing_mixer) 및 [널 믹서](#null_mixer)의 네 가지 유형이 있습니다.
- [멀티로터 믹서](#multirotor_mixer) - + 또는 X 지오메트리가 있는 4, 6 또는 8 로터 차량의 출력을 정의합니다.
- [헬리콥터 믹서](#helicopter_mixer) - 헬리콥터 스와시 플레이트 서보 및 메인 모터 ESC의 출력을 정의합니다. (테일로터는 별도의 [서밍 믹서](#summing_mixer)입니다.)
- [합산 믹서](#summing_mixer) - 0개 이상의 제어 입력을 단일 액추에이터 출력으로 결합합니다. 입력이 조정되고 혼합 기능이 출력 스케일러를 적용하기 전에 결과를 합산합니다.
- [널 믹서](#null_mixer) - 출력이 0인 단일 액추에이터 출력을 생성합니다(안전 장치 모드가 아닐 때).

:::tip
각 유형에는 *멀티로터* 및 *헬리콥터 믹서*를 사용하고, 정상적인 사용 중에 0이어야 하는 출력을 생성하기 위하여(예: 낙하산은 일반적으로 0을 갖지만 안전 장치 동안 특정 값을 가질 수 있음) 서보 및 액추에이터 제어에는 *서밍 믹서*, *널 믹서*를 사용합니다. [VTOL 믹서](#vtol_mixer)는 다른 믹서 유형을 결합합니다.
:::

각 믹서에서 생성되는 출력의 수는 믹서 유형과 설정에 따라 달라집니다. 예를 들어, 멀티로터 믹서는 지오메트리에 따라 4, 6 또는 8개의 출력을 생성하는 반면, 합산 믹서 또는 널 믹서는 하나의 출력만 생성합니다.

각 파일에 하나 이상의 믹서를 지정할 수 있습니다. 출력 순서(액추에이터에 믹서 할당)는 믹서 정의를 읽는 장치에 따라 다릅니다. PWM 장치의 경우 출력 순서는 선언 순서와 일치합니다. 예를 들어, 쿼드 지오메트리에 대해 멀티 로터 믹서를 정의하고 널 믹서 다음에 두 개의 합산 믹서가 뒤따르는 경우 처음 4개의 출력을 쿼드에 할당하고 "빈" 출력을 할당하고 다음 2개의 출력을 할당합니다.

각 믹서 정의는 다음 형식의 줄로 시작합니다.
```
<tag>: <mixer arguments>
```

`태그`는 믹서 유형을 선택합니다(각 유형에 대한 자세한 내용은 링크 참조).
- `R`: [멀티로터 믹서](#multirotor_mixer)
- `H`: [헬리콥터 믹서](#helicopter_mixer)
- `M`: [합산 믹서](#summing_mixer)
- `Z`: [널 믹서](#null_mixer)

일부 믹서 정의는 위의 믹서 유형 태그 뒤에 오는 여러 태그(예: `O` 및 `S`)로 구성됩니다.

:::note
단일 대문자로 시작하지 않고 콜론이 뒤따르는 모든 행은 무시될 수 있습니다(따라서 설명 텍스트는 정의와 자유롭게 혼합될 수 있습니다).
:::

<a id="summing_mixer"></a>

#### 합산 믹서

액츄에이터 및 서보 제어에는 합산 믹서가 사용됩니다.

합산(단순) 믹서는 0개 이상의 제어 입력을 단일 액추에이터 출력으로 결합합니다. 입력이 조정되고 혼합 기능이 출력 스케일러를 적용하기 전에 결과를 합산합니다. 최소 액츄에이터 순회 시간 제한은 출력 스케일러에서도 지정할 수 있습니다(슬루율의 역).

간단한 믹서 정의는 다음으로 시작합니다.

```
M: <control count>
O: <-ve scale> <+ve scale> <offset> <lower limit> <upper limit> <traversal time>
```

`<control count>`이 0이면 합은 사실상 0이고, 믹서는 `<lower limit>`와 `<upper limit>`에 의해 제한되는 `<offset>` 고정 값을 출력합니다.

두 번째 줄은 위에서 설명한 대로 스케일러 매개변수를 사용하여 출력 스케일러를 정의합니다. 계산이 부동 소수점 연산으로 수행되는 동안 정의 파일에 저장된 값은 10000의 비율로 조정됩니다. 즉 -0.5의 오프셋은 -5000으로 인코딩됩니다. 출력 스케일러의 `<traversal time>`(선택 사항)은 너무 빨리 움직일 경우 손상될 수 있는 액추에이터를 위한 것입니다(예: 틸트로터 VTOL 차량의 틸팅 액추에이터). 액츄에이터의 변화율을 제한하는 데 사용할 수 있습니다(지정하지 않으면 속도 제한이 적용되지 않음). 예를 들어, `<traversal time>` 값이 20000이면 `<lower limit>`에서 `<upper limit>`로 또는 그 반대로 최소 2초가 걸리도록 액츄에이터의 변경 속도가 제한됩니다.

:::note
- `<traversal time>`은 하드웨어에서 요구하는 경우에만 사용합니다!
- 차량의 자세를 제어하는 액추에이터(예: 공기역학적 표면용 서보)에 제한을 적용하지 마십시오. 컨트롤러가 불안정해질 수 있습니다.
:::

정의는 다음 형식으로 제어 입력 및 해당 크기 조정을 설명하는 `<control count>` 항목으로 계속됩니다.

```
S: <group> <index> <-ve scale> <+ve scale> <offset> <lower limit> <upper limit>
```

:::note
`S:` 줄은 `O:` 줄 아래에 있어야 합니다.
:::

:::note
스로틀 입력(`<group>=0` 및 `<index>=3`이 있는 `S:` 라인)이 있는 모든 믹서 출력은 t 무장 해제 또는 준비 상태에서 작동합니다. 예를 들어, 4개의 입력(롤, 피치, 요, 스로틀)이 있는 서보는 롤/피치/요 신호가 있어도 무장 해제 상태에서 움직이지 않습니다.
:::

`<group>` 값은 스케일러가 읽을 제어 그룹을 식별하고, `<index>` 값은 해당 그룹 내의 오프셋을 식별합니다. 이 값은 믹서 정의를 읽는 장치에 따라 달라집니다.

차량 제어를 혼합시, 믹서 그룹 0은 차량 자세 제어 그룹이고 인덱스 값 0에서 3은 일반적으로 각각 롤, 피치, 요 및 추력입니다.

라인의 나머지 필드는 위에서 설명한 대로 매개변수를 사용하여 제어 스케일러를 설정합니다. 계산은 부동 소수점 연산으로 수행되지만 정의 파일에 저장된 값은 10000의 비율로 조정됩니다. 즉 -0.5의 오프셋은 -5000으로 인코딩됩니다.

일반적인 믹서 파일의 예는 [여기](../dev_airframes/adding_a_new_frame.md#mixer-file)에 설명되어 있습니다.

<a id="null_mixer"></a>

#### 널 믹서

널 믹서는 컨트롤을 사용하지 않으며 항상 0인 값으로 단일 액추에이터 출력을 생성합니다.

일반적으로 널 믹서는 특정 패턴의 액추에이터 출력을 달성하기 위해 믹서 모음에서 자리 표시자로 사용됩니다. 또한, 비상 안전 장치에 사용되는 출력 값 제어에 사용할 수 있습니다(정상 사용 시 출력은 0이고 비상 안전 중에는 믹서가 무시되고 대신 비상 안전 값이 사용됨).

널 믹서 정의의 형식은 다음과 같습니다.
```
Z:
```

<a id="multirotor_mixer"></a>

#### 멀티콥터 믹서

The multirotor mixer combines four control inputs (roll, pitch, yaw, thrust) into a set of actuator outputs intended to drive motor speed controllers.

The mixer definition is a single line of the form:
```
R: <geometry> <roll scale> <pitch scale> <yaw scale> <idlespeed>
```

The supported geometries include:

* 4x - quadrotor in X configuration
* 4+ - quadrotor in + configuration
* 6x - hexacopter in X configuration
* 6+ - hexacopter in + configuration
* 8x - octocopter in X configuration
* 8+ - octocopter in + configuration

Each of the roll, pitch and yaw scale values determine scaling of the roll, pitch and yaw controls relative to the thrust control. Whilst the calculations are performed as floating-point operations, the values stored in the definition file are scaled by a factor of 10000; i.e. an factor of 0.5 is encoded as 5000.

Roll, pitch and yaw inputs are expected to range from -1.0 to 1.0, whilst the thrust input ranges from 0.0 to 1.0. Output for each actuator is in the range -1.0 to 1.0.

Idlespeed can range from 0.0 to 1.0. Idlespeed is relative to the maximum speed of motors and it is the speed at which the motors are commanded to rotate when all control inputs are zero.

In the case where an actuator saturates, all actuator values are rescaled so that the saturating actuator is limited to 1.0.

<a id="helicopter_mixer"></a>

#### Helicopter Mixer

The helicopter mixer combines three control inputs (roll, pitch, thrust) into four outputs (swash-plate servos and main motor ESC setting). The first output of the helicopter mixer is the throttle setting for the main motor. The subsequent outputs are the swash-plate servos. The tail-rotor can be controlled by adding a simple mixer.

The thrust control input is used for both the main motor setting as well as the collective pitch for the swash-plate. It uses a throttle-curve and a pitch-curve, both consisting of five points.

:::note
The throttle- and pitch- curves map the "thrust" stick input position to a throttle value and a pitch value (separately). This allows the flight characteristics to be tuned for different types of flying. An explanation of how curves might be tuned can be found in [this guide](https://www.rchelicopterfun.com/rc-helicopter-radios.html) (search on *Programmable Throttle Curves* and *Programmable Pitch Curves*).
:::

The mixer definition begins with:

```
H: <number of swash-plate servos, either 3 or 4>
T: <throttle setting at thrust: 0%> <25%> <50%> <75%> <100%>
P: <collective pitch at thrust: 0%> <25%> <50%> <75%> <100%>
```
`T:` defines the points for the throttle-curve. `P:`  defines the points for the pitch-curve. Both curves contain five points in the range between 0 and 10000. For simple linear behavior, the five values for a curve should be `0 2500 5000 7500 10000`.

This is followed by lines for each of the swash-plate servos (either 3 or 4) in the following form:
```
S: <angle> <arm length> <scale> <offset> <lower limit> <upper limit>
```

The `<angle>` is in degrees, with 0 degrees being in the direction of the nose. Viewed from above, a positive angle is clock-wise. The `<arm length>` is a normalized length with 10000 being equal to 1. If all servo-arms are the same length, the values should al be 10000. A bigger arm length reduces the amount of servo deflection and a shorter arm will increase the servo deflection.

The servo output is scaled by `<scale> / 10000`. After the scaling, the `<offset>` is applied, which should be between -10000 and +10000. The `<lower limit>` and `<upper limit>` should be -10000 and +10000 for full servo range.

The tail rotor can be controller by adding a [summing mixer](#summing_mixer):
```
M: 1
S: 0 2  10000  10000      0 -10000  10000
```
By doing so, the tail rotor setting is directly mapped to the yaw command. This works for both servo-controlled tail-rotors, as well as for tail rotors with a dedicated motor.

The [blade 130 helicopter mixer](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/blade130.main.mix) can be viewed as an example.
```
H: 3
T:      0   3000   6000   8000  10000
P:    500   1500   2500   3500   4500
# Swash plate servos:
S:      0  10000  10000      0  -8000   8000
S:    140  13054  10000      0  -8000   8000
S:    220  13054  10000      0  -8000   8000

# Tail servo:
M: 1
S: 0 2  10000  10000      0 -10000  10000
```
- The throttle-curve starts with a slightly steeper slope to reach 6000 (0.6) at 50% thrust.
- It continues with a less steep slope to reach 10000 (1.0) at 100% thrust.
- The pitch-curve is linear, but does not use the entire range.
- At 0% throttle, the collective pitch setting is already at 500 (0.05).
- At maximum throttle, the collective pitch is only 4500 (0.45).
- Using higher values for this type of helicopter would stall the blades.
- The swash-plate servos for this helicopter are located at angles of 0, 140 and 220 degrees.
- The servo arm-lenghts are not equal.
- The second and third servo have a longer arm, by a ratio of 1.3054 compared to the first servo.
- The servos are limited at -8000 and 8000 because they are mechanically constrained.

<a id="vtol_mixer"></a>

#### VTOL Mixer

VTOL systems use a [multirotor mixer](#multirotor_mixer) for the multirotor outputs, and [summing mixers](#summing_mixer) for the fixed-wing actuators (and the tilting servos in case of a tiltrotor VTOL).

The mixer system for a VTOL vehicle can be either combined into a single mixer, where all the actuators are connected to either the IO or the FMU port, or split into separate mixer files for IO and for AUX. If separated, we recommend that all the multicopter motors are on one port, and all the servos and the fixed-wing motor on the other.

:::note
The FMU output can only be used for multirotor motors starting from PX4 v1.11. To use the FMU output set [VT_MC_ON_FMU=1](../advanced_config/parameter_reference.md#VT_MC_ON_FMU) (otherwise they are not switched off when in fixed-wing flight mode).
:::

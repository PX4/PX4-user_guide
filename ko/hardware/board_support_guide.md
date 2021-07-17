# 제조사의 PX4 보드 지원 가이드

PX4 개발 및 테스트 팀은 [Pixhawk 표준](https://pixhawk.org/standards/)을 준수하는 보드를 완벽하게 지원하고 유지 관리합니다. 표준을 준수하지 않거나 새로운 보드를 제작하는 업체에서는 호환성 차이를 지원하여야 합니다.

이 가이드는 다양한 [보드 지원 카테고리](#board-support-categories)에 대한 추가 요구사항과 함께 보드 지원에 대한 [일반 요구사항](#general_requirements)을 간략하게 설명합니다.

:::note
요구 사항을 준수하지 않는 보드는 [지원되지 않습니다](#unsupported). 그러한 보드들은 PX4 웹사이트 하드웨어 목록에 나열되지 않으며, 코드베이스에서 제거됩니다.
:::

<a id="general_requirements"></a>

## 일반 요구사항

지원 모든 보드에 대한 일반 요구사항은 다음과 같습니다.

1. 하드웨어는 시장에서 사용할 수 있어야 합니다.
1. 보드에는 UAV에서 PX4와 함께 보드를 사용하는 것이 불가능하거나 위험하게 하는 버그나 허용 범위 초과하는  품질 이상이 없어야 합니다. 보드는 부품과 조립품의 품질을 보장하기 위해 승인 기준을 통과하여야 합니다.
1. 고객을 지원하고 고객이 연락할 수 있는 명확하고 쉬운 방법이 있어야 합니다. 다음과 같은 방법이 허용됩니다.
   - Slack 채널 존재
   - 지원 이메일
   - 전화번호

1. PX4 관리자를 위한 PoC(Point of Contact)(직접 이메일 또는 Slack/Forum/Github에서 사용 가능)
1. 보드는 [PX4 부트로더 프로토콜](https://github.com/PX4/PX4-Autopilot/tree/master/platforms/nuttx/src/bootloader)을 사용하여야 합니다. 부트로더에 대한 자세한 내용은 [PX4 Nuttx 포팅 가이드 > 부트로더](../hardware/porting_guide_nuttx.md#bootloader)를 참고하십시오.
1. 다음 내용을 포함하는 적절한 문서:

    - PX4 핀 정의를 아래에 매핑하는 완전한 핀배열 공개:
      1. 마이크로컨트롤러 핀
      2. 물리적 외부 커넥터
    - 소프트웨어 요구 사항과 부팅 순서를 유추할 수 있는 주요 구성 요소(센서, 전원 공급 장치 등)의 블록 다이어그램 또는 전체 회로도
    - 완제품 사용 설명서
1. PX4와 함께 사용하기 위한 기능과 제한 사항을 나열하고 위에 설명된 문서를 포함하거나 링크하는 PX4가 있는 보드용 전용 웹페이지가 있어야 합니다.

## 보드 지원 카테고리

보드 지원 범주는 다음과 같습니다. 각 카테고리의 자동조종장치 보드는 [https://px4.io/autopilots/.](https://px4.io/autopilots/)에 나열되어 있습니다.

:::note
제조업체 지원 보드는 Pixhawk 보드보다 더 나은 지원을 받을 수 있습니다(예: 규모의 경제를 통해).
:::

## Pixhawk표준

Pixhawk 보드는 Pixhawk 표준을 준수하는 보드입니다. 이러한 표준은 [http://pixhawk.org](http://pixhawk.org/)에 나와 있지만, 상위 수준에서는 보드가 표준에서 요구하는 전기 테스트를 통과하고 제조업체가 Pixhawk 채택자 및 상표 계약에 서명하여야 합니다.

PX4는 일반적으로 상업적으로 사용 가능한 보드만 지원하므로, 일반적으로 지난 5년 이내에 출시된 보드 표준이 지원됩니다.

<a id="ver_rev_id"></a>

### VER 및 REV ID(하드웨어 개정 및 버전 감지)

FMUv5 이상에는 전기 감지 메커니즘이 있습니다. 선택적 구성 데이터와 결합된 이 감지는 필수 장치 및 전원 공급 장치 구성과 관련하여 하드웨어 구성을 정의합니다. 제조업체는 Pixhawk 표준 보드를 출시하기 위하여 [boards@px4.io](mailto:boards@px4.io)에서 PX4 보드 유지 관리자로부터 VER 및 REV ID를 얻어야 합니다.

이 보드는 Pixhawk 표준과 100% 호환되기 때문에 VER 및 REV ID에 할당된 값은 해당 FMUv 버전의 기본값입니다.

예를 들어 FMUv5의 값은 다음과 같습니다.

| REV | VER | &nbsp;     |
| --- | --- | ---------- |
| 0   | 0   | FMUV5      |
| 0   | 4   | FMUV5 Mini |


## 지원 제조업체

이러한 보드는 제조업체에서 지원합니다. 이 범주에 해당하려면 보드는 해당 릴리스로부터 4개월 이내에 최신 안정 PX4 릴리스에서 작동하여야 합니다.

- 제조업체가 직접 지원합니다.
- 제조업체는 코어 개발 팀에 최소 2개의 보드를 공급하여야 합니다(테스트 랙 및 테스트 팀에서 사용하기 위하여).

:::tip
이 범주의 보드를 지원하고 테스트하기 위한 PX4 유지 관리자와 비행 테스트 팀의 약속은 없지만, PX4와 제조업체 팀이 긴밀한 협력 관계를 구축할 것을 강력히 권장합니다. 이것은 모든 당사자에게 더 나은 결과를 가져올 것입니다.
:::

:::note
보드 호환성에 따라 [VER 및 REV ID](#ver_rev_id)가 할당됩니다. 보드가 FMU 사양의 변형이고 동일한 바이너리를 실행 가능하고 제조업체에서 지원하는 약간의 차이가 있는 경우에는 PX4에서 특별 할당을 수행합니다. 자세한 정보를 요청하려면 PX4 관리자에게 [boards@px4.io](mailto:boards@px4.io)로 문의하십시오.
:::

## 실험

이 보드는 위의 범주에 속하지 않거나 _더 이상_ 해당 범주에 속하지 않는 모든 보드입니다. 다음 요구 사항이 적용됩니다.

- 보드는 정의된 차량 유형에 대해 최소 하나의 PX4 릴리스에 작동하여야 하지만 반드시 최신 릴리스일 필요는 없습니다.

:::note
_이전_ Pixhawk 또는 제조업체가 지원했던 실험 보드는 원래 ID를 갖거나 유지합니다. *신규* 실험 보드에는 제조업체 지원 보드와 동일한 방식으로 호환성에 따라 [VER 및 REV ID](#ver_rev_id)가 할당됩니다. :::  

<a id="unsupported"></a>

## 미지원

이 범주에는 PX4 프로젝트 또는 제조업체에서 지원하지 않고 "실험적" 지원에 해당하지 않는 모든 보드가 포함됩니다.

- 보드는 우리가 이미 지원하는 것과 문서상 어느 정도 호환되며 "실험적"으로 올리려면, 최소한의 노력이 필요하지만 개발 팀이나 제조업체 모두 현재 이를 추구하지 않습니다.
- 하드웨어 제조업체/소유자가 Google의 [행동 강령](https://discuss.px4.io/t/code-of-conduct/13655)을 위반함
- 라이선스 제한으로 인해 보드 지원을 추가하는 데 필요한 도구/libs/drivers/etc가 호환되지 않는 것으로 간주되는 비공개 소스
- 보드가 일반 요구 사항에 명시된 최소 요구 사항을 충족하지 않습니다.

:::note
지원되지 않는 보드에는 [VER 및 REV ID](#ver_rev_id)가 할당되지 않습니다(PX4 FMUvX 펌웨어를 실행할 수 없음).
:::

## 릴리스 프로세스

제조업체가 보드가 특정 범주에 속한다고 선언시, 보드는 해당 범주 및 일반 요구 사항에 대한 요구 사항을 준수한다고 가정합니다.

When a new board is brought to market that falls into the manufacturer supported or experimental category, the manufacturer is responsible for updating the PX4 documentation and doing the board release process in PX4. We recommend the following steps:

Contact PX4 board maintainers at [boards@px4.io](mailto:boards@px4.io) and request the following:

1. The assignment of a *board id* for bootloader and firmware selection in QGC.
2. The assignment of REV and VER ID resistor values.
3. If the board supports USB: Either request the assignment of a USB VID and PID or provide the USB VID and PID.

Integrate the board according to the board porting release process described in the [porting guide](../hardware/porting_guide.md)

:::warning
The board support process may be changed and improved over time. Hardware manufacturers are encouraged to contribute to this process through the regular hardware call, the Discuss forum or Slack.
:::

## Support

If parts of the board support guide/process are not clear:

- Ask the community for help on Slack channel `#hardware` or on the discuss forums
- Attend the regular hardware call
- Consultancy options are listed here: [https://px4.io/community/consultants/](https://px4.io/community/consultants/)

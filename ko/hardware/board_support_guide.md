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

## 픽스호크 표준

Pixhawk 보드는 Pixhawk 표준을 준수하는 보드입니다. These standards are laid out on [http://pixhawk.org](http://pixhawk.org/), but at high-level require that the board passes electrical tests mandated by the standard and the manufacturer has signed the Pixhawk adopter and trademark agreement.

PX4 generally only supports boards that are commercially available, which typically means that board standards released within the last five years are supported.

<a id="ver_rev_id"></a>

### VER and REV ID (Hardware Revision and Version Sensing)

FMUv5 and onwards have an electrical sensing mechanism. This sensing coupled with optional configuration data will be used to define hardware’s configuration with respect to a mandatory device and power supply configuration. Manufacturers must obtain the VER and REV ID from PX4 board maintainers at [boards@px4.io](mailto:boards@px4.io) for releasing Pixhawk standard boards.

Because these boards are 100% compliant with the Pixhawk standard, the values assigned for VER and REV ID are the defaults for that FMUv Version.

For example on FMUv5, the values are as listed below:

| REV | VER | &nbsp;     |
| --- | --- | ---------- |
| 0   | 0   | FMUV5      |
| 0   | 4   | FMUV5 Mini |


## Manufacturer Supported

These boards are supported by the manufacturer. To qualify for this category the board must work with the latest stable PX4 release within 4 months of that release.

- Manufacture owns the support
- Manufacturer must supply at least 2 boards to the core-dev team (for use on test rack and by test team)

:::tip
While there is no commitment from the PX4 maintainers and the flight test team to support and test boards in this category, we strongly recommended PX4 and manufacturer teams build close working relationships. This will result in a better result for all parties.
:::

:::note
These boards will be assigned [VER and REV ID](#ver_rev_id) based on compatibility. A special assignment will be made by PX4 if the board is a variant of an FMU specification and capable of running the same binary, with minor differences supported by the manufacturer. Contact the PX4 maintainer at [boards@px4.io](mailto:boards@px4.io) to request more information.
:::

## Experimental

These boards are all boards that don't fall in the above categories, or don't fall in those categories _anymore_. The following requirements apply:

- The board must be working with at least one PX4 release for a defined vehicle type, but not necessarily the latest release.

:::note
Experimental boards that were _previously_ Pixhawk or Manufacturer supported will have/retain their original IDs. *New* experimental boards are allocated [VER and REV IDs](#ver_rev_id) based on compatibility, in the same way as Manufacturer Supported boards. :::  

<a id="unsupported"></a>

## Unsupported

This category includes all boards that aren't supported by the PX4 project or a manufacturer, and that fall outside the"experimental" support.

- Board is somewhat compatible on paper with something we already support, and it would take minimal effort to raise it to "experimental", but neither the dev-team or the manufacturer are currently pursuing this
- Manufacturer/Owner of hardware violates our [Code of Conduct](https://discuss.px4.io/t/code-of-conduct/13655)
- Closed source, where any of the necessary tools/libs/drivers/etc needed to add support for a board is deemed incompatible due to licensing restrictions
- Board doesn't meet minimum requirements outlined in the General requirements

:::note
Unsupported boards will NOT be assigned [VER and REV ID](#ver_rev_id) (and cannot run PX4 FMUvX firmware).
:::

## Release Process

It is assumed that when a manufacturer declares that a board falls in a certain category, that the board is compliant with the requirements for that category and the general requirements.

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

---
canonicalUrl: https://docs.px4.io/main/ko/frames_autogyro/README
---

# Autogyro Frames

:::warning
Support for autogyro frames is [experimental](../airframes/README.md#experimental-vehicles).

- Does not have a maintainer.
- Not regularly tested by the core development team.
- May not support all features needed in a product-quality UUV (feature support not known/documented). :::

[오토자이로](https://en.wikipedia.org/wiki/Autogyro)는 [회전익](https://en.wikipedia.org/wiki/Rotorcraft) 비행기입니다. 다른 유형의 회전익과 비교하여 다음과 같은 장점들이 있습니다.

- 단거리 활주로에서 이착륙 가능 (고정익과 비교하여)
- 기상 조건, 특히 돌풍에 대한 내성이 높음
- 자동 회전 모드(헬리콥터의 비상 모드 중 하나)에서 작동가능한 무동력 로터가 있음. 응급 상황에서 비행 모드를 적극적으로 변경할 필요가 없습니다 (낙하산이나 기타 장치가 필요 없음). 매우 안정적인 비행이 가능합니다.
- 이착륙 중에 [downwash](https://en.wikipedia.org/wiki/Downwash)가 없으면, 불가피한 먼지 소용돌이가 발생합니다.
- 구성 매개변수로 조정 가능한 [낮은 양력 대비 끌기 비율](https://en.wikipedia.org/wiki/Lift-to-drag_ratio). 이 기능은 무인 자동 자이로가 고장날 경우 멀리 날아갈 수 없지만 (기존 비행기의 경우처럼), 비행이 안전하고 항공기가 추락사고가 적기 때문에 유용합니다 (멀티 콥터 또는 헬리콥터의 일반적인 경우).

PX4에서 여러 오토자이로 기체를 지원합니다. The set of supported configurations can be seen in [Airframes Reference > Autogyro](../airframes/airframe_reference.md#autogyro). 이 절에서는 다양한 오토자이로 기체 프레임을 조립 구성하는 조립 절차와 지침에 대하여 설명합니다.

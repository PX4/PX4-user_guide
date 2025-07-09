---
canonicalUrl: https://docs.px4.io/main/ko/data_links/telemetry
---

# 텔레메트리 라디오/모뎀 통합

텔레메트리 라디오는 *QGroundControl*과 같은 지상 관제소와 PX 기체간의 MAVLink 무선 연결을 제공합니다. 지원되는 라디오의 고급 사용법과 새로운 텔레메트리와 PX4 통합 방법을 설명합니다.

:::tip
[주변장치 > 텔레메트리](../telemetry/README.md)에는 PX4에서 지원하는 텔레메트리 정보가 포함되어 있습니다. *SiK Radio* 펌웨어와 *3DR WiFi 텔레메트리*가 포함되어 있습니다.
:::

## 텔레메트리 통합

PX4는 Pixhawk 비행 콘트롤러의 텔레메트리를 통하여 MAVLink 기반의 원격 측정이 가능합니다. 텔레메트리가 MAVLink를 지원하고, 호환 전압 레벨/커넥터가 있는 UART 인터페이스가 있으면, 통합 작업이 필요하지 않습니다.

다른 프로토콜의 원격 측정 시스템은 잠재적으로 소프트웨어(예: 장치 드라이버)와 하드웨어(커넥터 등)를 포함하는 광범위한 통합 작업이 요구됩니다. 이것은 특정 경우에 대해 수행되었지만(예: [FrSky 텔렙메트리](../peripherals/frsky_telemetry.md)을 사용하면 FrSky 수신기를 통해 차량 상태를 RC 콘트롤러에 보낼 수 있음), 일반적인 조언을 제공하는 것은 어렵습니다. 먼저 [개발팀과 논의](../contribute/support.md)하는 것이 좋습니다.

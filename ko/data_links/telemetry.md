# 텔레메트리 라디오/모뎀 통합

텔레메트리 라디오는 *QGroundControl*과 같은 지상 관제소와 PX 기체간의 MAVLink 무선 연결을 제공합니다. 지원되는 라디오의 고급 사용법과 새로운 텔레메트리와 PX4 통합 방법을 설명합니다.

:::tip
[주변장치 > 텔레메트리](../telemetry/README.md)에는 PX4에서 지원하는 텔레메트리 정보가 포함되어 있습니다. *SiK Radio* 펌웨어와 *3DR WiFi 텔레메트리*가 포함되어 있습니다.
:::

## Integrating Telemetry Systems

PX4 enables MAVLink-based telemetry via the telemetry port of a Pixhawk-based flight controller. Provided that a telemetry radio supports MAVLink and provides a UART interface with compatible voltage levels/connector, no further integration is required.

Telemetry systems that communicate using some other protocol will need more extensive integration, potentially covering both software (e.g. device drivers) and hardware (connectors etc.). While this has been done for specific cases (e.g. [FrSky Telemetry](../peripherals/frsky_telemetry.md) enables sending vehicle status to an RC controller via an FrSky receiver) providing general advice is difficult. We recommend you start by [discussing with the development team](../contribute/support.md).

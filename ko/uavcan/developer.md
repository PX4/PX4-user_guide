---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/developer
---

# UAVCAN 개발

PX4 자동조종장치에 [UAVCAN](http://uavcan.org) 하드웨어를 추가 개발 자료들이 있습니다.

:::note
[하드웨어 > UAVCAN 주변장치](../uavcan/README.md)에는 기존에 지원되는 UAVCAN 주변장치를 PX4 사용 방법을 설명합니다.
:::

## 노드 펌웨어 업그레이드

일치하는 펌웨어가 제공되면, PX4 미들웨어는 UAVCAN 노드의 펌웨어를 자동으로 업그레이드합니다. 프로세스 및 요구 사항은 [UAVCAN 펌웨어](../uavcan/node_firmware.md) 페이지에 설명되어 있습니다.

### Zubax Babel을 사용한 디버깅

UAVCAN 버스에서 전송을 디버그하는 좋은 도구는 [Zubax Babel](https://zubax.com/products/babel)과 [GUI 도구](http://uavcan.org/GUI_Tool/Overview/)를 함께 사용하는 것입니다.

노드 테스트와 UAVCAN 지원 ESC를 수동 제어를 위하여 Pixhawk 하드웨어와 독립적으로 사용할 수 있습니다.


## 유용한 링크

- [UAVCAN 부트로더](../uavcan/bootloader_installation.md)
- [UAVCAN 펌웨어 업그레이드](../uavcan/node_firmware.md)
- [홈 페이지](http://uavcan.org) (uavcan.org)
- 0>사양</a> (uavcan.org)
- [구현 및 튜토리얼](http://uavcan.org/Implementations)(uavcan.org)
- [Cyphal/CAN Device Interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (Zubax KB) (Zubax KB)


---
canonicalUrl: https://docs.px4.io/main/ko/telemetry/rfd900_telemetry
---

# RFD900 장거리 텔레메트리

[jDrones](http://store.jDrones.com)과 [RFDesign](http://rfdesign.com.au/)에서는 * 장거리* [SiK](../telemetry/sik_radio.md) 호환 텔레메트리 라디오를 제공합니다. 라디오는 안테나와 5km 이상에서도 원활한 연결성을 제공합니다. 더 장거리에서도 통신 성공한 사례도 보고되었습니다.

![jDrones 장거리 텔레메트리](../../assets/hardware/telemetry/jdrones_long_range_uav_telemetry_rf900set02_2.jpg)

:::tip
*jDrones*는 *RFDesign* 모뎀을 생산합니다(전원 관리, 필터링, 전자 부품을 내장하는 케이스, 주요 비행 제어 장치에 연결할 케이블, 개별 변종 안테나 포함). 최초의 모뎀은 *RFD900* 이었지만, *RFDesign*과 *jDrones* 새로운 버전으로 업데이트되었습니다.
:::

*jDrones* 라디오에는 *JST-GH-JST-GH* 및 *JST-GH-DF-13 *를 위한 JST-GH 커넥터와 케이블이 제공됩니다. 대부분의 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 콘트롤러에서 "플러그 앤 플레이" 방식으로 사용할 수 있습니다. 일부 "비표준"보드에서는 커넥터를 변경해야 할 수도 있습니다.

사용할 수 있는 버전은 다음과 같습니다.

* jD-RF900Plus Longrange (900Mhz)</a> (미국)
* jD-RF868Plus Longrange (868Mhz)</a> (유럽)
* [store.rfdesign.com.au](https://store.rfdesign.com.au/radio-modems/):
  * [RFD 900+ 모뎀](https://store.rfdesign.com.au/rfd-900p-modem/)
  * [RFD 868x Modem (EU)](https://store.rfdesign.com.au/rfd868x-eu-hs-8517-62-00-90/)
  * [RFD900x](https://store.rfdesign.com.au/rfd-900x-modem-hs-8517-62-00-90/)
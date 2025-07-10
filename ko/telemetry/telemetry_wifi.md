---
canonicalUrl: https://docs.px4.io/main/ko/telemetry/telemetry_wifi
---

# WiFi 텔레메트리 라디오

WiFi 텔레메트리는 기체의 WiFi 무선 장치와 GCS간에 MAVLink 통신을 가능하게 합니다. Wi-Fi는 일반적으로 일반 텔레메트리 라디오보다 단거리에서 동작하지만, 고속의 데이터 전송 속도를 지원하며 FPV/비디오 피드를 보다 쉽게 제공할 수 있습니다. 일반적으로 차량용 라디오 장치 하나만 필요합니다 (지상국에 이미 WiFi가 있다고 가정).

PX4는 UDP와 WiFi를 통한 텔레메트리를 지원합니다. 지상국에서 첫 번째 heartbeat를 수신 할 때까지 하트 비트를 255.255.255.255의 포트 14550으로 heartbeat를 브로드캐스팅합니다. 이 시점에서는 데이터는 지상국에만 전송됩니다.

호환 가능한 WiFi 텔레메트리 모듈은 아래와 같습니다.

* [ESP8266 WiFi 모듈](../telemetry/esp8266_wifi_module.md)
* [ 3DR 텔레메트리 WiFi ](../telemetry/3dr_telemetry_wifi.md) (단종)
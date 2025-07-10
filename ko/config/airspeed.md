---
canonicalUrl: https://docs.px4.io/main/ko/config/airspeed
---

# 항속센서 보정

항속 보정 오프셋을 결정하기 위하여 항속이 0인 안정적인 기준선을 측정하여야 합니다.

:::note
[속도 센서](../sensor/airspeed.md)는 고정익과 VTOL 차량에 적극 권장됩니다.
:::

:::warning
대부분의 다른 센서 드라이버와 달리 항속 센서 드라이버는 자동으로 시작되지 않습니다. 보정하기전에 [해당 매개변수를 활성화](../advanced_config/parameters.md)하여야 합니다.
- Sensirion SDP3X ([SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X))
- TE MS4525 ([SENS_EN_MS4525DO](../advanced_config/parameter_reference.md#SENS_EN_MS4525DO))
- TE MS5525 ([SENS_EN_MS5525DS](../advanced_config/parameter_reference.md#SENS_EN_MS5525DS))
- 이글 트리 항속 센서 ([SENS_EN_ETSASPD](../advanced_config/parameter_reference.md#SENS_EN_ETSASPD))
:::

## 보정 절차

항속 보정 오프셋을 결정하기 위하여 항속이 0인 안정적인 기준선을 측정하여야 합니다. 피토 위에 손을 대고 바람을 차단한 채로(실내에서 센서를 보정할 필요가 없는 경우) 입을 사용하여 튜브에 불어 넣습니다 (보정 완료 신호를 보내기 위해).

항속 센서 보정 절차

1. *QGroundControl*을 시작하고 기체를 연결합니다.
2. 위의 *경고*와 같이 아직 수행하지 않은 경우 속도센서를 활성화합니다.
3. 상단 도구 모음에서 **톱니 바퀴** 아이콘(기체 설정)을 선택한 다음에, 가장자리 표시줄에서 **센서**를 선택합니다.
4. **대기속도** 센서 버튼을 클릭합니다.

   ![대기속도 보정](../../assets/qgc/setup/sensor/sensor_airspeed.jpg)

1. 센서로 부는 바람을 막으십시오 (예: 손을 컵 모양으로 감쌀 수 있습니다). 피톳 튜브의 구멍을 막지 않도록 주의하십시오.
1. 보정을 시작하려면 **확인**을 클릭합니다.
1. 피톳 튜브의 끝에 입으로 바람을 불어 보정 완료 신호를 보냅니다.

   :::tip
튜브에 분사하는 것은 동적 및 정적 포트가 올바르게 설치되었는지 확인하는 기본 검사이기도합니다.
교체한  센서는 튜브에 바람을 불어 넣을 때 큰 음의 차압을 판독하고 보정이 오류와 함께 중단됩니다. 
:::

1. 덮개를 제거하기 전에 2-3 초간 기다립니다(몇 초 후 캘리브레이션이 자동으로 완료됩니다).


## 추가 정보

* [QGroundControl 사용 설명서 &gt; 센서](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#airspeed)

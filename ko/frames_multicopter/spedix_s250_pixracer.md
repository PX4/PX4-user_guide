---
canonicalUrl: https://docs.px4.io/main/ko/frames_multicopter/spedix_s250_pixracer
---

# Spedix S250AQ

Spedix S250은 [Pixracer](../flight_controller/pixracer.md) 자동조종장치에 최적인 비대칭 레이싱 쿼드 콥터입니다.

## 하드웨어

이 조립에 필요한 하드웨어가 아래에 표시되어 있습니다.

![Spedix s250 부품 (조립되지 않음)](../../assets/airframes/multicopter/spedix_s250aq_pixracer/spedix_s250aq_arf_components_unassembled.jpg)

## 장착 및 배선

[Pixracer 지침](../flight_controller/pixracer.md)에 표시된대로 GPS와 Wifi 모듈을 연결합니다.

[기체 정의서](../airframes/airframe_reference.md#quadrotor-asymmetric)에 정의된 배치 방법과 순서대로 모터를 연결합니다.

<div>
  <img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1 (전면 우측: 반시계)</li><li><b>MAIN2</b>: 모터 2(후면 좌측: CCW)</li><li><b>MAIN3</b>: 모터3(전면 좌측: CW)</li><li><b>MAIN4</b>: 모터 4(후면 우측: CW)</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

## 기체 설정

아래와 같이 Quadrotor 비대칭 Spedix S250AQ 구성을 선택하십시오. PX4를 쿼드로터 모드로 전환하고 적절한 기본 튜닝 게인을 로드합니다.

![QGC - Spedix250aq의 경우 COnfigure 기체](../../assets/airframes/multicopter/spedix_s250aq_pixracer/spedix_250aq_qgc.png)
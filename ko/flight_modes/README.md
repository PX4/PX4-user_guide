---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/README
---

# 비행 모드

*Flight Modes* define how the autopilot responds to user input and controls vehicle movement. The tables below summarizes flight modes for fixed-wing and copter ([table key is below](#key)). 이것은 "고급 수준"의 기본 동작이며 기체 매개변수에 따라 달라질 수 있습니다. 링크된 주제 (사이드 바)는 튜닝 매개 변수를 포함하여 개별 모드에 대한 자세한 정보를 제공합니다.

**Tip** A *beginner friendly* explanation of all flight modes is provided in [Getting Started > Flight Modes](../getting_started/flight_modes.md). :::

<!-- Styles used for tables below -->
<style>
table {
  display: block;
  overflow: scroll;
  width: 100%;
  font-size:1.5rem;
  text-align:center;
}

.markdown-section table {
  display: block;
}

tr td:nth-last-child(1) {
    text-align:left;
}

/*
  .col_summary {
    width:50px;
  }
*/


th {
  font-size:1.0rem;
}


@media (min-width: 1500px){
.page-inner {
  max-width: 1100px;
  }
}

@media (min-width: 1400px) and (max-width: 1500px) {
.page-inner {
  max-width: 1000px;
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
.page-inner {
  max-width: 800px;
  }
}

</style>

## Fixed-wing

<table>
 <thead>
   <tr>
     <th class="col_modes">모드</th>
     <th class="col_r_p">좌우 및 상하 기울기</th>
     <th class="col_yaw">좌우</th>
     <th class="col_throttle">추진력</th>
     <th class="col_sensor">위치 센서</th>
     <th class="col_summary">요약</th></tr>
   </tr>
 </thead>
<tbody>

<tr id="position_fw">
 <td><a href="../flight_modes_mc/position.html">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td><p>중앙 스틱이 차량을 직선 및 수평 비행 상태로 전환하는 RC 모드로, 차량 자세 / 태도, 고도 및 직선 차량 경로가 바람 (및 기타 힘)에 대해 유지됩니다.
   <ul>
       <li>중앙 RC RPY 스틱 – 바람에 대항하여 현재 방향으로 직선 지상 트랙을 따라가는 수평 비행.</li>
       <li>센터  외부:
      <ul>
        <li>피치 스틱은 고도를 제어합니다 (<a href="#altitude_fw">고도 </a>와 동일).</li>
        <li>롤 스틱은 롤 각도를 제어합니다. Autopilot은 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">조정 비행</a>을 유지합니다 (<a href="#stabilized_fw">안정화</a>와 동일함).</li>
        <li>스로틀은 대기 속도를 설정합니다 (<a href="#altitude_fw">고도</a>와 동일).</li> 
        <li>Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).</li>
        <li>Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). <a href="#stabilized_fw">안정화</a>와 동일합니다.</li>
     </ul></li>
   </ul>
  </p>
  </td>
</tr>


<tr id="altitude_fw">
 <td><a href="../flight_modes_mc/altitude.html">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="20px" /></a></p>
 </td>
 <td><p>S (roll)</p><p>S (roll)</p></td>
 <td>M</td>
 <td>S<sup>+</sup></td>
 <td><a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계)" width="20px" /></a></td>
 <td>
 <p>RC 모드는 <a href="#stabilized_fw">안정화</a> 모드와 같지만 <em>고도 안정화</em>를 사용합니다 (중앙 스틱은 차량을 직선 및 수평 비행 상태로 만들고 현재 고도를 유지합니다). 기체의 경로가 유지되지 않고 바람에 표류할 수 있습니다.
  <ul>
    <li>중앙 RPY 스틱 (데드 밴드 내부) :
      <ul>
       <li>자동 조종 장치는 날개도 수평을 유지하면서 고도를 유지합니다.</li> 
       <li>스로틀 스틱은 대기 속도 센서가 연결된 경우 기체의 대기 속도를 제어합니다 (대기 속도 센서가 없으면 사용자가 스로틀을 제어할 수 없음).</li>
    </ul>
    <li>센터  외부:
      <ul>
       <li>피치 스틱은 고도를 제어합니다.</li>
       <li>스로틀 스틱은 기체의 속도를 제어합니다 (중앙 RPY 스틱의 경우).</li>
       <li>Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). <a href="#stabilized_fw">안정화</a>와 동일합니다.</li>
    </ul>
  </li>
  </ul>
 </p>
 </td>
</tr>


<tr id="stabilized_fw">
 <td><a href="../flight_modes_fw/stabilized.html">Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td>
  <p>중앙에있는 RP 스틱이 차량 자세 (롤 및 피치)를 평준화하는 RC 모드. 기체의 고도와 경로가가 유지되지 않고 바람에 표류할 수 있습니다.</p>
<ul>
   <li>피치 스틱은 피치 각도를 제어합니다.</li>
   <li>롤 스틱은 롤 각도를 제어합니다. 자동 조종 장치는 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">조정 비행</a>을 유지합니다.</li>
   <li>스토틀 스틱으로 추진력을 제어합니다</li>
   <li>Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>).</li>
</ul>
 </td>
</tr>

<tr id="acro_fw">
 <td><a href="../flight_modes_mc/acro.html">Acro</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>곡예 기동을 수행하는 RC 모드 (예 : 롤, 뒤집기, 포장 마차 및 곡예 인물)</p>
<p>RPY 스틱 입력은 자동 조종 장치에 의해 안정화되는 각속도 명령으로 변환됩니다. Throttle is passed directly to control allocation.</p></td>
</tr>


<tr id="manual_fw">
 <td><a href="../flight_modes_fw/manual.html">Manual</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>M</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td><p>RC mode where stick input is sent directly to control allocation (for "fully" manual control).</p>
   <p>FMU를 무시하는 유일한 모드입니다 (명령은 안전 코프로세서를 통해 전송 됨). FMU 펌웨어 오작동시 RC를 통해 스로틀, 엘리베이터, 에일러론 및 방향타를 완전히 제어 할 수있는 안전 메커니즘을 제공합니다.
   </p>
  </td>
</tr>


<tr id="takeoff_fw">
 <td><a href="../flight_modes_fw/takeoff.html">이륙</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 <em>투석기/수동 발사 모드</em> 또는 <em>활주로 이륙 모드</em> (현재 방향)를 사용하여 이륙 시퀀스를 시작합니다.</td>
</tr>


<tr id="land_fw">
 <td><a href="../flight_modes_fw/land.html">착륙</a></td>
 <td class="centred" colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>Vehicle initiates the <a href="../flight_modes/mission.html#fw-mission-landing">fixed-wing landing</a> sequence.</td>
</tr>

<tr id="hold_fw">
 <td><a href="../flight_modes_fw/hold.html">대기</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 현재 고도에서 GPS 유지 위치를 중심으로 선회합니다.</td>
</tr>

<tr id="return_fw">
 <td><a href="../flight_modes/return.html">복귀</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 안전 위치로 경로 비행합니다. 반환 동작은 매개 변수 설정에 따라 다르며 임무 경로나 임무 착륙 패턴 (정의 된 경우)을 따라서 동작합니다.</td>
</tr>


<tr id="mission_fw">
 <td><a href="../flight_modes/mission.html">임무</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>차량은 사용자가 업로드한 <a href="../flying/missions.html">미리 정의된 임무/비행 계획</a>을 실행합니다. </td>
</tr>

<tr id="offboard_fw">
 <td><a href="../flight_modes/offboard.html">오프보드</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>차량은 MAVLink를 통해 제공되는 자세 설정치를 준수합니다 (종종 직렬 케이블 또는 Wi-Fi를 통해 연결된 컴패니언 컴퓨터에서).</td>
</tr>
 
</tbody></table>

## 멀티콥터

<table>
 <thead>
   <tr>
     <th>모드</th>
     <th>좌우 및 상하 기울기</th>
     <th>좌우</th>
     <th>추진력</th>
     <th>위치 센서</th>
     <th class="col_summary">요약</th></tr>
   </tr>
 </thead>
<tbody>


<tr id="position_mc">
 <td><a href="../flight_modes_mc/position.html">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td><p>롤, 피치, 스로틀 스틱이 해당 축/방향의 움직임을 제어하는 RC 모드. 중앙에 있는 스틱은 차량을 수평으로 유지하고 바람에 맞서 고정된 고도와 위치를 유지합니다.
  <ul>
    <li>중앙에있는 RPT 스틱은 바람과 수평 자세에 대해 x, y, z 위치를 안정적으로 유지합니다.</li>
    <li>센터  외부:
      <ul>
       <li>롤/피치 스틱은 차량의 좌우 및 전후 방향(각각)으로 지면에서 수평 가속을 제어합니다.</li>
       <li>스로틀 스틱은 상승 하강 속도를 제어합니다.</li>
       <li>요 스틱은 수평면 위의  회전 각속도를 제어합니다.</li>
      </ul>
    </li>
    <li>이륙:
      <ul>
       <li>착륙했을 때 스로틀 스틱을 62.5 % (하단에서 전체 범위) 이상으로 올리면 기체가 이륙합니다.</li>
      </ul>
    </li>
    </ul>
  </li>
  </ul>
 </p>
</td>
</tr>

<tr id="altitude_mc">
 <td><a href="../flight_modes_mc/altitude.html">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계)" width="20px" /></a></td>
 <td><p>RC 모드는 <a href="#manual_stabilized_mc">수동/안정화</a> 모드와 같지만 <em>고도 안정화</em>가 있습니다 (가운데 스틱이 차량을 수평으로 유지하고 고정 고도를 유지). 차량의 수평 위치는 바람 (또는 기존 운동량)으로 인해 움직일 수 있습니다.
  <ul>
    <li>중앙 스틱 (데드 밴드 내부) :
      <ul>
       <li>RPY는 기체 수평을 유지합니다.</li> 
       <li>스로틀(~ 50 %)은 현재 고도를 바람에 대해 일정하게 유지합니다.</li>
    </ul>
    <li>센터  외부:
      <ul>
       <li>롤/피치 스틱은 각각의 방향에서 틸트 각도를 제어하여 해당하는 좌우와 전후 방향으로 이동합니다.</li>
       <li>스로틀 스틱은 미리 정해진 최대 속도 (및 다른 축의 이동 속도)로 속도를 올리거나 내립니다.</li> 
       <li>요 스틱은 수평면 위의  회전 각속도를 제어합니다.</li> 
      </ul>
    </li>
    <li>이륙:
      <ul>
       <li>착륙했을 때 스로틀 스틱을 62.5 % (하단에서 전체 범위) 이상으로 올리면 기체가 이륙합니다.</li>
      </ul>
    </li>
  </ul>
 </p>
 </td>
</tr>


<tr id="manual_stabilized_mc">
 <td><a href="../flight_modes_mc/manual_stabilized.html">Manual/ Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>중앙 스틱이 기체의 수평으로 유지하는 RC 모드 (위치가 안정화 되지 않음).</p>
   <p>
   <ul>
    <li>중앙 RP 스틱은 기체의 수평을 조절합니다.</li>
    <li>센터  외부:
      <ul>
       <li>롤/피치 스틱은 각각의 방향 각도를 제어하여 해당하는 좌우와 전후 방향으로 이동합니다. </li>
       <li>스로틀 스틱은 상하 속도 (및 다른 축의 이동 속도)를 제어합니다.</li>
       <li>요 스틱은 수평면 위의  회전 각속도를 제어합니다.</li>
      </ul>
    </li>
    </ul>
  </p>
</td>
</tr>

<tr id="acro_mc">
 <td><a href="../flight_modes_mc/acro.html">Acro</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>곡예 기동을 수행하는 RC 모드 (예 : 뒤집기, 롤 및 루프).</p> 
  <p>RC RPY 스틱 입력은 각 축의 회전 각속도를 제어합니다. Throttle is passed directly to control allocation.  스틱이 중앙에 오면 차량은 회전을 멈추고, 현재 방향(예 : 반전될 수 있음)을 유지하고 현재 운동량에 따라 이동합니다.</p>
 </td>
</tr>


<tr id="orbit_mc">
 <td><a href="../flight_modes_mc/orbit.html">Orbit</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="20px" /></a></p>
 </td>
 <td>-</td>
 <td>-</td>
 <td>-</td>
 <td></td>
 <td><p>원 운동 비행을 위해 GCS 시작 가이드 모드, 항상 중앙을 향합니다.</p> 
  <p>모드는 GCS에서 시작해야하며 중심점과 초기 반경 및 고도를 지정해야합니다. RC 제어는 선택 사항이며 궤도 고도, 반경, 속도 및 방향을 변경하는 데 사용할 수 있습니다. 고도 제어는 <a href="#position_mc">위치 모드</a>와 동일합니다.</p>
 </td>
</tr>

<tr id="takeoff_mc">
 <td><a href="../flight_modes_mc/takeoff.html">이륙</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 이륙 고도까지 상승하고 위치를 유지합니다.</td>
</tr>

<tr id="land_mc">
 <td><a href="../flight_modes_mc/land.html">착륙</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 모드 적용된 위치에 착륙합니다.</td>
</tr>

<tr id="hold_mc">
 <td><a href="../flight_modes_mc/hold.html">대기</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 현재 GPS 위치와 고도에서 호버링합니다.</td>
</tr>

<tr id="return_mc">
 <td><a href="../flight_modes/return.html">복귀</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 안전 위치로 경로 비행합니다. 반환 동작은 매개 변수 설정에 따라 다르며 임무 경로나 임무 착륙 패턴 (정의 된 경우)을 따라서 동작합니다.</td>
</tr>


<tr id="mission_mc">
 <td><a href="../flight_modes/mission.html">임무</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>차량은 사용자가 업로드한 <a href="../flying/missions.html">미리 정의된 임무/비행 계획</a>을 실행합니다.</td>
</tr>

<tr id="followme_mc">
 <td><a href="../flight_modes_mc/follow_me.html">따라다니기</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>기체는 QGC를 실행하는 Android 휴대 전화/태블릿을 사용하는 사용자를 자동으로 추적합니다.</td>
</tr>

<tr id="offboard_mc">
 <td><a href="../flight_modes/offboard.html">오프보드</a></td>
 <td colspan="3">자동</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" /></a></td>
 <td>차량은 MAVLink를 통해 제공되는 위치, 속도 또는 자세 설정점을 준수합니다 (종종 직렬 케이블 또는 Wi-Fi를 통해 연결된 컴패니언 컴퓨터에서).</td>
</tr>
 
</tbody></table>

## 수직이착륙기

VTOL 기체는 현재 차량 모드 (MC 또는 FW)를 기반으로 실행되는 고정익 및 멀티콥터 비행 모드를 모두 지원합니다.

VTOL은 두 구성 모두에서 [오프 보드](../flight_modes/offboard.md) 모드를 지원합니다.


## 요점

핵심 사항들은 다음과 같습니다.

| 기호                                                                                                                                                                                                                                                                                                                                                                  | 설명                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| M                                                                                                                                                                                                                                                                                                                                                                   | RC 스틱을 통한 수동 제어. RC input is sent directly to control allocation.          |
| S                                                                                                                                                                                                                                                                                                                                                                   | 자세를 안정시키기위한 자동조종장치의 지원. RC 입력이 필요합니다. RC 스틱의 위치는 차량의 방향에 매핑됩니다.            |
| S<sub>rate</sub>                                                                                                                                                                                                                                                                                                                                                    | 자세를 안정시키기위한 자동조종장치의 지원. RC 입력이 필요합니다. RC 스틱의 위치는 해당 방향에서 차량의 회전 속도에 매핑됩니다. |
| S<sup>+</sup>                                                                                                                                                                                                                                                                                                                                                       | 바람에 대한 위치 또는 고도를 유지하기위한 자동조종장치의 지원. RC 입력이 필요합니다.                          |
| 자동                                                                                                                                                                                                                                                                                                                                                                  | 이 모드는 자동입니다 (RC 제어는 모드 변경을 제외하고 기본적으로 비활성화 됨).                             |
| <a id="key_position_fixed"></a><img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="20px" />                                                                                                                                                                                                                                  | 필요한 위치와 높이를 측정하는 센서 (예 : 광학 흐름, GPS + 기압계, 시각 관성 주행 거리계)                   |
| <a id="altitude_only"></a><img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계)" width="20px" />                                                                                                                                                                                                                              | 필요한 높이와 고도를 측정하는 센서 (예 : 기압계, 거리계)                                         |
| <a id="key_difficulty"></a>[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="20px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="20px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="20px" />](#key_difficulty) | 비행 모드 난이도 (초급/중급/고급).                                                      |


약어
  * RPY : 롤, 피치, 요
  * RPT : 롤, 피치 스로틀

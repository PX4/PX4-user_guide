# VTOLs

PX4는 고정익의 전진 비행과 멀티콥터의 수직 이착륙 기능을 모두 가지고 있는 기체를 칭하는 용어는  VTOL입니다.

![수직 기술: Deltaquad QuadPlane VTOL](../../assets/airframes/vtol/vertical_technologies_deltaquad/hero.jpg)

VTOL은 고정익과 멀티콥터의 장점을 모두 가지고 있습니다.

- **수직 이착륙:** 능숙한 조종사 아니어도 웬만한 장소에서 이착륙이 어렵지 않습니다.
- **Fast and efficient fixed-wing flight:** Faster, further, and longer missions, carrying heavier payloads.
- **호버링:** 사진, 구조 스캔 등을 위한 안정적인 플랫폼

PX4가 지원하는 VTOL 유형, 조립, 구성 및 비행 방법에 대하여 설명합니다.

## VTOL 유형

PX4는 세 가지 중요한 VTOL 유형을 지원합니다.

<div class="grid_wrapper three_column">
  <div class="grid_item">
    <div class="grid_item_heading"><a href="tailsitter.html" title="테일시터"><big>테일시터</big></a></div>
    <div class="grid_text">
    Rotors permanently in fixed-wing position.
    이륙하고 꼬리로 착륙합니다. 전체 차량이 앞으로 기울어져 전진 비행으로 전환합니다.
    <img src="../../assets/airframes/vtol/wingtraone/hero.jpg" title="윙트라온" />
    <ul>
      <li>간단하고 견고함.</li>
      <li>최소한의 액추에이터 세트</li>
      <li>바람이 불면 제어하기 어려울 수 있음</li>
      <li>동일한 액츄에이터가 사용되므로 호버링과 전진 비행의 효율성간의 균형</li>
    </ul>
    </div>
  </div>
<div class="grid_item">
  <div class="grid_item_heading"><a href="tiltrotor.html" title="틸트로터"><big>틸트로터</big></a></div>
  로터는 멀티콥터에서 전진 비행 방향으로 전환하기 위하여 90도 회전합니다.
  이륙하고 배로 착지합니다.
  <div class="grid_text">
  <img src="../../assets/airframes/vtol/eflite_convergence_pixfalcon/hero.jpg" title="E 플라이트 컨버전스" />
  <ul>
    <li>모터 틸트용 추가 액추에이터</li>
    <li>기계적으로 복잡한 틸팅 메커니즘</li>
    <li>더 많은 제어 권한으로 테일시터보다 호버링이 용이합니다.</li>
  </ul>
  </div>
</div>
<div class="grid_item">
  <div class="grid_item_heading"><a href="standardvtol.html" title="표준 VTOL"><big>표준 VTOL</big></a></div>
  <div class="grid_text">
  멀티콥터와 전진 비행을 위한 별도의 로터 및 비행 제어 장치. 이륙하고 배로 착지합니다.
  <img src="../../assets/airframes/vtol/vertical_technologies_deltaquad/hero_small.png" title="수직 기술: Deltaquad" />
  <ul>
    <li>별도의 호버링 및 전진 비행 추진 시스템으로 인한 중량 증가</li>
    <li>전용 호버링 및 포워드 플라이트 액츄에이터로 제어가 가장 용이 </li>
    <li>호버링 가능</li>
    <li>전진 비행 추진을 위한 연료 엔진 사용 가능</li>
  </ul>
  </div>
 </div>
</div>

일반적으로, 기계적 복잡성이 증가함에 따라 기체의 비행이 용이할 수 있지만, 비용과 중량이가 증가합니다. 각 유형에는 장단점이 있으며, 이를 기반으로 성공적인 상업적인 벤처 회사들이 있습니다.

위의 각 주요 유형에는 모터 수, 모터 기하학 및 비행 표면 등과 같은 많은 가능한 변형이 있습니다. PX4 provides _airframe configurations_ for many of the more common vehicle setups. 지원되는 세트는 [Airframes Reference &gt; VTOL](../airframes/airframe_reference.md#vtol)에 설명되어 있습니다.

::: info

- 필요한 차량 설정이 지원되지 않는 경우에는 [기체를 추가](../dev_airframes/adding_a_new_frame.md)하여야 합니다(일부 [PX4 개발](../development/development.md) 전문 지식 필요).
- The VTOL codebase is the same codebase as for all other airframes and just adds additional control logic, in particular for transitions.

:::

## 비행 모드

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. Multicopter mode is mainly used for take off and landing while the fixed-wing mode is used for efficient travel and/or mission execution.

The flight modes for VTOL vehicles are the same as for [multicopter](../flight_modes_mc/index.md) when flying in MC mode and [fixed-wing](../flight_modes_fw/index.md) when flying in FW mode.

The transition between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in missions or other auto modes.

## 조립

::: info For information about commercial and kit VTOL vehicles see: [Complete Vehicles](../complete_vehicles/index.md) :::

PX4 controlled vehicles generally share the same core components: a flight controller connected to a power system, GPS, external compass (highly recommended), radio control system (optional) and/or telemetry radio system (optional), and airspeed sensor (highly recommended for VTOL vehicles).

The flight controller outputs are connected to the vehicle motor ESCs and/or flight control servos and actuators, which are separately powered.

The mapping between flight controller outputs and specific controls/motors depends on the vehicle frame used, and is specified in the [Airframes Reference > VTOL](../airframes/airframe_reference.md#vtol).

Assembly information is covered in several sections:

- [기본 조립](../assembly/README.md)에는 인기 있는 [비행 콘트롤러](../flight_controller/README.md)들의 핵심 부품들의 설정을 설명들이 포함되어 있습니다. 가이드가 없는 비행 컨트롤러는 일반적으로 거의 같은 방법으로 설정됩니다(거의 항상 유사한 설정 가이드가 포함됨).
- [주변 장치](../peripherals/README.md)에는 [대기 속도 센서](../sensor/airspeed.md)를 비롯하여 기타 주변 장치에 대한 정보가 포함되어 있습니다.
- [기체 정의서 &gt; VTOL](../airframes/airframe_reference.md#vtol) 각 기체 구성에 대해 다른 비행 콘트롤러에 연결하여야 하는 비행 컨트롤러 출력을 설명합니다.
  - 정의된 기체의 구성을 선택하십시오. 이는 비행을 위하여 사전 튜닝이 충분하기 때문입니다(미세 조정만 필요할 수 있음).
  - 그렇지 않으면, 기체와 일치하는 "일반 기체"를 선택하십시오.

In addition, build logs showing how others have set up different types of vehicles are provided as sub topics. For example see [FunCub QuadPlane](../frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk.md).

## 설정

VTOL configuration is covered in a number of sections:

- [기본 설정](../config/README.md) - 모든 차량 유형(센서, 안전 시스템, 배터리 등)에 공통적인 설정입니다.
- [VTOL 특정 구성](../config_vtol/index.md)
- [주변 하드웨어](../peripherals/README.md) - 선택 가능한 하드웨와 및 센서에 대한 설정입니다.
- [고급 설정](../advanced_config/README.md): 공장 조정과 고급 및 선택적 구성을 포함하는 추가 설정입니다.

## 비디오

### 교육

VTOL Control & Airspeed Fault Detection (PX4 Developer Summit 2019)

<lite-youtube videoid="37BIBAzD6fE" title="VTOL control and airspeed fault detection"/>

<!-- 20190704 -->

### 테일시터

[UAV Works VALAQ Patrol Tailsitter](https://www.valaqpatrol.com/valaq_patrol_technical_data/)

<lite-youtube videoid="pWt6uoqpPIw" title="UAV Works VALAQ"/>

[TBS Caipiroshka](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md)

<lite-youtube videoid="acG0aTuf3f8" title="PX4 VTOL - Call for Testpilots"/>

### 틸트로터

[Convergence Tiltrotor](../frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon.md)

<lite-youtube videoid="E61P2f2WPNU" title="E-flite Convergence Autonomous Mission Flight"/>

### QuadPlane VTOL

[FunCub QuadPlane](../frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk.md)

<lite-youtube videoid="4K8yaa6A0ks" title="Fun Cub PX4 VTOL Maiden"/>

[Falcon Vertigo QuadPlane](../frames_vtol/vtol_quadplane_falcon_vertigo_hybrid_rtf_dropix.md)

<lite-youtube videoid="h7OHTigtU0s" title="PX4 Vtol test"/>

[Ranger QuadPlane](../frames_vtol/vtol_quadplane_volantex_ranger_ex_pixhawk.md)

<lite-youtube videoid="7tGXkW6d3sA" title="PX4 Autopilot - Experimental VTOL with Pixhawk and U-Blox M8N GPS"/>

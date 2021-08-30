# 테일시터 VTOL

**테일시터 VTOL**은 꼬리로 이착륙하지만, 일반 비행을 위해 고정익 방향으로 뒤집힙니다. 테일 시터 로터는 전진 비행을 위해 영구적으로 고정됩니다.

Tailsitters는 일반적으로 [다른 유형의 VTOL](../frames_vtol/README.md)보다 기계적으로 덜 복잡하므로 구축 및 유지 관리 비용이 저렴합니다. 그러나 공기 역학적으로 더 복잡하고 특히 바람이 부는 조건에서 호버링 및 전환을 위해 조정하고 비행하기가 더 어려울 수 있습니다.

## 테일시터 기체

<div class="grid_wrapper two_column">
  <div class="grid_item">
    <div class="grid_item_heading"><big><a href="../airframes/airframe_reference.html#vtol-duo-tailsitter">VTOL 듀오 테일시터</a></big></div>
    <div class="grid_text">
    호버에서 고정익 비행으로 뒤집기 위해 엘레본을 사용하는 2개의 로터 VTOL.<br><br>
    <img src="../../assets/airframes/vtol/wingtraone/hero.jpg" title="Wingtra: WingtraOne VTOL Duo Tailsitter" alt="wingtraone" /> 
    <ul>
      <li>보다 효율적인 전방 비행</li>
      <li>특히 바람이 부는 날에는 호버링이 더 어렵습니다.</li>
      <li>호버링과 이동 튜닝이 어려움</li>
      <li>더 컴팩트한 폼 팩터</li>
    </ul>
    </div>
  </div>
<div class="grid_item">
  <div class="grid_item_heading"><big><a href="../airframes/airframe_reference.html#vtol-quad-tailsitter">VTOL 쿼드 테일시터</a></big></div>
  엘레본 옵션이 있는 4개의 로터 VTOL. 로터를 사용하여 모드 간 전환(있는 경우 엘레본과 함께).
  <div class="grid_text">
  <img title="Skypull SP-1 VTOL QuadTailsitter" src="../../assets/airframes/vtol/skypull/skypull_sp1.jpg" />
  <ul>
    <li>호버 모드가 더 쉽고 안정적입니다.</li>
    <li>덜 컴팩트한 폼 팩터(운반하기 어려움)</li>
    <li>"X" 및 "+" 로터 구성이 지원됩니다(기체 참조 참조).</li>
  </ul>
  </div>
</div>
</div>

Duo Tailsitters는 일반적으로 순항 비행에서 더 효율적이며(4개의 작은 프로펠러가 2개의 큰 프로펠러보다 덜 효율적임) 물리적으로 더 작습니다. 그러나, 호버 모드에서 공기 역학적으로 훨씬 더 복잡하기 때문에 호버와 전환 모두를 조정하기가 훨씬 더 어렵습니다. 쿼드 테일시터는 호버 모드에서 비행하기 쉽고 바람이 많이 부는 조건에서 더 안정적입니다.

## 설정/비행

VTOL setup and flying are covered in the [VTOL](../frames_vtol/README.md) parent topic.

:::note
The instructions are essentially the same for all VTOL. The main frame-specific differences are the motor wiring (see [VTOL Duo Tailsitter](../airframes/airframe_reference.md#vtol-duo-tailsitter) and [VTOL Quad Tailsitter](../airframes/airframe_reference.md#vtol-quad-tailsitter)), and some aspects of tuning the configuration.
:::

## Build Logs

Step-by-step guides of how to set up PX4 on tailsitter frames are listed below:

- [TBS Caipiroshka Tailsitter Build (Pixracer)](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md)

:::tip
We recommend that you also review build logs for other PX4 VTOL, and Copter vehicles (most of the setup is the same).
:::

## Videos

This section contains videos that are specific to Tailsitter VTOL (videos that apply to all VTOL types can be found in [VTOL](../frames_vtol/README.md)).

### Duo
---

[UAV Works VALAQ Patrol Tailsitter](https://www.valaqpatrol.com/tech-data/) - Tailsitter takeoff, transition, landing.

@[youtube](https://youtu.be/pWt6uoqpPIw)

---

[TBS Caipiroshka](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md) - Tailsitter takeoff (close up), hover, level flight, transitions.

@[youtube](https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720)

---

*PX4 Tailsitter prototype*  - Tailsitter takeoff, transition, landing. 
<!-- provided by slack user xdwgood. Not yet got detail -->
@[youtube](c3myer2n80M)

### Quad

[Skypull](https://www.skypull.technology/) Tethered quad tailsitter (promotional video) @[youtube](https://youtu.be/6s-Izqb_GVs)

## Gallery

<div class="grid_wrapper three_column">
  <div class="grid_item">
    <div class="grid_item_heading"><big><a href="https://wingtra.com/mapping-drone-wingtraone/">WingtraOne</a></big></div>
    <div class="grid_text">
    <img src="../../assets/airframes/vtol/wingtraone/hero.jpg" title="Wingtra: WingtraOne VTOL Duo Tailsitter" alt="wingtraone" /> 
    </div>
  </div>
  <div class="grid_item">
    <div class="grid_item_heading"><big><a href="https://www.skypull.technology/">Skypull</a></big></div>
    <div class="grid_text">
      <img title="Skypull SP-1 VTOL QuadTailsitter" src="../../assets/airframes/vtol/skypull/skypull_sp1.jpg" />
    </div>
  </div>
  <div class="grid_item">
    <div class="grid_item_heading"><big><a href="../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.html">TBS Caipiroshka</a></big></div>
    <div class="grid_text">
      <img title="TBS Caipiroshka" src="../../assets/airframes/vtol/caipiroshka/caipiroshka.jpg" />
    </div>
  </div>
  <div class="grid_item">
    <div class="grid_item_heading"><big>ax1800</big></div>
    <div class="grid_text">
      <img title="ax1800" src="../../assets/airframes/vtol/xdwgood_ax1800/hero.jpg" />
    </div>
  </div>
  <div class="grid_item">
    <div class="grid_item_heading"><big><a href="https://www.valaqpatrol.com/tech-data/">UAV Works VALAQ Patrol Tailsitter</a></big></div>
    <div class="grid_text">
      <img title="UAV Works VALAQ Patrol Tailsitter" src="../../assets/airframes/vtol/uav_works_valaq_patrol/hero.jpg" />
    </div>
  </div>
</div>

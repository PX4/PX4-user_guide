# 에어프레임 참조

:::note
이 **목록**은 `make airframe_metadata` 빌드 명령을 사용하여 소스 코드에서 [자동으로 생성](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/px4airframes/markdownout.py)됩니다.
:::

이 페이지는 모터 할당 및 번호 지정을 포함하여 지원되는 모든 기체 유형을 나열합니다. **녹색** 모터는 시계 방향으로 회전화며, **청색** 모터는 반시계 방향으로 회전합니다.

일부 비행 컨트롤러에는 **AUX** 채널이 없을 수 있습니다. 해당 채널이 있다면, 보통 **AUX OUT** 라벨이 존재합니다. 

<style>
div.frame_common table, div.frame_common table {
   display: table;
   table-layout: fixed;
   margin-bottom: 5px;
}

div.frame_common table {
   float: right; 
   width: 70%;
}

div.frame_common img {
  max-height: 180px;
  width: 29%;
  padding-top: 10px;
}

div.frame_variant table {
   width: 100%;
}

div.frame_variant th:nth-child(1) {
  width: 30%;
  }

div.frame_variant tr > * {
    vertical-align : top;
}

div.frame_variant td, div.frame_variant th {
  text-align : left;
}
</style>

 

## 비행선

### 비행선

<div class="frame_common">
  <img src="../../assets/airframes/types/Airship.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 우현 추진기</li><li><b>MAIN2</b>: 좌현 추진기</li><li><b>MAIN3</b>: 틸트 추진기</li><li><b>MAIN4</b>: 후미 추진기</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="airship_airship_cloudship">
 <td>클라우드쉽</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 2507</p></td>
</tr>
  </table>
</div>

## 오토자이로 

### 오토자이로

<div class="frame_common">
  <img src="../../assets/airframes/types/Autogyro.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>AUX1</b> : 프리로테이터용 RC AUX1 채널 피드 스루 (선택 사항)</li><li><b>AUX2</b> : 릴리스 장치용 RC AUX2 채널 피드 스루 (선택 사항)</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="autogyro_autogyro_thunderfly_auto-g2">
 <td><a href="https://github.com/ThunderFly-aerospace/Auto-G2/">ThunderFly Auto-G2</a></td>
 <td>유지보수: ThunderFly s.r.o., Roman Dvorak &lt;dvorakroman@thunderfly.cz&gt;<p><code>SYS_AUTOSTART</code> = 17002</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 로터 헤드</li><li><b>MAIN2</b>: 우측 로터 헤드</li><li><b>MAIN3</b>: 승강타</li><li><b>MAIN4</b>: 방향타</li><li><b>MAIN5</b>: 방향타 (보조, 추가)</li><li><b>MAIN6</b>: 스로틀</li><li><b>MAIN7</b>: 바퀴</li></ul></p></td>
</tr>
<tr id="autogyro_autogyro_thunderfly_tf-g2">
 <td><a href="https://github.com/ThunderFly-aerospace/TF-G2/">ThunderFly TF-G2</a></td>
 <td>유지보수: ThunderFly s.r.o., Roman Dvorak &lt;dvorakroman@thunderfly.cz&gt;<p><code>SYS_AUTOSTART</code> = 17003</p><p><b>특정 출력:</b><ul><li><b>MAIN2</b>: 좌측 로터 헤드</li><li><b>MAIN3</b>: 우측 로터 헤드</li><li><b>MAIN4</b>: 방향타</li><li><b>MAIN5</b>: 스로틀</li></ul></p></td>
</tr>
  </table>
</div>

## 풍선

### 풍선

<div class="frame_common">
<img src="../../assets/airframes/types/Balloon.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="balloon_balloon_thunderfly_balloon_tf-b1">
 <td><a href="https://github.com/ThunderFly-aerospace/TF-B1/">ThunderFly balloon TF-B1</a></td>
 <td>유지보수: ThunderFly s.r.o.<p><code>SYS_AUTOSTART</code> = 18001</p></td>
</tr>
  </table>
</div>

## 콥터

### 동축 헬리콥터

<div class="frame_common">
  <img src="../../assets/airframes/types/HelicopterCoaxial.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 좌측 경사판 서보모터, 피치 축</li><li><b>MAIN2</b>: 우측 경사판 서보모터, 롤 축</li><li><b>MAIN3</b>: 상부 로터 (CCW)</li><li><b>MAIN4</b>: 하부 로터 (CW)</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_coaxial_helicopter_esky_(big)_lama_v4">
 <td>Esky (Big) Lama v4</td>
 <td>유지보수: Emmanuel Roussel<p><code>SYS_AUTOSTART</code> = 15001</p></td>
</tr>
  </table>
</div>

### Dodecarotor cox

<div class="frame_common">
  <img src="../../assets/airframes/types/DodecaRotorXCoaxial.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>AUX1</b>: 모터 7</li><li><b>AUX2</b>: 모터 8</li><li><b>AUX3</b>: 모터 9</li><li><b>AUX4</b>: 모터 10</li><li><b>AUX5</b>: 모터 11</li><li><b>AUX6</b>: 모터 12</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_dodecarotor_cox_generic_dodecarotor_cox_geometry">
 <td>Generic Dodecarotor cox geometry</td>
 <td>유지보수: William Peale &lt;develop707@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 24001</p></td>
</tr>
  </table>
</div>

### 헬리콥터

<div class="frame_common">
  <img src="../../assets/airframes/types/Helicopter.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 메인 모터</li><li><b>MAIN2</b>: 전면 경사판 서보</li><li><b>MAIN3</b>: 우측 경사판 서보</li><li><b>MAIN4</b>: 좌측 경사판 서보</li><li><b>MAIN5</b>: 테일 로터 서보</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_helicopter_blade_130x">
 <td>Blade 130X</td>
 <td>유지보수: Bart Slinger &lt;bartslinger@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 16001</p></td>
</tr>
  </table>
</div>

### 헥사로터 +

<div class="frame_common">
  <img src="../../assets/airframes/types/HexaRotorPlus.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
    
    <tr>
      <td>
        <ul>
          <li>
            <b>MAIN1</b>: 모터 1
          </li>
          <li>
            <b>MAIN2</b>: 모터 2
          </li>
          <li>
            <b>MAIN3</b>: 모터 3
          </li>
          <li>
            <b>MAIN4</b>: 모터 4
          </li>
          <li>
            <b>MAIN5</b>: 모터 5
          </li>
          <li>
            <b>MAIN6</b>: 모터 6
          </li>
          <li>
            <b>AUX1</b>: RC AUX1 채널의 입력
          </li>
          <li>
            <b>AUX2</b>: RC AUX2 채널의 입력
          </li>
          <li>
            <b>AUX3</b>: RC AUX3 채널의 입력
          </li>
        </ul>
      </td>
    </tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_hexarotor_+_generic_hexarotor_+_geometry">
 <td>Generic Hexarotor + geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 7001</p></td>
</tr>
  </table>
</div>

### 동축 헥사로터

<div class="frame_common">
  <img src="../../assets/airframes/types/Y6B.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 전면 우측 상단, CW; 각도:60; 방향:CW</li><li><b>MAIN2</b>: 전면 우측 하단, CCW; 각도:60; 방향:CCW</li><li><b>MAIN3</b>: 후면 상단, CW; 각도:180; 방향:CW</li><li><b>MAIN4</b>: 후면 하단, CCW; 각도:180; 방향:CCW</li><li><b>MAIN5</b>: 전면 좌측 상단, CW; 각도:-60; 방향:CW</li><li><b>MAIN6</b>: 전면 좌측 하단, CCW; 각도:-60; 방향:CCW</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_hexarotor_coaxial_generic_hexarotor_coaxial_geometry">
 <td>Generic Hexarotor coaxial geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 11001</p></td>
</tr>
  </table>
</div>

### X형 헥사로터

<div class="frame_common">
  <img src="../../assets/airframes/types/HexaRotorX.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_hexarotor_x_generic_hexarotor_x_geometry">
 <td>Generic Hexarotor x geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 6001</p><p><b>특정 출력:</b><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li></ul></p></td>
</tr>
<tr id="copter_hexarotor_x_uvify_draco-r">
 <td>UVify Draco-R</td>
 <td>유지보수: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 6002</p><p><b>특정 출력:</b><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li></ul></p></td>
</tr>
<tr id="copter_hexarotor_x_hex_x_with_control_allocation">
 <td>Hex X with control allocation</td>
 <td>유지보수: Silvan Fuhrer<p><code>SYS_AUTOSTART</code> = 6003</p></td>
</tr>
  </table>
</div>

### Octo Coax Wide

<div class="frame_common">
  <img src="../../assets/airframes/types/OctoRotorXCoaxial.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_octo_coax_wide_steadidrone_mavrik">
 <td>Steadidrone MAVRIK</td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 12002</p></td>
</tr>
  </table>
</div>

### 옥토로터 +

<div class="frame_common">
  <img src="../../assets/airframes/types/OctoRotorPlus.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_octorotor_+_generic_octocopter_+_geometry">
 <td>Generic Octocopter + geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 9001</p></td>
</tr>
  </table>
</div>

### 옥토로터 동축

<div class="frame_common">
  <img src="../../assets/airframes/types/OctoRotorXCoaxial.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_octorotor_coaxial_generic_10__octo_coaxial_geometry">
 <td>Generic 10" Octo coaxial geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 12001</p></td>
</tr>
  </table>
</div>

### 옥토로터 X형 

<div class="frame_common">
  <img src="../../assets/airframes/types/OctoRotorX.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_octorotor_x_generic_octocopter_x_geometry">
 <td>Generic Octocopter X geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 8001</p></td>
</tr>
  </table>
</div>

### 쿼드로터 + 형

<div class="frame_common">
  <img src="../../assets/airframes/types/QuadRotorPlus.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li><li><b>AUX4</b>: RC FLAPS 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_quadrotor_+_generic_10__quad_+_geometry">
 <td>Generic 10" Quad + geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 5001</p></td>
</tr>
  </table>
</div>

### 쿼드로터 H

<div class="frame_common">
<img src="../../assets/airframes/types/QuadRotorH.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_quadrotor_h_reaper_500_quad">
 <td>Reaper 500 Quad</td>
 <td>유지보수: Blankered<p><code>SYS_AUTOSTART</code> = 4040</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_h_betafpv_beta75x_2s_brushless_whoop">
 <td>BetaFPV Beta75X 2S Brushless Whoop</td>
 <td>유지보수: Beat Kueng &lt;beat-kueng@gmx.net&gt;<p><code>SYS_AUTOSTART</code> = 4041</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li></ul></p></td>
</tr>
  </table>
</div>

### 쿼드로터 와이드

<div class="frame_common">
  <img src="../../assets/airframes/types/QuadRotorWide.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li><li><b>AUX4</b>: RC FLAPS 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_quadrotor_wide_team_blacksheep_discovery">
 <td>Team Blacksheep Discovery</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 10015</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_wide_3dr_iris_quadrotor">
 <td>3DR Iris Quadrotor</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 10016</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_wide_steadidrone_qu4d">
 <td>Steadidrone QU4D</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 10017</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_wide_team_blacksheep_discovery_endurance">
 <td>Team Blacksheep Discovery Endurance</td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 10018</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></p></td>
</tr>
  </table>
</div>

### 비대칭 쿼드로터

<div class="frame_common">
  <img src="../../assets/airframes/types/AirframeUnknown.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1(전면 우측: CCW)</li><li><b>MAIN2</b>: 모터 2(후면 좌측: CCW)</li><li><b>MAIN3</b>: 모터 3(전면 좌측: CW)</li><li><b>MAIN4</b>: 모터 4(후면 우측: CW)</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_quadrotor_asymmetric_spedix_s250aq">
 <td><a href="https://docs.px4.io/master/en/frames_multicopter/spedix_s250_pixracer.html">Spedix S250AQ</a></td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4051</p></td>
</tr>
  </table>
</div>

### 쿼드로터 x

<div class="frame_common">
  <img src="../../assets/airframes/types/QuadRotorX.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li><li><b>AUX4</b>: RC FLAPS 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_quadrotor_x_generic_quadcopter">
 <td>Generic Quadrotor</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4001</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_lumenier_qav-r_(raceblade)_5__arms">
 <td>Lumenier QAV-R (raceblade) 5" arms</td>
 <td>유지보수 : James Goppert &lt;james.goppert@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4003</p></td>
</tr>
<tr id="copter_quadrotor_x_lumenier_qav250">
 <td>Lumenier QAV250</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4009</p></td>
</tr>
<tr id="copter_quadrotor_x_dji_f330_w/_dji_escs">
 <td>DJI F330 w/ DJI ESCs</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4010</p></td>
</tr>
<tr id="copter_quadrotor_x_dji_f450_w/_dji_escs">
 <td>DJI F450 w/ DJI ESCs</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4011</p></td>
</tr>
<tr id="copter_quadrotor_x_s500_generic">
 <td>S500 Generic</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4014</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_s500">
 <td>Holybro S500</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4015</p></td>
</tr>
<tr id="copter_quadrotor_x_px4_vision_devkit_platform">
 <td>PX4 Vision DevKit Platform</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 4016</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_nxp_hovergames">
 <td>NXP HoverGames</td>
 <td>유지보수: Iain Galloway &lt;iain.galloway@nxp.com&gt;<p><code>SYS_AUTOSTART</code> = 4017</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_s500_with_control_allocation">
 <td>제어 할당이 있는 S500</td>
 <td>유지보수: Silvan Fuhrer<p><code>SYS_AUTOSTART</code> = 4018</p></td>
</tr>
<tr id="copter_quadrotor_x_3dr_solo">
 <td>3DR Solo</td>
 <td>유지보수: Andreas Antener &lt;andreas@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 4030</p></td>
</tr>
<tr id="copter_quadrotor_x_3dr_diy_quad">
 <td>3DR DIY Quad</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4031</p></td>
</tr>
<tr id="copter_quadrotor_x_generic_250_racer">
 <td>Generic 250 Racer</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4050</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_qav250">
 <td><a href="https://docs.px4.io/master/en/frames_multicopter/holybro_qav250_pixhawk4_mini.html">HolyBro QAV250</a></td>
 <td>유지보수: Beat Kueng &lt;beat-kueng@gmx.net&gt;<p><code>SYS_AUTOSTART</code> = 4052</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_kopis_2">
 <td>Holybro Kopis 2</td>
 <td>유지보수: Beat Kueng &lt;beat@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4053</p></td>
</tr>
<tr id="copter_quadrotor_x_dji_matrice_100">
 <td>DJI Matrice 100</td>
 <td>유지보수 : James Goppert &lt;james.goppert@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4060</p></td>
</tr>
<tr id="copter_quadrotor_x_advanced_technology_labs_(atl)_mantis_edu">
 <td>Advanced Technology Labs (ATL) Mantis EDU</td>
 <td><p><code>SYS_AUTOSTART</code> = 4061</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_uvify_ifo">
 <td>UVify IFO</td>
 <td>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 4071</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_uvify_draco">
 <td>UVify Draco</td>
 <td>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 4072</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_uvify_ifo">
 <td>UVify IFO</td>
 <td>Maintainer: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 4073</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_zmr250_racer">
 <td>ZMR250 Racer</td>
 <td>Maintainer: Anton Matosov &lt;anton.matosov@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4080</p></td>
</tr>
<tr id="copter_quadrotor_x_nanomind_110_quad">
 <td>NanoMind 110 Quad</td>
 <td>Maintainer: Henry Zhang &lt;zhanghui629@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4090</p></td>
</tr>
<tr id="copter_quadrotor_x_teal_one">
 <td>Teal One</td>
 <td>Maintainer: Matt McFadden &lt;matt.mcfadden@tealdrones.com&gt;<p><code>SYS_AUTOSTART</code> = 4250</p><p><b>Specific Outputs:</b><ul><li><b>MAIN1</b>: motor 1</li><li><b>MAIN2</b>: motor 2</li><li><b>MAIN3</b>: motor 3</li><li><b>MAIN4</b>: motor 4</li></ul></p></td>
</tr>
<tr id="copter_quadrotor_x_coex_clover_4">
 <td>COEX Clover 4</td>
 <td>Maintainer: Oleg Kalachev &lt;okalachev@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4500</p></td>
</tr>
<tr id="copter_quadrotor_x_crazyflie_2">
 <td>Crazyflie 2</td>
 <td>Maintainer: Dennis Shtatov &lt;densht@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4900</p></td>
</tr>
<tr id="copter_quadrotor_x_crazyflie_2.1">
 <td>Crazyflie 2.1</td>
 <td>Maintainer: Dennis Shtatov &lt;densht@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4901</p></td>
</tr>
  </table>
</div>

### 시뮬레이션 (콥터)

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeUnknown.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_simulation_(copter)_hil_quadcopter_x">
 <td>HIL Quadcopter X</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 1001</p></td>
</tr>
<tr id="copter_simulation_(copter)_sih_quadcopter_x">
 <td>SIH Quadcopter X</td>
 <td>유지보수: Romain Chiappinelli &lt;romain.chiap@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 1100</p></td>
</tr>
  </table>
</div>

### 틸트-쿼드

<div class="frame_common">
  <img src="../../assets/airframes/types/AirframeUnknown.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>AUX1</b>: 로터 2 암용 외부 서보 모터</li><li><b>AUX2</b>: 로터 4 암용 외부 서보 모터</li><li><b>AUX3</b>: 로터 2 암용 내부 서보 모터</li><li><b>AUX4</b>: 로터 4 암용 내부 서보 모터</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_tilt-quad_tilt-quadrotor">
 <td><a href="http://www.alivaero.com/the-project.html">틸트-쿼드로터</a></td>
 <td>유지보수: Ricardo Marques &lt;marques.ricardo17@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4100</p></td>
</tr>
  </table>
</div>

### 트리콥터 Y+

<div class="frame_common">
  <img src="../../assets/airframes/types/YPlus.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 방위각 서보</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_tricopter_y+_generic_tricopter_y+_geometry">
 <td>Generic Tricopter Y+ Geometry</td>
 <td>유지보수: Trent Lukaczyk &lt;aerialhedgehog@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 14001</p></td>
</tr>
  </table>
</div>

### 트리콥터 Y-

<div class="frame_common">
  <img src="../../assets/airframes/types/YMinus.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 방위각 서보</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="copter_tricopter_y-_generic_tricopter_y-_geometry">
 <td>Generic Tricopter Y- Geometry</td>
 <td>유지보수: Trent Lukaczyk &lt;aerialhedgehog@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 14002</p></td>
</tr>
  </table>
</div>

## 비행기

### 플라잉 윙

<div class="frame_common">
  <img src="../../assets/airframes/types/FlyingWing.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="plane_flying_wing_generic_flying_wing">
 <td>Generic Flying Wing</td>
 <td><p><code>SYS_AUTOSTART</code> = 3000</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
    
    <tr id="plane_flying_wing_io_camflyer">
      <td>
        IO Camflyer
      </td>
      
      <td>
        유지보수: Simon Wilks &lt;simon@uaventure.com&gt;
        
        <p>
          <code>SYS_AUTOSTART</code> = 3030
        </p>
        
        <p>
          <b>특정 출력:</b>
          
          <ul>
            <li>
              <b>MAIN1</b>: 좌측 보조익
            </li>
            <li>
              <b>MAIN2</b>: 우측 보조익
            </li>
            <li>
              <b>MAIN4</b>: 스로틀
            </li>
          </ul>
        </p>
      </td>
    </tr>
<tr id="plane_flying_wing_phantom_fpv_flying_wing">
 <td><a href="https://docs.px4.io/master/en/frames_plane/wing_wing_z84.html">FX-79 Buffalo Flying Wing</a></td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 3031</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_skywalker_x5_flying_wing">
 <td>Skywalker X5 Flying Wing</td>
 <td>유지보수: Julian Oes &lt;julian@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 3032</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_wing_wing_(aka_z-84)_flying_wing">
 <td><a href="https://docs.px4.io/master/en/frames_plane/wing_wing_z84.html">Wing Wing (aka Z-84) Flying Wing</a></td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 3033</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_fx-79_buffalo_flying_wing">
 <td>FX-79 Buffalo Flying Wing</td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 3034</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 우측 보조익</li><li><b>MAIN2</b>: 좌측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_viper">
 <td>Viper</td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 3035</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_sparkle_tech_pigeon">
 <td><a href="http://www.sparkletech.hk/">Sparkle Tech Pigeon</a></td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 3036</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_modified_parrot_disco">
 <td>Modified Parrot Disco</td>
 <td>유지보수: Jan Liphardt &lt;JTLiphardt@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 3037</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="plane_flying_wing_tbs_caipirinha">
 <td>TBS Caipirinha</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 3100</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 좌측 보조익</li><li><b>MAIN2</b>: 우측 보조익</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
  </table>
</div>

### Plane A-Tail

<div class="frame_common">
  <img src="../../assets/airframes/types/PlaneATail.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 우측 보조익</li><li><b>MAIN2</b>: 좌측 보조익</li><li><b>MAIN3</b>: v형 미익 우측</li><li><b>MAIN4</b>: v형 미익 좌측</li><li><b>MAIN5</b>: 스로틀</li><li><b>MAIN6</b>: 휠</li><li><b>MAIN7</b>: 우측 플랩</li><li><b>MAIN8</b>: 좌측 플랩</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드-스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="plane_plane_a-tail_applied_aeronautics_albatross">
 <td>Applied Aeronautics Albatross</td>
 <td>유지보수: Andreas Antener &lt;andreas@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 2106</p></td>
</tr>
  </table>
</div>

### Plane V-Tail

<div class="frame_common">
  <img src="../../assets/airframes/types/PlaneVTail.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 우측 보조익</li><li><b>MAIN2</b>: 좌측 보조익</li><li><b>MAIN3</b>: v형 미익 우측</li><li><b>MAIN4</b>: v형 미익 좌측</li><li><b>MAIN5</b>: 스로틀</li><li><b>MAIN6</b>: 휠</li><li><b>MAIN7</b>: 우측 플랩</li><li><b>MAIN8</b>: 좌측 플랩</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="plane_plane_v-tail_x-uav_mini_talon">
 <td>X-UAV Mini Talon</td>
 <td>유지보수: Friedrich Beckmann &lt;friedrich.beckmann@hs-augsburg.de&gt;<p><code>SYS_AUTOSTART</code> = 2200</p></td>
</tr>
  </table>
</div>

### 시뮬레이션 (항공기)

<div class="frame_common">
  <img src="../../assets/airframes/types/AirframeUnknown.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 보조익</li><li><b>MAIN2</b>: 승강타</li><li><b>MAIN3</b>: 방향타</li><li><b>MAIN4</b>: 스로틀</li><li><b>MAIN5</b>: 플랩</li><li><b>MAIN6</b>: 기어</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="plane_simulation_(plane)_hilstar_(xplane)">
 <td>HILStar (XPlane)</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 1000</p></td>
</tr>
<tr id="plane_simulation_(plane)_sih_plane_aert">
 <td>SIH plane AERT</td>
 <td>Maintainer: Romain Chiappinelli &lt;romain.chiap@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 1101</p></td>
</tr>
  </table>
</div>

### 표준 항공기

<div class="frame_common">
  <img src="../../assets/airframes/types/Plane.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="plane_standard_plane_standard_plane">
 <td>표준 비행기</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 2100</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 보조익</li><li><b>MAIN2</b>: 승강타</li><li><b>MAIN3</b>: 스로틀</li><li><b>MAIN4</b>: 방향타</li><li><b>MAIN5</b>: 플랩</li><li><b>MAIN6</b>: 기어</li></ul></p></td>
</tr>
<tr id="plane_standard_plane_bormatec_maja">
 <td>Bormatec Maja</td>
 <td>유지보수: Andreas Antener &lt;andreas@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 2105</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 보조익</li><li><b>MAIN2</b>: 보조익</li><li><b>MAIN3</b>: 승강타</li><li><b>MAIN4</b>: 방향타</li><li><b>MAIN5</b>: 스로틀</li><li><b>MAIN6</b>: 휠</li><li><b>MAIN7</b>: 플랩</li></ul></p></td>
</tr>
  </table>
</div>

## 로버

### 로버

<div class="frame_common">
<img src="../../assets/airframes/types/Rover.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="rover_rover_generic_ground_vehicle">
 <td>일반 지상 차량</td>
 <td><p><code>SYS_AUTOSTART</code> = 50000</p><p><b>특정 출력:</b><ul><li><b>MAIN2</b>: 조향기</li><li><b>MAIN4</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="rover_rover_aion_robotics_r1_ugv">
 <td><a href="https://www.aionrobotics.com/r1">Aion Robotics R1 UGV</a></td>
 <td>유지보수: Timothy Scott<p><code>SYS_AUTOSTART</code> = 50003</p><p><b>특정 출력:</b><ul><li><b>MAIN0</b>: 좌측 바퀴 속도</li><li><b>MAIN1</b>: 우측 바퀴 속도</li></ul></p></td>
</tr>
<tr id="rover_rover_nxp_cup_car:_df_robot_gpx">
 <td>NXP Cup car: DF Robot GPX</td>
 <td>유지보수: Katrin Moritz<p><code>SYS_AUTOSTART</code> = 50004</p><p><b>특정 출력:</b><ul><li><b>MAIN2</b>: 스티어링 서보</li><li><b>MAIN3</b>: 좌측 바퀴 속도</li><li><b>MAIN4</b>: 우측 바퀴 속도</li></ul></p></td>
</tr>
  </table>
</div>

## 수중 로봇

### 수중 로봇

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeUnknown.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="underwater_robot_underwater_robot_generic_underwater_robot">
 <td>일반 수중 로봇</td>
 <td><p><code>SYS_AUTOSTART</code> = 60000</p></td>
</tr>
<tr id="underwater_robot_underwater_robot_hippocampus_uuv_(unmanned_underwater_vehicle)">
 <td>HippoCampus UUV (무인 수중선)</td>
 <td>유지보수: Daniel Duecker &lt;daniel.duecker@tuhh.de&gt;<p><code>SYS_AUTOSTART</code> = 60001</p></td>
</tr>
  </table>
</div>

### Vectored 6 DOF UUV

<div class="frame_common">
  <img src="../../assets/airframes/types/Vectored6DofUUV.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1:</b> 모터 1 CCW, 선수 우현 수평,, 프로펠러 CCW</li><li><b>MAIN2:</b> 모터 2 CCW, 선수 포트 수평, 프로펠러 CCW</li><li><b>MAIN3:</b> 모터 3 CCW, 선미 우현 수평, 프로펠러 CW</li><li><b>MAIN4:</b> 모터 4 CCW, 스턴 포트 수평, 프로펠러 CW</li><li><b>MAIN5:</b> 모터 5 CCW, 선수 우현 수직, 프로펠러 CCW</li><li><b>MAIN6:</b> 모터 6 CCW, 보우 포트 수직, 프로펠러 CW</li><li><b>MAIN7:</b> 모터 7 CCW, 선미 우현 수직, 프로펠러 CW</li><li><b>MAIN8:</b> 모터 8 CCW, 선미 포트 수직, 프로펠러 CCW</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="underwater_robot_vectored_6_dof_uuv_bluerov2_(heavy_configuration)">
 <td>BlueROV2 (Heavy Configuration)</td>
 <td>유지보수: Thies Lennart Alff &lt;thies.lennart.alff@tuhh.de&gt;<p><code>SYS_AUTOSTART</code> = 60002</p></td>
</tr>
  </table>
</div>

## 수직이착륙기

### 표준 수직 이착륙기

<div class="frame_common">
<img src="../../assets/airframes/types/VTOLPlane.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="vtol_standard_vtol_hil_standard_vtol_quadplane">
 <td>HIL 표준 VTOL QuadPlane</td>
 <td>유지보수: Roman Bapst &lt;roman@auterion.com&gt;<p><code>SYS_AUTOSTART</code> = 1002</p></td>
</tr>
<tr id="vtol_standard_vtol_generic_quadplane_vtol">
 <td>Generic Quadplane VTOL</td>
 <td><p><code>SYS_AUTOSTART</code> = 13000</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>AUX1</b>: 보조익 1</li><li><b>AUX2</b>: 보조익 2</li><li><b>AUX3</b>: 승강타</li><li><b>AUX4</b>: 방향타</li><li><b>AUX5</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="vtol_standard_vtol_fun_cub_quad_vtol">
 <td>Fun Cub Quad VTOL</td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 13005</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>AUX1</b>: 보조익 1</li><li><b>AUX2</b>: 보조익 2</li><li><b>AUX3</b>: 승강타</li><li><b>AUX4</b>: 방향타</li><li><b>AUX5</b>: 스로틀</li></ul></p></td>
</tr>
<tr id="vtol_standard_vtol_generic_quad_delta_vtol">
 <td>Generic quad delta VTOL</td>
 <td>유지보수: Simon Wilks &lt;simon@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 13006</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>AUX1</b>: 우측 승강 보조익</li><li><b>AUX2</b>: 좌측 승강 보조익</li><li><b>AUX3</b>: 모터</li></ul></p></td>
</tr>
<tr id="vtol_standard_vtol_generic_aavvt_v-tail_plane_airframe_with_quad_vtol.">
 <td>Quad VTOL이 있는 일반 AAVVT v-꼬리 비행체</td>
 <td>유지보수: Sander Smeets &lt;sander@droneslab.com&gt;<p><code>SYS_AUTOSTART</code> = 13007</p></td>
</tr>
<tr id="vtol_standard_vtol_quadranger">
 <td>QuadRanger</td>
 <td>유지보수: Sander Smeets &lt;sander@droneslab.com&gt;<p><code>SYS_AUTOSTART</code> = 13008</p></td>
</tr>
<tr id="vtol_standard_vtol_sparkle_tech_ranger_vtol">
 <td>Sparkle Tech Ranger VTOL</td>
 <td>유지보수: Andreas Antener &lt;andreas@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 13009</p></td>
</tr>
<tr id="vtol_standard_vtol_vertical_technologies_deltaquad">
 <td>Vertical Technologies DeltaQuad</td>
 <td>유지보수: Sander Smeets &lt;sander@droneslab.com&gt;<p><code>SYS_AUTOSTART</code> = 13013</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 우측 승강 보조익</li><li><b>MAIN6</b>: 좌측 승강 보조익</li><li><b>MAIN7</b>: 추진 모터</li><li><b>MAIN8</b>: 역추진 채널</li></ul></p></td>
</tr>
<tr id="vtol_standard_vtol_babyshark_vtol">
 <td>BabyShark VTOL</td>
 <td>유지보수: Silvan Fuhrer &lt;silvan@auterion.com&gt;<p><code>SYS_AUTOSTART</code> = 13014</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 보조익</li><li><b>MAIN2</b>: A형 주익 좌측</li><li><b>MAIN3</b>: 추진 모터</li><li><b>MAIN4</b>: A형 주익 우측</li><li><b>MAIN5</b>: 모터 1</li><li><b>MAIN6</b>: 모터 2</li><li><b>MAIN7</b>: 모터 3</li><li><b>MAIN8</b>: 모터 4</li></ul></p></td>
</tr>
  </table>
</div>

### VTOL 듀오 테일시터

<div class="frame_common">
  <img src="../../assets/airframes/types/VTOLDuoRotorTailSitter.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 우측 모터</li><li><b>MAIN2</b>: 좌측 모터</li><li><b>MAIN5</b>: 우측 승강 보조익</li><li><b>MAIN6</b>: 좌측 승강 보조익</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="vtol_vtol_duo_tailsitter_caipiroshka_duo_tailsitter">
 <td>Caipiroshka Duo Tailsitter</td>
 <td>유지보수: Roman Bapst &lt;roman@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 13001</p></td>
</tr>
<tr id="vtol_vtol_duo_tailsitter_generic_tailsitter">
 <td>일반 테일시터</td>
 <td>유지보수: Roman Bapst &lt;roman@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 13200</p></td>
</tr>
  </table>
</div>

### VTOL Octoplane

<div class="frame_common">
  <img src="../../assets/airframes/types/VTOLPlaneOcto.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li><li><b>AUX1</b>: 보조익 1</li><li><b>AUX2</b>: 보조익 2</li><li><b>AUX3</b>: 승강타</li><li><b>AUX4</b>: 방향타</li><li><b>AUX5</b>: 스로틀</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="vtol_vtol_octoplane_generic_octoplane_vtol">
 <td>Generic Octoplane VTOL</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 13050</p></td>
</tr>
  </table>
</div>

### VTOL Quad Tailsitter

<div class="frame_common">
  <img src="../../assets/airframes/types/VTOLQuadRotorTailSitter.svg" /> 
  
  <table>
    <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 4</li><li><b>MAIN4</b>: 모터 5</li><li><b>MAIN5</b>: 좌측 보조익</li><li><b>MAIN6</b>: 우측 보조익</li><li><b>MAIN7</b>: 귀날개 표면</li><li><b>MAIN8</b>: 방향타</li></ul></td>
</tr>
  </table>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="vtol_vtol_quad_tailsitter_quadrotor_x_tailsitter">
 <td>Quadrotor X Tailsitter</td>
 <td>유지보수: Roman Bapst &lt;roman@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 13003</p></td>
</tr>
<tr id="vtol_vtol_quad_tailsitter_quadrotor_+_tailsitter">
 <td>Quadrotor + Tailsitter</td>
 <td>유지보수: Roman Bapst &lt;roman@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 13004</p></td>
</tr>
  </table>
</div>

### 수직 이착륙 틸트로터

<div class="frame_common">
<img src="../../assets/airframes/types/VTOLTiltRotor.svg"/>
</div>

<div class="frame_variant">
  <table>
    <tr>
      <th>
        이름
      </th>
      
      <th>
      </th>
    </tr>
<tr id="vtol_vtol_tiltrotor_birdseyeview_aerobotics_firefly6">
 <td>BirdsEyeView Aerobotics FireFly6</td>
 <td>유지보수: Roman Bapst &lt;roman@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 13002</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 전면 우측 모터 하단</li><li><b>MAIN2</b>: 전면 우측 모터 상단</li><li><b>MAIN3</b>: 후면 모터 하단</li><li><b>MAIN4</b>: 후면 모터 상단</li><li><b>MAIN5</b>: 전면 좌측 모터 하단</li><li><b>MAIN6</b>: 전면 좌측 모터 상단</li><li><b>AUX1</b>: 틸트 서보</li><li><b>AUX2</b>: 엘러본(elevon) 1</li><li><b>AUX3</b>: 엘러본(elevon) 2</li><li><b>AUX4</b>: 기어</li></ul></p></td>
</tr>
<tr id="vtol_vtol_tiltrotor_cruiseader_claire">
 <td>CruiseAder Claire</td>
 <td>유지보수: Samay Siga &lt;samay_s@icloud.com&gt;<p><code>SYS_AUTOSTART</code> = 13010</p></td>
</tr>
<tr id="vtol_vtol_tiltrotor_e-flite_convergence">
 <td>E-flite Convergence</td>
 <td>유지보수: Andreas Antener &lt;andreas@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 13012</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 우측 모터</li><li><b>MAIN2</b>: 좌측 모터</li><li><b>MAIN3</b>: 후면 모터</li><li><b>MAIN4</b>: (비어 있음)</li><li><b>MAIN5</b>: 우측 틸트 서보</li><li><b>MAIN6</b>: 좌측 틸트 서보</li><li><b>MAIN7</b>: 우측 보조익</li><li><b>MAIN8</b>: 좌측 보조익</li></ul></p></td>
</tr>
<tr id="vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor">
 <td>Generic Quadplane VTOL Tiltrotor</td>
 <td><p><code>SYS_AUTOSTART</code> = 13030</p><p><b>특정 출력:</b><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>AUX1</b>: 전면 좌측 틸트 모터</li><li><b>AUX2</b>: 전면 우측 틸트 모터</li><li><b>AUX3</b>: 후면 좌측 틸트 모터</li><li><b>AUX4</b>: 후면 우측 틸트 모터</li><li><b>AUX5</b>: 좌측 보조익</li><li><b>AUX6</b>: 우측 보조익</li><li><b>AUX7</b>: 승강타</li><li><b>AUX8</b>: 방향타</li></ul></p></td>
</tr>
  </table>
</div>
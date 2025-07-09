---
canonicalUrl: https://docs.px4.io/main/ko/airframes/airframe_reference
---

# 에어프레임 참조

:::note
이 **목록**은 `make airframe_metadata` 빌드 명령을 사용하여 소스 코드에서 [자동으로 생성](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/px4airframes/markdownout.py)됩니다.
:::

이 페이지에서 모터 할당와 번호 지정을 포함하여 모든 지원 기체 유형을 기술합니다. **녹색** 모터는 시계 방향으로 회전화며, **청색** 모터는 반시계 방향으로 회전합니다.

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
<img src="../../assets/airframes/types/Airship.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: starboard thruster</li><li><b>Motor2</b>: port thruster</li><li><b>Motor3</b>: tail thruster</li><li><b>Servo1</b>: thrust tilt</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="airship_airship_cloudship">
 <td>클라우드쉽</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 2507</p></td>
</tr>
</tbody>
</table>
</div>

## 오토자이로

### 오토자이로

<div class="frame_common">
<img src="../../assets/airframes/types/Autogyro.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: throttle</li><li><b>Servo1</b>: rotor_head_L</li><li><b>Servo2</b>: rotor_head_R</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="autogyro_autogyro_thunderfly_auto-g2">
 <td><a href="https://github.com/ThunderFly-aerospace/Auto-G2/">ThunderFly Auto-G2</a></td>
 <td>유지보수: ThunderFly s.r.o., Roman Dvorak &lt;dvorakroman@thunderfly.cz&gt;<p><code>SYS_AUTOSTART</code> = 17002</p><p><b>특정 출력:</b><ul><li><b>Servo3</b>: elevator</li><li><b>Servo4</b>: rudder</li><li><b>Servo5</b>: rudder (second, optional)</li><li><b>Servo6</b>: wheel</li></ul></p></td>
</tr>
<tr id="autogyro_autogyro_thunderfly_tf-g2">
 <td><a href="https://github.com/ThunderFly-aerospace/TF-G2/">ThunderFly TF-G2</a></td>
 <td>유지보수: ThunderFly s.r.o., Roman Dvorak &lt;dvorakroman@thunderfly.cz&gt;<p><code>SYS_AUTOSTART</code> = 17003</p><p><b>특정 출력:</b><ul><li><b>Servo3</b>: rudder</li></ul></p></td>
</tr>
</tbody>
</table>
</div>

## 풍선

### 풍선

<div class="frame_common">
<img src="../../assets/airframes/types/Balloon.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="balloon_balloon_thunderfly_balloon_tf-b1">
 <td><a href="https://github.com/ThunderFly-aerospace/TF-B1/">ThunderFly balloon TF-B1</a></td>
 <td>유지보수: ThunderFly s.r.o.<p><code>SYS_AUTOSTART</code> = 18001</p></td>
</tr>
</tbody>
</table>
</div>

## 콥터

### Dodecarotor cox

<div class="frame_common">
<img src="../../assets/airframes/types/DodecaRotorXCoaxial.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_dodecarotor_cox_generic_dodecarotor_cox_geometry">
 <td>Generic Dodecarotor cox geometry</td>
 <td>유지보수: William Peale &lt;develop707@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 24001</p></td>
</tr>
</tbody>
</table>
</div>

### 헬리콥터

<div class="frame_common">
<img src="../../assets/airframes/types/Helicopter.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_helicopter_generic_helicopter_(tail_esc)">
 <td>Generic Helicopter (Tail ESC)</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 16001</p></td>
</tr>
</tbody>
</table>
</div>

### 헥사로터 +

<div class="frame_common">
<img src="../../assets/airframes/types/HexaRotorPlus.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_hexarotor_+_generic_hexarotor_+_geometry">
 <td>Generic Hexarotor + geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 7001</p></td>
</tr>
</tbody>
</table>
</div>

### 동축 헥사로터

<div class="frame_common">
<img src="../../assets/airframes/types/Y6B.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: front right top, CW; angle:60; direction:CW</li><li><b>Motor2</b>: front right bottom, CCW; angle:60; direction:CCW</li><li><b>Motor3</b>: back top, CW; angle:180; direction:CW</li><li><b>Motor4</b>: back bottom, CCW; angle:180; direction:CCW</li><li><b>Motor5</b>: front left top, CW; angle:-60; direction:CW</li><li><b>Motor6</b>: front left bottom, CCW;angle:-60; direction:CCW</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_hexarotor_coaxial_generic_hexarotor_coaxial_geometry">
 <td>Generic Hexarotor coaxial geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 11001</p></td>
</tr>
</tbody>
</table>
</div>

### X형 헥사로터

<div class="frame_common">
<img src="../../assets/airframes/types/HexaRotorX.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_hexarotor_x_generic_hexarotor_x_geometry">
 <td>Generic Hexarotor x geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 6001</p></td>
</tr>
<tr id="copter_hexarotor_x_uvify_draco-r">
 <td>UVify Draco-R</td>
 <td>유지보수: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 6002</p></td>
</tr>
</tbody>
</table>
</div>

### Octorotor +

<div class="frame_common">
<img src="../../assets/airframes/types/OctoRotorPlus.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octorotor_+_generic_octocopter_+_geometry">
 <td>Generic Octocopter + geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 9001</p></td>
</tr>
</tbody>
</table>
</div>

### 옥토콥터 동축

<div class="frame_common">
<img src="../../assets/airframes/types/OctoRotorXCoaxial.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: motor 1</li><li><b>Motor2</b>: motor 2</li><li><b>Motor3</b>: motor 3</li><li><b>Motor4</b>: motor 4</li><li><b>Motor5</b>: motor 5</li><li><b>Motor6</b>: motor 6</li><li><b>Motor7</b>: motor 7</li><li><b>Motor8</b>: motor 8</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octorotor_coaxial_generic_10__octo_coaxial_geometry">
 <td>Generic 10" Octo coaxial geometry</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 12001</p></td>
</tr>
</tbody>
</table>
</div>

### 옥토콥터 X형

<div class="frame_common">
<img src="../../assets/airframes/types/OctoRotorX.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_octorotor_x_generic_octocopter_x_geometry">
 <td>일반 옥타콥터 X 기하 구조</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 8001</p></td>
</tr>
</tbody>
</table>
</div>

### 쿼드로터 +

<div class="frame_common">
<img src="../../assets/airframes/types/QuadRotorPlus.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_+_generic_10__quad_+_geometry">
 <td>일반 10" 쿼드 + 기하 구조</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 5001</p></td>
</tr>
</tbody>
</table>
</div>

### 쿼드로터 H

<div class="frame_common">
<img src="../../assets/airframes/types/QuadRotorH.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_h_reaper_500_quad">
 <td>리퍼 500 쿼드</td>
 <td>유지관리자: Blankered<p><code>SYS_AUTOSTART</code> = 4040</p></td>
</tr>
<tr id="copter_quadrotor_h_betafpv_beta75x_2s_brushless_whoop">
 <td>BetaFPV Beta75X 2S Brushless Whoop</td>
 <td>유지보수: Beat Kueng &lt;beat-kueng@gmx.net&gt;<p><code>SYS_AUTOSTART</code> = 4041</p></td>
</tr>
</tbody>
</table>
</div>

### 쿼드로터 x

<div class="frame_common">
<img src="../../assets/airframes/types/QuadRotorX.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_quadrotor_x_generic_quadcopter">
 <td>일반 쿼드콥터</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4001</p></td>
</tr>
<tr id="copter_quadrotor_x_s500_generic">
 <td>S500 Generic</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4014</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_s500">
 <td>Holybro S500</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4015</p></td>
</tr>
<tr id="copter_quadrotor_x_px4_vision_dev_kit_v1">
 <td>PX4 Vision Dev Kit v1</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 4016</p></td>
</tr>
<tr id="copter_quadrotor_x_nxp_hovergames">
 <td>NXP HoverGames</td>
 <td>유지보수: Iain Galloway &lt;iain.galloway@nxp.com&gt;<p><code>SYS_AUTOSTART</code> = 4017</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_x500_v2">
 <td>Holybro X500 V2</td>
 <td>유지보수: Farhang Naderi &lt;farhang.nba@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4019
</p></td>
</tr>
<tr id="copter_quadrotor_x_px4_vision_dev_kit_v1.5">
 <td>PX4 Vision Dev Kit v1.5</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 4020</p></td>
</tr>
<tr id="copter_quadrotor_x_generic_250_racer">
 <td>일반 250 레이서</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4050</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_qav250">
 <td><a href="https://docs.px4.io/main/en/frames_multicopter/holybro_qav250_pixhawk4_mini.html">HolyBro QAV250</a></td>
 <td>유지보수: Beat Kueng &lt;beat-kueng@gmx.net&gt;<p><code>SYS_AUTOSTART</code> = 4052</p></td>
</tr>
<tr id="copter_quadrotor_x_holybro_kopis_2">
 <td>Holybro Kopis 2</td>
 <td>유지보수: Beat Kueng &lt;beat@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 4053</p></td>
</tr>
<tr id="copter_quadrotor_x_advanced_technology_labs_(atl)_mantis_edu">
 <td>Advanced Technology Labs (ATL) Mantis EDU</td>
 <td><p><code>SYS_AUTOSTART</code> = 4061
</p></td>
</tr>
<tr id="copter_quadrotor_x_uvify_ifo">
 <td>UVify IFO</td>
 <td>유지보수: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 4071</p></td>
</tr>
<tr id="copter_quadrotor_x_uvify_ifo">
 <td>UVify IFO</td>
 <td>유지보수: Hyon Lim &lt;lim@uvify.com&gt;<p><code>SYS_AUTOSTART</code> = 4073</p></td>
</tr>
<tr id="copter_quadrotor_x_coex_clover_4">
 <td>COEX Clover 4</td>
 <td>유지보수: Oleg Kalachev &lt;okalachev@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4500</p></td>
</tr>
<tr id="copter_quadrotor_x_crazyflie_2">
 <td>Crazyflie 2</td>
 <td>유지보수: Dennis Shtatov &lt;densht@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4900</p></td>
</tr>
<tr id="copter_quadrotor_x_crazyflie_2.1">
 <td>Crazyflie 2.1</td>
 <td>유지보수: Dennis Shtatov &lt;densht@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 4901</p></td>
</tr>
</tbody>
</table>
</div>

### Simulation

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeSimulation.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_simulation_hil_quadcopter_x">
 <td>HIL Quadcopter X</td>
 <td>유지보수: Lorenz Meier &lt;lorenz@px4.io&gt;<p><code>SYS_AUTOSTART</code> = 1001</p></td>
</tr>
<tr id="copter_simulation_sih_quadcopter_x">
 <td>SIH Quadcopter X</td>
 <td>유지보수: Romain Chiappinelli &lt;romain.chiap@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 1100</p></td>
</tr>
</tbody>
</table>
</div>

### 트리콥터 Y+

<div class="frame_common">
<img src="../../assets/airframes/types/YPlus.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: motor 1</li><li><b>Motor2</b>: motor 2</li><li><b>Motor3</b>: motor 3</li><li><b>Servo1</b>: yaw servo</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="copter_tricopter_y+_generic_multirotor_with_tilt">
 <td>Generic Multirotor with tilt</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 14001</p></td>
</tr>
</tbody>
</table>
</div>

## 고정익

### 플라잉 윙

<div class="frame_common">
<img src="../../assets/airframes/types/FlyingWing.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_flying_wing_generic_flying_wing">
 <td>Generic Flying Wing</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 3000</p></td>
</tr>
</tbody>
</table>
</div>

### 고정익 A-Tail

<div class="frame_common">
<img src="../../assets/airframes/types/PlaneATail.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: throttle</li><li><b>Servo1</b>: aileron right</li><li><b>Servo2</b>: aileron left</li><li><b>Servo3</b>: v-tail right</li><li><b>Servo4</b>: v-tail left</li><li><b>Servo5</b>: wheel</li><li><b>Servo6</b>: flaps right</li><li><b>Servo7</b>: flaps left</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_plane_a-tail_applied_aeronautics_albatross">
 <td>적용된 에어로노틱스 알바트로스</td>
 <td>유지보수: Andreas Antener &lt;andreas@uaventure.com&gt;<p><code>SYS_AUTOSTART</code> = 2106</p></td>
</tr>
</tbody>
</table>
</div>

### Simulation

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeSimulation.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_simulation_sih_plane_aert">
 <td>SIH plane AERT</td>
 <td>유지보수: Romain Chiappinelli &lt;romain.chiap@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 1101
</p></td>
</tr>
</tbody>
</table>
</div>

### 표준 항공기

<div class="frame_common">
<img src="../../assets/airframes/types/Plane.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="plane_standard_plane_generic_standard_plane">
 <td>Generic Standard Plane</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 2100</p></td>
</tr>
</tbody>
</table>
</div>

## 로버

### 로버

<div class="frame_common">
<img src="../../assets/airframes/types/Rover.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="rover_rover_generic_ground_vehicle_(ackermann)">
 <td>Generic Ground Vehicle (Ackermann)</td>
 <td><p><code>SYS_AUTOSTART</code> = 50000</p><p><b>특정 출력:</b><ul><li><b>Motor1</b>: throttle</li><li><b>Servo1</b>: steering</li></ul></p></td>
</tr>
<tr id="rover_rover_aion_robotics_r1_ugv">
 <td><a href="https://www.aionrobotics.com/r1">Aion Robotics R1 UGV</a></td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 50003</p></td>
</tr>
<tr id="rover_rover_nxp_cup_car:_df_robot_gpx">
 <td>NXP Cup car: DF Robot GPX</td>
 <td>유지보수: Katrin Moritz<p><code>SYS_AUTOSTART</code> = 50004</p><p><b>특정 출력:</b><ul><li><b>Motor1</b>: Speed of left wheels</li><li><b>Servo1</b>: Steering servo</li></ul></p></td>
</tr>
</tbody>
</table>
</div>

## 수중 로봇

### 수중 로봇

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeUnknown.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="underwater_robot_underwater_robot_generic_underwater_robot">
 <td>일반 수중 로봇</td>
 <td><p><code>SYS_AUTOSTART</code> = 60000</p></td>
</tr>
<tr id="underwater_robot_underwater_robot_hippocampus_uuv_(unmanned_underwater_vehicle)">
 <td>HippoCampus UUV (무인 수중선)</td>
 <td>유지보수: Daniel Duecker &lt;daniel.duecker@tuhh.de&gt;<p><code>SYS_AUTOSTART</code> = 60001</p></td>
</tr>
</tbody>
</table>
</div>

### Vectored 6 DOF UUV

<div class="frame_common">
<img src="../../assets/airframes/types/Vectored6DofUUV.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: motor 1 CCW, bow starboard horizontal, , propeller CCW</li><li><b>Motor2</b>: motor 2 CCW, bow port horizontal, propeller CCW</li><li><b>Motor3</b>: motor 3 CCW, stern starboard horizontal, propeller CW</li><li><b>Motor4</b>: motor 4 CCW, stern port horizontal, propeller CW</li><li><b>Motor5</b>: motor 5 CCW, bow starboard vertical, propeller CCW</li><li><b>Motor6</b>: motor 6 CCW, bow port vertical, propeller CW</li><li><b>Motor7</b>: motor 7 CCW, stern starboard vertical, propeller CW</li><li><b>Motor8</b>: motor 8 CCW, stern port vertical, propeller CCW</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="underwater_robot_vectored_6_dof_uuv_bluerov2_(heavy_configuration)">
 <td>BlueROV2 (Heavy Configuration)</td>
 <td>유지보수: Thies Lennart Alff &lt;thies.lennart.alff@tuhh.de&gt;<p><code>SYS_AUTOSTART</code> = 60002</p></td>
</tr>
</tbody>
</table>
</div>

## 수직이착륙기

### Simulation

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeSimulation.svg"/>
<table>
 <thead>
   <tr><th>공통 출력</th></tr>
 </thead>
 <tbody>
<tr>
 <td><ul><li><b>Motor1</b>: motor right</li><li><b>Motor2</b>: motor left</li><li><b>Servo1</b>: elevon right</li><li><b>Servo2</b>: elevon left</li></ul></td>
</tr>
</tbody></table>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_simulation_sih_tailsitter_duo">
 <td>SIH Tailsitter Duo</td>
 <td>유지보수: Romain Chiappinelli &lt;romain.chiap@gmail.com&gt;<p><code>SYS_AUTOSTART</code> = 1102
</p></td>
</tr>
</tbody>
</table>
</div>

### 표준 VTOL

<div class="frame_common">
<img src="../../assets/airframes/types/VTOLPlane.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_standard_vtol_hil_standard_vtol_quadplane">
 <td>HIL 표준 VTOL QuadPlane</td>
 <td>유지보수: Roman Bapst &lt;roman@auterion.com&gt;<p><code>SYS_AUTOSTART</code> = 1002</p></td>
</tr>
<tr id="vtol_standard_vtol_generic_standard_vtol">
 <td>Generic Standard VTOL</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 13000</p></td>
</tr>
<tr id="vtol_standard_vtol_vertical_technologies_deltaquad">
 <td>Vertical Technologies DeltaQuad</td>
 <td>유지보수: Sander Smeets &lt;sander@droneslab.com&gt;<p><code>SYS_AUTOSTART</code> = 13013</p><p><b>특정 출력:</b><ul><li><b>Motor1</b>: motor 1</li><li><b>Motor2</b>: motor 2</li><li><b>Motor3</b>: motor 3</li><li><b>Motor4</b>: motor 4</li><li><b>Servo1</b>: Right elevon</li><li><b>Servo2</b>: Left elevon</li><li><b>Servo3</b>: Pusher motor</li><li><b>Servo4</b>: Pusher reverse channel</li></ul></p></td>
</tr>
<tr id="vtol_standard_vtol_babyshark_vtol">
 <td>BabyShark VTOL</td>
 <td>유지보수: Silvan Fuhrer &lt;silvan@auterion.com&gt;<p><code>SYS_AUTOSTART</code> = 13014</p><p><b>특정 출력:</b><ul><li><b>Motor1</b>: motor 1</li><li><b>Motor2</b>: motor 2</li><li><b>Motor3</b>: motor 3</li><li><b>Motor4</b>: motor 4</li><li><b>Motor5</b>: Pusher motor</li><li><b>Servo1</b>: Ailerons</li><li><b>Servo2</b>: A-tail left</li><li><b>Servo3</b>: A-tail right</li></ul></p></td>
</tr>
</tbody>
</table>
</div>

### VTOL Tailsitter

<div class="frame_common">
<img src="../../assets/airframes/types/AirframeUnknown.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_vtol_tailsitter_generic_vtol_tailsitter">
 <td>Generic VTOL Tailsitter</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 13200</p></td>
</tr>
</tbody>
</table>
</div>

### VTOL 틸트로터

<div class="frame_common">
<img src="../../assets/airframes/types/VTOLTiltRotor.svg"/>
</div>

<div class="frame_variant">
<table>
 <thead>
   <tr><th>이름</th><th></th></tr>
 </thead>
<tbody>
<tr id="vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor">
 <td>일반 쿼드플레인 수직이착륙기</td>
 <td><p><code>SYS_AUTOSTART</code> = 13030</p></td>
</tr>
<tr id="vtol_vtol_tiltrotor_generic_tiltrotor_vtol">
 <td>Generic Tiltrotor VTOL</td>
 <td>유지보수: John Doe &lt;john@example.com&gt;<p><code>SYS_AUTOSTART</code> = 13100</p></td>
</tr>
</tbody>
</table>
</div>


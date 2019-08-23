# 기체 프레임 참고문헌

> **참고** **이 목록은 소스 코드에서 자동으로 생성됩니다**.
> 
> **AUX** 채널은 Pixhawk 보드(**AUX OUT** 레이블로 표시됨)에서만 사용할 수 있습니다.

이 페이지에는 모터 할당과 번호 지정을 포함한 지원되는 모든 기체 프레임이 나열됩니다 **녹색 모터**는 시계 방향으로 회전합니다. **파란색 모터**는 반시계 방향으로 회전합니다.

## 콥터

### 동축 헬리콥터

<div>
  <img src="../../assets/airframes/types/HelicopterCoaxial.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 좌측 경사판 서보모터, 피치 축</li><li><b>MAIN2</b>: 우측 경사판 서보모터, 롤 축</li><li><b>MAIN3</b>: 상부 로터 (CCW)</li><li><b>MAIN4</b>: 하부 로터 (CW)</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_coaxial_helicopter_esky_(big)_lama_v4">
 <td style="vertical-align: top;">Esky (Big) Lama v4</td>
 <td style="vertical-align: top;"><p>Maintainer: Emmanuel Roussel</p><p><code>SYS_AUTOSTART</code> = 15001</p></td>

</tr>
</tbody></table>

### Dodecarotor cox

<div>
  <img src="../../assets/airframes/types/DodecaRotorXCoaxial.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>AUX1</b>: 모터 7</li><li><b>AUX2</b>: 모터 8</li><li><b>AUX3</b>: 모터 9</li><li><b>AUX4</b>: 모터 10</li><li><b>AUX5</b>: 모터 11</li><li><b>AUX6</b>: 모터 12</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_dodecarotor_cox_generic_dodecarotor_cox_geometry">
 <td style="vertical-align: top;">Generic Dodecarotor cox geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: William Peale <develop707@gmail.com></p><p><code>SYS_AUTOSTART</code> = 24001</p></td>

</tr>
</tbody></table>

### 헬리콥터

<div>
  <img src="../../assets/airframes/types/Helicopter.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 메인 모터</li><li><b>MAIN2</b>: 전면 경사판 서보</li><li><b>MAIN3</b>: 우측 경사판 서보</li><li><b>MAIN4</b>: 좌측 경사판 서보</li><li><b>MAIN5</b>: 테일 로터 서보</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_helicopter_blade_130x">
 <td style="vertical-align: top;">Blade 130X</td>
 <td style="vertical-align: top;"><p>Maintainer: Bart Slinger <bartslinger@gmail.com></p><p><code>SYS_AUTOSTART</code> = 16001</p></td>

</tr>
</tbody></table>

### 헥사로터 +

<div>
  <img src="../../assets/airframes/types/HexaRotorPlus.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터1</li><li><b>MAIN2</b>: 모터2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_hexarotor_+_generic_hexarotor_+_geometry">
 <td style="vertical-align: top;">Generic Hexarotor + geometry</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 7001</p></td>

</tr>
</tbody></table>

### 동축 헥사로터

<div>
  <img src="../../assets/airframes/types/Y6B.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 전면 우측 탑, CW; 각도:60; 방향:CW</li><li><b>MAIN2</b>: 전면 우측 하단, CCW; 각도:60; 방향:CCW</li><li><b>MAIN3</b>: 후면 상단, CW; 각도:180; 방향:CW</li><li><b>MAIN4</b>: 후면 하단, CCW; 각도:180; 방향:CCW</li><li><b>MAIN5</b>: 전면 좌측 상단, CW; 각도:-60; 방향:CW</li><li><b>MAIN6</b>: 전면 좌측 하단, CCW; 각도:-60; 방향:CCW</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_hexarotor_coaxial_generic_hexarotor_coaxial_geometry">
 <td style="vertical-align: top;">일반 육각형 모양</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 11001</p></td>

</tr>
</tbody></table>

### 육면체

<div>
  <img src="../../assets/airframes/types/HexaRotorX.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="copter_hexarotor_x_generic_hexarotor_x_geometry">
    <td style="vertical-align: top;">
      일반 16진법 x 지오메트리
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 6001
      </p>
      
      <p>
        <b>Specific Outputs:</b>
        
        <ul>
          <li>
            <b>AUX1</b>: feed-through of RC AUX1 channel
          </li>
          <li>
            <b>AUX2</b>: feed-through of RC AUX2 channel
          </li>
          <li>
            <b>AUX3</b>: feed-through of RC AUX3 channel
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_hexarotor_x_uvify_draco-r">
    <td style="vertical-align: top;">
      UVify Draco-R
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Hyon Lim <lim@uvify.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 6002
      </p>
      
      <p>
        <b>Specific Outputs:</b>
        
        <ul>
          <li>
            <b>AUX1</b>: feed-through of RC AUX1 channel
          </li>
          <li>
            <b>AUX2</b>: feed-through of RC AUX2 channel
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>

### 옥토 콕스 와이드

<div>
  <img src="../../assets/airframes/types/OctoRotorXCoaxial.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_octo_coax_wide_steadidrone_mavrik">
 <td style="vertical-align: top;">스테디론 맥브릭</td>
 <td style="vertical-align: top;"><p>Maintainer: Simon Wilks <simon@uaventure.com></p><p><code>SYS_AUTOSTART</code> = 12002</p></td>

</tr>
</tbody></table>

### Octorotor +

<div>
  <img src="../../assets/airframes/types/OctoRotorPlus.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_octorotor_+_generic_octocopter_+_geometry">
 <td style="vertical-align: top;">일반 옥토콥터 + 지오메트리</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 9001</p></td>

</tr>
</tbody></table>

### 동축

<div>
  <img src="../../assets/airframes/types/OctoRotorXCoaxial.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_octorotor_coaxial_generic_10">
 <td style="vertical-align: top;">일반 10" 옥토 동축 지오메트리</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 12001</p></td>

</tr>
</tbody></table>

### 도관 x

<div>
  <img src="../../assets/airframes/types/OctoRotorX.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_octorotor_x_generic_octocopter_x_geometry">
 <td style="vertical-align: top;">일반 옥토콥터 X 지오메트리</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 8001</p></td>

</tr>
</tbody></table>

### 쿼드로터 +

<div>
  <img src="../../assets/airframes/types/QuadRotorPlus.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li><li><b>AUX4</b>: RC FLAPS 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_quadrotor_+_generic_10">
 <td style="vertical-align: top;">일반 10" 쿼드 + 지오메트리</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 5001</p></td>

</tr>
</tbody></table>

### 쿼드로터 H

<div>
<img src="../../assets/airframes/types/QuadRotorH.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="copter_quadrotor_h_reaper_500_quad">
    <td style="vertical-align: top;">
      리퍼 500 쿼드
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Blankered
      </p>
      
      <p>
        SYS_AUTOSTART = 4040
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>MAIN6</b>: RC AUX2 채널의 피드스루
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_h_betafpv_beta75x_2s_brushless_whoop">
    <td style="vertical-align: top;">
      BetaFPV Beta75X 2S Brushless Whoop
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Beat Kueng <beat-kueng@gmx.net>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4041
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
        </ul>
      </p>
    </td>
  </tr>
</table>

### 쿼드로터 와이드

<div>
  <img src="../../assets/airframes/types/QuadRotorWide.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li><li><b>AUX4</b>: RC FLAPS 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="copter_quadrotor_wide_team_blacksheep_discovery">
    <td style="vertical-align: top;">
      팀 블랙셰프 디스커버리
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 10015
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>MAIN6</b>: RC AUX2 채널의 피드스루
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_wide_3dr_iris_quadrotor">
    <td style="vertical-align: top;">
      3DR Iris Quadrootor
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 10016
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_wide_steadidrone_qu4d">
    <td style="vertical-align: top;">
      스테디드론 QU4D
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 10017
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>MAIN6</b>: RC AUX2 채널의 피드스루
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_wide_team_blacksheep_discovery_endurance">
    <td style="vertical-align: top;">
      팀 블랙셰프 발견 내구성
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 10018
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>MAIN6</b>: RC AUX2 채널의 피드스루
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>

### 쿼드로터 비대칭

<div>
  <img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><0>MAIN1</0>: 모터1(전면 우측: CCW)</li><li><b>MAIN2</b>: 모터 2(후면 좌측: CCW)</li><li>메인3: 모터3(전면 좌측: CW)</li><li>메인4: 모터4(오른쪽 후면: CW)</li><li><b>MAIN5</b>: RC AUX1 채널의 피드스루</li><li><b>MAIN6</b>: RC AUX2 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_quadrotor_asymmetric_spedix_s250aq">
 <td style="vertical-align: top;"><a href="https://docs.px4.io/en/framebuild_multicopter/spedix_s250_pixracer.html">Spedix S250AQ</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 4051</p></td>

</tr>
</tbody></table>

### 쿼드로터 x

<div>
<img src="../../assets/airframes/types/QuadRotorX.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="copter_quadrotor_x_generic_quadrotor_x">
    <td style="vertical-align: top;">
      일반 쿼드로터 x
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4001
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>MAIN6</b>: RC AUX2 채널의 피드스루
          </li>
          <li>
            <b>AUX1</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>AUX2</b>: RC AUX2 채널의 피드스루
          </li>
          <li>
            <b>AUX3</b>: RC AUX3 채널의 피드스루
          </li>
          <li>
            <b>AUX4</b>: RC FLAPS 채널의 피드스루
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_generic_quadrotor_x_with_mount_(e.g._gimbal)">
    <td style="vertical-align: top;">
      마운트가 있는 일반 쿼드로터 x(예: 짐벌)
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Leon Mueller <thedevleon>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4002
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: RC AUX1 채널의 피드스루
          </li>
          <li>
            <b>MAIN6</b>: RC AUX2 채널의 피드스루
          </li>
          <li>
            <b>AUX1</b>: 마운트 피치
          </li>
          <li>
            <b>AUX2</b>: 마운트 롤(roll)
          </li>
          <li>
            <b>AUX3</b>: 마운트 요(yaw)
          </li>
          <li>
            <b>AUX4</b>: 마운트 접힘
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_lumenier_qav-r_(raceblade)_5">
    <td style="vertical-align: top;">
      루미에 QAV-R(레이스블레이드) 5인치 암
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: James Goppert <james.goppert@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4003
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_h4_680mm_with_z1_tiny2_gimbal">
    <td style="vertical-align: top;">
      H4 680mm(Z1 Tiny2 Gimbal 포함)
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <thedevleon>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4004
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_lumenier_qav250">
    <td style="vertical-align: top;">
      루미에 QAV250
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4009
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_dji_flame_wheel_f330">
    <td style="vertical-align: top;">
      DJI Flame 휠 F330
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4010
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_dji_flame_wheel_f450">
    <td style="vertical-align: top;">
      DJI Flame 휠 F450
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4011
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_f450-sized_quadrotor_with_can">
    <td style="vertical-align: top;">
      F450 크기의 쿼드로터(CAN 포함)
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Pavel Kirienko <pavel.kirienko@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4012
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_parrot_bebop_frame">
    <td style="vertical-align: top;">
      파라트 비트밥 프레임
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Michael Schaeuble
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4013
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_s500_generic">
    <td style="vertical-align: top;">
      S500 Generic
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4014
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_holybro_s500">
    <td style="vertical-align: top;">
      Holybro S500
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4015
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_hobbyking_micro_pcb">
    <td style="vertical-align: top;">
      Hobbyking Micro PCB
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Thomas Gubler <thomas@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4020
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_3dr_solo">
    <td style="vertical-align: top;">
      3DR Solo
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Andreas Antener <andreas@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4030
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_3dr_diy_quad">
    <td style="vertical-align: top;">
      3DR DIY Quad
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4031
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_generic_250_racer">
    <td style="vertical-align: top;">
      Generic 250 Racer
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4050
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_holybro_qav250">
    <td style="vertical-align: top;">
      <a href="https://docs.px4.io/en/frames_multicopter/holybro_qav250_pixhawk4_mini.html">HolyBro QAV250</a>
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Beat Kueng <beat-kueng@gmx.net>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4052
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_holybro_kopis_2">
    <td style="vertical-align: top;">
      Holybro Kopis 2
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Beat Kueng <beat@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4053
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_dji_matrice_100">
    <td style="vertical-align: top;">
      DJI Matrice 100
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: James Goppert <james.goppert@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4060
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_intel_aero_ready_to_fly_drone">
    <td style="vertical-align: top;">
      Intel Aero Ready to Fly Drone
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Beat Kueng <beat@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4070
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_uvify_ifo">
    <td style="vertical-align: top;">
      UVify IFO
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Hyon Lim <lim@uvify.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4071
      </p>
      
      <p>
        <b>Specific Outputs:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: motor 1
          </li>
          <li>
            <b>MAIN2</b>: motor 2
          </li>
          <li>
            <b>MAIN3</b>: motor 3
          </li>
          <li>
            <b>MAIN4</b>: motor 4
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_uvify_draco">
    <td style="vertical-align: top;">
      UVify Draco
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Hyon Lim <lim@uvify.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4072
      </p>
      
      <p>
        <b>Specific Outputs:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: motor 1
          </li>
          <li>
            <b>MAIN2</b>: motor 2
          </li>
          <li>
            <b>MAIN3</b>: motor 3
          </li>
          <li>
            <b>MAIN4</b>: motor 4
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_zmr250_racer">
    <td style="vertical-align: top;">
      ZMR250 Racer
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Anton Matosov <anton.matosov@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4080
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_nanomind_110_quad">
    <td style="vertical-align: top;">
      NanoMind 110 Quad
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Henry Zhang <zhanghui629@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4090
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_teal_one">
    <td style="vertical-align: top;">
      Teal One
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Jacob Dahl <jacob.dahl@tealdrones.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4250
      </p>
      
      <p>
        <b>Specific Outputs:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: motor 1
          </li>
          <li>
            <b>MAIN2</b>: motor 2
          </li>
          <li>
            <b>MAIN3</b>: motor 3
          </li>
          <li>
            <b>MAIN4</b>: motor 4
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="copter_quadrotor_x_crazyflie_2">
    <td style="vertical-align: top;">
      Crazyflie 2
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Dennis Shtatov <densht@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 4900
      </p>
    </td>
  </tr>
</table>

### 시뮬레이션(코퍼)

<div>
<img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="copter_simulation_(copter)_hil_quadcopter_x">
    <td style="vertical-align: top;">
      힐 쿼드콥터 X
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 1001
      </p>
    </td>
  </tr>
  
  <tr id="copter_simulation_(copter)_sih_quadcopter_x">
    <td style="vertical-align: top;">
      SIH Quadcopter X
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Romain Chiappinelli <romain.chiap@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 1100
      </p>
    </td>
  </tr>
</table>

### 틸트-쿼드

<div>
  <img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li>AUX1</b>: 로터 2 암용 외부 서보 모터</li><li>AUX2</b>: 로터 4 암용 외부 서보 모터</li><li><b>AUX3</b>: 로터 2 암(arm) 내부 서보 모터</li><li><b>AUX4</b>: 로터 4 암(arm) 내부 서보 모터</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_tilt-quad_tilt-quadrotor">
 <td style="vertical-align: top;"><a href="http://www.alivaero.com/the-project.html">틸트-쿼드로터</a></td>
 <td style="vertical-align: top;"><p>Maintainer: Ricardo Marques <marques.ricardo17@gmail.com></p><p><code>SYS_AUTOSTART</code> = 4100</p></td>

</tr>
</tbody></table>

### 트리콥터 Y+

<div>
  <img src="../../assets/airframes/types/YPlus.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li>MAIN4</b>: 요 서보</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_tricopter_y+_generic_tricopter_y+_geometry">
 <td style="vertical-align: top;">일반 트리클로터 Y+ 지오메트리</td>
 <td style="vertical-align: top;"><p>Maintainer: Trent Lukaczyk <aerialhedgehog@gmail.com></p><p><code>SYS_AUTOSTART</code> = 14001</p></td>

</tr>
</tbody></table>

### 트리콥터 Y

<div>
  <img src="../../assets/airframes/types/YMinus.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 요(yaw) 서보</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="copter_tricopter_y-_generic_tricopter_y-_geometry">
 <td style="vertical-align: top;">일반 트리클로터 Y- 지오메트리</td>
 <td style="vertical-align: top;"><p>Maintainer: Trent Lukaczyk <aerialhedgehog@gmail.com></p><p><code>SYS_AUTOSTART</code> = 14002</p></td>

</tr>
</tbody></table>

## 비행기

### 플라잉 윙

<div>
  <img src="../../assets/airframes/types/FlyingWing.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="plane_flying_wing_generic_flying_wing">
    <td style="vertical-align: top;">
      일반 비행 날개
    </td>
    
    <td style="vertical-align: top;">
      <p>
        <code>SYS_AUTOSTART</code> = 3000
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_io_camflyer">
    <td style="vertical-align: top;">
      IO Camflyer
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3030
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_phantom_fpv_flying_wing">
    <td style="vertical-align: top;">
      <a href="https://docs.px4.io/en/frames_plane/wing_wing_z84.html">팬텀 FPV 플라잉 윙</a>
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3031
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_skywalker_x5_flying_wing">
    <td style="vertical-align: top;">
      스카이워커 X5 플라잉 윙
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Julian Oes <julian@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3032
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_wing_wing_(aka_z-84)_flying_wing">
    <td style="vertical-align: top;">
      <a href="https://docs.px4.io/en/framebuild_plane/wing_wing_z84.html">윙윙(또는 Z-84) 플라잉 윙</a>
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3033
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_fx-79_buffalo_flying_wing">
    <td style="vertical-align: top;">
      FX-79 버팔로 윙
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3034
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_viper">
    <td style="vertical-align: top;">
      독사
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3035
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_sparkle_tech_pigeon">
    <td style="vertical-align: top;">
      <a href="http://www.sparkletech.hk/">스파클 테크피온</a>
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3036
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_modified_parrot_disco">
    <td style="vertical-align: top;">
      수정된 앵무새 디스코
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Jan Liphardt <JTLiphardt@gmail.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3037
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_flying_wing_tbs_caipirinha">
    <td style="vertical-align: top;">
      TBS 카이피리냐
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 3100
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 좌측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 우측 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>

### 평면 A-레일

<div>
  <img src="../../assets/airframes/types/PlaneATail.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><0>MAIN1</0></b>: 에일러론 우측</li><li><b>MAIN2</b>: 좌측 보조 날개(aileron)</li><li>주3</b>: v-테일 우측</li><li>MAIN4</b>: v-테일 왼쪽</li><li><b>MAIN5</b>: 스로틀</li><li><b>MAIN6</b>: 휠</li><li><b>MAIN7</b>: 우측 플랩(flaps)</li><li><b>MAIN8</b>: 좌측 플랩(flaps)</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="plane_plane_a-tail_applied_aeronautics_albatross">
 <td style="vertical-align: top;">적용된 에어로노틱스 알바트로스</td>
 <td style="vertical-align: top;"><p>Maintainer: Andreas Antener <andreas@uaventure.com></p><p><code>SYS_AUTOSTART</code> = 2106</p></td>

</tr>
</tbody></table>

### 비행기 V-Tail

<div>
  <img src="../../assets/airframes/types/PlaneVTail.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 우측 보조 날개(aileron)</li><li><b>MAIN2</b>: 좌측 보조 날개(aileron)</li><li><b>MAIN3</b>: v-tail right</li><li><b>MAIN4</b>: v-tail left</li><li><b>MAIN5</b>: 스로틀</li><li><b>MAIN6</b>: 휠</li><li><b>MAIN7</b>: 우측 플랩(flaps)</li><li><b>MAIN8</b>: 좌측 플랩(flaps)</li><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="plane_plane_v-tail_x-uav_mini_talon">
 <td style="vertical-align: top;">X-UAV Mini Talon</td>
 <td style="vertical-align: top;"><p>Maintainer: Friedrich Beckmann <friedrich.beckmann@hs-augsburg.de></p><p><code>SYS_AUTOSTART</code> = 2106</p></td>

</tr>
</tbody></table>

### Simulation (Plane)

<div>
  <img src="../../assets/airframes/types/AirframeUnknown.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 보조 날개(aileron)</li><li><b>MAIN2</b>: 엘리베이터(elevator)</li><li><b>MAIN3</b>: 방향키 (rudder)</li><li><b>MAIN4</b>: 스로틀</li><li><b>MAIN5</b>: 플랩(flaps)</li><li><b>MAIN6</b>: 기어</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="plane_simulation_(plane)_hilstar_(xplane)">
 <td style="vertical-align: top;">HILStar (XPlane)</td>
 <td style="vertical-align: top;"><p>Maintainer: Lorenz Meier <lorenz@px4.io></p><p><code>SYS_AUTOSTART</code> = 1000</p></td>

</tr>
</tbody></table>

### Standard Plane

<div>
  <img src="../../assets/airframes/types/Plane.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: RC AUX1 채널의 피드스루</li><li><b>AUX2</b>: RC AUX2 채널의 피드스루</li><li><b>AUX3</b>: RC AUX3 채널의 피드스루</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="plane_standard_plane_standard_plane">
    <td style="vertical-align: top;">
      Standard Plane
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Lorenz Meier <lorenz@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 2100
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 엘리베이터(elevator)
          </li>
          <li>
            <b>MAIN3</b>: 스로틀
          </li>
          <li>
            <b>MAIN4</b>: 방향키 (rudder)
          </li>
          <li>
            <b>MAIN5</b>: 플랩(flaps)
          </li>
          <li>
            <b>MAIN6</b>: 기어
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="plane_standard_plane_bormatec_maja">
    <td style="vertical-align: top;">
      Bormatec Maja
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Andreas Antener <andreas@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 2105
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN3</b>: 엘리베이터(elevator)
          </li>
          <li>
            <b>MAIN4</b>: 방향키 (rudder)
          </li>
          <li>
            <b>MAIN5</b>: 스로틀
          </li>
          <li>
            <b>MAIN6</b>: 휠
          </li>
          <li>
            <b>MAIN7</b>: 플랩(flaps)
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>

## 로버

### 로버

<div>
<img src="../../assets/airframes/types/Rover.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="rover_rover_generic_ground_vehicle">
    <td style="vertical-align: top;">
      일반 지상 기체
    </td>
    
    <td style="vertical-align: top;">
      <p>
        <code>SYS_AUTOSTART</code> = 50000
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN2</b>: 조향기(steering)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="rover_rover_axial_racing_ax10">
    <td style="vertical-align: top;">
      Axial Racing AX10
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: John Doe <john@example.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 50001
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 제어 그룹 0, 채널 0의 패스 스루
          </li>
          <li>
            <b>MAIN2</b>: 제어 그룹 0, 채널 1의 패스 스루
          </li>
          <li>
            <b>MAIN3</b>: 제어 그룹 0, 채널 2의 패스 스루
          </li>
          <li>
            <b>MAIN4</b>: 제어 그룹 0, 채널 3의 패스 스루
          </li>
          <li>
            <b>MAIN5</b>: 제어 그룹 0, 채널 4의 패스 스루
          </li>
          <li>
            <b>MAIN6</b>: 제어 그룹 0, 채널 5의 패스 스루
          </li>
          <li>
            <b>MAIN7</b>: 제어 그룹 0, 채널 6의 패스 스루
          </li>
          <li>
            <b>MAIN8</b>: 제어 그룹 0, 채널 7의 패스 스루
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="rover_rover_traxxas_stampede_vxl_2wd">
    <td style="vertical-align: top;">
      <a href="https://traxxas.com/products/models/electric/stampede-vxl-tsm">Traxxas stampede vxl 2wd</a>
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Marco Zorzi
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 50002
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN2</b>: 조향기(steering)
          </li>
          <li>
            <b>MAIN4</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="rover_rover_aion_robotics_r1_ugv">
    <td style="vertical-align: top;">
      <a href="http://docs.aionrobotics.com/en/latest/r1-ugv.html">Aion Robotics R1 UGV</a>
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Timothy Scott
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 50003
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN0</b>: 우측 날개 속도
          </li>
          <li>
            <b>MAIN1</b>: 우측 날개 속도
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>

## VTOL

### 표준 VTOL

<div>
<img src="../../assets/airframes/types/VTOLPlane.svg" width="29%" style="max-height: 180px;"/>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="vtol_standard_vtol_hil_standard_vtol_quadplane">
    <td style="vertical-align: top;">
      HIL 표준 VTOL QuadPlane
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Roman Bapst <roman@auterion.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 1002
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_generic_quadplane_vtol">
    <td style="vertical-align: top;">
      Generic Quadplane VTOL
    </td>
    
    <td style="vertical-align: top;">
      <p>
        <code>SYS_AUTOSTART</code> = 13000
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>AUX1</b>: 에일러론(Aileron) 1
          </li>
          <li>
            <b>AUX2</b>: 에일러론(Aileron) 2
          </li>
          <li>
            <b>AUX3</b>: 엘리베이터(elevator)
          </li>
          <li>
            <b>AUX4</b>: 방향키 (rudder)
          </li>
          <li>
            <b>AUX5</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_fun_cub_quad_vtol">
    <td style="vertical-align: top;">
      Fun Cub Quad VTOL
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13005
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>AUX1</b>: 에일러론(Aileron) 1
          </li>
          <li>
            <b>AUX2</b>: 에일러론(Aileron) 2
          </li>
          <li>
            <b>AUX3</b>: 엘리베이터(elevator)
          </li>
          <li>
            <b>AUX4</b>: 방향키 (rudder)
          </li>
          <li>
            <b>AUX5</b>: 스로틀
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_generic_quad_delta_vtol">
    <td style="vertical-align: top;">
      Generic quad delta VTOL
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Simon Wilks <simon@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13006
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>AUX1</b>: 우측 엘러본(elevon)
          </li>
          <li>
            <b>AUX2</b>: 좌측 엘러본(elevon)
          </li>
          <li>
            <b>AUX3</b>: 모터
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_generic_aavvt_v-tail_plane_airframe_with_quad_vtol.">
    <td style="vertical-align: top;">
      Generic AAVVT v-tail plane airframe with Quad VTOL.
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Sander Smeets <sander@droneslab.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13007
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_quadranger">
    <td style="vertical-align: top;">
      QuadRanger
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Sander Smeets <sander@droneslab.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13008
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_sparkle_tech_ranger_vtol">
    <td style="vertical-align: top;">
      Sparkle Tech Ranger VTOL
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Andreas Antener <andreas@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13009
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_vertical_technologies_deltaquad">
    <td style="vertical-align: top;">
      Vertical Technologies DeltaQuad
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Sander Smeets <sander@droneslab.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13013
      </p>
      
      <p>
        <b>특정 출력:</b>
        
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
            <b>MAIN5</b>: 우측 엘러본(elevon)
          </li>
          <li>
            <b>MAIN6</b>: 좌측 엘러본(elevon)
          </li>
          <li>
            <b>MAIN7</b>: 푸셔(Pusher) 모터
          </li>
          <li>
            <b>MAIN8</b>: 푸셔(Pusher) 역방향 채널
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="vtol_standard_vtol_babyshark_vtol">
    <td style="vertical-align: top;">
      BabyShark VTOL
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Silvan Fuhrer <silvan@auterion.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13014
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 보조 날개(aileron)
          </li>
          <li>
            <b>MAIN2</b>: A-tail left
          </li>
          <li>
            <b>MAIN3</b>: 푸셔(Pusher) 모터
          </li>
          <li>
            <b>MAIN4</b>: A-tail left
          </li>
          <li>
            <b>MAIN5</b>: 모터 1
          </li>
          <li>
            <b>MAIN6</b>: 모터 2
          </li>
          <li>
            <b>MAIN7</b>: 모터 3
          </li>
          <li>
            <b>MAIN8</b>: 모터 4
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>

### VTOL Duo Tailsitter

<div>
  <img src="../../assets/airframes/types/VTOLDuoRotorTailSitter.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 우측 모터</li><li><b>MAIN2</b>: 좌측 모터</li><li><b>MAIN5</b>: 우측 엘러본(elevon)</li><li><b>MAIN6</b>: 우측 엘러본(elevon)</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="vtol_vtol_duo_tailsitter_caipiroshka_duo_tailsitter">
 <td style="vertical-align: top;">Caipiroshka Duo Tailsitter</td>
 <td style="vertical-align: top;"><p>Maintainer: Roman Bapst <roman@px4.io></p><p><code>SYS_AUTOSTART</code> = 13001</p></td>

</tr>
</tbody></table>

### VTOL Octoplane

<div>
  <img src="../../assets/airframes/types/VTOLPlaneOcto.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 3</li><li><b>MAIN4</b>: 모터 4</li><li><b>MAIN5</b>: 모터 5</li><li><b>MAIN6</b>: 모터 6</li><li><b>MAIN7</b>: 모터 7</li><li><b>MAIN8</b>: 모터 8</li><li><b>AUX1</b>: 에일러론(Aileron) 1</li><li><b>AUX2</b>: 에일러론(Aileron) 2</li><li><b>AUX3</b>: 엘리베이터(elevator)</li><li><b>AUX4</b>: 방향키 (rudder)</li><li><b>AUX5</b>: 스로틀</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
<tbody>
<tr id="vtol_vtol_octoplane_generic_octoplane_vtol">
 <td style="vertical-align: top;">Generic Octoplane VTOL</td>
 <td style="vertical-align: top;"><p><code>SYS_AUTOSTART</code> = 13050</p></td>

</tr>
</tbody></table>

### VTOL Quad Tailsitter

<div>
  <img src="../../assets/airframes/types/VTOLQuadRotorTailSitter.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>MAIN1</b>: 모터 1</li><li><b>MAIN2</b>: 모터 2</li><li><b>MAIN3</b>: 모터 4</li><li><b>MAIN4</b>: 모터 5</li><li><b>MAIN5</b>: 좌측 엘러본(elevon)</li><li><b>MAIN6</b>: 우측 엘러본(elevon)</li><li><b>MAIN7</b>: 캐너드 표면</li><li><b>MAIN8</b>: 방향키 (rudder)</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="vtol_vtol_quad_tailsitter_quadrotor_x_tailsitter">
    <td style="vertical-align: top;">
      Quadrotor X Tailsitter
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Roman Bapst <roman@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13003
      </p>
    </td>
  </tr>
  
  <tr id="vtol_vtol_quad_tailsitter_quadrotor_+_tailsitter">
    <td style="vertical-align: top;">
      Quadrotor + Tailsitter
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Roman Bapst <roman@px4.io>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13004
      </p>
    </td>
  </tr>
</table>

### VTOL Tiltrotor

<div>
  <img src="../../assets/airframes/types/VTOLTiltRotor.svg" width="29%" style="max-height: 180px;" /> 
  
  <table style="float: right; width: 70%; font-size:1.5rem;">
    <colgroup><col></colgroup> <tr>
      <th>
        공통 출력
      </th>
    </tr>
<tr>
 <td style="vertical-align: top;"><ul><li><b>AUX1</b>: 틸트 서보</li><li><b>AUX2</b>: 엘러본(elevon) 1</li><li><b>AUX3</b>: 엘러본(elevon) 2</li><li><b>AUX4</b>: 방향키 (rudder)</li></ul></td>
</tr>
  </table>
</div>

<table style="width: 100%; table-layout:fixed; font-size:1.5rem;">
  <colgroup><col style="width: 30%"><col style="width: 70%"></colgroup> <tr>
    <th>
      명칭
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr id="vtol_vtol_tiltrotor_birdseyeview_aerobotics_firefly6">
    <td style="vertical-align: top;">
      BirdsEyeView Aerobotics FireFly6
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Roman Bapst <roman@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13002
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 전면 우측 모터 하단
          </li>
          <li>
            <b>MAIN2</b>: 전면 우측 모터 하단
          </li>
          <li>
            MAIN3</b>: 후면 모터 하단
          </li>
          <li>
            <b>MAIN4</b>: 후면 모터 상단
          </li>
          <li>
            <b>MAIN5</b>: 전면 좌측 모터 하단
          </li>
          <li>
            <b>MAIN6</b>: 전면 좌측 모터 상단
          </li>
        </ul>
      </p>
    </td>
  </tr>
  
  <tr id="vtol_vtol_tiltrotor_cruiseader_claire">
    <td style="vertical-align: top;">
      CruiseAder Claire
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Samay Siga <samay_s@icloud.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13010
      </p>
    </td>
  </tr>
  
  <tr id="vtol_vtol_tiltrotor_e-flite_convergence">
    <td style="vertical-align: top;">
      E-flite Convergence
    </td>
    
    <td style="vertical-align: top;">
      <p>
        Maintainer: Andreas Antener <andreas@uaventure.com>
      </p>
      
      <p>
        <code>SYS_AUTOSTART</code> = 13012
      </p>
      
      <p>
        <b>특정 출력:</b>
        
        <ul>
          <li>
            <b>MAIN1</b>: 우측 모터
          </li>
          <li>
            <b>MAIN2</b>: 좌측 모터
          </li>
          <li>
            <b>MAIN3</b>: 후면 모터
          </li>
          <li>
            <b>MAIN4</b>: 비어 있음
          </li>
          <li>
            <b>MAIN5</b></0>: 우측 틸트 서보
          </li>
          <li>
            <b>MAIN6</b></0>: 좌측 틸트 서보
          </li>
          <li>
            <b>MAIN7</b>: 우측 엘러본(elevon)
          </li>
          <li>
            <b>MAIN8</b>: 좌측 엘러본(elevon)
          </li>
        </ul>
      </p>
    </td>
  </tr>
</table>
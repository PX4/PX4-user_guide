# Pixfalcon 비행 컨트롤러 

Pixfalcon 자동 조종 장치 ( Holybro <sup> 및 reg; </ 1> </ 0>) 는 공간에 최적화 된 <a href="../flight_controller/pixhawk.md"> Pixhawk 1 </ 2> 디자인의 2 진 호환 (FMUv2) FPV 레이서와 같은 제한된 애플리케이션. 크기를 줄이기 위해 IO가 적습니다</p> 

<p>
  <img src="../../assets/hardware/hardware-pixfalcon.png" alt="" />
</p>

<h2>
  빠른 요약
</h2>

<pre><code>* 메인 시스템 - 온 - 칩 : [STM32F427] (http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  * CPU : 단일 정밀도 FPU를 갖는 180MHz ARM &lt;sup&gt; Cortex &lt;sup&gt; M4
  * RAM : 256KB SRAM (L1)
* Failsafe System-on-Chip : STM32F100
  * CPU : 24 MHz ARM Cortex M3
  * RAM : 8KB SRAM
* GPS : U-Blox &lt;sup&gt; & amp; reg; &lt;/ 0> M8 (번들)
</code></pre>

<h3>
  Connectivity
</h3>

<pre><code>* 1x I2C
* 2x UART (텔레 메 트리 / OSD 용, 유량 제어 없음)
* 수동 오버라이드 기능이있는 8x PWM
* S.BUS / PPM 입력
</code></pre>

<h2>
  유효성:
</h2>

<p>
  제조사 : <a href="http://www.holybro.com/product/8"> Holybro </ 0> 또는 유통 업체 <a href="http://www.hobbyking.com/hobbyking/store/__86437__PixFalcon_Micro_PX4_Autopilot_plus_Micro_M8N_GPS_and_Mega_PBD_Power_Module.html"> Hobbyking <sup> & reg; </ 2> </ 1></p> 
  
  <p>
    옵션 하드웨어
  </p>
  
  <ul>
    <li>
      광학 플로우 : 제조업체 <a href="http://www.holybro.com/product/24"> Holybro </ 0> 또는 유통 업체 <a href="http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html"> Hobbyking </ 1>의 PX4 Flow 장치</li> 
      
      <li>
        제조사 <a href="http://www.holybro.com/product/26"> Holybro </ 0> 또는 유통 업체 <a href="http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html"> Hobbyking </ 1>의 디지털 속도 센서</li> 
        
        <li>
          통합 텔레 메 트리가있는 화면 디스플레이 <ul>
            <li>
              <a href="http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html">Hobbyking OSD + EU Telemetry (433 MHz)</a>
            </li>
          </ul>
        </li>
        
        <li>
          순수한 텔레 메 트리 옵션 <ul>
            <li>
              <a href="http://www.hobbyking.com/hobbyking/store/__87841__APM_Pixhawk_Wireless_Wifi_Radio_Module.html">Hobbyking 와이파이 텔레 메 트리</a>
            </li>
            <li>
              <a href="http://www.hobbyking.com/hobbyking/store/__74647__Micro_HKPilot_Telemetry_radio_Set_With_Integrated_PCB_Antenna_433Mhz.html">Hobbyking EU 마이크로 텔레 메 트리 (433 MHz)</a>
            </li>
            <li>
              <a href="http://www.hobbyking.com/hobbyking/store/__74648__Micro_HKPilot_Telemetry_radio_Set_With_Integrated_PCB_Antenna_915Mhz.html">Hobbyking 미국 마이크로 텔레 메 트리 (915 MHz)</a>
            </li>
          </ul>
        </li></ul> 
        
        <h2>
          Building Firmware
        </h2>
        
        <blockquote>
          <p>
            <strong>Tip</strong> Most users will not need to build this firmware! It is pre-built and automatically installed by <em>QGroundControl</em> when appropriate hardware is connected.
          </p>
        </blockquote>
        
        <p>
          To <a href="https://dev.px4.io/en/setup/building_px4.html">build PX4</a> for this target:
        </p>
        
        <pre><code>make px4_fmu-v2_default
</code></pre>
        
        <h2>
          주요 링크
        </h2>
        
        <ul>
          <li>
            <a href="http://www.holybro.com/manual/pixfalcon.pdf">사용자 매뉴얼</a>
          </li>
        </ul>
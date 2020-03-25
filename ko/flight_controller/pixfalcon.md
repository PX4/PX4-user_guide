# Pixfalcon 비행 컨트롤러 

Pixfalcon 자동 조종 장치 ( Holybro <sup> 및 reg; </ 1> </ 0>) 는 공간에 최적화 된 <a href="../flight_controller/pixhawk.md"> Pixhawk 1 </ 2> 디자인의 2 진 호환 (FMUv2) FPV 레이서와 같은 제한된 애플리케이션. 크기를 줄이기 위해 IO가 적습니다</p> 

<p>
  <img src="../../assets/hardware/hardware-pixfalcon.png" alt="" />
</p>

<h2>
  Quick Summary
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
  From distributor <a href="https://hobbyking.com/en_us/pixfalcon-micro-px4-autopilot-plus-micro-m8n-gps-and-mega-pbd-power-module.html">Hobbyking<sup>&reg;</sup></a>
</p>

<p>
  옵션 하드웨어
</p>

<ul>
  <li>
    Optical flow: PX4 Flow unit from manufacturer <a href="http://www.holybro.com/product/px4flow/">Holybro</a>
  </li>
  <li>
    Digital Airspeed sensor from manufacturer <a href="http://www.holybro.com/product/digital-air-speed-sensor/">Holybro</a> or distributor <a href="https://hobbyking.com/en_us/hkpilot-32-digital-air-speed-sensor-and-pitot-tube-set.html">Hobbyking</a>
  </li>
  <li>
    통합 텔레 메 트리가있는 화면 디스플레이 <ul>
      <li>
        <a href="https://hobbyking.com/en_us/micro-hkpilot-telemetry-radio-module-with-on-screen-display-osd-unit-433mhz.html">Hobbyking OSD + EU Telemetry (433 MHz)</a>
      </li>
    </ul>
  </li>
  <li>
    순수한 텔레 메 트리 옵션 <ul>
      <li>
        <a href="https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html">Hobbyking 와이파이 텔레 메 트리</a>
      </li>
      <li>
        <a href="https://hobbyking.com/en_us/hkpilot32-autonomous-vehicle-32bit-control-set-with-telemetry-and-gps-433mhz.html">HKPilot Micro Telemetry EU version (433 MHz)</a>
      </li>
      <li>
        <a href="https://hobbyking.com/en_us/hkpilot32-autonomous-vehicle-32bit-control-set-with-telemetry-and-gps-915mhz.html">HKPilot Micro Telemetry EU version (915 MHz)</a>
      </li>
    </ul>
  </li>
</ul>

<h2>
  Building Firmware
</h2>

<blockquote>
  <p>
    <strong>Tip</strong> Most users will not need to build this firmware! It is pre-built and automatically installed by <em>QGroundControl</em> when appropriate hardware is connected.
  </p>
</blockquote>

<p>
  To <a href="https://dev.px4.io/master/en/setup/building_px4.html">build PX4</a> for this target:
</p>

<pre><code>make px4_fmu-v2_default
</code></pre>

<h2>
  Debug Port
</h2>

<p>
  This board does not have a debug port (i.e it does not have a port for accessing the <a href="http://dev.px4.io/master/en/debug/system_console.html">System Console</a> or SWD (JTAG) debug interface.
</p>

<p>
  Developers will need to solder wires to the board test pads for SWD, and to the STM32F4 (IC) TX and RX to get a console.
</p>

<h2>
  Serial Port Mapping
</h2>

<table>
  <tr>
    <th>
      UART
    </th>
    
    <th>
      Device
    </th>
    
    <th>
      Port
    </th>
  </tr>
  
  <tr>
    <td>
      UART1
    </td>
    
    <td>
      /dev/ttyS0
    </td>
    
    <td>
      IO Debug
    </td>
  </tr>
  
  <tr>
    <td>
      USART2
    </td>
    
    <td>
      /dev/ttyS1
    </td>
    
    <td>
      TELEM1 (No flow control)
    </td>
  </tr>
  
  <tr>
    <td>
      UART4
    </td>
    
    <td>
      /dev/ttyS2
    </td>
    
    <td>
      GPS
    </td>
  </tr>
</table>

<h2>
  Key Links
</h2>

<ul>
  <li>
    <a href="http://www.holybro.com/manual/pixfalcon11.pdf">User Manual</a>
  </li>
</ul>
# Pixfalcon Flight Controller (Discontinued)

> **Warning** This flight controller has been [discontinued](../flight_controller/autopilot_experimental.md) and is no longer commercially available.

Pixfalcon 자동 조종 장치 ( Holybro <sup> 및 reg; </ 1> </ 0>) 는 공간에 최적화 된 <a href="../flight_controller/pixhawk.md"> Pixhawk 1 </ 2> 디자인의 2 진 호환 (FMUv2) FPV 레이서와 같은 제한된 애플리케이션. 크기를 줄이기 위해 IO가 적습니다</p> 

<p>
  <img src="../../assets/hardware/hardware-pixfalcon.png" alt="Pixfalcon hero image" />
</p>

<h2>
  Quick Summary
</h2>

<ul>
  <li>
    Main System-on-Chip: <a href="http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789">STM32F427</a> <ul>
      <li>
        CPU: 180 MHz ARM<sup>&reg;</sup> Cortex<sup>&reg;</sup> M4 with single-precision FPU
      </li>
      <li>
        RAM: 256 KB SRAM (L1)
      </li>
    </ul>
  </li>
  <li>
    Failsafe System-on-Chip: STM32F100 <ul>
      <li>
        CPU: 24 MHz ARM Cortex M3
      </li>
      <li>
        RAM: 8 KB SRAM
      </li>
    </ul>
  </li>
  <li>
    GPS: U-Blox<sup>&reg;</sup> M8 (bundled)
  </li>
</ul>

<h3>
  Connectivity
</h3>

<ul>
  <li>
    1x I2C
  </li>
  <li>
    2x UART (one for Telemetry / OSD, no flow control)
  </li>
  <li>
    8x PWM with manual override
  </li>
  <li>
    S.BUS / PPM input
  </li>
</ul>

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
    On screen display with integrated Telemetry: <ul>
      <li>
        <a href="https://hobbyking.com/en_us/micro-hkpilot-telemetry-radio-module-with-on-screen-display-osd-unit-433mhz.html">Hobbyking OSD + EU Telemetry (433 MHz)</a>
      </li>
    </ul>
  </li>
  <li>
    Pure Telemetry options: <ul>
      <li>
        <a href="https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html">Hobbyking Wifi Telemetry</a>
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
  This board does not have a debug port (i.e it does not have a port for accessing the <a href="http://dev.px4.io/master/en/debug/system_console.html">System Console</a> or the <a href="http://dev.px4.io/master/en/debug/swd_debug.html">SWD interface</a> (JTAG).
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
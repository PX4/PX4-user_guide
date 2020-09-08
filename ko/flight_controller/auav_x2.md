# AUAV-X2 오토파일럿(계속)

> **Warning** This flight controller has been [discontinued](../flight_controller/autopilot_experimental.md) and is no longer commercially available.

[AUAV <sup>&reg; </sup>](http://www.auav.com/) *AUAV-X2 오토파일럿 *은 Pixhawk <sup>을 기반으로 합니다. 이 프로그램은 <a href="http://nuttx.org"> NuttX </a> OS에서 PX4를 실행합니다.</p> 

<p>
  <img src="../../assets/flight_controller/auav_x2/auavx2_case2.jpg" alt="AUAVX2_case2" />
</p>

<h2>
  빠른 요약
</h2>

<ul>
  <li>
    Main System-on-Chip: <a href="http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789">STM32F427</a> <ul>
      <li>
        CPU: STM32F427VIT6 ARM 마이크로컨트롤러 - 개정 3
      </li>
      <li>
        IO: STM32F100C8T6 ARM 마이크로컨트롤러
      </li>
    </ul>
  </li>
  <li>
    Sensors: <ul>
      <li>
        MPU9250 9DOF
      </li>
      <li>
        Invensense ICM-20608 6DOF
      </li>
      <li>
        MEAS MS5611 barometer
      </li>
    </ul>
  </li>
  <li>
    Dimensions/Weight <ul>
      <li>
        크기: 36mm x 50mm
      </li>
      <li>
        장착 지점 : 직경 30.5mm x 30.5mm 3.2mm
      </li>
      <li>
        무게 : 10.9g
      </li>
    </ul>
  </li>
  <li>
    역 전압 보호 기능이있는 전원 OR 회로도. 5V 전원 모듈이 필요합니다!
  </li>
</ul>

<h2>
  Connectivity
</h2>

<ul>
  <li>
    2.54mm 헤더 :
  </li>
  <li>
    GPS (USART4)
  </li>
  <li>
    i2c
  </li>
  <li>
    RC 입력
  </li>
  <li>
    PPM 입력 
  </li>
  <li>
    Spektrum 입력
  </li>
  <li>
    RSSI 입력
  </li>
  <li>
    sBus 입력
  </li>
  <li>
    sBus 출력
  </li>
  <li>
    전원 입력
  </li>
  <li>
    부저 출력
  </li>
  <li>
    LED 출력
  </li>
  <li>
    8 x Servo 출력
  </li>
  <li>
    6 x Aux 출력
  </li>
  <li>
    USART7 (콘솔)
  </li>
  <li>
    USART8 (OSD)
  </li>
</ul>

<h2>
  Availability
</h2>

<p>
  더 이상 생산하지 않습니다. 이것은 <a href="mro_x2.1.md"> mRo X2.1 </ 0>에 의해 대체되었습니다. mRobotics is the distributor for the AUAV Products from August 2017.</p> 
  
  <h2>
    주요 링크
  </h2>
  
  <ul>
    <li>
      <a href="http://arsovtech.com/wp-content/uploads/2015/08/AUAV-X2-user-manual-EN.pdf">사용자 매뉴얼</a>
    </li>
    <li>
      <a href="http://diydrones.com/profiles/blogs/introducing-the-auav-x2-1-flight-controller">DIY Drones Post</a>
    </li>
  </ul>
  
  <h2>
    배선 설명서
  </h2>
  
  <p>
    <img src="../../assets/flight_controller/auav_x2/auav_x2_basic_setup_3.png" alt="AUAV-X2 기본 설정 3" />
  </p>
  
  <p>
    <img src="../../assets/flight_controller/auav_x2/auav_x2_basic_setup_2.jpg" alt="AUAV-X2 기본 설정 2" />
  </p>
  
  <p>
    <img src="../../assets/flight_controller/auav_x2/auav_x2_basic_setup_1.png" alt="AUAV-X2 기본 설정 1" />
  </p>
  
  <p>
    <img src="../../assets/flight_controller/auav_x2/auav_x2_airspeed_setup_3.png" alt="AUAV-X2-airpeed-setup 3" />
  </p>
  
  <h2>
    회로도
  </h2>
  
  <p>
    The board is based on the <a href="https://pixhawk.org/">Pixhawk project</a> <strong>FMUv2</strong> open hardware design.
  </p>
  
  <ul>
    <li>
      <a href="https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf">FMUv2 + IOv2 schematic</a> -- Schematic and layout
    </li>
  </ul>
  
  <blockquote>
    <p>
      <strong>Note</strong> As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are <a href="https://github.com/PX4/Hardware">available</a>.
    </p>
  </blockquote>
  
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
        IO debug
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
        TELEM1 (flow control)
      </td>
    </tr>
    
    <tr>
      <td>
        USART3
      </td>
      
      <td>
        /dev/ttyS2
      </td>
      
      <td>
        TELEM2 (flow control)
      </td>
    </tr>
    
    <tr>
      <td>
        UART4
      </td>
      
      <td>
        
      </td>
      
      <td>
        
      </td>
    </tr>
    
    <tr>
      <td>
        UART7
      </td>
      
      <td>
        CONSOLE
      </td>
      
      <td>
        
      </td>
    </tr>
    
    <tr>
      <td>
        UART8
      </td>
      
      <td>
        SERIAL4
      </td>
      
      <td>
        
      </td>
    </tr>
  </table>
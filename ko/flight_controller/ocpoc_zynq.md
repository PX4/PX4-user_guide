# Aerotenna OcPoC-Zynq 미니 비행 컨트롤러

 OcPoC-Zynq Mini </ 0>는 FPGA + ARM SoC 기반의 비행 제어 플랫폼입니다. OcPoC-Zynq의 향상된 I / O 유연성과 향상된 처리 능력으로 상용 UAS 개발자 및 연구원에게 훌륭한 솔루션입니다. FPGA의 I / O 유연성은 신속한 센서 통합과 비행 컨트롤러 하드웨어의 맞춤화를 가능하게하여 GPS, 자기 계측기 및 IMU의 3 중 중복과 같은 기능을 지원합니다. OcPoC-Zynq은 센서 및 주변 장치 확장을 위해 기체에 더 많은 공간과 무게를두고 가볍고 컴팩트 한 풋 프린트를 유지합니다.</p> 

주요 문서는 하드웨어 설정, FAQ 및 FPGA 및 커널 개발을 포함한 다양한 자습서에 대한  Aerotenna의 사용자 허브 </ 0>에서 사용할 수 있습니다.</p> 

![ocpoc-zynq-mini](../../assets/hardware/hardware-ocpoc-zynq-mini.jpg)

## Quick Summary

- 메인 FPGA + ARM 시스템 - 온 - 칩 : 자일링스 Zynq Z-7010 
    - CPU: 667 MHz Dual-Core ARM A9 
    - FPGA: Artix®-7 with 28K Logic Cells 
    - RAM: 512 MB DDR3 
    - Flash: 128 MB 
    - SD Card: 16 GB 
- IMU: 2x MPU9250 9-DOF 
- Baro: 1x MS5611 
- Power: 5-30 VDC 
    - OcPoC regulates internally to 5V 
    - 2S-6S LiPo 배터리는 기체상의 일반적인 전원입니다.
    - 벤치 테스트를 위해 콘솔 "USB1"포트는 5V
- 16x Programmable 3-pin GPIOs
- 다음 인터페이스를 지원하는 JST-GH 커넥터에서 10x 프로그래밍 가능한 I / O : 
    - I2C
    - USB-OTG 
    - USB-UART 
    - SPI
    - CSI 
    - GSI 
    - CAN
- 이용 가능 여부 :  Aerotenna Store </ 0></li> </ul> 
    
    ## 핀아웃 및 SD 카드 설정
    
    기본 OcPoC-Zynq 구성을위한 핀아웃과 최초 설치를위한 전체 단계별 지침은  Aerotenna의 사용자 허브 </ 0>에서 제공됩니다.</p> 
    
    ## OcPoC-Zynq 용 PX4 구현
    
    After setting up the PX4 development environment and cloning the [PX4 Firmware](https://github.com/PX4/Firmware), you can build PX4 for OcPoC-Zynq with the following commands (for Aerotenna's default ubuntu-armhf root file system):
    
        make aerotenna_ocpoc_ubuntu
        
    
    OcPoC-Zynq에서 PX4를 처음 설정할 때의 전체 단계별 지침은 사용자 허브 페이지  OcPoC Zynq Mini의 PX4 </ 0>를 참조하십시오. 참고 : 현재 PX4 펌웨어는 OcPoC-Zynq 용 사전 빌드 된 바이너리가 QGroundControl을 통해 제공되지 않으므로 소스에서 빌드해야합니다.</p>
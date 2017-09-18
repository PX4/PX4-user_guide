# Crazyflie 2.0

Bitcraze AB가 만든 소형 쿼드타입 드론의 Crazyflie 라인 중에 하나입니다. Crazyflie 2 (CF2)의 대략적인 내용은 다음을 참고하세요. : https://www.bitcraze.io/crazyflie-2/

![](../../assets/hardware/hardware-crazyflie2.png)

## 간략 요약

> **Note** 메인 하드웨어 문서는 여기 : https://wiki.bitcraze.io/projects:crazyflie2:index

  * Main System-on-Chip: STM32F405RG
    * CPU: 168 MHz ARM Cortex M4 with single-precision FPU
    * RAM: 192 KB SRAM
  * nRF51822 radio and power management MCU
  * MPU9250 Accel / Gyro / Mag
  * LPS25H barometer


## Flashing

PX4 개발 환경을 셋업하고 나서, PX4 소프트웨어를 CF2에 넣는 다음 단계들을 따라합니다 :

1. PX4의 소스코드 가져오기 [Bootloader](https://github.com/PX4/Bootloader)
1. 컴파일 하기. 사용명령 : `make crazyflie_bl`
1. CF2를 DFU mode로 설정 :
	- 처음 전원이 연결되지 않도록 한다.
	- 버튼을 누르고 있는다.
	- 컴퓨터의 USB 포트에 연결한다.
	- 몇 초 뒤에 파란 LED는 깜빡이기 시작하고 5초 뒤에는 더 빠르게 깜빡이기 시작한다.
	- 누르고 있던 버튼에서 뗀다.
1. dfu-util를 사용해서 bootloader를 flash 하기 : `sudo dfu-util -d 0483:df11 -a 0 -s 0x08000000 -D crazyflie_bl.bin` 그리고 완료도면 CF2 연결을 해제
	- 성공적으로 되었다면 다시 연결할 때 노란색 LED가 깜빡여야 합니다.
1. [Firmware](https://github.com/PX4/Firmware) 소스 가져오기
1. `make crazyflie_default upload` 명령으로 컴파일하기
1. CF2에 연결 : bootloader mode를 나타내는 노란색 LED가 깜빡이기 시작합니다. 다음으로 flash가 진행되고 있다는 것을 나타내기 위해서 붉은 LED가 켜집니다.
1. 완료되기를 기다림
1. 완료! QGC로 칼리브레이션을 진행.

## Wireless

온보드 nRF 모듈 Bluetooth를 통해 보드에 연결하거나 2.4GHz Nordic ESB 프로토콜을 이용할 수도 있습니다.

- [Crazyradio PA](https://www.bitcraze.io/crazyradio-pa/)를 추천합니다.
- 바로 CF2를 날리기 위해서는 Bluetooth로 제어할 수 있는 Crazyflie phone app을 이용합니다.

공식 Bitcraze **Crazyflie phone app** 을 사용

- Bluetooth로 연결
- 설정에서 mode를 1이나 2로 설정
- QGC로 칼리브레이션하기

**MAVLink** 를 통한 연결

- GCS와 호환되는 Crazyradio PA를 사용
- UDP 지원하는 GCS를 radio에 연결하는 방법은 [cfbridge](https://github.com/dennisss/cfbridge) 참고하세요.

## Flying

{% youtube %}https://www.youtube.com/watch?v=oWk0RRIzF-4{% endyoutube %}

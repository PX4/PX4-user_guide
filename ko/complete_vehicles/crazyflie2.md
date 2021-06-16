# Crazyflie 2.0

:::warning PX4에서는 이 자동항법장치를 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://www.bitcraze.io/)에 문의하십시오.
:::

:::warning
이 비행 컨트롤러에 대한 PX4 지원은 [테스트중](../flight_controller/autopilot_experimental.md)입니다.
:::

Crazyflie 마이크로 쿼드 라인은 Bitcraze AB에서 제작하였습니다.. Crazyflie 2.0의 개요는 [여기](https://www.bitcraze.io/crazyflie-2/)를 참고하십시오.

![Crazyflie2 Image](../../assets/flight_controller/crazyflie/crazyflie2_hero.png)

## 요약

:::note
주요 하드웨어 문서는 여기를 참고하십시오. https://wiki.bitcraze.io/projects:crazyflie2:index
:::

* 메인 시스템온칩 : STM32F405RG 
  * CPU : 단정밀도 FPU의 168MHz ARM Cortex M4
  * RAM : 192KB SRAM
* nRF51822 무선 및 전력 관리 MCU
* MPU9250 가속 / 자이로 / 자력계
* LPS25H 기압계

## 구매처

* [Crazyflie 2.0](https://store.bitcraze.io/collections/kits/products/crazyflie-2-0).
* [Crazyradio PA 2.4GHz USB 동글](https://store.bitcraze.io/collections/kits/products/crazyradio-pa) : *QGroundControl*과 Crazyflie 2.0 간의 무선 통신에 사용됩니다.
* [브레이크 아웃 데크](https://store.bitcraze.io/collections/decks/products/breakout-deck) : 주변 장치를 연결용 브레이크아웃 확장 보드입니다.
* [흐름 데크](https://store.bitcraze.io/collections/decks/products/flow-deck) :지면의 움직임을 측정하는 광류 센서와 지면까지의 거리를 측정하는 거리 센서가 포함되어 있습니다. 정확한 고도와 위치 제어에 유용합니다.
* [Z- 레인저 데크](https://store.bitcraze.io/collections/decks/products/z-ranger-deck)는지면까지의 거리를 측정하기 위해 Flow 데크와 동일한 거리 센서입니다. 정확한 고도와 위치 제어에 유용합니다.
* [SD 카드 데크](https://store.bitcraze.io/collections/decks/products/sd-card-deck) : 마이크로 SD 카드는 고속의 온보드 로깅에 사용됩니다.
* [Logitech Joystick](https://www.logitechg.com/en-ch/product/f310-gamepad).

## PX4 플래싱

PX4 개발 환경 설정후 Crazyflie 2.0에 PX4를 설치합니다.

1. PX4 부트 로더 소스 코드를 다운로드합니다. ```git clone https://github.com/PX4/Bootloader.git```
2. 소스 코드 최상위 디렉토리로 이동하여 다음 명령어를 실행하여 컴파일합니다. ```make crazyflie_bl```
3. Crazyflie 2.0을 DFU 모드로 전환합니다.
  
  * 처음에는 전원이 꺼져 있는지 확인하십시오.
  * 재설정 버튼을 누릅니다(아래 그림 참조).![Crazyflie2 Reset Button](../../assets/flight_controller/crazyflie/crazyflie_reset_button.jpg)
  * 컴퓨터의 USB 포트에 연결합니다.
  * 1초 후 파란색 LED가 깜박이기 시작하고, 5초 후 더 빠르게 깜박이기 시작합니다.
  * 버튼을 뗍니다.

4. *dfu-util* 설치: 
  
      sudo apt-get update
       sudo apt-get install dfu-util

5. *dfu-util*을 사용하여 부트 로더를 플래시하고 완료되면 Crazyflie 2.0을 분리합니다. ```sudo dfu-util -d 0483:df11 -a 0 -s 0x08000000 -D ./build/crazyflie_bl/crazyflie_bl.bin``` Crazyflie 2.0의 전원을 키면, 노란색 LED가 깜박입니다.

6. PX4 자동조종장치 소스 코드를 다운로드합니다. ```git clone https://github.com/PX4/PX4-Autopilot.git```

7. 소스 코드의 최상위 디렉토리로 이동하여 다음 명령어를 실행하여 컴파일합니다. ```make bitcraze_crazyflie_default upload```
8. 장치를 연결하라는 메시지가 표시되면 Crazyflie 2.0을 연결합니다. 노란색 LED가 깜박이기 시작하면 부트 로더 모드입니다. 그런 다음 빨간색 LED가 켜지면, 깜박이는 프로세스가 시작되었음을 나타냅니다.
9. 완료될 때까지 기다리십시오.
10. 완료되면, [QGroundControl](https://docs.qgroundcontrol.com/en/SetupView/Sensors.html)을 사용하여 센서를 보정합니다.

:::note QGroundControl이 기체와 연결되지 않으면 crazyflie의 [nuttx-config](https://github.com/PX4/PX4-Autopilot/blob/master/boards/bitcraze/crazyflie/nuttx-config/nsh/defconfig)에서 `# CONFIG_DEV_LOWCONSOLE이 설정되지 않음`이 `CONFIG_DEV_LOWCONSOLE = y`로 대체되었는 지 확인하십시오. 이 작업은 *menuconfig*를 사용하여 수행하여야 합니다.

    make bitcraze_crazyflie_default menuconfig
    

또는 *qconfig* (GUI의 *직렬 드라이버 지원*에서 *저수준 콘솔 지원* 확인) :

    make bitcraze_crazyflie_default qconfig
    

:::

## 무선 설정 지침

The onboard nRF module allows connecting to the board via Bluetooth or through the proprietary 2.4GHz Nordic ESB protocol.

* A [Crazyradio PA](https://www.bitcraze.io/crazyradio-pa/) is recommended.
* To fly the Crazyflie 2.0 right away, the Crazyflie phone app is supported via Bluetooth.

Using the official Bitcraze **Crazyflie phone app**:

* Connect via Bluetooth.
* Change mode in settings to 1 or 2.
* Calibrate via QGroundControl.

Connecting via **MAVLink**:

* Use a Crazyradio PA alongside a compatible GCS.
* Download the *crazyflie-lib-python* source code: ```git clone https://github.com/bitcraze/crazyflie-lib-python.git```

:::note
We will use [cfbridge.py](https://github.com/bitcraze/crazyflie-lib-python/blob/master/examples/cfbridge.py) to setup a wireless MAVlink communication link between Crazyflie 2.0 (flashed with PX4) and QGroundControl. *Cfbridge* enables QGroundControl to communicate with the crazyradio PA. The [C based cfbridge](https://github.com/dennisss/cfbridge) is currently experiencing data loss issues, which is why we have chosen to use **cfbridge.py**.
:::

* Make sure you have set the udev permissions to use the USB Radio. To do this, follow the steps listed [here](https://github.com/bitcraze/crazyflie-lib-python#setting-udev-permissions) and **restart** your computer.
* Connect a Crazyradio PA via USB.
* Build a [virtual environment (local python environment)](https://virtualenv.pypa.io/en/latest/) with package dependencies using the following method: ```pip install tox --user```
* Navigate to the crazyflie-lib-python folder and type: ```make venv```
* Activate the virtual environment: ```source venv-cflib/bin/activate```
* Install required dependencies: ```pip install -r requirements.txt --user```

To connect Crazyflie 2.0 with crazyradio, **launch cfbridge** by following these steps:

* Power off and power on Crazyflie 2.0 and wait for it to boot up.
* Connect a Crazyflie radio device via USB.
* Navigate to the crazyflie-lib-python folder.
* Activate the environment: ```source venv-cflib/bin/activate```
* Navigate to the examples folder: ```cd examples```
* Launch cfbridge: ```python cfbridge.py```
  
:::note
*Cfbridge* by default tries to initiate the radio link communication on channel 80 and with crazyflie address 0xE7E7E7E7E7. If you are using [multiple crazyflies and/or crazyradios](https://github.com/dennisss/cfbridge/blob/master/README.md#advanced-swarming) in the same room and want to use a different channel and/or address for each, first connect the crazyflie with QGroundControl via a USB cable and change the syslink parameters (channel, address) in QGroundControl. Next, launch the cfbridge by giving the same channel and address as the first and second arguments respectively, e.g: `python cfbridge.py 90 0x0202020202`
:::

* Open QGroundControl.

* After using *cfbridge*, you can deactivate the virtualenv if you activated it by pressing `CTRL+z`. Most of the time, launching *cfbridge* again from the same terminal doesn't connect to crazyflie, this can be solved by closing the terminal and relaunching *cfbridge* in a new terminal. 

:::tip
If you change any driver in [crazyflie-lib-python](https://github.com/bitcraze/crazyflie-lib-python) or if launching *cfbridge* in a new terminal does not find crazyflie, you can try navigating to the crazyflie-lib-python folder and run the script below to rebuild cflib.

    make venv
    

:::

:::note
To use Joystick, set `COM_RC_IN_MODE` in QGroundControl to "Joystick/No RC Checks". Calibrate the Joystick and set the Joystick message frequency in QGroundControl to any value between 5 to 14 Hz (10 Hz is recommended). To be able to set the frequency, the advanced option should be enabled. This is the rate at which Joystick commands are sent from QGroundControl to Crazyflie 2.0 (to do this, you will need to follow the instructions [here](https://github.com/mavlink/qgroundcontrol) to obtain the latest QGroundControl source code (master) and build it).
:::

![](../../assets/hardware/joystick-message-frequency.png)

## Hardware Setup

Crazyflie 2.0 is able to fly with precise control in [Stabilized mode](../flight_modes/manual_stabilized_mc.md), [Altitude mode](../flight_modes/altitude_mc.md) and [Position mode](../flight_modes/position_mc.md).

* You will need the [Z-ranger deck](https://store.bitcraze.io/collections/decks/products/z-ranger-deck) to fly in *Altitude* mode. If you also want to fly in the *Position* mode, it is recommended you buy the [Flow deck](https://store.bitcraze.io/collections/decks/products/flow-deck) which also has the integrated Z-ranger sensor.
* The onboard barometer is highly susceptible to any external wind disturbances including those created by Crazyflie's own propellers. Hence, we isolated the barometer with a piece of foam, and then mounted the distance sensor on top of it as shown below:

![Crazyflie barometer](../../assets/flight_controller/crazyflie/crazyflie_barometer.jpg)

![Crazyflie barometer foam](../../assets/flight_controller/crazyflie/crazyflie_baro_foam.jpg)

![Crazyflie optical flow](../../assets/flight_controller/crazyflie/crazyflie_opticalflow.jpg)

In order to log flight details, you can mount SD card deck on top of crazyflie as shown below:

![Crazyflie SDCard](../../assets/flight_controller/crazyflie/crazyflie_sdcard.jpg)

Then, you need to stick the battery on top of the SD card deck using a double sided tape:

![Crazyflie battery setup](../../assets/flight_controller/crazyflie/crazyflie_battery_setup.jpg)

## Altitude Control

Crazyflie is able to fly in *Altitude* mode if you use a [Z-ranger deck](https://store.bitcraze.io/collections/decks/products/z-ranger-deck). According to the datasheet, the maximum height (above ground) the range finder can sense is 2 m. However, when tested on dark surfaces this value decreases to 0.5 m. On a light floor, it goes up to max 1.3 m. This means you cannot hold altitudes above this value in *Altitude* or *Position* flight modes.

:::tip
If the Crazyflie 2.0 height drifts at mid-throttle command in *Altitude mode* or *Position mode*, first try rebooting the vehicle. If this does not fix the problem, recalibrate the accel and mag (compass).  
:::

:::note
Since the onboard barometer is highly susceptible to wind disturbances created by the Crazyflie's own propellers, you cannot rely on it to hold altitude.
:::

## Position Control

With [Flow deck](https://store.bitcraze.io/collections/decks/products/flow-deck), you can fly Crazyflie 2.0 in *Position mode*. Unlike PX4flow, the flow deck does not house a gyro, hence the onboard gyro is used for flow fusion to find the local position estimates. Moreover, the flow deck shares the same SPI bus as the SD card deck, therefore logging at high rate on SD card is not recommended when flying in *Position mode*.

:::note
A ulog for flight in *Position* mode is available [here](https://logs.px4.io/plot_app?log=a0e68bf1-e905-410f-b828-f6146dba9d45). This can be used as a reference to compare your flight performance.
:::

## Using FrSky Taranis RC Transmitter as Joystick

If you already own a Taranis RC transmitter and want to use it as a controller, it can be configured as a USB Joystick:

* Create a new model in Taranis.
  
  ![Taranis - new model](../../assets/flight_controller/crazyflie/taranis_model.jpg)

* In *MODEL SETUP* menu page, turn off both internal and external TX modules.
  
  ![Taranis - model setup](../../assets/flight_controller/crazyflie/taranis_model_setup.jpg)

* In *OUTPUTS* menu page (also called “SERVOS” page in some Taranis transmitters), invert Throttle (CH1) and Aileron (CH3).
  
  ![Taranis - outputs](../../assets/flight_controller/crazyflie/taranis_outputs.jpg)

To use Taranis switches to arm/disarm and switch to different flight modes:

* In Taranis UI *MIXER* menu page, you can assign the switches to any channel in the range channel 9-16 which map to the buttons 0-7 in the QGroundControl Joystick setup. For example, Taranis “SD” switch can be set to channel 9 in Taranis UI:
  
  ![Taranis switch setup](../../assets/flight_controller/crazyflie/taranis_switch_setup.jpg)

* Connect Taranis to PC with a USB cable and Open QGroundControl.

* In QGroundControl Joystick Setup, you can see the buttons turning yellow when you switch them on. For example, channel 9 in Taranis maps to button 0 in QGroundControl Joystick setup. You can assign any mode to this button e.g. *Altitude* mode. Now when you lower the switch "SD", flight mode will change to *Altitude*.
  
  ![Joystick setup](../../assets/flight_controller/crazyflie/crazyflie_QGCjoystick_setup.png)

### ROS

To connect to Crazyflie 2.0 via MAVROS:

* Start up *cfbridge* using the above instructions.
* Change the UDP port QGroundControl listens to: 
  * In QGroundControl, navigate to **Application Settings > General** and uncheck all the boxes under *Autoconnect to the following devices*.
  * Add in **Comm Links** a link of type *UDP*, check the *Automatically Connect on Start* option, change the *Listening Port* to 14557, add Target Hosts: 127.0.0.1 and then press **OK**.
* Make sure you have [MAVROS](https://github.com/mavlink/mavros/tree/master/mavros#installation) installed.
* Start MAVROS with command: ```roslaunch mavros px4.launch fcu_url:="udp://:14550@127.0.0.1:14551" gcs_url:="udp://@127.0.0.1:14557"```
* Restart QGroundControl if it doesn't connect.

## Flying

@[youtube](https://youtu.be/2Bcy3k1h5uc)
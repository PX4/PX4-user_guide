# Crazyflie 2.0 (Discontinued)

:::warning
_Crazyflie 2.0_ has been [discontinued/superseded](../flight_controller/autopilot_experimental.md). Try [Bitcraze Crazyflie 2.1](../complete_vehicles/crazyflie21.md) instead!
:::

:::warning

- PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://www.bitcraze.io/) for hardware support or compliance issues.
- PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).
:::

The Crazyflie line of micro quads was created by Bitcraze AB. An overview of the Crazyflie 2.0 can be [found here](https://www.bitcraze.io/crazyflie-2/).

![Crazyflie2 이미지](../../assets/flight_controller/crazyflie/crazyflie2_hero.png)

## 요약

:::note
주요 하드웨어 문서는 여기를 참고하십시오.
https://wiki.bitcraze.io/projects:crazyflie2:index
:::

- Main System-on-Chip: STM32F405RG
  - CPU: 168 MHz ARM Cortex M4 with single-precision FPU
  - RAM: 192 KB SRAM
- nRF51822 radio and power management MCU
- MPU9250 Accel / Gyro / Mag
- LPS25H barometer

## 구매처

- [Crazyflie 2.0](https://store.bitcraze.io/collections/kits/products/crazyflie-2-0).
- [Crazyradio PA 2.4 GHz USB dongle](https://store.bitcraze.io/collections/kits/products/crazyradio-pa): used for wireless communication between _QGroundControl_ and Crazyflie 2.0.
- [Breakout deck](https://store.bitcraze.io/collections/decks/products/breakout-deck): breakout expansion board for connecting new peripherals.
- [Flow deck](https://store.bitcraze.io/collections/decks/products/flow-deck): contains an optical flow sensor to measure movements of the ground and a distance sensor to measure the distance to the ground. This will be useful for precise altitude and position control.
- [Z-ranger deck](https://store.bitcraze.io/collections/decks/products/z-ranger-deck) has the same distance sensor as the Flow deck to measure the distance to the ground. This will be useful for precise altitude control.
- [SD-card deck](https://store.bitcraze.io/collections/decks/products/sd-card-deck): used for high speed onboard logging to a micro SD card.
- [Logitech Joystick](https://support.logi.com/hc/en-us/articles/360024326793--Getting-Started-Gamepad-F310).

## PX4 플래싱

PX4 개발 환경 설정후 Crazyflie 2.0에 PX4를 설치합니다.

1. PX4 부트 로더 소스 코드를 다운로드합니다.

   ```sh
   git clone https://github.com/PX4/Bootloader.git
   ```

1. 소스 코드 최상위 디렉토리로 이동하여 다음 명령어를 실행하여 컴파일합니다.

   ```sh
   make crazyflie_bl
   ```

1. Crazyflie 2.0을 DFU 모드로 전환합니다.
   - 처음에는 전원이 꺼져 있는지 확인하십시오.
   - Hold down the reset button (see figure below...). ![Crazyflie2 재설정 버튼](../../assets/flight_controller/crazyflie/crazyflie_reset_button.jpg)
   - 컴퓨터의 USB 포트에 연결합니다.
   - 1초 후 파란색 LED가 깜박이기 시작하고, 5초 후 더 빠르게 깜박이기 시작합니다.
   - Release button.
1. Install _dfu-util_:

   ```sh
   sudo apt-get update
   sudo apt-get install dfu-util
   ```

1. Flash bootloader using _dfu-util_ and unplug Crazyflie 2.0 when done:

   ```sh
   sudo dfu-util -d 0483:df11 -a 0 -s 0x08000000 -D ./build/crazyflie_bl/crazyflie_bl.bin
   ```

   When powering on the Crazyflie 2.0 the yellow LED should blink.

1. Download the source code of the PX4 autopilot:

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git
   ```

1. PX4 자동조종장치 소스 코드를 다운로드합니다.

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git
   ```

1. When prompted to plug in device, plug in Crazyflie 2.0. The yellow LED should start blinking indicating bootloader mode. Then the red LED should turn on indicating that the flashing process has started.
1. Wait for completion.
1. Done! Calibrate the sensors using [QGroundControl](https://docs.qgroundcontrol.com/master/en/SetupView/Sensors.html).

:::note QGroundControl이 기체와 연결되지 않으면 crazyflie의 [nuttx-config](https://github.com/PX4/PX4-Autopilot/blob/master/boards/bitcraze/crazyflie/nuttx-config/nsh/defconfig)에서 `# CONFIG_DEV_LOWCONSOLE이 설정되지 않음`이 `CONFIG_DEV_LOWCONSOLE = y`로 대체되었는 지 확인하십시오. 이 작업은 *menuconfig*를 사용하여 수행하여야 합니다.

```sh
make bitcraze_crazyflie_default menuconfig
```

또는 *qconfig* (GUI의 *직렬 드라이버 지원*에서 *저수준 콘솔 지원* 확인) :

```sh
make bitcraze_crazyflie_default qconfig
```

:::

## 무선 설정 지침

온보드 nRF 모듈을 사용하여 Bluetooth나 2.4GHz Nordic ESB 프로토콜로 보드에 연결할 수 있습니다.

- A [Crazyradio PA](https://www.bitcraze.io/crazyradio-pa/) is recommended.
- To fly the Crazyflie 2.0 right away, the Crazyflie phone app is supported via Bluetooth.

공식 Bitcraze** Crazyflie 앱** 사용 :

- Connect via Bluetooth.
- Change mode in settings to 1 or 2.
- Calibrate via QGroundControl.

**MAVLink** 연결 :

- Use a Crazyradio PA alongside a compatible GCS.
- Navigate to the crazyflie-lib-python folder and type: `make venv`

  ```sh
  git clone https://github.com/bitcraze/crazyflie-lib-python.git
  ```

:::note
[cfbridge.py](https://github.com/bitcraze/crazyflie-lib-python/blob/master/examples/cfbridge.py)를 사용하여 Crazyflie 2.0(PX4로 깜박임)과 QGroundControl간의 무선 MAVlink 통신 링크를 설정합니다. :::note [cfbridge.py](https://github.com/bitcraze/crazyflie-lib-python/blob/master/examples/cfbridge.py)를 사용하여 Crazyflie 2.0(PX4로 깜박임)과 QGroundControl간의 무선 MAVlink 통신 링크를 설정합니다. *Cfbridge*를 사용하여 QGroundControl에서 crazyradio PA와 통신할 수 있습니다.
:::

- Make sure you have set the udev permissions to use the USB Radio. To do this, follow the steps listed [here](https://www.bitcraze.io/documentation/repository/crazyflie-lib-python/master/installation/usb_permissions/) and **restart** your computer.
- Connect a Crazyradio PA via USB.
- Build a [virtual environment (local python environment)](https://virtualenv.pypa.io/en/latest/) with package dependencies using the following method:

  ```sh
  pip install tox --user
  ```

- Navigate to the crazyflie-lib-python folder and type:

  ```sh
  make venv
  ```

- Activate the virtual environment:

  ```sh
  source venv-cflib/bin/activate
  ```

- Install required dependencies:

  ```sh
  pip install -r requirements.txt --user
  ```

Crazyflie 2.0을 crazyradio와 연결하기 위하여 아래의 단계에 따라 **cfbridge를 시작**합니다.

- Power off and power on Crazyflie 2.0 and wait for it to boot up.
- Connect a Crazyflie radio device via USB.
- Navigate to the crazyflie-lib-python folder.
- Activate the environment:

  ```sh
  source venv-cflib/bin/activate
  ```

- Navigate to the examples folder:

  ```sh
  cd examples
  ```

- Launch cfbridge:

```sh
make venv
```

:::note
_Cfbridge_ by default tries to initiate the radio link communication on channel 80 and with crazyflie address 0xE7E7E7E7E7. If you are using [multiple crazyflies and/or crazyradios](https://github.com/dennisss/cfbridge/blob/master/README.md#advanced-swarming) in the same room and want to use a different channel and/or address for each, first connect the crazyflie with QGroundControl via a USB cable and change the syslink parameters (channel, address) in QGroundControl. Next, launch the cfbridge by giving the same channel and address as the first and second arguments respectively, e.g: `python cfbridge.py 90 0x0202020202`
:::

- Open QGroundControl.
- After using _cfbridge_, you can deactivate the virtualenv if you activated it by pressing `CTRL+z`. Most of the time, launching _cfbridge_ again from the same terminal doesn't connect to crazyflie, this can be solved by closing the terminal and relaunching _cfbridge_ in a new terminal.

:::tip
If you change any driver in [crazyflie-lib-python](https://github.com/bitcraze/crazyflie-lib-python) or if launching _cfbridge_ in a new terminal does not find crazyflie, you can try navigating to the crazyflie-lib-python folder and run the script below to rebuild cflib.

```sh
make venv
```

:::

:::note
To use Joystick, set `COM_RC_IN_MODE` in QGroundControl to "Joystick/No RC Checks". Calibrate the Joystick and set the Joystick message frequency in QGroundControl to any value between 5 to 14 Hz (10 Hz is recommended). To be able to set the frequency, the advanced option should be enabled. This is the rate at which Joystick commands are sent from QGroundControl to Crazyflie 2.0 (to do this, you will need to follow the instructions [here](https://github.com/mavlink/qgroundcontrol) to obtain the latest QGroundControl source code (master) and build it).
:::

![](../../assets/hardware/joystick-message-frequency.png)

## 하드웨어 설정

Crazyflie 2.0 is able to fly with precise control in [Stabilized mode](../flight_modes_mc/manual_stabilized.md), [Altitude mode](../flight_modes_mc/altitude.md) and [Position mode](../flight_modes_mc/position.md).

- You will need the [Z-ranger deck](https://store.bitcraze.io/collections/decks/products/z-ranger-deck) to fly in _Altitude_ mode. If you also want to fly in the _Position_ mode, it is recommended you buy the [Flow deck](https://store.bitcraze.io/collections/decks/products/flow-deck) which also has the integrated Z-ranger sensor.
- The onboard barometer is highly susceptible to any external wind disturbances including those created by Crazyflie's own propellers. Hence, we isolated the barometer with a piece of foam, and then mounted the distance sensor on top of it as shown below:

![Crazyflie 기압계 폼](../../assets/flight_controller/crazyflie/crazyflie_barometer.jpg)

![Crazyflie 광류](../../assets/flight_controller/crazyflie/crazyflie_baro_foam.jpg)

![Crazyflie optical flow](../../assets/flight_controller/crazyflie/crazyflie_opticalflow.jpg)

In order to log flight details, you can mount SD card deck on top of crazyflie as shown below:

![Crazyflie SDCard](../../assets/flight_controller/crazyflie/crazyflie_sdcard.jpg)

Then, you need to stick the battery on top of the SD card deck using a double sided tape:

![Crazyflie battery setup](../../assets/flight_controller/crazyflie/crazyflie_battery_setup.jpg)

## 고도 제어

:::tip
Crazyflie 2.0 높이가 *고도 모드* 또는 *위치 모드*의 중간 스로틀 명령에서 드리프트되면 먼저 기체를 재부팅 하십시오. 그래도 문제가 해결되지 않으면, 가속계와 자기(나침반) 센서를 다시 보정하십시오.   
::: However, when tested on dark surfaces this value decreases to 0.5 m. On a light floor, it goes up to max 1.3 m. This means you cannot hold altitudes above this value in _Altitude_ or _Position_ flight modes.

:::note
온보드 기압계는 Crazyflie의 자체 프로펠러 바람에 민감하기 때문에 고도 유지용으로 사용하는 것은 적절하지 않습니다. If this does not fix the problem, recalibrate the accel and mag (compass).  
:::

[플로우 데크](https://store.bitcraze.io/collections/decks/products/flow-deck)을 사용하면 *위치 모드*에서 Crazyflie 2.0을 비행할 수 있습니다.
:::

## 위치 제어

With [Flow deck](https://store.bitcraze.io/collections/decks/products/flow-deck), you can fly Crazyflie 2.0 in _Position mode_. Unlike [PX4FLOW](../sensor/px4flow.md), the flow deck does not house a gyro, hence the onboard gyro is used for flow fusion to find the local position estimates. Moreover, the flow deck shares the same SPI bus as the SD card deck, therefore logging at high rate on SD card is not recommended when flying in _Position mode_.

## FrSky Taranis RC 송신기를 조이스틱으로 사용

Taranis 스위치를 사용하여 시동/시동 해제 및 다른 비행 모드로 전환하려면 :

- Create a new model in Taranis.

  ![Taranis - new model](../../assets/flight_controller/crazyflie/taranis_model.jpg)

- In _MODEL SETUP_ menu page, turn off both internal and external TX modules.

  ![Taranis - model setup](../../assets/flight_controller/crazyflie/taranis_model_setup.jpg)

- In _OUTPUTS_ menu page (also called “SERVOS” page in some Taranis transmitters), invert Throttle (CH1) and Aileron (CH3).

  ![Taranis - outputs](../../assets/flight_controller/crazyflie/taranis_outputs.jpg)

MAVROS를 통해 Crazyflie 2.0에 연결하려면 :

- In Taranis UI _MIXER_ menu page, you can assign the switches to any channel in the range channel 9-16 which map to the buttons 0-7 in the QGroundControl Joystick setup. For example, Taranis “SD” switch can be set to channel 9 in Taranis UI:

  ![Taranis switch setup](../../assets/flight_controller/crazyflie/taranis_switch_setup.jpg)

- Connect Taranis to PC with a USB cable and Open QGroundControl.
- In QGroundControl Joystick Setup, you can see the buttons turning yellow when you switch them on. For example, channel 9 in Taranis maps to button 0 in QGroundControl Joystick setup. You can assign any mode to this button e.g. _Altitude_ mode. Now when you lower the switch "SD", flight mode will change to _Altitude_.

  ![Joystick setup](../../assets/flight_controller/crazyflie/crazyflie_QGCjoystick_setup.png)

### ROS

[유투브](https://youtu.be/2Bcy3k1h5uc)

- Start up _cfbridge_ using the above instructions.
- Change the UDP port QGroundControl listens to:
  - In QGroundControl, navigate to **Application Settings > General** and uncheck all the boxes under _Autoconnect to the following devices_.
  - Add in **Comm Links** a link of type _UDP_, check the _Automatically Connect on Start_ option, change the _Listening Port_ to 14557, add Target Hosts: 127.0.0.1 and then press **OK**.
- Make sure you have [MAVROS](https://github.com/mavlink/mavros/tree/master/mavros#installation) installed.
- Start MAVROS with command:

  ```sh
  roslaunch mavros px4.launch fcu_url:="udp://:14550@127.0.0.1:14551" gcs_url:="udp://@127.0.0.1:14557"
  ```

- Restart QGroundControl if it doesn't connect.

## 비행

@[youtube](https://youtu.be/2Bcy3k1h5uc)

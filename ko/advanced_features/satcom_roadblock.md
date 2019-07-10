# Iridium/RockBlock Satellite Communication System

위성 통신 시스템은 지상국과 기체 사이에 긴 범위의 높은 대기 시간 링크를 제공하는 데 사용할 수 있습니다.

이 항목에서는 이리듐 SBD 위성 통신 시스템의 서비스 공급자로 RockBlock을 사용하는 시스템을 설정하는 방법을 설명합니다. 신호 품질이 우수할 경우 사용자는 10~15초 사이의 지연 시간을 예상할 수 있습니다.

## Overview

위성 통신 링크에는 다음 구성 요소가 필요합니다.

* PX4 오토파일럿으로 Pixhawk에 연결된 [록블록 9603 ](http://www.rock7mobile.com/products-rockblock-9603) 모듈이 깜박였습니다. 
* 아이메시지 서버의 런닝맨 리눅스 서버.
* Ubuntu Linux에서 *QGroundControl *을 실행하는 지상국 컴퓨터

전체 시스템 아키텍처는 다음과 같습니다.

![건축학](../../assets/satcom/architecture.jpg)

> ** 노트 ** 설정은 Ubuntu 14.04 및 16.04에서 실행되는 *QGoundControl *의 현재 릴리스로 테스트되었습니다.

    - It may be possible to run the system on other ground stations and operating systems, but this has not been tested (and is not guaranteed to work).
    - The [RockBlock MK2](http://www.rock7mobile.com/products-rockblock) module can also be used. 
      The RockBlock 9603 module is recommended because it is smaller and lighter, while providing the same functionality.
    

## 비용. 

비용영국 링크 운영 비용은 라인 임대 및 메시지당 비용으로 구성됩니다.

* Each module needs to be activated which costs £10.00 per month
* Each message transmitted over the system costs one *credit* per 50 bytes. Bundles of credits can be bought from RockBlock for £0.04-£0.11 per credit, depending on the bundle size.

일반적으로 모듈에 대한 자세한 설명은 [록블록 설명서 ](https://docs.rockblock.rock7.com/docs) 및 *록블록 *을 참조하십시오.

## 기체 설정

### Wiring

RockBlock 모듈을 Pixhawk의 직렬 포트에 연결합니다. 모듈의 전원 요구 사항으로 인해 5V에서 최대 0.5A가 필요하므로 고출력 직렬 포트를 통해서만 전원을 공급할 수 있습니다. 사용 가능한 전원/무료인 경우 Pixhawk와 동일한 접지 레벨을 가지며 필요한 전력을 제공할 수 있는 다른 전원을 설정해야 합니다. [ 커넥터 ](https://docs.rockblock.rock7.com/docs/connectors) 및 [ 전원 요구 사항 ](https://docs.rockblock.rock7.com/docs/power-supply)의 세부 정보는 RockBlock 설명서에서 확인할 수 있습니다.

### 모듈

모듈은 내부 안테나 또는 SMA 커넥터에 연결된 외부 안테나를 사용할 수 있습니다. 두 안테나 모드(/0) 사이를 으로 전환하려면 작은 RF 링크 케이블의 위치를 변경해야 합니다. 외부 안테나를 사용하는 경우 모듈 손상을 방지하기 위해 안테나의 전원을 켜기 전에 항상 안테나가 모듈에 연결되어 있는지 확인하십시오.</p> 

모듈의 기본 보드 속도는 19200입니다. 그러나 PX4 *iridiumsbd * 드라이버는 보레이트가 115200이어야 하므로 [을 사용하여 변경해야 합니다.AT 명령](http://www.rock7mobile.com/downloads/IRDM_ISU_ATCommandReferenceMAN0009_Rev2.0_ATCOMM_Oct2012.pdf).

1. 19200/8-N-1 설정을 사용하여 모듈에 연결하고 다음 명령을 사용하여 통신이 작동하는지 점검하십시오. 응답은 다음과 같아야 합니다.
2. 보드 속도를 변경합니다. 
      AT+IPR=9
      

3. 이제 115200/8-N-1 설정을 사용하여 모델에 다시 연결하고 다음을 사용하여 구성을 저장합니다. 
      AT&W0
      

이제 이 모듈을 PX4와 함께 사용할 수 있습니다.

### Software

[Configure the serial port](../peripherals/serial_configuration.md) on which the RockBlock module will run using [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG). There is no need to set the baud rate for the port, as this is configured by the driver.

> **Note** If the configuration parameter is not available in *QGroundControl* then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware): ```drivers/telemetry/iridiumsbd```

## RockBlock 설정

When buying the first module on RockBlock an user account needs to be created in a first step.

Log in to the [account](https://rockblock.rock7.com/Operations) and register the RockBlock module under the `My RockBLOCKs`. Activate the line rental for the module and make sure that enough credits for the expected flight duration are available on the account. When using the default settings one message per minute is sent from the vehicle to the ground station.

Set up a delivery group for the message relay server and add the module to that delivery group:

![Delivery Groups](../../assets/satcom/deliverygroup.png)

## 릴레이 서버 설정

The relay server should be run on either Ubuntu 16.04 or 14.04 OS.

1. The server working as a message relay should have a static IP address and two publicly accessible, open, TCP ports:
  
  * `5672` for the *RabbitMQ* message broker (can be changed in the *rabbitmq* settings)
  * `45679` for the HTTP POST interface (can be changed in the **relay.cfg** file)

2. Install the required python modules: 
  
      bash
       sudo pip install pika tornado future

3. Install the `rabbitmq` message broker: ```sudo apt install rabbitmq-server```
4. Configure the broker's credentials (change PWD to your preferred password): 
      bash
       sudo rabbitmqctl add_user iridiumsbd PWD
       sudo rabbitmqctl set_permissions iridiumsbd ".*" ".*" ".*"

5. Clone the [SatComInfrastructure](https://github.com/acfloria/SatComInfrastructure.git) repository: ```git clone https://github.com/acfloria/SatComInfrastructure.git```
6. Go to the location of the *SatComInfrastructure* repo and configure the broker's queues: ```./setup_rabbit.py localhost iridiumsbd PWD```
7. Verify the setup: ```sudo rabbitmqctl list_queues```
  
  This should give you a list of 4 queues: `MO`, `MO_LOG`, `MT`, `MT_LOG`

8. Edit the `relay.cfg` configuration file to reflect your settings.

9. Start the relay script in the detached mode: ```screen -dm bash -c 'cd SatcomInfrastructure/; ./relay.py```

Other instructions include:

* Detach from the screen: ```ctrl+a d```
* Kill execution of the script: ```ctrl+a :quit```
* Reattach to the screen:: ```screen -dr```

## 지상국 컴퓨터

To setup the ground station:

1. 필요한 Python 모듈을 장착하십시오. ```sudo pip install pika tornado future```
2. Clone the SatComInfrastructure repository: ```git clone https://github.com/acfloria/SatComInfrastructure.git```
3. Edit the **udp2rabbit.cfg** configuration file to reflect your settings.
4. [Install *QGroundControl*](https://docs.qgroundcontrol.com/en/getting_started/download_and_install.html) (daily build).
5. Add a UDP connection in QGC with the parameters:
  
  * Listening port: 10000
  * Target hosts: 127.0.0.1:10001
  * High Latency: checked
    
    ![High Latency Link Settings](../../assets/satcom/linksettings.png)

### Verification

1. Open a terminal on the ground station computer and change to the location of the *SatComInfrastructure* repository. Then start the **udp2rabbit.py** script: ```./udp2rabbit.py```

2. Send a test message from [RockBlock Account](https://rockblock.rock7.com/Operations) to the created delivery group in the `Test Delivery Groups` tab.

If in the terminal where the `udp2rabbit.py` script is running within a couple of seconds the acknowledge for a message can be observed, then the RockBlock delivery group, the relay server and the udp2rabbit script are set up correctly:

![udp2rabbit message acknowledge](../../assets/satcom/verification.png)

## 시스템 실행

1. Start *QGroundControl*. Manually connect the high latency link first, then the regular telemetry link:
  
  ![Connect the High Latency link](../../assets/satcom/linkconnect.png)

2. Open a terminal on the ground station computer and change to the location of the *SatComInfrastructure* repository. Then start the **udp2rabbit.py** script: ```./udp2rabbit.py```

3. Power up the vehicle.
4. Wait until the first `HIGH_LATENCY2` message is received on QGC. This can be checked either using the *MAVLink Inspector* widget or on the toolbar with the *LinkIndicator*. If more than one link is connected to the active vehicle the *LinkIndicator* shows all of them by clicking on the name of the shown link:
  
  ![Link Toolbar](../../assets/satcom/linkindicator.jpg)
  
  The link indicator always shows the name of the priority link.

5. The satellite communication system is now ready to use. The priority link, which is the link over which commands are send, is determined the following ways:
  
  * If no link is commanded by the user a regular radio telemetry link is preferred over the high latency link.
  * The autopilot and QGC will fall back from the regular radio telemetry to the high latency link if the vehicle is armed and the radio telemetry link is lost (no MAVLink messages received for a certain time). As soon as the radio telemetry link is regained QGC and the autopilot will switch back to it.
  * The user can select a priority link over the `LinkIndicator` on the toolbar. This link is kept as the priority link as long as this link is active or the user selects another priority link:
    
    ![Prioritylink Selection](../../assets/satcom/linkselection.png)

## Troubleshooting

* Satellite communication messages from the airplane are received but no commands can be transmitted (the vehicle does not react) 
  * Check the settings of the relay server and make sure that they are correct, especially the IMEI.

* No satellite communication messages from the airplane arrive on the ground station:
  
  * Check using the system console if the *iridiumsbd* driver started and if it did that a signal from any satellite is received by the module: ```iridiumsbd status```
  * Make sure using the verification steps from above that the relay server, the delivery group and the `udp2rabbit.py` script are set up correctly.
  * Check if the link is connected and that its settings are correct.

* The IridiumSBD driver does not start:
  
  * Reboot the vehicle. If that helps increase the sleep time in the `extras.txt` before the driver is started. If that does not help make sure that the Pixhawk and the module have the same ground level. Confirm also that the baudrate of the module is set to 115200.

* A first message is received on the ground but as soon as the vehicle is flying no message can be transmitted or the latency is significantly larger (in the order of minutes)
  
  * Check the signal quality after the flight. If it is decreasing during the flight and you are using the internal antenna consider using an external antenna. If you are already using the external antenna try moving the antenna as far away as possible from any electronics or anything which might disturb the signal. Also make sure that the antenna is is not damaged.
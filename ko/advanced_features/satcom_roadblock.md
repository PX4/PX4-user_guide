# 이리듐/락블록 위성통신 시스템

위성통신 시스템은 지상국과 기체간의 광역 통신을 제공합니다.

이리듐 SBD 위성 통신 시스템의 서비스 공급자 RockBlock을 사용하여 시스템을 설정하는 방법을 설명합니다. 신호 품질이 우수한 경우에도 사용자는 10~15초 정도의 시간 지연이 있을 수 있습니다.

## 개요

위성 통신 링크에는 다음 구성 요소가 필요합니다.

* PX4의 Pixhawk에 연결된 [RockBlock 9603](http://www.rock7mobile.com/products-rockblock-9603) 모듈이 깜빡입니다. 
* Ubuntu Linux를 실행하는 메시지 릴레이 서버.
* *QGroundControl*을 실행하는 지상국 컴퓨터

전체 시스템 아키텍처는 다음과 같습니다.

![건축학](../../assets/satcom/architecture.jpg)

:::note
설정은 Ubuntu 14.04 및 16.04에서 실행되는 *QGoundControl*의 현재 릴리스로 테스트되었습니다.

* 다른 지상국 및 운영체제를 사용할 수 있지만, 아직 테스트되지 않았습니다.
* 또한 [ RockBlock MK2](http://www.rock7mobile.com/products-rockblock) 모듈을 사용할 수 있습니다 RockBlock 9603 모듈은 크기가 작고 가볍우면서도 동일한 기능을 제공하기 때문에 권장됩니다.
:::

## 비용

영국 링크 실행 비용은 회선 대여 및 메시지 당 비용으로 구성됩니다.

* 각 모듈을 활성화해야 하며, 가격은 월 10파운드입니다
* 시스템을 통해 전송되는 각 메시지는 50바이트당 하나의 *크레딧*입니다. 번들 크기에 따라 RockBlock에서 신용당 0.04파운드 0.11파운드에 신용대출을 구입할 수 있습니다.

일반적으로 모듈에 대한 자세한 설명은 [RockBlock 설명서](https://docs.rockblock.rock7.com/docs) 및 *RockBlock*을 참고하십시오.

## 기체 설정

### 배선

RockBlock 모듈을 Pixhawk의 직렬 포트에 연결합니다. 모듈의 전원 요구 사항으로 인하여 5V에서 최대 0.5A가 필요하므로 고출력 직렬 포트를 통해서만 전원을 공급할 수 있습니다. 사용 가능한 별도의 전원을 사용시에는 Pixhawk와 동일한 접지이어야 합니다. [커넥터](https://docs.rockblock.rock7.com/docs/connectors)와 [전원 요구 사항](https://docs.rockblock.rock7.com/docs/power-supply)의 세부 정보는 RockBlock 설명서에서 확인할 수 있습니다.

### 모듈

모듈은 내부 안테나 또는 SMA 커넥터에 연결된 외부 안테나를 사용할 수 있습니다. [두 안테나의 여러 상태를 전환](https://docs.rockblock.rock7.com/docs/switching-rockblock-9603-antenna-mode)하려면 작은 RF 연결 케이블의 위치를 변경하여야 합니다. 외부 안테나를 사용하는 경우 모듈 손상을 방지하기 위해 안테나의 전원을 켜기 전에 항상 안테나가 모듈에 연결되어 있는 지 확인하십시오.

모듈의 기본 보드 속도는 19200입니다. 그러나 PX4 *iridiumsbd* 드라이버는 baudrate가 115200이어야 하므로 [AT 명령어](http://www.rock7mobile.com/downloads/IRDM_ISU_ATCommandReferenceMAN0009_Rev2.0_ATCOMM_Oct2012.pdf)를 사용하여 변경하여야 합니다.

1. 19200/8-N-1 설정을 사용하여 모듈에 연결하고 다음 명령을 사용하여 통신이 작동하는지 점검하십시오. 응답은 다음과 같아야 합니다.
2. baudrate 속도를 변경합니다. ```AT+IPR=9```
3. 이제 115200/8-N-1 설정을 사용하여 모델에 다시 연결하고 다음을 사용하여 설정을 저장합니다. 
      AT&W0
      

이제 이 모듈을 PX4에서 사용할 수 있습니다.

### 소프트웨어

[ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG)를 사용하여 RockBlock 모듈이 실행될 [직렬 포트를 구성](../peripherals/serial_configuration.md)합니다. 포트에 대한 전송 속도는 드라이버에 의해 구성되므로 설정할 필요가 없습니다.

:::note
*QGroundControl*에서 설정 매개변수를 사용할 수 없는 경우에는 [펌웨어에 드라이버를 추가](../peripherals/serial_configuration.md#parameter_not_in_firmware)하여야 합니다.

    drivers/telemetry/iridiumsbd
    

:::

## RockBlock 설정

RockBlock의 첫 번째 모듈을 구입시의 첫 번째 단계는 사용자 계정을 생성하는 것입니다.

[계정](https://rockblock.rock7.com/Operations)에 로그인하여 `My RockBLOCKs`에서 RockBlock 모듈을 등록합니다. 모듈에 대한 라인 렌탈을 활성화하고 계정에서 예상 비행 시간에 충분한 크레딧을 사용할 수 있는 지 확인합니다. 기본 설정을 사용할 경우 분당 1개의 메시지가 차량에서 지상국으로 전송됩니다.

메시지 릴레이 서버에 대한 배달 그룹을 설정하고 모듈을 해당 배달 그룹에 추가합니다.

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
  
  * Check the signal quality after the flight. If it is decreasing during the flight and you are using the internal antenna consider using an external antenna. If you are already using the external antenna try moving the antenna as far away as possible from any electronics or anything which might disturb the signal. Also make sure that the antenna is not damaged.
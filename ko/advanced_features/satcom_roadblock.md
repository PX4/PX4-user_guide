# Iridium/RockBlock 위성 통신 체계

위성 통신 시스템은 지상국과 차량 사이에 긴 범위의 높은 대기 시간 링크를 제공하는 데 사용할 수 있습니다.

이 항목에서는 이리듐 SBD 위성 통신 시스템의 서비스 공급자로 RockBlock을 사용하는 시스템을 설정하는 방법을 설명합니다. 신호 품질이 우수할 경우 사용자는 10~15초 사이의 지연 시간을 예상할 수 있습니다.

## 개요

위성 통신 링크에는 다음 구성 요소가 필요합니다.

* PX4 오토파일럿으로 Pixhawk에 연결된 [록블록 9603 ](http://www.rock7mobile.com/products-rockblock-9603) 모듈이 깜박였습니다. 
* 아이메시지 서버의 런닝맨 리눅스 서버.
* Ubuntu Linux에서 *QGroundControl *을 실행하는 지상국 컴퓨터

전체 시스템 아키텍처는 다음과 같습니다.

![건축학](../../assets/satcom/architecture.jpg)

> ** 노트 ** 설정은 Ubuntu 14.04 및 16.04에서 실행되는 *QGoundControl *의 현재 릴리스로 테스트되었습니다.

* 다른 지상국 및 운영 체제에서 시스템을 실행하는 것이 가능할 수도 있지만, 이는 테스트되지 않았으며 작동하지도 않습니다.
* 또한 [ RockBlock MK2 ](http://www.rock7mobile.com/products-rockblock) 모듈을 사용할 수 있습니다 RockBlock 9603 모듈은 크기가 작고 가벼우며 동일한 기능을 제공하기 때문에 권장됩니다.

## 비용. 

비용영국 링크 운영 비용은 라인 임대 및 메시지당 비용으로 구성됩니다.

* 각 모듈을 활성화해야 하며, 가격은 월 10파운드입니다
* 시스템을 통해 전송되는 각 메시지는 50바이트당 하나의 * 크레딧*입니다. 번들 크기에 따라 RockBlock에서 신용당 0.04파운드 0.11파운드에 신용대출을 구입할 수 있다.

일반적으로 모듈에 대한 자세한 설명은 [록블록 설명서 ](https://docs.rockblock.rock7.com/docs) 및 *록블록 *을 참조하십시오.

## 차량 설정

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

1. 메시지 릴레이로 작동하는 서버에는 고정 IP 주소와 공개적으로 액세스할 수 있는 열린 TCP 포트 2개가 있어야 합니다.

* * RabbitMQ * 메시지 브로커에 대한 `5672 `(* Rabbitmq * 설정에서 변경할 수 있음)
* HTTP POST 인터페이스의 경우 `45679 `(**relay.cfg ** 파일에서 변경할 수 있음)

1. 필요한 Python 모듈을 장착하십시오. 
        탁 치다
        sudo pipe install pica wilist 미래

2. `rabbitmq ` 메시지 브로커 설치: ```sudo 적합한 설치 debootmq-server```
3. 브로커 자격 증명을 구성합니다(PWD를 기본 암호로 변경). 
        탁 치다
        sudo babymqctl add_user iridiumsbd PWD
        sudo babytl set_permissions iridiumsbd ".*".*".*"
        

4. [SatComInfrarastructure ](https://github.com/acfloria/SatComInfrastructure.git) 저장소를 복제합니다. ```집요하게```
5. * SatComInfrarastructure * 위치로 이동하여 브로커 대기열을 구성합니다. 
        ./setup_rabbit.py localhost iridiumsbd PWD
        

6. 설정을 확인합니다.
    
        sudo rabbitmqctl list_queues
        
        
    
    이렇게 하면 4개의 대기열 목록이 표시됩니다: `MO `, `MO_LOG `, `MT `, `MT></p></li>
<li><p>설정을 반영하도록 <code>relay.cfg ` 구성 파일을 편집합니다.

7. 분리 모드에서 릴레이 스크립트를 시작합니다. ```화면 -dm bugh -c 'cdcomcomInfrarastructure/; ./relay.피```

Other instructions include:

* 화면에서 분리: 
        ctrl+a d
        

* 스크립트 실행 중지: 
        ctrl+a :quit
        

* 화면에 다시 부착: ```스크린 -드루```

## 지상국 컴퓨터

To setup the ground station:

1. 필요한 Python 모듈을 장착하십시오. ```sudo pipe install pica wilist 미래```
2. SatComInfrarastructure 저장소 복제: ```집요하게```
3. 설정을 반영하도록 **udp2rabbit.cfg** 구성 파일을 편집합니다.
4. [ *QGroundControl *](https://docs.qgroundcontrol.com/en/getting_started/download_and_install.html)(일별 빌드).
5. 다음 매개 변수를 사용하여 QGC에서 UDP 연결을 추가합니다.

* 청취 포트: 10000
* 대상 호스트: 127.0.0.1:1
* 높은 지연 시간: 확인됨
    
    ![높은 지연 시간 링크 설정](../../assets/satcom/linksettings.png)

### 확인

1. 접지 스테이션 컴퓨터의 단자를 열고 * SatComInfrarastructure * 저장소 위치로 변경합니다. 그런 다음 **udp2rabbit.py** 스크립트를 시작합니다.
    
        엷은 껍질
        

2. [ RockBlock 계정](https://rockblock.rock7.com/Operations)에서 테스트 메시지를 ` 테스트 전송 그룹 ` 탭에 생성된 전송 그룹으로 보냅니다.

If in the terminal where the `udp2rabbit.py` script is running within a couple of seconds the acknowledge for a message can be observed, then the RockBlock delivery group, the relay server and the udp2rabbit script are set up correctly:

![udp2rabbit message acknowledge](../../assets/satcom/verification.png)

## 시스템 실행

1. *QGroundControl *을 시작하십시오. 먼저 높은 지연 시간 링크를 수동으로 연결한 다음 일반 원격 측정 링크를 연결합니다.
    
    ![High Latency 링크를 연결합니다.](../../assets/satcom/linkconnect.png)

2. 접지 스테이션 컴퓨터의 단자를 열고 * SatComInfrarastructure * 저장소 위치로 변경합니다. 그런 다음 **udp2rabbit.py** 스크립트를 시작합니다.
    
        엷은 껍질
        

3. 차량의 전원을 켭니다.
4. QGC에서 첫 번째 `HIGH_LATENCY2 ` 메시지가 수신될 때까지 기다립니다. 이 검사는 *MAVLink Inspector* 위젯을 사용하거나 *LinkIndicator *를 사용하여 도구 모음에서 확인할 수 있습니다. 활성 차량에 두 개 이상의 링크가 연결되어 있는 경우, 표시된 링크의 이름을 클릭하면 모든 링크가 표시됩니다.
    
    ![링크 도구 모음](../../assets/satcom/linkindicator.png)
    
    링크 표시기는 항상 우선 순위 링크의 이름을 표시합니다.

5. 이제 위성 통신 시스템을 사용할 준비가 되었습니다. 우선 순위 링크(명령 전송 링크)는 다음 방법으로 결정됩니다.
    
    * 사용자가 링크를 명령하지 않으면 지연 시간이 긴 링크보다 정기적인 무선 원격 측정 링크가 선호됩니다.
    * 차량이 무장을 하고 무선 원격 측정 링크가 끊어지면(특정 시간 동안 MAVLink 메시지가 수신되지 않을 경우) 오토파일럿과 QGC는 일반 무선 원격 측정에서 대기 시간 링크로 되돌아갑니다. 무선 원격 측정 링크가 복구되는 즉시 QGC와 자동 조종기가 다시 이 링크로 전환됩니다.
    * 사용자는 도구 모음의 ` LinkIndicator `에서 우선 순위 링크를 선택할 수 있습니다. 이 링크가 활성화되어 있거나 사용자가 다른 우선 순위 링크를 선택하는 한 이 링크는 우선 순위 링크로 유지됩니다.
        
        ![우선 순위 링크 선택](../../assets/satcom/linkselection.png)

## Troubleshooting

* 비행기에서 위성 통신 메시지를 수신하지만 명령을 전송할 수 없습니다(차량이 반응하지 않음).
    
    * 릴레이 서버의 설정을 확인하고 해당 설정이 올바른지 확인합니다(특히 IMEI).

* 비행기의 위성 통신 메시지는 지상국에 도착하지 않습니다.
    
    * 시스템 콘솔이 <>iridiumsbd</em> 드라이버가 시작된 경우 및 모듈이 위성 신호를 수신했는지 확인합니다.
        이리듐sbd 상태
        
    
    * 위의 확인 단계를 사용하여 릴레이 서버, 전송 그룹 및`udp2rabbit.py` 스크립트가 올바르게 설정되었는지 확인합니다.
    * 링크가 연결되어 있고 설정이 올바른지 확인하십시오.

* IridiumSBD 드라이버가 시작되지 않음:
    
    * 차량을 재부팅합니다. 만약 그것이 ` 엑스트라에서의 수면 시간을 늘리는 데 도움이 된다면.운전자가 시작되기 전에 txt`. 그래도 Pixhawk와 모듈이 동일한 접지 레벨을 유지하는지 확인할 수 있습니다. 모듈의 보레이트가 115200으로 설정되어 있는지 확인하십시오.

* 지상에서 첫 번째 메시지가 수신되지만, 차량이 비행하는 즉시 메시지를 전송할 수 없거나 대기 시간이 훨씬 더 길어집니다(분 단위).
    
    * 비행 후 신호 품질을 확인합니다. 비행 중에 감소하는 경우 내부 안테나를 사용하는 경우 외부 안테나를 사용하는 것이 좋습니다. 만약 당신이 이미 멀리 도망 가는 신호를 방해할 수 있는 아무 전기이나 다른어떤 것에도 안테나 이동하십시오는 외부 안테나를 사용하고 있다. 또한 안테나가 손상되지 않았는지 확인합니다.
# 리눅스에 원격 조종 수신기 연결 (S.Bus 포함)

이 절에서는 [지원 원격 조종 수신기](../getting_started/rc_transmitter_receiver.md)를 임의의 직렬 포트에 연결하고 사용할 목적으로 리눅스 기반 오토파일럿을 설정하는 방법을 알려드립니다.

S.Bus에 비해 원격 조종 형식은 수신기를 직렬 포트에 연결하거나 USB to TTY 직렬 케이블(PL2302 USB to Serial TTL 변환기)로 USB에 연결할 수 있습니다.

:::note
For an S.Bus reciever (or encoder - e.g. from Futaba, RadioLink, etc.) you will usually need to connect the receiver and device via a [signal inverter circuit](#signal_inverter_circuit), but otherwise the setup is the same.
:::

원격 조종 드라이버를 각 UART 에서 시작하려면 (예: `/dev/ttS2`):

<a id="start_driver"></a>

## 드라이버 시작

다른 드라이버 사용법을 보려면 [rc_input](../modules/modules_driver.md#rcinput)을 참고하십시오.
```
rc_input start -d /dev/ttyS2
```

S.Bus에서는 *반전* UART 통신 신호를 주고 받습니다.

<a id="signal_inverter_circuit"></a>

## 신호 반전 회로(S.Bus 전용)

일부 직렬 포트/비행체 제어 장치에서는 반전 UART 신호를 읽을 수 있으나 대부분 반전 신호를 복원하는 신호 반전 회로가 필요합니다.

이 절에서는 적절한 회로를 만드는 방법을 알아봅니다.

:::tip
This circuit is also required to read S.Bus remote control signals through the serial port or USB-to-TTY serial converter.
:::

This section shows how to create an appropriate circuit.

### 필요한 소자 부품

* 1x NPN 트랜지스터 (예: NPN S9014 TO92)
* 1x 10K 저항
* 1x 1K 저항

:::note
Any type/model of transistor can be used because the current drain is very low.
:::

### 회로 구성도/연결

Connect the components as described below (and shown in the circuit diagram):

* S.Bus 신호선 &rarr; 1K 저항 &rarr; NPN 트랜지스터 베이스
* NPN 트랜지스터 에밋 &rarr; GND
* 3.3VCC &rarr; 10K 저항 &rarr; NPN 트랜지스터 컬렉션 &rarr; USB-to-TTY rxd
* 5.0VCC &rarr; S.Bus VCC
* GND &rarr; S.Bus GND

![Signal inverter circuit diagram](../../assets/sbus/driver_sbus_signal_inverter_circuit_diagram.png)

The image below shows the connections on a breadboard.

![Signal inverter breadboard](../../assets/sbus/driver_sbus_signal_inverter_breadboard.png)

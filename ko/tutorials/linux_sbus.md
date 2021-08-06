# Linux에서 RC 수신기 연결(S.Bus 포함)

직렬 포트에서 [지원되는 RC 수신기](../getting_started/rc_transmitter_receiver.md)를 연결하고 사용하도록, PX4 Linux 기반 자동조종장치 설정 방법을 설명합니다.

S.Bus 이외의 RC 유형의 경우 수신기는 직렬 포트에 직접 연결하거나 USB-TTY 직렬 케이블(예: PL2302 USB-직렬 TTL 변환기)을 통하여 USB에 연결할 수 있습니다.

:::note
S.Bus 수신기(또는 인코더 - 예: Futaba, RadioLink 등)의 경우에는 일반적으로 [신호 인버터 회로](#signal_inverter_circuit)를 통하여 수신기와 장치를 연결 하지만, 이 외의 경우에는 설정이 동일합니다.
:::

그런 다음, 아래와 같이 기기에서 [PX4 RC 드라이버를 시작](#start_driver)합니다.

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
이 회로는 직렬 포트 또는 USB-to-TTY 직렬 변환기에서 S.Bus 원격 제어 신호를 읽는데 필요합니다.
:::

이 절에서는 적절한 회로를 만드는 방법을 알아봅니다.

### 필요한 소자 부품

* 1x NPN 트랜지스터 (예: NPN S9014 TO92)
* 1x 10K 저항
* 1x 1K 저항

:::note
전류 드레인 값이 상당히 낮으므로 트랜지스터를 어떤 형식/모델로 써도 상관 없습니다.
:::

### 회로 구성도/연결

아래에 설명(그리고 회로 구성도)하는 바와 같이 회로 소자를 연결하십시오:

* S.Bus 신호선 &rarr; 1K 저항 &rarr; NPN 트랜지스터 베이스
* NPN 트랜지스터 에밋 &rarr; GND
* 3.3VCC &rarr; 10K 저항 &rarr; NPN 트랜지스터 컬렉션 &rarr; USB-to-TTY rxd
* 5.0VCC &rarr; S.Bus VCC
* GND &rarr; S.Bus GND

![신호 인버터 회로도](../../assets/sbus/driver_sbus_signal_inverter_circuit_diagram.png)

아래 이미지에서는 빵판 연결 모습을 보여줍니다.

![신호 반전 빵판](../../assets/sbus/driver_sbus_signal_inverter_breadboard.png)

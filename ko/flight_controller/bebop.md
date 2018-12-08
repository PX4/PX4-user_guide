# Parrot Bebop

[Parrot Bebop 2 ](http://global.parrot.com/au/products/bebop2/)은 인기 있는 비행 카메라입니다. 연구와 시험에 사용될 수 있도록 PX4에 대한 기본 지원이 추가되었습니다.

> ** Warning ** Bebop 지원은 초기 단계에 있습니다 Bebop과 함께 PX4를 사용하려면 개발 도구 체인을 사용하여 코드 </a>을 작성해야 합니다.

## Video

{% youtube %}https://youtu.be/SsnzYhiuWiE{% endyoutube %}

{% youtube %}https://www.youtube.com/watch?v=hTVNHlqxWBk{% endyoutube %}

## 고급 주제

### FTDI 연결

Follow the instructions to connect to the Parrot Bebop 2 via FTDI.

* Torx 나사 두 개(T5)를 풀어 프론트 캡을 분리하십시오. ![bebop_torx](../../assets/hardware/bebop/bebop_torx.jpg)
* 핀을 사용하여 접지/RX/TX 또는 커넥터의 솔더 케이블에 연결합니다. ![bebop_serial](../../assets/hardware/bebop/bebop_serial.jpg)
* FTDI 케이블을 연결하고 실행
    
    ```sh
    화면 /dev/tyUSB0 115200
    ```
    
    비밥에 연결하려고요
    
    ![bebop_ftdi](../../assets/hardware/bebop/bebop_ftdi.jpg)

## 자료

Instructions on how to build the code and use PX4 with Bebop 2 available in the Developer Guide here:

* [코드 만들기](https://dev.px4.io/en/setup/building_px4.html#parrot-bebop)
* [Airframe Reference](../airframes/airframe_reference.md#copter_quadrotor_x_parrot_bebop_frame)
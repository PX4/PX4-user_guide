# Accessing I/O Data
로우레벨 버스 데이터는 aDSP에서 실행하는 코드로 접근이 가능합니다. 이때 POSIX 스타일의 API인 DSPAL을 호출합니다. 이 API에 대한 헤더 파일은 [github](https://github.com/ATLFlight/dspal)에서 관리하며 각 헤더 파일에 대한 문서는 Doxygen 포맷으로 되어 있습니다. 지원하는 API의 설명과 지원하는 헤더 파일의 링크는 아래를 참고하세요.

## API 개요
* [Serial:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_serial.h)
* [I2C:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_i2c.h)
* [SPI:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_spi.h)
* [GPIO:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_gpio.h)
* Timers: [qurt_timer.h](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)
* Power Control: [HAP_power.h](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)

## 샘플 소스코드
각 DSPAL 함수를 검증하기 위한 단위테스트 코드는 각 함수를 어떻게 호출하는지에 대한 좋은 예제가 됩니다.
이 코드는 다음 링크에 : [github](https://github.com/ATLFlight/dspal/tree/master/test/dspal_tester)

### Serial Data Rate 셋팅
시리얼 API는 tcsetattr() 함수를 통해 data rate를 설정하는 termios 규칙을 따르지 않습니다. IOCTL 코드가 대신 사용되며 위에 링크된 헤더 파일에서 설명하고 있습니다.
The serial API does not conform to the termios convention for setting data rate through the tcsetattr() function.  IOCTL codes are used instead and are
described in the header file linked above.

### 타이머
보다 고급 aDSP 연산에 대한 추가 함수는 qurt_ 접두어가 붙어 있습니다. 예를 들어 Timer 함수는 qurt_timer 접두어가 붙어 있고 [Hexagon SDK](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)에 포함된 qurt_timer.h 헤더파일을 참고하세요.

### Power Level 셋팅
Hexagon SDK에서 제공하는 HAP 함수를 사용하면 aDSP의 power level을 설정하는 것이 가능합니다. 이를 통해 I/O 지연이 줄어들기도 합니다. 이 API에 대한 상세한 정보는 [Hexagon SDK](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)에 포함된 HAP_power.h 헤더 파일을 참고하세요.

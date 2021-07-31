# 모듈 참조: 명령

## bl_update
소스: [systemcmds/bl_update](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/bl_update)

파일에서 부트로더를 플래시하는 유틸리티<a id="bl_update_usage"></a>

### 사용법
```
bl_update [arguments...]
   setopt        옵션 비트를 설정하여 FLASH를 잠금 해제합니다(잠긴 상태인 경우에만 필요).
   <file>        부트로더 바이너리 파일
```
## dumpfile
소스: [systemcmds/dumpfile](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/dumpfile)

덤프 파일 유틸리티. 바이너리 모드(LF를 CR LF로 바꾸지 않음) 파일의 크기와 내용을 표준 출력에 인쇄합니다.
<a id="dumpfile_usage"></a>

### 사용법
```
dumpfile [arguments...]
     <file>      덤프할 파일
```
## dyn
소스: [systemcmds/dyn](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/dyn)


### 설명
PX4 바이너리로 컴파일되지 않은 동적 PX4 모듈을 로드하고 실행합니다.

### 예
```
dyn ./hello.px4mod start
```

<a id="dyn_usage"></a>

### 사용법
```
dyn [arguments...]
     <file>      모듈을 포함하는 파일
     [arguments...] 모듈에 대한 인수
```
## esc_calib
소스: [systemcmds/esc_calib](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/esc_calib)

ESC 보정 도구

보정 절차(명령을 실행하면 안내 도움말이 표시됨):
- 프로펠러를 제거하고, ESC 전원을 끕니다.
- 자세 및 속도 컨트롤러를 중지합니다: mc_rate_control stop, fw_att_control stop
- 안전이 꺼져 있는 지 확인
- 이 명령어를 실행하십시오

<a id="esc_calib_usage"></a>

### 사용법
```
esc_calib [arguments...]
     [-d <val>]  Select PWM output device
                 values: <file:dev>, default: /dev/pwm_output0
     [-l <val>]  Low PWM value in us
                 default: 1000
     [-h <val>]  High PWM value in us
                 default: 2000
     [-c <val>]  select channels in the form: 1234 (1 digit per channel,
                 1=first)
     [-m <val>]  Select channels via bitmask (eg. 0xF, 3)
     [-a]        Select all channels
```
## failure
소스: [systemcmds/failure](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/failure)


### 설명
시스템에 장애를 주입합니다.

### 구현
이 시스템 명령은 uORB로 차량 명령어를 전송하여 실패를 트리거합니다.

### 예
GPS를 중지하여, GPS 안전 장치를 테스트합니다.

failure gps off

<a id="failure_usage"></a>

### 사용법
```
failure [arguments...]
   help          Show this help text

   gps|...       Specify component

   ok|off|...    Specify failure type
     [-i <val>]  sensor instance (0=all)
                 default: 0
```
## gpio
소스: [systemcmds/gpio](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/gpio)


### 설명
이 명령은 GPIO를 읽고 쓰는 데 사용됩니다.
```
gpio read <PORT><PIN>/<DEVICE> [PULLDOWN|PULLUP] [--force]
gpio write <PORT><PIN>/<DEVICE> <VALUE> [PUSHPULL|OPENDRAIN] [--force]
```

### 예
풀업으로 구성된 포트 H 핀 4의 값을 읽습니다.
```
gpio read H4 PULLUP
```
1 OK

포트 E 핀 7의 출력 값을 높음으로 설정합니다.
```
gpio write E7 1 --force
```

/dev/gpin1 장치의 출력 값을 높음으로 설정합니다.
```
gpio write /dev/gpin1 1
```

<a id="gpio_usage"></a>

### 사용법
```
gpio [arguments...]
   read
     <PORT><PIN>/<DEVICE> GPIO port and pin or device
     [PULLDOWN|PULLUP] Pulldown/Pullup
     [--force]   Force (ignore board gpio list)

   write
     <PORT> <PIN> GPIO port and pin
     <VALUE>     Value to write
     [PUSHPULL|OPENDRAIN] Pushpull/Opendrain
     [--force]   Force (ignore board gpio list)
```
## hardfault_log
소스: [systemcmds/hardfault_log](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/hardfault_log)

하드폴트 유틸리티

하드폴트를 처리하기 위해 시작 스크립트에서 사용됩니다.

<a id="hardfault_log_usage"></a>

### 사용법
```
hardfault_log <command> [arguments...]
 Commands:
   check         Check if there's an uncommited hardfault

   rearm         Drop an uncommited hardfault

   fault         Generate a hardfault (this command crashes the system :)
     [0|1]       Hardfault type: 0=divide by 0, 1=Assertion (default=0)

   commit        Write uncommited hardfault to /fs/microsd/fault_%i.txt (and
                 rearm, but don't reset)

   count         Read the reboot counter, counts the number of reboots of an
                 uncommited hardfault (returned as the exit code of the program)

   reset         Reset the reboot counter
```
## i2cdetect
소스: [systemcmds/i2cdetect](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/i2cdetect)

특정 버스에서 I2C 장치를 검색하는 유틸리티입니다.<a id="i2cdetect_usage"></a>

### 사용법
```
i2cdetect [arguments...]
     [-b <val>]  I2C bus
                 default: 1
```
## led_control
소스: [systemcmds/led_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/led_control)


### 설명
(외부) LED를 제어하고 콘트롤하는 명령어입니다.

이 명령어를 사용하려면, led_control uorb 주제를 처리하는 드라이버가 실행중인 지 확인하십시오.

예를 들어, 한 모듈은 낮은 우선 순위로 색상을 설정할 수 있고, 다른 모듈은 높은 우선 순위로 N 번 깜박일 수 있으며, 깜박임 후 LED는 자동으로 낮은 우선 순위 상태로 돌아갑니다. `reset` 명령을 사용하여 더 낮은 우선순위로 돌아갈 수도 있습니다.

### 예
첫 번째 LED를 파란색으로 5번 깜박입니다.
```
led_control blink -c blue -l 0 -n 5
```

<a id="led_control_usage"></a>

### 사용법
```
led_control <command> [arguments...]
 Commands:
   test          Run a test pattern

   on            Turn LED on

   off           Turn LED off

   reset         Reset LED priority

   blink         Blink LED N times
     [-n <val>]  Number of blinks
                 default: 3
     [-s <val>]  Set blinking speed
                 values: fast|normal|slow, default: normal

   breathe       Continuously fade LED in & out

   flash         Two fast blinks and then off with frequency of 1Hz

 The following arguments apply to all of the above commands except for 'test':
     [-c <val>]  color
                 values: red|blue|green|yellow|purple|amber|cyan|white, default:
                 white
     [-l <val>]  Which LED to control: 0, 1, 2, ... (default=all)
     [-p <val>]  Priority
                 default: 2
```
## listener
소스: [systemcmds/topic_listener](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/topic_listener)


uORB 주제를 듣고 콘솔에 데이터를 인쇄하는 유틸리티입니다.

리스너는 Ctrl+C, Esc 또는 Q를 눌러 종료합니다.

<a id="listener_usage"></a>

### 사용법
```
listener <command> [arguments...]
 Commands:
     <topic_name> uORB topic name
     [-i <val>]  Topic instance
                 default: 0
     [-n <val>]  Number of messages
                 default: 1
     [-r <val>]  Subscription rate (unlimited if 0)
                 default: 0
```
## mfd
소스: [systemcmds/mft](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/mft)

매니페스트와 상호 작용하는 유틸리티입니다.<a id="mfd_usage"></a>

### 사용법
```
mfd <command> [arguments...]
 Commands:
   query         Returns true if not existed
```
## mixer
소스: [systemcmds/mixer](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/mixer)/


### 설명
믹서 파일을 ESC 드라이버에 로드하거나 추가합니다.

드라이버는 NuttX의 경우와 같이 사용된 ioctl을 지원하여야 하지만, 예를 들어 라즈베리파이에서는 지원하지 않습니다.

<a id="mixer_usage"></a>

### 사용법
```
mixer <command> [arguments...]
 Commands:
   load
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file

   append
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file
```
## motor_ramp
소스: [systemcmds/motor_ramp](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/motor_ramp)


### 설명
모터 램프 업을 테스트하기 위한 응용 프로그램입니다.

시작하기 전에 실행 중인 자세 컨트롤러를 중지하여야 합니다.
```
mc_rate_control stop
fw_att_control stop
```

시작할 때 백그라운드 작업이 시작되고, 몇 초 동안(지정된 대로) 실행된 다음 종료됩니다.

### 예
```
motor_ramp sine -a 1100 -r 0.5
```

<a id="motor_ramp_usage"></a>

### 사용법
```
motor_ramp [arguments...]
     ramp|sine|square mode
     [-d <val>]  Pwm output device
                 default: /dev/pwm_output0
     -a <val>    Select minimum pwm duty cycle in usec
     [-b <val>]  Select maximum pwm duty cycle in usec
                 default: 2000
     [-r <val>]  Select motor ramp duration in sec
                 default: 1.0

 WARNING: motors will ramp up to full speed!
```
## motor_test
소스: [systemcmds/motor_test](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/motor_test)


모터를 테스트하는 유틸리티입니다.

경고: 이 명령을 사용하기 전에 모든 프로펠러를 제거하십시오.

<a id="motor_test_usage"></a>

### 사용법
```
motor_test <command> [arguments...]
 Commands:
   test          Set motor(s) to a specific output value
     [-m <val>]  Motor to test (1...8, all if not specified)
     [-p <val>]  Power (0...100)
                 default: 0
     [-t <val>]  Timeout in seconds (default=no timeout)
                 default: 0
     [-i <val>]  driver instance
                 default: 0

   stop          Stop all motors

   iterate       Iterate all motors starting and stopping one after the other
```
## mtd
소스: [systemcmds/mtd](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/mtd)

파티션을 마운트하고 테스트하는 유틸리티(보드에서 정의한 FRAM/EEPROM 스토리지 기반) 입니다.<a id="mtd_usage"></a>

### 사용법
```
mtd <command> [arguments...]
 Commands:
   status        Print status information

   readtest      Perform read test

   rwtest        Perform read-write test

   erase         Erase partition(s)

 The commands 'readtest' and 'rwtest' have an optional instance index:
     [-i <val>]  storage index (if the board has multiple storages)
                 default: 0

 The commands 'readtest', 'rwtest' and 'erase' have an optional parameter:
     [<partition_name1> [<partition_name2> ...]] Partition names (eg.
                 /fs/mtd_params), use system default if not provided
```
## nshterm
소스: [systemcmds/nshterm](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/nshterm)

주어진 포트에서 NSH 쉘을 시작합니다.

이것은 이전에 USB 직렬 포트에서 셸을 시작하는 데 사용되었습니다. 이제 mavlink가 실행되고 mavlink를 통하여 쉘을 사용할 수 있습니다.

<a id="nshterm_usage"></a>

### 사용법
```
nshterm [arguments...]
     <file:dev>  Device on which to start the shell (eg. /dev/ttyACM0)
```
## param
소스: [systemcmds/param](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/param)


### 설명
쉘 또는 스크립트를 통해 매개변수를 조작하는 명령어입니다.

이것은 예를 들어 기체별 매개변수를 설정하기 위하여 시작 스크립트에서 사용됩니다.

매개변수는 변경시(예: `매개변수 설정`으로) 자동으로 저장됩니다. 일반적으로 FRAM 또는 SD 카드에 저장됩니다. `param select`를 사용하여 후속 저장을 위한 저장 위치를 변경할 수 있습니다(이는 부팅할 때마다 (재)설정하여야 함).

FLASH 기반 백엔드가 활성화된 경우(예: Intel Aero 또는 Omnibus의 경우 컴파일 시간에 수행됨) `param select`는 효과가 없으며, 기본값은 항상 FLASH 백엔드입니다. 그러나, `param save/load <file>`는 여전히 파일에 쓰거나 읽는 데 사용할 수 있습니다.

각 매개변수에는 'used' 플래그가 있으며, 이는 부팅 중에 읽을 때 설정됩니다. 지상 관제소에 관련 매개변수만 표시하는 데 사용됩니다.

### 예
기체를 변경하고 기체의 기본 매개변수가 로드되었는 지 확인합니다.
```
param set SYS_AUTOSTART 4001
param set SYS_AUTOCONFIG 1
reboot
```

<a id="param_usage"></a>

### 사용법
```
param <command> [arguments...]
 Commands:
   load          Load params from a file (overwrite all)
     [<file>]    File name (use default if not given)

   import        Import params from a file
     [<file>]    File name (use default if not given)

   save          Save params to a file
     [<file>]    File name (use default if not given)

   select        Select default file
     [<file>]    File name (use <root>/eeprom/parameters if not given)

   show          Show parameter values
     [-a]        Show all parameters (not just used)
     [-c]        Show only changed params (unused too)
     [-q]        quiet mode, print only param value (name needs to be exact)
     [<filter>]  Filter by param name (wildcard at end allowed, eg. sys_*)

   show-for-airframe Show changed params for airframe config

   status        Print status of parameter system

   set           Set parameter to a value
     <param_name> <value> Parameter name and value to set
     [fail]      If provided, let the command fail if param is not found

   set-default   Set parameter default to a value
     <param_name> <value> Parameter name and value to set
     [fail]      If provided, let the command fail if param is not found

   compare       Compare a param with a value. Command will succeed if equal
     [-s]        If provided, silent errors if parameter doesn't exists
     <param_name> <value> Parameter name and value to compare

   greater       Compare a param with a value. Command will succeed if param is
                 greater than the value
     [-s]        If provided, silent errors if parameter doesn't exists
     <param_name> <value> Parameter name and value to compare
     <param_name> <value> Parameter name and value to compare

   touch         Mark a parameter as used
     [<param_name1> [<param_name2>]] Parameter name (one or more)

   reset         Reset only specified params to default
     [<param1> [<param2>]] Parameter names to reset (wildcard at end allowed)

   reset_all     Reset all params to default
     [<exclude1> [<exclude2>]] Do not reset matching params (wildcard at end
                 allowed)

   index         Show param for a given index
     <index>     Index: an integer >= 0

   index_used    Show used param for a given index
     <index>     Index: an integer >= 0

   find          Show index of a param
     <param>     param name
```
## perf
소스: [systemcmds/perf](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/perf)

성능 카운터를 인쇄하는 도구입니다.<a id="perf_usage"></a>

### 사용법
```
perf [arguments...]
   reset         Reset all counters

   latency       Print HRT timer latency histogram

 Prints all performance counters if no arguments given
```
## pwm
소스: [systemcmds/pwm](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/pwm)


### 설명
이 명령은 서보와 ESC 제어를 위한 PWM 출력을 설정합니다.

기본 장치 `/dev/pwm_output0`은 메인 채널이고, AUX 채널은 `/dev/pwm_output1`(`-d` 매개변수) 입니다.

PWM 매개변수(`PWM_*`)가 적용되었는 지 확인하기 위하여, 시작 스크립트에서 사용됩니다(또는 지정된 경우 기체 구성에서 제공하는 매개변수). `pwm status`는 현재 설정을 나타냅니다(트림 값은 오프셋이며 `PWM_MAIN_TRIMx` 및 `PWM_AUX_TRIMx`으로 구성됨).

시동 해제 값은 모터가 회전하지 않도록 설정하여야 하며(킬 스위치에도 사용됨), 회전 최소값으로 설정하여야 합니다.

채널은 그룹에 할당됩니다. 하드웨어 제한으로 인하여, 업데이트 속도는 그룹별로만 설정할 수 있습니다. `pwm status`를 사용하여 그룹을 표시합니다. `-c` 인수를 사용하는 경우, 포함된 그룹의 모든 채널이 포함되어야 합니다.

매개변수 `-p` 및 `-r`은 정수를 지정하는 대신 매개변수로 설정할 수 있습니다. 예를 들어 -p p:PWM_MIN을 사용합니다.

OneShot 모드에서 PWM 범위 [1000, 2000]은 자동으로 [125, 250]에 매핑되는 것을 참고하십시오.

### 예
모든 채널의 PWM 속도를 400 Hz로 설정합니다.
```
pwm rate -a -r 400
```

출력을 테스트합니다. 채널 1과 3을 사용하고 PWM 값을 1200us로 설정합니다.
```
pwm arm
pwm test -c 13 -p 1200
```

<a id="pwm_usage"></a>

### 사용법
```
pwm <command> [arguments...]
 Commands:
   arm           Arm output

   disarm        Disarm output

   status        Print current configuration of all channels

   forcefail     Force Failsafe mode. PWM outputs are set to failsafe values.
     on|off      Turn on or off

   terminatefail Enable Termination Failsafe mode. While this is true, any
                 failsafe that occurs will be unrecoverable (even if recovery
                 conditions are met).
     on|off      Turn on or off

   rate          Configure PWM rates
     -r <val>    PWM Rate in Hz (0 = Oneshot, otherwise 50 to 400Hz)

   oneshot       Configure Oneshot125 (rate is set to 0)

   failsafe      Set Failsafe PWM value

   disarmed      Set Disarmed PWM value

   min           Set Minimum PWM value

   max           Set Maximum PWM value

   test          Set Output to a specific value until 'q' or 'c' or 'ctrl-c'
                 pressed

   steps         Run 5 steps from 0 to 100%

 The commands 'failsafe', 'disarmed', 'min', 'max' and 'test' require a PWM
 value:
     -p <val>    PWM value (eg. 1100)

 The commands 'rate', 'oneshot', 'failsafe', 'disarmed', 'min', 'max', 'test'
 and 'steps' additionally require to specify the channels with one of the
 following commands:
     [-c <val>]  select channels in the form: 1234 (1 digit per channel,
                 1=first)
     [-m <val>]  Select channels via bitmask (eg. 0xF, 3)
     [-g <val>]  Select channels by group (eg. 0, 1, 2. use 'pwm status' to show
                 groups)
     [-a]        Select all channels

 These parameters apply to all commands:
     [-d <val>]  Select PWM output device
                 values: <file:dev>, default: /dev/pwm_output0
     [-v]        Verbose output
     [-e]        Exit with 1 instead of 0 on error
```
## reboot
소스: [systemcmds/reboot](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/reboot)

시스템을 재부팅합니다.<a id="reboot_usage"></a>

### 사용법
```
reboot [arguments...]
     [-b]        Reboot into bootloader
     [lock|unlock] Take/release the shutdown lock (for testing)
```
## sd_bench
소스: [systemcmds/sd_bench](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/sd_bench)

SD 카드 속도를 테스트합니다.<a id="sd_bench_usage"></a>

### 사용법
```
sd_bench [arguments...]
     [-b <val>]  Block size for each read/write
                 default: 4096
     [-r <val>]  Number of runs
                 default: 5
     [-d <val>]  Duration of a run in ms
                 default: 2000
     [-s]        Call fsync after each block (default=at end of each run)
     [-u]        Test performance with unaligned data)
```
## system_time
소스: [systemcmds/system_time](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/system_time)


### 설명

시스템 시간을 설정하고 출력합니다.

### 예

시스템 시간을 설정하고 다시 읽습니다.
```
system_time set 1600775044
system_time get
```

<a id="system_time_usage"></a>

### 사용법
```
system_time <command> [arguments...]
 Commands:
   set           Set the system time, provide time in unix epoch time format

   get           Get the system time
```
## top
소스: [systemcmds/top](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/top)

실행 중인 프로세스와 해당 CPU, 스택 사용량, 우선 순위 및 상태를 모니터링합니다.<a id="top_usage"></a>

### 사용법
```
top [arguments...]
   once          print load only once
```
## usb_connected
소스: [systemcmds/usb_connected](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/usb_connected)

USB가 연결되어 있는지 확인하는 유틸리티입니다. 이전에 시작 스크립트에서 사용되었습니다. 반환 값 0은 USB가 연결되었음을 의미하고, 그렇지 않으면 1입니다.
<a id="usb_connected_usage"></a>

### 사용법
```
usb_connected [arguments...]
```
## ver
소스: [systemcmds/ver](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/ver)

다양한 버전 정보를 출력합니다.<a id="ver_usage"></a>

### 사용법
```
ver <command> [arguments...]
 Commands:
   hw            Hardware architecture

   mcu           MCU info

   git           git version information

   bdate         Build date and time

   gcc           Compiler info

   bdate         Build date and time

   px4guid       PX4 GUID

   uri           Build URI

   all           Print all versions

   hwcmp         Compare hardware version (returns 0 on match)
     <hw> [<hw2>] Hardware to compare against (eg. PX4_FMU_V4). An OR comparison
                 is used if multiple are specified

   hwtypecmp     Compare hardware type (returns 0 on match)
     <hwtype> [<hwtype2>] Hardware type to compare against (eg. V2). An OR
                 comparison is used if multiple are specified
```

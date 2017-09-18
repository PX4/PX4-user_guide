# 고급 Snapdragon

## Snapdragon에 연결하기

### FTDI 이용

Snapdragon과 함께 배송되는 작은 디버그 헤더와 FTDI 케이블을 연결합니다.

리눅스에서 다음과 같이 콘솔 열기 :

```
screen /dev/ttyUSB0 115200
```

USB0는 각자 환경에 따라 달라질 수 있으니  `/dev/` 나 `/dev/serial/by-id`로 확인합니다.


### ADB (Android Debug Bridge) 이용

USB2.0로 Snapdragon을 연결하고 파워 모듈을 이용해서 전원을 넣습니다. Snapdragon이 실행되면 파랑 LED가 천천히 깜빡입니다.

board는 adb로 검색합니다 :

```
adb devices
```

만약 장치가 보이지 않는다면 USB 장치의 접근 권한 이슈일 가능성이 높습니다.

shell을 얻을려면 다음 명령을 수행 :

```
adb shell
```

## Snapdragon 업그레이드

이 단계는 Intrynsic에서 Flight_BSP 압축 파일을 받아와야 합니다. 보드 시리얼을 등록한 후에 받을 수 있습니다.

### Linux image 업그레이드/교체하기

> **Caution** Linux image를 플래쉬하면 Snapdragon에 있는 모든 것이 삭제됩니다. 따라서 이 단계를 진행하기 전에 백업하도록 합니다!

board는 adb로 검색합니다 :

```
adb devices
```

다음으로 fastboot bootloader으로 재부팅합니다 :

```
adb reboot bootloader
```

fastboot을 이용해서 board를 찾습니다 :

```
fastboot devices
```

최신 BSP를 Intrinsyc에서 다운로드 받습니다 :

```
unzip Flight_3.1.1_BSP_apq8074-00003.zip
cd BSP/binaries/Flight_BSP_4.0
./fastboot-all.sh
```

해당 파티션에서 `recovery`, `update`와 `factory`가 실패하는 것이 일반적입니다.

### ADSP 펌웨어 업데이트

PX4 stack의 일부는 ADSP에서 실행됩니다.(Snapdragon 8074의 DSP 쪽) 기반이 되는 OS인 QURT는 별도로 업데이트가 필요합니다.

> **Caution** ADSP 펌웨어 업데이트를 진행하는 동안 문제가 발생하면, Snapdragon은 먹통이 됩니다! 먹통이 되지 않게 아래 단계를 주의해서 따라가기 바랍니다.

가장 먼저할 일은 BSP 3.1.1가 준비되어 있지 않다면 [Linux 업데이트 하기 image](#upgradingreplacing-the-linux-image)를 수행하세요!

#### 먹통 방지!

ADSP 펌웨어에 문제가 있어서 계속 부팅 상태로 멈춰있는 상황을 방지하기 위해서 업데이트할때 다음을 따라 진행합니다 :

`screen`나 `adb shell`을 이용해서 Snapdragon에서 직접 파일을 수정 :
```sh
vim /usr/local/qr-linux/q6-admin.sh
```

아니면 파일 로컬로 가지고 와서 원하는 에디터로 수정:

이렇게 하기 위해서 로컬로 파일을 로드 :
```sh
adb pull /usr/local/qr-linux/q6-admin.sh
```

수정하기:

```sh
gedit q6-admin.sh
```

수정한 파일을 원래 위치에 적용 :

```sh
adb push q6-admin.sh /usr/local/qr-linux/q6-admin.sh
adb shell chmod +x /usr/local/qr-linux/q6-admin.sh
```

부팅 상태로 멈춰있게 만드는 부분을 커멘트 처리 :

```
# Wait for adsp.mdt to show up
#while [ ! -s /lib/firmware/adsp.mdt ]; do
#  sleep 0.1
#done
```

그리고:

```
# Don't leave until ADSP is up
#while [ "`cat /sys/kernel/debug/msm_subsys/adsp`" != "2" ]; do
#  sleep 0.1
#done
```

#### 최신 ADSP 펌웨어 파일을 밀어넣기

Intrinsync에서 파일 다운로드 [Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip](http://support.intrinsyc.com/attachments/download/691/Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip)

Snapdragon으로 복사하기:

```
unzip Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip
cd images/8074-eagle/normal/adsp_proc/obj/qdsp6v5_ReleaseG/LA/system/etc/firmware
adb push . /lib/firmware
```

다음으로 리부팅하면 해당 펌웨어가 적용:

```
adb reboot
```


## Serial 포트

### serial 포트 사용하기

모든 POSIX 호출이 QURT에서 지원되는 것은 아닙니다. 따라서 일부 커스텀 ioctl이 필요합니다.

UART를 셋업하고 사용하기 위한 API는  [dspal](https://github.com/PX4/dspal/blob/master/include/dev_fs_lib_serial.h)에서 설명하고 있습니다.

## Wifi 셋팅

> **Todo** 고급 개발자를 위한 부분입니다.

Linux shell에 연결하기 (참고 [console instructions](../debug/system_console.md#snapdragon-flight-wiring-the-console)).

### Access point 모드

Snapdragon이 AP 모드(wifi access point)로 동작되길 원한다면, 다음 파일을 수정 : `/etc/hostapd.conf` :

```
ssid=EnterYourSSID
wpa_passphrase=EnterYourPassphrase
```

다음으로 AP 모드 설정:

```
/usr/local/qr-linux/wificonfig.sh -s softap
reboot
```

### Station 모드

만약 Snapdragon을 기존 wifi에 연결하고자 한다면, 다음 파일 수정 :
`/etc/wpa_supplicant/wpa_supplicant.conf`에 여러분의 네트워크 셋팅 추가:

```
network={
    ssid="my existing network ssid"
    psk="my existing password"
}
```

다음으로 station 모드 설정:

```
/usr/local/qr-linux/wificonfig.sh -s station
reboot
```


## 문제해결

### adb가 동작하지 않는 경우

- [permissions](#usb-permissions) 체크
- micro-USB 케이블이 정상적으로 동작하는지 확인
- USB 2.0 포트로 시도
- 컴퓨터의 앞이나 뒤에 있는 포트로 시도

### USB permissions

1) 새로 permission 파일 생성

```
sudo -i gedit /etc/udev/rules.d/51-android.rules
```

이 컨텐츠를 붙여넣기 하세요. ADB access를 위해 널리 사용되는 장치들을 활성화시켜 줍니다 :

```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0e79", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0502", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0b05", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="413c", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0489", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="091e", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="12d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="24e3", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2116", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0482", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="17ef", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1004", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="22b8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0409", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2080", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0955", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2257", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="10a9", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1d4d", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0471", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04da", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="05c6", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1f53", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04dd", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fce", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0930", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="19d2", MODE="0666", GROUP="plugdev"
```

해당 파일에 대해서 올바른 permission을 셋업하기 :

```
sudo chmod a+r /etc/udev/rules.d/51-android.rules
```

deamon 재시작

```
sudo udevadm control --reload-rules
sudo service udev restart
sudo udevadm trigger
```

이렇게 해도 동작하지 않는다면, [ StackOverflow에 관련 답변](http://askubuntu.com/questions/461729/ubuntu-is-not-detecting-my-android-device#answer-644222)을 참고하세요.


### 보드가 시작되지 않거나/부팅루프/먹통이 된 경우

serial 콘솔을 이용해서 보드에 연결이 가능한 경우 다음과 같은 프롬프트를 볼 수 있습니다 :

```
root@linaro-developer:~#
```

fastboot (bootloader) 모드로 들어갑니다:

```
reboot2fastboot
```

만약 serial 콘솔이 가능한 상태가 아니라면, micro USB 케이블을 이용해서 연결합니다:

```
adb wait-for-device && adb reboot bootloader
```

다음으로 보드에 전원이 다시 들어옵니다. 만약 운이 좋으면 adb가 연결되어 보드가 fastboot 모드로 들어가게 해줍니다.

fastboot 모드 상태인지 확인 방법 :

```
fastboot devices
```

일단 fastboot 모드로 들어가면, Android/Linux image를 업데이트하기 위해 [위에 소개한 단계](#upgradingreplacing-the-linux-image)를 시도해 봅니다.

만약 [P2 board](#do-i-have-a-p1-or-p2-board)을 가지고 있다면, Snapdragon을 구동시킬때 복구 이미지로 리셋시킬 수 있습니다. J3라고 쓰여진 옆에 2개 pin을 쇼트시키면서 구동시키면 됩니다.(모통이 구멍과 MicroSD 카드 슬롯 사이에 2개 사각형 pin)

만약 모두다 실패하면 Intrinsync에 도움을 요청해야 합니다.

### 장치에 저장공간이 없는 경우

가끔 `make eagle_default upload`로 업로드가 실패:

```
failed to copy 'px4' to '/home/linaro/px4': No space left on device
```

ramdumps가 디스크를 채우는 경우 발생. 삭제하기 위해 다음 처럼 :
```
rm -rf /var/log/ramdump/*
```

또 log 때문에 공간이 부족할 수 있습니다. 이를 삭제하려면 :

```
rm -rf /root/log/*
```

### Undefined PLT symbol

#### _FDtest

px4 프로그램을 시작할 때, 만약 mini-dm에서 다음 출력을 나오는 경우는 [ADSP 펌웨어 업데이트](#updating-the-adsp-firmware)가 필요하다는 뜻입니다 ::

```
[08500/03]  05:10.960  HAP:45:undefined PLT symbol _FDtest (689) /libpx4muorb_skel.so  0303  symbol.c
```

#### 그 이외

만약 함수를 추가하는 것과 같이 소스를 바꾸면, `undefined PLT symbol ...`가 나오는데 이는 linking에 실패했다는 뜻입니다.

- 여러분이 만든 함수의 선언과 정의가 제대로 매칭되어 있나요?
- 여러분의 코드가 실제로 컴파일이 되나요?
해당 모듈이 [cmake config](https://github.com/PX4/Firmware/blob/master/cmake/configs/qurt_eagle_default.cmake)에서 목록으로 존재하나요?
- `CMakeLists.txt`에 추가한 파일이 들어가 있나요?
- POSIX 빌드에 추가해서 컴파일을 실행합니다. POSIX linker가 compile/linking 시에 linking 에러에 대한 정보를 출력합니다.

### 시작시에 krait update param XXX failed

```
ERROR [platforms__posix__px4_layer] krait update param 297 failed
ERROR [platforms__posix__px4_layer] krait update param 646 failed

px4 starting.
ERROR [muorb] Initialize Error calling the uorb fastrpc initalize method..
ERROR [muorb] ERROR: FastRpcWrapper Not Initialized
```

px4를 시작할 때 위와 같은 에러가 발생하면, 다음을 시도해 보세요.
- [Linux image 업데이트](#upgradingreplacing-the-linux-image)
- [ADSP 펌웨어 업데이트](#updating-the-adsp-firmware)
또 가상머신 대신에 실제 Linux가 설치된 장치에서 시도해봅니다. 가상머신에서 실행하는 경우 동작하지 않는다는 [보고](https://github.com/PX4/Firmware/issues/5303)가 있습니다.
- 다음으로 [px4 소프트웨어를 다시빌드](../setup/building_px4.md#building-px4-software), 먼저 완전히 기존 펌웨어 repo를 삭제하고 reclone을 수행 [여기 참조](../setup/building_px4.md#compiling-on-the-console)
- 그리고 마지막으로 [다시 빌드하고 다시 실행](../setup/building_px4.md#qurt--snapdragon-based-boards)
- `/usr/local/qr-linux/q6-admin.sh`를 실행가능하도록 설정:
  `adb shell chmod +x /usr/local/qr-linux/q6-admin.sh`

### ADSP 재시작

mini-dm 콘솔이 갑자기 INIT 전체 출력을 보여준다면, ADSP 쪽이 crash되었다는 뜻입니다. 이에 대한 원인은 명확하지는 않습니다. 예를 들자면 세그먼트 폴트, null 포인터 예외 상황 등과 같은 상황이 발생했을 수 있습니다.

mini-dm 콘솔 출력은 다음과 같은 형태입니다 :

```
[08500/02]  20:32.332  Process Sensor launched with ID=1   0130  main.c
[08500/02]  20:32.337  mmpm_register: MMPM client for USM ADSP core 12  0117  UltrasoundStreamMgr_Mmpm.cpp
[08500/02]  20:32.338  ADSP License DB: License validation function with id 164678 stored.  0280  adsp_license_db.cpp
[08500/02]  20:32.338  AvsCoreSvc: StartSvcHandler Enter  0518  AdspCoreSvc.cpp
[08500/02]  20:32.338  AdspCoreSvc: Started successfully  0534  AdspCoreSvc.cpp
[08500/02]  20:32.342  DSPS INIT  0191  sns_init_dsps.c
[08500/02]  20:32.342  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.342  Sensors Init : waiting(1)  0160  sns_init_dsps.c
[08500/02]  20:32.342  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.342  THRD CREATE: Thread=0x39 Name(Hex)= 53, 4e, 53, 5f, 53, 4d, 47, 52  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x38 Name(Hex)= 53, 4e, 53, 5f, 53, 41, 4d, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x37 Name(Hex)= 53, 4e, 53, 5f, 53, 43, 4d, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x35 Name(Hex)= 53, 4e, 53, 5f, 50, 4d, 0, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x34 Name(Hex)= 53, 4e, 53, 5f, 53, 53, 4d, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x33 Name(Hex)= 53, 4e, 53, 5f, 44, 45, 42, 55  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  Sensors Init : ///////////init once completed///////////  0169  sns_init_dsps.c
[08500/02]  20:32.342  loading BLSP configuration  0189  blsp_config.c
[08500/02]  20:32.343  Sensors DIAG F3 Trace Buffer Initialized  0260  sns_init_dsps.c
[08500/02]  20:32.345  INIT DONE  0224  sns_init_dsps.c
[00053/03]  20:32.345  Unsupported algorithm service id 0  0953  sns_scm_ext.c
[08500/02]  20:32.346  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.347  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.347  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.546  HAP:159:unable to open the specified file path  0167  file.c
[08500/04]  20:32.546  failed to open /usr/share/data/adsp/blsp.config  0204  blsp_config.c
[08500/04]  20:32.546  QDSP6 Main.c: blsp_config_load() failed  0261  main.c
[08500/02]  20:32.546  Loaded default UART-BAM mapping  0035  blsp_config.c
[08500/02]  20:32.546  UART tty-1: BAM-9  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-2: BAM-6  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-3: BAM-8  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-4: BAM-2  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-5: BAM N/A  0048  blsp_config.c
[08500/02]  20:32.546  UART tty-6: BAM N/A  0048  blsp_config.c
[08500/02]  20:32.547  HAP:111:cannot find /oemconfig.so  0141  load.c
[08500/03]  20:32.547  HAP:4211::error: -1: 0 == dynconfig_init(&conf, "security")   0696  sigverify.c
[08500/02]  20:32.548  HAP:76:cannot find /voiceproc_tx.so  0141  load.c
[08500/02]  20:32.550  HAP:76:cannot find /voiceproc_rx.so  0141  load.c
```

### 내가 가진 보드는 P1 아니면 P2?

Snapdragon에 새겨진 실크스크린이 다음과 같이:

```
1DN14-25-
H9550-P1
REV A
QUALCOMM
```

만약 **H9550** 이 보이면, 여러분이 가지고 있는 보드는 P2 보드입니다!

**-P1이라고 적힌 부분은 무시하세요 **

P1 보드는 팩토리 파티션/이미지가 없으므로 팩토리 상태로 전화이 불가합니다.

# 드라이버 개발

PX4 장치 드라이버는 [장치](https://github.com/PX4/PX4-Autopilot/tree/master/src/lib/drivers/device) 프레임워크를 기반으로 합니다.

## 드라이버 생성

PX4는 [uORB](../middleware/uorb.md)의 데이터를 거의 독점적으로 사용합니다. 일반적인 주변 장치 유형에 대한 드라이버는 올바른 uORB 메시지(예: 자이로, 가속도계, 압력 센서 등)를 게시하여야 합니다.

새 드라이버를 만드는 가장 좋은 방법은 템플릿과 유사한 드라이버로 시작하는 것입니다([src/drivers](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers) 참조).

:::note
특정 I/O 버스 및 센서 작업에 대한 자세한 정보는 [센서 및 액추에이터 버스](../sensor_bus/README.md) 섹션을 참고하십시오.
:::

:::note
올바른 uORB 주제를 게시하는 것은 드라이버가 *준수해야* 하는 유일한 패턴입니다.
:::

## 핵심 아키텍처

PX4 is a [reactive system](../concept/architecture.md) and uses [uORB](../middleware/uorb.md) publish/subscribe to transport messages. File handles are not required or used for the core operation of the system. Two main APIs are used:

* The publish / subscribe system which has a file, network or shared memory backend depending on the system PX4 runs on.
* The global device registry, which can be used to enumerate devices and get/set their configuration. This can be as simple as a linked list or map to the file system.

## Device IDs

PX4 uses device IDs to identify individual sensors consistently across the system. These IDs are stored in the configuration parameters and used to match sensor calibration values, as well as to determine which sensor is logged to which logfile entry.

The order of sensors (e.g. if there is a `/dev/mag0` and an alternate `/dev/mag1`) does not determine priority - the priority is instead stored as part of the published uORB topic.

### Decoding example

For the example of three magnetometers on a system, use the flight log (.px4log) to dump the parameters. The three parameters encode the sensor IDs and `MAG_PRIME` identifies which magnetometer is selected as the primary sensor. Each MAGx_ID is a 24bit number and should be padded left with zeros for manual decoding.


```
CAL_MAG0_ID = 73225.0
CAL_MAG1_ID = 66826.0
CAL_MAG2_ID = 263178.0
CAL_MAG_PRIME = 73225.0
```

This is the external HMC5983 connected via I2C, bus 1 at address `0x1E`: It will show up in the log file as `IMU.MagX`.

```
# device ID 73225 in 24-bit binary:
00000001  00011110  00001 001

# decodes to:
HMC5883   0x1E    bus 1 I2C
```

This is the internal HMC5983 connected via SPI, bus 1, slave select slot 5. It will show up in the log file as `IMU1.MagX`.

```
# device ID 66826 in 24-bit binary:
00000001  00000101  00001 010

# decodes to:
HMC5883   dev 5   bus 1 SPI
```

And this is the internal MPU9250 magnetometer connected via SPI, bus 1, slave select slot 4. It will show up in the log file as `IMU2.MagX`.

```
# device ID 263178 in 24-bit binary:
00000100  00000100  00001 010

#decodes to:
MPU9250   dev 4   bus 1 SPI
```

### Device ID Encoding

The device ID is a 24bit number according to this format. Note that the first fields are the least significant bits in the decoding example above.

```C
struct DeviceStructure {
  enum DeviceBusType bus_type : 3;
  uint8_t bus: 5;    // which instance of the bus type
  uint8_t address;   // address on the bus (eg. I2C address)
  uint8_t devtype;   // device class specific device type
};
```
The `bus_type` is decoded according to:

```C
enum DeviceBusType {
  DeviceBusType_UNKNOWN = 0,
  DeviceBusType_I2C     = 1,
  DeviceBusType_SPI     = 2,
  DeviceBusType_UAVCAN  = 3,
};
```

and `devtype` is decoded according to:

```C
#define DRV_MAG_DEVTYPE_HMC5883  0x01
#define DRV_MAG_DEVTYPE_LSM303D  0x02
#define DRV_MAG_DEVTYPE_ACCELSIM 0x03
#define DRV_MAG_DEVTYPE_MPU9250  0x04
#define DRV_ACC_DEVTYPE_LSM303D  0x11
#define DRV_ACC_DEVTYPE_BMA180   0x12
#define DRV_ACC_DEVTYPE_MPU6000  0x13
#define DRV_ACC_DEVTYPE_ACCELSIM 0x14
#define DRV_ACC_DEVTYPE_GYROSIM  0x15
#define DRV_ACC_DEVTYPE_MPU9250  0x16
#define DRV_GYR_DEVTYPE_MPU6000  0x21
#define DRV_GYR_DEVTYPE_L3GD20   0x22
#define DRV_GYR_DEVTYPE_GYROSIM  0x23
#define DRV_GYR_DEVTYPE_MPU9250  0x24
#define DRV_RNG_DEVTYPE_MB12XX   0x31
#define DRV_RNG_DEVTYPE_LL40LS   0x32
```

## Debugging

For general debugging topics see: [Debugging/Logging](../debug/README.md).

### Verbose Logging

Drivers (and other modules) output minimally verbose logs strings by default (e.g. for `PX4_DEBUG`, `PX4_WARN`, `PX4_ERR`, etc.).

Log verbosity is defined at build time using the `RELEASE_BUILD` (default), `DEBUG_BUILD` (verbose) or `TRACE_BUILD` (extremely verbose) macros.

Change the logging level using `COMPILE_FLAGS` in the driver `px4_add_module` function (**CMakeLists.txt**). The code fragment below shows the required change to enable DEBUG_BUILD level debugging for a single module or driver.

```
px4_add_module(
    MODULE templates__module
    MAIN module
```
```
    COMPILE_FLAGS
        -DDEBUG_BUILD
```
```
    SRCS
        module.cpp
    DEPENDS
        modules__uORB
    )
```

:::tip
Verbose logging can also be enabled on a per-file basis, by adding `#define DEBUG_BUILD` at the very top of a .cpp file (before any includes).
:::

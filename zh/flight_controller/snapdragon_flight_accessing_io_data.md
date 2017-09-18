---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/snapdragon_flight_accessing_io_data.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# 访问I/O数据
可以使用DSPAL（一种类POSIX的API）从运行在aDSP上的代码中访问低级总线数据。 该API的头文件被维护在[github](https://github.com/ATLFlight/dspal)上，并在每个头文件中使用Doxygen格式的文档进行注释。 API的支持说明以及到对应头文件的链接如下所示：

## API总览
* [串口:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_serial.h)
* [I2C:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_i2c.h)
* [SPI:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_spi.h) 
* [GPIO:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_gpio.h)
* 定时器: [qurt_timer.h](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)
* 功率控制: [HAP_power.h](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)

## 源代码示例
用于验证每个DSPAL功能的单元测试代码也展示了如何调用函数。
代码一样托管在[github](https://github.com/ATLFlight/dspal/tree/master/test/dspal_tester)

### 设置串行数据速率
串行API不符合termios的约定——通过tcsetattr()函数设置数据速率，而是使用IOCTL，在上面链接的头文件中有相关描述。

### 定时器
更高级的aDSP操作的其它函数可用qurt_前缀。 例如，定时器函数可用qurt_timer前缀，在[Hexagon SDK](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)中的qurt_timer.h头文件中有相关文档。

### 设置功率级别
使用Hexagon SDK提供的HAP函数，可以设置aDSP的功率级别。这通常会使I/O延迟减少。
有关这些API的更多信息，请参见[Hexagon SDK](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)中的HAP_power.h头文件。


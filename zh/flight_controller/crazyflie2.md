---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/crazyflie2.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# Crazyflie 2.0


Crazyfile系列的微型四轴飞行器是由Bitcraze AB创建的。关于Crazyfile 2(CF2)的概况在[这里](https://www.bitcraze.io/crazyflie-2/)。

![](../../assets/hardware/hardware-crazyflie2.png)

## 简要概括

> 主要的硬件文档在[这里](https://wiki.bitcraze.io/projects:crazyflie2:index):
* 系统主芯片：STM32F405RG
  * CPU: 带单精度FPU的168 MHz ARM Cortex M4
  * RAM: 192KB SRAM
* nRF51822电台和电源管理控制器
* MPU9250加速度计/陀螺仪/磁力计
* LPS25H气压计


## 刷固件

设置好PX4开发环境之后，按照以下步骤可将PX4软件安装到CF2上：

1. 从GitHub上获取PX4 [Bootloader](https://github.com/PX4/Bootloader)的源码

2. 用`make crazyflie_bl`指令进行编译

3. 让CF2进入DFU模式
      - 保证其开始时未上电
      - 按住按键
      - 连接到电脑的USB口
      - 一秒后，蓝色的LED灯应该开始闪烁，五秒后应该闪的更快
      - 松开按键

4. 使用dfu-util刷Bootloader，输入指令

  ```sudo dfu-util -d 0483:df11 -a 0 -s 0x08000000 -D crazyflie_bl.bin```

  完成后断开CF2。
      - 如果成功的话，CF2再次连接时黄色的LED灯应该闪烁

5. 从GitHub上获取PX4 [Firmware](https://github.com/PX4/Firmware)的源码

6. 用`make crazyflie_default upload`指令上传固件

7. 提示接入设备时，连接CF2:黄色的LED灯开始闪烁表明当前处于bootloader模式。然后红色的LED灯被点亮表明烧录过程已经开始了。

8. 等待完成

9. 完成！通过QGC地面站进行校准

## 无线


板载的nRF模块支持通过蓝牙或专有2.4ghz北欧ESB协议连接。

- 推荐使用[Crazyradio PA](https://www.bitcraze.io/crazyradio-pa/)
- 要立即试飞CF2，Crazyfile手机app支持通过蓝牙连接

使用官方的Bitcraze **Crazyflie手机app**
- 通过蓝牙连接
- 在设置中更改模式为1或者2
- 用QGC校准

通过**MAVLink**连接
- 使用Crazyfile PA，外加一个兼容的地面站
- 从[cfbridge](https://github.com/dennisss/cfbridge)中查看如何将支持UDP的地面站连接到接收机上

## 飞行视频

{% raw %}

<video id="my-video" class="video-js" controls preload="auto" width="100%"

poster="../pictures/hardware/crazy.png" data-setup='{"aspectRatio":"16:9"}'>

 <source src="http://7xvob5.com2.z0.glb.qiniucdn.com/Crazyflie%202.0-%20PX4%20Manual%20Stabilized.mp4" type='video/mp4' >

 <p class="vjs-no-js">

 To view this video please enable JavaScript, and consider upgrading to a web browser that

 <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>

 </p>

</video>

{% endraw %}



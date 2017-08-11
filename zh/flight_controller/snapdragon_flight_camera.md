---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/snapdragon_flight_camera.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# 在骁龙飞控上使用相机


骁龙飞控有一个向下的灰度级相机，可以用来实现基于光流的位置自稳；还有一个向前的RGB相机。[snap_cam](https://github.com/PX4/snap_cam) 仓库提供了一种运行和流式传输不同相机以及计算光流的方法。


除了相机外，光流需要一个向下的距离传感器。本页面主要讨论TeraRanger One的使用。

## 光流

光流在应用处理器上计算并通过Mavlink发送给PX4。

根据其自述文件中的说明克隆并编译[snap_cam](https://github.com/PX4/snap_cam)。

在root用户下运行光流应用程序:

```
optical_flow -n 50 -f 30
```


光流应用需要来自PX4的IMU Mavlink消息。 你可能需要通过在`mainapp.config`中添加以下内容，为PX4添加一个额外的Mavlink实例：


```
mavlink start -u 14557 -r 1000000 -t 127.0.0.1 -o 14558
mavlink stream -u 14557 -s HIGHRES_IMU -r 250
```


### 设置TeraRanger One

要将TeraRanger One（THROne）连接到骁龙飞控上，必须使用TROne I2C适配器。 必须使用供应商的I2C固件闪存TROne。

THRO通过定制的DF13 4针至6针接口线连接到骁龙飞控上。我们建议使用连接器J15（USB旁边的那个），因为所有其他的已经在使用（RC，ESCs，GPS）。 接线如下:

| 4 pin | <->  | 6 pin |
| ----- | ---- | ----- |
| 1     |      | 1     |
| 2     |      | 6     |
| 3     |      | 4     |
| 4     |      | 5     |

---
canonicalUrl: https://docs.px4.io/main/zh/ros/offboard_control
---

# Offboard控制

Offboard控制背后的想法是能够使用在自动驾驶仪外运行的软件来控制 PX4 飞控。 这是通过 Mavlink 协议完成的, 特别是 [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 和 [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET) 消息。
:::

Offboard控制背后的想法是能够使用在自动驾驶仪外运行的软件来控制 PX4 飞控。 这是通过 Mavlink 协议完成的, 特别是 [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 和 [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET) 消息。

## Offboard控制固件设置

在进行Offboard开发前，您需要在固件端做两个设置。

### 1. 将遥控开关映射到离板模式激活

要做到这一点， 在 *QGroundControl* 中加载参数，将RC_MAP_OFFB_SW 参数设置为您用来激活Offboard模式的RC 通道 。 该方法会在脱离Offboard模式后进入位置控制模式。

虽然此步骤不是强制性的，因为您可以使用 Mavlink 消息激活Offboard模式。 我们认为这种方法安全多了。

### 2. 启用机载计算机接口

在连接任务计算机的串口上启动MAVLink （参见 [任务计算机](../companion_computer/README.md)）。

## 硬件安装

通常，有三种方式设置Offboard模式通信。

### 串口电台

1. 一端连接飞控的 UART
2. 一端连接地面站电脑

   参考电台包括：
   * [Lairdtech RM024](http://www.lairdtech.com/products/rm024)
   * [Digi International XBee Pro](http://www.digi.com/products/xbee-rf-solutions/modules)

[![流程图：mavlink 通道](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original mermaid graph
graph TD;
  gnd[Ground Station] --MAVLink-- > rad1[Ground Radio];
  rad1 --RadioProtocol-- > rad2[Vehicle Radio];
  rad2 --MAVLink-- > a[Autopilot];
-->

### 板载处理器

在飞行器上部署一台小型将计算机，用 UART 转 USB 适配器连接飞控。 这里有许多可能性，这将取决于您除了向自驾仪发送指令外，还想要做什么样的额外机载处理。

低性能计算机：
* [Odroid C1+](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G143703355573) 或 [Odroid XU4](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G143452239825)
* [Raspberry Pi](https://www.raspberrypi.org/)

高性能计算机：
* [Intel NUC](https://www.intel.com/content/www/us/en/products/details/nuc.html)
* [Gigabyte Brix](https://www.gigabyte.com/Mini-PcBarebone/BRIX)
* [Nvidia Jetson TK1](https://developer.nvidia.com/embedded/jetson-tx2)

[![流程图：机载计算机Mavlink](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original mermaid graph
graph TD;
  comp[Companion Computer] --MAVLink-- > uart[UART Adapter];
  uart --MAVLink-- > Autopilot;
-->

### 板载处理器和 WIFI 链接到 ROS（***推荐***）

部署在飞行器上的小型计算机除了通过 UART - USB 适配器连接到自动驾驶仪外，同时还可通过WiFi连接至运行 ROS 的地面站。 这可以是上述配备了WiFi适配器的任一计算机。

[![流程图：ROS](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgc3ViZ3JhcGggR3JvdW5kICBTdGF0aW9uXG4gIGduZFtST1MgRW5hYmxlZCBDb21wdXRlcl0gLS0tIHFnY1txR3JvdW5kQ29udHJvbF1cbiAgZW5kXG4gIGduZCAtLU1BVkxpbmsvVURQLS0-IHdbV2lGaV07XG4gIHFnYyAtLU1BVkxpbmstLT4gdztcbiAgc3ViZ3JhcGggVmVoaWNsZVxuICBjb21wW0NvbXBhbmlvbiBDb21wdXRlcl0gLS1NQVZMaW5rLS0-IHVhcnRbVUFSVCBBZGFwdGVyXVxuICB1YXJ0IC0tLSBBdXRvcGlsb3RcbiAgZW5kXG4gIHcgLS0tIGNvbXAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgc3ViZ3JhcGggR3JvdW5kICBTdGF0aW9uXG4gIGduZFtST1MgRW5hYmxlZCBDb21wdXRlcl0gLS0tIHFnY1txR3JvdW5kQ29udHJvbF1cbiAgZW5kXG4gIGduZCAtLU1BVkxpbmsvVURQLS0-IHdbV2lGaV07XG4gIHFnYyAtLU1BVkxpbmstLT4gdztcbiAgc3ViZ3JhcGggVmVoaWNsZVxuICBjb21wW0NvbXBhbmlvbiBDb21wdXRlcl0gLS1NQVZMaW5rLS0-IHVhcnRbVUFSVCBBZGFwdGVyXVxuICB1YXJ0IC0tLSBBdXRvcGlsb3RcbiAgZW5kXG4gIHcgLS0tIGNvbXAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)


<!-- original mermaid graph
graph TD
  subgraph Ground  Station
  gnd[ROS Enabled Computer] --- qgc[qGroundControl]
  end
  gnd --MAVLink/UDP-- > w[WiFi];
  qgc --MAVLink-- > w;
  subgraph Vehicle
  comp[Companion Computer] --MAVLink-- > uart[UART Adapter]
  uart --- Autopilot
  end
  w --- comp
-->

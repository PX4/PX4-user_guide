# 离板控制

> **Warning** 使用 [Offboard 模式控制](https://docs.px4.io/en/flight_modes/offboard.html) 无人机是有危险的。 开发者有责任确保在离板飞行前采取充分的准备、测试和安全预防措施。

离板控制背后的想法是能够使用在自动驾驶仪外运行的软件来控制 PX4 飞控。 这是通过 Mavlink 协议完成的, 特别是 [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 和 [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET) 消息。

## 离板控制固件设置

在开始离板开发之前，您需要在固件端做两个安装。

### 1. 将遥控开关映射到离板模式激活

为此，请在 *QGroundControl* 中加载参数，并查找 RC_MAP_OFFB_SW 参数，您可以将要用于激活离板模式的遥控通道分配给该参数。 当你从板外模式进入位置控制，它会是有用的映射方式。

虽然此步骤不是强制性的，因为您可以使用 Mavlink 消息激活非板载模式。 我们认为这种方法安全多了。

### 2. 启用配套的计算机接口

启动串口的 MAVLink ，连接地面站电脑（参见 [地面站电脑设置](../companion_computer/pixhawk_companion.md)）。

## 硬件安装

通常，有三种方式设置离板模式的通信。

### 1. 串口电台

1. 一端连接飞控的 UART
2. 一端连接地面站电脑

参考电台包括：
* [Lairdtech RM024](http://www.lairdtech.com/products/rm024)
* [Digi International XBee Pro](http://www.digi.com/products/xbee-rf-solutions/modules)

[![Mermaid graph: mavlink channel](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original mermaid graph
graph TD;
  gnd[Ground Station] --MAVLink-- > rad1[Ground Radio];
  rad1 --RadioProtocol-- > rad2[Vehicle Radio];
  rad2 --MAVLink-- > a[Autopilot];
-->

### 2. 板载处理器

在飞机上部署一台小型电脑，用 UART 转 USB 适配器连接飞控。 此处有多种可能性，除了向飞控发命令，这取决于你想在板上增加增加怎样的处理。

更高功率设备如：
* [Odroid C1+](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G143703355573) 或 [Odroid XU4](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G143452239825)
* [Raspberry Pi](https://www.raspberrypi.org/)
* [Intel Edison](http://www.intel.com/content/www/us/en/do-it-yourself/edison.html)

{% mermaid %} graph TD; comp[Companion Computer] --MAVLink--> uart[UART Adapter]; uart --MAVLink--> Autopilot; {% endmermaid %}
* [Intel NUC](http://www.intel.com/content/www/us/en/nuc/overview.html)
* [Gigabyte Brix](http://www.gigabyte.com/products/list.aspx?s=47&ck=104)
* [Nvidia Jetson TK1](https://developer.nvidia.com/jetson-tk1)

[![Mermaid diagram: Companion mavlink](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original mermaid graph
graph TD;
  comp[Companion Computer] --MAVLink-- > uart[UART Adapter];
  uart --MAVLink-- > Autopilot;
-->

### 3. 板载处理器和 WIFI 链接到 ROS（***推荐***）

在飞机上部署小型计算机，通过 UART 连接到 USB 适配器连接到自动驾驶仪，同时还具有与运行 ROS 的地面站的 WIFI 连接。 这可以是上述部分中的任何一台计算机，加上 WiFi 适配器。 例如，英特尔 NUC D34010WYB 有一个 PCI 快速半迷你连接器，它可以容纳一个 [Intel wifi 链接 5000 ](http://www.intel.com/products/wireless/adapters/5000/) 适配器。

[![Mermaid graph: ROS](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgc3ViZ3JhcGggR3JvdW5kICBTdGF0aW9uXG4gIGduZFtST1MgRW5hYmxlZCBDb21wdXRlcl0gLS0tIHFnY1txR3JvdW5kQ29udHJvbF1cbiAgZW5kXG4gIGduZCAtLU1BVkxpbmsvVURQLS0-IHdbV2lGaV07XG4gIHFnYyAtLU1BVkxpbmstLT4gdztcbiAgc3ViZ3JhcGggVmVoaWNsZVxuICBjb21wW0NvbXBhbmlvbiBDb21wdXRlcl0gLS1NQVZMaW5rLS0-IHVhcnRbVUFSVCBBZGFwdGVyXVxuICB1YXJ0IC0tLSBBdXRvcGlsb3RcbiAgZW5kXG4gIHcgLS0tIGNvbXAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgc3ViZ3JhcGggR3JvdW5kICBTdGF0aW9uXG4gIGduZFtST1MgRW5hYmxlZCBDb21wdXRlcl0gLS0tIHFnY1txR3JvdW5kQ29udHJvbF1cbiAgZW5kXG4gIGduZCAtLU1BVkxpbmsvVURQLS0-IHdbV2lGaV07XG4gIHFnYyAtLU1BVkxpbmstLT4gdztcbiAgc3ViZ3JhcGggVmVoaWNsZVxuICBjb21wW0NvbXBhbmlvbiBDb21wdXRlcl0gLS1NQVZMaW5rLS0-IHVhcnRbVUFSVCBBZGFwdGVyXVxuICB1YXJ0IC0tLSBBdXRvcGlsb3RcbiAgZW5kXG4gIHcgLS0tIGNvbXAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)


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

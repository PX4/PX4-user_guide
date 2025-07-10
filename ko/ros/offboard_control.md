---
canonicalUrl: https://docs.px4.io/main/ko/ros/offboard_control
---

# 오프보드 제어

:::warning
[오프보드 제어](../flight_modes/offboard.md)는 위험합니다. 오프보드 비행전에 적절한 준비, 테스트 및 안전 예방 조치를 취하여야 합니다.
:::

오프보드 제어의 아이디어는 자동조종장치 외부에서 실행되는 소프트웨어를 사용하여 PX4를 제어하는 것입니다. 이것은 MAVLink 프로토콜, 특히 [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 및 [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET) 메시지를 통하여 수행됩니다.

## 오프보드 제어 펌웨어 설정

오프보드 개발전에 펌웨어에서 두 가지를 설정하여야 합니다.

### RC 스위치를 오프보드 모드 활성화에 매핑

*QGroundControl*에서 매개변수를 로드하고, 오프보드 모드를 활성화 RC 채널을 할당할 수 있는 RC_MAP_OFFB_SW 매개변수를 검색합니다. 오프보드 모드에서 벗어날 때 위치 제어로 이동하는 방식으로 매핑하는 것이 유용할 수 있습니다.

MAVLink 메시지로 오프보드 모드를 활성화할 수 있으므로, 이 단계는 필수는 아닙니다. 이 방법이 훨씬 더 안전합니다.

### 보조 컴퓨터 인터페이스 활성화

보조 컴퓨터에 연결하는 직렬 포트에서 MAVLink를 활성화합니다([보조 컴퓨터 설정](../companion_computer/pixhawk_companion.md) 참조).

## 하드웨어 설정

일반적으로 오프보드 통신을 설정하는 방법에는 세 가지가 있습니다.

### 직렬 라디오

1. 하나는 자동조종장치의 UART 포트에 연결합니다.
2. One connected to a ground station computer

   Example radios include:
   * [Lairdtech RM024](http://www.lairdtech.com/products/rm024)
   * [Digi International XBee Pro](http://www.digi.com/products/xbee-rf-solutions/modules)

[![Mermaid graph: mavlink channel](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original mermaid graph
graph TD;
  gnd[Ground Station] --MAVLink-- > rad1[Ground Radio];
  rad1 --RadioProtocol-- > rad2[Vehicle Radio];
  rad2 --MAVLink-- > a[Autopilot];
-->

### 온보드 프로세서

A small computer mounted onto the vehicle connected to the autopilot through a UART to USB adapter. There are many possibilities here and it will depend on what kind of additional on-board processing you want to do in addition to sending commands to the autopilot.

Small low power examples:
* [Odroid C1+](https://www.hardkernel.com/shop/odroid-c1/) 또는 [Odroid XU4](https://magazine.odroid.com/odroid-xu4)
* [라즈베리파이](https://www.raspberrypi.org/)

몇가지 저전력 보드를 예로 들면:
* [인텔 NUC](https://www.intel.com/content/www/us/en/products/details/nuc.html)
* [Gigabyte Brix](http://www.gigabyte.com/products/list.aspx?s=47&ck=104)
* [Nvidia Jetson TX2](https://developer.nvidia.com/embedded/jetson-tx2)

[![Mermaid diagram: Companion mavlink](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original mermaid graph
graph TD;
  comp[Companion Computer] --MAVLink-- > uart[UART Adapter];
  uart --MAVLink-- > Autopilot;
-->

### 온보드 프로세서 및 ROS에 대한 Wi-Fi 링크(***권장***)

A small computer mounted onto the vehicle connected to the autopilot through a UART to USB adapter while also having a WiFi link to a ground station running ROS. This can be any of the computers from the above section coupled with a WiFi adapter.

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

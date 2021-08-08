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
2. 하나는 지상국 컴퓨터에 연결합니다.

라디오의 예는 다음과 같습니다.
* [Lairdtech RM024](http://www.lairdtech.com/products/rm024)
* [Digi International XBee Pro](http://www.digi.com/products/xbee-rf-solutions/modules)

[![Mermaid 그라프: mavlink 채널](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGduZFtHcm91bmQgU3RhdGlvbl0gLS1NQVZMaW5rLS0-IHJhZDFbR3JvdW5kIFJhZGlvXTtcbiAgcmFkMSAtLVJhZGlvUHJvdG9jb2wtLT4gcmFkMltWZWhpY2xlIFJhZGlvXTtcbiAgcmFkMiAtLU1BVkxpbmstLT4gYVtBdXRvcGlsb3RdOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original mermaid graph
graph TD;
  gnd[Ground Station] --MAVLink-- > rad1[Ground Radio];
  rad1 --RadioProtocol-- > rad2[Vehicle Radio];
  rad2 --MAVLink-- > a[Autopilot];
-->

### 온보드 프로세서

UART-USB 어댑터를 통하여 자동조종장치에 연결된 차량에 장착된 소형 컴퓨터. 여기에는 많은 가능성이 있으며 자동 조종 장치에 명령을 보내는 것 외에 수행하려는 추가 온보드 처리의 종류에 따라 달라집니다.

몇가지 저전력 보드를 예로 들면:
* [Odroid C1+](https://www.hardkernel.com/shop/odroid-c1/) 또는 [Odroid XU4](https://magazine.odroid.com/odroid-xu4)
* [라즈베리파이](https://www.raspberrypi.org/)
* [인텔 에디슨](http://www.intel.com/content/www/us/en/do-it-yourself/edison.html)

고 전력 보드를 예로 들면:
* [인텔 NUC](http://www.intel.com/content/www/us/en/nuc/overview.html)
* [Gigabyte Brix](http://www.gigabyte.com/products/list.aspx?s=47&ck=104)
* [Nvidia Jetson TX2](https://developer.nvidia.com/embedded/jetson-tx2)

[![Mermaid 다이어그램: Companion mavlink](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGNvbXBbQ29tcGFuaW9uIENvbXB1dGVyXSAtLU1BVkxpbmstLT4gdWFydFtVQVJUIEFkYXB0ZXJdO1xuICB1YXJ0IC0tTUFWTGluay0tPiBBdXRvcGlsb3Q7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original mermaid graph
graph TD;
  comp[Companion Computer] --MAVLink-- > uart[UART Adapter];
  uart --MAVLink-- > Autopilot;
-->

### 온보드 프로세서 및 ROS에 대한 Wi-Fi 링크(***권장***)

UART-USB 어댑터로 자동조종장치에 연결된 차량에 장착된 소형 컴퓨터와 함께 ROS를 실행하는 지상국에 대한 WiFi 링크가 있습니다. WiFi 어댑터와 결합된 위 섹션의 컴퓨터 중 하나일 수 있습니다. 예를 들어, Intel NUC D34010WYB에는 [Intel Wifi Link 5000](http://www.intel.com/products/wireless/adapters/5000/) 어댑터를 수용할 수 있는 PCI Express Half-Mini 커넥터가 있습니다.

[![Mermaid 그라프: ROS](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgc3ViZ3JhcGggR3JvdW5kICBTdGF0aW9uXG4gIGduZFtST1MgRW5hYmxlZCBDb21wdXRlcl0gLS0tIHFnY1txR3JvdW5kQ29udHJvbF1cbiAgZW5kXG4gIGduZCAtLU1BVkxpbmsvVURQLS0-IHdbV2lGaV07XG4gIHFnYyAtLU1BVkxpbmstLT4gdztcbiAgc3ViZ3JhcGggVmVoaWNsZVxuICBjb21wW0NvbXBhbmlvbiBDb21wdXRlcl0gLS1NQVZMaW5rLS0-IHVhcnRbVUFSVCBBZGFwdGVyXVxuICB1YXJ0IC0tLSBBdXRvcGlsb3RcbiAgZW5kXG4gIHcgLS0tIGNvbXAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgc3ViZ3JhcGggR3JvdW5kICBTdGF0aW9uXG4gIGduZFtST1MgRW5hYmxlZCBDb21wdXRlcl0gLS0tIHFnY1txR3JvdW5kQ29udHJvbF1cbiAgZW5kXG4gIGduZCAtLU1BVkxpbmsvVURQLS0-IHdbV2lGaV07XG4gIHFnYyAtLU1BVkxpbmstLT4gdztcbiAgc3ViZ3JhcGggVmVoaWNsZVxuICBjb21wW0NvbXBhbmlvbiBDb21wdXRlcl0gLS1NQVZMaW5rLS0-IHVhcnRbVUFSVCBBZGFwdGVyXVxuICB1YXJ0IC0tLSBBdXRvcGlsb3RcbiAgZW5kXG4gIHcgLS0tIGNvbXAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)


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

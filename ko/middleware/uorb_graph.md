# uORB Pub/Sub 그래프

모듈들간의 통신을 보여주는 uORB Pub/Sub 그래프를 제공합니다. It is based on information that is extracted directly from the source code. 사용 명령어는 [아래](#graph-properties)을 참고하십시오.


<iframe :src="withBase('/middleware/index.html')" frameborder="0" width="1300" height="1450px" style="text-align: center; margin-left: 0px; margin-right: 0px;"></iframe>

<script setup>
import { withBase } from 'vitepress';
</script>

## 그래프 속성

그래프는 다음과 같은 특성을 갖고 있습니다.

- 모듈은 모서리가 둥근 회색으로 표시되는 반면 주제는 색상이 지정된 직사각형 상자로 표시됩니다.
- 연관있는 모듈과 토픽들은 선으로 연결됩니다. Dashed lines indicate that the module publishes the topic, solid lines indicate that the module subscribes to the topic, while dot-dashed lines indicate that the module both publishes and subscribes to the topic.
- 몇개의 모듈과 토픽들은 제외합니다.
  - 많은 모듈에서 구독/게시한 주제: `parameter_update`, `mavlink_log` 및 `log_message`.
  - 기록되는 토픽들의 집합.
  - 퍼블리셔나 섭스크라이버가 없는 토픽들.
  - **src/examples**에 있는 모듈들.
- 모듈이나 토픽에 마우스 오버시 그것에 연결된 모든 것이 강조됩니다.
- 토픽을 더블클릭해 오픈하면 메시지 정의가 보여집니다.
- 브라우저 창이 전체 그래프를 표시할 수 있을 만큼 충분히 넓은지 확인합니다(사이드바 메뉴는 왼쪽 상단 모서리에 있는 아이콘으로 숨길 수 있음). 이미지를 줌으로 확대할 수도 있습니다.
- *프리셋* 선택 리스트에 보여지는 모듈 리스트들은 수정가능합니다.
- *Search* 박스는 특정 모듈이나 토픽들을 찾기위해 사용할 수 있습니다(회색으로 된 토픽들은 선택되지 않습니다).


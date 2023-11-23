# 번역

We'd love your help to translate _QGroundControl_, PX4 Metadata (in QGC), and our guides for PX4, _QGroundControl_ and MAVLink!

Our docs (and _QGroundControl_) use the [Crowdin](https://crowdin.com) online tool for translation. Crowdin은 Github에서 원본 문서를 가져와서 번역하고 검토(승인)할 문서들을  편집할 수 있습니다.

Crowdin은 "풀 요청"(이 단계에서 개발팀이 주기적으로 검토하고 승인해줍니다) 방식으로 Github에 번역한 문서를 내보냅니다. 내보낸 출력물에는 번역한 원본 문서와 번역한 문자열로 바뀌어 승인한 텍스트가 들어있습니다(예: 문자열을 번역하지 않았거나 바꾸지 않았다면, 영문으로 그대로 나타냅니다).

:::tip
번역 팀에 참여하려면 (무료) [Crowdin 계정](https://crowdin.com/join) 이 필요합니다!
:::

:::note
이 시스템의 장점은 번역이 원본 문서에 근접하게 따라갑니다.
독자 입장에서는 오래되어 때가 지난 번역을 보고 오해할 일이 없습니다.
:::

## 시작하기

번역 팀에 참여하는 방법은 다음과 같습니다:

1. crowdin에 가입: [https://crowdin.com/join](https://crowdin.com/join)
1. 참여를 원하는 번역 프로젝트를 엽니다:
   - [QGroundControl](https://crowdin.com/project/qgroundcontrol) — QGroundControl UI and hard coded strings.
   - [PX4-Metadata-Translations](https://crowdin.com/project/px4-metadata-translations) — PX4 parameter and event descriptions in QGroundControl.
   - [QGroundControl 개발 안내서](https://crowdin.com/project/qgroundcontrol-developer-guide)
   - [QGroundControl 사용 안내서](https://crowdin.com/project/qgroundcontrol-user-guide)
   - [MAVLink 안내서](https://crowdin.com/project/mavlink)
   - [MAVLink Guide](https://crowdin.com/project/mavlink)
1. 번역하려는 언어를 선택합니다
1. Click the **Join** button (next to the text _You must join the translators team to be able to participate in this project_)

   :::note
 You will be notified once your application to join is accepted.

:::

1. 번역을 시작하세요!

## 별도 참고

### 접두문을 수정하지 마십시오.

Vuepress에서는 참고, 팁, 경고 시작 부분에 `:::` 표시를 사용합니다:

```html
:::tip
The text for the tip.
:::
```

`:::tip` 또는 `:::warning` 등의 문구는 참고 상자의 색상을 정의하는 부분이므로, 수정하시면 안됩니다.

## 새로운 언어 추가

번역 대상 언어가 없으면, 프로젝트 관리자에게 요청하십시오.(각 프로젝트 홈페이지에 연락처 링크가 있음).

:::warning
번역 작업은 어렵습니다.
새로운 언어 번역을 요청하기 전에, 번역을 도와줄 다른 사람이 있는지 찾아보십시오.
:::

## 도움 받기

The _Crowdin_ interface is self explanatory, but there is plenty of additional information on the [knowledgeable](https://support.crowdin.com/).

[지원 채널](../contribute/support.md)을 통하여 드론코드 커뮤니티의 번역자와 개발자에게 도움을 요청할 수 있습니다.

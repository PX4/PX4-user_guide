---
canonicalUrl: https://docs.px4.io/main/ko/contribute/translation
---

# 번역

*QGroundControl* 프로그램과 PX4, *QGroundControl*, MAVLink 안내서 번역 도움을 간절히 바랍니다!

문서 (와 *QGroundControl* 프로그램)는 [Crowdin](https://crowdin.com) 을 번역 도구로 활용합니다. Crowdin은 Github에서 원본 주제를 자동으로 가져와서 번역하고 검토(승인)할 새 문자열 또는 바뀐 문자열을 보여줍니다.

Crowdin은 "풀 리퀘스트"(이 단계에서 개발팀이 주기적으로 검토하고 승인해줍니다) 방식으로 Github에 번역한 문서를 내보냅니다. 내보낸 출력물에는 번역한 원본 문서와 번역한 문자열로 바뀌어 승인한 텍스트가 들어있습니다(예: 문자열을 번역하지 않았거나 바꾸지 않았다면, 영문으로 그대로 나타냅니다).

:::tip
번역 팀에 참여하려면 (무료) [Crowdin 계정](https://crowdin.com/join) 이 필요합니다!
:::

:::note
이 시스템의 장점은 번역이 원본 문서에 근접하게 따라갑니다. 독자 입장에서는 오래되어 때가 지난 번역을 보고 오해할 일이 없습니다.
:::


## 시작하기

번역 팀에 참여하는 방법은 다음과 같습니다:
1. crowdin에 가입: [https://crowdin.com/join](https://crowdin.com/join)
1. 참여를 원하는 번역 프로젝트를 엽니다:
   - [QGroundControl](https://crowdin.com/project/qgroundcontrol)
   - [PX4 사용자 안내서](https://crowdin.com/project/px4-user-guide)
   - [QGroundControl 개발자 안내서](https://crowdin.com/project/qgroundcontrol-developer-guide)
   - [QGroundControl 사용자 안내서](https://crowdin.com/project/qgroundcontrol-user-guide)
   - [MAVLink 안내서](https://crowdin.com/project/mavlink)
1. 번역하려는 언어를 선택합니다
1. **Join** 단추를 누릅니다(*You must join the translators team to be able to participate in this project* 옆에 있음) :::note 참여 신청 승인을 받으면 알림이 옵니다.
:::
1. 번역을 시작하세요!

## 별도 참고

### 접두문을 수정하지 마세요

Vuepress에서는 참고, 팁, 경고 시작 부분에 `:::` 표시를 사용합니다:
```html
:::tip
팁 안내문입니다.
:::
```
`:::tip` 또는 `:::warning` 등의 문구는 참고 상자의 색상을 정의하는 부분이므로 수정햐시면 안됩니다.

## 새 언어 추가

번역하고자 하는 언어가 없다면 프로젝트 관리자와 연락하여 요청해야합니다.(각 프로젝트 홈페이지에 연락처 링크가 있음).

:::warning
번역 관리는 어렵습니다! 새 언어 생성을 요청하기 전, 번역을 도와줄 다른 사람이 있는지 찾아보십시오!
:::


## 도움 받기

*Crowdin* 인터페이스는 자체적으로 설명이 잘 붙어있지만, 상당한 분량의 [풍부한](https://support.crowdin.com/) 추가 정보가 있으며, [피드백 도구](https://crowdin.uservoice.com/forums/31787-collaborative-translation-tool)도 제공합니다.

[지원 채널](../contribute/support.md)을 통해 드론코드 커뮤니티의 번역자와 개발자에게 도움을 요청할 수도 있습니다.

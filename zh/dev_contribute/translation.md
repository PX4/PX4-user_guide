# 参与翻译

We'd love your help to translate *QGroundControl*, and our guides for PX4, *QGroundControl* and MAVLink!

Our docs (and *QGroundControl*) use the [Crowdin](https://crowdin.com) online tool for translation. Crowdin automatically imports source topics from Github and presents new and changed strings for translation and/or review (approval). Crowdin automatically imports source topics from Github and presents new and changed strings for translation and/or review (approval).

Crowdin exports the translated documents back out to Github as a "Pull Request" (which the development team periodically review and accept). The exported output contains the source document with any translated and approved text replaced with translated strings (i.e. if a string is not translated/is changed, then it will be displayed in English). The exported output contains the source document with any translated and approved text replaced with translated strings (i.e. if a string is not translated/is changed, then it will be displayed in English).

> **Tip** You will need a (free) [Crowdin account](https://crowdin.com/join) account to join the translation team!

<span></span>
> **Note** The benefit of this system is that the translation closely tracks the source documents. Readers will not be mislead by old and out of date translations. Readers will not be mislead by old and out of date translations.


## 由此开始

The steps to join our translation tream are:
1. 注册 Crowdin：https://crowdin.com/join
1. 打开要加入的翻译项目：
   - [QGroundControl](https://crowdin.com/project/qgroundcontrol)
   - [PX4 用户手册](https://crowdin.com/project/px4-user-guide)
   - [PX4 开发人员指南](https://crowdin.com/project/px4-developer-guide)
   - [QGroundControl 开发人员指南](https://crowdin.com/project/qgroundcontrol-developer-guide)
   - [QGroundControl 用户指南](https://crowdin.com/project/qgroundcontrol-user-guide)
   - [MAVLink 指南](https://crowdin.com/project/mavlink)
1. Select the language you want to translate
1. Click the **Join** button (next to the text *You must join the translators team to be able to participate in this project*) > **Note** You will be notified once your application to join is accepted.

   > **Note** You will be notified once your application to join is accepted.
1. Start translating!

## 特别注意事项

### 不要修改句首的 Note, Tip, Warning 字样

Gitbook uses special prefix text to indicate Notes, Tips and Warnings (e.g. `> **Note**`, `> **Tip**`, `> **Warning**`). This is displayed in Crowdin as shown: This is displayed in Crowdin as shown:
```html
&lt;0&gt;Note&lt;/0&gt; note的文本。
```

It is important that you do not translate the text inside the `<0>Note</0>` tags as this will stop the note from rendering properly.


## 添加新语言

If the language you want to translate is not presented as an option on the project home page then you will need to request it.

You can do this by contacting the project owner (there is a contact link on each project's home page).

## 获取帮助

The *Crowdin* interface is self explanatory, but there is plenty of additional information on the [knowledgeable](https://support.crowdin.com/) and [feedback tool](https://crowdin.uservoice.com/forums/31787-collaborative-translation-tool).

You can also ask for help from translators and developers in the Dronecode community using [our support channels](../README.md#support).

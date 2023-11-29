# 参与翻译

We'd love your help to translate _QGroundControl_, PX4 Metadata (in QGC), and our guides for PX4, _QGroundControl_ and MAVLink!

Our docs (and _QGroundControl_) use the [Crowdin](https://crowdin.com) online tool for translation. Crowdin automatically imports source topics from Github and presents new and changed strings for translation and/or review (approval).

Crowdin exports the translated documents back out to Github as a "Pull Request" (which the development team periodically review and accept). The exported output contains the source document with any translated and approved text replaced with translated strings (i.e. if a string is not translated/is changed, then it will be displayed in English). The exported output contains the source document with any translated and approved text replaced with translated strings (i.e. if a string is not translated/is changed, then it will be displayed in English).

:::tip
You will need a (free) [Crowdin account](https://crowdin.com/join) account to join the translation team!
:::

Gitbook uses special prefix text to indicate Notes, Tips and Warnings (e.g. `> **Note**`, `> **Tip**`, `> **Warning**`). This is displayed in Crowdin as shown: Readers will not be mislead by old and out of date translations.
:::

## 由此开始

The steps to join our translation tream are:

1. 注册 Crowdin：https://crowdin.com/join
1. 打开要加入的翻译项目：
   - [QGroundControl](https://crowdin.com/project/qgroundcontrol) — QGroundControl UI and hard coded strings.
   - [PX4-Metadata-Translations](https://crowdin.com/project/px4-metadata-translations) — PX4 parameter and event descriptions in QGroundControl.
   - [PX4 开发人员指南](https://crowdin.com/project/px4-user-guide)
   - [QGroundControl 开发人员指南](https://crowdin.com/project/qgroundcontrol-developer-guide)
   - [QGroundControl 用户指南](https://crowdin.com/project/qgroundcontrol-user-guide)
   - [MAVLink Guide](https://crowdin.com/project/mavlink)
1. Select the language you want to translate
1. Click the **Join** button (next to the text _You must join the translators team to be able to participate in this project_)

   :::note
 You will be notified once your application to join is accepted.

:::

1. Start translating!

## 特别注意事项

### 不要修改句首的 Note, Tip, Warning 字样

Vuepress uses `:::` to mark the beginning of notes, tips and warning:

```html
:::tip
The text for the tip.
:::
```

The text for `:::tip` or `:::warning` etc. should not be modified as it defines the colour of the notebox.

## 添加新语言

If the language you want to translate is not available then you will need to request it by contacting the project owner (there is a contact link on each project's home page).

:::warning
Maintaining a translation is hard!
Before you ask us to create a new language, please find a few other people to help you translate!
:::

## 获取帮助

The _Crowdin_ interface is self explanatory, but there is plenty of additional information on the [knowledgeable](https://support.crowdin.com/).

You can also ask for help from translators and developers in the Dronecode community using [our support channels](../contribute/support.md).

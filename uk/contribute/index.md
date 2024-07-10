# Спільнота

<script setup>
import { useData } from 'vitepress'
const { site } = useData();
</script>

<div v-if="site.title !== 'PX4 Guide (main)'">
  <div class="custom-block danger">
    <p class="custom-block-title">Ця сторінка може бути застарілою. <a href="https://docs.px4.io/main/en/contribute/">Переглянути останню версію</a>.</p>
  </div>
</div>

Ласкаво просимо до Спільноти PX4!

:::tip
Ми зобов’язуємося дотримуватися [кодексу поведінки PX4](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/CODE_OF_CONDUCT.md), спрямованого на створення відкритого та доброзичливого середовища.
:::

Цей розділ містить інформацію про те, як ви можете зустрітися зі спільнотою та зробити внесок до PX4:

- [Дзвінок розробникам](../contribute/dev_call.md) – обговоріть архітектуру, pull requests, вплив на проблеми з командою розробників
- [Підтримка](../contribute/support.md) - Отримайте допомогу та вирішіть питання
- [Керування вихідним кодом](../contribute/code.md) - робота з кодом PX4
- [Документація](../contribute/docs.md) - вдосконалення документів
- [Переклад](../contribute/translation.md) – перекладайте за допомогою Crowdin
- [Terminology/Notation](../contribute/notation.md) - Умови та символи, які використовуються в документації
- [Ліцензії](../contribute/licenses.md) - Ліцензування PX4 і Pixhawk

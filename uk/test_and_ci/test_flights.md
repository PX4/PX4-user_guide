# Польотні тести

<script setup>
import { useData } from 'vitepress'
const { site } = useData();
</script>

<div v-if="site.title !== 'PX4 Guide (main)'">
  <div class="custom-block danger">
    <p class="custom-block-title">This page may be out out of date. <a href="https://docs.px4.io/main/en/test_and_ci/test_flights.html">See the latest version</a>.</p>
  </div>
</div>

Тестові польоти є важливим етапом для забезпечення якості.

Під час надсилання запитів на включення [Pull Requests](../contribute/code.md#pull-requests) нових функцій або виправлення помилок ви повинні надати інформацію про виконані тести, пов'язані з функціональністю, разом з супровідними логами польотів.

Для значних змін у системі ви також повинні виконати загальні польотні тести за допомогою тестових карток, перерахованих нижче.

## Тестові картки

Ці тестові картки визначають "стандартні" польотні тести. Їх виконує тестова команда в рамках тестування випуску та для більш значних змін у системі.

- [MC_01 - Ручні режими](../test_cards/mc_01_manual_modes.md)
- [MC_02 - Повна автономія](../test_cards/mc_02_full_autonomous.md)
- [MC_03 - Автоматичне керування з ручним керуванням](../test_cards/mc_03_auto_manual_mix.md)
- [MC_04 - Тестування аварійного випадку](../test_cards/mc_04_failsafe_testing.md)
- [MC_05 - Польот у приміщенні (Ручні режими)](../test_cards/mc_05_indoor_flight_manual_modes.md)

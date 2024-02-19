# Тест MC_03 - поєднання автоматичного і ручного керування

## Створити та завантажити місію

Критерії Місії

&nbsp;&nbsp;&nbsp;&nbsp;Зміни у висоті протягом місії

&nbsp;&nbsp;&nbsp;&nbsp;Місія повинна закінчитись в повітрі і НЕ на землі/RTL

&nbsp;&nbsp;&nbsp;&nbsp;Тривалість від 3 до 4 хвилин

Завантаження місії на машину за допомогою QGroundControl

## Політ

❏ Arm and take-off in Position mode

Авто Залучення

Спостереження відстеження та поворот

❏ Once mission has completed, switch back to Position mode

&nbsp;&nbsp;&nbsp;&nbsp;Горизонтальна позиція повинна містити поточне значення з ручкою в центрі

&nbsp;&nbsp;&nbsp;&nbsp;Вертикальна позиція повинна містити поточне значення з ручкою в центрі

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

&nbsp;&nbsp;&nbsp;&nbsp;Pitch/Roll/Yaw відповідь встановлена на відмітку/Roll/Yaw

Залучення RTL

Після торкання землі коптер повинен автоматично роззброїтись протягом 2 секунд (час роззброєння встановлюється параметром: COM_DISARM_LAND)

## Очікувані результати

- Take-off should be smooth as throttle is raised
- Немає коливання в жодному з перерахованих режимів польоту
- Після посадки, коптер не повинен підскакувати на землі

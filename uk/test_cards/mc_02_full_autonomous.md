# Тест MC_02 - Повна автономність

## Створити та завантажити місію

Критерії Місії

&nbsp;&nbsp;&nbsp;&nbsp;Включити автозняття

&nbsp;&nbsp;&nbsp;&nbsp;Зміни у висоті протягом місії

&nbsp;&nbsp;&nbsp;&nbsp;Встановіть значення на перший маршрут в режимі очікування

&nbsp;&nbsp;&nbsp;&nbsp;❏ Enable Mission End RTL

&nbsp;&nbsp;&nbsp;&nbsp;Тривалість від 5 до 6 хвилин

Відправка даних на автомобіль за допомогою QGroundControl

## Arm and Take-off

❏ Arm in any manual mode

❏ Engage Auto to trigger take-off

Спостереження відстеження, поворот і належна продуктивність RTL

Після торкання землі коптер повинен автоматично роззброїтись протягом 2 секунд (час роззброєння встановлюється параметром: COM_DISARM_LAND)

## Очікувані результати

- Take-off should be smooth as throttle is raised
- Місія має бути завантажена при першій спробі
- Vehicle should automatically take-off upon engaging Auto
- Після посадки, коптер не повинен підскакувати на землі


<!--
MC_002 - Full autonomous

-   Make sure the auto-disarm is enabled
-   QGC open test1_mission.plan and sync to the vehicle
-   Takeoff from QGC start mission slider
-   Check the vehicle completes the mission
-   Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-   Check the vehicle disarms by itself.
-->

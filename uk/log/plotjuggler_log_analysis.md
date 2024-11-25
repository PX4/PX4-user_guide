# Аналіз журналу за допомогою PlotJuggler

[PlotJuggler](https://github.com/facontidavide/PlotJuggler) can be used to analyze ULogs for in-depth, development purposes.
Це надзвичайно корисно, оскільки кожна тема uORB відкрита / може бути побудована на графіку, а також має власні функції для зміни даних (наприклад, зі значень кватерніону на Крен / Тангаж / Риштування).

## Встановлення

You can find the latest releases of the Plot Juggler [here](https://github.com/facontidavide/PlotJuggler/releases).

#### Примітки щодо розподілу Windows

Остання версія PlotJuggler для Windows може не працювати.
In this case fallback to [v2.8.4 here](https://github.com/facontidavide/PlotJuggler/releases/tag/2.8.4) (this is known to work with Windows).

#### Примітки про AppImage для дистрибутивів Linux

Якщо завантажений AppImage не відкривається, можливо, вам потрібно змінити його налаштування доступу.
Це робиться в терміналі за допомогою наступної команди:

```sh
chmod 777 <Path-To-PlotJuggler-AppImage>
```

## Загальне використання

Два найпоширеніші завдання - "Пошук" залогованої теми уORB та "Перетягування та Відпускання" поля в певну тему на графічний вигляд.
Це показано на діаграмі нижче.

![Plot Juggler basic usage](../../assets/flight_log_analysis/plot_juggler/plotjuggler_timeseries_search_and_drop.svg)

### Розбиття по горизонталі / вертикалі: Багатопанельний

Одна з найбільш потужних функцій - розділення екрану у горизонтальному або вертикальному положенні та відображення різних графіків одночасно (з синхронізованою панеллю часу зверху, якщо переміщуєте курсор часу внизу).

Це показано на анімації нижче:

![Plot Juggler Multi panel demonstration](../../assets/flight_log_analysis/plot_juggler/plotjuggler_dragdrop_multipanel.gif)

In this example, `vehicle_local_position` topic's `ax`, `ay` and `az` (Acceleration estimate) components were graphed first by splitting the screen in 3 sections.
Then, the `vz` (Velocity estimate) component was added under right pane, and finally `battery_status` topic's `current_a` (Battery current) was graphed in the lower-mid pane.

Хоча спочатку це не очевидно, ви можете помітити, що кожного разу, коли автомобіль починає рухатися (значення поточного заряду батареї зростає), значення прискорення та швидкості також починають змінюватися.
Це тому, що всі дані відображаються як часова послідовність, яка показує кожне значення на певному міткостемпу.

Це корисно для отримання загального уявлення про те, що сталося і чому.
Часто важко вирішувати проблеми, просто глянувши на один графік, але якщо відображені кілька графіків, набагато легше зрозуміти, що відбувалося в системі.

### Відображення даних у 2D

Іншою потужною функцією є можливість відображення 2D даних на площині XY (кожні дані на вісі X, Y) у вигляді діаграми розсіювання.
This is done by selecting two data points by holding `Ctrl` key while selecting each of them (e.g. `vehicle_local_position` topic's `x` and `y` components), and drag & dropping it with the `Right mouse cursor` pressed.

![Plot Juggler 2D graphing](../../assets/flight_log_analysis/plot_juggler/plotjuggler_2d_graph.gif)

In this example, the estimated vehicle's position in local coordinate frame is graphed onto a XY-plane which shows a 2D view of the estimated position, and the `vx` and `vy` components (Velocity estimate) are graphed on the right, with the `vz` (Vertical velocity estimate) graphed underneath it in a split view.

Це в свою чергу показує взаємозв'язок між позицією та швидкістю руху транспортного засобу інтуїтивно.
For example, note how when the vehicle moves in the X-axis direction, the `vx` value goes high, and as the vehicle turns to the Y-axis direction, the `vy` value starts to change as well.

#### Використання кнопки 'Play'

Here the **Play** button is used to play the recorded data in real time (speed factor can be adjusted in the lower-right corner).
Це показує детально зв'язок позиції / швидкості, описаний вище.

![Plot Juggler 2D in-depth analysis](../../assets/flight_log_analysis/plot_juggler/plotjuggler_2d_graph_pos_vel_analysis.gif)

:::info
Try out the boat testing log analysis yourself by downloading the ULog and Layout file used above!

- [Boat testing ULog](https://github.com/PX4/PX4-user_guide/raw/main/assets/flight_log_analysis/plot_juggler/sample_log_boat_testing_2022-7-28-13-31-16.ulg)
- [Boat testing Analysis Layout](https://raw.githubusercontent.com/PX4/PX4-user_guide/main/assets/flight_log_analysis/plot_juggler/sample_log_boat_testing_layout.xml)

:::

### Шаблони макетів

Існує кілька файлів розташування PlotJuggler, якими діляться розробники PX4.
Кожен може бути використаний для конкретної мети (настройка багтрекера, настройка VTOL, налагодження човна і т. Д.):

- [Sample View layout](https://github.com/PX4/PX4-user_guide/blob/main/assets/flight_log_analysis/plot_juggler/plotjuggler_sample_view.xml) : Template used in the [Multi-panel example](#splitting-horizontally-vertically-multi-panel) above.

## Розширене використання

### Створення власних часових рядів за допомогою LUA скрипта

Plot Juggler підтримує використання LUA скриптів для обробки та відображення даних.
Це потужна функція, яка може робити такі речі, як інтегрування кривої, усереднювання двох кривих, видалення зміщень та інше.

#### Розрахунок кута крену/тангажу/риск з кватеріону

![Quaternion to Roll using Lua script](../../assets/flight_log_analysis/plot_juggler/plotjuggler_quaternion_to_roll_lua_script.png)

To know vehicle's attitude, PX4 logs the estimated attitude's quaternion in the `vehicle_attitude` topic in an array of floating point values (q[4]).
Since these values don't give contextual information (e.g. `roll`), it needs a transformation involving trigonometric functions.

1. Search for `vehicle_attitude` topic in Timeseries List panel on the left
2. Select 4 quaternion members (`q.00, q.01, q.02, q.03`) by clicking `q.00` first, then holding Shift + clicking `q.03`. Вони всі повинні бути вибрані
3. Клацніть на символ '+' у нижньому лівому розділі 'Користувацькі серії', щоб створити нову серію
4. Виберіть ще 4 члени кватерніона та перетягніть їх на вкладку 'Вхідний часовий ряд + Додатковий джереловий часовий ряд' у верхньому лівому куті
5. Double click on the `quat_to_roll` from the Function Library. Тепер ви маєте сюжет на верхній секції
6. Assign the name for the plot (e.g. `roll`) in the text box in upper-right corner
7. Клацніть 'Створити нову часову послідовність'. Тепер ви маєте сюжет у 'Спеціальній серії'

Here the custom series `Roll` is displayed along with other timeseries, including it's original form in Quaternion on the right, which is not human-readable (using PlotJuggler 3.5.0):

![Quaternion Roll plotted](../../assets/flight_log_analysis/plot_juggler/plotjuggler_quaternion_roll_plotted.png)

The `quat_to_roll` function looks like this:

```lua
w = value
x = v1
y = v2
z = v3

dcm21 = 2 * (w * x + y * z)
dcm22 = w*w - x*x - y*y + z*z

roll = math.atan(dcm21, dcm22)

return roll
```

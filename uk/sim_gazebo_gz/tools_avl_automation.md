# Інструмент автоматизації плагіну "Advanced Lift Drag" (AVL)

Модель рухомого засобу Gazebo [Поліпшений літак](../sim_gazebo_gz/vehicles.md#advanced-plane) використовує плагін _Advanced Lift Drag_ для моделювання поведінки піднімної сили та аеродинамічного опору рухомого засобу.
Цей інструмент дозволяє вам розрахувати параметри, необхідні для створення плагіну _Advanced Lift Drag_ для вашого певного рухомого засобу.

Вам  лише потрібно надати кілька параметрів для кожного крила, а інструмент використовуватиме цю інформацію для виклику моделі решітки вихрів "Athena" (Athena Lattice Vortex або AVL) для здійснення необхідних обчислень.
Результати будуть автоматично записані у шаблон плагіну, який потім можна скопіювати у файл моделі або sdf-файл світу.

## Встановлення

Щоб налаштувати інструмент:

1. Завантажте AVL 3.36 з https://web.mit.edu/drela/Public/web/avl/.
   Файл AVL для версії 3.36 можна знайти приблизно посередині сторінки.

2. Після завантаження розпакуйте AVL та перемістіть його в домашню директорію за допомогою:

   ```sh
   sudo tar -xf avl3.36.tgz
   mv ./Avl /home/
   ```

3. Дотримуйтесь **index.md**, що знаходиться у `./Avl` щоб завершити процес встановлення AVL (вимагає встановлення бібліотек `plotlib` та `eispack`).
   Ми рекомендуємо використовувати варіант компіляції "gfortran", який може далі вимагати, щоб ви встановили "gfortran".
   На Ubuntu це можна зробити виконавши:

   ```sh
   sudo apt update
   sudo apt install gfortran
   ```

   При запуску Makefile для AVL, ви можливо зіткнетесь з повідомленням `Error 1`, яке стверджує що відсутня якась директорія.
   Це не завадить AVL працювати для нашої мети.

Як тільки процес, описаний в AVL README буде завершений, AVL готовий до використання.
Зі сторони AVL та інструменту більше ніяких налаштувань не потрібно.

Якщо хочете змінити положення директорії AVL, це можна просто зробити передавши прапорець `--avl_path` до файлу `input_avl.py` та використавши бажану директорію для прапора (не забудьте додати "/" в останній частині шляху).
Запуск в такому вигляді також автоматично налаштує шляхі де необхідно.

## Запуск AVL

Зразковий шаблон наданий у вигляді `input.yml`, який реалізує стандартний літак з двома елеронами, рулем висоти та стерном.
Цей приклад може бути запущений так: `python input_avl.py --yaml_file input.yml`.

Для запуску інструмента для вашого літака:

1. Скопіюйте приклад `input.yml` до `<your_custom_yaml_file>.yml` і змініть його, щоб підставити бажаний літак

2. Запустіть інструмент на вашому yml-файлі:

   ```sh
   python input_avl.py <your_custom_yaml_file>.yml
   ```

   Зверніть увагу, що пакети `yaml` та `argparse` повинні бути присутні в середовищі Python.

3. Інструмент очікує діапазон певних параметрів рухомого засобу, які потрібні щоб вказати геометрію та фізичні властивості літака.
   Ви можете або:
   - обрати попередньо визначений шаблон моделі (наприклад Cessna або ВЗІП), який має відому кількість поверхонь керування і просто змінити деяки фізичні властивості, або
   - визначити повністю довільну модель

Після виконання скрипту, згенеровані файли `.avl`, `.sdf` та креслення пропонованих поверхонь керування можна знайти у директорії `<your-plane-name>`.
Файл sdf - це згенерований плагін Advanced Lift Drag який може бути скопійовано і вставлено у файл model.sdf, який потім можна запустити у Gazebo.

## Функціонал

Файл **input_avl.py** приймає параметри надані користувачем та створює з цього файл .avl, який потім може бути прочитаний AVL (програмою).
Це відбувається у файлі **process.sh**.

Вивід згенерований AVL буде збережено у два файли: **custom_vehicle_body_axis_derivatives.txt** та **custom_vehicle_stability_derivatives.txt**.
Ці два файли містять параметри, які необхідні для заповнення плагіну Advanced Lift Drag.

І нарешті, **avl_out_parse.py** читає згенеровані файли .txt та присвоює параметри відповідним елементам у файлі sdf.

Згенерований плагін Advanced Lift Drag (`<custom_plane>.sdf`) може бути скопійований в певний файл **model.sdf**, що використовується Gazebo.

## Зручність використання

Поточна реалізація надає мінімальний робочий приклад.
Більш точні виміри можна отримати, підлаштувавши обрану кількість вихрів вздовж розмаху та хорди крила відповідно до бажаних налаштувань.
Тут можна знайти добру відправну точку: https://www.redalyc.org/pdf/6735/673571173005.pdf.

Також можна більш точно моделювати рухомий засіб, використовуючи більшу кількість секцій.
У поточному yml-файлі визначено лише лівий та правий край для кожної поверхні, що дає рівно одну секцію, але код підтримує розширення до будь-якої кількості бажаних секцій.

:::note

- Поверхня керування в AVL завжди визначається зліва направо.
  Це означає, що спочатку потрібно вказати лівий край поверхні, а потім правий.
  Якщо ви зробите це навпаки, поверхня фактично буде визначена догори дриґом.
- Інструмент призначений для підтримки не більше двох поверхонь керування будь-якого типу на будь-якому рухомому засобі.
  Маючи більше поверхонь може призвести до помилкової поведінки.
- Another important point is that these scripts make use of the match, case syntax, which was only introduced in Python in version 3.10.
- The primary reference resource for AVL can be found at https://web.mit.edu/drela/Public/web/avl/AVL_User_Primer.pdf.
  This document was written by the creators of AVL and contains all the variables that could be required in defining the control surfaces.
- AVL cannot predict stall values so these need to be calculated/estimated in another way.
  In the current implementation, default stall values have been taken from PX4's Advanced Plane.
  These should naturally be changed for new/different models.

:::

## Parameter Assignment

Below is a comprehensive list on how the parameters are assigned at output and what files in AVL they are taken from.
The Advanced Lift Drag Plugin contains more detail about what each of these parameters do.

:::note
The parameters have not been verified by an expert, so you should check them in the plugin.
:::

From the stability derivatives log file, the following advanced lift drag plugin parameters are taken:

| Name in AVL | Name in Advanced Lift Drag Plugin | Опис                                                                       |
| ----------- | --------------------------------- | -------------------------------------------------------------------------- |
| Alpha       | alpha                             | The angle of attack                                                        |
| Cmtot       | Cem0                              | Pitching moment coefficient at zero angle of attack                        |
| CLtot       | CL0                               | Lift Coefficient at zero angle of attack                                   |
| CDtot       | CD0                               | Drag coefficient at zero angle of attack                                   |
| CLa         | CLa                               | dCL/da (slope of CL-alpha curve)                        |
| CYa         | CYa                               | dCy/da (sideforce slope wrt alpha)                      |
| Cla         | Cell                              | dCl/da (roll moment slope wrt alpha)                    |
| Cma         | Cema                              | dCm/da (pitching moment slope wrt aLpha - before stall) |
| Cna         | Cena                              | dCn/da (yaw moment slope wrt alpha)                     |
| CLb         | CLb                               | dCL/dbeta (lift coefficient slope wrt beta)             |
| CYb         | CYb                               | dCY/dbeta (side force slope wrt beta)                   |
| Clb         | Cell                              | dCl/dbeta (roll moment slope wrt beta)                  |
| Cmb         | Cemb                              | dCm/dbeta (pitching moment slope wrt beta)              |
| Cnb         | Cenb                              | dCn/dbeta (yaw moment slope wrt beta)                   |

From the body axis derivatives log file, the following advanced lift drag plugin parameters are taken:

| Name in AVL | Name in Advanced Lift Drag Plugin | Опис                                                                        |
| ----------- | --------------------------------- | --------------------------------------------------------------------------- |
| e           | eff                               | Wing efficiency (Oswald efficiency factor for a 3D wing) |
| CXp         | CDp                               | dCD/dp (drag coefficient slope wrt roll rate)            |
| CYp         | CYp                               | dCY/dp (sideforce slope wrt roll rate)                   |
| CZp         | CLp                               | dCL/dp (lift coefficient slope wrt roll rate)            |
| Clp         | Cellp                             | dCl/dp (roll moment slope wrt roll rate)                 |
| Cmp         | Cemp                              | dCm/dp (pitching moment slope wrt roll rate)             |
| Cmp         | Cenp                              | dCn/dp (yaw moment slope wrt roll rate)                  |
| CXq         | CDq                               | dCD/dq (drag coefficient slope wrt pitching rate)        |
| CYq         | CYq                               | dCY/dq (side force slope wrt pitching rate)              |
| CZq         | CLq                               | dCL/dq (lift coefficient slope wrt pitching rate)        |
| Clq         | Cellq                             | dCl/dq (roll moment slope wrt pitching rate)             |
| Cmq         | Cemq                              | dCm/dq (pitching moment slope wrt pitching rate)         |
| Cnq         | Cenq                              | dCn/dq (yaw moment slope wrt pitching rate)              |
| CXr         | CDr                               | dCD/dr (drag coefficient slope wrt yaw rate)             |
| CYr         | CYr                               | dCY/dr (side force slope wrt yaw rate)                   |
| CZr         | CLr                               | dCL/dr (lift coefficient slope wrt yaw rate)             |
| Clr         | Cellr                             | dCl/dr (roll moment slope wrt yaw rate)                  |
| Cmr         | Cemr                              | dCm/dr (pitching moment slope wrt yaw rate)              |
| Cnr         | Cenr                              | dCn/dr (yaw moment slope wrt yaw rate)                   |

Furthermore, every control surface also has six own parameters, which are also derived from this log file.
`{i}` below ranges from 1 to the number of unique control surface types in the model.

| Name in AVL | Name in Advanced Lift Drag Plugin | Опис                                                          |
| ----------- | --------------------------------- | ------------------------------------------------------------- |
| CXd{i}      | CD_ctrl      | Effect of the control surface's deflection on drag            |
| CYd{i}      | CY_ctrl      | Effect of the control surface's deflection on side force      |
| CZd{i}      | CL_ctrl      | Effect of the control surface's deflection on lift            |
| Cld{i}      | Cell_ctrl    | Effect of the control surface's deflection on roll moment     |
| Cmd{i}      | Cem_ctrl     | Effect of the control surface's deflection on pitching moment |
| Cnd{i}      | Cen_ctrl     | Effect of the control surface's deflection on yaw moment      |

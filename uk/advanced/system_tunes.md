# Системи звукового оповіщення

PX4 визначає ряд [стандартних мелодій/тем](../getting_started/tunes.md), які використовуються для забезпечення аудіо-повідомлень про важливі стани системи та проблеми (наприклад, запуск системи, успішне готування до роботи, попередження про заряд батареї і т. д.).

Tunes are specified using strings (in [ANSI Music notation](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)) and played by code using the [tunes](https://github.com/PX4/PX4-Autopilot/tree/main/src/lib/tunes) library.
The tunes library also contains the list of default system tunes - see [lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc).

У PX4 також є модуль, який можна використовувати для відтворення (тестування) стандартних мелодій або користувацьких мелодій.

У цій темі наведено загальні вказівки щодо створення власних мелодій і додавання/заміни системних тонів/мелодій сповіщень.

## Формування Звукових Повідомлень

Рядки мелодій визначаються за допомогою [ANSI Music notation](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt).

:::tip
Більше інформації про формат можна знайти в [QBasic PLAY statement](https://en.wikibooks.org/wiki/QBasic/Appendix#PLAY) (Wikibooks) та було відтворено в [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc).
:::

Найпростіший спосіб створити нову мелодію – скористатися музичним редактором.
Це дозволяє редагувати музику та відтворювати її на вашому комп'ютері, а потім експортувати в формат, який можна відтворити за допомогою PX4.

Музика ANSI була популярною за часів систем ANSI BBS, тому найкращими інструментами редагування є утиліти DOS.
On Windows, one option is to use _Melody Master_ within _Dosbox_.

Кроки використання програмного забезпечення:

1. Завантажити [DosBox](http://www.dosbox.com/) і встановити додаток

2. Завантажити [Майстер Мелодій](ftp://archives.thebbs.org/ansi_utilities/melody21.zip) та розпакувати в нову директорію

3. Відкрийте консоль _Dosbox_

4. Змонтуйте основний каталог мелодій у Dosbox, як показано нижче:

   ```sh
   mount c C:\<path_to_directory\Melody21
   ```

5. Запустіть _Melody Master_ за допомогою таких команд

   ```sh
   c:
   start
   ```

6. YПотім ви матимете можливість клацнути кілька екранів, а потім натиснути **1**, щоб відобразити _Master Melody_:
   ![Melody Master 2.1](../../assets/tunes/tunes_melody_master_2_1.jpg)

   У нижній половині екрана надаються корисні поради щодо комбінацій клавіш для використання інструменту (стрілки для переміщення в ноті, цифри для вибору тривалості ноти тощо).

7. Коли ви будете готові зберегти музику:
   - Натисніть **F2**, щоб дати мелодії назву та зберегти її у підпапці _/Music_ вашої інсталяції Melody Master.
   - Press **F7**, the scroll down the list of output formats on the right to get to ANSI.
     The file will be exported to the _root_ of the Melody Master directory (with the same name and a file-type specific extension).

8. Відкрийте файл.
   Результат може виглядати так:

   ![ANSI Output from file](../../assets/tunes/tune_musicmaker_ansi_output.png)

9. ядок, який можна відтворити в PX4, це біт між `MNT` і `P64`: `150L1O3DL16CL32<B>C<AEL16A`

## Тестування тунелів

When you're ready to try it out a new tune on PX4, use the [tune_control](../modules/modules_system.md#tune-control) library.
For example, to test the tune we "created" above you would enter the following command on a console or shell (e.g. the [MAVLink Shell](../debug/mavlink_shell.md)):

```sh
tune_control play -m "150L1O3DL16CL32<B>C<AEL16A"
```

:::info
OЗа замовчуванням, `tune_control` присутній лише на реальному обладнанні (не у симуляторі).
:::

## Заміна існуючих звукових повідомлень

Мелодії визначаються в файлі [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc).

Якщо вам потрібно лише замінити існуючу мелодію, ви можете замінити файл у власному репозиторії (fork) та оновити рядки мелодій, визначені в `PX4_DEFINE_TUNE`.

## Додати нову мелодію

TBD.

<!--

1. Assumption is that you need to define a new `PX4_DEFINE_TUNE` with its own number in the file.
2. Need to look at how tunes are played. Problem for another day.

-->

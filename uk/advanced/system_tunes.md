# Системи звукового оповіщення

PX4 визначає ряд [стандартних мелодій/тем](../getting_started/tunes.md), які використовуються для забезпечення аудіо-повідомлень про важливі стани системи та проблеми (наприклад, запуск системи, успішне готування до роботи, попередження про заряд батареї і т. д.).

Мелодії вказуються за допомогою рядків (у форматі [ANSI Music notation](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)) та відтворюються за допомогою коду, використовуючи бібліотеку [tunes](https://github.com/PX4/PX4-Autopilot/tree/main/src/lib/tunes). Бібліотека мелодій також містить список стандартних мелодій системи - див. [lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc).

У PX4 також є модуль, який можна використовувати для відтворення (тестування) стандартних мелодій або користувацьких мелодій.

У цій темі наведено загальні вказівки щодо створення власних мелодій і додавання/заміни системних тонів/мелодій сповіщень.

## Формування Звукових Повідомлень

Рядки мелодій визначаються за допомогою [ANSI Music notation](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt).

:::tip
Більше інформації про формат можна знайти в [QBasic PLAY statement](https://en.wikibooks.org/wiki/QBasic/Appendix#PLAY) (Wikibooks) та було відтворено в [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc).
:::

Найпростіший спосіб створити нову мелодію – скористатися музичним редактором. Це дозволяє редагувати музику та відтворювати її на вашому комп'ютері, а потім експортувати в формат, який можна відтворити за допомогою PX4.

Музика ANSI була популярною за часів систем ANSI BBS, тому найкращими інструментами редагування є утиліти DOS. У Windows одним із варіантів є використання _Melody Master_ у _Dosbox_.

Кроки використання програмного забезпечення:

1. Завантажити [DosBox](http://www.dosbox.com/) і встановити додаток
1. Завантажити [Майстер Мелодій](ftp://archives.thebbs.org/ansi_utilities/melody21.zip) та розпакувати в нову директорію
1. Відкрийте консоль _Dosbox_
1. Mount the melody master directory in Dosbox as shown below:

   ```sh
   mount c C:\<path_to_directory\Melody21
   ```

1. Запустіть _Melody Master_ за допомогою таких команд

   ```sh
   c:
   start
   ```

1. Потім ви матимете можливість клацнути кілька екранів, а потім натиснути **1**, щоб відобразити _Master Melody_: ![Melody Master 2.1](../../assets/tunes/tunes_melody_master_2_1.jpg)

   The lower half of the screen provides helpful advice on keyboard shortcuts for using the tool (arrows for moving in stave, and numbers for selecting the note length, etc.).

1. When you're ready to save the music:
   - Press **F2** to give the tune a name and save it in the _/Music_ sub folder of your Melody Master installation.
   - Press **F7**, the scroll down the list of output formats on the right to get to ANSI. The file will be exported to the _root_ of the Melody Master directory (with the same name and a file-type specific extension).
1. Open the file. The output might look like this:

   ![ANSI Output from file](../../assets/tunes/tune_musicmaker_ansi_output.png)

1. The string that can be played in PX4 is the bit between `MNT` and `P64`: `150L1O3DL16CL32<B>C<AEL16A`

## Тестування тунелів

When you're ready to try it out a new tune on PX4, use the [tune_control](../modules/modules_system.md#tune-control) library. For example, to test the tune we "created" above you would enter the following command on a console or shell (e.g. the [MAVLink Shell](../debug/mavlink_shell.md)):

```sh
tune_control play -m "150L1O3DL16CL32<B>C<AEL16A"
```

:::note
Out of the box, the `tune_control` is only present on real hardware (not the simulator).
:::

## Заміна існуючих звукових повідомлень

Tunes are defined within [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc).

If you just need to replace an existing tune, then you can replace the file in your own fork, and update the tune strings defined in `PX4_DEFINE_TUNE`.

## Додати нову мелодію

TBD.


<!--

1. Assumption is that you need to define a new `PX4_DEFINE_TUNE` with its own number in the file.
2. Need to look at how tunes are played. Problem for another day.

-->

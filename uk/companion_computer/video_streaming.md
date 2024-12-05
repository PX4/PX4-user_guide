# Відеотрансляція (Супутній комп'ютер/QGroundControl)

Транспортні засоби на основі PX4 підтримують відеотрансляцію за допомогою камери, підключеної до супутнього комп'ютера [companion computer](../companion_computer/README.md).

:::info
Ви не можете безпосередньо транслювати відео з камери, підключеної до PX4.
:::

GStreamer використовується для відправки відео до _QGroundControl_ через IP-посилання.
Для відтворення сценаріїв використання вам потрібно встановити пакети розробки Gstreamer як на супутньому комп'ютері, так і на системі, на якій працює _QGroundControl_.
_QGroundControl_ використовує GStreamer 1.14.4 та зменшену версію _QtGstreamer_ для підтримки відеотрансляції через UDP RTP та RSTP.

## Налаштування Компаньйонного Комп'ютера

Загальні інструкції щодо встановлення _GStreamer_ та запуску потоку на супутньому комп'ютері наведені в файлі [README VideoReceiver в QGroundControl](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

Налаштування камер та даних залежить від багатьох факторів.
Нижче наведено приклади з цієї бібліотеки (зауважте, що це варіанти, а не "рекомендації"):

- [Відеотрансляція за допомогою WFB-ng Wifi](../companion_computer/video_streaming_wfb_ng_wifi.md) (Навчальний посібник): Використання RaPi та модуля WiFi в режимі непідключеного (розповсюдженого) режиму для відеотрансляції та як двонапрямкового телеметричного зв'язку.

## Налаштування QGC

Для налаштування та використання відеотрансляції з QGC:

1. Встановіть GStreamer перед запуском QGC.
   У Ubuntu це можна зробити за допомогою команди:

   ```sh
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```

   Для інших платформ слід дотримуватися інструкцій у файлі [README VideoReceiver QGroundControl](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

2. Увімкніть відео в режимі _Fly View_: [QGroundControl > Загальні налаштування (Вид налаштувань) > Відео](https://docs.qgroundcontrol.com/master/en/SettingsView/General.html#video)

3. Якщо все працює, ви повинні побачити відеопотік, відображений у перемикачі відео QGC (лівий нижній кут режиму Fly View QGC).
   Ви можете клацнути на перемикач відео, щоб перемикати відео на повний екран, як показано на знімку екрану нижче.

   ![QGC displaying video stream](../../assets/videostreaming/qgc-screenshot.png)

## Симуляція Gazebo Classic

[Gazebo Classic](../sim_gazebo_classic/Readme.md) підтримує потокове відео з імітованого середовища.
Для отримання додаткової інформації див.
For more information see [Gazebo Classic Simulation > Video Streaming](../sim_gazebo_classic/index.md#video-streaming).

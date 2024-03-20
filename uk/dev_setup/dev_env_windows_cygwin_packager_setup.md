# Середовище розробки Windows Cygwin (Інструкції з обслуговування)

:::warning
Це середовище розробки [підтримується та утримується спільнотою](../advanced/community_supported_dev_env.md). Воно може працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

Ця тема пояснює, як побудувати та розширити середовище розробки, яке використовується для [середовища розробника Windows (заснованого на Cygwin)](../dev_setup/dev_env_windows_cygwin.md) яке вже не підтримується.

## Додаткова інформація

### Можливості / Проблеми

Відомо що наступні можливості працюють (версія 2.0):

- Збірка та запуск SITL з jMAVSim зі значно кращою ефективністю, ніж у VM (створюється нативний бінарний файл Windows **px4.exe**).
- Збірка та завантаження NuttX збірок (напр.: px4_fmu-v2 та px4_fmu-v4)
- Перевірка стилю з _astyle_ (підтримує команду: `make format`)
- Автодоповнення в командному рядку
- Неінвазивний встановлювач! Встановлювач НЕ впливає на систему і глобальний шлях (лише змінює вибрану директорію установки, наприклад \*\*C:\PX4\*\* і використовує тимчасовий локальний шлях).
- Встановлювач підтримує оновлення до нової версії зі збереженням ваших особистих змін у теці інструментарію.

Відсутні:

- Симуляція: Gazebo та ROS не підтримуються.
- Підтримуються лише збірки NuttX і JMAVSim/SITL.
- [Відомі проблеми](https://github.com/orgs/PX4/projects/6) (використовуйте для звіту про проблеми).

### Встановлення за допомогою скриптів оболонки

Ви також можете встановити середовище за допомогою скриптів в Github проєкті.

1. Переконайтеся, що у вас встановлено [Git для Windows](https://git-scm.com/download/win).
1. Клонуйте репозиторій https://github.com/PX4/windows-toolchain туди куди ви хочете встановити інструментарій. Розташування та ім'я теки за замовчуванням досягаються шляхом відкриття `Git Bash` і виконання:

   ```sh
   cd /c/
   git clone https://github.com/PX4/windows-toolchain PX4
   ```

1. Якщо бажаєте встановити усі компоненти, перейдіть до недавно клонованої директорії та запустіть скрипт подвійним кліком `install-all-components.bat`, що розташовано у директорії `toolchain`. Якщо вам потрібні лише певні компоненти і ви бажаєте зберегти інтернет-трафік або дисковий простір, ви можете перейти до різних директорій компонентів, таких як `toolchain\cygwin64` та запустити один із скриптів **install-XXX.bat** для отримання чогось конкретного.
1. Переходьте до [Початок роботи](../dev_setup/dev_env_windows_cygwin.md#getting-started).

### Ручне встановлення (для розробників інструментарію)

Цей розділ описує як налаштувати інструментарій Cygwin вручну самостійно, із вказанням на відповідні скрипти з репозитарію установки за допомогою скриптів. Результат повинен бути таким самим як при використанні скриптів, так і встановлювачі MSI.

:::note
Інструментарій поновлюється, тому ці інструкції можуть не покривати кожну деталь всіх змін в майбутньому.
:::

1. Створіть _теки_: **C:\PX4\*\*, **C:\PX4\toolchain\*\* та \*\*C:\PX4\home\*\*
1. Завантажте файл _встановлювача Cygwin_ [setup-x86_64.exe](https://cygwin.com/setup-x86_64.exe) із [офіційного сайту Cygwin](https://cygwin.com/install.html)
1. Запустіть завантажений файл встановлювача
1. У майстрі оберіть встановлення в теку: \*\*C:\PX4\toolchain\cygwin64\*\*
1. Оберіть для встановлення стандартні основні пакети Cygwin і найновішу версію додаткових пакетів:

   - **Категорія:Пакет**
   - Devel:cmake (3.3.2 не дає попереджень про застарілість, 3.6.2 працює, але попереджає про це)
   - Devel:gcc-g++
   - Devel:gdb
   - Devel:git
   - Devel:make
   - Devel:ninja
   - Devel:patch
   - Editors:xxd
   - Editors:nano (якщо ви не професіонал із vim)
   - Python:python2
   - Python:python2-pip
   - Python:python2-numpy
   - Python:python2-jinja2
   - Python:python2-pyyaml
   - Python:python2-cerberus
   - Archive:unzip
   - Utils:astyle
   - Shells:bash-completion
   - Web:wget

   :::note
Не обирайте якомога більше пакетів які не в цьому списку, серед них є ті, що конфліктують між собою і можуть зламати збірку.
:::

:::note
Саме це робить [cygwin64/install-cygwin-px4.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-px4.bat).
:::

1. Зробіть або скопіюйте **пакетні скрипти** [`run-console.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/run-console.bat) та [`setup-environment.bat`](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).

   Причиною запуску всіх інструментів розробки через підготовлений пакетні скрипти є те, що вони налаштовують початкову програму використовувати локальне, портативне середовище Cygwin всередині директорії інструментарію. Це робиться завжди шляхом спочатку виконанням скрипту [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) і бажаного додатку типу консолі після цього.

   Скрипт [setup-environment.bat](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) налаштовує змінні середовища для кореневого каталогу робочого простору `PX4_DIR`, розташування усіх бінарних файлів `PATH`, та домашньої директорії Unix середовища `HOME` локально.

1. Додайте необхідні **пакети python** до вашого встановлення відкривши консоль інструментарію Cygwin (подвійне натискання на **run-console.bat**) та виконавши

   ```sh
   pip2 install toml
   pip2 install pyserial
   pip2 install pyulog
   ```

:::note
Саме це робить [cygwin64/install-cygwin-python-packages.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-python-packages.bat).
:::

1. Завантажте компілятор [**ARM GCC**](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads) як архів бінарних файлів для Windows і розпакуйте вміст до директорії `C:\PX4\tochain\gcc-arm`.

:::note
Це те що інструментарій робить в: [gcc-arm/install-gcc-arm.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/gcc-arm/install-gcc-arm.bat).
:::

1. Встановіть JDK:

   - Завантажте Java 14 з сайту [Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) або [AdoptOpenJDK](https://adoptopenjdk.net/).
   - Оскільки, на жаль, не існує портативного архіву, який містить безпосередньо бінарні файли вам потрібно встановити Java.
   - Знайдіть встановлені бінарні файли та скопіюйте/перемістіть їх у **C:\PX4\toolchain\jdk**.
   - Ви можете видалити Java із вашої системи Windows, нам були потрібні лише бінарні файли для набору інструментів.

:::note
Це те що інструментарій робить в: [jdk/install-jdk.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/jdk/install-jdk.bat).
:::

1. Завантажте [**Apache Ant**](https://ant.apache.org/bindownload.cgi)  як архів бінарних файлів для Windows і розпакуйте вміст до директорії `C:\PX4\toolchain\apache-ant`.

   :::tip
Переконайтеся що немає додаткового рівня директорій в директорії в архіві що ви завантажили.
:::

:::note
Це те що інструментарій робить в:  [apache-ant/install-apache-ant.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/apache-ant/install-apache-ant.bat).
:::

1. Завантажте, зберіть та додайте _genromfs_ до шляху:

   - Клонуйте вихідний код в директорію **C:\PX4\toolchain\genromfs\genromfs-src**

     ```sh
     cd /c/toolchain/genromfs
     git clone https://github.com/chexum/genromfs.git genromfs-src
     ```

   - Скомпілюйте це:

     ```sh
     cd genromfs-src
     make all
     ```

   - Скопіюйте бінарний файл **genromfs.exe** на один рівень вище в: **C:\PX4\toolchain\genromfs**

1. Переконайтеся, що всі бінарні файли усіх компонентів що встановлено коректно перелічені в змінній `PATH` яка налаштована [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).

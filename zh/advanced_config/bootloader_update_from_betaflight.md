---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/bootloader_update_from_betaflight
---

# Betaflight 系统烧写 Bootloader

本页介绍了如何将 PX4 bootloader 烧写到使用 Betaflight固件（例如[ OmnibusF4 SD ](../flight_controller/omnibus_f4_sd.md) 或 [ Kakute F7 ](../flight_controller/kakutef7.md)）的飞控板的 flash 中。

烧写 bootloader 有两种选择：通过* Betaflight 配置器 *（更简单），或从源代码进行构建。

<span id="betaflight_configurator"></span>

### 使用 Betaflight 配置器 更新 Bootloader

要使用 * Betaflight 配置器* 安装 PX4 bootloader，请如下操作：

1. 您应该已经下载了已编译过的 bootloader 二进制文件（二进制文件针对特定的飞控板编译生成）。
2. 下载适用于您平台的[ Betaflight 配置器](https://github.com/betaflight/betaflight-configurator/releases)。 > **提示** 如果使用 * Chrome * Web 浏览器，一个简单的跨平台替代方法是安装[配置器扩展插件](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao)。
:::
3. 将飞控板连接到 PC 并启动 Betaflight 配置器。
4. 按下 **加载固件[本地] ** 按钮 ![Betaflight 配置器-本地固件](../../assets/flight_controller/omnibus_f4_sd/betaflight_configurator.jpg)
5. 从文件系统中选择 bootloader 二进制文件，然后烧写进飞控板的 flash。

现在，您应当可以在飞控板上安装 PX4 固件了。

### 使用源代码进行 Bootloader 更新

#### 下载 Bootloader 源

通过以下命令下载并编译 [ Bootloader ](https://github.com/PX4/Bootloader)：

    git clone --recursive  https://github.com/PX4/Bootloader.git
    cd Bootloader
    make <target> # For example: omnibusf4sd_bl or kakutef7_bl
    

#### 烧写 Bootloader

您可以使用 Windows 上的[ dfu-util ](http://dfu-util.sourceforge.net/) 或图形化的[ dfuse ](https://www.st.com/en/development-tools/stsw-stm32080.html) 工具烧写 PX4 bootloader。

无需担心，使用以下任何一种方法进行烧写即可。

:::note STM32 不会变成砖。 DFU 不会被烧写覆盖，并且总是允许安装新固件，即便烧写失败。 飞控板上电后可以放开该按钮。

##### 进入 DFU 模式

两种方法都要求飞控板处于 DFU 模式。 要进入 DFU 模式， 当将 USB 连接到电脑时按住启动按钮。 飞控板上电后可以释放该按钮。

##### dfu-util

    dfu-util -a 0 --dfuse-address 0x08000000 -D  build/<target>/<target>.bin
    

重新启动飞控板，并且不要按下启动按钮。

##### dfuse

在此处查看 dfuse 手册: https://www.st.com/resource/en/user_manual/cd00155676.pdf

烧写**<target>.bin** 文件。

<span id="reinstall_betaflight"></span>

## 重新安装 Beatflight 固件

为了切换回 * Betaflight *：

- 备份 PX4 参数，例如通过[导出](../advanced/parameters_and_configurations.md#exporting-and-loading-parameters)将其导出到 SD 卡中。
- 连接 USB 线时，按住** bootloader **按钮
- 然后使用* Betaflight-configurator </ 0>像往常一样烧写* Betaflight *固件。</li> </ul>
---
canonicalUrl: https://docs.px4.io/main/ja/dev_setup/building_px4
---

# PX4ソフトウェアのビルド

PX4は、シミュレートされたターゲットとハードウェアの両方に対して、コンソールまたはIDEでビルドすることができます。

:::ノート これらの手順に従う前に、まずホストOSとターゲットハードウェアに [Developer Toolchain](../dev_setup/dev_env.md) をインストールする必要があります。
:::

:::tip
一般的なビルド問題の解決策については、以下の [トラブルシューティング](#troubleshooting) を参照してください。
:::

## PX4ソースコードをダウンロードする

PX4のソースコードは，Githubの [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) に保存されています． *最新のバージョン* を取得するには、コンソールに次のコマンドを入力します。

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::ノート 最新のコードをビルドするために必要なのはこれだけです [GITの例 > PX4への貢献](../contribute/git_examples.md#contributing_code) ではPX4への貢献にgitを使用することについて、より多くの情報を提供します。
:::

## 最初のビルド (jMAVSimシミュレータを使用)

最初に、ホストOS上で機体のシミュレーションをビルドします。 これにより、実際にハードウェアとIDEで設定する前にシステムを検証することができます。

**PX4-Autopilot** ディレクトリに移動し、次のコマンドを使用して [jMAVSim](../simulation/jmavsim.md) を起動します。
```sh
make px4_sitl jmavsim
```

PX4コンソールは以下のように表示されます:

![PX4 Console (jMAVSim)](../../assets/toolchain/console_jmavsim.png)

:::ノート 先に進む前に *QGroundControl* を起動する必要があります。デフォルトのPX4設定では離陸前に地上局との接続が必要です。 [こちら](https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html) からダウンロードできます。
:::

ドローンは次のコマンドで飛行します。
```sh
pxh> commander takeoff
```

![jMAVSim UI](../../assets/toolchain/jmavsim_first_takeoff.png)

ドローンは `commander land` コマンドによって着陸します．また，**CTRL+C** (または `shutdown`コマンド）によってシミュレーションを停止できます。

QGroundControlでシミュレーションすることは、車両の実際の動作に近くなります。 飛行中に地図上の場所をクリックし、スライダーを有効にします。 これにより、車両の位置が変更されます。

![QGroundControl GoTo](../../assets/toolchain/qgc_goto.jpg)

:::tip PX4は[Gazebo Simulation](../simulation/gazebo.md)と[AirSim Simulation](../simulation/airsim.md)を含む多くの[シミュレータ](../simulation/README.md)で使用できます． これらも *make*で起動されます。
```
make px4_sitl gazebo
```
:::

## NuttX / Pixhawk ベースのボード

### NuttX用のビルド

NuttX-またはPixhawkベースのボード用に構築する **PX4-Autopilot** ディレクトリに移動し、 `make` をビルドターゲットに対して使用します．

たとえば、 [Pixhawk 4](../flight_controller/pixhawk4.md) ハードウェア用にビルドするには、次のコマンドを使用します。
```sh
cd PX4-Autopilot
make px4_fmu-v5_default
```

実行が成功すると、次のような出力で終了します。
```sh
-- Build files have been written to: /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default
[954/954] Creating /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default/px4_fmu-v4_default.px4
```

ビルドターゲット `px4_fmu-v4` の最初の部分は、特定のフライトコントローラハードウェアのファームウェアを示します。 次のリストは、 [Pixhawk 標準](../flight_controller/autopilot_pixhawk_standard.md) ボードのビルドコマンドを示しています。

- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md): `make px4_fmu-v6x_default`
- [Holybro Pixhawk 6C (FMUv6C)](../flight_controller/pixhawk6c.md): `make px4_fmu-v6c_default`
- [Holybro Pixhawk 5X (FMUv5X)](../flight_controller/pixhawk5x.md): `make px4_fmu-v5x_default`
- [Pixhawk 4 (FMUv5)](../flight_controller/pixhawk4.md): `make px4_fmu-v5_default`
- [Pixhawk 4 Mini (FMUv5)](../flight_controller/pixhawk4_mini.md): `make px4_fmu-v5_default`
- [CUAV V5+ (FMUv5)](../flight_controller/cuav_v5_plus.md): `make px4_fmu-v5_default`
- [CUAV V5 nano (FMUv5)](../flight_controller/cuav_v5_nano.md): `make px4_fmu-v5_default`
- [Pixracer (FMUv4)](../flight_controller/pixracer.md): `make px4_fmu-v4_default`
- [Pixhawk 3](../flight_controller/pixhawk3_pro.md): `make px4_fmu-v5_default`
- [Pixhawk ](../flight_controller/pixhawk_mini.md): `make px4_fmu-v5_default`
- [Pixhawk 2 (Cube Black) (FMUv3)](../flight_controller/pixhawk-2.md): `make px4_fmu-v3_default`
- [mRo Pixhawk (FMUv3)](../flight_controller/mro_pixhawk.md): `make px4_fmu-v3_default` (supports 2MB Flash)
- [Holybro pix32 (FMUv2)](../flight_controller/holybro_pix32.md): `make px4_fmu-v2_default`
- [Pixfalcon (FMUv2)](../flight_controller/pixfalcon.md): `make px4_fmu-v2_default`
- [Dropix (FMUv2)](../flight_controller/dropix.md): `make px4_fmu-v2_default`
- [Pixhawk 1 (FMUv2)](../flight_controller/pixhawk.md): `make px4_fmu-v2_default` :::warning You **must** use a supported version of GCC to build this board (e.g. the same as used by [CI/docker](../test_and_ci/docker.md)) or remove modules from the build. Building with an unsupported GCC may fail, as PX4 is close to the board's 1MB flash limit.
:::
- Pixhawk 1 with 2 MB flash: `make px4_fmu-v3_default`

Pixhawk NuttX 以外のフライトコントローラ(および他のすべてのボード)用のビルドコマンドは、個々の [フライトコントローラボード](../flight_controller/README.md) のドキュメントに記載されています。

:::ノート `_default` サフィックスは、ファームウェアの _設定_ です。 This is optional (i.e. you can also build using `make px4_fmu-v4`, `make bitcraze_crazyflie`, etc.).
:::

### ファームウェアのアップロード（ボードへのフラッシュ）

`upload` をmakeコマンドに追加し、コンパイル済みバイナリをUSB経由でハードウェアにアップロードします。 例:

```sh
make px4_fmu-v4_default upload
```

実行が成功すると、次のような出力で終了します。

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

## その他のボード

他のボードのビルドコマンドには、 [ボード固有のフライトコントローラページ](../flight_controller/README.md) (通常は見出し *ファームウェアの構築* の下) が表示されます。

以下のコマンドを使用して、すべての構成ターゲットを列挙することもできます。
```sh
make list_config_targets
```


## IDE でのコンパイル

[VScode](../dev_setup/vscode.md) は、PX4開発で正式にサポートされている(そして推奨されている)IDEです。 セットアップは簡単で、シミュレーション環境とハードウェア環境の両方でPX4をコンパイルできます。


## トラブルシューティング

### 一般的なビルドエラー

ビルドの問題の多くは、サブモジュールの不一致またはビルド環境のクリーンアップが不完全なために発生します サブモジュールを更新して `distclean` を実行すると、エラーが修正されます。
```
git submodule update --recursive
make distclean
```

### XXXバイトでオーバーフローしました

`region 'flash' overflowed by XXXX bytes` エラーは、ファームウェアのサイズがハードウェアの容量に対して大きすぎることを示しています。 これは フラッシュ サイズが1MBに制限されている場合に，`make px4_fmu-v2_default ` ビルドで一般的に起こりえます．

*素の*マスターブランチを構築している場合、最も可能性の高い原因はサポートされていないバージョンの GCC を使用することです。 この場合、 [Developer Toolchain](../dev_setup/dev_env.md) の説明で指定されたバージョンをインストールします。

独自のブランチを構築する場合は、ファームウェアのサイズが 1MB 制限を超えている可能性があります。 この場合、ビルドから不要なドライバ/モジュールを削除する必要があります。


### macOS: 開いているファイルが多すぎます

MacOSでは、実行中のすべてのプロセスでデフォルトで最大256個のファイルを開くことができます。 PX4ビルドシステムは多数のファイルを開くため、この数を超える可能性があります。

次に示すように、ビルドツールチェーンは、 `Too many open files`エラーを出力します．
```sh
/usr/local/Cellar/gcc-arm-none-eabi/20171218/bin/../lib/gcc/arm-none-eabi/7.2.1/../../../../arm-none-eabi/bin/ld: cannot find NuttX/nuttx/fs/libfs.a: Too many open files
```

解決策は、開いているファイルの最大許容数を増やすことです (e.g. to 300)． 以下の方法をmacOS *ターミナル* 上で試すことができます．
- Run this script [Tools/mac_set_ulimit.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/Tools/mac_set_ulimit.sh), or
- 次のコマンドを入力します。
  ```sh
  ulimit -S -n 300
  ```

### macOS Catalina: cmake の実行に問題があります

macOS Catalina 10.15.1 以降、 *cmake* でシミュレータを構築しようとすると問題が生じる可能性があります。 このプラットフォームでビルドに問題がある場合は、ターミナルで次のコマンドを実行してみてください。
```sh
xcode-select --install
sudo ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/* /usr/local/include/
```

### Ubuntu 18.04：arm_none_eabi_gccに関連するコンパイルエラー

`arm_none_eabi_gcc`に関連するビルドの問題は、g++ ツールチェーンのインストールが壊れていることが原因の可能性があります。 以下を使用して不足している依存関係を確認することで、この場合であることを確認できます。
```bash
arm-none-eabi-gcc --version
arm-none-eabi-g++ --version
arm-none-eabi-gdb --version
arm-none-eabi-size --version
```

依存関係が不足しているbash出力の例:
```bash
arm-none-eabi-gdb --version
arm-none-eabi-gdb: command not found
```

これは、コンパイラーを削除して[再インストール](https://askubuntu.com/questions/1243252/how-to-install-arm-none-eabi-gdb-on-ubuntu-20-04-lts-focal-fossa)することで解決できます。

### Ubuntu 18.04: Visual Studio Code is unable to watch for file changes in this large workspace

See [Visual Studio Code IDE (VSCode) > Troubleshooting](../dev_setup/vscode.md#troubleshooting).

### Failed to import Python packages

"Failed to import" errors when running the `make px4_sitl jmavsim` command indicates that some Python packages are not installed (where expected).
```
Failed to import jinja2: No module named 'jinja2'
You may need to install it using:
    pip3 install --user jinja2
```
If you have already installed these dependencies this may be because there is more than one Python version on the computer (e.g. Python 2.7.16 Python 3.8.3), and the module is not present in the version used by the build toolchain.

You should be able to fix this by explicitly installing the dependencies as shown:
```
pip3 install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```


## PX4 Make Build Targets

The previous sections showed how you can call *make* to build a number of different targets, start simulators, use IDEs etc. This section shows how *make* options are constructed and how to find the available choices.

The full syntax to call *make* with a particular configuration and initialization file is:
```sh
make [VENDOR_][MODEL][_VARIANT] [VIEWER_MODEL_DEBUGGER_WORLD]
```

**VENDOR_MODEL_VARIANT**: (also known as `CONFIGURATION_TARGET`)

- **VENDOR:** The manufacturer of the board: `px4`, `aerotenna`, `airmind`, `atlflight`, `auav`, `beaglebone`, `intel`, `nxp`, etc. The vendor name for Pixhawk series boards is `px4`.
- **MODEL:** The *board model* "model": `sitl`, `fmu-v2`, `fmu-v3`, `fmu-v4`, `fmu-v5`, `navio2`, etc.
- **VARIANT:** Indicates particular configurations: e.g. `rtps`, `lpe`, which contain components that are not present in the `default` configuration. Most commonly this is `default`, and may be omitted.

:::tip
You can get a list of *all* available `CONFIGURATION_TARGET` options using the command below:
```sh
make list_config_targets
```
:::

**VIEWER_MODEL_DEBUGGER_WORLD:**

- **VIEWER:** This is the simulator ("viewer") to launch and connect: `gazebo`, `jmavsim`, `none` <!-- , ?airsim -->

:::tip
`none` can be used if you want to launch PX4 and wait for a simulator (jmavsim, gazebo, or some other simulator). For example, `make px4_sitl none_iris` launches PX4 without a simulator (but with the iris airframe).
:::
- **MODEL:** The *vehicle* model to use (e.g. `iris` (*default*), `rover`, `tailsitter`, etc), which will be loaded by the simulator. The environment variable `PX4_SIM_MODEL` will be set to the selected model, which is then used in the [startup script](../simulation/README.md#startup-scripts) to select appropriate parameters.
- **DEBUGGER:** Debugger to use: `none` (*default*), `ide`, `gdb`, `lldb`, `ddd`, `valgrind`, `callgrind`. For more information see [Simulation Debugging](../debug/simulation_debugging.md).
- **WORLD:** (Gazebo only). Set a the world ([PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)) that is loaded. Default is [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world). For more information see [Gazebo > Loading a Specific World](../simulation/gazebo.md#set_world).

:::tip
You can get a list of *all* available `VIEWER_MODEL_DEBUGGER_WORLD` options using the command below:
```sh
make px4_sitl list_vmd_make_targets
```
:::

Notes:
- Most of the values in the `CONFIGURATION_TARGET` and `VIEWER_MODEL_DEBUGGER` have defaults, and are hence optional. For example, `gazebo` is equivalent to `gazebo_iris` or `gazebo_iris_none`.
- You can use three underscores if you want to specify a default value between two other settings. For example, `gazebo___gdb` is equivalent to `gazebo_iris_gdb`.
- You can use a `none` value for `VIEWER_MODEL_DEBUGGER` to start PX4 and wait for a simulator. For example start PX4 using `make px4_sitl_default none` and jMAVSim using `./Tools/jmavsim_run.sh -l`.


The `VENDOR_MODEL_VARIANT` options map to particular *px4board* configuration files in the PX4 source tree under the [/boards](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/boards) directory. Specifically `VENDOR_MODEL_VARIANT` maps to a configuration file **boards/VENDOR/MODEL/VARIANT.px4board** (e.g. `px4_fmu-v5_default` corresponds to [boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/boards/px4/fmu-v5/default.px4board)).

Additional make targets are discussed in relevant sections:
- `bloaty_compare_master`: [Binary Size Profiling]()
- ...


## Firmware Version & Git Tags

The *PX4 Firmware Version* and *Custom Firmware Version* are published using the MAVLink [AUTOPILOT_VERSION](https://mavlink.io/en/messages/common.html#AUTOPILOT_VERSION) message, and displayed in the *QGroundControl* **Setup > Summary** airframe panel:

![Firmware info](../../assets/gcs/qgc_setup_summary_airframe_firmware.jpg)

These are extracted at build time from the active *git tag* for your repo tree. The git tag should be formatted as `<PX4-version>-<vendor-version>` (e.g. the tag in the image above was set to `v1.8.1-2.22.1`).

:::warning
If you use a different git tag format, versions information may not be displayed properly.
:::



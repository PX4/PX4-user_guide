# Windows 安装指南

如果希望在Windows平台进行PX4的开发，请参考： [Windows Cygwin 工具链](../dev_setup/dev_env_windows_cygwin.md) 进行工具链的安装。

:::tip
The *Cygwin toolchain* supports building for NuttX/Pixhawk and jMAVSim simulator targets. If you want to build for [other targets](/setup/dev_env.md#supported-targets), consider setting up a dual boot system with [Ubuntu Linux](http://ubuntu.com).
:::

## 额外工具

设置完环境后，请转至 构建说明</0> 进行编译测试。


## 后续步骤

Once you have finished setting up the environment, continue to the [build instructions](../dev_setup/building_px4.md).


## 其他 windows 工具链

There are a number of other legacy/alternative solutions that may be of interest to some developers. A comparison of the options is provided below.

:::note
The [Cygwin Toolchain](../dev_setup/dev_env_windows_cygwin.md) is the only one that is supported by the PX4 dev team. It is regularly tested as part of our continuous integration system and is known to be better performing than the other alternatives.
:::

|            | [Cygwin 工具链](../setup/dev_env_windows_cygwin.md) **(官方支持)** | [虚拟机工具链](../dev_setup/dev_env_windows_vm.md) | [Bash on Windows 工具链](../dev_setup/dev_env_windows_bash_on_win.md) |
| ---------- | ----------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| 安装方式       | MSI安装包/脚本                                                   | 手动安装 (硬核玩家)                                  | 脚本                                                                 |
| 本机二进制执行    | 是                                                           | 否                                            | 否                                                                  |
| 性能         | ++                                                          | --                                           | -                                                                  |
| ARM平台      | ++ (速度快)                                                    | + (VM USB)                                   | +                                                                  |
| jMAVSim 仿真 | ++                                                          | +                                            | +                                                                  |
| Gazebo 仿真  | - (暂不支持)                                                    | + (速度稍慢)                                     | + (速度稍慢)                                                           |
| 技术支持       | +                                                           | ++ (Linux)                                   | +/-                                                                |
| 备注         | <ul><li>2018年新增</li><li>安装配置轻巧</li><li>便携</li></ul>                                   | <ul><li>可获得齐全的Linux特性</li><li>CPU、内存的负荷较高</li><li>占用较多的存储空间</li></ul>                    | <ul><li>仿真界面是“黑”进来的</li><li>仅支持 Windows10</li><li>本质上仍是虚拟机</li></ul>                                          |
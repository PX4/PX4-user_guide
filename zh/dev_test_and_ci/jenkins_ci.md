# Jenkins CI

[ci.px4.io](http://ci.px4.io/) 上的 Jenkins 持续集成服务器用于自动运行针对 PX4 SITL 的集成测试。

Jenkins 使用 [run_container.bash](https://github.com/PX4/Firmware/blob/master/integrationtests/run_container.bash) 来启动 container，而 container 又执行 [ run_tests.bash ](https://github.com/PX4/Firmware/blob/master/integrationtests/run_tests.bash) 来编译和运行测试。
> **Tip** Test processes/tools change over time. Current information [can be found in the head revision/master docs](https://dev.px4.io/master/en/test_and_ci/)!
> 
> {% else %} <!-- START: details below displayed only in master -->

## 概述

  * 涉及的组件：Jenkins，Docker，PX4 POSIX SITL
  * 测试在 [Docker Containers](../test_and_ci/docker.md) 内运行
  * Jenkins 执行了 2 个工作：一个用于检查每个 PR 与主控，另一个用于检查主控上的每次推送

## Test Execution

如果安装了 Docker，则可以在本地使用相同的方法：

有关如何安装和维护 Jenkins 的详细信息，请参阅 setup [script/log](https://github.com/PX4/containers/tree/master/scripts/jenkins) 。

```sh
cd <directory_where_firmware_is_cloned>
sudo WORKSPACE=$(pwd) ./Firmware/integrationtests/run_container.bash
```

## 服务器配置

### 安装

See setup [script/log](https://github.com/PX4/containers/tree/master/scripts/jenkins) for details on how Jenkins got installed and maintained.

### 配置

  * Jenkins 安全性已启用
  * 已安装的插件
    * github
    * github 请求构建器
    * 嵌入式构建状态插件
    * s3 插件
    * 通知插件
    * 折叠控制台部分
    * postbuildscript

{% endif %} <!-- END: details above displayed only in master -->

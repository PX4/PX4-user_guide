<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="Px4徽标" width="180px" /></a></div>

# PX4 自动驾驶仪使用手册

[![版本发布](https://img.shields.io/github/release/PX4/Firmware.svg)](https://github.com/PX4/Firmware/releases) [![讨论](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

Px4是一款*专业级飞控*。 它由来自业界和学术界的世界级开发商开发，并得到活跃的全球社区的支持，为从赛车和货运无人机到地面车辆和潜水器的各种车辆提供动力。

> **Tip**本指南包含了组装、配置和安全驾驶基于px4的车辆所需的一切。

<span></span>

> **Note** 本指南将持续更新！ 尚未涵盖所有的px4。

## 如何开始？

所有用户都应阅读[Getting开始](getting_started/README.md)! 它概述了px4,包括飞行堆栈(飞行模式和安全功能)和支持的硬件(飞行控制器、车辆、机身、遥测系统、远程遥控系统)提供的功能。

根据您想要实现的需求, 以下提示将帮助您浏览本指南:

**我已经有了一架飞机, 我只想飞:**

如果您有支持 PX4 的到手飞（RTF）的飞行器：

- [Basic配置](config/README.md)解释了如何将固件更新到最新版本, 校准主传感器(罗盘、陀螺仪、空速等), 以及如何设置遥控器和安全功能.
- [Flying](flying/README.md)教授飞行要领, 包括安全飞行的地点和方式, 以及如何调试武装和飞行问题。 同样提供了关于飞行模式的详细信息。

**我想从头开始组建一架飞机：**

> **Tip**支持的飞行器列举在[机架参考](airframes/airframe_reference.md)。 下载使用*QGroundControl*，其中已经有很多测试过和调试好参数的机型。

如果你想自己从头开始组建一架飞机：

- 选择一个机架-[Airframe Builds](airframes/README.md)列举出了支持的机架，并且提供了详细的说明如何构建。
- 选择飞行控制器-请参阅启动 >飞行控制器</0 >和[自驾仪硬件](flight_controller/README.md)。</li> 
    
    - [装配](assembly/README.md)解释了如何将重要的外围设备连接到自动驾驶仪上。
    - [基本配置](config/README.md)演示如何更新固件, 并使用适合您的机身的设置对其进行配置。 本节还介绍了如何校准主传感器(罗盘、陀螺仪、空速等),并设置遥控器和安全功能。</ul> 
    
    一旦你准备好驾驶你的飞机, 请访问[Flying](flying/README.md)部分。
    
    **我正在修改支持的飞机:**
    
    上面介绍了飞行控制器和基本传感器的修改。 为了使用新的传感器, 或者如果您所做的更改会显著影响飞行特性:
    
    - [外设硬件](peripherals/README.md) 提供了有关使用外部传感器的其他信息。
    - [基本配置](config/README.md)解释了如何校准主传感器。
    - 请使用[高级配置](advanced_config/README.md)对机身进行重新微调。
    
    **我想在新硬件上运行px4并扩展平台:**
    
    - [PX4开发人员指南](http://dev.px4.io/)解释了如何修改飞行算法、添加新模式、集成新硬件、从飞行控制器外部与px4通信, 以及如何为px4做出贡献。
    
    ## 论坛和交流 {#support}
    
    核心开发团队和社区活跃与以下论坛和聊天频道。
    
    - [PX4讨论](http://discuss.px4.io/)(*推荐*)
    - [Slack](http://slack.px4.io)(注册链接）
    
    ## 报告错误&问题
    
    如果您在使用px4时遇到任何问题, 请先将其发布在[支持频道](#support)上 (因为它们可能是由飞机配置引起的)。
    
    如果由开发团队指示, 可能会在[Github](https://github.com/PX4/Firmware/issues)上提出代码问题。 在可能的情况下, 提供问题模板中要求的[飞行日志](getting_started/flight_reporting.md)和其他信息。
    
    ## 贡献
    
    有关如何参与代码和文档的信息, 请参阅开发人员指南:
    
    - [代码](https://dev.px4.io/en/contribute/)
    - [文档](https://dev.px4.io/en/contribute/docs.html)
    - [翻译](https://dev.px4.io/en/contribute/docs.html)
    
    ## 许可
    
    根据许可[BSD 3 条款许可证](https://opensource.org/licenses/BSD-3-Clause)的条款,px4代码可自由使用和修改。 本文档的许可在[CC by 4.0](https://creativecommons.org/licenses/by/4.0/)下。 有关详细信息, 请参阅: PX4开发指南>许可证</0 >。</p> 
    
    ### 图标
    
    此库中使用的以下图标是单独授权的(如下所示):
    
    <img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> 来自<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>的<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> 制作<em>placeholder</em>图标由<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 by</a>授权。
    
    <img src="../assets/site/automatic_mode.svg" title="自动模式" width="30px" /> <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>的<a href="http://www.freepik.com" title="Freepik">Freepik</a> 制作的<em>camera-automatic-mode</em>图标由<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 by</a>授权。
    
    ## 管理
    
    PX4飞行栈受[Dronecode项目](https://www.dronecode.org/)管理。
    
    

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode徽标" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux基金会徽标" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>

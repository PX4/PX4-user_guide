---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_template
---

# 模块参考: 模板

## 模块
Source: [templates/module](https://github.com/PX4/Firmware/tree/master/src/templates/module)


### 描述
该部分描述所提供模块的功能。

这是一个模块的模版，该模块在后台作为任务（task）运行并且有 start/stop/status 功能。

### 实现
该部分描述模块的高层次实现。

### 示例
CLI 命令行用法示例：
```
module start -f -p 42
```

<a id="module_usage"></a>

### 用法
```
module <command> [arguments...]
 module <command> [arguments...]
 Commands:
   start
     [-f]        Optional example flag
     [-p <val>]  Optional example parameter
                 default: 0

   stop

   status        print status info
```
## work_item_example
Source: [examples/work_item](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/work_item)


### 参数描述
Example of a simple module running out of a work queue.

<a id="work_item_example_usage"></a>

### 用法
```
work_item_example <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```

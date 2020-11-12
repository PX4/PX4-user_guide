# Modules Reference: Template

## module
Source: [templates/module](https://github.com/PX4/Firmware/tree/master/src/templates/module)


### 描述
Section that describes the provided module functionality.

This is a template for a module running as a task in the background with start/stop/status functionality.

### Implementation
Section describing the high-level implementation of this module.

### Examples
CLI usage example:
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
Source: [examples/work_item](https://github.com/PX4/Firmware/tree/master/src/examples/work_item)


### Description
Example of a simple module running out of a work queue.

<a id="work_item_example_usage"></a>

### Usage
```
work_item_example <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```

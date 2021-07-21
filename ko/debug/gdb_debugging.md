# Embedded Debugging

## Handy console commands

Below are a couple of commands which can be used in the [NuttShell](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410) to get insights of the system.

This NSH command provides the remaining free memory:

```bash
free
```

And the top command shows the stack usage per application:

```
top
```

Stack usage is calculated with stack coloring and thus is not the current usage, but the maximum since the start of the task.

To see what is running in the work queues and at what rate, use:

```
work_queue status
```

And to debug uORB topics:

```
uorb top
```

And to inspect a specific uORB topic:

```
listener <topic_name>
```

## Hard Fault Debugging

A hard fault is a state when a CPU executes an invalid instruction or accesses an invalid memory address. This might occur when key areas in RAM have been corrupted.

### Video

The following video demonstrates hardfault debugging on PX4 using Eclipse and a JTAG debugger. It was presented at the PX4 Developer Conference 2019.

@[youtube](https://youtu.be/KZkAM_PVOi0)

### Debugging Hard Faults in NuttX

A typical scenario that can cause a hard fault is when the processor overwrites the stack and then the processor returns to an invalid address from the stack. This may be caused by a bug in code were a wild pointer corrupts the stack, or another task overwrites this task's stack.

* NuttX maintains two stacks: The IRQ stack for interrupt processing and the user stack
* The stack grows downward. So the highest address in the example below is 0x20021060, the size is 0x11f4 (4596 bytes) and consequently the lowest address is 0x2001fe6c.

```bash
cd build/px4_sitl_default/tmp
export HEAPPROFILE=/tmp/heapprofile.hprof
export HEAP_PROFILE_TIME_INTERVAL=30
```

To decode the hard fault, load the *exact* binary into the debugger:

```bash
env LD_PRELOAD=/lib64/libtcmalloc.so ../src/firmware/posix/px4 ../../posix-configs/SITL/init/lpe/iris
pprof --pdf ../src/firmware/posix/px4 /tmp/heapprofile.hprof.0001.heap > heap.pdf
```

Then in the GDB prompt, start with the last instructions in R8, with the first address in flash (recognizable because it starts with `0x080`, the first is `0x0808439f`). This is typically the case when key areas in RAM have been corrupted. So one of the last steps before the hard fault was when `mavlink_log.c` tried to publish something,

```sh
env LD_PRELOAD=/usr/lib/libtcmalloc.so ../src/firmware/posix/px4 ../../posix-configs/SITL/init/lpe/iris
google-pprof --pdf ../src/firmware/posix/px4 /tmp/heapprofile.hprof.0001.heap > heap.pdf
```

```sh
(gdb) info line *0x08087c4e
Line 311 of "../src/modules/uORB/uORBDevices_nuttx.cpp"
   starts at address 0x8087c4e <uORB::DeviceNode::publish(orb_metadata const*, void*, void const*)+2>
   and ends at 0x8087c52 <uORB::DeviceNode::publish(orb_metadata const*, void*, void const*)+6>.
```

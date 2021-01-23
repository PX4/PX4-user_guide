# Poor Man's Sampling Profiler

This section describes how to assess performance of the PX4 system by means of profiling.

## Approach

PMSP is a shell script that operates by interrupting execution of the firmware periodically in order to sample the current stack trace.
Sampled stack traces are appended into a text file.
Once sampling is finished (which normally takes about an hour or more), the collected stack traces are *folded*.
The result of *folding* is another text file that contains the same stack traces, except that all similar stack traces (i.e. those that were obtained at the same point in the program) are joined together, and the number of their occurrences is recorded.
The folded stacks are then fed into the visualization script, for which purpose we employ [FlameGraph - an open source stack trace visualizer](http://www.brendangregg.com/flamegraphs.html).

## Basic Usage

Basic usage of the profiler is available through the build system. 
For example, the following command builds and profiles px4_fmu-v4pro target with 10000 samples (fetching *FlameGraph* and adding it to the path as needed).

```
make px4_fmu-v4pro_default profile
```

For more control over the build process, including setting the number of samples, see the [Implementation](#implementation).

## Understanding the Output

A screenshot of an example output is provided below (note that it is not interactive here):

![FlameGraph Example](../../assets/debug/flamegraph-example.png)

On the flame graph, the horizontal levels represent stack frames, whereas the width of each frame is proportional to the number of times it was sampled.
In turn, the number of times a function ended up being sampled is proportional to the duration times frequency of its execution.

## Possible Issues

The script was developed as an ad-hoc solution, so it has some issues.
Please watch out for them while using it:

* If GDB is malfunctioning, the script may fail to detect that, and continue running.
  In this case, obviously, no usable stacks will be produced.
  In order to avoid that, the user should periodically check the file `/tmp/pmpn-gdberr.log`, which contains the stderr output of the most recent invocation of GDB.
  In the future the script should be modified to invoke GDB in quiet mode, where it will indicate issues via its exit code.

* Sometimes GDB just sticks forever while sampling the stack trace.
  During this failure, the target will be halted indefinitely.
  The solution is to manually abort the script and re-launch it again with the `--append` option.
  In the future the script should be modified to enforce a timeout for every GDB invocation.

* Multithreaded environments are not supported.
  This does not affect single core embedded targets, since they always execute in one thread, but this limitation makes the profiler incompatible with many other applications.
  In the future the stack folder should be modified to support multiple stack traces per sample.

<a id="implementation"></a>
## Implementation

The script is located at `Debug/poor-mans-profiler.sh`.
Once launched, it will perform the specified number of samples with the specified time interval.
Collected samples will be stored in a text file in the system temp directory (typically `/tmp`).
Once sampling is finished, the script will automatically invoke the stack folder, the output of which will be stored in an adjacent file in the temp directory.
If the stacks were folded successfully, the script will invoke the *FlameGraph* script and store the result in an interactive SVG file.
Please note that not all image viewers support interactive images;
it is recommended to open the resulting SVG in a web browser.

The FlameGraph script must reside in the `PATH`, otherwise PMSP will refuse to launch.

PMSP uses GDB to collect the stack traces.
Currently it uses `arm-none-eabi-gdb`, other toolchains may be added in the future.

In order to be able to map memory locations to symbols, the script needs to be referred to the executable file that is currently running on the target.
This is done with the help of the option `--elf=<file>`, which expects a path (relative to the root of the repository) pointing to the location of the currently executing ELF.

Usage example:

```bash
./poor-mans-profiler.sh --elf=build/px4_fmu-v4_default/px4_fmu-v4_default.elf --nsamples=30000
```

Note that every launch of the script will overwrite the old stacks. 
Should you want to append to the old stacks rather than overwrite them, use the option `--append`:

```bash
./poor-mans-profiler.sh --elf=build/px4_fmu-v4_default/px4_fmu-v4_default.elf --nsamples=30000 --append
```

As one might suspect, `--append` with `--nsamples=0` will instruct the script to only regenerate the SVG without accessing the target at all.

Please read the script for a more in depth understanding of how it works.

## Credits

Credits for the idea belong to
[Mark Callaghan and Domas Mituzas](https://dom.as/2009/02/15/poor-mans-contention-profiling/).

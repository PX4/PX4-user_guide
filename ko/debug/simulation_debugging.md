# 시뮬레이션 디버깅

호스트 시스템에서 시뮬레이션이 실행 중이므로, 데스크탑 개발 도구를 사용할 수 있습니다.

## CLANG 주소 새니타이저(Mac OS, Linux)

Clang 주소 새니타이저는 정렬(버스) 오류 및 분할 오류와 같은 기타 메모리 오류를 찾는 데 도움이 됩니다. 아래 명령은 올바른 컴파일 옵션을 설정합니다.

```sh
make clean # only required on first address sanitizer run after a normal build
PX4_ASAN=1 make px4_sitl jmavsim
```

## Valgrind

```sh
brew install valgrind
```

또는

```sh
sudo apt-get install valgrind
```

SITL 시뮬레이션 중에 valgrind를 사용하려면:

```sh
make px4_sitl_default jmavsim___valgrind
```

## 조합 시작

SITL은 디버거를 연결하거나 연결하지 않고, jMAVSim 또는 Gazebo를 시뮬레이션 백엔드로 사용하여 시작할 수 있습니다. 그 결과 아래와 같은 시작 옵션이 나타납니다.

```sh
make px4_sitl_default jmavsim
make px4_sitl_default jmavsim___gdb
make px4_sitl_default jmavsim___lldb

make px4_sitl_default gazebo
make px4_sitl_default gazebo___gdb
make px4_sitl_default gazebo___lldb
```

여기서 마지막 매개변수는 &lt;viewer\_model\_debugger&gt; 삼중항입니다(밑줄 3개를 사용하면 기본 "iris" 모델을 의미함). 그러면, 디버거가 시작되고 SITL 애플리케이션이 시작됩니다. 디버거 셸에서 실행을 중지하려면 `CTRL-C`를 입력합니다.

```sh
Process 16529 stopped
* thread #1: tid = 0x114e6d, 0x00007fff90f4430a libsystem_kernel.dylib`__read_nocancel + 10, name = 'px4', queue = 'com.apple.main-thread', stop reason = signal SIGSTOP
    frame #0: 0x00007fff90f4430a libsystem_kernel.dylib`__read_nocancel + 10
libsystem_kernel.dylib`__read_nocancel:
->  0x7fff90f4430a <+10>: jae    0x7fff90f44314            ; <+20>
    0x7fff90f4430c <+12>: movq   %rax, %rdi
    0x7fff90f4430f <+15>: jmp    0x7fff90f3fc53            ; cerror_nocancel
    0x7fff90f44314 <+20>: retq
(lldb) 
```

DriverFrameworks 스케줄링이 디버깅 세션을 방해하지 않도록 하려면, `SIGCONT`를 LLDB 및 GDB에서 마스킹합니다.

```bash
(lldb) process handle SIGCONT -n false -p false -s false
```

또는 GDB의 경우:

```
(gdb) handle SIGCONT noprint nostop
```

그 후 lldb 또는 gdb 셸은 일반 세션처럼 작동합니다. LLDB/GDB 문서를 참고하십시오.

마지막 매개변수인 &lt;viewer\_model\_debugger&gt; 트리플렛은 실제로 빌드 디렉토리에서 make에 전달되므로

```sh
make px4_sitl_default jmavsim___gdb
```

명령은 다음 명령과 같습니다.

```sh
make px4_sitl_default   # Configure with cmake
make -C build/px4_sitl_default jmavsim___gdb
```

빌드 디렉토리에서 사용 가능한 make 대상의 전체 목록은 다음 명령어로 조회할 수 있습니다.

```sh
make help
```

그러나, 편의를 위해 &lt;viewer\_model\_debugger&gt; 삼중항만 있는 목록이 다음 명령으로 출력됩니다.

```sh
make list_vmd_make_targets
```

## 컴파일러 최적화

`posix_sitl_*`에 대해 구성할 때 주어진 실행 파일 및/또는 모듈(cmake에서 `add_executable` 또는 `add_library`로 추가)에 대한 컴파일러 최적화를 억제할 수 있습니다. This can be handy when it is necessary to step through code with a debugger or print variables that would otherwise be optimized out.

To do so, set the environment variable `PX4_NO_OPTIMIZATION` to be a semi-colon separated list of regular expressions that match the targets that need to be compiled without optimization. This environment variable is ignored when the configuration isn't `posix_sitl_*`.

For example,

```sh
export PX4_NO_OPTIMIZATION='px4;^modules__uORB;^modules__systemlib$'
```

The targets that can be matched with these regular expressions can be printed with the command:

The targets that can be matched with these regular expressions can be printed with the command:

```sh
make -C build/posix_sitl_* list_cmake_targets
```

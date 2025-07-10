---
canonicalUrl: https://docs.px4.io/main/en/contribute/code
---

# Source Code Management

## Branching Model

The PX4 project uses a three-branch Git branching model:

* [master](https://github.com/PX4/PX4-Autopilot/tree/main) is by default unstable and sees rapid development.
* [beta](https://github.com/PX4/PX4-Autopilot/tree/beta) has been thoroughly tested. It's intended for flight testers.
* [stable](https://github.com/PX4/PX4-Autopilot/tree/stable) points to the last release.

We try to retain a [linear history through rebases](https://www.atlassian.com/git/tutorials/rewriting-history) and avoid the [Github flow](https://guides.github.com/introduction/flow/). 
However, due to the global team and fast moving development we might resort to merges at times.

To contribute new functionality, [sign up for Github](https://help.github.com/articles/signing-up-for-a-new-github-account/), then [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository, [create a new branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository), add your changes, and finally [send a pull request](https://help.github.com/articles/using-pull-requests/). 
Changes will be merged when they pass our [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) tests.

All code contributions have to be under the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause) and all code must not impose any further constraints on the use.

## Code Style

PX4 uses the [Google C++ style guide](https://google.github.io/styleguide/cppguide.html), with the following (minimal) modifications:

### Tabs

- Tabs are used for indentation (equivalent to 8 spaces).
- Spaces are used for alignment.

### Line Length

- Maximum line length is 120 characters.

### File Extensions

- Source files use extension `*.cpp` instead of `*.cc`.

### Function and Method Names

- `lowerCamelCase()` is used for functions and methods to *visually* distinguish them from `ClassConstructors()` and `ClassNames`.

### Class Privacy Keywords

- *zero* spaces before `public:`, `private:`, or `protected:` keywords.

### Example Code Snippet

```cpp
class MyClass {
public:

        /**
         * @brief Description of what this function does.
         *
         * @param[in] input_param Clear description of the input [units]
         * @return Whatever we are returning [units]
         */
        float doSomething(const float input_param) const {
                const float in_scope_variable = input_param + kConstantFloat;
                return in_scope_variable * private_member_variable_;
        }

        void setPrivateMember(const float private_member_variable) { private_member_variable_ = private_member_variable; }

        /**
         * @return Whatever we are "getting" [units]
         */
        float getPrivateMember() const { return private_member_variable_; }

private:
    
        // Clear description of the constant if not completely obvious from the name [units]
        static constexpr float kConstantFloat = ...;  

        // Clear description of the variable if not completely obvious from the name [units]
        float private_member_variable_{...};
};
```

## In-Source Documentation

PX4 developers are encouraged to create appropriate in-source documentation.

:::note
Source-code documentation standards are not enforced, and the code is currently inconsistently documented.
We'd like to do better!
:::
  
Currently we have two types of source-based documentation:
- `PRINT_MODULE_*` methods are used for both module run time usage instructions and for the [Modules & Commands Reference](../modules/modules_main.md) in this guide.
  - The API is documented [in the source code here](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381). 
  - Good examples of usage include the [Application/Module Template](../modules/module_template.md) and the files linked from the modules reference.
- We encourage other in-source documentation *where it adds value/is not redundant*. 

  :::tip
  Developers should name C++ entities (classes, functions, variables etc.) such that their purpose can be inferred - reducing the need for explicit documentation.
  :::
  
  - Do not add documentation that can trivially be inferred from C++ entity names.
  - ALWAYS specify units of variables, constants, and input/return parameters where they are defined.
  - Commonly you may want to add information about corner cases and error handling.
  - [Doxgyen](http://www.doxygen.nl/) tags should be used if documentation is needed: `@class`, `@file`, `@param`, `@return`, `@brief`, `@var`, `@see`, `@note`.
    A good example of usage is [src/modules/events/send_event.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/events/send_event.h).

Please avoid "magic numbers", for example, where does this number in the conditional come from? What about the multiplier on yaw stick input?

```cpp
if (fabsf(yaw_stick_normalized_input) < 0.1f) {
        yaw_rate_setpoint = 0.0f;
}
else {
        yaw_rate_setpoint = 0.52f * yaw_stick_normalized_input;
}
``` 

Instead, define the numbers as named constants with appropriate context in the header:

```cpp
// Deadzone threshold for normalized yaw stick input
static constexpr float kYawStickDeadzone = 0.1f;

// [rad/s] Deadzone threshold for normalized yaw stick input
static constexpr float kMaxYawRate = math::radians(30.0f);
```

and update the source implementation.
```cpp
if (fabsf(yaw_stick_normalized_input) < kYawStickDeadzone) {
        yaw_rate_setpoint = 0.0f;
}
else {
        yaw_rate_setpoint = kMaxYawRate * yaw_stick_normalized_input;
}
```

## Commits and Commit Messages

Please use descriptive, multi-paragraph commit messages for all non-trivial changes.
Structure them well so they make sense in the one-line summary but also provide full detail.

```
Component: Explain the change in one sentence. Fixes #1234

Prepend the software component to the start of the summary
line, either by the module name or a description of it.
(e.g. "mc_att_ctrl" or "multicopter attitude controller").

If the issue number is appended as <Fixes #1234>, Github
will automatically close the issue when the commit is
merged to the master branch.

The body of the message can contain several paragraphs.
Describe in detail what you changed. Link issues and flight
logs either related to this fix or to the testing results
of this commit.

Describe the change and why you changed it, avoid to
paraphrase the code change (Good: "Adds an additional
safety check for vehicles with low quality GPS reception".
Bad: "Add gps_reception_check() function").

Reported-by: Name <email@px4.io>
```

**Use **`git commit -s`** to sign off on all of your commits.** This will add `signed-off-by:` with your name and email as the last line.

This commit guide is based on best practices for the Linux Kernel and other [projects maintained](https://github.com/torvalds/subsurface/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115) by Linus Torvalds.

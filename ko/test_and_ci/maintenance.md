# Maintenance notes

This picks and describes some tools to help analyze the state of the codebase and support its maintenance.

## Analyze churn

The amount of churn, so the number of changes done to a file can be an indicator which files/parts might need refactoring.

To find churn metrics a tool such as [Churn](https://github.com/danmayer/churn) can be used:

```
gem install churn
```

An example output as of `v1.6.0-rc2` would be:

```
cd src/Firmware
churn --start_date "6 months ago"
**********************************************************************
* Revision Changes
**********************************************************************
Files
+------------------------------------------+
| file                                     |
+------------------------------------------+
| src/modules/navigator/mission.cpp        |
| src/modules/navigator/navigator_main.cpp |
| src/modules/navigator/rtl.cpp            |
+------------------------------------------+



**********************************************************************
```

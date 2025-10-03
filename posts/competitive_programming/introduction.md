---
title: "Introduction to C++"
href: "introduction_to_cpp"
date: "2025-09-08"
subtopics:
  - Introduction
  - Installation
order: 2
---
# Introduction to C++
Before we get into coding stuff, we should start with installing code editor.

## How to setup MinGW
- Download MinGW from [https://nuwen.net/files/mingw/mingw-19.0.exe](https://nuwen.net/files/mingw/mingw-19.0.exe) and extract to C:\
- Open “Edit the system environment” inside Control Panel.
- Click on “Environment Variables..”.
- Select Path inside the User variables and click edit.
- Click new and paste “C:\MinGW\bin” then check with g++ --version in.

## How to setup VSCode
- Download Visual Code Studio.
- Download Extensions: C/C++ Extension Pack.
- Navigate: File > Preferences > Settings > User > Extensions > C/C++ > C_CppDefault: Compiler Path > Edit in settings.json.
- Place "C_Cpp.default.compilerPath": "C:/MinGW/bin/g++.exe",
- Reopen Visual Code Studio.
- Download Extensions: Code Runner.
- Open settings.
- Search for code runner in terminal and tick it.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    cout << "Hello World";
    return 0;
}
```
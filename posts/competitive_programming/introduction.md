---
title: "Introduction to C++"
href: "introduction_to_cpp"
date: "2025-10-01"
order: 2
---
# Introduction to C++
Before we get into coding stuff, we should start with installing code editor.

## Installation
### How to setup MinGW
- Download MinGW from [https://nuwen.net/files/mingw/mingw-19.0.exe](https://nuwen.net/files/mingw/mingw-19.0.exe) and extract to C:\
- Open “Edit the system environment” inside Control Panel.
- Click on “Environment Variables..”.
- Select Path inside the User variables and click edit.
- Click new and paste “C:\MinGW\bin” then check with g++ --version in.

### How to setup VSCode
- Download Visual Code Studio.
- Download Extensions: C/C++ Extension Pack.
- Navigate: File > Preferences > Settings > User > Extensions > C/C++ > C_CppDefault: Compiler Path > Edit in settings.json.
- Place "C_Cpp.default.compilerPath": "C:/MinGW/bin/g++.exe",
- Reopen Visual Code Studio.
- Download Extensions: Code Runner.
- Open settings.
- Search for code runner in terminal and tick it.

## Introduction
This is an example of c++ code.
```cpp
#include <iostream>
using namespace std;

int main(){
    cout << "Hello World";
    return 0;
}
```
- Every line of codes (Except few, will expand on this later) ends with ; . You can think of it as a fullstop in English sentences.
- Code is always executed from left to right and top to bottom line by line.
- Line of codes are usually written inside main block because main function is where code execution begins so just write everything in main for now.

## Variable
Variables are used to store values that can be accessed and modified. There are mainly 5 types of variables in C++.
- **int**: stores integer.
- **float**: stores real number.
- **double**: same as float but with more decimal positions.
- **char**: stores a single character.
- **bool**: store false or true value.
### How to declare variables in C++
```cpp
variable_type variable_name = value; // This one has initial value
variable_type variable_name; // This one does not
```
Example:
```cpp
#include <iostream>
using namespace std;

int main(){
    int a = 1;
    cout << a;
    return 0;
}
```
### Rules for naming a variable
- No space or special characters like ! @ % and more in the name.
- No starting a name with a number.
- Reserved C++ keywords are not allowed as a variable name.
```cpp
int aBlDllelE; // Valid
int eje eje; // Invalid
char double; // Invalid
int _DDDEE_eeE; // Valid
int 4lin; // Invalid
double g!as%; // Invalid
```
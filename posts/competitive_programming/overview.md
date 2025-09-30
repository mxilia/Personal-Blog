---
title: "Overview" 
href: "overview"
date: "2025-09-28"
subtopics:
  - Introduction
  - Installation
order: 1
---
# Snake-RL
Deep-Q-Learning with various optimization technique implemented using pytorch to try and solve a 10x10 game of snake. The optimizations I use are Double Deep-Q-Learning, Dueling Structure and Noisy Network. In the future, I might also implement more optimizations or different reinforcement learning algorithms.<br><br>
For this project, I use Python 3.13.1, the game is written using Pygame, the reinforcement learning algorithm and anything related to it is implemented using pytorch, the plot is plotted using matplotlib and some calculations were done with the help of numpy.
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    cout << "Hello World";
    return 0;
}
```
## Usage
To clone this repository, run:
```
git clone https://github.com/mxilia/Snake-RL.git
```

then:
```
cd Snake-RL
```

Download the required library by running:
```
pip install -r requirements.txt
```

To train a new model, run:
```
python main.py -option 1 -modelName <Name>
```

To add optimization, use the following arguments:
<table>
    <tr>
        <th>Argument</th>
        <th>Info</th>
        <th>Default</th>
        <th>Action</th>
    </tr>
    <tr>
        <td>-dueling</td>
        <td>Passing this argument will make your model ultilise Dueling Structure.</td>
        <td>False</td>
        <td>Store true</td>
    </tr>
    <tr>
        <td>-double</td>
        <td>Passing this argument will make your model a Double DQN.</td>
        <td>False</td>
        <td>Store true</td>
    </tr>
    <tr>
        <td>-noisy</td>
        <td>Passing this argument makes your model ultilise Noisy Network for randomness instead of epsilon-greedy.</td>
        <td>False</td>
        <td>Store true</td>
    </tr>
</table>

For example, if you want to make a Double Dueling DQN, you run:
```
python main.py -option 1 -modelName <Name> -dueling -double
```
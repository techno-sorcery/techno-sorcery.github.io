---
title: FPGA Tic-Tac-Toe
author: Hayden Buscher
description: An FPGA-based Tic-Tac-Toe game, built as a final project for CPE 133.
---

### FPGA Tic-Tac-Toe
**Links**  
[Instructables](https://www.instructables.com/FPGA-Tic-Tac-Toe-1/)  
[YouTube Demo](https://www.youtube.com/watch?v=AvhSmPAga2U)

**Background**  

![The completed Tic-Tac-Toe game](/projects/img/tictactoe_finished.png)

During my spring quarter at Cal Poly, I took Professor Danowitz's Digital Design class (CPE 133). For our final project, we were tasked with implementing an "electronic game" on the Basys 3 FPGA board. Given my prior experience with digital electronics, I decided to do something more advanced- namely, with VGA graphics. After eight hours of cramming, what resulted was the Tic-Tac-Toe game described below.<br><br>

**Video Driver**  

![Video driver](/projects/img/tictactoe_video.png)

The video driver is a modified version of one sourced from [embeddedthoughts.com](https://embeddedthoughts.com/2016/07/29/driving-a-vga-monitor-using-an-fpga/). I went in knowing little about the VGA standard, but figured out how to output 640 columns by 480 horizontal lines per standard VGA timing.<br><br>

**Cell Module**

![Cell fsm](/projects/img/tictactoe_cellfsm.png)
![Cell module](/projects/img/tictactoe_cell.png)

Each cell is implemented as an FSM with three states- N, X, and O. In the N state, nothing is displayed on the grid. All cells start in N but transition to X or O if selected, depending on the turn. Corresponding symbols are displayed in the latter states. Cells stay set until the game is reset, at which they revert to N. Nine individual cells are instantiated in the top-level module, as to fill the 3x3 grid.<br><br>

**Video Elements**

![Elements](/projects/img/tictactoe_elements.png)

This module interfaces with the video driver, and is responsible for generating graphics. Each shape has a conditional statement defining the bounds on which it's drawn. Additionally, the shape and color drawn in a given cell depend on its state.<br><br>

**Game State**

![Game state](/projects/img/tictactoe_gamestate.png)

This module is implemented as an FSM with two states- PLAY and WIN. In the PLAY state, it checks for valid matches across rows, columns, and diagonals. This is taken from an 18-bit concatenation of all cell statuses. If this condition is met, it transitions to the WIN state which blocks input until the game is reset. It also generates the color of each cell, which is read by the videoElements module.<br><br>

**Top-level**

The top-level module ties everything together- input, graphics, cells, and game state. It also keeps track of the current turn. Input is taken with an "always_comb" block, with priority given to the highest switch.<br><br>

**Game Play**

![Game Play](/projects/img/tictactoe_gameplay.png)

1. The game starts out with an empty grid
2. Players take turns flipping one of the first nine switches on the board.
3. Each time a switch is flipped, a turn is taken and the chosen cell transitions to an X or O.
4. When a row of three matching cells is made (horizontal, vertical, diagonal), the cells are turned red and the game is won. No moves can be made until the game is reset using the middle control pad button.

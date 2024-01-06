---
title: ATLAS PDC-8
author: Hayden Buscher
description: An 8-bit transport triggered OISC. Uses a single 'MOV' instruction for maximum simplicity.
group: Homebrew CPUs
---

### ATLAS PDC-8
**Links**  
[GitHub](https://github.com/techno-sorcery/PDC-8)  
[Fibonacci demo](https://www.youtube.com/watch?v=G-2V7RjiHaM)<br><br>

**Background**  
'PDC' is an initialism for 'Personal Data Controller', similar to old-school names such as 'Programmable Data Processor' (PDP). The PDC-8 is meant to somewhat represent a low-cost minicomputer from the early 1970s, with a simple, easy-to-build, chip-reduced design.<br><br>

**Architecture**

![PDC-8 architecture flowchart](/projects/img/pdc_arch.png)

The PDC-8 is a Harvard architecture machine, with strictly-separated address spaces for program and data memory. This was done for the sake of simplicity, as it greatly reduces the amount of necessary control logic. By eliminating the Von Neumann bottleneck, it also allows for higher instruction throughput.

Several registers are available to the programmer:

- ACC - Accumulator, general purpose
- OP - Operand, set ALU function
- SUM - ALU result buffer
- MARL - RAM address, low
- MARH - RAM address, high
- PC - PC address, low
- PCH - PC address, high

Two 74181s make up the ALU. Function, mode, and carry select bits are sourced from the OP register. Results are saved in the SUM register before being moved on the next instruction cycle. The accumulator implicitly acts as the first ALU operand, while the data bus acts as the second.

Two status flags are produced by arithmetic operations, EQUAL and CARRY. These are used as branch conditions, making the PDC-8 turing complete.

Both address busses are 16-bits wide, allowing them to access 64k of memory. Data addresses are stored in the MAR registers, which must be written in separate instructions.<br><br>

**Instruction set**  
The PDC-8 follows the transport-triggered model, where computation is a side effect of data transport. Since the only instruction is 'MOV', it could be considered an OISC (one instruction set computer).
 
Since each instruction executes within a clock cycle, many operations take less time to execute than on more complex architectures. Since the programmer has control over all functions, stack operations, subroutine jumps, and other complex "macroinstructions" can be implemented.

Instructions contain an 8-bit immediate, followed by an 8-bit opcode. This makes for a 16-bit wide program memory.<br><br>

**Assembler**  
A simple two-pass microassembler was adopted from the CPU-16, allowing instructions to be defined as a sequence of moves, followed by an immediate. However, a higher-level assembler could easily be implemented.

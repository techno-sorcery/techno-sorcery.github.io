---
title: ATLAS PDC-8
author: Hayden Buscher
description: An 8-bit transport triggered OISC. Uses a single 'MOV' instruction for maximum simplicity.
group: Homebrew CPUs
---

<div class="border header">
<hr>
<p>An 8-bit transport triggered OISC. Uses a single 'MOV' instruction for maximum simplicity.</p>
<hr>
</div>

### ATLAS PDC-8
**Links**  
[GitHub](https://github.com/techno-sorcery/PDC-8)  
[Fibonacci demo](https://www.youtube.com/watch?v=G-2V7RjiHaM)<br><br>

**Background**  
'PDC' is an initialism for 'Personal Data Controller', similar to old-school names such as 'Programmable Data Processor' (PDP). The PDC-8 is meant to somewhat represent a low-cost minicomputer from the early 1970s, with a simple, easy-to-build, chip-reduced design.<br><br>

**Architecture**

![PDC-8 architecture flowchart](/files/images/pdc_arch.png)

The PDC-8 is a Harvard architecture machine, with separate address spaces for programs and data, and no provisions for random program memory operations. This was done for the sake of simplicity, as it greatly reduces the amount of neccessary control logic. By eliminating the Von Neumann bottleneck, it also allows for higher instruction throughput.

Several registers are availale to the programmer:

- ACC - Accumulator, general purpose
- OP - Operand, set ALU function
- SUM - ALU result buffer
- MARL - RAM address, low
- MARH - RAM address, high
- PC - PC address, low
- PCH - PC address, high

Two 74181s make up the ALU. Function, mode, and carry select bits are sourced from the OP register, which stores an immediate value. Results are saved in the SUM register before being moved elsewhere on the next instruction cycle. The accumulator implicitly acts as the first operand, while the data bus acts as the second.

Two status flags are produced by arithmetic operations, EQUAL and CARRY. These can be used to determine whether a jump executes or not, meaning the PDC-8 is indeed turing complete.

Both the program and data address busses are 16-bits wide, allowing both to access 64k of memory. Data addresses are stored in the MAR registers, which must be written to on separate instructions.<br><br>

**Instruction set**  
The PDC-8 follows a transport-triggered architectural model, in which computation is performed as a side effect of data transport. As the only instruction is 'MOV', it could be considered an OISC (one instruction set computer).
 
Since each instruction only occupies a single clock pulse, many algorithms take less cycles to execute than on more complex architectures. Because the programmer has control over every CPU function, advanced macroinstructions such as stack operations and subroutine jumps can be implemented.

Instructions contain an 8-bit immediate, followed by an 8-bit opcode. This makes for a 16-bit wide program memory.<br><br>

**Assembler**  
No assembler currently exists for the PDC-8. However, it would most likely convert typical 'macroinstructions' into several-step chunks of machine code.
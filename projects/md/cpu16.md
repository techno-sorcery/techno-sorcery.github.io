---
title: ATLAS CPU-16
author: Hayden Buscher
description: A 16-bit CISC architecture CPU, loosely based off the mc68000.
date: 03/07/2022
group: Homebrew CPUs
---

<div class="border header">
<hr>
<p>A 16-bit CISC architecture CPU, loosely based off the mc68000.</p>
<hr>
</div>

### ATLAS CPU-16
**Links**  
[GitHub](https://github.com/techno-sorcery/CPU-16)  
[Info sheet](https://docs.google.com/spreadsheets/d/1oUmNbYWaNhDA6R6yvVTsaPwRNyT6d51xgqEzrvvlCoQ/edit?usp=sharing)  
[Assembler demo](https://www.youtube.com/watch?v=J5K6y3BfLHA)  
["Hello, world!" demo](https://www.youtube.com/watch?v=JQ4_DpvTwrQ)<br><br>

**Architecture**

![CPU-16 architecture flowchart](/projects/img/cpu16_arch.png)

The CPU-16 uses a Von Neumann architecture, with a single address space containing both instructions and data.

There are eight general-purpose registers, D0-D7. Any combination can be selected as operands within the instruction word. However, D7 is implicitly used for stack operations. As with most other architectures, the stack grows down. Separately, there's a condition register (processor status/flags), and 16-bit program counter.

The ALU uses four 74181s. Additional circuitry provides byte swap, right bit-shift, and sign-extend functionality. Four flags— negative, zero, carry, overflow— are set every ALU operation  and used by conditional jumps.

Support is included for seven maskable interrupts, peripheral direct memory access, and (in the future) fault handling.

To prevent clock skew, a two-phase clock is used. Microcode is buffered on the first phase, and all other synchronous chips are clocked on the second.

A maximum of 64k words can be addressed at once, through the 16-bit address bus. However, this could be extended further with the implementation of a paging unit.<br><br>

**Instruction set**

![CPU-16 instruction list](/projects/img/cpu16_isa.png)

The CPU-16 instruction set is orthogonal by design, allowing the programmer to use any set of addressing modes with (most) instructions. Supported modes include:
- [reg] - Register
- $m - Address, direct
- $m(PC) - Program counter, offset
- (reg) - Register, indirect
- $m(reg) - Register, indirect, offset
- (reg)+ Register, indirect, post-incremented
- -(reg) REgister, indirect, pre-decremented
- \#m - Immediate

Special "quick" instructions can use an immediate from 0-7, stored in the instruction word.

A CISC instruction set was chosen for maximum instruction density, as well as because it's what the mc68000 used.

Microinstructions are stored in a 2k word memory bank. 10 bit instruction opcodes act as a starting index, while an equally-wide NEXT field provides the next micro-address. Because microinstructions can jump to wherever, a significant amount of code can be reused.

Interrupts, faults, and reset requests also act as microinstruction indexes, and are appropriately selected based on current execution conditions.<br><br>

**Assembler**

![CPU-16 architecture flowchart](/projects/img/cpu16_asm.png)

A quick-and-dirty assembler was written in Python, since only masochists like programming in machine code. It's a two-pass assembler; instructions are parsed first, and labels are filled in afterward.

Mnemonics and program structure are similar to that of a conventional mc68000 assembler.

Parameters are arranged in the order of "source,destination". Instructions are written as they appear on the info sheet.

Several directives are supported, including "dw" which defines a series of individual primitive data types and strings in memory.
---
title: IVANIAC
author: Hayden Buscher
description: My first CPU, a 4-bit Harvard architecture machine built in Minecraft.
date: 03/07/2023
group: Homebrew CPUs
---

<div class="border header">
<hr>
<p>My first CPU, a 4-bit Harvard architecture machine built in Minecraft. Named for my old pseudonym.</p>
<hr>
</div>

### IVANIAC
**Links**  
[YouTube demo](https://youtu.be/TZ7_-GC8dOE)  
[World download](http://www.mediafire.com/file/opm06dq...)<br><br>

**Architecture**

![IVANIAC architecture flowchart](/files/images/ivaniac_arch.png)

The IVANIAC is a Harvard architecture CPU, as it stores instructions in a separate instruction space from data. It lacks a dedicated data store, instead using two general-purpose registers. Both act as ALU operands, and can freely operate upon each other. It also features a display register, and a program counter

With a data width of 4 bits and no carry support, its numerical range is limited from 0 to 15. 

The ALU can perform one of four functions on A and B— ADD, AND, OR, or XOR. Every operation sets the "overflow" flag, which is used by conditional jumps.<br><br>

**Instruction set**  
In total, the IVANIAC has 16 bytes of 8-bit-wide program memory. The first half of each byte is an opcode, and the last half can be an immedate value or address depending on the instruction.

1. 00000000 - NOP
2. 0001xxxx - MOV xxxx TO A
3. 0010xxxx - MOV xxxx TO B
4. 00110000 - MOV B TO A
5. 01000000 - MOV A TO B
6. 01010000 - ADD B TO A
7. 01100000 - ADD A TO B
8. 01110000 - AND B TO A
9. 10000000 - XOR B TO A
10. 10010000 - OR B TO A
11. 10100000 - MOV INPUT TO A
12. 10110000 - MOV INPUT TO B
13. 11000000 - MOV A TO DISP
14. 11010000 - MOV B TO DISP
15. 1110xxxx - JMP TO xxxx
16. 1111xxxx - JMP TO xxxx IF C != 1

In the demo uploaded to YouTube, the IVANIAC was shown calculating fibonacci numbers. The program alternated between adding A and B to each other, moving them to the display register, and performing a conditional jump if there was an overflow.<br><br>

**Background**

![IVANIAC flyover](/files/images/ivaniac_flyover.png)

In retrospect, the IVANIAC is a pretty poor design. Instruction decoding relies on slow repeaters, there's no arithmetic carry, no data memory, and address space is severely limited with 4 bits. However, I'm still proud of having built it.

I began working on the machine in late 2019, as a high school sophomore. I knew relatively little about computer engineering, but had nevertheless  wanted to build a redstone CPU. Far in over my head, the project quickly fizzled out. By the time April 2020 came around, I was stuck at home and had nothing better to do but finish the IVANIAC. After an entire week of building, it was finally completed.

It's amazing that the IVANIAC works at all, considering I didn't have any clear plans or schematics. I came up with everything as I went along, learning CPU design for the first time. Despite its inherent quirks, I'll always champion the IVANIAC as my first-ever architecture.
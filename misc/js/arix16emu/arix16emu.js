// ARIX-16 Emulator
// Hayden Buscher, 2024

const memsize = 17 ** 2;

var regs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var pc = 0;
var iv = 0;
var flags = [0,0,0,0];
// var mem = new Array(memsize).fill(0);
var mem = []

function cycle() {
    let isr = mem[pc];
}

function alu(srcA, srcB, aluop, flags){
    let sum;

    if (aluop == 0) {   // inc
        sum = srcA + 1;
    } else if (aluop == 1) {    // dec
        sum = srcA - 1;
    } else if (aluop == 2) {    // add
        sum = srcA + srcB;
    } else if (aluop == 3) {    // adc
        sum = srcA + srcB + flags[2];
    } else if (aluop == 4) {    // sub
        sum = srcA - srcB;
    } else if (aluop == 5) {    // sbb
        sum = srcA  - srcB - flags[2];
    } else if (aluop == 6) {    // and
        sum = srcA & srcB;
    } else if (aluop == 7) {    // or
        sum = srcA | srcB;
    } else if (aluop == 8) {    // xor
        sum = srcA ^ srcB;
    } else if (aluop == 9) {    // not
        sum = ~srcA;
    } else if (aluop == 10) {   // lsh
        sum = srcA << 1;
    } else if (aluop == 11) {   // lrt
        sum = (srcA << 1) + flags[2];
    } 
    
}

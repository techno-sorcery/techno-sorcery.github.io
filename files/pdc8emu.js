// ATLAS PDC-8 Emulator
// Hayden Buscher ~ 2022

// Define variables
const prgMem = ["2c09", "1800", "2400", "0c01", "1401", "7400", "3900", "1a00", "1300", "7400", "3a00", "1a00", "0b00", "3405"];
const datMem = [];
var run = false;
var dbus = 0;

// Register vars
var regAcc = 0;
var regMar = 0;
var regOp = 0;
var regSum = 0;
var regPC = 0;
var regDisp = 0;
var condC = 0;
var condE = 0;
var instruction = 0

// Operation dictionaries
let dout = {
    "000": "",
    "001": "ACC DOUT",
    "010": "MEM DOUT",
    "011": "SUM DOUT",
    "100": "IMM DOUT",
    "101": "INVALID",
    "110": "INVALID",
    "111": "INVALID"
}

let st = {
    "000":"",
    "001":"ACC ST",
    "010":"MEM ST",
    "011":"SUM ST",
    "100":"MAR ST",
    "101":"OP ST",
    "110":"PC ST",
    "111":"DISP ST"
}

let cond = {
    "00":"",
    "01":"C = 1",
    "10":"E = 1",
    "11":"E != 1"
}

// Initialize arrays
for(var i = 0; i < 242; i++)
{
    prgMem[i+14] = "0000";
    if(i < 128)
    {
        datMem[i] = "0";
    }
}

prgMemDump();
datMemDump();
reset();

// Functions
// Execute current instruction
function execute(){
    //  Parse instruction
    // Data out
    let tempCode = dout[instruction.substr(instruction.length-11, 3)]
    if(tempCode == 'ACC DOUT') {
        dbus = regAcc;
    } else if (tempCode == 'MEM DOUT') {
        dbus = parseInt(datMem[regMar], 16);
    } else if (tempCode == 'SUM DOUT') {
        dbus = regSum; 
    } else if (tempCode == 'IMM DOUT') {
        dbus = parseInt(instruction.substr(instruction.length-8, 8), 2);   
    }
    // Register store
    tempCode = st[instruction.substr(instruction.length-14, 3)]
    if(tempCode == 'ACC ST') {
        regAcc = dbus;
        setDisp("regDispAcc", regAcc, bin2hex(regAcc), regAcc.toString(2), 8);
    } else if (tempCode == 'MEM ST') {
        datMem[regMar] = dbus.toString(16);
        datMemDump();
    } else if (tempCode == 'SUM ST') {
        regSum = getSum();
        setDisp("regDispSum", regSum, bin2hex(regSum), regSum.toString(2), 8);
    } else if (tempCode == 'MAR ST') {
        regMar = dbus;
        setDisp("regDispMar", regMar, bin2hex(regMar), regMar.toString(2), 8);
    } else if (tempCode == 'OP ST') {
        regOp = dbus;
        setDisp("regDispSum", regSum, bin2hex(regSum), regSum.toString(2), 8);
    } else if (tempCode == 'PC ST') {
        regPC = dbus;
        setDisp("regDispSum", regSum, bin2hex(regSum), regSum.toString(2), 8);
    } else if (tempCode == 'DISP ST') {
        regDisp = dbus;
        setDisp("regDispSum", regSum, bin2hex(regSum), regSum.toString(2), 8);
    }
    
    dbus = 0;
    regPC = regPC + 1;
    setDisp("regDispPc", regPC, regPC.toString(16), regPC.toString(2), 8);
    instructionRead();
}

// Set PC to jump value
function inputJump() {
    let input = 0;
    num = prompt("Input hex address from 0 - FF to jump to.");
    if (parseInt(num, 16) <= 255){
        input = num;
    } 
    regPC = parseInt(input, 16);
  setDisp("regDispPc", regPC, regPC.toString(16), regPC.toString(2), 8);
  instructionRead();
}

// Read instruction pointed to by PC
function instructionRead(){
    instruction = hex2bin(prgMem[regPC]);
    while(instruction.length < 16) {
        instruction = "0".concat(instruction);
    }
    
    document.getElementById("instructionBin").innerHTML = instruction;
    document.getElementById("instructionHex").innerHTML = prgMem[regPC];
    document.getElementById("instructionAsm").innerHTML = disAsm(prgMem[regPC]);
}

// Step program counter
function step(){
    execute();
}

// Program memory dump
function prgMemDump() {
document.getElementById("prgMemDisp").innerHTML = '';
for(var i = 0; i < 256; i++) {
    if (i % 1 == 0) {
        if ( i == 0) {
            document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat('0',i.toString(16),': ');
        } else if (i <= 15) {
            document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat('\n', '0', i.toString(16),': ');
        } else {
            document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(' \n', i.toString(16),': ');
        }  
    }
    document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(' ', prgMem[i]);
    
    let hexBin = hex2bin(prgMem[i]);
    
    while(hexBin.length < 16) {
        hexBin = "0".concat(hexBin);
    }
    document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(' - ');
    if(dout[hexBin.substr(hexBin.length-11, 3)] != '') {
        document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(dout[hexBin.substr(hexBin.length-11, 3)], ', ');
    }    
    if(st[hexBin.substr(hexBin.length-14, 3)] != '') {
        document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(st[hexBin.substr(hexBin.length-14, 3)], ', ');
     }
     if(cond[hexBin.substr(hexBin.length-16, 2)] != '') {
         document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(cond[hexBin.substr(hexBin.length-16, 2)]);
    } 
}
}

// Disassemble inputted instruction
function disAsm(hex) {
    let hexBin = hex2bin(hex);
    let output = '';
    
    while(hexBin.length < 16) {
        hexBin = "0".concat(hexBin);
    }
    
    if(dout[hexBin.substr(hexBin.length-11, 3)] != '') {
        output = output.concat(dout[hexBin.substr(hexBin.length-11, 3)], ', ');
    }    
    if(st[hexBin.substr(hexBin.length-14, 3)] != '') {
        output = output.concat(st[hexBin.substr(hexBin.length-14, 3)], ', ');
     }
     if(cond[hexBin.substr(hexBin.length-16, 2)] != '') {
         output = output.concat(cond[hexBin.substr(hexBin.length-16, 2)]);
    }  
    return output;
}

// Data memory dump
function datMemDump() {
document.getElementById("datMemDisp").innerHTML = '';
for(var i = 0; i < 128; i++) {
    if (i % 8 == 0) {
        if ( i == 0) {
            document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat('0',i.toString(16),': ');
        }
        else if (i <= 15)
        {
            document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat('\n', '0', i.toString(16),': ');
        } else {
            document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat(' \n', i.toString(16),': ');
        }  
    }
    let thisMem = datMem[i];
    if (parseInt(datMem[i], 16) <= 15){
        thisMem = "0".concat(thisMem);   
    }
    
    document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat(' ', thisMem);
}
}

// Convert hex to binary
function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

// Convert binary to hex
function bin2hex(bin) {
    return (parseInt(bin, 2).toString(16));
}

// Set register display
function setDisp(disp, dec, hex, bin, len) {
        while(bin.length < 8) {
            if (bin.length < len) {
                bin = "0".concat(bin);
            } else {
                bin = "x".concat(bin);   
            }
        }
        if(hex.length < 2){
            hex = "0".concat(hex);   
        }
        
        document.getElementById(disp.concat("Dec")).innerHTML = dec;
        document.getElementById(disp.concat("Hex")).innerHTML = hex;
        document.getElementById(disp.concat("Bin")).innerHTML = bin;
}

// Reset computer
function reset(){
    regAcc = 0;
    regMar = 0;
    regOp = 0;
    regSum = 0;
    regPC = 0;
    regDisp = 0;
    condC = 0;
    condE = 0;
    setDisp("regDispAcc", 0, "0".toString(16), "0".toString(2), 8);
    setDisp("regDispMar", 0, "0".toString(16), "0".toString(2), 8);
    setDisp("regDispOp", 0, "0".toString(16), "0".toString(2), 8);
    setDisp("regDispSum", 0, "0".toString(16), "0".toString(2), 8);
    setDisp("regDispPc", 0, "0".toString(16), "0".toString(2), 8);
    setDisp("regDispDisp", 0, "0".toString(16), "0".toString(2), 8);
    setDisp("regDispFlags", 0, "0".toString(16), "0".toString(2), 2);
    instructionRead();
}

// ALU
function getSum() {
    return 0;
}

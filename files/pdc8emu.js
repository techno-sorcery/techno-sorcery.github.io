// ATLAS PDC-8 Emulator
// Hayden Buscher ~ 2022

// Define variables
const prgMem = ["2c09", "1800", "2400", "0c01", "1401", "7400", "3900", "1a00", "1300", "7400", "3a00", "1a00", "0b00", "3405"];
const datMem = [];
var run = false;
var dbus = 0;
var clockModifier = 5;

// Register vars
var regAcc = 0;
var regMar = 0;
var regOp = 0;
var regSum = 0;
var regPC = 0;
var regDisp = 0;
var condC = 0;
var condE = 0;
var regFlags = "00";
var instruction = 0

// Operation dictionaries
let dout = {
    "000": "",
    "001": "ACC_DOUT",
    "010": "MEM_DOUT",
    "011": "SUM_DOUT",
    "100": "IMM_DOUT",
    "101": "INVALID",
    "110": "INVALID",
    "111": "INVALID"
}
let st = {
    "000":"",
    "001":"ACC_ST",
    "010":"MEM_ST",
    "011":"SUM_ST",
    "100":"MAR_ST",
    "101":"OP_ST",
    "110":"PC_ST",
    "111":"DISP_ST"
}
let cond = {
    "00":"",
    "01":"C=1",
    "10":"E=1",
    "11":"E!=1"
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
    let condExec = true; 
    let tempCode = dout[instruction.substr(instruction.length-11, 3)]
    if(tempCode == 'ACC_DOUT') {
        dbus = regAcc;
    } else if (tempCode == 'MEM_DOUT') {
        dbus = parseInt(datMem[regMar], 16);
    } else if (tempCode == 'SUM_DOUT') {
        dbus = regSum; 
    } else if (tempCode == 'IMM_DOUT') {
        dbus = parseInt(instruction.substr(instruction.length-8, 8), 2);   
    }
    // Condition check
    tempCode = cond[instruction.substr(instruction.length-16, 2)]
    if(tempCode == 'C=1' && regFlags.substr(1) != 1) {
        condExec = false;
    } else if (tempCode == 'E=1' && regFlags.substr(0) != 1) {
        condExec = false;
    } else if (tempCode == 'E!=1' && regFlags.substr(0) == 1) {
        condExec = false;
    } 
    // Register store
    tempCode = st[instruction.substr(instruction.length-14, 3)]
    let jump = false;
    if(condExec == true) {
        if(tempCode == 'ACC_ST') {
            regAcc = dbus;
            setDisp("regDispAcc", regAcc, regAcc.toString(16), regAcc.toString(2), 8);
        } else if (tempCode == 'MEM_ST') {
            datMem[regMar] = dbus.toString(16);
            datMemDump();
        } else if (tempCode == 'SUM_ST') {
            regSum = getSum(dbus);
            regFlags = ''.concat(condE, condC);
            setDisp("regDispFlags", regFlags, regFlags.toString(16), regFlags.toString(2), 2);
            setDisp("regDispSum", regSum, regSum.toString(16), regSum.toString(2), 8);
        } else if (tempCode == 'MAR_ST') {
            regMar = dbus;
            setDisp("regDispMar", regMar, regMar.toString(16), regMar.toString(2), 8);
        } else if (tempCode == 'OP_ST') {
            regOp = dbus;
            setDisp("regDispOp", regOp, regOp.toString(16), regOp.toString(2), 8);
        } else if (tempCode == 'PC_ST') {
            jump = true;
            regPC = dbus;
            setDisp("regDispPc", regPC, regPC.toString(16), regPC.toString(2), 8);
        } else if (tempCode == 'DISP_ST') {
            regDisp = dbus;
            setDisp("regDispDisp", regDisp, regDisp.toString(16), regDisp.toString(2), 8);
            document.getElementById('regDispDispBig').innerHTML = regDisp;
        }
    }
    dbus = 0;
    if (jump == false) {
        regPC = regPC + 1;
    }
    setDisp("regDispPc", regPC, regPC.toString(16), regPC.toString(2), 8);
    instructionRead();
}

// Read instruction pointed to by PC
function instructionRead(){
    instruction = hex2bin(prgMem[regPC]);
    instruction = instruction.padStart(16, '0');
    document.getElementById("instructionBin").innerHTML = instruction;
    document.getElementById("instructionHex").innerHTML = prgMem[regPC];
    document.getElementById("instructionAsm").innerHTML = disAsm(prgMem[regPC]);
}

// Convert hex to binary
function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

// Convert binary to hex
function bin2hex(bin) {
    return (parseInt(bin, 2).toString(16));
}

// ALU
function getSum(operand) {
    let thisSum = regAcc+operand;
    condC = 0;
    condE = 0;
    if (thisSum > 255){
        condC = 1  
    }
    return thisSum;
}

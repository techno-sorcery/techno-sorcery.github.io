// ATLAS PDC-8 Assembler
// Hayden Buscher ~ 2022
// Define arrays
const asmInstParsed = []; // Address:Parsed instruction (bin)
const asmLabelDefs = []; // Address:Label defined
const asmLabelUse = []; // Address: Label used

// Define regular expressions
const reDecNum = /^#(?<num>[0-9]+)$/;
const reHexNum = /^#\$(?<num>[0-9A-Fa-f]+)$/;
const reBinNum = /^#%(?<num>[0-1]+)$/;
const reCharNum = /^#'(?<num>([\s\S]{1})|(\\n|\\a|\\b|\\t|\\r))'$/;

// Operation dictionaries
let asmDout = {
    'ACC_DOUT':256,
    'MEM_DOUT':512,
    'SUM_DOUT':768,
    'IMM_DOUT':1024
}
let asmSt = {
    'ACC_ST':2048,
    'MEM_ST':4096,
    'SUM_ST':6144,
    'MAR_ST':8192,
    'OP_ST':10240,
    'PC_ST':12288,
    'DISP_ST':14336
}
let asmCond = {
    'C=1':16384,
    'E=1':32768,
    'E!=1':49152
}

function assemble() {
    asmInstParsed.length = 0;
    asmLabelDefs.length = 0;
    asmLabelUse.length = 0;
    let asmCounter = 0;
    // Split raw asm line
    const asmRaw = document.getElementById('asmInput').value.toUpperCase().split('\n');
    for (const line of asmRaw){
        let thisLine = line;
        let parsedLine = 0;
        thisLine = thisLine.replace(/\t/g, '');
        thisLine = thisLine.replace(/,/g, ' ');
        thisLine = thisLine.split(' ');
        console.log(thisLine);
        // Parse instructions
        let comment = false;
        for (var i = 0; i < thisLine.length; i++) {
            // Parse if no preceeding semicolon, and if not blank
            if(comment == false && thisLine[i] != '') {
                //Check if comment
                comment = (thisLine[i].charAt(0) == ';');
                // Lookup mnemonic
                if (thisLine[i] in asmDout) {
                    parsedLine = parsedLine | asmDout[thisLine[i]];
                } else if (thisLine[i] in asmSt) {
                    parsedLine = parsedLine | asmSt[thisLine[i]];
                } else if (thisLine[i] in asmCond) {
                    parsedLine = parsedLine | asmCond[thisLine[i]];
                } else if (thisLine[i].charAt(0) == '#') { // Detect numerical value
                    if (numParse(thisLine[i]) < 256){
                        parsedLine = parsedLine | numParse(thisLine[i]);
                    }
                    else {
                        window.alert('Numerical value > 255');   
                    }
                } else if (thisLine[i].charAt(0) == '.') {
                    asmLabelDefs[asmCounter] = thisLine[i].split('.')[1];
                } else {
                    asmLabelUse[asmCounter] = thisLine[i];
                }
                console.log(thisLine[i]);
            }
        }
    }
}

// Search array for a string
function arraySearch(let myArray [], let ){
    
}

// Extract decimal number from #m
function numParse(operand) {
    if (reDecNum.test(operand)) {   // Decimal - #7
        return reDecNum.exec(operand)[1];
    } else if (reCharNum.test(operand)){    // Char - #'a'
        return reCharNum.exec(operand)[1].charCodeAt(0);
    } else if (reHexNum.test(operand)) {    // Hex - #$4f
        return parseInt(reHexNum.exec(operand)[1], 16);
    } else if (reBinNum.test(operand)) {    // Bin - #%01011100
        return parseInt(reBinNum.exec(operand)[1], 2);
    } else {
        window.alert('Invalid operand');
        return 0;
    }
}
// ATLAS PDC-8 Debugger
// Hayden Buscher ~ 2022

// Toggle start/Stop
function toggle(){
if(run == true){
    run = false;
    document.getElementById("start").innerHTML = 'Start';
    clearInterval(myInterval);
    } else {
        run = true;
        document.getElementById("start").innerHTML = 'Stop';
        myInterval = setInterval(execute, 1000/clockModifier);  
    }
}

// Change clockrate
function changeClock() {
    let tempModifier = document.getElementById("myList");
    clockModifier = tempModifier.options[tempModifier.selectedIndex].text;
    if (run == true){
        clearInterval(myInterval);
        myInterval = setInterval(execute, 1000/clockModifier); 
    }
}
			
// Set PC to jump value
function inputJump() {
    let input = 0;
    let num = prompt("Input hex address from 0 - FF to jump to.");
    if (parseInt(num, 16) <= 255){
        input = num;
    } 
    regPC = parseInt(input, 16);
  	setDisp("regDispPc", regPC, regPC.toString(16), regPC.toString(2), 8);
  	instructionRead();
}


// Disassemble inputted instruction
function disAsm(hex) {
    let hexBin = hex2bin(hex);
    let output = '';
    hexBin = hexBin.padStart(16, '0');
    if(dout[hexBin.substr(hexBin.length-11, 3)] != '') output = output.concat(dout[hexBin.substr(hexBin.length-11, 3)],"&nbsp&nbsp"); // DOUT
    if(st[hexBin.substr(hexBin.length-14, 3)] != '') output = output.concat(st[hexBin.substr(hexBin.length-14, 3)],"&nbsp&nbsp"); // ST
    if(cond[hexBin.substr(hexBin.length-16, 2)] != '') output = output.concat(cond[hexBin.substr(hexBin.length-16, 2)],"&nbsp&nbsp"); // COND
    output = output.concat("#",parseInt(hex.substr(2,3),16)); // IMM
    return output;
}

// Data memory dump
function datMemDump() {
    document.getElementById("datMemDisp").innerHTML = '';
    for(var i = 0; i < 128; i++) {
        if (i % 8 == 0) {
            if ( i != 0) {
                document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat('\n');
            }
            document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat(i.toString(16).padStart(2, '0'),':');
        }
        let thisMem = datMem[i].toString();
        thisMem = thisMem.padStart(2, '0');
        document.getElementById("datMemDisp").innerHTML =   document.getElementById("datMemDisp").innerHTML.concat(' ', thisMem);
    }
}

// Program memory dump
function prgMemDump() {
    document.getElementById("prgMemDisp").innerHTML = '';
    for(var i = 0; i < 256; i++) {
        document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(i.toString(16).padStart(2, '0'),': ', prgMem[i].padStart(4, '0'), ' - ',  disAsm(prgMem[i]), '\n');
    }
}

// Set register display
function setDisp(disp, dec, hex, bin, len) {
        bin = bin.padStart(len, '0')
        bin = bin.padStart(8, 'x')
        hex = hex.padStart(2, '0')
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
    document.getElementById('regDispDispBig').innerHTML = 0;
    for(var i = 0; i < 128; i++){
        datMem[i] = 0;
    }
    datMemDump();
    instructionRead();
}

function memEdit() {
    let input = 0;
    let cont = true;
    let num = prompt("Input hex address from 0 - 78 to edit");
    if (parseInt(num, 16) > 128 || parseInt(num, 16) < 0){
        window.alert("Invalid address");
        cont = false;
    } 
} 
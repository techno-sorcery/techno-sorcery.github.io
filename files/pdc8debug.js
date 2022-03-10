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
                document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat('0',i.toString(16),':');
            } else if (i <= 15) {
                document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat('\n', '0', i.toString(16),':');
            } else {
                document.getElementById("datMemDisp").innerHTML = document.getElementById("datMemDisp").innerHTML.concat(' \n', i.toString(16),':');
            }  
        }
        let thisMem = datMem[i];
        if (parseInt(datMem[i], 16) <= 15){
            thisMem = "0".concat(thisMem);   
        }
        document.getElementById("datMemDisp").innerHTML =   document.getElementById("datMemDisp").innerHTML.concat(' ', thisMem);
    }
}

// Program memory dump
function prgMemDump() {
    document.getElementById("prgMemDisp").innerHTML = '';
    for(var i = 0; i < 256; i++) {
        if (i % 1 == 0) {
            if ( i == 0) {
                document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat('0',i.toString(16),':');
            } else if (i <= 15) {
                document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat('\n', '0', i.toString(16),':');
            } else {
                document.getElementById("prgMemDisp").innerHTML = document.getElementById("prgMemDisp").innerHTML.concat(' \n', i.toString(16),':');
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
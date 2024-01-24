---
title: ARIX-16 Emulator
author: Hayden Buscher
description: An emulator for the ARIX-16 processor, written in JavaScript.
---

### ARIX-16 Emulator
<table class="regtable, margins" style="width:100%">
    <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Name</th>
        <th>Value</th>
        
    </tr>
    <tr>
        <td> r0 (a0) </td>
        <td id="r0">0</td>
        <td> r8 (v2) </td>
        <td id="r8">0</td>
    </tr>
    <tr>
        <td> r1 (a1) </td>
        <td id="r1">0</td>
        <td> r9 (v3) </td>
        <td id="r9">0</td>
    </tr>
    <tr>
        <td> r2 (a2) </td>
        <td id="r2">0</td>
        <td> r10 (v4) </td>
        <td id="r10">0</td>
    </tr>
    <tr>
        <td> r3 (a3) </td>
        <td id="r3">0</td>
        <td> r11 (v5) </td>
        <td id="r11">0</td>
    </tr>
    <tr>
        <td> r4 (t0) </td>
        <td id="r4">0</td>
        <td> r12 (v6) </td>
        <td id="r12">0</td>
    </tr>
    <tr>
        <td> r5 (t1) </td>
        <td id="r5">0</td>
        <td> r13 (lr) </td>
        <td id="r13">0</td>
    </tr>
    <tr>
        <td> r6 (v0) </td>
        <td id="r6">0</td>
        <td> r14 (fp) </td>
        <td id="r14">0</td>
    </tr>
    <tr>
        <td> r7 (v1) </td>
        <td id="r7">0</td>
        <td> r15 (sp) </td>
        <td id="r15">0</td>
    </tr>
    <tr>
        <td>pc</td>
        <td id="pc">0</td>
        <td>iv</td>
        <td id="iv">0</td>
    </tr>
</table>
<button type="button" onclick=point()>DEC</button>


<textarea readonly style="resize:none;" id="terminal" rows="25" cols="80"></textarea>
<button type="button" onclick=point()>Single</button>

---

<textarea readonly style="resize:none;" id="memory" rows=25 cols ="40"></textarea>
<textarea style="resize:none;" id="import" rows=25 cols ="40"></textarea>
<button type="button" onclick=point()>Import</button>


<script type="text/javascript" src='js/arix16emu/arix16emu.js'></script>

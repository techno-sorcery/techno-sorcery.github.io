---
title: Elementary automata
author: Hayden Buscher
description: Renders Wolfram's elementary cellular automata, of which there are 256.
---

### Elementary Automata
<div class="margins"><canvas id="myCanvas" width="608" height="606" style="background-color:white"></canvas></div>

<button id='toggleRun' type="button" onclick=toggleRun()>Stop</button>
<button type="button" onclick=step()>Step</button> 
<button type="button" onclick=point()>Single</button>
<button id='toolButton' type="button" onclick=rand()>Random</button>
Rule:
<input id="rule" type="number" value="165" max="255" min="0" onchange=setRule()>
<!-- <p style="line-height:0;display:inline">&nbspRule:</p><input id="rule" type="number" value="165" max="255" min="0" onchange=setRule()> -->
<!-- <p style="line-height:0;display:inline">&nbspInitial cells:</p> -->

<script type="text/javascript" src='js/automata/elementary.js'></script>

---
title: Game of Life
author: Hayden Buscher
description: Simulates John Conway's Game of Life, arguably the best-known cellular automaton.
---

### Game of Life
<div class="margins"><canvas id="myCanvas" width="511" height="511" style="background-color:DarkGray"></canvas></div>
<br>
<p style="line-height:0px">Generation: <span id='genDisp'>0</span></p>
<p style="padding-top:1px">Live cells: <span id='liveDisp'>0</span></p>
<button id='toggleRun' type="button" onclick=toggleRun()>Start</button>
<button type="button" onclick=step()>Step</button>
<button type="button" onclick=clearCells()>Clear</button>
<button type="button" onclick=rand()>Random</button>
<button id='toolButton' type="button" onclick=toggle()>Erase</button><br>

<script type="text/javascript" src='js/life/life.js'></script>

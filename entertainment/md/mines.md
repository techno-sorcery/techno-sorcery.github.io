---
title: Minesweeper
author: Hayden Buscher
description: The classic game of minesweeper, running in your browser.
css: /global/css/main.css /global/css/responsive.css
---

### Minesweeper  
<canvas id="myCanvas" class="margins" width="481" height="481" style="background-color:gray"></canvas> 
<div style="padding-top:10px"> 
<p style="display:inline">Mines Left: <span id='mineDisp'>0</span></p>
<p style="display:inline">Time: <span id='timeDisp'>0</span></p>
</div>

<button type="button" id="mode" onclick=toggle()>Flag</button>
<button type="button" onclick=reset()>Reset</button>  

---

**Instructions**  
Left-click - Uncover tile  
Middle-click - Uncover neighbors  
Right-click - Flag tile

Number on each tile indicates amount of adjacent mines.  
Mark suspected mines with a flag, so you don't click them.  
Uncover all non-mine tiles to win.  

<body oncontextmenu="return false;">
<script type="text/javascript" src='js/mines/mines.js'></script>

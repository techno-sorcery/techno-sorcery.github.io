---
title: Minesweeper
author: Hayden Buscher
description: The classic game of minesweeper, running in your browser.
---



<div class="border header">
<hr>
<p>The classic game of Minesweeper, running in your browser.
</p>
<hr>
</div>  

### Minesweeper  
<canvas id="myCanvas" class="margins" width="401" height="401" style="background-color:gray"></canvas> 
<div style="padding-top:10px"> 
<p style="display:inline">Mines Left: <span id='mineDisp'>0</span></p>
<p style="display:inline">Time: <span id='timeDisp'>0</span></p>
</div>
<button type="button" onclick=reset()>Reset</button>

<body oncontextmenu="return false;">
<script type="text/javascript" src='js/mines/mines.js'></script>

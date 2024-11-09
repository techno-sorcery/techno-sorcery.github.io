---
title: Nonograms
author: Hayden Buscher
description: Solve the randomized nonogram puzzles!
css: /global/css/main.css /global/css/responsive.css
---

### Nonograms  
<canvas id="myCanvas" class="margins" width="481" height="481" style="background-color:gray"></canvas> 
<div style="padding-top:10px"> 
<p style="display:inline">Time: <span id='timeDisp'>0</span></p>
</div>

<button type="button" onclick=reset()>New puzzle</button>  

---

**Instructions**  
Left-click - Uncover tile  
Middle-click - Uncover neighbors  
Right-click - Flag tile

Number on each tile indicates amount of adjacent mines.  
Mark suspected mines with a flag, so you don't click them.  
Uncover all non-mine tiles to win.  

<body oncontextmenu="return false;">
<script type="text/javascript" src='js/nonograms/nonograms.js'></script>

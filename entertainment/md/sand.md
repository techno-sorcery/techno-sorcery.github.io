---
title: Falling Sand Game
author: Hayden Buscher
description: A classic falling-sand type physics game.
---

<div class="border header">
<hr>
<p>A classic falling-sand type physics game.
</p>
<hr>
</div>

### Falling Sand Game
<div class="margins"><canvas id="myCanvas" width="512" height="512" style="background-color:black"></canvas></div>
<p style="padding-top:1px">Particles: <span id='numDisp'>0</span></p>
<button id='toggleRun' type="button" onclick=toggleRun()>Start</button>
<button type="button" onclick=step()>Step</button>
<button type="button" onclick=clear()>Clear</button>
<button id='toolButton' type="button" onclick=toggle()>Erase</button><br>

**Elements**  
<button id='toolButton' type="button" style="background-color:gray" onclick=select("stone")>Stone</button><br>

<script type="text/javascript" src='js/sand/sand.js'></script>

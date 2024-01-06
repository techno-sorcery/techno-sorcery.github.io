---
title: Video Poker
author: Hayden Buscher
description: A five-card draw Video Poker game, 9/6 Jacks or Better, programmed in JavaScript.
css: /global/css/main.css /global/css/responsive.css css/poker.css
---

### Video Poker
<div class="margins" style="max-width:800px">

<table>
<tr>
<th style="width:35%">Hand </th>
<th style="width:15%" id="tableMult1">x1</th>
<th style="width:35%">Hand</th>
<th style="width:15%" id="tableMult2">x1</th>
</tr>
<tr>
<td id="hand1">Royal Flush<br><span class="redText">♥A ♥K ♥Q ♥J ♥10</span></td>
<td id="table1">250</td>
<td id="hand6">Straight<br><span class="redText">♦10</span> ♠9 <span class="redText">♥8 ♦7</span> ♣6</td>
<td id="table6">4</td>
</tr>
<tr>
<td id="hand2">Straight Flush<br>♣J ♣10 ♣9 ♣8 ♣7</td>
<td id="table2">50</td>
<td id="hand7">Three-of-a-Kind<br>♣Q ♠Q <span class="redText">♥Q ♥9</span> ♠2</td>
<td id="table7">3</td>
</tr>
<tr>
<td id="hand3">Four-of-a-Kind<br>♣5 <span class="redText">♦5 ♥5</span> ♠5 <span class="redText">♦2</span></td>
<td id="table3">25</td>
<td id="hand8">Two Pairs<br><span class="redText">♥J</span> ♠J ♣3 ♠3 <span class="redText">♣2</span></td>
<td id="table8">2</td>
</tr>
<tr>
<td id="hand4">Full House<br>♠6 <span class="redText">♥6 ♦6</span> ♣K <span class="redText">♥K</span></td>
<td id="table4">9</td>
<td id="hand9">Jacks or Better<br><span class="redText">♥J ♦J</span> ♠6 <span class="redText">♥3</span> ♣5</td>
<td id="table9">1</td>
</tr>
<tr>
<td id="hand5">Flush<br><span class="redText">♦J ♦9 ♦8 ♦4 ♦3</span></td>
<td id="table5">6</td>
<td id="hand10">Junk</td>
<td id="table10">0</td>
</tr></table>

<table>
<tr>

<th class="noBorder">
<div class="cardDiv" id="cardDivF">
<h4 id='text1' class="holdText">&nbsp</h4>
<button class='imgButton' id='holdImg1' disabled onclick=hold(1)>
<img draggable="false" id='card1' src='js/cards/BLUE_BACK.svg'></button>
</div>
</th>

<th class="noBorder">
<div class="cardDiv">
<h4 id='text2' class="holdText">&nbsp</h4>
<button class='imgButton' id='holdImg2' disabled onclick=hold(2)>
<img draggable="false" id='card2' src='js/cards/BLUE_BACK.svg'></button>
</div>
</th>

<th class="noBorder">
<div class="cardDiv">
<h4 id='text3' class="holdText">&nbsp</h4>
<button class='imgButton' id='holdImg3' disabled onclick=hold(3)>
<img draggable="false" id='card3' src='js/cards/BLUE_BACK.svg'></button>
</div>
</th>

<th class="noBorder">
<div class="cardDiv">
<h4 id='text4' class="holdText">&nbsp</h4>
<button class='imgButton' id='holdImg4' disabled onclick=hold(4)>
<img draggable="false" id='card4' src='js/cards/BLUE_BACK.svg'></button>
</div>
</th>

<th class="noBorder">
<div class="cardDiv"  id="cardDivL" style="padding-right:00%">
<h4 id='text5' class="holdText">&nbsp</h4>
<button class='imgButton' id='holdImg5' disabled onclick=hold(5)>
<img draggable="false" id='card5' src='js/cards/BLUE_BACK.svg'></button>
</div>
</th>

</tr>
</table>

<br>
<button id='bet' type="button" style="width:100%" onclick=betAmnt()> Bet</button><br><br>
<div style="display:inline"><p style="display:inline">Bet:</p>
<select id = "myList" onchange = updateTable()>
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option selected>5</option>
</select>
<div class="balDiv">
<p class="balText">&nbspBal: </p>
<input id="balanceDisp" class="balDisp" type="text" value="" readonly>
</div>
</div>
</div>

---

**Instructions**  
Click cards, 1-5 - Toggle hold  
Bet button, Enter - Bet or draw  

Select a bet multiplier using the dropdown menu.  
"Held" cards from your first hand are kept, others are replaced upon "draw".  
Match your hand to ones in the table to win.  


<script src="js/cards/cardparse.js"></script>
<script src="js/poker/pokerVideo copy.js"></script>

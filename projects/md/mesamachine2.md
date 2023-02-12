---
title: MESA Machine v2
author: Hayden Buscher
description: Built over a two-month period after our first machine won prelims. Heavily upgraded.
---

<div class="border header">
<hr>
<p>Built over a two-month period after our first machine won prelims. Heavily upgraded.
</p>
<hr>
</div>

### MESA Machine v2
**Background**  
After placing first in the MESA prelims, it was clear we'd need a revamped machine to remain competitive in the regionals. My friend and I redid everything over the next month, adding various other mechanisms, and reimplementing the ones already in place. Cumulatively, we probably spent 4-5 full days working on the project.

Unfortunately, after all that work, we were barred from advancing to state by a crummy lab report. Ouch. It was hardly a waste, however, because we did win a first place "Innovation" ribbon for having the coolest machine. Not to mention everything we learned about building something from start to finish, dealing with the laws of physics, and working as a team.

I still believe the MESA Machine to be one of the coolest thing's I've ever built, and am very proud of all the work we did. It now resides in my high school's robotics room, an example of what two guys can build with nothing more than some junk resources.<br><br>

**Description**  

![Photo of the MESA Machine](/projects/img/mesamachine2_pic.png)

A metal ball bearing starts  at the top of the machine, where it has the most potential energy. When a cord connected to the starter door is yanked, the ball bearing is released. Its motion is translated to kinetic energy as it continues down three ramps, and falls on a clapper.

The clapper translates the bearing's Y velocity into X velocity, pushing another bearing from rest. This bearing continues down another three ramps before triggering a mousetrap.

When the trap's kill bar springs forward, it releases a taut string and allows the drawbridge to slope downward. A smaller bearing rolls down the drawbridge into a cup, where it is directed to two more ramps before triggering a switch.

The switch is connected to an arduino and, when closed, it starts rotating a servo. After the servo has rotated a certain amount, the attached string falls out of its track, allowing two golf balls to roll down a series of suspended ramps.

The golf balls are caught at the bottom by reservoir, where they displace the water enough for it to flow through a straw and into a pulley cup. When the pull cup contains enough water, it falls onto another switch connected to the same arduino.

The arduino then triggers a second servo, also attached to a string. Once the servo has rotated enough, a third ball bearing begins rolling down a final series of three ramps. It's finally caught in a second pulley cup, which falls on a switch and triggers the fan.
<br><br>

**Demonstration**  
<div class="margins"><iframe width="560" height="315" src="https://www.youtube.com/embed/4zO2yu9cypk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
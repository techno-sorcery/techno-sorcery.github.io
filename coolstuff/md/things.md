---
title: Things I Use  
author: Hayden Buscher
description: A list of the hardware, software, and other things I use.
---

<div class="border header">
<hr>
<p>A list of the hardware, software, and other things I use.
</p>
<hr>
</div>

### Software  
**Operating System**  
I prefer Linux since it's customizable, comes with package managers in most cases, runs well on older hardware, and doesn't "phone home" with telemetry info. I use Debian since its mature release cycle alleviates the instability of rolling-release distros, and thus requires little maintenance. For some reason, I keep seeing developers who treat their ignorance of Linux as a badge of honor, as if they're combatting the "mean" Linux "community". A majority of these people install something unstable like Arch or bloated like Ubuntu and write off the entire project when they're forced to use the "difficult" terminal or can't run their epic games out-of-the-box. Linux isn't for everyone, but you'd figure that someone who writes software for a living would at least want to learn about it.
<br><br>

**Window Manager**  
The first window manager I used for an extended period was FVWM, a retro-style floating one. I then switched to DWM since I got sick of wasting time manually resizing windows, especially since I rarely run one thing at a time. I finally settled on SpectrWM since it's packaged as a binary, and uses actual config files. Other than that, it's the same thing. I also use Conky as a status bar, and rofi as an application launcher.
<br><br>

**Terminal Emulator**  
I use urxvt since it's lightweight and does transparency. I would also like if it had lower input latency and supported sixel, but finding a terminal which does that without wasting 60 MB of RAM is impossible. Xterm is cool, but it doesn't support background transparency. Mlterm does, but it's some crappy flickery "pseudo-transparency". I've been messing with ST, but I need to learn more C before I can effectively patch it. Also, for some reason Suckless thinks normal features like scrolling and config files are BLOAT (reverse bloat?). No, I will not use tmux- I already have a tiling WM.
<br><br>

**Shell**  
I've always known that Zsh is the best Linux shell, but hadn't bothered switching from Bash and configuring it until this summer and yeah, it's great. It supports powerful command completion, Vim bindings, and a huge plugin library; definitely a step above the rest. Right now I'm using it with the Vim cursor, Fast Syntax Highlighting, and bd plugins- none of that bloated Oh-My-Zsh nonsense. Just know that the default settings are terrible, so you've got to write a proper config file.
<br><br>

**Text Editor**  
My relationship with Vim is similar to that with Zsh; I knew it was the best option, but didn't feel like learning how to use it. For text editing, I bounced between VS Code, Google Docs, and GNU Nano. When I switched to Zsh, I also decided to uninstall the aforementioned programs and only rely on Vim (technically Neovim). Already, it has imprinted on me. Command-based modal editing is so efficient that I can't ever go back. When school comes around, I plan on using LaTeX within vim for document-creation and moving all my files to a home server. Oh, and I'm using the following stand-alone plugins:

- Plugged: Plugin manager
- Vim-Airline: Improved status bar
- Commentary: Line/selection commenting
- Nvim-cmp: Auto-suggestions
- Goyo: Comfortable text formatting
- Indent-Blankline: Indentation lines
- Autopairs: Automatic delimiter pairs

My goal has been to use it as an "everything" editor, which includes implementing IDE-like features. I get most of the benefits of an actual IDE, with the footprint and interface of Vim. Even if you end up using VS Code, taking the time to learn Vim pushes you away from the mouse and makes you a more efficient programmer.
<br><br>

**File Manager**  
I prefer to use the command-line over a TUI/GUI file manager; they've always felt unnecessary to me. Why load up a separate piece of software when I can cd/ls wherever I want? Some of them can do cool things like showing images in a frame buffer, but so far Feh has worked fine for that.
<br><br>

**Web Browser**  
Vivaldi is the best browser, and more people should be using it. Yeah, it's Chromium-based, but that makes it compatible with most websites and plugins. It has a lot of togglable features, many of which (hide address bar, vertical tabs) have become a necessity for me. It also comes with an excellent ad blocker, email client, scheduler, and online sync function- all of which can be disabled if you'd like.
<br><br>

**Media Players**  
I previously used VLC for offline media, but recently switched mpv. Works great, no complaints; definitely uses less resources. I've also switched to ncspot from the official Spotify client since the latter is a bloated piece of garbage that wastes battery life.
<br><br>

**Package Managers**  
I like apt, it's nice. I'm sure I'd warm up to pacman's syntax after a while, but that of apt makes more sense. By the way, you should be using "apt" over "apt-get" since the former has a status bar. I also use Flatpak for garbage GUI apps like Steam and Signal I don't want defiling my install with GNOME dependencies.
<br><br>

### Hardware  
**Computers**  
My main computer is a ThinkPad P51, which I wrote about [here](/coolstuff/computers.html). It's a great machine; powerful CPU and GPU, excellent keyboard, lots of expandability, very durable, decent Linux compatibility, great thermals, and surprisingly acceptable battery life with tlp. It was also only $50, which is basically theft. I got a dock for it, which is plugged into a monitor at my desk. Despite being more powerful, my desktop has been superseded by the ThinkPad. Maybe I'll turn it into a server one of these days...
<br><br>

**Peripherals**  
I use an SK-8845 UltraNav keyboard since I like the layout, and it comes with a TrackPoint. It's decent, though the shift key is flaky and the TrackPoint is too slow. I also switched from optical mice that wrecked my wrist to an awesome Kensington Orbit Trackball. Unlike other finger-operated trackballs, it includes a scroll ring, and allows you to middle click with both buttons. Static friction makes it less precise than an optical mouse, but I just use the TrackPoint when that's an issue.
<br><br>

**Mobile Devices**  
I think the modern fixation with cell phones is stupid, but I do own an iPhone SE 3 for practical purposes. It's small, well built, and seems to have great performance. Most of the time, though, it sits on my desk in a dead/dying state with the ringer turned off. If I were to look at my most-used applications, the top three would probably be "Phone", "Messages", and "Signal". I guess that says a lot. I also own an iPad 9 which I use for note-taking, though not much else. 

"But Apple devices are all locked down and stuff!", you say. You're right- maybe I should be using a rooted Android running GrapheneOS. However, I don't use mobile devices in a serious enough manner to bother customizing them as I would my laptop. Whether I can can run Vim or some dopey emulators on my Apple devices doesn't matter to me, since they only get used for a few tasks. Maybe one day I'll see the light, and switch my entire setup. Until then, who knows.
<br><br>

**Epic Gaming Machines**  
I don't really play video games, but I have a small collection of SNES and GameCube stuff. The former is mostly shelf decoration, but the latter gets used with my Sony CRT whenever friends are over. When I do play games, they're usually open-source simulators/rogue-likes such as OpenTTD, CDDA, and DCSS.
<br><br>

**Audio**
Since I enjoy music so much, it's a given that I'd end up getting a nice stereo system. For $250 I was able to buy a pair of Sony SSCS5 speakers on sale, and a used Sony STR-DH590 5.2 reciever. For substantially less than most other "real" systems, the audio quality I get is incredible. Some people say that music sounds better with headphones, but I strongly disagree. With good-enough acoustics, an entry-level pair of speakers like mine will crush super-expensive headphones. I could go for something even better, but I feel like I've reached the point of diminishing returns. Just need a decent subwoofer, and it'll be perfect.

Despite my professed love of speakers, I also own a pair of headphones- Sony WH-CH700Ns I've had since 2019. They sound good enough, and are wireless. The noise cancelling sucks, but I don't care since I can't stand inappropriate silence anyway. The ear pads split after a few years, but I replaced them with arguably more comfortable ones.
<br><br>

### Other Things
**Clothing**  
At one point I was into menswear, but I've since stopped caring. Money or not, it's a waste to spend it on things you aren't going to wear. That said, I generally like vintage American-styled clothing. Think trucker jackets, flannels, high-waisted straight-fit pants, polos, Hawaiian shirts, wing-tipped shoes, and Converse sneakers. I don't care about brands, besides mainly buying pants from Dickies and sweaters from Polo. There's nothing wrong with liking clothes, but it's a slippery-slope that leads down a path of vanity and consumerism.

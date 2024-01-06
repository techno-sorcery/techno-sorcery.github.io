---
title: Things I Use  
author: Hayden Buscher
description: A list of the hardware, software, and other things I use.
---

### Software  
**Operating System**  
I prefer Linux since it's customizable, uses package managers, runs well on low-spec hardware, and doesn't "phone home" with telemetry info. I use Debian since its mature release cycle alleviates the instability of rolling-release distros.  

I keep seeing tech-oriented people who are proudly ignorant of Linux, as if they're combatting the "mean" Linux "community". A majority of them install something "hard" like Arch, and write off the whole project when they have to use the terminal, can't run their epic games, or are hit with rolling-release instability. Linux isn't for everyone, but it figures someone who professes a love of technology would want to give it a fair shot.
<br><br>

**Window Manager**  
The first notable WM I used was FVWM, a retro CDE-style floater. I eventually got sick of manually managing windows, and switched to DWM. For a while I ran SpectrWM since it used .Xresources by default, but went back to DWM after learning how to patch it. Speaking of patches,I'm using the following:  

- adjacenttag: Adds keybindings to go to adjacent tag numbers
- alpha fixborders: Gives borders correct transparency under picom
- attachbottom: Adds new windows to bottom of stack, like SpectrWM
- bar height: Sets custom topbar height
- cyclelayouts: Uses keyboard to cycle through layouts
- hide vacant tags: Hides tags without any windows
- pertag: Lets you set a different layout for each tag
- push: Uses the keyboard to move windows around the stack
- restartsig: Restarts dwm and applies changes instead of exiting to TTY
- scratchpad: Lets you open a temporary, floating terminal with the keyboard
- sticky: Lets you set a window to appear across all tags
- stickyindicator: Shows an indicator in the topbar for stickied windows
- swallow: Allows terminal windows to "swallow" GUI apps launched from them
- vanitygaps: Adds configurable gaps between windows and screen edges, as well as several layouts
- warp: Moves the mouse pointer to the selected window

I use rofi with the dmenu theme as my launcher, and a custom Bash script as my status bar.
<br><br>

**Terminal Emulator**  
I used urxvt for a while since it was lightweight and did transparency, but wanted something with a lower input latency and support for multiple fonts. Mlterm seemed to fit the bill, except the config system sucked and it only did flickery "pseudo-transparency". I tried ST a couple times, but wrote it off since my patch operations kept failing.

After watching a video on the **right** way to patch it, I reinstalled ST and converted. I'm not a fan of Suckless' compilation-only, "reverse-bloat" paradigm, but at least it didn't take long to configure. I'm using the following patches:

- alpha: Background transparency
- boxdraw: Better rendering of block characters
- clipboard: Synchronizes desktop and terminal clipboards
- desktopentry: Desktop entry for st
- font2: Support for multiple fonts
- glyph wide support: Support for wide unicode glyphs (like emojis)
- hidecursor: Hides the cursor when typing
- newterm: Adds a keybind to create new term in working directory
- scrollback: Enables scrollback buffer
- scrollback mouse: Lets you scroll with the mouse
- scrollback mouse altscreen: Lets you scroll anywhere with the mouse
- scrollback reflow: Reorganizes terminal contents when resized
- undercurl: Enables usage of undercurl character
- w3m: Enables usage of w3m-style framebuffer graphics
<br><br>

**Shell**  
I long-knew Zsh was the best Linux shell, but hadn't bothered switching from Bash until Summer 2023. Very glad I did. It supports powerful command completion, Vim bindings, and a large plugin library. I'm using it with the following plugins:

- Autopair: Automatically pairs typed parenthesis
- fast-syntax-highlighting: Performance-oriented syntax highlighter
- fzf: Support for fuzzy file search
- Vim-cursor: Vim-style block cursor to indicate editing mode

That's right, no bloated Oh-My-Zsh nonsense. Just know the default settings are terrible, so a proper config file is required.
<br><br>

**Text Editor**  
My relationship with Vim is similar to Zsh; I knew it was the best option, but didn't feel like switching. For text editing, I used a combination of VS Code and Nano. When I switched to Zsh, I uninstalled them and decided to only rely on Neovim. It quickly imprinted on me. Modal editing is so efficient, I can't ever go back. To be even more productive, I'm using the following plugins:

- Plugged: Plugin manager
- Vim-Airline: Improved status bar
- Commentary: Line/selection commenting
- Nvim-cmp: Auto-suggestions
- Goyo: Comfortable text formatting
- Indent-Blankline: Indentation lines
- Autopairs: Automatic delimiter pairs

My goal is to use it as an "everything" editor, presupposing IDE features. I get the benefits of a proper IDE, with the interface of Vim. Even if you end up using something else, knowing the "Vim paradigm" keeps you away from the mouse and makes you a more efficient user.
<br><br>

**File Manager**  
I prefer to use the command-line over a TUI/GUI file manager; they feel unnecessary to me. Why use a separate piece of software when I can cd/ls wherever I want? Some of them support cool things like framebuffer images, but so far Feh --thumbnail has worked fine for that.
<br><br>

**Web Browser**  
Vivaldi is the best browser, and more people should be using it. It's Chromium-based, but that that comes with the advantage of wider plugin/website compatibility. It has lots of togglable features, many of which (hide address bar, vertical tabs) I've come to rely on . It also comes with an excellent ad blocker, email client, scheduler, and online sync function- all of which can be disabled if you'd like.
<br><br>

**Media Players**  
I previously used VLC for offline media, but switched mpv. Works great, no complaints; definitely uses less resources. For music, I just use the Spotify client (Guess I'm a slave to "the man").
<br><br>

**Package Managers**  
I like apt, though I'd surely warm up to pacman's syntax after a while. By the way, you should alias apt-get to apt since it has a status bar. I also use Flatpak for garbage GUI apps like Steam and Signal I don't want defiling my install with GNOME dependencies.
<br><br>

### Hardware  
**Computers**  
My main computer is a ThinkPad P51, which I wrote about [here](/coolstuff/computers.html). It's a great machine; powerful CPU and GPU, excellent keyboard, modular, durable, good Linux compatibility, great thermals, and surprisingly acceptable battery life with tlp. It also only costed me $50. I got a dock for it, which is plugged into a monitor at my desk. Despite being more powerful, my desktop has been superseded by the ThinkPad. Don't game anymore, so I don't need it.
<br><br>

**Peripherals**  
I use an SK-8845 UltraNav keyboard since I like the layout, and it comes with a TrackPoint. It's decent, though the shift key is flaky and the TrackPoint is slow. I also switched from uncomfortable optical mice to a (much better) Kensington Orbit Trackball. It includes a scroll ring, and allows you to middle click with both buttons. Static friction makes it less precise than an optical mouse, but I resort to the TrackPoint when that's an issue.
<br><br>

**Mobile Devices**  
I think the modern fixation with cell phones is stupid, but I do own an iPhone SE 3 for practical purposes. It's small, well built, and seems to have great performance. Most of the time, though, it sits on my desk in a dead/dying state with the ringer turned off. If I were to look at my most-used applications, the top three would probably be "Phone", "Messages", and "Signal". I guess that says a lot. I also own an iPad 9 which I use for note-taking, though not much else. 

"But Apple devices are all locked down and stuff!", you say. You're right- I could be using a rooted Android running GrapheneOS. However, I don't use mobile devices seriously enough to bother customizing them as I would my laptop. I don't care about running emulators on my phone since it only gets used for a few tasks. Maybe one day I'll see the light and switch my entire setup. Until then, probably not.
<br><br>

**Epic Gaming Machines**  
I don't really play video games (produces nothing, promotes sloth), but I have a small collection of SNES and GameCube stuff. The former is shelf decoration, but the latter gets used with a Sony CRT whenever friends are over. When I do play games, they're usually open-source simulators/rogue-likes such as OpenTTD, CDDA, and DCSS.
<br><br>

**Audio**
Given my love of music, having a nice stereo system is a given. For $250 I was able to buy a pair of Sony SSCS5 speakers and a used Sony STR-DH590 5.2 reciever. Given its modest price, the audio quality is incredible. Definitely crushes any pair of headphones I've ever used. Could go for an even better unit, but beyond getting a sub I've reached the point of diminishing returns.

I also own a pair of headphones: some Sony WH-CH700Ns I've had since 2019. They sound good enough, and are wireless. The noise cancelling sucks, but it doesn't matter since I hate silence anyway. The ear pads split after a few years, but were quick to replace.
<br><br>

### Other Things
**Clothing**  
I was into menswear at one point, but have since stopped caring. I have enough clothes, and would rather save my money than dump it into the fast-fashion machine. That said, I generally like vintage American-styled clothing. Think trucker jackets, flannels, high-waisted work pants, polos, Hawaiian shirts, wing-tipped shoes, and Converse sneakers. There's nothing wrong with liking clothes, but it's a slippery-slope to vanity and consumerism.

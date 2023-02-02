---
title: wisPy
author: Hayden Buscher
description: A dead-simple static site generator, for those who want nothing more than to convert markdown to html.
---

<div class="border header">
<hr>
<p>A dead-simple static site generator, for those who want nothing more than to convert markdown to html.
</p>
<hr>
</div>

### Website Interpreter, Static aka wisPy
[Github repo](https://github.com/techno-sorcery/wisPy)

**Description**  
wisPy is a dead-simple static site generator, for those want nothing more than to convert markdown to html. While full CMSs have lots of useful features, many go unused with simpler wesites. This adds unneccessary complexity to otherwise straight-forward projects. 

wisPy is different- all it does is scrape markdown files from any number of input folders, apply the specified themes, and dump the resulting html files into any number of output folders. That's it. It can also parse integrated YAML metadata, and generate corresponding title/meta tags.

If you'd like to see what wisPy can do, well... I use it to generate most of this site's content.<br><br>

**Config System**  
wisPy config files are structured thusly:

<pre>
[blog]                                   group
input =       blogposts/md               input folder, containing markdown files
output =      blogposts                  output folder, where html is stored
template =    blogposts/template.html    path to html template
suffix =      - My Blog             optional page title suffix
</pre>

Note that any number of groups can be included in the same file. The only necessary parameter is "input"; you are not required to specify an output folder, template, or suffix.<br><br>

**Templates**  
Unlike other site generators, wisPy uses vanilla html files as templates. It looks for an <!––INSERT––> tag before writing the converted text. Everything else is preserved, including style and script tags.<br><br>

**Plans**  
wisPy will never become a content management system, that defeats its entire point. However, I'm open to the addition of some basic features. For instance, one feature that's currently in progress is table-of-contents generation.

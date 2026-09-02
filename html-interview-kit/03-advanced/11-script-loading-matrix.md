# 11. Script Loading Matrix



```text
HTML Parsing:    ====================[BLOCKED]=============>
Normal Script:                 [Fetch][Execute]

HTML Parsing:    ==========================================>
Script async:        [Fetch]   [Execute - BLOCKS PARSING]

HTML Parsing:    ==========================================>
Script defer:        [Fetch................] [Execute after DOM ready]
```

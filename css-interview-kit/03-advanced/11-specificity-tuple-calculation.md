# 11. Specificity Tuple Calculation



Specificity is calculated as a 4-part vector `(A, B, C, D)`:

```text
A: Inline styles      <div style="...">       (1, 0, 0, 0)
B: IDs                #header                 (0, 1, 0, 0)
C: Classes, pseudo    .card, :hover, [type]   (0, 0, 1, 0)
D: Elements, pseudo   div, p, ::before        (0, 0, 0, 1)

Universal (*) & combinators (+, >, ~)         (0, 0, 0, 0)
```

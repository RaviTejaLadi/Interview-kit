### Debounce: wait until events stop

Events reset the timer. Only the final event triggers execution.

E -> E -> E -> E -> Execute

### Throttle: execute at controlled intervals

Repeated events occur, but execution is limited by the interval.

Execute -> Skip -> Skip -> Skip -> Execute

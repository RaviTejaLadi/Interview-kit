# Difference between debounce and throttle.

| Feature           | Debouncing                        | Throttling                            |
| ----------------- | --------------------------------- | ------------------------------------- |
| Purpose           | Wait until events stop            | Limit execution frequency             |
| Execution         | After a quiet period              | At controlled intervals               |
| Timer behavior    | Resets on every call              | Does not reset on every call          |
| Continuous events | May not execute until events stop | Continues executing at a limited rate |
| Best suited for   | Search input, validation          | Scroll, mouse movement                |
| Example delay     | 500 ms after typing stops         | At most once every 200 ms             |

### Visual comparison

Suppose events occur continuously over one second.

Debounce

Waits for the events to stop before executing.

Event

Event

Event

Event

Execute

Throttle

Executes at a limited frequency during the events.

Run

Skip

Run

Skip

Run

Interview tip: Debounce asks, “Has the event stopped?” Throttle asks, “Is it time to execute again?”

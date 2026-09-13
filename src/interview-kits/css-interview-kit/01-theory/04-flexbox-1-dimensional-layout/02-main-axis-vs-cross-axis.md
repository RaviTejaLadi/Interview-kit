# Main axis vs Cross axis

A Flexbox container has **two axes**:

- **Main axis** → direction in which flex items are laid out.
- **Cross axis** → perpendicular to the main axis.

The direction depends on `flex-direction`.

### `flex-direction: row`

The main axis is horizontal.

```text
Main axis →
┌─────────────────────────┐
│  A     B     C          │
│                         │
│         Cross axis      │
│             ↕           │
└─────────────────────────┘
```

### `flex-direction: column`

The main axis becomes vertical.

```text
Main axis
   ↓
┌─────────┐
│    A    │
│    B    │
│    C    │
└─────────┘
```

**Important:** `justify-content` works along the **main axis**, while `align-items` works along the **cross axis**.

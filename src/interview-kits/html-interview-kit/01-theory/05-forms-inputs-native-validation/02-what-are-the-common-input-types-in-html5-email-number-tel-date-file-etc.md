# What are the common HTML5 `<input>` types?

The `<input>` element supports different types for different kinds of user input.

| Type             | Purpose                      |
| ---------------- | ---------------------------- |
| `text`           | General text                 |
| `email`          | Email address                |
| `password`       | Password                     |
| `number`         | Numeric input                |
| `tel`            | Telephone number             |
| `url`            | URL                          |
| `search`         | Search input                 |
| `date`           | Date                         |
| `time`           | Time                         |
| `datetime-local` | Date and time                |
| `month`          | Month and year               |
| `week`           | Week                         |
| `file`           | File selection               |
| `checkbox`       | Multiple independent choices |
| `radio`          | One choice from a group      |
| `range`          | Slider                       |
| `color`          | Color picker                 |
| `hidden`         | Hidden form value            |
| `submit`         | Submit button                |
| `reset`          | Reset form                   |
| `button`         | Generic button               |

Example:

```html
<!-- Common HTML5 input types -->
<form>
  <input type="text" name="name" placeholder="Name" />

  <input type="email" name="email" placeholder="Email" />

  <input type="number" name="age" min="18" max="100" />

  <input type="tel" name="phone" placeholder="Phone" />

  <input type="date" name="dob" />

  <input type="file" name="profile" />

  <label>
    <input type="checkbox" name="terms" />
    Accept terms
  </label>

  <button type="submit">Submit</button>
</form>
```

Using the correct input type provides useful **native validation and browser/keyboard behavior**.

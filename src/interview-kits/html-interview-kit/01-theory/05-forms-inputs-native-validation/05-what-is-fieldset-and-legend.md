# What are `<fieldset>` and `<legend>`?

## `<fieldset>`

`<fieldset>` groups **related form controls**.

## `<legend>`

`<legend>` provides a **caption/name for that group**.

Example:

```html
<!-- Group related radio buttons with a descriptive legend -->
<fieldset>
  <legend>Select your preferred contact method</legend>

  <label>
    <input type="radio" name="contact" value="email" />
    Email
  </label>

  <label>
    <input type="radio" name="contact" value="phone" />
    Phone
  </label>

  <label>
    <input type="radio" name="contact" value="sms" />
    SMS
  </label>
</fieldset>
```

This is particularly useful for **accessibility** because assistive technologies can understand that these controls belong to the same group.

Common use cases:

* Radio button groups
* Related checkbox groups
* Address sections
* Personal information sections

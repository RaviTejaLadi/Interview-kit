# How does the browser parse HTML into the DOM tree?

The browser receives HTML as bytes and processes it through several stages:

```text
HTML bytes
   ↓
Decode characters
   ↓
Tokenization
   ↓
Build DOM nodes
   ↓
DOM Tree
```

### Step-by-step

1. The browser downloads the HTML document.
2. It decodes the bytes into characters.
3. The **HTML parser** converts the characters into tokens such as:

   - Start tags
   - End tags
   - Text
   - Attributes

4. The parser creates DOM nodes from those tokens.
5. Nodes are connected to form the **DOM tree**.

For example:

```html id="q4j2kx"
<!-- This HTML is converted into a DOM tree -->
<html>
  <body>
    <h1>Hello</h1>
    <p>Welcome</p>
  </body>
</html>
```

Conceptually, the DOM becomes:

```text
Document
└── html
    └── body
        ├── h1
        │   └── "Hello"
        └── p
            └── "Welcome"
```

The browser also discovers resources such as CSS, JavaScript, images, and fonts while parsing the HTML.

# postcss-modules-standalone
Provides a standalone build of postcss-modules for use in browsers and other non-Node.js environments.

# Install
`npm install postcss-modules-standalone`

# Build
`npm run build`

# Usage

Add below code to your html code:

```
<script src="/path/to/postcss-modules-standalone/index.bundle.min.js"></script>

or use cdn

<script src="https://cdn.jsdelivr.net/npm/postcss-modules-standalone/index.bundle.min.js"></script>
```

Then you can call postcss:
 
```
const postcss = require('postcss');
const pm = require('postcss-modules');
const fs = require('fs');

fs.writeFileSync('/styles.css', `
:global .page {
  padding: 20px;
}

.title {
  composes: title from "./mixins.css";
  color: green;
}

.article {
  font-size: 16px;
}`);
fs.writeFileSync('/mixins.css', `
.title {
  color: black;
  font-size: 40px;
}

.title:hover {
  color: red;
}`);

let exported;
postcss([pm({
  getJSON: function (cssFileName, json, outputFileName) {
    exported = JSON.stringify(json);
  },
})])
  .process(fs.readFileSync('/styles.css', 'utf-8'))
  .then(value => {
    const css=`${value.css}
exported {
  --json: ${exported}
}`;
    console.log(css);
  })
```

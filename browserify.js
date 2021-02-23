const browserifyClass = require('browserify');
const browserifyConfig = {
  // Override Browserify's builtins for buffer/fs/path.
  builtins: Object.assign({}, require('browserify/lib/builtins'), {
    "buffer": require.resolve('browserfs/dist/shims/buffer.js'),
    "fs": require.resolve("browserfs/dist/shims/fs.js"),
    "path": require.resolve("browserfs/dist/shims/path.js")
  }),
  insertGlobalVars: {
    // process, Buffer, and BrowserFS globals.
    // BrowserFS global is not required if you include browserfs.js
    // in a script tag.
    "process": function () { return "require('browserfs/dist/shims/process.js')" },
    'Buffer': function () { return "require('buffer').Buffer" },
    'BrowserFS': function () { return "require('browserfs')" },
  }
};
let browserify = browserifyClass(['index.js'], browserifyConfig);
const deps = [
  'postcss-modules',
  'postcss',
  'fs',
];
deps.forEach(item => {
  browserify = browserify.require(item)
});
browserify.transform('uglifyify', { global: true  }).bundle().pipe(process.stdout);
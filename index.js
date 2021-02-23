const BrowserFS = require('browserfs');
BrowserFS.install(window);
BrowserFS.configure({ fs: "InMemory" }, () => {});
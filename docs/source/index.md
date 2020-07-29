# Neuron
![Neuron](/docs/g1143.png)

[![Build Status](https://travis-ci.com/underpig1/neuron-lang.svg?token=mzNPUMLDXoM8ZdHFTfyh&branch=master)](https://travis-ci.com/underpig1/neuron-lang)
![neuron-lang](https://github.com/underpig1/neuron-lang/workflows/neuron-lang/badge.svg)
[![Documentation Status](https://readthedocs.org/projects/neuron-lang/badge/?version=master)](https://neuron-lang.readthedocs.io/en/master/?badge=master)

Neuron is a language that compiles directly into HTML, CSS, and JavaScript.

[Documentation](https://neuron-lang.readthedocs.io/en/master/)
# Installation
Install Neuron with `npm`:
```
npm install -g neuron-lang
```
Use Neuron in the browser through its web framework:
```html
<script src = "https://github.com/underpig1/neuron-lang/blob/master/lib/browser/browser.mjs" type = "module"></script>
```

# Features
- Object-oriented programming
- Consise and forgiving syntax
- Features the long-awaited unity of HTML, CSS, and JavaScript
- Support in most browsers without third-party software
- Comprehensive standard library

# Packages
Packages with JavaScript bindings are written in the JSON format. See [`lib/packages/reference.json`](https://github.com/underpig1/neuron-lang/blob/master/lib/packages/reference.json) for an example.

To help extensify Neuron's standard library, submit a Pull Request with the appended package in the `lib/packages` folder.

# Command Line
Install Neuron with `npm`:
```
npm install -g neuron-lang
```
Neuron can then be used in the Command Line as such: `neuron myFile.neuron`

# Browser Support
Neuron can be used in the browser through its web framework:
```html
<script src = "https://github.com/underpig1/neuron-lang/blob/master/lib/browser/browser.mjs" type = "module"></script>
<script type = "text/neuron">
  // neuron
</script>
```


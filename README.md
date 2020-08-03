![Neuron](docs/g1143.png)

[![Build Status](https://travis-ci.com/underpig1/neuron-lang.svg?token=mzNPUMLDXoM8ZdHFTfyh&branch=master)](https://travis-ci.com/underpig1/neuron-lang)
![neuron-lang](https://github.com/underpig1/neuron-lang/workflows/neuron-lang/badge.svg)
[![npm version](https://badge.fury.io/js/neuron-lang.svg)](https://badge.fury.io/js/neuron-lang)
[![Documentation Status](https://readthedocs.org/projects/neuron-lang/badge/?version=master)](https://neuron-lang.readthedocs.io/en/master/?badge=master)

Neuron is a language that compiles directly into HTML, CSS, and JavaScript. Neuron is currently under heavy development.

### [Documentation](https://neuron-lang.readthedocs.io/en/master/)
### [Getting Started with Neuron](https://neuron-lang.readthedocs.io/en/master/getting-started.html)

### Neuron Language:
```javascript
image {
 tag: img;
 src: path/to/image;
 fill: [math.abs => -10] 0 0 0;
 log(this.fill);
}

invoke(image);
```
### Comparative JavaScript (and HTML):
```html
<style>
 #image {
  background-color: rgba(0, 0, 0, 0);
 }
</style>

<img id = "image" src = "path/to/image"/>

<script>
 image = document.getElementById("image");
 image.style.backgroundColor = `rgba(${Math.abs(-10)}, 0, 0, 0)`;
 console.log(image.style.backgroundColor);
</script>
```

## Installation
Install Neuron with `npm`:
```
npm install -g neuron-lang
```
Use Neuron in the browser through its web framework:
```html
<script src = "https://github.com/underpig1/neuron-lang/blob/master/lib/browser/browser.mjs" type = "module"></script>
```

## Features
- Object-oriented programming
- Consise and forgiving syntax
- Features the long-awaited unity of HTML, CSS, and JavaScript
- Support in most browsers without third-party software
- Comprehensive standard library

## Packages
Packages with JavaScript bindings are written in the JSON format. See [`lib/packages/reference.json`](https://github.com/underpig1/neuron-lang/blob/master/lib/packages/reference.json) for an example.

To help extensify Neuron's standard library, submit a Pull Request with the appended package in the `lib/packages` folder.

# Getting Started with Neuron
## Installing Neuron with `npm`
With the latest stable version of `npm` installed, run the following in your command line to install the Neuron language globally:
```
npm install -g neuron-lang
```
The command `neuron` will be available for use in the command line globally. The `neuron` command will accept an argument for the directory to the file to compile and execute. `neuron` can also be used to invoke the Neuron language interpereter when used without arguments.
## Neuron in the Browser
When using Neuron in the browser, specify the script type as `text/neuron`, including the compiler as a module.
```html
<script src = "https://github.com/underpig1/neuron-lang/blob/master/lib/browser/browser.mjs" type = "module"></script>
<script type = "text/neuron">
  // neuron
</script>
```

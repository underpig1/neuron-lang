import {compile} from "../compiler/compiler.mjs";

var scripts = document.getElementsByTagName("script");
for (var i in scripts) {
  if (scripts[i].type == "text/neuron") {
    scripts[i].type = "text/javascript";
    scripts[i].innerHTML = `document.write(compile(${scripts[i].innerHTML}));`;
  }
}

import {packages} from "../packages/packages.mjs";
import {modules} from "../packages/modules/modules.mjs";
export function compile(input) {
  function lexicalAnalysis(input) {
    var input = input.replace(/\n|\t/g, "").replace(/\/\/(.*?)$/g, "");
    var blocks = [...input.matchAll(/(?<=\w+\s*?)\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/g)];
    var expressions = [input.replace(/\w+\s+\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/g, "")];
    var definers = [...input.matchAll(/\w+(?=\s*?\{)/g)];
    var ast = {type: "Program", body: []};
    var variables = [];
    for (var i in blocks) {
      blocks[i] = blocks[i][0];
      blocks[i] = blocks[i].trim().slice(1, -1);
    }
    for (var i in definers) {
      definers[i] = definers[i][0].trim();
      var block = {type: "Block", name: definers[i], children: []};
      ast.body.push(block);
      var properties = blocks[i].trim().replace(/if|for(.*?)\}/g, "").split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
        return element.includes(":");
      });
      var conditionals = [...blocks[i].matchAll(/if(.*?)\}/g)];
      var methods = [...blocks[i].replace(/if|for(.*?)\}/g, "").matchAll(/\w+(?=\s*?\()(.*?)\)/g)];
      var iterators = [...blocks[i].matchAll(/for(.*?)\}/g)];
      var statements = [...blocks[i].replace(/if|for(.*?)\}/g, "").matchAll(/\w+\s*?\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/g)];
      for (var j in properties) {
        block.children.push({type: "Property", name: properties[j].split(":")[0].replace(/ /g, ""), value: properties[j].split(":")[1].trim()});
      }
      for (var j in conditionals) {
        conditionals[j] = conditionals[j][0].trim();
        var conditional = {type: "Conditional", name: "if", value: conditionals[j].match(/(?<=\()(.*?)(?=\))/g)[0], children: []};
        block.children.push(conditional);
        var properties = conditionals[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes(":");
        });
        var method = [...conditionals[j].match(/(?<=\{)(.*?)(?=\})/g)[0].matchAll(/\w+(?=\s*?\()(.*?)\)/g)];
        for (var k in properties) {
          conditional.children.push({type: "Property", name: properties[k].split(":")[0].replace(/ /g, ""), value: properties[k].split(":")[1].trim()});
        }
        for (var k in method) {
          method[k] = method[k][0];
          conditional.children.push({type: "Method", name: method[k].match(/\w+(?=\s*?\((.*?)\))/g)[0], value: method[k].match(/(?<=\()(.*?)(?=\))/g)[0]});
        }
        var properties = conditionals[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes("=");
        });
        for (var k in properties) {
          if (properties[k].includes("#")) {
            if (!(properties[k].split("=")[0].trim() in ast.body)) {
              ast.body.push({type: "Block", name: properties[k].split("=")[0].trim(), children: [{type: "Property", name: "value", value: properties[k].split("=")[1].trim()}]});
            }
            else {
              conditional.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].trim()} value ${properties[k].split("=")[1].trim()}`});
            }
          }
          else {
            conditional.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].split(".")[0].trim()} ${properties[k].split("=")[0].split(".")[1].trim()} ${properties[k].split("=")[1].trim()}`});
          }
        }
      }
      for (var j in iterators) {
        iterators[j] = iterators[j][0].trim();
        var iterator = {type: "Iterator", name: "for", value: iterators[j].match(/(?<=\()(.*?)(?=\))/g)[0], children: []};
        block.children.push(iterator);
        var properties = iterators[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes(":");
        });
        var method = [...iterators[j].match(/(?<=\{)(.*?)(?=\})/g)[0].matchAll(/\w+(?=\s*?\()(.*?)\)/g)];
        for (var k in properties) {
          iterator.children.push({type: "Property", name: properties[k].split(":")[0].replace(/ /g, ""), value: properties[k].split(":")[1].trim()});
        }
        for (var k in method) {
          method[k] = method[k][0];
          iterator.children.push({type: "Method", name: method[k].match(/\w+(?=\s*?\((.*?)\))/g)[0], value: method[k].match(/(?<=\()(.*?)(?=\))/g)[0]});
        }
        var properties = iterators[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes("=");
        });
        for (var k in properties) {
          if (properties[k].includes("#")) {
            if (!(properties[k].split("=")[0].trim() in ast.body)) {
              ast.body.push({type: "Block", name: properties[k].split("=")[0].trim(), children: [{type: "Property", name: "value", value: properties[k].split("=")[1].trim()}]});
            }
            else {
              iterator.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].trim()} value ${properties[k].split("=")[1].trim()}`});
            }
          }
          else {
            iterator.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].split(".")[0].trim()} ${properties[k].split("=")[0].split(".")[1].trim()} ${properties[k].split("=")[1].trim()}`});
          }
        }
      }
      for (var j in methods) {
        methods[j] = methods[j][0].trim();
        block.children.push({type: "Method", name: methods[j].match(/\w+(?=\s*?\((.*?)\))/g)[0], value: methods[j].match(/(?<=\()(.*?)(?=\))/g)[0]});
      }
      if (definers[i] == "package.append") {
        var file = new XMLHttpRequest();
        file.open("GET", obj.children[0].value, false);
        file.onreadystatechange = function ()
        {
            if (file.readyState === 4)
            {
                if (file.status === 200 || file.status == 0)
                {
                    ast.body.push(lexicalAnalysis(file.responseText).body);
                }
            }
        }
        file.send(null);
      }
      var properties = blocks[i].trim().replace(/if|for(.*?)\}/g, "").split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
        return element.includes("=");
      });
      for (var j in properties) {
        if (properties[j].includes("#")) {
          if (!(properties[j].split("=")[0].trim() in ast.body)) {
            ast.body.push({type: "Block", name: properties[j].split("=")[0].trim(), children: [{type: "Property", name: "value", value: properties[j].split("=")[1].trim()}]});
          }
          else {
            block.children.push({type: "Method", name: "setProperty", value: `${properties[j].split("=")[0].trim()} value ${properties[j].split("=")[1].trim()}`});
          }
        }
        else {
          block.children.push({type: "Method", name: "setProperty", value: `${properties[j].split("=")[0].split(".")[0].trim()} ${properties[j].split("=")[0].split(".")[1].trim()} ${properties[j].split("=")[1].trim()}`});
        }
      }
      var properties = blocks[i].trim().replace(/if|for(.*?)\}/g, "").split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
        return element.includes("~");
      });
      for (var j in properties) {
        block.children.push({type: "Property", name: "inherited", value: properties[j].match(/(?<=\~)\w+/g)[0]});
      }
    }
    for (var i in expressions) {
      expressions[i] = expressions[i].trim();
      var expression = {type: "Method", name: "Expression", children: []};
      ast.body.push(expression);
      var properties = expressions[i].trim().replace(/if|for(.*?)\}/g, "").split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
        return element.includes(":");
      });
      var conditionals = [...expressions[i].matchAll(/if(.*?)\}/g)];
      var methods = [...expressions[i].replace(/if|for(.*?)\}/g, "").matchAll(/\w+(?=\s*?\()(.*?)\)/g)];
      var iterators = [...expressions[i].matchAll(/for(.*?)\}/g)];
      for (var j in properties) {
        expression.children.push({type: "Property", name: properties[j].split(":")[0].replace(/ /g, ""), value: properties[j].split(":")[1].trim()});
      }
      for (var j in conditionals) {
        conditionals[j] = conditionals[j][0].trim();
        var conditional = {type: "Conditional", name: "if", value: conditionals[j].match(/(?<=\()(.*?)(?=\))/g)[0], children: []};
        expression.children.push(conditional);
        var properties = conditionals[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes(":");
        });
        var method = [...conditionals[j].match(/(?<=\{)(.*?)(?=\})/g)[0].matchAll(/\w+(?=\s*?\()(.*?)\)/g)];
        for (var k in properties) {
          conditional.children.push({type: "Property", name: properties[k].split(":")[0].replace(/ /g, ""), value: properties[k].split(":")[1].trim()});
        }
        for (var k in method) {
          method[k] = method[k][0];
          conditional.children.push({type: "Method", name: method[k].match(/\w+(?=\s*?\((.*?)\))/g)[0], value: method[k].match(/(?<=\()(.*?)(?=\))/g)[0]});
        }
        var properties = conditionals[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes("=");
        });
        for (var k in properties) {
          if (properties[k].includes("#")) {
            if (!(properties[k].split("=")[0].trim() in ast.body)) {
              ast.body.push({type: "Block", name: properties[k].split("=")[0].trim(), children: [{type: "Property", name: "value", value: properties[k].split("=")[1].trim()}]});
            }
            else {
              conditional.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].trim()} value ${properties[k].split("=")[1].trim()}`});
            }
          }
          else {
            conditional.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].split(".")[0].trim()} ${properties[k].split("=")[0].split(".")[1].trim()} ${properties[k].split("=")[1].trim()}`});
          }
        }
      }
      for (var j in iterators) {
        iterators[j] = iterators[j][0].trim();
        var iterator = {type: "Iterator", name: "for", value: iterators[j].match(/(?<=\()(.*?)(?=\))/g)[0], children: []};
        expression.children.push(iterator);
        var properties = iterators[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes(":");
        });
        var method = [...iterators[j].match(/(?<=\{)(.*?)(?=\})/g)[0].matchAll(/\w+(?=\s*?\()(.*?)\)/g)];
        for (var k in properties) {
          iterator.children.push({type: "Property", name: properties[k].split(":")[0].replace(/ /g, ""), value: properties[k].split(":")[1].trim()});
        }
        for (var k in method) {
          method[k] = method[k][0];
          iterator.children.push({type: "Method", name: method[k].match(/\w+(?=\s*?\((.*?)\))/g)[0], value: method[k].match(/(?<=\()(.*?)(?=\))/g)[0]});
        }
        var properties = iterators[j].match(/(?<=\{)(.*?)(?=\})/g)[0].trim().split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
          return element.includes("=");
        });
        for (var k in properties) {
          if (properties[k].includes("#")) {
            if (!(properties[k].split("=")[0].trim() in ast.body)) {
              ast.body.push({type: "Block", name: properties[k].split("=")[0].trim(), children: [{type: "Property", name: "value", value: properties[k].split("=")[1].trim()}]});
            }
            else {
              iterator.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].trim()} value ${properties[k].split("=")[1].trim()}`});
            }
          }
          else {
            iterator.children.push({type: "Method", name: "setProperty", value: `${properties[k].split("=")[0].split(".")[0].trim()} ${properties[k].split("=")[0].split(".")[1].trim()} ${properties[k].split("=")[1].trim()}`});
          }
        }
      }
      for (var j in methods) {
        methods[j] = methods[j][0].trim();
        expression.children.push({type: "Method", name: methods[j].match(/\w+(?=\s*?\((.*?)\))/g)[0], value: methods[j].match(/(?<=\()(.*?)(?=\))/g)[0]});
      }
      var properties = expressions[i].trim().replace(/if|for(.*?)\}/g, "").split(/(?!\[.*)\;(?![^[]*?\])/g).filter(function (element) {
        return element.includes("=");
      });
      for (var j in properties) {
        if (properties[j].includes("#")) {
          if (!(properties[j].split("=")[0].trim() in ast.body)) {
            ast.body.push({type: "Block", name: properties[j].split("=")[0].trim(), children: [{type: "Property", name: "value", value: properties[j].split("=")[1].trim()}]});
          }
          else {
            expression.children.push({type: "Method", name: "setProperty", value: `${properties[j].split("=")[0].trim()} value ${properties[j].split("=")[1].trim()}`});
          }
        }
        else {
          expression.children.push({type: "Method", name: "setProperty", value: `${properties[j].split("=")[0].split(".")[0].trim()} ${properties[j].split("=")[0].split(".")[1].trim()} ${properties[j].split("=")[1].trim()}`});
        }
      }
    }
    return ast;
  }
  var ast = lexicalAnalysis(input);

  function transform(ast) {
    for (var i in ast.body) {
      var obj = ast.body[i];

      function generate(obj) {
        if ("children" in obj) {
          for (var j in obj.children) {
            obj.children[j].value = obj.children[j].value.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
            if ("children" in obj.children[j]) {
              generate(obj.children[j]);
              obj.children[j].execute = function () {
                for (var k in this.children) {
                  if ("execute" in this.children[k]) {
                    this.children[k].value = this.children[k].value.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
                    this.children[k].execute();
                    this.children[k].value = this.children[k].value.join(" ");
                  }
                }
              }
            }
            var parameters = obj.children[j].value;
            for (var k in parameters) {
              var values = parameters[k].split(" ");
              for (var l in packages) {
                for (var m in packages[l]) {
                  if (packages[l][m].type.includes("identifier")) {
                    parameters[k] = parameters[k].replace(new RegExp(`${l}.${m}`, "g"), eval(packages[l][m].identity));
                  }
                }
              }
              for (var l in modules) {
                for (var m in modules[l]) {
                  if (modules[l][m].type.includes("identifier")) {
                    parameters[k] = parameters[k].replace(new RegExp(m, "g"), eval(modules[l][m].identity));
                  }
                }
              }
              if (parameters[k].includes(".")) {
                var properties = [...parameters[k].matchAll(/(?<=\.)\w+/g)];
                var values = [...parameters[k].matchAll(/\w+(?=\.)/g)];
                for (var l in [...parameters[k].matchAll(/\w+\.\w+/g)]) {
                  if (values[l] == "this") {
                    for (var m in obj.children) {
                      if (obj.children[m].name == properties[l]) {
                        parameters[k] = parameters[k].replace(String.raw`${values[l]}.${properties[l]}`, obj.children[m].value);
                      }
                    }
                  }
                  else {
                    for (var m in ast.body) {
                      if (ast.body[m].name == values[l]) {
                        for (var n in ast.body[m].children) {
                          if (ast.body[m].children[n].name == properties[l]) {
                            parameters[k] = parameters[k].replace(String.raw`${values[l]}.${properties[l]}`, ast.body[m].children[n].value);
                          }
                        }
                      }
                    }
                  }
                }
              }
              if (/\[(.*?)\]/g.test(parameters[k])) {
                var values = parameters[k].match(/\[(.*?)\]/g)[0].replace(/\[|\]/g, "").split(" ").filter(function (element) {
                  return !(element == "=>");
                });
                for (var l in ast.body) {
                  if (ast.body[l].name == values[0]) {
                    for (var m in ast.body[l].children) {
                      if (ast.body[l].children[m].name == "value") {
                        parameters[k] = parameters[k].replace(/\[(.*?)\]/g, ast.body[l].children[m].value);
                      }
                    }
                  }
                }
                if (parameters[k].includes("colorspaces.hextorgba")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, `${parseInt(values[1].substring(0, 2), 16)} ${parseInt(values[1].substring(2, 4), 16)} ${parseInt(values[1].substring(4, 6), 16)} ${parseInt(values[1].substring(6, 8), 16)}`);
                }
                if (parameters[k].includes("int?")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, Number.isInteger(parseInt(values[1])));
                }
                if (parameters[k].includes("bool?")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, (values[1] == "true"));
                }
                if (parameters[k].includes("concatenate")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, values[1] + values[2]);
                }
                if (parameters[k].includes("length?")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, values[1].length);
                }
                if (parameters[k].includes("includes?")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, values[1].includes(values[2]));
                }
                if (parameters[k].includes("upcase")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, values[1].toUpperCase());
                }
                if (parameters[k].includes("downcase")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, values[1].toLowerCase());
                }
                if (parameters[k].includes("input")) {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, window.prompt(values[1]));
                }
                for (var l in packages) {
                  for (var m in packages[l]) {
                    if (packages[l][m].type.includes("expression")) {
                      if (parameters[k].includes(`${l}.${m}`)) {
                        parameters[k] = parameters[k].replace(/\[(.*?)\]/g, new Function(packages[l][m].identity).call(...values));
                      }
                    }
                  }
                }
                for (var l in modules) {
                  for (var m in modules[l]) {
                    if (modules[l][m].type.includes("expression")) {
                      if (parameters[k].includes(m)) {
                        parameters[k] = parameters[k].replace(/\[(.*?)\]/g, new Function(modules[l][m].identity).call(...values));
                      }
                    }
                  }
                }
                for (var l in ast.body) {
                  if (ast.body[l].name == values[0]) {
                    for (var m in ast.body[l].children) {
                      if (ast.body[l].children[m].name == "return") {
                        var params = ast.body[l].children[m].value;
                        for (var n in values.slice(1)) {
                          params = params.replace("#" + n, values.slice(1)[n]);
                        }
                        parameters[k] = parameters[k].replace(/\[(.*?)\]/g, params);
                      }
                    }
                  }
                }
                try {
                  parameters[k] = parameters[k].replace(/\[(.*?)\]/g, eval(parameters[k].match(/\[(.*?)\]/g)[0].replace(/\[|\]/g, "")).toString());
                } catch (error) { }
              }
            }
            if (obj.children[j].name == "inherited") {
              obj.children[j].execute = function () {
                for (var k in ast.body) {
                  if (ast.body[k].name == obj.children[j].value) {
                    obj.children.push(...ast.body[k].children);
                  }
                }
              }
            }
            else if (obj.children[j].name == "setProperty") {
              obj.children[j].execute = function () {
                for (var k in ast.body) {
                  if (ast.body[k].name == this.value[0]) {
                    for (var l in ast.body[k].children) {
                      if (ast.body[k].children[l].name == this.value[1]) {
                        ast.body[k].children[l].value = this.value[2];
                      }
                    }
                    if (!ast.body[k].some(element => element.name == this.value[0])) {
                      ast.body[k].children.push({type: "Property", name: this.value[1], value: this.value[2]});
                    }
                  }
                }
                if (this.value[0] == "window") {
                  if (this.value[1] == "width") {
                    window.innerWidth = this.value[2];
                  }
                  else if (this.value[1] == "height") {
                    window.innerHeight = this.value[2];
                  }
                }
                for (var l in packages) {
                  for (var m in packages[l]) {
                    if (packages[l][m].type.includes("assignment")) {
                      if (this.value[0] == l) {
                        if (this.value[1] == m) {
                          eval(`${packages[l][m].identity} = ${this.value[2]};`);
                        }
                      }
                    }
                  }
                }
                for (var l in modules) {
                  for (var m in modules[l]) {
                    if (modules[l][m].type.includes("assignment")) {
                      if (this.value[1] == m) {
                        eval(`${modules[l][m].identity} = ${this.value[2]};`);
                      }
                    }
                  }
                }
              }
            }
            else if (obj.children[j].name == "fill") {
              obj.children[j].execute = function () {
                style = style.concat(`color: rgba(${this.value[0]}, ${this.value[1]}, ${this.value[2]}, ${this.value[3]}); background-color: rgba(${this.value[0]}, ${this.value[1]}, ${this.value[2]}, ${this.value[3]}); `);
              }
            }
            else if (obj.children[j].name == "stroke") {
              obj.children[j].execute = function () {
                style = style.concat(`border: ${this.value[4]} solid rgba(${this.value[0]}, ${this.value[1]}, ${this.value[2]}, ${this.value[3]}); `);
              }
            }
            else if (obj.children[j].name == "if") {
              obj.children[j].execute = function () {
                if (eval(this.value.join(" "))) {
                  generate(this);
                  for (var k in this.children) {
                    if ("execute" in this.children[k]) {
                      this.children[k].value = this.children[k].value.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
                      this.children[k].execute();
                      this.children[k].value = this.children[k].value.join(" ");
                    }
                  }
                }
              }
            }
            else if (obj.children[j].name == "position") {
              obj.children[j].execute = function () {
                style = style.concat(`left: ${this.value[0]}; top: ${this.value[1]}; `);
              }
            }
            else if (obj.children[j].name == "width") {
              obj.children[j].execute = function () {
                style = style.concat(`width: ${this.value[0]}; `);
              }
            }
            else if (obj.children[j].name == "height") {
              obj.children[j].execute = function () {
                style = style.concat(`height: ${this.value[0]}; `);
              }
            }
            else if (obj.children[j].name == "polygon") {
              obj.children[j].execute = function () {
                style = style.concat(`clip-path: polygon(${this.value}); `);
              }
            }
            else if (obj.children[j].name == "value") {
              obj.children[j].execute = function () { }
            }
            else if (obj.children[j].name == "return") {
              obj.children[j].execute = function () { }
            }
            else if (obj.children[j].name == "gradient") {
              obj.children[j].execute = function () {
                style = style.concat(`background-image: linear-gradient(${this.value}); `);
              }
            }
            else if (obj.children[j].name == "image") {
              obj.children[j].execute = function () {
                style = style.concat(`background-image: url(${this.value[0]}); `);
              }
            }
            else if (obj.children[j].name == "alert") {
              obj.children[j].execute = function () {
                alert(this.value[0]);
              }
            }
            else if (obj.children[j].name == "window") {
              obj.children[j].execute = function () {
                window.open(this.value[0], this.value[1]);
              }
            }
            else if (obj.children[j].name == "invoke") {
              obj.children[j].execute = function () {
                for (var k in ast.body) {
                  if (ast.body[k].name == this.value[0]) {
                    ast.body[k].execute();
                  }
                }
              }
            }
            else if (obj.children[j].name == "onclick") {
              obj.children[j].children[j].execute = function () {
                if (this.value[0] == "redirect") {
                  html = html.concat(`onclick = 'window.location.href = ${this.value[1]};'`);
                }
                else if (this.value[0] == "log") {
                  html = html.concat(`onclick = 'console.log(${this.value[1]});'`);
                }
                else if (this.value[0] == "alert") {
                  html = html.concat(`onclick = 'alert(${this.value[1]});'`);
                }
                else {
                  html = html.concat(`onclick = '${this.value.join(" ")}'`);
                }
              }
            }
            else if (obj.children[j].name == "log") {
              obj.children[j].execute = function () {
                console.log(this.value.join(" "));
              }
            }
            else if (obj.children[j].name == "appendProperty") {
              obj.children[j].execute = function () {
                for (var k in ast.body) {
                  if (ast.body[k].name == this.value[0]) {
                    ast.body[k].push({type: "Property", name: this.value[1], value: this.value[2]});
                  }
                }
              }
            }
            else if (obj.children[j].name == "for") {
              obj.children[j].execute = function () {
                for (var j = 0; j < this.value[2]; j++) {
                  for (var k in this.children) {
                    var value = this.children[k].value;
                    this.children[k].value = this.children[k].value.replace("#" + this.value[0], j);
                    generate({type: "Block", name: this.children[k], children: [this.children[k]]});
                    this.children[k].value = this.children[k].value.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
                    this.children[k].execute();
                    this.children[k].value = value;
                  }
                }
              }
            }
            else if (obj.children[j].name == "redirect") {
              obj.children[j].execute = function () {
                window.location.href = this.value[0];
              }
            }
            for (var l in packages) {
              for (var m in packages[l]) {
                if (packages[l][m].type.includes("property")) {
                  if (obj.children[j].name == `${l}.${m}`) {
                    obj.children[j].execute = new Function(packages[l][m].identity.replace(/arguments/g, "this.value"));
                  }
                }
              }
            }
            for (var l in modules) {
              for (var m in modules[l]) {
                if (modules[l][m].type.includes("property")) {
                  if (obj.children[j].name == m) {
                    obj.children[j].execute = new Function(modules[l][m].identity.replace(/arguments/g, "this.value"));
                  }
                }
              }
            }
            if (!("execute" in obj.children[j])) {
              for (var l in ast.body) {
                if (ast.body[l].name == obj.children[j].name) {
                  obj.children[j].execute = function () {
                    for (var l in ast.body) {
                      if (ast.body[l].name == obj.children[j].name) {
                        for (var m in ast.body[l].children) {
                          var params = ast.body[l].children[m].value;
                          for (var n in this.value) {
                            params = params.replace("#" + n, this.value[n]);
                          }
                          ast.body[l].children[m].value = params.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
                          ast.body[l].children[m].execute();
                        }
                      }
                    }
                  }
                }
              }
            }
            obj.children[j].value = obj.children[j].value.join(" ");
          }
        }
      }
      generate(obj);
    }

    var html = "";
    var style = "";
    for (var i in ast.body) {
      var obj = ast.body[i];
      if ("children" in obj) {
        obj.execute = function () {
          style = "position: absolute; ";
          var tag = "div";
          for (var j in this.children) {
            if (this.children[j].name == "tag") {
              tag = this.children[j].value;
            }
          }
          html = html.concat(`<${tag} id = ${this.name} `);
          for (var j in this.children) {
            if ("execute" in this.children[j]) {
              this.children[j].value = this.children[j].value.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
              this.children[j].execute();
              this.children[j].value = this.children[j].value.join(" ");
            }
            else {
              style = style.concat(`${this.children[j].name}: ${this.children[j].value}; `);
              html = html.concat(`${this.children[j].name} = '${this.children[j].value}' `);
            }
          }
          html = html.concat(`style = '${style}'></${tag}>`);
        }
      }
    }

    for (var i in ast.body) {
      var obj = ast.body[i];
      if (obj.type == "Method") {
        for (var j in obj.children) {
          if ("execute" in obj.children[j]) {
            obj.children[j].value = obj.children[j].value.split(/(?!\[.*)[\s,]+(?![^[]*?\])/g);
            obj.children[j].execute();
            obj.children[j].value = obj.children[j].value.join(" ");
          }
        }
      }
    }
    return html;
  }
  return transform(ast);
}

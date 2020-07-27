#!/usr/bin/env node --experimental-json-modules --no-warnings

import {compile} from "../lib/compiler/compiler.mjs";
import {createInterface} from "readline";
import {readFile} from "fs";

if (process.argv[2]) {
  readFile(process.argv[2], "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    compile(data);
  });
}
else {
  var input = [];
  var rl = createInterface({
      input: process.stdin,
      output: process.stdout
  });
  rl.prompt();
  rl.on("line", function (cmd) {
    input.push(cmd);
  });
  rl.on("close", function (cmd) {
    compile(input.join("\n"));
    process.exit(0);
  });
}

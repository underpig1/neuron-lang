import {readdir, readFile} from "fs";
import {compile} from "../lib/compiler/compiler.mjs";

readdir("./test", (error, files) => {
  files.forEach(file => {
    readFile(`./test/${file}`, "utf8", (error, file) => {
      compile(file);
    });
  });
});

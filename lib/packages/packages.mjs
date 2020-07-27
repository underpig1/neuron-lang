import math from "./math.json";
import win from "./window.json";
import json_parser from "./json_parser.json";
import regex from "./regex.json";
import time from "./time.json";
export var packages = Object.assign(math, (typeof window !== "undefined") ? win : null, json_parser, regex, time);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typescriptはrequireは基本使わずimport形式で書く
var fs = require("fs");
function total(data) {
    var t = 0;
    data.forEach(function (item) {
        t += item.count;
    });
    return t;
}
var content = fs.readFileSync('data.json');
var data = JSON.parse(content);
console.log(total(data));

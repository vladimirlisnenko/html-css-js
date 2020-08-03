const input = require('./in.json')
const fs = require('fs');

console.warn('123')
console.log(input.lastName);

input.lastName="Test"

let text = JSON.stringify(input)

fs.writeFile("./output.json", text, function(err) {
    if(err) {
        console.error(err);
    }
    console.log("The file was saved!");
}); 


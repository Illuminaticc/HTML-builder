const fs = require("fs");
const path = require('path');
const readline = require('readline');

let rl = readline.createInterface(
    process.stdin, process.stdout
);

filePath = path.join(__dirname, "text.txt");
const writableStream = fs.createWriteStream(filePath);


console.log("Enter data");
rl.on('line', (input) => {
    if(input.trim() === "exit") {
        rl.pause();
        console.log("End of writing")
        writableStream.end();
    }
    else {writableStream.write(input);}
});

rl.on('SIGINT', () => {
    console.log("End of writing")
    rl.pause();
  }); 
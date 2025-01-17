const fs = require("fs");
const path = require('path');
filePath = path.join(__dirname, "secret-folder");

fs.readdir(filePath,{withFileTypes: true}, readDir);

function readDir(error, files) {
    if(error) {
        console.log(error.message);
    }
    else {
        files.forEach(dirent => {
            if(dirent.isFile()) {
                f = path.join(__dirname, "secret-folder", dirent.name);
                fs.stat(f, (error, stats) => {
                    const name =  dirent.name.split(".")[0];
                    const ex = path.extname(dirent.name);
                    console.log(`${name} - ${ex.split(".")[1]} - ${(stats.size / 1024).toFixed(3)}kb`);
                  });  
            }
        })
    }
}

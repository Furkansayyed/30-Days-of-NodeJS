const fs = require('fs')

function readFileContents(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`File Content: \n ${data}`)
        }
    })
}

readFileContents('file1.txt')
const fs = require('fs')

function writeToFile(filepath, content) {
    fs.writeFile(filepath, content, (err) => {
        if (err) {
            console.log(err)
        }
        console.log('Done Writing to file...');
    })
}

writeToFile('./index.txt', 'This is Sample Text');
writeToFile('nonfolder/index.txt', 'this is non-exitsting file');
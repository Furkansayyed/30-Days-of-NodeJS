const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    const extension = path.extname(filePath);

    if (extension === expectedExtension) {
        console.log('File has expected Extension ' , expectedExtension);
    }

    else{
        console.log(`File does not have \nexpected extension ${expectedExtension}\nActual Extension: ${extension}`);
    }
}

checkFileExtension('file.txt', '.txt');
checkFileExtension('../Day-4/code_output.png', '.jpg');
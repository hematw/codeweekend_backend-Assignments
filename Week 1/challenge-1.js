const fs = require('fs');
const path = require('path');

const directoryPath = 'files';

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

    if (txtFiles.length === 0) {
        console.log('No .txt files found in the directory.');
        return;
    }

    txtFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }
            console.log(`Content of file ${file}:\n${content}`);
        });
    });
});
const fs = require('fs');
const tools = require('./tools');

// final size of the file to create
const fileSizeLimitMB = 100;
// lower limit for the generated number
const numberRangeMin = 1;
// upper limit for the generated number
const numberRangeMax = 10e7;
// size of the generated array to write to the file at a single step
const chunkLength = 10e4;

module.exports = function create(fileName) {
    console.log(`Start create file ${fileName}...`);
    if (fs.existsSync(fileName))
        fs.unlink(fileName, (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
    do {
        let numbers = Array.from({length: chunkLength}, () => tools.getRandomInteger(numberRangeMin, numberRangeMax));
        fs.appendFileSync(fileName, numbers.join("\n"), (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
    }
    while (tools.calcFileSizeMB(fileName) < fileSizeLimitMB);
    console.log(`The file ${fileName} was created. Final file size: ${tools.calcFileSizeMB(fileName)}MB`);
}

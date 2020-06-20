const fs = require('fs');
const readline = require('readline');
const createFile = require('./createFile');
const tools = require('./tools');

const inputFileName = 'input.txt';
const outFileName = 'result.txt';
const chunkFileSizeMB = 5;

main();

async function main() {
    if (!fs.existsSync(inputFileName)) {
        createFile(inputFileName);
    }
    console.log(`Start splitting the file ${inputFileName}...`);
    let chunkFileNames = await splitFiles();
    console.log('The file was split. Start merging and sorting...');
    const streams = await createChunkStreams(chunkFileNames);
    const buffers = await Promise.all(streams.map(it => it.next()));
    const outStream = fs.createWriteStream(outFileName);
    async function writeToOutput() {
        while (buffers.length > 0) {
            let idxMin = buffers.findIndex(b => b.value === Math.min(...buffers.map(b => b.value)));
            let canContinue = outStream.write(`${buffers[idxMin].value}\n`);
            buffers[idxMin] = await streams[idxMin].next();
            if (buffers[idxMin].done) {
                buffers.splice(idxMin, 1);
                streams.splice(idxMin, 1);
            }
            if  (!canContinue) {
                outStream.once('drain', writeToOutput);
                return;
            }
        }
        outStream.end();
        await deleteFiles(chunkFileNames);
        console.log(`The end of the sorting. Sorted file: ${outFileName}`)
    }
    await writeToOutput();
}

async function deleteFiles(files) {
    return new Promise((res, rej) => {
        for (let fileName of files) {
            fs.unlink(fileName, (err) => {
                if (err) {
                    console.error(err);
                    rej(err);
                }
            });
        }
        res();
    });
}

async function splitFiles() {
    return new Promise((res) => {
        const chunkFileNames = [];
        const rl = readline.createInterface({input: fs.createReadStream(inputFileName), terminal: false});
        const lines = [];
        let chunkNumber = 0;
        rl.on('line', function (line) {
            lines.push(line);
            if (tools.calcSizeOfNumbersArrayMB(lines) > chunkFileSizeMB) {
                chunkFileNames.push(createChunkFile(lines, chunkNumber));
                chunkNumber++;
            }
        });
        rl.on('close', function () {
            chunkFileNames.push(createChunkFile(lines, chunkNumber));
            console.log(`${inputFileName} stream close`);
            res(chunkFileNames);
        });
    });
}

function createChunkFile(lines, chunkNumber) {
    let chunkFileName = `chunk${chunkNumber}.txt`;
    lines.sort((a, b) => a - b);
    fs.writeFileSync(chunkFileName, lines.join("\n"));
    console.log(`The file ${chunkFileName} was created. File size: ${tools.calcFileSizeMB(chunkFileName)}MB`);
    lines.length = 0;
    return chunkFileName;
}

function createChunkStreams (tmpFiles) {
    return tmpFiles
        .map(fileName => fs.createReadStream(fileName))
        .map(stream => streamToNumbers(stream))
}

async function* streamToNumbers(stream) {
    let previous = '';
    for await (const chunk of stream) {
        previous += chunk;
        let eolIndex;
        while ((eolIndex = previous.indexOf('\n')) >= 0) {
            const line = previous.slice(0, eolIndex+1);
            yield parseInt(line);
            previous = previous.slice(eolIndex+1);
        }
    }
    if (previous.length > 0) {
        yield parseInt(previous);
    }
}

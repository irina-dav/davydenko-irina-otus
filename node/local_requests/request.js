const http = require('http');

const args = process.argv.slice(2);
const n = +args[0];
const type = args[1];

const params = {
    host: '127.0.0.1',
    port: 5568,
    method: 'GET'
};

if (type === 's') {
    sendSequentialRequests(n).then(() => console.log(`${n} parallel sequential were sent`));
} else if (type === 'p') {
    sendParallelRequests(n).then(() => console.log(`${n} parallel requests were sent`));
} else {
    console.error('Wrong input arguments');
}

function sendGetRequest(params) {
    return new Promise((resolve, reject) => {
        const req = http.request(params, (res) => {
            console.log("statusCode=", res.statusCode);
            if (res.statusCode !== 200) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            resolve();
        });
        req.on('error', (err) => reject(err));
        req.end();
    });
}

async function sendSequentialRequests(n) {
    for (let i = 0; i < n; i++) {
        await sendGetRequest(params).then(null, (err) => console.log(err));
    }
}

async function sendParallelRequests(n) {
    let promises = [];
    for (let i = 0; i < n; i++) {
        promises.push(sendGetRequest(params).then(null, (err) => console.log(err)));
    }
    await Promise.all(promises);
}
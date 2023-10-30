const db = require('../../db.ts');

const hashRatePerSecond = () => {
    return db.queryHashRate("Antminer S1")
}

console.log(hashRatePerSecond())


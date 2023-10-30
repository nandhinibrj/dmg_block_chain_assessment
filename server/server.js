const express = require('express')
const request = require("request")
const cors = require('cors')
const db = require('./db.ts');
const port = 8000
const allowedOrigins = ['http://localhost:3000']
var corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json({ type: "application/json" }));
// const jsonData = require('../data/mining_hardware_data.json')

app.get('/api/register', async (req, res) => {
  try {
    res.json(await db.registerUser(req.body));
  } catch (err) {
    console.error(`Error while creating a new user record `, err.message);
  }
})

app.get('/api/login/:email', async (req, res) => {
  try {
    res.json(await db.readUser(req.params.email));
  } catch (err) {
    console.error(`Error while fetching a user record `, err.message);
  }
})

app.get('/api/get_mining_hardware_records', async (req, res) => {
  try {
    res.json(await db.queryMiningHardware());
  } catch (err) {
    console.error(`Error while fetching mining hardware records `, err.message);
  }
})

app.get('/api/get_mining_hash_Rate', async (req, res) => {
  try {
    res.json(await db.queryHashRate());
  } catch (err) {
    console.error(`Error while fetching mining hashrate record `, err.message);
  }
})

app.get('/api/get_mining_statistics', async (req, res) => {
  try {
    res.json(await db.queryMiningStatistics());
  } catch (err) {
    console.error(`Error while fetching mining statistic records `, err.message);
  }
})

app.get('/api/get_bitcoin_price', async (req, res) => {
  try {
    request("https://blockchain.info/q/24hrprice", function(error, response, body) {
      res.json(body)
  });
  } catch (err) {
    console.error(`Error while fetching mining hardware records `, err.message);
  }
})

app.post('/api/create_mining_hardware', async function(req, res, next) {
  try { 
    res.json(await db.createMiningHardware(req.body));
  } catch (err) {
    console.error(`Error while creating a mining hardware record `, err.message);
    next(err);
  }
});

app.put('/api/update_mining_hardware', async function(req, res, next) {
  try {
    res.json(await db.updateMiningHardware(req.body));
  } catch (err) {
    console.error(`Error while updating a mining hardware record `, err.message);
    next(err);
  }
});

app.delete('/api/delete_mining_hardware', async function(req, res, next) {
  try {
    res.json(await db.removeMiningHardware(req.body));
  } catch (err) {
    console.error(`Error while deleting a mining hardware record `, err.message);
    next(err);
  }
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`)
})

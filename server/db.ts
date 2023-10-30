const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "BitcoinMiningFacilityManagement",
  password: "postgres",
  port: 5432,
  host: "localhost",
});

async function queryMiningHardware() {
    const {rows} = await pool.query(`SELECT id, name, location, "hashRate"
    FROM public."MiningHardware";`, []);
    return rows;
}

async function queryHashRate() {
  const mining_id = 1
  const {rows} = await pool.query(`SELECT id, name, location, "hashRate"
  FROM public."MiningHardware" WHERE id = $1 RETURNING *;`, [mining_id]);
  console.log(rows)
  return rows;
}

async function readUser(user) {
  const {rows} = await pool.query(`SELECT name, email, password
  FROM public."User" WHERE email = $1 RETURNING *;`, [user.email]);
  return rows;
}

async function registerUser(user) {
  const result = await pool.query(`INSERT INTO public."User" (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password]);
  return result
}

async function createMiningHardware(miningHardware) {
  const result = await pool.query(`INSERT INTO public."MiningHardware" (id, name, location, "hashRate") VALUES ($1, $2, $3, $4) RETURNING *`, [miningHardware.id, miningHardware.name,miningHardware.location, miningHardware.hashRate]);
  return result
}

async function updateMiningHardware(miningHardware) {
   const response = await pool.query(`UPDATE public."MiningHardware" SET name = $2, location = $3, "hashRate" = $4 WHERE id = $1  RETURNING *`,[miningHardware.id, miningHardware.name,miningHardware.location, miningHardware.hashRate]);
  return response
}

async function removeMiningHardware(data) {
  const response = await pool.query(`DELETE FROM public."MiningHardware" WHERE id = $1 RETURNING *`, [data.id])
  return response
}

async function queryMiningStatistics() {
  const {rows} = await pool.query(`SELECT "totalHashRate", "activeMiners", "miningRevenue"
  FROM public."MiningStatistics";`, []);
  return rows;
}

module.exports = { pool, queryMiningHardware, queryMiningStatistics, queryHashRate, readUser, registerUser, createMiningHardware, updateMiningHardware, removeMiningHardware};
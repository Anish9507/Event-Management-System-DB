const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3');
const DB_CLIENT = process.env.DB_CLIENT || 'sqlite3';
let sqliteDb;
let mysqlPool;
async function init() {
  if (DB_CLIENT === 'mysql' || DB_CLIENT === 'mysql2') {
    mysqlPool = await mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'eventsdb',
      waitForConnections: true,
      connectionLimit: 10,
    });
    await query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    await query(`CREATE TABLE IF NOT EXISTS events (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, name VARCHAR(150) NOT NULL, date VARCHAR(20) NOT NULL, time VARCHAR(20) NOT NULL, venue VARCHAR(200) NOT NULL, organizer VARCHAR(150) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`);
  } else {
    const dbDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
    const dbPath = path.join(dbDir, 'events.sqlite');
    sqliteDb = new sqlite3.Database(dbPath);
    await run(`PRAGMA foreign_keys = ON`);
    await run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, name TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, venue TEXT NOT NULL, organizer TEXT NOT NULL, description TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`);
  }
}
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDb.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDb.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
}
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDb.all(sql, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}
async function query(sql, params = []) {
  if (mysqlPool) {
    const [rows] = await mysqlPool.query(sql, params);
    return rows;
  }
  if (/^\s*select/i.test(sql)) return await all(sql, params);
  if (/^\s*insert|update|delete|create|pragma/i.test(sql)) return await run(sql, params);
  return await run(sql, params);
}
async function one(sql, params = []) {
  if (mysqlPool) {
    const [rows] = await mysqlPool.query(sql, params);
    return rows[0] || null;
  }
  return await get(sql, params);
}
init();
module.exports = { query, one };

const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.NAME,
  port: config.DB.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // 🔐 CRITICAL FOR RAILWAY EXTERNAL DEPLOYS
  ssl: {
    rejectUnauthorized: false,
  },
  
  // 🛠️ ADVANCED POOL MANAGEMENT FOR RENDER -> RAILWAY
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // Sends keep-alive packets every 10 seconds
  maxIdle: 10, // Max idle connections allowed in the pool
  idleTimeout: 60000, // Idle connections are kept active for 60 seconds before closing safely
});

// Test the connection immediately on startup
pool.getConnection()
  .then(conn => {
    console.log('╚════════════════════════════════════════╝');
    console.log('✅ MySQL Production Database Connected Successfully');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Critical MySQL Pool Error:', err.message);
  });

module.exports = pool;

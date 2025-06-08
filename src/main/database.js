const { Pool } = require('pg');
const mysql = require('mysql2/promise');
const ElectronStore = require('electron-store').default;

const store = new ElectronStore();
let pool;

module.exports = {
  initialize(config) {
    if (config.dbType === 'postgresql') {
      pool = new Pool({
        user: config.username,
        host: config.host,
        database: config.database,
        password: config.password,
        port: config.port,
      });
    }
    // MySQL não usa pool da mesma forma, então armazenamos a configuração
    store.set('dbConfig', config);
  },

  async testConnection(config) {
    try {
      if (config.dbType === 'postgresql') {
        const tempPool = new Pool({
          user: config.username,
          host: config.host,
          database: config.database,
          password: config.password,
          port: config.port,
        });
        await tempPool.query('SELECT 1');
        await tempPool.end();
        return true;
      } else if (config.dbType === 'mysql') {
        const connection = await mysql.createConnection({
          host: config.host,
          user: config.username,
          password: config.password,
          database: config.database,
          port: config.port,
        });
        await connection.end();
        return true;
      }
      throw new Error('Database type not supported');
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  },

  async query(sql, params) {
    const config = store.get('dbConfig');
    if (!config) throw new Error('Configuração de banco de dados não encontrada');

    if (config.dbType === 'postgresql') {
      if (!pool) throw new Error('Pool PostgreSQL não inicializado');
      return pool.query(sql, params);
    } else if (config.dbType === 'mysql') {
      const connection = await mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database,
        port: config.port,
      });
      try {
        const [rows] = await connection.execute(sql, params);
        return { rows };
      } finally {
        await connection.end();
      }
    }
    throw new Error('Tipo de banco de dados não suportado');
  }
};
const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js').db;


const seq = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
    host:dbConfig.host,
    port:dbConfig.port||'3306',
    dislect:'mysql',
    timezone: '+08:00'

    }
)

module.exports.seq = seq;
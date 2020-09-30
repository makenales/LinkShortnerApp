const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.links = require("./link.model.js")(sequelize, Sequelize);
db.hits = require("./hit.model.js")(sequelize, Sequelize);

db.links.hasMany(db.hits, {
    foreignKey: "linkId",
    as: "hits"
});

module.exports = db;
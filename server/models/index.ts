'use strict';
require("dotenv").config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');



let config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres'
}


let sequelize = new Sequelize(config.database, config.username, config.password, config);
const db: any = {};
const basename = path.basename(__filename);


fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (  ( file.slice(-3) === '.ts'  ) || ( file.slice(-3) === '.js'  )  ); // || ( file.slice(-3) === '.js'  ) 
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default  db;
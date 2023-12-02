"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Option 1: Passing a connection URI
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './development.db', // SQLite file will be created in the project directory
});
exports.default = sequelize;

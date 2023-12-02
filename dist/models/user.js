"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// models/User.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const notes_1 = __importDefault(require("./notes"));
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID, // Set the data type to UUID
        defaultValue: () => uuidv4(), // Generate a UUID for new records
        primaryKey: true,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'User',
});
console.log(User == config_1.default.models.User);
User.hasMany(notes_1.default, { foreignKey: 'userId' });
notes_1.default.belongsTo(User);
exports.default = User;

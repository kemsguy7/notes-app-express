"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const user_1 = __importDefault(require("./user"));
const { v4: uuidv4 } = require('uuid');
class Notes extends sequelize_1.Model {
}
class Note extends sequelize_1.Model {
}
Notes.init({
    id: {
        type: sequelize_1.DataTypes.UUID, // Set the data type to UUID
        defaultValue: () => uuidv4(), // Generate a UUID for new records
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    duedate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID, // Assuming userId is of type UUID
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id', // Name of the primary key in the User model
        },
    },
}, {
    sequelize: config_1.default,
    modelName: 'Notes',
});
exports.default = Notes;

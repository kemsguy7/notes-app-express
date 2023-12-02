// models/User.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "./config";
import Notes from "./notes";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

// const sequelize = new Sequelize('sqlite::memory:');

export interface IUser {
  fullname: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  password: string;
  id?: UUID;
}

class User extends Model<IUser> {}

User.init(
  {
    id: {
      type: DataTypes.UUID, // Set the data type to UUID
      defaultValue: () => uuidv4(), // Generate a UUID for new records
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Notes, { foreignKey: "userId" });
Notes.belongsTo(User);

export default User;

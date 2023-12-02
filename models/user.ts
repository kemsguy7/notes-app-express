// models/User.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './config';
import { HasManyCreateAssociationMixin } from 'sequelize';
import Notes from './notes';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');



// const sequelize = new Sequelize('sqlite::memory:');

interface IUser{

  fullname: string | undefined;
  email: string;
  gender: string;
   phone: string | undefined;
   address: string;
  password: string; // Add password field
   id: string;

}
export class User extends Model<IUser> {}

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
    modelName: 'User',
  }
);



  console.log(User == sequelize.models.User);  
  User.hasMany(Notes, { foreignKey: 'userId'});
  Notes.belongsTo(User);

 

  export default User;

 
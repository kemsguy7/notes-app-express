// models/User.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './config';
import User from './user'
const { v4: uuidv4 } = require('uuid');

class Notes extends Model {
    
  }
  

  interface INotes{

    title: string;
    description: string;
    duedate: string | number;
    status: string | undefined;
  
  }


  class Note extends Model<INotes> {}


  Notes.init(

    {
      id: {
        type: DataTypes.UUID, // Set the data type to UUID
        defaultValue: () => uuidv4(), // Generate a UUID for new records
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duedate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID, // Assuming userId is of type UUID
        allowNull: false,
        references: {
          model: User,
          key: 'id', // Name of the primary key in the User model
        },
      },
    },
    {
      sequelize,
      modelName: 'Notes',
    }
   
  );
 
  
  export default Notes;

 
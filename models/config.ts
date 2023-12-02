
import { Sequelize } from 'sequelize';

// Option 1: Passing a connection URI
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './development.db', // SQLite file will be created in the project directory
  });

  
export default sequelize;


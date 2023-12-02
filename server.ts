import dotenv from "dotenv";

import sequelize from './models/config';
sequelize.sync().then(()=>console.log('DB is ready'))

dotenv.config({path:"./.env"});

import app from "./app";

const port = process.env.PORT || 4000;
app.listen(port, () => {console.log(`The server is running on port ${port}`)});


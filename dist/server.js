"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./models/config"));
config_1.default.sync().then(() => console.log('DB is ready'));
dotenv_1.default.config({ path: "./.env" });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 4000;
app_1.default.listen(port, () => { console.log(`The server is running on port ${port}`); });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = require("../config");
const connection = mysql_1.default.createConnection({
    host: config_1.databaseConnection.host,
    user: config_1.databaseConnection.user,
    password: config_1.databaseConnection.password,
    port: config_1.databaseConnection.port,
    database: config_1.databaseConnection.database,
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log("connected");
});
exports.default = connection;
//# sourceMappingURL=DBConnect.js.map
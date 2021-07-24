import mysql from "mysql";
import { databaseConnection } from "../config";

const connection = mysql.createConnection({
  host: databaseConnection.host,
  user: databaseConnection.user,
  password: databaseConnection.password,
  port: databaseConnection.port,
  database: databaseConnection.database,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

export default connection;

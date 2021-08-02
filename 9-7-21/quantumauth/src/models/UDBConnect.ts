import mysql from "mysql";
import { databaseConnection } from "../config";

const uconnection = mysql.createConnection({
  host: databaseConnection.host,
  user: databaseConnection.user,
  password: databaseConnection.password,
  port: databaseConnection.port,
  database: "quser",
});

uconnection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

export default uconnection;

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
const app = express();
app.use(express.json());
app.use(cors());
app.use(logger("combined"));

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});
app.listen(3000, () => {
  console.log("Running on port 3000");
});

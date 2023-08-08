//3rd-party package
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { DataSource } = require("typeorm");

//custom package
const app = express();

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
const PORT = process.env.PORT;

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.listen(PORT, async () => {
  console.log(`Listening to request on port: ${PORT}`);
  await appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });
});

//회원가입기능
app.post("/register", async (req, res) => {
  const { phone_number_or_email, account, name, password } = req.body;
  console.log(phone_number_or_email, account, name, password);
  await appDataSource.query(
    `insert into users (phone_number_or_email, account, name, password) values (?, ?, ?, ?);`,
    [phone_number_or_email, account, name, password]
  );
  res.status(201).json({ message: "userCreated!" });
});

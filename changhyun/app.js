require("dotenv").config();

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const { DataSource } = require('typeorm');
const PORT = process.env.PORT
const app = express();


const appDataSource = new DataSource({
 type: process.env.DB_CONNECTION,
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 username: process.env.DB_USERNAME,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DATABASE
})



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));


app.get("/ping", (req, res, next) => {
    res.json({ message : "pong"});
});

app.post('/users', async (req, res) => {
	const { user_id, user_name, user_password, user_age, user_email} = req.body
    
	await appDataSource.query(
		`INSERT INTO users(
			user_id,
			user_name,
			user_password,
      user_age,
      user_email
		) VALUES (?, ?, ?, ?, ?);
		`,
		[ user_id, user_name, user_password, user_age, user_email ]
	); 
     res.status(201).json({ message : "successfully created" });
	})


app.listen(PORT, async () => {
  await appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((error) => {
      console.error('Error during Data Source initialization', error);
    });

  console.log(`Listening to request on port: ${PORT}`);
});


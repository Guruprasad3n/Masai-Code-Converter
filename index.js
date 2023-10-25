const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000 ;

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to Home Page..!");
});

app.listen(PORT, (req, res) => {
  console.log(`Server started in http://localhost:${PORT}`);
});

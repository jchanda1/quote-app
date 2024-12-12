require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const weather = require("./quotes");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.json({ Success: "hello worlds" }));

app.use("/quotes", weather);

app.listen(port, console.log(`App listening on port ${port}`));

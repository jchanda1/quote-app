require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const port = 3000;

const weather = require("./quotes");
const { useCallback } = require("react");

app.use(express.json());

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("you are not permitted to view this!"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const limiter = rateLimit({ windowMs: 1000, max: 1 });
app.use(limiter);

app.get("/", (req, res) => res.json({ Success: "hello worlds" }));

app.use("/quotes", weather);

app.listen(port, console.log(`App listening on port ${port}`));

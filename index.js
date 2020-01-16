require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./src/config");
const connect = require("./src/utils/db");
const { json, urlencoded } = require("body-parser");

const server = {};

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger("dev"));

server.init = async function() {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Magic happening on http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

server.init();

module.exports = server;

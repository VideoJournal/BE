require("dotenv").config();
const mongoose = require("mongoose");
const options = require("../config");

const connect = (opts = {}) => {
  return mongoose.connect(process.env.DB_URL, {
    ...opts,
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

module.exports = connect;

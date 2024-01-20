const express = require('express');
const api = express.Router();
const authRouter = require("./auth/auth.router")

/* GET users listing. */
api.get('/', function (req, res, next) {
  res.send('v1 Api test');
});
api.use("/auth", authRouter)

module.exports = api;

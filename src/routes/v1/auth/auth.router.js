const debug = require('debug')('express-project:auth.router');
const express = require('express');
const authRouter = express.Router();

const { httpSignIn, httpSignUp } = require('./auth.controller');

authRouter.post("/signin", httpSignIn);
authRouter.post("/signup", httpSignUp);

module.exports = authRouter
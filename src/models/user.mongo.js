const debug = require("debug")("express-project:models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const user = { _id: this._id, name: this.name }
    const token = jwt.sign(
        user,
        process.env.JWT_PRIVATE_KEY,
    );
    return token;
};

module.exports = mongoose.model("user", userSchema);

const debug = require("debug")("pay-api:model/user");

const User = require("./user.mongo");

const findUser = async (filters, fields) => {
    return await User.findOne(filters, fields ? fields : { _id: 0, salt: 0, password: 0, __v: 0, createdAt: 0, updatedAt: 0 });
};

const createNewUser = async (user) => {
    return await User.create(user);
}

module.exports = { findUser, createNewUser };

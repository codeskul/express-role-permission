const debug = require("debug")("pay-api:controller/auth");
const bcrypt = require("bcrypt");

const { findUser, createNewUser } = require("../../../models/user.model");


const httpSignIn = async (req, res) => {
    const { username, password } = req.body;

    const user = await findUser({ name: username }, { _id: 1, name: 1, password: 1 })

    if (user === null) {
        return res.status(400).json({
            msg: "User not found."
        });
    } else {
        const validatePassword = await bcrypt.compare(password, user.password);
        if (validatePassword) {
            const token = user.generateAuthToken();
            req.session.uname = username

            return res.status(200)
                .cookie('token', token, { httpOnly: true })
                // .header("x-auth-token", token)
                .json({
                    msg: "User Sign In",
                    token: token,
                    name: user.name,
                })
        }
        else {
            return res.status(400).json({
                msg: "Wrong Password"
            });
        }
    }
};

const httpSignUp = async (req, res) => {
    const user = req.body;

    const hashSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, hashSalt)

    const newUser = {
        name: user.name,
        password: hashPassword,
        salt: hashSalt
    }

    const createdUser = await createNewUser(newUser);

    return res.status(201).json(createdUser);
};

module.exports = { httpSignIn, httpSignUp };

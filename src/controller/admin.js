const { } = require("../model/admin");

const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');

const adminController = {
    register: async (req, res) => {
        try {
            const { email, password, nama } = req.body;
            const { rowCount } = await findEmail(email);
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            const id = uuidv4();

            if (rowCount) {
                return res.json({
                    Message: "Email is already exist",
                });
            }

            let data = {
                id,
                email,
                password: passwordHash,
                nama,
            };
            createAdmin(data)
                .then((result) =>
                    commonHelper.response(res, result.rows, 201, "Register success")
                )
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, error.detail);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const { rows: [user], } = await findEmail(email);
            if (!user) {
                return res.status(403).json({
                    Message: "Email is invalid"
                })
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return res.status(403).json({
                    Message: "Password is invalid"
                })
            }
            delete user.password;
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
            console.log(payload);
            user.token = authHelper.generateToken(payload);
            user.refreshToken = authHelper.generateRefreshToken(payload);

            commonHelper.response(res, user, 201, "login is successful");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, error.detail);
        }
    }
}
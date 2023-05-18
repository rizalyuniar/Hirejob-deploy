const {
  findEmail,
  createUser,
  updateUser,
  findId,
  updaterecruiter,
  // createUsers,
  // createUsersVerification,
  // checkUsersVerification,
  // deleteUsersVerification,
  // updateAccountVerification,
  // findId,
} = require("../model/users");

const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary');

const userController = {
  register: async (req, res) => {
    try {
      const { email, password, name, phone } = req.body;
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
        name,
        phone,
        role: "worker",
        photo: "https://res.cloudinary.com/dwkpy9gcu/image/upload/v1678218233/ybsmzzsv0antctyxa7y9.png"
      };
      createUser(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Register success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return res.status(403).json({
          Message: "Email is invalid",
        });
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(403).json({
          Message: "Password is invalid",
        });
      }
      delete user.password;
      const payload = {
        email: user.email,
        role: user.role,
        id: user.id,
      };
      console.log(payload);
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);

      commonHelper.response(res, user, 201, "login is successful");
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const role = req.payload.role;
    if (role == "recruiter") {
      return res.json({
        Message: "unauthorized",
      });
    }
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    if (role == "worker") {
      delete user.company;
      delete user.position;
    }
    commonHelper.response(res, user, 200);
  },

  // recrutiter
  registerRecruiter: async (req, res) => {
    try {
      const { email, password, name, phone, company, position } = req.body;
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
        name,
        phone,
        company,
        position,
        role: "recruiter",
      };
      createUser(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Register success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  profileRecruiter: async (req, res, next) => {
    const email = req.payload.email;
    const role = req.payload.role;
    if (role == "worker") {
      return res.json({
        Message: "unauthorized",
      });
    }
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  updateUserWorker: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, phone, description } = req.body;
      let result;
      let photo;
      try {
        result = await cloudinary.uploader.upload(req.file.path);
        photo = result.secure_url;
      } catch (error) {
        photo ='https://res.cloudinary.com/dwkpy9gcu/image/upload/v1678218233/ybsmzzsv0antctyxa7y9.png'
      }
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
      }
      const data = { id, name, phone, description, photo };
      console.log(data);
      updateUser(data)
        .then((result) => {
          console.log(result);
          commonHelper.response(res, result.rows, 200, "Worker updated");
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateUserRecruiter: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const { name, phone, description, photo, company, position } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
      }
      const data = { id, name, phone, description, photo, company, position };
      console.log(data);
      updaterecruiter(data)
        .then((result) => {
          console.log(result);
          commonHelper.response(res, result.rows, 200, "Worker updated");
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;

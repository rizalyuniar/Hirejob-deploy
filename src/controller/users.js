const {
  findEmail,
  findId,
  createUser,
  updateUser,
  deleteUser,
  selectUserEmail,
  selectUser,
  selectAllUser,
  countData,
} = require("../model/users");

const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken')
const { sendMail } = require("../config/mail");
const googleDrive = require('../config/googleDrive');

const userController = {
  registerVerif: async (req, res) => {
    try {
      const { email, password, nama } = req.body;
      const { rowCount } = await findEmail(email)
      if (rowCount) {
        return res.json({
          Message: "Email is already exist",
        })
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4();
      const payload = {
        nama,
        email: req.body.email,
        password: passwordHash,
        id: id,
      };
      console.log(payload);
      const token = authHelper.generateToken(payload);
      sendMail(token, req.body.email);
      console.log(token);
      commonHelper.response(res, null, 200, "Check your email");
    } catch (error) {
      commonHelper.response(res, null, 500, error.detail);
    }
  },
  verifUser: async (req, res) => {
    const token = req.params.id;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);
    } catch (error) {
        if (error && error.name === "JsonWebTokenError") {
            return commonHelper.response(res, null, 401, "Token invalid");
        } else if (error && error.name === "TokenExpiredError") {
            return commonHelper.response(res, null, 403, "Token expired");
        } else {
            return commonHelper.response(res, null, 401, "Token not active");
        }
    }
    
    try {
      const result = await selectUserEmail(decoded.email);
      if (result.rowCount > 0) {
        return commonHelper.response(res, null, 400, "Email already verified");
      }
    } catch (err) {
      console.log(err);
      return commonHelper.response(res, null, 500, err.detail);
    }
    createUser(decoded)
      .then((result) => {
        // Display the result
        return commonHelper.response(res, result.rows, 201, "User created");
      })
      .catch((err) => {
        console.log(err);
        return commonHelper.response(res, null, 400, err.detail);
      });
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { rows: [user], } = await findEmail(email);
      if (!user) {
        return res.status(403).json({
          message : "Email is invalid"
        })
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(403).json({
          message : "Password is invalid"
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
      return commonHelper.response(res, null, 400, err.detail);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    }
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res,result,200);
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200, "get data success");
  },
  getAllUser: async (req, res) => {
    try {
      let sortBY = req.query.sortBY || "id";
      let search = req.query.search || "";
      let sort = req.query.sort || 'ASC';
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await selectAllUser(search,sortBY,sort,limit,offset);
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, "get data success",pagination);
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed Get Users");
    }
  },
  getDetailUser: async (req, res) => {
    const id = req.params.id;
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({
        Message : "data not found"
      })
    }
    selectUser(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data by id success");
      })
      .catch((err) => res.send(err));
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.payload.id;
      const { email,password,nama,nip,pangkat,jabatan,instansi,npwp,rekening,bank,wi,total_jam } = req.body;
      let photo;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found"
        });
      }
      
      let newData = {};
      if (email) {
        newData.email = email;
      }
      const salt = bcrypt.genSaltSync(10);
      if (password) {
        newData.password = bcrypt.hashSync(password, salt);
      }
      if (nama) {
        newData.nama = nama;
      }
      if (nip) {
        newData.nip = nip;
      }
      if (jabatan) {
        newData.jabatan = jabatan;
      }
      if (pangkat) {
        newData.pangkat = pangkat;
      }
      if (instansi) {
        newData.instansi = instansi;
      }
      if (npwp) {
        newData.npwp = npwp;
      }
      if (rekening) {
        newData.rekening = rekening;
      }
      if (bank) {
        newData.bank = bank;
      }
      if (wi) {
        newData.wi = wi;
      }
      if (total_jam) {
        newData.total_jam = total_jam;
      }
      // photo
      const result = await selectUser(userId);
      if (req.file && result.rows[0].photo != "user.png") {
        const oldPhoto = result.rows[0].photo;
        const oldPhotoId = oldPhoto.split("=")[1];
        const updateResult = await googleDrive.updateImage(req.file, oldPhotoId)
        const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
        photo = parentPath.concat(updateResult.id)
      } else if (req.file && result.rows[0].photo == "user.png") {
        const uploadResult = await googleDrive.uploadImage(req.file)
        const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
        photo = parentPath.concat(uploadResult.id)
      } else {
        photo = result.rows[0].photo;
      }

      const oldData = await selectUser(id);
      const data = {
        id,
        email: newData.email || oldData.rows[0].email,
        password: newData.password || oldData.rows[0].password,
        nama: newData.nama || oldData.rows[0].nama,
        nip: newData.nip || oldData.rows[0].nip,
        pangkat: newData.pangkat || oldData.rows[0].pangkat,
        jabatan: newData.jabatan || oldData.rows[0].jabatan,
        instansi: newData.instansi || oldData.rows[0].instansi,
        npwp: newData.npwp || oldData.rows[0].npwp,
        rekening: newData.rekening || oldData.rows[0].rekening,
        bank: newData.bank || oldData.rows[0].bank,
        wi: newData.wi || oldData.rows[0].wi,
        total_jam: newData.total_jam || oldData.rows[0].total_jam,
        photo: photo || oldData.rows[0].photo,
      };
      console.log(data);

      updateUser(data)
        .then((result) => 
          commonHelper.response(res, result.rows, 200, "User updated")
        )
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed Updated Users");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteUser(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "User deleted")
        )
    } catch (error) {
      console.log(error);
      commonHelper.response(res, null, 500, "Failed Deleted Users");
    }
  },
};

module.exports = userController;

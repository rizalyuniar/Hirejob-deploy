const {
    selectAllMenu,
    selectMenu,
    insertMenu,
    updateMenu,
    deleteMenu,
    countData,
    findId,
} = require("../model/menuPelatihan");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const googleDrive = require('../config/googleDrive');

const menuPelatihanController = {
    getAllMenu: async (req, res) => {
        try {
            let sortBY = req.query.sortBY || "nama";
            let search = req.query.search || "";
            let sort = req.query.sort || 'ASC';
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await selectAllMenu(search, sortBY, sort, limit, offset);
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
            commonHelper.response(res, result.rows, 200, "get data success", pagination);
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Get Menu Pelatihan");
        }
    },
    getDetailMenu: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                })
            }
            selectMenu(id)
                .then((result) => {
                    commonHelper.response(res, result.rows, 200, "get data by id success");
                })
        } catch (error) {
            commonHelper.response(res, null, 500, "Failed Get Menu Pelatihan by id");
        }
    },
    createMenu: async (req, res) => {
        try {
            const id = uuidv4();
            const { nama } = req.body;

            // gcp
            let photo;
            try {
                const uploadResult = await googleDrive.uploadImage(req.file)
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                photo = parentPath.concat(uploadResult.id)
            } catch (error) {
                photo = 'menu.png'
            }

            const data = { id, nama, photo }
            console.log(data);
            insertMenu(data)
                .then((result) => {
                    commonHelper.response(res, result.rows, 201, "Menu Pelatihan created")
                })
        } catch (error) {
            console.log(error)
            commonHelper.response(res, null, 500, "Failed Created Menu Pelatihan");
        }
    },
    updateMenu: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id)
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                });
            }

            const { nama } = req.body;
            let photo;

            let newData = {};
            if (nama) {
                newData.nama = nama;
            }
            const result = await selectMenu(id);
            if (req.file && result.rows[0].photo != "menu.png") {
                const oldPhoto = result.rows[0].photo;
                const oldPhotoId = oldPhoto.split("=")[1];
                const updateResult = await googleDrive.updateImage(req.file, oldPhotoId)
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                photo = parentPath.concat(updateResult.id)
            } else if (req.file && result.rows[0].photo == "menu.png") {
                const uploadResult = await googleDrive.uploadImage(req.file)
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                photo = parentPath.concat(uploadResult.id)
            } else {
                photo = result.rows[0].photo;
            }

            const oldData = await selectMenu(id);
            const data = {
                id,
                nama: newData.nama || oldData.rows[0].nama,
                photo: photo || oldData.rows[0].photo,
            };
            console.log(data);
            updateMenu(data)
                .then((result) => {
                    commonHelper.response(res, result.rows, 200, "Menu Pelatihan updated")
                })
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Updated Menu Pelatihan");
        }
    },
    deleteMenu: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deleteMenu(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Menu Pelatihan deleted")
                )
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Deleted Menu Pelatihan");
        }
    },
};

module.exports = menuPelatihanController;
const {
    selectAllPortofolio,
    countData,
    selectPortofolio,
    findId,
    insertPortofolio,
    updatePortofolio,
    deletePortofolio,
} = require("../model/portofolios");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require('cloudinary');

const portofolioController = {
    getAllPortofolio: async (req, res) => {
        try {
            let sortBY = req.query.sortBY || "id";
            let search = req.query.search || "";
            let sort = req.query.sort || "ASC";
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await selectAllPortofolio(
                search,
                sortBY,
                sort,
                limit,
                offset
            );
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
            commonHelper.response(
                res,
                result.rows,
                200,
                "get data success",
                pagination
            );
        } catch (error) {
            console.log(error);
        }
    },
    getDetailPortofolio: async (req, res) => {
        const id = req.params.id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
            return res.json({
                Message: "data not found",
            });
        }
        selectPortofolio(id)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, "get data by id success");
            })
            .catch((err) => res.send(err));
    },
    createPortofolio: async (req, res) => {
        const { name, repository, type } = req.body;
        const id = uuidv4();
        const id_user = req.payload.id;
        console.log(id_user);
        let result;
        let photo;
        try {
        result = await cloudinary.uploader.upload(req.file.path)
        photo = result.secure_url;
        } catch (error) {
            photo='https://res.cloudinary.com/dwkpy9gcu/image/upload/v1678218233/ybsmzzsv0antctyxa7y9.png'
        }
        const data = { id, name, repository, type, photo, created_at: "2023-03-06" };
        data.id_user = id_user;
        insertPortofolio(data)
            .then((result) => {
                commonHelper.response(res, result.rows, 201, "Portofolio created");
            })
            .catch((err) => res.status(500).json(err));
    },
    updatePortofolio: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, repository, type } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path)
            const photo = result.secure_url;
            const id_user = req.payload.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                });
            }
            const data = { id, name, repository, type, photo, created_at: "2023-03-06" };
            data.id_user = id_user;
            updatePortofolio(data)
                .then((result) => {
                    console.log(result);
                    commonHelper.response(res, result.rows, 200, "Portofolio updated")
                })
                .catch((err) => res.status(500).json(err));
        } catch (error) {
            console.log(error);
        }
    },
    deletePortofolio: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deletePortofolio(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Product deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = portofolioController;

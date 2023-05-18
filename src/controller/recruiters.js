const {
    selectAllRecruiter,
    countData,
    selectRecruiter,
    findId,
    insertRecruiter,
    updateRecruiter,
    deleteRecruiter
} = require("../model/recruiters");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const recruiterController = {
    getAllRecruiter: async (req, res) => {
        try {
            let sortBY = req.query.sortBY || "id";
            let search = req.query.search || "";
            let sort = req.query.sort || 'ASC';
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await selectAllRecruiter(search, sortBY, sort, limit, offset);
            const {
                rows: [count]
            } = await countData();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };
            commonHelper.response(res, result.rows, 200, "get data succes", pagination);
        } catch (error) {
            console.log(error);
        }
    },
    getDetailRecruiter: async (req, res) => {
        const id = req.params.id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
            return res.json({
                Message: "data not found"
            })
        }
        selectRecruiter(id)
            .then((result) => {
                commonHelper.response(res, result.rows, 200, "get data by id success");
            })
            .catch((err) => res.send(err));
    },
    createRecruiter: async (req, res) => {
        const { division, address } = req.body;
        const id = uuidv4();
        const id_user = req.payload.id;
        const data = { id, division, address };
        data.id_user = id_user;
        insertRecruiter(data)
            .then((result) => {
                commonHelper.response(res, result.rows, 201, "Recruiter created");
            })
            .catch((err) => res.status(500).json(err));
    },
    updateRecruiter: async (req, res) => {
        try {
            const id = req.params.id;
            const { division, address } = req.body;
            const id_user = req.payload.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                });
            }
            const data = { id, division, address };
            data.id_user = id_user;
            console.log(data);
            updateRecruiter(data)
                .then((result) => {
                    console.log(result);
                    commonHelper.response(res, result.rows, 200, "Recruiter updated")
                })
                .catch((err) => res.status(500).json(err));
        } catch (error) {
            console.log(error);
        }
    },
    deleteRecruiter: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deleteRecruiter(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Recruiter deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = recruiterController;
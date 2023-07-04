const {
    selectAllPelatihan,
    selectPelatihan,
    insertPelatihan,
    updatePelatihan,
    deletePelatihan,
    countData,
    findId,
    selectMenuPelatihan,
    selectById,
    findIdUser
} = require("../model/pelatihan");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment-timezone');

const pelatihanController = {
    getAllPelatihan: async (req, res) => {
        try {
            let sortBY = req.query.sortBY || "id";
            let search = req.query.search || "";
            let sort = req.query.sort || 'ASC';
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await selectAllPelatihan(search, sortBY, sort, limit, offset);
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
            commonHelper.response(res, null, 500, "Failed Get Pelatihan");
        }
    },
    getPelatihan: async (req, res) => {
        try {
            const id_user = req.payload.id;
            const { rowCount } = await findIdUser(id_user);
            console.log(rowCount);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }
            const result = await selectById(id_user);
            commonHelper.response(res, result.rows, 200, "get data success");        
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Get Data");
        }
    },
    getDetailPelatihan: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }
            selectPelatihan(id)
                .then((result) => {
                    commonHelper.response(res, result.rows, 200, "get data by id success");
                })
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Get Pelatihan by id");
        }
    },
    createPelatihan: async (req, res) => {
        try {
            const id_menu = req.params.id_menu;
            const { materi, durasi, tanggal } = req.body;
            const id = uuidv4();
            const id_user = req.payload.id;
            const created_at = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

            const menu = await selectMenuPelatihan(id_menu);
            console.log(menu.rows[0].nama);
            const data = { id, nama_pelatihan: menu.rows[0].nama, materi, durasi, tanggal };
            data.id_user = id_user;
            data.created_at = created_at;
            console.log(data);
            insertPelatihan(data)
                .then((result) => {
                    commonHelper.response(res, result.rows, 201, "Pelatihan created");
                })
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Created Pelatihan");
        }
    },
    updatePelatihan: async (req, res) => {
        try {
            const id = req.params.id;
            const { nama_pelatihan, materi, durasi, tanggal, created_at } = req.body;
            const id_user = req.payload.id;
            const updated_at = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found",
                });
            }

            let newData = {};
            if (nama_pelatihan) {
                newData.nama_pelatihan = nama_pelatihan;
            }
            if (materi) {
                newData.materi = materi;
            }
            if (durasi) {
                newData.durasi = durasi;
            }
            if (tanggal) {
                newData.tanggal = tanggal;
            }
            if (created_at) {
                newData.created_at = created_at;
            }

            const oldData = await selectPelatihan(id);
            const data = { 
                id, 
                nama_pelatihan: newData.nama_pelatihan || oldData.rows[0].nama_pelatihan, 
                materi: newData.materi || oldData.rows[0].materi, 
                durasi: newData.durasi || oldData.rows[0].durasi, 
                tanggal: newData.tanggal || oldData.rows[0].tanggal,
                created_at: newData.created_at || oldData.rows[0].created_at,
                updated_at
            };
            data.id_user = id_user;
            console.log(data);
            updatePelatihan(data)
                .then((result) => {
                    console.log(result);
                    commonHelper.response(res, result.rows, 200, "Pelatihan updated");
                })
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed updating Pelatihan");
        }
    },
    deletePelatihan: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deletePelatihan(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Pelatihan deleted")
                )
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed Deleted Pelatihan");
        }
    },
};
module.exports = pelatihanController;
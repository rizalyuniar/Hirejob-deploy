const {
  countData,
  findId,
  selectAllWorker,
  selectWorker,
  insertWorker,
  updateWorker,
  deleteWorker,
  selectValueWorker,
  selectValueDetail,
  findIdWorker,
} = require("../model/workers");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const workerController = {
  getAllWorker: async (req, res) => {
    try {
      let sortBY = req.query.sortBY || "id";
      let search = req.query.search || "";
      let sort = req.query.sort || "ASC";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await selectAllWorker(search, sortBY, sort, limit, offset);
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
        "get data succes",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
  getDetailWorker: async (req, res) => {
    const id = req.params.id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({
        Message: "data not found",
      });
    }
    selectWorker(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data by id success");
      })
      .catch((err) => res.send(err));
  },
  createWorker: async (req, res) => {
    const { jobdesk, address, workplace, skills } = req.body;
    const id = uuidv4();
    const id_user = req.payload.id;
    const data = { id, jobdesk, address, workplace, skills };
    data.id_user = id_user;
    insertWorker(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Worker created");
      })
      .catch((err) => res.status(500).json(err));
  },
  updateWorker: async (req, res) => {
    try {
      const id = req.params.id;
      const { jobdesk, address, workplace, skills } = req.body;
      const id_user = req.payload.id;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found",
        });
      }
      const data = { id, jobdesk, address, workplace, skills };
      data.id_user = id_user;
      console.log(data);
      updateWorker(data)
        .then((result) => {
          console.log(result);
          commonHelper.response(res, result.rows, 200, "Worker updated");
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteWorker: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteWorker(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Worker deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  getDetailValue: async (req, res) => {
    let sortBY = req.query.sortBY || "name";
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const result = await selectValueWorker(search, sortBY, sort, limit, offset);

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
  },
  getValueDetail: async (req, res) => {
    const id = req.params.id;
    const id_user = req.params.id;
    console.log(id_user);
    const { rowCount } = await findIdWorker(id_user);
    if (!rowCount) {
      return res.json({
        Message: "data not found",
      });
    }
    selectValueDetail(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data by id success");
      })
      .catch((err) => res.send(err));
  },
};

module.exports = workerController;

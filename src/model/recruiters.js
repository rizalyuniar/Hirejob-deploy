const Pool = require('../config/db');

const selectAllRecruiter = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM recruiters WHERE division LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM recruiters')
}

const selectRecruiter = (id) => {
    return Pool.query(`SELECT * FROM recruiters WHERE id='${id}'`);
}

const findId = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT id FROM recruiters WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const insertRecruiter = (data) => {
    const { id, division, address, id_user } = data;
    return Pool.query(`INSERT INTO recruiters(id,division,address,id_user) VALUES('${id}','${division}','${address}','${id_user}')`);
}

const updateRecruiter = (data) => {
    const { id, division, address, id_user } = data;
    return Pool.query(`UPDATE recruiters SET division='${division}', address='${address}', id_user='${id_user}' WHERE id='${id}'`);
}

const deleteRecruiter = (id) => {
    return Pool.query(`DELETE FROM recruiters WHERE id='${id}'`);
}

module.exports = {
    selectAllRecruiter,
    selectRecruiter,
    insertRecruiter,
    updateRecruiter,
    deleteRecruiter,
    countData,
    findId
}
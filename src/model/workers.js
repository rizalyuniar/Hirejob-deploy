const Pool = require('../config/db');

const selectAllWorker = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM workers WHERE jobdesk LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM workers')
}

const selectWorker = (id) =>{
    return Pool.query(`SELECT * FROM workers WHERE id='${id}'`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT id FROM workers WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const insertWorker = (data) => {
    const { id, jobdesk, address, workplace, skills, id_user } = data;
    return Pool.query(`INSERT INTO workers(id,jobdesk,address,workplace,skills,id_user) VALUES('${id}','${jobdesk}','${address}','${workplace}','${skills}','${id_user}')`);
}

const updateWorker = (data) => {
    const { id, jobdesk, address, workplace, skills, id_user } = data;
    return Pool.query(`UPDATE workers SET jobdesk='${jobdesk}', address='${address}', workplace='${workplace}', skills='${skills}', id_user='${id_user}' WHERE id='${id}'`);
}

const deleteWorker = (id) => {
    return Pool.query(`DELETE FROM workers WHERE id='${id}'`);
}

// get all worker
const selectValueWorker = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`select workers.*, users.name,users.phone,users.description,users.photo from workers left join users on workers.id_user=users.id WHERE jobdesk LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectValueDetail = (id_user) =>{
    return Pool.query(`select workers.*, users.name,users.phone,users.description,users.photo from workers left join users on workers.id_user=users.id where workers.id_user='${id_user}'`);
}

const findIdWorker = (id_user) => {
    return new Promise((resolve, reject) => 
        Pool.query(`SELECT id_user FROM workers WHERE id_user='${id_user}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

module.exports = {
    selectAllWorker,
    selectWorker,
    insertWorker,
    updateWorker,
    deleteWorker,
    countData,
    findId,
    selectValueWorker,
    selectValueDetail,
    findIdWorker
}
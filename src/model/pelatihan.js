const Pool = require('../config/db');

const selectAllPelatihan = (search, sortBY, sort, limit, offset) => {
    return Pool.query(`select pelatihan.*, users.nama from pelatihan left join users on pelatihan.id_user=users.id where nama_pelatihan LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectPelatihan = (id) => {
    return Pool.query(`SELECT * FROM pelatihan WHERE id='${id}'`);
}

const selectById = (id_user) => {
    return Pool.query(`SELECT * FROM pelatihan WHERE id_user='${id_user}'`);
}

const selectMenuPelatihan = (id_menu) => {
    return Pool.query(`SELECT * FROM menu WHERE id='${id_menu}'`);
}

const insertPelatihan = (data) => {
    const { id, id_user, nama_pelatihan, materi, durasi, tanggal, created_at } = data;
    return Pool.query(`INSERT INTO pelatihan(id,id_user,nama_pelatihan,materi,durasi,tanggal,created_at) VALUES('${id}','${id_user}','${nama_pelatihan}','${materi}','${durasi}','${tanggal}','${created_at}')`);
}

const updatePelatihan = (data) => {
    const { id, id_user, nama_pelatihan, materi, durasi, tanggal, created_at, updated_at } = data;
    return Pool.query(`UPDATE pelatihan SET id_user='${id_user}', nama_pelatihan='${nama_pelatihan}', materi='${materi}', durasi='${durasi}', tanggal='${tanggal}', created_at='${created_at}', updated_at='${updated_at}' WHERE id='${id}'`);
}

const deletePelatihan = (id) => {
    return Pool.query(`DELETE FROM pelatihan WHERE id='${id}'`);
}

const countData = () => {
    return Pool.query('SELECT COUNT(*) FROM pelatihan')
}

const findId = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT id FROM pelatihan WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const findIdUser = (id_user) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT id FROM pelatihan WHERE id_user='${id_user}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

// const selectAllData = (search, sortBY, sort, limit, offset) => {
//     return Pool.query(`select workers.*, users.name,users.phone,users.description,users.photo from workers left join users on workers.id_user=users.id WHERE jobdesk LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
// }
// const selectDetailData = (id_user) =>{
//     return Pool.query(`select workers.*, users.name,users.phone,users.description,users.photo from workers left join users on workers.id_user=users.id where workers.id_user='${id_user}'`);
// }
// const findIdPengajar = (id_user) => {
//     return new Promise((resolve, reject) => 
//         Pool.query(`SELECT id_user FROM workers WHERE id_user='${id_user}'`, (error, result) => {
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     )
// }

module.exports = {
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
}
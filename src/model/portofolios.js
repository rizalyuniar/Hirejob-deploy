const Pool = require('../config/db');

const selectAllPortofolio = (search, sortBY, sort, limit, offset) => {
  return Pool.query(`SELECT * FROM portofolios WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectPortofolio = (id) => {
  return Pool.query(`SELECT * FROM portofolios WHERE id='${id}'`);
}

const insertPortofolio = (data) => {
  const { id, name, repository, type, photo, id_user, created_at } = data;
  return Pool.query(`INSERT INTO portofolios(id,name,repository,type,photo,id_user,created_at) VALUES('${id}','${name}','${repository}','${type}','${photo}','${id_user}','${created_at}')`);
}

const updatePortofolio = (data) => {
  const { id, name, repository, type, photo, id_user, created_at } = data;
  return Pool.query(`UPDATE portofolios SET name='${name}', repository='${repository}', type='${type}', photo='${photo}', id_user='${id_user}', created_at='${created_at}' WHERE id='${id}'`);
}

const deletePortofolio = (id) => {
  return Pool.query(`DELETE FROM portofolios WHERE id='${id}'`);
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM portofolios')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM portofolios WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
  selectAllPortofolio,
  selectPortofolio,
  insertPortofolio,
  updatePortofolio,
  deletePortofolio,
  countData,
  findId
}
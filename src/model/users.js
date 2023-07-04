const Pool = require("../config/db");

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE email='${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

const createUser = (data) => {
  const { id, email, password, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id,email,password,nama) VALUES('${id}','${email}','${password}','${nama}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const updateUser = (data) => {
  const { id, email, password, nama, nip, pangkat, jabatan, instansi, npwp, rekening, bank, wi, photo, total_jam } = data;
  return Pool.query(`UPDATE users SET email='${email}', password='${password}', nama='${nama}', nip='${nip}', pangkat='${pangkat}', jabatan='${jabatan}', instansi='${instansi}', npwp='${npwp}', rekening='${rekening}', bank='${bank}', wi='${wi}', photo='${photo}', total_jam='${total_jam}' WHERE id='${id}'`);
}

const deleteUser = (id) => {
  return Pool.query(`DELETE FROM users WHERE id='${id}'`);
}

function selectUserEmail(email) {
  return Pool.query(`SELECT * FROM users WHERE email='${email}'`);
}
const selectUser = (id) =>{
  return Pool.query(`SELECT * FROM users WHERE id='${id}'`);
}
const selectAllUser = (search,sortBY,sort,limit,offset) =>{
  return Pool.query(`SELECT * FROM users WHERE nama LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}
const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM users')
}

module.exports = {
  findEmail,
  findId,
  createUser,
  updateUser,
  deleteUser,
  selectUserEmail,
  selectUser,
  selectAllUser,
  countData,
};

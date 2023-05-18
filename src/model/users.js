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

const createUser = (data) => {
  const { id, email, password, name, phone, company, position, description, photo, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users(id,email,password,name,phone,company,position,description,photo,role) VALUES('${id}','${email}','${password}','${name}','${phone}','${company}','${position}','${description}','${photo}','${role}')`,
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
  const { id, name, phone, description, photo } = data;
  return Pool.query(`UPDATE users SET name='${name}',phone='${phone}',description='${description}',photo='${photo}' WHERE id='${id}'`);
};

const updaterecruiter = (data) => {
  const { id, name, phone, description, photo, company, position } = data;
  return Pool.query(`UPDATE users SET name='${name}',phone='${phone}',description='${description}',photo='${photo}',company='${company}',position='${position}' WHERE id='${id}'`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

// const createUsers = (id, email, passwordHash, verify) => {
//   return Pool.query(
//     `insert into users ( id , email , password , verify ) values ( '${id}' , '${email}' , '${passwordHash}' ,'${verify}') `
//   );
// };

// const createUsersVerification = (users_verification_id, users_id, token) => {
//   return Pool.query(
//     `insert into users_verification ( id , users_id , token ) values ( '${users_verification_id}' , '${users_id}' , '${token}' )`
//   );
// };

// const checkUsersVerification = (queryUsersId, queryToken) => {
//   return Pool.query(
//     `select * from users_verification where users_id='${queryUsersId}' and token = '${queryToken}' `
//   );
// };

// const deleteUsersVerification = (queryUsersId, queryToken) => {
//   return Pool.query(
//     `delete from users_verification  where users_id='${queryUsersId}' and token = '${queryToken}' `
//   );
// };

// const updateAccountVerification = (queryUsersId) => {
//   return Pool.query(
//     `update users set verify='true' where id='${queryUsersId}' `
//   );
// };

module.exports = {
  findEmail,
  createUser,
  updateUser,
  findId,
  updaterecruiter
  //   createUsers,
  //   createUsersVerification,
  //   checkUsersVerification,
  //   deleteUsersVerification,
  //   updateAccountVerification,
  //   findId,
};

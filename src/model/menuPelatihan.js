const Pool = require('../config/db');

const selectAllMenu = (search,sortBY,sort,limit,offset) => {
    return Pool.query(`SELECT * FROM menu WHERE nama LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectMenu = (id) => {
    return Pool.query(`SELECT * FROM menu WHERE id='${id}'`);
}

const insertMenu = (data) => {
    const { id, nama, photo } = data;
    return Pool.query(`INSERT INTO menu(id,nama,photo) VALUES('${id}','${nama}','${photo}')`)
}

const updateMenu = (data) =>{
    const { id, nama, photo } = data;
    return Pool.query(`UPDATE menu SET nama='${nama}', photo='${photo}' WHERE id='${id}'`);
}

const deleteMenu = (id) =>{
    return Pool.query(`DELETE FROM menu WHERE id='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM menu')
}
  
const findId =(id)=>{
    return new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM menu WHERE id='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

module.exports = {
    selectAllMenu,
    selectMenu,
    insertMenu,
    updateMenu,
    deleteMenu,
    countData,
    findId,
}
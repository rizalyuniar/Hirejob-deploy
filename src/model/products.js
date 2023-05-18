const Pool = require('../config/db');

const selectAllProduct = (search,sortBY,sort,limit,offset) =>{
    // return Pool.query(`SELECT * FROM products`);
    return Pool.query(`SELECT * FROM products WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectProduct = (id) =>{
    return Pool.query(`SELECT * FROM products WHERE id='${id}'`);
}

const insertProduct = (data) =>{
    const { id,name,price,color,size,stock,rating,description,photo } = data;
    return Pool.query(`INSERT INTO products(id,name,price,color,size,stock,rating,description,photo) VALUES('${id}','${name}',${price},'${color}','${size}',${stock},'${rating}','${description}','${photo}')`);
}

const updateProduct = (data) =>{
    const { id,name,price,color,size,stock,rating,description,photo } = data;
    return Pool.query(`UPDATE products SET name='${name}', price=${price}, color='${color}', size='${size}', stock=${stock}, rating='${rating}', description='${description}', photo='${photo}' WHERE id='${id}'`);
}

const deleteProduct = (id) =>{
    return Pool.query(`DELETE FROM products WHERE id='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM products')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM products WHERE id='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId
}
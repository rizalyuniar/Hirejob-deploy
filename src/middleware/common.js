const validate =(req, res, next)=>{
    const { name,price,color,size,stock,rating,description } = req.body
    try {
        if (name === '' || price === '' || color === '' || size === '' || stock === '' || rating === '' || description === '') throw new Error ('data harus diisi')
        if (!isNaN(name) || !isNaN(color) || !isNaN(size) || !isNaN(rating) || !isNaN(description)) throw new Error ('input data harus huruf')
    } catch (error) {
        return res.send(`${error}`)
    }
    next()
}

// const myCors = (req,res,next)=>{
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//     response.setHeader('Access-Control-Headers', 'Content-Type');
//   }
module.exports = {validate}
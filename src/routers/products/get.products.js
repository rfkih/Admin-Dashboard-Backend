const router = require("express").Router();
const pool = require("../../config/database");



// get All Product

const getProductRouter =  async (req, res, next) => {

    const connection = await pool.promise().getConnection();
  
      try {  
  
        const sqlGetProducts = `select row_number() over() as rownumber, id, category_id, productName, productDetails, productIMG, isLiquid, price from products where isDeleted = 0 ${req.query.keyword || ''} ${req.query.sort || ''} ${req.query.pages || ''}`
        const sqlCountProducts = `SELECT COUNT(*) AS count FROM products where isDeleted = 0;`
        const sqlGetProductsCategory = `select id, category_id, productName, productDetails, productIMG, isLiquid, price from products where category_id = ? && isDeleted = 0 ${req.query.keyword || ''}${req.query.sort || ''} ${req.query.pages || ''}`
        const sqlCountProductsCategory = `SELECT COUNT(*) AS count FROM products where category_id = ? && isDeleted = 0`
        const category_id = req.query.category
        
        if (category_id) {
          const [result] = await connection.query(sqlGetProductsCategory, category_id);
          const [count] = await connection.query(sqlCountProductsCategory, category_id)  
          connection.release();
          res.status(200).send({result, count});
       } else {
          const [result] = await connection.query(sqlGetProducts);
          const [count] = await connection.query(sqlCountProducts)
          connection.release();
          res.status(200).send({result, count});
       }
  
      } catch (error) {
        connection.release();
        next(error)
      }
    };




    router.get("/", getProductRouter)
 
    module.exports = router;
const router = require("express").Router();
const pool = require("../../config/database");

// get all stocks
const getStocksRouter = async (req, res, next) => {

    const connection = await pool.promise().getConnection()
    
    try {
       
      const sqlGetStocks = `select A.id, A.productName, A.productIMG, A.isLiquid, B.categoryName, C.qtyBoxAvailable, C.qtyBottleAvailable, C.qtyStripsavailable, C.qtyBoxTotal, C.qtyStripsTotal, C.qtyBottleTotal 
      from products A, category B, stocks C 
      where A.category_id = B.id
      and  A.id = C.product_id;`;
      
      const [result] = await connection.query(sqlGetStocks);
      
      
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      connection.release();
      next(error)
    }
  };


  router.get("/", getStocksRouter)
 
    module.exports = router;


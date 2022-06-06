const router = require("express").Router();
const pool = require("../../config/database");






//Get Completed transaction
const getSumCompletedTransactionRouter = async (req, res, next) => {

    const connection = await pool.promise().getConnection();
  
    try {
  
      const sqlGetTotalPrice = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete"`;
  
      const sqlGetTotalPriceThirty = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);`;
  
      const sqlGetTotalPriceSeven = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`;
  
      const sqlGetTotalPriceToday = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= CURDATE();`;
  
      const sqlGetDetailTransactionMonth = `select year(created_at) as year, MONTH(created_at) As month , sum(totalPrice) as total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL ? month) group by year, month;`;
  
      const sqlGetDetailTransactionYear = `select year(created_at) as year, MONTH(created_at) As month , sum(totalPrice) as total_revenue from transaction where transactionStatus = "complete" and year(created_at) = ? group by year, month;`;
  
      month = req.query.month || 12;
      year = req.query.yeardata;
  
      const [sumResultAll] = await connection.query(sqlGetTotalPrice);
      const [sumResultThirty] = await connection.query(sqlGetTotalPriceThirty);
      const [sumResultSeven] = await connection.query(sqlGetTotalPriceSeven);
      const [sumResultToday] = await connection.query(sqlGetTotalPriceToday);
  
      if (year) {
        const [detailTransactionMonth] = await connection.query(sqlGetDetailTransactionYear, year);
        connection.release();
        res
          .status(200)
          .send({
            sumResultAll,
            sumResultThirty,
            sumResultSeven,
            sumResultToday,
            detailTransactionMonth,
          });
      } else {
        const [detailTransactionMonth] = await connection.query(
          sqlGetDetailTransactionMonth,
          month
        );
        connection.release();
        res
          .status(200)
          .send({
            sumResultAll,
            sumResultThirty,
            sumResultSeven,
            sumResultToday,
            detailTransactionMonth,
          });
      }
    } catch (error) {
      connection.release();
      next(error);
    }
  };

  //Get All Transaction
  const getTransactionRouter = async (req, res, next) => {

    const connection = await pool.promise().getConnection();
  
    try { 
      
      const sqlGetTransaction = `select row_number() over() as rownumber, id, invoice, user_id, transactionStatus, totalPrice, created_at from transaction where invoice like '%${req.query.keyword || ''}%' ${req.query.date || ''} ${req.query.status || ''}  ${req.query.isCustom || ''} ${req.query.sort || ''} ${req.query.pages || ''}`;
      const sqlCountTransaction = `SELECT COUNT(*) AS count FROM transaction where invoice like '%${req.query.keyword || ''}%' ${req.query.date || ''} ${req.query.status || ''}  ${req.query.isCustom || ''} ${req.query.sortTransactions || ''} `;
  
      const [result] = await connection.query(sqlGetTransaction);
      const [count] = await connection.query(sqlCountTransaction);
      connection.release();
      res.status(200).send({ result, count });
    } catch (error) {
      connection.release();
      next(error);
    }
  };




  router.get("/completed", getSumCompletedTransactionRouter);
  router.get("/", getTransactionRouter);
  
module.exports = router;
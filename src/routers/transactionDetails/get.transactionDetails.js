const router = require("express").Router();
const pool = require("../../config/database");


//Get All transaction detail
const getTransactionDetailRouter = async (req, res, next) => {

  const connection = await pool.promise().getConnection();

  try { 

    const sqlGetTransactionDetail = "select * from transactiondetail";

    const sqlTotalSold = `select sum(quantity) AS total_sold from transactiondetail where statusTransactionDetail = "complete";`;
    const sqlTotalRefund = `select sum(quantity) AS total_sold from transactiondetail where statusTransactionDetail = "failed";`;

    const [result] = await connection.query(sqlGetTransactionDetail);
    const [totalRefund] = await connection.query(sqlTotalRefund)
    const [totalSold] = await connection.query(sqlTotalSold);

    connection.release();

    res.status(200).send({ result, totalSold, totalRefund });
  } catch (error) {
    connection.release();
    next(error);
  }
};


router.get("/", getTransactionDetailRouter);

module.exports = router;
const express = require("express");
const router = express.Router();

const getProductRouter = require("./get.products");
const putProductRouter = require("./put.products")




router.use(getProductRouter);
router.use(putProductRouter)
module.exports = router;
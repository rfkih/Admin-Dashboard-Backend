const express = require("express");
const router = express.Router();

const getProductRouter = require("./get.products");
const putProductRouter = require("./put.products")
const postProductRouter = require("./post.products")




router.use(getProductRouter);
router.use(putProductRouter)
router.use(postProductRouter)
module.exports = router;
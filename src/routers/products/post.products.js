const router = require("express").Router();
const pool = require("../../config/database");
const upload = require("../../services/upload");




//Post Product Router
const postProductRouter = async (req, res, next) => {

  const connection = await pool.promise().getConnection();
  
  try {
    const sqlPostProduct = "INSERT INTO products SET ?";

    const dataProduct = [
      {
        category_id: req.body.newProduct.category_id,
        productName: req.body.newProduct.productName,
        productDetails: req.body.newProduct.productDetails,
        productIMG: req.body.newProduct.productIMG,
        isLiquid: req.body.newProduct.isLiquid,
        isDeleted: req.body.newProduct.isDeleted,
        price: req.body.newProduct.price,
      },
    ];

    const [result] = await connection.query(sqlPostProduct, dataProduct)

    res.send("Input Product success");
    connection.release();
  } catch (error) {
    connection.release();
    next(error);
  }
}


const multerUploadSingle = upload.uploadProductPhoto.single("productPhoto");

const postProductPhotoRouter = async (req, res) => {

  let finalImageURL =
    req.protocol +
    "://" +
    req.get("host") +
    "/productPicture/" +
    req.file.filename;

  res.json({ status: "success", image: finalImageURL });
};

router.post("/", postProductRouter);
router.post("/upload", multerUploadSingle, postProductPhotoRouter);

module.exports = router;
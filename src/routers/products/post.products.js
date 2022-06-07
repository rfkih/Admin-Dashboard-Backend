const router = require("express").Router();
const pool = require("../../config/database");
const upload = require("../../services/upload");





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


router.post("/upload", multerUploadSingle, postProductPhotoRouter);

module.exports = router;
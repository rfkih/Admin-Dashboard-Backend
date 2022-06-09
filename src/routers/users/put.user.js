require("dotenv").config();

const router = require("express").Router();
const pool = require("../../config/database");
const bcrypt = require("bcryptjs");

const { sign, verify } = require("../../services/token")
const auth = require("../../middleware/auth")
const { uploadAvatar } = require("../../services/upload")



// EDIT PHOTO PROFILE - AVATAR //
const multerUploadSingle = uploadAvatar.single("photo");
// console.log(multerUploadSingle)


// const putUserPhoto = async (req, res, next) => {

//     let finalImageURL =
//       req.protocol +
//       "://" +
//       req.get("host") +
//       "/avatar/" +
//       req.file.filename;
  
//     res.json({ status: "success", image: finalImageURL });
//   };
  
const putUserPhotoById = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    let finalImageURL = req.protocol + "://" + req.get("host") + "/avatar/" + req.file.filename;
   
    const sqlUpdatePhoto = `UPDATE users SET ? WHERE id = ?`;
    const dataUserPhoto = [{ photo: finalImageURL }, req.user.id];
    const result = connection.query(sqlUpdatePhoto, dataUserPhoto);
    res
      .status(201)
      .send({ message: "Profile picture uploaded!", Image: finalImageURL });
  } catch (error) {
    next(error);
  }
};



router.put("/edit-profile-picture/:id", auth, multerUploadSingle, putUserPhotoById);

module.exports = router;
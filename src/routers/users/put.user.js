require("dotenv").config();

const router = require("express").Router();
const pool = require("../../config/database");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { sign, verify } = require("../../services/token")
const auth = require("../../middleware/auth")
const { uploadAvatar } = require("../../services/upload")






// EDIT PHOTO PROFILE - AVATAR //
const multerUploadSingle = uploadAvatar.single("photo");

const putUserPhotoById = async (req, res, next) => {
  try {
    // const connection = await pool.promise().getConnection();
    let finalImageURL = req.protocol + "://" + req.get("host") + "/avatar/" + req.file.filename;
   
    // const sqlUpdatePhoto = `UPDATE users SET ? WHERE id = ?`;
    // const dataUserPhoto = [{ photo: finalImageURL }, req.user.id];
    // const result = connection.query(sqlUpdatePhoto, dataUserPhoto);
    res.status(201)
      .send({ message: "Profile picture uploaded!", Image: finalImageURL });
  } catch (error) {
    next(error);
  }
};


//Update User

const putUpdateUserRouter =  async (req, res, next) => {

    const connection = await pool.promise().getConnection()

    try {

        const isEmail = validator.isEmail(req.body.updatedUserData.email);

        if (!isEmail){ return res.status(401).send({ message: "Format email salah" }); }
        
       
        const sqlUpdateUsers = `UPDATE users SET ? WHERE id = ?`;
        console.log(req.body)
    
        const dataUpdateUsers = [req.body.updatedUserData, req.body.params.id]
        console.log(req.body.updatedUserData)

        const token = sign({ id: req.body.params.id });
        const sqlInsertToken = `INSERT INTO tokens set ?;`;
        const dataToken = { user_Id: req.body.params.id, tokens: token };

        await connection.query(sqlInsertToken, dataToken);
        const result = await connection.query(sqlUpdateUsers, dataUpdateUsers)

        res.status(201).send( {
            token,
            message:`Data User Telah di Update`
        })
        connection.release();
    } catch (error) {
        connection.release();
        next(error);
    }
};




router.put("/edit-profile-picture/:id", auth, multerUploadSingle, putUserPhotoById);
router.put("/update/:userId", putUpdateUserRouter ) 

module.exports = router;
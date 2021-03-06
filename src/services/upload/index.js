const multer = require("multer");
const path = require("path");


//Avatar
const avatarDirectory = path.join(__dirname, "../../../public/avatar");
const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarDirectory);
  },

  filename: (req, file, cb) => {
    console.log(file)

    cb(
      null,
        "avatar"+ Date.now() + req.user.username + path.extname(file.originalname)
    );
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: {
    fileSize: 10000000, // Byte, 10MB
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    // ktp.jpg
    // extname : .jpg
    const extname = path.extname(file.originalname);
    // Jika extension yang diupload tidak sesuai dengan isi dari allowedExtension
    if (!allowedExtension.includes(extname))
      return cb(new Error("Please upload image file (jpg, jpeg, png)"));

    cb(null, true);
  },
});






// PRODUCT //
const photoDirectory = path.join(__dirname, "../../../public/productPicture");
const storageProductPhoto = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photoDirectory);
  },

  filename: (req, file, cb) => {

    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const uploadProductPhoto = multer({
  storage: storageProductPhoto,
  limits: {
    fileSize: 10000000, // Byte, 10MB
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    // ktp.jpg
    // extname : .jpg
    const extname = path.extname(file.originalname);
    // Jika extension yang diupload tidak sesuai dengan isi dari allowedExtension
    if (!allowedExtension.includes(extname))
      return cb(new Error("Please upload image file (jpg, jpeg, png)"));

    cb(null, true);
  },
});



module.exports = { uploadAvatar,  uploadProductPhoto };

const multer = require("multer");
const fs = require('fs')

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

// const upload = multer({
//   dest: "public/",
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/");
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: storage }).single("image");

const deleteImage = (image) => {
  fs.unlink(`./${image}`, (err) => {
    if (err) throw err;
  })
}

module.exports = {
  upload,
  deleteImage
};
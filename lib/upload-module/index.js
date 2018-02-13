let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, 'File' + file.originalname);
    }
});

let fileFilter = (req, file, cb) => {
    let fileExtention = path.extname(file.originalname);
    if (fileExtention !== '.csv') {
        cb(null, false, message= "Error file must be csv type");
    } else if (req.file == undefined) {
        cb(null, false, message= "Error u must select file");
    }
};

module.exports.message;
module.exports.upload = multer({ storage, fileFilter });


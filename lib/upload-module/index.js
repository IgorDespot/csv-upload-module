let multer = require('multer');
let path = require('path');

let storage =  multer.diskStorage({
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
        console.log('file was not uploaded because of extention');
        cb(null, false);
    } else {
        cb(null, true);
    }  
};

exports.upload = multer({storage, fileFilter});


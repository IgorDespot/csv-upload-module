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

function checkFileType(file, cb) {
    var ext = path.extname(file.originalname);
    if (ext == '.csv') {
        return cb(null,true);
    } else {
        cb('Error: Csv Only!');
    }
}

module.exports = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
 }).single('userFile');
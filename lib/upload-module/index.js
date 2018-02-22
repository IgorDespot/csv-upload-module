// grab the  multer module.
let multer = require('multer');
let path = require('path');

// define our local storage.
// allow us to specify location/format of uploaded file.
let defaultStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, 'File' + file.originalname);
    }
});

// checking that file extenstion is .csv
function checkFileType(file, cb) {
    var ext = path.extname(file.originalname);
    if (ext == '.csv') {
        return cb(null,true);
    } else {
        cb('Error: Csv Only!');
    }
}

// module.exports allows us to pass this to other files when it is called.
module.exports = function (storage) {
    // if we do not provide some other storage module will used local one.
    storage = storage || defaultStorage;
    return multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
            checkFileType(file, cb);
        }
    }).single('userFile');
}

// module.exports multer in case we need to change storage options in other files.
module.exports.multer = multer;
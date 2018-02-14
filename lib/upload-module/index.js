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

let fileFilter = (file, cb) => {

    const filetypes = /csv/;
    const extname= filetypes.test(path.extname(file.originalname).toLocaleLowerCase);
    const mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: csv only');
    }
}

module.exports.upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb){
        fileFilter(file, cb);
    }
 }).single('userFile');


const multer = require('multer');
const path = require('path');
const extf = require('../../config.json');

const fileExtentions = extf['file-extentions'];

/** Define storage location and format of file that is being saved */
const defaultStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, `File${file.originalname}`);
  }
});

/** Checking that file have right extenstion
 * @param {Request} file from upload form
 */
function checkFileType(file, cb) {
  const ext = path.extname(file.originalname);
  if (fileExtentions.includes(ext)) {
    return cb(null, true);
  }
  return cb('Error: Csv Only!');
}

function getFileExtension(file) {
  return path.extname(file.originalname);
}

/**
 * @param {Function} storage - setting memory storage if params is not provided
 local one will be used
 * @param {String} filename - name of file where data will be written
*/
module.exports = (storage) => {
  storage = storage || defaultStorage;
  return multer({
    storage,
    fileFilter(req, file, cb) {
      checkFileType(file, cb);
    }
  }).any();
};

/** Module.exports multer in case we need to change storage options in other files. */
module.exports.multer = multer;

/**
 * @param {File} file Take file and check for extentions
 */
module.exports.fileFilter = (file, cb) => checkFileType(file, cb);

/**
 * @param {File} file Take file and get extention
 */
module.exports.getFileExtension = getFileExtension;

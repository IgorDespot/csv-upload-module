let uploadModule = require('lib/upload-module');
let upload = uploadModule(uploadModule.multer.memoryStorage());

var ngsiConverter = require('lib/ngsi-converter');

const addOrUpdateOrion = require('lib/orion-module');

const create = require('lib/orion-module-new').createEntity;

// Check different errors and handle displaying them to user
exports = module.exports = function (req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.json(err)
        } else if (req.file == undefined) {
            res.json('U try to send empty file fail')
        } else {
            // Parse data then it send it to orion contex broker
            var data = req.file.buffer.toString();
            var extension = uploadModule.getFileExtension(req.file);
            ngsiConverter(data, extension)
            .then(
                (data) => {
                    var promises = [];
                    data.forEach((curr, index) => {
                        promises[index] = Promise.resolve(curr)
                        .then((obj) => {
                            return create(obj);
                        })
                    });
                    return Promise.all(promises);
                }
            ).then(() => {
                res.json('All went fine.')
            })
            .catch((err) => 
                res.json(err)
            );               
        }
    });
}
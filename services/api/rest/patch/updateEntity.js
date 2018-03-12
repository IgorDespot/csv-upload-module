let uploadModule = require('lib/upload-module');
let upload = uploadModule(uploadModule.multer.memoryStorage());

var ngsiConverter = require('lib/ngsi-converter');
const { entity }    = require('lib/orion-module-new');

// Check different errors and handle displaying them to user
exports = module.exports = function (req, res, next) {

    let service = req.headers['fiware-service'];
    let service_path = req.headers['fiware-servicepath'];
    
    console.log('Pozdrav')

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
                    var responses = [];
                    data.forEach((curr, index) => {
                        promises[index] = Promise.resolve(curr)
                        .then((obj) => {
                            responses[index] = entityFailWrapper(entity.entityUpdatePromise(obj));
                            return responses[index];
                        });
                    });
                    return Promise.all(promises);
                }
            )
            .then((msg) => {
                res.json(msg);
            })
            .catch((err) => 
                res.json(err)
            );               
        }
    });
}

function entityFailWrapper(promise) {
    return promise
    .catch((err) => {
        return Promise.resolve(err);
    });
}
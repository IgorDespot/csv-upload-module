let uploadModule = require('lib/upload-module');
let upload = uploadModule(uploadModule.multer.memoryStorage());

var ngsiConverter = require('lib/ngsi-converter');
const {
    entity
} = require('lib/orion-module-new');

// Check different errors and handle displaying them to user
exports = module.exports = function (req, res, next) {

    let service = req.headers['fiware-service'];
    let service_path = req.headers['fiware-servicepath'];

    upload(req, res, (err) => {
        if (err) {
            res.json(err)
        } else if (req.file == undefined) {
            res.json('U try to send empty file fail')
        } else {
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
                                    responses[index] = entityFailWrapper(entity.entityUpdatePromise(service, service_path, obj));
                                    return responses[index];
                                });
                        });
                        return Promise.all(promises);
                    }
                ).catch((err) => {
                    var data = err.result;
                    data.forEach(element => {
                        entity.entityCreatePromise(service, service_path,element).then((resolve) => {
                            console.log("Entitiy: " + element.id + "was successfuly created")
                        }).catch((err) => {
                            console.log("Entity: " + element.id + "was not crated")
                        })
                    });
                    res.json(err)
                })
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
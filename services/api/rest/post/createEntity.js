let uploadModule = require('lib/upload-module');
let upload = uploadModule(uploadModule.multer.memoryStorage());
let payload = require('./payload');

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
        } else if (req.files == undefined) {
            res.json('U try to send empty file fail')
        } else {
            var data = req.files[0].buffer.toString();
            var extension = uploadModule.getFileExtension(req.files[0]);
            ngsiConverter(data, extension)
                .then(
                    (data) => {
                        var promises = [];
                        var responses = [];
                        data.forEach((curr, index) => {
                            promises[index] = Promise.resolve(curr)
                                .then((obj) => {
                                    responses[index] = entityFailWrapper(entity.entityCreatePromise(service,service_path,obj));
                                    return responses[index];
                                });
                        });
                        return Promise.all(promises);
                    }
                ).catch((data) => {
                    var result = data.result;
                    var errorMessages = data.err.map((err) => {
                        return err.message;
                    });
                    result.forEach(element => {
                        entity.entityCreatePromise(service,service_path,element).then((resolve) => {
                            console.log("Entitiy: " + element.id + "was successfuly created")
                        }).catch((err) => {
                            console.log("Entity: " + element.id + "was not crated")
                        })
                    });
                    res.json([{
                            "Number of errors": sizeObj(errorMessages),
                            "Successfuly created": sizeObj(result)
                        },
                        JSON.stringify(errorMessages),
                        test(result)
                    ])
                })
                .then((msg) => {
                    res.json([{
                            "Number of errors": numOfFails(msg),
                            "Successfuly created": numOfSuccess(msg)
                        },
                        msg
                    ]);
                })
                .catch((err) =>
                    res.json(console.log(err))
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

function sizeObj(obj) {
    return Object.keys(obj).length;
}

function test(obj) {
    var fail = [];
    obj.forEach(element => {
        fail.push(payload.success(element));
    })
    return fail;
}

function numOfFails(msg) {
    var fails = [];
    msg.forEach(igor => {
        igor.status.forEach(despot => {
            despot.actions.forEach(element => {
                if (element.status === 'FAIL')
                    fails.push(element.status)
            });
        });
    })
    return fails.length;
}

function numOfSuccess(msg) {
    var success = [];
    msg.forEach(igor => {
        igor.status.forEach(despot => {
            despot.actions.forEach(element => {
                if (element.status === 'SUCCESS')
                    success.push(element.status)
            });
        });
    })
    return success.length;
}
let uploadModule = require('lib/upload-module');
let upload = uploadModule(uploadModule.multer.memoryStorage());
let payload = require('./payload');
var rp = require('request-promise');
var config = require('../../../../config.json');
var orionPath = config['orion-path'];

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
            var empty = [];
            ngsiConverter(data, extension)
                .then((data) => {
                    var empty = [];
                   for (let i = 0; i < data.length; i++) {
                    var options = {
                        method: 'POST',
                        uri: orionPath + 'entities?options=keyValues',
                        headers: {
                            "Content-Type": 'application/json',
                            "Fiware-Service": service,
                            "Fiware-ServicePath": service_path
                        },
                        body: data[i],
                        json: true // Automatically stringifies the body to JSON
                    };
                    empty.push(rp(options)
                    .then((res)=> {return Promise.resolve('Yes')})
                    .catch((err)=>{return Promise.resolve(err)}))
                   }
                    Promise.all(empty).then((results) => {
                        res.json(results)
                    }).catch((error) => {
                        console.log(error)
                    });
                }).catch((err) => {
                    res.json(err);
                })
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

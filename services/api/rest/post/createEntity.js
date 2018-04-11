const uploadModule    = require('lib/upload-module');
const upload          = uploadModule(uploadModule.multer.memoryStorage());
const sucessR         = require('../payload').responseSuccess;
const failedR         = require('../payload').responseFail;
const rp              = require('request-promise');
const config          = require('../../../../config.json');
const orionPath       = config['orion-path'];
const ngsiConverter   = require('lib/ngsi-converter');
const { entity }      = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];

  upload(req, res, (err) => {
    if (err) {
      res.status(415).json('Request content type is not supported. Please select .csv file')
    } else if (req.files == undefined) {
      res.status(400).json('The incoming request is invalid in this context. U must select some file')
    } else {
      var data = req.files[0].buffer.toString();
      var extension = uploadModule.getFileExtension(req.files[0]);
      var empty = [];

      ngsiConverter(data,extension)
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
              json: true
            }
            empty.push(rp(options)
             .then((res) => {
               return Promise.resolve(sucessR(data[i], 'CREATE'))
             })
             .catch((err) => {
               if (err.error['errno'] == 'ECONNREFUSED') {
                  res.status(503).json('There are no server resources to fulfill the client request.')
                } else {
                  return Promise.resolve(failedR(data[i], 'CREATE', err.error))
                }
             }))
          }
          Promise.all(empty)
            .then((results) => {
              res.json([{
                "Successfuly created:": numOfSuccess(results),
                "Attribute checker errors:": 0,
                "Entity creation errors:": numOfFails(results)
              }, results])
            }).catch((error) => {
              res.json(error)
            })
        }).catch((error) => {
          var data = error.result;
          var errors = error.err.map((err) => {
              return err.message;
          });
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
              json: true
            };
            empty.push(rp(options)
             .then((res) => {
               return Promise.resolve(sucessR(data[i], 'CREATE'))
             })
             .catch((err) => {
               if (err.error['errno'] == 'ECONNREFUSED') {
                 res.status(503).json('There are no server resources to fulfill the client request.')
              } else {
                 return Promise.resolve(failedR(data[i], 'CREATE', err.error))
              }
             }))
          }
          Promise.all(empty)
            .then((results) => {
              res.json([{
                "Successfuly created:": numOfSuccess(results),
                "Attribute checker errors:": sizeObj(errors),
                "Entity creation errors:": numOfFails(results)
              },
              errors,
              results
            ])
            }).catch((error) => {
              res.json(error)
            });
        });
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

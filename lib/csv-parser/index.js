let parse = require('csv-parse');

let parseFunc = exports.parse = function (data, callback) {
    parse(data, {columns: true}, callback);
}

exports.parsePromise = function (data) {
    return new Promise(
        function(resolve, reject) {
            parseFunc(data, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            })
        }
    );
};

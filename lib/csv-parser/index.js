let parse = require('csv-parse');

let parseFunc = exports.parse = function (data, callback, options) {
    options = options || {};
    options.columns = true;
    parse(data, options, callback);
}

exports.parsePromise = function (data, options) {
    return new Promise(
        function(resolve, reject) {
            parseFunc(data, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            }, options);
        }
    );
};

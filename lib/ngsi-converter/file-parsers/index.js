var csvParser = require('lib/csv-parser');

module.exports = {
    ".csv": csvParser.parsePromise,
    ".xml": notImplemented,
    ".json": notImplemented,
    ".txt": notImplemented
}

function notImplemented(data, ext) {
    return Promise.reject(
        `Parser for ${ext} filetype hasn't been implemented yet`
    );
}
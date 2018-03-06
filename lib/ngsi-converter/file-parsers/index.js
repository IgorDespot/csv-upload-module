var csvParser = require('lib/csv-parser');

module.exports = {
    ".csv": csvParser.parsePromise,
    ".xml": notImplementedYet,
    ".json": notImplementedYet,
    ".txt": notImplementedYet
}

function notImplementedYet(data, ext) {
    return Promise.reject(
        `Parser for ${ext} filetype hasn't been implemented yet`
    );
}
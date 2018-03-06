var csvParser = require('lib/csv-parser');
var xmlParser = require('lib/xml-parser');

module.exports = {
    ".csv": csvParser.parsePromise,
    ".xml": xmlParser.parsePromise,
    ".json": notImplementedYet,
    ".txt": notImplementedYet
}

function notImplementedYet(data, ext) {
    return Promise.reject(
        `Parser for ${ext} filetype hasn't been implemented yet`
    );
}
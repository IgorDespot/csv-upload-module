var csvParser = require('lib/csv-parser');

module.exports = {
    ".csv": csvParser.parsePromise
}
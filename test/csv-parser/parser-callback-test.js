let parse = require('lib/csv-parser').parse;

describe('csv-parser.parse', function () {
    it('should be a function', function () {
        expect(typeof parse).toMatch('function');
    })
})
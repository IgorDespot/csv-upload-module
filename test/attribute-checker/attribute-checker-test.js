var fileParser = require('lib/csv-file-parser');
var attrChecker = require('lib/attribute-checker');

describe('attribute-checker', function () {

    it('should be a function', function () {
        expect(attrChecker).toEqual(jasmine.any(Function));
    });

    it(`
        shouldn't throw an error on correct csv input
        with preset attribute ruleset (in this case DepositPointType)
    `, function (done) {
        fileParser.parse(
            './test/attribute-checker/test-2.csv',
            function (err, data) {
                attrChecker(data, function (err, data) {
                    expect(err).toBeFalsy();
                    done();
                });
            }, {
                delimiter: ';'
            }
        )
    })
})
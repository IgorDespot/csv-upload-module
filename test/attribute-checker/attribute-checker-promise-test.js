var fileParser = require('lib/csv-file-parser');
var attrChecker = require('lib/attribute-checker');

var promise = attrChecker.promise;

describe('attribute-checker.promise', function () {

    it('should be a function', function () {
        expect(promise).toEqual(jasmine.any(Function));
    })
});
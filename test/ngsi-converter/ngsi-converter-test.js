var ngsiConverter = require('lib/ngsi-converter');
var fs = require('fs');

describe('ngsi-converter', function () {

    it(`
        returns a rejected promise when no arguments are provided
    `, function () {
        expect(ngsiConverter().catch(Object)).toEqual(jasmine.any(Promise));
    });

    it(`
        returns an ngsi compatable JS object from
        valid csv input
    `, function (done) {
        fs.readFile(
            './test/ngsi-converter/test-3.csv',
            'utf-8',
            function (err, data) {
                ngsiConverter(data, '.csv')
                .then( function (data) {
                    expect(data).toEqual(jasmine.any(Array));
                    done();
                })
                .catch(function (data) {
                    done.fail("This shouldn't happen");
                });
            }
        );
    });
});
var parsePromise = require('lib/csv-file-parser').parsePromise;

describe('csv-file-parser.parsePromise', function () {

    it('should be a function', function () {
        expect(typeof parsePromise).toBe('function');
    });

    it(`
        should pass JSON parsed csv data
        to the function in "then" method
    `, function (done) {
        parsePromise('./test/csv-file-parser/test.csv')
        .then( (data) => {
            expect(data).toEqual(jasmine.any(Array));
            done();
        })
        .catch( () => {
            done.fail("This shouldn't happen");
        })
    })
})
let parse = require('lib/csv-parser').parse;

describe('csv-parser.parse', function () {

    it('puts the lotion on its skin', function () {
        expect().nothing();
    });

    it('should be a function', function () {
        expect(typeof parse).toMatch('function');
    });

    it(`
        should pass JSON converted valid string csv
        to the provided callback function
    `, function (done) {
        parse('"first","second"\n1,2', function (err, out) {
            expect(out).toEqual([{first:'1',second:'2'}]);
            done();
        })
    });

    it('should fail for an invalid csv file', function (done) {
        parse('"first","second"\n12', function (err, out) {
            expect(err).toBeTruthy();
            done();
        })
    });
})
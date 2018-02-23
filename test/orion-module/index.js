const frisby = require('frisby');
let ormodule = require('lib/orion-module');

describe('Orion module', function () {

    it('should be a function', function () {
        expect(typeof ormodule).toBe('function');
    });

    it('should return a status of 400', function (done) {
        frisby.get('http://localhost:1026/')
          .expect('status', 400)
          .done(done);
    });

});
const frisby = require('frisby');
let connection = require('lib/orion-connection');

describe('Orion module', function () {

    it('should be a function', function () {
        expect(typeof connection).toBe('function');
    });
});
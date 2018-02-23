let connection = require('lib/orion-connection');

let config = require('../../config.json');

const options = config["orion-options"];

const path = config["orion-path"];


describe('Orion module', function () {

    it('should be a function', function () {
        expect(typeof connection).toBe('function');
    });

    it('should be a object', function () {
        expect(typeof config).toBe('object');
    });

    it('should be a string', function() {
        expect(typeof path).toBe('string');
    });

    it('should be defined', function() {
        expect(path).toBeDefined();
    });

    it('should be a object', function () {
        expect(typeof options).toEqual('object');
    });

    it('should contain Content-Type', function () {
        expect(config).toEqual(jasmine.objectContaining({
            "orion-path": jasmine.any(String)
        }))
    });
    
    it('should contain Options', function () {
        expect(config).toEqual(jasmine.objectContaining({
            "orion-options": jasmine.any(Object)
        }))
    });

    
});
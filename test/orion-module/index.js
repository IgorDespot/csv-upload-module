let connection = require('lib/orion-connection');

let config = require('../../config.json');

const options = config['orion-options'];

const path = config['orion-path'];

const addOrUpdateOrion = require('lib/orion-module');

describe('Orion module', function () {

    it('should be a function', function () {
        expect(typeof connection).toBe('function');
      });

    it('should be a object', function () {
        expect(typeof config).toBe('object');
      });

    it('should be a string', function () {
        expect(typeof path).toBe('string');
      });

    it('should be defined', function () {
        expect(path).toBeDefined();
      });

    it('should be a object', function () {
        expect(typeof options).toEqual('object');
      });

    it('should contain Content-Type', function () {
          expect(config).toEqual(jasmine.objectContaining({
            'orion-path': jasmine.any(String)
          }));
        });

    it('should contain Options', function () {
          expect(config).toEqual(jasmine.objectContaining({
            'orion-options': jasmine.any(Object)
          }));
        });

    it('should recive 1 argument', function () {
        expect(connection.length).not.toBeLessThan(1);
      });

    it('should throw error', function () {
        expect(function () {addOrUpdateOrion();}).toThrowError();
      });

    it('should recive only 1 argument', function () {
        expect(addOrUpdateOrion.length).toEqual(1);
      });
  });

const connection = require('lib/orion-connection');
const frisby = require('frisby');
const config = require('../../config.json');
const path = config['orion-path'];
const NGSI = require('ngsijs');

describe('Orion connection', function () {
  // const conn = connection(path);

  it('should be defined or orion-module wont work', function () {
    expect(connection).toBeDefined();
  });

  it('should be defined or orion-module wont work', function () {
    expect(path).toBeDefined();
  });

  it('should be defined or orion-module wont work', function () {
    expect(config).toBeDefined();
  });

  it('should pass the test for createUser', function () {
    expect(connection).toEqual(jasmine.any(Function));
  });

  it('Should return new NGSI connection', function () {
    expect(connection(path)).toEqual(jasmine.any(Object));
  });

  it('should recive 1 argument', function () {
    expect(connection.length).not.toBeLessThan(1);
  });

  it('Should return new NGSI connection', function () {
    expect(function(){connection(123)}).toThrow(new Error('Path not type of string'));
  });

  
});
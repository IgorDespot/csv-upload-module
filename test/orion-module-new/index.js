const config = require('config');

const orionPath = config["orion-path"];

const entities = require('lib/orion-module-new').listEntities;
const create = require('lib/orion-module-new').createEntity;

describe('toBeDefined checks', () => {

  it('config should be defined or error will throw', () => {
    expect(config).toBeDefined();
  });

  it('path should be defined or error will throw', () => {
    expect(orionPath).toBeDefined();
  });

});

describe('function checks', () => {

  it('should be function',  () => {
      expect(entities).toEqual(jasmine.any(Function));
  });

  it(`
    should make call to orion contex broker using api
    and return array of objects representing entities
  `, () => {
    entities()
    .then( (data) => {
      expect(data).toEqual(jasmine.any(Object));
      done();
    })
    .catch( () => {
      done.fail('Should not come here');
    });
  });

  it(`
    should throw error if passed entity is undefined
  `, function () {
    expect(function(){create()}).toThrowError('Entity must be defined');
  });  
  
});

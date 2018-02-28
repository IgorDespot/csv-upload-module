const connection = require('lib/orion-connection');
const frisby = require('frisby');
const config = require('../../config.json');
const path = config['orion-path'];

describe('Orion connection', function () {

  it('should be defined or orion-module wont work', function () {
    expect(connection).toBeDefined();
  });

  it('should be status 400 because of no service is provided', function (done) {
  frisby.get(path)
    .expect('status', 400)
    .done(done);
  });

});

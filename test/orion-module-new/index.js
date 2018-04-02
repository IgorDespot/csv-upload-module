const {
  responseSuccess,
  responseFail
} = require('lib/orion-module-new/entity/response');

const entity = {
    "id": "8EB19",
    "type": "DepositPoint",
}

describe('function checks', () => {

  it('should return json object when entity is passed', () => {
    expect(responseSuccess('CREATE'))
    .toEqual(jasmine.any(Object));
    expect(responseFail(entity,'UPDATE', 'GRESKA'))
    console.log(responseSuccess(entity,'CREATE'))
  });

  it('should return json object when entity is passed', () => {
    expect(responseFail(entity,'UPDATE', 'GRESKA'))
    .toEqual(jasmine.any(Object));
  });


});

const {
  responseSuccess,
  responseFail
} = require('services/api/rest/payload');

const { numOfErrors,numOfSucess,numOfFails } = require('services/api/rest/summary');
const resposne = require('./response.json');
const failResponse = require('./responseFail.json');

const entity = {
    "id": "8EB19",
    "type": "DepositPoint",
}

const error = ["Error1", "Error2", "Error3", "Error4"];
const noErr = [];

describe('function checks', () => {

  it('should return json object when entity is passed', () => {
    expect(responseSuccess('CREATE'))
    .toEqual(jasmine.any(Object));
    expect(responseFail(entity,'UPDATE', 'GRESKA'))
  });

  it('should return json object when entity is passed', () => {
    expect(responseFail(entity,'UPDATE', 'GRESKA'))
    .toEqual(jasmine.any(Object));
  });

  it('should return number of errors when we passed errror object', () => {
    expect(numOfErrors(error)).toEqual(jasmine.any(Number));
  });

  it('should return 0 when there is no errros', () => {
    expect(numOfErrors(noErr)).toEqual(0);
  });

  it('should return number of successfuly created entites if there are any', () => {
    expect(numOfSucess(resposne)).toEqual(jasmine.any(Number));
  });

  it('should return number of fails while creating entities if there are any', () => {
    expect(numOfFails(failResponse)).toEqual(jasmine.any(Number));
  });

});

const {
  responseSuccess,
  responseFail
} = require('services/api/rest/payload');

const { numOfErrors,numOfSucess,numOfFails } = require('services/api/rest/summary');
const { setOptionsPost,setOptionsPatch } = require('services/api/rest/setOPtions');
const resposne = require('./response.json');
const failResponse = require('./responseFail.json');
const config  = require('config.json');
const orionPath = config['orion-path']

const entity = {
    "id": "8EB19",
    "type": "DepositPoint",
    "description": "Container"
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

  it('should return options object whit provided arguments', () => {
    expect(setOptionsPost('waste4think', '/deusto/w4t/zamudio/test', entity,orionPath))
    .toEqual(jasmine.any(Object));
  });

  it('should return object for patch calls whith provided arguments', () => {
    expect(setOptionsPatch('waste4think', '/deusto/w4t/zamudio/test', entity,orionPath))
    .toEqual(jasmine.any(Object));
    console.log(setOptionsPatch('waste4think', '/deusto/w4t/zamudio/test', entity,orionPath))
  });

});

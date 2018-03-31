const locationCheck = require
('../../lib/attribute-checker/attribute-rules/default-rules-value-check/index')
.locationCheck;
const stringToArray = require
('../../lib/attribute-checker/attribute-rules/default-rules-value-check/index')
.stringToArray;
const commaNumToUnits = require
('../../lib/attribute-checker/attribute-rules/default-rules-value-check/index')
.commaNumToUnits;
const dateCheck = require
('../../lib/attribute-checker/attribute-rules/default-rules-value-check/index')
.dateCheck;


describe('Attribute function cheks', () => {

  it('should return json object when given correct string value/format', () => {
    expect(locationCheck('Test,test,..[1,2]')).toEqual(jasmine.any(Object));
  });

  it('should return null when given string is not number', () => {
    expect(locationCheck('')).toBeNull();
  });

  it('shoudl return array when given none empty string', () => {
    expect(stringToArray('1,2,3,4,')).toEqual(jasmine.any(Array));
  });

  it('shoudl return null when given none empty string', () => {
    expect(stringToArray('')).toBeNull();
  });

  it('shoudl return number when given valid string', () => {
    expect(commaNumToUnits('21212,2121.20')).toEqual(jasmine.any(Number));
  });

  it('shoudl return number when given valid string', () => {
    expect(commaNumToUnits('')).toBe(0);
  });

  it('shoudl return null when given valid string', () => {
    expect(commaNumToUnits('adasdasd')).toBeNull();
  });

  it('should return valid date when correct format is passed', () => {
    expect(dateCheck('2018-04-01')).toEqual(jasmine.any(String));
  });

  it('should return null when wrong date format is passed', () => {
    expect(dateCheck('2018-2-12')).toBeNull();
  });
});

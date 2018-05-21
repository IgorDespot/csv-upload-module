const {
  locationCheck,
  stringToArray,
  commaNumToUnits,
  dateCheck,
  mandatoryCheck
} = require('lib/attribute-checker/attribute-rules/default-rules-value-check');

describe('Attribute function cheks', () => {
  it('should return json object when given correct string value/format', () => {
    expect(locationCheck('" ""geometry"": { ""type"": ""Point"", ""coordinates"": [ -2.884903846, 43.29140194 ] } }"')).toEqual(jasmine.any(Object));
  });

  it('should return geo:point object when no value is given', () => {
    expect(locationCheck('')).toEqual(jasmine.any(Object));
  });

  it('should return null when given value is not a number', () => {
    expect(locationCheck('Igor')).toBeNull();
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

  it('should return attribute when if we provede none falsy value', () => {
    expect(mandatoryCheck('refDepositPointType')).toEqual(jasmine.any(String));
  });

  it('should return null when falsy value is provided', () => {
    expect(mandatoryCheck('')).toBeNull();
  });
});

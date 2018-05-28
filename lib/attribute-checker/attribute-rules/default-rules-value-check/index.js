const response = require('./response');
const moment = require('moment');

function commaNumToUnits(oldNum) {
  const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
  if (newNum === newNum) {
    return newNum;
  }
  return null;
}

function commaNumToUnitsMandatory(oldNum) {
  if (!oldNum) {
    return null;
  }
  const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
  if (newNum === newNum) {
    return newNum;
  }
  return null;
}

function stringToArray(string) {
  if (!string) {
    return [];
  }
  if (string) {
    return string.split([',', ';']).map(raw => raw.trim());
  }
  return null;
}

function stringToArrayMandatory(string) {
  if (!string) {
    return null;
  }
  if (string) {
    return string.split([',', ';']).map(raw => raw.trim());
  }
  return null;
}

function dateCheck(date) {
  if (!date) {
    return '';
  }
  if (!moment(date, 'DD/MM/YYYY HH:mm').isValid()) {
    return null;
  }
  return date;
}

function mandatoryCheck(attribute) {
  if (!attribute) {
    return null;
  }
  return attribute;
}

function locationCheck(location) {
  if (!location) {
    return null;
  }

  const data = location.substring(location.indexOf('[') + 1, location.indexOf(']'));
  const coordinates = data.split(',', 2);

  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);

  if (data.length === 0) {
    return null;
  }
  if (typeof x === 'number' || typeof x === 'number') {
    return response(x, y);
  }
  return null;
}

function extraCheck(data) {
  const result = data.substring(0, data.indexOf(' '));
  return commaNumToUnits(result);
}

function maxCargoVolume(data) {
  const result = data.substring(0, 2);
  return commaNumToUnits(result);
}

module.exports = {
  locationCheck,
  commaNumToUnits,
  stringToArray,
  dateCheck,
  mandatoryCheck,
  extraCheck,
  maxCargoVolume,
  stringToArrayMandatory,
  commaNumToUnitsMandatory
};

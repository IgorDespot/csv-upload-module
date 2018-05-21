const response = require('./response');
const moment = require('moment');

function commaNumToUnits(oldNum) {
  const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
  if (newNum === newNum) {
    return newNum;
  }
  return null;
}

function stringToArray(string) {
  if (string) {
    return string.split(',').map(raw => raw.trim());
  }
  return null;
}

function dateCheck(date) {
  if (!date) {
    return '';
  }
  if (!moment(date, moment.ISO_8601).isValid()) {
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
    return response('', '');
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

exports = module.exports = {
  locationCheck,
  commaNumToUnits,
  stringToArray,
  dateCheck,
  mandatoryCheck,
};

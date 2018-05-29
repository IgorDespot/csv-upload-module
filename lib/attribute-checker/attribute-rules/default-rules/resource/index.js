const valueCheck = require('../../default-rules-value-check');

const Resource = {
  id: valueCheck.mandatoryCheck,
  family: valueCheck.mandatoryCheck,
  type: String,
  name: valueCheck.removeForbiden,
  description: String,
  refCategory: valueCheck.mandatoryCheck,
  definitionSource: String,
  wasteCode: String
};

module.exports = Resource;

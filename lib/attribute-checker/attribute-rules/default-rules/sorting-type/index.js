const valueCheck = require('../../default-rules-value-check');

const SortingType = {
  id: valueCheck.mandatoryCheck,
  family: valueCheck.mandatoryCheck,
  type: String,
  name: valueCheck.mandatoryCheck,
  description: String,
  regulation: String,
  refResources: valueCheck.stringToArray2,
  color: valueCheck.mandatoryCheck,
  annotations: String,
  areaServed: String
};

module.exports = SortingType;
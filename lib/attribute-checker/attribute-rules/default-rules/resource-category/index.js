const valueCheck = require('../../default-rules-value-check');

const ResourceCategory = {
  id: String,
  family: valueCheck.mandatoryCheck,
  type: String,
  name: valueCheck.mandatoryCheck,
  description: String
};

module.exports = ResourceCategory;

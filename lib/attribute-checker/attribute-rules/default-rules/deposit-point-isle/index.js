const valueCheck = require('../../default-rules-value-check');

const DepositPointIsle = {
  id: valueCheck.mandatoryCheck,
  type: String,
  location: valueCheck.locationCheckNoMand,
  address: String,
  name: String,
  description: String,
  features: valueCheck.mandatoryCheck,
  refDepositPoint: valueCheck.stringToArrayMandatory,
  areaServed: String,
  dateModified: String,
  dateCreated: String
};

module.exports = DepositPointIsle;

const valueCheck = require('../../default-rules-value-check');

const DepositPoint = {
  id: valueCheck.mandatoryCheck,
  type: String,
  family: valueCheck.mandatoryCheck,
  serialNumber: String,
  refSortingType: valueCheck.mandatoryCheck,
  description: String,
  refType: valueCheck.mandatoryCheck,
  storedWasteOrigin: String,
  location: valueCheck.locationCheck,
  address: String,
  fillingLevel: valueCheck.commaNumToUnits,
  cargoWeight: valueCheck.commaNumToUnits,
  temperature: valueCheck.commaNumToUnits,
  methaneConcentration: valueCheck.commaNumToUnits,
  regulation: String,
  responsible: String,
  owner: String,
  dateServiceStarted: String,
  dateLastEmptying: String,
  nextActuationDeadline: String,
  actuationHours: String,
  openingHours: String,
  dateLastCleaning: String,
  nextCleaningDeadline: String,
  refDepositPointIsle: String,
  status: valueCheck.mandatoryCheck,
  color: String,
  image: String,
  annotations: String,
  areaServed: String,
  dateModified: String,
  refDevice: String
};

module.exports = DepositPoint;

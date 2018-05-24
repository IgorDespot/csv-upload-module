const valueCheck = require('../../default-rules-value-check');

const DepositPoint = {
  id: String,
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
  dateServiceStarted: valueCheck.dateCheck,
  dateLastEmptying: valueCheck.dateCheck,
  nextActuationDeadline: valueCheck.dateCheck,
  actuationHours: valueCheck.dateCheck,
  openingHours: valueCheck.dateCheck,
  dateLastCleaning: valueCheck.dateCheck,
  nextCleaningDeadline: valueCheck.dateCheck,
  refDepositPointIsle: String,
  status: valueCheck.mandatoryCheck,
  color: String,
  image: String,
  annotations: String,
  areaServed: String,
  dateModified: valueCheck.dateCheck,
  refDevice: String
};

module.exports = DepositPoint;

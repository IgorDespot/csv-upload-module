const valueCheck = require('../../default-rules-value-check');

const Vehicle = {
  id: valueCheck.mandatoryCheck,
  type: String,
  family: valueCheck.mandatoryCheck,
  vehiclePlateIdentifier: valueCheck.mandatoryCheck,
  name: String,
  location: valueCheck.locationCheckNoMand,
  refType: valueCheck.mandatoryCheck,
  refInputs: String,
  refOutputs: String,
  owner: valueCheck.mandatoryCheck,
  category: String,
  speed: valueCheck.commaNumToUnits,
  cargoWeigth: valueCheck.commaNumToUnits,
  purchaseDate: valueCheck.dateCheck,
  mileageFromOdometer: valueCheck.commaNumToUnits,
  vehicleConfiguration: String,
  color: String,
  features: String,
  serviceProvided: String,
  vehicleSpecialUsage: String,
  areaServed: String,
  serviceStatus: String
};

module.exports = Vehicle;

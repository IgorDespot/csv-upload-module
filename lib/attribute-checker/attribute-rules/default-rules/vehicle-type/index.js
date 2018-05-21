const valueCheck = require('../../default-rules-value-check');

const VehicleType = {
  id: valueCheck.mandatoryCheck,
  type: String,
  family: valueCheck.mandatoryCheck,
  refInputs: valueCheck.mandatoryCheck,
  refOutputs: valueCheck.mandatoryCheck,
  name: valueCheck.mandatoryCheck,
  description: String,
  vehicleType: valueCheck.mandatoryCheck,
  brandName: valueCheck.mandatoryCheck,
  numberOfAxes: valueCheck.commaNumToUnits,
  maxCargoPerAxe: String,
  engineType: String,
  enginePower: String,
  tireTypes: String,
  modelName: String,
  manufacturerName: String,
  vehicleModelDate: valueCheck.dateCheck,
  maxCargoWeight: valueCheck.extraCheck,
  maxCargoVolume: valueCheck.maxCargoVolume,
  fuelDepositCapacity: valueCheck.extraCheck,
  compactingRatio: String,
  fuelType: String,
  fuelConsumption: String,
  height: valueCheck.extraCheck,
  width: valueCheck.extraCheck,
  depth: valueCheck.extraCheck,
  weight: valueCheck.extraCheck,
  loadType: String
};

module.exports = VehicleType;

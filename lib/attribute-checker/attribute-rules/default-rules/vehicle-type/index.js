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
  vehicleModelDate: String,
  maxCargoWeight: valueCheck.commaNumToUnits,
  maxCargoVolume: valueCheck.maxCargoVolume,
  fuelDepositCapacity: valueCheck.commaNumToUnits,
  compactingRatio: valueCheck.commaNumToUnits,
  fuelType: String,
  fuelConsumption: String,
  height: valueCheck.commaNumToUnits,
  width: valueCheck.commaNumToUnits,
  depth: valueCheck.commaNumToUnits,
  weight: valueCheck.commaNumToUnits,
  loadType: String
};

module.exports = VehicleType;

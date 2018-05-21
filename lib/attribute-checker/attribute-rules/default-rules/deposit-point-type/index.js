const valueCheck = require('../../default-rules-value-check');

const DepositPointType = {
  id: String,
  type: String,
  family: valueCheck.mandatoryCheck,
  name: valueCheck.mandatoryCheck,
  refInputs: String,
  refOutputs: String,
  width: valueCheck.commaNumToUnits,
  height: valueCheck.commaNumToUnits,
  depth: valueCheck.commaNumToUnits,
  weight: valueCheck.commaNumToUnits,
  cargoVolume: valueCheck.commaNumToUnits,
  maximunLoad: valueCheck.commaNumToUnits,
  recommendedLoad: valueCheck.commaNumToUnits,
  category: valueCheck.mandatoryCheck,
  insertHolesNumber: valueCheck.commaNumToUnits,
  insertHoleWidth: valueCheck.commaNumToUnits,
  insertHoleHeight: valueCheck.commaNumToUnits,
  loadType: String,
  madeof: String,
  madeOfCode: String,
  brandName: String,
  modelName: valueCheck.mandatoryCheck,
  manufacturerName: String,
  colors: valueCheck.stringToArray,
  image: String,
  compliantWith: valueCheck.stringToArray,
  accessLimitation: String,
  userldentification: String,
  inputControl: String,
  maximumInputVolume: valueCheck.commaNumToUnits,
  features: valueCheck.stringToArray
};

module.exports = DepositPointType;

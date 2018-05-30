const valueCheck = require('../../default-rules-value-check');

const DepositPointType = {
  id: String,
  type: String,
  family: valueCheck.mandatoryCheck,
  name: valueCheck.mandatoryCheck,
  refInputs: String,
  refOutputs: String,
  width: valueCheck.commaNumToUnitsMandatory,
  height: valueCheck.commaNumToUnitsMandatory,
  depth: valueCheck.commaNumToUnitsMandatory,
  weight: valueCheck.commaNumToUnitsMandatory,
  cargoVolume: valueCheck.commaNumToUnitsMandatory,
  maximumLoad: valueCheck.commaNumToUnitsMandatory,
  reccomendedLoad: valueCheck.commaNumToUnitsMandatory,
  category: valueCheck.mandatoryCheck,
  insertHolesNumber: valueCheck.commaNumToUnitsMandatory,
  insertHoleWidth: valueCheck.commaNumToUnits,
  insertHoleHeight: valueCheck.commaNumToUnits,
  loadType: String,
  madeof: String,
  madeOfCode: String,
  brandName: valueCheck.mandatoryCheck,
  modelName: valueCheck.mandatoryCheck,
  manufacturerName: String,
  colors: valueCheck.stringToArray,
  image: String,
  compliantWith: valueCheck.stringToArray,
  accessLimitation: String,
  userIdentification: String,
  inputControl: String,
  maximumInputVolume: valueCheck.commaNumToUnits,
  features: valueCheck.stringToArrayMandatory
};

module.exports = DepositPointType;

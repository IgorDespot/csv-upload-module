var DepositPointType = {
    id: String,
    type: String,
    name: String,
    description: String,
    width: commaNumToUnits,
    height: commaNumToUnits,
    depth: commaNumToUnits,
    weight: commaNumToUnits,
    cargoVolume: commaNumToUnits,
    maximunLoad: commaNumToUnits,
    recommendedLoad: commaNumToUnits,
    category: String,
    insertHolesNumber: commaNumToUnits,
    insertHoleWidth: commaNumToUnits,
    insertHoleHeight: commaNumToUnits,
    loadType: String,
    madeof: String,
    madeOfCode: String,
    brandName: String,
    ModelName: String,
    manufacturerName: String,
    colors: String,
    image: String,
    compliantWith: String,
    accessLimitation: String,
    userldentification: String,
    inputControl: String,
    maximumInputVolume: String,
    features: stringToArray
}

function commaNumToUnits (oldNum) {
    return oldNum ? Number(oldNum.replace('.','').replace(',','.')) : Number.NaN;
}

function stringToArray (string) {
    return string.split(',').map( function (raw) {
        return raw.trim();
    });
}

module.exports = DepositPointType;
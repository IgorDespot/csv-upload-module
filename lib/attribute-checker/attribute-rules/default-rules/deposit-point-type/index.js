var DepositPointType = {
    id: String,
    type: String,
    name: String,
    description: String,
    width: commaNumToJSONNum,
    height: commaNumToJSONNum,
    depth: commaNumToJSONNum,
    weight: commaNumToJSONNum,
    cargoVolume: commaNumToJSONNum,
    maximunLoad: commaNumToJSONNum,
    recommendedLoad: String,
    category: String,
    insertHolesNumber: String,
    insertHoleWidth: String,
    insertHoleHeight: String,
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
    features: String
}

function commaNumToJSONNum(oldNum) {
    return oldNum ? Number(oldNum.replace('.','').replace(',','.')) : Number.NaN;
}

module.exports = DepositPointType;
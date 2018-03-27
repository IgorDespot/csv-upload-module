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
    category: categoryCheck,
    insertHolesNumber: commaNumToUnits,
    insertHoleWidth: commaNumToUnits,
    insertHoleHeight: commaNumToUnits,
    loadType: loadTypeCheck,
    madeof: madeof,
    madeOfCode: String,
    brandName: String,
    ModelName: String,
    manufacturerName: String,
    colors: stringToArray,
    image: String,
    compliantWith: String,
    accessLimitation: accessLimCheck,
    userldentification: String,
    inputControl: inputControlCheck,
    maximumInputVolume: String,
    features: featuresCheck
}

function commaNumToUnits(oldNum) {
    var newNum = oldNum ?
        Number(oldNum.replace('.','').replace(',','.')) :
        0;
    if (newNum === newNum) {
        return newNum;
    }
    return 0;
}

function stringToArray(string) {
    return string.split(',').map(function (raw) {
        return raw.trim();
    });
}

function categoryCheck(category) {
    var allowedCategory = [
        'bulk',
        'trashCan',
        'wheelieBin',
        'bag',
        'fixed collection centers',
        'mobile collection centers',
        'underground',
        'pneumatic',
        'portable'
    ];
    var category = stringToArray(category);
    if (!category) {
        return [];
    }
    return arrayFilter(category, allowedCategory);
}

function arrayFilter(array, allowed) {
    var result = [];
    array.forEach(element => {
        if (allowed.includes(element)) {
            result.push(element);
        }
    });
    if (result.length === 0){
    	return null;
    }
    return result;
}

function loadTypeCheck(loadType) {
    var allowedLoadType = ['side', 'upper', 'back'];
    if (!loadType) {
        return "";
    }
    if (!allowedLoadType.includes(loadType)) {
        return null;
    }
    return loadType
}

function madeof(madeof) {
    var allowed = ['plastic', 'wood', 'metal', 'other'];
    if (!madeof) {
        return "";
    }
    if (!allowed.includes(madeof)) {
        return null;
    }
    return madeof;
}

function accessLimCheck(accessLimitation) {
    var allowed = ['lock'];
    if (!accessLimitation) {
        return "";
    }
    if (!allowed.includes(accessLimitation)) {
        return null;
    }
    return accessLimitation;
}

function inputControlCheck(inputControl) {
    var allowed = ['chamber', 'weight'];
    if (!inputControl) {
        return "";
    }
    if (!allowed.includes(inputControl)) {
        return null;
    }
    return inputControl;
}

function featuresCheck(features) {
    var allowed = ['wheels', 'handAperture', 'feetAperture', 'lid', 'roundedLid', 'insertHoles', 'lockable', 'accessible holes'];
    if (!features) {
        return [];
    }
    return arrayFilter(features, allowed);
}

module.exports = DepositPointType;
var DepositPoint = {
    id: String,
    type: String,
    serialNumber: String,
    refSortingType: String,
    description: String,
    refDepositPointType: String,
    storedWasteOrigin: String,
    location: ['location', parseLocation],
    address: String,
    fillingLevel: commaNumToUnits,
    cargoWeight: commaNumToUnits,
    temperature: commaNumToUnits,
    methaneConcentration: commaNumToUnits,
    regulation: stringToArray,
    responsible: String,
    owner: String,
    dateServiceStarted: valiDate,
    dateLastEmptying: valiDate,
    nextActuationDeadline: valiDate,
    actuationHours: String,
    openingHours: String,
    dateLastCleaning: valiDate,
    nextCleaningDeadline: valiDate,
    refDepositPointIsle: String,
    status: String,
    color: String,
    image: String,
    annotations: stringToArray,
    areaServed: String,
    dateModified: valiDate,
    refDevice: stringToArray
}

function commaNumToUnits(oldNum) {
    var newNum = oldNum ?
        Number(oldNum.replace('.','').replace(',','.')) :
        0;
    if (newNum === newNum) {
        return newNum;
    }
    return null;
}

function toGeoJson(x, y) {
    x = commaNumToUnits(x);
    y = commaNumToUnits(y)
    if ( Number.isNaN(x) || Number.isNaN(y) ) {
        return null;
    }
    return {
        "type": "Point",
        "coordinates": [x,y]
    };
}

function parseLocation(location) {
    var data = location;
    var open = data.indexOf("[");
    var close = data.indexOf("]");
    var result = data.substring(open + 1,close);
    var temp = result.split(",", 2)
    if ( Number.isNaN(temp[0]) || Number.isNaN(temp[1])) {
        return null;
    }
    return {
        "type": "Point",
        "coordinates": [temp[0],temp[1]]
    };
}

function stringToArray(string) {
    if (string) {
        return string.split(',').map(function (raw) {
            return raw.trim();
        });
    } else {
        return null;
    }
}

function valiDate(input) {
    if (typeof input === "string" && !input) {
        return "";
    }
    return (new Date(input)).toJSON();
}

module.exports = DepositPoint;
var DepositPoint = {
    id: String,
    type: String,
    serialNumber: String,
    refSortingType: String,
    description: String,
    refDepositPointType: String,
    storedWasteOrigin: String,
    location: ['x', 'y', toGeoJson],
    address: String,
    fillingLevel: commaNumToUnits,
    cargoWeight: commaNumToUnits,
    temperature: commaNumToUnits,
    methaneConcentration: String,
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

function commaNumToUnits (oldNum) {
    return oldNum ? Number(oldNum.replace('.','').replace(',','.')) : Number.NaN;
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

function stringToArray (string) {
    return string.split(',').map( function (raw) {
        return raw.trim();
    });
}

function valiDate(input) {
    if (typeof input === "string" && !input) {
        return "";
    }
    return (new Date(input)).toJSON();
}

module.exports = DepositPoint;
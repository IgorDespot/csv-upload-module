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
    dateServiceStarted: String,
    dateLastEmptying: String,
    nextActuationDeadline: String,
    actuationHours: String,
    openingHours: String,
    dateLastCleaning: String,
    nextCleaningDeadline: String,
    refDepositPointIsle: String,
    status: String,
    color: String,
    image: String,
    annotations: stringToArray,
    areaServed: String,
    dateModified: String,
    refDevice: String
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

module.exports = DepositPoint;
var DepositPoint = {
    id: String,
    type: String,
    serialNumber: String,
    refSortingType: String,
    description: String,
    refCollectionPointType: String,
    storedWastOrigin: String,
    location: ['POINT_X', 'POINT_Y', toGeoJson],
    address: String,
    fillingLevel: commaNumToUnits,
    cargoWeight: commaNumToUnits,
    temperature: commaNumToUnits,
    methaneConcentration: String,
    regulation: String,
    responsible: String,
    owner: String,
    dateServiceStarted: String,
    dateLastEmptying: String,
    nextActuationDeadline: String,
    actuationHours: String,
    openingHours: String,
    dateLastCleaning: String,
    nextCleaningDeadline: String,
    refCollectionPointlsle: String,
    status: String,
    color: String,
    image: String,
    annotations: String,
    areaServed: String,
    dateModified: String,
    refDevice: String,
    coordxUTM: commaNumToUnits,
    coordyUTM: commaNumToUnits,
    POINT_X: commaNumToUnits,
    POINT_Y: commaNumToUnits
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

module.exports = DepositPoint;
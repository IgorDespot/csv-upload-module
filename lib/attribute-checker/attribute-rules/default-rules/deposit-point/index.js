var moment = require('moment');

var DepositPoint = {
    id: String,
    type: String,
    serialNumber: String,
    refSortingType: mandatoryCheck,
    description: String,
    refDepositPointType: mandatoryCheck,
    storedWasteOrigin: String,
    location: ['location', 'address', locCheck],
    address: ['address', 'location', addCheck],
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
    status: statusCheck,
    color: String,
    image: String,
    annotations: stringToArray,
    areaServed: String,
    dateModified: ['dateModified', dateCheck],
    refDevice: stringToArray
};

function commaNumToUnits(oldNum) {
    var newNum = oldNum ?
        Number(oldNum.replace('.', '').replace(',', '.')) :
        0;
    if (newNum === newNum) {
        return newNum;
    }
    return 0;
}

function toGeoJson(x, y) {
    x = commaNumToUnits(x);
    y = commaNumToUnits(y);
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return null;
    }
    return {
        "type": "Point",
        "coordinates": [x, y]
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

function parseLocation(location) {
    var data = location;
    var open = data.indexOf("[");
    var close = data.indexOf("]");
    var result = data.substring(open + 1, close); 
    var temp = result.split(",", 2);
    var x = temp[0];
    var y = temp[1];
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return null;
    }
    return {
        "type": "Point",
        "coordinates": [x, y]
    };
}

function valiDate(input) {
    if (typeof input === "string" && !input) {
        return "";
    }
    return {
        type: 'date',
        value: (new Date(input)).toJSON()
    };
}

function dateCheck(date) {
    if(!date)
        return {
            type: 'date',
            value: ""
        }; 
    if (!moment(date, moment.ISO_8601).isValid()) {
        return null;
    } else {
        return {
            type: 'date',
            value: date
        };
    }
}

function statusCheck(status) {
    var allowedStatus = ['ok', 'lidOpen', 'dropped', 'moved'];
    if(!allowedStatus.includes(status))
        return null;
    else
        return status;
}

function mandatoryCheck(attribute) {
    if(!attribute)
        return null;
    else
        return attribute;
}

function typeCheck(type) {
    if(type == "DepositPoint")
        return type;
    else
        return null;
}

function addCheck(address, location) {
  if(address)
    return address;
  if(location)
    return "";
  else
    return null;
}

function locCheck(location, address) {
  var arr = ['',''];
  if(location)
    parseLocation(location);
  if(address)
     return {
        "type": "Point",
        "coordinates": arr,
        "metadata": {
          "date": moment()
        }
    };
  else 
    return null;
}

function fillingLevelCheck(fillingLevel) {
  var allowed = ['0', '1'];
  if (allowed.includes(fillingLevel)) {
    commaNumToUnits(fillingLevel);
  } else {
    return 'null';
  }
  
}

function colorCheck(color) {
  if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
    return color;
  } else {
    return null;
  }
}

module.exports = DepositPoint;
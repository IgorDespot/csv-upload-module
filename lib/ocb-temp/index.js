var request = require('request');

request({
  url: 'http://130.206.117.164',
  headers: {
    'Fiware-Service': 'w4t-test',
    'Fiware-ServicePath':'/w4t/test/'
  },
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
});
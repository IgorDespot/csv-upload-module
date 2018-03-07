var request = require('request');

request({
  url: 'http://130.206.117.164/v2/entities',
  headers: {
    "Fiware-Service": "w4t_test",
    "Fiware-ServicePath": "/w4t/test/"
  },
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
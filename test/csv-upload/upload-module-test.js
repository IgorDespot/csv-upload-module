let upload = require('lib/upload-module')();
const frisby = require('frisby');

describe('Upload module', function () {

    it('should be a function', function () {
        expect(typeof upload).toBe('function');
    });

    it('should return a status of 200', function (done) {
        frisby.get('http://localhost:3000/upload')
          .expect('status', 200)
          .done(done);
    });
    
    it('should return a status of 200', function (done) {
        frisby.post('http://localhost:3000/upload')
          .expect('status', 200)
          .done(done);
    });
    
});

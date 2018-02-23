let upload = require('lib/upload-module');

describe('Upload module', function () {

    it('should be a function', function () {
        expect(upload).toEqual(jasmine.any(Function));
    });

    it('should be a function', function () {
        expect(upload.multer).toEqual(jasmine.any(Function));
    });


});
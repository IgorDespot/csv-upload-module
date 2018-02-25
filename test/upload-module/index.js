let upload = require('lib/upload-module');
let config = require('../../config.json');

const fileExtentions = config['file-extentions'];

console.log(fileExtentions);

describe('Upload module', function () {

    it('should be a function', function () {
        expect(upload).toEqual(jasmine.any(Function));
    });

    it('should be a function', function () {
        expect(upload.multer).toEqual(jasmine.any(Function));
    });

    it('should be a object', function () {
        expect(upload.multer.memoryStorage()).toEqual(jasmine.any(Object));
    });

    it('should be a function', function () {
        expect(upload.fileFilter).toEqual(jasmine.any(Function));
    });

    it('should be defined', function () {
        expect(upload.fileFilter).toBeDefined();
    });

    it('should be a function', function () {
        expect(upload.fileFilter).toEqual(jasmine.any(Function));
    });

    it('should recive 1 argument', function () {
        expect(upload.fileFilter.length).not.toBeLessThan(1);
    });

    it('should be array', function () {
        expect(fileExtentions).toEqual(jasmine.any(Array));
    });

    it('should be defined', function () {
        expect(fileExtentions).toBeDefined();
    });

    it('should be defined', function () {
        expect(config).toBeDefined();
    });

    it('should contain Content-Type', function () {
        expect(config).toEqual(jasmine.objectContaining({
            "file-extentions": jasmine.any(Array)
        }));
    });
});
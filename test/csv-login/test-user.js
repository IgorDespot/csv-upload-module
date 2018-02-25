 let auth = require('../../lib/login-module').authenticate;
 let authTest = require('../../lib/login-module').authTest;
 let app = ('../../app');

 describe('User checking', function () {
    it('should pass the test', function () {
        expect(auth).toEqual(jasmine.any(Function));
    });

    it('should pass the test', function () {
        expect(authTest).toEqual(jasmine.any(Function));
    });
})
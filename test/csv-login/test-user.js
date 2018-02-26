 let auth = require('../../lib/login-module').authenticate;
 let authTest = require('../../lib/login-module').authTest;
 let getUser = require('../../lib/login-module/models/userJson').getUserByUsername;
 let comparePassword = require('../../lib/login-module/models/userJson').comparePassword;
 let app = ('../../app');

 describe('User checking', function () {
    it('should pass the test for auth', function () {
        expect(auth).toEqual(jasmine.any(Function));
    });

    it('should pass the test for authTest', function () {
        expect(authTest).toEqual(jasmine.any(Function));
    });
    
    it('should pass the test for getUser', function () {
        expect(getUser).toEqual(jasmine.any(Function));
    });

    it('should pass the test for comparePassword', function () {
        expect(comparePassword).toEqual(jasmine.any(Function));
    });

    it('should be defined', function () {
        expect(getUser).toBeDefined();
    });

    it('should be truthy getUser right username', function (done) {
        getUser(
            'zamudio',
            function (err, user) {
                expect(user).toBeTruthy();
                done();
            }
        );
    });

    it('should be falsy getUser wrong username', function (done) {
        getUser(
            'name123',
            function (err, user) {
                expect(user).not.toBeTruthy();
                done();
            }
        );
    });

    it('should be truthy comparePassword right password', function (done) {
        comparePassword(
            '123', '$2a$10$1la3sKIFtz43a93deUjGCu3TOZMUXE0WITxzNOiFYGll99SWuo9N.',
            function (err, isMatch) {
                expect(isMatch).toBeTruthy();
                done();
            }
        );
    });

    it('should be falsy comparePassword compare not hashed password', function (done) {
        comparePassword(
            '123', '123',
            function (err, isMatch) {
                expect(isMatch).not.toBeTruthy();
                done();
            }
        );
    });
})
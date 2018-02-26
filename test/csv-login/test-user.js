 let auth = require('../../lib/login-module').authenticate;
 let authTest = require('../../lib/login-module').authTest;
 let getUser = require('../../lib/login-module/models/user').getUserByUsername;
 let comparePassword = require('../../lib/login-module/models/user').comparePassword;
 let mongoose = require('mongoose');
 let app = ('../../app');

 xdescribe('User checking', function () {
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

    it('should be truthy getUser', function (done) {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/csvApp');
        console.log("test");
        var user ={ "name" : "Zamudio", "fiware_service" : "waste4think", "fiware_servicepath" : "/deusto/w4t/zamudio/real", "username" : "zamudio",  "password" : "$2a$10$1la3sKIFtz43a93deUjGCu3TOZMUXE0WITxzNOiFYGll99SWuo9N.", }
        getUser(
            'zamudio',
            function (err, user) {
                console.log("error "+err);
                console.log(user);
                expect(user).toBeTruthy();
                done();
            }
        );
        mongoose.disconnect();
    });

    it('should be truthy comparePassword', function (done) {
        comparePassword(
            '123', '$2a$10$1la3sKIFtz43a93deUjGCu3TOZMUXE0WITxzNOiFYGll99SWuo9N.',
            function (err, isMatch) {
                expect(isMatch).toBeTruthy();
                done();
            }
        );
    });

    it('should be falsy comparePassword', function (done) {
        comparePassword(
            '123', '123',
            function (err, isMatch) {
                expect(isMatch).not.toBeTruthy();
                done();
            }
        );
    });
})
var server = require('bin/www');
const frisby = require('frisby');
const fs = require('fs');
var express= require('express');
var Request = require("request");
var http = require('http');
let login = require('../../lib/login-module');
let app = require('../../app');
let auth = login.authenticate;
let authTest = login.authTest;
let getUser = login.User.getUserByUsername;
let comparePassword = login.User.comparePassword;
let getUserById = login.User.getUserById;
let createUser = login.User.createUser;
let checkCredentials = login.checkCredentials;

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

    it('should pass the test for createUser', function () {
        expect(createUser).toEqual(jasmine.any(Function));
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
});

describe('Json checking', function () {
    var testJson = {"id":"1","name":"Zamudio","fiware_service":"waste4think","fiware_servicepath":"/deusto/w4t/zamudio/real","username":"zamudio","password":"$2a$10$1la3sKIFtz43a93deUjGCu3TOZMUXE0WITxzNOiFYGll99SWuo9N."};
    var userJson = {"id":"2","name":"username","fiware_service":"waste4think","fiware_servicepath":"/deusto/w4t/zamudio/real","username":"zamudio","password":"$2a$10$1la3sKIFtz43a93deUjGCu3TOZMUXE0WITxzNOiFYGll99SWuo9N."};
    var usersDb = JSON.parse(fs.readFileSync('db/users.json', 'utf8'));

    it('should be equal json objects getUser', function (done) {
        getUser(
            'zamudio',
            function (err, user) {
                expect(user).toEqual(testJson);
                done();
            }
        );
    });

    it('should not be equal json objects getUser', function (done) {
        getUser(
            'username',
            function (err, user) {
                expect(user).not.toEqual(userJson);
                done();
            }
        );
    });  
    
    it('should be the same user like in database', function (done) {
        getUser(
            usersDb.users[0].username,
            function (err, user) {
                expect(user).toEqual(testJson);
                done();
            }
        );
    });

    it('should pass the test for getUserById', function () {
        expect(getUserById).toEqual(jasmine.any(Function));
    });

    it('should be equal json objects getUserById', function (done) {
        getUserById(
            '1',
            function (err, user) {
                expect(user).toEqual(testJson);
                done();
            }
        );
    });

});
 
xdescribe('Route checking', function () {
    it('should return 200 because it redirects to /users/login', function (done) {
    frisby.get('http://localhost:3000/123')
        .expect('status', 200)
        .done(done);
    });

    it('should return 200', function (done) {
        frisby.get('http://localhost:3000/users/login')
            .expect('status', 200)
            .expect('header','Content-type','text/html; charset=utf-8')
            .done(done);
    });
    
    it('should return 200 post', function (done) {
        frisby.post('http://localhost:3000/users/login', {username: 'zamudio', password: '123'})
            .expect('status', 200)
            .expect('header','Content-type','text/html; charset=utf-8')
            .then(function (res) { 
                console.log("In post");
            })
            .done(done);
    });
});

describe('Integration test: Check credentials', function () {
    it('it should return true for right credentials', function (done) {
        checkCredentials(
            'zamudio','123',
            function (err, data) {
                expect(data).toBeTruthy();
                done();
            }
        );
    }); 

    it('it should return false for wrong credentials', function (done) {
        checkCredentials(
            'zamudio','1234',
            function (err, data) {
                expect(data).not.toBeTruthy();
                done();
            }
        );
    });
    
});

describe("Server", () => {
    describe(" /users/login", () => {
        
        it("Should be ", function() {
            Request.post( {url:"http://localhost:3000/users/login",followAllRedirects: true,
            form:{'username': 'zamudio', 'password': '123'}},function(error, response, body){
                console.log(response.request.redirects);  
                console.log(response.request.uri.href); 
            });
        });
    });
});
